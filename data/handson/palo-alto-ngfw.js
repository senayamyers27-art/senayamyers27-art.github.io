/* Hands-on firewall policy exercises for Palo Alto Networks NGFW Engineer. Checked by tools/check-data.js against public/assets/fw.js. */
CertHub.addHandson("palo-alto-ngfw", {
  items: [
    {
      id: "pa-fw-dmz-web", kind: "fw", d: 1,
      title: "Least-privilege rule for a DMZ web server",
      prompt: "A public web server sits in the dmz zone behind destination NAT. Its public address is `web-public` (203.0.113.10). The rule someone wrote allows anything from untrust into the DMZ.\n\nRewrite the rule so the internet can reach only the web server, only with the `web-browsing` and `ssl` applications on their standard ports. Everything else inbound must be denied.",
      hint: "Set the destination to web-public (the pre-NAT address), the applications to ssl and web-browsing, and the service to application-default. The interzone-default rule denies the rest.",
      explain: "Least privilege on an inbound rule means naming the exact destination, the exact applications and their default ports. With destination NAT, PAN-OS security rules use the pre-NAT (public) destination address together with the post-NAT zone, here dmz. application-default stops the allowed apps from being used on odd ports, and the implicit interzone-default rule quietly denies SSH, RDP and traffic to other DMZ hosts.",
      setup: { vendor: "paloalto", zones: ["trust", "untrust", "dmz"], addresses: { "web-public": "203.0.113.10", "dmz-net": "203.0.113.0/28" } },
      rules: [
        { name: "inbound-dmz", from: ["untrust"], to: ["dmz"], src: ["any"], dst: ["any"], app: ["any"], service: ["any"], action: "allow" }
      ],
      solution: [
        { name: "inbound-web", from: ["untrust"], to: ["dmz"], src: ["any"], dst: ["web-public"], app: ["ssl", "web-browsing"], service: ["application-default"], action: "allow" }
      ],
      tests: [
        { label: "HTTPS from the internet to the web server", flow: { from: "untrust", to: "dmz", src: "198.51.100.23", dst: "203.0.113.10", proto: "tcp", port: 443, app: "ssl" }, expect: "allow" },
        { label: "HTTP from the internet to the web server", flow: { from: "untrust", to: "dmz", src: "198.51.100.23", dst: "203.0.113.10", proto: "tcp", port: 80, app: "web-browsing" }, expect: "allow" },
        { label: "SSH from the internet to the web server", flow: { from: "untrust", to: "dmz", src: "198.51.100.23", dst: "203.0.113.10", proto: "tcp", port: 22, app: "ssh" }, expect: "deny" },
        { label: "RDP from the internet to the web server", flow: { from: "untrust", to: "dmz", src: "198.51.100.23", dst: "203.0.113.10", proto: "tcp", port: 3389, app: "ms-rdp" }, expect: "deny" },
        { label: "HTTPS from the internet to a different DMZ host", flow: { from: "untrust", to: "dmz", src: "198.51.100.23", dst: "203.0.113.11", proto: "tcp", port: 443, app: "ssl" }, expect: "deny" }
      ]
    },
    {
      id: "pa-fw-shadow", kind: "fw", d: 1,
      title: "Fix a shadowed deny rule",
      prompt: "The kiosk PCs in the lobby (`kiosk-net`, 10.1.50.0/24) must not reach the internet at all. A deny rule for them exists, yet the kiosks still browse freely.\n\nFind out why and fix the rulebase so staff keep internet access and the kiosks are blocked.",
      hint: "Rules are checked top to bottom and the first match wins. A broad allow above a narrow deny hides (shadows) the deny. Move the kiosk rule up.",
      explain: "This is rule shadowing: the broad allow-staff-internet rule matches kiosk traffic first, so the more specific deny below it never gets a chance. PAN-OS warns about shadowed rules at commit time for this reason. The fix is ordering: specific rules (especially exceptions and denies) go above broad ones. Deleting the deny and narrowing the allow also works, but placing specific rules first is the habit to build.",
      setup: { vendor: "paloalto", zones: ["trust", "untrust"], addresses: { "staff-net": "10.1.0.0/16", "kiosk-net": "10.1.50.0/24" } },
      rules: [
        { name: "allow-staff-internet", from: ["trust"], to: ["untrust"], src: ["staff-net"], dst: ["any"], app: ["ssl", "web-browsing", "dns"], service: ["application-default"], action: "allow" },
        { name: "deny-kiosks", from: ["trust"], to: ["untrust"], src: ["kiosk-net"], dst: ["any"], app: ["any"], service: ["any"], action: "deny" }
      ],
      solution: [
        { name: "deny-kiosks", from: ["trust"], to: ["untrust"], src: ["kiosk-net"], dst: ["any"], app: ["any"], service: ["any"], action: "deny" },
        { name: "allow-staff-internet", from: ["trust"], to: ["untrust"], src: ["staff-net"], dst: ["any"], app: ["ssl", "web-browsing", "dns"], service: ["application-default"], action: "allow" }
      ],
      tests: [
        { label: "Staff PC browses an HTTPS site", flow: { from: "trust", to: "untrust", src: "10.1.20.15", dst: "192.0.2.80", proto: "tcp", port: 443, app: "ssl" }, expect: "allow" },
        { label: "Staff PC looks up a name with DNS", flow: { from: "trust", to: "untrust", src: "10.1.20.15", dst: "192.0.2.53", proto: "udp", port: 53, app: "dns" }, expect: "allow" },
        { label: "Kiosk PC browses an HTTPS site", flow: { from: "trust", to: "untrust", src: "10.1.50.7", dst: "192.0.2.80", proto: "tcp", port: 443, app: "ssl" }, expect: "deny" },
        { label: "Kiosk PC browses an HTTP site", flow: { from: "trust", to: "untrust", src: "10.1.50.7", dst: "192.0.2.80", proto: "tcp", port: 80, app: "web-browsing" }, expect: "deny" }
      ]
    },
    {
      id: "pa-fw-risky-apps", kind: "fw", d: 1,
      title: "Allow business apps, block risky ones",
      prompt: "Users in trust reach the internet through one allow-everything rule. Security wants peer-to-peer file sharing (`bittorrent`) and anonymizers (`tor`) blocked, while web browsing (`web-browsing`, `ssl`) and Microsoft 365 (`ms-office365`) keep working.\n\nBuild the outbound rules with App-ID. Note that some risky apps will try to hide on port 443.",
      hint: "Write an allow rule that names only the business applications with service application-default. Anything not named falls to interzone-default. An explicit deny rule for bittorrent and tor placed on top makes the intent visible in logs.",
      explain: "App-ID identifies the application from the traffic itself rather than the port, so BitTorrent is still recognized when it runs on TCP 443. A positive (allow-list) rule for the approved apps is the recommended approach: new or unknown apps are denied by default. Adding an explicit deny for known-risky apps above it is optional, but it gives clear log entries. An allow-any rule, by contrast, lets every app out on any port.",
      setup: { vendor: "paloalto", zones: ["trust", "untrust"], addresses: { users: "10.1.0.0/16" }, appDefaults: { "ms-office365": "tcp/443", bittorrent: "tcp/6881-6889", tor: "tcp/9001" } },
      rules: [
        { name: "allow-internet", from: ["trust"], to: ["untrust"], src: ["users"], dst: ["any"], app: ["any"], service: ["any"], action: "allow" }
      ],
      solution: [
        { name: "block-risky-apps", from: ["trust"], to: ["untrust"], src: ["any"], dst: ["any"], app: ["bittorrent", "tor"], service: ["any"], action: "deny" },
        { name: "allow-business-apps", from: ["trust"], to: ["untrust"], src: ["users"], dst: ["any"], app: ["web-browsing", "ssl", "ms-office365"], service: ["application-default"], action: "allow" }
      ],
      tests: [
        { label: "Web browsing on port 80", flow: { from: "trust", to: "untrust", src: "10.1.3.40", dst: "192.0.2.80", proto: "tcp", port: 80, app: "web-browsing" }, expect: "allow" },
        { label: "HTTPS browsing on port 443", flow: { from: "trust", to: "untrust", src: "10.1.3.40", dst: "192.0.2.80", proto: "tcp", port: 443, app: "ssl" }, expect: "allow" },
        { label: "Microsoft 365 on port 443", flow: { from: "trust", to: "untrust", src: "10.1.3.40", dst: "192.0.2.90", proto: "tcp", port: 443, app: "ms-office365" }, expect: "allow" },
        { label: "BitTorrent on its usual port", flow: { from: "trust", to: "untrust", src: "10.1.3.40", dst: "198.51.100.5", proto: "tcp", port: 6881, app: "bittorrent" }, expect: "deny" },
        { label: "BitTorrent hiding on port 443", flow: { from: "trust", to: "untrust", src: "10.1.3.40", dst: "198.51.100.5", proto: "tcp", port: 443, app: "bittorrent" }, expect: "deny" },
        { label: "Tor connection", flow: { from: "trust", to: "untrust", src: "10.1.3.40", dst: "198.51.100.9", proto: "tcp", port: 9001, app: "tor" }, expect: "deny" }
      ]
    },
    {
      id: "pa-fw-app-default", kind: "fw", d: 1,
      title: "application-default versus any",
      prompt: "The outbound rule allows `ssl`, `web-browsing` and `dns` with service `any`, so those apps work on any port, which lets tools tunnel out on unusual ports.\n\nLock the apps to their default ports. One exception is required: the partner portal (`partner-portal`, 198.51.100.40) really does run web-browsing on TCP 8080, using the service object `tcp-8080`.",
      hint: "Change the service of the general rule to application-default. Add a second rule for web-browsing to partner-portal with service tcp-8080.",
      explain: "With service any, an allowed application matches on every port, so ssl on TCP 4444 or web-browsing on 8080 passes. application-default restricts each app to the ports Palo Alto lists for it (ssl on 443, web-browsing on 80, dns on 53), which is the recommended setting. When a legitimate app really uses a non-standard port, write a narrow rule for that destination with a specific service object instead of opening the port for everyone.",
      setup: { vendor: "paloalto", zones: ["trust", "untrust"], addresses: { users: "10.1.0.0/16", "partner-portal": "198.51.100.40" }, services: { "tcp-8080": "tcp/8080" } },
      rules: [
        { name: "allow-web", from: ["trust"], to: ["untrust"], src: ["users"], dst: ["any"], app: ["ssl", "web-browsing", "dns"], service: ["any"], action: "allow" }
      ],
      solution: [
        { name: "allow-partner-portal", from: ["trust"], to: ["untrust"], src: ["users"], dst: ["partner-portal"], app: ["web-browsing"], service: ["tcp-8080"], action: "allow" },
        { name: "allow-web", from: ["trust"], to: ["untrust"], src: ["users"], dst: ["any"], app: ["ssl", "web-browsing", "dns"], service: ["application-default"], action: "allow" }
      ],
      tests: [
        { label: "HTTPS on port 443", flow: { from: "trust", to: "untrust", src: "10.1.7.21", dst: "192.0.2.80", proto: "tcp", port: 443, app: "ssl" }, expect: "allow" },
        { label: "DNS on UDP 53", flow: { from: "trust", to: "untrust", src: "10.1.7.21", dst: "192.0.2.53", proto: "udp", port: 53, app: "dns" }, expect: "allow" },
        { label: "Web browsing to the partner portal on 8080", flow: { from: "trust", to: "untrust", src: "10.1.7.21", dst: "198.51.100.40", proto: "tcp", port: 8080, app: "web-browsing" }, expect: "allow" },
        { label: "Web browsing to another site on 8080", flow: { from: "trust", to: "untrust", src: "10.1.7.21", dst: "192.0.2.80", proto: "tcp", port: 8080, app: "web-browsing" }, expect: "deny" },
        { label: "SSL on TCP 4444", flow: { from: "trust", to: "untrust", src: "10.1.7.21", dst: "198.51.100.66", proto: "tcp", port: 4444, app: "ssl" }, expect: "deny" }
      ]
    },
    {
      id: "pa-fw-dns", kind: "fw", d: 1,
      title: "DNS only through internal resolvers",
      prompt: "Clients should resolve names only through the two internal resolvers (address group `internal-dns`) in the servers zone. The resolvers themselves forward queries to the internet. Right now clients can query any DNS server on the internet, and the resolvers can't get out.\n\nFix the rules so client DNS goes only to the internal resolvers and the resolvers can reach the internet for DNS.",
      hint: "Remove dns from the clients' internet rule, then add a rule from servers to untrust for the internal-dns group with the dns application.",
      explain: "Forcing DNS through internal resolvers gives one place to log queries, apply DNS security filtering and spot malware that uses its own DNS servers or DNS tunneling. Clients get DNS only to the resolvers, and only the resolvers may send DNS to the internet. Traffic that matches no rule between different zones hits interzone-default and is denied.",
      setup: { vendor: "paloalto", zones: ["trust", "servers", "untrust"], addresses: { clients: "10.1.0.0/16", dns1: "10.10.0.53", dns2: "10.10.0.54" }, addressGroups: { "internal-dns": ["dns1", "dns2"] } },
      rules: [
        { name: "clients-to-dns", from: ["trust"], to: ["servers"], src: ["clients"], dst: ["internal-dns"], app: ["dns"], service: ["application-default"], action: "allow" },
        { name: "clients-internet", from: ["trust"], to: ["untrust"], src: ["clients"], dst: ["any"], app: ["ssl", "web-browsing", "dns"], service: ["application-default"], action: "allow" }
      ],
      solution: [
        { name: "clients-to-dns", from: ["trust"], to: ["servers"], src: ["clients"], dst: ["internal-dns"], app: ["dns"], service: ["application-default"], action: "allow" },
        { name: "clients-internet", from: ["trust"], to: ["untrust"], src: ["clients"], dst: ["any"], app: ["ssl", "web-browsing"], service: ["application-default"], action: "allow" },
        { name: "resolvers-out", from: ["servers"], to: ["untrust"], src: ["internal-dns"], dst: ["any"], app: ["dns"], service: ["application-default"], action: "allow" }
      ],
      tests: [
        { label: "Client queries internal resolver 1", flow: { from: "trust", to: "servers", src: "10.1.4.9", dst: "10.10.0.53", proto: "udp", port: 53, app: "dns" }, expect: "allow" },
        { label: "Client queries internal resolver 2", flow: { from: "trust", to: "servers", src: "10.1.4.9", dst: "10.10.0.54", proto: "udp", port: 53, app: "dns" }, expect: "allow" },
        { label: "Client queries a public DNS server directly", flow: { from: "trust", to: "untrust", src: "10.1.4.9", dst: "192.0.2.53", proto: "udp", port: 53, app: "dns" }, expect: "deny" },
        { label: "Client browses an HTTPS site", flow: { from: "trust", to: "untrust", src: "10.1.4.9", dst: "192.0.2.80", proto: "tcp", port: 443, app: "ssl" }, expect: "allow" },
        { label: "Resolver forwards a query to the internet", flow: { from: "servers", to: "untrust", src: "10.10.0.53", dst: "192.0.2.53", proto: "udp", port: 53, app: "dns" }, expect: "allow" }
      ]
    },
    {
      id: "pa-fw-mgmt", kind: "fw", d: 2,
      title: "Management access only from the admin subnet",
      prompt: "The management network (zone mgmt) holds switch and server management interfaces. The current rule lets anyone in trust reach it with `ssh` and `ssl`.\n\nRestrict it so only the admin subnet (`admin-net`, 10.99.0.0/24) can manage devices, using SSH and HTTPS only. Telnet stays blocked for everyone.",
      hint: "Set the source of the management rule to admin-net. Keep the apps to ssh and ssl with application-default.",
      explain: "Management interfaces are high-value targets, so access is limited to a small, known admin subnet (or a jump host) and to encrypted protocols. Scoping the source address is the key change; application-default keeps SSH and HTTPS on their normal ports, and Telnet is never allowed because it sends credentials in clear text. On the firewall itself the same idea applies through permitted IP addresses on the management interface and interface management profiles.",
      setup: { vendor: "paloalto", zones: ["trust", "mgmt", "untrust"], addresses: { "admin-net": "10.99.0.0/24", "mgmt-net": "10.200.0.0/24" } },
      rules: [
        { name: "allow-mgmt", from: ["trust"], to: ["mgmt"], src: ["any"], dst: ["mgmt-net"], app: ["ssh", "ssl"], service: ["application-default"], action: "allow" }
      ],
      solution: [
        { name: "allow-mgmt", from: ["trust"], to: ["mgmt"], src: ["admin-net"], dst: ["mgmt-net"], app: ["ssh", "ssl"], service: ["application-default"], action: "allow" }
      ],
      tests: [
        { label: "Admin workstation opens SSH to a switch", flow: { from: "trust", to: "mgmt", src: "10.99.0.15", dst: "10.200.0.10", proto: "tcp", port: 22, app: "ssh" }, expect: "allow" },
        { label: "Admin workstation opens a web UI over HTTPS", flow: { from: "trust", to: "mgmt", src: "10.99.0.15", dst: "10.200.0.20", proto: "tcp", port: 443, app: "ssl" }, expect: "allow" },
        { label: "Ordinary user opens SSH to a switch", flow: { from: "trust", to: "mgmt", src: "10.1.8.30", dst: "10.200.0.10", proto: "tcp", port: 22, app: "ssh" }, expect: "deny" },
        { label: "Admin workstation uses Telnet", flow: { from: "trust", to: "mgmt", src: "10.99.0.15", dst: "10.200.0.10", proto: "tcp", port: 23, app: "telnet" }, expect: "deny" },
        { label: "Internet host tries SSH to management", flow: { from: "untrust", to: "mgmt", src: "198.51.100.77", dst: "10.200.0.10", proto: "tcp", port: 22, app: "ssh" }, expect: "deny" }
      ]
    },
    {
      id: "pa-fw-threat-list", kind: "fw", d: 3,
      title: "Block a threat intelligence list",
      prompt: "The SOC's threat feed is loaded as the address group `threat-feed` (a stand-in for an external dynamic list). Inbound connections from it are already blocked, but infected hosts can still call out to it.\n\nAdd what's needed so no host in trust can reach anything in `threat-feed`, while normal browsing still works.",
      hint: "Add a deny rule from trust to untrust with destination threat-feed, and place it above the browsing rule.",
      explain: "Threat lists need to be enforced in both directions: inbound to stop scanning and exploitation, and outbound to cut command-and-control and data exfiltration from hosts that are already compromised. In PAN-OS an external dynamic list refreshes on a schedule, so the rule stays the same while the list changes. The block rule has to sit above the general allow, or the allow matches first.",
      setup: { vendor: "paloalto", zones: ["trust", "untrust"], addresses: { users: "10.1.0.0/16" }, addressGroups: { "threat-feed": ["198.51.100.0/24", "203.0.113.66", "192.0.2.128/25"] } },
      rules: [
        { name: "block-threat-inbound", from: ["untrust"], to: ["trust"], src: ["threat-feed"], dst: ["any"], app: ["any"], service: ["any"], action: "deny" },
        { name: "allow-browsing", from: ["trust"], to: ["untrust"], src: ["users"], dst: ["any"], app: ["ssl", "web-browsing"], service: ["application-default"], action: "allow" }
      ],
      solution: [
        { name: "block-threat-inbound", from: ["untrust"], to: ["trust"], src: ["threat-feed"], dst: ["any"], app: ["any"], service: ["any"], action: "deny" },
        { name: "block-threat-outbound", from: ["trust"], to: ["untrust"], src: ["any"], dst: ["threat-feed"], app: ["any"], service: ["any"], action: "deny" },
        { name: "allow-browsing", from: ["trust"], to: ["untrust"], src: ["users"], dst: ["any"], app: ["ssl", "web-browsing"], service: ["application-default"], action: "allow" }
      ],
      tests: [
        { label: "User browses a normal HTTPS site", flow: { from: "trust", to: "untrust", src: "10.1.2.44", dst: "192.0.2.20", proto: "tcp", port: 443, app: "ssl" }, expect: "allow" },
        { label: "User browses a normal HTTP site", flow: { from: "trust", to: "untrust", src: "10.1.2.44", dst: "192.0.2.99", proto: "tcp", port: 80, app: "web-browsing" }, expect: "allow" },
        { label: "Host connects to 203.0.113.66 (on the list)", flow: { from: "trust", to: "untrust", src: "10.1.2.44", dst: "203.0.113.66", proto: "tcp", port: 443, app: "ssl" }, expect: "deny" },
        { label: "Host connects to 198.51.100.9 (on the list)", flow: { from: "trust", to: "untrust", src: "10.1.2.44", dst: "198.51.100.9", proto: "tcp", port: 80, app: "web-browsing" }, expect: "deny" },
        { label: "Host connects to 192.0.2.200 (in a listed range)", flow: { from: "trust", to: "untrust", src: "10.1.2.44", dst: "192.0.2.200", proto: "tcp", port: 443, app: "ssl" }, expect: "deny" }
      ]
    },
    {
      id: "pa-fw-guest", kind: "fw", d: 1,
      title: "Guest Wi-Fi gets internet only",
      prompt: "The guest zone serves visitor Wi-Fi. Its rule allows web and DNS to `any` destination zone, so guests can reach internal servers and the DMZ.\n\nChange it so guests reach only the internet (untrust) with `ssl`, `web-browsing` and `dns`, and nothing internal.",
      hint: "Set the rule's destination zone to untrust instead of any. Interzone-default then denies guest traffic to trust and dmz.",
      explain: "Guest networks are untrusted, so they should be segmented from internal zones and allowed only out to the internet. Setting the destination zone to untrust is the simplest precise control; the interzone-default deny handles guest-to-trust and guest-to-dmz. Limiting apps to web and DNS with application-default also keeps guests from running file sharing or other apps that could create legal or security problems.",
      setup: { vendor: "paloalto", zones: ["trust", "dmz", "guest", "untrust"], addresses: { "guest-net": "172.20.0.0/22" } },
      rules: [
        { name: "guest-access", from: ["guest"], to: ["any"], src: ["guest-net"], dst: ["any"], app: ["ssl", "web-browsing", "dns"], service: ["application-default"], action: "allow" }
      ],
      solution: [
        { name: "guest-internet", from: ["guest"], to: ["untrust"], src: ["guest-net"], dst: ["any"], app: ["ssl", "web-browsing", "dns"], service: ["application-default"], action: "allow" }
      ],
      tests: [
        { label: "Guest browses an HTTPS site", flow: { from: "guest", to: "untrust", src: "172.20.1.14", dst: "192.0.2.80", proto: "tcp", port: 443, app: "ssl" }, expect: "allow" },
        { label: "Guest uses a public DNS server", flow: { from: "guest", to: "untrust", src: "172.20.1.14", dst: "192.0.2.53", proto: "udp", port: 53, app: "dns" }, expect: "allow" },
        { label: "Guest reaches an internal file server", flow: { from: "guest", to: "trust", src: "172.20.1.14", dst: "10.1.0.25", proto: "tcp", port: 443, app: "ssl" }, expect: "deny" },
        { label: "Guest reaches a DMZ web server", flow: { from: "guest", to: "dmz", src: "172.20.1.14", dst: "172.16.1.10", proto: "tcp", port: 80, app: "web-browsing" }, expect: "deny" },
        { label: "Guest runs BitTorrent to the internet", flow: { from: "guest", to: "untrust", src: "172.20.1.14", dst: "198.51.100.5", proto: "tcp", port: 6881, app: "bittorrent" }, expect: "deny" }
      ]
    }
  ]
});
