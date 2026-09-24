/* Networking labs: subnetting, packet analysis, discovery, Cisco Packet Tracer,
   troubleshooting, firewalling, Wi-Fi review and automation. Format: LABS_FORMAT.md. */
CertHub.registerLabs([
  {
    id: "lab-subnetting",
    title: "Plan and verify a VLSM and IPv6 addressing scheme",
    track: "Networking",
    level: "Beginner",
    minutes: 90,
    cost: "Free",
    summary: "Split 10.10.0.0/22 into right-sized subnets for a small office, plan matching IPv6 /64s, check every answer with ipcalc and sipcalc, then apply one subnet to your lab VMs with netplan and prove it works.",
    realWorld: "Network engineers write addressing plans before a new site, VLAN or cloud VPC goes live. A wrong mask or overlapping range causes outages that are painful to fix later, so plans get peer-reviewed and checked with a calculator, just as you do here.",
    youWillNeed: ["Your Ubuntu Server 24.04 VM and Windows evaluation VM from lab-home-lab", "Pen and paper or a spreadsheet for the plan", "ipcalc and sipcalc (installed in step 1)"],
    requires: ["lab-home-lab"],
    steps: [
      {
        title: "Install the calculators",
        body: "ipcalc and sipcalc are free subnet calculators in Ubuntu's repositories. Do the math by hand first in each step, then use them only to check your answers.",
        cmd: "sudo apt update && sudo apt install -y ipcalc sipcalc",
        check: "`ipcalc 192.168.1.0/24` prints Netmask 255.255.255.0 = 24 and Hosts/Net: 254."
      },
      {
        title: "Write down the requirements",
        body: "The office needs: Users 300 hosts (VLAN 10), VoIP 100 phones (VLAN 20), Servers 40 hosts (VLAN 30), Guest Wi-Fi 25 clients (VLAN 40), and two router-to-router links. All of it must fit in 10.10.0.0/22 (1,024 addresses, 10.10.0.0 to 10.10.3.255). Usable hosts per subnet = 2^(32 - prefix) - 2.",
        check: "You have a table with columns: Name, VLAN, Hosts needed, Prefix, Network, First usable, Last usable, Broadcast."
      },
      {
        title: "Pick a prefix for each subnet, largest first",
        body: "Choose the smallest block that fits each need, then allocate from the biggest down so blocks stay aligned. Answer: Users /23 (510 usable), VoIP /25 (126), Servers /26 (62), Guest /27 (30), each link /30 (2).",
        check: "Your allocation reads: Users 10.10.0.0/23, VoIP 10.10.2.0/25, Servers 10.10.2.128/26, Guest 10.10.2.192/27, Link-1 10.10.2.224/30, Link-2 10.10.2.228/30. 10.10.2.232 to 10.10.3.255 is free for growth."
      },
      {
        title: "Verify each subnet with ipcalc",
        body: "Check network, broadcast and usable range for each row of your table. The gateway convention in this plan is the first usable address.",
        cmd: "ipcalc 10.10.0.0/23\nipcalc 10.10.2.0/25\nipcalc 10.10.2.128/26\nipcalc 10.10.2.192/27\nipcalc 10.10.2.224/30\nipcalc 10.10.2.228/30",
        check: "10.10.2.128/26 shows HostMin 10.10.2.129, HostMax 10.10.2.190, Broadcast 10.10.2.191, Hosts/Net 62."
      },
      {
        title: "Let ipcalc do the whole VLSM split",
        body: "The Debian/Ubuntu ipcalc can split a block into subnets that fit given host counts. Compare its answer with yours. If your version names the option differently, run `man ipcalc` and look for split.",
        cmd: "ipcalc 10.10.0.0/22 -s 300 100 40 25 2 2",
        check: "It returns the same six networks you chose and reports the unused space."
      },
      {
        title: "Cross-check with sipcalc",
        body: "A second tool catches mistakes in the first. sipcalc shows the same data in a different layout, including the wildcard mask you will need for Cisco ACLs and OSPF.",
        cmd: "sipcalc 10.10.2.192/27\nsipcalc 10.10.2.224/30",
        check: "For /27 the Network mask is 255.255.255.224 and the Cisco wildcard is 0.0.0.31."
      },
      {
        title: "Plan IPv6 /64s for the same VLANs",
        body: "Use the documentation prefix 2001:db8:acad::/48 as if it were your site allocation. Every LAN gets a /64, no matter how many hosts, because SLAAC needs a 64-bit interface ID. Match the fourth hextet to the VLAN number so it is easy to read: Users 2001:db8:acad:10::/64, VoIP :20::/64, Servers :30::/64, Guest :40::/64. Links can use /64 or /127 (RFC 6164).",
        cmd: "sipcalc 2001:db8:acad:30::/64",
        check: "sipcalc shows the expanded address 2001:0db8:acad:0030:0000:0000:0000:0000 and a /64 prefix."
      },
      {
        title: "Work out an EUI-64 and link-local address by hand",
        body: "Find the MAC of the Ubuntu host-only NIC (VirtualBox MACs start 08:00:27). EUI-64: split the MAC in half, insert ff:fe in the middle, and flip the 7th bit of the first byte (08 becomes 0a). Example: MAC 08:00:27:ab:cd:ef gives interface ID 0a00:27ff:feab:cdef and link-local fe80::a00:27ff:feab:cdef.",
        cmd: "ip -br link\nip -6 addr show dev enp0s8 scope link",
        check: "The fe80:: address Ubuntu shows matches the one you calculated from the MAC. Use your interface name if it is not enp0s8."
      },
      {
        title: "Back up netplan and find the host-only NIC",
        body: "netplan configures networking on Ubuntu Server. Always keep a backup before you change it so you can get back in if you make a typo.",
        cmd: "mkdir -p ~/netplan-backup && sudo cp /etc/netplan/*.yaml ~/netplan-backup/\nsudo grep -rn enp0s8 /etc/netplan/",
        check: "The backup folder holds your current .yaml files and you know whether enp0s8 is already defined."
      },
      {
        title: "Add the Servers subnet addresses with netplan",
        body: "Give Ubuntu the first host after the gateway in the Servers subnet, plus an IPv6 address. If enp0s8 is already defined in another file, add these two addresses to its existing `addresses:` list instead and keep the address it already has, so your other labs keep working. No gateway is needed for this isolated subnet.",
        cmd: "sudo tee /etc/netplan/60-vlsm-lab.yaml > /dev/null <<'EOF'\nnetwork:\n  version: 2\n  ethernets:\n    enp0s8:\n      addresses:\n        - 10.10.2.130/26\n        - \"2001:db8:acad:30::10/64\"\nEOF\nsudo chmod 600 /etc/netplan/60-vlsm-lab.yaml\nsudo netplan try",
        check: "netplan try applies the change and waits. Press Enter to keep it, or wait 120 seconds and it rolls back on its own."
      },
      {
        title: "Configure the Windows VM on the same subnets",
        body: "In an elevated PowerShell, find the host-only adapter's name, then add a second IPv4 and IPv6 address to it. Adding an address does not remove the one it already has.",
        cmd: "Get-NetAdapter\nNew-NetIPAddress -InterfaceAlias \"Ethernet 2\" -IPAddress 10.10.2.131 -PrefixLength 26\nNew-NetIPAddress -InterfaceAlias \"Ethernet 2\" -IPAddress 2001:db8:acad:30::11 -PrefixLength 64",
        check: "`ipconfig` lists 10.10.2.131 with mask 255.255.255.192 on the host-only adapter."
      },
      {
        title: "Prove the plan works",
        body: "Ping from Windows to Ubuntu (Windows Firewall blocks inbound ping by default, so this direction is the clean test). Then ping Windows' link-local address from Ubuntu; link-local needs the zone (%interface) because every NIC has an fe80::/64.",
        cmd: "ping 10.10.2.130\nping -6 2001:db8:acad:30::10\n# on Ubuntu:\nip -br addr show enp0s8\nping -c 3 fe80::<windows-link-local-id>%enp0s8",
        check: "IPv4 and IPv6 pings from Windows get replies, and `ip -br addr` shows 10.10.2.130/26 and 2001:db8:acad:30::10/64."
      }
    ],
    verify: [
      "Your table lists six subnets with no overlap and every range matches ipcalc's output.",
      "You can explain why Users needs a /23 and not a /24 (300 hosts > 254 usable).",
      "The EUI-64 link-local address you calculated matches what Ubuntu shows.",
      "Windows can ping 10.10.2.130 and 2001:db8:acad:30::10."
    ],
    deliverable: "Publish the addressing plan as a table (IPv4 and IPv6 side by side, with VLAN, gateway and growth space), plus a screenshot of the ipcalc split and of the successful pings. Add the netplan file and two sentences on why you allocated largest-first.",
    resume: "Designed a VLSM and IPv6 /64 addressing plan for a 5-segment small office from a single /22, verified every subnet with ipcalc/sipcalc, and deployed it to Linux and Windows hosts with netplan and PowerShell.",
    interview: [
      "How many usable hosts are in a /26? — 62: 2^6 = 64 addresses minus the network and broadcast addresses.",
      "Why does every IPv6 LAN get a /64? — SLAAC and EUI-64 use a 64-bit interface ID, so smaller LAN prefixes break autoconfiguration; address space is not the constraint in IPv6.",
      "What is a link-local address used for? — fe80::/10 addresses exist on every IPv6 interface and are used for neighbor discovery and as the next hop for routing protocols; they are never routed off the link."
    ],
    cleanup: ["Delete /etc/netplan/60-vlsm-lab.yaml (or remove the two added lines) and run `sudo netplan apply`.", "On Windows: `Remove-NetIPAddress -IPAddress 10.10.2.131 -Confirm:$false` and the same for 2001:db8:acad:30::11."],
    links: [
      { label: "Netplan documentation", url: "https://netplan.readthedocs.io/en/stable/" },
      { label: "RFC 4291: IPv6 Addressing Architecture", url: "https://www.rfc-editor.org/rfc/rfc4291" }
    ]
  },

  {
    id: "lab-wireshark-basics",
    title: "Capture and analyze traffic with Wireshark and tshark",
    track: "Networking",
    level: "Beginner",
    minutes: 90,
    cost: "Free",
    summary: "Capture traffic between your lab VMs, find a TCP three-way handshake, compare plain HTTP with HTTPS, read DNS, and use display filters, Follow TCP Stream, statistics and object export. Then repeat the key steps with tshark on the command line.",
    realWorld: "When an alert fires or an app is slow, SOC analysts and network engineers pull a packet capture and read it. Being able to filter a PCAP down to one conversation and say what happened is a daily skill in both jobs.",
    youWillNeed: ["Wireshark for Windows with Npcap (wireshark.org), installed on the Windows VM", "tshark on the Ubuntu VM (installed in step 2)", "Your lab VMs from lab-home-lab"],
    requires: ["lab-home-lab"],
    safety: "Only capture traffic on networks and devices you own. Capturing other people's traffic without permission can be illegal, even on a shared network.",
    steps: [
      {
        title: "Note your lab addresses",
        body: "This lab uses 192.168.56.10 for Ubuntu and 192.168.56.20 for Windows (VirtualBox host-only defaults). Find yours and substitute them everywhere below.",
        cmd: "ip -br addr        # on Ubuntu\nipconfig           # on Windows",
        check: "You know both host-only IPs and the Ubuntu interface name (for example enp0s8)."
      },
      {
        title: "Install Wireshark and tshark",
        body: "On Windows, run the installer from wireshark.org and keep the Npcap option ticked; Npcap is the driver that captures packets. On Ubuntu, install tshark and answer Yes when asked whether non-superusers may capture, then add yourself to the wireshark group so you do not capture as root.",
        cmd: "sudo apt update && sudo apt install -y tshark\nsudo usermod -aG wireshark $USER\n# log out and back in, then:\ntshark -D",
        check: "`tshark -D` lists enp0s8 without sudo, and Wireshark on Windows lists the host-only adapter."
      },
      {
        title: "Start two small servers on Ubuntu",
        body: "Run a plain HTTP server with Python and a TLS server with OpenSSL using a throwaway self-signed certificate. That gives you the same kind of request over HTTP and HTTPS to compare.",
        cmd: "mkdir -p ~/web && cd ~/web && echo 'lab password=Summer2026 (fake)' > notes.txt\npython3 -m http.server 8080 &\nopenssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 7 -subj \"/CN=ubuntu-lab\"\nopenssl s_server -accept 8443 -cert cert.pem -key key.pem -www &",
        check: "`ss -tln` shows listeners on 8080 and 8443."
      },
      {
        title: "Capture while you browse",
        body: "In Wireshark on Windows, double-click the host-only adapter to start capturing. Then generate traffic from PowerShell. -k tells curl to accept the self-signed certificate.",
        cmd: "curl.exe http://192.168.56.10:8080/notes.txt\ncurl.exe -k https://192.168.56.10:8443/",
        check: "Packets scroll in Wireshark. Stop the capture and save it as lab1.pcapng."
      },
      {
        title: "Find the TCP three-way handshake",
        body: "Filter for connection starts. A SYN with no ACK is the client's first packet; the next two packets in the same stream are the server's SYN-ACK and the client's ACK.",
        cmd: "tcp.flags.syn == 1 && tcp.flags.ack == 0\ntcp.stream == 0",
        check: "In stream 0 you can point to SYN, SYN-ACK, ACK in that order, with matching sequence and acknowledgment numbers."
      },
      {
        title: "Compare HTTP with HTTPS",
        body: "Filter for HTTP requests and look at the packet details: the URL and the file contents are readable. Then filter for the TLS Client Hello on port 8443: you can see the handshake, but the page itself is encrypted Application Data.",
        cmd: "http.request\ntcp.port == 8443\ntls.handshake.type == 1",
        check: "You can read 'password=Summer2026' in the HTTP response but not in any 8443 packet."
      },
      {
        title: "Use Follow TCP Stream",
        body: "Right-click an HTTP packet and choose Follow > TCP Stream. Wireshark rebuilds the whole conversation, client in one color and server in the other. Try the same on an 8443 packet to see what encryption leaves you.",
        check: "The HTTP stream shows the full GET request and response headers; the TLS stream is unreadable."
      },
      {
        title: "Capture and read DNS",
        body: "The isolated host-only network has no DNS server. Capture on a machine you own that has internet (your host PC, or a VM with a NAT adapter), start Wireshark, and resolve a name. Match the query to its response using the Transaction ID.",
        cmd: "nslookup example.com\n# Wireshark display filter:\ndns",
        check: "You see a standard query (A) and a response with the same ID that contains the answer record, over UDP port 53."
      },
      {
        title: "Filter by host and read the statistics",
        body: "Filter one host, then open Statistics > Conversations (who talked to whom, how much) and Statistics > Protocol Hierarchy (what share of traffic each protocol is). These are the first two screens many analysts open on an unknown PCAP.",
        cmd: "ip.addr == 192.168.56.10",
        check: "Conversations shows the Windows and Ubuntu IPs; Protocol Hierarchy shows TCP, HTTP and TLS."
      },
      {
        title: "Export transferred files",
        body: "Choose File > Export Objects > HTTP. Wireshark lists every file sent over plain HTTP and can save it. This is how analysts recover a downloaded file from a capture.",
        check: "notes.txt appears in the list and you can save it with its contents intact."
      },
      {
        title: "Capture the same traffic with tshark",
        body: "On Ubuntu, capture for 60 seconds while you rerun the two curl commands from Windows. -a duration stops the capture on its own.",
        cmd: "tshark -i enp0s8 -a duration:60 -w ~/lab2.pcapng",
        check: "tshark reports a packet count and ~/lab2.pcapng exists."
      },
      {
        title: "Analyze the file with tshark",
        body: "-Y applies a display filter to a saved file, -T fields prints chosen fields, and -z produces the same statistics as the GUI.",
        cmd: "tshark -r ~/lab2.pcapng -Y \"http.request\" -T fields -e ip.src -e http.request.method -e http.request.uri\ntshark -r ~/lab2.pcapng -q -z conv,tcp\ntshark -r ~/lab2.pcapng -q -z io,phs\ntshark -r ~/lab2.pcapng -q -z follow,tcp,ascii,0\ntshark -r ~/lab2.pcapng --export-objects http,/tmp/exported",
        check: "You get the request list, the conversation table, the protocol hierarchy, stream 0's text and notes.txt in /tmp/exported."
      }
    ],
    verify: [
      "You can point to the SYN, SYN-ACK and ACK packets of one connection.",
      "You can show the fake password in the HTTP stream and explain why it is not visible over HTTPS.",
      "You can match a DNS query to its response by Transaction ID.",
      "You exported notes.txt from a capture with both Wireshark and tshark."
    ],
    deliverable: "Write a one-page 'PCAP walkthrough': screenshots of the handshake, the HTTP stream with the fake credential, the encrypted TLS stream, and Protocol Hierarchy, plus a table of the tshark commands you used and what each answered. Close with a two-sentence recommendation on why internal apps should use HTTPS.",
    resume: "Captured and analyzed lab traffic with Wireshark and tshark, isolating TCP handshakes, DNS transactions and cleartext credentials in HTTP, and documented why TLS protects the same data.",
    interview: [
      "What are the three packets of a TCP handshake? — SYN from the client, SYN-ACK from the server, then ACK from the client; after that data can flow.",
      "What is the difference between a capture filter and a display filter? — A capture filter (BPF syntax, like 'port 80') decides what is saved; a display filter (Wireshark syntax, like 'http.request') only hides packets already captured.",
      "What can you still learn from HTTPS traffic without decrypting it? — The IPs, ports, timing, volume, and from the TLS Client Hello the server name (SNI) and offered cipher suites."
    ],
    cleanup: ["Stop the servers on Ubuntu with `kill %1 %2` (or `pkill -f http.server; pkill -f s_server`).", "Delete ~/web/key.pem and cert.pem.", "Keep the pcapng files for your portfolio; they only contain lab traffic."],
    links: [
      { label: "Wireshark User's Guide", url: "https://www.wireshark.org/docs/wsug_html_chunked/" },
      { label: "tshark manual page", url: "https://www.wireshark.org/docs/man-pages/tshark.html" },
      { label: "Wireshark display filter reference", url: "https://www.wireshark.org/docs/dfref/" }
    ]
  },

  {
    id: "lab-nmap-discovery",
    title: "Discover hosts and build a service inventory with Nmap",
    track: "Networking",
    level: "Beginner",
    minutes: 90,
    cost: "Free",
    summary: "Use Nmap on your isolated lab to find live hosts, list open ports and service versions, save results in machine-readable formats, confirm them against the target's own view, shut down an unneeded service and prove it is gone with a rescan.",
    realWorld: "You cannot protect what you do not know about. Vulnerability management, audits and incident response all start with an accurate asset and service inventory, and analysts regularly compare scan results with what a server says it is running.",
    youWillNeed: ["Nmap for Windows (nmap.org, includes Npcap and Ndiff) on the Windows VM", "Your Ubuntu VM as the target", "Your lab VMs from lab-home-lab"],
    requires: ["lab-home-lab"],
    safety: "Scan only systems you own or have written permission to test. Scanning networks you do not own, including your employer's or school's without authorization, can break acceptable-use policies and laws. Keep every scan in this lab on your isolated host-only network.",
    steps: [
      {
        title: "Confirm you are on the isolated network",
        body: "This lab uses 192.168.56.0/24 with Ubuntu at 192.168.56.10 and Windows at 192.168.56.20. Check your real values and confirm the VMs' adapters are Host-only in VirtualBox before you scan anything.",
        cmd: "ipconfig           # on Windows\nip -br addr        # on Ubuntu",
        check: "Both VMs are on the same host-only subnet and you have replaced the example IPs below with yours."
      },
      {
        title: "Plant a service that should not be there",
        body: "On Ubuntu, install an FTP server to play the part of a legacy service someone forgot. You will find it and remove it later.",
        cmd: "sudo apt update && sudo apt install -y vsftpd\nsudo systemctl enable --now vsftpd",
        check: "`systemctl is-active vsftpd` prints active."
      },
      {
        title: "Install Nmap on Windows",
        body: "Download the Windows installer from nmap.org and keep the Npcap and Ndiff components ticked. Run Nmap from an elevated terminal (Run as administrator), because SYN scans and OS detection need raw packet access.",
        cmd: "nmap --version",
        check: "Nmap prints its version and the Npcap version it found."
      },
      {
        title: "Find live hosts",
        body: "-sn is a host-discovery ping sweep with no port scan. On a local subnet Nmap uses ARP, which is fast and reliable, and it prints each host's MAC vendor.",
        cmd: "nmap -sn 192.168.56.0/24",
        check: "You see your Ubuntu VM (MAC vendor Oracle VirtualBox), the VirtualBox host adapter, and possibly the DHCP server. Every host found should be one you recognize."
      },
      {
        title: "Run a SYN scan of all TCP ports",
        body: "-sS sends a SYN and reads the reply but never completes the handshake (a 'half-open' scan). -p- covers all 65,535 ports, and --reason says why each port got its state.",
        cmd: "nmap -sS -p- --reason 192.168.56.10",
        check: "22/tcp (ssh) and 21/tcp (ftp) are open with reason syn-ack."
      },
      {
        title: "Compare with a TCP connect scan",
        body: "-sT completes the full handshake through the operating system, so it works without admin rights but is slower and more likely to be logged by the target. Watch the vsftpd log on Ubuntu while it runs: full connections show up there, half-open ones usually do not.",
        cmd: "nmap -sT -p 21,22 192.168.56.10\n# on Ubuntu, in another terminal:\nsudo journalctl -u vsftpd -f",
        check: "Both scans agree on open ports; you can explain the difference in one sentence."
      },
      {
        title: "Detect service versions and the operating system",
        body: "-sV probes open ports to identify the software and version. -O guesses the OS from how the TCP/IP stack answers, and works best when it finds at least one open and one closed port.",
        cmd: "nmap -sV -O 192.168.56.10",
        check: "Output names OpenSSH with an Ubuntu version string, vsftpd with a version, and an OS guess of Linux."
      },
      {
        title: "Save a baseline in every format",
        body: "-oA writes normal (.nmap), XML (.xml) and grepable (.gnmap) files at once. XML is what tools and reports import; grepable is quick to search.",
        cmd: "nmap -sS -sV -O -oA lab-baseline 192.168.56.10\nSelect-String -Path lab-baseline.gnmap -Pattern \"/open/\"",
        check: "Three files named lab-baseline.* exist and the search prints the line with the open ports."
      },
      {
        title: "Check the target's own view",
        body: "On Ubuntu, list listening sockets with their processes. -t TCP, -u UDP, -l listening, -p process, -n numeric. A port that is listening on 127.0.0.1 only will not show up in an external scan, which is a useful thing to notice.",
        cmd: "sudo ss -tulpn",
        check: "Every open port in Nmap's result has a matching line (sshd on 22, vsftpd on 21), and you can explain any extra loopback-only listeners."
      },
      {
        title: "Remove the unneeded service",
        body: "The business has no use for FTP, and it sends passwords in cleartext. Stop it, disable it at boot, and remove the package.",
        cmd: "sudo systemctl disable --now vsftpd\nsudo apt purge -y vsftpd\nsudo ss -tulpn | grep ':21 '",
        check: "The grep prints nothing: nothing is listening on port 21."
      },
      {
        title: "Rescan and prove the change",
        body: "Run the same scan into new files, then let Ndiff show exactly what changed. That diff is your evidence for the change ticket.",
        cmd: "nmap -sS -sV -O -oA lab-after 192.168.56.10\nndiff lab-baseline.xml lab-after.xml",
        check: "Ndiff shows 21/tcp going from open ftp to closed (or no longer listed)."
      },
      {
        title: "Turn the results into an asset inventory",
        body: "Build a table with one row per host: Hostname, IP, MAC, OS (from -O), Open ports and versions (from -sV), Owner, Business purpose, Action. Add the Windows VM too by scanning it the same way from Ubuntu (`sudo apt install -y nmap`, then `sudo nmap -sS -sV 192.168.56.20`); expect few or no open ports because Windows Firewall filters inbound traffic by default.",
        check: "Every open port in the table has a business purpose or an action, and FTP is recorded as removed with the date."
      }
    ],
    verify: [
      "Your -sn sweep lists only hosts you can identify.",
      "The open ports in your baseline scan match `ss -tulpn` on the target.",
      "Ndiff shows port 21 closed after the change.",
      "Your inventory table has an owner, purpose or action for every open service."
    ],
    deliverable: "Publish a short 'service inventory and hardening' report: the asset table, the before and after scan output (or Ndiff), the ss output, and a change log entry for removing FTP (what, why, how verified, rollback). Include the XML files in your repo.",
    resume: "Built a host and service inventory of a lab network with Nmap (-sn, -sS, -sV, -O), reconciled it with on-host socket data, removed an unneeded cleartext FTP service and proved the change with an Ndiff before/after comparison.",
    interview: [
      "What is the difference between -sS and -sT? — -sS sends a SYN and never completes the handshake, which is faster and needs raw-packet privileges; -sT completes the full TCP connection through the OS, so it works unprivileged but is noisier.",
      "What do open, closed and filtered mean in Nmap? — Open means a service answered; closed means the host answered with a RST but nothing listens; filtered means no answer or an ICMP error, usually a firewall.",
      "Why compare scan results with ss or netstat on the host? — A scan shows what is reachable from one point on the network; the host shows everything listening, including loopback-only or firewalled services the scan cannot see."
    ],
    cleanup: ["Keep Nmap installed for later labs, but do not point it at any network outside your lab.", "If you want Ubuntu back to its original state, revert to your clean snapshot."],
    links: [
      { label: "Nmap reference guide", url: "https://nmap.org/book/man.html" },
      { label: "Nmap: legal issues of scanning", url: "https://nmap.org/book/legal-issues.html" }
    ]
  },

  {
    id: "lab-pt-vlans",
    title: "VLANs, trunks and router-on-a-stick in Packet Tracer",
    track: "Networking",
    level: "Beginner",
    minutes: 90,
    cost: "Free (Cisco Packet Tracer with a free Networking Academy account)",
    summary: "Build two switches and a router in Cisco Packet Tracer, split users into Staff and Guest VLANs, connect the switches with an 802.1Q trunk using a dedicated native VLAN, and route between VLANs with router-on-a-stick.",
    realWorld: "Almost every office network separates users, voice, guests and servers into VLANs. Junior network engineers add VLANs, fix access-port assignments and troubleshoot trunks every week, and CCNA labs test exactly these commands.",
    youWillNeed: ["Cisco Packet Tracer 8.x (free via netacad.com)", "The addressing table in step 1"],
    steps: [
      {
        title: "Build the topology",
        body: "Add a 2911 router (R1), two 2960 switches (S1, S2) and four PCs. Cable with copper straight-through: S1 Gi0/1 to S2 Gi0/1, S1 Gi0/2 to R1 G0/0, PC1 to S1 Fa0/1, PC2 to S1 Fa0/11, PC3 to S2 Fa0/1, PC4 to S2 Fa0/11. Plan: VLAN 10 STAFF 192.168.10.0/24, VLAN 20 GUEST 192.168.20.0/24, VLAN 99 NATIVE-MGMT 192.168.99.0/24; the gateway is .1 in each.",
        check: "All links show lights; the router link stays red until you configure G0/0 (routers start shut down)."
      },
      {
        title: "Address the PCs",
        body: "On each PC open Desktop > IP Configuration and set a static address. PC1 192.168.10.11 gateway 192.168.10.1; PC2 192.168.20.11 gateway 192.168.20.1; PC3 192.168.10.12 gateway 192.168.10.1; PC4 192.168.20.12 gateway 192.168.20.1. Mask 255.255.255.0 for all.",
        check: "Each PC shows the right IP, mask and gateway."
      },
      {
        title: "Create the VLANs on S1",
        body: "Click S1 > CLI. VLANs must exist on every switch that carries them; VTP is not used here, so you create them on both switches.",
        cmd: "enable\nconfigure terminal\nhostname S1\nvlan 10\n name STAFF\nvlan 20\n name GUEST\nvlan 99\n name NATIVE-MGMT\nexit",
        check: "`do show vlan brief` lists VLANs 10, 20 and 99."
      },
      {
        title: "Assign access ports on S1",
        body: "Force ports to access mode so they never negotiate a trunk with whatever is plugged in, then put them in the right VLAN.",
        cmd: "interface range fastEthernet0/1 - 10\n switchport mode access\n switchport access vlan 10\ninterface range fastEthernet0/11 - 20\n switchport mode access\n switchport access vlan 20\nexit",
        check: "`do show vlan brief` shows Fa0/1-10 in STAFF and Fa0/11-20 in GUEST."
      },
      {
        title: "Configure the trunks on S1",
        body: "Gi0/1 goes to S2 and Gi0/2 to the router. Set 802.1Q trunking, move the native VLAN off VLAN 1 to unused VLAN 99, allow only the VLANs you need, and turn off DTP negotiation.",
        cmd: "interface range gigabitEthernet0/1 - 2\n switchport mode trunk\n switchport trunk native vlan 99\n switchport trunk allowed vlan 10,20,99\n switchport nonegotiate\nexit",
        check: "`do show interfaces trunk` lists Gi0/1 and Gi0/2 as trunking with native VLAN 99."
      },
      {
        title: "Give S1 a management address and save",
        body: "A switch is managed through an SVI (a virtual VLAN interface). It needs a default gateway to answer from other subnets.",
        cmd: "interface vlan 99\n ip address 192.168.99.11 255.255.255.0\n no shutdown\nexit\nip default-gateway 192.168.99.1\nend\ncopy running-config startup-config",
        check: "The config is saved (press Enter to accept the startup-config filename)."
      },
      {
        title: "Repeat on S2",
        body: "Same VLANs and access ports; S2 has only one trunk (Gi0/1) and management IP .12.",
        cmd: "enable\nconfigure terminal\nhostname S2\nvlan 10\n name STAFF\nvlan 20\n name GUEST\nvlan 99\n name NATIVE-MGMT\nexit\ninterface range fastEthernet0/1 - 10\n switchport mode access\n switchport access vlan 10\ninterface range fastEthernet0/11 - 20\n switchport mode access\n switchport access vlan 20\ninterface gigabitEthernet0/1\n switchport mode trunk\n switchport trunk native vlan 99\n switchport trunk allowed vlan 10,20,99\n switchport nonegotiate\ninterface vlan 99\n ip address 192.168.99.12 255.255.255.0\n no shutdown\nexit\nip default-gateway 192.168.99.1\nend\ncopy running-config startup-config",
        check: "`show interfaces trunk` on S2 shows Gi0/1 trunking, native 99, allowed 10,20,99."
      },
      {
        title: "Test before routing",
        body: "PCs in the same VLAN reach each other across the trunk, but different VLANs are separate broadcast domains and cannot talk without a router.",
        cmd: "ping 192.168.10.12      # from PC1 to PC3\nping 192.168.20.11      # from PC1 to PC2",
        check: "PC1 to PC3 succeeds (the first ping or two may time out while ARP resolves). PC1 to PC2 fails."
      },
      {
        title: "Configure router-on-a-stick on R1",
        body: "One physical link carries all VLANs; each subinterface tags one VLAN and becomes that VLAN's gateway. The native VLAN subinterface uses the native keyword because its frames arrive untagged.",
        cmd: "enable\nconfigure terminal\nhostname R1\ninterface gigabitEthernet0/0\n no shutdown\ninterface gigabitEthernet0/0.10\n encapsulation dot1Q 10\n ip address 192.168.10.1 255.255.255.0\ninterface gigabitEthernet0/0.20\n encapsulation dot1Q 20\n ip address 192.168.20.1 255.255.255.0\ninterface gigabitEthernet0/0.99\n encapsulation dot1Q 99 native\n ip address 192.168.99.1 255.255.255.0\nend\ncopy running-config startup-config",
        check: "`show ip interface brief` shows G0/0 and all three subinterfaces up/up."
      },
      {
        title: "Verify inter-VLAN routing",
        body: "Now traffic between VLANs goes up to R1 and back down the trunk. tracert shows the gateway as the first hop.",
        cmd: "ping 192.168.20.12        # from PC1 to PC4\ntracert 192.168.20.12\nping 192.168.99.12        # from PC1 to S2 management",
        check: "All pings succeed and tracert shows 192.168.10.1 then 192.168.20.12."
      },
      {
        title: "Run the full verification set",
        body: "These four commands are the standard VLAN checklist. Save their output for your write-up.",
        cmd: "show vlan brief                                # S1, S2\nshow interfaces trunk                          # S1, S2\nshow interfaces fastEthernet0/11 switchport    # S1\nshow ip interface brief                        # R1",
        check: "Fa0/11 shows Administrative Mode: static access, Access Mode VLAN: 20 (GUEST)."
      },
      {
        title: "Break and fix a native VLAN mismatch",
        body: "On S2 set the trunk's native VLAN to 1. Switches report the mismatch through CDP, and untagged traffic now lands in the wrong VLAN. Watch the console, then fix it.",
        cmd: "configure terminal\ninterface gigabitEthernet0/1\n switchport trunk native vlan 1\n! wait for the CDP message, then fix:\n switchport trunk native vlan 99\nend",
        check: "You see %CDP-4-NATIVE_VLAN_MISMATCH on the console, and it stops after the fix."
      }
    ],
    verify: [
      "`show vlan brief` shows the right ports in VLAN 10 and VLAN 20 on both switches.",
      "`show interfaces trunk` shows native VLAN 99 and allowed VLANs 10,20,99 on every trunk.",
      "PC1 can ping PC4 (different VLAN, different switch) through R1.",
      "You can explain what the CDP native VLAN mismatch message means and how you fixed it."
    ],
    deliverable: "Save the .pkt file, a topology screenshot with the addressing table, and the output of the four verification commands. Write a short change note: VLAN design, why the native VLAN is 99 and unused by hosts, and why DTP is disabled.",
    resume: "Built a multi-switch VLAN network in Cisco Packet Tracer with 802.1Q trunks, a dedicated native VLAN and router-on-a-stick inter-VLAN routing, and diagnosed a native VLAN mismatch from CDP logs.",
    interview: [
      "What is the native VLAN? — The VLAN whose frames cross an 802.1Q trunk untagged; it must match on both ends, and best practice is an unused VLAN rather than VLAN 1.",
      "Why would you disable DTP? — So a port never negotiates a trunk with an attached device, which prevents switch-spoofing VLAN-hopping attacks.",
      "How does router-on-a-stick work? — One router interface is trunked to the switch and split into subinterfaces, each tagged for one VLAN with encapsulation dot1Q and acting as that VLAN's gateway."
    ],
    links: [
      { label: "Cisco Packet Tracer (Networking Academy)", url: "https://www.netacad.com/cisco-packet-tracer" },
      { label: "Cisco CCNA certification and exam topics", url: "https://www.cisco.com/site/us/en/learn/training-certifications/certifications/enterprise/ccna/index.html" }
    ]
  },

  {
    id: "lab-pt-ospf",
    title: "Single-area OSPFv2 with troubleshooting in Packet Tracer",
    track: "Networking",
    level: "Intermediate",
    minutes: 90,
    cost: "Free (Cisco Packet Tracer with a free Networking Academy account)",
    summary: "Connect three routers in a triangle, run single-area OSPFv2 with fixed router IDs and passive LAN interfaces, advertise a default route, verify neighbors and routes, then break the network twice (hello timer, area mismatch) and fix it.",
    realWorld: "OSPF is the most common interior routing protocol in enterprise networks. When a branch loses routes, the network engineer on call checks neighbor state, timers and areas in exactly this order.",
    youWillNeed: ["Cisco Packet Tracer 8.x", "Three 2911 routers, three 2960 switches and three PCs"],
    steps: [
      {
        title: "Build the triangle",
        body: "Place R1, R2 and R3 (2911). Links: R1 G0/0 to R2 G0/0 (10.0.12.0/30), R2 G0/1 to R3 G0/0 (10.0.23.0/30), R3 G0/1 to R1 G0/1 (10.0.13.0/30). Each router's G0/2 goes to a switch with one PC: LAN1 192.168.1.0/24, LAN2 192.168.2.0/24, LAN3 192.168.3.0/24. The lower-numbered router gets .1 on each /30 and the higher gets .2; each router is .1 on its LAN.",
        check: "You have an addressing table with nine router interfaces and three PCs (PCn = 192.168.n.10, gateway 192.168.n.1)."
      },
      {
        title: "Address R1",
        body: "Loopback1 stands in for the internet link that R1 will advertise as the default route.",
        cmd: "enable\nconfigure terminal\nhostname R1\ninterface gigabitEthernet0/0\n ip address 10.0.12.1 255.255.255.252\n no shutdown\ninterface gigabitEthernet0/1\n ip address 10.0.13.1 255.255.255.252\n no shutdown\ninterface gigabitEthernet0/2\n ip address 192.168.1.1 255.255.255.0\n no shutdown\ninterface loopback1\n ip address 203.0.113.1 255.255.255.255\nexit",
        check: "`do show ip interface brief` shows all four interfaces up/up (links go up once the neighbor is addressed)."
      },
      {
        title: "Address R2 and R3",
        body: "Configure the other two routers the same way, then set each PC's IP and gateway.",
        cmd: "! R2\nhostname R2\ninterface gigabitEthernet0/0\n ip address 10.0.12.2 255.255.255.252\n no shutdown\ninterface gigabitEthernet0/1\n ip address 10.0.23.1 255.255.255.252\n no shutdown\ninterface gigabitEthernet0/2\n ip address 192.168.2.1 255.255.255.0\n no shutdown\n! R3\nhostname R3\ninterface gigabitEthernet0/0\n ip address 10.0.23.2 255.255.255.252\n no shutdown\ninterface gigabitEthernet0/1\n ip address 10.0.13.2 255.255.255.252\n no shutdown\ninterface gigabitEthernet0/2\n ip address 192.168.3.1 255.255.255.0\n no shutdown",
        check: "Each router can ping its directly connected neighbors, for example R1 `ping 10.0.12.2`."
      },
      {
        title: "Enable OSPF on R1",
        body: "Set the router ID by hand so it is predictable. network statements use wildcard masks and put matching interfaces in area 0. passive-interface stops hellos on the LAN (no routers there) while still advertising the subnet.",
        cmd: "router ospf 1\n router-id 1.1.1.1\n network 10.0.12.0 0.0.0.3 area 0\n network 10.0.13.0 0.0.0.3 area 0\n network 192.168.1.0 0.0.0.255 area 0\n passive-interface gigabitEthernet0/2\nexit",
        check: "No errors. Adjacencies form once the neighbors are configured."
      },
      {
        title: "Enable OSPF on R2 and R3",
        body: "Same pattern with router IDs 2.2.2.2 and 3.3.3.3.",
        cmd: "! R2\nrouter ospf 1\n router-id 2.2.2.2\n network 10.0.12.0 0.0.0.3 area 0\n network 10.0.23.0 0.0.0.3 area 0\n network 192.168.2.0 0.0.0.255 area 0\n passive-interface gigabitEthernet0/2\n! R3\nrouter ospf 1\n router-id 3.3.3.3\n network 10.0.23.0 0.0.0.3 area 0\n network 10.0.13.0 0.0.0.3 area 0\n network 192.168.3.0 0.0.0.255 area 0\n passive-interface gigabitEthernet0/2",
        check: "The console shows %OSPF-5-ADJCHG messages ending in 'from LOADING to FULL, Loading Done'."
      },
      {
        title: "Originate a default route from R1",
        body: "R1 gets a static default route toward its 'internet' interface and tells the other routers about it through OSPF. If Packet Tracer rejects a loopback as the exit interface, use `default-information originate always` instead, which advertises a default even without one in the table.",
        cmd: "ip route 0.0.0.0 0.0.0.0 loopback1\nrouter ospf 1\n default-information originate\nend\ncopy running-config startup-config",
        check: "R1's `show ip route` has 'S* 0.0.0.0/0 is directly connected, Loopback1'."
      },
      {
        title: "Verify neighbors",
        body: "Every router should have two neighbors in FULL state. On Ethernet links one side is DR and the other BDR, so FULL/DR or FULL/BDR are both healthy.",
        cmd: "show ip ospf neighbor",
        check: "R2 lists neighbor IDs 1.1.1.1 and 3.3.3.3, both FULL."
      },
      {
        title: "Verify routes",
        body: "O routes are learned inside the area; O*E2 is the external default route from R1.",
        cmd: "show ip route ospf\nshow ip protocols\nshow ip ospf interface gigabitEthernet0/0",
        check: "R2 shows O routes to 192.168.1.0/24 and 192.168.3.0/24 and 'O*E2 0.0.0.0/0 via 10.0.12.1'. show ip protocols lists G0/2 as passive."
      },
      {
        title: "Test end to end",
        body: "Ping between LANs and to the loopback that stands in for the internet.",
        cmd: "ping 192.168.3.10       # from PC2\ntracert 192.168.3.10\nping 203.0.113.1",
        check: "All succeed; tracert from PC2 goes 192.168.2.1, 10.0.23.2, 192.168.3.10."
      },
      {
        title: "Fault 1: hello timer mismatch",
        body: "On R2, change the hello interval on the link to R3. IOS also changes the dead interval to four times the hello, so the two routers no longer agree and the adjacency drops when the old dead timer runs out (up to 40 seconds).",
        cmd: "! R2\nconfigure terminal\ninterface gigabitEthernet0/1\n ip ospf hello-interval 5\nend\n! wait 40 seconds, then diagnose:\nshow ip ospf neighbor\nshow ip ospf interface gigabitEthernet0/1",
        check: "R3 disappears from R2's neighbor list. show ip ospf interface on R2 shows Hello 5, Dead 20, and on R3 Hello 10, Dead 40."
      },
      {
        title: "Fix fault 1 and see traffic reroute meanwhile",
        body: "Before fixing, run tracert from PC2 to PC3: traffic now goes the long way through R1, which is why OSPF faults often show as 'slow' rather than 'down'. Then restore the default timer.",
        cmd: "tracert 192.168.3.10     # from PC2, before the fix\n! R2\nconfigure terminal\ninterface gigabitEthernet0/1\n no ip ospf hello-interval\nend\nshow ip ospf neighbor",
        check: "Before the fix the path goes through 10.0.12.1. After, R3 returns to FULL and the path is direct again."
      },
      {
        title: "Fault 2: area mismatch",
        body: "On R3, move the R2-R3 link into area 1. Hellos carry the area ID, and neighbors with different area IDs on the same link never form an adjacency. Real IOS logs an 'area mismatch' error; Packet Tracer may not, so rely on the show commands.",
        cmd: "! R3\nconfigure terminal\nrouter ospf 1\n no network 10.0.23.0 0.0.0.3 area 0\n network 10.0.23.0 0.0.0.3 area 1\nend\nshow ip ospf interface gigabitEthernet0/0\nshow ip protocols",
        check: "R3's G0/0 shows Area 1 while R2's G0/1 shows Area 0, and R2 and R3 are no longer neighbors."
      },
      {
        title: "Fix fault 2 and save",
        body: "Put the link back in area 0 and confirm everything is FULL again.",
        cmd: "! R3\nconfigure terminal\nrouter ospf 1\n no network 10.0.23.0 0.0.0.3 area 1\n network 10.0.23.0 0.0.0.3 area 0\nend\ncopy running-config startup-config\nshow ip ospf neighbor",
        check: "Every router again has two FULL neighbors and PC2 reaches PC3 directly."
      }
    ],
    verify: [
      "Each router shows two FULL neighbors with router IDs 1.1.1.1, 2.2.2.2 and 3.3.3.3.",
      "R2 and R3 have an O*E2 default route pointing toward R1.",
      "LAN interfaces are passive in show ip protocols.",
      "You documented the symptom, cause and fix for both faults."
    ],
    deliverable: "Save the .pkt file, a topology diagram, and before/after output of show ip ospf neighbor and show ip route ospf for each fault. Write each fault as a short incident note: symptom, commands run, root cause, fix, how you verified.",
    resume: "Deployed single-area OSPFv2 across three routers with fixed router IDs, passive interfaces and default-route origination, then diagnosed and fixed hello-timer and area-ID mismatches using show ip ospf neighbor and interface output.",
    interview: [
      "What must match for two OSPF routers to become neighbors? — Area ID, subnet and mask, hello and dead timers, authentication, and the stub area flag; router IDs must be unique, and on some links MTU must match to get past ExStart.",
      "How is the OSPF router ID chosen? — The router-id command first, then the highest IP on a loopback, then the highest IP on an active physical interface; changes take effect after clear ip ospf process.",
      "What does passive-interface do? — It stops sending and processing hellos on that interface while still advertising its network, so no adjacencies form toward hosts."
    ],
    links: [
      { label: "Cisco Packet Tracer (Networking Academy)", url: "https://www.netacad.com/cisco-packet-tracer" },
      { label: "RFC 2328: OSPF Version 2", url: "https://www.rfc-editor.org/rfc/rfc2328" }
    ]
  },

  {
    id: "lab-pt-acl-nat",
    title: "ACLs and PAT to an ISP in Packet Tracer",
    track: "Networking",
    level: "Intermediate",
    minutes: 120,
    cost: "Free (Cisco Packet Tracer with a free Networking Academy account)",
    summary: "Extend your VLAN lab with a server VLAN and an ISP router. Write an extended ACL that lets the guest VLAN reach the internal web server but nothing else on the server subnet, a standard ACL that limits SSH to staff, and PAT so every VLAN reaches the internet through one public address.",
    realWorld: "Segmenting guests from internal servers and translating private addresses at the edge are routine tasks at every small company and branch office. Reading ACL hit counters and NAT tables is how you prove a rule works, or find the one that does not.",
    youWillNeed: ["Cisco Packet Tracer 8.x", "Your finished .pkt from lab-pt-vlans (save a copy first)"],
    requires: ["lab-pt-vlans"],
    steps: [
      {
        title: "Add the server VLAN and the ISP",
        body: "Save your VLAN lab as a new file. Add a Server-PT on S1 Fa0/21 (192.168.30.10/24, gateway 192.168.30.1, with HTTP and HTTPS on under Services). Add a 2911 router named ISP: cable R1 G0/1 to ISP G0/0, and ISP G0/1 to a switch with a second Server-PT named WEB-INTERNET (198.51.100.10/24, gateway 198.51.100.1).",
        check: "The topology now has STAFF, GUEST and SERVERS VLANs behind R1, and a separate 'internet' behind ISP."
      },
      {
        title: "Carry VLAN 30 on S1",
        body: "Create the VLAN, set the server port, and add VLAN 30 to the allowed list on the trunk to R1. Use `add` so you do not wipe the existing list.",
        cmd: "configure terminal\nvlan 30\n name SERVERS\ninterface fastEthernet0/21\n switchport mode access\n switchport access vlan 30\ninterface gigabitEthernet0/2\n switchport trunk allowed vlan add 30\nend",
        check: "`show interfaces trunk` shows 10,20,30,99 allowed on Gi0/2."
      },
      {
        title: "Add the R1 subinterface and the ISP link",
        body: "R1 becomes the gateway for VLAN 30 and gets a public-side address. The addresses 203.0.113.0/30 and 198.51.100.0/24 are reserved for documentation (RFC 5737), so they are safe to use in labs.",
        cmd: "configure terminal\ninterface gigabitEthernet0/0.30\n encapsulation dot1Q 30\n ip address 192.168.30.1 255.255.255.0\ninterface gigabitEthernet0/1\n ip address 203.0.113.2 255.255.255.252\n no shutdown\nexit\nip route 0.0.0.0 0.0.0.0 203.0.113.1\nend",
        check: "`show ip interface brief` shows G0/0.30 and G0/1 up/up."
      },
      {
        title: "Configure the ISP router",
        body: "The ISP knows nothing about your private 192.168.x.x networks, just like a real ISP. That is why NAT is needed.",
        cmd: "enable\nconfigure terminal\nhostname ISP\ninterface gigabitEthernet0/0\n ip address 203.0.113.1 255.255.255.252\n no shutdown\ninterface gigabitEthernet0/1\n ip address 198.51.100.1 255.255.255.0\n no shutdown\nend",
        check: "From R1, `ping 203.0.113.1` succeeds, but PC1 cannot ping 198.51.100.10 yet (no return route)."
      },
      {
        title: "Configure PAT (NAT overload)",
        body: "Mark inside and outside interfaces, use a standard ACL to say which source addresses may be translated, and translate them all to R1's G0/1 address with different source ports.",
        cmd: "configure terminal\ninterface gigabitEthernet0/0.10\n ip nat inside\ninterface gigabitEthernet0/0.20\n ip nat inside\ninterface gigabitEthernet0/0.30\n ip nat inside\ninterface gigabitEthernet0/1\n ip nat outside\nexit\naccess-list 1 permit 192.168.10.0 0.0.0.255\naccess-list 1 permit 192.168.20.0 0.0.0.255\naccess-list 1 permit 192.168.30.0 0.0.0.255\nip nat inside source list 1 interface gigabitEthernet0/1 overload\nend",
        check: "PC1 and PC2 can now open http://198.51.100.10 in Desktop > Web Browser and ping it."
      },
      {
        title: "Verify NAT translations",
        body: "Each inside local address:port maps to the one inside global address with a unique port. That port is how PAT tells return traffic apart.",
        cmd: "show ip nat translations\nshow ip nat statistics",
        check: "You see entries like 'tcp 203.0.113.2:1025 192.168.10.11:1025 198.51.100.10:80 198.51.100.10:80'."
      },
      {
        title: "Write the guest extended ACL",
        body: "Guests may reach the internal web server on 80 and 443 only, may not reach anything else on the server or staff subnets, and may use the internet. ACLs are read top-down, first match wins, and end with an invisible 'deny any', so the final permit is required.",
        cmd: "configure terminal\nip access-list extended GUEST-IN\n remark Guests: web server only, no other internal access\n permit tcp 192.168.20.0 0.0.0.255 host 192.168.30.10 eq 80\n permit tcp 192.168.20.0 0.0.0.255 host 192.168.30.10 eq 443\n deny ip 192.168.20.0 0.0.0.255 192.168.30.0 0.0.0.255\n deny ip 192.168.20.0 0.0.0.255 192.168.10.0 0.0.0.255\n permit ip 192.168.20.0 0.0.0.255 any\nexit",
        check: "`do show access-lists` lists GUEST-IN with five entries numbered 10 to 50."
      },
      {
        title: "Apply it close to the source",
        body: "Extended ACLs go as close to the source as possible so unwanted traffic is dropped before it crosses the network. Here that is inbound on the guest subinterface.",
        cmd: "interface gigabitEthernet0/0.20\n ip access-group GUEST-IN in\nend",
        check: "`show ip interface gigabitEthernet0/0.20` shows 'Inbound access list is GUEST-IN'."
      },
      {
        title: "Test the guest rules",
        body: "From PC2 (guest), test each case. A router that denies a packet sends back 'Destination host unreachable'.",
        cmd: "# PC2 Web Browser: http://192.168.30.10      -> should load\nping 192.168.30.10        # should fail\nping 192.168.10.11        # should fail\nping 198.51.100.10        # should succeed (internet)",
        check: "Web works, pings to internal hosts fail, internet ping works. PC1 (staff) can still ping 192.168.30.10."
      },
      {
        title: "Read the hit counters",
        body: "Match counters prove which line did the work. If a rule you expected to match shows zero, the order or the addresses are wrong.",
        cmd: "show access-lists",
        check: "The permit ... eq 80 line and both deny lines have matches, for example '(4 match(es))'."
      },
      {
        title: "Limit SSH to staff with a standard ACL",
        body: "Enable SSH on R1, then use a standard ACL (source only) on the VTY lines. Standard ACLs usually go close to the destination; on VTY lines access-class applies it to the router itself. When asked for the key size, enter 2048.",
        cmd: "configure terminal\nip domain-name lab.local\nusername admin secret LabPass123\ncrypto key generate rsa\nip ssh version 2\naccess-list 10 permit 192.168.10.0 0.0.0.255\nline vty 0 4\n login local\n transport input ssh\n access-class 10 in\nend\ncopy running-config startup-config",
        check: "From PC1 `ssh -l admin 192.168.10.1` asks for a password; from PC2 `ssh -l admin 192.168.20.1` is refused."
      },
      {
        title: "Clear counters and retest",
        body: "Reset counters and translations, run one test from each PC, and read the results again. This is how you show evidence for a single test in a change record.",
        cmd: "clear access-list counters\nclear ip nat translation *",
        check: "After one guest web request and one staff ping, only the matching lines have increased."
      }
    ],
    verify: [
      "Guest PC loads http://192.168.30.10 but cannot ping any internal host.",
      "show access-lists shows matches on the web permit and deny lines of GUEST-IN.",
      "show ip nat translations shows several inside hosts sharing 203.0.113.2 with different ports.",
      "SSH to R1 works from STAFF and is refused from GUEST."
    ],
    deliverable: "Save the .pkt, a diagram, and the ACL and NAT config. Write a firewall-rule table (source, destination, service, action, reason) for GUEST-IN and a test log showing each test, expected result, actual result, and ACL hit count.",
    resume: "Implemented guest segmentation with an extended ACL (web-only access to an internal server), SSH restricted to staff via a standard ACL, and PAT to an ISP router, proven with ACL hit counters and NAT translation tables.",
    interview: [
      "Where should you place standard and extended ACLs? — Extended ACLs close to the source, because they can match destination and port; standard ACLs close to the destination, because they only match the source and would block too much elsewhere.",
      "What is the implicit deny? — Every ACL ends with an unseen 'deny any', so traffic not explicitly permitted is dropped; that is why a guest ACL needs a final permit for internet traffic.",
      "What is the difference between static NAT, dynamic NAT and PAT? — Static maps one inside address to one public address permanently, dynamic maps from a pool, and PAT (overload) maps many inside hosts to one public address using unique source ports."
    ],
    links: [
      { label: "Cisco Packet Tracer (Networking Academy)", url: "https://www.netacad.com/cisco-packet-tracer" },
      { label: "RFC 1918: Address Allocation for Private Internets", url: "https://www.rfc-editor.org/rfc/rfc1918" },
      { label: "RFC 5737: IPv4 Address Blocks Reserved for Documentation", url: "https://www.rfc-editor.org/rfc/rfc5737" }
    ]
  },

  {
    id: "lab-pt-l2-security",
    title: "Switch security: port security, DHCP snooping, DAI and BPDU guard",
    track: "Networking",
    level: "Intermediate",
    minutes: 120,
    cost: "Free (Cisco Packet Tracer; Cisco Modeling Labs for any feature your Packet Tracer build does not support)",
    summary: "Harden an access switch: limit MACs per port with sticky port security, block a rogue DHCP server with DHCP snooping, stop ARP spoofing with Dynamic ARP Inspection, err-disable ports that receive BPDUs, and park unused ports in a shut-down black-hole VLAN.",
    realWorld: "Layer 2 attacks such as rogue DHCP, ARP spoofing and someone plugging in their own switch are simple and common. Hardening access ports is part of every switch baseline and shows up in audits, CCNA and Security+.",
    youWillNeed: ["Cisco Packet Tracer 8.x", "One 2960 switch, one 2911 router, four PCs, one Hub-PT, one Server-PT, and a spare 2960"],
    safety: "The rogue DHCP server and ARP tests happen only inside Packet Tracer. Never run rogue services on a real network you do not own.",
    steps: [
      {
        title: "Build the topology",
        body: "Cable R1 G0/0 to S1 Gi0/1 (the uplink), PC1 to Fa0/1, PC2 to Fa0/2, PC3 to Fa0/3, and a Server-PT named ROGUE to Fa0/4. Leave Fa0/5 to Fa0/24 and Gi0/2 empty. Everything is VLAN 10, 192.168.10.0/24.",
        check: "All connected ports show green once configured."
      },
      {
        title: "Make R1 the legitimate DHCP server",
        body: "Exclude the router and static range, then define the pool.",
        cmd: "enable\nconfigure terminal\nhostname R1\ninterface gigabitEthernet0/0\n ip address 192.168.10.1 255.255.255.0\n no shutdown\nexit\nip dhcp excluded-address 192.168.10.1 192.168.10.10\nip dhcp pool STAFF\n network 192.168.10.0 255.255.255.0\n default-router 192.168.10.1\n dns-server 192.168.10.1\nend",
        check: "No errors."
      },
      {
        title: "Set up S1 and the rogue server",
        body: "Put all used ports in VLAN 10 as access ports. On ROGUE, set a static IP of 10.99.99.2/24, open Services > DHCP, turn it on with gateway 10.99.99.1, start IP 10.99.99.100, and save. Set PC1 to PC3 to DHCP.",
        cmd: "enable\nconfigure terminal\nhostname S1\nvlan 10\n name STAFF\ninterface range fastEthernet0/1 - 4 , gigabitEthernet0/1\n switchport mode access\n switchport access vlan 10\nend",
        check: "Renewing on the PCs, some may get a 10.99.99.x lease from ROGUE. That is the attack you are about to stop."
      },
      {
        title: "Enable DHCP snooping",
        body: "Snooping drops DHCP server messages (OFFER, ACK) arriving on untrusted ports, so only the trusted uplink can answer. Turning off option 82 insertion avoids a known problem where the IOS DHCP server on R1 drops relayed-looking requests. Rate-limiting stops DHCP starvation floods.",
        cmd: "configure terminal\nip dhcp snooping\nip dhcp snooping vlan 10\nno ip dhcp snooping information option\ninterface gigabitEthernet0/1\n ip dhcp snooping trust\ninterface range fastEthernet0/1 - 4\n ip dhcp snooping limit rate 10\nend",
        check: "`show ip dhcp snooping` shows snooping enabled on VLAN 10 and Gi0/1 as trusted."
      },
      {
        title: "Prove the rogue server is blocked",
        body: "On each PC open Desktop > Command Prompt and renew. Then look at the binding table, which records MAC, IP, VLAN and port for every legitimate lease.",
        cmd: "ipconfig /release\nipconfig /renew\n! on S1:\nshow ip dhcp snooping binding",
        check: "Every PC gets 192.168.10.11 or higher from R1, and the binding table lists all three."
      },
      {
        title: "Enable Dynamic ARP Inspection",
        body: "DAI checks each ARP packet on untrusted ports against the snooping binding table and drops spoofed ones. The uplink is trusted because the router's ARP replies do not come from a DHCP lease. If your Packet Tracer build rejects these commands, do this step in Cisco Modeling Labs with an IOSvL2 switch; the commands are the same.",
        cmd: "configure terminal\nip arp inspection vlan 10\ninterface gigabitEthernet0/1\n ip arp inspection trust\nend\nshow ip arp inspection",
        check: "DAI is active on VLAN 10 and PCs with DHCP leases can still ping 192.168.10.1."
      },
      {
        title: "Watch DAI block a statically addressed host",
        body: "Change PC3 to a static IP of 192.168.10.50 (not in the binding table) and ping the gateway. Its ARP requests fail inspection, which is exactly how DAI stops a spoofer. Set PC3 back to DHCP afterwards.",
        cmd: "ping 192.168.10.1        # from PC3 with a static IP\n! on S1:\nshow ip arp inspection statistics",
        check: "The ping fails and the drop counter for VLAN 10 increases."
      },
      {
        title: "Configure port security",
        body: "Fa0/1 allows two MACs and drops extras while logging (restrict). Fa0/2 allows one MAC and shuts down on a violation. Sticky learns the first MACs into the running config. The port must be in access mode first.",
        cmd: "configure terminal\ninterface fastEthernet0/1\n switchport port-security\n switchport port-security maximum 2\n switchport port-security mac-address sticky\n switchport port-security violation restrict\ninterface fastEthernet0/2\n switchport port-security\n switchport port-security maximum 1\n switchport port-security mac-address sticky\n switchport port-security violation shutdown\nend",
        check: "After PC1 and PC2 each ping the gateway, `show port-security address` lists their MACs as SecureSticky."
      },
      {
        title: "Trigger a shutdown violation and recover",
        body: "Delete PC2's cable, connect a new PC to Fa0/2, give it 192.168.10.60 and ping the gateway. The port err-disables. To recover, remove the unauthorized device, then bounce the port. Real IOS can also recover automatically with `errdisable recovery cause psecure-violation`; Packet Tracer may not support that command.",
        cmd: "show port-security interface fastEthernet0/2\nshow interfaces fastEthernet0/2 status\n! after reconnecting the real PC2:\nconfigure terminal\ninterface fastEthernet0/2\n shutdown\n no shutdown\nend",
        check: "Port status shows Secure-shutdown and err-disabled, then connected again after recovery with PC2 plugged back in."
      },
      {
        title: "Trigger a restrict violation",
        body: "Put a Hub-PT between Fa0/1 and PC1, add two more PCs to the hub set to DHCP, and renew or ping from all three. (DHCP keeps DAI from dropping them, so only port security is being tested.) The third MAC is dropped but the port stays up and the violation counter climbs.",
        cmd: "show port-security interface fastEthernet0/1",
        check: "Port Status is Secure-up and Security Violation Count is above 0."
      },
      {
        title: "Enable PortFast and BPDU guard",
        body: "PortFast skips spanning-tree listening and learning on host ports. BPDU guard err-disables a PortFast port if a switch appears on it, which stops someone from plugging in a switch and changing your spanning-tree topology.",
        cmd: "configure terminal\ninterface range fastEthernet0/1 - 4\n spanning-tree portfast\n spanning-tree bpduguard enable\nend",
        check: "`show running-config interface fastEthernet0/3` shows both commands."
      },
      {
        title: "Test BPDU guard",
        body: "First add Fa0/5 to the same hardening (access, VLAN 10, portfast, bpduguard), then cable the spare 2960 to Fa0/5. The spare switch sends BPDUs and S1 disables the port within seconds.",
        cmd: "configure terminal\ninterface fastEthernet0/5\n switchport mode access\n switchport access vlan 10\n spanning-tree portfast\n spanning-tree bpduguard enable\nend\nshow interfaces fastEthernet0/5 status",
        check: "The console shows %SPANTREE-2-BLOCK_BPDUGUARD and the port is err-disabled."
      },
      {
        title: "Park unused ports in a black-hole VLAN",
        body: "Unused ports go into a VLAN with no gateway and no users, in access mode, and shut down. If someone plugs in, they get nothing.",
        cmd: "configure terminal\nvlan 999\n name BLACKHOLE\ninterface range fastEthernet0/5 - 24 , gigabitEthernet0/2\n switchport mode access\n switchport access vlan 999\n shutdown\nend\ncopy running-config startup-config",
        check: "`show vlan brief` lists Fa0/5 to Fa0/24 and Gi0/2 in BLACKHOLE, and `show ip interface brief` shows them administratively down."
      }
    ],
    verify: [
      "PCs only ever get 192.168.10.x leases from R1 after snooping is on, and the binding table lists them.",
      "A static-IP host is blocked by DAI and the drop counter shows it.",
      "Fa0/2 err-disables on an unknown MAC and you recovered it; Fa0/1 shows restrict violations while staying up.",
      "A switch plugged into an access port is err-disabled by BPDU guard, and all unused ports are in VLAN 999 and shut down."
    ],
    deliverable: "Publish an 'access switch hardening baseline': the final S1 config, a table of each control (threat, command, how tested, evidence), and screenshots of the rogue DHCP lease before and after snooping, the port-security violation and the BPDU guard log. Note any feature you had to test in CML instead of Packet Tracer.",
    resume: "Hardened a Cisco access switch with sticky port security, DHCP snooping, Dynamic ARP Inspection, BPDU guard and a shut-down black-hole VLAN, and verified each control by simulating a rogue DHCP server, MAC flooding, ARP spoofing and an unauthorized switch.",
    interview: [
      "How does DHCP snooping stop a rogue DHCP server? — It marks ports as trusted or untrusted and drops DHCP server messages (OFFER, ACK) that arrive on untrusted ports, so only the uplink toward the real server can hand out leases.",
      "What is the difference between the port-security violation modes? — Protect silently drops excess MACs, restrict drops and logs and counts them, and shutdown err-disables the port until an admin (or errdisable recovery) brings it back.",
      "Why does DAI depend on DHCP snooping? — DAI checks ARP packets against the IP-to-MAC bindings that DHCP snooping builds, so without snooping (or static ARP ACLs) it has nothing to validate against."
    ],
    links: [
      { label: "Cisco Packet Tracer (Networking Academy)", url: "https://www.netacad.com/cisco-packet-tracer" },
      { label: "Cisco Modeling Labs", url: "https://developer.cisco.com/modeling-labs/" }
    ]
  },

  {
    id: "lab-network-troubleshooting",
    title: "Troubleshoot real network faults with the CompTIA method",
    track: "Networking",
    level: "Beginner",
    minutes: 120,
    cost: "Free",
    summary: "Break DNS, the default gateway, IP addressing and DHCP on your lab VMs one at a time, then find and fix each fault using the seven-step CompTIA troubleshooting method and standard Linux and Windows tools, writing a ticket for each.",
    realWorld: "Help desk and NOC technicians spend much of their day on 'the internet is down' tickets. Most turn out to be DNS, the gateway, an address conflict or DHCP, and good technicians prove the cause with a few commands and write a clear ticket.",
    youWillNeed: ["Your Ubuntu and Windows VMs from lab-home-lab", "A VirtualBox NAT adapter temporarily enabled on the Ubuntu VM (Adapter 1) for the DNS and gateway faults", "A ticket template (step 2)"],
    requires: ["lab-home-lab"],
    steps: [
      {
        title: "Take snapshots and record a known-good baseline",
        body: "Snapshot both VMs so you can always get back. For this lab, enable a NAT adapter on Ubuntu so it has internet (VirtualBox NAT gives 10.0.2.15 with gateway 10.0.2.2); the host-only adapter stays as is. Save baseline output, because 'what does normal look like' is the first thing you need when troubleshooting.",
        cmd: "sudo apt update && sudo apt install -y traceroute iputils-arping dnsutils\nip -br addr\nip route\nresolvectl status\nping -c 2 ubuntu.com\n# on Windows (PowerShell):\nmkdir C:\\lab -Force\nipconfig /all > C:\\lab\\baseline.txt",
        check: "Ubuntu has a default route via 10.0.2.2, resolves names, and you saved the Windows output."
      },
      {
        title: "Learn the seven steps and the ticket format",
        body: "CompTIA Network+ steps: 1 Identify the problem. 2 Establish a theory of probable cause. 3 Test the theory to determine the cause. 4 Establish a plan of action and identify potential effects. 5 Implement the solution or escalate. 6 Verify full system functionality and implement preventive measures. 7 Document findings, actions, outcomes and lessons learned. Each ticket you write has: Ticket ID, Reported symptom, Scope, Theory, Tests and results, Root cause, Fix, Verification, Prevention, Time spent.",
        check: "You have a blank ticket template ready in a text file or spreadsheet."
      },
      {
        title: "Fault 1 (break it): DNS",
        body: "Point Ubuntu's DNS at a documentation address that does not exist and flush the cache. Then act as the user: 'websites don't load'.",
        cmd: "sudo resolvectl dns enp0s3 192.0.2.53\nsudo resolvectl flush-caches\nping -c 2 ubuntu.com",
        check: "ping reports 'Temporary failure in name resolution'. Use your NAT interface name if it is not enp0s3."
      },
      {
        title: "Fault 1 (diagnose and fix)",
        body: "Work up the stack. If an IP works but a name does not, the problem is name resolution. Querying a known public resolver directly proves the network path is fine and the configured DNS server is the fault. (VirtualBox NAT may not pass ping to the internet on every host; if so, use `curl -sI http://1.1.1.1` for the IP test.)",
        cmd: "ping -c 2 1.1.1.1\ndig ubuntu.com\ndig @1.1.1.1 ubuntu.com\nresolvectl status enp0s3\nsudo resolvectl revert enp0s3\nsudo netplan apply\nresolvectl status enp0s3\nping -c 2 ubuntu.com",
        check: "Before the fix, dig to the default resolver times out or SERVFAILs while dig @1.1.1.1 answers. After the fix, the link's DNS server is 10.0.2.3 (or what your baseline showed) and ping works. Write ticket 1."
      },
      {
        title: "Fault 2 (break it): default gateway",
        body: "Remove the default route. Local traffic still works; anything off-subnet does not.",
        cmd: "sudo ip route del default\nping -c 2 1.1.1.1",
        check: "ping says 'Network is unreachable'."
      },
      {
        title: "Fault 2 (diagnose and fix)",
        body: "Ping the gateway (works, so the NIC and link are fine), read the routing table (no default route), and trace the path. tracepath needs no root and is installed by default; traceroute gives the familiar output. Restore the route, then verify.",
        cmd: "ping -c 2 10.0.2.2\nip route\ntracepath -n 1.1.1.1\nsudo ip route add default via 10.0.2.2 dev enp0s3\nip route\ntraceroute -n 1.1.1.1",
        check: "Before: no 'default via' line and tracepath fails at once. After: 'default via 10.0.2.2' and the internet is reachable. `sudo netplan apply` would also restore it. Write ticket 2."
      },
      {
        title: "Fault 3 (break it): duplicate IP",
        body: "On the Windows VM (elevated PowerShell), add Ubuntu's host-only address as a second address. Find your adapter name with Get-NetAdapter; this lab assumes 'Ethernet 2' and Ubuntu at 192.168.56.10.",
        cmd: "New-NetIPAddress -InterfaceAlias \"Ethernet 2\" -IPAddress 192.168.56.10 -PrefixLength 24",
        check: "Windows may warn about an address conflict. From Ubuntu, SSH or ping to 192.168.56.10 from another host becomes unreliable."
      },
      {
        title: "Fault 3 (diagnose and fix)",
        body: "arping in duplicate-address-detection mode (-D) asks 'does anyone else own this IP?'. Replies from a different MAC prove a conflict. Windows marks the address as Duplicate. Remove it and confirm.",
        cmd: "sudo arping -D -c 3 -I enp0s8 192.168.56.10\nip neigh\n# on Windows:\nGet-NetIPAddress -IPAddress 192.168.56.10 | Format-List IPAddress,AddressState\nipconfig /all\nRemove-NetIPAddress -IPAddress 192.168.56.10 -Confirm:$false",
        check: "Before: arping shows a reply from the Windows VM's MAC and Windows shows AddressState Duplicate. After: arping gets no reply. Write ticket 3."
      },
      {
        title: "Fault 4 (break it): DHCP",
        body: "In VirtualBox, open File > Tools > Network Manager, select your host-only network, and untick Enable Server on the DHCP Server tab. Then switch Windows' host-only adapter to DHCP.",
        cmd: "netsh interface ipv4 set address name=\"Ethernet 2\" source=dhcp\nipconfig /renew \"Ethernet 2\"",
        check: "The renew fails and the adapter ends up with a 169.254.x.x (APIPA) address."
      },
      {
        title: "Fault 4 (diagnose and fix)",
        body: "A 169.254.x.x address means the client asked for a lease and nobody answered. Test-NetConnection shows the host cannot reach anything. Fix it by re-enabling the DHCP server or, to match your baseline, restoring the static address.",
        cmd: "ipconfig /all\nTest-NetConnection 192.168.56.10 -Port 22\n# fix (choose one):\n#   re-tick Enable Server in VirtualBox, then: ipconfig /renew \"Ethernet 2\"\n#   or restore the static address from baseline.txt:\nnetsh interface ipv4 set address name=\"Ethernet 2\" static 192.168.56.20 255.255.255.0\nTest-NetConnection 192.168.56.10 -Port 22",
        check: "Before: 'Autoconfiguration IPv4 Address 169.254...' and TcpTestSucceeded False. After: TcpTestSucceeded True. Write ticket 4."
      },
      {
        title: "Use the Windows name-resolution tools",
        body: "Round out your toolkit. nslookup and Resolve-DnsName query DNS directly; Test-NetConnection -TraceRoute is the PowerShell equivalent of tracert. These only return internet answers if the Windows VM has a NAT adapter; on host-only they show you the failure mode instead, which is also worth recording.",
        cmd: "nslookup example.com\nResolve-DnsName example.com\nTest-NetConnection example.com -TraceRoute",
        check: "You can explain the output, or the error, of each one."
      },
      {
        title: "Review your four tickets",
        body: "Reread each ticket as if you were the next technician. Is the root cause proven by a command's output, not guessed? Is there a prevention step (for example, DHCP reservations, IPAM, monitoring the DNS server)?",
        check: "Every ticket cites the exact command and output that proved the cause."
      }
    ],
    verify: [
      "You can name the seven troubleshooting steps in order.",
      "For each fault you have before and after command output that proves the cause and the fix.",
      "You can explain what a 169.254.x.x address and 'Network is unreachable' each tell you.",
      "Four complete tickets exist, each with a prevention measure."
    ],
    deliverable: "Publish the four tickets as a 'troubleshooting casebook', each with symptom, the commands you ran in order, the key output, root cause, fix, verification and prevention. Add a one-page cheat sheet mapping symptom to first command (Linux and Windows).",
    resume: "Diagnosed and resolved DNS, default gateway, duplicate IP and DHCP failures on Linux and Windows hosts using a structured seven-step method (ip, dig, resolvectl, arping, ipconfig, Test-NetConnection), documenting each as a ticket with root cause and prevention.",
    interview: [
      "A user can reach 8.8.8.8 but not google.com. What is wrong? — Name resolution: the network path works, so check the configured DNS server with dig or nslookup and test a known resolver directly.",
      "What does a 169.254.x.x address mean on Windows? — APIPA: the client could not get a DHCP lease, so check link, VLAN, DHCP server, scope exhaustion or a relay (ip helper-address).",
      "Walk me through how you troubleshoot. — Identify the problem and scope, form a theory, test it, plan the fix and its impact, implement or escalate, verify full function and add prevention, then document everything."
    ],
    cleanup: ["Re-enable the VirtualBox host-only DHCP server if you left it off and your other labs use it.", "Disable the Ubuntu NAT adapter again if your home lab should stay isolated.", "Or simply revert both VMs to the snapshots from step 1."],
    links: [
      { label: "resolvectl manual (Ubuntu 24.04)", url: "https://manpages.ubuntu.com/manpages/noble/man1/resolvectl.1.html" },
      { label: "Test-NetConnection (Microsoft Learn)", url: "https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection" },
      { label: "CompTIA Network+", url: "https://www.comptia.org/certifications/network" }
    ]
  },

  {
    id: "lab-firewall-pfsense",
    title: "Build a default-deny lab firewall with pfSense",
    track: "Networking",
    level: "Intermediate",
    minutes: 150,
    cost: "Free (pfSense Community Edition)",
    summary: "Run pfSense CE as your lab's firewall with WAN, LAN and DMZ interfaces. Replace allow-all with explicit default-deny rules, let the LAN reach only the DMZ web server's web ports using aliases, log denied traffic, test with curl and nc, and read the firewall log.",
    realWorld: "Firewall rule requests are daily work for network and security teams: someone needs 'the app server to reach the database', and you write the narrowest rule, place it in the right order, and prove it with a test and a log line. DMZs for public-facing servers are standard design.",
    youWillNeed: ["pfSense CE installer from Netgate (free account; follow Netgate's current download instructions)", "VirtualBox with your Ubuntu and Windows VMs from lab-home-lab", "About 1 GB RAM and 16 GB disk for the pfSense VM"],
    requires: ["lab-home-lab"],
    safety: "Keep the pfSense WAN on a VirtualBox NAT adapter so the lab never exposes services to your home network or the internet.",
    steps: [
      {
        title: "Create the pfSense VM",
        body: "New VM, type BSD, version FreeBSD (64-bit), 1 GB RAM (2 GB if you can), 16 GB disk. Adapter 1: NAT (WAN). Adapter 2: Internal Network named lab-lan (LAN). Adapter 3: Internal Network named lab-dmz (DMZ). Internal networks connect only VMs, so the host is not on them.",
        check: "The VM has three adapters: NAT, Internal 'lab-lan', Internal 'lab-dmz'."
      },
      {
        title: "Install pfSense and assign interfaces",
        body: "Boot the installer and accept the defaults (the installer needs internet through the WAN NAT adapter). At the console, assign interfaces: WAN em0, LAN em1, OPT1 em2. Option 2 on the console menu lets you set LAN to 192.168.1.1/24 with DHCP on (the default) and OPT1 to 172.16.10.1/24 with no DHCP.",
        check: "The console shows WAN with a 10.0.2.x address, LAN 192.168.1.1/24 and OPT1 172.16.10.1/24."
      },
      {
        title: "Move the VMs onto LAN and DMZ",
        body: "Snapshot both VMs first. Set the Windows VM's lab adapter to Internal Network lab-lan and switch it to DHCP; it gets 192.168.1.x from pfSense. Set the Ubuntu VM's lab adapter to Internal Network lab-dmz with a static address.",
        cmd: "# Ubuntu: /etc/netplan/60-dmz.yaml (use your interface name), then sudo netplan try\nnetwork:\n  version: 2\n  ethernets:\n    enp0s8:\n      dhcp4: false\n      addresses: [172.16.10.10/24]\n      routes:\n        - to: default\n          via: 172.16.10.1",
        check: "Windows `ipconfig` shows 192.168.1.x with gateway 192.168.1.1; Ubuntu `ip route` shows default via 172.16.10.1. If Ubuntu also has a NAT adapter with its own default route, disable that adapter for this lab."
      },
      {
        title: "Finish the setup wizard",
        body: "From Windows, browse to https://192.168.1.1 (accept the self-signed certificate warning). Log in with admin / pfsense, run the wizard, and set a strong admin password. Rename OPT1 to DMZ under Interfaces > OPT1 and make sure Enable is ticked.",
        check: "The dashboard loads and Interfaces shows WAN, LAN and DMZ up."
      },
      {
        title: "Start services in the DMZ",
        body: "On Ubuntu, run a web server on port 80 and a fake database listener on 3306. SSH is already listening on 22. Only the web server should be reachable from the LAN when you are done.",
        cmd: "mkdir -p ~/site && echo 'DMZ web server' > ~/site/index.html\ncd ~/site && sudo python3 -m http.server 80 &\nnc -lk 3306 &\nsudo ss -tlnp",
        check: "ss shows listeners on 22, 80 and 3306."
      },
      {
        title: "Create aliases",
        body: "Aliases are named groups of hosts or ports. They make rules readable and let you change one alias instead of many rules. Firewall > Aliases > IP: add DMZ_WEB = 172.16.10.10. Firewall > Aliases > Ports: add WEB_PORTS = 80 and 443.",
        check: "Both aliases appear in the list and Apply Changes succeeds."
      },
      {
        title: "Write the LAN rules, top to bottom",
        body: "pfSense checks rules per interface from the top down and the first match wins; anything unmatched hits the implicit default deny. Under Firewall > Rules > LAN, add in this order: (1) Pass, TCP/UDP, source LAN net, destination This Firewall (self), port 53 DNS. (2) Pass, TCP, source LAN net, destination DMZ_WEB, port WEB_PORTS. (3) Block, any, source LAN net, destination DMZ net, tick Log. (4) Pass, TCP, source LAN net, destination any, port WEB_PORTS (internet browsing).",
        check: "The LAN tab shows the anti-lockout rule, then your four rules in that order."
      },
      {
        title: "Remove the allow-all rules",
        body: "pfSense ships with 'Default allow LAN to any' rules for IPv4 and IPv6. Disable both (click the disable icon) and Apply Changes. Now the LAN only gets what your rules allow. Leave the DMZ tab with no pass rules: the DMZ cannot start connections to anything.",
        check: "The two default allow rules appear greyed out. The anti-lockout rule still keeps the web GUI reachable."
      },
      {
        title: "Test allowed and denied traffic",
        body: "From Windows, test web (should work) and the other two ports (should fail). Test-NetConnection is the Windows equivalent of nc -z.",
        cmd: "curl.exe -I http://172.16.10.10\nTest-NetConnection 172.16.10.10 -Port 22\nTest-NetConnection 172.16.10.10 -Port 3306",
        check: "curl returns HTTP/1.0 200 OK; both Test-NetConnection runs report TcpTestSucceeded : False."
      },
      {
        title: "Test from the DMZ side",
        body: "A compromised DMZ server should not be able to reach the LAN. Try from Ubuntu. Replace 192.168.1.100 with the Windows VM's address.",
        cmd: "nc -zv -w 3 192.168.1.100 3389\nnc -zv -w 3 192.168.1.1 443\ncurl -m 5 -I http://example.com",
        check: "All three time out: the DMZ has no pass rules, so the default deny drops everything it starts."
      },
      {
        title: "Read the firewall log",
        body: "Status > System Logs > Firewall shows blocked packets with the rule that blocked them. Hover or click the action icon to see which rule matched. The same log is at /var/log/filter.log from the console shell (menu option 8).",
        cmd: "tail -n 20 /var/log/filter.log\npfctl -sr | head -n 40",
        check: "You see block entries from 192.168.1.x to 172.16.10.10 ports 22 and 3306, matched by your logged block rule, and DMZ entries hitting the default deny."
      },
      {
        title: "See stateful filtering and rule order",
        body: "Open Diagnostics > States while you rerun the curl: the connection has a state entry, and that state lets the web server's replies back to the LAN even though the DMZ has no rules. Then drag your Block rule above the web Pass rule, apply, and rerun curl: it fails because the block now matches first. Move it back and apply.",
        check: "You can show the state entry for 192.168.1.x to 172.16.10.10:80, and that swapping the rule order broke and then restored web access."
      }
    ],
    verify: [
      "LAN to DMZ web on port 80 works; ports 22 and 3306 are blocked and logged.",
      "The DMZ cannot start any connection to the LAN or the internet.",
      "The default allow-all LAN rules are disabled and your rules use the DMZ_WEB and WEB_PORTS aliases.",
      "You can explain, with the States page, why replies from the DMZ are allowed without a DMZ rule."
    ],
    deliverable: "Publish a firewall design note: a diagram with WAN, LAN and DMZ subnets, a rule table (order, action, source, destination, port, log, business reason), screenshots of the rules, a test matrix (test, expected, actual) and two firewall log entries you explain. Export the config backup (Diagnostics > Backup & Restore) and remove passwords before sharing it.",
    resume: "Deployed a pfSense firewall with WAN, LAN and DMZ zones, replaced allow-all with default-deny rules using aliases so the LAN reached only the DMZ web service, and validated every rule with a test matrix and firewall log evidence.",
    interview: [
      "What does stateful filtering mean? — The firewall tracks each allowed connection in a state table and automatically allows its return traffic, so you only write rules for the direction that starts the connection.",
      "Why does rule order matter? — Most firewalls, including pfSense, evaluate rules top-down and stop at the first match, so a broad block or pass above a specific rule makes the specific rule useless.",
      "Why put a web server in a DMZ? — So a compromise of that internet-facing server does not give the attacker direct access to the internal LAN; the DMZ has its own, stricter rules."
    ],
    cleanup: ["Stop the Python server and nc on Ubuntu.", "Revert the Ubuntu and Windows VMs to their snapshots (or set their adapters back to Host-only).", "Shut down the pfSense VM; keep it for later labs."],
    links: [
      { label: "pfSense documentation (Netgate)", url: "https://docs.netgate.com/pfsense/en/latest/" },
      { label: "pfSense firewall rules and rule order", url: "https://docs.netgate.com/pfsense/en/latest/firewall/index.html" }
    ]
  },

  {
    id: "lab-wifi-audit",
    title: "Audit and harden your home Wi-Fi like a network admin",
    track: "Networking",
    level: "Beginner",
    minutes: 75,
    cost: "Free",
    summary: "Review your own router's settings (firmware, WPA3, WPS, admin credentials, remote management, guest isolation), survey nearby channels and signal strength with built-in tools, make the fixes, and write it up as an audit report.",
    realWorld: "Network admins run wireless surveys before and after deployments and check access points against a configuration baseline. Small businesses often run on consumer-grade routers with the same weaknesses you will look for here.",
    youWillNeed: ["Admin access to your own home router", "A laptop with Wi-Fi running Linux (NetworkManager) or Windows 11; VMs usually cannot see the Wi-Fi radio", "A phone to test the guest network"],
    safety: "Audit only your own network and router. Do not scan, connect to, or test networks you do not own. Survey tools here only list what nearby access points already broadcast; do not try to join or attack them. Blur SSIDs, BSSIDs and your public IP in anything you publish.",
    steps: [
      {
        title: "Record the starting state",
        body: "Before changing anything, take screenshots of every router settings page you will touch. If a change breaks something, the screenshots are your rollback plan. Note the router model and hardware version from its label.",
        check: "You have a folder of 'before' screenshots and the exact model number."
      },
      {
        title: "Check the firmware",
        body: "In the router's admin page find the firmware or system update section. Compare the installed version with the latest on the manufacturer's support page for your exact model and hardware version. If the router no longer receives updates (end of life), note it as a high-risk finding.",
        check: "You recorded installed version, latest version and whether the model is still supported."
      },
      {
        title: "Change the default admin credentials",
        body: "The router's admin password must not be the one printed on the label or a default like 'admin'. Use a long unique passphrase stored in a password manager. Change the admin username too if the router allows it.",
        check: "You can log in only with the new password."
      },
      {
        title: "Set the security mode",
        body: "Choose WPA3-Personal (SAE) if all your devices support it; otherwise WPA2/WPA3 transition (mixed) mode, and never WEP, WPA (TKIP) or open. Make sure the passphrase is long and not reused. WPA3 requires Protected Management Frames (802.11w); if there is a PMF setting, set it to Required for WPA3-only or Capable for transition mode.",
        check: "Security shows WPA3-Personal or WPA2/WPA3, and every device you own reconnects."
      },
      {
        title: "Disable WPS and remote management",
        body: "WPS PIN mode is easy to brute-force, and push-button mode adds little value. Turn WPS off. Turn off remote (WAN-side) administration unless you truly need it. Review UPnP: if nothing you use needs it, turn it off, because it lets devices open inbound ports without asking you.",
        check: "WPS, remote management and (if chosen) UPnP show Disabled."
      },
      {
        title: "Set up an isolated guest network",
        body: "Enable a guest SSID with its own passphrase and turn on client or AP isolation (vendors call it 'allow guests to see each other and access my local network: off'). Put smart-home and visitor devices on it so a compromised device cannot reach your laptops.",
        check: "A guest SSID exists with isolation enabled."
      },
      {
        title: "Test the guest isolation",
        body: "Connect your phone to the guest network and try to reach your laptop (on the main network) and the router admin page. Find the laptop's address with `ip -br addr` or `ipconfig`.",
        cmd: "# from a ping or network utility app on the phone (guest SSID):\nping <laptop-IP-on-main-network>\n# and in the phone's browser: http://<router-IP>",
        check: "Both fail from the guest network and both work from the main network."
      },
      {
        title: "Inventory connected clients",
        body: "Open the router's connected devices or DHCP client list. Match every entry to a device you own. Unknown devices are a finding: investigate, then block or change the passphrase.",
        check: "You have a table of device name, MAC (last 3 bytes are enough in the write-up), IP and owner, with no unknowns."
      },
      {
        title: "Survey channels and signal on Linux",
        body: "nmcli lists nearby networks from NetworkManager's latest scan; iw gives raw scan data. Find your interface name with `iw dev`. Signal in nmcli is a 0-100 percentage; iw shows dBm (-50 is excellent, -70 is fair, below -80 is poor).",
        cmd: "nmcli dev wifi rescan\nnmcli -f SSID,BSSID,CHAN,FREQ,SIGNAL,SECURITY dev wifi list\niw dev\nsudo iw dev wlp2s0 scan | grep -E 'SSID|freq|signal'",
        check: "You see your SSID's channel, signal and security, and how many other networks share that channel."
      },
      {
        title: "Survey channels and signal on Windows",
        body: "netsh shows every access point (BSSID) with channel, band and signal. The WLAN report (admin prompt) summarizes connection history and errors, useful when a user says 'the Wi-Fi keeps dropping'.",
        cmd: "netsh wlan show interfaces\nnetsh wlan show networks mode=bssid\nnetsh wlan show wlanreport",
        check: "You have channel and signal for your SSID; the report is saved at C:\\ProgramData\\Microsoft\\Windows\\WlanReport\\wlan-report-latest.html."
      },
      {
        title: "Pick better channels",
        body: "On 2.4 GHz use only channels 1, 6 or 11 (they do not overlap); pick the least crowded. On 5 GHz, prefer a less crowded channel and use 40 or 80 MHz width if neighbors allow; wider channels are faster but more exposed to interference. Change the channel from 'Auto' only if the survey shows a clear problem, then walk through the house measuring signal in each room.",
        check: "A before and after table of signal in at least three rooms."
      },
      {
        title: "Write the findings and changes",
        body: "For each finding record: setting, before, after, risk (High/Medium/Low), why it matters. Take 'after' screenshots and a final check that all your devices work.",
        check: "The report has at least five findings, each with before, after and a risk rating."
      }
    ],
    verify: [
      "The router runs current firmware, or you documented it as end of life with a replacement plan.",
      "Security mode is WPA3 or WPA2/WPA3, WPS and remote administration are off, and the admin password is changed.",
      "A device on the guest network cannot reach a device on the main network.",
      "You have a channel and signal survey with before and after measurements."
    ],
    deliverable: "Publish a 'home network wireless audit' report: scope and authorization statement (your own network), method and tools, a findings table (setting, before, after, risk, rationale), survey tables, and redacted screenshots. Blur SSIDs, BSSIDs, full MACs and your public IP.",
    resume: "Audited a small wireless network against a security baseline, moved it to WPA3/WPA2 transition mode, disabled WPS and remote management, isolated IoT and guest devices on a separate SSID, and cut channel overlap based on a signal survey with nmcli and netsh.",
    interview: [
      "Why disable WPS? — The WPS PIN is checked in two halves, so it can be brute-forced in hours on many routers, giving the attacker the Wi-Fi passphrase regardless of its strength.",
      "What does WPA3-Personal improve over WPA2-Personal? — SAE replaces the pre-shared-key handshake, which resists offline dictionary attacks on captured handshakes and gives forward secrecy, and protected management frames are mandatory.",
      "Which 2.4 GHz channels should you use and why? — 1, 6 and 11, because they are the only non-overlapping 20 MHz channels in most regions, so they reduce co-channel and adjacent-channel interference."
    ],
    links: [
      { label: "Wi-Fi Alliance: Wi-Fi security", url: "https://www.wi-fi.org/discover-wi-fi/security" },
      { label: "nmcli reference (NetworkManager)", url: "https://networkmanager.dev/docs/api/latest/nmcli.html" }
    ]
  },

  {
    id: "lab-network-automation",
    title: "Network automation with Python, REST APIs, Netmiko and Ansible",
    track: "Networking",
    level: "Intermediate",
    minutes: 150,
    cost: "Free (Cisco DevNet Sandbox or Cisco Modeling Labs Free are optional)",
    summary: "Set up a Python virtual environment, parse JSON, call a free read-only REST API, pull and change configuration on a Cisco IOS XE device with Netmiko, then use Ansible to push an idempotent change to your Ubuntu VM and show the diff.",
    realWorld: "The CCNA covers automation and programmability because teams now manage hundreds of devices through scripts and playbooks instead of one CLI session at a time. Idempotent, reviewable changes with a diff are how modern network teams keep configuration consistent.",
    youWillNeed: ["Your Ubuntu VM from lab-home-lab, with internet for package installs (temporary NAT adapter)", "Python 3 (included in Ubuntu 24.04)", "Optional: a free Cisco account for a DevNet Sandbox IOS XE device, or Cisco Modeling Labs Free with an IOL or CSR/Cat8000v node"],
    requires: ["lab-home-lab"],
    safety: "Only change configuration on devices you own or on sandboxes reserved for you. On shared always-on DevNet sandboxes, run show commands only.",
    steps: [
      {
        title: "Create a project and virtual environment",
        body: "A virtual environment keeps this project's packages separate from the system Python, which Ubuntu 24.04 protects from pip anyway.",
        cmd: "sudo apt update && sudo apt install -y python3-venv\nmkdir -p ~/netauto && cd ~/netauto\npython3 -m venv .venv\nsource .venv/bin/activate\npip install requests netmiko ansible-core\npip freeze > requirements.txt",
        check: "Your prompt starts with (.venv) and `ansible --version` and `python -c \"import netmiko\"` both work."
      },
      {
        title: "Parse JSON from a file",
        body: "Most network APIs return JSON. Load a small inventory file and loop through it; this is the same pattern you will use on API responses.",
        cmd: "cat > devices.json <<'EOF'\n[{\"name\": \"R1\", \"ip\": \"192.168.99.1\", \"role\": \"router\"},\n {\"name\": \"S1\", \"ip\": \"192.168.99.11\", \"role\": \"switch\"}]\nEOF\npython -c \"import json; d=json.load(open('devices.json')); [print(x['name'], x['ip'], x['role']) for x in d]\"",
        check: "It prints two lines: R1 192.168.99.1 router and S1 192.168.99.11 switch."
      },
      {
        title: "Call a free read-only REST API",
        body: "RIPEstat's Data API is free, needs no key, and answers networking questions. This script asks which prefix and autonomous system an IP belongs to. It sets a timeout and checks the HTTP status, as every API script should.",
        cmd: "cat > whois_ip.py <<'EOF'\nimport sys\nimport requests\n\nip = sys.argv[1] if len(sys.argv) > 1 else \"1.1.1.1\"\nurl = \"https://stat.ripe.net/data/network-info/data.json\"\nresp = requests.get(url, params={\"resource\": ip}, timeout=10)\nresp.raise_for_status()\ndata = resp.json()[\"data\"]\nprint(f\"{ip} is in {data['prefix']} announced by AS{', AS'.join(data['asns'])}\")\nEOF\npython whois_ip.py 1.1.1.1",
        check: "It prints something like '1.1.1.1 is in 1.1.1.0/24 announced by AS13335'."
      },
      {
        title: "Get a Cisco device to automate",
        body: "Packet Tracer devices cannot be reached by real SSH from outside Packet Tracer, so Netmiko cannot talk to them. Use one of: a Cisco DevNet Sandbox IOS XE device (reserve one, or use the always-on one for read-only commands), or an IOS XE / IOL node in Cisco Modeling Labs Free bridged to your VM. Copy the host, port, username and password from the sandbox page; they change, so do not hard-code them.",
        cmd: "export NET_HOST='<sandbox host>'\nexport NET_USER='<username>'\nread -s NET_PASS && export NET_PASS",
        check: "`ssh $NET_USER@$NET_HOST` reaches the device prompt (type exit afterwards). If you have no Cisco device, skip to step 7."
      },
      {
        title: "Read state with Netmiko",
        body: "Netmiko handles SSH logins, prompts and paging for you. Credentials come from environment variables so they never land in your code or Git history.",
        cmd: "cat > show_int.py <<'EOF'\nimport os\nfrom netmiko import ConnectHandler\n\ndevice = {\n    \"device_type\": \"cisco_ios\",\n    \"host\": os.environ[\"NET_HOST\"],\n    \"username\": os.environ[\"NET_USER\"],\n    \"password\": os.environ[\"NET_PASS\"],\n}\nwith ConnectHandler(**device) as conn:\n    print(conn.find_prompt())\n    print(conn.send_command(\"show ip interface brief\"))\nEOF\npython show_int.py",
        check: "It prints the device prompt and its interface table."
      },
      {
        title: "Make an idempotent change with Netmiko",
        body: "Only on a reserved sandbox or your own CML device. The script checks the current config first and only changes it when needed, then prints a before and after diff. Run it twice: the second run must make no change.",
        cmd: "cat > loopback.py <<'EOF'\nimport difflib, os\nfrom netmiko import ConnectHandler\n\ndevice = {\"device_type\": \"cisco_ios\", \"host\": os.environ[\"NET_HOST\"],\n          \"username\": os.environ[\"NET_USER\"], \"password\": os.environ[\"NET_PASS\"]}\nwanted = [\"interface Loopback123\", \" description managed-by-netmiko\",\n          \" ip address 10.123.123.1 255.255.255.255\"]\nwith ConnectHandler(**device) as conn:\n    before = conn.send_command(\"show running-config interface Loopback123\")\n    if \"managed-by-netmiko\" in before and \"10.123.123.1\" in before:\n        print(\"No change needed\")\n    else:\n        conn.send_config_set(wanted)\n        after = conn.send_command(\"show running-config interface Loopback123\")\n        print(\"\\n\".join(difflib.unified_diff(before.splitlines(), after.splitlines(), \"before\", \"after\", lineterm=\"\")))\nEOF\npython loopback.py\npython loopback.py",
        check: "The first run prints a diff adding the description and address; the second prints 'No change needed'."
      },
      {
        title: "Prepare Ansible to manage the Ubuntu VM",
        body: "If you have no Cisco device, Ansible over SSH to Linux teaches the same ideas: inventory, desired state, idempotence and diffs. Here the Ubuntu VM manages itself over SSH through its host-only address (replace 192.168.56.10 and your username). Key-based SSH is the norm for automation.",
        cmd: "ssh-keygen -t ed25519 -N '' -f ~/.ssh/id_ed25519\nssh-copy-id $USER@192.168.56.10\ncat > inventory.ini <<EOF\n[lab]\nubuntu1 ansible_host=192.168.56.10 ansible_user=$USER\nEOF\nansible -i inventory.ini lab -m ansible.builtin.ping",
        check: "The ping module returns \"ping\": \"pong\" with SUCCESS."
      },
      {
        title: "Write a playbook",
        body: "This playbook sets a legal login banner (a common hardening item), tells sshd to show it, and adds a hosts-file entry for the lab router. It uses only ansible.builtin modules, which are designed to be idempotent. The handler reloads SSH only if the config actually changed.",
        cmd: "cat > site.yml <<'EOF'\n- name: Baseline for lab Linux hosts\n  hosts: lab\n  become: true\n  tasks:\n    - name: Login banner\n      ansible.builtin.copy:\n        dest: /etc/issue.net\n        content: \"Authorized use only. Activity may be monitored.\\n\"\n        owner: root\n        group: root\n        mode: \"0644\"\n\n    - name: Show the banner over SSH\n      ansible.builtin.copy:\n        dest: /etc/ssh/sshd_config.d/60-banner.conf\n        content: \"Banner /etc/issue.net\\n\"\n        mode: \"0644\"\n      notify: Reload ssh\n\n    - name: Hosts entry for the lab router\n      ansible.builtin.lineinfile:\n        path: /etc/hosts\n        line: \"192.168.99.1 r1.lab.local r1\"\n\n  handlers:\n    - name: Reload ssh\n      ansible.builtin.service:\n        name: ssh\n        state: reloaded\nEOF\nansible-playbook -i inventory.ini site.yml --syntax-check",
        check: "The syntax check prints 'playbook: site.yml' with no errors."
      },
      {
        title: "Preview the change with check and diff mode",
        body: "--check makes no changes and --diff shows what would change, which is exactly what a reviewer wants to see in a change request. -K asks for your sudo password.",
        cmd: "ansible-playbook -i inventory.ini site.yml --check --diff -K",
        check: "The output shows +/- diff lines for each file and a recap with changed=3 and nothing actually changed on disk."
      },
      {
        title: "Apply it, then prove idempotence",
        body: "Run it for real, then run the exact same command again. An idempotent playbook reports changed=0 the second time because the system is already in the desired state.",
        cmd: "ansible-playbook -i inventory.ini site.yml --diff -K\nansible-playbook -i inventory.ini site.yml --diff -K",
        check: "First run: changed=3 (plus the handler). Second run: changed=0, ok=4 (including fact gathering)."
      },
      {
        title: "Verify the result and detect drift",
        body: "Check the change works, then make a manual change by hand and let Ansible find and fix the drift.",
        cmd: "sudo sshd -t && ssh $USER@192.168.56.10 exit\ngrep r1 /etc/hosts\necho 'edited by hand' | sudo tee /etc/issue.net\nansible-playbook -i inventory.ini site.yml --check --diff -K",
        check: "SSH shows the banner before login, the hosts entry exists, and the check run reports the hand edit as a diff that the next real run would revert."
      },
      {
        title: "Put it under version control",
        body: "Automation belongs in Git so every change is reviewed and reversible. Exclude the virtual environment and never commit credentials.",
        cmd: "printf '.venv/\\n__pycache__/\\n*.retry\\n' > .gitignore\ngit init\ngit add .\ngit commit -m \"Lab automation: API client, Netmiko scripts, Ansible baseline\"",
        check: "`git status` is clean and `git log` shows one commit without any passwords in it."
      }
    ],
    verify: [
      "whois_ip.py prints a prefix and ASN from the RIPEstat API.",
      "Either loopback.py or the Ansible playbook shows a diff on the first run and no change on the second.",
      "ansible-playbook --check --diff previews changes without making them.",
      "No credentials appear in any file in the Git repository."
    ],
    deliverable: "Publish the project as a Git repository with a README: what each script does, how to run it, the requirements.txt, and pasted output showing the first-run diff and the second-run 'no change' (changed=0). Add a paragraph on why idempotence and check mode matter for change control.",
    resume: "Automated network and Linux configuration with Python and Ansible: built a REST API client with error handling, used Netmiko to apply an idempotent IOS XE change with a unified diff, and wrote an Ansible baseline playbook proven idempotent (changed=0 on rerun) with check/diff previews.",
    interview: [
      "What does idempotent mean in configuration management? — Running the same automation again leaves the system unchanged if it is already in the desired state, so it is safe to rerun and it reports only real changes.",
      "Why use a REST API instead of screen-scraping the CLI? — APIs return structured data such as JSON with a defined schema and status codes, so scripts do not break when CLI output formatting changes.",
      "How is Ansible different from a Python script with Netmiko? — Ansible is agentless and declarative: you describe the desired state in YAML and modules handle idempotence, check mode and diffs; a Netmiko script is imperative and you write that logic yourself."
    ],
    cleanup: ["Remove Loopback123 from your sandbox or CML device with `no interface Loopback123`, and release any reserved sandbox.", "Run `deactivate` to leave the virtual environment.", "Optionally remove /etc/ssh/sshd_config.d/60-banner.conf and reload ssh, or revert the VM snapshot."],
    links: [
      { label: "Python venv documentation", url: "https://docs.python.org/3/library/venv.html" },
      { label: "Ansible documentation", url: "https://docs.ansible.com/ansible/latest/" },
      { label: "Cisco DevNet Sandbox", url: "https://developer.cisco.com/site/sandbox/" }
    ]
  }
]);
