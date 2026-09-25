/* Home page order. Built certifications have a data file in data/<id>.js and a page in <id>/.
   Planned ones are listed with their published domains but have no study content yet. */
// Career tracks. A certification can be in more than one track.
CertHub.tracks = [
  { id: "cybersecurity", name: "Cybersecurity", blurb: "Security analyst and security management certifications, from first job to CISSP.",
    certs: ["isc2-cc", "security-plus", "cysa-plus", "sscp", "cissp"] },
  { id: "network", name: "Network Engineering", blurb: "Design, build and troubleshoot networks: from entry-level to CCNP, plus Juniper, wireless and cloud networking.",
    certs: ["ccst-networking", "network-plus", "ccna", "ccnp-encor", "jncia-junos", "cwna"] },
  { id: "software", name: "Software Engineering", blurb: "Programming languages, cloud development, containers and infrastructure as code.",
    certs: ["pcep", "pcap", "java-se", "aws-developer", "ai-200", "ckad", "terraform"] },
  { id: "secadmin", name: "Cybersecurity Administration", blurb: "Run security day to day: cloud security, identity, security operations and firewalls.",
    certs: ["security-plus", "sscp", "cysa-plus", "sc-500", "sc-300", "sc-200", "palo-alto-ngfw", "fortinet-fortigate"] },
  { id: "sysadmin", name: "System Administrator", blurb: "Support and run systems: desktops, Linux and Windows servers, cloud and Kubernetes.",
    certs: ["a-plus-core1", "a-plus-core2", "linux-plus", "server-plus", "rhcsa", "az-104", "az-802", "cka"] },
  { id: "cloud", name: "Cloud Computing", blurb: "Cloud fundamentals and architecture on AWS and Azure, plus vendor-neutral cloud operations.",
    certs: ["aws-cloud-practitioner", "az-900", "cloud-plus", "aws-saa"] }
];
// Every certification once, in track order.
CertHub.catalog = [...new Set(CertHub.tracks.flatMap(t => t.certs))];
// Not shown on the site. To list one again, add its id to the catalog above (it will show
// as "Study plan not written yet" until a data file exists).
CertHub.planned = {
  "pentest-plus": {
    vendor: "CompTIA", name: "CompTIA PenTest+", short: "PenTest+", exam: "PT0-003",
    blurb: "Penetration testing: engagement management, recon, vulnerability discovery, attacks and post-exploitation.",
    status: "check",
    domains: [
      { id: 1, name: "Engagement management", w: 13 },
      { id: 2, name: "Reconnaissance & enumeration", w: 21 },
      { id: 3, name: "Vulnerability discovery & analysis", w: 17 },
      { id: 4, name: "Attacks & exploits", w: 35 },
      { id: 5, name: "Post-exploitation & lateral movement", w: 14 }
    ]
  },
  "ceh": {
    vendor: "EC-Council", name: "Certified Ethical Hacker", short: "CEH", exam: "v13",
    blurb: "Ethical hacking across nine domains, with reconnaissance and system hacking weighted highest.",
    status: "check",
    domains: [
      { id: 1, name: "Information security & ethical hacking overview", w: 6 },
      { id: 2, name: "Reconnaissance techniques", w: 21 },
      { id: 3, name: "System hacking phases & attack techniques", w: 17 },
      { id: 4, name: "Network & perimeter hacking", w: 14 },
      { id: 5, name: "Web application hacking", w: 16 },
      { id: 6, name: "Wireless network hacking", w: 6 },
      { id: 7, name: "Mobile platform, IoT & OT hacking", w: 8 },
      { id: 8, name: "Cloud computing", w: 6 },
      { id: 9, name: "Cryptography", w: 6 }
    ]
  }
};
