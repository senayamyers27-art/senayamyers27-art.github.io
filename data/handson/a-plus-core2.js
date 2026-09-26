/* Hands-on PowerShell exercises for CompTIA A+ Core 2 (220-1202).
   Checked by tools/check-data.js against the simulator in public/assets/pwsh.js. */
CertHub.addHandson("a-plus-core2", {
  tables: {},
  items: [
    {
      id: "aplus-create-folder-note", kind: "pwsh", d: 1,
      title: "Create a folder and a text file from PowerShell",
      prompt: "You want a working folder for a maintenance job.\n\nCreate the folder `C:\\Temp\\report`, then write a short note to `C:\\Temp\\report\\info.txt`. The note must contain the word backup.",
      hint: "New-Item -ItemType Directory makes the folder; Set-Content -Path ... -Value writes the file.",
      explain: "PowerShell is a standard Windows command-line tool an A+ technician uses for everyday file work. New-Item with -ItemType Directory creates folders, and Set-Content writes text without opening an editor. Knowing these basics lets you script small tasks and follow written repair steps exactly, which the Core 2 operating systems objective expects.",
      setup: { computer: "PC01", user: "Administrator" },
      checks: [
        { label: "C:\\Temp\\report exists as a folder", type: "exists", path: "C:\\Temp\\report" },
        { label: "The note mentions the backup job", type: "file", path: "C:\\Temp\\report\\info.txt", includes: "backup" }
      ],
      solution: ["New-Item -Path C:\\Temp\\report -ItemType Directory", "Set-Content -Path C:\\Temp\\report\\info.txt -Value 'Nightly backup log folder'"]
    },
    {
      id: "aplus-fix-print-spooler", kind: "pwsh", d: 1,
      title: "Fix the Print Spooler so printing works again",
      prompt: "A user cannot print. The `Spooler` service is stopped and its startup type is Disabled, so it will not come back on its own.\n\nSet the startup type to Automatic, then start the service.",
      hint: "Set-Service -StartupType Automatic re-enables it at boot; Start-Service starts it now.",
      explain: "The Print Spooler is a service, and a Disabled startup type stops it from ever starting, even manually, until you change it. Set-Service -StartupType Automatic fixes the boot behaviour and Start-Service runs it in the current session. Diagnosing and restarting services is a common A+ Core 2 software troubleshooting task.",
      setup: { computer: "PC01", user: "Administrator", services: { Spooler: { status: "Stopped", startType: "Disabled", display: "Print Spooler" } } },
      checks: [
        { label: "The Spooler service is running", type: "service", name: "Spooler", status: "Running" },
        { label: "The Spooler starts automatically at boot", type: "service", name: "Spooler", startType: "Automatic" }
      ],
      solution: ["Set-Service -Name Spooler -StartupType Automatic", "Start-Service -Name Spooler"]
    },
    {
      id: "aplus-standard-user", kind: "pwsh", d: 2,
      title: "Create a standard user with least privilege",
      prompt: "A shared workstation needs a limited account for a new employee named `jdoe`, who only needs remote desktop access.\n\nCreate the local user `jdoe`, then add them to the `Remote Desktop Users` group. Do not add them to Administrators.",
      hint: "New-LocalUser -Name -NoPassword creates the account. Add-LocalGroupMember -Group -Member adds it to a group.",
      explain: "Least privilege means giving an account only the access it needs, so a standard user joins Remote Desktop Users rather than Administrators. New-LocalUser creates the account and Add-LocalGroupMember grants the specific right through group membership. Assigning appropriate rights and avoiding unnecessary admin access is a core A+ Core 2 security principle.",
      setup: { computer: "PC01", user: "Administrator", localUsers: {}, localGroups: ["Remote Desktop Users"] },
      checks: [
        { label: "The jdoe account exists and is enabled", type: "localUser", name: "jdoe", enabled: true },
        { label: "jdoe is in Remote Desktop Users", type: "inGroup", user: "jdoe", group: "Remote Desktop Users" }
      ],
      solution: ["New-LocalUser -Name jdoe -NoPassword", "Add-LocalGroupMember -Group 'Remote Desktop Users' -Member jdoe"]
    },
    {
      id: "aplus-disable-guest", kind: "pwsh", d: 2,
      title: "Disable the built-in Guest account",
      prompt: "A security checklist requires the built-in `Guest` account to be turned off on every workstation.\n\nReview the local accounts, then disable `Guest`.",
      hint: "Get-LocalUser lists the accounts; Disable-LocalUser -Name turns one off.",
      explain: "The Guest account allows sign-in without a password and should stay disabled, because it is a well-known way for someone to gain limited access. Disable-LocalUser turns it off without deleting it, keeping the built-in account where Windows expects it. Disabling default and unused accounts is a standard A+ Core 2 workstation hardening step.",
      setup: { computer: "PC01", user: "Administrator", localUsers: { Guest: { enabled: true, groups: [] } } },
      checks: [
        { label: "The Guest account is disabled", type: "localUser", name: "Guest", enabled: false },
        { label: "You reviewed the accounts with Get-LocalUser", type: "ran", includes: "Get-LocalUser" }
      ],
      solution: ["Get-LocalUser", "Disable-LocalUser -Name Guest"]
    },
    {
      id: "aplus-restart-hung-service", kind: "pwsh", d: 3,
      title: "Restart a service for an app that stopped responding",
      prompt: "A line-of-business app is not responding, and its background service `AppSvc` has stopped.\n\nRestart the `AppSvc` service so the app works again.",
      hint: "Restart-Service -Name stops and starts a service in one step, even if it is currently stopped.",
      explain: "When an application misbehaves, restarting its underlying service often clears the problem without rebooting the whole machine. Restart-Service stops and then starts the service in a single command, and it will start a service that was already stopped. Restarting services and processes is a common first step in A+ Core 2 software troubleshooting.",
      setup: { computer: "PC01", user: "Administrator", services: { AppSvc: { status: "Stopped", startType: "Automatic", display: "Line of Business App" } } },
      checks: [
        { label: "The AppSvc service is running", type: "service", name: "AppSvc", status: "Running" },
        { label: "You used Restart-Service", type: "ran", includes: "Restart-Service" }
      ],
      solution: ["Restart-Service -Name AppSvc", "Get-Service -Name AppSvc"]
    },
    {
      id: "aplus-backup-before-change", kind: "pwsh", d: 4,
      title: "Back up a settings file before making a change",
      prompt: "Before editing an application's settings at `C:\\App\\app.ini`, follow change management and make a backup first.\n\nCreate `C:\\Backup`, then copy the file into it. Leave the original in place.",
      hint: "New-Item -ItemType Directory creates the folder; Copy-Item copies the file and keeps the original.",
      explain: "Change management means having a way back before you change anything. Copy-Item duplicates the file while leaving the original untouched, so you can restore it if the edit causes trouble. Documenting and preparing rollbacks before a change is exactly the kind of operational procedure the A+ Core 2 objectives cover.",
      setup: { computer: "PC01", user: "Administrator", files: { "C:\\App\\app.ini": "[settings]\nmode=prod\ntimeout=30\n" } },
      checks: [
        { label: "The backup copy exists", type: "exists", path: "C:\\Backup\\app.ini" },
        { label: "The original app.ini is still in place", type: "file", path: "C:\\App\\app.ini", includes: "mode=prod" }
      ],
      solution: ["New-Item -Path C:\\Backup -ItemType Directory", "Copy-Item C:\\App\\app.ini C:\\Backup\\app.ini"]
    }
  ]
});
