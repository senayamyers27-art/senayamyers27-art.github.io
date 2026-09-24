/* Blue team (SOC / incident response) hands-on labs. Schema: see LABS_FORMAT.md. */
CertHub.registerLabs([
  {
    "id": "lab-splunk-siem",
    "title": "Build a Splunk SIEM and detect brute-force logons",
    "track": "Blue team",
    "level": "Intermediate",
    "minutes": 240,
    "cost": "Free (Splunk Enterprise 60-day trial, which becomes Splunk Free afterwards; needs a free splunk.com account)",
    "summary": "Install Splunk Enterprise on Ubuntu, forward Windows Security logs and Linux auth.log with Universal Forwarders, then write SPL searches, a dashboard panel and a scheduled alert for failed logons, a success after many failures, and a new local admin.",
    "realWorld": "A SIEM is the SOC analyst's main screen. Tier 1 analysts triage alerts like 'many failed logons then a success' and 'user added to Administrators' every shift, and detection engineers write and tune the searches behind them. Splunk is one of the most common SIEMs in job postings.",
    "youWillNeed": [
      "Ubuntu Server 24.04 VM for Splunk: 2+ vCPU, 4–8 GB RAM, 40 GB disk (host-only + NAT adapters)",
      "A second Ubuntu 24.04 VM for the Linux forwarder (a linked clone of your clean Ubuntu snapshot works)",
      "Your Windows evaluation VM from lab-home-lab",
      "A free splunk.com account to download Splunk Enterprise and the Universal Forwarder"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Generate the failed logons only against your own lab VMs on the host-only network. Use throwaway lab accounts and passwords you use nowhere else, and delete them at the end.",
    "steps": [
      {
        "title": "Prepare the Splunk VM",
        "body": "Clone a fresh Ubuntu Server 24.04 VM (or use your clean snapshot) with at least 4 GB RAM and 40 GB disk; Splunk pauses indexing when free disk drops below 5 GB. Note its host-only IP. The examples use VirtualBox's default host-only range: Splunk/Wazuh server 192.168.56.10, second Ubuntu VM 192.168.56.11, Windows VM 192.168.56.20. Replace them with your own addresses (ip -br a on Ubuntu, ipconfig on Windows).",
        "cmd": "ip -br a\nfree -h\ndf -h /",
        "check": "You see a 192.168.56.x address, 4 GB+ memory and 30 GB+ free on /."
      },
      {
        "title": "Download Splunk Enterprise",
        "body": "Log in at splunk.com, open the Splunk Enterprise free trial download, pick Linux and the .deb package, and copy the 'wget' link the page offers. The version number is in that link, so always take the current one from the download page rather than guessing.",
        "cmd": "wget -O splunk.deb \"<paste the wget URL from the splunk.com download page>\"\nls -lh splunk.deb",
        "check": "splunk.deb is several hundred MB."
      },
      {
        "title": "Install Splunk and set the admin account",
        "body": "Install the package, make sure a dedicated splunk user owns /opt/splunk, start Splunk once to accept the license and create the admin user, then register it as a systemd service so it starts on boot.",
        "cmd": "sudo dpkg -i splunk.deb\nid splunk || sudo useradd -r -m -d /opt/splunk splunk\nsudo chown -R splunk:splunk /opt/splunk\nsudo -u splunk /opt/splunk/bin/splunk start --accept-license\nsudo -u splunk /opt/splunk/bin/splunk stop\nsudo /opt/splunk/bin/splunk enable boot-start -systemd-managed 1 -user splunk\nsudo systemctl start Splunkd\nsudo ufw status | grep -q active && sudo ufw allow 8000/tcp && sudo ufw allow 9997/tcp",
        "check": "Browsing to http://192.168.56.10:8000 from your host shows the Splunk login page."
      },
      {
        "title": "Create a lab index and open the receiving port",
        "body": "A separate index keeps lab data easy to search and delete. Port 9997 is where forwarders send data.",
        "cmd": "sudo -u splunk /opt/splunk/bin/splunk add index lab -auth 'admin:<your admin password>'\nsudo -u splunk /opt/splunk/bin/splunk enable listen 9997 -auth 'admin:<your admin password>'\nsudo ss -tlnp | grep 9997",
        "check": "ss shows splunkd listening on 0.0.0.0:9997, and Settings > Indexes lists 'lab'."
      },
      {
        "title": "Turn on the Windows audit policies you need",
        "body": "On the Windows VM, open PowerShell as Administrator. Failed and successful logons (4625/4624) come from the Logon subcategory; group membership changes (4732) come from Security Group Management. Make sure both are audited.",
        "cmd": "auditpol /set /subcategory:\"Logon\" /success:enable /failure:enable\nauditpol /set /subcategory:\"Security Group Management\" /success:enable\nauditpol /set /subcategory:\"User Account Management\" /success:enable /failure:enable\nauditpol /get /category:\"Logon/Logoff\",\"Account Management\"",
        "check": "Logon shows 'Success and Failure' and Security Group Management shows at least 'Success'."
      },
      {
        "title": "Install the Universal Forwarder on Windows",
        "body": "Download the Windows 64-bit Universal Forwarder .msi from splunk.com (take the current version from the page) and install it silently, pointing it at your Splunk server. The forwarder gets its own local admin credentials; pick a new password.",
        "cmd": "cd $env:USERPROFILE\\Downloads\nmsiexec.exe /i \"<the splunkforwarder .msi you downloaded>\" RECEIVING_INDEXER=\"192.168.56.10:9997\" SPLUNKUSERNAME=admin SPLUNKPASSWORD=\"<new forwarder password>\" AGREETOLICENSE=Yes /quiet\nGet-Service SplunkForwarder",
        "check": "The SplunkForwarder service shows Status Running."
      },
      {
        "title": "Send the Windows Security log to the lab index",
        "body": "Tell the forwarder exactly which event log to collect and where to put it, then restart it.",
        "cmd": "@\"\n[WinEventLog://Security]\ndisabled = 0\nindex = lab\nrenderXml = false\n\"@ | Set-Content -Path \"C:\\Program Files\\SplunkUniversalForwarder\\etc\\system\\local\\inputs.conf\" -Encoding ascii\n& \"C:\\Program Files\\SplunkUniversalForwarder\\bin\\splunk.exe\" restart",
        "check": "In Splunk Search & Reporting, index=lab sourcetype=\"WinEventLog:Security\" | head 5 returns events within a minute or two."
      },
      {
        "title": "Install the Universal Forwarder on the second Ubuntu VM",
        "body": "Download the Linux .deb Universal Forwarder the same way as in step 2, install it, and monitor /var/log/auth.log (where sshd and sudo log on Ubuntu). On recent versions the forwarder runs as the splunkfwd user, which must be in the adm group to read auth.log.",
        "cmd": "sudo dpkg -i splunkforwarder.deb\nsudo /opt/splunkforwarder/bin/splunk start --accept-license\nsudo /opt/splunkforwarder/bin/splunk add forward-server 192.168.56.10:9997\nsudo /opt/splunkforwarder/bin/splunk add monitor /var/log/auth.log -index lab -sourcetype linux_secure\nid splunkfwd && sudo usermod -aG adm splunkfwd\nsudo /opt/splunkforwarder/bin/splunk restart\nsudo /opt/splunkforwarder/bin/splunk list forward-server",
        "check": "list forward-server shows 192.168.56.10:9997 under 'Active forwards', and index=lab sourcetype=linux_secure returns events."
      },
      {
        "title": "Generate the events yourself",
        "body": "On Windows, create a throwaway user, fail its password six times with runas, succeed once, then add it to Administrators. From Windows, also fail SSH logins to the second Ubuntu VM.",
        "cmd": "net user labuser \"Lab-Only-Pass1!\" /add\n# Run the next line 6 times and type a WRONG password each time:\nrunas /user:labuser cmd\n# Now run it once more with the correct password, then close the new window\nrunas /user:labuser cmd\nnet localgroup Administrators labuser /add\n# SSH failures against the Linux VM (type wrong passwords 3 times per attempt):\nssh labuser@192.168.56.11",
        "check": "Event Viewer > Windows Logs > Security shows several 4625 events, then 4624 and 4732."
      },
      {
        "title": "Search for failed logons (EventCode 4625)",
        "body": "In 4625 events the first Account_Name value is the caller and the second is the account that failed, so mvindex picks the target. Set the time picker to the last 60 minutes.",
        "cmd": "index=lab sourcetype=\"WinEventLog:Security\" EventCode=4625\n| eval target_user=mvindex(Account_Name,1)\n| stats count AS failures, min(_time) AS first, max(_time) AS last BY host, target_user, Logon_Type\n| convert ctime(first) ctime(last)\n| sort - failures",
        "check": "labuser appears with 6 or more failures and Logon_Type 2 (interactive)."
      },
      {
        "title": "Find a success after many failures",
        "body": "This is the classic 'password guessing that worked' detection. It counts failures and successes per user and keeps users with at least 5 failures and at least one later success.",
        "cmd": "index=lab sourcetype=\"WinEventLog:Security\" (EventCode=4625 OR EventCode=4624)\n| eval target_user=mvindex(Account_Name,1)\n| stats count(eval(EventCode=4625)) AS failures, count(eval(EventCode=4624)) AS successes, max(eval(if(EventCode=4625,_time,null()))) AS last_fail, max(eval(if(EventCode=4624,_time,null()))) AS last_success BY host, target_user\n| where failures>=5 AND successes>=1 AND last_success>last_fail\n| convert ctime(last_fail) ctime(last_success)",
        "check": "labuser is the only row returned."
      },
      {
        "title": "Search for a new local admin and for Linux SSH failures",
        "body": "4732 means 'a member was added to a security-enabled local group'. Filter on the Administrators group. The second search pulls usernames and source IPs out of auth.log with rex.",
        "cmd": "index=lab sourcetype=\"WinEventLog:Security\" EventCode=4732 Group_Name=Administrators\n| table _time host Account_Name Group_Name\n\nindex=lab sourcetype=linux_secure \"Failed password\"\n| rex \"Failed password for (invalid user )?(?<user>\\S+) from (?<src_ip>\\S+)\"\n| stats count BY host, user, src_ip",
        "check": "The first search shows labuser added to Administrators; the second shows your Windows VM's IP as src_ip."
      },
      {
        "title": "Build a dashboard panel",
        "body": "Run the failed-logon search as a timechart, then choose Save As > New Dashboard (Dashboard Studio) named 'Lab SOC - Authentication'. Add the 4732 table as a second panel with Save As > Existing Dashboard.",
        "cmd": "index=lab (sourcetype=\"WinEventLog:Security\" EventCode=4625) OR (sourcetype=linux_secure \"Failed password\")\n| eval os=if(sourcetype=\"linux_secure\",\"Linux\",\"Windows\")\n| timechart span=5m count BY os",
        "check": "The dashboard shows a spike at the time you failed the passwords."
      },
      {
        "title": "Create a scheduled alert",
        "body": "Run the step 11 search, choose Save As > Alert: title 'Brute force then success', Scheduled, cron 0/5 * * * * (every 5 minutes) with time range 'Last 15 minutes', trigger when number of results is greater than 0, action 'Add to Triggered Alerts', severity High. Splunk Free cannot run alerts, so do this while the Enterprise trial license is active.",
        "check": "Settings > Searches, reports, and alerts lists the alert as scheduled."
      },
      {
        "title": "Fire the alert and triage it",
        "body": "Repeat step 9's failures and success for labuser, wait up to 5 minutes, then open Activity > Triggered Alerts. Click through to the results and write two sentences on what happened and what you would do next.",
        "check": "Triggered Alerts shows 'Brute force then success' with the time it fired."
      }
    ],
    "verify": [
      "Both forwarders show as active: index=lab | stats count BY host, sourcetype lists the Windows VM and the second Ubuntu VM.",
      "The 4625 search shows labuser with 6+ failures and the correct Logon_Type.",
      "The success-after-failures search returns labuser and nothing else.",
      "The dashboard has at least two panels and the alert appears under Triggered Alerts."
    ],
    "deliverable": "A write-up with an architecture sketch (Splunk server, two forwarders, ports), the inputs.conf you used, your four SPL searches with one sentence each on what they detect and a known false positive (for example a user who forgot a new password), screenshots of the dashboard and the triggered alert, and a short triage note for the alert.",
    "resume": "Deployed Splunk Enterprise with Universal Forwarders on Windows and Linux, wrote SPL detections for brute-force logons, success-after-failure and new local admins (Event IDs 4625/4624/4732), and built a dashboard and scheduled alert that fired on simulated attacks within 5 minutes.",
    "interview": [
      "What does Event ID 4625 mean and what fields do you check first? — A failed logon; check the target account, Logon Type, source IP/workstation and the failure status code, then look for a later 4624 from the same source.",
      "Why is a success after many failures more urgent than failures alone? — Failures alone are often typos or noise, but a success afterwards suggests the guessing worked and an attacker may now have a valid session.",
      "How would you reduce false positives on a brute-force alert? — Set a sensible threshold and time window, exclude known service accounts or scanners with a documented allowlist, and group by source so one user's typos don't page the SOC."
    ],
    "cleanup": [
      "On Windows: net localgroup Administrators labuser /delete, then net user labuser /delete.",
      "Delete the lab user on the Linux VM if you created one, and keep or disable the forwarders for later labs (lab-incident-response uses them).",
      "Take a snapshot named 'splunk-working' so you can return to a known-good SIEM."
    ],
    "links": [
      {
        "label": "Splunk Enterprise installation manual (Linux)",
        "url": "https://docs.splunk.com/Documentation/Splunk/latest/Installation/InstallonLinux"
      },
      {
        "label": "Splunk Universal Forwarder manual",
        "url": "https://docs.splunk.com/Documentation/Forwarder/latest/Forwarder/Abouttheuniversalforwarder"
      },
      {
        "label": "Microsoft: 4625(F) An account failed to log on",
        "url": "https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4625"
      }
    ]
  },
  {
    "id": "lab-wazuh",
    "title": "Deploy Wazuh XDR/SIEM, catch SSH brute force and tune a rule",
    "track": "Blue team",
    "level": "Intermediate",
    "minutes": 240,
    "cost": "Free (open source)",
    "summary": "Install Wazuh all-in-one on Ubuntu with the official assisted installer, enroll Windows and Linux agents, set up file integrity monitoring, trigger an SSH brute-force alert from another lab VM, explore the MITRE ATT&CK view and tune one noisy rule.",
    "realWorld": "Many small SOCs, MSSPs and schools run Wazuh because it is free and combines log analysis, FIM, vulnerability detection and ATT&CK mapping. Analysts triage its alerts daily, and tuning noisy rules without hiding real attacks is a core detection-engineering skill.",
    "youWillNeed": [
      "A fresh Ubuntu Server 24.04 VM for Wazuh: 4 vCPU, 8 GB RAM, 50 GB disk (Wazuh's all-in-one sizing for up to about 25 agents), host-only + NAT",
      "Your Windows evaluation VM and a second Ubuntu VM from lab-home-lab",
      "A host with enough RAM to run all three; shut down other lab VMs (for example Splunk) while you work"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Run the SSH brute-force test only from one lab VM against another on the host-only network. Never point it at systems you do not own.",
    "steps": [
      {
        "title": "Prepare the Wazuh VM",
        "body": "Clone a clean Ubuntu Server 24.04 VM with 4 vCPU, 8 GB RAM and 50 GB disk. The indexer (OpenSearch-based) is memory hungry; with less RAM the install or dashboard may fail. The examples use VirtualBox's default host-only range: Splunk/Wazuh server 192.168.56.10, second Ubuntu VM 192.168.56.11, Windows VM 192.168.56.20. Replace them with your own addresses (ip -br a on Ubuntu, ipconfig on Windows).",
        "cmd": "nproc\nfree -h\ndf -h /\nip -br a",
        "check": "4 CPUs, about 8 GB RAM, 40 GB+ free and a 192.168.56.x address."
      },
      {
        "title": "Run the official assisted installer",
        "body": "Open the Wazuh Quickstart page and copy the current command; the URL contains the minor version (for example 4.12), which changes with each release. The -a flag installs indexer, server and dashboard on one host. It takes 10–20 minutes.",
        "cmd": "curl -sO https://packages.wazuh.com/<version from the Quickstart page>/wazuh-install.sh\nsudo bash ./wazuh-install.sh -a",
        "check": "The installer ends with a summary showing the dashboard URL, User: admin and a generated password. Copy the password into your password manager."
      },
      {
        "title": "Log in and lock the version",
        "body": "Browse to https://192.168.56.10 and accept the self-signed certificate warning (this is your lab). The Quickstart recommends disabling the Wazuh apt repo so an unplanned apt upgrade doesn't break the stack; upgrades should be deliberate.",
        "cmd": "sudo systemctl status wazuh-manager wazuh-indexer wazuh-dashboard --no-pager | grep -E 'wazuh|Active'\nsudo tar -O -xvf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt | head -20\nsudo sed -i 's/^deb /#deb /' /etc/apt/sources.list.d/wazuh.list && sudo apt update",
        "check": "All three services are 'active (running)' and you can log in to the dashboard."
      },
      {
        "title": "Enroll the Windows agent",
        "body": "In the dashboard, go to Agents management > Summary > Deploy new agent. Choose Windows (MSI), enter 192.168.56.10 as the server address and 'win11-lab' as the name, then copy the generated PowerShell command. Run it in an Administrator PowerShell on the Windows VM, then start the service with the command the page shows. Using the generated command guarantees the agent version matches your manager.",
        "cmd": "# Example shape only; paste the command your dashboard generates:\nInvoke-WebRequest -Uri https://packages.wazuh.com/4.x/windows/wazuh-agent-<version>-1.msi -OutFile $env:tmp\\wazuh-agent\nmsiexec.exe /i $env:tmp\\wazuh-agent /q WAZUH_MANAGER='192.168.56.10' WAZUH_AGENT_NAME='win11-lab'\nNET START Wazuh",
        "check": "The agent shows as Active in Agents management within a minute or two."
      },
      {
        "title": "Enroll the Linux agent",
        "body": "Repeat Deploy new agent, choose Linux DEB amd64, name it 'ubuntu-client', and run the generated command on the second Ubuntu VM, followed by the systemd commands.",
        "cmd": "# Paste the generated curl/dpkg line first, then:\nsudo systemctl daemon-reload\nsudo systemctl enable --now wazuh-agent\n# On the Wazuh server, list agents:\nsudo /var/ossec/bin/agent_control -l",
        "check": "agent_control lists 000 (the server), win11-lab and ubuntu-client as Active."
      },
      {
        "title": "Enable file integrity monitoring on a folder",
        "body": "FIM alerts when watched files are added, changed or deleted. On ubuntu-client, create a test folder and add a directories line inside the existing <syscheck> block of the agent config. realtime makes changes show up immediately instead of on the 12-hour scan.",
        "cmd": "sudo mkdir -p /opt/fim-test\nsudo nano /var/ossec/etc/ossec.conf\n# inside <syscheck> ... </syscheck> add this line, then save:\n#   <directories realtime=\"yes\" check_all=\"yes\" report_changes=\"yes\">/opt/fim-test</directories>\nsudo systemctl restart wazuh-agent",
        "check": "sudo grep fim-test /var/ossec/etc/ossec.conf shows your line."
      },
      {
        "title": "Trigger and view FIM alerts",
        "body": "Create, change and delete a file, then open the File Integrity Monitoring module for ubuntu-client (or Discover / Threat Hunting and filter rule.groups: syscheck).",
        "cmd": "echo 'v1' | sudo tee /opt/fim-test/payroll.txt\nsleep 5; echo 'v2 changed' | sudo tee -a /opt/fim-test/payroll.txt\nsleep 5; sudo rm /opt/fim-test/payroll.txt",
        "check": "You see rule 554 (file added), 550 (integrity checksum changed, with the diff because of report_changes) and 553 (file deleted)."
      },
      {
        "title": "Simulate an SSH brute force from another lab VM",
        "body": "From the Windows VM (which has the OpenSSH client), try to log in to ubuntu-client as a user that does not exist, 10 times. BatchMode stops the password prompt, but sshd still logs every 'Invalid user' attempt.",
        "cmd": "1..10 | ForEach-Object { ssh -o BatchMode=yes -o ConnectTimeout=5 -o StrictHostKeyChecking=no nosuchuser@192.168.56.11 exit }",
        "check": "Threat Hunting shows rule 5710 (attempt to login using a non-existent user) several times and rule 5712 (SSHD brute force trying to get access to the system), level 10."
      },
      {
        "title": "Investigate the brute-force alert",
        "body": "Open the 5712 alert and read the fields: agent.name, data.srcip, rule.mitre.id and full_log. Confirm it against the raw log on the target, as you would before escalating.",
        "cmd": "sudo grep 'Invalid user nosuchuser' /var/log/auth.log | tail -5",
        "check": "data.srcip is your Windows VM's IP and rule.mitre.id is T1110 (Brute Force)."
      },
      {
        "title": "Review the MITRE ATT&CK view",
        "body": "Open the MITRE ATT&CK module (under Threat intelligence in recent versions). Look at which tactics and techniques your alerts mapped to, and click a technique to see the events behind it.",
        "check": "Credential Access > Brute Force has your SSH alerts, and you can drill from the technique to individual events."
      },
      {
        "title": "Find a noisy rule",
        "body": "Count which rules fired most in your lab. On a quiet lab, sudo and PAM session rules usually top the list because you run sudo constantly.",
        "cmd": "sudo jq -r '.rule.id + \" \" + .rule.description' /var/ossec/logs/alerts/alerts.json | sort | uniq -c | sort -rn | head -10",
        "check": "You get a ranked list; pick one frequent, low-value rule (for example 5402 'Successful sudo to ROOT executed' for a routine command). Install jq with sudo apt install -y jq if needed."
      },
      {
        "title": "Tune it with a child rule in local_rules.xml",
        "body": "Never edit Wazuh's default rule files; upgrades overwrite them. Instead add a child rule with level 0 that matches only the known-benign case, so the rule still fires for everything else. Adjust the match to the exact benign command you saw.",
        "cmd": "sudo nano /var/ossec/etc/rules/local_rules.xml\n# add inside the file:\n# <group name=\"local,tuning,\">\n#   <rule id=\"100100\" level=\"0\">\n#     <if_sid>5402</if_sid>\n#     <match>COMMAND=/usr/bin/apt</match>\n#     <description>Tuned: routine apt via sudo in lab (ticket LAB-001)</description>\n#   </rule>\n# </group>\nsudo /var/ossec/bin/wazuh-logtest\nsudo systemctl restart wazuh-manager",
        "check": "In wazuh-logtest, pasting a matching sudo log line shows rule 100100 with level 0; a sudo line with a different command still shows 5402."
      },
      {
        "title": "Prove the tuning works and nothing else broke",
        "body": "Run a routine sudo apt command and a different sudo command on the agent, then check that only the non-apt one alerts. Repeat the SSH test from step 8 to confirm brute force still alerts.",
        "cmd": "sudo apt update\nsudo cat /etc/hostname",
        "check": "No new 5402 alert for apt; a 5402 alert for cat; rule 5712 still fires for brute force."
      }
    ],
    "verify": [
      "Agents management shows win11-lab and ubuntu-client as Active.",
      "You have screenshots of rules 554, 550 (with diff) and 553 for /opt/fim-test.",
      "A rule 5712 alert shows your Windows VM as data.srcip and maps to T1110.",
      "Your local_rules.xml child rule suppresses only the benign case, proven with wazuh-logtest."
    ],
    "deliverable": "A short report with the lab diagram, agent enrollment screenshots, the FIM alert chain, the brute-force alert with its ATT&CK mapping, and a tuning record: rule id, why it was noisy (alert counts before/after), the exact child rule, the test you ran, and the residual risk.",
    "resume": "Deployed a Wazuh all-in-one SIEM/XDR with Windows and Linux agents, configured real-time file integrity monitoring, validated SSH brute-force detection mapped to MITRE ATT&CK T1110, and cut alert noise from a top-firing rule with a scoped, tested local rule.",
    "interview": [
      "How do you tune a noisy rule without creating a blind spot? — Suppress only the specific benign condition with a child rule or exception, document the reason, test that true positives still fire, and review the exception periodically.",
      "What is file integrity monitoring and where would you use it? — It hashes watched files and alerts on changes; use it on system binaries, web roots, config files and sensitive data folders, and it supports PCI DSS requirements.",
      "What's the difference between Wazuh rules 5710 and 5712? — 5710 is a single login attempt with a non-existent user; 5712 is a frequency rule that fires when many of those come from one source in a short window, indicating brute force."
    ],
    "cleanup": [
      "Remove /opt/fim-test or leave it for lab-incident-response.",
      "Snapshot the Wazuh VM as 'wazuh-working' and power it off when not in use; it needs 8 GB RAM."
    ],
    "links": [
      {
        "label": "Wazuh Quickstart (all-in-one install)",
        "url": "https://documentation.wazuh.com/current/quickstart.html"
      },
      {
        "label": "Wazuh: Deploying agents",
        "url": "https://documentation.wazuh.com/current/installation-guide/wazuh-agent/index.html"
      },
      {
        "label": "Wazuh: Custom rules",
        "url": "https://documentation.wazuh.com/current/user-manual/ruleset/rules/custom.html"
      }
    ]
  },
  {
    "id": "lab-sysmon-detection",
    "title": "Install Sysmon, generate benign activity and write a detection",
    "track": "Blue team",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Free",
    "summary": "Install Sysinternals Sysmon with the SwiftOnSecurity community config, read process, network and file events in Event Viewer and PowerShell, run harmless test activity (an encoded PowerShell 'hello' and a scheduled task), find it in the logs and write a Sigma rule plus matching Splunk and Wazuh searches.",
    "realWorld": "Sysmon is the most common free endpoint telemetry source. Detection engineers and threat hunters use its process-creation (1), network (3) and file-create (11) events to catch encoded PowerShell and persistence like scheduled tasks, and they share detections as Sigma rules.",
    "youWillNeed": [
      "Your Windows evaluation VM from lab-home-lab (snapshot it first)",
      "Internet access from the Windows VM to download Sysmon and the config",
      "Optional: the Splunk server from lab-splunk-siem and/or the Wazuh server from lab-wazuh"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "All test activity is harmless and written by you: the encoded command only prints 'hello' and the scheduled task only writes a text file, and you delete both. Run this in your lab VM, not your daily computer.",
    "steps": [
      {
        "title": "Snapshot the Windows VM",
        "body": "Take a VirtualBox snapshot named 'pre-sysmon' so you can roll back cleanly.",
        "check": "The snapshot appears in VirtualBox's Snapshots list."
      },
      {
        "title": "Download Sysmon and the community config",
        "body": "Download Sysmon from Microsoft Sysinternals and the SwiftOnSecurity sysmon-config, a well-known balanced starting config. Open the XML in Notepad and skim it: it is mostly include/exclude filters, which is why some events you expect may not appear.",
        "cmd": "New-Item -ItemType Directory -Path C:\\Tools\\Sysmon -Force | Out-Null\ncd C:\\Tools\\Sysmon\nInvoke-WebRequest https://download.sysinternals.com/files/Sysmon.zip -OutFile Sysmon.zip\nExpand-Archive Sysmon.zip -DestinationPath . -Force\nInvoke-WebRequest https://raw.githubusercontent.com/SwiftOnSecurity/sysmon-config/master/sysmonconfig-export.xml -OutFile sysmonconfig.xml\nGet-FileHash .\\Sysmon64.exe -Algorithm SHA256",
        "check": "The folder contains Sysmon64.exe and sysmonconfig.xml."
      },
      {
        "title": "Install Sysmon with the config",
        "body": "Install as a service with the config. If your Windows build offers Sysmon as a built-in optional feature, use either that or the Sysinternals download, not both.",
        "cmd": ".\\Sysmon64.exe -accepteula -i .\\sysmonconfig.xml\nGet-Service Sysmon64\n.\\Sysmon64.exe -c | Select-Object -First 15",
        "check": "Sysmon64 is Running and -c prints the active configuration and schema version."
      },
      {
        "title": "Find Sysmon events in Event Viewer",
        "body": "Open Event Viewer > Applications and Services Logs > Microsoft > Windows > Sysmon > Operational. Filter Current Log for IDs 1,3,11 and open one of each to read the fields: Image, CommandLine, ParentImage, User, Hashes (1); DestinationIp/Port (3); TargetFilename (11).",
        "check": "You can read a process-creation event and name its parent process."
      },
      {
        "title": "Query Sysmon with Get-WinEvent",
        "body": "PowerShell is faster than clicking and is what you would script during an investigation.",
        "cmd": "$log = 'Microsoft-Windows-Sysmon/Operational'\nGet-WinEvent -FilterHashtable @{LogName=$log; Id=1} -MaxEvents 5 | Format-List TimeCreated, Id, Message\nGet-WinEvent -FilterHashtable @{LogName=$log; Id=3} -MaxEvents 3 | Format-List TimeCreated, Message\nGet-WinEvent -FilterHashtable @{LogName=$log; Id=11} -MaxEvents 3 | Format-List TimeCreated, Message",
        "check": "Each command returns events (if Id 3 or 11 returns nothing yet, steps 7 and 8 will create some)."
      },
      {
        "title": "Run a benign encoded PowerShell command",
        "body": "Attackers use -EncodedCommand to hide scripts from casual inspection. Build one yourself that only prints 'hello'. The encoding is Base64 of UTF-16LE text.",
        "cmd": "$cmd = 'Write-Output \"hello\"'\n$enc = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($cmd))\n$enc\npowershell.exe -NoProfile -EncodedCommand $enc",
        "check": "The console prints hello, and $enc is a Base64 string starting with VwByAGkAdABlAC0A."
      },
      {
        "title": "Find the encoded command in Sysmon",
        "body": "Search process-creation events for the command line. Note the parent process: in a real alert, Word or a browser as parent would be far more suspicious than your own PowerShell window.",
        "cmd": "Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; Id=1; StartTime=(Get-Date).AddMinutes(-15)} |\n  Where-Object { $_.Message -match 'EncodedCommand' } |\n  Format-List TimeCreated, Message",
        "check": "One event shows Image ...\\powershell.exe, CommandLine containing -EncodedCommand and your Base64 string, and ParentImage ...\\powershell.exe."
      },
      {
        "title": "Create network and file events",
        "body": "Start a tiny web server on your Ubuntu VM and fetch it from PowerShell (Event 3), then drop a .ps1 file in Downloads (Event 11). The SwiftOnSecurity config only logs some network and file activity, so if an event is missing, search the XML for the rule that excluded it; that's a lesson in how configs shape visibility.",
        "cmd": "# On Ubuntu:\npython3 -m http.server 8000\n# On Windows:\nInvoke-WebRequest http://192.168.56.10:8000/ -UseBasicParsing | Out-Null\nSet-Content \"$env:USERPROFILE\\Downloads\\lab-test.ps1\" 'Write-Output hello'\nGet-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; Id=3,11; StartTime=(Get-Date).AddMinutes(-5)} | Format-List Id, Message",
        "check": "An Id 3 event with DestinationIp 192.168.56.10 and DestinationPort 8000, and an Id 11 event with TargetFilename ending in lab-test.ps1."
      },
      {
        "title": "Create and delete a benign scheduled task",
        "body": "Scheduled tasks are a top persistence method (ATT&CK T1053.005). Turn on task auditing so Security events 4698 (created) and 4699 (deleted) are logged, create a harmless task, then delete it.",
        "cmd": "auditpol /set /subcategory:\"Other Object Access Events\" /success:enable\nNew-Item -ItemType Directory C:\\Temp -Force | Out-Null\nschtasks /create /tn \"LabBenignTask\" /tr \"cmd.exe /c echo hello > C:\\Temp\\lab-task.txt\" /sc once /st 23:59 /f\nschtasks /run /tn \"LabBenignTask\"\nschtasks /delete /tn \"LabBenignTask\" /f",
        "check": "C:\\Temp\\lab-task.txt contains hello."
      },
      {
        "title": "Find the scheduled task in the logs",
        "body": "Look at both sources: Sysmon shows the schtasks.exe process with its full command line, and the Security log shows the task definition XML in 4698.",
        "cmd": "Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-Sysmon/Operational'; Id=1; StartTime=(Get-Date).AddMinutes(-10)} | Where-Object { $_.Message -match 'schtasks' } | Format-List TimeCreated, Message\nGet-WinEvent -FilterHashtable @{LogName='Security'; Id=4698,4699; StartTime=(Get-Date).AddMinutes(-10)} | Format-List TimeCreated, Id, Message",
        "check": "You see Sysmon Id 1 for schtasks.exe /create and Security 4698 then 4699 for \\LabBenignTask."
      },
      {
        "title": "Write a Sigma rule",
        "body": "Sigma is a vendor-neutral YAML format for detections that converts to Splunk, Elastic, Microsoft Sentinel and others. Save this as encoded-powershell.yml on your Ubuntu VM and fill in the placeholders. Contains-matches in Sigma are case-insensitive, so ' -enc' also matches ' -EncodedCommand'.",
        "cmd": "title: PowerShell launched with an encoded command (lab)\nid: <generate one with: python3 -c \"import uuid;print(uuid.uuid4())\">\nstatus: experimental\ndescription: Detects powershell.exe or pwsh.exe started with -EncodedCommand or a short form of it\nauthor: <your name>\ndate: <YYYY-MM-DD>\nlogsource:\n  category: process_creation\n  product: windows\ndetection:\n  selection_img:\n    Image|endswith:\n      - '\\powershell.exe'\n      - '\\pwsh.exe'\n  selection_cli:\n    CommandLine|contains:\n      - ' -enc'\n      - ' -e '\n      - ' -ec '\n  condition: all of selection_*\nfalsepositives:\n  - Management and deployment tools that pass scripts as encoded commands\nlevel: medium\ntags:\n  - attack.execution\n  - attack.t1059.001\n  - attack.defense-evasion\n  - attack.t1027",
        "check": "The file is valid YAML (python3 -c \"import yaml,sys;yaml.safe_load(open('encoded-powershell.yml'))\" prints nothing)."
      },
      {
        "title": "Write the equivalent Splunk search",
        "body": "If you did lab-splunk-siem, add a Sysmon input to the Windows forwarder's inputs.conf and restart it, and install the Splunk Add-on for Sysmon from Splunkbase so fields are extracted. Optionally compare with sigma-cli's conversion (pip install sigma-cli, sigma plugin install splunk, sigma convert -t splunk --without-pipeline encoded-powershell.yml).",
        "cmd": "# Append to C:\\Program Files\\SplunkUniversalForwarder\\etc\\system\\local\\inputs.conf:\n[WinEventLog://Microsoft-Windows-Sysmon/Operational]\ndisabled = 0\nindex = lab\nrenderXml = true\n\n# SPL:\nindex=lab source=\"XmlWinEventLog:Microsoft-Windows-Sysmon/Operational\" EventCode=1\n  (Image=\"*\\\\powershell.exe\" OR Image=\"*\\\\pwsh.exe\")\n  (CommandLine=\"* -enc*\" OR CommandLine=\"* -e *\" OR CommandLine=\"* -ec *\")\n| table _time host User ParentImage Image CommandLine",
        "check": "Re-running step 6 produces a row with your encoded command."
      },
      {
        "title": "Write the equivalent Wazuh rule",
        "body": "If you did lab-wazuh, add the Sysmon channel to the Windows agent (C:\\Program Files (x86)\\ossec-agent\\ossec.conf) and restart it, then add a custom rule on the manager. Wazuh's built-in Windows rules put Sysmon process creation in the sysmon_event1 group.",
        "cmd": "<!-- Windows agent ossec.conf, inside <ossec_config>: -->\n<localfile>\n  <location>Microsoft-Windows-Sysmon/Operational</location>\n  <log_format>eventchannel</log_format>\n</localfile>\n\n<!-- Manager /var/ossec/etc/rules/local_rules.xml: -->\n<group name=\"local,sysmon,\">\n  <rule id=\"100200\" level=\"10\">\n    <if_group>sysmon_event1</if_group>\n    <field name=\"win.eventdata.image\" type=\"pcre2\">(?i)\\\\(powershell|pwsh)\\.exe$</field>\n    <field name=\"win.eventdata.commandLine\" type=\"pcre2\">(?i)\\s-(e|ec|enc\\w*)\\s</field>\n    <description>PowerShell started with an encoded command</description>\n    <mitre><id>T1059.001</id><id>T1027</id></mitre>\n  </rule>\n</group>",
        "check": "After sudo systemctl restart wazuh-manager and re-running step 6, rule 100200 appears for win11-lab."
      },
      {
        "title": "Test and document false positives",
        "body": "Run the encoded command again and confirm each detection fires once. Then write down what legitimate software might trigger it and how you would handle that (allowlist by signed parent or by host group, not by disabling the rule).",
        "check": "You have one screenshot per detection (Event Viewer, Splunk and/or Wazuh) for the same test run."
      }
    ],
    "verify": [
      "Sysmon64 is running with the community config (Sysmon64.exe -c shows it).",
      "You can show Event IDs 1, 3 and 11 with Get-WinEvent, including your encoded command and lab-test.ps1.",
      "Security 4698/4699 and Sysmon Id 1 show the scheduled task being created and deleted.",
      "Your Sigma rule and at least one platform search (Splunk or Wazuh) detect a fresh test run."
    ],
    "deliverable": "A detection write-up: the ATT&CK techniques (T1059.001, T1027, T1053.005), the Sysmon events that show them, your Sigma rule in a code block, the Splunk and/or Wazuh version, screenshots of each firing on your benign test, and a false-positive and tuning section. Publishing the Sigma rule in a GitHub repo makes a strong portfolio link.",
    "resume": "Deployed Sysmon with a community configuration, generated benign ATT&CK-mapped test activity (encoded PowerShell, scheduled-task persistence), and wrote a Sigma rule with Splunk and Wazuh equivalents that detected every test run.",
    "interview": [
      "Which Sysmon Event IDs do you use most? — 1 process creation (command line, parent, hashes), 3 network connection, 11 file create, plus 13 registry value set and 22 DNS query.",
      "Why is -EncodedCommand suspicious and how do you investigate it? — It hides the script text; decode the Base64 (UTF-16LE), check the parent process and user, and look for follow-on network or file activity.",
      "What is Sigma? — A vendor-neutral YAML format for log detections that converts to SIEM queries such as SPL or KQL, so rules can be shared across tools."
    ],
    "cleanup": [
      "Delete C:\\Temp\\lab-task.txt and %USERPROFILE%\\Downloads\\lab-test.ps1 and stop the Python web server.",
      "Keep Sysmon installed for later labs, or remove it with C:\\Tools\\Sysmon\\Sysmon64.exe -u."
    ],
    "links": [
      {
        "label": "Microsoft Sysinternals: Sysmon",
        "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon"
      },
      {
        "label": "SwiftOnSecurity sysmon-config",
        "url": "https://github.com/SwiftOnSecurity/sysmon-config"
      },
      {
        "label": "MITRE ATT&CK T1059.001 PowerShell",
        "url": "https://attack.mitre.org/techniques/T1059/001/"
      }
    ]
  },
  {
    "id": "lab-phishing-analysis",
    "title": "Triage a phishing email from raw headers to verdict",
    "track": "Blue team",
    "level": "Beginner",
    "minutes": 120,
    "cost": "Free",
    "summary": "Open the raw source of a real email you received, trace its Received hops, read SPF, DKIM and DMARC results, check the sender domain's DNS records with dig, look up URLs safely on urlscan.io and VirusTotal without clicking, defang the IOCs and write a triage ticket with a verdict and actions.",
    "realWorld": "Reported phishing is the most common ticket in many SOCs. Tier 1 analysts do exactly this dozens of times a week: header analysis, authentication checks, reputation lookups, then block, purge and notify.",
    "youWillNeed": [
      "An email account where you can view the original message (Gmail 'Show original', Outlook 'View message source')",
      "A suspicious email from your own spam folder, or a normal marketing email if you have no spam",
      "Your Ubuntu VM from lab-home-lab (for dig, whois and text tools)",
      "Free accounts are optional: urlscan.io and VirusTotal both allow searches without one"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Never click links, load remote images, open attachments or reply to the email. Do lookups only (search existing reports). Don't upload attachments or full emails to public services; they may contain your personal data and uploads are visible to others. Work with the .eml file only inside your lab VM.",
    "steps": [
      {
        "title": "Pick an email and save its raw source",
        "body": "In Gmail open the message, click the three-dot menu > Show original, then Download Original to get an .eml file. In Outlook on the web use the three-dot menu > View > View message source. Copy the file to your Ubuntu VM (for example with scp) as message.eml.",
        "cmd": "scp message.eml <user>@192.168.56.10:~/phish/\nwc -l ~/phish/message.eml",
        "check": "You have a text file that starts with Delivered-To or Received headers."
      },
      {
        "title": "Read the authentication summary",
        "body": "Gmail's Show original page lists SPF, DKIM and DMARC results at the top. In the raw file, the same results are in Authentication-Results, written by your provider's receiving server, which is the one you can trust.",
        "cmd": "grep -iA4 '^Authentication-Results:' ~/phish/message.eml\ngrep -i '^Received-SPF:' ~/phish/message.eml",
        "check": "You can write down spf=, dkim= and dmarc= results and the domain each one checked (smtp.mailfrom, header.d, header.from)."
      },
      {
        "title": "Pull out the key headers",
        "body": "Compare the visible From with Return-Path (envelope sender, checked by SPF) and Reply-To (where answers go). A mismatch, a free-mail Reply-To or a lookalike domain (rn vs m, extra hyphen) is a classic phishing sign.",
        "cmd": "grep -iE '^(From|Return-Path|Reply-To|Sender|To|Subject|Date|Message-ID|X-Mailer):' ~/phish/message.eml",
        "check": "You have a small table of From, Return-Path, Reply-To and Message-ID domains and whether they match."
      },
      {
        "title": "Trace the Received hops",
        "body": "Each mail server adds a Received line on top, so read them bottom-up: the lowest one is closest to the sender, the top one is your provider. Headers can be forged below the first server you trust, so focus on the first hop recorded by your provider.",
        "cmd": "awk '/^Received:/{p=1} p&&/^[A-Za-z-]+:/&&!/^Received:/{p=0} p' ~/phish/message.eml | tac",
        "check": "You can list each hop (from host, by host, time) and name the originating IP your provider recorded."
      },
      {
        "title": "Check the sender IP's owner",
        "body": "Look up who owns the originating IP. A bulk-mail provider is normal for marketing; a residential ISP or a random VPS for a 'bank' email is not. Also search it on AbuseIPDB (lookup only).",
        "cmd": "sudo apt install -y whois dnsutils\nwhois <originating IP> | grep -iE 'orgname|org-name|netname|country|descr' | head",
        "check": "You know the organization and country for the IP."
      },
      {
        "title": "Check the domain's SPF record",
        "body": "SPF lists which servers may send mail for a domain. Check the Return-Path domain. '-all' means hard fail for others, '~all' soft fail.",
        "cmd": "dig +short TXT <return-path domain> | grep -i 'v=spf1'",
        "check": "You see a v=spf1 record (or none, which itself is worth noting)."
      },
      {
        "title": "Check DMARC and DKIM records",
        "body": "DMARC lives at _dmarc.<From domain> and tells receivers what to do when SPF/DKIM don't align (p=none, quarantine or reject). The DKIM public key lives at <selector>._domainkey.<d= domain>; take the selector from the s= tag in the DKIM-Signature header.",
        "cmd": "dig +short TXT _dmarc.<from domain>\ngrep -iA3 '^DKIM-Signature:' ~/phish/message.eml    # read the d= and s= tags\ndig +short TXT <selector>._domainkey.<d= domain>",
        "check": "You can state the DMARC policy (p=) and whether a DKIM key exists for the selector."
      },
      {
        "title": "Extract URLs and attachment hashes without opening anything",
        "body": "Pull links out of the raw text. Emails are often quoted-printable encoded (soft line breaks end with '='), so the second command decodes first. If there is an attachment, extract it inside the VM and hash it, but never open it.",
        "cmd": "grep -oE 'https?://[^\"<> ]+' ~/phish/message.eml | sort -u\n# Decoded version (handles quoted-printable and Base64 bodies):\npython3 - ~/phish/message.eml <<'EOF'\nimport email, re, sys\nmsg = email.message_from_binary_file(open(sys.argv[1], 'rb'))\nurls = set()\nfor part in msg.walk():\n    if part.get_content_maintype() == 'text':\n        text = (part.get_payload(decode=True) or b'').decode('utf-8', 'ignore')\n        urls.update(re.findall(r'https?://[^\\s\"<>]+', text))\nprint('\\n'.join(sorted(urls)))\nEOF\nsudo apt install -y mpack && mkdir -p ~/phish/att && cd ~/phish/att && munpack -t ../message.eml; sha256sum *",
        "check": "You have a unique list of URLs and a SHA-256 for each attachment (if any)."
      },
      {
        "title": "Look up URLs, domains and hashes",
        "body": "Search, don't submit. On VirusTotal, paste the URL, domain or file hash in the search box to see existing reports. On urlscan.io, use Search (for example domain:example.com) to find earlier scans with screenshots. If you must submit a new scan, set visibility to Private or Unlisted, because public scans can alert the attacker and expose tokens in the URL.",
        "check": "You have a verdict count or 'no prior reports' for each IOC, with screenshots."
      },
      {
        "title": "Defang the IOCs",
        "body": "Defanging stops links from being clickable in tickets and chat. Save your IOCs one per line in iocs.txt and convert them.",
        "cmd": "sed -e 's/^http/hxxp/' -e 's/\\./[.]/g' -e 's/@/[@]/g' ~/phish/iocs.txt | tee ~/phish/iocs-defanged.txt",
        "check": "https://login.example.com/x becomes hxxps://login[.]example[.]com/x and 203.0.113.5 becomes 203[.]0[.]113[.]5."
      },
      {
        "title": "Decide the verdict",
        "body": "Weigh the evidence: authentication results and alignment, sender infrastructure, lookalike domains, urgency or credential-harvest language, and reputation results. Pick Malicious, Suspicious, Spam or Legitimate and a confidence level, and list the three strongest reasons.",
        "check": "You can defend the verdict in two sentences."
      },
      {
        "title": "Write the triage ticket",
        "body": "Use this template. In a company the actions would be: block the sender and URLs at the mail gateway and web proxy, search and purge all copies (for example Microsoft Defender Threat Explorer or Google Workspace investigation tool), check proxy/DNS logs for anyone who clicked, reset credentials for anyone who entered them, and notify users.",
        "cmd": "Ticket: PHISH-<date>-001        Analyst: <you>        Opened (UTC): <time>\nReported by: <user or 'self'>     Mailbox: <redacted>\nSubject: <subject>                From: <display name> <sender, defanged>\nReturn-Path: <...>                Reply-To: <...>\nOriginating IP / ASN: <ip defanged> / <ASN, org, country>\nSPF: <pass/fail/softfail> (<why>)   DKIM: <pass/fail, d=...>   DMARC: <pass/fail, policy p=...>\nURLs (defanged): <hxxps://...>    VT / urlscan results: <x/y engines, verdict, screenshot notes>\nAttachments: <name, SHA-256, VT result or 'none'>\nVerdict: Malicious phishing | Suspicious | Spam | Legitimate   Confidence: High/Med/Low\nReasoning: <3 bullets>\nActions: block sender/domain and URLs at the mail gateway and proxy; search and purge copies from all mailboxes;\n         check who clicked (proxy/DNS logs) and reset credentials for anyone who entered them; notify users\nUser notice: <2-3 sentence message to staff>\nStatus: Closed / Escalated to <tier/IR>",
        "check": "Every field is filled and all IOCs are defanged."
      },
      {
        "title": "Report it where it helps",
        "body": "In Gmail use Report phishing (or Report spam); in Outlook use Report > Report phishing. You can also forward real phishing to reportphishing@apwg.org as described on CISA's phishing page. Then delete the message.",
        "check": "The email is reported and removed from your inbox."
      }
    ],
    "verify": [
      "You can explain which domain each of SPF, DKIM and DMARC checked in this email and whether it aligned with the From domain.",
      "Your Received-hop table names the originating IP and its owner.",
      "Every URL, domain, IP and hash in the ticket is defanged and has a lookup result.",
      "The ticket has a verdict, confidence, reasoning and concrete block/purge/notify actions."
    ],
    "deliverable": "A redacted triage ticket (remove your own email address and any personal data), a hop table, screenshots of the authentication results and one reputation lookup, and a short 'what made this phishing (or not)' explanation.",
    "resume": "Triaged a real phishing email end to end: traced Received hops, validated SPF, DKIM and DMARC alignment and DNS records, ran safe reputation lookups on defanged IOCs, and documented a verdict with block, purge and user-notification actions.",
    "interview": [
      "An email passes SPF but fails DMARC. How? — SPF checked the Return-Path domain, which passed, but it doesn't align with the visible From domain, and DKIM didn't pass with an aligned domain either.",
      "How do you read Received headers? — Bottom-up; the lowest is closest to the sender, and only hops added by servers you trust (your provider) are reliable.",
      "A user clicked a phishing link and entered their password. What now? — Reset the password and revoke sessions and tokens, check MFA and sign-in logs for attacker access, purge the email from all mailboxes, block the URL and look for other users who clicked."
    ],
    "cleanup": [
      "Delete message.eml, the attachment folder and any extracted files from the VM once the ticket is done."
    ],
    "links": [
      {
        "label": "Google: Trace an email with its full headers",
        "url": "https://support.google.com/mail/answer/29436"
      },
      {
        "label": "CISA: Recognize and report phishing",
        "url": "https://www.cisa.gov/secure-our-world/recognize-and-report-phishing"
      },
      {
        "label": "RFC 7489: DMARC",
        "url": "https://www.rfc-editor.org/rfc/rfc7489"
      }
    ]
  },
  {
    "id": "lab-pcap-investigation",
    "title": "Investigate a malware traffic PCAP and write an incident report",
    "track": "Blue team",
    "level": "Intermediate",
    "minutes": 180,
    "cost": "Free",
    "summary": "Analyze a published training PCAP from malware-traffic-analysis.net in an isolated VM: use Wireshark filters for HTTP, TLS SNI and DNS, identify the infected host's IP, MAC, hostname and user from DHCP, NBNS and Kerberos, extract IOCs and write an incident report.",
    "realWorld": "When an IDS or EDR alert fires, SOC analysts pull packet captures to answer 'which host, which user, what did it talk to and what was downloaded'. The malware-traffic-analysis.net exercises are widely used to train exactly this and come with answer keys.",
    "youWillNeed": [
      "An analysis VM you can isolate: an Ubuntu VM with a desktop (or tshark on Ubuntu Server) cloned from lab-home-lab, with shared folders and shared clipboard turned off",
      "Wireshark, tshark and 7-Zip (installed in step 2)",
      "One exercise from malware-traffic-analysis.net's Training Exercises page"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "The PCAPs contain real malware traffic and sometimes real malware files. Download and open them only in an isolated, snapshotted analysis VM: disconnect the NAT adapter after downloading, keep shared folders and drag-and-drop off, never export and run extracted files, and never visit the domains or IPs you find. Your host antivirus may flag the zip; that is expected and is why it stays inside the VM.",
    "steps": [
      {
        "title": "Prepare and snapshot the analysis VM",
        "body": "Clone your Ubuntu VM as 'pcap-analysis', turn off Shared Clipboard, Drag'n'Drop and any shared folders in VirtualBox settings, and take a snapshot named 'clean'. You will revert to it at the end.",
        "check": "The VM has a 'clean' snapshot and no shared folders."
      },
      {
        "title": "Install the analysis tools",
        "body": "Install Wireshark (GUI), tshark (command line) and 7-Zip, which handles the password-protected zips. Answer 'No' when asked whether non-superusers can capture; you're only reading files.",
        "cmd": "sudo apt update\nsudo apt install -y wireshark tshark p7zip-full\ntshark --version | head -1",
        "check": "tshark prints its version."
      },
      {
        "title": "Download one exercise and isolate the VM",
        "body": "On malware-traffic-analysis.net open Training Exercises and pick one that includes an incident report task (Windows hosts in an Active Directory environment work best). The zip password is published on the site's About page. After downloading, set the VM's NAT adapter to 'Not attached'.",
        "cmd": "mkdir -p ~/pcap && cd ~/pcap\n7z x <exercise>.pcap.zip    # enter the password from the site's About page\nsha256sum *.pcap\ncapinfos *.pcap",
        "check": "capinfos shows the capture's start and end time and packet count; write down the time range."
      },
      {
        "title": "Get the big picture",
        "body": "Before filtering, see who talks to whom. The busiest internal host is often, but not always, the victim; the exercise's instructions usually give the LAN segment.",
        "cmd": "tshark -r ~/pcap/<file>.pcap -q -z conv,ip | head -25\ntshark -r ~/pcap/<file>.pcap -q -z io,phs | head -40",
        "check": "You can name the internal subnet and the top internal IP."
      },
      {
        "title": "Set up Wireshark for web traffic",
        "body": "Open the pcap in Wireshark. Set View > Time Display Format to UTC Date and Time. Apply the classic web filter below: it shows HTTP requests and the TLS Client Hello of every HTTPS connection, whose Server Name (SNI) reveals the domain even when the rest is encrypted. Add columns for http.host and tls.handshake.extensions_server_name (right-click field > Apply as Column).",
        "cmd": "(http.request or tls.handshake.type eq 1) and !(ssdp)",
        "check": "You see a time-ordered list of domains the host visited."
      },
      {
        "title": "Review DNS queries",
        "body": "DNS shows every domain the host looked up, including ones it contacted over non-web protocols. Look for odd names, newly seen domains and names that don't fit normal Windows/Microsoft traffic.",
        "cmd": "tshark -r ~/pcap/<file>.pcap -Y 'dns.flags.response == 0' -T fields -e frame.time_utc -e ip.src -e dns.qry.name | sort -k3 -u | head -60",
        "check": "You have a short list of suspicious domains to check."
      },
      {
        "title": "Identify the host: IP, MAC and hostname from DHCP",
        "body": "DHCP requests carry the client MAC and usually the hostname (option 12). In Wireshark use the filter dhcp and expand Bootstrap Protocol.",
        "cmd": "tshark -r ~/pcap/<file>.pcap -Y dhcp -T fields -e frame.time_utc -e eth.src -e dhcp.option.hostname -e dhcp.option.requested_ip_address",
        "check": "You have the victim's MAC and hostname (for example DESKTOP-XXXXXXX)."
      },
      {
        "title": "Confirm the hostname with NBNS",
        "body": "If there is no DHCP in the capture, NetBIOS Name Service registrations still reveal the Windows hostname and the IP using it.",
        "cmd": "tshark -r ~/pcap/<file>.pcap -Y nbns -T fields -e ip.src -e nbns.name | sort -u",
        "check": "The same hostname appears next to the victim IP."
      },
      {
        "title": "Find the user account from Kerberos",
        "body": "In an Active Directory network, Kerberos AS-REQ/TGS traffic contains the user name. Filter out computer accounts, which end in $.",
        "cmd": "kerberos.CNameString and !(kerberos.CNameString contains \"$\")",
        "check": "The CNameString column shows the victim's user name (for example firstname.lastname)."
      },
      {
        "title": "Pinpoint the malicious traffic",
        "body": "Go back to the web filter and look for the chain: initial lure download, follow-up payload, then repeating command-and-control (C2) check-ins. Useful signs: HTTP to a raw IP, POST requests at regular intervals, unusual user agents, new domains in SNI. Right-click > Follow > TCP Stream to read HTTP headers, but don't export content.",
        "cmd": "http.request.method == \"POST\"\nip.addr == <suspicious IP> and tcp.flags.syn == 1 and tcp.flags.ack == 0",
        "check": "You can describe the infection chain in 3–4 time-stamped steps."
      },
      {
        "title": "Record file hashes without running anything",
        "body": "Use File > Export Objects > HTTP only to read the list of file names, types and sizes. If you export an object to hash it, hash it and delete it immediately; never open or execute it. Look the hash up on VirusTotal from your host by searching the hash text only.",
        "cmd": "sha256sum ~/pcap/exported/*\nrm -rf ~/pcap/exported",
        "check": "You have SHA-256 values and names for any downloaded files."
      },
      {
        "title": "Build and defang the IOC list",
        "body": "List each IOC with its first-seen time (UTC), direction, port and what it is. Defang domains, IPs and URLs so they're safe to paste into tickets.",
        "cmd": "sed -e 's/^http/hxxp/' -e 's/\\./[.]/g' ~/pcap/iocs.txt > ~/pcap/iocs-defanged.txt\ncat ~/pcap/iocs-defanged.txt",
        "check": "Every IOC has a timestamp and a one-line description."
      },
      {
        "title": "Write the incident report",
        "body": "Use the format malware-traffic-analysis.net answer keys use: executive summary, victim details, indicators of compromise. Write for a manager in the summary and for an analyst in the IOC list.",
        "cmd": "INCIDENT REPORT - <exercise name and date>\n\nExecutive summary\nOn <date>, at about <time> UTC, a Windows host used by <user> was infected with <malware family, if identified>.\n<One or two sentences on how it happened and what the traffic shows (for example: download, C2, data theft).>\n\nVictim details\n- IP address: <x.x.x.x>\n- MAC address: <xx:xx:xx:xx:xx:xx>\n- Host name: <HOSTNAME>\n- User account name: <user>\n\nIndicators of compromise (defanged)\n- <time UTC> <src ip> -> <dst ip>:<port> <domain> - <GET/POST/TLS SNI> - <what it is>\n- <domain or URL>\n- SHA-256 <hash> - <file name> (<size>) - <what it is>\n\nEvidence and filters used\n- <filter> -> <what it showed>",
        "check": "The report fits on one page and every claim points to a filter or packet."
      },
      {
        "title": "Grade yourself against the answer key",
        "body": "Open the exercise's answers page and compare: victim IP/MAC/hostname/user, malware family and IOCs. Note anything you missed and which filter would have found it.",
        "check": "You have a short 'missed and why' list."
      }
    ],
    "verify": [
      "Your report names the victim IP, MAC, hostname and user account, and they match the answer key.",
      "You can show the Wireshark filter that proves each victim detail (DHCP, NBNS, Kerberos).",
      "Your IOC list includes at least the malicious domains/IPs with UTC times, all defanged.",
      "You reverted the analysis VM to its clean snapshot afterwards."
    ],
    "deliverable": "The one-page incident report, a screenshot for each key filter (web filter with SNI column, DHCP hostname, Kerberos user), your IOC list and a 'lessons' paragraph comparing your findings with the answer key. Name the exercise and date so reviewers can reproduce it.",
    "resume": "Investigated a malware-infected Windows host from a packet capture using Wireshark and tshark, identified the victim's IP, MAC, hostname and AD user from DHCP, NBNS and Kerberos, extracted defanged IOCs and wrote an incident report matching the published answer key.",
    "interview": [
      "How do you see which site a host visited over HTTPS without decrypting it? — Read the SNI in the TLS Client Hello (filter tls.handshake.type eq 1) and correlate with DNS queries.",
      "How do you find the hostname and user of an infected Windows host in a PCAP? — Hostname from DHCP option 12 or NBNS; user from Kerberos CNameString, excluding accounts ending in $.",
      "What makes C2 traffic stand out? — Regular beaconing intervals, connections to new or raw-IP destinations, odd user agents or URIs, and repeated small POSTs."
    ],
    "cleanup": [
      "Delete the pcap, zip and any exported files, then revert the analysis VM to its 'clean' snapshot.",
      "Reconnect the NAT adapter only after reverting."
    ],
    "links": [
      {
        "label": "Wireshark User's Guide: display filters",
        "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html"
      },
      {
        "label": "Wireshark display filter reference",
        "url": "https://www.wireshark.org/docs/dfref/"
      },
      {
        "label": "malware-traffic-analysis.net training exercises",
        "url": "https://www.malware-traffic-analysis.net/training-exercises.html"
      }
    ]
  },
  {
    "id": "lab-vuln-management",
    "title": "Run a full vulnerability management cycle with Greenbone/OpenVAS",
    "track": "Blue team",
    "level": "Intermediate",
    "minutes": 360,
    "cost": "Free",
    "summary": "Run Greenbone Community Edition (OpenVAS) in its official containers, scan a deliberately vulnerable Metasploitable 2 VM on an isolated network, validate two findings, prioritize with CVSS, EPSS and CISA KEV, write a remediation plan with owners and SLAs, then mitigate one finding and rescan to prove closure.",
    "realWorld": "Vulnerability management analysts run this loop every week: scan, validate, prioritize by real-world risk rather than raw CVSS, assign owners with deadlines, and verify fixes. CISA's KEV catalog and FIRST's EPSS are now standard inputs for deciding what gets patched first.",
    "youWillNeed": [
      "A scanner Ubuntu Server 24.04 VM: 4 vCPU, 8 GB RAM, 60 GB disk, with a NAT adapter (for feed downloads) and a host-only adapter",
      "Metasploitable 2 from Rapid7 (downloaded from its SourceForge project page), set to host-only networking ONLY",
      "Several hours for the first feed sync; start step 4 early"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Metasploitable 2 is intentionally full of vulnerabilities. Give it only a host-only adapter: no NAT, no bridged networking, no internet, ever. Scan only your own lab VMs. Validate findings with version checks and banners, not exploits.",
    "steps": [
      {
        "title": "Set up the isolated network",
        "body": "In VirtualBox, confirm your host-only network (for example vboxnet0, 192.168.56.0/24) exists. The scanner VM gets NAT + host-only; Metasploitable gets host-only only. Snapshot the scanner VM first.",
        "check": "Metasploitable's VM settings show exactly one adapter, attached to Host-only Adapter."
      },
      {
        "title": "Import Metasploitable 2",
        "body": "Download Metasploitable 2 from Rapid7's SourceForge project page, unzip it, and create a new VM (Linux, Ubuntu 32-bit, 512 MB RAM) using the existing Metasploitable.vmdk as its disk. Boot it and log in as msfadmin / msfadmin (these default credentials are one of its many deliberate flaws).",
        "cmd": "# On Metasploitable:\nifconfig eth0\n# On the scanner VM:\nping -c 3 <metasploitable IP>",
        "check": "Metasploitable has a 192.168.56.x address (for example 192.168.56.30) and answers pings from the scanner; ping 8.8.8.8 from Metasploitable fails."
      },
      {
        "title": "Install Docker Engine on the scanner",
        "body": "Greenbone's community containers run with Docker and the Compose plugin. These are Docker's official apt repository steps for Ubuntu; if they differ from the current Docker docs, follow the docs.",
        "cmd": "sudo apt-get update\nsudo apt-get install -y ca-certificates curl\nsudo install -m 0755 -d /etc/apt/keyrings\nsudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc\nsudo chmod a+r /etc/apt/keyrings/docker.asc\necho \"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo \"${UBUNTU_CODENAME:-$VERSION_CODENAME}\") stable\" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null\nsudo apt-get update\nsudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin\nsudo usermod -aG docker $USER\n# log out and back in so the docker group applies, then:\ndocker compose version",
        "check": "docker compose version prints a v2.x version."
      },
      {
        "title": "Download and start Greenbone Community Containers",
        "body": "Follow the Greenbone Community Containers guide: download its compose file, pull the images and start them. The guide's compose file URL has changed between releases, so if curl returns 404, copy the current link from the guide.",
        "cmd": "export DOWNLOAD_DIR=$HOME/greenbone-community-container && mkdir -p $DOWNLOAD_DIR\ncurl -f -O -L https://greenbone.github.io/docs/latest/_static/compose.yaml --output-dir \"$DOWNLOAD_DIR\"\ndocker compose -f $DOWNLOAD_DIR/compose.yaml pull\ndocker compose -f $DOWNLOAD_DIR/compose.yaml up -d\ndocker compose -f $DOWNLOAD_DIR/compose.yaml ps",
        "check": "All containers show running or exited (0) for the one-shot feed data containers."
      },
      {
        "title": "Set the admin password and open the web UI",
        "body": "Change the default admin password. The web UI (GSA) listens on 127.0.0.1:9392 inside the scanner VM, so reach it from your host through an SSH tunnel.",
        "cmd": "docker compose -f $DOWNLOAD_DIR/compose.yaml exec -u gvmd gvmd gvmd --user=admin --new-password='<strong password>'\n# On your host computer:\nssh -L 9392:127.0.0.1:9392 <user>@192.168.56.10\n# then browse to http://127.0.0.1:9392",
        "check": "You can log in as admin."
      },
      {
        "title": "Wait for the feeds to finish syncing",
        "body": "The scanner needs vulnerability tests (VTs), SCAP, CERT and scan-config data before scans are meaningful. The first sync can take several hours. Check Administration > Feed Status.",
        "cmd": "docker compose -f $DOWNLOAD_DIR/compose.yaml logs -f gvmd | grep -i -E 'update|sync|finished'",
        "check": "Every feed in Feed Status shows 'Current' and Configuration > Scan Configs lists 'Full and fast'."
      },
      {
        "title": "Create a target and run a scan",
        "body": "Configuration > Targets > New Target: name 'msf2', hosts = Metasploitable's IP, port list 'All IANA assigned TCP' (or 'All TCP and Nmap top 100 UDP'). Scans > Tasks > New Task: scan target msf2 with scan config 'Full and fast'. Start it; it takes 30–90 minutes.",
        "check": "The task status reaches Done and the report shows dozens of findings, many High."
      },
      {
        "title": "Review and export the report",
        "body": "Open the report, sort by severity and read the top findings: summary, detection result, affected software, solution and references. Export it as PDF or CSV for your portfolio. Pick two findings to validate, for example the vsftpd 2.3.4 backdoor finding and a cleartext service such as Telnet.",
        "check": "You have an exported report and two chosen findings with their CVE or OID."
      },
      {
        "title": "Validate the two findings without exploiting",
        "body": "Scanners produce false positives, so confirm with independent evidence. Here, service banners and versions are enough; you don't need to exploit anything.",
        "cmd": "sudo apt install -y nmap\nnmap -sV -p 21,23 <metasploitable IP>\nprintf 'QUIT\\r\\n' | nc -nv -w 3 <metasploitable IP> 21",
        "check": "nmap reports vsftpd 2.3.4 on 21/tcp and Linux telnetd on 23/tcp, and the FTP banner shows '(vsFTPd 2.3.4)'. Both findings are confirmed true positives."
      },
      {
        "title": "Prioritize with CVSS, EPSS and KEV",
        "body": "CVSS says how bad a flaw could be; EPSS estimates how likely it is to be exploited in the next 30 days; KEV says it is already being exploited in the wild. Look each CVE up on NVD for CVSS, then query EPSS and the KEV catalog.",
        "cmd": "sudo apt install -y jq\ncurl -s \"https://api.first.org/data/v1/epss?cve=CVE-2011-2523\" | jq '.data'\ncurl -s https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json | jq '.vulnerabilities[] | select(.cveID==\"CVE-2011-2523\")'",
        "check": "You have a CVSS base score, an EPSS score and percentile, and a yes/no KEV status for each finding (an empty KEV result means not listed)."
      },
      {
        "title": "Write the remediation plan",
        "body": "Turn findings into accountable work: owner, due date from an SLA policy, fix, and a compensating control when the fix is not possible. Metasploitable's Ubuntu 8.04 is end-of-life and cannot be patched, which is realistic: legacy systems often need mitigations plus a documented exception.",
        "cmd": "| # | Finding (scanner name) | Asset | CVE | CVSS | EPSS (pct) | KEV? | Priority | Owner | SLA / due | Fix | Compensating control | Status |\n|---|---|---|---|---|---|---|---|---|---|---|---|---|\n| 1 | vsftpd 2.3.4 backdoor | msf2 (192.168.56.30) | CVE-2011-2523 | <from NVD> | <from FIRST> | <yes/no> | P1 | Server team (you) | <date> | Remove vsftpd / upgrade OS | Block tcp/21 at host firewall | Mitigated |\n| 2 | <second finding> | ... | ... | ... | ... | ... | ... | ... | ... | ... | ... | Open |\n\nExample SLA policy (adapt to your org): KEV or Critical 15 days; High 30 days; Medium 90 days; Low next maintenance window or risk-accepted.",
        "check": "Each finding has an owner, a due date and a verification method."
      },
      {
        "title": "Mitigate one finding",
        "body": "Apply a compensating control on Metasploitable: block FTP at its host firewall. In a real environment you would remove the service or upgrade, and use a firewall rule only as a stopgap with an exception record.",
        "cmd": "# On Metasploitable (msfadmin has sudo):\nsudo iptables -I INPUT -p tcp --dport 21 -j DROP\nsudo iptables -L INPUT -n --line-numbers\n# From the scanner:\nnmap -Pn -p 21 <metasploitable IP>",
        "check": "nmap shows 21/tcp as filtered."
      },
      {
        "title": "Rescan and prove closure",
        "body": "Re-run the same task (same target and config) so results are comparable. In Reports, select the old and new report and use the delta/compare view to see what changed.",
        "check": "The vsftpd finding no longer appears in the new report and the delta marks it as gone; the Telnet finding remains open."
      },
      {
        "title": "Close the loop in your plan",
        "body": "Update the plan: finding 1 'Mitigated (compensating control), verified by rescan on <date>', plus an exception note with a review date; finding 2 'Open' with its owner and due date. Write two sentences on residual risk.",
        "check": "The plan shows before/after evidence for finding 1."
      }
    ],
    "verify": [
      "Metasploitable has only a host-only adapter and cannot reach the internet.",
      "You have an exported Greenbone report and two findings validated with nmap/banner evidence.",
      "Your plan lists CVSS, EPSS and KEV status, an owner and an SLA date for each finding.",
      "A rescan and delta report show the mitigated finding closed."
    ],
    "deliverable": "A vulnerability management report: scope and network diagram, scan configuration, top findings summary, validation evidence, the prioritization table with CVSS/EPSS/KEV, the remediation plan with owners and SLAs, and before/after rescan screenshots. Note that the target is a deliberately vulnerable training VM on an isolated network.",
    "resume": "Ran a full vulnerability management cycle with Greenbone/OpenVAS: scanned an isolated vulnerable host, validated findings, prioritized them with CVSS, EPSS and the CISA KEV catalog, wrote an SLA-driven remediation plan and verified a mitigation by rescan.",
    "interview": [
      "Why not just patch everything with CVSS 9 or higher first? — CVSS measures severity, not likelihood; EPSS and KEV show which flaws are actually exploited, so a KEV-listed 7.5 on an internet-facing server can outrank a 9.8 on an isolated system.",
      "What do you do when a system can't be patched? — Apply compensating controls (remove or firewall the service, segment, monitor), document a risk exception with an owner and review date, and plan replacement.",
      "How do you verify remediation? — Rescan with the same scope and config, compare against the previous report, and confirm with an independent check such as a version or configuration test."
    ],
    "cleanup": [
      "Power off Metasploitable when not in use and never change its adapter to NAT or bridged.",
      "Stop the scanner with docker compose -f $DOWNLOAD_DIR/compose.yaml down (data volumes are kept for next time)."
    ],
    "links": [
      {
        "label": "Greenbone Community Containers guide",
        "url": "https://greenbone.github.io/docs/latest/22.4/container/index.html"
      },
      {
        "label": "CISA Known Exploited Vulnerabilities Catalog",
        "url": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog"
      },
      {
        "label": "FIRST EPSS",
        "url": "https://www.first.org/epss/"
      }
    ]
  },
  {
    "id": "lab-incident-response",
    "title": "Run a ransomware tabletop, write the playbook and handle a simulated incident",
    "track": "Blue team",
    "level": "Intermediate",
    "minutes": 300,
    "cost": "Free",
    "summary": "Plan and run a ransomware tabletop exercise, write an incident response playbook based on NIST SP 800-61 with roles, decision points, communication templates and evidence handling, then simulate a detection in your lab SIEM and write a full incident report with a timeline.",
    "realWorld": "Incident responders and SOC leads maintain playbooks, run tabletops for executives and technical teams, and write the incident report that goes to management, legal and insurers. Ransomware is the scenario almost every organization rehearses.",
    "youWillNeed": [
      "Your Splunk setup from lab-splunk-siem (or the Wazuh setup from lab-wazuh; adapt the searches)",
      "Your Windows lab VM with a fresh snapshot",
      "A document editor; optionally 2–4 classmates to play roles in the tabletop",
      "A CISA Tabletop Exercise Package (CTEP) ransomware scenario for inspiration"
    ],
    "requires": [
      "lab-home-lab",
      "lab-splunk-siem"
    ],
    "safety": "The simulation only creates, copies and renames text files the script makes itself in C:\\LabData. It encrypts nothing. Run it only in your snapshotted lab VM, never on a real computer or shared drive.",
    "steps": [
      {
        "title": "Define the scenario and scope",
        "body": "Write a one-paragraph scenario for a fictional small company (for example a 200-person medical clinic): staff report files ending in .locked and a ransom note on a file server on a Monday morning. List 5–6 injects to reveal over time, such as 'backups were last tested 8 months ago' and 'a reporter calls asking about a data leak'.",
        "check": "You have a scenario, a participant list and 5–6 timed injects."
      },
      {
        "title": "Assign roles",
        "body": "List who does what: incident commander, SOC/IR analysts, IT operations, legal/privacy counsel, communications, executive sponsor, HR, and external parties (cyber insurer, IR retainer firm, law enforcement). For each, write their decision authority and a backup person.",
        "check": "A RACI-style table covers every role with a named backup."
      },
      {
        "title": "Map the playbook to NIST SP 800-61",
        "body": "Structure the playbook by the lifecycle in SP 800-61 Rev. 2: Preparation; Detection and Analysis; Containment, Eradication and Recovery; Post-Incident Activity. Rev. 3 (2025) reorganizes this around the NIST CSF 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover); add a column showing that mapping.",
        "check": "Each phase has entry criteria, key tasks and exit criteria."
      },
      {
        "title": "Write the decision points",
        "body": "Ransomware forces hard calls under time pressure; decide the criteria in advance. Cover: isolate hosts from the network (preferred over powering off, which loses memory evidence); when to engage legal and whether breach-notification clocks start; when to contact law enforcement (FBI field office or IC3) and report to CISA; how to verify offline or immutable backups are clean before restoring; and the ransom question, including OFAC sanctions risk and the official guidance not to pay.",
        "check": "Each decision point names who decides, the inputs needed and the default choice."
      },
      {
        "title": "Draft communication templates",
        "body": "Write short templates for: an internal staff notice, an executive status update, a customer/partner notice (for legal review), and a holding statement for media. Include an out-of-band plan (phone bridge or separate chat) because email and chat may be compromised.",
        "check": "Four templates with placeholders and an out-of-band contact list."
      },
      {
        "title": "Define evidence handling",
        "body": "Write the rules: collect in order of volatility (memory before disk), hash every item with SHA-256, record chain of custody, keep originals read-only, preserve logs before they roll over, and don't wipe or reimage before evidence is taken. Link to lab-memory-forensics and lab-disk-forensics for the how.",
        "check": "The evidence section includes a chain-of-custody form."
      },
      {
        "title": "Run the tabletop",
        "body": "Run 60–90 minutes with classmates (or play each role yourself). Read the scenario, reveal injects every 10–15 minutes, and record every decision, who made it and how long it took. Note where the playbook was unclear.",
        "check": "You have notes with at least 5 decisions and 3 gaps found."
      },
      {
        "title": "Stage the simulated attack in your lab",
        "body": "Snapshot the Windows VM. Repeat the lab-splunk-siem attack chain so your existing alerts can fire: several failed logons, a success, and a new local admin. Write down the real start time in UTC.",
        "cmd": "Get-Date -Format u\nnet user labuser \"Lab-Only-Pass1!\" /add\n# 6 wrong passwords, then the right one:\nrunas /user:labuser cmd\nnet localgroup Administrators labuser /add",
        "check": "Your 'Brute force then success' alert shows under Activity > Triggered Alerts within 5 minutes."
      },
      {
        "title": "Run the benign 'ransomware' simulation",
        "body": "This harmless script creates 50 fake invoices, backs them up, renames them to .locked and drops a note, imitating the visible impact of ransomware (ATT&CK T1486) without encrypting anything.",
        "cmd": "# Run ONLY in your Windows lab VM, after taking a snapshot. It touches only files it creates.\nNew-Item -ItemType Directory -Path C:\\LabData, C:\\LabBackup -Force | Out-Null\n1..50 | ForEach-Object { \"Invoice $_ - fake lab data\" | Set-Content \"C:\\LabData\\invoice_$_.txt\" }\nCopy-Item C:\\LabData\\* C:\\LabBackup\\\nGet-ChildItem C:\\LabData\\*.txt | ForEach-Object { Rename-Item $_.FullName ($_.Name + '.locked') }\n'LAB EXERCISE ONLY. No files were encrypted. Contact the SOC.' | Set-Content C:\\LabData\\README-RESTORE.txt\nGet-ChildItem C:\\LabData | Select-Object -First 5",
        "check": "C:\\LabData holds invoice_N.txt.locked files and README-RESTORE.txt."
      },
      {
        "title": "Triage and build the timeline in the SIEM",
        "body": "Treat the alert as real. Pull every relevant event for the host into a time-sorted table, then add file timestamps from the simulation. 4720 is 'user created', 4732 'added to group'.",
        "cmd": "index=lab host=<windows host> sourcetype=\"WinEventLog:Security\" EventCode IN (4625, 4624, 4720, 4732)\n| eval target_user=mvindex(Account_Name,1)\n| table _time EventCode target_user Logon_Type Source_Network_Address\n| sort _time\n\n# On Windows, file evidence:\nGet-ChildItem C:\\LabData | Sort-Object LastWriteTime | Select-Object -First 3 Name, LastWriteTimeUtc",
        "check": "You have a timeline from first failed logon to the ransom note."
      },
      {
        "title": "Contain and preserve evidence",
        "body": "Isolate the VM by disconnecting its virtual network cable (the lab version of network isolation), then export and hash the Security log before anything else changes. Record each action with a UTC time.",
        "cmd": "# On your host:\nVBoxManage controlvm \"<Windows VM name>\" setlinkstate1 off\n# In the Windows VM:\nNew-Item -ItemType Directory C:\\Evidence -Force | Out-Null\nwevtutil epl Security C:\\Evidence\\Security.evtx\nGet-FileHash C:\\Evidence\\Security.evtx -Algorithm SHA256 | Format-List",
        "check": "The VM has no network and you have a hashed Security.evtx."
      },
      {
        "title": "Eradicate and recover",
        "body": "Remove the attacker's foothold, restore data from the backup and confirm it is intact, then reconnect.",
        "cmd": "net localgroup Administrators labuser /delete\nnet user labuser /delete\nRemove-Item C:\\LabData\\* -Force\nCopy-Item C:\\LabBackup\\* C:\\LabData\\\n(Get-ChildItem C:\\LabData\\*.txt).Count\n# On your host:\nVBoxManage controlvm \"<Windows VM name>\" setlinkstate1 on",
        "check": "C:\\LabData has 50 .txt invoices again and labuser no longer exists."
      },
      {
        "title": "Write the incident report",
        "body": "Write the report as if for management and your insurer. Keep facts separate from assumptions and use UTC throughout.",
        "cmd": "INCIDENT REPORT  IR-<yyyy>-001   Classification: <TLP:AMBER / internal>\n1. Executive summary (5 sentences: what, when, impact, status, key actions)\n2. Scope and impact: hosts, accounts, data, business impact, severity\n3. Timeline (UTC): time | source (alert, log, person) | event | action taken\n4. Detection and analysis: alerts, searches run, evidence and what it proved\n5. Containment, eradication and recovery: what, when, who, verification\n6. Root cause and ATT&CK mapping (e.g., T1110 Brute Force, T1136.001 Create Local Account, T1486 Data Encrypted for Impact)\n7. Evidence log: item, SHA-256, collected by, time, storage location\n8. Communications and notifications made (legal, management, law enforcement, regulators)\n9. Lessons learned and follow-up actions with owners and due dates",
        "check": "Every timeline entry has a UTC time and a source."
      },
      {
        "title": "Run the lessons-learned review and update the playbook",
        "body": "Compare what happened in the tabletop and the simulation with the playbook. Fix unclear steps, add missing detections (for example, file integrity monitoring on shares would have caught the mass rename earlier) and assign follow-ups with owners and dates.",
        "check": "The playbook has a version number and a change log entry."
      }
    ],
    "verify": [
      "The playbook covers roles, all NIST SP 800-61 phases, at least four decision points, communication templates and evidence handling.",
      "Your SIEM alert fired for the staged attack and your timeline starts at the first failed logon.",
      "You have a hashed Security.evtx and a chain-of-custody entry for it.",
      "The incident report has an executive summary, UTC timeline, ATT&CK mapping and lessons learned."
    ],
    "deliverable": "Three documents: the ransomware playbook (5–8 pages), a tabletop after-action report with decisions and gaps, and the incident report for the simulated attack with SIEM screenshots. Label the company and incident as fictional training material.",
    "resume": "Wrote a NIST SP 800-61-based ransomware playbook, facilitated a tabletop exercise, and handled a simulated intrusion end to end in a home SOC: SIEM alert triage, containment, evidence preservation with SHA-256 hashing, recovery from backup and a full incident report with timeline.",
    "interview": [
      "A server shows ransomware activity. Do you power it off? — Usually no; isolate it from the network to stop spread while preserving memory evidence, unless encryption is actively destroying critical data and isolation isn't possible.",
      "What are the phases of incident response? — In NIST SP 800-61 Rev. 2: Preparation; Detection and Analysis; Containment, Eradication and Recovery; Post-Incident Activity. Rev. 3 maps these to the CSF 2.0 functions.",
      "What goes in an incident timeline? — UTC timestamps, the source of each fact, what happened and what action was taken, from first malicious activity through recovery."
    ],
    "cleanup": [
      "Revert the Windows VM to the snapshot you took before the simulation, or delete C:\\LabData, C:\\LabBackup and C:\\Evidence.",
      "Make sure the VM's network cable is reconnected (setlinkstate1 on)."
    ],
    "links": [
      {
        "label": "NIST SP 800-61 Rev. 3: Incident Response Recommendations",
        "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final"
      },
      {
        "label": "CISA #StopRansomware Guide",
        "url": "https://www.cisa.gov/stopransomware/ransomware-guide"
      },
      {
        "label": "CISA Tabletop Exercise Packages",
        "url": "https://www.cisa.gov/resources-tools/services/cisa-tabletop-exercise-packages"
      }
    ]
  },
  {
    "id": "lab-memory-forensics",
    "title": "Analyze Windows memory images with Volatility 3",
    "track": "Blue team",
    "level": "Advanced",
    "minutes": 300,
    "cost": "Free",
    "summary": "Install Volatility 3 in a Python virtual environment, analyze a public training memory image with windows.info, pslist, pstree, psscan, netscan, cmdline and malfind to find the suspicious process, then capture RAM from your own Windows VM with WinPmem and analyze it.",
    "realWorld": "Memory shows what disk and logs can't: running processes, injected code, network connections and command lines at the moment of capture. IR teams capture RAM before shutting down a compromised host, and Volatility is the standard free tool for analyzing it.",
    "youWillNeed": [
      "An Ubuntu 24.04 analysis VM with 4+ GB RAM and 40 GB free disk (clone from lab-home-lab), snapshotted",
      "A public training memory image: from the Volatility Foundation's memory samples list or a free CyberDefenders / Blue Team Labs Online memory challenge (prefer a Windows 7 or later image)",
      "Your Windows lab VM (set to 4 GB RAM to keep the dump small) and WinPmem from its official GitHub releases (FTK Imager or Magnet DumpIt also work)"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Public training images come from infected machines and can contain real malware code. Keep them inside the analysis VM, don't use --dump options unless you need to, never execute anything you extract, and expect antivirus alerts if you copy them elsewhere. Your own dump contains your VM's secrets; don't publish it.",
    "steps": [
      {
        "title": "Prepare the analysis VM",
        "body": "Snapshot the Ubuntu VM as 'clean' and install Python tooling. Volatility 3 needs Python 3.8 or newer; Ubuntu 24.04 ships 3.12.",
        "cmd": "sudo apt update\nsudo apt install -y python3-venv python3-pip unzip p7zip-full\npython3 --version",
        "check": "Python 3.12.x is installed."
      },
      {
        "title": "Install Volatility 3 in a virtual environment",
        "body": "A venv keeps Volatility's dependencies separate from the system Python. The PyPI package installs the vol command.",
        "cmd": "python3 -m venv ~/vol3\nsource ~/vol3/bin/activate\npip install --upgrade pip\npip install volatility3\nvol -h | head -5",
        "check": "vol -h prints 'Volatility 3 Framework' and a version."
      },
      {
        "title": "Prepare Windows symbol tables",
        "body": "Volatility 3 needs symbol tables for each Windows kernel build. With internet access it downloads them from Microsoft automatically on first use. For offline work, download the Windows symbol pack linked from the Volatility 3 GitHub README and place windows.zip in the symbols folder shown by the second command.",
        "cmd": "source ~/vol3/bin/activate\npython -c \"import volatility3, os; print(os.path.join(os.path.dirname(volatility3.__file__), 'symbols'))\"",
        "check": "You know where symbols live; windows.zip is there if you plan to work offline."
      },
      {
        "title": "Get a public training image and hash it",
        "body": "Download one image from the Volatility Foundation's memory samples list or a free CyberDefenders memory challenge (follow its instructions and password). Record the SHA-256 so your findings are tied to an exact file.",
        "cmd": "mkdir -p ~/cases/public && cd ~/cases/public\n7z x <downloaded archive>\nsha256sum <image file> | tee image.sha256",
        "check": "You have the image and its SHA-256."
      },
      {
        "title": "Identify the operating system",
        "body": "windows.info reads the kernel data structures and tells you the Windows version, build, architecture and capture time. If it fails, the image may be from a very old OS or the symbols couldn't be found.",
        "cmd": "source ~/vol3/bin/activate && cd ~/cases/public\nvol -f <image> windows.info | tee info.txt",
        "check": "You see NtMajorVersion/NtMinorVersion, Is64Bit and SystemTime."
      },
      {
        "title": "List processes three ways",
        "body": "pslist walks the active process list, pstree shows parent-child relationships, and psscan carves process structures from memory, which also finds exited or unlinked (hidden) processes. Compare them.",
        "cmd": "vol -f <image> windows.pslist | tee pslist.txt\nvol -f <image> windows.pstree | tee pstree.txt\nvol -f <image> windows.psscan | tee psscan.txt\nwc -l pslist.txt psscan.txt",
        "check": "You have three outputs; note any process in psscan that is missing from pslist."
      },
      {
        "title": "Look for parent-child and name anomalies",
        "body": "Compare against normal Windows: services.exe is the parent of svchost.exe, lsass.exe has no children, explorer.exe is the user's shell. Red flags include misspelled system names (scvhost.exe), system binaries with the wrong parent, a document reader or browser spawning cmd or PowerShell, and processes running from user profile or Temp paths.",
        "cmd": "grep -iE 'svchost|lsass|cmd|powershell|rundll32|explorer' pstree.txt",
        "check": "You have a shortlist of 1–3 suspicious PIDs with the reason for each."
      },
      {
        "title": "Check network connections",
        "body": "netscan lists TCP/UDP endpoints with the owning process. Look for suspicious PIDs talking to external IPs or odd ports. netscan supports Vista and later; on XP-era images note the limitation instead.",
        "cmd": "vol -f <image> windows.netscan | tee netscan.txt\ngrep -v -E '0\\.0\\.0\\.0|::|127\\.0\\.0\\.1' netscan.txt | head -40",
        "check": "You can link at least one suspicious PID to a remote IP and port (or record that none exist)."
      },
      {
        "title": "Read command lines",
        "body": "Command lines show how each process was started: script paths, encoded commands, odd arguments. Filter to your suspicious PIDs.",
        "cmd": "vol -f <image> windows.cmdline | tee cmdline.txt\nvol -f <image> windows.cmdline --pid <PID>",
        "check": "You have the full command line for each suspicious PID."
      },
      {
        "title": "Run malfind for injected code",
        "body": "malfind flags memory regions that are executable and writable and not backed by a file on disk, a common sign of code injection. Look for PAGE_EXECUTE_READWRITE regions that start with 'MZ' (a PE header) or look like shellcode. Legitimate programs with JIT compilers (browsers, .NET) cause false positives.",
        "cmd": "vol -f <image> windows.malfind --pid <PID> | tee malfind.txt\nvol -f <image> windows.malfind | grep -c 'PAGE_EXECUTE_READWRITE'",
        "check": "You can say whether your suspicious process has injected-looking regions."
      },
      {
        "title": "Write findings for the public image",
        "body": "Name the suspicious process, explain the evidence from each plugin, map it to ATT&CK where you can (for example T1055 Process Injection), and compare with the challenge's writeup or known answer.",
        "check": "A findings table: PID, name, parent, command line, network, malfind result, conclusion."
      },
      {
        "title": "Capture RAM from your own Windows VM",
        "body": "First create something recognizable: start a long-running benign encoded PowerShell and Notepad. Then run WinPmem from an Administrator prompt. Download the current winpmem .exe from its GitHub releases page (the file name includes the version). If the driver is blocked, Windows Memory integrity (Core isolation) may be on; use FTK Imager's File > Capture Memory instead.",
        "cmd": "$enc = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes('Write-Output \"hello from lab\"'))\nStart-Process powershell.exe -ArgumentList '-NoExit','-EncodedCommand',$enc\nStart-Process notepad.exe\nNew-Item -ItemType Directory C:\\Evidence -Force | Out-Null\n.\\<winpmem executable>.exe C:\\Evidence\\win-lab-mem.raw\nGet-FileHash C:\\Evidence\\win-lab-mem.raw -Algorithm SHA256",
        "check": "win-lab-mem.raw is roughly the size of the VM's RAM and you have its SHA-256."
      },
      {
        "title": "Transfer the dump and verify the hash",
        "body": "Copy the dump to the analysis VM with scp (the Windows OpenSSH client is built in) and check that the hash matches; a mismatch means the copy is not a faithful duplicate.",
        "cmd": "scp C:\\Evidence\\win-lab-mem.raw <user>@<analysis VM IP>:~/cases/\n# On Ubuntu:\nsha256sum ~/cases/win-lab-mem.raw",
        "check": "Both SHA-256 values are identical."
      },
      {
        "title": "Analyze your own image",
        "body": "Run the same plugins. Find your PowerShell and Notepad processes in pstree, read the encoded command line and decode it, and check netscan for your SSH session.",
        "cmd": "source ~/vol3/bin/activate && cd ~/cases\nvol -f win-lab-mem.raw windows.info\nvol -f win-lab-mem.raw windows.pstree | grep -iE 'powershell|notepad|explorer'\nvol -f win-lab-mem.raw windows.cmdline | grep -i encodedcommand\necho '<Base64 from the command line>' | base64 -d | iconv -f UTF-16LE -t UTF-8",
        "check": "pstree shows powershell.exe under explorer.exe (or your terminal), and the decoded command reads Write-Output \"hello from lab\"."
      }
    ],
    "verify": [
      "Volatility 3 runs from your venv and windows.info identifies both images.",
      "You can name the suspicious process in the public image and justify it with at least three plugins.",
      "Your own dump's SHA-256 matches before and after transfer.",
      "You found and decoded your benign encoded PowerShell in your own dump."
    ],
    "deliverable": "A memory forensics report with two parts: (1) the public image, with image source and hash, the plugins run, the suspicious process and evidence table, and ATT&CK mapping; (2) your own capture, with the acquisition method, hashes and how you found your planted process. Include key terminal output as text, not only screenshots. Don't publish your own memory dump.",
    "resume": "Performed Windows memory forensics with Volatility 3 (pslist/pstree/psscan, netscan, cmdline, malfind) to identify a malicious process in a public training image, and acquired, hash-verified and analyzed RAM from a live Windows VM with WinPmem.",
    "interview": [
      "Why capture memory before shutting down a compromised host? — RAM holds running processes, network connections, injected code, decrypted data and keys that are lost at power-off.",
      "What's the difference between pslist and psscan? — pslist follows the kernel's linked list of active processes; psscan scans memory for process structures, so it also finds terminated or unlinked (hidden) ones.",
      "What does malfind look for? — Executable, writable memory regions not backed by a file on disk, often with PE headers or shellcode, which suggest code injection."
    ],
    "cleanup": [
      "Delete C:\\Evidence\\win-lab-mem.raw from the Windows VM and close the test PowerShell and Notepad.",
      "Delete the public image and revert the analysis VM to its 'clean' snapshot when you're done."
    ],
    "links": [
      {
        "label": "Volatility 3 documentation",
        "url": "https://volatility3.readthedocs.io/en/latest/"
      },
      {
        "label": "Volatility 3 on GitHub (install and symbol tables)",
        "url": "https://github.com/volatilityfoundation/volatility3"
      },
      {
        "label": "Volatility Foundation memory samples list",
        "url": "https://github.com/volatilityfoundation/volatility/wiki/Memory-Samples"
      }
    ]
  },
  {
    "id": "lab-disk-forensics",
    "title": "Image a drive, keep chain of custody and recover a deleted file with Autopsy",
    "track": "Blue team",
    "level": "Intermediate",
    "minutes": 240,
    "cost": "Free",
    "summary": "Create a small evidence disk and plant files, image it with dc3dd behind a software write-block, verify SHA-256 hashes, fill in a chain-of-custody form, recover a deleted file with Sleuth Kit and Autopsy, build a timeline and write findings, including why order of volatility matters.",
    "realWorld": "Forensic analysts and incident responders image drives before analysis so evidence stays unchanged and defensible. Hashes, write-blocking and chain of custody decide whether findings hold up with HR, legal or a court, and Autopsy is the most widely used free forensic suite.",
    "youWillNeed": [
      "Your Ubuntu VM from lab-home-lab (for imaging and Sleuth Kit)",
      "Your Windows lab VM for Autopsy (Windows installer from autopsy.com), with 10 GB free disk",
      "Optional: FTK Imager (free from Exterro) as an alternative imager on Windows"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Use a small virtual disk you create, or a spare USB stick with nothing you need on it; this lab formats it. Double-check device names with lsblk before every command that writes, because dd-family tools overwrite whatever you point them at.",
    "steps": [
      {
        "title": "Attach a small evidence disk",
        "body": "With the Ubuntu VM powered off, open Settings > Storage, select the SATA controller, click Add Hard Disk > Create, and make a 256 MB VDI named evidence-usb001. Boot the VM and identify the new disk. (Using a real USB stick instead? Pass it through with Devices > USB and it appears the same way.)",
        "cmd": "lsblk -o NAME,SIZE,TYPE,MODEL,SERIAL",
        "check": "A new 256M disk appears, usually sdb. Use your actual name everywhere below if it differs."
      },
      {
        "title": "Plant evidence and delete a file",
        "body": "Partition and format the disk as FAT32 (common on USB sticks), write a few files, then delete one. Deleting on FAT marks directory entries unused but leaves the data until overwritten, which is why recovery works.",
        "cmd": "sudo apt install -y parted dosfstools\nsudo parted /dev/sdb --script mklabel msdos mkpart primary fat32 1MiB 100%\nsudo mkfs.vfat -F 32 -n EVIDENCE /dev/sdb1\nsudo mkdir -p /mnt/usb && sudo mount /dev/sdb1 /mnt/usb\necho 'Project Falcon merger plan - lab test document' | sudo tee /mnt/usb/falcon-plan.txt\necho 'grocery list: coffee, bread' | sudo tee /mnt/usb/notes.txt\nsudo cp /etc/os-release /mnt/usb/os-release.txt\nsync && sleep 60\nsudo rm /mnt/usb/falcon-plan.txt && sync\nsudo umount /mnt/usb",
        "check": "ls /mnt/usb before unmounting showed notes.txt but not falcon-plan.txt."
      },
      {
        "title": "Open the chain-of-custody form",
        "body": "Start the form before you touch the evidence, and update it at every hand-off. Fill in what you know now; you'll add hashes in the next steps.",
        "cmd": "CHAIN OF CUSTODY - Case 2026-001 (lab training)\nItem #: 001    Description: 256 MB virtual disk 'EVIDENCE' (VirtualBox VDI attached as /dev/sdb)\nMake/model/serial: VirtualBox HARDDISK / <from: sudo hdparm -I /dev/sdb or lsblk -o NAME,SERIAL,SIZE>\nCollected by: <name>   Date/time (UTC): <...>   Location: <home lab>\nReason: <training: imaging and deleted-file recovery>\nAcquisition: dc3dd, software write-block (blockdev --setro)   Image file: usb001.dd\nSource SHA-256: <...>   Image SHA-256: <...>   Match: Yes/No\nTransfers:\n| # | Date/time (UTC) | Released by | Received by | Purpose | Hash verified? |\n|---|---|---|---|---|---|\n| 1 | ... | ... | ... | Copy to Windows analysis VM for Autopsy | Yes |",
        "check": "Item, collector, time (UTC) and reason are filled in."
      },
      {
        "title": "Apply a software write-block",
        "body": "In the field you'd use a hardware write blocker. Here, mark the block devices read-only so nothing on Ubuntu can change them, and confirm nothing auto-mounted.",
        "cmd": "sudo blockdev --setro /dev/sdb\nsudo blockdev --setro /dev/sdb1\nsudo blockdev --getro /dev/sdb\nfindmnt /dev/sdb1 || echo 'not mounted'",
        "check": "getro prints 1 and the partition is not mounted."
      },
      {
        "title": "Hash the source",
        "body": "Hash the whole physical device, not just the partition, because you're going to image the whole device.",
        "cmd": "sudo sha256sum /dev/sdb | tee ~/source-usb001.sha256",
        "check": "A 64-character SHA-256 hash is saved."
      },
      {
        "title": "Create the forensic image with dc3dd",
        "body": "dc3dd is a forensic version of dd that hashes while it copies and logs everything. hof= hashes the output file after writing so you get both values in one log. (dd equivalent: sudo dd if=/dev/sdb of=/cases/case001/usb001.dd bs=4M conv=noerror,sync status=progress.)",
        "cmd": "sudo apt install -y dc3dd\nsudo mkdir -p /cases/case001\nsudo dc3dd if=/dev/sdb hof=/cases/case001/usb001.dd hash=sha256 log=/cases/case001/usb001-dc3dd.log\nsudo cat /cases/case001/usb001-dc3dd.log",
        "check": "The log shows the input and output SHA-256 values and says they match."
      },
      {
        "title": "Verify and protect the image",
        "body": "Recompute the image hash independently, compare it with the source hash from step 5, and make the image read-only. All analysis happens on copies.",
        "cmd": "sudo sha256sum /cases/case001/usb001.dd\ncat ~/source-usb001.sha256\nsudo chmod 444 /cases/case001/usb001.dd",
        "check": "The two hashes are identical; record both in the chain-of-custody form."
      },
      {
        "title": "Explore and recover with The Sleuth Kit",
        "body": "mmls shows partitions and their start sector; fls lists files, and -d shows only deleted ones; icat pulls a file's content by its metadata address.",
        "cmd": "sudo apt install -y sleuthkit\nmmls /cases/case001/usb001.dd\nfls -o 2048 -r -d /cases/case001/usb001.dd\nicat -o 2048 /cases/case001/usb001.dd <address from fls> > ~/recovered-falcon-plan.txt\ncat ~/recovered-falcon-plan.txt",
        "check": "fls lists falcon-plan.txt (the first character of its FAT short name may be shown as _) and the recovered file shows the original text."
      },
      {
        "title": "Build a filesystem timeline",
        "body": "A timeline orders every file's timestamps so you can see what happened when. FAT stores times in local time with 2-second resolution and has no change-time, a detail you should mention in findings.",
        "cmd": "fls -o 2048 -r -m / /cases/case001/usb001.dd > ~/body.txt\nmactime -b ~/body.txt -d > ~/timeline.csv\ncolumn -s, -t < ~/timeline.csv | head -30",
        "check": "The timeline shows falcon-plan.txt created, then marked deleted about a minute later."
      },
      {
        "title": "Move the image to the Autopsy workstation",
        "body": "Install Autopsy on the Windows VM from autopsy.com (take the current version from the download page). Copy the image over and verify its hash; add a transfer line to the chain-of-custody form.",
        "cmd": "scp <user>@192.168.56.10:/cases/case001/usb001.dd C:\\Cases\\case001\\\nGet-FileHash C:\\Cases\\case001\\usb001.dd -Algorithm SHA256",
        "check": "The hash matches the source hash."
      },
      {
        "title": "Create an Autopsy case and add the image",
        "body": "In Autopsy: New Case > name 'Case 2026-001' > Add Data Source > Disk Image or VM File > select usb001.dd. Keep the default ingest modules (File Type Identification, Recent Activity, Hash Lookup, Keyword Search and others) and let ingest finish.",
        "check": "The data source tree shows the volume and its files."
      },
      {
        "title": "Recover the deleted file in Autopsy",
        "body": "Open Views > Deleted Files > File System. Select falcon-plan.txt, review its content in the Text tab and metadata in File Metadata, then right-click > Extract File(s). Hash the extracted file and tag it as Notable.",
        "cmd": "Get-FileHash <extracted path>\\falcon-plan.txt -Algorithm SHA256",
        "check": "The extracted file contains the planted text and is tagged in Autopsy."
      },
      {
        "title": "Review Autopsy's timeline and write findings",
        "body": "Open Tools > Timeline and find the create and delete activity. Write the findings: what was examined, how it was preserved, what was found (with file names, timestamps and hashes) and what can and can't be concluded. Finish with a short explanation of order of volatility (RFC 3227): capture registers/cache, then memory and network state, then temporary files, then disk, then remote logs and archival media, because the more volatile data disappears first.",
        "check": "Your findings reference the image hash and cite each timestamp's source."
      }
    ],
    "verify": [
      "Source hash, dc3dd output hash and the hash on the Windows VM are identical.",
      "The chain-of-custody form records acquisition and the transfer to the Windows VM.",
      "You recovered falcon-plan.txt with both Sleuth Kit and Autopsy.",
      "Your findings include a timeline and an order-of-volatility explanation."
    ],
    "deliverable": "A forensic report: case summary, evidence description, acquisition method with hashes, the completed chain-of-custody form, tools and versions, findings with timeline excerpts and a screenshot of the recovered file in Autopsy, limitations (FAT timestamps, lab write-blocking) and the order-of-volatility note.",
    "resume": "Acquired a forensic image with dc3dd behind a write-block, verified integrity with SHA-256, maintained chain of custody, and recovered a deleted file and built a timeline with The Sleuth Kit and Autopsy.",
    "interview": [
      "Why hash evidence before and after imaging? — Matching hashes prove the image is an exact copy and that the evidence hasn't changed, which makes findings defensible.",
      "What is order of volatility? — Collect the most short-lived data first: CPU state and memory before disk, disk before logs and backups, because volatile data is lost first (RFC 3227).",
      "How can a deleted file be recovered? — Deletion usually only marks the directory entry and clusters as free; until they're overwritten, tools can read the data from unallocated space or the old metadata."
    ],
    "cleanup": [
      "Undo the write-block (sudo blockdev --setrw /dev/sdb), shut down the VM and remove the evidence VDI in Settings > Storage.",
      "Delete the Autopsy case and image copies when your report is done."
    ],
    "links": [
      {
        "label": "Autopsy user documentation",
        "url": "https://sleuthkit.org/autopsy/docs/user-docs/latest/"
      },
      {
        "label": "NIST SP 800-86: Integrating Forensic Techniques into Incident Response",
        "url": "https://csrc.nist.gov/pubs/sp/800/86/final"
      },
      {
        "label": "RFC 3227: Guidelines for Evidence Collection and Archiving",
        "url": "https://www.rfc-editor.org/rfc/rfc3227"
      }
    ]
  },
  {
    "id": "lab-threat-intel",
    "title": "Build a Salt Typhoon threat intel brief with ATT&CK Navigator",
    "track": "Blue team",
    "level": "Intermediate",
    "minutes": 240,
    "cost": "Free",
    "summary": "Read the CISA/FBI joint advisory on PRC state-sponsored (Salt Typhoon) compromises of telecom and other networks, map its TTPs to MITRE ATT&CK in an ATT&CK Navigator layer, list IOCs and which of your lab logs would show them, and write a one-page intel brief with recommended defenses for a manager.",
    "realWorld": "Cyber threat intelligence analysts turn long government advisories into short, actionable briefs: which techniques matter to us, can we detect them, what should we fix first. ATT&CK Navigator layers are the common way to show threat coverage and detection gaps.",
    "youWillNeed": [
      "The CISA-led joint advisory on PRC state-sponsored actors compromising networks worldwide (AA25-239A, August 2025) and CISA's December 2024 hardening guidance for communications infrastructure",
      "A web browser for ATT&CK Navigator (hosted by MITRE, no install needed)",
      "Your notes from the Salt Typhoon warm-up in class, and your lab SIEM (lab-splunk-siem or lab-wazuh) for the coverage mapping"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Treat IOCs as data: never visit listed IPs or domains, and defang them in everything you write. Hunting happens only in your own lab logs.",
    "steps": [
      {
        "title": "Read the advisory with a purpose",
        "body": "Open the joint advisory on cisa.gov (search the Cybersecurity Advisories page for 'Salt Typhoon' if the link has moved, and note whether a newer update exists). Read it once end to end, then again with a highlighter for three things: techniques (what they do), IOCs (what you can search for) and mitigations (what to fix).",
        "check": "You have notes under TTPs, IOCs and mitigations, with page or section references."
      },
      {
        "title": "Record source, date and confidence",
        "body": "Intel is only as good as its source. Note the advisory number, publication and last-updated dates, co-sealing agencies, the aliases it lists for the actor, and your confidence level with a reason.",
        "check": "A source table: document, date, authoring agencies, aliases, confidence."
      },
      {
        "title": "Check the ATT&CK group page",
        "body": "Search attack.mitre.org for 'Salt Typhoon' and open its group page. Compare MITRE's listed techniques with the advisory's; MITRE may lag behind newer reporting.",
        "check": "You have the group ID and a list of techniques MITRE attributes to the group."
      },
      {
        "title": "Build a TTP table",
        "body": "For each behavior in the advisory, write the tactic, technique ID and a quote or paraphrase with section reference. Use the advisory's own ATT&CK appendix where it has one, and verify each ID on attack.mitre.org. Typical examples to check: T1190 Exploit Public-Facing Application (edge-device CVEs), T1098 Account Manipulation, T1136 Create Account, T1572 Protocol Tunneling (GRE/IPsec), T1040 Network Sniffing (packet capture on routers), T1602.002 Network Device Configuration Dump, T1562 Impair Defenses.",
        "check": "At least 10 techniques, each with evidence from the advisory."
      },
      {
        "title": "Create an ATT&CK Navigator layer",
        "body": "Open ATT&CK Navigator, choose Create New Layer > Enterprise. Name it 'Salt Typhoon - <date>'. Search for each technique from your table, select it, set a score (for example 1) and a color, and add a comment with the advisory section.",
        "check": "All your techniques are highlighted on the matrix."
      },
      {
        "title": "Add a second layer for your detection coverage",
        "body": "Create another layer named 'Home SOC coverage' and score each of the same techniques: 2 = you have a working detection, 1 = partial (logs exist but no alert), 0 = gap. Then use 'Create Layer from other layers' with an expression such as a - b to show where the threat outpaces your coverage.",
        "check": "The combined layer shows gaps clearly (most network-device techniques will be gaps in a home lab)."
      },
      {
        "title": "Export the layers",
        "body": "Use the layer's download buttons to save it as JSON (re-importable) and as SVG or Excel (for the report).",
        "check": "You have salt-typhoon-layer.json and an image of the matrix."
      },
      {
        "title": "List and defang the IOCs",
        "body": "Copy the advisory's IOCs into a table with type, value (defanged), first/last seen if given, and the advisory's caveats. Many are VPS or VPN IPs that go stale fast; note that TTPs are more durable than IOCs (the Pyramid of Pain).",
        "cmd": "sed -e 's/\\./[.]/g' -e 's/^http/hxxp/' iocs-raw.txt > iocs-defanged.txt\nwc -l iocs-defanged.txt",
        "check": "A defanged IOC table with a caveat column."
      },
      {
        "title": "Map IOCs and TTPs to your lab logs",
        "body": "For each item, name the data source that would show it and whether your lab has it. Examples: new local accounts or admin group changes -> Windows 4720/4732 in Splunk or Wazuh (covered); SSH brute force -> auth.log / Wazuh 5712 (covered); SSH listening on an unusual port -> host listening-port checks (partial); router config changes, ACL edits, GRE tunnels and on-device packet capture -> network device syslog, AAA/TACACS+ accounting and NetFlow (gap: no network devices logging to your SIEM).",
        "check": "A table: item -> data source -> lab log/search -> covered/partial/gap."
      },
      {
        "title": "Hunt in your lab",
        "body": "Run an IOC sweep across your SIEM (there should be no hits; record that) and a TTP hunt for unexpected listeners and accounts on your hosts.",
        "cmd": "# Splunk (replace with a few advisory IPs, un-defanged only inside the search):\nindex=* (\"<ioc ip 1>\" OR \"<ioc ip 2>\") | stats count BY index, sourcetype, host\n# Linux hosts:\nsudo ss -tlnp | grep -i ssh\nsudo grep -iE '^\\s*Port' /etc/ssh/sshd_config /etc/ssh/sshd_config.d/*.conf\n# Windows (PowerShell):\nGet-LocalGroupMember Administrators\nGet-NetTCPConnection -State Listen | Sort-Object LocalPort | Select-Object LocalAddress, LocalPort, OwningProcess",
        "check": "You recorded the searches, time range and results (expected: no IOC hits, only known listeners and admins)."
      },
      {
        "title": "Pick the recommended defenses",
        "body": "From the advisory's mitigations, choose the 5–7 that matter most for a typical organization and rank them. Common ones: patch or replace the edge devices and CVEs it names (check each on the KEV catalog), disable unused services (for example Cisco Smart Install), restrict management interfaces to a dedicated network, use SSHv2 and SNMPv3 only, centralize and alert on config changes and new accounts, and monitor for unexpected tunnels.",
        "check": "A ranked list, each with an owner role and a rough effort."
      },
      {
        "title": "Write the one-page brief",
        "body": "Write for a manager: bottom line up front, plain language, and actions they can approve. Keep technical detail for an appendix (TTP table, layer image, IOC list).",
        "cmd": "INTEL BRIEF - Salt Typhoon (PRC state-sponsored)          TLP:CLEAR     Date: <...>   Analyst: <you>\nBLUF: <2 sentences: who, what they do, what it means for us, what we should do first>\nWho: PRC state-sponsored actor tracked as Salt Typhoon (aliases per the advisory). Targets: telecoms, government, transport, lodging, military networks worldwide.\nWhat: <3 bullets: initial access via known edge-device CVEs; persistence by changing router configs/ACLs and adding accounts or tunnels; collection of configs and traffic>\nRelevance to us: <exposed edge devices we own, telecom providers we depend on>\nConfidence: <High/Moderate/Low and why (government joint advisory, multiple sources)>\nRecommended actions (prioritized, owner, due):\n 1. Patch or mitigate the edge-device CVEs listed in the advisory; check each against CISA KEV\n 2. Restrict and log management-plane access (no Telnet/HTTP, SSH v2 only, jump hosts, AAA/TACACS+ logging)\n 3. Alert on config changes, new local accounts, new ACL entries and unexpected tunnels (GRE/IPsec)\n 4. Hunt for the advisory's IOCs and TTPs over the last 90 days of logs\nDetection coverage: <from your mapping table: covered / partial / gap>\nSources: CISA-led joint advisory <number and date>; MITRE ATT&CK group page; CISA/FBI telecom hardening guidance",
        "check": "The brief fits on one page and every claim traces to a source."
      }
    ],
    "verify": [
      "Your TTP table has at least 10 techniques, each tied to an advisory section and verified on attack.mitre.org.",
      "You have exported Navigator layers for the threat and for your coverage, plus a combined gap view.",
      "Every IOC is defanged and mapped to a data source with covered/partial/gap status.",
      "The brief is one page with a BLUF, confidence, prioritized actions and sources."
    ],
    "deliverable": "The one-page brief as PDF, an appendix with the TTP table, IOC table and coverage mapping, the Navigator layer JSON files (good to publish on GitHub) and an image of the gap layer.",
    "resume": "Produced a threat intelligence brief on Salt Typhoon from a CISA/FBI joint advisory, mapped its TTPs to MITRE ATT&CK in Navigator layers, measured detection coverage against a home SOC and prioritized defensive recommendations for management.",
    "interview": [
      "What is the difference between IOCs and TTPs, and which is more useful? — IOCs are specific artifacts like IPs and hashes that change easily; TTPs describe behavior and are harder for attackers to change, so they make more durable detections.",
      "How do you make threat intel actionable? — Tie it to our assets and telemetry: which techniques apply, whether we can detect them, and a prioritized list of fixes with owners.",
      "What did Salt Typhoon mainly target, and how? — Telecommunications and other networks' edge and backbone devices, often via known, unpatched vulnerabilities, then persisting by changing device configurations to collect data."
    ],
    "links": [
      {
        "label": "CISA AA25-239A: Countering Chinese State-Sponsored Actors Compromise of Networks Worldwide",
        "url": "https://www.cisa.gov/news-events/cybersecurity-advisories/aa25-239a"
      },
      {
        "label": "MITRE ATT&CK Navigator",
        "url": "https://mitre-attack.github.io/attack-navigator/"
      },
      {
        "label": "CISA: Enhanced Visibility and Hardening Guidance for Communications Infrastructure",
        "url": "https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure"
      }
    ]
  },
  {
    "id": "lab-cyberchef-decoding",
    "title": "Decode obfuscated data with CyberChef",
    "track": "Blue team",
    "level": "Beginner",
    "minutes": 90,
    "cost": "Free",
    "summary": "Run CyberChef offline and decode samples you create yourself: Base64, hex, URL encoding, PowerShell UTF-16LE, gzip plus Base64 and XOR with a known key, then extract and defang URLs and IPs, save a reusable recipe and relate it to triaging suspicious scripts.",
    "realWorld": "Obfuscated command lines and scripts show up in almost every malware alert: Base64 PowerShell, gzip-compressed payloads, XOR-encoded strings. SOC analysts use CyberChef daily to peel the layers off quickly and pull out URLs and IPs for blocking.",
    "youWillNeed": [
      "CyberChef offline build from its official GitHub releases page",
      "Your Ubuntu VM (to generate samples with base64, gzip, xxd and Python)",
      "Optionally your Windows VM for the PowerShell sample"
    ],
    "requires": [
      "lab-home-lab"
    ],
    "safety": "Every sample in this lab is harmless text you create. The URLs use reserved example domains and documentation IP ranges. When you later decode real suspicious scripts, decode only; never run the output, and use the offline copy so sensitive data isn't pasted into a website.",
    "steps": [
      {
        "title": "Download and open CyberChef offline",
        "body": "On the CyberChef GitHub Releases page, download the current CyberChef_v<version>.zip, unzip it and open the CyberChef_v<version>.html file in your browser. The offline build runs entirely in your browser with no server.",
        "cmd": "mkdir -p ~/cyberchef && cd ~/cyberchef\nunzip ~/Downloads/CyberChef_v*.zip\nls *.html",
        "check": "CyberChef opens from a file:// path with Operations, Recipe, Input and Output panes."
      },
      {
        "title": "Create your sample strings",
        "body": "Make every sample yourself so you know exactly what's inside. Keep them in samples.txt.",
        "cmd": "cd ~/cyberchef\necho -n 'Write-Output \"hello from the SOC lab\"' | base64 > samples.txt\necho -n 'user=labuser;token=not-a-real-token' | xxd -p >> samples.txt\npython3 -c \"import urllib.parse;print(urllib.parse.quote('https://www.example.com/login?next=/admin&msg=hi there', safe=''))\" >> samples.txt\ncat samples.txt",
        "check": "samples.txt has a Base64 line, a hex line and a percent-encoded URL."
      },
      {
        "title": "Decode Base64",
        "body": "Paste the first line into Input and drag From Base64 into the Recipe. Then try the Magic operation on the same input to see how CyberChef guesses encodings; useful when you don't know what you're looking at.",
        "check": "Output shows Write-Output \"hello from the SOC lab\"."
      },
      {
        "title": "Decode hex and URL encoding",
        "body": "Clear the recipe. Decode the hex line with From Hex, then the third line with URL Decode.",
        "check": "You see user=labuser;token=not-a-real-token and the readable example.com URL."
      },
      {
        "title": "Decode a PowerShell -EncodedCommand",
        "body": "PowerShell encodes commands as Base64 of UTF-16LE text, so plain From Base64 shows dots or gaps between letters. Add Decode text with encoding UTF-16LE (1200) after From Base64. (Or use Remove null bytes as a shortcut.)",
        "cmd": "python3 -c 'import base64; print(base64.b64encode(\"Write-Output hello; Invoke-WebRequest http://192.0.2.10/lab.txt -UseBasicParsing\".encode(\"utf-16-le\")).decode())'",
        "check": "Recipe From Base64 > Decode text (UTF-16LE) shows the readable command, which only fetches a documentation-range IP."
      },
      {
        "title": "Decode gzip plus Base64",
        "body": "Attackers compress payloads before Base64 to shrink and hide them. A Base64 string starting with H4sI is a strong hint of gzip.",
        "cmd": "echo 'lab stage 2: download http://www.example.com/benign.txt and beacon to 198.51.100.7' | gzip -c | base64 -w0; echo",
        "check": "Recipe From Base64 > Gunzip shows the stage-2 text."
      },
      {
        "title": "Decode XOR with a known key",
        "body": "XOR with a short key is a cheap way to hide strings. Create a sample XOR-ed with the key 'lab', then decode with From Base64 > XOR (key lab, UTF8 key format). Try a wrong key to see garbage.",
        "cmd": "python3 -c \"import base64;k=b'lab';d=b'config: c2=http://www.example.org/lab 203.0.113.9';print(base64.b64encode(bytes(c^k[i%len(k)] for i,c in enumerate(d))).decode())\"",
        "check": "With key lab the output reads config: c2=http://www.example.org/lab 203.0.113.9."
      },
      {
        "title": "Extract IOCs",
        "body": "Take the decoded output from the gzip or XOR sample and add Extract URLs and, in a second tab or after a Fork, Extract IP addresses (IPv4). Tick 'Display total' to count them.",
        "check": "You get the example URLs and the documentation-range IPs (192.0.2.x, 198.51.100.x, 203.0.113.x) as clean lists."
      },
      {
        "title": "Defang the IOCs",
        "body": "Add Defang URL after Extract URLs, and Defang IP Addresses after Extract IP addresses, so the output is safe to paste into a ticket.",
        "check": "URLs start with hxxp and dots appear as [.] (exact brackets depend on the operation's options), and 198.51.100.7 becomes 198[.]51[.]100[.]7."
      },
      {
        "title": "Build a layered sample and a one-shot recipe",
        "body": "Real payloads stack layers. Create one that is XOR-ed, then gzipped, then Base64-encoded, and build a recipe that reverses all of it and ends with extracted, defanged URLs.",
        "cmd": "python3 -c \"import base64,gzip;k=b'lab';d=b'Invoke-WebRequest http://www.example.net/lab-stage3.txt # benign lab sample';x=bytes(c^k[i%len(k)] for i,c in enumerate(d));print(base64.b64encode(gzip.compress(x)).decode())\"",
        "check": "Recipe From Base64 > Gunzip > XOR (lab) > Extract URLs > Defang URL outputs a defanged www[.]example[.]net/lab-stage3 URL."
      },
      {
        "title": "Save and reload the recipe",
        "body": "Click Save recipe (the save icon above the Recipe pane), give it a name, and copy both the Chef format and the JSON version into ~/cyberchef/recipes/layered-decode.txt. Clear the recipe, then use Load recipe to bring it back. Recipes are how teams share triage steps.",
        "cmd": "mkdir -p ~/cyberchef/recipes\nnano ~/cyberchef/recipes/layered-decode.txt",
        "check": "Loading the saved recipe decodes the layered sample in one click."
      },
      {
        "title": "Relate it to SOC triage",
        "body": "Write a short triage note as if the layered sample came from a Sysmon Event ID 1 command line or a PowerShell 4104 script-block log: where it was found, each decoding layer, the extracted IOCs (defanged), and what you would check next (did the host resolve or connect to them, which user and parent process launched it).",
        "check": "Your note lists every layer in order and the next investigative steps."
      }
    ],
    "verify": [
      "You decoded each sample type: Base64, hex, URL, UTF-16LE PowerShell, gzip plus Base64 and XOR.",
      "Your saved recipe decodes the layered sample to a defanged URL in one run.",
      "Your IOC output is defanged and uses only reserved example domains and documentation IP ranges."
    ],
    "deliverable": "A short 'decoding cheat sheet' write-up: each encoding, how to recognize it (character set, H4sI for gzip, dots between letters for UTF-16LE), the CyberChef operations, screenshots, your saved recipe text and the triage note for the layered sample.",
    "resume": "Built reusable CyberChef recipes to deobfuscate multi-layer payloads (Base64, gzip, XOR, UTF-16LE PowerShell) and automatically extract and defang IOCs, cutting manual script triage to a single step.",
    "interview": [
      "You see powershell -enc followed by a long string. What do you do? — Decode it as Base64 then UTF-16LE (in CyberChef, offline), read the script without running it, extract IOCs and check the parent process, user and follow-on network activity.",
      "How can you spot gzip-compressed data inside Base64? — Gzip starts with bytes 1F 8B, which encode to H4sI at the start of the Base64 string.",
      "Why defang IOCs? — So URLs and IPs in tickets, chat and reports aren't clickable or auto-fetched, which prevents accidental visits and link previews."
    ],
    "links": [
      {
        "label": "CyberChef on GitHub (releases for the offline build)",
        "url": "https://github.com/gchq/CyberChef"
      },
      {
        "label": "CyberChef (hosted)",
        "url": "https://gchq.github.io/CyberChef/"
      }
    ]
  }
]);
