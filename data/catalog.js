/* Home page order. Built certifications have a data file in data/<id>.js and a page in <id>/.
   Planned ones are listed with their published domains but have no study content yet. */
CertHub.catalog = ["security-plus", "cysa-plus", "ccna", "sscp", "network-plus", "isc2-cc", "cissp"];
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
