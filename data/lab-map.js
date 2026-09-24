/* Which labs go with which study weeks. Hand-written plans (Security+) map by week number;
   generated plans map by domain, and each domain's labs are shared across its weeks in order.
   Lab ids are defined in data/labs-*.js. */
CertHub.labMap = {
  "security-plus": { weeks: {
    1: ["lab-home-lab", "lab-honeypot"],
    2: ["lab-hashing-integrity"],
    3: ["lab-pki-openssl"],
    4: ["lab-wireshark-basics", "lab-subnetting"],
    5: ["lab-threat-intel", "lab-phishing-analysis"],
    6: ["lab-appsec-zap", "lab-threat-model"],
    7: ["lab-cyberchef-decoding", "lab-pcap-investigation"],
    8: ["lab-linux-hardening", "lab-windows-hardening"],
    9: ["lab-cloud-iam", "lab-container-security"],
    10: ["lab-firewall-pfsense", "lab-nmap-discovery"],
    11: ["lab-data-classification", "lab-bia-backup"],
    12: ["lab-vuln-management", "lab-wifi-audit"],
    13: ["lab-splunk-siem", "lab-iam-sso", "lab-ssh-mfa"],
    14: ["lab-incident-response", "lab-disk-forensics"],
    15: ["lab-risk-register", "lab-policy-writing", "lab-vendor-risk"]
  } },
  "cysa-plus": { domains: {
    1: ["lab-splunk-siem", "lab-sysmon-detection", "lab-wazuh", "lab-pcap-investigation", "lab-cyberchef-decoding", "lab-phishing-analysis"],
    2: ["lab-nmap-discovery", "lab-vuln-management", "lab-appsec-zap", "lab-container-security", "lab-cloud-iam", "lab-secure-sdlc"],
    3: ["lab-incident-response", "lab-memory-forensics", "lab-disk-forensics"],
    4: ["lab-threat-intel", "lab-risk-register"]
  } },
  "ccna": { domains: {
    1: ["lab-subnetting", "lab-wireshark-basics", "lab-network-troubleshooting", "lab-nmap-discovery"],
    2: ["lab-pt-vlans", "lab-pt-l2-security", "lab-wifi-audit"],
    3: ["lab-pt-ospf", "lab-network-troubleshooting", "lab-subnetting"],
    4: ["lab-pt-acl-nat", "lab-firewall-pfsense", "lab-ssh-mfa"],
    5: ["lab-network-automation", "lab-splunk-siem"]
  } },
  "sscp": { domains: {
    1: ["lab-home-lab", "lab-policy-writing", "lab-data-classification"],
    2: ["lab-iam-sso", "lab-ssh-mfa", "lab-windows-hardening"],
    3: ["lab-risk-register", "lab-vuln-management", "lab-splunk-siem"],
    4: ["lab-incident-response", "lab-bia-backup", "lab-disk-forensics"],
    5: ["lab-hashing-integrity", "lab-pki-openssl"],
    6: ["lab-firewall-pfsense", "lab-wireshark-basics", "lab-wifi-audit"],
    7: ["lab-linux-hardening", "lab-appsec-zap", "lab-container-security"]
  } },
  "network-plus": { domains: {
    1: ["lab-subnetting", "lab-wireshark-basics"],
    2: ["lab-pt-vlans", "lab-pt-ospf", "lab-wifi-audit"],
    3: ["lab-nmap-discovery", "lab-splunk-siem", "lab-bia-backup"],
    4: ["lab-firewall-pfsense", "lab-pt-l2-security", "lab-pt-acl-nat"],
    5: ["lab-network-troubleshooting", "lab-linux-cli", "lab-wireshark-basics"]
  } },
  "isc2-cc": { domains: {
    1: ["lab-home-lab", "lab-hashing-integrity"],
    2: ["lab-risk-register", "lab-policy-writing"],
    3: ["lab-ssh-mfa", "lab-iam-sso"],
    4: ["lab-wireshark-basics", "lab-firewall-pfsense", "lab-cloud-iam"],
    5: ["lab-linux-hardening", "lab-incident-response", "lab-bia-backup"]
  } },
  "cissp": { domains: {
    1: ["lab-risk-register", "lab-policy-writing", "lab-vendor-risk"],
    2: ["lab-data-classification", "lab-bia-backup"],
    3: ["lab-pki-openssl", "lab-threat-model", "lab-container-security"],
    4: ["lab-firewall-pfsense", "lab-wireshark-basics", "lab-pt-acl-nat"],
    5: ["lab-iam-sso", "lab-ssh-mfa"],
    6: ["lab-vuln-management", "lab-nmap-discovery"],
    7: ["lab-incident-response", "lab-splunk-siem", "lab-disk-forensics"],
    8: ["lab-secure-sdlc", "lab-appsec-zap"]
  } }
};
