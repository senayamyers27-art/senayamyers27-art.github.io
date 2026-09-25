/* More hands-on labs across tracks: DNS, auditd, Active Directory and Group Policy, WireGuard VPN,
   syslog/NTP/SNMP monitoring, database DR drill, cloud posture, controls audit, AppArmor and RADIUS.
   Format: LABS_FORMAT.md. */
CertHub.registerLabs([
  {
    "id": "lab-dns-bind",
    "title": "Run your own DNS server and troubleshoot it with dig and tcpdump",
    "track": "Networking",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Free (BIND 9 and dig from the Ubuntu archive)",
    "summary": "Stand up a BIND 9 authoritative and recursive server for a private lab.internal zone, query every common record type with dig, trace a real delegation, see DNSSEC validation pass and fail, lock down zone transfers, and diagnose NXDOMAIN, SERVFAIL, REFUSED and timeout faults from the packets.",
    "realWorld": "\"It's always DNS\" is a running joke because it is so often true. Network and systems engineers run internal DNS for Active Directory, split-horizon names and service discovery, and SOC analysts read DNS logs for tunnelling and lookalike domains. Knowing what each response code means and how to prove it with a capture turns a vague 'the internet is down' ticket into a five-minute fix.",
    "youWillNeed": [
      "Your Ubuntu Server 24.04 VM (ubuntu-srv01, 192.168.56.10) with NAT for internet access",
      "Your Windows VM (win-client01, 192.168.56.20) as a DNS client",
      "About 200 MB of disk for the packages"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Run the DNS server only on your host-only lab network and allow queries only from 127.0.0.1 and 192.168.56.0/24. An open recursive resolver on the internet gets abused for amplification attacks, so never forward port 53 to it from your router. Capture only your own lab traffic.",
    "steps": [
      {
        "title": "Snapshot and record how the VM resolves names today",
        "body": "Take a snapshot named 'pre-dns'. Ubuntu uses systemd-resolved: /etc/resolv.conf points at the local stub 127.0.0.53, which forwards to the DNS server your NAT adapter got from DHCP. Write down that upstream server; it is your known-good baseline.",
        "cmd": "VBoxManage snapshot \"ubuntu-srv01\" take \"pre-dns\"\n# On ubuntu-srv01:\ncat /etc/resolv.conf\nresolvectl status | grep -E 'Link|DNS Servers|Current DNS'",
        "check": "resolv.conf shows nameserver 127.0.0.53 and resolvectl lists a DNS server on the NAT link (often 10.0.2.3)."
      },
      {
        "title": "Install BIND, dig and tcpdump",
        "body": "bind9 is the server, bind9-dnsutils provides dig, and tcpdump lets you see the queries on the wire. On Ubuntu 24.04 the service is called named (bind9 is an alias).",
        "cmd": "sudo apt update\nsudo apt install -y bind9 bind9-utils bind9-dnsutils tcpdump\nnamed -v\nsystemctl status named --no-pager | head -5",
        "check": "named -v prints BIND 9.18.x and the service is active (running)."
      },
      {
        "title": "Read a dig answer properly",
        "body": "Before building anything, query a public name through the default resolver and read every section: the header status (NOERROR), the flags (qr rd ra), the ANSWER section with TTLs, and the query time and server at the bottom. Then ask for other record types.",
        "cmd": "dig ubuntu.com\ndig ubuntu.com AAAA +short\ndig ubuntu.com MX +short\ndig ubuntu.com NS +short\ndig ubuntu.com TXT +short\ndig -x 1.1.1.1 +short",
        "check": "The first answer shows 'status: NOERROR', flags including 'ra', and an A record with a TTL; the reverse lookup returns one.one.one.one."
      },
      {
        "title": "Follow the delegation from the root with +trace",
        "body": "+trace makes dig act like a resolver: it asks a root server, follows the referral to the .com servers, then to the domain's own name servers. This is exactly what your BIND server will do for recursive queries. Some networks block outbound port 53 to anything but their own resolver; if the trace times out, note that as a finding and continue.",
        "cmd": "dig +trace www.isc.org",
        "check": "You see referrals from '.' to 'org.' to 'isc.org.' name servers, then the final A or CNAME answer."
      },
      {
        "title": "Configure BIND options: who may query, recurse and transfer",
        "body": "Back up the default options, then replace them. listen-on keeps BIND off the NAT interface, allow-query and allow-recursion limit it to the lab, and dnssec-validation auto uses the built-in root trust anchor. Leave allow-transfer out for now; you will close it in a later step and see why it matters.",
        "cmd": "sudo cp /etc/bind/named.conf.options /etc/bind/named.conf.options.orig\nsudo tee /etc/bind/named.conf.options > /dev/null <<'EOF'\noptions {\n    directory \"/var/cache/bind\";\n    listen-on { 127.0.0.1; 192.168.56.10; };\n    listen-on-v6 { none; };\n    allow-query { 127.0.0.1; 192.168.56.0/24; };\n    recursion yes;\n    allow-recursion { 127.0.0.1; 192.168.56.0/24; };\n    dnssec-validation auto;\n};\nEOF\nsudo named-checkconf && echo CONFIG-OK",
        "check": "named-checkconf prints nothing and you see CONFIG-OK."
      },
      {
        "title": "Write the forward and reverse zones",
        "body": "The .internal top-level domain is reserved for private use, so lab.internal will never clash with a real domain. The SOA serial uses the date format YYYYMMDDnn; bump it every time you edit a zone, or secondary servers will never pick up the change.",
        "cmd": "sudo tee -a /etc/bind/named.conf.local > /dev/null <<'EOF'\nzone \"lab.internal\" { type primary; file \"/etc/bind/db.lab.internal\"; };\nzone \"56.168.192.in-addr.arpa\" { type primary; file \"/etc/bind/db.192.168.56\"; };\nEOF\nsudo tee /etc/bind/db.lab.internal > /dev/null <<'EOF'\n$TTL 300\n@       IN SOA ns1.lab.internal. hostmaster.lab.internal. ( 2026010101 3600 600 86400 300 )\n@       IN NS    ns1.lab.internal.\n@       IN MX 10 mail.lab.internal.\n@       IN TXT   \"v=spf1 -all\"\nns1     IN A     192.168.56.10\nweb     IN A     192.168.56.10\nmail    IN A     192.168.56.10\nwin-client01 IN A 192.168.56.20\nwww     IN CNAME web\nEOF\nsudo tee /etc/bind/db.192.168.56 > /dev/null <<'EOF'\n$TTL 300\n@   IN SOA ns1.lab.internal. hostmaster.lab.internal. ( 2026010101 3600 600 86400 300 )\n@   IN NS  ns1.lab.internal.\n10  IN PTR ns1.lab.internal.\n20  IN PTR win-client01.lab.internal.\nEOF\nsudo named-checkzone lab.internal /etc/bind/db.lab.internal\nsudo named-checkzone 56.168.192.in-addr.arpa /etc/bind/db.192.168.56\nsudo systemctl restart named",
        "check": "Both named-checkzone runs end with 'OK' and the restart returns without an error."
      },
      {
        "title": "Query your own server",
        "body": "Point dig at your server with @. The 'aa' (authoritative answer) flag proves the answer came from your zone data, not a cache. Then ask it for a public name to prove recursion works, and run the same query twice to watch the cached TTL count down.",
        "cmd": "dig @192.168.56.10 web.lab.internal\ndig @192.168.56.10 www.lab.internal +short\ndig @192.168.56.10 lab.internal MX +short\ndig @192.168.56.10 -x 192.168.56.20 +short\ndig @192.168.56.10 ubuntu.com +noall +answer\nsleep 5; dig @192.168.56.10 ubuntu.com +noall +answer",
        "check": "web.lab.internal returns 192.168.56.10 with the 'aa' flag, www follows the CNAME to web, the PTR returns win-client01.lab.internal., and the second ubuntu.com TTL is about 5 lower than the first."
      },
      {
        "title": "See DNSSEC validation succeed and fail",
        "body": "isc.org is DNSSEC-signed, so a validating resolver sets the 'ad' (authenticated data) flag. dnssec-failed.org is deliberately mis-signed as a public test: a validating resolver must answer SERVFAIL. Adding +cd (checking disabled) returns the answer anyway, which proves the failure was the signature and not the name.",
        "cmd": "dig @192.168.56.10 isc.org +dnssec +noall +comments +answer | grep -E 'flags|RRSIG'\ndig @192.168.56.10 dnssec-failed.org | grep status\ndig @192.168.56.10 dnssec-failed.org +cd | grep -E 'status|IN\\s+A'",
        "check": "isc.org shows 'ad' in the flags and RRSIG records; dnssec-failed.org shows SERVFAIL, and with +cd shows NOERROR and an A record."
      },
      {
        "title": "Close zone transfers",
        "body": "Try a full zone transfer (AXFR) of your own zone. An open transfer hands an attacker a complete map of your internal hostnames. Depending on the BIND version and your distribution's defaults the first attempt may succeed or already be refused; either way, set the policy explicitly so it is documented and survives upgrades: allow transfers to nobody (you have no secondary server), restart, and try again.",
        "cmd": "dig @192.168.56.10 lab.internal AXFR\nsudo sed -i 's|dnssec-validation auto;|dnssec-validation auto;\\n    allow-transfer { none; };|' /etc/bind/named.conf.options\nsudo named-checkconf && sudo systemctl restart named\ndig @192.168.56.10 lab.internal AXFR",
        "check": "If the first AXFR listed every record, you just saw why this matters; after the change dig prints 'Transfer failed.' and the named journal shows the transfer was denied (sudo journalctl -u named | grep -i denied)."
      },
      {
        "title": "Capture the queries on the wire",
        "body": "Open a second SSH session and start tcpdump on port 53, writing to /tmp so the capture user can create the file. In the first session run a few lookups, then stop the capture and read it. Match each query to its response by the transaction ID and note that plain DNS is readable by anyone on the path.",
        "cmd": "# Session 2:\nsudo tcpdump -ni any -w /tmp/dns.pcap port 53\n# Session 1:\ndig @192.168.56.10 web.lab.internal\ndig @192.168.56.10 nosuchhost.lab.internal\ndig @192.168.56.10 ubuntu.com\n# Session 2: press Ctrl+C, then\nsudo tcpdump -nr /tmp/dns.pcap | head -20",
        "check": "You see lines like '... A? web.lab.internal.' followed by a reply with the same ID, an NXDomain reply for nosuchhost, and outbound queries from 10.0.2.x to upstream servers for ubuntu.com."
      },
      {
        "title": "Break it and read the symptom",
        "body": "Create four faults and record the exact dig output for each. NXDOMAIN: the name does not exist. SERVFAIL: the server could not produce an answer (here, a zone that fails to load). REFUSED: policy said no (here, a query from the NAT address, which is not in allow-query; -b sets the source address and enp0s3 is usually the NAT NIC). Timeout: nothing answered at all (win-client01 runs no DNS service and its firewall drops the packets).",
        "cmd": "dig @192.168.56.10 typo.lab.internal | grep status\nsudo cp /etc/bind/db.lab.internal /tmp/db.good\necho 'www IN A 192.168.56.99' | sudo tee -a /etc/bind/db.lab.internal\nsudo named-checkzone lab.internal /etc/bind/db.lab.internal\nsudo systemctl restart named; dig @192.168.56.10 web.lab.internal | grep status\nsudo cp /tmp/db.good /etc/bind/db.lab.internal && sudo systemctl restart named\nNATIP=$(ip -4 -o addr show enp0s3 | awk '{print $4}' | cut -d/ -f1)\ndig -b $NATIP @192.168.56.10 web.lab.internal | grep status\ndig @192.168.56.20 web.lab.internal +tries=1 +time=2",
        "check": "You record NXDOMAIN, then named-checkzone reports 'CNAME and other data' and the query returns SERVFAIL, then REFUSED for the query sent from the NAT address (not in allow-query), then 'connection timed out; no servers could be reached'. web.lab.internal answers again after the restore."
      },
      {
        "title": "Use it from Windows",
        "body": "On win-client01 (PowerShell as Administrator), point the host-only adapter at your server and use Resolve-DnsName, the PowerShell equivalent of dig. nslookup works too but uses its own resolver logic, so prefer Resolve-DnsName when you troubleshoot what Windows applications see.",
        "cmd": "Get-NetAdapter\nSet-DnsClientServerAddress -InterfaceAlias \"Ethernet 2\" -ServerAddresses 192.168.56.10\nResolve-DnsName web.lab.internal -Server 192.168.56.10\nResolve-DnsName lab.internal -Type MX -Server 192.168.56.10\nResolve-DnsName 192.168.56.10 -Server 192.168.56.10\nClear-DnsClientCache; Get-DnsClientCache | Select-Object -First 5",
        "check": "Resolve-DnsName returns 192.168.56.10 for web.lab.internal, the MX record, and ns1.lab.internal for the reverse lookup."
      },
      {
        "title": "Write the DNS troubleshooting runbook",
        "body": "Turn what you saw into a one-page runbook: a table of status codes (NOERROR with answer, NOERROR with no answer, NXDOMAIN, SERVFAIL, REFUSED, timeout) with the likely cause and the first command to run for each, followed by your zone file and options with a comment on every security-relevant line.",
        "check": "Every row in the table is backed by an output you captured in this lab."
      }
    ],
    "verify": [
      "dig @192.168.56.10 web.lab.internal returns 192.168.56.10 with the 'aa' flag, and the PTR lookup for 192.168.56.20 returns win-client01.lab.internal.",
      "dnssec-failed.org returns SERVFAIL through your server and an answer only with +cd.",
      "An AXFR of lab.internal from the lab network now fails with 'Transfer failed.'",
      "Your pcap shows a matched query and response pair by transaction ID, including one NXDomain."
    ],
    "deliverable": "A 'Lab DNS' write-up with a diagram (clients, your BIND server, upstream resolvers), the commented named.conf.options and zone files, annotated dig output for the four fault types, a tcpdump excerpt with the query/response pair highlighted, the before/after AXFR evidence, and the one-page runbook.",
    "resume": "Deployed a BIND 9 authoritative and validating recursive DNS server for a private zone, restricted recursion and zone transfers to the lab network, and wrote a runbook that diagnoses NXDOMAIN, SERVFAIL, REFUSED and timeout faults with dig and packet captures.",
    "interview": [
      "What is the difference between NXDOMAIN and SERVFAIL? — NXDOMAIN means the authoritative data says the name does not exist; SERVFAIL means the server could not get a trustworthy answer at all, for example a broken zone, unreachable authoritative servers or a DNSSEC validation failure.",
      "Why restrict zone transfers? — An AXFR returns every record in the zone, giving an attacker a map of internal hosts and services; only known secondary servers, ideally authenticated with TSIG, should be allowed.",
      "What does DNSSEC protect against, and what does it not? — It lets resolvers verify that answers are authentic and unmodified (stopping cache poisoning and spoofing), but it does not encrypt queries; DNS over TLS or HTTPS covers privacy."
    ],
    "cleanup": [
      "On Windows: Set-DnsClientServerAddress -InterfaceAlias \"Ethernet 2\" -ResetServerAddresses.",
      "Keep BIND if later labs use lab.internal, or run sudo systemctl disable --now named.",
      "Or revert ubuntu-srv01 to the 'pre-dns' snapshot."
    ],
    "links": [
      {
        "label": "BIND 9 Administrator Reference Manual (9.18)",
        "url": "https://bind9.readthedocs.io/en/v9.18/"
      },
      {
        "label": "RFC 1035: Domain names, implementation and specification",
        "url": "https://www.rfc-editor.org/rfc/rfc1035"
      },
      {
        "label": "RFC 4033: DNS Security Introduction and Requirements",
        "url": "https://www.rfc-editor.org/rfc/rfc4033"
      },
      {
        "label": "Microsoft Learn: Resolve-DnsName",
        "url": "https://learn.microsoft.com/en-us/powershell/module/dnsclient/resolve-dnsname"
      }
    ]
  },
  {
    "id": "lab-auditd",
    "title": "Monitor a Linux server with auditd rules and reports",
    "track": "Blue team",
    "level": "Intermediate",
    "minutes": 150,
    "cost": "Free",
    "summary": "Install the Linux Audit framework, write rules that watch identity files, sudoers, SSH config, root commands run by real users and kernel module loads, generate the activity yourself, then find it with ausearch and aureport, forward it to syslog and lock the rules so an attacker cannot quietly turn them off.",
    "realWorld": "auditd is how Linux servers meet logging requirements in PCI DSS, CIS Benchmarks and government baselines, and its logs feed SIEMs such as Splunk, Elastic and Wazuh. When an incident responder asks 'who edited /etc/sudoers and what did they run as root?', the answer comes from audit records keyed to the user's original login ID, even after sudo.",
    "youWillNeed": [
      "Your Ubuntu Server 24.04 VM (ubuntu-srv01) with a sudo-capable admin account",
      "An SSH session from your host or Windows VM"
    ],
    "requires": [
      "lab-home-lab",
      "lab-linux-cli"
    ],
    "safety": "Everything happens on your own lab VM. The 'suspicious' actions are harmless (a test user, a comment line, a curl request). Step 10 makes the rules immutable until the next reboot, so do the steps in order and keep your 'pre-auditd' snapshot.",
    "steps": [
      {
        "title": "Snapshot and install auditd",
        "body": "Take a snapshot named 'pre-auditd'. The auditd package provides the daemon and the auditctl, ausearch and aureport tools; audispd-plugins adds the syslog forwarder you will use later.",
        "cmd": "sudo apt update\nsudo apt install -y auditd audispd-plugins\nsystemctl is-active auditd\nsudo auditctl -s\nsudo auditctl -l",
        "check": "auditd is active, auditctl -s shows 'enabled 1', and auditctl -l prints 'No rules'."
      },
      {
        "title": "Understand where rules live",
        "body": "Rules loaded with auditctl vanish at reboot. Persistent rules go in /etc/audit/rules.d/*.rules, which augenrules merges (in file-name order) into /etc/audit/audit.rules at boot. Look at the default files so you know what is already there.",
        "cmd": "ls -l /etc/audit/rules.d/\nsudo cat /etc/audit/rules.d/audit.rules\ngrep -E '^(log_file|max_log_file|num_logs|max_log_file_action|space_left_action|disk_full_action)' /etc/audit/auditd.conf",
        "check": "You can say where the log is written (/var/log/audit/audit.log), how big it may grow and what happens when the disk fills."
      },
      {
        "title": "Write the lab rule set",
        "body": "File watches (-w) record writes and attribute changes (-p wa) to sensitive files. The syscall rule logs every program run with root privileges by someone who logged in as a real user (auid 1000 or higher), which captures sudo activity. -k adds a key so you can search by it later.",
        "cmd": "sudo tee /etc/audit/rules.d/50-lab.rules > /dev/null <<'EOF'\n## Identity and privilege files\n-w /etc/passwd -p wa -k identity\n-w /etc/group -p wa -k identity\n-w /etc/shadow -p rwa -k identity\n-w /etc/sudoers -p wa -k sudoers\n-w /etc/sudoers.d/ -p wa -k sudoers\n## Remote access configuration\n-w /etc/ssh/sshd_config -p wa -k sshd_config\n## Commands run as root by logged-in users\n-a always,exit -F arch=b64 -S execve -F euid=0 -F auid>=1000 -F auid!=unset -k root_cmds\n## Download tools\n-w /usr/bin/curl -p x -k net_tools\n-w /usr/bin/wget -p x -k net_tools\n## Kernel modules\n-a always,exit -F arch=b64 -S init_module,finit_module,delete_module -k modules\nEOF\nsudo augenrules --load\nsudo auditctl -l",
        "check": "auditctl -l lists your watches and the two syscall rules, each ending with its key."
      },
      {
        "title": "Generate the activity",
        "body": "Act like an admin (or an intruder) doing things that should be traceable: create a user, set its password, read the shadow file, add a comment to the SSH config, download something and load a kernel module.",
        "cmd": "sudo useradd -m audittest\necho 'audittest:Lab-Only-Pass1!' | sudo chpasswd\nsudo cat /etc/shadow > /dev/null\necho '# audit lab test' | sudo tee -a /etc/ssh/sshd_config > /dev/null\ncurl -sI https://ubuntu.com > /dev/null\nsudo modprobe dummy && sudo modprobe -r dummy",
        "check": "Each command completes; sudo tail -5 /var/log/audit/audit.log shows new records."
      },
      {
        "title": "Find events by key with ausearch",
        "body": "-i interprets numeric fields into names (uid 1000 becomes your username, syscall 59 becomes execve). --start recent means the last 10 minutes. Read one record set end to end: the SYSCALL line has the result and IDs, PATH lines have the file, and PROCTITLE has the command line.",
        "cmd": "sudo ausearch -k identity -i --start recent | tail -30\nsudo ausearch -k sshd_config -i --start recent\nsudo ausearch -k net_tools -i --start recent | grep -E 'proctitle|auid'\nsudo ausearch -k modules -i --start recent | grep -E 'syscall|comm'",
        "check": "You find the useradd and chpasswd writes to /etc/passwd and /etc/shadow, the tee write to sshd_config, the curl execution and the modprobe init_module call."
      },
      {
        "title": "See why auid matters",
        "body": "Every root_cmds record has uid=root (the effective identity) and auid=<your username> (who originally logged in). That login ID survives sudo and su, which is what makes audit logs useful for accountability. Compare it with a root command run from a root shell.",
        "cmd": "sudo -i id\nsudo ausearch -k root_cmds -i --start recent | grep -E 'type=SYSCALL' | awk '{for(i=1;i<=NF;i++) if($i ~ /^(auid|uid|comm|exe)=/) printf \"%s \", $i; print \"\"}' | sort | uniq -c | sort -rn | head",
        "check": "Lines show auid=<your admin user> alongside uid=root for commands such as useradd, chpasswd, tee and modprobe."
      },
      {
        "title": "Summarize with aureport",
        "body": "aureport turns the raw log into the reports an auditor or manager asks for: a summary, events per key, authentication attempts and executables.",
        "cmd": "sudo aureport --summary\nsudo aureport -k --summary\nsudo aureport -au --start today | tail -10\nsudo aureport -x --summary --start today | head -15",
        "check": "The key summary lists identity, sshd_config, root_cmds, net_tools and modules with counts."
      },
      {
        "title": "Tune for noise",
        "body": "Look at which key produces the most events. root_cmds can be noisy on a busy server (package updates, cron jobs run via sudo). A common tuning is to exclude a known, trusted executable. Add an exclusion before the rule, reload, and confirm the count stops growing for that program.",
        "cmd": "sudo aureport -k --summary\nsudo sed -i 's|^-a always,exit -F arch=b64 -S execve -F euid=0|-a never,exit -F arch=b64 -S execve -F exe=/usr/bin/apt-get\\n&|' /etc/audit/rules.d/50-lab.rules\nsudo augenrules --load && sudo auditctl -l | grep execve",
        "check": "auditctl -l shows the 'never' rule for /usr/bin/apt-get listed before the root_cmds rule (order matters: first match wins)."
      },
      {
        "title": "Forward audit events to syslog",
        "body": "A SIEM agent or a central syslog server usually collects audit events through the syslog plugin. Enable it and tell auditd to reload its configuration with SIGHUP, then generate an event and look for it in the system log.",
        "cmd": "sudo sed -i 's/^active = no/active = yes/' /etc/audit/plugins.d/syslog.conf\ngrep active /etc/audit/plugins.d/syslog.conf\nsudo pkill -HUP -x auditd\nsudo touch /etc/sudoers.d && sleep 2\nsudo grep -E 'type=(SYSCALL|PATH).*sudoers' /var/log/syslog | tail -3",
        "check": "/var/log/syslog contains audit records mentioning sudoers. If nothing appears, reboot the VM once and repeat the touch; the plugin loads at start-up."
      },
      {
        "title": "Make the rules immutable",
        "body": "An attacker with root can run auditctl -D to delete all rules. '-e 2' locks the configuration until reboot, so any change needs a reboot, which is itself visible. It must be the last rule loaded, hence the 99- file name.",
        "cmd": "echo '-e 2' | sudo tee /etc/audit/rules.d/99-finalize.rules\nsudo augenrules --load\nsudo auditctl -s | grep enabled\nsudo auditctl -D",
        "check": "auditctl -s shows 'enabled 2' and auditctl -D fails with 'Operation not permitted'."
      },
      {
        "title": "Map what you log to ATT&CK and the CIS Benchmark",
        "body": "Build a table: each key, what it detects, the ATT&CK technique (for example T1136.001 Create Local Account, T1548.003 Sudo and Sudo Caching, T1105 Ingress Tool Transfer, T1547.006 Kernel Modules and Extensions, T1098.004 SSH Authorized Keys as a gap to add), a known false positive, and the matching CIS Ubuntu Linux Benchmark audit recommendation. Note at least one gap you would close next.",
        "check": "Each of your five keys maps to a technique and a false positive, and the gaps list is not empty."
      }
    ],
    "verify": [
      "sudo auditctl -l lists the lab rules and sudo auditctl -s shows enabled 2.",
      "ausearch -k identity -i shows the audittest account creation with auid set to your admin username.",
      "aureport -k --summary shows events for at least four keys.",
      "Audit records appear in /var/log/syslog through the syslog plugin."
    ],
    "deliverable": "Publish 50-lab.rules with a comment on every line, annotated ausearch output for the user creation and the sshd_config change (highlighting auid versus uid), the aureport key summary, proof of the immutable setting, and the ATT&CK/CIS mapping table with your noted gaps.",
    "resume": "Deployed Linux auditd with file-watch and syscall rules for identity files, sudoers, SSH configuration, root command execution and kernel module loads, forwarded events to syslog, locked the rule set as immutable and mapped coverage to MITRE ATT&CK and the CIS Ubuntu Benchmark.",
    "interview": [
      "What is the audit UID (auid) and why is it useful? — It is the ID of the user who originally logged in, set at login and unchanged by sudo or su, so actions taken as root can still be attributed to a person.",
      "How do you stop an attacker from disabling auditing? — Make the rules immutable with -e 2, forward events off the host in near real time, and alert on auditd stopping, rules changing or the host rebooting unexpectedly.",
      "Why not audit every syscall? — The volume would slow the system and bury analysts; audit the actions tied to your threat model and tune out known-good noise."
    ],
    "cleanup": [
      "sudo userdel -r audittest and remove the '# audit lab test' line from /etc/ssh/sshd_config.",
      "To change or remove rules after -e 2: delete /etc/audit/rules.d/99-finalize.rules, edit the others, then reboot.",
      "Or revert to the 'pre-auditd' snapshot."
    ],
    "links": [
      {
        "label": "auditctl(8) manual page",
        "url": "https://man7.org/linux/man-pages/man8/auditctl.8.html"
      },
      {
        "label": "audit.rules(7) manual page",
        "url": "https://man7.org/linux/man-pages/man7/audit.rules.7.html"
      },
      {
        "label": "Linux Audit userspace project",
        "url": "https://github.com/linux-audit/audit-userspace"
      },
      {
        "label": "CIS Ubuntu Linux Benchmarks",
        "url": "https://www.cisecurity.org/benchmark/ubuntu_linux"
      },
      {
        "label": "MITRE ATT&CK T1548.003: Sudo and Sudo Caching",
        "url": "https://attack.mitre.org/techniques/T1548/003/"
      }
    ]
  },
  {
    "id": "lab-ad-gpo",
    "title": "Build an Active Directory domain and enforce a Group Policy baseline",
    "track": "Foundations",
    "level": "Intermediate",
    "minutes": 300,
    "cost": "Free (Windows Server 2022 180-day evaluation and your Windows 11 Enterprise evaluation VM)",
    "summary": "Promote a Windows Server evaluation VM to a domain controller, build an OU structure, join your Windows client, then push a workstation security baseline with Group Policy: domain password and lockout policy, firewall, LLMNR off, SMB signing, script block logging, Windows LAPS for local admin passwords, and advanced audit policy. Prove every setting applied with gpresult and compare it with Microsoft's baseline.",
    "realWorld": "Almost every company with Windows runs Active Directory, and Group Policy is how thousands of machines get the same hardening at once. Sysadmins and security engineers build and troubleshoot GPOs weekly, auditors ask for gpresult evidence, and 'no LAPS' and 'LLMNR enabled' are two of the most common findings in internal penetration test reports.",
    "youWillNeed": [
      "A new VM for the domain controller: 2 vCPU, 4 GB RAM, 60 GB disk, NAT + host-only adapters",
      "Windows Server 2022 evaluation ISO from the Microsoft Evaluation Center (free, 180 days)",
      "Your Windows 11 Enterprise evaluation VM (win-client01, 192.168.56.20)",
      "Microsoft Security Compliance Toolkit (Policy Analyzer and the Windows 11 baseline), free download"
    ],
    "requires": [
      "lab-home-lab",
      "lab-windows-hardening"
    ],
    "safety": "Keep the domain on your host-only network only. Use lab-only passwords you use nowhere else, and never join a work or personal machine to this domain.",
    "steps": [
      {
        "title": "Install Windows Server and set a static address",
        "body": "Create dc01 with 'Windows Server 2022 Standard Evaluation (Desktop Experience)', install VirtualBox Guest Additions and all Windows Updates (Windows LAPS needs the April 2023 update or later). Then give the host-only adapter a static IP, point its DNS at itself and rename the server. Check the adapter name with Get-NetAdapter first.",
        "cmd": "Get-NetAdapter\nNew-NetIPAddress -InterfaceAlias \"Ethernet 2\" -IPAddress 192.168.56.30 -PrefixLength 24\nSet-DnsClientServerAddress -InterfaceAlias \"Ethernet 2\" -ServerAddresses 127.0.0.1\nRename-Computer -NewName DC01 -Restart",
        "check": "After the restart, hostname prints DC01 and ipconfig shows 192.168.56.30 on the host-only adapter."
      },
      {
        "title": "Promote it to a domain controller",
        "body": "Install the AD DS role, then create a new forest named corp.internal with integrated DNS. The DSRM password is the break-glass password for directory recovery; store it in your password manager. The server reboots when done.",
        "cmd": "Install-WindowsFeature AD-Domain-Services -IncludeManagementTools\nInstall-ADDSForest -DomainName \"corp.internal\" -DomainNetbiosName \"CORP\" -InstallDns -SafeModeAdministratorPassword (Read-Host -AsSecureString \"DSRM password\") -Force",
        "check": "After the reboot you log in as CORP\\Administrator and Get-ADDomain shows DNSRoot corp.internal."
      },
      {
        "title": "Create OUs, users and groups",
        "body": "GPOs link to OUs, so the OU design decides who gets which policy. Separate workstations, standard users and admin accounts, and give admins a separate account from their daily one (tiering starts here).",
        "cmd": "$base = \"DC=corp,DC=internal\"\nNew-ADOrganizationalUnit -Name \"Lab\" -Path $base\n\"Workstations\",\"Users\",\"Admins\",\"Groups\" | ForEach-Object { New-ADOrganizationalUnit -Name $_ -Path \"OU=Lab,$base\" }\n$pw = Read-Host -AsSecureString \"Lab user password\"\nNew-ADUser -Name \"Alex Staff\" -SamAccountName astaff -UserPrincipalName astaff@corp.internal -Path \"OU=Users,OU=Lab,$base\" -AccountPassword $pw -Enabled $true\nNew-ADUser -Name \"Alex Admin\" -SamAccountName adm-alex -UserPrincipalName adm-alex@corp.internal -Path \"OU=Admins,OU=Lab,$base\" -AccountPassword $pw -Enabled $true\nNew-ADGroup -Name \"Workstation-Admins\" -GroupScope Global -Path \"OU=Groups,OU=Lab,$base\"\nAdd-ADGroupMember \"Workstation-Admins\" -Members adm-alex\nGet-ADOrganizationalUnit -Filter * | Select-Object DistinguishedName",
        "check": "The OU list shows Lab with its four child OUs, and Get-ADGroupMember Workstation-Admins returns adm-alex."
      },
      {
        "title": "Join the Windows client and move it to the Workstations OU",
        "body": "On win-client01 (PowerShell as Administrator) point DNS at the domain controller on every adapter, because domain join finds the DC through DNS SRV records. Join, reboot, then on DC01 move the new computer object out of the default Computers container so GPOs can target it.",
        "cmd": "# On win-client01:\nGet-NetAdapter | Set-DnsClientServerAddress -ServerAddresses 192.168.56.30\nResolve-DnsName -Type SRV _ldap._tcp.dc._msdcs.corp.internal\nAdd-Computer -DomainName corp.internal -Credential CORP\\Administrator -Restart\n# On DC01 after the client reboots:\nGet-ADComputer WIN-CLIENT01 | Move-ADObject -TargetPath \"OU=Workstations,OU=Lab,DC=corp,DC=internal\"",
        "check": "The SRV lookup returns dc01.corp.internal, the client login screen offers 'Other user' with CORP, and Get-ADComputer WIN-CLIENT01 shows the Workstations OU in its DistinguishedName."
      },
      {
        "title": "Set the domain password and lockout policy",
        "body": "Domain account password and lockout settings come from the Default Domain Policy (or fine-grained password policies), not from GPOs linked to OUs. Set a long minimum length and a lockout threshold that stops guessing without letting anyone lock out the whole company.",
        "cmd": "Set-ADDefaultDomainPasswordPolicy -Identity corp.internal -MinPasswordLength 14 -ComplexityEnabled $true -PasswordHistoryCount 24 -LockoutThreshold 10 -LockoutDuration 00:15:00 -LockoutObservationWindow 00:15:00\nGet-ADDefaultDomainPasswordPolicy",
        "check": "The output shows MinPasswordLength 14, LockoutThreshold 10 and 15-minute duration and observation window."
      },
      {
        "title": "Create the workstation baseline GPO",
        "body": "Create a GPO, link it to the Workstations OU, and set registry-based policies with PowerShell: firewall on for all profiles, LLMNR off (it is abused for credential capture), SMB client signing required, 15-minute machine inactivity lock, AutoRun off, and PowerShell script block logging on.",
        "cmd": "$gpo = \"LAB-Workstation-Baseline\"\nNew-GPO -Name $gpo | New-GPLink -Target \"OU=Workstations,OU=Lab,DC=corp,DC=internal\"\n\"DomainProfile\",\"StandardProfile\",\"PublicProfile\" | ForEach-Object { Set-GPRegistryValue -Name $gpo -Key \"HKLM\\Software\\Policies\\Microsoft\\WindowsFirewall\\$_\" -ValueName EnableFirewall -Type DWord -Value 1 }\nSet-GPRegistryValue -Name $gpo -Key \"HKLM\\Software\\Policies\\Microsoft\\Windows NT\\DNSClient\" -ValueName EnableMulticast -Type DWord -Value 0\nSet-GPRegistryValue -Name $gpo -Key \"HKLM\\System\\CurrentControlSet\\Services\\LanmanWorkstation\\Parameters\" -ValueName RequireSecuritySignature -Type DWord -Value 1\nSet-GPRegistryValue -Name $gpo -Key \"HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\" -ValueName InactivityTimeoutSecs -Type DWord -Value 900\nSet-GPRegistryValue -Name $gpo -Key \"HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer\" -ValueName NoDriveTypeAutoRun -Type DWord -Value 255\nSet-GPRegistryValue -Name $gpo -Key \"HKLM\\Software\\Policies\\Microsoft\\Windows\\PowerShell\\ScriptBlockLogging\" -ValueName EnableScriptBlockLogging -Type DWord -Value 1\nGet-GPRegistryValue -Name $gpo -Key \"HKLM\\Software\\Policies\\Microsoft\\Windows NT\\DNSClient\"",
        "check": "Get-GPInheritance -Target \"OU=Workstations,OU=Lab,DC=corp,DC=internal\" lists LAB-Workstation-Baseline under GpoLinks, and the last command shows EnableMulticast = 0."
      },
      {
        "title": "Add advanced audit policy and restricted local admins in GPMC",
        "body": "Open Group Policy Management (gpmc.msc), edit LAB-Workstation-Baseline. Under Computer Configuration > Policies > Windows Settings > Security Settings: (1) Advanced Audit Policy Configuration > Audit Policies: Logon/Logoff > Audit Logon = Success and Failure; Account Management > Audit User Account Management and Audit Security Group Management = Success; Detailed Tracking > Audit Process Creation = Success. (2) Local Policies > Security Options > 'Audit: Force audit policy subcategory settings...' = Enabled. (3) Restricted Groups is blunt, so instead use Computer Configuration > Preferences > Control Panel Settings > Local Users and Groups > New Local Group: Administrators (built-in), action Update, add CORP\\Workstation-Admins.",
        "check": "The GPO's Settings tab in GPMC shows the four audit subcategories, the Force audit policy option and the Local Users and Groups preference."
      },
      {
        "title": "Turn on Windows LAPS",
        "body": "Without LAPS every PC often shares one local Administrator password, so one stolen hash unlocks them all. Windows LAPS (built into current Windows) rotates a unique password per machine and stores it in AD. Extend the schema, let computers write their own password, then in the GPO set Computer Configuration > Policies > Administrative Templates > System > LAPS > 'Configure password backup directory' = Enabled, Active Directory.",
        "cmd": "Update-LapsADSchema\nSet-LapsADComputerSelfPermission -Identity \"OU=Workstations,OU=Lab,DC=corp,DC=internal\"",
        "check": "Both commands finish without errors and the GPO Settings tab lists the LAPS backup directory setting."
      },
      {
        "title": "Apply the policy and prove it",
        "body": "On win-client01 force a refresh (reboot if gpupdate asks), then collect evidence. gpresult shows which GPOs applied and why others did not; the registry and auditpol show the resulting settings; Get-LapsADPassword on the DC shows LAPS worked.",
        "cmd": "# On win-client01 (as Administrator):\ngpupdate /force\nInvoke-LapsPolicyProcessing\ngpresult /r /scope computer\nNew-Item -ItemType Directory C:\\lab -Force | Out-Null\ngpresult /h C:\\lab\\gpresult.html /f\nGet-ItemProperty \"HKLM:\\Software\\Policies\\Microsoft\\Windows NT\\DNSClient\"\nauditpol /get /subcategory:\"Logon\",\"Process Creation\"\nGet-LocalGroupMember Administrators\n# On DC01:\nGet-LapsADPassword -Identity WIN-CLIENT01 -AsPlainText",
        "check": "gpresult lists LAB-Workstation-Baseline under Applied Group Policy Objects, EnableMulticast is 0, Logon auditing is Success and Failure, CORP\\Workstation-Admins is a local admin, and the DC returns a LAPS password with an expiration time."
      },
      {
        "title": "Test the lockout policy",
        "body": "At the client's sign-in screen, enter a wrong password for CORP\\astaff ten times. Then find the account on the DC, read the lockout event, and unlock it the way a help desk would.",
        "cmd": "# On DC01:\nSearch-ADAccount -LockedOut | Select-Object Name, SamAccountName\nGet-WinEvent -FilterHashtable @{LogName='Security'; Id=4740} -MaxEvents 3 | Format-List TimeCreated, Message\nUnlock-ADAccount -Identity astaff",
        "check": "astaff appears as locked out, a 4740 event names WIN-CLIENT01 as the caller computer, and astaff can sign in after the unlock."
      },
      {
        "title": "Back up the GPO and compare it with Microsoft's baseline",
        "body": "Back up your GPO and export an HTML report. Download the Security Compliance Toolkit's Policy Analyzer and the Windows 11 security baseline, add both to Policy Analyzer (Add > File > Add files from GPO(s)) and compare. List three baseline settings you did not configure and decide for each whether to adopt it.",
        "cmd": "New-Item -ItemType Directory C:\\lab\\gpo-backup -Force | Out-Null\nBackup-GPO -Name \"LAB-Workstation-Baseline\" -Path C:\\lab\\gpo-backup\nGet-GPOReport -Name \"LAB-Workstation-Baseline\" -ReportType Html -Path C:\\lab\\LAB-Workstation-Baseline.html",
        "check": "Policy Analyzer shows your GPO and the Microsoft baseline side by side with differences highlighted."
      },
      {
        "title": "Write the baseline document",
        "body": "Document each setting in a table: setting, value, why (the threat it counters), where it is configured (Default Domain Policy or LAB-Workstation-Baseline), and how you verified it. Add the three baseline gaps with your decision and a change-management note on how you would pilot this on a test OU before production.",
        "check": "Every setting in the table has verification evidence from step 9 or 10."
      }
    ],
    "verify": [
      "gpresult /r /scope computer on win-client01 lists LAB-Workstation-Baseline as applied.",
      "Get-LapsADPassword -Identity WIN-CLIENT01 returns a unique password from AD.",
      "Ten failed logons lock astaff out and a 4740 event is on the DC.",
      "LLMNR (EnableMulticast = 0) and script block logging are set in the client's policy registry keys."
    ],
    "deliverable": "A 'Workstation baseline' package: an OU diagram, the settings table with rationale and evidence, the gpresult HTML report, the GPO HTML report and backup, the Policy Analyzer comparison with your three gap decisions, and screenshots of the LAPS password retrieval and the 4740 lockout event.",
    "resume": "Built an Active Directory domain and deployed a Group Policy workstation baseline (firewall, LLMNR disabled, SMB signing, script block logging, advanced audit policy, restricted local admins and Windows LAPS), verified it with gpresult and compared it against the Microsoft Security Compliance Toolkit baseline.",
    "interview": [
      "Why do domain password policies not work when linked to an OU? — Domain account password and lockout policy is read from the domain-level policy (Default Domain Policy); for different rules per group you use fine-grained password policies.",
      "What does LAPS protect against? — Shared local administrator passwords that let an attacker reuse one stolen credential or hash across every machine; LAPS gives each machine a unique, rotated password stored in AD with access control.",
      "A GPO is not applying to a computer. How do you troubleshoot? — Check the computer is in the linked OU, run gpresult to see applied and denied GPOs, check security filtering and WMI filters, inheritance blocking or enforcement, DNS and DC connectivity, and the GroupPolicy operational event log."
    ],
    "cleanup": [
      "Shut down dc01 when you are not using it; the evaluation lasts 180 days.",
      "To leave the domain: Remove-Computer -UnjoinDomainCredential CORP\\Administrator -WorkgroupName LAB -Restart on win-client01, then reset its DNS with Set-DnsClientServerAddress -ResetServerAddresses.",
      "Take a snapshot of both VMs named 'ad-baseline' for later labs."
    ],
    "links": [
      {
        "label": "Microsoft Learn: Install Active Directory Domain Services",
        "url": "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-"
      },
      {
        "label": "Microsoft Learn: Set-GPRegistryValue",
        "url": "https://learn.microsoft.com/en-us/powershell/module/grouppolicy/set-gpregistryvalue"
      },
      {
        "label": "Microsoft Learn: Windows LAPS overview",
        "url": "https://learn.microsoft.com/en-us/windows-server/identity/laps/laps-overview"
      },
      {
        "label": "Microsoft Learn: Security Compliance Toolkit",
        "url": "https://learn.microsoft.com/en-us/windows/security/operating-system-security/device-management/windows-security-configuration-framework/security-compliance-toolkit-10"
      },
      {
        "label": "Windows Server 2022 evaluation",
        "url": "https://www.microsoft.com/en-us/evalcenter/evaluate-windows-server-2022"
      }
    ]
  },
  {
    "id": "lab-wireguard-vpn",
    "title": "Build site-to-site and remote-access VPNs with WireGuard",
    "track": "Networking",
    "level": "Intermediate",
    "minutes": 150,
    "cost": "Free",
    "summary": "Connect two Ubuntu 'sites' with an encrypted WireGuard tunnel, route each site's LAN over it, prove the traffic is encrypted on the wire and cleartext inside the tunnel, see cryptokey routing drop traffic that is not allowed, then add your Windows VM as a split-tunnel remote-access client and revoke it.",
    "realWorld": "VPNs connect branch offices, give staff remote access and link on-premises networks to the cloud. Network engineers configure and troubleshoot tunnels (IPsec, SSL VPN and increasingly WireGuard) all the time, and security teams decide split versus full tunnel and how to revoke a lost laptop's access quickly.",
    "youWillNeed": [
      "Two Ubuntu Server 24.04 VMs on the host-only network: site A (ubuntu-srv01, 192.168.56.10) and site B (a linked clone at 192.168.56.11)",
      "Your Windows VM (win-client01) and the free WireGuard for Windows client"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Build the tunnels only between your own VMs on the host-only network. Treat private keys like passwords: never paste them into tickets, chats or screenshots, and generate new ones if one leaks.",
    "steps": [
      {
        "title": "Plan the addressing",
        "body": "Write the plan before touching anything. Each site has an underlay address (the host-only IP the tunnel runs over), a tunnel address, and a LAN behind it. Here the LANs are dummy interfaces, which behave like a real internal subnet for routing purposes.",
        "cmd": "# Site A: underlay 192.168.56.10  tunnel 10.99.0.1/24  LAN 10.10.1.0/24 (gateway 10.10.1.1)\n# Site B: underlay 192.168.56.11  tunnel 10.99.0.2/24  LAN 10.10.2.0/24 (gateway 10.10.2.1)\n# Remote user (win-client01): tunnel 10.99.0.3/32, reaches site A only",
        "check": "Your plan has no overlapping subnets."
      },
      {
        "title": "Install WireGuard and create the site LANs",
        "body": "Run this on both VMs, swapping 10.10.1.1 for 10.10.2.1 on site B. Dummy interfaces disappear at reboot, which is fine for a lab.",
        "cmd": "sudo apt update && sudo apt install -y wireguard tcpdump\nsudo ip link add lan0 type dummy\nsudo ip addr add 10.10.1.1/24 dev lan0   # site B: 10.10.2.1/24\nsudo ip link set lan0 up\nip -br a",
        "check": "ip -br a shows lan0 UNKNOWN or UP with the site's LAN address."
      },
      {
        "title": "Generate key pairs",
        "body": "WireGuard identifies peers by public key. Create each site's private key with a restrictive umask so no other user can read it, derive the public key, and copy only the public keys between the sites.",
        "cmd": "umask 077\nwg genkey | sudo tee /etc/wireguard/private.key | wg pubkey | sudo tee /etc/wireguard/public.key\nsudo ls -l /etc/wireguard/",
        "check": "private.key has permissions -rw------- owned by root, and you have noted each site's public key."
      },
      {
        "title": "Write the site A configuration",
        "body": "AllowedIPs does two jobs: it is the routing table (send these destinations to this peer) and the access list (accept only these source addresses from this peer). Replace the placeholders with site A's private key and site B's public key.",
        "cmd": "sudo tee /etc/wireguard/wg0.conf > /dev/null <<'EOF'\n[Interface]\nAddress = 10.99.0.1/24\nListenPort = 51820\nPrivateKey = <site A private key>\n\n[Peer]\n# Site B\nPublicKey = <site B public key>\nEndpoint = 192.168.56.11:51820\nAllowedIPs = 10.99.0.2/32, 10.10.2.0/24\nPersistentKeepalive = 25\nEOF\nsudo chmod 600 /etc/wireguard/wg0.conf",
        "check": "sudo cat /etc/wireguard/wg0.conf shows real keys in place of the placeholders."
      },
      {
        "title": "Write the site B configuration",
        "body": "Mirror it on site B: its own tunnel address and private key, site A's public key, endpoint and LAN. If ufw is active on either VM, allow the WireGuard port from the other site.",
        "cmd": "sudo tee /etc/wireguard/wg0.conf > /dev/null <<'EOF'\n[Interface]\nAddress = 10.99.0.2/24\nListenPort = 51820\nPrivateKey = <site B private key>\n\n[Peer]\n# Site A\nPublicKey = <site A public key>\nEndpoint = 192.168.56.10:51820\nAllowedIPs = 10.99.0.1/32, 10.10.1.0/24\nPersistentKeepalive = 25\nEOF\nsudo chmod 600 /etc/wireguard/wg0.conf\nsudo ufw status | grep -q active && sudo ufw allow from 192.168.56.0/24 to any port 51820 proto udp",
        "check": "Both VMs have a wg0.conf with each other's public key."
      },
      {
        "title": "Bring the tunnel up and read its state",
        "body": "wg-quick creates the interface, sets the address and adds a route for every AllowedIPs prefix. wg show is your first troubleshooting command: 'latest handshake' within the last two minutes means the peers authenticated each other.",
        "cmd": "sudo wg-quick up wg0\nsudo wg show\nip route | grep wg0\nping -c 3 10.99.0.2      # from site A",
        "check": "wg show lists the peer with a recent 'latest handshake' and non-zero transfer, ip route shows the remote LAN via wg0, and the ping succeeds."
      },
      {
        "title": "Route between the site LANs",
        "body": "Ping site B's LAN gateway from site A's LAN address. The -I option sets the source, so the packet looks like it came from a host on LAN A. On a real gateway you would also enable IP forwarding so hosts behind it can use the tunnel; set it now and make it persistent.",
        "cmd": "ping -c 3 -I 10.10.1.1 10.10.2.1\necho 'net.ipv4.ip_forward=1' | sudo tee /etc/sysctl.d/99-wireguard.conf\nsudo sysctl --system | grep ip_forward",
        "check": "The LAN-to-LAN ping succeeds and sysctl reports net.ipv4.ip_forward = 1."
      },
      {
        "title": "Prove what is encrypted and what is not",
        "body": "On site B capture on the host-only NIC (usually enp0s8) while site A pings: you see only UDP 51820 packets with no readable content. Then capture on wg0: inside the tunnel the same traffic is plain ICMP between the LAN addresses. This is why tunnel endpoints still need hardening.",
        "cmd": "# Site B, while site A runs: ping -c 20 -I 10.10.1.1 10.10.2.1\nsudo tcpdump -ni enp0s8 udp port 51820 -c 6\nsudo tcpdump -ni wg0 icmp -c 6",
        "check": "enp0s8 shows UDP 192.168.56.10.51820 > 192.168.56.11.51820 packets; wg0 shows ICMP echo request 10.10.1.1 > 10.10.2.1."
      },
      {
        "title": "Watch cryptokey routing enforce policy",
        "body": "Remove site B's LAN from site A's AllowedIPs at run time. The route via wg0 is still there, but no peer is allowed that destination, so site A refuses to send it; it would also drop packets from that range arriving from site B. Restore it afterwards.",
        "cmd": "sudo wg set wg0 peer <site B public key> allowed-ips 10.99.0.2/32\nping -c 2 -W 2 -I 10.10.1.1 10.10.2.1\nsudo wg set wg0 peer <site B public key> allowed-ips 10.99.0.2/32,10.10.2.0/24\nping -c 2 -I 10.10.1.1 10.10.2.1",
        "check": "The first ping fails with 'Required key not available' (the route still points at wg0 but no peer is allowed that destination) and the second succeeds."
      },
      {
        "title": "Add the Windows remote-access client",
        "body": "In WireGuard for Windows choose Add Tunnel > Add empty tunnel; it generates a key pair and shows the public key. Configure a split tunnel that only sends site A traffic through the VPN, then add the client as a peer on site A (in the live interface and in wg0.conf so it survives a restart).",
        "cmd": "# Windows tunnel config (keep the generated PrivateKey line):\n[Interface]\nPrivateKey = <generated>\nAddress = 10.99.0.3/32\n\n[Peer]\nPublicKey = <site A public key>\nEndpoint = 192.168.56.10:51820\nAllowedIPs = 10.99.0.0/24, 10.10.1.0/24\n\n# On site A:\nsudo wg set wg0 peer <windows public key> allowed-ips 10.99.0.3/32\nprintf '\\n# win-client01 remote user\\n[Peer]\\nPublicKey = <windows public key>\\nAllowedIPs = 10.99.0.3/32\\n' | sudo tee -a /etc/wireguard/wg0.conf",
        "check": "After clicking Activate, ping 10.10.1.1 works from Windows and sudo wg show on site A lists the Windows peer with a recent handshake."
      },
      {
        "title": "Revoke the client and enable the tunnel at boot",
        "body": "A lost laptop is revoked by removing its public key; there is no certificate revocation list to publish. Remove the peer live and from the file, confirm Windows can no longer reach site A, then make the site tunnel start at boot on both VMs.",
        "cmd": "sudo wg set wg0 peer <windows public key> remove\nsudo sed -i '/# win-client01 remote user/,+3d' /etc/wireguard/wg0.conf\nsudo wg show\nsudo systemctl enable wg-quick@wg0",
        "check": "wg show no longer lists the Windows peer, ping 10.10.1.1 from Windows fails, and systemctl is-enabled wg-quick@wg0 prints enabled."
      },
      {
        "title": "Compare VPN designs",
        "body": "Write a short comparison of WireGuard, IPsec with IKEv2 and TLS-based SSL VPNs: key exchange, authentication options (keys, certificates, user MFA), NAT traversal, typical use, and how each revokes a user. Add a paragraph on split versus full tunnel and when each is appropriate.",
        "check": "Your comparison names at least one strength and one weakness of each option."
      }
    ],
    "verify": [
      "sudo wg show on both sites shows a recent handshake and ping -I 10.10.1.1 10.10.2.1 succeeds.",
      "Your capture shows only UDP 51820 on the host-only NIC and cleartext ICMP on wg0.",
      "Removing the LAN from AllowedIPs breaks LAN-to-LAN traffic and restoring it fixes it.",
      "The Windows client worked as a split tunnel and could no longer connect after revocation."
    ],
    "deliverable": "A VPN design note with a diagram (two sites, remote user, underlay and tunnel addresses), both wg0.conf files with private keys redacted, the two tcpdump excerpts side by side, wg show output before and after revocation, and your VPN comparison table.",
    "resume": "Designed and built a WireGuard site-to-site VPN linking two routed subnets plus a split-tunnel remote-access client, verified encryption with packet captures, demonstrated cryptokey routing as access control, and documented a key-based revocation procedure.",
    "interview": [
      "What is the difference between split and full tunnel? — Split tunnel sends only corporate subnets through the VPN and the rest directly to the internet; full tunnel sends everything through the VPN so the company can inspect and filter it, at the cost of bandwidth and latency.",
      "What does AllowedIPs do in WireGuard? — It is both the routing table for outbound traffic to that peer and the list of source addresses accepted from that peer, so it acts as a built-in access control list.",
      "A site-to-site tunnel is up but hosts behind it cannot talk. What do you check? — Routes on both sides for the remote subnet, IP forwarding on the gateways, firewall rules on the tunnel interface, overlapping subnets or NAT, and that each side's allowed networks (AllowedIPs or IPsec traffic selectors) match."
    ],
    "cleanup": [
      "sudo wg-quick down wg0 and sudo systemctl disable wg-quick@wg0 on both VMs if you do not need the tunnel.",
      "Delete the tunnel in WireGuard for Windows.",
      "sudo ip link del lan0 (or reboot) to remove the dummy LANs."
    ],
    "links": [
      {
        "label": "WireGuard quick start",
        "url": "https://www.wireguard.com/quickstart/"
      },
      {
        "label": "WireGuard installation (all platforms)",
        "url": "https://www.wireguard.com/install/"
      },
      {
        "label": "WireGuard whitepaper",
        "url": "https://www.wireguard.com/papers/wireguard.pdf"
      },
      {
        "label": "NIST SP 800-77 Rev. 1: Guide to IPsec VPNs",
        "url": "https://csrc.nist.gov/pubs/sp/800/77/r1/final"
      }
    ]
  },
  {
    "id": "lab-net-monitoring",
    "title": "Centralize syslog, sync time with NTP and poll devices with SNMPv3",
    "track": "Networking",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Free",
    "summary": "Turn one Ubuntu VM into a lab time server and central log collector: serve NTP with chrony, receive logs over TCP with rsyslog into per-host files, test store-and-forward when the collector goes down, set log rotation and retention, and poll the other VM with authenticated, encrypted SNMPv3 while proving SNMPv1/v2c is off.",
    "realWorld": "Network operations teams live on syslog, SNMP and NTP. Routers, switches, firewalls and servers send logs to a collector, monitoring systems poll them with SNMP, and everything must agree on the time or incident timelines fall apart. Auditors check log retention, and 'SNMP v2c with community public' is a classic finding.",
    "youWillNeed": [
      "ubuntu-srv01 (192.168.56.10) as the collector and time server",
      "A second Ubuntu 24.04 VM (192.168.56.11) as the monitored device"
    ],
    "requires": [
      "lab-home-lab",
      "lab-linux-cli"
    ],
    "safety": "Keep NTP, syslog and SNMP listening only for the host-only lab subnet. Use lab-only SNMPv3 passphrases. Never expose SNMP or syslog ports to the internet.",
    "steps": [
      {
        "title": "Check the clocks and install chrony on both VMs",
        "body": "Accurate, synchronized time is what lets you line up log entries from different systems. Installing chrony replaces systemd-timesyncd. Check the time status before and after.",
        "cmd": "timedatectl\nsudo apt update && sudo apt install -y chrony\nchronyc tracking\nchronyc sources -v",
        "check": "chronyc sources lists internet servers and one is marked ^* (the currently selected source)."
      },
      {
        "title": "Make the collector a time server for the lab",
        "body": "On 192.168.56.10 allow NTP clients from the lab subnet only. chrony reads extra settings from /etc/chrony/conf.d/. Open UDP 123 in ufw if it is active.",
        "cmd": "echo 'allow 192.168.56.0/24' | sudo tee /etc/chrony/conf.d/lab-server.conf\nsudo systemctl restart chrony\nsudo ufw status | grep -q active && sudo ufw allow from 192.168.56.0/24 to any port 123 proto udp\nsudo ss -ulnp | grep ':123'",
        "check": "ss shows chronyd listening on UDP port 123."
      },
      {
        "title": "Point the monitored VM at the lab time server",
        "body": "On 192.168.56.11 comment out the internet pools and use the collector only, the way devices inside a company use internal NTP servers. Then confirm it synchronizes, and on the server list its clients.",
        "cmd": "# On 192.168.56.11:\nsudo sed -i 's/^pool /#pool /' /etc/chrony/chrony.conf /etc/chrony/sources.d/*.sources 2>/dev/null\necho 'server 192.168.56.10 iburst' | sudo tee /etc/chrony/sources.d/lab.sources\nsudo systemctl restart chrony\nsleep 20; chronyc sources\n# On 192.168.56.10:\nsudo chronyc clients",
        "check": "The client shows ^* 192.168.56.10 with a stratum one higher than the server's, and the server lists 192.168.56.11 as a client."
      },
      {
        "title": "Configure the collector to receive syslog over TCP",
        "body": "TCP delivery with a queue on the sender is more reliable than UDP. The template writes each sender's logs into /var/log/remote/<host>/<program>.log, which keeps devices separate. Validate the config before restarting.",
        "cmd": "sudo mkdir -p /var/log/remote && sudo chown syslog:adm /var/log/remote\nsudo tee /etc/rsyslog.d/10-remote.conf > /dev/null <<'EOF'\ntemplate(name=\"PerHost\" type=\"string\" string=\"/var/log/remote/%HOSTNAME%/%PROGRAMNAME%.log\")\nruleset(name=\"remote\") {\n  action(type=\"omfile\" dynaFile=\"PerHost\")\n}\nmodule(load=\"imtcp\")\ninput(type=\"imtcp\" port=\"514\" ruleset=\"remote\")\nEOF\nsudo rsyslogd -N1\nsudo systemctl restart rsyslog\nsudo ufw status | grep -q active && sudo ufw allow from 192.168.56.0/24 to any port 514 proto tcp\nsudo ss -tlnp | grep ':514'",
        "check": "rsyslogd -N1 ends with 'End of config validation run' without errors and ss shows rsyslogd on TCP 514."
      },
      {
        "title": "Forward logs from the monitored VM",
        "body": "On 192.168.56.11 forward everything with a disk-assisted queue that retries forever, so logs are kept while the collector is unreachable. Then send test messages at different severities with logger.",
        "cmd": "sudo tee /etc/rsyslog.d/90-forward.conf > /dev/null <<'EOF'\n*.* action(type=\"omfwd\" target=\"192.168.56.10\" port=\"514\" protocol=\"tcp\"\n          queue.type=\"LinkedList\" queue.filename=\"fwdq\" queue.saveOnShutdown=\"on\"\n          action.resumeRetryCount=\"-1\")\nEOF\nsudo rsyslogd -N1 && sudo systemctl restart rsyslog\nlogger -p user.info \"LAB-TEST info from $(hostname)\"\nlogger -p auth.warning \"LAB-TEST warning from $(hostname)\"\nlogger -p local0.err \"LAB-TEST error from $(hostname)\"",
        "check": "On the collector, sudo ls /var/log/remote/ shows the second VM's hostname and sudo grep -r LAB-TEST /var/log/remote/ finds all three messages."
      },
      {
        "title": "Learn the severity levels by filtering",
        "body": "Syslog severities run from 0 (emergency) to 7 (debug). Add a rule on the collector that also copies warning and worse from every remote host into one file for the on-call engineer, restart, and send messages at several levels to see which get through.",
        "cmd": "sudo sed -i 's|  action(type=\"omfile\" dynaFile=\"PerHost\")|&\\n  if $syslogseverity <= 4 then action(type=\"omfile\" file=\"/var/log/remote/alerts.log\")|' /etc/rsyslog.d/10-remote.conf\nsudo rsyslogd -N1 && sudo systemctl restart rsyslog\n# On 192.168.56.11:\nfor p in debug info notice warning err crit; do logger -p local0.$p \"LAB-SEV $p\"; done\n# On the collector:\nsudo grep LAB-SEV /var/log/remote/alerts.log",
        "check": "alerts.log contains only the warning, err and crit messages."
      },
      {
        "title": "Test store-and-forward",
        "body": "Stop rsyslog on the collector, generate logs on the monitored VM while it is down, then start the collector again. The queued messages should arrive, which is exactly what you need during a network outage.",
        "cmd": "# Collector:\nsudo systemctl stop rsyslog\n# Monitored VM:\nfor i in 1 2 3; do logger \"LAB-QUEUE message $i\"; done\n# Collector, after about 30 seconds:\nsudo systemctl start rsyslog\nsleep 30; sudo grep -r LAB-QUEUE /var/log/remote/",
        "check": "All three LAB-QUEUE messages appear on the collector after it restarts."
      },
      {
        "title": "Set rotation and retention",
        "body": "Retention is a policy decision (often 90 days online and a year archived) that the configuration must enforce. Rotate the remote logs daily, keep 30 compressed copies, and dry-run logrotate to check the config. The su line is needed because the directory is owned by syslog.",
        "cmd": "sudo tee /etc/logrotate.d/remote > /dev/null <<'EOF'\n/var/log/remote/*.log /var/log/remote/*/*.log {\n    su syslog adm\n    daily\n    rotate 30\n    compress\n    delaycompress\n    missingok\n    notifempty\n    sharedscripts\n    postrotate\n        /usr/lib/rsyslog/rsyslog-rotate\n    endscript\n}\nEOF\nsudo logrotate -d /etc/logrotate.d/remote 2>&1 | tail -15",
        "check": "The dry run lists your remote log files and reports no errors."
      },
      {
        "title": "Configure SNMPv3 on the monitored VM",
        "body": "On 192.168.56.11 install the agent, stop it, disable the default v1/v2c communities, listen on the lab address, and create a read-only v3 user with SHA authentication and AES encryption (authPriv). The createUser line is consumed and replaced with a hashed key when snmpd starts.",
        "cmd": "sudo apt install -y snmpd snmp\nsudo systemctl stop snmpd\nsudo cp /etc/snmp/snmpd.conf /etc/snmp/snmpd.conf.orig\nsudo sed -i 's/^\\s*rocommunity/#rocommunity/' /etc/snmp/snmpd.conf\nsudo sed -i 's/^agentaddress.*/agentaddress udp:127.0.0.1:161,udp:192.168.56.11:161/' /etc/snmp/snmpd.conf\necho 'rouser labmon priv' | sudo tee -a /etc/snmp/snmpd.conf\necho 'createUser labmon SHA \"Lab-Only-Auth-Pass1\" AES \"Lab-Only-Priv-Pass1\"' | sudo tee -a /var/lib/snmp/snmpd.conf\nsudo systemctl start snmpd\nsudo ufw status | grep -q active && sudo ufw allow from 192.168.56.10 to any port 161 proto udp\nsudo ss -ulnp | grep ':161'",
        "check": "ss shows snmpd listening on 192.168.56.11:161 and the createUser line in /var/lib/snmp/snmpd.conf has been replaced by a usmUser entry."
      },
      {
        "title": "Poll it from the collector with SNMPv3 and prove v2c is off",
        "body": "Query the system group (sysDescr, sysUpTime, sysName) and the interface descriptions by numeric OID, since the Ubuntu snmp package ships without most MIB files. Then try v2c with the old default community: it must time out.",
        "cmd": "V3='-v3 -l authPriv -u labmon -a SHA -A Lab-Only-Auth-Pass1 -x AES -X Lab-Only-Priv-Pass1'\nsnmpwalk $V3 192.168.56.11 1.3.6.1.2.1.1\nsnmpget $V3 192.168.56.11 1.3.6.1.2.1.1.3.0\nsnmpwalk $V3 192.168.56.11 1.3.6.1.2.1.2.2.1.2\nsnmpwalk -v2c -c public -t 2 -r 0 192.168.56.11 1.3.6.1.2.1.1",
        "check": "The v3 walks return the host's description, uptime, name and interface names; the v2c walk ends with 'Timeout: No Response'."
      },
      {
        "title": "Correlate an event across systems",
        "body": "Fail an SSH login to 192.168.56.11 from the collector, then find it in the central logs and compare its timestamp with the collector's clock. With NTP working the times line up to the second. Write down the timestamp format and time zone, since mixed zones are a common investigation pitfall.",
        "cmd": "ssh nosuchuser@192.168.56.11   # press Ctrl+C at the password prompt, or enter a wrong password\nsudo grep -rh 'nosuchuser' /var/log/remote/*/sshd*.log | tail -3\ndate; chronyc tracking | grep -E 'System time|Stratum'",
        "check": "The invalid-user event appears in the collector's per-host sshd log with a timestamp within a second or two of when you tried."
      },
      {
        "title": "Write the monitoring design",
        "body": "Document the design as if for a small company: which devices send logs where, protocol and port, severity routing, queueing, retention, time hierarchy (stratum and sources), SNMP version and security level, and the risks you avoided (UDP loss, cleartext v2c communities, unsynchronized clocks). Add what you would do next, such as TLS-encrypted syslog on TCP 6514.",
        "check": "The document covers logging, time and SNMP with a diagram and a table of ports."
      }
    ],
    "verify": [
      "chronyc sources on 192.168.56.11 shows ^* 192.168.56.10 and chronyc clients on the collector lists it.",
      "Messages logged on 192.168.56.11 appear in /var/log/remote/<host>/ and warnings or worse are copied to alerts.log.",
      "Messages generated while the collector was stopped arrived after it restarted.",
      "SNMPv3 authPriv queries succeed and SNMPv2c with community public times out."
    ],
    "deliverable": "A monitoring design document with a diagram, the rsyslog, chrony, logrotate and snmpd configuration files (passphrases redacted), evidence of the store-and-forward test, the SNMPv3 success and v2c timeout output, and the correlated SSH event showing matching timestamps.",
    "resume": "Built centralized logging with rsyslog over TCP with per-host storage, severity routing, disk-assisted queues and 30-day rotation, deployed an internal NTP hierarchy with chrony, and replaced SNMPv2c with SNMPv3 authPriv monitoring.",
    "interview": [
      "Why does NTP matter to security? — Log correlation, incident timelines, Kerberos authentication and certificate validity all depend on accurate time; skewed clocks break authentication and make evidence hard to trust.",
      "What does SNMPv3 add over v2c? — User-based authentication and optional encryption (authPriv), instead of a cleartext community string that anyone sniffing the network can reuse.",
      "Syslog over UDP or TCP? — TCP (ideally with TLS) because it detects loss and supports queueing; UDP is simple and still common on network devices but silently drops messages under load or during outages."
    ],
    "cleanup": [
      "On 192.168.56.11 remove /etc/rsyslog.d/90-forward.conf and restart rsyslog if you do not want ongoing forwarding.",
      "Restore /etc/snmp/snmpd.conf.orig or sudo apt purge snmpd if you no longer need SNMP.",
      "Re-enable the pool lines in the chrony configuration if the second VM should use internet time again."
    ],
    "links": [
      {
        "label": "rsyslog documentation",
        "url": "https://www.rsyslog.com/doc/"
      },
      {
        "label": "chrony documentation",
        "url": "https://chrony-project.org/documentation.html"
      },
      {
        "label": "Net-SNMP snmpd.conf manual",
        "url": "https://www.net-snmp.org/docs/man/snmpd.conf.html"
      },
      {
        "label": "RFC 5424: The Syslog Protocol",
        "url": "https://www.rfc-editor.org/rfc/rfc5424"
      },
      {
        "label": "NIST SP 800-92: Guide to Computer Security Log Management",
        "url": "https://csrc.nist.gov/pubs/sp/800/92/final"
      }
    ]
  },
  {
    "id": "lab-db-failover",
    "title": "DR drill: fail over a replicated PostgreSQL database and measure RPO and RTO",
    "track": "GRC & architecture",
    "level": "Advanced",
    "minutes": 240,
    "cost": "Free",
    "summary": "Set DR objectives for a small reservations database, build PostgreSQL 16 streaming replication between two Ubuntu VMs, run a live write workload, pull the plug on the primary, promote the standby, and measure the real recovery point and recovery time against your targets. Then rebuild the old primary as the new standby and write the after-action report.",
    "realWorld": "Business continuity plans promise RPOs and RTOs, but only a drill proves them. Database administrators, SREs and resilience or GRC teams run failover tests, record the actual numbers for auditors and regulators, and turn the gaps into remediation items. Knowing the difference between replication, backup and high availability is also a staple of CISSP and Security+ resilience questions.",
    "youWillNeed": [
      "Two Ubuntu Server 24.04 VMs: primary (ubuntu-srv01, 192.168.56.10) and standby (192.168.56.11), each with 2 GB RAM",
      "A stopwatch or the timestamps in your workload log",
      "Your BIA from lab-bia-backup (or a one-line business impact statement for the database)"
    ],
    "requires": [
      "lab-home-lab",
      "lab-bia-backup"
    ],
    "safety": "Use only your lab VMs and made-up data. Do the 'disaster' by powering off the lab VM from VirtualBox, never on a machine that holds real data. Take snapshots of both VMs first.",
    "steps": [
      {
        "title": "Write the DR objectives and drill plan",
        "body": "Before any command, write what the business needs and how the drill will prove it. Record: system (reservations database), RPO target (at most 5 seconds of acknowledged bookings lost), RTO target (writes working again within 15 minutes), the scenario (sudden loss of the primary server), success criteria, roles (you play DBA, incident lead and scribe) and the rollback plan (snapshots).",
        "check": "A one-page drill plan with RPO, RTO, scenario, success criteria and rollback exists before you start."
      },
      {
        "title": "Install PostgreSQL on both VMs",
        "body": "Ubuntu 24.04 ships PostgreSQL 16. Take snapshots named 'pre-dr' first. Configuration lives in /etc/postgresql/16/main and data in /var/lib/postgresql/16/main.",
        "cmd": "sudo apt update && sudo apt install -y postgresql\nsudo -u postgres psql -c 'SELECT version();'\npg_lsclusters",
        "check": "pg_lsclusters shows cluster 16 main online on port 5432 on both VMs."
      },
      {
        "title": "Prepare the primary",
        "body": "On 192.168.56.10 listen on all addresses (pg_hba.conf and the firewall decide who may connect), create a replication role and an application role, and allow them in pg_hba.conf. Both nodes get entries for each other so roles can reverse later.",
        "cmd": "sudo -u postgres psql -c \"ALTER SYSTEM SET listen_addresses = '*';\"\nsudo -u postgres psql -c \"CREATE ROLE replicator WITH REPLICATION LOGIN PASSWORD 'Lab-Only-Repl1';\"\nsudo -u postgres psql -c \"CREATE ROLE app WITH LOGIN PASSWORD 'Lab-Only-App1';\"\nsudo tee -a /etc/postgresql/16/main/pg_hba.conf > /dev/null <<'EOF'\nhost  replication   replicator  192.168.56.10/32  scram-sha-256\nhost  replication   replicator  192.168.56.11/32  scram-sha-256\nhost  reservations  app         192.168.56.0/24   scram-sha-256\nEOF\nsudo systemctl restart postgresql\nsudo ufw status | grep -q active && sudo ufw allow from 192.168.56.0/24 to any port 5432 proto tcp\nsudo ss -tlnp | grep 5432",
        "check": "ss shows postgres listening on 0.0.0.0:5432."
      },
      {
        "title": "Create the reservations database",
        "body": "Create a small table and give the app role only what it needs: connect, insert and read, plus use of the ID sequence. Least privilege applies to application accounts too.",
        "cmd": "sudo -u postgres psql -c 'CREATE DATABASE reservations;'\nsudo -u postgres psql -d reservations <<'EOF'\nCREATE TABLE bookings (id bigserial PRIMARY KEY, guest text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());\nGRANT SELECT, INSERT ON bookings TO app;\nGRANT USAGE ON SEQUENCE bookings_id_seq TO app;\nEOF\nPGPASSWORD='Lab-Only-App1' psql -h 192.168.56.10 -U app -d reservations -c \"INSERT INTO bookings (guest) VALUES ('first guest') RETURNING *;\"",
        "check": "The insert over the network as app returns row id 1."
      },
      {
        "title": "Clone the primary to the standby with pg_basebackup",
        "body": "On 192.168.56.11 stop PostgreSQL, set the empty cluster aside, and copy the primary. -R writes standby.signal and the connection settings so the copy starts as a streaming standby; -X stream includes the WAL needed for a consistent start. Add the same pg_hba.conf lines on the standby, because Ubuntu keeps configuration outside the data directory.",
        "cmd": "sudo systemctl stop postgresql\nsudo -u postgres mv /var/lib/postgresql/16/main /var/lib/postgresql/16/main.orig\nsudo -u postgres pg_basebackup -h 192.168.56.10 -U replicator -D /var/lib/postgresql/16/main -R -X stream -P\nsudo tee -a /etc/postgresql/16/main/pg_hba.conf > /dev/null <<'EOF'\nhost  replication   replicator  192.168.56.10/32  scram-sha-256\nhost  replication   replicator  192.168.56.11/32  scram-sha-256\nhost  reservations  app         192.168.56.0/24   scram-sha-256\nEOF\nsudo systemctl start postgresql\nsudo ufw status | grep -q active && sudo ufw allow from 192.168.56.0/24 to any port 5432 proto tcp",
        "check": "pg_basebackup asks for the replicator password and reaches 100%, and PostgreSQL starts on the standby."
      },
      {
        "title": "Verify replication",
        "body": "On the primary, pg_stat_replication shows connected standbys and their lag. On the standby, pg_is_in_recovery() is true and writes are refused, because a streaming standby is read-only.",
        "cmd": "# Primary:\nsudo -u postgres psql -x -c 'SELECT client_addr, state, sync_state, write_lag, replay_lag FROM pg_stat_replication;'\n# Standby:\nsudo -u postgres psql -c 'SELECT pg_is_in_recovery();'\nsudo -u postgres psql -d reservations -c 'SELECT * FROM bookings;'\nsudo -u postgres psql -d reservations -c \"INSERT INTO bookings (guest) VALUES ('should fail');\"",
        "check": "The primary shows client_addr 192.168.56.11, state streaming, sync_state async; the standby returns t, shows 'first guest', and the insert fails with 'cannot execute INSERT in a read-only transaction'."
      },
      {
        "title": "Start the application workload",
        "body": "Simulate the booking app from the standby VM (in a real design the app runs elsewhere). Once a second it inserts a booking on the primary and logs the local time with the ID it got back, or the error. That log is your evidence for both RPO and RTO. Leave it running; press Ctrl+C to stop watching the tail, not the loop.",
        "cmd": "export PGPASSWORD='Lab-Only-App1' DBHOST=192.168.56.10\nwhile true; do echo \"$(date +%T) $(psql -h $DBHOST -U app -d reservations -Atc \"INSERT INTO bookings (guest) VALUES ('guest') RETURNING id\" 2>&1 | head -1)\" >> ~/writes.log; sleep 1; done &\ntail -f ~/writes.log",
        "check": "writes.log gains a line per second with an increasing ID."
      },
      {
        "title": "Check replication lag under load",
        "body": "On the standby, measure how far behind replay is. With asynchronous replication on a quiet lab network it is usually well under a second, which is your predicted RPO.",
        "cmd": "sudo -u postgres psql -d reservations -Atc 'SELECT now() - pg_last_xact_replay_timestamp() AS replay_delay, max(id) FROM bookings;'",
        "check": "replay_delay is a fraction of a second and max(id) is within one or two of the newest ID in writes.log."
      },
      {
        "title": "Declare the disaster",
        "body": "In VirtualBox choose Machine > Close > Power off the machine for the primary VM (a hard power loss, not a clean shutdown). Write down the exact time as T0. Watch writes.log start to show connection errors.",
        "cmd": "# On the standby:\ntail -5 ~/writes.log",
        "check": "writes.log shows errors such as 'could not connect to server' or 'timeout expired' after T0."
      },
      {
        "title": "Promote the standby and redirect the application",
        "body": "Follow your runbook: confirm the primary is really gone (so you do not create two primaries, a split brain), promote the standby, then point the app at the new primary. Here that means stopping the loop and restarting it with DBHOST set to 192.168.56.11.",
        "cmd": "ping -c 2 -W 1 192.168.56.10\nsudo -u postgres psql -c 'SELECT pg_promote();'\nsudo -u postgres psql -c 'SELECT pg_is_in_recovery();'\nkill %1\nexport DBHOST=192.168.56.11\nwhile true; do echo \"$(date +%T) $(psql -h $DBHOST -U app -d reservations -Atc \"INSERT INTO bookings (guest) VALUES ('guest') RETURNING id\" 2>&1 | head -1)\" >> ~/writes.log; sleep 1; done &",
        "check": "pg_promote returns t, pg_is_in_recovery returns f, and new lines in writes.log show IDs again."
      },
      {
        "title": "Measure the actual RPO and RTO",
        "body": "RPO: find the last ID the old primary acknowledged before T0 in writes.log and check it exists on the new primary. Any acknowledged ID that is missing is lost data. RTO: the time of the first successful write after T0 minus T0. Compare both with your targets.",
        "cmd": "grep -E ' [0-9]+$' ~/writes.log | awk '$1 < \"<T0 as HH:MM:SS>\"' | tail -1\nsudo -u postgres psql -d reservations -Atc 'SELECT count(*), max(id) FROM bookings WHERE id <= <last acknowledged id>;'\ngrep -E ' [0-9]+$' ~/writes.log | awk '$1 > \"<T0 as HH:MM:SS>\"' | head -1\nkill %1",
        "check": "You have a number of lost acknowledged bookings (usually 0) and an RTO in minutes, each marked met or not met against the target. Expect a gap in IDs after promotion: sequences skip values on failover, which is normal."
      },
      {
        "title": "Rebuild the old primary as the new standby",
        "body": "Power the old primary back on. It still thinks it is a primary, which is dangerous: stop it before any client connects, then re-clone it from the new primary so the roles are reversed. This is the failback preparation step most plans forget.",
        "cmd": "# On 192.168.56.10 immediately after boot:\nsudo systemctl stop postgresql\nsudo -u postgres mv /var/lib/postgresql/16/main /var/lib/postgresql/16/main.failed\nsudo -u postgres pg_basebackup -h 192.168.56.11 -U replicator -D /var/lib/postgresql/16/main -R -X stream -P\nsudo systemctl start postgresql\n# On 192.168.56.11:\nsudo -u postgres psql -x -c 'SELECT client_addr, state FROM pg_stat_replication;'",
        "check": "The new primary (192.168.56.11) shows 192.168.56.10 streaming from it."
      },
      {
        "title": "Write the after-action report",
        "body": "Report the drill like a real one: timeline from T0 to recovery, measured RPO and RTO against targets, what went well, what went wrong (for example manual app redirection, no automatic fencing of the old primary, async replication can lose data), and remediation items with owners and dates, such as a virtual IP or connection pooler, synchronous replication for zero RPO, monitoring on replication lag, and restoring backups separately because replication also copies deletions and ransomware.",
        "check": "The report has a timeline, both measurements, at least three lessons learned and at least three remediation items."
      }
    ],
    "verify": [
      "pg_stat_replication showed the standby as streaming before the drill.",
      "After promotion pg_is_in_recovery() returned f on 192.168.56.11 and writes resumed.",
      "Your writes.log evidence gives a measured RPO (lost acknowledged rows) and RTO (minutes) compared with the targets.",
      "The old primary was rebuilt as a standby of the new primary."
    ],
    "deliverable": "A DR drill pack: the drill plan with RPO/RTO targets, an architecture diagram before and after failover, the runbook you followed, the annotated writes.log excerpt around T0 and recovery, the RPO/RTO results table, and the after-action report with remediation items.",
    "resume": "Planned and executed a database disaster recovery drill on PostgreSQL 16 streaming replication, promoting the standby after a simulated primary failure, measuring an RTO of <your minutes> minutes and zero lost acknowledged transactions against targets, and delivered an after-action report with remediation items.",
    "interview": [
      "What is the difference between RPO and RTO? — RPO is the maximum acceptable data loss measured in time before the incident; RTO is the maximum acceptable time to restore the service after it.",
      "Why is replication not a backup? — Replication copies every change, including accidental deletes, corruption and ransomware encryption, to the standby within seconds; you still need point-in-time, ideally immutable, backups to recover from those.",
      "What is split brain and how do you prevent it? — Two nodes both acting as primary and accepting writes, causing diverging data; prevent it with fencing or STONITH, a quorum-based cluster manager and a runbook step that confirms the old primary is down before promotion."
    ],
    "cleanup": [
      "Stop any remaining workload loop with kill %1 or by closing the shell.",
      "Revert both VMs to the 'pre-dr' snapshots, or sudo apt purge postgresql* if you want the disk space back.",
      "Delete ~/writes.log after copying the evidence you need."
    ],
    "links": [
      {
        "label": "PostgreSQL 16: Log-shipping standby servers",
        "url": "https://www.postgresql.org/docs/16/warm-standby.html"
      },
      {
        "label": "PostgreSQL 16: Failover",
        "url": "https://www.postgresql.org/docs/16/warm-standby-failover.html"
      },
      {
        "label": "PostgreSQL 16: pg_basebackup",
        "url": "https://www.postgresql.org/docs/16/app-pgbasebackup.html"
      },
      {
        "label": "NIST SP 800-34 Rev. 1: Contingency Planning Guide",
        "url": "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final"
      }
    ]
  },
  {
    "id": "lab-cloud-posture",
    "title": "Audit your AWS account's security posture with Prowler and fix the findings",
    "track": "GRC & architecture",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Free (AWS free tier; the scan is read-only API calls, and a $1 budget alert should already exist from lab-cloud-iam)",
    "summary": "Create a read-only auditor identity with the AWS SecurityAudit and ViewOnlyAccess policies, plant one harmless misconfiguration, run the open-source Prowler scanner against your own account and against the CIS AWS Foundations Benchmark, triage the results, remediate the top findings with the AWS CLI, rescan to prove the fix, and document accepted risks.",
    "realWorld": "Cloud misconfiguration is behind many breaches, so companies run cloud security posture management (CSPM) tools such as Prowler, AWS Security Hub or commercial platforms continuously. Cloud security analysts triage their findings, open tickets with owners, prove fixes with a rescan and record risk acceptances, which is exactly what CySA+ vulnerability management and CISSP assessment questions describe.",
    "youWillNeed": [
      "The AWS account you secured in lab-cloud-iam, with IAM Identity Center and the AWS CLI v2 set up",
      "An Ubuntu 24.04 VM or any machine with Python 3.9+ to run Prowler",
      "About 1 GB of disk for Prowler and its output"
    ],
    "requires": [
      "lab-cloud-iam"
    ],
    "safety": "Scan only an AWS account you own. The planted security group is attached to nothing, so nothing is exposed; delete it in step 9 anyway. Keep the auditor identity read-only and never store long-term access keys in files; use IAM Identity Center sign-in.",
    "steps": [
      {
        "title": "Confirm cost guard-rails and your identity",
        "body": "Check that the budget alert from lab-cloud-iam still exists and sign in with your admin SSO profile. Everything in this lab is read-only or free-tier, but checking the alarm first is a habit worth keeping.",
        "cmd": "aws sso login --profile lab-admin\naws sts get-caller-identity --profile lab-admin\naws budgets describe-budgets --account-id $(aws sts get-caller-identity --profile lab-admin --query Account --output text) --profile lab-admin --query 'Budgets[].BudgetName'",
        "check": "get-caller-identity returns your account and role, and your budget name is listed."
      },
      {
        "title": "Create a read-only auditor permission set",
        "body": "Auditors should not be able to change what they audit. In the IAM Identity Center console create a permission set named 'SecurityAuditor' with the AWS managed policies SecurityAudit and ViewOnlyAccess, assign it to your user for this account, then add a CLI profile for it.",
        "cmd": "aws configure sso\n# SSO session name: lab\n# Choose the account and the SecurityAuditor role, CLI profile name: lab-audit\naws sso login --profile lab-audit\naws sts get-caller-identity --profile lab-audit\naws iam create-user --user-name should-fail --profile lab-audit",
        "check": "get-caller-identity shows the SecurityAuditor role, and create-user fails with AccessDenied, which proves the identity is read-only."
      },
      {
        "title": "Plant one harmless finding",
        "body": "Create a security group in the default VPC that allows SSH from anywhere. Security groups cost nothing and this one is attached to no instance, so nothing is reachable, but it gives you a known true positive to find in the report.",
        "cmd": "aws ec2 create-security-group --group-name lab-open-ssh --description \"Lab planted finding\" --region us-east-1 --profile lab-admin\naws ec2 authorize-security-group-ingress --group-name lab-open-ssh --protocol tcp --port 22 --cidr 0.0.0.0/0 --region us-east-1 --profile lab-admin",
        "check": "The second command returns \"Return\": true and the rule with CidrIpv4 0.0.0.0/0."
      },
      {
        "title": "Install Prowler",
        "body": "Prowler is an open-source cloud security scanner with hundreds of checks mapped to CIS, NIST, PCI DSS and other frameworks. pipx installs it in its own environment so it does not interfere with system Python.",
        "cmd": "sudo apt update && sudo apt install -y pipx\npipx install prowler\npipx ensurepath\nexec $SHELL -l\nprowler -v\nprowler aws --list-compliance | grep -i cis",
        "check": "prowler -v prints a version and the compliance list includes one or more cis_*_aws frameworks."
      },
      {
        "title": "Run the full scan",
        "body": "Scan one region to keep it quick (global services such as IAM are always included). Prowler writes CSV, JSON (OCSF) and HTML reports to the output folder. Expect it to take several minutes.",
        "cmd": "mkdir -p ~/prowler-out\nprowler aws --profile lab-audit -f us-east-1 -M csv html json-ocsf -o ~/prowler-out\nls -lh ~/prowler-out",
        "check": "The run ends with a summary table of PASS and FAIL counts by severity, and the output folder has .csv, .html and .ocsf.json files."
      },
      {
        "title": "Run the CIS benchmark view",
        "body": "Run again with the CIS AWS Foundations Benchmark framework (use the newest cis_*_aws name from the list in step 4). The compliance output groups checks by CIS section, which is how an auditor or a customer questionnaire will ask about them.",
        "cmd": "prowler aws --profile lab-audit -f us-east-1 --compliance <cis framework name, for example cis_3.0_aws> -o ~/prowler-out\nls ~/prowler-out/compliance/",
        "check": "The terminal prints a CIS compliance summary with pass and fail percentages per section."
      },
      {
        "title": "Find your planted finding and triage the rest",
        "body": "Open the HTML report in a browser and filter to FAIL. Confirm the SSH-from-internet check flags lab-open-ssh. Then pick the ten most important failures and classify each as true positive, false positive (for example flagged on a resource that does not exist in your use) or accepted risk (for example a paid service you choose not to enable).",
        "cmd": "grep -i 'lab-open-ssh' ~/prowler-out/*.csv | cut -c1-300\nprowler aws --list-checks | grep -iE 'securitygroup_allow_ingress_from_internet_to_tcp_port_22|ebs_default_encryption|password_policy_minimum_length'",
        "check": "Your triage sheet has ten findings, each with severity, classification and a one-line reason."
      },
      {
        "title": "Remediate three findings",
        "body": "Fix at least three with your admin profile: delete the planted security group, turn on EBS encryption by default for the region, and set an IAM account password policy (it applies to any IAM users, even though you sign in with Identity Center). Pick more from your triage if they are free.",
        "cmd": "aws ec2 delete-security-group --group-name lab-open-ssh --region us-east-1 --profile lab-admin\naws ec2 enable-ebs-encryption-by-default --region us-east-1 --profile lab-admin\naws iam update-account-password-policy --minimum-password-length 14 --require-symbols --require-numbers --require-uppercase-characters --require-lowercase-characters --password-reuse-prevention 24 --profile lab-admin\naws iam get-account-password-policy --profile lab-admin",
        "check": "The security group is gone, enable-ebs-encryption-by-default returns true, and the password policy shows MinimumPasswordLength 14."
      },
      {
        "title": "Rescan the specific checks",
        "body": "Proving the fix is part of remediation. Run only the checks you remediated, using the exact check names from the list in step 7.",
        "cmd": "prowler aws --profile lab-audit -f us-east-1 -c ec2_securitygroup_allow_ingress_from_internet_to_tcp_port_22 ec2_ebs_default_encryption iam_password_policy_minimum_length_14 -o ~/prowler-rescan",
        "check": "All three checks report PASS (or the security group no longer appears)."
      },
      {
        "title": "Record accepted risks",
        "body": "For every true positive you are not fixing, write a risk acceptance: finding, reason (for example cost of a paid detection service for a personal lab account), compensating control, owner (you), and review date. Unrecorded exceptions are how findings quietly become breaches.",
        "check": "Each unfixed true positive has a written acceptance with a review date."
      },
      {
        "title": "Write the posture report",
        "body": "Write a short report for a non-technical owner: scope and method, overall pass rate and CIS score before and after, top risks in plain language, what you fixed with rescan evidence, accepted risks, and a recommendation to run the scan on a schedule (for example weekly in a pipeline, or through AWS Security Hub).",
        "check": "The report fits on two pages and every claim links to evidence in the Prowler output."
      }
    ],
    "verify": [
      "The lab-audit profile is read-only: create-user failed with AccessDenied.",
      "The first Prowler report flagged lab-open-ssh and the rescan shows the remediated checks as PASS.",
      "You have a triage sheet of ten findings and written acceptances for unfixed true positives.",
      "The CIS compliance summary was captured before and after remediation."
    ],
    "deliverable": "A cloud posture assessment: scope and method, the SecurityAuditor permission set description, before/after summary numbers and CIS section scores, the triage sheet, remediation commands with rescan evidence, the risk acceptance register and the two-page owner report. Redact your account ID in anything you publish.",
    "resume": "Assessed an AWS account against the CIS AWS Foundations Benchmark with Prowler using a read-only auditor role, triaged findings into true positives, false positives and accepted risks, remediated the top issues with the AWS CLI and verified the fixes with a targeted rescan.",
    "interview": [
      "Why should an auditor's cloud role be read-only? — Separation of duties and least privilege: an assessment identity that can change resources could cause outages or hide findings, and its credentials are a juicy target.",
      "What is CSPM? — Cloud security posture management: continuously checking cloud configuration against best practices and frameworks such as CIS, and flagging misconfigurations like public buckets or open security groups.",
      "How do you handle a finding you cannot fix? — Document a risk acceptance with the business reason, compensating controls, an accountable owner and a review date, approved by someone with authority to accept the risk."
    ],
    "cleanup": [
      "Make sure lab-open-ssh is deleted: aws ec2 describe-security-groups --group-names lab-open-ssh --region us-east-1 --profile lab-admin should fail.",
      "Keep the SecurityAuditor permission set for future scans, or remove its assignment in IAM Identity Center.",
      "pipx uninstall prowler if you do not need it, and delete the output folders after saving your evidence."
    ],
    "links": [
      {
        "label": "Prowler documentation",
        "url": "https://docs.prowler.com/"
      },
      {
        "label": "AWS managed policy: SecurityAudit",
        "url": "https://docs.aws.amazon.com/aws-managed-policy/latest/reference/SecurityAudit.html"
      },
      {
        "label": "CIS Amazon Web Services Benchmarks",
        "url": "https://www.cisecurity.org/benchmark/amazon_web_services"
      },
      {
        "label": "AWS: Amazon EBS encryption by default",
        "url": "https://docs.aws.amazon.com/ebs/latest/userguide/encryption-by-default.html"
      }
    ]
  },
  {
    "id": "lab-controls-audit",
    "title": "Run an internal audit against the CIS Controls IG1 and write the audit report",
    "track": "GRC & architecture",
    "level": "Intermediate",
    "minutes": 240,
    "cost": "Free (CIS Controls v8.1 download with a free CIS registration)",
    "summary": "Plan and perform a small internal audit of your own home lab against CIS Critical Security Controls v8.1 Implementation Group 1: write the scope and criteria, build workpapers, collect command-line evidence for inventory, accounts, patching, logging, malware defenses and backups, hash the evidence, rate findings in condition-criteria-cause-effect form and deliver an audit report with a management response.",
    "realWorld": "IT auditors, GRC analysts and security assessors spend their days doing exactly this: agreeing scope, testing controls by inquiry, observation, inspection and re-performance, keeping evidence that stands up to review, and writing findings that management will actually fix. CIS IG1 is the 'essential cyber hygiene' baseline that insurers and small-business frameworks point to.",
    "youWillNeed": [
      "Your home lab VMs (ubuntu-srv01 and win-client01) as the audited environment",
      "The CIS Controls v8.1 document and the IG1 safeguard list (free from cisecurity.org)",
      "A spreadsheet application for the workpapers"
    ],
    "requires": [
      "lab-home-lab",
      "lab-risk-register"
    ],
    "safety": "Audit only systems you own. The Nmap sweep is limited to your host-only lab subnet. Keep the evidence folder on your own disk and redact anything personal before sharing the report.",
    "steps": [
      {
        "title": "Write the audit engagement memo",
        "body": "State the objective (is essential cyber hygiene in place?), scope (the two lab VMs, the hypervisor host and the host-only network), criteria (CIS Controls v8.1 IG1 safeguards for Controls 1, 2, 4, 5, 7, 8, 10 and 11), period, method (inquiry, observation, inspection, re-performance), and a note on independence: you are auditing your own work, which a real audit would avoid.",
        "check": "A one-page memo with objective, scope, criteria, method and limitations exists."
      },
      {
        "title": "Build the workpaper",
        "body": "Create a spreadsheet with one row per safeguard in scope and the columns: Safeguard ID, Safeguard title, Test procedure, Method, Evidence reference, Result (Implemented, Partially implemented, Not implemented, Not applicable), Notes. Write the test procedure before looking at the system, so the test is not shaped by what you expect to find.",
        "check": "Every in-scope IG1 safeguard has a written test procedure and method."
      },
      {
        "title": "Test Controls 1 and 2: asset and software inventory",
        "body": "Compare what is on the network with what your lab plan says should be there (re-performance), then pull installed software lists. Any device or package nobody can explain is a finding.",
        "cmd": "mkdir -p ~/audit-evidence && cd ~/audit-evidence\n# On win-client01 first: New-Item -ItemType Directory C:\\lab\\audit -Force\nsudo nmap -sn 192.168.56.0/24 -oN 01-asset-discovery.txt\ndpkg-query -W -f='${Package}\\t${Version}\\n' > 02-ubuntu-software.tsv; wc -l 02-ubuntu-software.tsv\n# On win-client01 (PowerShell):\nwinget list --accept-source-agreements > C:\\lab\\audit\\02-windows-software.txt",
        "check": "The discovered hosts match your lab plan (or the difference is recorded) and both software lists are saved."
      },
      {
        "title": "Test Controls 4 and 5: secure configuration and accounts",
        "body": "Inspect accounts and admin rights on both systems: who can log in, who is an administrator, whether default or unused accounts are enabled, and whether a host firewall is on.",
        "cmd": "awk -F: '$3>=1000 && $3<65534 {print $1, $7}' /etc/passwd > 03-linux-users.txt\ngetent group sudo >> 03-linux-users.txt\nsudo ufw status verbose > 04-linux-firewall.txt\n# On win-client01:\nGet-LocalUser | Select-Object Name, Enabled, PasswordLastSet, LastLogon | Out-File C:\\lab\\audit\\03-windows-users.txt\nGet-LocalGroupMember Administrators | Out-File -Append C:\\lab\\audit\\03-windows-users.txt\nGet-NetFirewallProfile | Select-Object Name, Enabled | Out-File C:\\lab\\audit\\04-windows-firewall.txt",
        "check": "You can state for each system how many admin accounts exist and whether the firewall is enabled on every profile."
      },
      {
        "title": "Test Control 7: vulnerability and patch management",
        "body": "Inspect whether updates are applied automatically and how recently. A system that is 'patched when I remember' fails 7.3 and 7.4 even if it happens to be current today.",
        "cmd": "apt list --upgradable 2>/dev/null > 05-linux-pending-updates.txt\ncat /etc/apt/apt.conf.d/20auto-upgrades >> 05-linux-pending-updates.txt\nsudo tail -20 /var/log/unattended-upgrades/unattended-upgrades.log > 06-linux-autopatch-log.txt\n# On win-client01:\nGet-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 5 | Out-File C:\\lab\\audit\\05-windows-hotfixes.txt",
        "check": "You have the number of pending updates, the automatic update setting, and the date of the latest installed Windows update."
      },
      {
        "title": "Test Controls 8 and 10: audit logs and malware defenses",
        "body": "Check that logging is on, that there is enough space and retention, and that anti-malware is running with current signatures.",
        "cmd": "journalctl --disk-usage > 07-linux-logging.txt\ngrep -E '^#?(SystemMaxUse|MaxRetentionSec)' /etc/systemd/journald.conf >> 07-linux-logging.txt\n# On win-client01:\nauditpol /get /category:* | Out-File C:\\lab\\audit\\07-windows-auditpol.txt\nGet-MpComputerStatus | Select-Object AMServiceEnabled, RealTimeProtectionEnabled, AntivirusSignatureLastUpdated | Out-File C:\\lab\\audit\\08-windows-defender.txt",
        "check": "You can state whether logon events are audited, how much log space is used, and how old the Defender signatures are."
      },
      {
        "title": "Test Control 11: data recovery by re-performance",
        "body": "Asking 'do you have backups?' is inquiry, the weakest evidence. Re-perform instead: list the latest backup snapshot and restore one file to a temporary folder. If you did lab-bia-backup, use its restic repository and password file; otherwise record that no backup exists, which is itself the finding.",
        "cmd": "export RESTIC_PASSWORD_FILE=~/.restic-pass\nrestic -r /srv/restic-local snapshots | tail -5 > 09-backup-snapshots.txt\nrestic -r /srv/restic-local restore latest --target /tmp/audit-restore --include /home/$USER/lounge-data > 10-restore-test.txt 2>&1\nls -R /tmp/audit-restore | head",
        "check": "Either a file was restored and you recorded the snapshot date, or you recorded 'no tested backup' as a finding."
      },
      {
        "title": "Protect the evidence",
        "body": "Copy the Windows evidence to the evidence folder, then hash every file and keep the hash list separately. If anyone questions a finding later you can prove the evidence has not changed since collection.",
        "cmd": "sha256sum ~/audit-evidence/* > ~/audit-evidence-hashes-$(date +%F).txt\ncat ~/audit-evidence-hashes-*.txt\n# On win-client01:\nGet-FileHash C:\\lab\\audit\\* -Algorithm SHA256 | Format-Table Hash, Path -AutoSize",
        "check": "Every evidence file has a SHA-256 hash recorded with the collection date."
      },
      {
        "title": "Rate each safeguard and write findings",
        "body": "Fill in the Result column. For each safeguard that is partially or not implemented, write a finding with Condition (what you found), Criteria (the safeguard text), Cause (why it happened), Effect (the risk in business terms), and Recommendation (a specific, achievable fix). Rate each finding High, Medium or Low using your risk register scales.",
        "check": "Each finding has all five parts and a rating, and each references evidence by file name."
      },
      {
        "title": "Score the result",
        "body": "Calculate the IG1 implementation score for the audited scope: implemented safeguards (count partial as half) divided by applicable safeguards. Show the score per Control as well so the owner sees where to focus.",
        "check": "You have an overall percentage and a per-Control breakdown."
      },
      {
        "title": "Get a management response and write the report",
        "body": "Write the report: executive summary with the score and top three risks, scope and method, detailed findings, and a management response column where the 'owner' (you, wearing the other hat) agrees or disagrees, commits to an action and a target date. Close with the follow-up date when the findings will be re-tested.",
        "check": "The report has an executive summary a non-technical reader understands in two minutes, and every finding has an owner and target date."
      }
    ],
    "verify": [
      "The engagement memo defines scope, criteria and method before testing began.",
      "Every in-scope IG1 safeguard has a result backed by an evidence file.",
      "The evidence hash list verifies with sha256sum -c.",
      "Every finding follows condition, criteria, cause, effect and recommendation and has a management response."
    ],
    "deliverable": "An internal audit package: engagement memo, completed workpaper spreadsheet, the evidence index with SHA-256 hashes, the findings list and the final audit report with IG1 score and management responses (redact hostnames or personal details before sharing).",
    "resume": "Performed an internal audit of a small environment against CIS Controls v8.1 IG1, collected and hashed command-line evidence for inventory, accounts, patching, logging, malware defenses and backup restore, and delivered an audit report with an implementation score, rated findings and management action plans.",
    "interview": [
      "What are the main types of audit evidence, weakest to strongest? — Inquiry (asking), observation (watching), inspection (examining records or configs) and re-performance (redoing the control yourself); re-performance is strongest.",
      "How do you write an audit finding? — Condition, criteria, cause, effect and recommendation, supported by evidence and agreed with the control owner, who provides a management response with an action and date.",
      "Why does auditor independence matter? — People reviewing their own work tend to miss or excuse problems; independence gives stakeholders confidence the conclusions are objective."
    ],
    "cleanup": [
      "rm -rf /tmp/audit-restore",
      "Archive ~/audit-evidence and its hash list together, and schedule the re-test date in your calendar."
    ],
    "links": [
      {
        "label": "CIS Critical Security Controls v8.1",
        "url": "https://www.cisecurity.org/controls/v8-1"
      },
      {
        "label": "CIS Controls Implementation Group 1",
        "url": "https://www.cisecurity.org/controls/implementation-groups/ig1"
      },
      {
        "label": "NIST SP 800-53A Rev. 5: Assessing Security and Privacy Controls",
        "url": "https://csrc.nist.gov/pubs/sp/800/53/a/r5/final"
      },
      {
        "label": "NIST Cybersecurity Framework",
        "url": "https://www.nist.gov/cyberframework"
      }
    ]
  },
  {
    "id": "lab-apparmor-mac",
    "title": "Enforce mandatory access control with AppArmor profiles",
    "track": "Foundations",
    "level": "Intermediate",
    "minutes": 120,
    "cost": "Free",
    "summary": "See the difference between discretionary and mandatory access control on Ubuntu: inspect the AppArmor profiles already protecting your server, write a profile that confines a program to one directory, watch it block even root, use complain mode and aa-logprof to refine it, and apply a deny rule.",
    "realWorld": "Mandatory access control (AppArmor on Ubuntu and SUSE, SELinux on Red Hat) is why a compromised web server or container often cannot read /etc/shadow or the rest of the disk. Linux admins write and tune profiles, container platforms apply them by default, and security models such as Bell-LaPadula and 'MAC versus DAC' are core exam topics for Security+, SSCP and CISSP.",
    "youWillNeed": [
      "Your Ubuntu Server 24.04 VM (ubuntu-srv01)"
    ],
    "requires": [
      "lab-linux-cli"
    ],
    "safety": "Work on your lab VM. Only change profiles you create in this lab; disabling the distribution's own profiles weakens the system. Take a snapshot named 'pre-apparmor' first.",
    "steps": [
      {
        "title": "Check AppArmor status",
        "body": "Ubuntu enables AppArmor by default. aa-status lists loaded profiles and which processes are confined, in enforce or complain mode. Note that on 24.04 AppArmor also restricts unprivileged user namespaces, a hardening feature against kernel exploits.",
        "cmd": "sudo apt install -y apparmor-utils\nsudo aa-status | head -25\nps -eo pid,label,comm | grep -v unconfined | head\nsysctl kernel.apparmor_restrict_unprivileged_userns",
        "check": "aa-status reports dozens of profiles loaded, some processes confined, and the sysctl prints 1."
      },
      {
        "title": "Read an existing profile",
        "body": "Open a shipped profile and identify its parts: the attachment (which program it applies to), includes of reusable abstractions, file rules with permission letters (r read, w write, m memory-map executable, ix inherit on exec), and capability or network rules.",
        "cmd": "ls /etc/apparmor.d/ | head -30\nsudo sed -n '1,40p' /etc/apparmor.d/usr.bin.man",
        "check": "You can explain what three rules in the profile allow."
      },
      {
        "title": "Create the program and test data",
        "body": "Make a copy of cat called labcat so you can confine it without affecting the real cat. Create a public folder it should read, a private subfolder it should not, and remember that a normal user can already read /etc/hostname because of ordinary (discretionary) permissions.",
        "cmd": "sudo cp /usr/bin/cat /usr/local/bin/labcat\nsudo mkdir -p /srv/public/private\necho 'public notice' | sudo tee /srv/public/notice.txt\necho 'internal only' | sudo tee /srv/public/private/plan.txt\nlabcat /srv/public/notice.txt /srv/public/private/plan.txt /etc/hostname",
        "check": "Before any profile, labcat prints all three files."
      },
      {
        "title": "Write an enforce-mode profile",
        "body": "The profile allows only the base abstraction (shared libraries, locale), terminal output, and reading /srv/public. Anything not allowed is denied, which is default deny in action. The explicit deny rule for the private folder wins even though /srv/public/** would otherwise allow it.",
        "cmd": "sudo tee /etc/apparmor.d/usr.local.bin.labcat > /dev/null <<'EOF'\nabi <abi/4.0>,\ninclude <tunables/global>\n\nprofile labcat /usr/local/bin/labcat {\n  include <abstractions/base>\n  include <abstractions/consoles>\n\n  /usr/local/bin/labcat mr,\n  /srv/public/ r,\n  /srv/public/** r,\n  deny /srv/public/private/** r,\n}\nEOF\nsudo apparmor_parser -r /etc/apparmor.d/usr.local.bin.labcat\nsudo aa-status | grep labcat",
        "check": "aa-status lists labcat among the profiles in enforce mode."
      },
      {
        "title": "Test the confinement, including as root",
        "body": "Discretionary permissions would let root read everything. Mandatory access control is enforced by the kernel regardless of user, so even sudo labcat cannot read /etc/shadow.",
        "cmd": "labcat /srv/public/notice.txt\nlabcat /srv/public/private/plan.txt\nlabcat /etc/hostname\nsudo labcat /etc/shadow\nsudo cat /etc/shadow | head -1",
        "check": "Only notice.txt prints; the other labcat reads fail with 'Permission denied', while the unconfined sudo cat still reads /etc/shadow."
      },
      {
        "title": "Read the denials in the log",
        "body": "Every blocked access creates a kernel audit message with apparmor=\"DENIED\", the profile, the operation and the file. If you installed auditd in lab-auditd, the messages go to /var/log/audit/audit.log instead of the kernel log.",
        "cmd": "sudo journalctl -k --since '10 min ago' | grep 'apparmor=\"DENIED\"' | tail -5\nsudo grep 'apparmor=\"DENIED\"' /var/log/audit/audit.log 2>/dev/null | tail -5",
        "check": "You see DENIED lines naming profile=\"labcat\" and the files /srv/public/private/plan.txt, /etc/hostname and /etc/shadow."
      },
      {
        "title": "Switch to complain mode",
        "body": "Complain mode allows everything but logs what would have been denied. It is how you develop a profile for a real application without breaking it. Note that explicit deny rules still apply in complain mode.",
        "cmd": "sudo aa-complain /etc/apparmor.d/usr.local.bin.labcat\nlabcat /etc/hostname\nsudo journalctl -k --since '2 min ago' | grep 'apparmor=\"ALLOWED\"' | tail -3",
        "check": "labcat now prints /etc/hostname and the log shows apparmor=\"ALLOWED\" for it."
      },
      {
        "title": "Refine the profile with aa-logprof",
        "body": "aa-logprof reads the log and proposes rules for what was allowed in complain mode. Allow /etc/hostname (choose (A)llow, then (S)ave), decline anything you do not want, and look at the rule it added.",
        "cmd": "sudo aa-logprof\nsudo cat /etc/apparmor.d/usr.local.bin.labcat",
        "check": "The profile now contains a rule for /etc/hostname."
      },
      {
        "title": "Return to enforce mode and retest",
        "body": "Enforce the refined profile and run the full test set again. Record which reads succeed and which fail; this before-and-after table is your evidence.",
        "cmd": "sudo aa-enforce /etc/apparmor.d/usr.local.bin.labcat\nfor f in /srv/public/notice.txt /srv/public/private/plan.txt /etc/hostname /etc/shadow; do printf '%-32s ' $f; sudo labcat $f > /dev/null 2>&1 && echo ALLOWED || echo DENIED; done",
        "check": "notice.txt and /etc/hostname are ALLOWED; plan.txt and /etc/shadow are DENIED."
      },
      {
        "title": "Connect it to real services and containers",
        "body": "Find which running services are confined and check the profile Docker applies to containers by default, if Docker is installed from an earlier lab. Then write a paragraph comparing DAC, MAC, RBAC and ABAC with an example of each from your labs.",
        "cmd": "sudo aa-status --json 2>/dev/null | head -c 400; echo\nsudo aa-status | grep -A5 'processes are in enforce mode'\ndocker info 2>/dev/null | grep -i -A2 'security options'",
        "check": "You can name at least one confined service and, if Docker is present, see apparmor under its security options."
      }
    ],
    "verify": [
      "aa-status lists labcat in enforce mode.",
      "sudo labcat /etc/shadow is denied while unconfined sudo cat succeeds.",
      "DENIED and ALLOWED log entries for labcat are captured.",
      "The final test table shows the deny rule for /srv/public/private still wins."
    ],
    "deliverable": "A short write-up with the final profile (commented), the before/after access table, the log excerpts for DENIED and ALLOWED, and a one-page explanation of DAC versus MAC versus RBAC versus ABAC using examples from your own lab.",
    "resume": "Wrote and tuned AppArmor mandatory access control profiles on Ubuntu 24.04 using complain mode and aa-logprof, demonstrating kernel-enforced default-deny confinement that blocked even root from reading files outside an approved path.",
    "interview": [
      "What is the difference between DAC and MAC? — With DAC the owner of a resource decides who can access it (Unix permissions, ACLs); with MAC a system-wide policy enforced by the kernel decides, and users, even root, cannot override it.",
      "AppArmor or SELinux: what is the main difference? — AppArmor uses path-based profiles per program and is simpler to write; SELinux labels every file and process and uses type enforcement, which is more granular but more complex.",
      "How do you create a profile for an app without breaking it? — Start in complain mode, exercise the application's normal functions, generate rules from the logs with aa-logprof, review them, then switch to enforce and monitor denials."
    ],
    "cleanup": [
      "sudo apparmor_parser -R /etc/apparmor.d/usr.local.bin.labcat, then delete that file and /usr/local/bin/labcat.",
      "sudo rm -rf /srv/public, or revert to the 'pre-apparmor' snapshot."
    ],
    "links": [
      {
        "label": "Ubuntu Server documentation: AppArmor",
        "url": "https://documentation.ubuntu.com/server/how-to/security/apparmor/"
      },
      {
        "label": "AppArmor project documentation",
        "url": "https://gitlab.com/apparmor/apparmor/-/wikis/Documentation"
      },
      {
        "label": "apparmor.d(5) manual page (Ubuntu 24.04)",
        "url": "https://manpages.ubuntu.com/manpages/noble/man5/apparmor.d.5.html"
      },
      {
        "label": "Docker docs: AppArmor security profiles",
        "url": "https://docs.docker.com/engine/security/apparmor/"
      }
    ]
  },
  {
    "id": "lab-radius-aaa",
    "title": "AAA with FreeRADIUS: RADIUS, PEAP and dynamic VLANs tested with eapol_test",
    "track": "Networking",
    "level": "Advanced",
    "minutes": 180,
    "cost": "Free",
    "summary": "Build a FreeRADIUS server that authenticates users for switches and Wi-Fi, returns a VLAN assignment, and logs accounting records. Test it the way network engineers do without hardware: radtest for PAP, eapol_test to run a full 802.1X PEAP-MSCHAPv2 exchange, a wrong-CA test to see why clients must validate the server certificate, and radclient for accounting.",
    "realWorld": "Enterprise Wi-Fi (WPA2/WPA3-Enterprise), wired 802.1X and network device logins all rely on a RADIUS server such as FreeRADIUS, Cisco ISE, Aruba ClearPass or Microsoft NPS. Network and security engineers troubleshoot 'Access-Reject' tickets in debug output, map users to VLANs, and review accounting logs to see who was on the network and when.",
    "youWillNeed": [
      "ubuntu-srv01 (192.168.56.10) as the RADIUS server",
      "A second Ubuntu 24.04 VM (192.168.56.11) to act as the network access server (the 'switch')",
      "Optional: Cisco Packet Tracer to sketch the switch configuration"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Run RADIUS only on the host-only lab network. Use lab-only passwords and shared secrets, allow only your lab addresses as clients, and never reuse the default 'testing123' secret anywhere real.",
    "steps": [
      {
        "title": "Install FreeRADIUS and the test tools",
        "body": "freeradius is the server, freeradius-utils provides radtest and radclient, and eapoltest provides eapol_test, a wpa_supplicant build that runs 802.1X EAP conversations directly against a RADIUS server.",
        "cmd": "sudo apt update\nsudo apt install -y freeradius freeradius-utils eapoltest\nfreeradius -v | head -2\nls /etc/freeradius/3.0/",
        "check": "freeradius -v prints a 3.2.x version and the config directory contains clients.conf, radiusd.conf, mods-enabled and sites-enabled."
      },
      {
        "title": "Run the server in debug mode",
        "body": "freeradius -X runs in the foreground and prints every request, which module handled it and why it was accepted or rejected. It is the first thing to do for any RADIUS problem. Stop the service, start debug mode in a second SSH session and keep it open for the whole lab.",
        "cmd": "sudo systemctl stop freeradius\nsudo freeradius -X",
        "check": "The output ends with 'Ready to process requests'."
      },
      {
        "title": "Add a user with a VLAN assignment",
        "body": "The files module reads users from mods-config/files/authorize. The first line is the check item (the password); indented lines are reply attributes sent back on success. The three Tunnel attributes are the standard way (RFC 3580) to tell a switch or access point to put the user in VLAN 20.",
        "cmd": "F=/etc/freeradius/3.0/mods-config/files/authorize\nsudo cp $F $F.orig\n{ printf 'alice   Cleartext-Password := \"Lab-Only-Pass1\"\\n        Tunnel-Type = VLAN,\\n        Tunnel-Medium-Type = IEEE-802,\\n        Tunnel-Private-Group-Id = \"20\"\\n\\n'; sudo cat $F.orig; } | sudo tee $F > /dev/null\nsudo head -6 $F",
        "check": "The top of the file shows alice with her password and the three Tunnel attributes."
      },
      {
        "title": "Register the lab switch as a RADIUS client",
        "body": "RADIUS only answers known clients (network devices), each with a shared secret. Add the second VM as the lab switch. Restart debug mode (Ctrl+C, then sudo freeradius -X) after every configuration change.",
        "cmd": "sudo tee -a /etc/freeradius/3.0/clients.conf > /dev/null <<'EOF'\n\nclient lab-switch {\n    ipaddr = 192.168.56.11\n    secret = Lab-Only-Radius-Secret-7f3k\n    shortname = lab-switch\n}\nEOF\nsudo ufw status | grep -q active && sudo ufw allow from 192.168.56.11 to any port 1812:1813 proto udp",
        "check": "Debug mode restarts without errors and lists client lab-switch while loading."
      },
      {
        "title": "Test PAP authentication locally with radtest",
        "body": "radtest sends an Access-Request. Use the built-in localhost client (secret testing123). Read the reply: Access-Accept with the VLAN attributes, or Access-Reject. Then try a wrong password and read the debug output to see which module rejected it.",
        "cmd": "radtest alice 'Lab-Only-Pass1' 127.0.0.1 0 testing123\nradtest alice 'WrongPassword' 127.0.0.1 0 testing123",
        "check": "The first returns Access-Accept with Tunnel-Private-Group-Id = \"20\"; the second returns Access-Reject and the debug output shows the pap module failing."
      },
      {
        "title": "Test from the 'switch' and see a wrong shared secret",
        "body": "From 192.168.56.11 send the same request with the lab-switch secret, then with a wrong secret. A wrong secret never produces a clear 'wrong secret' error: depending on the version the server either drops the packet (bad Message-Authenticator) so the client times out, or decrypts the password to garbage and rejects it. That symptom is worth remembering.",
        "cmd": "sudo apt install -y freeradius-utils\nradtest alice 'Lab-Only-Pass1' 192.168.56.10 0 Lab-Only-Radius-Secret-7f3k\nradtest -t pap alice 'Lab-Only-Pass1' 192.168.56.10 0 WrongSecret",
        "check": "The first gets Access-Accept; the second either times out or gets Access-Reject, and the server debug output warns about the shared secret (for example 'Unprintable characters in the password' or an invalid Message-Authenticator)."
      },
      {
        "title": "Find the certificate the server presents for EAP",
        "body": "PEAP and EAP-TLS run inside TLS, so the server presents a certificate that clients must validate. On Ubuntu the package points the EAP certificates at the system snakeoil (self-signed) certificate. Find the real file, which you will use as the trusted CA in the next step.",
        "cmd": "sudo ls -l /etc/freeradius/3.0/certs/\nCA=$(sudo readlink -f /etc/freeradius/3.0/certs/ca.pem); echo $CA\nopenssl x509 -in $CA -noout -subject -issuer -enddate",
        "check": "ca.pem resolves to a certificate file (often /etc/ssl/certs/ssl-cert-snakeoil.pem) and openssl prints its subject and expiry."
      },
      {
        "title": "Run a full 802.1X PEAP-MSCHAPv2 exchange with eapol_test",
        "body": "This is the same conversation a laptop has with the RADIUS server through a switch or access point. The outer identity 'anonymous' is sent before the TLS tunnel, so the real username stays private.",
        "cmd": "cat > ~/peap.conf <<EOF\nnetwork={\n    key_mgmt=WPA-EAP\n    eap=PEAP\n    identity=\"alice\"\n    anonymous_identity=\"anonymous\"\n    password=\"Lab-Only-Pass1\"\n    phase2=\"auth=MSCHAPV2\"\n    ca_cert=\"$CA\"\n}\nEOF\neapol_test -c ~/peap.conf -a 127.0.0.1 -s testing123 | tail -15",
        "check": "eapol_test ends with 'SUCCESS' and the reply includes the Tunnel-Private-Group-Id of 20."
      },
      {
        "title": "See why clients must validate the server certificate",
        "body": "Point ca_cert at an unrelated public root. The TLS handshake fails, which is exactly what should happen when an attacker runs a rogue access point with their own RADIUS server. Clients configured to skip validation would hand their credentials to that attacker.",
        "cmd": "sed \"s|ca_cert=.*|ca_cert=\\\"/etc/ssl/certs/ISRG_Root_X1.pem\\\"|\" ~/peap.conf > ~/peap-wrongca.conf\neapol_test -c ~/peap-wrongca.conf -a 127.0.0.1 -s testing123 | grep -iE 'tls|fail|success' | tail -5",
        "check": "The output shows a TLS certificate verification failure and ends with FAILURE."
      },
      {
        "title": "Send and read accounting records",
        "body": "Accounting is the third A: it records sessions (start, stop, bytes, duration) for investigations and billing. Send a Start and a Stop for alice and read the detail file FreeRADIUS writes per client.",
        "cmd": "echo 'User-Name=alice,Acct-Status-Type=Start,Acct-Session-Id=lab001,NAS-IP-Address=192.168.56.11,NAS-Port=5' | radclient 127.0.0.1:1813 acct testing123\necho 'User-Name=alice,Acct-Status-Type=Stop,Acct-Session-Id=lab001,Acct-Session-Time=300,NAS-IP-Address=192.168.56.11,NAS-Port=5' | radclient 127.0.0.1:1813 acct testing123\nsudo ls /var/log/freeradius/radacct/127.0.0.1/\nsudo tail -30 /var/log/freeradius/radacct/127.0.0.1/detail-*",
        "check": "radclient prints 'Received Accounting-Response' twice and the detail file shows the Start and Stop records with Acct-Session-Time = 300."
      },
      {
        "title": "Harden and run it as a service",
        "body": "Stop debug mode (Ctrl+C). Turn on authentication logging, and if your version is 3.2.5 or later require the Message-Authenticator attribute on the client (mitigation for the 2024 BlastRADIUS attack). Then start the service normally and confirm logins are logged.",
        "cmd": "sudo sed -i 's/^\\(\\s*auth = \\)no/\\1yes/' /etc/freeradius/3.0/radiusd.conf\nsudo sed -i 's/shortname = lab-switch/shortname = lab-switch\\n    require_message_authenticator = yes/' /etc/freeradius/3.0/clients.conf\nsudo freeradius -CX | tail -3\nsudo systemctl enable --now freeradius\nradtest alice 'Lab-Only-Pass1' 127.0.0.1 0 testing123 > /dev/null\nsudo tail -3 /var/log/freeradius/radius.log",
        "check": "The config check ends with 'Configuration appears to be OK' (if it rejects require_message_authenticator, remove that line: your version is older), and radius.log shows 'Login OK: [alice]'."
      },
      {
        "title": "Write the switch side and the design note",
        "body": "Write the Cisco IOS configuration a switch would need (you can type it into a Packet Tracer switch to check the syntax), then a one-page design note: authentication flow diagram (supplicant, authenticator, authentication server), EAP method choice (PEAP versus EAP-TLS), VLAN assignment, what happens if RADIUS is down, and how you would protect the shared secrets.",
        "cmd": "aaa new-model\nradius server LAB-RADIUS\n address ipv4 192.168.56.10 auth-port 1812 acct-port 1813\n key <shared secret>\naaa group server radius LAB\n server name LAB-RADIUS\naaa authentication dot1x default group LAB\naaa authorization network default group LAB\naaa accounting dot1x default start-stop group LAB\ndot1x system-auth-control\ninterface GigabitEthernet0/5\n switchport mode access\n authentication port-control auto\n dot1x pae authenticator",
        "check": "The design note names the three 802.1X roles and explains each line of the switch configuration."
      }
    ],
    "verify": [
      "radtest returns Access-Accept with Tunnel-Private-Group-Id 20 for alice and Access-Reject for a wrong password.",
      "eapol_test completes PEAP-MSCHAPv2 with SUCCESS and fails with the wrong CA certificate.",
      "The accounting detail file contains alice's Start and Stop records.",
      "radius.log records 'Login OK' with the service running normally."
    ],
    "deliverable": "An AAA lab report: the flow diagram, the client and user configuration (secrets redacted), annotated radtest and eapol_test output for success, wrong password, wrong shared secret and wrong CA, the accounting records, the switch configuration and the design note.",
    "resume": "Built a FreeRADIUS AAA server with per-user dynamic VLAN assignment and accounting, validated 802.1X PEAP-MSCHAPv2 end to end with eapol_test, demonstrated certificate validation against rogue servers, and applied BlastRADIUS hardening and authentication logging.",
    "interview": [
      "What are the three roles in 802.1X? — The supplicant (client device), the authenticator (switch or access point) and the authentication server (RADIUS); the authenticator relays EAP between the other two and opens the port only after an Access-Accept.",
      "PEAP-MSCHAPv2 or EAP-TLS? — EAP-TLS uses client certificates and resists credential theft, so it is stronger but needs a PKI; PEAP uses passwords inside a TLS tunnel and is only safe when clients strictly validate the server certificate.",
      "RADIUS or TACACS+ for device administration? — TACACS+ encrypts the whole payload, separates authentication, authorization and accounting and supports per-command authorization, so it is preferred for admin logins; RADIUS is the standard for network access."
    ],
    "cleanup": [
      "sudo systemctl disable --now freeradius if you do not need it.",
      "Restore the users file with sudo cp /etc/freeradius/3.0/mods-config/files/authorize.orig /etc/freeradius/3.0/mods-config/files/authorize.",
      "rm ~/peap.conf ~/peap-wrongca.conf"
    ],
    "links": [
      {
        "label": "FreeRADIUS documentation",
        "url": "https://www.freeradius.org/documentation/"
      },
      {
        "label": "RFC 2865: Remote Authentication Dial In User Service (RADIUS)",
        "url": "https://www.rfc-editor.org/rfc/rfc2865"
      },
      {
        "label": "RFC 3580: IEEE 802.1X RADIUS Usage Guidelines",
        "url": "https://www.rfc-editor.org/rfc/rfc3580"
      },
      {
        "label": "FreeRADIUS security advisories (BlastRADIUS)",
        "url": "https://www.freeradius.org/security/"
      }
    ]
  }
]);
