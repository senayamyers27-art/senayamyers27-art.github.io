/* Lessons for Fortinet NSE 4 - FortiOS 7.6 Administrator (NSE4_FGT_AD-7.6): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("fortinet-fortigate", [
 {
  "t": "Initial setup: default management IP 192.168.1.99, admin account, forced password change, interface roles and access (HTTPS, SSH, ping)",
  "body": [
   "Every FortiGate you unbox starts from the same known state, and the exam expects you to know that state cold. A hardware FortiGate ships with the address 192.168.1.99 on its management interface (often labelled MGMT, or internal/port1 on smaller models). You cable a laptop to that interface, give the laptop an address in the same subnet, and browse over HTTPS to 192.168.1.99 in a web browser. HTTPS is the default GUI protocol, so a plain HTTP request redirects to it.",
   "The default administrator account is named admin and has a blank (empty) password. FortiOS does not leave it that way: the first time you log in, the unit forces you to set a new password before it lets you do anything else. There is no root account and no serial-number login, which is a favourite distractor on the exam. Registration in FortiCloud is optional for local management and is not required just to log in.",
   "Once you are in, interfaces carry a role that describes their place in the network. The three built-in roles are LAN, WAN and DMZ, plus Undefined. The role is mostly a convenience that hides irrelevant fields (a WAN interface, for example, exposes settings you would not put on a LAN port), and it does not by itself change how traffic is filtered. Firewall policies still decide what passes.",
   "Each interface also has an Administrative Access setting that lists the management services allowed to reach the FortiGate on that interface: HTTPS and SSH for management, PING so the interface answers ICMP echo, plus options such as HTTP, SNMP, FMG-Access and Security Fabric Connection (formerly called FortiTelemetry). This is a common source of lockouts: if you remove HTTPS from the interface you are managing over, you lose the GUI. On a WAN interface facing the Internet you normally allow little or nothing, and you rely on trusted hosts and a VPN for remote management.",
   "In a lab you will set a static IP on port1 in the GUI or with the CLI. The equivalent CLI is short: enter `config system interface`, `edit port1`, `set ip 10.0.0.1/24`, `set allowaccess ping https ssh`, then `end`. Knowing both the GUI path and the `allowaccess` keyword helps you answer questions phrased either way."
  ],
  "terms": [
   [
    "Management IP (192.168.1.99)",
    "The default address on a factory FortiGate's management/internal interface, reached over HTTPS for first login."
   ],
   [
    "Administrative access",
    "The per-interface list of management services (HTTPS, SSH, PING, SNMP, and so on) that the FortiGate will answer on that interface."
   ],
   [
    "Interface role",
    "A label (LAN, WAN, DMZ or Undefined) that tailors which configuration fields are shown for an interface; it does not filter traffic on its own."
   ],
   [
    "allowaccess",
    "The CLI keyword under a system interface that sets which management protocols the interface accepts."
   ]
  ],
  "example": "A technician cables a laptop to a new FortiGate's MGMT port, sets the laptop to 192.168.1.50/24, browses over HTTPS to 192.168.1.99, logs in as admin with a blank password, and is immediately forced to create a new admin password.",
  "tip": "Losing GUI access after an interface change is almost always a missing HTTPS entry in that interface's Administrative Access. Confirm allowaccess before you disconnect.",
  "check": [
   [
    "What URL and credentials do you use for the very first login to a factory-default hardware FortiGate?",
    "Browse over HTTPS to 192.168.1.99 and log in as admin with a blank password; FortiOS then forces you to set a new password."
   ],
   [
    "You removed HTTPS from the interface you manage over and lost the GUI. What setting caused it?",
    "The interface's Administrative Access (allowaccess) list no longer includes HTTPS, so the FortiGate stops answering GUI requests there."
   ],
   [
    "Does an interface role of WAN block traffic by itself?",
    "No. The role only tailors the shown settings; firewall policies decide what traffic passes."
   ]
  ]
 },
 {
  "t": "Administrator accounts: admin profiles, trusted hosts, MFA for admins, password policy",
  "body": [
   "Protecting the FortiGate itself is a domain-one skill, and it turns on four independent controls: admin profiles, trusted hosts, multi-factor authentication and a password policy. Each answers a different question, and the exam often gives you a scenario and asks which one applies. Keeping them straight is the whole battle.",
   "An administrator profile (also called an access profile) controls what an admin may do. It grants read, read-write or no access per feature area: System, Firewall, Log & Report, Security Profile, VPN, and so on. The built-in super_admin profile grants full read-write everywhere and cannot be edited. For an auditor who must see logs but change nothing, you create a custom profile with read-only access to Log & Report and assign it to that account. Profiles control what, not where.",
   "Trusted hosts control where an admin may log in from. Each account can list up to a small number of source subnets (for example 10.10.99.0/24); once any trusted host is set, logins from any other source are refused, even with the correct password. This is the most direct way to enforce a rule like 'admins may only manage from the management subnet'. If every entry is left at 0.0.0.0/0, the account can log in from anywhere, which is the risky default to watch for.",
   "Multi-factor authentication (MFA), sometimes called two-factor, adds a second proof beyond the password, typically a FortiToken one-time code or an email code. It defends against stolen or guessed passwords but does not restrict source networks, so it is not the answer to a 'from which subnet' question.",
   "The password policy sets complexity and lifetime rules, minimum length, required character classes, and expiry, applied to admin passwords (and optionally IPsec pre-shared keys). It raises the cost of guessing but again says nothing about source or authorization.",
   "A strong build combines all four: least-privilege profiles, trusted hosts locking management to a jump network, MFA on every admin, and a password policy. In a lab you will create a read-only Log & Report profile, add a trusted host to your own account, and enable a token, then confirm each control does exactly what its name says."
  ],
  "terms": [
   [
    "Admin profile (access profile)",
    "Per-feature read/read-write/none permissions that define what an administrator can do; super_admin is the full built-in profile."
   ],
   [
    "Trusted hosts",
    "A per-account list of allowed source subnets; once set, logins from any other address are refused."
   ],
   [
    "MFA / two-factor for admins",
    "A second login factor (such as a FortiToken code) that protects against stolen passwords but does not limit source networks."
   ],
   [
    "Password policy",
    "Rules for admin password length, complexity and expiry."
   ]
  ],
  "example": "An auditor needs to read logs but must not change anything, so you assign a custom profile with read-only Log & Report access, add a trusted host for the audit subnet, and require a FortiToken at login.",
  "tip": "When a question asks how to restrict where an admin logs in from, the answer is trusted hosts, not MFA or password policy. Profiles answer what they can change, not where.",
  "check": [
   [
    "Which control lets you require that admins log in only from 10.10.99.0/24?",
    "Trusted hosts on each admin account; other source addresses are then refused regardless of the password."
   ],
   [
    "An admin must view reports but change nothing. What do you create?",
    "A custom admin profile with read-only access to Log & Report, assigned to that account."
   ],
   [
    "Does MFA restrict which network an admin can log in from?",
    "No. MFA adds a second authentication factor but does not limit source addresses; trusted hosts do that."
   ]
  ]
 },
 {
  "t": "Firmware management: the upgrade path, config backups and restore",
  "body": [
   "Firmware upgrades are routine, and doing them wrong can corrupt a configuration or brick a remote unit, so Fortinet defines a disciplined procedure the exam expects you to follow. The two ideas that matter most are the supported upgrade path and the config backup.",
   "FortiOS does not always let you jump straight from an old build to the newest one. When the internal configuration format has changed across releases, Fortinet publishes an upgrade path: an ordered list of intermediate builds you must install in sequence so that each step can convert the configuration cleanly. For example, moving a unit from an old 7.0 build to 7.6 may require stepping through specific 7.2 and 7.4 releases first. Skipping steps can silently drop or mangle settings. You look up the path for your exact model and starting build in Fortinet's upgrade-path tool or release notes before you begin.",
   "Always take a configuration backup before upgrading. A backup is a text file of the whole configuration. You can save it in the clear or, better, encrypt it with a password. An encrypted backup can only be restored to a FortiGate, and only with the password, so store that password safely because a lost password means an unusable backup. Backups are model- and often version-specific: restoring a backup taken on one model or a very different firmware to another may not work, so backups are for rollback and cloning like units, not for migrating between models.",
   "The restore operation loads a saved configuration and reboots. Because restoring replaces the running config, it is your rollback plan: if an upgrade misbehaves, you can reinstall the previous firmware and restore the matching backup. Restoring a config taken on the same model and firmware is the safe case.",
   "The workflow to memorize: check the upgrade path for your model and build, read the release notes for known issues, back up (and verify) the config, upgrade one step at a time following the path, and confirm the unit is healthy before the next step. In a lab you will download a backup with `execute backup config`, and you can view the running firmware and serial with `get system status`.",
   "In an HA cluster, FGCP normally upgrades members with an uninterrupted (rolling) firmware upgrade so the cluster keeps forwarding traffic, but you still follow the same path and backup discipline."
  ],
  "terms": [
   [
    "Upgrade path",
    "The ordered sequence of intermediate FortiOS builds Fortinet requires between two versions so the configuration converts correctly."
   ],
   [
    "Configuration backup",
    "A saved copy of the whole FortiGate configuration, optionally encrypted with a password, used for rollback or cloning."
   ],
   [
    "Restore",
    "Loading a saved configuration file, which replaces the running config and reboots the unit."
   ],
   [
    "Release notes",
    "Fortinet's per-build document listing the supported upgrade path, fixes and known issues."
   ]
  ],
  "example": "Before moving a FortiGate from a 7.0 build to 7.6, an admin backs up the config, looks up the supported upgrade path, and installs the required 7.2 and 7.4 steps in order rather than flashing 7.6 directly.",
  "tip": "Never flash the newest image straight over a much older build. Follow the published upgrade path step by step, and take an encrypted backup first so you can roll back.",
  "check": [
   [
    "Why not install the newest firmware directly over a very old build?",
    "The configuration format may have changed; the published upgrade path steps through intermediate builds so the config converts cleanly instead of being lost."
   ],
   [
    "What is the first thing to do before any upgrade?",
    "Back up the configuration (ideally encrypted) so you can roll back if the upgrade misbehaves."
   ],
   [
    "Can you restore an encrypted backup without its password?",
    "No. An encrypted backup requires the password to restore, so a lost password makes the backup unusable."
   ]
  ]
 },
 {
  "t": "VDOMs: what they separate, root VDOM, when to use multi-VDOM",
  "body": [
   "A virtual domain, or VDOM, lets one physical FortiGate behave like several independent firewalls. Each VDOM has its own interfaces, firewall policies, routing table, security profiles and administrators, and traffic in one VDOM is isolated from the others unless you deliberately connect them. This is how a single appliance can serve, say, two separate customers or a production and a lab network without their rules or routes leaking into each other.",
   "By default a FortiGate runs with a single VDOM called root, and multi-VDOM mode is off. In this state you often do not even see the word VDOM in the GUI; you just configure the box. When you enable multi-VDOM (in the CLI, `config system global`, `set vdom-mode multi-vdom`, or via the GUI), the root VDOM remains and you can add more VDOMs. The root VDOM is special: by default it is the management VDOM, which carries the FortiGate's own management traffic (such as FortiGuard updates, logging and NTP), and it cannot be deleted.",
   "Global settings apply to the whole appliance regardless of VDOMs: firmware, HA, the hostname, and administrator accounts at the global level. Per-VDOM settings are everything that makes a VDOM its own firewall: interfaces assigned to it, its routing, its policies and profiles. An interface belongs to exactly one VDOM at a time. To pass traffic between VDOMs you use an inter-VDOM link (a virtual back-to-back pair of interfaces) plus policies and routes, so the isolation is broken only where you allow it.",
   "When should you use multi-VDOM? Use it when you need true administrative and traffic separation on one box: a managed service provider hosting several tenants, a business that must keep two regulatory environments apart, or a need for separate routing tables (for example overlapping IP ranges for different customers). If you only need network segmentation within one organization, VLANs and zones with good policies are usually simpler; VDOMs add management overhead and split the resource pool.",
   "Two management models exist. In split-task VDOM mode you get a management VDOM plus a traffic VDOM; in multi-VDOM mode you create many. For the exam, focus on the core idea: VDOMs separate policies, routing and administration, the root VDOM handles management, and you reach for multi-VDOM when isolation is a requirement rather than a convenience."
  ],
  "terms": [
   [
    "VDOM (virtual domain)",
    "An isolated instance on one FortiGate with its own interfaces, routing table, policies and profiles."
   ],
   [
    "Root VDOM",
    "The default VDOM that always exists and, in multi-VDOM mode, hosts management and box-wide functions."
   ],
   [
    "Global vs per-VDOM settings",
    "Global settings (firmware, HA, hostname) apply to the whole unit; per-VDOM settings (interfaces, routes, policies) belong to one VDOM."
   ],
   [
    "Inter-VDOM link",
    "A virtual internal link that connects two VDOMs so traffic can pass between them under policy control."
   ]
  ],
  "example": "A managed service provider hosts two customers with overlapping 10.0.0.0/8 addressing on one FortiGate by giving each its own VDOM with a separate routing table and policy set, so their traffic never mixes.",
  "tip": "VDOMs give separate routing tables and policy sets; VLANs and zones only segment within one routing/policy context. Choose VDOMs when you need real isolation, not just subnets.",
  "check": [
   [
    "What does each VDOM have that makes it act like a separate firewall?",
    "Its own interfaces, routing table, firewall policies, security profiles and administrators, isolated from other VDOMs."
   ],
   [
    "Which VDOM always exists and handles management?",
    "The root VDOM; it remains when you enable multi-VDOM and hosts box-wide/management functions."
   ],
   [
    "When is multi-VDOM the right choice over VLANs?",
    "When you need true isolation of routing and administration, such as separate tenants or overlapping IP ranges, rather than simple segmentation."
   ]
  ]
 },
 {
  "t": "FGCP HA: active-passive vs active-active, heartbeat links, primary election (monitored ports, uptime, priority, serial, override)",
  "body": [
   "FortiGate Clustering Protocol (FGCP) joins two or more identical FortiGates into one high-availability (HA) cluster that survives the failure of a single unit. To form a cluster the members must match on hardware model and firmware, and share the same HA group ID, group name and password. Hostnames and management IPs stay unique per member. The cluster presents shared virtual MAC and IP addresses so the network sees one device.",
   "There are two modes. In active-passive, only the primary (also called master) processes traffic while the secondary sits ready and takes over on failure. In active-active, the primary still receives all traffic but distributes sessions that need security profile inspection to the secondaries to spread CPU load; the primary still owns the shared addresses. Both modes fail over the same way; the difference is whether the secondary works during normal operation.",
   "Heartbeat links carry the cluster's health signals and configuration/session synchronization between members. You dedicate one or, better, two interfaces to heartbeat and connect them directly or over a dedicated switch. Two heartbeat links remove a single point of failure: if a lone heartbeat cable fails, each unit thinks the other is dead and you get a split brain with two primaries.",
   "Primary election decides which unit leads, and the order of tie-breakers depends on the override setting. With override disabled (the default), FGCP compares, in order: the number of connected monitored interfaces (more is better), then HA uptime (longer is better, beyond a small margin), then device priority (higher is better), then serial number (higher wins as the final tie-break). Because uptime is checked before priority here, raising a returning unit's priority does not make it take back the primary role.",
   "With override enabled, the order changes so that device priority is compared before uptime: monitored interfaces, then priority, then uptime, then serial. This makes a specific preferred unit reclaim the primary role after it recovers, at the cost of an extra failover when it comes back. Monitored (link) interfaces are ports you tell HA to watch; losing one lowers a unit's standing and can trigger failover.",
   "In a lab with two licensed units you would set the same group ID and priorities, connect heartbeat links, and watch the election. With one unit, study the election order until you can recite both the override-disabled and override-enabled sequences."
  ],
  "terms": [
   [
    "FGCP",
    "FortiGate Clustering Protocol, which binds matching FortiGates into one HA cluster with shared virtual addresses."
   ],
   [
    "Active-passive vs active-active",
    "Active-passive: only the primary forwards traffic. Active-active: the primary also distributes inspection sessions to secondaries."
   ],
   [
    "Heartbeat link",
    "A dedicated interface carrying HA health, config sync and session sync; two are used to avoid split brain."
   ],
   [
    "Override",
    "An HA setting that moves device priority ahead of uptime in the election, so a preferred unit reclaims the primary role after recovery."
   ]
  ],
  "example": "An admin bumps the secondary's HA priority to 250 hoping it becomes primary, but with override disabled the current primary keeps leading because its HA uptime is compared before priority.",
  "tip": "Memorize both election orders. Override disabled: interfaces, uptime, priority, serial. Override enabled: interfaces, priority, uptime, serial. Priority only matters early when override is on.",
  "check": [
   [
    "With override disabled, which criterion decides the primary before priority?",
    "The number of connected monitored interfaces, then HA uptime; priority is only checked after uptime."
   ],
   [
    "How does active-active differ from active-passive?",
    "In active-active the primary distributes inspection sessions to secondaries so they process traffic too; in active-passive only the primary forwards traffic."
   ],
   [
    "Why use two heartbeat links?",
    "To avoid a split brain: if the only heartbeat fails, each unit thinks the other is down and both become primary."
   ]
  ]
 },
 {
  "t": "HA operations: session pickup, config sync, checksums, `get system ha status`, `execute ha manage`",
  "body": [
   "Once a cluster is running, day-to-day HA work is about keeping members in sync and knowing what happens during a failover. Three features and two commands cover most of the exam's operational questions.",
   "Session pickup (also called session synchronization) copies the session table from the primary to the secondaries so that established TCP sessions survive a failover. It is off by default because synchronizing every session adds CPU and heartbeat traffic. You turn it on when session continuity matters, for example long file transfers, SSH sessions or database connections that would otherwise drop when the secondary takes over. Note that even with session pickup, some sessions needing proxy-based inspection may still reset; by default only TCP sessions are synchronized (UDP and ICMP need `session-pickup-connectionless`), and you can enable `session-pickup-delay` so only sessions older than 30 seconds are synchronized.",
   "Configuration synchronization keeps every member's configuration identical automatically. You make changes on the primary and FGCP pushes them to the secondaries, so you never edit the secondary directly for synced settings. To verify sync, FGCP computes a checksum of each configuration area on every member and compares them. If two members show as out of sync in the GUI, you compare their checksums to find which area differs.",
   "The command `get system ha status` shows cluster health from the CLI: which unit is primary, the members and their serials, HA uptime, monitored interface status, and sync state. It is your first stop to confirm the cluster is healthy and to see who is leading. For a deeper look at what differs, `diagnose sys ha checksum cluster` prints the per-area checksums across members so you can pinpoint a mismatch.",
   "The command `execute ha manage` lets you jump from the unit you are logged into over to another cluster member's CLI so you can inspect or run diagnostics on the secondary without cabling to it. You give it the member index and an admin login, and you are dropped into that unit's console over the heartbeat link.",
   "A healthy operational routine: check `get system ha status` after changes and after any failover, confirm checksums match, keep session pickup aligned with your continuity needs, and use `execute ha manage` to reach the other member when you need to look at it directly."
  ],
  "terms": [
   [
    "Session pickup",
    "HA session synchronization that lets established TCP sessions survive a failover; off by default because of its CPU and heartbeat cost."
   ],
   [
    "Configuration sync",
    "The automatic replication of the primary's configuration to secondaries so all members stay identical."
   ],
   [
    "HA checksum",
    "A per-configuration-area hash compared across members to confirm they are in sync; a mismatch reveals which area differs."
   ],
   [
    "execute ha manage",
    "A CLI command that connects you from one cluster member to another member's console over the heartbeat link."
   ]
  ],
  "example": "After a failover, users report dropped SSH and large file transfers, so the admin enables session pickup so the next failover preserves those TCP sessions on the new primary.",
  "tip": "Session pickup is disabled by default. If a question mentions sessions dropping across a failover, the fix is to enable session pickup, not to add heartbeat links or override.",
  "check": [
   [
    "What does session pickup do and why is it off by default?",
    "It synchronizes the session table so TCP sessions survive failover; it is off by default because it adds CPU and heartbeat load."
   ],
   [
    "Two members show as out of sync. Which command finds the differing area?",
    "diagnose sys ha checksum cluster compares per-area checksums across members to reveal which configuration area differs."
   ],
   [
    "How do you reach the secondary's CLI without cabling to it?",
    "Use execute ha manage from the primary to connect to another member's console over the heartbeat link."
   ]
  ]
 },
 {
  "t": "Security Fabric: root and downstream FortiGates, authorization, FortiAnalyzer/cloud logging requirement, Security Rating",
  "body": [
   "The Security Fabric ties multiple Fortinet devices into one coordinated system with shared visibility, topology views and automation. At its center is one FortiGate acting as the Fabric root; other FortiGates connect to it as downstream units, forming a tree. The root aggregates information from the whole Fabric and is where you see end-to-end topology and run Fabric-wide checks.",
   "Before the root can run the Fabric, it needs a logging destination that can store and correlate Fabric data: FortiAnalyzer, or a cloud logging service such as FortiGate Cloud. This is a required prerequisite the exam likes to test. Without a supported log store, the Fabric views and reports have nowhere to build from, so the root cannot fully form the Fabric.",
   "Joining a downstream FortiGate follows a clear, two-sided handshake. On the downstream unit you enable the Security Fabric connection and point it at the upstream (root) unit's IP address. The connection uses the Security Fabric protocol (formerly called FortiTelemetry), so the upstream interface must allow Security Fabric Connection in its administrative access. The join does not complete until the root authorizes the downstream device, which the administrator does on the root by approving the unit's serial number. This authorization step is what prevents an unknown device from silently joining the Fabric. Simply sharing a FortiCare account or building a VPN tunnel does not create a Fabric.",
   "Once devices are joined, Security Rating runs a set of best-practice and security checks across the Fabric devices, comparing your configuration against Fortinet's recommendations. It produces a score and a prioritized list of findings with suggested fixes, such as weak admin settings, missing HA, or interfaces exposed to management. It is a posture-assessment and hardening tool, not a website reputation score or a bandwidth meter.",
   "Beyond visibility and rating, the Fabric enables coordinated responses, for example automation stitches that quarantine a compromised host across devices. For the exam, hold onto three facts: the root needs FortiAnalyzer or cloud logging; downstream units connect to the upstream IP and are authorized by serial number on the root; and Security Rating scores your configuration against best practices with recommended fixes.",
   "In a lab you enable the Fabric on a root VM (pointing it at FortiGate Cloud for logging) and, if you have a second unit, join and authorize it, then run a Security Rating and read the recommendations."
  ],
  "terms": [
   [
    "Fabric root",
    "The top FortiGate in a Security Fabric that aggregates the topology and requires FortiAnalyzer or cloud logging."
   ],
   [
    "Downstream FortiGate",
    "A FortiGate that joins the Fabric by connecting to the upstream (root) IP and being authorized by the root."
   ],
   [
    "Fabric authorization",
    "The root's approval of a downstream unit by serial number, which completes the join and blocks unknown devices."
   ],
   [
    "Security Rating",
    "A Fabric feature that checks devices against Fortinet best practices and returns a score with prioritized fixes."
   ]
  ],
  "example": "A branch FortiGate joins HQ's Fabric by enabling the Security Fabric connection, pointing at HQ's IP, and HQ then authorizes the branch by its serial number; HQ already logs to FortiGate Cloud, which the root requires.",
  "tip": "Two Fabric facts recur on the exam: the root must have FortiAnalyzer or cloud logging, and downstream units are authorized by serial number on the root. A shared account or VPN does not make a Fabric.",
  "check": [
   [
    "What must the root FortiGate have before the Security Fabric can form?",
    "A logging destination that can store Fabric data: FortiAnalyzer or a cloud logging service such as FortiGate Cloud."
   ],
   [
    "How does a downstream FortiGate join the Fabric?",
    "It enables the Fabric connection and points at the upstream (root) IP; the root then authorizes it by serial number."
   ],
   [
    "What does Security Rating provide?",
    "Best-practice checks across Fabric devices with a score and prioritized recommendations, not a website or bandwidth rating."
   ]
  ]
 },
 {
  "t": "Automation stitches: triggers and actions (email, webhook, CLI script, quarantine)",
  "body": [
   "Automation stitches are FortiOS's built-in way to react to events without a human watching a screen. A stitch pairs a trigger (something that happens) with one or more actions (something to do), so the FortiGate can notify, run a command or contain a threat the moment a condition is met. They live under the Security Fabric section and can act locally or across Fabric devices.",
   "A trigger is the event that starts the stitch. Triggers include FortiOS event-log conditions (such as a configuration change, an admin login failure, an HA failover, entering conserve mode, or a license expiry), security events (such as an IPS or antivirus detection or a compromised host indicator), a scheduled time, or an incoming webhook. You choose the trigger that matches the situation the question describes; for 'email me whenever any admin changes the configuration', the trigger is a configuration-change event.",
   "An action is what the stitch does when the trigger fires. Common actions are: send an email; call an outbound webhook (an HTTP request to another system, useful for chat or ticketing integrations); run a CLI script on the FortiGate to change configuration automatically; and quarantine, which isolates a compromised host, for example by banning its address or, with FortiSwitch/FortiAP, cutting its network access. Other actions include AWS/Azure and FortiExplorer notifications. You can chain several actions to one trigger.",
   "Compared with the alternatives, stitches are the simplest path to immediate, event-driven behaviour. A scheduled report is not immediate, and forwarding syslog to another tool needs that tool to do the reacting. So when a scenario asks for the simplest way to get an instant email on a specific event, the answer is an automation stitch with the matching trigger and an email action.",
   "Quarantine deserves special note because it turns detection into containment: when a security profile or the Fabric flags a host as compromised, a stitch with a quarantine action can automatically ban that host so it cannot spread, buying the SOC time to investigate.",
   "In a lab you will create a stitch with a configuration-change trigger and an email action, then change a setting and confirm the email arrives. Building one stitch end to end is enough to answer most exam questions about triggers versus actions."
  ],
  "terms": [
   [
    "Automation stitch",
    "A rule that pairs a trigger with one or more actions so the FortiGate responds to an event automatically."
   ],
   [
    "Trigger",
    "The event that starts a stitch, such as a configuration change, a security detection, a schedule or an incoming webhook."
   ],
   [
    "Action",
    "What a stitch does when triggered: email, outbound webhook, CLI script, or quarantine, among others."
   ],
   [
    "Quarantine action",
    "An action that isolates a compromised host (for example by banning its address) to contain a threat automatically."
   ]
  ],
  "example": "To alert on any admin change, an admin builds a stitch with a configuration-change trigger and an email action; the next time a setting is saved, the security team receives an immediate email.",
  "tip": "When the question asks for the simplest way to react instantly to an event, pick an automation stitch. Scheduled reports and syslog forwarding are not immediate and need extra tooling.",
  "check": [
   [
    "What two parts make up an automation stitch?",
    "A trigger (the event) and one or more actions (the responses, such as email, webhook, CLI script or quarantine)."
   ],
   [
    "Which stitch action can contain a compromised host automatically?",
    "The quarantine action, which isolates or bans the host so it cannot spread."
   ],
   [
    "Why is a stitch better than a daily report for alerting on admin changes?",
    "A stitch fires immediately when the trigger occurs, while a scheduled report only runs on its schedule."
   ]
  ]
 },
 {
  "t": "Logging: log types (traffic, event, security), severity, memory/disk/FortiAnalyzer/FortiGate Cloud/syslog, log allowed traffic",
  "body": [
   "Logs are how you prove what a FortiGate did, and the exam tests both the categories of logs and where they can be stored. Get the vocabulary right and most questions fall into place.",
   "FortiOS produces three broad log types. Traffic logs record sessions passing through firewall policies (source, destination, service, bytes, the policy hit, and whether it was allowed or denied). Event logs record what the system itself does: administrator logins and changes, HA events, VPN negotiation, routing changes and health. Security logs record the actions of security profiles: antivirus detections, web filter blocks, IPS hits, application control, and DNS filtering. When someone asks 'where would I see that a policy blocked a virus', that is a security (UTM) log; 'who logged in and changed a setting' is an event log.",
   "Every log carries a severity level, from emergency and alert down through critical, error, warning, notification, information and debug. You can filter or limit logging by severity to control volume, keeping, say, warnings and above while dropping routine information entries.",
   "Storage destinations are the second axis. Logs can go to memory, to local disk, to FortiAnalyzer, to FortiGate Cloud, or to a syslog server, and you can send to several at once. Memory logging is small and, crucially, cleared on reboot, so it is fine for a quick look but useless for history; after a firmware upgrade and reboot the memory logs are gone. Disk logging survives reboots but is limited by the disk and not present on diskless models. For durable, searchable history and reporting across devices you send logs to FortiAnalyzer, FortiGate Cloud or a syslog collector.",
   "The 'Log allowed traffic' setting on a firewall policy controls how much traffic logging that policy generates. The choices are No Log, Security Events (log only sessions a security profile acted on) and All Sessions (log every accepted session). If an analyst needs a record of every accepted connection through a policy, set it to All Sessions; Security Events alone will miss ordinary allowed traffic. Separately, the implicit deny policy does not log denied traffic by default, so to capture drops you enable logging on it.",
   "In a lab you will set a policy to log All Sessions, generate traffic, and read the forward-traffic log, then send logs to FortiGate Cloud so they survive a reboot."
  ],
  "terms": [
   [
    "Traffic log",
    "A record of sessions passing through firewall policies, including the policy hit and allow/deny result."
   ],
   [
    "Event log",
    "A record of the FortiGate's own activity: admin logins and changes, HA, VPN and system health."
   ],
   [
    "Security (UTM) log",
    "A record of security-profile actions such as antivirus, web filter, IPS, application control and DNS filter events."
   ],
   [
    "Log allowed traffic",
    "A per-policy setting (No Log, Security Events, All Sessions) that controls which accepted sessions are logged."
   ]
  ],
  "example": "A diskless FortiGate logs to memory, and after a reboot for a firmware upgrade yesterday's logs are gone, so the admin configures FortiGate Cloud (or FortiAnalyzer/syslog) to keep durable history.",
  "tip": "Memory logs are wiped on reboot. For any question about keeping log history, the answer is a persistent destination: disk, FortiAnalyzer, FortiGate Cloud or syslog, not a bigger memory buffer.",
  "check": [
   [
    "Which log type shows that a policy blocked a virus, and which shows an admin login?",
    "The security (UTM) log shows the antivirus block; the event log shows the admin login."
   ],
   [
    "A policy logs only security events but you need every accepted session recorded. What do you change?",
    "Set Log allowed traffic to All Sessions on that policy; Security Events only logs sessions a security profile acted on."
   ],
   [
    "Why do memory logs disappear after a reboot?",
    "Memory logging is not persistent; it is cleared on restart, so history needs disk, FortiAnalyzer, FortiGate Cloud or syslog."
   ]
  ]
 },
 {
  "t": "FortiGate-VM and cloud deployments: VM licensing, public cloud images, cloud-native firewall concepts",
  "body": [
   "FortiGate is not only an appliance; the same FortiOS runs as a virtual machine (FortiGate-VM) on hypervisors and in public clouds. The exam expects you to understand how licensing and deployment differ from hardware, and a few cloud-native ideas.",
   "A FortiGate-VM needs a software license rather than coming pre-licensed like an appliance. The license is tied to a virtual model that sets limits such as the number of vCPUs the VM can use; adding more vCPUs than the license allows will not increase throughput. Licenses come in perpetual or subscription forms, and there is a free permanent evaluation VM with tight limits (for example a single vCPU, small RAM, a handful of interfaces, a few policies and routes, low-encryption ciphers only, and no FortiGuard updates), which is what you use to practise without buying anything. In labs you register the VM to FortiCloud and apply the license file.",
   "In public clouds (AWS, Azure, Google Cloud, Oracle Cloud and others) Fortinet publishes ready-made FortiGate-VM images in the cloud marketplace. You can deploy them Bring Your Own License (BYOL), where you supply a license you bought, or on-demand / pay-as-you-go (PAYG), where the license cost is folded into the hourly cloud charge. Deployment uses the cloud's own networking: interfaces map to cloud virtual NICs and subnets, and routing and security groups in the cloud steer traffic to the FortiGate.",
   "Cloud-native firewall concepts differ from an on-premises box. Rather than a physical inline device, the FortiGate-VM sits in a virtual network and traffic is directed to it by cloud route tables. High availability uses cloud constructs (for example updating route tables or moving elastic IPs via SDN connectors) instead of shared MACs. FortiOS SDN connectors let policies reference cloud objects (such as instance tags or security groups) so rules follow workloads that scale up and down automatically. Fortinet also offers FortiFlex, a points-based consumption licensing program for elastic deployments, and FortiGate CNF, a separate managed cloud-native firewall service.",
   "The durable exam points: FortiGate-VM is licensed in software with a vCPU-bound model, clouds offer marketplace images in BYOL or PAYG, and cloud HA and object references rely on cloud/SDN mechanisms rather than the appliance's shared addresses. Do not memorize exact free-trial numbers, which change; know the shape of the limits."
  ],
  "terms": [
   [
    "FortiGate-VM",
    "FortiOS running as a virtual machine on a hypervisor or public cloud, licensed in software."
   ],
   [
    "VM licensing (vCPU-bound)",
    "A license tied to a virtual model that caps usable vCPUs; extra vCPUs beyond the license do not add capacity."
   ],
   [
    "BYOL vs PAYG",
    "Cloud licensing models: Bring Your Own License uses a license you purchased; pay-as-you-go bills the license hourly through the cloud provider."
   ],
   [
    "SDN connector",
    "A FortiOS integration that lets policies reference dynamic cloud objects (tags, security groups) so rules follow scaling workloads."
   ]
  ],
  "example": "A team deploys a FortiGate-VM from the Azure marketplace as PAYG, then uses an SDN connector so a policy referencing an application security group automatically covers new VMs as the app scales out.",
  "tip": "Adding vCPUs beyond what the VM license permits does not increase throughput. In cloud, remember traffic reaches the FortiGate through cloud route tables, and HA uses SDN mechanisms, not shared MACs.",
  "check": [
   [
    "How is a FortiGate-VM licensed compared with an appliance?",
    "It needs a separate software license tied to a virtual model that caps usable vCPUs, rather than shipping pre-licensed like hardware."
   ],
   [
    "What is the difference between BYOL and PAYG in a public cloud?",
    "BYOL uses a license you bought; PAYG bills the license hourly through the cloud provider."
   ],
   [
    "Why does cloud HA not use shared MAC addresses like a hardware cluster?",
    "Public cloud networks do not allow that; HA instead uses cloud constructs such as route-table updates and moving elastic IPs via SDN connectors."
   ]
  ]
 },
 {
  "t": "Diagnostics: `get system performance status`, `diagnose sys top`, conserve mode and av-failopen, `diagnose debug flow`, `diagnose sniffer packet`",
  "body": [
   "When a FortiGate misbehaves, the CLI diagnostic tools tell you whether the problem is resources, policy, routing or the network. Knowing which command to reach for is a heavily tested skill.",
   "For a quick health snapshot, `get system performance status` summarizes CPU usage, memory usage, session counts, network throughput and uptime in one screen. Contrast it with `get system status`, which shows firmware, serial number and operating mode but not live load. To see which processes are consuming CPU and memory right now, `diagnose sys top` lists the busiest processes (like a Unix top); you can spot a runaway process such as the IPS or scanunit engine.",
   "Memory pressure has a specific mechanism. When free memory falls below a red threshold, the FortiGate enters conserve mode to protect itself: it stops accepting new proxy-based inspection sessions and may drop or bypass some work until memory recovers. The `av-failopen` global setting decides what happens to traffic that needs proxy-based antivirus during conserve mode: pass (the default) lets it through uninspected (availability over security), off stops accepting new sessions that need AV scanning (security over availability), and one-shot bypasses AV scanning from the moment conserve mode starts and keeps bypassing it until an administrator changes the setting, even after memory recovers. This is distinct from IPS fail-open, which governs the IPS engine, so read the question carefully.",
   "To understand why a specific session is allowed or dropped, `diagnose debug flow` traces a packet through the FortiGate's logic: route lookup, policy match, NAT and any deny reason. The usual sequence is: `diagnose debug reset`, `diagnose debug flow filter addr <ip>`, optionally `filter port`, `diagnose debug flow show function-name enable`, `diagnose debug flow trace start <n>` to trace n packets, then `diagnose debug enable` to actually print output, and `diagnose debug disable` when done. A missing `diagnose debug enable` is the classic reason no output appears. A key line to recognize is 'Denied by forward policy check (policy 0)', which means no configured policy matched and the implicit deny dropped the traffic.",
   "When you need to see the raw packets on the wire, `diagnose sniffer packet <interface> '<filter>' <verbosity> <count>` captures traffic like tcpdump, letting you confirm whether packets even arrive on an interface and how they leave. Higher verbosity shows headers and payload; you can capture on 'any' interface.",
   "A good troubleshooting order: check resources with performance status and sys top, rule out conserve mode, then use debug flow to see the decision, and sniffer to confirm what is actually on the wire."
  ],
  "terms": [
   [
    "get system performance status",
    "A CLI summary of live CPU, memory, session and throughput load plus uptime."
   ],
   [
    "Conserve mode",
    "A protective state entered when free memory crosses a threshold, stopping new proxy-based inspection until memory recovers."
   ],
   [
    "av-failopen",
    "The global setting deciding whether traffic needing proxy antivirus passes uninspected (pass), is dropped (off), or bypasses AV until an admin resets it (one-shot) during conserve mode."
   ],
   [
    "diagnose debug flow",
    "A trace of how the FortiGate handles a packet, showing route lookup, policy match, NAT and any deny reason."
   ]
  ],
  "example": "No output appears during a flow trace even though the host is sending traffic; the admin realizes they set the filter and started the trace but forgot diagnose debug enable, which is required to print the trace.",
  "tip": "av-failopen governs proxy antivirus in conserve mode; IPS fail-open governs the IPS engine. Do not confuse them. And a flow trace prints nothing until you run diagnose debug enable.",
  "check": [
   [
    "Which command gives a one-screen summary of CPU, memory, sessions and uptime?",
    "get system performance status; get system status shows firmware and serial instead of live load."
   ],
   [
    "During conserve mode, which setting decides whether proxy-AV traffic passes uninspected?",
    "av-failopen (pass/off/one-shot), which is separate from IPS fail-open."
   ],
   [
    "What does 'Denied by forward policy check (policy 0)' in a debug flow mean?",
    "No configured policy matched, so the implicit deny (policy 0) dropped the traffic."
   ]
  ]
 },
 {
  "t": "Firewall policy matching: incoming/outgoing interface, source (address, user, ISDB), destination, service, schedule; top-down first match; implicit deny (policy 0)",
  "body": [
   "Firewall policies are the heart of a FortiGate, and understanding exactly how a session is matched to a policy is the single most tested concept in the firewall domain. A policy is an ordered rule that says: for traffic entering on this interface and leaving on that interface, from these sources to these destinations, using these services during this schedule, take this action (accept or deny) and apply these settings.",
   "The matching criteria are precise. FortiGate matches on the incoming (source) interface and outgoing (destination) interface; the source, which can be an address object, a user or user group, or an Internet Service Database (ISDB) entry; the destination address (or ISDB/VIP); the service (port and protocol); and the schedule (when the policy is active). Security profiles attached to a policy are applied after a match is found, so they never decide which policy matches. Likewise the policy ID is just a label and does not affect order.",
   "Evaluation is top-down, first match wins. FortiGate reads the policy list from the top and uses the first policy whose criteria all match the session; it does not keep looking for a more specific rule, and it does not combine policies. This has a critical consequence: policy order matters. If a broad deny sits above a specific allow, the deny matches first and the allow never runs. The fix is to move the specific policy above the broad one, not to renumber IDs.",
   "At the very bottom of the list sits the implicit deny, shown as policy 0. It matches anything no configured policy matched and drops it, which is why a FortiGate is deny-by-default: traffic you did not explicitly allow is blocked. The implicit deny does not log by default, so to see what it drops you enable logging on it. In a debug flow the phrase 'Denied by forward policy check (policy 0)' is the signature of traffic hitting this implicit deny.",
   "So when troubleshooting 'the allow rule exists but users still cannot connect', check the order above it for a broader match, verify the interfaces, source, destination, service and schedule all line up, and confirm the traffic is not being caught by policy 0.",
   "In a lab you build LAN-to-WAN, DMZ-to-WAN and WAN-to-DMZ policies, then use forward-traffic logs and the policy lookup tool to confirm which policy each test connection hits and prove the first-match behaviour."
  ],
  "terms": [
   [
    "Matching criteria",
    "The fields FortiGate compares to place a session: incoming/outgoing interface, source, destination, service and schedule."
   ],
   [
    "Top-down first match",
    "Policies are evaluated in list order and the first one that matches is used; order, not policy ID, decides."
   ],
   [
    "Implicit deny (policy 0)",
    "The final rule that drops any traffic no policy matched, making the FortiGate deny-by-default; it does not log by default."
   ],
   [
    "Security profile timing",
    "Profiles are applied after a policy matches, so they never influence which policy is selected."
   ]
  ],
  "example": "An allow rule for HR to reach payroll fails because a broad 'deny LAN to server' policy sits above it; moving the specific HR allow above the broad deny fixes it, since the first matching policy wins.",
  "tip": "Policy ID is only a label. When a specific rule is not taking effect, look at its position in the list, not its number, and check whether a broader rule above it matches first.",
  "check": [
   [
    "In what order are firewall policies evaluated and which one applies?",
    "Top-down; the first policy whose criteria all match the session is applied, and evaluation stops there."
   ],
   [
    "What is policy 0 and what does it do?",
    "The implicit deny at the bottom of the list; it drops any traffic no configured policy matched and does not log by default."
   ],
   [
    "A specific allow policy is below a broad deny and never takes effect. What is the fix?",
    "Move the specific allow above the broad deny, because the first match wins; renumbering the ID would not help."
   ]
  ]
 },
 {
  "t": "Address objects and groups, FQDN and geography objects, Internet Service Database (ISDB) entries",
  "body": [
   "Policies reference network endpoints through reusable objects rather than raw addresses typed inline, which keeps rules readable and lets you change a definition in one place. Knowing the object types and when each fits is a steady source of exam points.",
   "The basic address object represents an IP subnet or range: a single host (with a /32 mask), a subnet, or an IP range. You give it a name and reuse it as a source or destination in many policies. Address groups bundle several address objects under one name so a policy can reference the whole group; editing the group changes every policy that uses it.",
   "An FQDN (fully qualified domain name) address object references a name such as update.example.com. The FortiGate resolves the name via DNS and keeps the resulting IPs current, so a policy can follow a service even when its address changes. The catch is that one FQDN object only covers the addresses that name resolves to; a large cloud service published under many hostnames will not be fully covered by a single FQDN, and wildcard FQDNs are broad and depend on DNS behaviour.",
   "A geography (geo) address object represents all IP ranges assigned to a country, using FortiGuard's IP-to-country data. It is useful for coarse rules such as blocking inbound connections from countries you never do business with, but it is far too broad to identify a specific service and can catch cloud-hosted content in unexpected regions.",
   "The Internet Service Database (ISDB) is Fortinet's maintained catalog of well-known internet services, each entry bundling the current IP addresses, protocols and ports for a service such as Microsoft 365, a specific cloud provider, or a category of services. Because FortiGuard keeps ISDB entries updated, using an ISDB object as a policy destination is the clean way to allow or control a service whose address list is large and constantly changing, without maintaining it by hand. This is why, when a scenario asks how to permit Microsoft 365 without tracking its shifting IPs, the answer is the ISDB entry rather than one FQDN or a country object.",
   "In practice you pick the narrowest object that fits: an address object or group for your own subnets and servers, FQDN for a single named host, geography for country-level rules, and ISDB for named public services. In a lab you create address objects for your LAN and DMZ, group them, and use an ISDB destination in an outbound policy."
  ],
  "terms": [
   [
    "Address object / group",
    "A named IP host, subnet or range (object) or a bundle of them (group) reused across policies."
   ],
   [
    "FQDN object",
    "An address object based on a domain name that the FortiGate resolves via DNS and keeps current."
   ],
   [
    "Geography object",
    "An address object covering all IP ranges of a country, based on FortiGuard geolocation data."
   ],
   [
    "Internet Service Database (ISDB)",
    "A FortiGuard-maintained catalog of public services with their current addresses, protocols and ports, usable as a policy source or destination."
   ]
  ],
  "example": "To allow Microsoft 365 without maintaining its long, changing IP list, an admin sets the policy destination to the Microsoft 365 ISDB entry, which FortiGuard keeps updated automatically.",
  "tip": "For a big, changing cloud service, choose the ISDB entry. A single FQDN misses many endpoints and a geography object is far too broad to identify one service.",
  "check": [
   [
    "Which object type best allows a large cloud service with constantly changing IPs?",
    "An ISDB entry, because FortiGuard keeps its addresses and ports up to date automatically."
   ],
   [
    "What is the limitation of using one FQDN object for a big service?",
    "It only covers the addresses that single name resolves to, so it misses the service's many other hostnames and endpoints."
   ],
   [
    "What does a geography address object represent?",
    "All IP ranges assigned to a country per FortiGuard geolocation, useful for country-level rules but too broad to identify a specific service."
   ]
  ]
 },
 {
  "t": "Policy logging, policy lookup tool, policy ID vs sequence, schedules",
  "body": [
   "Beyond writing policies, you need to operate them: confirm which one traffic hits, capture the right logs, understand how policies are identified, and control when they apply. These operational details show up in scenario questions.",
   "Policy logging is set per policy via the Log allowed traffic option: No Log, Security Events (only sessions a security profile acted on), or All Sessions (every accepted session). To have a complete record of accepted connections through a policy, choose All Sessions; Security Events alone will not show ordinary allowed traffic. Denied traffic is handled separately: the implicit deny does not log by default, so enable logging on it to record drops. Logs then appear in the forward-traffic view with the matching policy ID.",
   "The policy lookup tool lets you enter the parameters of a hypothetical session, source interface, source and destination address, service and so on, and asks the FortiGate which policy that session would match. It evaluates the real policy list top-down and highlights the winning policy, so you can prove ordering and troubleshoot 'which rule catches this?' without generating live traffic. Combined with forward-traffic logs, it quickly settles disputes about policy order.",
   "Policy ID versus sequence is a distinction that trips people up. Each policy gets a policy ID when it is created, and moving the policy never changes that number; it is just a stable label used in logs and the CLI. The sequence is the policy's position in the list, which is what actually determines matching order. Reordering policies in the GUI changes their sequence but not their IDs, so a policy with a high ID can still be first in the list and match before lower-ID policies. Always reason about order by sequence, not ID.",
   "Schedules control when a policy is active. A recurring schedule repeats on chosen days of the week and a time range (for example weekdays 12:00 to 13:00), so it is the right tool for 'allow this only during lunch on weekdays'. A one-time schedule is active once over a single start-to-end window and then expires, suited to temporary access such as a contractor's week. Attaching the right schedule to an allow policy enforces time-based access without manual toggling.",
   "In a lab you set a policy to log All Sessions, use the policy lookup tool to confirm which policy a test session matches, and attach a recurring schedule to prove time-based control."
  ],
  "terms": [
   [
    "Policy lookup tool",
    "A GUI tool that takes hypothetical session parameters and reports which policy they would match, using real list order."
   ],
   [
    "Policy ID",
    "A stable label assigned at creation that does not change when the policy is moved; it identifies a policy in logs and CLI but does not set matching order."
   ],
   [
    "Sequence",
    "A policy's position in the list, which is what actually determines top-down matching order."
   ],
   [
    "Recurring vs one-time schedule",
    "Recurring schedules repeat on chosen days and times; one-time schedules are active once over a single window then expire."
   ]
  ],
  "example": "To allow gaming sites only at lunch, an admin attaches a recurring schedule for weekdays 12:00 to 13:00 to the allow policy, so the rule is active only in that window.",
  "tip": "Policy ID is fixed and does not set order; sequence (list position) does. Reordering changes sequence, not IDs, so never reason about matching from the ID number.",
  "check": [
   [
    "What does the policy lookup tool tell you?",
    "Which policy a hypothetical session would match, based on the real top-down policy order."
   ],
   [
    "Does changing a policy's position change its policy ID?",
    "No. Reordering changes the sequence (position and matching order); the policy ID stays the same."
   ],
   [
    "Which schedule type fits 'allow only weekdays 12:00 to 13:00'?",
    "A recurring schedule, which repeats on chosen days and times; a one-time schedule runs only once."
   ]
  ]
 },
 {
  "t": "Source NAT: outgoing interface address, IP pools (overload, one-to-one, fixed port range, port block allocation)",
  "body": [
   "Source NAT (SNAT) rewrites the source address of outbound traffic so internal private addresses become a routable public address. On a FortiGate the simplest form is built into a policy, and larger deployments use IP pools. The exam wants you to choose the right SNAT option for a scenario.",
   "The default SNAT is to enable NAT on the policy and translate using the outgoing interface address. Every internal host leaving through that policy appears to come from the FortiGate's WAN IP, and port address translation (PAT) multiplexes many hosts behind that single IP by giving each session a unique source port. This is the simplest choice when you have one public IP, and it is the right answer to 'many users, one public address'.",
   "IP pools give you more control by translating to a set of addresses instead of the interface IP. An overload pool works like the interface-address method but across a range of public IPs: many internal hosts share the pool's addresses using port translation, so a handful of public IPs can serve hundreds or thousands of users. This is the pool type for 'lots of users sharing a few public IPs'.",
   "A one-to-one pool maps each internal host to its own public address with no port translation. Because there is no PAT, the number of simultaneous users is capped at the number of addresses in the pool: a pool of four addresses means only four hosts can be translated at once. You use one-to-one when a host must always present a specific, unshared public IP.",
   "A fixed port range pool maps internal address ranges to external IPs and a defined port range in a predictable way, which is helpful when you must correlate an internal host to its external port range in logs (useful for compliance and carrier-grade tracking). Port block allocation (PBA) assigns each internal host a contiguous block of ports on a public IP, again for predictable, log-friendly mapping while still sharing addresses; it reduces per-session logging volume compared with pure overload.",
   "Choosing among them: outgoing interface address for one IP and many users; overload to share several IPs among many users; one-to-one when each host needs a dedicated public IP (and you accept the user cap); fixed port range or PBA when you need predictable, auditable source-port mapping. In a lab you enable NAT with the interface address, then create an overload pool and watch the translated source in the traffic log."
  ],
  "terms": [
   [
    "Source NAT (SNAT) / PAT",
    "Rewriting the source address of outbound traffic; port address translation lets many hosts share one public IP by unique source ports."
   ],
   [
    "Overload IP pool",
    "A pool where many internal hosts share the pool's public addresses using port translation."
   ],
   [
    "One-to-one IP pool",
    "A pool mapping each host to its own public address with no port translation, capping concurrent users at the pool size."
   ],
   [
    "Fixed port range / port block allocation",
    "Pool types that map internal hosts to external IPs and predictable port ranges/blocks for auditable logging."
   ]
  ],
  "example": "A company with four public IPs needs 800 users online for outbound browsing, so it uses an overload pool that shares the four addresses via port translation; a one-to-one pool would allow only four users at once.",
  "tip": "One-to-one caps concurrent users at the number of pool addresses because it does not use port translation. For many users on few IPs, always choose overload.",
  "check": [
   [
    "What is the simplest SNAT for many users behind a single public IP?",
    "Enable NAT on the policy using the outgoing interface address, which hides all hosts behind the WAN IP via port translation."
   ],
   [
    "Why does a one-to-one IP pool limit how many hosts can connect?",
    "It maps each host to its own public address with no port translation, so only as many hosts as pool addresses can be translated at once."
   ],
   [
    "Which pool type shares several public IPs among many users?",
    "An overload pool, which uses port translation across the pool's addresses."
   ]
  ]
 },
 {
  "t": "Central SNAT table and when to use it",
  "body": [
   "FortiGate offers two ways to define source NAT. The default is per-policy NAT, where you tick NAT on each firewall policy and choose the outgoing interface address or an IP pool. The alternative is central SNAT, which moves all source-NAT decisions out of the individual policies and into one dedicated, ordered table. Knowing why and when to switch is the exam's focus.",
   "With central SNAT enabled, firewall policies no longer carry a NAT toggle; instead you build entries in the central SNAT table, each specifying the source and destination addresses, the source and destination interfaces, and the translation (outgoing interface address or an IP pool). The table is evaluated top-down like policies, and the first matching entry decides how the source is translated. Destination NAT still uses VIPs, but in central NAT mode VIPs are applied automatically from the DNAT and Virtual IPs table: a firewall policy no longer selects the VIP as its destination and instead references the internal (mapped) address.",
   "The advantage of central SNAT is centralized, granular control. Because SNAT is defined independently of the security policies, you can apply different translations based on both source and destination without duplicating firewall policies, and you can see all NAT behaviour in one place rather than hunting through many policies. This suits complex environments where several outbound paths, IP pools or destination-specific translations are needed and where per-policy NAT would become unwieldy or inconsistent.",
   "The trade-off is that the two models are mutually exclusive and switching has consequences. When you enable central SNAT, the per-policy NAT settings are no longer used, so you must recreate the required translations as table entries or traffic that relied on per-policy NAT will leave untranslated (and likely fail). It also changes where you and any other admin look for NAT, so it is a deliberate architectural choice, not a per-rule tweak.",
   "For the exam, hold these points: central SNAT relocates source NAT from individual policies into a separate ordered table; it is chosen for centralized, destination-aware SNAT control in complex setups; destination NAT still uses VIPs; and per-policy NAT and central SNAT cannot both be in effect at once. If a question says 'we enabled central SNAT', the key change is that SNAT now lives in its own table rather than on each policy.",
   "In a lab, enabling central SNAT and then recreating your outbound translation as a table entry shows both the mechanism and the gotcha that policies stop translating on their own."
  ],
  "terms": [
   [
    "Central SNAT",
    "A mode where all source-NAT rules live in one ordered table instead of on individual firewall policies."
   ],
   [
    "Per-policy NAT",
    "The default mode where each firewall policy carries its own NAT toggle and translation choice."
   ],
   [
    "Central SNAT table order",
    "The top-down evaluation of central SNAT entries, where the first matching entry decides the translation."
   ],
   [
    "DNAT independence",
    "Destination NAT continues to use VIPs regardless of whether central SNAT is enabled."
   ]
  ],
  "example": "An enterprise with several outbound links and destination-specific translations enables central SNAT so all source-NAT rules sit in one ordered table, giving consistent, destination-aware NAT without duplicating firewall policies.",
  "tip": "Central SNAT and per-policy NAT are mutually exclusive. After enabling central SNAT, policies no longer translate on their own; you must recreate translations as table entries or traffic leaves untranslated.",
  "check": [
   [
    "What changes when central SNAT is enabled?",
    "Source NAT moves out of individual policies into a separate, top-down SNAT table; destination NAT still uses VIPs."
   ],
   [
    "Why choose central SNAT?",
    "For centralized, destination-aware source-NAT control in complex environments, with all NAT rules visible in one place."
   ],
   [
    "Can you use per-policy NAT and central SNAT at the same time?",
    "No; they are mutually exclusive, and after enabling central SNAT the per-policy NAT settings are no longer used."
   ]
  ]
 },
 {
  "t": "Destination NAT with VIPs: static NAT, port forwarding, VIP groups",
  "body": [
   "Destination NAT (DNAT) lets outside users reach an internal server by translating a public destination address (and optionally port) to a private one. On FortiGate, DNAT is done with a Virtual IP (VIP) object, and this is one of the most common practical tasks the exam tests.",
   "A VIP maps an external IP/port to an internal (mapped) IP/port. Once created, the VIP is used as the destination in an inbound firewall policy, typically from the WAN interface to the interface where the server lives. The policy also needs the correct service and any security profiles, and it should be scoped to only the ports the server actually uses. The FortiGate rewrites the destination on inbound packets and reverses it on the replies, so from the client's view it is talking to the public address. Importantly, DNAT is configured with the VIP, not with an IP pool or SNAT, which change the source instead.",
   "There are two main VIP flavours. Static NAT (one-to-one VIP) maps the whole external address to the whole internal address for all ports, so the internal host is reachable on the same ports as the external address. Port forwarding maps a specific external port to a specific internal port, for example external TCP 8443 to the server's TCP 443, so you can publish a service on a nonstandard external port or share one public IP across several internal servers by port. Port forwarding rewrites both the address and the port; a firewall service object only matches traffic and never rewrites ports, which is a frequent distractor.",
   "VIP groups bundle several VIPs under one name so a single policy can reference many published services at once, keeping the policy list tidy when you expose multiple servers. A VIP group is used the same way a single VIP is: as the destination of an inbound policy.",
   "Two facts worth internalizing: the inbound policy's destination is the VIP (not the internal IP), and the FortiGate is DNAT-aware, so you do not add a separate static route to the internal host for the return path. When a scenario says 'make internal server X reachable on public IP Y', the answer is a VIP referenced by a WAN-to-internal policy; when it adds 'on a different external port', the answer is a port-forwarding VIP.",
   "In a lab you publish a small web server through a port-forwarding VIP from external 8443 to internal 8080 and test it from the WAN side."
  ],
  "terms": [
   [
    "Virtual IP (VIP)",
    "A FortiGate object that performs destination NAT by mapping an external IP/port to an internal one."
   ],
   [
    "Static NAT VIP",
    "A VIP that maps the entire external address to the internal address for all ports (one-to-one)."
   ],
   [
    "Port forwarding VIP",
    "A VIP that maps a specific external port to a specific internal port, rewriting both address and port."
   ],
   [
    "VIP group",
    "A bundle of VIPs referenced together as the destination of a single inbound policy."
   ]
  ],
  "example": "To publish an internal app that listens on 443 to external users on port 8443, an admin creates a port-forwarding VIP mapping external 8443 to mapped 443 and references it as the destination of a WAN-to-DMZ policy.",
  "tip": "The inbound policy's destination is the VIP itself, not the internal IP. And only a port-forwarding VIP rewrites the port; a service object merely matches traffic and never translates ports.",
  "check": [
   [
    "What object performs destination NAT on a FortiGate, and how is it used?",
    "A VIP; it maps an external address/port to an internal one and is referenced as the destination of an inbound firewall policy."
   ],
   [
    "How do you publish a server that listens on 443 to external port 8443?",
    "Create a port-forwarding VIP mapping external 8443 to mapped 443; a service object cannot rewrite the port."
   ],
   [
    "What is a VIP group for?",
    "Bundling several VIPs so one inbound policy can publish multiple internal servers at once."
   ]
  ]
 },
 {
  "t": "Firewall authentication: local users, LDAP (regular bind), RADIUS and TACACS+ servers, user groups",
  "body": [
   "Firewall authentication lets policies allow or deny traffic based on who the user is, not just their IP address. FortiGate can authenticate users against several kinds of identity stores, and the way you wire them into policies through user groups is a reliable exam topic.",
   "The simplest store is local users, defined directly on the FortiGate with a username and password. Local accounts are fine for a handful of users or lab work but do not scale, since every account is maintained by hand on the box.",
   "For enterprise directories, LDAP integrates FortiGate with Active Directory or other LDAP servers. FortiGate must bind (log in) to the directory to search for users and read their group memberships. Regular bind uses a dedicated service account (a distinguished name and password) so the FortiGate can search the directory, which is what Active Directory normally requires because it rejects anonymous searches. Anonymous bind stores no credentials but cannot usually read AD group memberships, and simple bind authenticates a single known DN and cannot search for groups. So for AD group-based policies, regular bind is the expected choice.",
   "RADIUS and TACACS+ are authentication protocols to external AAA servers. RADIUS is widely used for user authentication and can return group or role attributes; TACACS+ is common for device administration and separates authentication, authorization and accounting. FortiGate can use either as a remote authentication server for firewall users (and for administrators). You define the server (address and shared secret) and then reference it.",
   "User groups are the glue between an identity source and a policy. A firewall user group can contain local users and/or reference remote servers with a group match, for example 'members of the AD group Sales on this LDAP server'. Policies accept user groups as the source (alongside or instead of address objects), so to require that only Sales can use a policy you create a user group tied to the LDAP server and the Sales group DN, then set that group as the policy's source. Policies take user groups, not raw LDAP server entries, which is a common trap.",
   "In a lab you add a Windows or Samba AD as a regular-bind LDAP server, create a user group matching an AD group, and require that group on a policy, confirming that only members can pass."
  ],
  "terms": [
   [
    "Local user",
    "An account defined directly on the FortiGate with its own username and password; simple but does not scale."
   ],
   [
    "LDAP regular bind",
    "Using a service-account DN and password so the FortiGate can search the directory and read group memberships (required by AD)."
   ],
   [
    "RADIUS / TACACS+",
    "External AAA server protocols FortiGate can use to authenticate users and admins; TACACS+ is common for device administration."
   ],
   [
    "User group",
    "A FortiGate object combining local users and/or a remote server group match, referenced as a policy's source to require authentication."
   ]
  ],
  "example": "To let only Active Directory Sales members use a policy, an admin defines the AD as a regular-bind LDAP server, creates a user group matching the Sales group DN, and sets that group as the policy source.",
  "tip": "Policies reference user groups, not LDAP/RADIUS server entries directly. For Active Directory group lookups, choose regular bind, since anonymous and simple bind cannot search group memberships.",
  "check": [
   [
    "Which LDAP bind type lets FortiGate search Active Directory for group memberships?",
    "Regular bind, using a service-account DN and password; anonymous and simple bind cannot search groups."
   ],
   [
    "What do you attach to a policy to require a specific AD group?",
    "A firewall user group that references the LDAP server and the group DN; policies take user groups, not server entries."
   ],
   [
    "Which protocol is commonly used for device administration with separated authentication, authorization and accounting?",
    "TACACS+; RADIUS is more common for general user authentication."
   ]
  ]
 },
 {
  "t": "Active (captive portal) vs passive authentication, authentication timeouts, allowing DNS before login",
  "body": [
   "FortiGate identifies users in two broad ways, active and passive, and the difference decides what the user experiences and what you must configure. This distinction, plus a classic captive-portal gotcha, is frequently tested.",
   "Active authentication prompts the user for credentials. The usual mechanism is a captive portal: when a user's traffic hits a policy that requires authentication and they are not yet identified, the FortiGate intercepts and presents a login page. The user types a username and password, which FortiGate checks against a local, LDAP, RADIUS or TACACS+ source, and once authenticated their traffic is allowed. Active authentication is explicit and works for any user but interrupts them with a prompt.",
   "Passive authentication identifies users without a prompt by learning who is logged on from another source. The main example is FSSO (Fortinet Single Sign-On), which reads Windows domain logon events so the FortiGate already knows which user is behind an IP when their traffic arrives. Passive methods are seamless for the user but depend on that external identity feed.",
   "Authentication timeouts control how long an authenticated session stays valid. FortiGate supports idle and hard timeouts: an idle timeout logs a user out after a period without traffic, while a hard timeout logs them out a fixed time after login regardless of activity. Tuning these balances security (shorter re-authentication) against user annoyance.",
   "The captive-portal gotcha is essential. The login page can only be presented for protocols that carry a browser session the FortiGate can redirect, primarily HTTP and HTTPS (also FTP and Telnet in some cases). But before a browser can even reach a website to be redirected, it must resolve the site's name via DNS, and DNS itself cannot trigger the login page. If the only policy allowing outbound traffic requires authentication, DNS is blocked until login, but login can never happen because name resolution fails first, a deadlock. The fix is to allow DNS in a policy placed above the authentication policy, with no user requirement, so browsers can resolve names and then reach the point where the captive portal appears.",
   "For the exam: active means a prompt (captive portal), passive means learned from elsewhere (FSSO); idle and hard timeouts govern session length; and you must permit DNS before a captive-portal policy. In a lab you require an AD group with captive portal on a policy and add a DNS-allow policy above it, then watch the login page appear only after names resolve."
  ],
  "terms": [
   [
    "Active authentication (captive portal)",
    "Explicitly prompting the user for credentials via a login page before allowing their traffic."
   ],
   [
    "Passive authentication",
    "Identifying users without a prompt by learning logons from another source, typically FSSO."
   ],
   [
    "Idle vs hard timeout",
    "Idle timeout logs a user out after inactivity; hard timeout logs them out a fixed time after login regardless of activity."
   ],
   [
    "DNS-before-login rule",
    "A policy allowing DNS without authentication, placed above the captive-portal policy, so browsers can resolve names and reach the login page."
   ]
  ],
  "example": "Users behind a captive-portal policy never see a login page and browsing fails because DNS is only allowed by that same policy; adding a DNS-allow policy above it, with no user requirement, lets names resolve and the portal appears.",
  "tip": "Captive portals only trigger on HTTP/HTTPS (and FTP/Telnet), and DNS cannot trigger them. Always allow DNS in a policy above the authentication policy or login is impossible.",
  "check": [
   [
    "What is the difference between active and passive authentication?",
    "Active prompts the user for credentials (captive portal); passive identifies them from another source such as FSSO without a prompt."
   ],
   [
    "Why must DNS be allowed before a captive-portal policy?",
    "Browsers must resolve names before reaching a site, and DNS cannot trigger the login page, so without a DNS-allow policy above it login never happens."
   ],
   [
    "What is the difference between an idle and a hard authentication timeout?",
    "Idle logs a user out after inactivity; hard logs them out a fixed time after login regardless of activity."
   ]
  ]
 },
 {
  "t": "FSSO: collector agent, DC agent mode vs polling mode, group filters, `diagnose debug authd fsso list`",
  "body": [
   "Fortinet Single Sign-On (FSSO) is the main passive authentication method for Windows environments. It lets the FortiGate apply user- and group-based policies without prompting anyone, by learning who has logged on to Active Directory and mapping their username and groups to their IP address. Understanding its components and modes is a core exam objective.",
   "At the center is the collector agent, a Windows service that gathers domain logon information, maintains the current list of logged-on users and their groups, and forwards those user-to-IP-to-group mappings to the FortiGate. The FortiGate then uses those mappings so that when traffic arrives from an IP, it already knows the user and their groups.",
   "There are two ways the collector learns about logons. In DC agent mode, a small DC agent is installed on each domain controller; it captures logon events as they happen and pushes them to the collector agent in real time. This is accurate and low-latency but requires installing software on every DC. In polling mode, no agent runs on the DCs; instead the collector agent (or the FortiGate itself, in agentless polling) periodically reads the security event logs of each domain controller remotely. Polling needs no software on the DCs, which pleases Windows teams that forbid extra agents, but it adds delay and load because logons are discovered on a poll interval rather than instantly. Choosing between them is a common scenario: 'no software allowed on DCs' points to polling mode.",
   "Group filters decide which AD groups FSSO actually reports to the FortiGate. Because a directory can contain thousands of groups, FSSO only sends the groups you select in the collector's (or FortiGate's) group filter. If a newly created group's members never match policies, the usual cause is that the group was not added to the group filter, so its membership is never sent. This is a classic troubleshooting item.",
   "To verify what the FortiGate has learned, `diagnose debug authd fsso list` prints the current FSSO logon entries the FortiGate holds: the user, the source IP and the groups. It is your first check when 'user-based policies are not matching', because it shows whether the FortiGate actually sees that user and the expected groups.",
   "In a lab you install the collector agent, choose a mode, add the groups you need to the group filter, and confirm mappings with the diagnose command before requiring an FSSO group on a policy."
  ],
  "terms": [
   [
    "Collector agent",
    "A Windows service that gathers logon data and sends user-to-IP-to-group mappings to the FortiGate."
   ],
   [
    "DC agent mode",
    "An agent on each domain controller that pushes logon events to the collector in real time."
   ],
   [
    "Polling mode",
    "The collector or FortiGate periodically reads DC security event logs remotely, with no software on the DCs but more delay."
   ],
   [
    "Group filter",
    "The selection of AD groups FSSO reports to the FortiGate; groups not selected are never sent."
   ]
  ],
  "example": "A Windows team forbids installing anything on domain controllers, so the admin uses FSSO polling mode, which reads DC security event logs remotely instead of running a DC agent.",
  "tip": "If a new AD group's members never match policies, check the FSSO group filter first, that group is probably not selected, so its membership is never sent to the FortiGate.",
  "check": [
   [
    "What does the collector agent do in FSSO?",
    "It gathers domain logon information and forwards user-to-IP-to-group mappings to the FortiGate."
   ],
   [
    "When would you choose polling mode over DC agent mode?",
    "When you cannot install software on the domain controllers; polling reads their security event logs remotely, at the cost of some delay."
   ],
   [
    "FSSO users from a new group never match policies. What is the likely cause?",
    "The group is not in the FSSO group filter, so its membership is never sent; verify with diagnose debug authd fsso list."
   ]
  ]
 },
 {
  "t": "Two-factor authentication with FortiToken",
  "body": [
   "Two-factor authentication (2FA) strengthens login by requiring something the user knows (a password) plus something they have (a one-time code). On FortiGate, Fortinet's own token system is FortiToken, and knowing how it is assigned and where it applies is a small but reliable exam topic.",
   "A FortiToken generates a time-based one-time password (TOTP), a short numeric code that changes every 30 or 60 seconds. It comes in two forms: FortiToken hardware, a physical keyfob that displays the code, and FortiToken Mobile, a smartphone app that shows the code. Each token is a distinct second factor bound to one account. FortiGate also supports email- and SMS-delivered codes as alternative second factors, but FortiToken is the vendor's dedicated method.",
   "The key operational fact is that FortiToken is assigned per user. You register the token on the FortiGate (mobile tokens are activated against FortiGuard), then enable two-factor authentication on the individual user account and assign that specific token to it. After that, when the user authenticates, they enter their password and then the current code from their token. Assigning tokens per account is what the exam expects, in contrast to distractors like 'enable it only on the admin profile' or 'require longer passwords', neither of which adds a second factor for firewall users.",
   "Two-factor applies wherever the account is used: firewall users authenticating through a captive portal or VPN can be required to present a token, and administrators can be required to present one at management login. So the same mechanism hardens both user access and admin access, assigned account by account.",
   "Why it matters: passwords alone fall to phishing, reuse and guessing. A stolen password is useless without the current token code, so 2FA sharply reduces the risk of account takeover, which is why it is recommended for admins and for any sensitive user access such as VPN.",
   "For the exam, remember: FortiToken (hardware or mobile) provides a TOTP second factor; you assign it per user account and enable two-factor on that account; and it protects both firewall users and administrators. In a lab you would assign a FortiToken Mobile to a test account, enable two-factor, and confirm the login now asks for the code after the password."
  ],
  "terms": [
   [
    "FortiToken",
    "Fortinet's one-time-password token, available as a hardware keyfob or the FortiToken Mobile app, providing a TOTP second factor."
   ],
   [
    "Two-factor authentication (2FA)",
    "Requiring a password plus a second proof (a token code) so a stolen password alone cannot log in."
   ],
   [
    "Per-user assignment",
    "Enabling two-factor on an individual account and binding a specific token to it, rather than a global toggle."
   ],
   [
    "TOTP",
    "A time-based one-time password that changes on a short interval, the code a FortiToken displays."
   ]
  ],
  "example": "To add Fortinet 2FA for VPN users, an admin registers a FortiToken Mobile to each user account and enables two-factor, so each login requires the password plus the current app code.",
  "tip": "FortiToken is assigned per user account, not via an admin profile toggle or a password rule. Enabling two-factor on the account and binding the token is the configured answer.",
  "check": [
   [
    "How do you add Fortinet two-factor authentication for a firewall user?",
    "Enable two-factor on that user account and assign a FortiToken (hardware or mobile) to it."
   ],
   [
    "What kind of code does a FortiToken produce?",
    "A time-based one-time password (TOTP) that changes every 30 or 60 seconds."
   ],
   [
    "Can the same FortiToken mechanism protect administrator logins?",
    "Yes; two-factor with FortiToken can be required for administrators as well as firewall users, assigned per account."
   ]
  ]
 },
 {
  "t": "SSL/SSH inspection: certificate inspection vs deep inspection, CA trust, exemptions, certificate pinning, untrusted certificate handling",
  "body": [
   "Most traffic today is encrypted with TLS, so a firewall that cannot look inside HTTPS is blind to much of what it should filter. FortiGate offers two levels of SSL inspection, and choosing between them, plus handling the certificate side effects, is the most important content-inspection concept on the exam.",
   "Certificate inspection is the light-touch level. It does not decrypt the session; it reads only the parts of the TLS handshake that are already visible, chiefly the Server Name Indication (SNI) and the server's certificate (which carries the hostname). From that it can apply web filtering by category and identify many applications. But because it never sees the encrypted payload, it cannot scan files for viruses, cannot see the full URL path, and cannot enforce fine-grained actions inside an app. It is fast and causes no certificate warnings.",
   "Deep inspection (full SSL inspection) actually decrypts the traffic. The FortiGate acts as a man-in-the-middle: it terminates the client's TLS session, decrypts and inspects the content, then re-encrypts it to the server, presenting the client with a certificate it re-signed using the FortiGate's own certificate authority (CA). This exposes everything, files for antivirus, full URLs, application actions, so it is required for AV, content disarm, detailed application control and URL-path filtering. When AV catches malware over HTTP but misses it over HTTPS, the fix is to switch that policy to deep inspection.",
   "The cost of deep inspection is trust. Because the client now receives a certificate signed by the FortiGate's CA rather than the real site's CA, browsers show warnings unless they trust the FortiGate CA. The proper rollout is to distribute the FortiGate CA (or an enterprise subordinate CA) to all clients via GPO or MDM so the re-signed certificates are trusted silently, not to import each website's certificate.",
   "Two edge cases matter. Exemptions let you skip decryption for chosen categories or addresses, for example never decrypting online banking or health sites for privacy and legal reasons, while still deep-inspecting everything else. Certificate pinning is when an app is hard-coded to accept only its own expected certificate; such an app rejects the FortiGate's re-signed certificate and breaks under deep inspection, so you exempt that app's destinations. FortiGate also has a setting for handling untrusted server certificates (allow, block or ignore) when the real server's certificate is itself invalid.",
   "In a lab you enable deep inspection, import the FortiGate CA into a browser, and compare the site certificate before and after to see the re-signing in action."
  ],
  "terms": [
   [
    "Certificate inspection",
    "SSL inspection that reads only the handshake (SNI and certificate) without decrypting, enabling category and app identification but not payload scanning."
   ],
   [
    "Deep inspection",
    "Full SSL inspection that decrypts, inspects and re-encrypts traffic using the FortiGate CA, required for AV and detailed inspection."
   ],
   [
    "CA trust distribution",
    "Pushing the FortiGate's signing CA to clients (via GPO/MDM) so re-signed certificates are trusted and warnings stop."
   ],
   [
    "Certificate pinning",
    "An app accepting only its own expected certificate, which rejects the FortiGate's re-signed one, requiring an inspection exemption."
   ]
  ],
  "example": "Antivirus flags EICAR over HTTP but not HTTPS because the policy uses certificate inspection; switching to deep inspection lets the FortiGate decrypt the payload and the AV scan catches the file over HTTPS too.",
  "tip": "Only deep inspection can scan payloads (AV, full URLs, in-app actions). Certificate inspection sees only SNI/certificate. And clients must trust the FortiGate CA, or every site throws a warning.",
  "check": [
   [
    "What can certificate inspection do, and what does it miss?",
    "It reads SNI and the certificate for category and app identification but cannot decrypt the payload, so it cannot scan files or see full URLs and in-app actions."
   ],
   [
    "After enabling deep inspection every user sees certificate warnings. What is the fix?",
    "Distribute the FortiGate's signing CA to all clients (GPO or MDM) so the re-signed certificates are trusted."
   ],
   [
    "Why does a certificate-pinned mobile app break under deep inspection?",
    "It accepts only its own expected certificate and rejects the FortiGate's re-signed one; exempt the app's destinations from decryption."
   ]
  ]
 },
 {
  "t": "Inspection modes: flow-based vs proxy-based, set per policy; profile-based vs policy-based NGFW mode",
  "body": [
   "FortiGate can inspect content in two engines, flow-based and proxy-based, and it can be organized in two NGFW styles, profile-based and policy-based. The exam tests both distinctions, and they are independent choices that people often confuse.",
   "Flow-based inspection examines traffic as packets stream through, without holding the whole object. It scans on the fly and buffers as little as possible (for antivirus it typically holds only the last packet until the verdict), so it has lower latency and higher throughput and uses less memory. The trade-off is that some features that need the complete object are limited or unavailable in flow mode.",
   "Proxy-based inspection buffers the entire object (for example a whole file or the full HTTP transaction) before scanning, then forwards it. Because it has the complete content, it supports richer features, notably content disarm and reconstruction (CDR), custom replacement messages and block pages, and more thorough handling, at the cost of more memory, more latency and lower throughput. When a question needs CDR or full replacement messages, that implies proxy mode.",
   "In profile-based NGFW mode (the traditional and default style), the inspection mode is chosen per firewall policy. You can set one policy to flow and another to proxy, mixing them as each workload needs. So the answer to 'where do I pick flow or proxy?' in profile-based mode is: in each firewall policy, not globally and not per interface.",
   "The second, separate distinction is how security features are attached. In profile-based NGFW mode you build security profiles (antivirus, web filter, application control, IPS) and attach them to firewall policies; the policy both allows traffic and carries the profiles. In policy-based NGFW mode, you instead reference applications and URL categories directly inside security policies, while SSL inspection and source/destination NAT are handled in separate policies (consolidated/central). Policy-based mode can feel more like other NGFW vendors, expressing intent as 'allow these apps/categories', but routing and authentication still exist.",
   "Keep the two axes straight: flow versus proxy is the inspection engine (speed versus features), and profile-based versus policy-based is how you express security rules. In profile-based mode the flow/proxy choice lives on each policy. In a lab you toggle a policy between flow and proxy and observe which features (such as CDR or replacement messages) become available."
  ],
  "terms": [
   [
    "Flow-based inspection",
    "Scanning traffic as packets pass with minimal buffering; lower latency and higher throughput but fewer full-object features."
   ],
   [
    "Proxy-based inspection",
    "Buffering the whole object before scanning; supports CDR and replacement messages at higher memory and latency cost."
   ],
   [
    "Profile-based NGFW mode",
    "The default style where security profiles are attached to firewall policies, and inspection mode is set per policy."
   ],
   [
    "Policy-based NGFW mode",
    "A style where applications and URL categories are referenced directly in security policies, with SSL inspection and NAT in separate policies."
   ]
  ],
  "example": "A branch sets its guest-Wi-Fi policy to flow-based for speed but keeps the finance policy proxy-based so it can use content disarm and reconstruction on email attachments; both live on the same FortiGate in profile-based mode.",
  "tip": "Two separate choices: flow vs proxy (engine) and profile-based vs policy-based (rule style). In profile-based mode the inspection mode is chosen per policy, not globally or per interface.",
  "check": [
   [
    "Where is the inspection mode chosen in profile-based NGFW mode?",
    "In each firewall policy, so different policies can use flow or proxy independently."
   ],
   [
    "What can proxy-based inspection do that flow-based cannot?",
    "Buffer the whole object to support features like content disarm and reconstruction and full replacement messages, at higher resource cost."
   ],
   [
    "What changes in policy-based NGFW mode?",
    "Security policies reference applications and URL categories directly, while SSL inspection and NAT are handled in separate policies; routing and authentication still exist."
   ]
  ]
 },
 {
  "t": "Web filtering: FortiGuard categories and actions (allow, monitor, warning, authenticate, block), static URL filter (exempt vs allow), rating errors, overrides",
  "body": [
   "Web filtering controls which websites users may reach, and FortiGate does it mainly through FortiGuard category ratings plus a static URL filter you maintain yourself. Knowing the available actions and the order in which the pieces are checked answers most web-filter questions.",
   "FortiGuard rates websites into categories (such as Social Networking, Finance and Banking, or Malicious Websites). In the web filter profile you assign an action to each category. The main actions are: Allow (permit silently), Monitor (permit but log), Warning (show an interstitial page the user can click through to proceed), Authenticate (require the user to log in, typically as a member of an allowed group, before proceeding), and Block (deny with a block page and no way through). Understanding what the user experiences for each, especially that Warning lets them continue while Block does not, is commonly tested.",
   "The static URL filter is a list you build for specific URLs, patterns or wildcards, and it is checked before the FortiGuard category action. Its actions include Block, Allow, Exempt and Monitor, and the difference between Exempt and Allow is a classic exam point. Exempt skips all remaining web filter (and often other) checks for that URL, letting it through unconditionally. Allow permits the URL at the URL-filter stage but still passes it on to later checks such as the FortiGuard category, which could then block it. So to guarantee one page on an otherwise-blocked category loads, you use Exempt, not Allow.",
   "Rating errors happen when the FortiGate cannot reach FortiGuard to get a category (an outage or connectivity loss). By default unrated or unreachable lookups may be blocked, which can take down all browsing during a FortiGuard outage. The profile setting to allow websites when a rating error occurs lets sites load when a rating cannot be obtained, trading strictness for availability.",
   "Overrides let authorized users temporarily change the filtering for themselves or others, for example a web-filter override that grants a user access to a blocked category for a set time, subject to authentication. This provides controlled exceptions without editing the profile for everyone.",
   "The evaluation order to remember: static URL filter first (Exempt short-circuits everything), then FortiGuard category action. In a lab you block a category, add a static URL entry, and compare Exempt versus Allow while watching the web filter log."
  ],
  "terms": [
   [
    "FortiGuard category action",
    "The per-category behaviour in a web filter profile: Allow, Monitor, Warning, Authenticate or Block."
   ],
   [
    "Warning action",
    "Shows an interstitial page that lets the user choose to continue, unlike Block which gives no option."
   ],
   [
    "Static URL filter (Exempt vs Allow)",
    "A URL list checked before categories; Exempt skips all remaining checks, while Allow still passes the URL to the category check."
   ],
   [
    "Rating error handling",
    "The setting that allows websites when FortiGuard cannot be reached to rate them, instead of blocking them."
   ]
  ],
  "example": "Social Networking is blocked, but marketing needs one company page on a blocked site to load, so the admin adds that URL to the static URL filter with Exempt, which skips the category check; Allow would still be blocked by the category.",
  "tip": "Exempt short-circuits all remaining checks; Allow only passes the URL-filter stage and can still be blocked by the FortiGuard category. Use Exempt to guarantee a page loads.",
  "check": [
   [
    "What does a user see when a category action is set to Warning?",
    "An interstitial warning page that lets them choose to continue, unlike Block which gives no way through."
   ],
   [
    "What is the difference between Exempt and Allow in the static URL filter?",
    "Exempt skips all remaining web filter checks; Allow permits the URL there but still sends it to the FortiGuard category check, which can block it."
   ],
   [
    "How do you keep browsing working during a FortiGuard outage?",
    "Enable the option to allow websites when a rating error occurs, so unreachable lookups load instead of being blocked."
   ]
  ]
 },
 {
  "t": "DNS filtering and safe search",
  "body": [
   "DNS filtering blocks or redirects traffic at the moment a client looks up a domain name, before any connection to the site is made. It is a lightweight complement to web filtering, and its independence from TLS decryption is exactly why the exam likes it.",
   "The mechanism is simple: when a client sends a DNS query, the FortiGate inspects the requested domain, rates it via FortiGuard (the same category system used for web filtering), and applies an action, typically allowing the lookup, blocking it (so the name does not resolve), or redirecting it to a block page. Because the decision is made on the domain in the query, DNS filtering works for any protocol and any application, not just browsers, and it needs no SSL inspection or CA certificate at all. That is its headline advantage over web filtering: it catches malicious or unwanted domains at lookup time without decrypting anything.",
   "This also means DNS filtering can stop threats early. Blocking a known malicious or newly registered domain at the DNS stage prevents the client from ever establishing the connection, which is useful against malware command-and-control and phishing that rely on name resolution. It does have limits: it acts on domains, not file contents or URL paths, so it does not scan downloads and can be bypassed by hard-coded IPs or alternative resolvers unless you also force DNS through the FortiGate.",
   "Safe search is a related control that forces search engines and some video sites into their family-safe mode, filtering explicit results, by adding the provider's safe-search parameters or DNS records to queries and responses. FortiGate can enforce safe search so users cannot simply turn it off in their browser. Because modern search is over HTTPS, enforcing safe search fully can require the DNS-based method or SSL inspection depending on the provider, but the concept the exam wants is that safe search compels the filtered version of search results.",
   "Compared with web filtering, use DNS filtering for broad, protocol-independent domain blocking without decryption, and pair it with web filtering (which sees URLs and, with deep inspection, content) for depth. Enforce safe search when policy requires that search and video results stay family-safe regardless of user settings.",
   "In a lab you enable a DNS filter that blocks a category and turn on safe search, then confirm that blocked domains fail to resolve and that search engines return filtered results."
  ],
  "terms": [
   [
    "DNS filtering",
    "Rating and acting on the domain in a DNS query so bad domains are blocked at lookup time for any protocol, without TLS decryption."
   ],
   [
    "Block at lookup",
    "Preventing name resolution for an unwanted domain so the client never connects to it."
   ],
   [
    "Safe search enforcement",
    "Forcing search engines and some video sites into their family-safe mode so explicit results are filtered regardless of user settings."
   ],
   [
    "Protocol independence",
    "DNS filtering works for any application because it acts on the query, not on decrypted payloads."
   ]
  ],
  "example": "An admin enables a DNS filter that blocks the malicious-website category, so when any application on a client tries to resolve a flagged domain the lookup fails and no connection is ever made, all without SSL inspection.",
  "tip": "DNS filtering's exam-key advantage is that it blocks bad domains at lookup time for any protocol without decryption. It does not scan files, so pair it with web filtering and antivirus for depth.",
  "check": [
   [
    "What is one advantage of DNS filtering over web filtering?",
    "It blocks bad domains at lookup time for any application without needing TLS decryption or a CA certificate."
   ],
   [
    "What does DNS filtering not do?",
    "It does not scan file contents or URL paths; it acts only on the domain in the query."
   ],
   [
    "What does enforcing safe search accomplish?",
    "It forces search engines and some video sites into family-safe mode so explicit results are filtered regardless of the user's own settings."
   ]
  ]
 },
 {
  "t": "Application control: sensors, categories, application overrides, filter overrides, need for deep inspection",
  "body": [
   "Application control identifies and manages traffic by the application generating it rather than by port, using FortiGuard application signatures. This matters because modern apps hop ports, tunnel over HTTP/HTTPS and encrypt, so a port-based rule cannot reliably catch them. When a scenario asks how to stop something like BitTorrent or a specific cloud app, application control is usually the answer.",
   "You configure application control with a sensor (an application control profile) that you attach to a firewall policy. Inside the sensor you set actions against application categories (such as Peer-to-Peer, Video/Audio, Social Media, or Proxy) so you can, for example, block the whole P2P category. Signatures recognize the app from its traffic pattern regardless of port, which is why blocking the P2P category stops BitTorrent even as it changes ports, whereas blocking a single port or web category would miss most of it.",
   "Two override mechanisms give finer control. An application override (a per-application entry) sets an action for one specific signature that differs from its category's action, letting you, for instance, keep Facebook allowed while blocking only the Facebook games signature. A filter override lets you build a rule that selects applications by attributes (category, popularity, technology, risk, vendor) and applies an action to that filtered set. Together these let you allow a platform in general while carving out specific behaviours, or apply broad rules by risk without listing every app.",
   "A crucial dependency is deep inspection. With only certificate inspection, the FortiGate can often see the SNI and identify which application is in use, which is enough to allow or block the app broadly. But actions inside an encrypted app, such as blocking file uploads within a cloud storage service while allowing downloads, live in the encrypted payload and are invisible without decryption. So to enforce in-app actions you must enable deep inspection so the signatures can see inside the session. When application control detects an app but cannot control an action within it under certificate inspection, the fix is deep inspection.",
   "The exam wants three things: application control identifies apps by signature regardless of port; overrides (application and filter) let you handle exceptions and attribute-based selection; and fine-grained, in-app control needs deep inspection.",
   "In a lab you build a sensor that blocks the P2P category, add an application override to block one signature within an otherwise-allowed app, and observe that in-app actions require deep inspection to enforce."
  ],
  "terms": [
   [
    "Application control sensor",
    "A profile of application/category actions attached to a firewall policy that identifies apps by FortiGuard signatures."
   ],
   [
    "Category action",
    "The action applied to a whole application category, such as blocking Peer-to-Peer, effective regardless of port."
   ],
   [
    "Application override",
    "A per-signature rule that sets a different action for one specific application than its category's action."
   ],
   [
    "Filter override",
    "A rule that selects applications by attributes (category, risk, technology, vendor) and applies an action to that set."
   ]
  ],
  "example": "Facebook must stay allowed but Facebook games must be blocked, so the admin adds an application override that blocks only the Facebook games signature while the Social Media category stays allowed.",
  "tip": "Application control identifies apps by signature, so use categories/overrides, not port or web-category rules, to stop things like BitTorrent. Controlling actions inside an encrypted app requires deep inspection.",
  "check": [
   [
    "Why is application control better than a port rule for blocking BitTorrent?",
    "P2P apps change ports and encrypt, so signature-based application control catches them where a single-port or web-category rule would not."
   ],
   [
    "How do you block only one behaviour of an app while keeping the app allowed?",
    "Use an application override on that specific signature (for example block Facebook games) while leaving the category allowed."
   ],
   [
    "Why can't application control block file uploads inside a cloud app under certificate inspection?",
    "In-app actions are in the encrypted payload; deep inspection is needed to decrypt so the signatures can see and act on them."
   ]
  ]
 },
 {
  "t": "Antivirus: flow vs proxy scanning, signature databases, FortiSandbox/cloud sandbox, content disarm and reconstruction (proxy), grayware",
  "body": [
   "Antivirus (AV) scanning inspects files crossing the FortiGate for malware. How it scans (flow or proxy), what it scans against (signatures and sandboxing), and the extra features proxy mode enables are all exam material.",
   "AV runs in either flow or proxy mode. Flow-based AV scans the file as its packets pass, holding only the final packet until it reaches a verdict, which keeps latency low and throughput high. Proxy-based AV buffers the whole file, scans the complete object, and only then forwards it, which uses more memory and adds latency but lets the FortiGate reliably block or replace the file and unlocks extra features. When a scenario needs those extra features or guaranteed blocking of a fully assembled file, that points to proxy mode.",
   "The core detection is signature-based: the FortiGate compares files against FortiGuard antivirus signature databases, which are updated regularly. There are different database levels (for example a normal and an extended set), trading coverage against performance. Signatures catch known malware fast but by definition cannot recognize brand-new, never-seen threats.",
   "To catch unknown malware, files can be sent to a sandbox, FortiSandbox on-premises or a cloud sandbox service such as FortiSandbox Cloud. The sandbox executes the suspicious file in an isolated environment and observes its behaviour, so it can flag zero-day and evasive malware that signatures miss. Sandboxing adds behaviour analysis; it does not decrypt traffic or filter spam, which are common distractors.",
   "Content disarm and reconstruction (CDR) is a proxy-only feature that removes active content, macros, embedded scripts, and other executable elements, from documents and rebuilds a clean, flat version before delivery. It is proactive: rather than deciding whether a macro is malicious, it strips the risk entirely, which is ideal for email attachments. Because it must process the whole file, CDR requires proxy-based inspection.",
   "Grayware refers to unwanted-but-not-clearly-malicious software such as adware, spyware and riskware. FortiGate can detect grayware as a separate option so you can block nuisance software alongside outright malware.",
   "So: flow for speed, proxy for full-object features and CDR; signatures for known threats, sandbox for unknown; CDR strips active content (proxy only); grayware covers nuisance software. In a lab you download the harmless EICAR test file over HTTP and HTTPS under certificate versus deep inspection and compare the AV log results."
  ],
  "terms": [
   [
    "Flow vs proxy AV",
    "Flow scans as packets pass with minimal buffering (fast); proxy buffers the whole file before forwarding (more features, more cost)."
   ],
   [
    "Signature database",
    "FortiGuard-updated malware signatures the FortiGate matches files against; catches known threats but not brand-new ones."
   ],
   [
    "Sandbox (FortiSandbox / cloud)",
    "An isolated environment that runs unknown files to detect malware by behaviour, catching zero-days signatures miss."
   ],
   [
    "Content disarm and reconstruction (CDR)",
    "A proxy-only feature that strips active content from documents and rebuilds a clean file before delivery."
   ]
  ],
  "example": "Office documents in inbound email should arrive without macros, so the admin enables content disarm and reconstruction in a proxy-based antivirus profile, which strips active content and rebuilds each file before delivery.",
  "tip": "CDR and reliable full-file blocking need proxy mode; flow mode is faster but more limited. Signatures catch known malware, and a sandbox is what adds behaviour analysis for unknown files.",
  "check": [
   [
    "How does proxy-based antivirus handle a downloaded file compared with flow-based?",
    "Proxy buffers the whole file, scans it, then forwards it; flow scans as packets pass and holds only the last packet until the verdict."
   ],
   [
    "What does sending files to a sandbox add?",
    "Behaviour analysis of unknown files in an isolated environment, catching new malware that signatures miss."
   ],
   [
    "Which feature strips macros from documents, and what mode does it need?",
    "Content disarm and reconstruction (CDR); it requires proxy-based inspection."
   ]
  ]
 },
 {
  "t": "IPS: sensors and signature filters, rate-based signatures, botnet C&C blocking, IP exemptions, fail-open",
  "body": [
   "An intrusion prevention system (IPS) inspects traffic for attack patterns, such as exploit attempts against known vulnerabilities, and blocks or logs them. FortiGate's IPS is signature-driven and highly tunable, and the exam expects you to configure it precisely rather than turning everything on.",
   "You apply IPS through an IPS sensor attached to a firewall policy. Rather than enabling every signature (which wastes resources and creates noise), you use signature filters inside the sensor to select the signatures that matter: filter by target (server or client), by operating system, by application or protocol, and by severity. To protect Windows servers in a DMZ, for example, you filter for server-target, Windows-OS signatures at the relevant severities, keeping inspection focused and efficient. Each selected group has an action such as block, monitor (pass but log) or default.",
   "Rate-based signatures act on the frequency of an event rather than a single packet, catching behaviours like brute-force login attempts or floods by triggering when a threshold is exceeded over time. They complement per-packet signatures for volumetric or repetitive attacks.",
   "Botnet command-and-control (C&C) blocking uses a FortiGuard-maintained database of known C&C destinations. Enabling it in the IPS sensor blocks outbound connections from your hosts to those known malicious servers, which helps contain an already-infected host by cutting its link to its controller. This is an outbound-focused protection distinct from inbound exploit signatures.",
   "IP exemptions let you exclude specific source/destination address pairs from a particular signature. When a legitimate application between two known hosts trips a signature (a false positive), the targeted fix is to add an IP exemption for just those hosts on that signature, which keeps the signature protecting everyone else. This is far better than disabling the whole sensor or setting everything to monitor, which would remove protection broadly.",
   "IPS fail-open governs what happens when the IPS engine is overloaded or fails. With fail-open enabled, traffic passes uninspected rather than being dropped, favouring availability; with it disabled, traffic is dropped when IPS cannot inspect it, favouring security. This is separate from av-failopen (which covers proxy antivirus in conserve mode), a distinction the exam tests.",
   "In a lab you build a sensor filtered to server targets and a specific OS, enable botnet C&C blocking, and read the IPS log fields to see what matched."
  ],
  "terms": [
   [
    "IPS sensor",
    "A profile of selected signatures and actions attached to a firewall policy to detect and block attacks."
   ],
   [
    "Signature filter",
    "A rule that selects signatures by target, OS, application/protocol and severity so inspection stays focused."
   ],
   [
    "Botnet C&C blocking",
    "An IPS option using FortiGuard's database to block outbound connections to known command-and-control servers."
   ],
   [
    "IPS fail-open",
    "The setting that lets traffic pass uninspected when the IPS engine is overloaded (availability) versus dropping it (security)."
   ]
  ],
  "example": "A legitimate app between two internal hosts keeps tripping one IPS signature, so the admin adds an IP exemption for just those two hosts on that signature, keeping it active for everyone else instead of disabling the sensor.",
  "tip": "Tune IPS with signature filters (target, OS, severity) rather than enabling everything, and use IP exemptions for false positives. Do not confuse IPS fail-open with av-failopen.",
  "check": [
   [
    "How should you tune an IPS sensor for DMZ Windows servers?",
    "Filter signatures by server target and Windows OS (and relevant severities) so inspection is focused, instead of enabling every signature."
   ],
   [
    "What is the most targeted fix for a signature causing a false positive between two known hosts?",
    "Add an IP exemption for those hosts on that signature, keeping it protecting everyone else."
   ],
   [
    "What does IPS fail-open do when enabled?",
    "It lets traffic pass uninspected if the IPS engine is overloaded, favouring availability; disabled, it drops that traffic."
   ]
  ]
 },
 {
  "t": "DoS policies and anomaly thresholds",
  "body": [
   "Denial-of-service (DoS) attacks try to overwhelm a target with traffic or connection attempts. FortiGate DoS policies defend against this by watching for traffic anomalies and enforcing thresholds very early in packet processing, before the normal firewall policy lookup, so a flood can be dropped before it consumes resources.",
   "A DoS policy is defined on an incoming interface and specifies source and destination and service scope, then lists anomaly sensors with thresholds and actions. Each anomaly type watches a particular pattern: for example tcp_syn_flood (too many new TCP SYN packets per second), tcp_port_scan, udp_flood, icmp_flood, and various session-count anomalies. For each, you set a threshold (a rate or count) and an action, typically block or monitor, and often a logging option. When traffic crosses the threshold, the DoS policy acts on the offending traffic.",
   "The defining characteristic for the exam is timing: DoS policies are evaluated before firewall policies and before most inspection, at the ingress of the interface. That early position is what lets them shed a SYN flood or scan cheaply, protecting both the FortiGate and the servers behind it. So when a public web server is hit by a SYN flood and the question asks what limits it before policy lookup, the answer is a DoS policy with an appropriate threshold, not application control, web filtering or an IP pool.",
   "Setting good thresholds is the practical challenge. Too low and you drop legitimate bursts (false positives during normal peaks); too high and an attack slips through. You baseline normal traffic and set thresholds above typical peaks, often starting anomalies in monitor mode to observe rates before switching them to block. Rate-based IPS signatures overlap conceptually with DoS anomalies, but DoS policies are the dedicated, early, threshold-based tool.",
   "DoS policies protect against volumetric and connection-exhaustion attacks originating from many sources or one; for distributed attacks that exceed the device's capacity, upstream or cloud DDoS protection is still needed, but the FortiGate's DoS policy is the on-box control the exam focuses on.",
   "In a lab you add a DoS policy on the WAN interface with a low tcp_syn_flood threshold in monitor mode, generate connection load, and watch the anomaly counters and logs to understand how thresholds trigger."
  ],
  "terms": [
   [
    "DoS policy",
    "A rule evaluated early at an interface ingress that enforces anomaly thresholds to drop or log flood and scan traffic before firewall policy lookup."
   ],
   [
    "Anomaly sensor",
    "A detector for a specific pattern (SYN flood, port scan, UDP/ICMP flood, session count) with a configurable threshold and action."
   ],
   [
    "Threshold",
    "The rate or count at which an anomaly triggers its action; set above normal peaks to avoid false positives."
   ],
   [
    "Early evaluation",
    "DoS policies run before firewall policies and most inspection, letting them shed floods cheaply."
   ]
  ],
  "example": "A public web server is hit by a SYN flood, so the admin adds a DoS policy on the WAN interface with a tcp_syn_flood threshold, which drops the excess SYN packets before they reach firewall policy lookup.",
  "tip": "DoS policies act before firewall policy lookup, which is why they, not application control or IP pools, are the answer to stopping a SYN flood early. Baseline traffic before setting thresholds.",
  "check": [
   [
    "Which feature limits a SYN flood before firewall policy lookup?",
    "A DoS policy with a tcp_syn_flood anomaly threshold, evaluated early at the interface ingress."
   ],
   [
    "Why are DoS policies effective against floods?",
    "They are evaluated before firewall policies and most inspection, so they can drop flood traffic cheaply before it consumes resources."
   ],
   [
    "What is the risk of setting a DoS threshold too low?",
    "Legitimate traffic bursts can exceed it and be dropped, causing false positives; thresholds should sit above normal peaks."
   ]
  ]
 },
 {
  "t": "Security profile logs and troubleshooting (FortiGuard connectivity, `diagnose autoupdate versions`)",
  "body": [
   "Security profiles are only as good as their signatures and their logs. Much content-inspection troubleshooting comes down to two questions: is the FortiGate getting FortiGuard updates, and what do the security logs actually say happened? The exam expects you to know where to look.",
   "Security profile logs (the security or UTM logs) record every action a profile takes: antivirus detections, web filter category blocks, application control matches, IPS hits and DNS filter actions, each with the source, destination, the profile and signature involved, and the action taken. When users report that something was wrongly blocked or that a threat got through, the security log is where you confirm which profile acted and why. Remember that a policy only generates these logs when the relevant profile is attached and logging is enabled, and that seeing an AV or web-filter event requires the traffic to have been inspected (deep inspection for encrypted payloads).",
   "FortiGuard connectivity underpins most profiles: antivirus and IPS signatures, web and DNS category ratings, and application signatures all come from FortiGuard. If the FortiGate cannot reach FortiGuard, signatures go stale and category lookups fail, which shows up as rating errors in web filtering, missed detections, or a Security Fabric/FortiGuard status warning. During evaluation on the free trial VM there are no FortiGuard updates at all, so limited detection is expected there.",
   "The command `diagnose autoupdate versions` reports the current version and update status of each FortiGuard-served database on the FortiGate, antivirus, IPS and others, along with when each was last updated and whether contract/entitlement is valid. It is the go-to check for 'are my signatures current and is FortiGuard reachable?'. If versions are old or show as not updated, you investigate connectivity (DNS, the FortiGuard servers, the update schedule) and licensing. Related commands and the FortiGuard status page in the GUI show reachability and license status.",
   "A sensible troubleshooting flow: read the security logs to see what a profile did (or did not do); if detection seems stale or ratings fail, run `diagnose autoupdate versions` to check signature currency and FortiGuard connectivity; then verify the license/contract and the update path. Keeping signatures fresh and confirming logging is the difference between a profile that protects and one that only appears to.",
   "In a lab you generate an event that a profile should log, read it in the security log, and run `diagnose autoupdate versions` to see database versions and update status."
  ],
  "terms": [
   [
    "Security (UTM) log",
    "The log recording security-profile actions (AV, web filter, application control, IPS, DNS) with source, destination, signature and action."
   ],
   [
    "FortiGuard connectivity",
    "The FortiGate's ability to reach FortiGuard for signature and rating updates, which most security profiles depend on."
   ],
   [
    "diagnose autoupdate versions",
    "A CLI command showing each FortiGuard database's version, last update time and entitlement status."
   ],
   [
    "Rating error",
    "A web-filter symptom that appears when FortiGuard cannot be reached to categorize a site."
   ]
  ],
  "example": "Detection seems stale and web filtering throws rating errors, so the admin runs diagnose autoupdate versions, sees the antivirus and IPS databases have not updated, and traces the cause to blocked FortiGuard connectivity and an expired contract.",
  "tip": "When signatures seem out of date or ratings fail, run diagnose autoupdate versions to check database currency and FortiGuard reachability. On the free trial VM, no FortiGuard updates is expected.",
  "check": [
   [
    "Which command shows whether FortiGuard signature databases are current?",
    "diagnose autoupdate versions, which lists each database's version, last update time and entitlement status."
   ],
   [
    "Where do you confirm which security profile blocked or allowed a given session?",
    "In the security (UTM) log, which records each profile's action with source, destination, signature and result."
   ],
   [
    "What often causes web-filter rating errors?",
    "The FortiGate cannot reach FortiGuard to categorize sites, so lookups fail; check FortiGuard connectivity and licensing."
   ]
  ]
 },
 {
  "t": "Route lookup order: policy routes, then the routing table (longest match, distance, priority)",
  "body": [
   "Before a FortiGate can apply a firewall policy, it must decide where a packet should go. That routing decision follows a strict order, and knowing it explains many 'why did traffic take that path?' questions on the exam.",
   "The first thing checked is policy routes (also called policy-based routes or PBR). A policy route matches on criteria such as incoming interface, source and destination address, protocol and port, and if it matches, it forces the packet out a specified interface or gateway regardless of the normal routing table. Policy routes are evaluated top-down, and the first match wins. Because they come first, a policy route overrides the routing table for the traffic it matches, which is how you steer specific traffic (say, a subnet's web traffic out a particular link) independently of destination-based routing.",
   "If no policy route matches, the FortiGate consults the routing table (the active routes). Here selection follows three tie-breakers in order. First, longest prefix match: the most specific route to the destination wins, so a /24 beats a /16 that also covers the address, and a /32 host route beats both. This is fundamental, specificity always trumps the other factors.",
   "Second, among routes of equal prefix length, the lowest administrative distance wins. Administrative distance expresses trust in a route's source (for example, a directly connected route is more trusted than a static route, which is more trusted than a learned dynamic route). Only the lowest-distance route for a given prefix is installed as active; higher-distance routes wait in the routing database as backups.",
   "Third, when routes have the same prefix and the same distance, priority breaks the tie for static routes: the route with the lower priority value is preferred, though both remain in the table. If prefix, distance and priority are all equal, the result is equal-cost multipath (ECMP), and traffic is shared across the routes.",
   "So the full order is: policy routes first; then the routing table by longest match, then lowest distance, then lowest priority, then ECMP. Keeping this sequence straight lets you predict the chosen path and diagnose surprises. In a lab, a debug flow shows the route lookup step, letting you see exactly which route the FortiGate picked and why."
  ],
  "terms": [
   [
    "Policy route (PBR)",
    "A rule matched before the routing table that forces matching traffic out a specified interface/gateway, overriding destination-based routing."
   ],
   [
    "Longest prefix match",
    "The routing rule that the most specific (longest mask) route to a destination is preferred over less specific ones."
   ],
   [
    "Administrative distance",
    "A measure of trust in a route's source; among equal-prefix routes the lowest distance is installed as active."
   ],
   [
    "Priority (static)",
    "A tie-breaker among equal-prefix, equal-distance routes; the lower value is preferred while both stay in the table."
   ]
  ],
  "example": "A branch steers all guest-subnet web traffic out the broadband link with a policy route, so even though the routing table's default points to MPLS, the matching guest traffic follows the policy route because policy routes are checked first.",
  "tip": "Policy routes are evaluated before the routing table. Within the table the order is longest match, then distance, then priority. Specificity (prefix length) always wins before distance.",
  "check": [
   [
    "In what order does a FortiGate make its routing decision?",
    "Policy routes first; if none match, the routing table by longest prefix match, then lowest administrative distance, then lowest priority, then ECMP."
   ],
   [
    "Which wins: a more specific route with a higher distance or a less specific route with a lower distance?",
    "The more specific route; longest prefix match is applied before administrative distance."
   ],
   [
    "What happens when routes have equal prefix, distance and priority?",
    "They form equal-cost multipath (ECMP) and traffic is shared across them."
   ]
  ]
 },
 {
  "t": "Static routes: administrative distance, priority, ECMP and load-balancing methods",
  "body": [
   "Static routes are manually configured paths, and on FortiGate their behaviour is governed by administrative distance and priority, two settings that decide which routes are active and which are preferred. Mastering how they interact is essential for the routing domain and for VPN and SD-WAN failover.",
   "Administrative distance (AD) determines whether a route is installed in the active routing table at all. For two routes to the same destination with different distances, only the lower-distance route becomes active; the higher-distance one is kept in the routing database as a standby and is promoted only if the active route disappears. This is exactly how you build a floating static route: give the backup a higher distance so it stays out of the table until the primary fails. Two default routes with distances 10 and 20 mean only the distance-10 route forwards traffic.",
   "Priority, by contrast, applies among routes that have the same distance. Routes with equal distance are all installed in the active table, and the one with the lower priority value is preferred for forwarding, while the others remain available. Because the backup route is still in the table, it can serve reverse-path-forwarding checks and be used immediately if the preferred one becomes unreachable. So two default routes both at distance 10 with priorities 0 and 5 are both active, and the priority-0 route is used.",
   "The distinction the exam loves: distance decides presence in the table (one active, others standby), priority decides preference among those present (all active, lowest preferred). Change distance to make a route a cold backup; change priority to keep both hot with one preferred.",
   "When routes to the same destination share both the same distance and the same priority, they form equal-cost multipath (ECMP), and the FortiGate load-balances traffic across them. FortiGate offers several ECMP load-balancing methods: source IP based (the default, sessions from the same source use the same path, preserving session affinity), source-destination IP based, and weighted or spillover/usage-based methods on some configurations. The default source-IP method keeps a client's sessions on one link, which avoids breaking stateful sessions that per-packet balancing would disrupt.",
   "In a lab you add two default routes with distances 10 and 20 and confirm only one is active, then set equal distance with different priorities and confirm both appear with one preferred, watching the routing table each time."
  ],
  "terms": [
   [
    "Administrative distance",
    "Controls whether a static route is installed as active; among equal-prefix routes only the lowest distance is active, others wait as standby."
   ],
   [
    "Priority",
    "Among equal-distance routes (all active), the lower priority value is preferred for forwarding while the others stay usable."
   ],
   [
    "Floating static route",
    "A backup static route given a higher distance so it stays out of the table until the primary route fails."
   ],
   [
    "ECMP load-balancing method",
    "How traffic is shared across equal-distance, equal-priority routes; the default is source-IP based to keep session affinity."
   ]
  ],
  "example": "A branch sets its MPLS default route to distance 10 and its broadband default route to distance 20, so broadband stays out of the routing table entirely until the MPLS route drops, giving clean primary/backup failover.",
  "tip": "Distance decides which routes are in the table (one active); priority decides preference among routes already in the table (all active). Use distance for a cold backup, priority for a hot standby.",
  "check": [
   [
    "Two default routes have distances 10 and 20. Which forwards traffic and where is the other?",
    "The distance-10 route forwards; the distance-20 route stays inactive in the routing database until the first is removed."
   ],
   [
    "Two default routes share distance 10 with priorities 0 and 5. What happens?",
    "Both are installed in the active table and the priority-0 route is preferred; the other remains usable."
   ],
   [
    "What is the default ECMP load-balancing method and why?",
    "Source-IP based, so all sessions from one source use the same path, preserving session affinity that per-packet balancing would break."
   ]
  ]
 },
 {
  "t": "Routing table vs routing database: `get router info routing-table all` and `database`",
  "body": [
   "FortiGate keeps two related but distinct views of routing: the routing table (what is actively used to forward) and the routing database (everything known, active or not). The exam tests the difference and the commands that show each, because troubleshooting often hinges on seeing routes that are not currently active.",
   "The routing table, sometimes called the routing information base (RIB) or the active routing table, holds only the routes the FortiGate is actually using to forward traffic right now: the winners of the selection process (longest match, lowest distance, then priority/ECMP). If a route is not the best for its prefix, it does not appear here. The command `get router info routing-table all` displays this active table, and it is what you check to answer 'how is traffic to this destination being forwarded?'.",
   "The routing database holds all candidate routes the FortiGate knows about, whether or not they are active. This includes routes that lost selection, such as a higher-distance floating backup default route, or routes learned from a source that is currently less preferred. The command `get router info routing-table database` shows this fuller list, marking which entries are active and which are inactive/standby.",
   "The practical value is diagnosing standby and backup routes. If you configured a backup default route with a higher distance and want to confirm it exists and is ready, it will not show in `routing-table all` (because it is not active) but will show in the `database` view as an inactive route. Likewise, when troubleshooting failover, you check that the intended backup is present in the database so it can be promoted when the primary drops. Seeing a route in the database but not the active table is normal and expected for backups.",
   "A simple rule: use `routing-table all` to see what is being used, and `database` to see everything the FortiGate could use. When a question asks which command reveals inactive or backup routes as well as active ones, the answer is the routing-table database.",
   "In a lab you add two default routes with different distances, run `get router info routing-table all` to see only the active one, then run the `database` version to confirm the standby is present and ready, which makes the two-view model concrete."
  ],
  "terms": [
   [
    "Routing table (RIB)",
    "The active routes currently used to forward traffic; shown by get router info routing-table all."
   ],
   [
    "Routing database",
    "All candidate routes the FortiGate knows, active and inactive; shown by get router info routing-table database."
   ],
   [
    "Active vs inactive route",
    "An active route is installed and forwarding; an inactive route (for example a higher-distance backup) waits in the database."
   ],
   [
    "Standby/backup route",
    "A route (often a floating static route) that stays in the database until the active route is removed."
   ]
  ],
  "example": "An admin configures a distance-20 backup default route but does not see it in get router info routing-table all; checking get router info routing-table database confirms it is present as an inactive route, ready to take over.",
  "tip": "Backup and higher-distance routes appear only in the database view, not the active routing table. Use routing-table all for active routes and the database keyword for everything known.",
  "check": [
   [
    "Which command shows only the routes currently used to forward traffic?",
    "get router info routing-table all, which displays the active routing table."
   ],
   [
    "Where do you look to confirm an inactive backup route exists?",
    "get router info routing-table database, which lists all known routes including inactive/standby ones."
   ],
   [
    "Why might a configured route not appear in routing-table all?",
    "Because it lost route selection (for example a higher-distance backup) and is inactive; it will still show in the database view."
   ]
  ]
 },
 {
  "t": "Reverse path forwarding (RPF) check",
  "body": [
   "Reverse path forwarding (RPF), also called the anti-spoofing check, verifies that traffic arriving on an interface has a plausible return path. It is a security control built into the FortiGate's packet processing, and it is a common, sometimes surprising, cause of dropped traffic that the exam expects you to recognize.",
   "The idea: when a packet arrives, the FortiGate looks at its source address and asks, 'Do I have a route back to this source, and would that route send replies out the same interface the packet came in on?' If the FortiGate has no route back toward the source via the incoming interface, the packet is dropped as a potential spoof. This stops an attacker from forging a source address that the firewall could not legitimately reach, and it keeps the network's routing consistent.",
   "FortiGate supports two RPF modes. Feasible-path RPF, the default (sometimes called loose), accepts the packet if any active route back to the source exists through the ingress interface, even if it is not the best route (helpful with multiple paths). Strict RPF (`set strict-src-check enable` under `config system settings`) requires that the best route back to the source uses the same interface the packet arrived on. RPF can also be turned off per interface with `set src-check disable`. The key concept for the exam is that RPF ties acceptance to the existence of a return route on the ingress interface.",
   "The classic symptom: traffic from a subnet is dropped and a debug flow shows a reverse path check failure, even though a firewall policy would allow it. The cause is that the FortiGate has no route back to that source subnet via the interface where the traffic arrived, often after an asymmetric routing change, a new subnet that lacks a route, or a link the FortiGate does not have a route pointing back through. Adding a route for that source subnet via the incoming interface resolves it.",
   "This is why RPF failures frequently appear after network changes: a new inbound path exists but the corresponding return route was never added, so the check drops the traffic. Recognizing the debug message and knowing the fix, add the missing return route, is the exam-ready takeaway.",
   "In a lab you can trigger an RPF drop by sending traffic from a subnet the FortiGate has no route back to, read the reverse-path failure in the debug flow, then add the route and watch the traffic pass."
  ],
  "terms": [
   [
    "Reverse path forwarding (RPF)",
    "An anti-spoofing check that drops packets whose source has no valid return route via the interface they arrived on."
   ],
   [
    "Strict RPF",
    "A mode requiring the best return route to the source to use the same interface the packet arrived on."
   ],
   [
    "Feasible-path (loose) RPF",
    "The default, more permissive mode that accepts the packet if any active return route to the source exists via the ingress interface, even if it is not the best route."
   ],
   [
    "Asymmetric routing",
    "A situation where traffic takes different paths each way, a common trigger for RPF drops when the return route is missing."
   ]
  ],
  "example": "Traffic from 172.20.5.0/24 arriving on port3 is dropped and the debug flow shows a reverse path check failure; the FortiGate has no route back to that subnet via port3, so adding one fixes it.",
  "tip": "An RPF (reverse path) failure in a debug flow almost always means a missing return route for the source subnet via the ingress interface, common after asymmetric routing changes. Add the route.",
  "check": [
   [
    "What does the reverse path forwarding check do?",
    "It drops packets whose source address has no valid return route via the interface they arrived on, blocking spoofed traffic."
   ],
   [
    "Traffic is dropped with a reverse path check failure though a policy allows it. What is the likely cause and fix?",
    "The FortiGate lacks a route back to the source subnet via the incoming interface; add that return route."
   ],
   [
    "What is the difference between strict and loose RPF?",
    "Strict requires the best return route to use the ingress interface; the default feasible-path (loose) mode only requires that some active return route to the source exists via the ingress interface."
   ]
  ]
 },
 {
  "t": "Link health monitors and blackhole routes",
  "body": [
   "A static route on its own only disappears if its interface goes physically down; it stays in the table even when the path beyond the next hop is broken. Two features fix the gaps this creates: link health monitors detect a dead path and remove its route, and blackhole routes safely drop traffic that would otherwise leak to the wrong place. Both are staples of resilient FortiGate design and appear regularly on the exam.",
   "A link health monitor (also called a link monitor or SLA link monitor) actively probes a target through a specific interface, using ping, HTTP, DNS or TCP, and watches for responses. If the probes fail (latency, packet loss or no reply beyond configured thresholds), the FortiGate concludes the path is dead and can withdraw the associated static route from the routing table, update its status, and thereby let a backup route take over. This solves the core problem that a next-hop gateway can be reachable at layer 2 while the path beyond it is broken: without a health monitor the route lingers and traffic black-holes silently. So to remove a primary default route when the ISP gateway stops answering, you attach a link health monitor to that WAN interface with a target beyond the gateway.",
   "The link monitor's decision can be tied to specific routes so that only the affected routes are pulled when the probe fails, letting failover happen automatically without operator action. This is the mechanism behind dual-ISP failover for plain static routing (and it underlies SD-WAN performance SLAs, which extend the idea).",
   "A blackhole route is a route whose action is to silently discard matching traffic (next hop is the null/blackhole interface). You give it a high administrative distance so it is normally inactive, sitting behind the real route. Its job is to catch traffic when the real route disappears. The classic use is with IPsec tunnels: add a blackhole route for the private subnets reachable over the tunnel, at a higher distance than the tunnel route. While the tunnel is up, the specific tunnel route wins and traffic flows; if the tunnel drops, its route is removed and, instead of the traffic following the default route out to the Internet in the clear, the blackhole route drops it. This prevents sensitive internal traffic from leaking and avoids confusing routing loops.",
   "Together: link health monitors provide detection and automatic route withdrawal, and blackhole routes provide safe disposal of traffic when a route is gone. In a lab you add a link health monitor to the primary WAN, block the probe target, and watch the route drop from the table."
  ],
  "terms": [
   [
    "Link health monitor",
    "An active probe (ping, HTTP, DNS, TCP) through an interface that withdraws the associated route when the path fails."
   ],
   [
    "Route withdrawal on failure",
    "Removing a static route from the table when its health monitor detects a dead path, letting a backup take over."
   ],
   [
    "Blackhole route",
    "A route that silently discards matching traffic, usually given a high distance so it activates only when the real route is gone."
   ],
   [
    "Traffic leak prevention",
    "Using a blackhole route so that when a tunnel/route drops, sensitive traffic is dropped instead of following the default route out."
   ]
  ],
  "example": "A branch adds a link health monitor pinging a target beyond its primary ISP gateway; when the ISP path fails the probes stop, the FortiGate withdraws the primary default route, and the backup ISP route takes over automatically.",
  "tip": "A link monitor is what detects a dead path and removes the route, since a route otherwise stays up while its interface is up. Blackhole routes (high distance) stop traffic leaking when a tunnel drops.",
  "check": [
   [
    "Why add a link health monitor instead of relying on the static route alone?",
    "A static route stays in the table while its interface is up even if the path beyond the gateway is broken; a health monitor probes the path and withdraws the route on failure so a backup takes over."
   ],
   [
    "Why add a blackhole route for private subnets on a site with IPsec tunnels?",
    "So that if a tunnel route disappears, the traffic is silently dropped instead of following the default route out to the Internet in the clear."
   ],
   [
    "What distance should a blackhole backup route have relative to the real route?",
    "A higher distance, so it stays inactive while the real route is present and only activates when that route is removed."
   ]
  ]
 },
 {
  "t": "SD-WAN members and zones, and routes that point to the zone",
  "body": [
   "Software-defined WAN (SD-WAN) on FortiGate lets you treat several WAN links as one intelligent bundle that steers traffic based on link quality and rules rather than static routing alone. The building blocks are members and zones, and a routing detail that trips many people up: SD-WAN still needs a route to work.",
   "An SD-WAN member is a participating interface (for example wan1, wan2, or an IPsec tunnel interface) added to SD-WAN with per-member settings such as its gateway and cost. Members are the physical or logical paths SD-WAN can choose among. You add each WAN link as a member so SD-WAN can measure and use it.",
   "An SD-WAN zone groups members together. Zones let you organize members (for example an 'internet' zone with two broadband links and an 'overlay' zone with VPN tunnels) and, importantly, they are what firewall policies and routes reference. Once an interface becomes an SD-WAN member, you no longer select that individual interface directly in a firewall policy, you select the SD-WAN zone that contains it. This is a frequent exam gotcha: after adding wan1 to SD-WAN you cannot pick wan1 in a policy anymore; you pick the zone.",
   "The routing piece is the one people forget. SD-WAN rules do not by themselves inject routes; they only steer traffic that the routing table has already decided to send toward SD-WAN. So you must add a static route (typically a default route) that points to the SD-WAN zone. Without that route, even a perfectly configured set of members, SLAs and rules will not carry traffic, because nothing tells the routing table to hand the traffic to SD-WAN. When someone deletes the old per-interface default routes and forgets to add a zone default route, Internet access fails despite SD-WAN being 'configured'.",
   "So the minimum working set is: interfaces added as members, members grouped in a zone, a static (default) route pointing to the zone, firewall policies using the zone, then performance SLAs and rules on top. The route makes traffic eligible for SD-WAN; the rules and SLAs then choose among members.",
   "In a lab you put two WAN interfaces into an SD-WAN zone, add a default route pointing at the zone, and reference the zone in a firewall policy, confirming traffic flows before you add SLAs and rules."
  ],
  "terms": [
   [
    "SD-WAN member",
    "A WAN interface or tunnel added to SD-WAN as a selectable path, with per-member settings like gateway and cost."
   ],
   [
    "SD-WAN zone",
    "A group of members that firewall policies and routes reference instead of the individual interfaces."
   ],
   [
    "Zone reference in policy",
    "After an interface becomes a member, policies select the SD-WAN zone, not the interface directly."
   ],
   [
    "Route to the zone",
    "A static (usually default) route pointing at the SD-WAN zone, required so the routing table hands traffic to SD-WAN."
   ]
  ],
  "example": "After adding wan1 and wan2 to an SD-WAN zone, an admin cannot select wan1 in a firewall policy and Internet access fails; referencing the SD-WAN zone in the policy and adding a default route to the zone restores it.",
  "tip": "Two SD-WAN gotchas: policies must reference the zone (not the member interface), and you must add a static default route pointing to the zone, or SD-WAN rules have no traffic to steer.",
  "check": [
   [
    "After adding an interface to SD-WAN, what must a firewall policy reference?",
    "The SD-WAN zone that contains the member, not the individual interface, which can no longer be selected directly."
   ],
   [
    "Why does SD-WAN still need a static route to the zone?",
    "SD-WAN rules only steer traffic the routing table already sends to SD-WAN; a route pointing at the zone is what makes traffic eligible."
   ],
   [
    "What is the minimum set of pieces for working SD-WAN?",
    "Members in a zone, a static route to the zone, policies using the zone, plus performance SLAs and rules."
   ]
  ]
 },
 {
  "t": "Performance SLAs: probes, latency, jitter, packet loss, SLA targets",
  "body": [
   "Performance SLAs (service-level agreements) are how SD-WAN measures each link so it can make quality-based decisions. Rather than guessing which WAN is healthy, the FortiGate continuously probes each member and compares the results against targets. Understanding what is measured and how targets work is central to the SD-WAN part of the exam.",
   "A performance SLA sends probes through each SD-WAN member to a probe server (a reachable target such as a public DNS server, a server at the data center, or a service across a VPN overlay). Probe protocols include ping (ICMP), HTTP, DNS, TCP and others; you pick one that the target answers reliably. The probes run on an interval, and from the replies the FortiGate computes three quality metrics per member: latency (round-trip delay), jitter (variation in delay between probes), and packet loss (the percentage of probes that got no reply). These three numbers describe how good each path currently is, and they are exactly what SD-WAN rules consult.",
   "SLA targets turn raw measurements into a pass/fail judgment. In the performance SLA you define one or more SLA targets that set thresholds, for example latency under 150 ms, jitter under 30 ms, and packet loss under 2 percent. A member meets the SLA when its measurements are within all the target thresholds and fails when any threshold is exceeded. Rules that reference an SLA (such as lowest cost (SLA) or maximize bandwidth (SLA)) then act only on members that currently meet the target, moving traffic off a member the moment it falls out of SLA.",
   "This is the engine behind link selection and failover: a link that develops high loss or latency fails its SLA and traffic shifts to members still meeting it, without any static-route change. It is more responsive than a plain link monitor because it reacts to quality degradation, not just total failure. You can also tie route removal to SLA state so a link dropping out of SLA behaves like a failed link.",
   "Sensible design points: choose a probe target that truly represents the path's destination (probing the local gateway does not reveal Internet-side loss), set targets to your application's needs (voice tolerates little jitter/loss, bulk transfer tolerates more), and remember that the SLA only measures, the rules decide what to do with the result.",
   "In a lab you add a ping performance SLA to a probe server on each member, then run `diagnose sys sdwan health-check` to see the live latency, jitter and loss and whether each member meets the target."
  ],
  "terms": [
   [
    "Performance SLA",
    "An SD-WAN health check that probes each member and measures latency, jitter and packet loss against targets."
   ],
   [
    "Probe / probe server",
    "The periodic test (ping, HTTP, DNS, TCP) sent to a reachable target to measure a member's quality."
   ],
   [
    "Latency, jitter, packet loss",
    "The three measured metrics: round-trip delay, variation in delay, and percentage of lost probes."
   ],
   [
    "SLA target",
    "Threshold values (for example max latency/jitter/loss) that decide whether a member currently meets the SLA."
   ]
  ],
  "example": "For voice traffic, an admin sets a performance SLA target of latency under 150 ms, jitter under 30 ms and loss under 1 percent; when a broadband link's jitter spikes past the target it fails the SLA and voice shifts to a member still meeting it.",
  "tip": "Probe a target that represents the real destination, not the local gateway, or the SLA will miss Internet-side loss. The SLA only measures; SD-WAN rules act on which members meet the target.",
  "check": [
   [
    "What three metrics does a performance SLA measure?",
    "Latency (round-trip delay), jitter (variation in delay) and packet loss (percentage of unanswered probes)."
   ],
   [
    "What does an SLA target do?",
    "It sets threshold values a member's measurements must stay within to meet the SLA; exceeding any threshold means the member fails the SLA."
   ],
   [
    "Why probe a target beyond the local gateway?",
    "So the SLA reflects the true path quality to the destination; probing only the local gateway would miss loss and latency further along."
   ]
  ]
 },
 {
  "t": "SD-WAN rules: manual, best quality, lowest cost (SLA), maximize bandwidth (SLA); implicit rule",
  "body": [
   "SD-WAN rules (also called SD-WAN services) decide which member carries a given class of traffic, using the measurements from performance SLAs. Each rule matches traffic (by source, destination, application, or ISDB) and applies a strategy for choosing among the eligible members. Knowing the four strategies and the implicit rule is core exam material.",
   "Manual mode assigns matching traffic to specific members in a chosen order, ignoring SLA measurements. You use it when you want deterministic control, for example 'always send this traffic out MPLS first, fall back to broadband', regardless of measured quality. It is simple but does not react to link degradation on its own.",
   "Best quality selects the member with the best measured value of a chosen metric, latency, jitter, packet loss, or bandwidth. It continuously moves traffic to whichever link currently scores best on that metric. This is ideal when you always want the objectively best path (for example voice that must use the lowest-jitter link), but it can flap traffic between links when their quality is close and can move traffic even when the current link is perfectly adequate.",
   "Lowest cost (SLA) picks the cheapest member (by the members' configured cost) among those that currently meet the SLA target. It only moves traffic off the cheap link when that link fails the SLA, then chooses the next-cheapest member that still meets it. This is the strategy for 'use cheap broadband while it is good enough, and only move to expensive MPLS when broadband fails the SLA', maximizing cost efficiency while guaranteeing a quality floor. Unlike best quality, it does not chase marginal improvements.",
   "Maximize bandwidth (SLA), also called load balancing, spreads traffic across all members that currently meet the SLA, using them in parallel to increase total throughput. It suits bulk or aggregate traffic where you want to use every acceptable link at once rather than pick one.",
   "Finally, the implicit rule is the catch-all at the bottom of the SD-WAN rule list: any traffic that matches no explicit rule is handled by the implicit rule, which uses a configurable default load-balancing method (such as source IP) across the members. It ensures all SD-WAN traffic gets a path even without a specific rule. Explicit rules are evaluated top-down above it.",
   "In a lab you add a lowest cost (SLA) rule for general Internet traffic and a best quality rule for voice, then verify with `diagnose sys sdwan service` which rule and member each flow uses."
  ],
  "terms": [
   [
    "Manual rule",
    "Assigns matching traffic to specified members in order, ignoring SLA measurements."
   ],
   [
    "Best quality",
    "Selects the member with the best measured metric (latency, jitter, loss or bandwidth), always chasing the top score."
   ],
   [
    "Lowest cost (SLA)",
    "Selects the cheapest member that currently meets the SLA target, moving off it only when it fails the SLA."
   ],
   [
    "Maximize bandwidth (SLA) / implicit rule",
    "Maximize bandwidth spreads traffic across all in-SLA members; the implicit rule is the catch-all for traffic matching no explicit rule."
   ]
  ],
  "example": "An admin wants cheap broadband used while it meets quality and MPLS only as a fallback, so they choose lowest cost (SLA); best quality would move traffic to MPLS whenever it scored even slightly better.",
  "tip": "Best quality always chases the top metric even when the current link is fine; lowest cost (SLA) only switches when the cheap link fails the SLA. Match the strategy to the intent the question states.",
  "check": [
   [
    "Which strategy keeps traffic on the lowest-cost link until it fails the SLA?",
    "Lowest cost (SLA), which uses the cheapest in-SLA member and only moves when that member falls out of SLA."
   ],
   [
    "Which strategy always uses the link with the best measured metric?",
    "Best quality, which selects the member with the best latency, jitter, loss or bandwidth value."
   ],
   [
    "What handles SD-WAN traffic that matches no explicit rule?",
    "The implicit rule, a catch-all using a configurable default load-balancing method across the members."
   ]
  ]
 },
 {
  "t": "SD-WAN monitoring and troubleshooting: `diagnose sys sdwan health-check`, `diagnose sys sdwan service`",
  "body": [
   "When SD-WAN does not behave as expected, two CLI commands answer the two questions that matter: are the links measuring healthy, and which member is each rule actually using? Knowing what each command reveals is the practical, exam-tested skill for SD-WAN troubleshooting.",
   "The command `diagnose sys sdwan health-check` shows the live results of the performance SLAs. For each SLA and each member it reports the measured latency, jitter and packet loss, and whether the member currently meets the SLA target (its SLA state). This is where you confirm that probes are actually working and see why a member is being avoided: if a link shows high loss or is failing the SLA, that explains why traffic moved off it. If a health check shows no measurements, the probe server may be unreachable or the SLA misconfigured. So this command diagnoses the measurement layer, the raw quality data SD-WAN decisions rest on.",
   "The command `diagnose sys sdwan service` shows the SD-WAN rules (services) and, for each, which members are currently selected and in what order, given the rule's strategy and the current SLA state. It tells you which member a given rule will use right now and why, revealing whether a rule is steering traffic to the member you expect. When traffic is taking the wrong path, this command shows whether the rule's chosen member matches your intent, and whether members were excluded because they failed the SLA.",
   "Used together they form a clear diagnostic flow. First run the health check to confirm each member's measurements and SLA state, because rules act on that state. Then run the service command to see how the rules translated that state into member selection. If the health check is fine but traffic still goes the wrong way, the rule logic or ordering is the issue; if the health check shows failing or missing measurements, fix the probe/SLA first. This top-to-bottom approach, measurement then decision, quickly isolates whether a problem is in link quality, probe configuration, or rule design.",
   "Beyond these, the GUI SD-WAN monitor shows the same information graphically, and the routing table check still applies (remember the default route to the zone). But for a CLI-based exam question about seeing SLA measurements versus seeing which member a rule uses, health-check is the measurements and service is the rule-to-member mapping.",
   "In a lab you deliberately degrade one link (block its probe target), watch it fail in `diagnose sys sdwan health-check`, then confirm in `diagnose sys sdwan service` that the affected rule moved to another member."
  ],
  "terms": [
   [
    "diagnose sys sdwan health-check",
    "Shows per-member SLA measurements (latency, jitter, loss) and whether each member meets the SLA target."
   ],
   [
    "diagnose sys sdwan service",
    "Shows each SD-WAN rule and which member(s) it currently selects, and in what order, based on strategy and SLA state."
   ],
   [
    "SLA state",
    "Whether a member currently meets its SLA target, which rules use to decide member eligibility."
   ],
   [
    "Measurement-then-decision flow",
    "Troubleshooting by first checking health-check (data) then service (how rules used the data)."
   ]
  ],
  "example": "Traffic is unexpectedly using MPLS instead of broadband, so the admin runs diagnose sys sdwan health-check and sees broadband failing its loss target, which explains why the lowest cost (SLA) rule (seen in diagnose sys sdwan service) selected MPLS.",
  "tip": "Health-check shows the measurements and SLA pass/fail; service shows which member each rule picked. Check measurements first, since rules act on SLA state, then check how the rule used it.",
  "check": [
   [
    "Which command shows the live latency, jitter and packet loss for each SD-WAN member?",
    "diagnose sys sdwan health-check, which also shows whether each member meets its SLA target."
   ],
   [
    "Which command shows which member an SD-WAN rule is currently using?",
    "diagnose sys sdwan service, which maps each rule to its selected member(s) based on strategy and SLA state."
   ],
   [
    "If health-check is healthy but traffic takes the wrong path, where is the problem?",
    "In the rule logic or ordering; the service command reveals how the rules selected members despite good measurements."
   ]
  ]
 },
 {
  "t": "IPsec basics: IKEv1 vs IKEv2, phase 1 and phase 2, proposals, DH groups, PFS, UDP 500/4500 and NAT-T",
  "body": [
   "IPsec builds encrypted tunnels between sites over the untrusted Internet. FortiGate negotiates these tunnels with the Internet Key Exchange (IKE) protocol in two phases, and the exam tests the phases, the parameters that must match, and the ports involved.",
   "IKE comes in two versions. IKEv1 is the older protocol, using a phase 1 exchange (main mode with six messages, or the faster but less secure aggressive mode with three) and then phase 2 (quick mode). IKEv2 is the modern successor: it negotiates in fewer messages, has built-in support for features like NAT traversal and EAP, is more resilient, and is generally preferred for new deployments. Both peers must use the same IKE version to form a tunnel, so a version mismatch prevents negotiation entirely.",
   "Phase 1 establishes the IKE security association (SA): the peers authenticate each other (by pre-shared key or certificate) and build a secure, encrypted channel for further negotiation. For phase 1 to succeed, both sides must agree on the IKE version, the authentication method and credentials, the encryption/hash proposals, and the Diffie-Hellman (DH) group. If phase 1 comes up, you know the key, IKE version and basic reachability are correct.",
   "Phase 2 establishes the IPsec SA that actually protects user data. Here the peers must match their phase 2 proposals (encryption and authentication algorithms), the PFS/DH group if perfect forward secrecy is used, and the quick-mode selectors (the local and remote subnets the tunnel will carry). Selector or proposal mismatches are the most common reason phase 1 succeeds but phase 2 fails.",
   "A proposal is a set of algorithms (for example AES-256 with SHA-256) offered during negotiation; the peers pick a combination both support. The Diffie-Hellman group determines the strength of the key exchange (larger MODP groups such as 14 and elliptic-curve groups such as 19 and 20 are stronger than legacy groups 1, 2 and 5; the group number alone does not rank strength). Perfect forward secrecy (PFS), enabled in phase 2, runs a fresh DH exchange for each new phase 2 key so that compromising one key does not expose past or future keys; without PFS, phase 2 keys derive from phase 1 material.",
   "For ports: IKE negotiation uses UDP 500. When a peer is behind a NAT device, NAT traversal (NAT-T) detects the NAT and moves the rest of the IKE exchange and the encrypted traffic to UDP 4500, encapsulating ESP in UDP so it can cross the NAT. So both UDP 500 and UDP 4500 must be open between peers when NAT is involved.",
   "In a lab you build a route-based tunnel and, to learn the failure modes, mismatch a phase 2 selector and read the IKE debug until you can spot the error."
  ],
  "terms": [
   [
    "IKEv1 vs IKEv2",
    "IKE versions for negotiating IPsec; IKEv2 is newer, uses fewer messages and is generally preferred. Both peers must use the same version."
   ],
   [
    "Phase 1 vs phase 2",
    "Phase 1 builds the authenticated IKE SA (secure channel); phase 2 builds the IPsec SA that encrypts user data."
   ],
   [
    "Proposal / DH group / PFS",
    "A proposal is the offered algorithm set; the DH group sets key-exchange strength; PFS runs a fresh DH per phase 2 key so one key's compromise does not expose others."
   ],
   [
    "UDP 500 / 4500 (NAT-T)",
    "IKE uses UDP 500; when a peer is behind NAT, NAT traversal moves ESP traffic to UDP 4500."
   ]
  ],
  "example": "Two branch FortiGates form an IKEv2 tunnel: phase 1 authenticates them with a pre-shared key over UDP 500, and because one branch is behind a NAT router, NAT-T shifts the encrypted traffic to UDP 4500.",
  "tip": "Phase 1 up but phase 2 down almost always means mismatched phase 2 proposals, PFS/DH group, or selectors. And when a peer is behind NAT, remember UDP 4500 (NAT-T), not just UDP 500.",
  "check": [
   [
    "What does each IPsec phase establish and what must match?",
    "Phase 1 builds the IKE SA (IKE version, authentication, proposals and DH group must match); phase 2 builds the IPsec SA (proposals, PFS/DH and selectors must match)."
   ],
   [
    "Which ports are needed when an IPsec peer is behind NAT?",
    "UDP 500 for IKE and UDP 4500 for NAT traversal (NAT-T)."
   ],
   [
    "What does enabling PFS in phase 2 do?",
    "It runs a fresh Diffie-Hellman exchange for each phase 2 key so compromising one key does not expose others."
   ]
  ]
 },
 {
  "t": "Route-based (interface-mode) vs policy-based IPsec",
  "body": [
   "FortiGate can build IPsec VPNs in two styles, route-based (interface-mode) and policy-based, and the choice shapes how flexible and scalable the VPN is. Modern designs almost always use route-based, and the exam wants you to know why.",
   "In a route-based (interface-mode) VPN, creating the tunnel produces a virtual tunnel interface on the FortiGate. This interface behaves like any other interface: you can add static or dynamic routes that point through it, reference it in ordinary firewall policies, put it in an SD-WAN zone, and use it with ADVPN. Because the tunnel is a routable interface, you can send traffic through it based on the routing table, add backup routes with different distances for failover, and run dynamic routing protocols across it. This flexibility is exactly what large, redundant or dynamic topologies need.",
   "In a policy-based VPN, the tunnel is not an interface; instead it is tied directly to a special IPsec firewall policy that specifies the encryption action. Traffic is encrypted when it matches that policy. This is simpler to think about for a single tunnel but far less flexible: you cannot route arbitrarily through the tunnel, backup routing and dynamic routing are awkward or impossible, and it does not fit SD-WAN or ADVPN. Policy-based mode is largely legacy and used for simple or specific interoperability cases.",
   "The practical consequences the exam tests: route-based VPNs support backup routes and route-based failover (two tunnels with different route distances, plus DPD), dynamic routing, SD-WAN membership and ADVPN short-cuts, because the tunnel is an interface that routes and policies can use. Policy-based VPNs tie the tunnel to a single policy and are hard to scale.",
   "A key troubleshooting note that follows from route-based design: an interface-mode tunnel can show as up while no traffic passes, because being up is not enough, you also need a route directing the remote subnet's traffic into the tunnel interface and firewall policies allowing that traffic in both directions. Encryption strength is identical between the two modes, so route-based is preferred for flexibility, not for stronger crypto.",
   "For almost every FortiGate deployment, choose route-based. In a lab you build a route-based tunnel, then confirm you must add a route via the tunnel interface and policies between the LAN and the tunnel before traffic flows, which cements why the interface model matters."
  ],
  "terms": [
   [
    "Route-based (interface-mode) VPN",
    "An IPsec VPN that creates a virtual tunnel interface usable by routes, firewall policies, SD-WAN and ADVPN."
   ],
   [
    "Policy-based VPN",
    "An IPsec VPN tied to a special encryption firewall policy rather than an interface; simpler but not scalable."
   ],
   [
    "Tunnel interface",
    "The virtual interface a route-based VPN produces, through which you route traffic and to which you apply policies."
   ],
   [
    "Scalability/flexibility",
    "Route-based VPNs support backup routes, dynamic routing, SD-WAN and ADVPN; policy-based do not."
   ]
  ],
  "example": "An enterprise builds route-based tunnels so each tunnel is an interface it can add to SD-WAN and give backup routes with different distances, enabling automatic failover that a policy-based VPN could not provide.",
  "tip": "Prefer route-based (interface-mode) VPNs: the tunnel interface lets routes, policies, SD-WAN and ADVPN use it. Encryption strength is the same as policy-based, so the reason is flexibility, not stronger crypto.",
  "check": [
   [
    "Why is a route-based IPsec VPN usually preferred?",
    "It creates a tunnel interface that routes (including backup and dynamic routes), firewall policies, SD-WAN and ADVPN can use, making it scalable and flexible."
   ],
   [
    "What is a policy-based VPN tied to instead of an interface?",
    "A special IPsec firewall policy that defines the encryption action; traffic matching the policy is encrypted."
   ],
   [
    "Is encryption stronger in route-based than policy-based mode?",
    "No; encryption strength is the same. Route-based is chosen for flexibility, not stronger cryptography."
   ]
  ]
 },
 {
  "t": "Site-to-site with static peers and dial-up (dynamic) peers",
  "body": [
   "Site-to-site IPsec connects two networks over a tunnel, and how you configure phase 1 depends on whether each peer has a fixed, known public IP or a dynamic one. The static-versus-dial-up distinction is a reliable exam topic because it determines which side can start the tunnel.",
   "With static peers, both ends have known, fixed public IP addresses. Each side's phase 1 is configured with the other's specific remote gateway IP, so either peer can initiate the tunnel and each knows exactly where to reach the other. This is the straightforward case for two data centers or branches with static IPs.",
   "Dial-up (dynamic) peers handle the common situation where one side's address is unknown or changes, for example a branch that gets a dynamic public IP from its ISP, or many remote sites/clients connecting to one hub. On the side that accepts these connections (typically headquarters or the hub), you configure phase 1 as a dial-up server: it does not specify a fixed remote gateway because it cannot know the callers' addresses in advance; instead it accepts incoming tunnels from any address that authenticates correctly. The side with the unknown address is configured to point at the accepting side's fixed IP and initiates the tunnel.",
   "This leads to the rule the exam tests: the peer with the dynamic or unknown address must be the initiator, and the peer with the static address accepts it as a dial-up peer. So for a branch on a dynamic IP connecting to HQ on a static IP, HQ is configured with a dial-up (dynamic) peer and the branch points to HQ's static IP and starts the tunnel. Two dial-up peers can never connect, because neither knows the other's address to initiate, and a static-to-static config fails if one side actually has a changing address.",
   "Dial-up is also how you scale one hub to many spokes or remote-access clients: a single dial-up phase 1 on the hub accepts many incoming tunnels, and features like mode-config can assign addresses to the callers. Authentication (pre-shared key or certificate, often with a peer ID) distinguishes and authorizes the callers.",
   "In a lab you can simulate this by configuring HQ as a dial-up server and a branch VM pointing to HQ's address as the initiator, confirming the tunnel comes up from the branch side even though HQ has no fixed remote gateway set."
  ],
  "terms": [
   [
    "Static peer",
    "An IPsec peer with a known fixed public IP; each side configures the other's specific gateway address and either can initiate."
   ],
   [
    "Dial-up (dynamic) peer",
    "A phase 1 that accepts incoming tunnels from callers whose addresses are unknown in advance, used when one side has a dynamic IP or for many spokes."
   ],
   [
    "Initiator vs responder",
    "The peer with the unknown/dynamic address must initiate; the peer with the static address accepts (responds) as the dial-up server."
   ],
   [
    "Peer ID / authentication",
    "Identifiers and credentials (PSK or certificate) that let a dial-up server distinguish and authorize incoming callers."
   ]
  ],
  "example": "A branch with a dynamic ISP address connects to HQ, which has a static IP, so HQ is configured as a dial-up (dynamic) peer with no fixed remote gateway and the branch points to HQ's IP and initiates the tunnel.",
  "tip": "The side with the unknown/dynamic address must initiate; the static side accepts it as a dial-up peer. Two dial-up peers can never connect because neither has an address to dial.",
  "check": [
   [
    "How should phase 1 be set up when a branch has a dynamic IP and HQ has a static IP?",
    "HQ is configured as a dial-up (dynamic) peer that accepts incoming tunnels; the branch points to HQ's static IP and initiates the tunnel."
   ],
   [
    "Why can't two dial-up peers form a tunnel?",
    "Neither knows the other's address to initiate, so no side can start the negotiation."
   ],
   [
    "What is one advantage of a dial-up server configuration?",
    "A single dial-up phase 1 on a hub can accept many incoming tunnels from spokes or remote clients whose addresses are not known in advance."
   ]
  ]
 },
 {
  "t": "Routes and firewall policies needed for tunnel traffic",
  "body": [
   "A common surprise with route-based IPsec is that the tunnel can show up while no traffic passes between the sites. That is because bringing the tunnel up is only half the job: you must also tell the FortiGate to route the remote subnets into the tunnel and to permit that traffic with firewall policies. This is heavily tested because it separates people who clicked through a wizard from people who understand the data path.",
   "Recall that a route-based tunnel creates a virtual tunnel interface. The routing table has no idea which destinations belong on the far side of that interface until you add routes. So for each remote subnet reachable over the tunnel, you add a static route whose destination is that subnet and whose device (interface) is the tunnel interface (a route-based tunnel usually needs no next-hop gateway on the tunnel interface). Without this route, traffic to the remote LAN follows the default route out to the Internet instead of entering the tunnel, and nothing works even though the tunnel is up.",
   "Second, firewall policies must allow the traffic in both directions. You create a policy from the local LAN interface to the tunnel interface for outbound traffic to the remote site, and a policy from the tunnel interface to the local LAN interface for inbound traffic from the remote site. Both use the appropriate address objects for the local and remote subnets and the required services. The FortiGate is stateful, so replies to a session are allowed by the policy that created it; the second policy is needed so that hosts at the remote site can start their own connections, and missing it is a frequent cause of connectivity that works only one way. Note that for tunnel traffic you normally do not apply source NAT (the two LANs should see each other's real addresses), unlike Internet policies.",
   "Putting it together, the minimum for working route-based tunnel traffic is: the tunnel up (phase 1 and 2 negotiated), a route for each remote subnet pointing at the tunnel interface, and firewall policies in both directions between the local LAN and the tunnel interface. If any one is missing, the tunnel may be up but traffic fails. When troubleshooting 'tunnel is up but no traffic', check the route to the remote subnet and both policies first.",
   "On the remote FortiGate you configure the mirror image: a route for your local subnet via its tunnel interface, and policies in both directions. Both ends must agree, and the phase 2 selectors should encompass the subnets your routes and policies use.",
   "In a lab you bring up a route-based tunnel, deliberately omit the route, observe traffic failing while the tunnel is up, then add the route and the two policies and watch connectivity succeed."
  ],
  "terms": [
   [
    "Route via tunnel interface",
    "A static route whose destination is the remote subnet and whose device is the IPsec tunnel interface, directing traffic into the tunnel."
   ],
   [
    "Bidirectional policies",
    "Firewall policies allowing traffic both from LAN to tunnel and from tunnel to LAN, so that either site can start connections (replies to a session are allowed statefully)."
   ],
   [
    "No SNAT for tunnel traffic",
    "Tunnel policies normally do not apply source NAT so both LANs see each other's real addresses."
   ],
   [
    "Up but no traffic",
    "The symptom when a tunnel negotiates successfully but the route or policies are missing, so no data crosses it."
   ]
  ],
  "example": "A new route-based tunnel shows as up but the two LANs cannot reach each other; the admin adds a route for the remote subnet via the tunnel interface and firewall policies in both directions, and traffic then flows.",
  "tip": "A tunnel showing up is not enough. You still need a route for the remote subnet via the tunnel interface and policies in both directions, and tunnel policies usually should not apply SNAT.",
  "check": [
   [
    "A route-based tunnel is up but no traffic passes. What is most likely missing?",
    "A route directing the remote subnet into the tunnel interface, and/or firewall policies allowing the traffic in both directions."
   ],
   [
    "Why do you need policies in both directions for tunnel traffic?",
    "Each policy only allows sessions started on its ingress side (replies are handled statefully), so without the tunnel-to-LAN policy the remote site cannot start connections and access works only one way."
   ],
   [
    "Should tunnel traffic policies apply source NAT?",
    "Normally no; the two LANs should see each other's real addresses, unlike Internet-bound policies."
   ]
  ]
 },
 {
  "t": "Redundant VPNs: two tunnels, route distance/priority, DPD, tunnel monitoring",
  "body": [
   "Branches that depend on a VPN need it to survive the failure of a single link or tunnel. FortiGate builds VPN redundancy by running two (or more) tunnels and using routing plus liveness detection to fail over between them automatically. The mechanics, distance/priority and dead peer detection, are exactly what the exam probes.",
   "The design is to build one tunnel per path, for example one over each of the branch's two ISPs, each as a route-based tunnel with its own tunnel interface. You then add a route to the remote subnet through each tunnel, but with different administrative distances (or priorities) so one is primary and the other is a standby. A lower-distance route on the primary tunnel means only it is active while both are healthy; the higher-distance route on the backup tunnel waits in the routing database and becomes active only if the primary route is withdrawn. (Alternatively, equal distance with different priorities keeps both routes in the table with one preferred.)",
   "For failover to actually happen, the FortiGate must notice when the primary tunnel dies and remove its route. That is the job of dead peer detection (DPD): DPD sends periodic liveness probes to the peer and, if the peer stops responding, declares the tunnel dead and brings it down. When the tunnel goes down, its route is withdrawn, and the backup tunnel's higher-distance route takes over. Without DPD, a dead tunnel can appear up (a black hole), its route stays in the table, and traffic keeps being sent into a tunnel that is not passing data, so failover never triggers. Tunnel monitoring (a link monitor over the tunnel, or auto-negotiate/keepalive behaviour) can similarly detect a broken tunnel and drive route changes.",
   "So the recipe for redundant branch VPNs: two route-based tunnels, routes with different distances (or priorities) making one primary and one backup, DPD enabled so a dead tunnel is detected and its route removed, and firewall policies allowing traffic over both tunnels so the backup works the moment it activates. Enabling DPD is the piece people forget, and it is why 'two tunnels with DPD off' is a wrong answer, the dead tunnel would linger and traffic would not move.",
   "This same pattern underlies dual-hub and dual-ISP designs and complements SD-WAN, which can steer over multiple tunnel members by SLA. The exam-level point is the interplay: routing decides preference, DPD/monitoring provides the trigger to change it.",
   "In a lab with two tunnels you disable the primary path, and with DPD enabled watch the primary route drop and traffic move to the backup, then compare with DPD off to see the tunnel linger."
  ],
  "terms": [
   [
    "Redundant tunnels",
    "Two or more tunnels over different paths so the VPN survives a single link or tunnel failure."
   ],
   [
    "Route distance/priority for failover",
    "Different administrative distances (or priorities) on the tunnels' routes make one primary and one backup."
   ],
   [
    "Dead peer detection (DPD)",
    "Periodic liveness probes that detect an unresponsive peer, bring the tunnel down and let its route be withdrawn."
   ],
   [
    "Tunnel monitoring",
    "Link monitoring over a tunnel that detects a broken path and drives route changes for failover."
   ]
  ],
  "example": "A branch builds two route-based tunnels to HQ, one per ISP, gives the primary tunnel's route a lower distance, and enables DPD; when the primary ISP fails, DPD brings that tunnel down, its route is removed, and traffic shifts to the backup tunnel.",
  "tip": "Redundant VPN failover needs both parts: different route distances/priorities to set primary vs backup, and DPD (or tunnel monitoring) to detect a dead tunnel so its route is withdrawn. DPD off breaks failover.",
  "check": [
   [
    "How do you make branch VPNs fail over between two ISPs?",
    "Build one route-based tunnel per ISP, give the primary a lower route distance (or priority), enable DPD so a dead tunnel is detected, and allow traffic on both tunnels in policies."
   ],
   [
    "What does dead peer detection do?",
    "It sends liveness probes and, when the peer stops responding, brings the tunnel down so its route can be withdrawn and a backup takes over."
   ],
   [
    "Why is 'two tunnels with DPD off' a poor design?",
    "Without DPD a dead tunnel can appear up, its route stays active, traffic black-holes into it, and failover never triggers."
   ]
  ]
 },
 {
  "t": "Topologies: hub and spoke, full mesh, partial mesh, ADVPN short-cuts",
  "body": [
   "As the number of VPN sites grows, the topology you choose decides how many tunnels you must build and maintain and how efficiently spoke-to-spoke traffic flows. The exam expects you to compare the topologies and to know what ADVPN adds.",
   "In a hub-and-spoke topology, every spoke builds one tunnel to a central hub, and there are no direct spoke-to-spoke tunnels. For n sites this needs only n minus 1 tunnels (each spoke to the hub), which is easy to build and manage. The drawback is that traffic between two spokes must traverse the hub (spoke to hub to spoke), adding latency and load on the hub, which is inefficient for direct branch-to-branch flows like voice.",
   "In a full mesh, every site has a direct tunnel to every other site, giving the shortest path between any two sites with no hub in the middle. The cost is scale: a full mesh needs n times (n minus 1) divided by 2 tunnels, so five sites need 10 tunnels and the count grows quickly, making a large full mesh hard to build and maintain by hand. A partial mesh is a middle ground: you add direct tunnels only between the site pairs that need them (for example the busiest branches), while others still go through the hub, balancing efficiency against tunnel count.",
   "ADVPN (Auto-Discovery VPN) gives the best of both. It starts as a hub-and-spoke design, so you only configure and maintain the spoke-to-hub tunnels, but it lets spokes build direct short-cut tunnels to each other on demand when they have traffic to exchange. The first packets between two spokes go through the hub; the hub then signals the spokes to establish a dynamic direct tunnel, and subsequent traffic takes that short-cut, bypassing the hub. When the traffic stops, the short-cut can be torn down. This delivers full-mesh-like direct paths without manually building n times (n minus 1) divided by 2 tunnels, so it scales to many sites while keeping spoke-to-spoke traffic efficient. ADVPN relies on route-based tunnels and typically a dynamic routing protocol (such as BGP or, in some designs, iBGP over the overlay) plus summarized routes so spokes can learn each other.",
   "Choosing: hub-and-spoke for simplicity and few inter-spoke flows; full or partial mesh when direct paths matter and the count is manageable; ADVPN when you need direct spoke-to-spoke paths at scale without the mesh maintenance burden.",
   "In a lab you sketch hub-and-spoke, full-mesh and ADVPN designs for five sites, count the tunnels each needs (4, 10, and 4 configured plus dynamic short-cuts), and list the routes and DPD settings for failover."
  ],
  "terms": [
   [
    "Hub and spoke",
    "Each spoke tunnels only to a central hub (n minus 1 tunnels); spoke-to-spoke traffic passes through the hub."
   ],
   [
    "Full mesh",
    "Every site has a direct tunnel to every other (n times (n minus 1) divided by 2 tunnels); shortest paths but many tunnels."
   ],
   [
    "Partial mesh",
    "Direct tunnels only between selected site pairs, with the rest via the hub, balancing efficiency and count."
   ],
   [
    "ADVPN (Auto-Discovery VPN)",
    "A hub-and-spoke design where spokes build direct short-cut tunnels on demand, giving mesh-like paths without manual full-mesh tunnels."
   ]
  ],
  "example": "Five branches need efficient direct voice paths but the team will not maintain a 10-tunnel full mesh, so they deploy ADVPN: only the five spoke-to-hub tunnels are configured, and spokes form direct short-cuts on demand when they exchange traffic.",
  "tip": "Hub-and-spoke needs n minus 1 tunnels; full mesh needs n(n-1)/2. ADVPN keeps hub-and-spoke's low configuration while giving on-demand direct spoke-to-spoke paths, so it scales without the mesh maintenance.",
  "check": [
   [
    "How many tunnels does a full mesh of five sites need, and a hub-and-spoke of five sites?",
    "Full mesh needs n(n-1)/2 = 10; hub-and-spoke needs n minus 1 = 4."
   ],
   [
    "What problem does ADVPN solve compared with plain hub-and-spoke?",
    "It avoids sending all spoke-to-spoke traffic through the hub by building direct short-cut tunnels between spokes on demand."
   ],
   [
    "What does ADVPN keep from the hub-and-spoke model?",
    "You only configure and maintain the spoke-to-hub tunnels; the direct spoke-to-spoke tunnels are created dynamically."
   ]
  ]
 },
 {
  "t": "Troubleshooting: `diagnose vpn ike gateway list`, `diagnose vpn tunnel list`, `diagnose debug application ike -1`",
  "body": [
   "When an IPsec tunnel will not come up or passes no traffic, three CLI tools cover almost every case: one shows phase 1 status, one shows phase 2/tunnel status, and one shows the live negotiation. Knowing which to use for which symptom is the practical VPN-troubleshooting skill the exam rewards.",
   "The command `diagnose vpn ike gateway list` shows the phase 1 (IKE) gateways: each configured gateway, its state (whether phase 1 is established), the local and remote addresses, the negotiated IKE version and proposals, and NAT-T status. This is your first check for 'is phase 1 up?'. If a gateway is not established, the problem is in phase 1, mismatched IKE version, authentication (pre-shared key or certificate), proposals or DH group, or reachability on UDP 500/4500.",
   "The command `diagnose vpn tunnel list` shows the IPsec (phase 2) SAs and tunnel details: the selectors in use, the negotiated phase 2 proposals and whether SAs are installed, plus counters for encrypted and decrypted packets. This is where you confirm phase 2 succeeded and whether data is actually crossing. If phase 1 is up (from the gateway list) but this shows no phase 2 SA, or packet counters are not incrementing, the issue is phase 2 selectors/proposals or the routes and policies feeding the tunnel.",
   "The command `diagnose debug application ike -1` (with `diagnose debug enable`) turns on verbose, real-time logging of the IKE negotiation, printing each message and, crucially, the reason a negotiation fails, for example a proposal mismatch or a selector that does not match. The `-1` sets maximum verbosity. Because it shows the exchange as it happens, it is the definitive tool for seeing why a tunnel will not negotiate; you filter it to the peer, reproduce the connection, and read the error. Remember, as with all FortiGate debugs, you must run `diagnose debug enable` for output to appear, and `diagnose debug disable` when finished.",
   "A clean workflow: check `diagnose vpn ike gateway list` for phase 1; if phase 1 is down, run the IKE debug to see the negotiation error. If phase 1 is up, check `diagnose vpn tunnel list` for phase 2 and packet counters; a missing phase 2 SA again points you to the IKE debug (selectors/proposals), while an up phase 2 with no traffic points to routing and firewall policies. This measurement-to-cause path resolves the vast majority of tunnel problems.",
   "In a lab you deliberately mismatch a phase 2 selector, run `diagnose debug application ike -1` while reconnecting, and locate the exact error message in the output."
  ],
  "terms": [
   [
    "diagnose vpn ike gateway list",
    "Shows phase 1 (IKE) gateways, their state, addresses, negotiated version/proposals and NAT-T status."
   ],
   [
    "diagnose vpn tunnel list",
    "Shows phase 2 (IPsec) SAs, selectors, proposals and encrypted/decrypted packet counters."
   ],
   [
    "diagnose debug application ike -1",
    "Verbose real-time logging of the IKE negotiation, revealing the exact reason a tunnel fails to establish."
   ],
   [
    "Debug enable/disable",
    "diagnose debug enable is required for debug output to print; diagnose debug disable turns it off afterward."
   ]
  ],
  "example": "A tunnel's phase 1 shows established in diagnose vpn ike gateway list but diagnose vpn tunnel list shows no phase 2 SA, so the admin runs diagnose debug application ike -1, reconnects, and finds a phase 2 selector mismatch in the output.",
  "tip": "Use the gateway list for phase 1, the tunnel list for phase 2 and packet counters, and the IKE debug to see why negotiation fails. Nothing prints from the debug until you run diagnose debug enable.",
  "check": [
   [
    "Which command shows phase 1 gateway status?",
    "diagnose vpn ike gateway list, which lists each IKE gateway, its state and negotiated settings."
   ],
   [
    "Phase 1 is up but no traffic passes and there is no phase 2 SA. What tool shows why?",
    "diagnose debug application ike -1 (with debug enabled) reveals the phase 2 negotiation error, commonly a selector or proposal mismatch."
   ],
   [
    "What must you run for IKE debug output to appear?",
    "diagnose debug enable; without it the debug prints nothing, and you run diagnose debug disable when done."
   ]
  ]
 },
 {
  "t": "Remote access VPN on FortiOS 7.6: FortiClient dial-up IPsec, and the SSL VPN changes in later 7.6 builds (tunnel mode removed, web mode renamed agentless VPN)",
  "body": [
   "Remote access VPN lets individual users, not whole sites, connect securely from anywhere. On FortiOS 7.6 the recommended approach shifted notably, and the exam (and real deployments) expect you to understand both the FortiClient IPsec method and the significant SSL VPN changes introduced in later 7.6 builds. Note that whether remote access VPN is on your exam version can vary, so confirm the current exam description.",
   "The primary remote-access method on 7.6 is FortiClient dial-up IPsec. The FortiGate is configured as a dial-up (dynamic) IPsec server: a single phase 1 accepts incoming tunnels from many remote clients whose addresses are unknown in advance. Remote users run the FortiClient endpoint agent, which initiates an IPsec tunnel to the FortiGate, authenticates the user (local, LDAP/RADIUS, often with FortiToken two-factor), and receives an IP address and settings via IKE mode-config. You then add routes and firewall policies for the assigned client range so remote users can reach internal resources. This is the dial-up model applied to individual clients rather than branch sites.",
   "The big change is in SSL VPN. Historically FortiGate SSL VPN offered two modes: tunnel mode (a full VPN via the FortiClient/SSL VPN client over HTTPS) and web mode (a clientless portal reached in a browser). In later FortiOS 7.6 builds Fortinet removed SSL VPN tunnel mode, steering customers toward IPsec (with FortiClient) for full tunnel remote access. This is a deliberate direction: IPsec is the supported path for full client VPN, and SSL VPN tunnel mode is no longer available in those builds. If a scenario says 'we upgraded to a recent 7.6 build and SSL VPN tunnel mode is gone', that is expected behaviour, and the fix is to move remote-access users to FortiClient IPsec dial-up.",
   "SSL VPN web mode was retained but renamed. In later 7.6 it is called agentless VPN, reflecting that it is the browser-based, no-client way to reach a limited set of internal web and application resources through a portal. The rename keeps the clientless capability while making clear it is not a full tunnel. So on recent 7.6, remote access means FortiClient IPsec for full tunneling and agentless VPN (the former SSL VPN web mode) for browser-based access to specific resources.",
   "For the exam: know that FortiClient dial-up IPsec is the full remote-access method, that SSL VPN tunnel mode was removed in later 7.6 builds, and that SSL VPN web mode was renamed agentless VPN. Do not assume exact build numbers; the durable facts are the removal of tunnel mode and the web-mode rename.",
   "In a lab you configure a dial-up IPsec phase 1 for FortiClient, assign a client IP range with mode-config, add policies for that range, and connect with FortiClient, then note that the agentless (web) portal covers only specific published resources."
  ],
  "terms": [
   [
    "FortiClient dial-up IPsec",
    "Remote-access VPN where FortiClient initiates an IPsec tunnel to a FortiGate dial-up server, which authenticates the user and assigns settings via mode-config."
   ],
   [
    "Mode-config",
    "The IKE mechanism that assigns an IP address and network settings to a dial-up/remote client when the tunnel comes up."
   ],
   [
    "SSL VPN tunnel mode removal",
    "In later FortiOS 7.6 builds, full-tunnel SSL VPN was removed, with IPsec (FortiClient) as the supported full remote-access path."
   ],
   [
    "Agentless VPN",
    "The renamed SSL VPN web mode: browser-based, clientless access to specific internal web/application resources through a portal."
   ]
  ],
  "example": "After upgrading to a recent FortiOS 7.6 build, remote workers find SSL VPN tunnel mode gone, so the admin configures FortiClient dial-up IPsec for full access and uses agentless VPN (formerly SSL VPN web mode) for browser-only access to a few internal web apps.",
  "tip": "On later 7.6 builds, SSL VPN tunnel mode is removed and web mode is renamed agentless VPN; FortiClient dial-up IPsec is the full remote-access method. Confirm remote-access coverage on your exam version.",
  "check": [
   [
    "What is the primary full remote-access VPN method on FortiOS 7.6?",
    "FortiClient dial-up IPsec: FortiClient initiates an IPsec tunnel to a FortiGate dial-up server that authenticates the user and assigns settings via mode-config."
   ],
   [
    "What happened to SSL VPN tunnel mode in later 7.6 builds?",
    "It was removed, with IPsec (FortiClient) as the supported path for full-tunnel remote access."
   ],
   [
    "What was SSL VPN web mode renamed to, and what is it?",
    "Agentless VPN: browser-based, clientless access to specific internal web and application resources through a portal."
   ]
  ]
 }
]);
