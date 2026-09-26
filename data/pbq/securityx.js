/* Performance-based simulations for CompTIA SecurityX (CAS-005). */
CertHub.addPbqs("securityx", [
  { id: "governance-docs-match", d: 1, type: "match", title: "Place requirements in the governance hierarchy",
    prompt: "A CISO is reorganizing the security document library. Match each statement to the type of governance document it belongs in.",
    pairs: [
      ["All company data must be protected according to its classification.", "Policy"],
      ["Laptops must use full-disk encryption with AES-256 and TPM-protected keys.", "Standard"],
      ["1. Open the encryption console. 2. Select the device. 3. Export the recovery key to the vault.", "Procedure"],
      ["Consider using a passphrase of four or more random words for personal accounts.", "Guideline"],
      ["Every Windows server build must disable SMBv1 and enable audit logging per CIS Level 1.", "Baseline"]
    ],
    extra: ["Risk register", "Exception"],
    explain: "A policy is a short, mandatory statement of intent approved by leadership. A standard makes it measurable (a specific algorithm). A procedure is step-by-step instructions, and a guideline is optional advice. A baseline sets the minimum configuration for a class of systems, often from a CIS Benchmark. The usual trap is putting technical values such as algorithms into the policy, which then needs board approval every time technology changes." },

  { id: "ale-fill", d: 1, type: "fill", title: "Calculate annualized loss expectancy",
    prompt: "Use the risk assessment data to fill in the values. Enter whole dollar amounts without symbols or commas.",
    context: "Asset: customer order database\nAsset value (AV): $500,000\nExposure factor (EF) for a ransomware event: 40%\nAnnualized rate of occurrence (ARO): 0.5 (once every two years)\nProposed control: immutable backups plus EDR, annual cost $60,000\nExpected ARO with control: 0.1 (EF unchanged)",
    fields: [
      { label: "Single loss expectancy (SLE) without the control", answers: ["200000"] },
      { label: "Annualized loss expectancy (ALE) without the control", answers: ["100000"] },
      { label: "ALE with the control", answers: ["20000"] },
      { label: "Net annual value of the control (ALE reduction minus control cost)", answers: ["20000"] }
    ],
    explain: "SLE = AV x EF = $500,000 x 0.4 = $200,000. ALE = SLE x ARO = $200,000 x 0.5 = $100,000. With the control, ALE = $200,000 x 0.1 = $20,000, so the control reduces ALE by $80,000 per year. Subtracting its $60,000 cost leaves a net value of $20,000, so the control is cost-justified. A common mistake is comparing the control cost with the SLE instead of the ALE reduction." },

  { id: "sg-rule-review", d: 2, type: "select", title: "Review cloud security group rules",
    prompt: "A three-tier app must follow these requirements: only HTTPS from the internet to the load balancer; the web tier accepts traffic only from the load balancer; only the web tier reaches the app tier on 8443; only the app tier reaches the database on 5432; administration only through the bastion host at 10.0.0.10. Select every rule that violates the requirements.",
    context: "Rule  Target        Direction  Source          Port/Proto\n1     lb-sg         inbound    0.0.0.0/0       443/tcp\n2     lb-sg         inbound    0.0.0.0/0       80/tcp\n3     web-sg        inbound    lb-sg           443/tcp\n4     web-sg        inbound    0.0.0.0/0       22/tcp\n5     app-sg        inbound    web-sg          8443/tcp\n6     app-sg        inbound    10.0.0.10/32    22/tcp\n7     db-sg         inbound    app-sg          5432/tcp\n8     db-sg         inbound    web-sg          5432/tcp",
    options: ["Rule 1", "Rule 2", "Rule 3", "Rule 4", "Rule 5", "Rule 6", "Rule 7", "Rule 8"],
    answers: [1, 3, 7],
    explain: "Rule 2 allows plain HTTP from the internet when only HTTPS is permitted. Rule 4 exposes SSH on the web tier to the whole internet instead of only the bastion host. Rule 8 lets the web tier talk to the database directly, bypassing the app tier and breaking the layered design. Rule 6 is acceptable because SSH comes only from the bastion at 10.0.0.10, and referencing security groups as sources (rules 3, 5 and 7) is the preferred way to express tier-to-tier trust." },

  { id: "identity-protocol-match", d: 2, type: "match", title: "Match identity requirements to protocols",
    prompt: "Match each requirement to the protocol or technology that best meets it.",
    pairs: [
      ["Browser SSO to enterprise SaaS using signed XML assertions", "SAML 2.0"],
      ["A mobile app calls an API on a user's behalf without seeing the password", "OAuth 2.0 with PKCE"],
      ["A web app needs a signed ID token describing the signed-in user", "OpenID Connect"],
      ["Wired switch ports admit only authenticated corporate devices", "802.1X with RADIUS"],
      ["Administrators' commands on routers are individually authorized and logged", "TACACS+"]
    ],
    extra: ["LDAP simple bind", "Kerberos constrained delegation"],
    explain: "SAML uses XML assertions for web SSO. OAuth 2.0 is for delegated authorization with access tokens, and PKCE protects the authorization code flow for public clients such as mobile apps. OIDC adds authentication on top of OAuth 2.0 with an ID token (a JWT). 802.1X with a RADIUS server controls network port access, while TACACS+ separates authentication, authorization and accounting so each device command can be authorized and logged. A frequent confusion is treating OAuth 2.0 alone as an authentication protocol." },

  { id: "devsecops-pipeline-order", d: 2, type: "order", title: "Order security gates in a CI/CD pipeline",
    prompt: "Put these pipeline security activities in the order they would normally occur, from a developer's commit to production.",
    steps: [
      "Secret scanning and SAST run on the pull request",
      "Software composition analysis checks dependencies during the build",
      "The container image is scanned and signed with build provenance",
      "DAST runs against the application deployed to staging",
      "The cluster admission controller verifies the image signature before deployment to production"
    ],
    explain: "Checks that need only source code (secret scanning, SAST) run first on the pull request. SCA runs when dependencies are resolved during the build. The built image is scanned and signed with provenance before it is promoted. DAST needs a running application, so it runs in staging. Finally, production admission control refuses any image that was not signed by the official pipeline, which protects against tampered or out-of-band images." },

  { id: "email-dns-records", d: 3, type: "select", title: "Find weaknesses in email authentication records",
    prompt: "The company example.com is being spoofed in phishing emails. Review its DNS records and select every finding that weakens protection against spoofing.",
    context: "example.com.                TXT  \"v=spf1 include:_spf.mailhost.example.net +all\"\nsel1._domainkey.example.com TXT  \"v=DKIM1; k=rsa; p=MIIBIjANBgkqh...AQAB\"\n_dmarc.example.com          TXT  \"v=DMARC1; p=none; rua=mailto:dmarc@example.com\"\nparked-example.com          (no SPF, no DMARC; domain sends no mail)\nexample.com                 MX   10 mx1.example.com.",
    options: [
      "The SPF record ends with +all, which authorizes any server to send",
      "The DKIM record publishes a public key under a selector",
      "The DMARC policy is p=none, so failing mail is still delivered",
      "The DMARC record includes an aggregate report (rua) address",
      "The parked domain has no SPF or DMARC reject policy",
      "The MX record points to a host in the same domain"
    ],
    answers: [0, 2, 4],
    explain: "An SPF record ending in +all passes every sender, which makes SPF useless; it should end in -all or ~all. DMARC at p=none only monitors, so spoofed mail is still delivered; after reviewing reports the policy should move to quarantine and then reject. Parked domains that send no mail should publish 'v=spf1 -all' and a DMARC reject policy so attackers cannot use them. Publishing a DKIM key, collecting rua reports and an in-domain MX host are normal and correct." },

  { id: "crypto-usecase-match", d: 3, type: "match", title: "Match security goals to cryptographic techniques",
    prompt: "Match each requirement to the cryptographic technique that best satisfies it.",
    pairs: [
      ["Captured TLS traffic must stay safe even if the server's private key is stolen later", "Ephemeral ECDHE key exchange"],
      ["Rotate a master key without re-encrypting terabytes of stored files", "Envelope encryption"],
      ["Stored passwords must be slow to crack offline", "Argon2id with a unique salt"],
      ["Customers must verify an installer came from the vendor unmodified", "Code signing"],
      ["A cloud service must compute totals on data it can never decrypt", "Homomorphic encryption"],
      ["Protect long-lived secrets against future quantum attacks on key exchange", "ML-KEM"]
    ],
    extra: ["Unsalted SHA-256", "Base64 encoding"],
    explain: "Ephemeral (EC)DHE gives forward secrecy, so a stolen long-term key cannot decrypt past sessions. Envelope encryption wraps per-object data keys with a master key, so rotating the master key only re-wraps small data keys. Argon2id is a slow, memory-hard password hash, and salts defeat precomputed tables. Code signing proves the publisher and integrity. Homomorphic encryption allows computation on ciphertext, and ML-KEM is the NIST post-quantum key establishment standard. Unsalted fast hashes and Base64 do not protect secrets." },

  { id: "cert-inspect-fill", d: 3, type: "fill", title: "Read a certificate and diagnose a TLS error",
    prompt: "Users browsing to the site portal.example.com over HTTPS get a name mismatch warning. Use the certificate output to fill in the fields.",
    context: "$ openssl x509 -in portal.pem -noout -subject -issuer -dates -ext subjectAltName,extendedKeyUsage\nsubject=CN = www.example.com\nissuer=C = US, O = Example Corp, CN = Example Issuing CA 2\nnotBefore=Mar  1 00:00:00 2026 GMT\nnotAfter=Mar  1 23:59:59 2027 GMT\nX509v3 Subject Alternative Name:\n    DNS:www.example.com, DNS:shop.example.com\nX509v3 Extended Key Usage:\n    TLS Web Server Authentication",
    fields: [
      { label: "Name of the CA that issued this certificate (its CN)", answers: ["Example Issuing CA 2"] },
      { label: "Year in which the certificate expires", answers: ["2027"] },
      { label: "How many DNS names does the certificate cover?", answers: ["2", "two"] },
      { label: "Hostname that must be added to the SAN list to fix the warning", answers: ["portal.example.com"] }
    ],
    explain: "The issuer field shows Example Issuing CA 2, an intermediate issuing CA. notAfter shows expiry in March 2027, so the certificate is in date. Clients match the hostname against the Subject Alternative Name list, which contains only www.example.com and shop.example.com, so portal.example.com must be added and the certificate reissued. The extended key usage is correct for a web server, so the problem is purely the missing name." },

  { id: "router-hardening-select", d: 3, type: "select", title: "Spot insecure network device configuration",
    prompt: "Review this router configuration excerpt and select every line that should be changed to meet a hardening standard requiring encrypted management, centralized AAA and secure monitoring.",
    context: "1  hostname edge-rtr-01\n2  aaa new-model\n3  aaa authentication login default group tacacs+ local\n4  ip ssh version 2\n5  line vty 0 4\n6   transport input telnet ssh\n7  snmp-server community public RO\n8  ip http server\n9  logging host 192.0.2.50\n10 ntp server 192.0.2.10",
    options: ["Line 3", "Line 4", "Line 6", "Line 7", "Line 8", "Line 9", "Line 10"],
    answers: [2, 3, 4],
    explain: "Line 6 still allows Telnet, which sends credentials in clear text; it should allow SSH only. Line 7 uses SNMPv2c with the default community string public; replace it with SNMPv3 users at the authPriv level. Line 8 enables the unencrypted HTTP management server; disable it or use HTTPS only. Line 3 (TACACS+ with a local fallback), SSH version 2, central logging and NTP are all good practice." },

  { id: "password-spray-select", d: 4, type: "select", title: "Identify password spraying in authentication logs",
    prompt: "Select every log line that is part of a password-spraying pattern, where one source tries a common password against many accounts.",
    context: "1  09:14:02 auth fail user=alice src=203.0.113.7 reason=bad_password\n2  09:14:05 auth fail user=bob src=203.0.113.7 reason=bad_password\n3  09:14:06 auth ok   user=dana src=10.20.1.44 mfa=push_approved\n4  09:14:09 auth fail user=carol src=203.0.113.7 reason=bad_password\n5  09:14:30 auth fail user=erin src=10.20.1.51 reason=bad_password\n6  09:14:31 auth ok   user=erin src=10.20.1.51 mfa=totp\n7  09:14:33 auth fail user=frank src=203.0.113.7 reason=bad_password\n8  09:15:40 auth ok   user=svc-backup src=10.20.5.9 method=kerberos",
    options: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5", "Line 6", "Line 7", "Line 8"],
    answers: [0, 1, 3, 6],
    explain: "Lines 1, 2, 4 and 7 show one external source (203.0.113.7) failing against four different accounts within seconds, which is the signature of password spraying: many users, few attempts each. Line 5 followed by line 6 is a single user mistyping and then succeeding with MFA from an internal address, which is normal. Lines 3 and 8 are ordinary successful logons. A good detection counts distinct usernames failed per source over a short window rather than failures per account." },

  { id: "ransomware-ir-order", d: 4, type: "order", title: "Sequence a ransomware response",
    prompt: "EDR has just alerted on ransomware encrypting a file server. Put the response actions in the correct order.",
    steps: [
      "Confirm the alert, scope affected hosts and accounts, and open the incident record",
      "Isolate affected hosts with EDR and disable the compromised accounts",
      "Capture memory and disk images of key systems and record hashes in the chain of custody",
      "Remove persistence mechanisms and patch the vulnerability used for initial access",
      "Restore data from verified immutable backups and monitor closely for reinfection",
      "Hold a lessons-learned review and update playbooks and detections"
    ],
    explain: "Detection and analysis come first, so the team knows what is affected. Containment (isolation and disabling accounts) stops the spread. Evidence is preserved before eradication changes the systems. Eradication removes the attacker's foothold and closes the entry point, then recovery restores from known-good backups with heightened monitoring. Lessons learned closes the incident. Restoring before containment and eradication risks immediate reinfection." },

  { id: "vuln-fix-match", d: 4, type: "match", title: "Match vulnerability findings to root-cause fixes",
    prompt: "A code review produced these findings. Match each one to the fix that addresses its root cause.",
    pairs: [
      ["Login query built by concatenating the username into SQL", "Use parameterized queries"],
      ["Service rebuilds Java objects received from clients", "Accept only data formats with schema validation"],
      ["Balance is checked, then deducted in a separate call", "Wrap check and update in one atomic transaction"],
      ["C parser copies packets into a fixed buffer without length checks", "Rewrite in a memory-safe language and fuzz it"],
      ["User comments are rendered into pages without encoding", "Apply context-aware output encoding"]
    ],
    extra: ["Hide detailed error messages", "Move the service to another port"],
    explain: "SQL injection is fixed by keeping code and data separate with parameterized queries. Insecure deserialization is avoided by accepting only simple data formats with validation, or strict type allow lists. The check-then-deduct flaw is a race condition (TOCTOU), fixed with an atomic transaction or lock. Buffer overflows are removed by memory-safe languages, with fuzzing to find remaining bugs. Stored XSS is prevented by context-aware output encoding. Hiding errors or changing ports does not remove any of these root causes." }
]);
