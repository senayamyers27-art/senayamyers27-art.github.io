CertHub.addWhys("fortinet-fortigate", {
  "fg1": [null,
    "192.168.100.99:10443 is a common management address on other vendors' gear (and FortiManager/analyzer style ports), not a factory FortiGate default.",
    "10.0.0.1 is a generic gateway address, not what a factory FortiGate ships with on its management interface.",
    "172.16.1.1 is another arbitrary private-range gateway, not the FortiGate default of 192.168.1.99."],
  "fg2": [
    "The default password is blank, not 'fortinet', and registration is not required just to log in locally.",
    "FortiOS has no root account and never logs you in with the serial number; the default account is admin.",
    "FortiCloud registration is optional for local login; you can log in and manage the unit without it.",
    null],
  "fg3": [
    "A password policy strengthens credentials but does nothing to restrict which source subnet an admin may connect from.",
    "An admin profile controls what an admin can change, and VDOM scope limits which VDOM they manage, not the source IP they log in from.",
    null,
    "MFA adds a second factor but still allows login from any network; it does not limit the source subnet."],
  "fg4": [
    "super_admin has full read-write access, so even with trusted hosts the auditor could change settings, which violates the requirement.",
    null,
    "A local firewall user authenticates to policies for traffic; it cannot log in to the administrative GUI at all.",
    "A VDOM separates configuration domains; it does not create a read-only auditor login and is far more than is needed."],
  "fg5": [
    "Device priority is only checked before uptime when HA override is enabled; with override disabled it comes after uptime.",
    null,
    "HA uptime is compared second, after the number of connected monitored interfaces, not first.",
    "The serial number is only the final tie-breaker, checked last when everything else is equal."],
  "fg6": [
    null,
    "Priority is a real election factor once override is enabled; it is not gated behind two reboots.",
    "FGCP does not cap or ignore priority values above 200; 250 is a valid priority.",
    "Serial number is only the last tie-breaker; here uptime already decides before serial is ever considered."],
  "fg7": [
    "HA override changes which unit becomes primary; it does nothing to preserve existing TCP sessions across a failover.",
    "A second heartbeat link improves cluster resilience and split-brain avoidance, but it does not carry the session table for continuity.",
    "Uninterruptible firmware upgrade keeps traffic flowing during an upgrade; it does not sync sessions for an unplanned failover.",
    null],
  "fg8": [
    "get system performance status shows CPU, memory and sessions, not per-area configuration checksums.",
    "diagnose sys session list dumps the live session table, which has nothing to do with config sync between members.",
    null,
    "That command traces packet flow for troubleshooting connectivity, not HA configuration checksums."],
  "fg9": [
    "Hostnames and management IPs are unique per member, and the admin password is not an FGCP cluster-matching requirement.",
    "A shared serial prefix or matching license dates are not FGCP formation requirements; members can differ there.",
    null,
    "Interface IPs are not matched across members; each unit keeps its own addressing while sharing virtual IP/MAC."],
  "fg10": [
    "Both modes share virtual IP and MAC addresses; members do not each own separate interface IPs in active-active.",
    null,
    "Secondaries always coordinate with the primary; they never route independently with no connection to it.",
    "Session synchronization is not turned off in active-active; the primary distributes inspection sessions to secondaries."],
  "fg11": [
    null,
    "Importing the root's config backup would overwrite the branch's own settings and does not create a Fabric authorization.",
    "A Fabric connection is not established by enabling sync on an IPsec tunnel; the downstream unit points at the upstream and is authorized.",
    "Sharing a FortiCare account registers the units but does not by itself join them into a Security Fabric."],
  "fg12": [
    "FortiManager centralizes configuration but is an optional Fabric device, not a prerequisite for the root.",
    "A FortiSwitch over FortiLink is an optional Fabric member, not required for the Fabric to be set up.",
    "HA heartbeat links are for clustering between paired units, not a requirement for downstream Fabric members.",
    null],
  "fg13": [
    "A syslog server with a mailbox filter needs extra external tooling and is more complex than a built-in stitch.",
    "A daily scheduled report is not immediate, so admins would not get an email at the moment of each change.",
    "FortiGuard outbreak alerts are threat-intelligence notifications, not alerts about local configuration changes.",
    null],
  "fg14": [
    "Website reputation scores come from FortiGuard web filtering, not from the Security Rating feature.",
    "Live WAN bandwidth ratings are shown by SD-WAN/monitoring views, not by Security Rating.",
    null,
    "Per-user failed-login risk is not what Security Rating produces; it audits device best practices."],
  "fg15": [
    "ips fail-open governs the IPS engine when it is overloaded, not proxy-based antivirus behavior during conserve mode.",
    null,
    "tcp-halfopen-timer controls how long half-open TCP sessions live; it is unrelated to conserve-mode inspection.",
    "admin-lockout-threshold limits failed admin logins; it has nothing to do with proxy AV under memory pressure."],
  "fg16": [
    null,
    "get system status shows firmware, serial number and operating mode, not live CPU, memory or session counts.",
    "That command prints the routing table, not resource utilization.",
    "diagnose sys ha status reports HA cluster state, not the unit's CPU/memory/session summary."],
  "fg17": [
    null,
    "There is no user policy 0; policy 0 is the implicit deny, and pending authentication produces a different flow message.",
    "A route lookup failure shows a 'no route' message; here a policy was checked and matched the implicit deny.",
    "An IPS block logs an IPS signature action, not a 'Denied by forward policy check (policy 0)' line."],
  "fg18": [
    "diagnose debug reset clears filters; running it would remove the filter you just set, not produce output.",
    "Setting a ping source address affects locally generated pings, not whether debug flow prints for transit traffic.",
    "Clearing sessions would disrupt users and still not print any debug output on its own.",
    null],
  "fg19": [
    "Policy 0 is the implicit deny; its logging records denied traffic, not accepted sessions through a real policy.",
    "Event log severity controls system/event logging verbosity, not per-policy logging of allowed traffic.",
    null,
    "Enabling disk logging changes where logs are stored, not whether the policy records every allowed session."],
  "fg20": [
    "A larger memory buffer still lives in RAM and is wiped on reboot, so yesterday's logs would still be lost.",
    null,
    "Lowering severity only reduces how much is logged; it does nothing to make memory logs survive a restart.",
    "Compression saves space in the same volatile buffer; the logs are still cleared when the unit restarts."],
  "fg21": [
    "A DNS zone is a name-resolution construct; a VDOM is a full virtual firewall instance, not a hosted zone.",
    null,
    "A VDOM is not a group of administrators; admin permissions are set by admin profiles.",
    "A VDOM is not a VLAN, and HA heartbeat traffic uses dedicated heartbeat interfaces, not a VDOM."],
  "fg22": [
    null,
    "Installing 7.6 directly and rebooting can skip required intermediate builds, risking a broken config conversion.",
    "Restoring a 7.0 config file onto 7.6 bypasses the guided upgrade conversion and can lose or corrupt settings.",
    "Upgrading only the secondary HA member leaves a mixed-firmware cluster and does not complete the migration path."],
  "fg23": [
    "FortiGate does not pick the 'most specific' policy anywhere in the list; order in the list decides.",
    "Lowest policy ID is not the selector; ID is just a label and does not set evaluation order.",
    "Policies are not combined; exactly one policy (the first match) applies to the session.",
    null],
  "fg24": [
    "Changing the policy ID does not change list order, so the broad deny above would still match first.",
    "Enabling NAT affects address translation, not which policy matches, so HR would still be denied.",
    null,
    "Adding the payroll server to the deny policy's destination would block it further, the opposite of the goal."],
  "fg25": [
    "Allowed-traffic logging records accepted sessions; it does not capture the connections the implicit deny blocks.",
    "Event log severity governs system events, not logging of denied forward traffic.",
    null,
    "A WAN packet capture is a manual diagnostic, not a way to log denied connections in the forward traffic log."],
  "fg26": [
    "Interfaces are part of policy matching, so they are used, not excluded.",
    null,
    "Source and destination addresses are core matching criteria, so they are used in matching.",
    "Service and schedule are matching criteria as well, so they are used, not excluded."],
  "fg27": [
    null,
    "A VIP per host is destination NAT for inbound services, not a way to give outbound users Internet access.",
    "Central SNAT with a one-to-one pool needs a public IP per host and is far more complex than needed for one WAN IP.",
    "A port-forwarding VIP publishes inbound services; it does not provide outbound source NAT for internal users."],
  "fg28": [
    "One-to-one gives each user a whole public IP, so only four users could be online at once with four IPs.",
    "Fixed port range assigns predictable external port blocks but is not the simplest fit for mass outbound sharing here.",
    "Port block allocation is tied to VIP/CGN-style setups and is not the standard many-to-few outbound overload choice.",
    null],
  "fg29": [
    "One-to-one pools work with normal IPv4 policies, not only with IPsec tunnels.",
    "One-to-one does not translate ports at all, let alone randomize them on every packet.",
    "One-to-one is configured directly on a policy; it does not require central SNAT to be enabled.",
    null],
  "fg30": [
    "An overload IP pool changes the source of outbound traffic; it does not publish an internal server inbound.",
    "A static route affects path selection, not destination NAT; the server still would not be reachable on the public IP.",
    null,
    "Central SNAT translates the source address; reaching an internal server from outside needs destination NAT via a VIP."],
  "fg31": [
    "Two VIPs on the same IP for one service is unnecessary; a single VIP with port forwarding handles the 8443-to-443 mapping.",
    null,
    "Setting the policy service to 443 does not translate the external 8443 to the internal 443; services never rewrite ports.",
    "A custom service only matches traffic on given ports; it cannot rewrite 8443 to 443, which is a VIP function."],
  "fg32": [
    null,
    "Central SNAT does not force every policy to use the WAN IP; you define explicit SNAT rules in the table.",
    "VIPs continue to work under central SNAT; destination NAT still uses the VIP table and does not need recreating.",
    "Destination NAT is not moved into policies; it stays in the VIP/DNAT table while only SNAT becomes central."],
  "fg33": [
    null,
    "A couple of FQDN objects miss the many changing endpoints Microsoft 365 uses, so access would be incomplete.",
    "A US geography object is far too broad, allowing all US-hosted sites rather than just Microsoft 365.",
    "A wildcard *.com is essentially the whole Internet and provides no meaningful restriction."],
  "fg34": [
    "A one-time schedule runs only once for today; it will not repeat the noon window on every weekday.",
    "A web filter warning action shows a click-through page; it does not restrict access to a specific time window.",
    "A traffic shaper limits bandwidth, not the hours during which the sites are allowed.",
    null],
  "fg35": [
    "Captive portal does not run on TCP 53; changing the portal port to 53 does not fix name resolution before login.",
    "Disabling the implicit deny is unsafe and unnecessary; the real problem is DNS being gated behind the auth policy.",
    null,
    "Setting the policy to Monitor changes logging/action but still does not let DNS resolve before the login page appears."],
  "fg36": [
    "Active authentication is not tied to RADIUS, and passive is not limited to local users; the difference is prompting vs not.",
    null,
    "Active is not admin-only and passive is not guest-only; both apply to firewall users generally.",
    "Active uses a captive portal (not FSSO), and passive methods like FSSO do not require a captive portal."],
  "fg37": [
    "Active Directory normally rejects anonymous searches, so an anonymous bind cannot look up group memberships.",
    null,
    "Simple bind with the admin's own account is not how FortiGate searches AD; a regular service-account bind is used.",
    "FortiGate LDAP does not use a Kerberos bind with no account; it needs a regular bind account to search."],
  "fg38": [
    null,
    "A local user with LDAP as its password is not how remote AD groups are referenced; you use a user group.",
    "Policies reference user groups, not raw LDAP server entries, so adding the server to the source will not work.",
    "An administrator profile governs GUI admins, not firewall users authenticating to a policy."],
  "fg39": [
    "Browser credential prompts are active (captive portal) authentication, not what the FSSO DC agent does.",
    "The DC agent sends logon events to the collector agent, not directly to FortiAnalyzer.",
    "Remotely polling each workstation's registry describes a different (agentless workstation) method, not DC agent mode.",
    null],
  "fg40": [
    "DC agent mode requires software on the domain controllers, which the Windows team has forbidden.",
    "RADIUS single sign-on is a different mechanism and is not the FSSO polling option that reads DC event logs.",
    null,
    "A captive portal is active authentication that prompts users; it is not FSSO single sign-on."],
  "fg41": [
    "How often users log in does not affect FSSO matching; the group simply must be in the monitored set.",
    "Implicit-deny logging records dropped traffic; it does not stop specific FSSO groups from matching policies.",
    null,
    "FSSO does not silently drop groups because of uppercase letters; the group must be added to the filter."],
  "fg42": [
    "Two-factor on the admin profile protects administrators, not the firewall users who need MFA here.",
    null,
    "A backup LDAP server adds redundancy for authentication, not a second authentication factor.",
    "Longer passwords strengthen a single factor but do not provide the two-factor token the requirement asks for."],
  "fg43": [
    null,
    "Reading the full decrypted request and response requires deep inspection, not certificate inspection.",
    "Certificate inspection reads handshake details, not just the destination port number.",
    "Scanning downloaded files against AV signatures requires decrypting the payload, which certificate inspection does not do."],
  "fg44": [
    "A quick-scan AV setting does not let the FortiGate see inside encrypted TLS; the traffic still is not decrypted.",
    "Enabling certificate inspection on the WAN port still does not decrypt payloads, so files inside HTTPS stay hidden.",
    "Raising the AV maximum file size does not help when the file cannot be seen at all without decryption.",
    null],
  "fg45": [
    "Reverting to certificate inspection removes decryption entirely, losing the deep inspection you wanted to keep.",
    "You do not import each website's certificate; the FortiGate re-signs with its own CA, which clients must trust.",
    "Disabling TLS 1.3 does not remove the warnings, which come from clients not trusting the FortiGate signing CA.",
    null],
  "fg46": [
    "Blocking banking sites denies the traffic entirely; the goal is to allow it while never decrypting it.",
    "Removing all security profiles for everyone loses protection broadly; you only need to exempt banking from decryption.",
    null,
    "A Friday schedule that disables SSL inspection is arbitrary and still decrypts banking on other days."],
  "fg47": [
    "The problem is not that the app needs certificate inspection off generally; it is certificate pinning rejecting the re-signed cert.",
    null,
    "The FortiGate is not blocking high ports; browsers to the same service work, pointing to pinning rather than a port block.",
    "FortiOS 7.6 does not universally drop IPv6 under deep inspection; the browser working rules this out, indicating pinning."],
  "fg48": [
    null,
    "Proxy mode buffers whole files, so it is generally slower than flow mode, not always faster.",
    "Proxy inspection supports antivirus (including CDR), so it is not limited to IPS only.",
    "Proxy mode can scan HTTP and other protocols; it is not unable to scan HTTP."],
  "fg49": [
    null,
    "In profile-based mode the inspection mode is per policy, not a single global setting for the whole unit.",
    "The flow/proxy choice is set on the policy, not inside the antivirus profile only.",
    "Inspection mode is not chosen per physical interface; it is a per-policy setting."],
  "fg50": [
    "Static routes do not replace firewall policies in policy-based NGFW mode; routing still functions separately.",
    "Security profiles are not restricted to proxy inspection in policy-based mode; flow inspection is still available.",
    "Authentication is not removed in policy-based mode; user identification and auth still work.",
    null],
  "fg51": [
    "Allow permits the URL but still passes it to the FortiGuard category check, which would re-block the social-networking site.",
    "Monitor only logs and permits without skipping later checks, so the category block would still apply.",
    null,
    "Block would deny the page, the opposite of letting the marketing team reach it."],
  "fg52": [
    "A non-closable banner is not the Warning behavior; Warning presents a page the user can click through.",
    null,
    "A credentials/login page is the Authenticate action, not Warning.",
    "A block page with no way forward is the Block action, whereas Warning lets the user proceed."],
  "fg53": [
    "Blocking invalid URLs handles malformed addresses, not sites that fail because the rating server is unreachable.",
    null,
    "Enforcing safe search restricts search engines; it does nothing about rating-server outages.",
    "Rating images by URL controls image classification, not what happens when a rating cannot be obtained."],
  "fg54": [
    null,
    "DNS filtering does not decrypt HTTPS; it inspects the DNS query, and no decryption or CA is involved.",
    "DNS filtering does not scan downloaded files for malware; that is antivirus.",
    "DNS filtering supplements firewall policies; it does not replace the need for them."],
  "fg55": [
    "Blocking only TCP 6881 fails because P2P apps hop to other ports, so most BitTorrent traffic slips through.",
    "The peer-to-peer web filter category rates websites, missing the app traffic that does not rely on those sites.",
    "A DoS session limit throttles floods, not identified P2P application traffic.",
    null],
  "fg56": [
    "Blocking the whole Social.Media category would block Facebook itself, not just its games.",
    "Adding facebook.com to the URL filter as Block denies all of Facebook, not only the games.",
    null,
    "The DNS filter has no games category to block, and it cannot distinguish games within Facebook."],
  "fg57": [
    "Application control does work on HTTPS via the SNI; the limitation is seeing actions inside the encrypted payload.",
    "The app is not on an allowlist; the real reason upload actions are invisible is the lack of deep inspection.",
    null,
    "Upload control does not require a proxy-mode DNS filter; it requires deep inspection to see in-app actions."],
  "fg58": [
    "Scanning packets as they pass without buffering describes flow-based, not proxy-based, antivirus.",
    null,
    "Proxy AV inspects file content, not just the file name against a list.",
    "Proxy AV holds the file until the scan finishes; it does not forward first and scan a copy later."],
  "fg59": [
    null,
    "Flow-based antivirus scans for known malware but does not strip macros and rebuild files; CDR does that.",
    "An IPS sensor detects exploit patterns; it does not remove active content from Office documents.",
    "A DNS filter blocks domains at lookup time; it cannot disarm macros inside email attachments."],
  "fg60": [
    "Sandboxing is not simply a faster signature database; it executes unknown files to observe behavior.",
    "Sandboxing does not decrypt HTTPS; decryption is done by SSL deep inspection, not the sandbox.",
    "Spam filtering by sender reputation is antispam, not what a sandbox provides.",
    null],
  "fg61": [
    "Enabling all signatures with action pass would inspect nothing meaningfully and blocks no exploits.",
    "Proxy-mode antivirus scans for malware in files, not exploit attempts against server vulnerabilities.",
    "A DoS policy limits floods and anomalies, not known exploit signatures targeting the servers.",
    null],
  "fg62": [
    "An application control override identifies apps; it is not the early anomaly control that limits SYN floods.",
    "A web filter quota limits browsing time/volume, not TCP SYN flood rates.",
    null,
    "An overload IP pool is source NAT; it does nothing to limit a SYN flood."],
  "fg63": [
    "Fail-open does the opposite of blocking all traffic; it lets traffic pass when IPS is overloaded.",
    null,
    "Fail-open passes traffic uninspected; it does not divert traffic to FortiSandbox when IPS fails.",
    "Fail-open concerns inspection under load, not logging; it does not stop logging to save memory."],
  "fg64": [
    null,
    "Disabling the whole sensor removes IPS protection for all traffic on the policy, far broader than needed.",
    "Setting every signature to monitor stops blocking across the board, weakening protection widely.",
    "Moving traffic to a proxy-mode policy does not target the one false-positive signature and changes inspection unnecessarily."],
  "fg65": [
    null,
    "A DNS filter blocks malicious domains at lookup, but the question asks for an IPS sensor option for C&C traffic.",
    "The Warning action shows click-through pages for web categories; it does not block botnet C&C connections.",
    "A low-severity filter selects which signatures apply; it does not specifically block command-and-control traffic."],
  "fg66": [
    "Traffic is not shared between the two; only the lower-distance route is installed as active.",
    "The higher distance value loses; lower administrative distance wins, so distance 20 is not used.",
    "Recency does not decide route selection; administrative distance does.",
    null],
  "fg67": [
    "The priority 5 route is not the only one installed; both go in the table with equal distance.",
    "Traffic is not shared evenly here; the lower priority value is preferred, not load-balanced.",
    null,
    "Equal distance does not cause a conflict that drops both routes; both are installed."],
  "fg68": [
    "The lower gateway IP is not the tie-breaker; equal distance and priority produce ECMP load sharing.",
    null,
    "Per-packet round robin is not the default and would break stateful sessions; ECMP defaults to per-source-IP.",
    "Traffic is not pinned to the first interface listed; both are used via ECMP."],
  "fg69": [
    "Policy routes are checked first, not only after a routing-table lookup fails.",
    null,
    "Policy routes apply to transit traffic too, not only to traffic from the FortiGate itself.",
    "Policy routes are always evaluated first; they are not conditional on ECMP being enabled."],
  "fg70": [
    null,
    "A missing NAT setting would cause a NAT/translation issue, not a reverse-path-forwarding drop.",
    "Implicit-deny logging only records drops; it does not cause an RPF failure.",
    "An RPF drop is about the missing return route, not the source being on a FortiGuard blocklist."],
  "fg71": [
    "get router info routing-table all shows only active routes, not the inactive ones in the database.",
    "get system arp shows the ARP table (IP-to-MAC), not inactive static routes.",
    "A session list shows live sessions, not the routing database of inactive routes.",
    null],
  "fg72": [
    "A lower priority on the backup route does not detect the primary failing; it only sets preference among active routes.",
    "A blackhole route drops traffic; it does not monitor the gateway or remove the primary route on failure.",
    null,
    "A DoS policy limits attack traffic; it does not probe the gateway or withdraw a route when it stops responding."],
  "fg73": [
    "Blackhole routes do not speed up tunnel establishment after a reboot; they only drop traffic for their prefixes.",
    "Blackhole routes drop traffic; they do not enable ECMP balancing across tunnels.",
    null,
    "Blackhole routes are not about steering FortiGuard update traffic through the tunnel."],
  "fg74": [
    "Per-user and per-application bandwidth is measured by traffic shaping/monitoring, not by a performance SLA.",
    null,
    "The number of policies per zone is a configuration count, not something an SLA probe measures.",
    "FortiGuard destination ratings come from web filtering, not from SD-WAN performance SLA probes."],
  "fg75": [
    null,
    "Lowest cost (SLA) picks the cheapest member meeting the SLA, not necessarily the one with the lowest jitter.",
    "Maximize bandwidth (SLA) spreads traffic across compliant members; it does not always pick the lowest-jitter link.",
    "Manual pins traffic to a chosen member regardless of live jitter measurements."],
  "fg76": [
    "Best quality would switch to MPLS whenever it scores slightly better, defeating the goal of staying on cheap broadband.",
    "Manual pins traffic to a chosen link and does not automatically fail over based on SLA compliance.",
    "Maximize bandwidth (SLA) load-balances across members rather than preferring the cheapest one until it fails the SLA.",
    null],
  "fg77": [
    "A loopback interface is not what SD-WAN policies reference; they use the SD-WAN zone.",
    "VIPs are destination NAT objects, not a replacement for referencing the SD-WAN zone in a policy.",
    "The HA heartbeat interface is for clustering, not for steering user traffic in a firewall policy.",
    null],
  "fg78": [
    "Per-subnet policy routes are not the missing piece; SD-WAN still needs a route sending traffic to the zone.",
    "A second performance SLA does not add a route; the routing table still has no path to the SD-WAN zone.",
    null,
    "An IP pool provides source NAT addresses; it does not create the default route SD-WAN requires."],
  "fg79": [
    "TCP 443/8443 are HTTPS/SSL VPN ports, not the IKE and NAT-T ports IPsec uses.",
    null,
    "UDP 1701 and TCP 1723 are L2TP and PPTP, not IPsec IKE/NAT-T.",
    "IKE and NAT-T use UDP 500 and UDP 4500, not TCP 500/4500."],
  "fg80": [
    null,
    "A wrong pre-shared key would fail phase 1; since phase 1 is up, the key is already proven correct.",
    "If UDP 500 were blocked, phase 1 could not complete either; but phase 1 is up, so it is not blocked.",
    "Mismatched IKE versions would prevent phase 1 from forming; phase 1 succeeding rules this out."],
  "fg81": [
    null,
    "Route-based VPNs still need firewall policies for the tunnel traffic; they do not eliminate policies.",
    "Encryption strength is identical between route-based and policy-based VPNs; that is not the advantage.",
    "Route-based VPNs support IKEv1 and IKEv2; they are not limited to IKEv1."],
  "fg82": [
    "A second phase 1 in aggressive mode is not needed; the tunnel is up but lacks a route and policies.",
    "A VIP per remote host is destination NAT and is not what a route-based tunnel needs to pass LAN traffic.",
    "Disabling NAT-T is not required; the missing pieces are the route via the tunnel and the policies.",
    null],
  "fg83": [
    "A single policy-based tunnel with two selectors does not provide ISP-level failover across two paths.",
    "Identical routes with DPD off give no clear preferred/backup path and cannot detect a dead tunnel to fail over.",
    null,
    "Manually changing the peer is not automatic failover; it requires human intervention on each outage."],
  "fg84": [
    "Encrypting traffic twice is not what DPD does; it detects unresponsive peers to tear down the tunnel.",
    null,
    "DPD does not consult FortiGuard blocklists; it probes the configured peer for responsiveness.",
    "DPD does not rekey phase 2 after every packet; PFS/rekey timers handle key renewal separately."],
  "fg85": [
    "5 would be the count only if each site needed one tunnel; a full mesh needs n(n-1)/2, which is 10.",
    null,
    "20 double-counts the tunnels; each pair shares one tunnel, giving 10, not 20.",
    "25 is 5 squared and counts nonexistent self-pairs; the correct full-mesh total is 10."],
  "fg86": [
    null,
    "A full static mesh gives direct paths but must be built and maintained by hand, unlike on-demand ADVPN.",
    "A policy-based VPN on the hub does not create on-demand spoke-to-spoke shortcut tunnels.",
    "SSL VPN web mode is remote user access to resources, not dynamic spoke-to-spoke IPsec shortcuts."],
  "fg87": [
    "The branch's IP is unknown to HQ, so HQ cannot be configured with the branch's current static peer address.",
    "Two dial-up peers both wait to be contacted and would never initiate, so the tunnel could never form.",
    "This reverses the roles: the dynamic-IP branch must initiate, and HQ must accept it as the dial-up peer.",
    null],
  "fg88": [
    "get vpn ipsec stats crypto shows crypto counters, not the live IKE negotiation messages.",
    "A session list and debug reset do not display IKE negotiation steps in real time.",
    null,
    "The routing table and disabling debug do not show IKE negotiation messages."],
  "fg89": [
    "Reusing the phase 1 key for all phase 2 keys is what happens without PFS, the opposite of enabling it.",
    "PFS does not send traffic unencrypted; it strengthens keying, and the tunnel stays encrypted.",
    null,
    "PFS does not let peers skip phase 1 on reconnect; it adds a fresh DH exchange for phase 2 keys."],
  "fg90": [
    "get system interface physical shows physical interface details, not IKE phase 1 gateway status.",
    null,
    "diagnose sys ha status reports HA cluster state, not IKE gateways.",
    "get router info bgp summary shows BGP peers, not IPsec IKE phase 1 gateways."]
});
