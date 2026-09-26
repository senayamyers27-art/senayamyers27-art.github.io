/* Hands-on firewall policy exercises for Fortinet FortiGate. Checked by tools/check-data.js against public/assets/fw.js. */
CertHub.addHandson("fortinet-fortigate", {
  items: [
    {
      id: "fg-fw-vip-web", kind: "fw", d: 2,
      title: "Tighten the policy for a published web server",
      prompt: "A web server in the DMZ is published through the virtual IP `web-vip` (external address 203.0.113.10). The wan1 to dmz policy allows all destinations and service ALL.\n\nLimit it to the VIP and to the `HTTP` and `HTTPS` services only.",
      hint: "Set the destination to web-vip and the service to HTTP, HTTPS. The implicit deny (policy 0) blocks the rest.",
      explain: "For inbound destination NAT, FortiGate policies use the VIP object as the destination, and the service should be as narrow as the published application. With all and ALL, every port on every DMZ address is exposed, including SSH and RDP. Anything that matches no policy hits the implicit deny, which shows as policy 0 in logs and in diagnose debug flow.",
      setup: { vendor: "fortigate", zones: ["lan", "dmz", "wan1"], addresses: { "web-vip": "203.0.113.10" } },
      rules: [
        { name: "wan-to-dmz", from: ["wan1"], to: ["dmz"], src: ["all"], dst: ["all"], app: ["any"], service: ["ALL"], action: "allow" }
      ],
      solution: [
        { name: "wan-to-web", from: ["wan1"], to: ["dmz"], src: ["all"], dst: ["web-vip"], app: ["any"], service: ["HTTP", "HTTPS"], action: "allow" }
      ],
      tests: [
        { label: "HTTPS from the internet to the VIP", flow: { from: "wan1", to: "dmz", src: "198.51.100.23", dst: "203.0.113.10", proto: "tcp", port: 443 }, expect: "allow" },
        { label: "HTTP from the internet to the VIP", flow: { from: "wan1", to: "dmz", src: "198.51.100.23", dst: "203.0.113.10", proto: "tcp", port: 80 }, expect: "allow" },
        { label: "SSH from the internet to the VIP", flow: { from: "wan1", to: "dmz", src: "198.51.100.23", dst: "203.0.113.10", proto: "tcp", port: 22 }, expect: "deny" },
        { label: "RDP from the internet to the VIP", flow: { from: "wan1", to: "dmz", src: "198.51.100.23", dst: "203.0.113.10", proto: "tcp", port: 3389 }, expect: "deny" },
        { label: "HTTPS to a different public address", flow: { from: "wan1", to: "dmz", src: "198.51.100.23", dst: "203.0.113.11", proto: "tcp", port: 443 }, expect: "deny" }
      ]
    },
    {
      id: "fg-fw-shadow", kind: "fw", d: 2,
      title: "Fix a shadowed policy",
      prompt: "IP cameras (`cctv-net`, 10.1.60.0/24) should never talk to the internet. A deny policy for them exists, but the camera traffic still leaves through wan1.\n\nFix the policy order so staff keep internet access and the cameras are blocked.",
      hint: "FortiGate checks policies top down and stops at the first match. Move the camera deny above the general LAN policy.",
      explain: "The broad LAN-to-internet policy also matches camera traffic, so the narrow deny below it never runs; the deny is shadowed. On FortiGate the order in the policy list decides, not the policy ID. Keeping specific policies above general ones, and checking with the policy lookup tool, avoids this common mistake.",
      setup: { vendor: "fortigate", zones: ["lan", "wan1"], addresses: { "lan-net": "10.1.0.0/16", "cctv-net": "10.1.60.0/24" } },
      rules: [
        { name: "lan-internet", from: ["lan"], to: ["wan1"], src: ["lan-net"], dst: ["all"], app: ["any"], service: ["HTTP", "HTTPS", "DNS"], action: "allow" },
        { name: "block-cameras", from: ["lan"], to: ["wan1"], src: ["cctv-net"], dst: ["all"], app: ["any"], service: ["ALL"], action: "deny" }
      ],
      solution: [
        { name: "block-cameras", from: ["lan"], to: ["wan1"], src: ["cctv-net"], dst: ["all"], app: ["any"], service: ["ALL"], action: "deny" },
        { name: "lan-internet", from: ["lan"], to: ["wan1"], src: ["lan-net"], dst: ["all"], app: ["any"], service: ["HTTP", "HTTPS", "DNS"], action: "allow" }
      ],
      tests: [
        { label: "Staff PC browses an HTTPS site", flow: { from: "lan", to: "wan1", src: "10.1.20.15", dst: "192.0.2.80", proto: "tcp", port: 443 }, expect: "allow" },
        { label: "Staff PC sends a DNS query", flow: { from: "lan", to: "wan1", src: "10.1.20.15", dst: "192.0.2.53", proto: "udp", port: 53 }, expect: "allow" },
        { label: "Camera connects out over HTTPS", flow: { from: "lan", to: "wan1", src: "10.1.60.8", dst: "198.51.100.30", proto: "tcp", port: 443 }, expect: "deny" },
        { label: "Camera sends a DNS query", flow: { from: "lan", to: "wan1", src: "10.1.60.8", dst: "192.0.2.53", proto: "udp", port: 53 }, expect: "deny" }
      ]
    },
    {
      id: "fg-fw-smtp", kind: "fw", d: 2,
      title: "Outbound SMTP only from the mail server",
      prompt: "A PC infected with spam malware was sending mail straight to the internet on TCP 25. Only the mail server (`mail-srv`, 172.16.1.25 in the DMZ) should send SMTP out.\n\nChange the policies so LAN hosts can't send SMTP to the internet, while their web and DNS traffic and the mail server's SMTP keep working.",
      hint: "Either add a deny policy for service SMTP from lan to wan1 above the LAN policy, or replace ALL in the LAN policy with only the services users need.",
      explain: "Blocking outbound TCP 25 from everything except the mail server is a standard control against spam bots and data theft by email. Users send mail through the mail server, which is the only host that talks SMTP to the internet. Replacing service ALL with the services users really need (HTTP, HTTPS, DNS) is the stronger least-privilege fix; an explicit SMTP deny above the LAN policy also works and is clear in logs.",
      setup: { vendor: "fortigate", zones: ["lan", "dmz", "wan1"], addresses: { "lan-net": "10.1.0.0/16", "mail-srv": "172.16.1.25" } },
      rules: [
        { name: "mail-out", from: ["dmz"], to: ["wan1"], src: ["mail-srv"], dst: ["all"], app: ["any"], service: ["SMTP"], action: "allow" },
        { name: "lan-internet", from: ["lan"], to: ["wan1"], src: ["lan-net"], dst: ["all"], app: ["any"], service: ["ALL"], action: "allow" }
      ],
      solution: [
        { name: "mail-out", from: ["dmz"], to: ["wan1"], src: ["mail-srv"], dst: ["all"], app: ["any"], service: ["SMTP"], action: "allow" },
        { name: "lan-internet", from: ["lan"], to: ["wan1"], src: ["lan-net"], dst: ["all"], app: ["any"], service: ["HTTP", "HTTPS", "DNS"], action: "allow" }
      ],
      tests: [
        { label: "Mail server delivers mail on TCP 25", flow: { from: "dmz", to: "wan1", src: "172.16.1.25", dst: "198.51.100.25", proto: "tcp", port: 25 }, expect: "allow" },
        { label: "LAN PC sends SMTP straight to the internet", flow: { from: "lan", to: "wan1", src: "10.1.5.7", dst: "198.51.100.25", proto: "tcp", port: 25 }, expect: "deny" },
        { label: "LAN PC browses an HTTPS site", flow: { from: "lan", to: "wan1", src: "10.1.5.7", dst: "192.0.2.80", proto: "tcp", port: 443 }, expect: "allow" },
        { label: "LAN PC sends a DNS query", flow: { from: "lan", to: "wan1", src: "10.1.5.7", dst: "192.0.2.53", proto: "udp", port: 53 }, expect: "allow" },
        { label: "Another DMZ host sends SMTP", flow: { from: "dmz", to: "wan1", src: "172.16.1.30", dst: "198.51.100.25", proto: "tcp", port: 25 }, expect: "deny" }
      ]
    },
    {
      id: "fg-fw-dns", kind: "fw", d: 2,
      title: "Force DNS through internal resolvers",
      prompt: "Clients must use the internal resolvers (group `dns-servers` on the servers interface), which forward to the internet. Today the LAN policy allows ALL to the internet, so clients can use any outside DNS server.\n\nMake client DNS to the internet fail while client web traffic, client DNS to the resolvers and resolver forwarding still work.",
      hint: "Add a deny policy from lan to wan1 for service DNS and put it above lan-internet (or narrow lan-internet to HTTP and HTTPS).",
      explain: "Central DNS lets you log every lookup, apply DNS filtering and catch malware that uses hard-coded resolvers or DNS tunneling. The FortiGate DNS service object covers both UDP and TCP 53, so one policy handles both. Only the resolvers are allowed to send DNS to the internet.",
      setup: { vendor: "fortigate", zones: ["lan", "servers", "wan1"], addresses: { "lan-net": "10.1.0.0/16", dns1: "10.10.0.53", dns2: "10.10.0.54" }, addressGroups: { "dns-servers": ["dns1", "dns2"] } },
      rules: [
        { name: "lan-to-dns", from: ["lan"], to: ["servers"], src: ["lan-net"], dst: ["dns-servers"], app: ["any"], service: ["DNS"], action: "allow" },
        { name: "dns-forward", from: ["servers"], to: ["wan1"], src: ["dns-servers"], dst: ["all"], app: ["any"], service: ["DNS"], action: "allow" },
        { name: "lan-internet", from: ["lan"], to: ["wan1"], src: ["lan-net"], dst: ["all"], app: ["any"], service: ["ALL"], action: "allow" }
      ],
      solution: [
        { name: "lan-to-dns", from: ["lan"], to: ["servers"], src: ["lan-net"], dst: ["dns-servers"], app: ["any"], service: ["DNS"], action: "allow" },
        { name: "dns-forward", from: ["servers"], to: ["wan1"], src: ["dns-servers"], dst: ["all"], app: ["any"], service: ["DNS"], action: "allow" },
        { name: "block-outside-dns", from: ["lan"], to: ["wan1"], src: ["all"], dst: ["all"], app: ["any"], service: ["DNS"], action: "deny" },
        { name: "lan-internet", from: ["lan"], to: ["wan1"], src: ["lan-net"], dst: ["all"], app: ["any"], service: ["ALL"], action: "allow" }
      ],
      tests: [
        { label: "Client queries internal resolver", flow: { from: "lan", to: "servers", src: "10.1.4.9", dst: "10.10.0.53", proto: "udp", port: 53 }, expect: "allow" },
        { label: "Client queries an outside resolver over UDP", flow: { from: "lan", to: "wan1", src: "10.1.4.9", dst: "192.0.2.53", proto: "udp", port: 53 }, expect: "deny" },
        { label: "Client queries an outside resolver over TCP", flow: { from: "lan", to: "wan1", src: "10.1.4.9", dst: "192.0.2.53", proto: "tcp", port: 53 }, expect: "deny" },
        { label: "Client browses an HTTPS site", flow: { from: "lan", to: "wan1", src: "10.1.4.9", dst: "192.0.2.80", proto: "tcp", port: 443 }, expect: "allow" },
        { label: "Resolver forwards a query", flow: { from: "servers", to: "wan1", src: "10.10.0.54", dst: "192.0.2.53", proto: "udp", port: 53 }, expect: "allow" }
      ]
    },
    {
      id: "fg-fw-mgmt", kind: "fw", d: 1,
      title: "Management access only from admins",
      prompt: "Switches and servers are managed on the mgmt interface (`mgmt-net`, 10.200.0.0/24). The current policy lets the whole LAN reach it with SSH and HTTPS.\n\nRestrict the policy so only the admin subnet (`admin-net`, 10.99.0.0/24) can manage devices. Telnet must stay blocked.",
      hint: "Change the policy source from lan-net to admin-net and keep the services to SSH and HTTPS.",
      explain: "Management access should come only from a small admin network or jump host, using encrypted protocols. Narrowing the source address is the fix; Telnet is never allowed because it sends passwords in clear text. For the FortiGate's own admin interface the same idea is applied with trusted hosts on the administrator accounts and by enabling HTTPS and SSH access only on the interfaces that need it.",
      setup: { vendor: "fortigate", zones: ["lan", "mgmt", "wan1"], addresses: { "lan-net": "10.1.0.0/16", "admin-net": "10.99.0.0/24", "mgmt-net": "10.200.0.0/24" } },
      rules: [
        { name: "lan-to-mgmt", from: ["lan"], to: ["mgmt"], src: ["all"], dst: ["mgmt-net"], app: ["any"], service: ["SSH", "HTTPS"], action: "allow" }
      ],
      solution: [
        { name: "admins-to-mgmt", from: ["lan"], to: ["mgmt"], src: ["admin-net"], dst: ["mgmt-net"], app: ["any"], service: ["SSH", "HTTPS"], action: "allow" }
      ],
      tests: [
        { label: "Admin opens SSH to a switch", flow: { from: "lan", to: "mgmt", src: "10.99.0.15", dst: "10.200.0.10", proto: "tcp", port: 22 }, expect: "allow" },
        { label: "Admin opens a web UI over HTTPS", flow: { from: "lan", to: "mgmt", src: "10.99.0.15", dst: "10.200.0.20", proto: "tcp", port: 443 }, expect: "allow" },
        { label: "User PC opens SSH to a switch", flow: { from: "lan", to: "mgmt", src: "10.1.8.30", dst: "10.200.0.10", proto: "tcp", port: 22 }, expect: "deny" },
        { label: "Admin uses Telnet", flow: { from: "lan", to: "mgmt", src: "10.99.0.15", dst: "10.200.0.10", proto: "tcp", port: 23 }, expect: "deny" }
      ]
    },
    {
      id: "fg-fw-guest", kind: "fw", d: 2,
      title: "Guest Wi-Fi internet-only policy",
      prompt: "The guest SSID interface is `guest`. Its policy goes to `any` destination interface with service ALL, so guests can reach the LAN and DMZ.\n\nChange it so guests reach only wan1, with `HTTP`, `HTTPS` and `DNS`.",
      hint: "Set the outgoing interface to wan1 and the services to HTTP, HTTPS, DNS. The implicit deny covers everything else.",
      explain: "Guest Wi-Fi is untrusted, so it is isolated from internal networks and gets only the services visitors need. Using wan1 as the outgoing interface keeps guests off the LAN and DMZ, and limiting services blocks things like direct SMTP. The implicit deny at the bottom of the list (policy 0) catches everything that doesn't match.",
      setup: { vendor: "fortigate", zones: ["lan", "dmz", "guest", "wan1"], addresses: { "guest-net": "172.20.0.0/22" } },
      rules: [
        { name: "guest-access", from: ["guest"], to: ["any"], src: ["guest-net"], dst: ["all"], app: ["any"], service: ["ALL"], action: "allow" }
      ],
      solution: [
        { name: "guest-internet", from: ["guest"], to: ["wan1"], src: ["guest-net"], dst: ["all"], app: ["any"], service: ["HTTP", "HTTPS", "DNS"], action: "allow" }
      ],
      tests: [
        { label: "Guest browses an HTTPS site", flow: { from: "guest", to: "wan1", src: "172.20.1.14", dst: "192.0.2.80", proto: "tcp", port: 443 }, expect: "allow" },
        { label: "Guest sends a DNS query", flow: { from: "guest", to: "wan1", src: "172.20.1.14", dst: "192.0.2.53", proto: "udp", port: 53 }, expect: "allow" },
        { label: "Guest reaches a LAN file server", flow: { from: "guest", to: "lan", src: "172.20.1.14", dst: "10.1.0.25", proto: "tcp", port: 445 }, expect: "deny" },
        { label: "Guest reaches a DMZ web server", flow: { from: "guest", to: "dmz", src: "172.20.1.14", dst: "172.16.1.10", proto: "tcp", port: 80 }, expect: "deny" },
        { label: "Guest sends SMTP to the internet", flow: { from: "guest", to: "wan1", src: "172.20.1.14", dst: "198.51.100.25", proto: "tcp", port: 25 }, expect: "deny" }
      ]
    },
    {
      id: "fg-fw-geo", kind: "fw", d: 2,
      title: "Block a region list from the VPN portal",
      prompt: "The SSL VPN web portal in the DMZ (`vpn-portal`, 203.0.113.20) is open to everyone. The company has no users in certain regions, collected in the address group `blocked-regions` (standing in for geography address objects).\n\nBlock those sources from the portal while keeping it open to everyone else.",
      hint: "Add a deny policy from wan1 to dmz with source blocked-regions, above the portal policy.",
      explain: "Geography address objects (and ISDB or threat feed objects) let a FortiGate drop traffic from regions with no legitimate users, cutting a lot of credential-guessing noise. It is a risk reduction, not a complete control, because attackers can use VPNs or cloud hosts elsewhere, so MFA and patching still matter. The deny must sit above the general allow, or the allow matches first.",
      setup: { vendor: "fortigate", zones: ["dmz", "wan1"], addresses: { "vpn-portal": "203.0.113.20" }, addressGroups: { "blocked-regions": ["198.51.100.0/24", "203.0.113.128/25"] } },
      rules: [
        { name: "portal-in", from: ["wan1"], to: ["dmz"], src: ["all"], dst: ["vpn-portal"], app: ["any"], service: ["HTTPS"], action: "allow" }
      ],
      solution: [
        { name: "block-regions", from: ["wan1"], to: ["dmz"], src: ["blocked-regions"], dst: ["all"], app: ["any"], service: ["ALL"], action: "deny" },
        { name: "portal-in", from: ["wan1"], to: ["dmz"], src: ["all"], dst: ["vpn-portal"], app: ["any"], service: ["HTTPS"], action: "allow" }
      ],
      tests: [
        { label: "Remote user from an allowed region", flow: { from: "wan1", to: "dmz", src: "192.0.2.44", dst: "203.0.113.20", proto: "tcp", port: 443 }, expect: "allow" },
        { label: "Connection from 198.51.100.20 (blocked region)", flow: { from: "wan1", to: "dmz", src: "198.51.100.20", dst: "203.0.113.20", proto: "tcp", port: 443 }, expect: "deny" },
        { label: "Connection from 203.0.113.200 (blocked region)", flow: { from: "wan1", to: "dmz", src: "203.0.113.200", dst: "203.0.113.20", proto: "tcp", port: 443 }, expect: "deny" },
        { label: "Connection from 203.0.113.50 (not in the list)", flow: { from: "wan1", to: "dmz", src: "203.0.113.50", dst: "203.0.113.20", proto: "tcp", port: 443 }, expect: "allow" }
      ]
    },
    {
      id: "fg-fw-appctl", kind: "fw", d: 3,
      title: "Block risky apps in NGFW policy mode",
      prompt: "This FortiGate runs in policy-based NGFW mode, so security policies can match applications. The LAN policy allows every application. Block `BitTorrent` and `Tor`, keep `HTTPS.BROWSER`, `HTTP.BROWSER` and `Microsoft.Office.365` working.\n\nRemember that these apps are identified by signature, not by port.",
      hint: "Add a deny policy for the BitTorrent and Tor applications above the allow policy. The service can stay ALL because application signatures do the matching.",
      explain: "Application control identifies apps from their traffic patterns, so BitTorrent is caught even when it runs on TCP 443, which a port-based block would miss. In policy-based NGFW mode the application goes in the security policy itself; in profile-based mode the same result comes from an application control sensor with those apps set to block. Encrypted apps often need deep SSL inspection for reliable detection.",
      setup: { vendor: "fortigate", zones: ["lan", "wan1"], addresses: { "lan-net": "10.1.0.0/16" }, appDefaults: { "HTTPS.BROWSER": "tcp/443", "HTTP.BROWSER": "tcp/80", "Microsoft.Office.365": "tcp/443", BitTorrent: "tcp/6881-6889", Tor: "tcp/9001" } },
      rules: [
        { name: "lan-apps", from: ["lan"], to: ["wan1"], src: ["lan-net"], dst: ["all"], app: ["any"], service: ["ALL"], action: "allow" }
      ],
      solution: [
        { name: "block-risky", from: ["lan"], to: ["wan1"], src: ["all"], dst: ["all"], app: ["BitTorrent", "Tor"], service: ["ALL"], action: "deny" },
        { name: "lan-apps", from: ["lan"], to: ["wan1"], src: ["lan-net"], dst: ["all"], app: ["any"], service: ["ALL"], action: "allow" }
      ],
      tests: [
        { label: "HTTPS browsing", flow: { from: "lan", to: "wan1", src: "10.1.3.40", dst: "192.0.2.80", proto: "tcp", port: 443, app: "HTTPS.BROWSER" }, expect: "allow" },
        { label: "Microsoft 365", flow: { from: "lan", to: "wan1", src: "10.1.3.40", dst: "192.0.2.90", proto: "tcp", port: 443, app: "Microsoft.Office.365" }, expect: "allow" },
        { label: "BitTorrent on its usual port", flow: { from: "lan", to: "wan1", src: "10.1.3.40", dst: "198.51.100.5", proto: "tcp", port: 6881, app: "BitTorrent" }, expect: "deny" },
        { label: "BitTorrent hiding on TCP 443", flow: { from: "lan", to: "wan1", src: "10.1.3.40", dst: "198.51.100.5", proto: "tcp", port: 443, app: "BitTorrent" }, expect: "deny" },
        { label: "Tor connection", flow: { from: "lan", to: "wan1", src: "10.1.3.40", dst: "198.51.100.9", proto: "tcp", port: 9001, app: "Tor" }, expect: "deny" }
      ]
    }
  ]
});
