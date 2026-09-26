/* Certification comparisons for /compare/<a>-vs-<b>/ pages (written by tools/build.js).
   The facts table (vendor, exam, length, passing score, domains, plan length) comes from each certification's data file;
   this file holds only the judgment: who each one is for, which to take first, and the differences that matter.
   first: "a", "b" or "either". Avoid prices and other details that change often. */
CertHub.addComparisons([
  { a: "security-plus", b: "cysa-plus",
    summary: "Security+ is the broad entry-level security certification; CySA+ is the next step for people doing analyst work: logs, alerts, vulnerability management and incident response.",
    forA: "Anyone starting in security, or IT staff who need a recognized security baseline for a job or a government role.",
    forB: "People working, or about to work, in a SOC or security analyst role who want to prove hands-on analysis skills.",
    first: "a", firstWhy: "CySA+ assumes the concepts Security+ covers, and CompTIA recommends Security+ (or equivalent knowledge) first.",
    differences: [
      "Security+ covers every area of security at a basic level; CySA+ goes deep on detection, analysis and response.",
      "CySA+ questions expect you to read log excerpts, scan results and command output and decide what to do.",
      "Many employers use Security+ as a hiring filter; CySA+ shows you can do the analyst job itself."
    ] },
  { a: "isc2-cc", b: "security-plus",
    summary: "ISC2 CC is a short, low-cost introduction to security; Security+ is the entry-level certification most job postings ask for.",
    forA: "Complete beginners who want to test their interest in security before committing more study time.",
    forB: "People ready to aim for a first security or security-aware IT job.",
    first: "either", firstWhy: "Start with CC if you are brand new and want an early win; go straight to Security+ if you already know basic networking and IT.",
    differences: [
      "CC covers five domains at an introductory level; Security+ covers more topics in more depth and includes performance-based questions.",
      "Security+ appears far more often in job postings and is on the US DoD 8140 list for many roles.",
      "Studying for CC first makes Security+ noticeably easier, because much of the vocabulary carries over."
    ] },
  { a: "security-plus", b: "sscp",
    summary: "Both are early-career security certifications; Security+ is the more requested one, and SSCP leans toward hands-on security operations and administration.",
    forA: "People starting out who want the most widely recognized entry-level security certification.",
    forB: "Administrators and practitioners with at least a year of security experience who want a vendor-neutral operations credential from ISC2.",
    first: "a", firstWhy: "Security+ has no experience requirement and opens more doors early; SSCP adds depth once you have the experience it asks for.",
    differences: [
      "SSCP requires one year of paid work in one of its domains to be fully certified; Security+ has no requirement.",
      "SSCP is often a stepping stone toward CISSP, and both are ISC2 certifications with an annual maintenance fee and continuing education.",
      "Security+ is listed in more job postings; SSCP is respected but less common as a hiring filter."
    ] },
  { a: "cissp", b: "securityx",
    summary: "Both are senior security certifications: CISSP leans toward managing and designing a security program, SecurityX toward hands-on security architecture and engineering.",
    forA: "Experienced professionals moving into security leadership, management or program design.",
    forB: "Senior practitioners who want to stay technical: security architects and engineers.",
    first: "either", firstWhy: "Pick the one that matches the role you want next; many senior people eventually hold both.",
    differences: [
      "CISSP requires five years of paid experience in at least two of its eight domains (one year can be waived); SecurityX recommends extensive experience but doesn't require proof.",
      "CISSP questions often ask what a manager should do first; SecurityX questions include hands-on scenarios and performance-based items.",
      "CISSP is the most requested senior security certification in job postings."
    ] },
  { a: "network-plus", b: "ccna",
    summary: "Network+ is a vendor-neutral networking foundation; CCNA goes deeper and includes configuring Cisco routers and switches.",
    forA: "IT generalists and anyone who needs a solid networking foundation for support, systems or security work.",
    forB: "People who want to become network engineers, especially where Cisco equipment is used.",
    first: "either", firstWhy: "Network+ is the gentler start; if you already know you want network engineering, going straight to CCNA is common.",
    differences: [
      "CCNA expects you to configure devices from the command line (Cisco IOS); Network+ focuses on concepts, troubleshooting and tools.",
      "CCNA covers routing, switching and automation in more depth.",
      "Network+ is vendor-neutral and counts toward many IT and security roles; CCNA is the standard for network engineering jobs."
    ] },
  { a: "a-plus-core1", b: "network-plus",
    summary: "A+ is the entry point for IT support work; Network+ builds the networking knowledge that support, systems and security jobs all rely on.",
    forA: "People aiming for a help desk or desktop support job.",
    forB: "People who already know basic IT and want to move toward networking, systems administration or security.",
    first: "a", firstWhy: "A+ covers the hardware, operating system and troubleshooting basics that Network+ assumes. Note that A+ needs two exams: Core 1 and Core 2.",
    differences: [
      "A+ spans hardware, mobile devices, operating systems, security basics and support procedures; Network+ is only networking, in more depth.",
      "Network+ covers subnetting, routing, switching, wireless and network troubleshooting that A+ only introduces.",
      "Help desk postings ask for A+; network and many systems roles ask for Network+."
    ] },
  { a: "aws-cloud-practitioner", b: "az-900",
    summary: "Both are foundational cloud certifications: AWS Cloud Practitioner for Amazon Web Services, AZ-900 for Microsoft Azure.",
    forA: "Beginners, and non-technical staff, at organizations that use AWS.",
    forB: "Beginners, and non-technical staff, at organizations that use Microsoft Azure or Microsoft 365.",
    first: "either", firstWhy: "Choose the cloud your employer, or the employers you want, use. The concepts transfer, so the second one is much faster.",
    differences: [
      "Both cover cloud concepts, core services, security, pricing and support at an introductory level.",
      "Neither is required before the associate-level certifications, but both make them easier.",
      "AWS has the larger share of the cloud market; Azure is common in companies that already run Microsoft software."
    ] },
  { a: "az-900", b: "google-cdl",
    summary: "Both are foundational cloud certifications: AZ-900 for Microsoft Azure, Cloud Digital Leader for Google Cloud.",
    forA: "Beginners at organizations that use Azure or Microsoft 365.",
    forB: "Beginners and business-focused staff at organizations that use Google Cloud, or who work with data and AI on Google.",
    first: "either", firstWhy: "Choose the cloud your employer uses; the concepts transfer between them.",
    differences: [
      "AZ-900 includes more specific Azure services and management tools; Cloud Digital Leader leans toward business value, digital transformation and data.",
      "Cloud Digital Leader is often taken by non-technical staff; AZ-900 is also a common first step for Azure administrators.",
      "The natural next steps are AZ-104 for Azure and Associate Cloud Engineer for Google Cloud."
    ] },
  { a: "aws-saa", b: "az-104",
    summary: "Both are associate-level cloud certifications: AWS Solutions Architect Associate is about designing solutions on AWS, AZ-104 about administering Azure.",
    forA: "People who design or build systems on AWS.",
    forB: "Administrators who run Azure subscriptions, identities, networks, storage and virtual machines day to day.",
    first: "either", firstWhy: "Follow the cloud your job uses. If you have no preference, AWS SAA is one of the most requested cloud certifications in job postings.",
    differences: [
      "AWS SAA questions are about choosing the right architecture for requirements; AZ-104 questions are about configuring and managing Azure resources.",
      "AZ-104 includes identity and governance with Microsoft Entra ID; AWS SAA covers IAM as part of secure architecture.",
      "Both expect hands-on experience with the platform, not only reading."
    ] },
  { a: "linux-plus", b: "rhcsa",
    summary: "Linux+ is a vendor-neutral Linux certification; RHCSA is a fully hands-on exam on Red Hat Enterprise Linux.",
    forA: "People who want to prove Linux administration knowledge across distributions.",
    forB: "Administrators who work with Red Hat or similar distributions and want the most practical, respected Linux credential.",
    first: "either", firstWhy: "Linux+ is a good structured start; RHCSA proves you can do the work, so many people take it once they are comfortable at the command line.",
    differences: [
      "The RHCSA exam is entirely practical: you configure a real system and are graded on the result. Linux+ uses multiple-choice and performance-based questions.",
      "RHCSA uses Red Hat tools such as dnf, firewalld and SELinux; Linux+ covers several distributions' tools.",
      "The practice VMs on this site cover skills both exams test: users, permissions, systemd, storage and firewalls."
    ] },
  { a: "cka", b: "ckad",
    summary: "Both are hands-on Kubernetes exams: CKA is about administering clusters, CKAD about building and deploying applications on them.",
    forA: "Platform, operations and site reliability engineers who run Kubernetes clusters.",
    forB: "Developers who package and deploy applications on Kubernetes.",
    first: "either", firstWhy: "Pick the one that matches your job. Their content overlaps, so the second one takes much less study.",
    differences: [
      "CKA includes cluster installation, upgrades, backups, networking and troubleshooting nodes; CKAD doesn't.",
      "CKAD goes deeper into pods, deployments, configuration, probes and application observability.",
      "Both are performance-based exams at a command line, so speed with kubectl matters."
    ] },
  { a: "ai-900", b: "ai-102",
    summary: "AI-900 is the introduction to AI concepts and Azure AI services; AI-102 is for engineers who build AI solutions on Azure.",
    forA: "Beginners and non-developers who want to understand AI workloads, machine learning basics and responsible AI.",
    forB: "Developers and engineers who build solutions with Azure AI services, search and generative AI.",
    first: "a", firstWhy: "AI-900 gives the vocabulary and service overview that AI-102 assumes, though it isn't required.",
    differences: [
      "AI-102 expects you to work with SDKs, REST APIs and deployment; AI-900 is about knowing what each service does.",
      "AI-102 covers designing, securing and monitoring solutions; AI-900 stays at the concept level.",
      "Both cover responsible AI principles."
    ] },
  { a: "cysa-plus", b: "sc-200",
    summary: "Both suit security operations analysts: CySA+ is vendor-neutral, SC-200 is about Microsoft's security tools (Microsoft Sentinel and Defender).",
    forA: "Analysts who want a vendor-neutral credential that applies to any SIEM and toolset.",
    forB: "Analysts in organizations that run Microsoft Sentinel and Microsoft Defender.",
    first: "either", firstWhy: "Take the one your employer's tools match; SC-200 is the more direct fit in a Microsoft shop.",
    differences: [
      "SC-200 expects you to write KQL queries and configure Microsoft security products; CySA+ tests analysis skills without a specific product.",
      "CySA+ covers vulnerability management and reporting in more depth.",
      "SC-200 is renewed yearly with a free online assessment; CySA+ renews every three years with continuing education."
    ] }
]);
