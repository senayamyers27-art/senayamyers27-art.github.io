/* Which labs go with which study weeks. Hand-written plans (Security+) map by week number;
   generated plans map by domain, and each domain's labs are shared across its weeks in order.
   Lab ids are defined in data/labs-*.js. */
CertHub.labMap = {
  "security-plus": { weeks: {
    1: ["lab-home-lab", "lab-honeypot"],
    2: ["lab-hashing-integrity"],
    3: ["lab-pki-openssl"],
    4: ["lab-wireshark-basics", "lab-subnetting", "lab-dns-bind"],
    5: ["lab-threat-intel", "lab-phishing-analysis"],
    6: ["lab-appsec-zap", "lab-threat-model"],
    7: ["lab-cyberchef-decoding", "lab-pcap-investigation"],
    8: ["lab-linux-hardening", "lab-windows-hardening", "lab-ad-gpo", "lab-apparmor-mac"],
    9: ["lab-cloud-iam", "lab-container-security", "lab-cloud-posture"],
    10: ["lab-firewall-pfsense", "lab-nmap-discovery", "lab-wireguard-vpn", "lab-net-monitoring"],
    11: ["lab-data-classification", "lab-bia-backup", "lab-db-failover"],
    12: ["lab-vuln-management", "lab-wifi-audit", "lab-radius-aaa"],
    13: ["lab-splunk-siem", "lab-iam-sso", "lab-ssh-mfa", "lab-auditd"],
    14: ["lab-incident-response", "lab-disk-forensics"],
    15: ["lab-risk-register", "lab-policy-writing", "lab-vendor-risk", "lab-controls-audit"]
  } },
  "cysa-plus": { domains: {
    1: ["lab-splunk-siem", "lab-sysmon-detection", "lab-wazuh", "lab-pcap-investigation", "lab-cyberchef-decoding", "lab-phishing-analysis", "lab-auditd", "lab-net-monitoring", "lab-sentinel-kql", "lab-defender-asr", "lab-ngfw-policy"],
    2: ["lab-nmap-discovery", "lab-vuln-management", "lab-appsec-zap", "lab-container-security", "lab-cloud-iam", "lab-secure-sdlc", "lab-cloud-posture"],
    3: ["lab-incident-response", "lab-memory-forensics", "lab-disk-forensics", "lab-sentinel-kql"],
    4: ["lab-threat-intel", "lab-risk-register", "lab-controls-audit"]
  } },
  "ccna": { domains: {
    1: ["lab-subnetting", "lab-wireshark-basics", "lab-network-troubleshooting", "lab-nmap-discovery", "lab-dns-bind", "lab-ipv6-dual-stack", "lab-wifi-survey"],
    2: ["lab-pt-vlans", "lab-pt-l2-security", "lab-wifi-audit"],
    3: ["lab-pt-ospf", "lab-network-troubleshooting", "lab-subnetting", "lab-frr-ospf-multiarea", "lab-vrrp-failover", "lab-ipv6-dual-stack"],
    4: ["lab-pt-acl-nat", "lab-firewall-pfsense", "lab-ssh-mfa", "lab-net-monitoring", "lab-radius-aaa", "lab-wireguard-vpn", "lab-qos-tc"],
    5: ["lab-network-automation", "lab-splunk-siem", "lab-net-monitoring"]
  } },
  "sscp": { domains: {
    1: ["lab-home-lab", "lab-policy-writing", "lab-data-classification", "lab-controls-audit", "lab-entra-pim-reviews"],
    2: ["lab-iam-sso", "lab-ssh-mfa", "lab-windows-hardening", "lab-ad-gpo", "lab-radius-aaa", "lab-apparmor-mac", "lab-entra-conditional-access", "lab-entra-pim-reviews"],
    3: ["lab-risk-register", "lab-vuln-management", "lab-splunk-siem", "lab-auditd", "lab-net-monitoring", "lab-cloud-posture", "lab-controls-audit", "lab-sentinel-kql"],
    4: ["lab-incident-response", "lab-bia-backup", "lab-disk-forensics", "lab-db-failover", "lab-sentinel-kql"],
    5: ["lab-hashing-integrity", "lab-pki-openssl", "lab-ipsec-site-to-site", "lab-azure-security-baseline"],
    6: ["lab-firewall-pfsense", "lab-wireshark-basics", "lab-wifi-audit", "lab-wireguard-vpn", "lab-dns-bind", "lab-ngfw-policy", "lab-ipsec-site-to-site"],
    7: ["lab-linux-hardening", "lab-appsec-zap", "lab-container-security", "lab-apparmor-mac", "lab-defender-asr", "lab-azure-security-baseline"]
  } },
  "network-plus": { domains: {
    1: ["lab-subnetting", "lab-wireshark-basics", "lab-dns-bind", "lab-ipv6-dual-stack", "lab-aws-vpc"],
    2: ["lab-pt-vlans", "lab-pt-ospf", "lab-wifi-audit", "lab-wireguard-vpn", "lab-frr-ospf-multiarea", "lab-frr-bgp", "lab-wifi-survey"],
    3: ["lab-nmap-discovery", "lab-splunk-siem", "lab-bia-backup", "lab-net-monitoring", "lab-db-failover", "lab-vrrp-failover", "lab-qos-tc"],
    4: ["lab-firewall-pfsense", "lab-pt-l2-security", "lab-pt-acl-nat", "lab-radius-aaa", "lab-wireguard-vpn"],
    5: ["lab-network-troubleshooting", "lab-linux-cli", "lab-wireshark-basics", "lab-dns-bind", "lab-ipv6-dual-stack", "lab-frr-ospf-multiarea"]
  } },
  "isc2-cc": { domains: {
    1: ["lab-home-lab", "lab-hashing-integrity"],
    2: ["lab-risk-register", "lab-policy-writing", "lab-controls-audit"],
    3: ["lab-ssh-mfa", "lab-iam-sso", "lab-ad-gpo", "lab-radius-aaa"],
    4: ["lab-wireshark-basics", "lab-firewall-pfsense", "lab-cloud-iam", "lab-dns-bind", "lab-wireguard-vpn", "lab-cloud-posture"],
    5: ["lab-linux-hardening", "lab-incident-response", "lab-bia-backup", "lab-auditd", "lab-db-failover"]
  } },
  "cissp": { domains: {
    1: ["lab-risk-register", "lab-policy-writing", "lab-vendor-risk", "lab-controls-audit"],
    2: ["lab-data-classification", "lab-bia-backup"],
    3: ["lab-pki-openssl", "lab-threat-model", "lab-container-security", "lab-apparmor-mac"],
    4: ["lab-firewall-pfsense", "lab-wireshark-basics", "lab-pt-acl-nat", "lab-wireguard-vpn", "lab-dns-bind", "lab-radius-aaa"],
    5: ["lab-iam-sso", "lab-ssh-mfa", "lab-ad-gpo"],
    6: ["lab-vuln-management", "lab-nmap-discovery", "lab-controls-audit", "lab-cloud-posture"],
    7: ["lab-incident-response", "lab-splunk-siem", "lab-disk-forensics", "lab-db-failover", "lab-auditd"],
    8: ["lab-secure-sdlc", "lab-appsec-zap"]
  } },
  "sc-500": { domains: {
    1: ["lab-entra-conditional-access", "lab-entra-pim-reviews"],
    2: ["lab-azure-security-baseline"],
    3: ["lab-azure-security-baseline", "lab-defender-asr"],
    4: ["lab-azure-security-baseline", "lab-sentinel-kql"]
  } },
  "sc-300": { domains: {
    1: ["lab-entra-conditional-access"],
    2: ["lab-entra-conditional-access"],
    3: ["lab-azure-security-baseline"],
    4: ["lab-entra-pim-reviews"]
  } },
  "sc-200": { domains: {
    1: ["lab-sentinel-kql", "lab-defender-asr"],
    2: ["lab-sentinel-kql", "lab-defender-asr"],
    3: ["lab-sentinel-kql"]
  } },
  "palo-alto-ngfw": { domains: {
    1: ["lab-ngfw-policy", "lab-ipsec-site-to-site"],
    2: ["lab-ngfw-policy"]
  } },
  "fortinet-fortigate": { domains: {
    1: ["lab-ngfw-policy"],
    2: ["lab-ngfw-policy"],
    3: ["lab-ngfw-policy", "lab-ipsec-site-to-site"],
    5: ["lab-ipsec-site-to-site"]
  } },
  "pcep": { domains: {
    1: ["lab-python-project"],
    4: ["lab-python-project", "lab-rest-api"]
  } },
  "pcap": { domains: {
    1: ["lab-python-project", "lab-git-workflow"],
    2: ["lab-python-project", "lab-rest-api"],
    4: ["lab-python-project", "lab-rest-api"]
  } },
  "java-se": { domains: {
    3: ["lab-java-build-test"],
    4: ["lab-java-build-test"],
    5: ["lab-java-build-test"],
    6: ["lab-java-build-test"],
    7: ["lab-java-build-test"]
  } },
  "aws-developer": { domains: {
    1: ["lab-lambda-api", "lab-rest-api"],
    2: ["lab-lambda-api"],
    3: ["lab-lambda-api", "lab-github-actions-ci", "lab-docker-compose-app", "lab-git-workflow"],
    4: ["lab-lambda-api"]
  } },
  "ai-200": { domains: {
    1: ["lab-docker-compose-app", "lab-github-actions-ci"]
  } },
  "ckad": { domains: {
    1: ["lab-docker-compose-app", "lab-kubernetes-kind", "lab-git-workflow"],
    2: ["lab-kubernetes-kind", "lab-github-actions-ci"],
    3: ["lab-kubernetes-kind"],
    4: ["lab-kubernetes-kind"],
    5: ["lab-kubernetes-kind"]
  } },
  "terraform": { domains: {
    1: ["lab-terraform-docker", "lab-git-workflow"],
    2: ["lab-terraform-docker"],
    3: ["lab-terraform-docker"],
    4: ["lab-terraform-docker"],
    5: ["lab-terraform-docker"],
    6: ["lab-terraform-docker"],
    7: ["lab-terraform-docker"]
  } },
  "cka": { domains: {
    1: ["lab-k8s-cluster-admin"],
    2: ["lab-kubernetes-kind", "lab-k8s-cluster-admin"],
    3: ["lab-kubernetes-kind", "lab-k8s-cluster-admin"],
    4: ["lab-kubernetes-kind"],
    5: ["lab-kubernetes-kind", "lab-k8s-cluster-admin"]
  } },
  "a-plus-core1": { domains: {
    4: ["lab-azure-admin"],
    5: ["lab-helpdesk-tickets"]
  } },
  "a-plus-core2": { domains: {
    1: ["lab-windows-deployment", "lab-linux-storage-lvm", "lab-package-patching"],
    3: ["lab-helpdesk-tickets"],
    4: ["lab-powershell-admin"]
  } },
  "linux-plus": { domains: {
    1: ["lab-linux-storage-lvm", "lab-package-patching", "lab-systemd-services"],
    2: ["lab-systemd-services", "lab-postgres-dba"],
    3: ["lab-package-patching"],
    4: ["lab-k8s-cluster-admin"],
    5: ["lab-systemd-services", "lab-linux-storage-lvm"]
  } },
  "server-plus": { domains: {
    1: ["lab-linux-storage-lvm"],
    2: ["lab-windows-deployment", "lab-powershell-admin", "lab-systemd-services", "lab-package-patching"],
    3: ["lab-postgres-dba", "lab-package-patching"],
    4: ["lab-helpdesk-tickets", "lab-systemd-services"]
  } },
  "rhcsa": { domains: {
    2: ["lab-package-patching"],
    4: ["lab-systemd-services"],
    5: ["lab-linux-storage-lvm"],
    6: ["lab-linux-storage-lvm"],
    7: ["lab-systemd-services", "lab-package-patching"]
  } },
  "az-104": { domains: {
    1: ["lab-azure-admin"],
    2: ["lab-azure-admin"],
    3: ["lab-azure-admin"],
    4: ["lab-azure-admin"],
    5: ["lab-azure-admin"]
  } },
  "az-802": { domains: {
    1: ["lab-ad-gpo"],
    2: ["lab-powershell-admin"],
    3: ["lab-windows-deployment"],
    7: ["lab-powershell-admin"]
  } },
  "ccst-networking": { domains: {
    2: ["lab-ipv6-dual-stack"],
    3: ["lab-wifi-survey"],
    5: ["lab-ipv6-dual-stack"]
  } },
  "ccnp-encor": { domains: {
    1: ["lab-qos-tc", "lab-vrrp-failover", "lab-wifi-survey"],
    3: ["lab-frr-ospf-multiarea", "lab-frr-bgp", "lab-ipv6-dual-stack"]
  } },
  "jncia-junos": { domains: {
    2: ["lab-junos-cli"],
    3: ["lab-junos-cli"],
    4: ["lab-junos-cli"],
    5: ["lab-junos-cli"],
    6: ["lab-junos-cli", "lab-frr-ospf-multiarea"],
    7: ["lab-junos-cli", "lab-frr-bgp"]
  } },
  "cwna": { domains: {
    1: ["lab-wifi-survey"],
    4: ["lab-wifi-survey"],
    6: ["lab-wifi-survey"]
  } }
};
