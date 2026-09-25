/* Hands-on exercises for CompTIA Server+ (SK0-005). Checked by tools/check-data.js (and tools/check-python.js for Python). */
CertHub.addHandson("server-plus", {
  tables: {},
  items: [
    {
      id: "sp-asset-baseline", kind: "shell", d: 2,
      title: "Record a server baseline for the asset inventory",
      prompt: "Before this Linux server goes into production, document a simple baseline in `/srv/inventory/baseline.txt`.\n\nWrite the output of `hostname` to the file, then append the output of `uname -r` (the kernel release) and of `df -h` (disk usage).",
      hint: "Redirect the first command with > to create the file, and use >> for each command after it.",
      explain: "A baseline records how a server looked when it was healthy: its name, OS or kernel version, disk use and so on. Later you compare against it to spot drift or find the root cause of a problem. Server+ ties baselines to asset management and documentation, alongside labels, inventory records and change management.",
      setup: { cwd: "/root", user: "root", hostname: "db01", dirs: ["/srv/inventory"] },
      checks: [
        { label: "The baseline names the host", type: "content", path: "/srv/inventory/baseline.txt", includes: "db01" },
        { label: "The baseline records the kernel release", type: "content", path: "/srv/inventory/baseline.txt", includes: "5.14.0-lab" },
        { label: "The baseline includes disk usage", type: "content", path: "/srv/inventory/baseline.txt", includes: "Mounted on" }
      ],
      solution: ["hostname > /srv/inventory/baseline.txt", "uname -r >> /srv/inventory/baseline.txt", "df -h >> /srv/inventory/baseline.txt", "cat /srv/inventory/baseline.txt"]
    },
    {
      id: "sp-ntp-client", kind: "shell", d: 2,
      title: "Configure NTP on a server",
      prompt: "Accurate time matters for logs, authentication and certificates. Point this server at the internal time source `ntp1.corp.example.com`.\n\nAppend `server ntp1.corp.example.com iburst` to `/etc/chrony.conf`, then restart `chronyd` and enable it at boot.",
      hint: "Append with >> so the existing settings stay. Then use systemctl to restart and enable the service.",
      explain: "NTP is one of the core network services in Server+. Clock skew breaks Kerberos (which allows only a few minutes of drift), makes TLS certificates look not yet valid or expired, and scrambles the order of events across log files. chronyd reads its sources from /etc/chrony.conf and must be restarted to pick up changes and enabled to survive reboots.",
      setup: { cwd: "/root", user: "root", files: { "/etc/chrony.conf": "driftfile /var/lib/chrony/drift\nrtcsync\n" }, services: { chronyd: "inactive" } },
      checks: [
        { label: "chrony.conf names the internal NTP server", type: "content", path: "/etc/chrony.conf", includes: "server ntp1.corp.example.com iburst" },
        { label: "chronyd is running", type: "service", service: "chronyd", active: true },
        { label: "chronyd is enabled at boot", type: "service", service: "chronyd", enabled: true }
      ],
      solution: ["echo \"server ntp1.corp.example.com iburst\" >> /etc/chrony.conf", "systemctl restart chronyd", "systemctl enable chronyd"]
    },
    {
      id: "sp-least-privilege", kind: "shell", d: 3,
      title: "Apply least privilege with a role group",
      prompt: "Only database administrators should reach `/srv/db-exports`.\n\n1. Create the group `dbadmins` and add the existing user `lena` to it (keep her other groups).\n2. Make `/srv/db-exports` owned by `root` with group `dbadmins`.\n3. Set its mode to `770` so others have no access.",
      hint: "Grant access to a group that represents the role, not to individual users. usermod needs the append option to keep existing groups.",
      explain: "Role-based access control assigns permissions to a group that matches a job role, then adds people to the group. Removing access later is one command, and nobody gets more than they need. Mode 770 gives the owner and the role group full access and everyone else nothing, which is least privilege in practice for Server+ identity and access management questions.",
      setup: { cwd: "/root", user: "root", users: { lena: { groups: ["staff"] } }, groups: ["staff"], dirs: ["/srv/db-exports"], files: { "/srv/db-exports/customers-2026-09.csv": "id,name\n1,Contoso\n" }, modes: { "/srv/db-exports": "777" }, owners: { "/srv/db-exports": "root:root" } },
      checks: [
        { label: "lena is in dbadmins", type: "ingroup", user: "lena", group: "dbadmins" },
        { label: "lena is still in staff", type: "ingroup", user: "lena", group: "staff" },
        { label: "/srv/db-exports has group dbadmins", type: "group", path: "/srv/db-exports", group: "dbadmins" },
        { label: "/srv/db-exports has mode 770", type: "mode", path: "/srv/db-exports", mode: "770" }
      ],
      solution: ["groupadd dbadmins", "usermod -aG dbadmins lena", "chown root:dbadmins /srv/db-exports", "chmod 770 /srv/db-exports", "ls -ld /srv/db-exports"]
    },
    {
      id: "sp-harden-services", kind: "shell", d: 3,
      title: "Harden a server by removing unneeded services",
      prompt: "This file server was built from a generic image. `telnet` and `cups` (printing) are running and enabled, but the server's role needs neither. `sshd` is the approved admin protocol.\n\nStop and disable `telnet` and `cups`, and confirm `sshd` is still running and enabled.",
      hint: "systemctl can disable a unit and stop it in one step. Check the result with systemctl status or list-units.",
      explain: "Server hardening starts by turning off services the role does not need, since every listening service is attack surface and needs patching. Telnet sends credentials in cleartext, so SSH replaces it as the secure admin protocol. systemctl disable --now both stops the service and keeps it from returning at the next boot.",
      setup: { cwd: "/root", user: "root", services: { telnet: "enabled", cups: "enabled", sshd: "enabled" } },
      checks: [
        { label: "telnet is stopped and disabled", type: "service", service: "telnet", active: false, enabled: false },
        { label: "cups is stopped and disabled", type: "service", service: "cups", active: false, enabled: false },
        { label: "sshd is still running and enabled", type: "service", service: "sshd", active: true, enabled: true }
      ],
      solution: ["systemctl disable --now telnet", "systemctl disable --now cups", "systemctl status sshd"]
    },
    {
      id: "sp-full-backup", kind: "shell", d: 3,
      title: "Take a quick full copy before a change",
      prompt: "You are about to update the web application in `/srv/www`. Take a full copy first so you can roll back.\n\nCreate `/backup` and copy the whole `/srv/www` directory to `/backup/www-full`. Then confirm the copy with `ls`.",
      hint: "cp needs its recursive option to copy a directory and everything inside it.",
      explain: "cp -r copies a directory tree. A copy on the same server protects against a bad change but not against disk failure or ransomware, which is why the 3-2-1 rule asks for three copies on two media types with one off-site. Server+ also expects you to know full, incremental and differential backups and to test restores, since an untested backup is only a hope.",
      setup: { cwd: "/root", user: "root", files: { "/srv/www/index.html": "<h1>Store</h1>\n", "/srv/www/css/site.css": "body { margin: 0; }\n", "/srv/www/app.conf": "version=4.1\n" } },
      checks: [
        { label: "/backup/www-full exists", type: "dir", path: "/backup/www-full" },
        { label: "index.html was copied", type: "content", path: "/backup/www-full/index.html", includes: "Store" },
        { label: "The css subdirectory was copied", type: "exists", path: "/backup/www-full/css/site.css" },
        { label: "The original stays in place", type: "exists", path: "/srv/www/index.html" }
      ],
      solution: ["mkdir /backup", "cp -r /srv/www /backup/www-full", "ls /backup/www-full"]
    },
    {
      id: "sp-service-wont-start", kind: "shell", d: 4,
      title: "Troubleshoot a web service that fails on file access",
      prompt: "After a content update, users get errors and `httpd` is stopped. Follow the troubleshooting method: gather information first.\n\nRead `/var/log/httpd/error_log` to find the cause, correct the file so the service account can read it (mode `644`), then restart `httpd`.",
      hint: "Look at the end of the error log and at the permissions of the file it names. The web server runs as a non-root account, so others need read access.",
      explain: "The CompTIA method is identify the problem, form a theory, test it, plan, implement, verify and document. The log names the file and ls -l shows mode 600, which only root can read, so the theory is confirmed before anything changes. chmod 644 fixes it, restarting httpd and checking its status verifies the fix, and the last step is writing it down.",
      setup: { cwd: "/root", user: "root", users: { apache: {} }, files: { "/var/log/httpd/error_log": "[Fri Sep 25 11:58:02 2026] [notice] Apache configured, resuming normal operations\n[Fri Sep 25 11:59:40 2026] [error] AH00132: file permissions deny server access: /srv/www/index.html\n[Fri Sep 25 11:59:41 2026] [notice] caught SIGTERM, shutting down\n", "/srv/www/index.html": "<h1>Store</h1>\n" }, modes: { "/srv/www/index.html": "600" }, owners: { "/srv/www/index.html": "root:root" }, services: { httpd: "inactive" } },
      checks: [
        { label: "index.html has mode 644", type: "mode", path: "/srv/www/index.html", mode: "644" },
        { label: "httpd is running", type: "service", service: "httpd", active: true }
      ],
      solution: ["tail -n 5 /var/log/httpd/error_log", "ls -l /srv/www/index.html", "chmod 644 /srv/www/index.html", "systemctl restart httpd", "systemctl status httpd"]
    }
  ]
});
