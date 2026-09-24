/* GRC, architecture, cloud and application-security labs.
   Case study throughout: "11:Eleven", an upscale lounge in Dallas, TX
   (POS, guest reservations with personal data, guest/staff Wi-Fi, cameras,
   SaaS vendors such as a reservation platform and a payment processor). */
CertHub.registerLabs([
  {
    id: "lab-risk-register",
    title: "Build a risk register and heat map for a small business",
    track: "GRC & architecture",
    level: "Beginner",
    minutes: 150,
    cost: "Free",
    summary: "Run a real risk assessment for the 11:Eleven lounge: inventory assets, pair threats with vulnerabilities, score them on a 5x5 heat map, work out SLE and ALE for three risks, and choose a treatment, owner and residual risk for each. You finish with a reusable risk register spreadsheet.",
    realWorld: "GRC analysts and consultants run this exact exercise for small and mid-size clients, and auditors ask to see the register. It is the backbone of NIST SP 800-30 style risk assessments, cyber-insurance applications and board reporting.",
    youWillNeed: ["A spreadsheet app (LibreOffice Calc, Excel or Google Sheets)", "About two hours of quiet thinking time", "Optional: your Ubuntu VM from lab-home-lab to generate the CSV template"],
    steps: [
      {
        title: "Set the scope and risk appetite",
        body: "Write two sentences: what is in scope (the lounge's front-of-house, back office, network and SaaS services) and what the owner is willing to accept. Example appetite: 'We accept Low risks; Medium risks need an owner and a plan within 90 days; High and Critical risks need action within 30 days.' Without an appetite statement you cannot decide which risks to accept."
      },
      {
        title: "Build the asset inventory",
        body: "List every asset with an owner and a criticality (High/Medium/Low). Use at least these rows: POS terminals and card readers (High), payment processor account (High), reservation platform account with guest names, phones, emails and birthdays (High), manager laptop with payroll and vendor contracts (High), office PC (Medium), guest Wi-Fi and staff Wi-Fi / router / firewall (High), IP cameras and NVR (Medium), music/AV system (Low), social media and Google Business accounts (Medium), menus and recipes (Low), liquor-license and permit documents (Medium).",
        check: "At least 10 assets, each with a named owner (a role such as 'General Manager' is fine) and a criticality."
      },
      {
        title: "Pair threats with vulnerabilities",
        body: "For each High asset, write at least one threat (who or what could cause harm) and the vulnerability it would exploit, then a one-line risk statement in 'If <threat> exploits <vulnerability>, then <impact>' form. Examples: 'If a phishing email steals the manager's reservation-platform password (no MFA), then guest PII for ~8,000 guests is exposed'; 'If ransomware reaches the office PC (shared admin account, no EDR), then payroll and scheduling stop for days'; 'If a guest on the open Wi-Fi reaches the POS VLAN (flat network), then card data could be intercepted'; 'If the manager laptop is stolen from the car (no disk encryption), then payroll PII is exposed'."
      },
      {
        title: "Define the 5x5 scales before scoring",
        body: "Write the scales down so two people would score the same way. Likelihood: 1 Rare (less than once in 10 years), 2 Unlikely (once in 5–10 years), 3 Possible (once in 1–5 years), 4 Likely (about once a year), 5 Almost certain (several times a year). Impact: 1 Negligible (< $1k, no guest impact), 2 Minor ($1k–$10k, one night disrupted), 3 Moderate ($10k–$50k, a weekend lost or small PII exposure), 4 Major ($50k–$250k, card or large PII breach, regulator notice), 5 Severe (> $250k or threat to the business or its liquor license). Score = Likelihood × Impact: 1–4 Low, 5–9 Medium, 10–16 High, 20–25 Critical."
      },
      {
        title: "Score every risk and draw the heat map",
        body: "Give each risk a likelihood and impact, compute the score, then draw a 5x5 grid (likelihood on the Y axis, impact on the X axis), color cells green/yellow/orange/red by the bands above and place each risk ID in its cell. In a spreadsheet, use conditional formatting on the score column so the colors update automatically.",
        check: "Every risk sits in exactly one cell and the colors match your written bands."
      },
      {
        title: "Work quantitative risk 1: card-data breach at the POS",
        body: "Asset value (AV) is what the asset is worth to the business if fully lost, including fines, forensics and lost trade. Worked numbers: AV = $150,000 (forensic investigation, card-brand assessments, card reissue costs, legal and lost revenue); exposure factor EF = 40% of that realized in a typical incident. SLE = AV × EF = $150,000 × 0.40 = $60,000. Annualized rate of occurrence ARO = 0.1 (once in 10 years). ALE = SLE × ARO = $60,000 × 0.1 = $6,000 per year."
      },
      {
        title: "Work quantitative risks 2 and 3",
        body: "Ransomware on the office PC and reservation data: AV = $80,000 (downtime on a weekend, rebuild, recovery, notification), EF = 50%, SLE = $40,000, ARO = 0.2 (once in 5 years), ALE = $8,000. Manager laptop theft: AV = $2,500 (replacement plus staff time; the PII exposure is scored separately), EF = 100%, SLE = $2,500, ARO = 0.5 (once in 2 years), ALE = $1,250. Record where each number came from (quotes, insurance data, gut estimate) — auditors care about the reasoning more than the precision."
      },
      {
        title: "Test a control with cost-benefit math",
        body: "Value of a safeguard = ALE before − ALE after − annual cost of the safeguard. Example: moving the POS to a validated P2PE/tokenized payment solution and putting it on its own VLAN cuts the card-breach ARO from 0.1 to 0.02, so ALE falls from $6,000 to $1,200. If the extra cost is $1,800 a year, value = $6,000 − $1,200 − $1,800 = $3,000 per year, so it is worth doing. Run the same math for EDR plus offline backups against the ransomware risk.",
        check: "You have a positive or negative dollar figure for at least two proposed controls and a sentence saying whether you would buy them."
      },
      {
        title: "Choose a treatment for every risk",
        body: "Pick exactly one primary treatment per risk. Mitigate: add controls (MFA on the reservation platform, full-disk encryption on the laptop, network segmentation). Transfer: shift the financial impact (cyber-insurance, a payment processor that takes on PCI scope through P2PE). Avoid: stop the activity (stop storing guest birthdays you do not need, stop writing card numbers on paper tabs). Accept: document it when the score is within appetite or the fix costs more than the risk, and have the owner sign."
      },
      {
        title: "Assign owners, dates and residual risk",
        body: "Every risk gets a business owner (not 'IT'), a due date and a residual likelihood/impact that assumes the planned controls are in place. Residual risk must land inside the appetite from step 1, or the owner formally accepts it. Example: reservation-platform takeover goes from L4×I4 = 16 (High) to L2×I4 = 8 (Medium) after MFA and a least-privilege staff role."
      },
      {
        title: "Create the risk register template",
        body: "Create the register with these exact columns, in this order: Risk ID | Date Identified | Asset | Threat | Vulnerability | Risk Statement | Existing Controls | Likelihood (1-5) | Impact (1-5) | Inherent Score | Inherent Rating | AV ($) | EF (%) | SLE ($) | ARO | ALE ($) | Treatment | Planned Controls | Owner | Due Date | Residual Likelihood | Residual Impact | Residual Score | Residual Rating | Status | Last Reviewed. Use formulas: Inherent Score = Likelihood × Impact, SLE = AV × EF, ALE = SLE × ARO, Residual Score = Residual Likelihood × Residual Impact. You can create the CSV header on Ubuntu and open it in a spreadsheet.",
        cmd: "mkdir -p ~/grc && cd ~/grc\nprintf '%s\\n' 'Risk ID,Date Identified,Asset,Threat,Vulnerability,Risk Statement,Existing Controls,Likelihood (1-5),Impact (1-5),Inherent Score,Inherent Rating,AV ($),EF (%),SLE ($),ARO,ALE ($),Treatment,Planned Controls,Owner,Due Date,Residual Likelihood,Residual Impact,Residual Score,Residual Rating,Status,Last Reviewed' > risk-register.csv\nprintf '%s\\n' 'R-001,2026-09-24,POS and card readers,External attacker,Flat network shared with guest Wi-Fi,\"If an attacker on guest Wi-Fi reaches the POS, then card data is exposed\",Processor-supplied terminals,2,5,10,High,150000,40,60000,0.1,6000,Mitigate,\"P2PE terminals, POS VLAN, firewall rules\",General Manager,2026-11-01,1,4,4,Low,Open,2026-09-24' >> risk-register.csv\nhead -2 risk-register.csv",
        check: "The CSV opens in your spreadsheet with 26 columns and one example row."
      },
      {
        title: "Write the one-page summary for the owner",
        body: "Summarize for a non-technical owner: the top five risks by score, the three ALE figures, the recommended controls with their cost-benefit result, and the risks you recommend accepting. End with a review cadence (quarterly, and after any incident or major change such as a new POS)."
      }
    ],
    verify: [
      "Your register has at least 10 risks, each with a treatment, a named owner, a due date and a residual score.",
      "Your three quantitative risks show AV, EF, SLE, ARO and ALE with the arithmetic correct (SLE = AV × EF, ALE = SLE × ARO).",
      "Your heat map places every risk ID in the right cell and uses the same bands as your written scales.",
      "Every risk outside the appetite has either a mitigation plan or a signed acceptance."
    ],
    deliverable: "Save the risk register (XLSX and CSV), a PNG of the heat map and the one-page owner summary as a PDF. Write a short portfolio page: scope, method (qualitative 5x5 plus quantitative ALE, aligned to NIST SP 800-30), top findings, and the cost-benefit decision for one control. Use sanitized numbers if you publish it.",
    resume: "Conducted a NIST SP 800-30-aligned risk assessment for a hospitality business, building a 26-column risk register with a 5x5 heat map and ALE calculations that justified $3K/yr of net-positive controls and cut the top risk from High to Low residual.",
    interview: [
      "How do you calculate ALE? — SLE (asset value × exposure factor) times ARO, the expected number of occurrences per year.",
      "What are the four risk treatment options? — Mitigate, transfer, avoid and accept; acceptance must be documented and signed by the risk owner.",
      "What is residual risk? — The risk that remains after controls are applied; it must fall within the organization's risk appetite or be formally accepted."
    ],
    links: [
      { label: "NIST SP 800-30 Rev. 1: Guide for Conducting Risk Assessments", url: "https://csrc.nist.gov/pubs/sp/800/30/r1/final" },
      { label: "NIST Cybersecurity Framework 2.0", url: "https://www.nist.gov/cyberframework" },
      { label: "CISA Cyber Essentials (small business)", url: "https://www.cisa.gov/resources-tools/resources/cyber-essentials" }
    ]
  },

  {
    id: "lab-bia-backup",
    title: "Business impact analysis and a tested restic backup",
    track: "GRC & architecture",
    level: "Intermediate",
    minutes: 150,
    cost: "Free",
    summary: "Run a business impact analysis for the lounge to set RTO, RPO and MTD for its critical processes, then build real 3-2-1 backups of a lab folder with restic (encrypted, with a retention policy and a systemd timer) and prove them with a timed restore.",
    realWorld: "Continuity planners write BIAs, and sysadmins are judged on whether restores work, not whether backups ran. Insurers and auditors now ask for evidence of tested, offline or immutable backups because of ransomware.",
    youWillNeed: ["Your Ubuntu Server 24.04 VM from lab-home-lab", "A second virtual disk (1–2 GB) attached to the VM in VirtualBox to act as the second medium", "A spreadsheet or document for the BIA worksheet"],
    requires: ["lab-home-lab"],
    safety: "Only back up test data you created for this lab. Store the restic password in a password manager: without it the repository cannot be decrypted by anyone, including you.",
    steps: [
      {
        title: "List the critical business processes",
        body: "Write the processes the lounge cannot run without: take card payments (POS + processor), manage reservations and the guest list (SaaS reservation platform), run payroll and scheduling, operate door/ID check and cameras, and post events on social media. For each, list the systems and people it depends on."
      },
      {
        title: "Fill the BIA worksheet",
        body: "Make a table with columns: Process | Dependencies | Impact per hour/day of outage ($, legal, reputation) | MTD | RTO | RPO | Recovery option. Example rows: Card payments — MTD 4 h on a Friday night (after that you lose the night's revenue), RTO 15 min (switch to the processor's offline/cellular mode or a backup terminal), RPO 0 (transactions live at the processor). Reservations — MTD 24 h, RTO 4 h, RPO 1 h. Payroll — MTD 3 days (before a pay date), RTO 24 h, RPO 24 h. Camera NVR footage — MTD 7 days, RTO 72 h, RPO 0 for incidents (export clips immediately).",
        check: "For every row RTO is shorter than MTD, and RPO is set by how much data you can afford to re-enter or lose."
      },
      {
        title: "Choose hot, warm or cold recovery for each process",
        body: "Hot = ready to take over in minutes (a second card terminal with cellular failover, or a spare LTE router). Warm = equipment and backups ready but needs hours of setup (a spare laptop with software installed, restored from last night's backup). Cold = a place or plan with no ready equipment (buy a new PC and restore within days). Match cost to the RTO: hot for payments, warm for the office PC, cold for the music system."
      },
      {
        title: "Create the lab data and install restic",
        body: "Create a folder that stands in for the office PC's business files. The Ubuntu package is usually a little behind; run 'restic version' and compare with the latest release on github.com/restic/restic/releases.",
        cmd: "sudo apt update && sudo apt install -y restic\nrestic version\nmkdir -p ~/lounge-data/{payroll,menus,contracts}\nfor i in $(seq 1 200); do head -c 50000 /dev/urandom > ~/lounge-data/payroll/file$i.bin; done\necho 'Friday menu v1' > ~/lounge-data/menus/menu.txt\ndu -sh ~/lounge-data",
        check: "du reports about 10 MB of data."
      },
      {
        title: "Prepare two backup media",
        body: "Copy 1 is the original data. Copy 2 goes to a local repository on the VM's disk. Copy 3 goes to the second virtual disk (different medium), which you will later treat as the offsite copy by detaching it. Find the new disk with lsblk (often /dev/sdb) and double-check the name before formatting.",
        cmd: "lsblk\nsudo mkfs.ext4 -L offsite /dev/sdb\nsudo mkdir -p /mnt/offsite /srv/restic-local\nsudo mount /dev/sdb /mnt/offsite\nsudo chown $USER: /mnt/offsite /srv/restic-local",
        check: "lsblk shows the second disk mounted on /mnt/offsite."
      },
      {
        title: "Create encrypted restic repositories",
        body: "restic encrypts every repository with AES-256 and authenticates it; the key is derived from your password. Keep the password in a file only your user can read (mode 600) so scheduled jobs can use it, and save a copy in your password manager.",
        cmd: "(umask 077; openssl rand -base64 32 > ~/.restic-pass)\nls -l ~/.restic-pass\nexport RESTIC_PASSWORD_FILE=~/.restic-pass\nrestic -r /srv/restic-local init\nrestic -r /mnt/offsite/restic-offsite init --from-repo /srv/restic-local --from-password-file ~/.restic-pass --copy-chunker-params",
        check: "Both commands print 'created restic repository ... at ...'."
      },
      {
        title: "Run the first backup and copy it to the second medium",
        body: "Back up to the local repository, then use 'restic copy' to replicate snapshots to the offsite repository. Matching chunker parameters (set in the previous step) keeps the copy efficient.",
        cmd: "export RESTIC_PASSWORD_FILE=~/.restic-pass\nrestic -r /srv/restic-local backup ~/lounge-data --tag lab\nrestic -r /mnt/offsite/restic-offsite copy --from-repo /srv/restic-local --from-password-file ~/.restic-pass\nrestic -r /srv/restic-local snapshots\nrestic -r /mnt/offsite/restic-offsite snapshots",
        check: "Both repositories list the same snapshot ID."
      },
      {
        title: "Apply a retention policy",
        body: "Retention matches the RPO and how far back you might need to go (for example, ransomware discovered two weeks late). Make one change, back up again, then keep 7 daily, 4 weekly and 6 monthly snapshots and prune unreferenced data. Run 'restic check' to verify repository integrity.",
        cmd: "export RESTIC_PASSWORD_FILE=~/.restic-pass\necho 'Friday menu v2' > ~/lounge-data/menus/menu.txt\nrestic -r /srv/restic-local backup ~/lounge-data --tag lab\nrestic -r /srv/restic-local forget --keep-daily 7 --keep-weekly 4 --keep-monthly 6 --prune\nrestic -r /srv/restic-local check",
        check: "forget lists which snapshots it keeps and why; check ends with 'no errors were found'."
      },
      {
        title: "Schedule it with a systemd timer",
        body: "A timer is easier to audit than cron (systemctl list-timers shows the last and next run, and journalctl keeps the output). The service runs as your user and copies to the offsite repo after each backup.",
        cmd: "sudo tee /etc/systemd/system/restic-lounge.service >/dev/null <<EOF\n[Unit]\nDescription=restic backup of lounge-data\n[Service]\nType=oneshot\nUser=$USER\nEnvironment=RESTIC_PASSWORD_FILE=$HOME/.restic-pass\nExecStart=/usr/bin/restic -r /srv/restic-local backup $HOME/lounge-data --tag scheduled\nExecStart=/usr/bin/restic -r /srv/restic-local forget --keep-daily 7 --keep-weekly 4 --keep-monthly 6 --prune\nExecStart=/usr/bin/restic -r /mnt/offsite/restic-offsite copy --from-repo /srv/restic-local --from-password-file $HOME/.restic-pass\nEOF\nsudo tee /etc/systemd/system/restic-lounge.timer >/dev/null <<EOF\n[Unit]\nDescription=Hourly restic backup (RPO 1 h)\n[Timer]\nOnCalendar=hourly\nPersistent=true\n[Install]\nWantedBy=timers.target\nEOF\nsudo systemctl daemon-reload\nsudo systemctl enable --now restic-lounge.timer\nsudo systemctl start restic-lounge.service\nsystemctl list-timers restic-lounge.timer\njournalctl -u restic-lounge.service -n 20 --no-pager",
        check: "list-timers shows a NEXT run within the hour and the journal shows a successful snapshot."
      },
      {
        title: "Simulate a disaster",
        body: "Pretend ransomware encrypted the office files: delete the folder. Then 'take the offsite copy offsite' by unmounting it, which is the air gap that keeps it safe from the attacker.",
        cmd: "rm -rf ~/lounge-data\nsudo umount /mnt/offsite\nls ~/lounge-data 2>&1 | head -1"
      },
      {
        title: "Restore and time it against the RTO",
        body: "Restore from the offsite copy (assume the local repo was hit too). Use 'time' to measure it, then compare the result with a checksum list you create from the restored data against the snapshot.",
        cmd: "sudo mount /dev/sdb /mnt/offsite\nexport RESTIC_PASSWORD_FILE=~/.restic-pass\ntime restic -r /mnt/offsite/restic-offsite restore latest --target /tmp/restore\nls /tmp/restore/home/$USER/lounge-data\ncat /tmp/restore/home/$USER/lounge-data/menus/menu.txt\nrestic -r /mnt/offsite/restic-offsite restore latest --target /tmp/restore-verify --verify",
        check: "menu.txt says 'Friday menu v2', the payroll folder has 200 files, and 'real' time is recorded."
      },
      {
        title: "Put the data back and record the results",
        body: "Move the data back into place, then write the restore record: date, snapshot ID, data size, measured restore time, the RTO target and pass/fail, and anything that slowed you down (finding the password, remounting the disk). Real restore tests always find something; write it down as a lesson learned.",
        cmd: "mv /tmp/restore/home/$USER/lounge-data ~/\nls ~/lounge-data/payroll | wc -l"
      }
    ],
    verify: [
      "Your BIA table has MTD, RTO and RPO for at least four processes, with RTO < MTD in every row.",
      "'restic snapshots' shows matching snapshots in two repositories on two different disks.",
      "'systemctl list-timers' shows the restic timer and the journal shows a successful scheduled run.",
      "You restored deleted data from the offsite repo and recorded the measured time against the RTO."
    ],
    deliverable: "Save the BIA worksheet, the systemd unit files, screenshots of 'restic snapshots', 'list-timers' and the timed restore, and a one-page restore test record (target RTO vs measured time, pass/fail, lessons learned). In the write-up explain how the 3 copies / 2 media / 1 offsite map to your setup and what you would use for a real offsite copy (for example restic to S3 or Backblaze B2 with object lock).",
    resume: "Performed a business impact analysis defining RTO/RPO/MTD for five critical processes and implemented encrypted 3-2-1 restic backups with automated retention, validating recovery with a timed restore test well under a 4-hour RTO.",
    interview: [
      "What is the difference between RTO and RPO? — RTO is how long you can take to restore a service; RPO is how much data (measured in time) you can afford to lose, which sets backup frequency.",
      "Why test restores? — A backup is only proven when you restore it; tests catch missing passwords, corrupt media and RTOs that are unrealistic.",
      "How does MTD relate to RTO? — MTD is the maximum tolerable downtime before severe harm; RTO must be shorter so you recover with margin."
    ],
    cleanup: [
      "sudo systemctl disable --now restic-lounge.timer && sudo rm /etc/systemd/system/restic-lounge.{service,timer} && sudo systemctl daemon-reload",
      "rm -rf /tmp/restore /tmp/restore-verify (keep the repos if you want to reuse them).",
      "Detach the second virtual disk in VirtualBox if you no longer need it."
    ],
    links: [
      { label: "restic documentation", url: "https://restic.readthedocs.io/en/stable/" },
      { label: "NIST SP 800-34 Rev. 1: Contingency Planning Guide", url: "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final" },
      { label: "CISA #StopRansomware Guide", url: "https://www.cisa.gov/stopransomware/ransomware-guide" }
    ]
  },

  {
    id: "lab-policy-writing",
    title: "Write a policy set mapped to NIST CSF 2.0",
    track: "GRC & architecture",
    level: "Beginner",
    minutes: 180,
    cost: "Free",
    summary: "Write three short policies for the lounge (acceptable use, password/MFA, incident response), plus one supporting standard and one procedure, with an approval workflow and exception process, and map each to the NIST CSF 2.0 functions.",
    realWorld: "GRC analysts draft and maintain policy libraries, and every audit (SOC 2, PCI DSS, cyber-insurance questionnaires) starts with 'show me your policies'. Knowing the difference between policy, standard, procedure and guideline is a staple CISSP and interview topic.",
    youWillNeed: ["A word processor or Markdown editor", "The NIST CSF 2.0 document (free PDF)", "Optional: the SANS or CIS policy templates for comparison (read, do not copy)"],
    steps: [
      {
        title: "Learn the document hierarchy",
        body: "Policy: management's mandatory intent, short and stable ('All staff must use MFA for business systems'). Standard: mandatory, specific, measurable requirements that support a policy ('Passwords are at least 15 characters; MFA uses an authenticator app or security key, not SMS where the app supports it'). Procedure: mandatory step-by-step instructions ('How to enroll a new hire in MFA'). Guideline: recommended, optional advice ('Tips for choosing a passphrase'). Write this as a one-paragraph preface for your policy set."
      },
      {
        title: "Create a policy template",
        body: "Every document uses the same headings: Title, Document ID, Version, Owner, Approver, Effective date, Next review date, Purpose, Scope, Roles and responsibilities, Policy statements, Compliance and enforcement, Exceptions, Related documents, CSF 2.0 mapping, Revision history. Consistent headings make review and audit faster."
      },
      {
        title: "Write the Acceptable Use Policy (POL-01)",
        body: "Keep it to one or two pages that bartenders and managers will actually read. Cover: business systems are for business use; no sharing of logins or POS cards; no installing software on the office PC; guest Wi-Fi is for guests only and staff devices use the staff network; no photos of guest IDs, cards or the reservation screen; report lost devices and suspicious emails within one hour; the business may monitor its systems; violations lead to discipline. Map to GV.PO (policy), PR.AT (awareness) and PR.AA (access)."
      },
      {
        title: "Write the Password and MFA Policy (POL-02)",
        body: "State that every account is individual, MFA is required on email, the reservation platform, the payment processor portal, payroll and remote access, and that shared accounts need owner approval and a password manager vault. Align numbers with NIST SP 800-63B: favor length over complexity rules, check new passwords against breached-password lists, and do not force periodic changes unless compromise is suspected. Map to PR.AA."
      },
      {
        title: "Write the Incident Response Policy (POL-03)",
        body: "Define what an incident is (lost device, phishing click, suspected card skimmer, ransomware, guest-data exposure), who leads (General Manager as incident lead, the IT provider as technical responder), the phases (prepare, detect and analyze, contain, eradicate, recover, lessons learned), reporting timelines, and who contacts the payment processor, insurer, law enforcement and legal counsel. Note that Texas law requires notifying affected individuals of a breach of sensitive personal information and the Texas Attorney General when 250 or more Texans are affected — confirm current deadlines with counsel. Map to RS.MA, RS.CO, RC.RP and DE.AE."
      },
      {
        title: "Write one standard (STD-01: Authentication Standard)",
        body: "Turn POL-02 into measurable rules an auditor can test: minimum 15-character passwords (8 if MFA is enforced and the system caps length), approved MFA methods ranked (security key > authenticator app/push with number matching > SMS as last resort), lockout or throttling after repeated failures, admin accounts separate from daily accounts, password manager required for shared vault items, and access removed within 24 hours of termination."
      },
      {
        title: "Write one procedure (PRC-01: Employee Offboarding Access Removal)",
        body: "Numbered steps someone can follow at 2 a.m.: 1) Manager notifies owner and IT the same day. 2) Disable the POS login and collect any swipe card. 3) Remove the user from the reservation platform and payment portal. 4) Disable email and revoke sessions and app passwords. 5) Rotate any shared passwords they knew (Wi-Fi staff network, alarm code). 6) Collect keys and devices. 7) Record completion with date, time and initials in the access log. Include who does each step and the evidence to keep."
      },
      {
        title: "Map everything to CSF 2.0",
        body: "Build a mapping table: Document | CSF Function | Category. Cover all six functions so the gaps are visible: Govern (GV.PO policy, GV.RR roles, GV.SC supply chain), Identify (ID.AM assets, ID.RA risk), Protect (PR.AA identity and access, PR.AT awareness, PR.DS data security), Detect (DE.CM continuous monitoring, DE.AE adverse event analysis), Respond (RS.MA incident management, RS.CO reporting and communication), Recover (RC.RP recovery plan execution, RC.CO recovery communication). Note any function with no document as a gap for your roadmap.",
        check: "Each of the six functions has at least one document mapped or an explicit 'gap' entry."
      },
      {
        title: "Add the review and approval workflow",
        body: "Document how a policy becomes official: draft by the security lead, review by the manager and (for HR-related items) legal/HR, approval and signature by the owner, publication to staff with signed acknowledgment, and annual review or after a major change or incident. Keep a revision history table in each document."
      },
      {
        title: "Add the exception process",
        body: "Exceptions are how you stay honest when a policy cannot be met. Create an exception request form: requester, policy clause, business reason, risk introduced, compensating controls, expiry date (max 12 months), approver and date. Example: 'The old music system cannot use MFA — compensating control: isolated VLAN and unique strong password; expires when the system is replaced.' Track exceptions in the risk register."
      },
      {
        title: "Do a readability and enforceability pass",
        body: "Replace 'should' with 'must' in policies and standards (use 'should' only in guidelines), cut jargon, make sure every requirement has an owner, and check that nothing contradicts another document. Ask a non-technical friend to read the AUP and tell you what they must not do; if they cannot, simplify it."
      }
    ],
    verify: [
      "You have three policies, one standard and one procedure, all using the same template headings.",
      "You can explain, with an example from your own set, the difference between a policy, standard, procedure and guideline.",
      "Your mapping table covers all six CSF 2.0 functions and lists any gaps.",
      "Your set includes an approval workflow, review cycle and a completed example exception request."
    ],
    deliverable: "Publish the policy set as a PDF (or a GitHub repo of Markdown files) with a cover page, the hierarchy explanation, the five documents, the CSF 2.0 mapping table and one filled exception form. In the write-up, explain how you right-sized the policies for a 20-person business.",
    resume: "Authored an information security policy set (acceptable use, authentication, incident response) with a supporting standard and offboarding procedure, mapped to all six NIST CSF 2.0 functions with a documented approval and exception process.",
    interview: [
      "What is the difference between a policy and a standard? — A policy states management's mandatory intent at a high level; a standard sets the specific, measurable requirements that implement it.",
      "What does the Govern function add in CSF 2.0? — It makes cybersecurity governance explicit: strategy, roles, policy, oversight, risk management and supply-chain risk management.",
      "How do you handle a system that cannot comply with a policy? — Use a documented, time-limited exception with a risk assessment, compensating controls and owner approval, tracked in the risk register."
    ],
    links: [
      { label: "NIST Cybersecurity Framework 2.0", url: "https://www.nist.gov/cyberframework" },
      { label: "NIST SP 800-63B Digital Identity Guidelines", url: "https://pages.nist.gov/800-63-4/sp800-63b.html" },
      { label: "NIST SP 800-61 Rev. 3: Incident Response Recommendations", url: "https://csrc.nist.gov/pubs/sp/800/61/r3/final" }
    ]
  },

  {
    id: "lab-data-classification",
    title: "Classify data and encrypt it at rest and in transit",
    track: "GRC & architecture",
    level: "Beginner",
    minutes: 120,
    cost: "Free",
    summary: "Define a four-level data classification scheme, classify the lounge's data, write handling, retention and disposal rules (NIST SP 800-88 clear/purge/destroy), sketch a DLP rule, then apply encryption at rest with a LUKS container and gpg and check TLS in transit.",
    realWorld: "Data classification drives almost every other control: who gets access, what gets encrypted, what DLP watches for and how long records are kept. PCI DSS, state privacy laws and cyber-insurers all expect you to know where sensitive data lives.",
    youWillNeed: ["Your Ubuntu Server 24.04 VM from lab-home-lab (with temporary internet access for the TLS check, or run that step on your host)", "A spreadsheet or document for the inventory"],
    requires: ["lab-home-lab"],
    safety: "Use made-up sample data only. Never put real guest or card data into a lab.",
    steps: [
      {
        title: "Define four classification levels",
        body: "Public: approved for anyone (menus, event flyers, hours). Internal: for staff only, low harm if leaked (schedules, recipes, SOPs). Confidential: harm to people or the business if leaked (guest PII in reservations, vendor contracts, camera footage). Restricted: legal, regulatory or severe harm (cardholder data, payroll and bank details, Social Security numbers on tax forms, staff ID copies). Give each level a label, an owner and a one-line example."
      },
      {
        title: "Inventory and classify the lounge's data",
        body: "Make a table: Data set | Where it lives | Owner | Classification | Legal driver. Examples: guest names/phones/emails/birthdays/visit history — reservation SaaS — GM — Confidential — Texas breach-notification law and the Texas Data Privacy and Security Act; card data — processor and terminals only — Owner — Restricted — PCI DSS; payroll and W-4s — payroll provider and manager laptop — Owner — Restricted — IRS/state rules; camera footage — NVR — GM — Confidential; menus — website and printer — Marketing — Public.",
        check: "Every data set has one classification and a named owner."
      },
      {
        title: "Minimize before you protect",
        body: "The cheapest data to protect is data you do not keep. Decide to stop collecting what you do not need: never write full card numbers on tabs or paper (the processor keeps what is needed and PCI DSS forbids storing sensitive authentication data after authorization), keep only month/day for birthdays if you use them for promotions, and do not photocopy guest IDs. Record these decisions."
      },
      {
        title: "Write handling rules per level",
        body: "Make a matrix of level vs state. At rest: Restricted and Confidential encrypted (full-disk encryption on laptops, encrypted containers or SaaS with encryption), Internal on business accounts only. In transit: TLS 1.2+ for everything Confidential and up, no emailing Restricted data unencrypted, no texting guest lists. In use: screen locks after 5 minutes, POS screens angled away from guests, no Restricted data on personal phones, print only when needed and shred. Add labeling (header/footer 'CONFIDENTIAL') and sharing rules."
      },
      {
        title: "Set retention and disposal",
        body: "Retention: reservation data 24 months after last visit, camera footage 30 days unless tied to an incident, payroll records as long as tax rules require (confirm with your accountant), security logs 12 months. Disposal by NIST SP 800-88: Clear = logical overwrite that defeats simple recovery (reuse inside the business); Purge = defeats lab recovery, such as cryptographic erase or the drive's sanitize command (leaving the business's control); Destroy = shred, disintegrate or incinerate (failed drives, end of life). SSDs are not reliably cleared by overwriting; use purge (crypto erase) or destroy, and keep a certificate of sanitization."
      },
      {
        title: "Sketch a DLP rule",
        body: "Write one rule in plain terms that a Microsoft Purview or Google Workspace DLP policy could implement: 'IF an outgoing email or file share contains a credit-card number (16 digits that pass the Luhn check) OR 5+ phone-number-and-name pairs, AND the recipient is outside the business domain, THEN block, notify the sender and alert the owner.' Note the false-positive risk (order numbers that look like cards) and how you would tune it."
      },
      {
        title: "Create an encrypted LUKS container",
        body: "LUKS gives you an encrypted volume stored in a single file, like an encrypted vault for Restricted files. cryptsetup attaches the file through a loop device automatically. Type YES in capitals when asked and choose a strong passphrase.",
        cmd: "sudo apt update && sudo apt install -y cryptsetup\nfallocate -l 64M ~/vault.img\nsudo cryptsetup luksFormat ~/vault.img\nsudo cryptsetup open ~/vault.img vault\nsudo mkfs.ext4 -q /dev/mapper/vault\nsudo mkdir -p /mnt/vault && sudo mount /dev/mapper/vault /mnt/vault\necho 'SAMPLE payroll - fake data' | sudo tee /mnt/vault/payroll-sample.txt\nsudo cryptsetup status vault",
        check: "cryptsetup status shows 'type: LUKS2' and a cipher such as aes-xts-plain64."
      },
      {
        title: "Close the vault and prove it is unreadable",
        body: "Once unmounted and closed, the file is just ciphertext. Searching it for your text finds nothing, and luksDump shows only the header metadata.",
        cmd: "sudo umount /mnt/vault && sudo cryptsetup close vault\ngrep -c 'SAMPLE payroll' ~/vault.img || echo 'not found in ciphertext'\nsudo cryptsetup luksDump ~/vault.img | head -20",
        check: "grep prints 0 / 'not found in ciphertext'."
      },
      {
        title: "Encrypt a single file with gpg",
        body: "For sending one Restricted file (for example an export for the accountant), symmetric gpg encryption works; share the passphrase over a different channel (phone call, not the same email).",
        cmd: "printf 'Guest,Phone\\nJane Doe,555-0100\\n' > ~/guests-sample.csv\ngpg --symmetric --cipher-algo AES256 ~/guests-sample.csv\nls -l ~/guests-sample.csv.gpg\nfile ~/guests-sample.csv.gpg\nshred -u ~/guests-sample.csv\ngpg --decrypt ~/guests-sample.csv.gpg",
        check: "file reports PGP symmetric-key encrypted data, and decrypt prints the sample rows after the passphrase prompt."
      },
      {
        title: "Check TLS in transit",
        body: "Check the lounge's (or any public) website and the reservation platform's site for protocol version, certificate issuer and expiry. Test only public sites in normal browsing ways; this is a single standard connection, not a scan.",
        cmd: "openssl s_client -connect example.com:443 -servername example.com -brief </dev/null\necho | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null | openssl x509 -noout -issuer -dates\ncurl -sI https://example.com | grep -i strict-transport-security || echo 'no HSTS header'",
        check: "You see 'Protocol version: TLSv1.3' (or 1.2), the issuer and a notAfter date in the future. Record whether HSTS is set."
      },
      {
        title: "Write the handling standard",
        body: "Combine the levels, inventory, handling matrix, retention schedule, disposal methods and DLP rule into a two-page Data Classification and Handling Standard. Add evidence from the lab (LUKS status, gpg file type, TLS output) as an appendix showing how the controls work."
      }
    ],
    verify: [
      "Every lounge data set in your table has exactly one of the four levels, an owner and a legal driver where relevant.",
      "Your handling matrix covers at rest, in transit and in use for all four levels.",
      "You can show the closed LUKS file does not contain your plaintext and the gpg file decrypts only with the passphrase.",
      "You can explain when to use clear, purge and destroy, and why overwriting is not enough for SSDs."
    ],
    deliverable: "Save the classification scheme, the data inventory, the handling and retention matrix, the DLP rule and screenshots of cryptsetup status, the grep test and the openssl output. Write it up as 'Data Classification and Handling Standard for a hospitality business' with a lab-evidence appendix.",
    resume: "Designed a four-tier data classification and handling standard for a hospitality business, classifying 10+ data sets with retention and NIST SP 800-88 disposal rules, and demonstrated at-rest (LUKS2, AES-256 gpg) and in-transit (TLS 1.3) encryption controls.",
    interview: [
      "What is the difference between clear, purge and destroy? — Clear defeats simple recovery (overwrite), purge defeats laboratory recovery (crypto erase, sanitize command, degauss for magnetic media), and destroy makes the media unusable (shred, incinerate).",
      "Who decides a data set's classification? — The data owner (a business role) classifies it; custodians such as IT implement the handling controls.",
      "Why is data minimization a security control? — Data you never collect or have deleted cannot be breached, and it shrinks compliance scope (for example PCI DSS)."
    ],
    cleanup: [
      "rm ~/vault.img ~/guests-sample.csv.gpg && sudo rmdir /mnt/vault"
    ],
    links: [
      { label: "NIST SP 800-88: Guidelines for Media Sanitization", url: "https://csrc.nist.gov/pubs/sp/800/88/r2/final" },
      { label: "cryptsetup / LUKS project documentation", url: "https://gitlab.com/cryptsetup/cryptsetup/-/wikis/home" },
      { label: "PCI Security Standards Council document library", url: "https://www.pcisecuritystandards.org/document_library/" }
    ]
  },

  {
    id: "lab-cloud-iam",
    title: "Secure a new AWS account: root MFA, least privilege, logging",
    track: "GRC & architecture",
    level: "Intermediate",
    minutes: 150,
    cost: "Free if you follow the steps and clean up (AWS free tier; set a $1 budget alert FIRST)",
    summary: "Lock down a brand-new AWS account the way a cloud security engineer would: a $1 budget alert, root MFA, an admin identity in IAM Identity Center, a least-privilege policy for one S3 bucket, Block Public Access and encryption, CloudTrail and IAM Access Analyzer — then delete everything.",
    realWorld: "Misconfigured cloud identities and public storage are among the most common causes of cloud breaches. Cloud security and GRC roles review exactly these settings, often against the CIS AWS Foundations Benchmark.",
    youWillNeed: ["An AWS account you own (a credit card is required at sign-up; read the current free-tier or free-plan terms on aws.amazon.com/free)", "An authenticator app or security key for MFA", "AWS CLI v2 on your Ubuntu VM or host"],
    safety: "COST WARNING: cloud resources can bill you. Create the $1 budget alert before anything else, use only the services named here, and do the cleanup section the same day. Never paste access keys into code, screenshots or GitHub.",
    steps: [
      {
        title: "Understand the shared responsibility model",
        body: "AWS secures the cloud itself (data centers, hardware, hypervisors, the managed service software). You secure what you put in the cloud: identities and permissions, data classification and encryption settings, network rules, and for EC2 the guest OS and patching. The line moves with the service type: you manage more with IaaS (EC2) than with managed services like S3. Almost every cloud breach is on the customer side of the line, which is what this lab covers."
      },
      {
        title: "Create a $1 budget alert first",
        body: "Sign in as root once. Go to Billing and Cost Management > Budgets > Create budget > Use a template > Zero spend budget (alerts at the first cent) or a Monthly cost budget of $1.00, and enter your email. Also turn on Free Tier usage alerts under Billing preferences if offered.",
        check: "The Budgets page lists your budget with status OK and your email as the recipient."
      },
      {
        title: "Secure the root user",
        body: "Still as root: account name menu > Security credentials > Assign MFA device, and register an authenticator app or passkey/security key (a second device is recommended as backup). Confirm there are no root access keys; delete any that exist. Use a long unique password in a password manager. From now on, root is only for the few tasks that require it.",
        check: "IAM dashboard > Security recommendations shows root MFA as enabled and no root access keys."
      },
      {
        title: "Create an admin identity in IAM Identity Center",
        body: "Open IAM Identity Center in one Region you will use (for example us-east-1) and click Enable. Create a user (your name) and a permission set from the predefined AdministratorAccess policy with a 1-hour session. Under AWS accounts, assign your user with that permission set. Accept the email invite, set a password and register MFA. Sign out of root and bookmark the AWS access portal URL. Identity Center gives short-lived credentials instead of long-lived access keys."
      },
      {
        title: "Install the AWS CLI and sign in with SSO",
        body: "Install AWS CLI v2 from the official zip (the apt package may be older), then configure an SSO profile using the access portal URL. The CLI opens a browser (or gives you a code) to log in.",
        cmd: "sudo apt update && sudo apt install -y unzip jq\ncurl \"https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip\" -o awscliv2.zip\nunzip -q awscliv2.zip && sudo ./aws/install\naws --version\naws configure sso --profile admin\naws sts get-caller-identity --profile admin",
        check: "get-caller-identity shows an ARN containing 'AWSReservedSSO_AdministratorAccess'."
      },
      {
        title: "Turn on account-level S3 Block Public Access",
        body: "This is the account-wide safety net that overrides any bucket policy or ACL that tries to make data public.",
        cmd: "ACCT=$(aws sts get-caller-identity --profile admin --query Account --output text)\naws s3control put-public-access-block --account-id $ACCT --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true --profile admin\naws s3control get-public-access-block --account-id $ACCT --profile admin",
        check: "All four settings return true."
      },
      {
        title: "Create an encrypted bucket",
        body: "Bucket names are global, so add random characters. New buckets already have Block Public Access on and default SSE-S3 encryption; you still set and verify it explicitly, because auditors want evidence, not assumptions.",
        cmd: "BUCKET=eleven-lab-$(openssl rand -hex 4)\necho $BUCKET\naws s3api create-bucket --bucket $BUCKET --region us-east-1 --profile admin\naws s3api put-bucket-encryption --bucket $BUCKET --server-side-encryption-configuration '{\"Rules\":[{\"ApplyServerSideEncryptionByDefault\":{\"SSEAlgorithm\":\"AES256\"},\"BucketKeyEnabled\":true}]}' --profile admin\naws s3api get-bucket-encryption --bucket $BUCKET --profile admin\naws s3api get-public-access-block --bucket $BUCKET --profile admin",
        check: "get-bucket-encryption shows SSEAlgorithm AES256 and the bucket's public access block is all true. (Outside us-east-1, add --create-bucket-configuration LocationConstraint=<region>.)"
      },
      {
        title: "Write a least-privilege policy for that one bucket",
        body: "The menu-upload job should only list, read and write objects in this bucket — nothing else. Note the two resources: the bucket ARN for ListBucket and bucket/* for object actions.",
        cmd: "cat > s3-menu-policy.json <<EOF\n{\n  \"Version\": \"2012-10-17\",\n  \"Statement\": [\n    { \"Sid\": \"ListThisBucket\", \"Effect\": \"Allow\", \"Action\": \"s3:ListBucket\", \"Resource\": \"arn:aws:s3:::$BUCKET\" },\n    { \"Sid\": \"ObjectsInThisBucket\", \"Effect\": \"Allow\", \"Action\": [\"s3:GetObject\", \"s3:PutObject\"], \"Resource\": \"arn:aws:s3:::$BUCKET/*\" }\n  ]\n}\nEOF\njq . s3-menu-policy.json"
      },
      {
        title: "Assign it and test allow and deny",
        body: "In IAM Identity Center create a second permission set 'S3MenuBucketOnly' with the JSON above as its inline policy, and assign it to your user on your account. Then configure a second CLI profile that uses that permission set and test: the allowed actions succeed and everything else is denied.",
        cmd: "aws configure sso --profile s3menu\necho 'menu v1' > menu.txt\naws s3 cp menu.txt s3://$BUCKET/menu.txt --profile s3menu\naws s3 ls s3://$BUCKET --profile s3menu\naws s3 ls --profile s3menu\naws iam list-users --profile s3menu",
        check: "The copy and bucket listing succeed; listing all buckets and list-users fail with AccessDenied."
      },
      {
        title: "View activity in CloudTrail",
        body: "CloudTrail Event history keeps 90 days of management events at no charge, with no setup. Find your own actions from the last steps. (A trail that saves to S3 is useful for long-term retention; your first copy of management events is free but S3 storage is not — if you create one, delete it and its bucket in cleanup.)",
        cmd: "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=CreateBucket --max-results 5 --profile admin --query 'Events[].{time:EventTime,user:Username,event:EventName}'\naws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=PutBucketEncryption --max-results 5 --profile admin --query 'Events[].{time:EventTime,user:Username}'",
        check: "You see your CreateBucket and PutBucketEncryption events with your SSO user name. Events can take up to about 15 minutes to appear."
      },
      {
        title: "Run IAM Access Analyzer",
        body: "An external access analyzer (free) flags resources shared outside your account, such as a public bucket or a role trusted by another account. Do not create the 'unused access' analyzer type; it is billed per role/user.",
        cmd: "aws accessanalyzer create-analyzer --analyzer-name lab-external --type ACCOUNT --region us-east-1 --profile admin\naws accessanalyzer list-findings-v2 --analyzer-arn $(aws accessanalyzer list-analyzers --region us-east-1 --profile admin --query 'analyzers[0].arn' --output text) --region us-east-1 --profile admin",
        check: "The findings list is empty (nothing is shared externally) — screenshot this as evidence. Also try Access Analyzer's policy validation on your JSON in the console."
      },
      {
        title: "Check the IAM security recommendations",
        body: "Open IAM > Dashboard and the Security Hub or Trusted Advisor free checks if available, and screenshot the state: root MFA on, no root keys, no IAM users with long-lived keys, Block Public Access on. Compare against a few CIS AWS Foundations Benchmark IAM items and note which you meet."
      },
      {
        title: "Clean up the same day",
        body: "Remove everything billable or risky, then look at Billing > Bills the next day to confirm $0.00. Keep the budget alert and root MFA in place for the life of the account.",
        cmd: "aws s3 rm s3://$BUCKET --recursive --profile admin\naws s3api delete-bucket --bucket $BUCKET --profile admin\naws accessanalyzer delete-analyzer --analyzer-name lab-external --region us-east-1 --profile admin\naws s3 ls --profile admin",
        check: "aws s3 ls no longer shows the bucket. Then remove the S3MenuBucketOnly assignment and permission set in Identity Center."
      }
    ],
    verify: [
      "A budget alert exists and root has MFA with no access keys.",
      "Your s3menu profile can read and write only its bucket and gets AccessDenied everywhere else.",
      "You found your own CreateBucket event in CloudTrail and saw zero external-access findings in Access Analyzer.",
      "After cleanup, the bucket and analyzer are gone and the next day's bill shows $0.00."
    ],
    deliverable: "Write 'Hardening a new AWS account' with a shared-responsibility diagram, screenshots (budget, root MFA, allow/deny tests, CloudTrail events, Access Analyzer), your least-privilege JSON with an explanation of each statement, and a checklist mapping what you did to CIS AWS Foundations IAM and logging items. Redact account IDs.",
    resume: "Hardened a new AWS account by enforcing root MFA, SSO-based admin access via IAM Identity Center, least-privilege S3 policies validated with allow/deny tests, account-wide Block Public Access, and CloudTrail/IAM Access Analyzer review, at $0 cost.",
    interview: [
      "Explain the shared responsibility model. — The provider secures the cloud infrastructure; the customer secures what they put in it: identities, data, configurations and (for IaaS) the OS; the split shifts by service type.",
      "Why prefer IAM Identity Center over IAM users with access keys? — It gives central, MFA-backed users with short-lived temporary credentials, removing long-lived keys that leak and are hard to rotate.",
      "How do you keep S3 data from becoming public? — Account-level Block Public Access, least-privilege bucket and identity policies, default encryption, and continuous checks with Access Analyzer and CloudTrail."
    ],
    cleanup: [
      "Empty and delete the lab bucket, delete the Access Analyzer, and any trail plus its log bucket if you created one.",
      "In IAM Identity Center, remove the S3MenuBucketOnly assignment and permission set (keep your admin user if you will reuse the account).",
      "rm -f s3-menu-policy.json menu.txt awscliv2.zip; keep the budget alert and root MFA on permanently."
    ],
    links: [
      { label: "AWS Shared Responsibility Model", url: "https://aws.amazon.com/compliance/shared-responsibility-model/" },
      { label: "Security best practices in IAM", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html" },
      { label: "Blocking public access to your Amazon S3 storage", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html" }
    ]
  },

  {
    id: "lab-appsec-zap",
    title: "Scan your own OWASP Juice Shop with ZAP and map to the OWASP Top 10",
    track: "GRC & architecture",
    level: "Intermediate",
    minutes: 120,
    cost: "Free",
    summary: "Run the deliberately vulnerable OWASP Juice Shop on localhost, scan it with ZAP's baseline (and optionally full) scan, triage the alerts, and map five findings to OWASP Top 10 (2021) categories with the correct developer fix for each.",
    realWorld: "AppSec engineers and pentest consultants run DAST scans in CI and before releases, then turn raw alerts into prioritized, developer-ready tickets. Mapping findings to the OWASP Top 10 is how they communicate risk to developers and auditors.",
    youWillNeed: ["Your Ubuntu VM from lab-home-lab with Docker installed", "About 4 GB free RAM", "A browser (on the VM or your host)"],
    requires: ["lab-home-lab"],
    safety: "Only scan the Juice Shop container you run yourself on 127.0.0.1 or an isolated Docker network. Never point ZAP at a site you do not own or lack written permission to test; active scans send attack traffic. This lab is about scanning and triage, not exploitation.",
    steps: [
      {
        title: "Start Juice Shop on a private Docker network",
        body: "A user-defined network lets the ZAP container reach Juice Shop by name, and publishing only on 127.0.0.1 keeps it off your LAN. Pull the official image.",
        cmd: "docker network create zapnet\ndocker run -d --name juice-shop --network zapnet -p 127.0.0.1:3000:3000 bkimminich/juice-shop\ndocker logs -f juice-shop   # Ctrl+C once you see 'Server listening on port 3000'",
        check: "curl -s http://127.0.0.1:3000 | head -c 200 returns HTML, and the shop opens in a browser at http://127.0.0.1:3000."
      },
      {
        title: "Look around like a user",
        body: "Browse the shop, create a test account, search for a product and add it to the basket. Note the technologies (Angular single-page app, REST API under /rest and /api). Knowing the app helps you judge which alerts are real."
      },
      {
        title: "Pull the ZAP image and prepare an output folder",
        body: "The official image is published to GitHub Container Registry. The container runs as a non-root 'zap' user, so the mounted folder must be writable.",
        cmd: "docker pull ghcr.io/zaproxy/zaproxy:stable\nmkdir -p ~/zap-out && chmod 777 ~/zap-out"
      },
      {
        title: "Run the baseline scan",
        body: "The baseline scan spiders the app and runs passive checks only (no attacks). -j adds the AJAX spider, which matters for single-page apps like Juice Shop; -I stops warnings from failing the exit code.",
        cmd: "docker run --rm --network zapnet -v ~/zap-out:/zap/wrk/:rw -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t http://juice-shop:3000 -j -I -r baseline.html -J baseline.json -w baseline.md\nls ~/zap-out",
        check: "baseline.html, baseline.json and baseline.md exist and the console summary shows WARN-NEW counts."
      },
      {
        title: "Optional: run a full (active) scan against your own container",
        body: "The full scan adds active tests, which is how injection-type issues appear. It sends attack traffic, so run it only against this local container. It can take 20–60 minutes; -m limits the spider time in minutes.",
        cmd: "docker run --rm --network zapnet -v ~/zap-out:/zap/wrk/:rw -t ghcr.io/zaproxy/zaproxy:stable zap-full-scan.py -t http://juice-shop:3000 -j -m 5 -I -r full.html -J full.json"
      },
      {
        title: "Triage the alerts",
        body: "Open baseline.html (and full.html). For each alert record: name, risk (High/Medium/Low/Informational), confidence, URL, evidence and CWE ID. Decide true positive, false positive or accepted risk. Informational alerts such as 'Modern Web Application' are context, not findings.",
        cmd: "jq -r '.site[].alerts[] | [.riskdesc, .name, .cweid, .count] | @tsv' ~/zap-out/baseline.json | sort -r",
        check: "You have a table of unique alerts sorted by risk."
      },
      {
        title: "Map five findings to the OWASP Top 10 (2021)",
        body: "Pick five and map each by its CWE. Typical Juice Shop results: Content Security Policy header not set and missing security headers → A05 Security Misconfiguration; Cross-Domain Misconfiguration (overly broad CORS) → A05 (and A01 if it exposes authenticated data); Vulnerable JS Library → A06 Vulnerable and Outdated Components; SQL Injection from the active scan → A03 Injection; cookies without Secure/HttpOnly/SameSite or session issues → A07 Identification and Authentication Failures. If you need an access-control example, use the Juice Shop score board's Broken Access Control category description → A01. (OWASP has since published a 2025 edition; note how your categories map there too.)"
      },
      {
        title: "Write the fix for injection (A03)",
        body: "The root cause is building a SQL query by concatenating user input. The fix is parameterized queries (prepared statements) or a safe ORM method, so input is always treated as data: for example db.query('SELECT * FROM Products WHERE name LIKE ?', ['%' + term + '%']) instead of string concatenation. Add server-side input validation (allow-lists) and a least-privilege database account as defense in depth."
      },
      {
        title: "Write the fix for XSS and headers (A03/A05)",
        body: "For cross-site scripting, encode output for its context (HTML body, attribute, JavaScript, URL) and use the framework's safe binding instead of bypassing sanitization (in Angular, avoid bypassSecurityTrustHtml with user data). Then add security headers: a restrictive Content-Security-Policy, X-Content-Type-Options: nosniff, frame-ancestors 'self' (or X-Frame-Options), Referrer-Policy, and Strict-Transport-Security once served over HTTPS. In Express this is commonly done with the helmet middleware."
      },
      {
        title: "Write the fix for access control and components (A01/A06)",
        body: "Access control: enforce authorization on the server for every request (deny by default, check that the logged-in user owns the basket or order ID requested, never rely on hidden UI), and restrict CORS to known origins. Components: upgrade the flagged library, add dependency scanning (npm audit, Trivy) to CI, and keep a software bill of materials."
      },
      {
        title: "Turn it into developer tickets",
        body: "For each of the five findings write a ticket: title, OWASP category and CWE, affected URL, evidence (from ZAP, trimmed), risk rating with justification, fix, and how to verify the fix (for headers, rerun the baseline and confirm the alert is gone)."
      }
    ],
    verify: [
      "You have ZAP HTML and JSON reports for a scan of your local Juice Shop container.",
      "Five findings are mapped to OWASP Top 10 (2021) categories with CWE IDs.",
      "Each finding has a specific fix (parameterized queries, output encoding, server-side access checks, security headers or component upgrade).",
      "You can explain the difference between ZAP's baseline (passive) and full (active) scans."
    ],
    deliverable: "Publish a DAST report: scope and safety statement (local container only), tools and versions, method, a summary table of the five findings (risk, OWASP category, CWE, fix), and the ZAP HTML report as an appendix. Add one paragraph on false positives you dismissed and why.",
    resume: "Performed DAST scanning of OWASP Juice Shop with ZAP (baseline and full scans) in an isolated Docker lab, triaged alerts and delivered five developer-ready findings mapped to the OWASP Top 10 with remediations such as parameterized queries, output encoding and security headers.",
    interview: [
      "How do you prevent SQL injection? — Use parameterized queries or prepared statements (or a safe ORM) so input is never executed as SQL, plus input validation and a least-privilege DB account.",
      "What is the difference between a passive and an active scan? — A passive scan only inspects traffic it sees; an active scan sends crafted requests to find flaws, so it needs permission and is run on test systems.",
      "Why don't security headers alone fix XSS? — CSP is a mitigation layer; the fix is context-aware output encoding and safe framework bindings, with CSP limiting damage if something slips through."
    ],
    cleanup: [
      "docker rm -f juice-shop && docker network rm zapnet",
      "Optionally remove images: docker rmi bkimminich/juice-shop ghcr.io/zaproxy/zaproxy:stable"
    ],
    links: [
      { label: "ZAP Baseline Scan (Docker)", url: "https://www.zaproxy.org/docs/docker/baseline-scan/" },
      { label: "OWASP Top 10:2021", url: "https://owasp.org/Top10/2021/" },
      { label: "OWASP Juice Shop", url: "https://owasp.org/www-project-juice-shop/" }
    ]
  },

  {
    id: "lab-threat-model",
    title: "Threat model the lounge's reservation site with OWASP Threat Dragon",
    track: "GRC & architecture",
    level: "Intermediate",
    minutes: 120,
    cost: "Free",
    summary: "Draw a data flow diagram of 11:Eleven's online reservation system in OWASP Threat Dragon, mark trust boundaries, apply STRIDE to each element, rate and mitigate the threats, and export the model and a report.",
    realWorld: "Security architects run threat models during design reviews, before code is written, because design flaws are the most expensive to fix later. 'Walk me through a threat model' is a common architecture and AppSec interview exercise.",
    youWillNeed: ["OWASP Threat Dragon desktop app (download the installer for your OS from the project's GitHub releases page)", "A description of the reservation flow (below)"],
    steps: [
      {
        title: "Describe the system in words",
        body: "Write the scope: guests book tables on the lounge's website, which embeds a SaaS reservation widget. Guests enter name, phone, email, party size and optional birthday. A deposit for VIP tables is taken by the payment processor's hosted page. Staff use a tablet at the host stand to view and update bookings, and the reservation platform sends confirmation texts and emails. The owner exports a monthly guest list for marketing."
      },
      {
        title: "Install Threat Dragon and create a model",
        body: "Download the current desktop release (Windows installer, macOS dmg or Linux AppImage/deb) from github.com/OWASP/threat-dragon/releases — check the releases page for the latest version. Open it, choose to work locally, create a new threat model named '11:Eleven Reservations', fill in owner and description, and add a new diagram of type STRIDE.",
        check: "The diagram editor opens with a stencil of Actor, Process, Store, Data Flow and Trust Boundary shapes."
      },
      {
        title: "Draw the external entities (actors)",
        body: "Add Actors: Guest (browser/phone), Host-stand staff, Owner/manager, Payment processor, SMS/email provider. External entities are things you do not control but that interact with the system."
      },
      {
        title: "Draw processes and data stores",
        body: "Add Processes: Lounge website (static site), Reservation widget/API (SaaS), Admin portal, Notification service. Add Stores: Reservation database (guest PII), Marketing export (CSV on the owner's laptop), Audit log. Mark stores that hold PII in their description."
      },
      {
        title: "Connect data flows and label them",
        body: "Draw flows with what they carry and the protocol: Guest → Website (HTTPS page load); Guest → Reservation API (HTTPS: name, phone, email, party size); Reservation API → Reservation DB (booking record); Guest → Payment processor (HTTPS hosted payment page, card data never touches the lounge); Payment processor → Reservation API (deposit status webhook); Staff tablet → Admin portal (HTTPS, staff login); Reservation API → Notification service → Guest (SMS/email); Owner → Admin portal → Marketing export (CSV download). Mark each flow's 'Is encrypted' and 'Is public network' properties."
      },
      {
        title: "Add trust boundaries",
        body: "Draw boundary boxes where the level of trust changes: Internet vs the reservation SaaS; the SaaS vs the payment processor; the lounge's staff network vs the internet; the owner's laptop. Every flow crossing a boundary is where attackers usually get in, so those flows get the most attention.",
        check: "At least four flows cross a trust boundary."
      },
      {
        title: "Apply STRIDE per element",
        body: "Select each element and add threats in the right categories. Spoofing (processes, actors): staff credentials phished → admin portal takeover. Tampering (flows, stores): forged deposit-status webhook marks an unpaid VIP booking as paid. Repudiation (processes): staff deletes a booking and denies it, no audit trail. Information disclosure (stores, flows): marketing CSV emailed or left on an unencrypted laptop; API returns other guests' bookings when the booking ID is changed. Denial of service (processes): bots mass-book tables on a Saturday. Elevation of privilege (processes): host-stand role can reach owner-only exports.",
        check: "Every process has threats considered in all six categories, and every store and crossing flow has at least one threat."
      },
      {
        title: "Rate each threat",
        body: "Set Threat Dragon's severity field and write a short justification using likelihood × impact from your risk scales (see lab-risk-register). Example: admin portal takeover via phishing — likely (4) × major (4) = High; forged webhook — possible (3) × moderate (3) = Medium."
      },
      {
        title: "Choose mitigations",
        body: "Write a mitigation for each threat and set its status (Open/Mitigated/Not applicable). Examples: MFA and role-based access on the admin portal; verify webhook signatures and re-check payment status with the processor's API; immutable audit log of booking changes; object-level authorization checks on booking IDs; rate limiting and CAPTCHA on booking; encrypt and auto-delete marketing exports after 30 days, or share via the platform instead of CSV. Mark which ones are the vendor's responsibility versus the lounge's.",
        check: "No High threat is left without a mitigation or an explicit risk acceptance."
      },
      {
        title: "Export the model and the report",
        body: "Save the model as JSON (it is the machine-readable source you can version in Git). Open the report view, include the diagram and threats (hide 'Not applicable' ones if you like) and print or save it to PDF.",
        check: "You have 11-eleven-reservations.json and a PDF report showing the diagram and the threat table."
      },
      {
        title: "Write findings for the vendor and the owner",
        body: "Split the mitigations into three lists: questions for the reservation vendor (MFA support, webhook signing, audit logs, rate limiting — feed these into lab-vendor-risk), configuration changes the lounge can make today, and process changes (export handling, staff offboarding)."
      }
    ],
    verify: [
      "Your diagram has actors, processes, stores, labeled data flows and at least three trust boundaries.",
      "Each element has STRIDE threats with severity, mitigation and status filled in.",
      "You exported the model JSON and a PDF report.",
      "You can explain which STRIDE categories apply to which element types."
    ],
    deliverable: "Publish the DFD image, the Threat Dragon JSON and the PDF report, plus a one-page summary of the top five threats and mitigations split by owner (vendor vs lounge). Explain your trust boundaries in two sentences each.",
    resume: "Threat-modeled a hospitality reservation system in OWASP Threat Dragon, producing a data flow diagram with trust boundaries and a STRIDE analysis of 20+ threats with severity ratings and mitigations assigned to the business and its SaaS vendor.",
    interview: [
      "What does STRIDE stand for? — Spoofing, Tampering, Repudiation, Information disclosure, Denial of service and Elevation of privilege; each maps to a violated property (authentication, integrity, non-repudiation, confidentiality, availability, authorization).",
      "What is a trust boundary? — A point where data or execution passes between different levels of trust, such as internet to server; flows crossing it need validation, authentication and encryption.",
      "When should you threat model? — During design and whenever the architecture changes, so flaws are fixed before they are built."
    ],
    links: [
      { label: "OWASP Threat Dragon", url: "https://owasp.org/www-project-threat-dragon/" },
      { label: "OWASP Threat Modeling Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html" },
      { label: "Threat Dragon documentation", url: "https://www.threatdragon.com/docs/" }
    ]
  },

  {
    id: "lab-iam-sso",
    title: "Run identity and access management with Keycloak (RBAC, MFA, OIDC)",
    track: "GRC & architecture",
    level: "Intermediate",
    minutes: 150,
    cost: "Free",
    summary: "Stand up Keycloak in dev mode, build a realm for the lounge with users, groups and roles, enforce TOTP MFA, connect a sample OIDC app, run a joiner-mover-leaver scenario and finish with an access review.",
    realWorld: "IAM analysts provision and deprovision accounts, maintain role models and run quarterly access reviews for SOX, SOC 2 and PCI. Keycloak is a widely used open-source identity provider, and the concepts carry over directly to Entra ID, Okta and Google Workspace.",
    youWillNeed: ["Your Ubuntu VM from lab-home-lab with Docker", "A browser that can reach the VM (use the VM's browser or an SSH tunnel: ssh -L 8080:localhost:8080 user@vm)", "An authenticator app (Google Authenticator, Microsoft Authenticator, FreeOTP)"],
    requires: ["lab-home-lab"],
    safety: "Dev mode uses HTTP, an in-memory/dev database and a default admin password: it is for a local lab only. Never expose it to a network or use it in production.",
    steps: [
      {
        title: "Start Keycloak in dev mode",
        body: "Use the official image from quay.io. Check keycloak.org/downloads (or the Getting started with Docker guide) for the current version tag and put it in place of 'latest' so your lab is repeatable.",
        cmd: "docker run -d --name keycloak -p 127.0.0.1:8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev\ndocker logs -f keycloak   # Ctrl+C when you see 'Running the server in development mode'",
        check: "http://localhost:8080/admin opens the admin console and you can log in as admin/admin."
      },
      {
        title: "Create the realm",
        body: "A realm is an isolated tenant with its own users, roles and clients; the built-in 'master' realm is only for administering Keycloak. Use the realm dropdown > Create realm, name it 'eleven'.",
        check: "The realm selector shows 'eleven'."
      },
      {
        title: "Design and create the role model (RBAC)",
        body: "Create realm roles that match jobs, not people: 'host' (view/edit today's bookings), 'bartender' (POS only), 'manager' (bookings, schedules, reports), 'owner' (everything including exports and payroll). Then create groups Host Stand, Bar, Management and assign the roles to groups (Groups > group > Role mapping). Users get access by group membership, which keeps changes simple and auditable.",
        check: "Each group has exactly one role mapped, and no user has roles assigned directly."
      },
      {
        title: "Create users (joiners)",
        body: "Create users 'maya.host', 'dre.bartender' and 'sam.manager' with email and first/last name, join each to the right group, and on the Credentials tab set a temporary password (Temporary = On) so they must change it at first login."
      },
      {
        title: "Enforce TOTP MFA",
        body: "Review Authentication > Policies > OTP Policy (TOTP, 6 digits, 30 seconds works with common apps). For each user, open Details > Required user actions and add 'Configure OTP'. The default browser flow then prompts for the one-time code on every login once a user has OTP configured. For stricter enforcement (everyone must enroll), set 'Configure OTP' as a default action under Authentication > Required actions."
      },
      {
        title: "Register a sample OIDC client",
        body: "Keycloak hosts a test single-page app for exactly this. Clients > Create client: Client type OpenID Connect, Client ID 'eleven-portal'; leave Client authentication off (public SPA) with Standard flow on; Valid redirect URIs https://www.keycloak.org/app/* and Web origins https://www.keycloak.org. Save."
      },
      {
        title: "Log in through the app with MFA",
        body: "Open https://www.keycloak.org/app/ (it runs in your browser and talks to your localhost Keycloak). Enter URL http://localhost:8080, realm 'eleven', client 'eleven-portal', Save, then Sign in as maya.host. Change the temporary password, scan the QR code with your authenticator and enter the code.",
        check: "The test app greets you by name. Sign out and in again: you are now asked for the OTP code."
      },
      {
        title: "Inspect the tokens and the OIDC metadata",
        body: "OIDC discovery publishes the endpoints and signing keys. Then in the admin console open Clients > eleven-portal > Client scopes > Evaluate, choose maya.host, and view the generated access token and ID token. Find 'realm_access.roles' containing 'host' — this is what an app uses for authorization.",
        cmd: "curl -s http://localhost:8080/realms/eleven/.well-known/openid-configuration | jq '{issuer, authorization_endpoint, token_endpoint, jwks_uri}'",
        check: "The issuer is http://localhost:8080/realms/eleven and the access token lists the 'host' role."
      },
      {
        title: "Handle a mover",
        body: "Maya is promoted from host to manager. Remove her from Host Stand and add her to Management — do not just add the new group, or she keeps both sets of access (privilege creep). Re-run the Evaluate tab to confirm her token now lists 'manager' and not 'host'."
      },
      {
        title: "Handle a leaver",
        body: "Dre quits. Same day: Users > dre.bartender > toggle Enabled off, open the Sessions tab and sign out all sessions, and remove group membership. Disabling (rather than deleting) keeps the account for audit history; delete it after your retention period. Try logging in as Dre in the test app.",
        check: "Dre's login fails with an 'account is disabled' message."
      },
      {
        title: "Run an access review",
        body: "Export who has what using the admin CLI inside the container, then review it as the owner would: is every enabled user still employed, in the right group, with MFA configured? Record approve/revoke decisions with date and reviewer.",
        cmd: "docker exec keycloak /opt/keycloak/bin/kcadm.sh config credentials --server http://localhost:8080 --realm master --user admin --password admin\ndocker exec keycloak /opt/keycloak/bin/kcadm.sh get users -r eleven --fields username,enabled,email\ndocker exec keycloak /opt/keycloak/bin/kcadm.sh get roles/manager/users -r eleven --fields username\ndocker exec keycloak /opt/keycloak/bin/kcadm.sh get groups -r eleven --fields id,name",
        check: "You have a list of users with enabled state and role/group membership, and dre.bartender shows enabled: false."
      },
      {
        title: "Compare SAML, OAuth 2.0 and OIDC",
        body: "Write a short comparison. SAML 2.0: XML-based federation for browser single sign-on, common in enterprise apps; the IdP sends a signed assertion. OAuth 2.0: an authorization framework that gives an app a scoped access token to call an API on the user's behalf; it does not by itself say who the user is. OpenID Connect: an identity layer on top of OAuth 2.0 that adds the ID token (a signed JWT about the user) and standard discovery, used by modern web and mobile apps. Keycloak supports all three."
      }
    ],
    verify: [
      "Users get roles only through groups, and each group maps to one job role.",
      "A user must enter a TOTP code to sign in to the sample OIDC app.",
      "After the mover change, the token shows only the new role; after the leaver change, login is blocked and sessions are gone.",
      "You have an access review record with approve/revoke decisions."
    ],
    deliverable: "Write 'IAM lifecycle with Keycloak': role model table, screenshots of group-role mappings, the MFA prompt, the token showing roles, the mover and leaver changes, and the access review sheet. Close with your SAML vs OAuth 2.0 vs OIDC comparison.",
    resume: "Built an RBAC identity platform in Keycloak with group-based roles, TOTP MFA and an OIDC-integrated application, and executed joiner-mover-leaver workflows and a documented access review that removed privilege creep and disabled a departed user's sessions.",
    interview: [
      "What is the difference between OAuth 2.0 and OIDC? — OAuth 2.0 delegates authorization via access tokens; OIDC adds authentication with a signed ID token and user info on top of it.",
      "What is privilege creep and how do you stop it? — Users accumulating access as they change roles; prevent it with group-based RBAC, removing old access on moves and regular access reviews.",
      "What should happen when someone leaves? — Disable the account the same day, revoke sessions and tokens, remove group memberships, rotate shared secrets they knew, and keep records for audit."
    ],
    cleanup: [
      "docker rm -f keycloak (dev mode data is lost when the container is removed)."
    ],
    links: [
      { label: "Keycloak: Getting started with Docker", url: "https://www.keycloak.org/getting-started/getting-started-docker" },
      { label: "Keycloak Server Administration Guide", url: "https://www.keycloak.org/docs/latest/server_admin/" },
      { label: "OpenID Connect Core 1.0", url: "https://openid.net/specs/openid-connect-core-1_0.html" }
    ]
  },

  {
    id: "lab-secure-sdlc",
    title: "Shift left: SAST, SCA and secret scanning in CI",
    track: "GRC & architecture",
    level: "Intermediate",
    minutes: 150,
    cost: "Free",
    summary: "Scan OWASP NodeGoat with Semgrep CE (SAST), npm audit and Trivy (SCA) and gitleaks (secrets), fix two findings, and wire the scans into a GitHub Actions workflow on your own repository.",
    realWorld: "DevSecOps and AppSec engineers run these scanners in every pull request so vulnerabilities are caught before release, when they are cheapest to fix. Secure SDLC evidence is requested in SOC 2 and PCI DSS audits.",
    youWillNeed: ["Your Ubuntu VM from lab-home-lab with Docker and git", "Node.js and npm (sudo apt install -y nodejs npm)", "A free GitHub account"],
    requires: ["lab-home-lab"],
    safety: "NodeGoat is intentionally vulnerable. Only scan it; if you run it, keep it on localhost. Never commit real secrets while testing gitleaks — use obviously fake values.",
    steps: [
      {
        title: "Know the three scanner types",
        body: "SAST (static application security testing) reads source code for insecure patterns without running it — Semgrep. SCA (software composition analysis) checks third-party dependencies against known CVEs — npm audit, Trivy. DAST (dynamic testing) attacks a running app from outside — ZAP in lab-appsec-zap. Secret scanning finds keys and passwords in code and git history — gitleaks. Each catches things the others miss."
      },
      {
        title: "Get the sample repo into your own GitHub",
        body: "Fork github.com/OWASP/NodeGoat in the GitHub web UI (so your Actions run on your copy), then clone your fork.",
        cmd: "git clone https://github.com/<your-username>/NodeGoat.git\ncd NodeGoat\ngit log --oneline | head -3"
      },
      {
        title: "Run Semgrep CE (SAST)",
        body: "Run the open-source engine from its official Docker image with public registry rulesets. Save JSON for triage.",
        cmd: "docker run --rm -v \"${PWD}:/src\" semgrep/semgrep semgrep scan --config p/javascript --config p/nodejsscan --config p/owasp-top-ten --json -o /src/semgrep.json\ndocker run --rm -v \"${PWD}:/src\" semgrep/semgrep semgrep scan --config p/javascript --config p/nodejsscan --config p/owasp-top-ten\njq '.results | length' semgrep.json",
        check: "Semgrep reports findings such as eval() on user input in app/routes/contributions.js."
      },
      {
        title: "Run npm audit (SCA)",
        body: "npm audit compares the lockfile against the GitHub advisory database. '--package-lock-only' creates or reads the lockfile without installing the old packages.",
        cmd: "npm install --package-lock-only --ignore-scripts\nnpm audit --package-lock-only\nnpm audit --package-lock-only --json > npm-audit.json\njq '.metadata.vulnerabilities' npm-audit.json",
        check: "A count of low/moderate/high/critical vulnerabilities in dependencies."
      },
      {
        title: "Run a Trivy filesystem scan",
        body: "Install Trivy from Aqua's official apt repository (steps at trivy.dev), then scan the folder for vulnerable dependencies, secrets and misconfigurations. If the install page shows a different repository URL or key than below, use the page's version. The Docker image aquasec/trivy is an alternative that needs no install. Compare its dependency findings with npm audit.",
        cmd: "sudo apt-get install -y wget gnupg\nwget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null\necho \"deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main\" | sudo tee /etc/apt/sources.list.d/trivy.list\nsudo apt-get update && sudo apt-get install -y trivy\ntrivy --version\ntrivy fs --scanners vuln,secret,misconfig --severity HIGH,CRITICAL .",
        check: "A table of HIGH/CRITICAL CVEs by package, plus any Dockerfile or secret findings."
      },
      {
        title: "Run gitleaks (secrets)",
        body: "Scan the working directory and the git history; a secret deleted in a later commit is still leaked. If the git mode complains about 'dubious ownership' inside the container, use the dir mode or install the binary from the gitleaks releases page.",
        cmd: "docker run --rm -v \"${PWD}:/repo\" ghcr.io/gitleaks/gitleaks:latest dir /repo -v\ndocker run --rm -v \"${PWD}:/repo\" ghcr.io/gitleaks/gitleaks:latest git /repo --report-path /repo/gitleaks.json\nls -l gitleaks.json",
        check: "gitleaks prints a findings count (possibly zero); review any hits to decide real vs test data."
      },
      {
        title: "Triage and pick two findings",
        body: "Put all results in one table: tool, rule/CVE, file:line, severity, true/false positive, fix. Pick one code fix and one dependency fix. A good code fix: NodeGoat's contributions route passes form fields to eval(), which lets input run as code (server-side JavaScript injection, OWASP A03)."
      },
      {
        title: "Fix finding 1: remove eval()",
        body: "In app/routes/contributions.js replace each eval(req.body.xxx) with parseInt(req.body.xxx, 10) and reject the request if Number.isNaN() is true. Parsing as a number treats input strictly as data. If the grep output looks different from the sed pattern (the repo may have changed), make the same edit by hand in an editor.",
        cmd: "grep -n 'eval(' app/routes/contributions.js\nsed -i 's/eval(req.body.\\([a-zA-Z]*\\))/parseInt(req.body.\\1, 10)/g' app/routes/contributions.js\ngrep -n 'parseInt' app/routes/contributions.js",
        check: "grep shows parseInt instead of eval, and rerunning Semgrep no longer reports eval in that file."
      },
      {
        title: "Fix finding 2: upgrade a vulnerable dependency",
        body: "Pick one HIGH or CRITICAL package from npm audit/Trivy with a fixed version listed. Update it in package.json (or run npm audit fix --package-lock-only for non-breaking fixes), then rescan. Note that major version bumps can break the app; in a real team you would run the tests.",
        cmd: "npm audit fix --package-lock-only\nnpm audit --package-lock-only | tail -5\ntrivy fs --scanners vuln --severity HIGH,CRITICAL . | tail -20",
        check: "The high/critical count is lower than your first run."
      },
      {
        title: "Add a GitHub Actions security workflow",
        body: "Create a workflow that runs on every push and pull request. Pin actions and images to a version or commit SHA (check each project's README for the current release): third-party actions have been hijacked in supply-chain attacks, such as tj-actions/changed-files in 2025.",
        cmd: "mkdir -p .github/workflows\ncat > .github/workflows/security.yml <<'EOF'\nname: security-scans\non: [push, pull_request]\npermissions:\n  contents: read\njobs:\n  sast:\n    runs-on: ubuntu-latest\n    container: semgrep/semgrep\n    steps:\n      - uses: actions/checkout@v4\n      - run: semgrep scan --config p/javascript --config p/nodejsscan --error\n  sca:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm audit --package-lock-only --audit-level=critical\n      - run: docker run --rm -v \"$PWD:/src\" aquasec/trivy:latest fs --exit-code 1 --severity CRITICAL --scanners vuln /src\n  secrets:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n        with:\n          fetch-depth: 0\n      - run: docker run --rm -v \"$PWD:/repo\" ghcr.io/gitleaks/gitleaks:latest dir /repo -v\nEOF\ngit add .github/workflows/security.yml app/routes/contributions.js package.json package-lock.json\ngit commit -m 'Add security scanning workflow; replace eval with parseInt; bump vulnerable dependency'\ngit push",
        check: "The Actions tab shows three jobs. Some may fail on NodeGoat's remaining issues — that is the gate working."
      },
      {
        title: "Tune the gate",
        body: "Decide the policy a real team would use: block the merge on new CRITICAL/HIGH SAST findings and any verified secret, warn on lower severities, and track accepted risks in a baseline or ignore file with a reason and expiry. Replace ':latest' tags with pinned versions and note it in your write-up."
      }
    ],
    verify: [
      "You have output from Semgrep, npm audit, Trivy and gitleaks for the same repo.",
      "Rescans show your two fixes (eval gone, lower dependency vulnerability count).",
      "Your fork's Actions tab shows the security workflow running on push.",
      "You can explain SAST vs DAST vs SCA and what secret scanning adds."
    ],
    deliverable: "Link your fork with the workflow and a README section 'Security scanning': tools and what each covers, before/after counts, the two fixes with diffs, and your merge-gate policy. Include a screenshot of the Actions run.",
    resume: "Implemented shift-left security for a Node.js app by integrating Semgrep (SAST), npm audit and Trivy (SCA) and gitleaks (secrets) into a GitHub Actions pipeline, remediating a server-side code injection flaw and reducing high/critical dependency vulnerabilities.",
    interview: [
      "What is the difference between SAST, DAST and SCA? — SAST analyzes source code without running it, DAST tests the running app from outside, and SCA finds known vulnerabilities and license issues in third-party components.",
      "A secret was committed and then deleted. Are you safe? — No; it remains in git history and any clones, so revoke and rotate it first, then clean history if needed.",
      "How do you stop scanners from blocking every build? — Tune rules, gate only on high-confidence high-severity new findings, and manage accepted risks with documented, expiring exceptions."
    ],
    cleanup: [
      "Delete the fork on GitHub if you do not want it public, or make it private.",
      "rm -f semgrep.json npm-audit.json gitleaks.json"
    ],
    links: [
      { label: "Semgrep documentation", url: "https://semgrep.dev/docs/" },
      { label: "Trivy documentation", url: "https://trivy.dev/latest/" },
      { label: "OWASP NodeGoat", url: "https://github.com/OWASP/NodeGoat" }
    ]
  },

  {
    id: "lab-container-security",
    title: "Harden a Docker container and measure the difference with Trivy",
    track: "GRC & architecture",
    level: "Intermediate",
    minutes: 120,
    cost: "Free",
    summary: "Build a small web app image on a full base, scan it with Trivy, rebuild it on slim and distroless bases, run it as non-root with a read-only filesystem, no capabilities and resource limits, then rescan and compare. Finish with a docker-bench-security audit.",
    realWorld: "Platform and cloud security engineers harden container images and runtime settings because most image CVEs come from unneeded OS packages, and a container running as root with full capabilities makes an escape far worse. These settings map to the CIS Docker Benchmark and Kubernetes pod security standards.",
    youWillNeed: ["Your Ubuntu VM from lab-home-lab with Docker", "Trivy (install steps in lab-secure-sdlc or at trivy.dev)", "git"],
    requires: ["lab-home-lab"],
    safety: "Everything runs on your own lab VM. Publish ports only on 127.0.0.1.",
    steps: [
      {
        title: "Write a tiny app",
        body: "A Python standard-library web server keeps the example dependency-free, so the only difference between builds is the base image.",
        cmd: "mkdir -p ~/container-lab && cd ~/container-lab\ncat > app.py <<'EOF'\nfrom http.server import BaseHTTPRequestHandler, HTTPServer\nclass H(BaseHTTPRequestHandler):\n    def do_GET(self):\n        self.send_response(200); self.end_headers()\n        self.wfile.write(b'11:Eleven menu service OK\\n')\nHTTPServer(('0.0.0.0', 8000), H).serve_forever()\nEOF"
      },
      {
        title: "Build the 'before' image on a full base",
        body: "The full python image includes a complete Debian OS with compilers and many libraries you do not need.",
        cmd: "cat > Dockerfile.full <<'EOF'\nFROM python:3.12\nWORKDIR /app\nCOPY app.py .\nEXPOSE 8000\nCMD [\"python\", \"app.py\"]\nEOF\ndocker build -f Dockerfile.full -t menu:full .\ndocker images menu",
        check: "menu:full is roughly 1 GB."
      },
      {
        title: "Scan it with Trivy",
        body: "Record the totals by severity. The jq line gives one number you can compare later.",
        cmd: "trivy image --severity HIGH,CRITICAL menu:full | head -30\ntrivy image -q -f json menu:full | jq '[.Results[]?.Vulnerabilities // [] | .[]] | group_by(.Severity) | map({(.[0].Severity): length}) | add'",
        check: "You get counts per severity (often hundreds in total, many in OS packages)."
      },
      {
        title: "Check the image and Dockerfile configuration",
        body: "Trivy's misconfiguration scanner flags Dockerfile issues such as running as root and missing HEALTHCHECK.",
        cmd: "trivy config --file-patterns 'dockerfile:Dockerfile.*' .\ndocker run --rm menu:full id",
        check: "Trivy flags that no USER is set, and id prints uid=0(root)."
      },
      {
        title: "Rebuild on a slim base as a non-root user",
        body: "The slim image drops most unneeded packages. Create an unprivileged user and switch to it.",
        cmd: "cat > Dockerfile.slim <<'EOF'\nFROM python:3.12-slim\nRUN useradd --uid 10001 --no-create-home appuser\nWORKDIR /app\nCOPY --chown=root:root app.py .\nUSER 10001\nEXPOSE 8000\nCMD [\"python\", \"app.py\"]\nEOF\ndocker build -f Dockerfile.slim -t menu:slim .\ndocker run --rm menu:slim id",
        check: "id prints uid=10001 and the image is a fraction of the full size."
      },
      {
        title: "Rebuild on distroless nonroot",
        body: "Google's distroless images contain the runtime and nothing else — no shell or package manager for an attacker to use. The ':nonroot' tag runs as uid 65532. Check the distroless README for the current Python image name, since its Python version follows Debian's.",
        cmd: "cat > Dockerfile.distroless <<'EOF'\nFROM gcr.io/distroless/python3-debian12:nonroot\nWORKDIR /app\nCOPY app.py .\nEXPOSE 8000\nCMD [\"app.py\"]\nEOF\ndocker build -f Dockerfile.distroless -t menu:distroless .\ndocker images menu\ndocker run --rm --entrypoint sh menu:distroless -c id || echo 'no shell in image'",
        check: "The sh attempt fails because there is no shell."
      },
      {
        title: "Rescan and compare",
        body: "Scan all three images with the same command and put the numbers in a table: image, size, CRITICAL, HIGH, MEDIUM, LOW.",
        cmd: "for t in full slim distroless; do echo \"== menu:$t\"; trivy image -q -f json menu:$t | jq -c '[.Results[]?.Vulnerabilities // [] | .[]] | group_by(.Severity) | map({(.[0].Severity): length}) | add'; done\ndocker images menu --format '{{.Tag}}\\t{{.Size}}'",
        check: "The slim and distroless images have far fewer vulnerabilities than full."
      },
      {
        title: "Run with hardened runtime settings",
        body: "Read-only root filesystem, all Linux capabilities dropped (the app binds to port 8000, above 1024, so it needs none), no privilege escalation, and memory, CPU and process limits against resource exhaustion.",
        cmd: "docker run -d --name menu --read-only --cap-drop ALL --security-opt no-new-privileges:true --memory 128m --cpus 0.5 --pids-limit 64 -p 127.0.0.1:8000:8000 menu:distroless\ncurl -s http://127.0.0.1:8000\ndocker inspect menu --format 'User={{.Config.User}} ReadOnly={{.HostConfig.ReadonlyRootfs}} CapDrop={{.HostConfig.CapDrop}} Mem={{.HostConfig.Memory}} Pids={{.HostConfig.PidsLimit}}'",
        check: "curl returns '11:Eleven menu service OK' and inspect shows ReadOnly=true, CapDrop=[ALL], a memory limit and a pids limit."
      },
      {
        title: "Prove the read-only filesystem works",
        body: "Use the slim image (it has a shell) with the same flags and try to write a file. If an app genuinely needs scratch space, give it a small --tmpfs /tmp instead of a writable root.",
        cmd: "docker run --rm --read-only --cap-drop ALL menu:slim sh -c 'touch /app/pwned' ; echo exit=$?\ndocker run --rm --read-only --tmpfs /tmp:size=16m menu:slim sh -c 'touch /tmp/ok && echo tmp write ok'",
        check: "The first command fails with 'Read-only file system'; the second succeeds."
      },
      {
        title: "Audit the host with docker-bench-security",
        body: "Docker's docker-bench-security script checks the host and running containers against CIS Docker Benchmark recommendations. Read the WARN lines and note which ones your hardened container fixed compared with a default one.",
        cmd: "docker run -d --name menu-default -p 127.0.0.1:8001:8000 menu:full\ngit clone https://github.com/docker/docker-bench-security.git ~/docker-bench-security\ncd ~/docker-bench-security && sudo sh docker-bench-security.sh -c container_runtime,container_images | tee ~/container-lab/bench.txt\ngrep -E 'WARN' ~/container-lab/bench.txt | head -30",
        check: "menu-default collects warnings (root user, no memory limit, no read-only root, capabilities not restricted) that menu does not."
      },
      {
        title: "Write the hardening standard",
        body: "Turn the results into a short container hardening standard: approved base images (slim or distroless, pinned by digest), no root user, read-only root filesystem, drop ALL capabilities and add back only what is needed, no-new-privileges, resource limits, image scanning in CI with a CRITICAL gate, and periodic rebuilds to pick up patched bases."
      }
    ],
    verify: [
      "You have a table comparing size and CVE counts for the full, slim and distroless images.",
      "docker inspect shows the hardened container is non-root, read-only, with all capabilities dropped and resource limits set.",
      "You demonstrated that writing to the root filesystem fails.",
      "You ran docker-bench-security and can explain three warnings and how you fixed them."
    ],
    deliverable: "Publish the three Dockerfiles, the before/after vulnerability and size table, the docker run command with each flag explained, the docker-bench-security excerpt and your one-page container hardening standard.",
    resume: "Hardened a containerized service by moving to a distroless non-root image with a read-only root filesystem, dropped capabilities and resource limits, cutting image size and Trivy-reported vulnerabilities by over 90% and resolving CIS Docker Benchmark runtime warnings.",
    interview: [
      "Why run containers as non-root? — If the app is compromised, a root process has far more power inside the container and a much worse outcome if it escapes to the host.",
      "What is a distroless image? — An image with only the application and its runtime, no shell or package manager, which shrinks the attack surface and the CVE count.",
      "What do --cap-drop ALL and no-new-privileges do? — They remove Linux kernel capabilities the process does not need and prevent it from gaining privileges via setuid binaries."
    ],
    cleanup: [
      "docker rm -f menu menu-default",
      "docker rmi menu:full menu:slim menu:distroless",
      "rm -rf ~/docker-bench-security (keep ~/container-lab for your portfolio)"
    ],
    links: [
      { label: "Trivy documentation", url: "https://trivy.dev/latest/" },
      { label: "Docker Engine security", url: "https://docs.docker.com/engine/security/" },
      { label: "OWASP Docker Security Cheat Sheet", url: "https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html" }
    ]
  },

  {
    id: "lab-vendor-risk",
    title: "Third-party risk review of a real SaaS vendor",
    track: "GRC & architecture",
    level: "Beginner",
    minutes: 150,
    cost: "Free",
    summary: "Assess a real vendor the lounge would use (a reservation platform or POS/payment provider) from public evidence: trust page, SOC 2 / ISO 27001 / PCI status, data processing terms and breach history. Fill a short questionnaire, rate the risk and list the contract clauses to request.",
    realWorld: "Third-party risk analysts review vendors before contracts are signed and again every year. Supply-chain risk is now its own category in NIST CSF 2.0 (GV.SC), and many breaches start at a vendor.",
    youWillNeed: ["A web browser", "A spreadsheet for the questionnaire", "The vendor's public trust/security page, privacy policy and terms (pick one real vendor)"],
    safety: "Use only public information and what the vendor shares with you. Do not probe, scan or test the vendor's systems.",
    steps: [
      {
        title: "Define the engagement and data flow",
        body: "Write one paragraph: which vendor, what service, what data it will hold (guest names, phones, emails, visit history; for payments, cardholder data), how many records, which lounge staff use it and how it connects (web portal, POS integration, API). This sets the inherent risk before you look at controls."
      },
      {
        title: "Tier the vendor",
        body: "Use a simple tiering rule: Tier 1 (critical) = holds Restricted data or the business stops without it; Tier 2 = holds Confidential data or matters for operations; Tier 3 = no sensitive data. A payment processor or reservation platform is Tier 1, which means a full review and annual reassessment."
      },
      {
        title: "Collect the public trust evidence",
        body: "Find the vendor's trust center or security page and record: attestations (SOC 2 Type II and its period, ISO/IEC 27001 certificate number and scope, PCI DSS Attestation of Compliance for payment vendors), pen test cadence, encryption statements, SSO/MFA support, uptime/status page, and subprocessor list. Check the CSA STAR Registry to see whether they published a CAIQ. Note what is public versus 'available under NDA' — a SOC 2 report usually requires an NDA."
      },
      {
        title: "Read the data processing terms",
        body: "Open the privacy policy, terms of service and Data Processing Addendum (DPA). Record: whether they act as your processor/service provider, whether they use or sell your guests' data for their own marketing, data location, subprocessors and change notice, breach notification commitment (hours/days), data return and deletion on termination, and liability caps."
      },
      {
        title: "Search breach and incident history",
        body: "Search news, the vendor's own blog and status history, state attorney general breach notice databases, and the HHS or SEC filings if relevant for the last five years. Record each incident: date, what happened, data affected, how quickly and openly they disclosed it, and what they changed. A past incident handled well can be better than silence."
      },
      {
        title: "Build the questionnaire",
        body: "Write your own 20–30 questions under headings modeled on common frameworks such as the CSA CAIQ domains and SIG Lite topic areas (write your own wording; do not copy proprietary questionnaire content): Governance and risk management; Security certifications and audits; Human resources security; Identity and access management (SSO, MFA, RBAC for our staff); Data security and encryption (at rest, in transit, key management); Application security and SDLC; Vulnerability and patch management; Logging and monitoring; Incident response and breach notification; Business continuity and disaster recovery (RTO/RPO); Third parties and subprocessors; Privacy and data retention; Physical security (hosting provider)."
      },
      {
        title: "Answer it from the evidence",
        body: "For each question record Answer, Evidence (URL or document and date), and Status: Met / Partially met / Not met / Unknown. Unknowns become questions to send the vendor. Be strict: marketing claims without evidence are 'Partially met'.",
        check: "Every question has a status and either evidence or a follow-up question."
      },
      {
        title: "Check the controls you own",
        body: "The customer side of the shared responsibility model matters too: can you enforce MFA for staff, use individual accounts with roles, see audit logs of who exported guest lists, restrict exports, and remove leavers quickly? Add these as 'Customer-configurable' items and note what the lounge must switch on."
      },
      {
        title: "Rate the risk",
        body: "Combine inherent risk (Tier 1, sensitive data) with control strength (share of Met answers, attestations, incident history) to give a residual rating: Low, Medium or High, with three sentences of justification. Example: 'Medium — SOC 2 Type II and MFA available, but DPA allows use of guest data for vendor marketing and breach notice is only \"without undue delay\".'"
      },
      {
        title: "List the contract clauses to request",
        body: "Write the asks for the contract or DPA: breach notification within 72 hours of discovery with named contacts; right to audit or, more realistically, annual delivery of SOC 2 Type II report and bridge letter (and PCI AOC for payment vendors); data use limited to providing the service with no sale or secondary marketing use; subprocessor list with advance notice of changes; data return in a usable format (CSV) and certified deletion within 30 days of termination; encryption at rest and in transit; MFA and SSO support; security incident cooperation; cyber-insurance with stated limits; liability for data breaches above the standard cap; service levels and RTO/RPO."
      },
      {
        title: "Make the decision and set follow-ups",
        body: "Recommend one: approve, approve with conditions (list them, such as 'enable MFA for all staff accounts and negotiate a 72-hour breach clause'), or reject. Set a reassessment date (12 months for Tier 1) and add the residual risk to the risk register from lab-risk-register."
      }
    ],
    verify: [
      "Your file lists the vendor's attestations with dates or explicitly records that they are unavailable.",
      "Your questionnaire has 20+ of your own questions under framework-style headings, each with a status and evidence.",
      "You gave a residual risk rating with a justification and a clear approve/conditions/reject decision.",
      "You listed at least six contract clauses, including right to audit, breach notification SLA and data return/deletion."
    ],
    deliverable: "Publish a vendor risk assessment report (4–6 pages): engagement summary and tier, evidence table, questionnaire results, incident history, risk rating, required contract clauses and decision. Stick to public facts, cite sources with dates, and keep the tone neutral since it names a real company.",
    resume: "Conducted a third-party risk assessment of a SaaS reservation vendor handling guest PII, reviewing SOC 2 / ISO 27001 evidence, DPA terms and breach history against a 25-question CAIQ-style questionnaire, and recommended contract clauses including a 72-hour breach notification SLA and certified data deletion.",
    interview: [
      "What is the difference between a SOC 2 Type I and Type II report? — Type I assesses control design at a point in time; Type II tests that controls operated effectively over a period, usually 6–12 months.",
      "What contract clauses matter most for a SaaS vendor holding customer data? — Breach notification SLA, limits on data use, subprocessor notice, audit rights or annual attestations, data return and deletion, and liability for breaches.",
      "What do you do if a critical vendor will not share a SOC 2 report? — Treat it as a gap: ask for alternatives (ISO certificate, CAIQ, pen test summary), add compensating controls or conditions, or escalate the risk for acceptance or rejection."
    ],
    links: [
      { label: "CSA Cloud Controls Matrix and CAIQ", url: "https://cloudsecurityalliance.org/research/cloud-controls-matrix" },
      { label: "CSA STAR Registry", url: "https://cloudsecurityalliance.org/star/registry" },
      { label: "NIST Cybersecurity Supply Chain Risk Management", url: "https://csrc.nist.gov/projects/cyber-supply-chain-risk-management" }
    ]
  }
]);
