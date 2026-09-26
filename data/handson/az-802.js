/* Hands-on PowerShell exercises for AZ-802 (Configuring Windows Server Hybrid Advanced Services).
   Checked by tools/check-data.js against the simulator in public/assets/pwsh.js. */
CertHub.addHandson("az-802", {
  tables: {},
  items: [
    {
      id: "az802-enable-aduser", kind: "pwsh", d: 1,
      title: "Re-enable a disabled Active Directory account",
      prompt: "A returning employee, `tjones`, has an Active Directory account that was disabled while they were away.\n\nFirst inspect the account with Get-ADUser, then enable it so the user can sign in again.",
      hint: "Get-ADUser -Identity shows the account. Enable-ADAccount turns a disabled account back on; pass the same identity.",
      explain: "A disabled account still exists with all its group memberships and attributes intact, so re-enabling it is safer and faster than deleting and recreating. Enable-ADAccount flips the userAccountControl disabled flag, while Enable-LocalUser does the same for local SAM accounts. On AZ-802 you are expected to know which cmdlet targets AD versus local accounts.",
      setup: { computer: "DC01", user: "Administrator", adUsers: { tjones: { enabled: false, ou: "OU=Sales", groups: ["Domain Users"] } } },
      checks: [
        { label: "The tjones account is enabled", type: "adUser", sam: "tjones", enabled: true },
        { label: "You inspected the account first with Get-ADUser", type: "ran", includes: "Get-ADUser" }
      ],
      solution: ["Get-ADUser -Identity tjones", "Enable-ADAccount -Identity tjones"]
    },
    {
      id: "az802-new-aduser", kind: "pwsh", d: 1,
      title: "Create and enable a new AD user account",
      prompt: "A new hire named Bao Wong is joining the Sales team. Their sign-in name (SamAccountName) should be `bwong`.\n\nCreate the account with New-ADUser, then enable it so it is ready to use.",
      hint: "New-ADUser -Name sets the display name and -SamAccountName sets the logon name. A new account starts disabled, so follow up with Enable-ADAccount.",
      explain: "New-ADUser creates the object but leaves it disabled until a password is set and the account is enabled, which prevents an unfinished account from being used. Providing an explicit SamAccountName keeps logon names predictable rather than letting them be derived. AZ-802 covers provisioning accounts in a hybrid directory, where these attributes later sync to Entra ID.",
      setup: { computer: "DC01", user: "Administrator", adUsers: {} },
      checks: [
        { label: "The bwong account exists and is enabled", type: "adUser", sam: "bwong", enabled: true },
        { label: "You created it with New-ADUser", type: "ran", includes: "New-ADUser" }
      ],
      solution: ["New-ADUser -Name 'Bao Wong' -SamAccountName bwong", "Enable-ADAccount -Identity bwong"]
    },
    {
      id: "az802-adgroup-member", kind: "pwsh", d: 1,
      title: "Grant access by adding a user to a security group",
      prompt: "User `mlee` needs the same access as the rest of the help desk.\n\nAdd `mlee` to the existing `Helpdesk Operators` group, then confirm the membership with Get-ADGroupMember.",
      hint: "Add-ADGroupMember -Identity names the group and -Members names the user. Get-ADGroupMember lists who is in a group.",
      explain: "Assigning permissions to groups and adding users to those groups (role-based access) scales far better than granting rights to individuals. Add-ADGroupMember changes the group's member attribute, and the user inherits every permission the group holds. Verifying with Get-ADGroupMember is the habit AZ-802 rewards, because a silent membership mistake is a common access problem.",
      setup: { computer: "DC01", user: "Administrator", adUsers: { mlee: { enabled: true, ou: "OU=IT", groups: ["Domain Users"] } }, adGroups: ["Helpdesk Operators"] },
      checks: [
        { label: "mlee is a member of Helpdesk Operators", type: "adGroupMember", group: "Helpdesk Operators", sam: "mlee" },
        { label: "You confirmed membership with Get-ADGroupMember", type: "ran", includes: "Get-ADGroupMember" }
      ],
      solution: ["Add-ADGroupMember -Identity 'Helpdesk Operators' -Members mlee", "Get-ADGroupMember -Identity 'Helpdesk Operators'"]
    },
    {
      id: "az802-install-feature", kind: "pwsh", d: 2,
      title: "Install a server role with Install-WindowsFeature",
      prompt: "This server will host an internal website, so it needs the Web Server (IIS) role.\n\nReview the available features, then install the `Web-Server` role.",
      hint: "Get-WindowsFeature lists roles and their install state. Install-WindowsFeature -Name adds one.",
      explain: "Install-WindowsFeature is the PowerShell equivalent of adding a role in Server Manager, and it is the way to script consistent, repeatable builds across many servers. Checking Get-WindowsFeature first confirms the exact feature name and whether it is already present. On AZ-802 you manage roles this way on both on-premises and Azure-hosted Windows Server instances.",
      setup: { computer: "SRV1", user: "Administrator", features: { "Web-Server": false, "DNS": false, "DHCP": false } },
      checks: [
        { label: "The Web-Server role is installed", type: "feature", name: "Web-Server", installed: true },
        { label: "You reviewed features with Get-WindowsFeature", type: "ran", includes: "Get-WindowsFeature" }
      ],
      solution: ["Get-WindowsFeature", "Install-WindowsFeature -Name Web-Server"]
    },
    {
      id: "az802-service-startup", kind: "pwsh", d: 2,
      title: "Make a service start automatically and run it now",
      prompt: "The `W3SVC` (World Wide Web Publishing) service is stopped and set to start manually, so the site is down and will stay down after a reboot.\n\nSet its startup type to Automatic and start it now.",
      hint: "Set-Service -StartupType Automatic changes the boot behaviour; Start-Service starts it in the current session.",
      explain: "Startup type and current state are separate settings: Set-Service -StartupType Automatic controls what happens at boot, while Start-Service only affects the running session. A service that works until the next reboot usually has the wrong startup type. AZ-802 troubleshooting expects you to fix both so the service survives a restart.",
      setup: { computer: "SRV1", user: "Administrator", services: { W3SVC: { status: "Stopped", startType: "Manual", display: "World Wide Web Publishing Service" } } },
      checks: [
        { label: "W3SVC is running", type: "service", name: "W3SVC", status: "Running" },
        { label: "W3SVC starts automatically at boot", type: "service", name: "W3SVC", startType: "Automatic" }
      ],
      solution: ["Set-Service -Name W3SVC -StartupType Automatic", "Start-Service -Name W3SVC", "Get-Service -Name W3SVC"]
    },
    {
      id: "az802-vm-export-folder", kind: "pwsh", d: 3,
      title: "Prepare a target folder for a virtual machine export",
      prompt: "Before exporting a Hyper-V virtual machine, you need a place to store it.\n\nCreate the folder `C:\\VMExports`, then write a short note to `C:\\VMExports\\readme.txt` describing what the folder is for. The note must mention the word export.",
      hint: "New-Item -ItemType Directory creates the folder. Set-Content -Path ... -Value writes text into a file.",
      explain: "Planning storage before an export prevents a half-finished operation from filling the system drive. New-Item with -ItemType Directory builds the target path, and Set-Content places a readable marker so other admins know the folder's purpose. Managing VM files and their storage locations is part of the AZ-802 virtual machine objective.",
      setup: { computer: "HV01", user: "Administrator" },
      checks: [
        { label: "C:\\VMExports exists as a folder", type: "exists", path: "C:\\VMExports" },
        { label: "The readme explains the export folder", type: "file", path: "C:\\VMExports\\readme.txt", includes: "export" }
      ],
      solution: ["New-Item -Path C:\\VMExports -ItemType Directory", "Set-Content -Path C:\\VMExports\\readme.txt -Value 'Target folder for virtual machine export files'"]
    },
    {
      id: "az802-test-connectivity", kind: "pwsh", d: 4,
      title: "Verify connectivity to a domain controller",
      prompt: "Clients report they cannot authenticate. Before changing anything, confirm the network path to the domain controller.\n\nResolve the name `dc01.corp.local` with Resolve-DnsName, then test whether TCP port 389 (LDAP) is reachable with Test-NetConnection.",
      hint: "Resolve-DnsName -Name checks DNS. Test-NetConnection -ComputerName ... -Port tests a specific TCP port.",
      explain: "Good troubleshooting confirms name resolution and the specific port before touching configuration. Resolve-DnsName shows whether DNS returns the right address, and Test-NetConnection -Port checks that the service port (389 for LDAP) actually answers, which ping alone cannot tell you. This layered check is exactly how AZ-802 frames hybrid connectivity problems.",
      setup: { computer: "SRV1", user: "Administrator", netip: { ip: "10.0.0.20", gateway: "10.0.0.1", dns: "10.0.0.10" } },
      checks: [
        { label: "You resolved the name with Resolve-DnsName", type: "ran", includes: "Resolve-DnsName" },
        { label: "You tested port 389 with Test-NetConnection", type: "ran", includes: "Test-NetConnection" }
      ],
      solution: ["Resolve-DnsName -Name dc01.corp.local", "Test-NetConnection -ComputerName dc01.corp.local -Port 389"]
    },
    {
      id: "az802-share-structure", kind: "pwsh", d: 5,
      title: "Build a departmental folder structure for file shares",
      prompt: "You are setting up file shares for two departments.\n\nCreate the folders `C:\\Shares\\Finance` and `C:\\Shares\\HR`. Both parent and child folders should end up in place.",
      hint: "New-Item -ItemType Directory creates any missing parent folders in the path for you.",
      explain: "New-Item with -ItemType Directory creates the whole path, including the C:\\Shares parent, in one step. Laying out a clean folder hierarchy is the first stage of provisioning SMB file shares, before you set share and NTFS permissions. AZ-802 covers file and storage services, where a tidy structure keeps later permission work straightforward.",
      setup: { computer: "FS01", user: "Administrator" },
      checks: [
        { label: "C:\\Shares\\Finance exists", type: "exists", path: "C:\\Shares\\Finance" },
        { label: "C:\\Shares\\HR exists", type: "exists", path: "C:\\Shares\\HR" }
      ],
      solution: ["New-Item -Path C:\\Shares\\Finance -ItemType Directory", "New-Item -Path C:\\Shares\\HR -ItemType Directory"]
    },
    {
      id: "az802-backup-config", kind: "pwsh", d: 5,
      title: "Back up a config file before editing it",
      prompt: "You are about to edit the IIS site configuration at `C:\\inetpub\\web.config` and want a safe copy first.\n\nCreate `C:\\Backup`, then copy the file into it. The original must stay where it is.",
      hint: "Make the folder with New-Item, then use Copy-Item with a source and destination. Copy-Item leaves the source in place.",
      explain: "Copy-Item duplicates a file while leaving the original, unlike Move-Item which relocates it, so it is the right tool for a pre-change backup. Keeping the backup outside the live configuration folder avoids IIS reading a stray file. Making a restore point before a change is a core operational practice tested throughout AZ-802.",
      setup: { computer: "WEB01", user: "Administrator", files: { "C:\\inetpub\\web.config": "<configuration>\n  <appSettings mode=\"prod\" />\n</configuration>\n" } },
      checks: [
        { label: "The backup copy exists", type: "exists", path: "C:\\Backup\\web.config" },
        { label: "The original web.config is still in place", type: "file", path: "C:\\inetpub\\web.config", includes: "configuration" }
      ],
      solution: ["New-Item -Path C:\\Backup -ItemType Directory", "Copy-Item C:\\inetpub\\web.config C:\\Backup\\web.config"]
    },
    {
      id: "az802-firewall-rule", kind: "pwsh", d: 6,
      title: "Allow HTTPS through the Windows firewall",
      prompt: "A web server must accept HTTPS traffic on TCP port 443, but no inbound rule exists yet.\n\nCreate an enabled inbound allow rule named `Allow HTTPS` for TCP port 443.",
      hint: "New-NetFirewallRule takes -DisplayName, -Direction Inbound, -Action Allow, -Protocol TCP and -LocalPort 443.",
      explain: "New-NetFirewallRule builds a precise rule so you open only the port a service needs rather than a broad range. Naming the rule clearly and setting direction, action, protocol and port explicitly keeps the firewall auditable. Least-privilege network exposure through host firewall rules is part of securing Windows Server on AZ-802.",
      setup: { computer: "WEB01", user: "Administrator", firewallRules: {} },
      checks: [
        { label: "The Allow HTTPS rule is enabled", type: "firewallRule", name: "Allow HTTPS", enabled: true },
        { label: "The rule opens TCP port 443", type: "firewallRule", name: "Allow HTTPS", port: 443 }
      ],
      solution: ["New-NetFirewallRule -DisplayName 'Allow HTTPS' -Direction Inbound -Action Allow -Protocol TCP -LocalPort 443"]
    },
    {
      id: "az802-disable-legacy", kind: "pwsh", d: 6,
      title: "Disable unused local accounts to reduce attack surface",
      prompt: "A security review flagged two enabled local accounts that are no longer used: the built-in `Guest` account and an old service account `svc_legacy`.\n\nDisable both so they cannot be used to sign in.",
      hint: "Disable-LocalUser -Name turns off a local account without deleting it.",
      explain: "Disabling an unused account removes a sign-in path an attacker could abuse while keeping the account for audit history, which is safer than immediate deletion. The Guest account in particular should stay disabled on servers. Reducing attack surface by turning off unneeded accounts and services is a recurring AZ-802 hardening theme.",
      setup: { computer: "SRV1", user: "Administrator", localUsers: { Guest: { enabled: true, groups: [] }, svc_legacy: { enabled: true, groups: [] } } },
      checks: [
        { label: "The Guest account is disabled", type: "localUser", name: "Guest", enabled: false },
        { label: "The svc_legacy account is disabled", type: "localUser", name: "svc_legacy", enabled: false }
      ],
      solution: ["Disable-LocalUser -Name Guest", "Disable-LocalUser -Name svc_legacy"]
    },
    {
      id: "az802-restart-critical", kind: "pwsh", d: 7,
      title: "Recover a stopped critical service and check the log",
      prompt: "The `LanmanServer` (Server) service has stopped, so file shares are unreachable.\n\nReview recent events with Get-WinEvent, then start the service so shares come back.",
      hint: "Get-WinEvent shows recent log entries. Start-Service -Name starts the stopped service.",
      explain: "Checking the event log before acting tells you whether a service stopped on its own or was stopped deliberately, which shapes the fix. Get-WinEvent reads the modern Windows event logs, and Start-Service brings the Server service back so SMB shares respond again. Monitoring and troubleshooting service health this way is central to the AZ-802 operations objective.",
      setup: { computer: "FS01", user: "Administrator", services: { LanmanServer: { status: "Stopped", startType: "Automatic", display: "Server" } }, events: [{ time: "9/25/2026 8:59:00 AM", id: 7036, level: "Information", source: "Service Control Manager", message: "The Server service entered the stopped state." }] },
      checks: [
        { label: "The Server service is running again", type: "service", name: "LanmanServer", status: "Running" },
        { label: "You reviewed events with Get-WinEvent", type: "ran", includes: "Get-WinEvent" }
      ],
      solution: ["Get-WinEvent", "Start-Service -Name LanmanServer", "Get-Service -Name LanmanServer"]
    }
  ]
});
