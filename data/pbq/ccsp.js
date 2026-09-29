CertHub.addPbqs("ccsp", [
  {
    "id": "cloud-terms-match",
    "d": 1,
    "type": "match",
    "title": "Match cloud concepts to their descriptions",
    "prompt": "Each statement describes a cloud computing concept from NIST SP 800-145 or ISO/IEC 17788. Match each statement to the concept it describes.",
    "pairs": [
      [
        "Several state agencies with the same compliance rules share one cloud environment and split its costs.",
        "Community cloud"
      ],
      [
        "A private cloud sends overflow work to a public provider during holiday peaks, and the two stay linked.",
        "Hybrid cloud"
      ],
      [
        "A company runs analytics on one provider and email on another to avoid depending on a single vendor.",
        "Multi-cloud"
      ],
      [
        "An application adds 40 servers automatically at 9 a.m. and removes them at 6 p.m.",
        "Rapid elasticity"
      ],
      [
        "The monthly bill shows compute hours and storage gigabytes used by each department.",
        "Measured service"
      ]
    ],
    "extra": [
      "Private cloud",
      "Resource pooling"
    ],
    "explain": "A community cloud is shared by organizations with common concerns. A hybrid cloud links distinct clouds so workloads can move between them, as in cloud bursting. Multi-cloud simply means using more than one provider. Rapid elasticity is the ability to scale out and in quickly, and measured service is metering that enables pay-per-use and chargeback. Hybrid and multi-cloud are the pair most often confused: hybrid is about different deployment models working together, multi-cloud is about more than one provider."
  },
  {
    "id": "bia-backup-check",
    "d": 1,
    "type": "fill",
    "title": "Does the backup design meet the BIA?",
    "prompt": "Use the backup design and business impact analysis below to answer each question. Enter numbers as plain digits and answer yes/no questions with yes or no.",
    "context": "Order database - business impact analysis\nRPO: 2 hours          RTO: 3 hours\n\nCurrent design\nSnapshot schedule:     every 4 hours (00:00, 04:00, 08:00 ...)\nRestore snapshot to a new instance:  90 minutes\nRepoint application and DNS:         30 minutes",
    "fields": [
      {
        "label": "Worst-case data loss, in hours",
        "answers": [
          "4",
          "4 hours",
          "4h"
        ]
      },
      {
        "label": "Total recovery time, in minutes",
        "answers": [
          "120",
          "120 minutes"
        ]
      },
      {
        "label": "Is the RPO met? (yes or no)",
        "answers": [
          "no"
        ]
      },
      {
        "label": "Is the RTO met? (yes or no)",
        "answers": [
          "yes"
        ]
      }
    ],
    "explain": "With snapshots every four hours, a failure just before the next snapshot loses up to four hours of data, which is double the two-hour RPO. Recovery takes 90 + 30 = 120 minutes, which is within the three-hour RTO. The fix is to replicate or back up at least every two hours (for example continuous database replication), not to speed up the restore. Remember that RPO drives backup frequency and RTO drives restore speed."
  },
  {
    "id": "data-protection-match",
    "d": 2,
    "type": "match",
    "title": "Choose the data protection technique",
    "prompt": "Match each requirement to the data protection technique that meets it best.",
    "pairs": [
      [
        "Remove real card numbers from the order and analytics systems so they drop out of most PCI DSS scope, while payments still work.",
        "Tokenization"
      ],
      [
        "Give developers a realistic but permanently altered copy of production customer data for testing.",
        "Static masking"
      ],
      [
        "Let support agents see only the last four digits of a phone number while supervisors see it in full, from the same database.",
        "Dynamic masking"
      ],
      [
        "Make every copy of a retired data set unreadable across a provider's shared storage that you cannot physically wipe.",
        "Crypto-shredding"
      ],
      [
        "Stop a former partner from opening a design document already downloaded to their laptop.",
        "Information rights management"
      ]
    ],
    "extra": [
      "Hashing",
      "Data loss prevention"
    ],
    "explain": "Tokenization swaps sensitive values for random tokens with the real values in a separate vault, which shrinks compliance scope. Static masking makes a permanently masked copy for non-production use, while dynamic masking hides values at query time depending on the user. Crypto-shredding destroys the keys so all encrypted copies become unreadable, the practical sanitization method in the cloud. IRM keeps protection attached to a file so rights can be revoked after it leaves. Hashing is one-way and cannot support payments, and DLP stops data leaving but cannot reach a copy already delivered."
  },
  {
    "id": "data-lifecycle-order",
    "d": 2,
    "type": "order",
    "title": "Cloud secure data lifecycle",
    "prompt": "Put the phases of the cloud secure data lifecycle, as described by the Cloud Security Alliance, in order.",
    "steps": [
      "Create",
      "Store",
      "Use",
      "Share",
      "Archive",
      "Destroy"
    ],
    "explain": "Data is created (including modified), stored almost immediately, then used and shared, archived when no longer active and finally destroyed. Real data can loop through use and share many times, but this is the reference order. Classification belongs in the create phase, and destruction in the cloud usually relies on crypto-shredding because the customer cannot physically destroy shared media."
  },
  {
    "id": "bucket-policy-review",
    "d": 2,
    "type": "select",
    "title": "Review a storage bucket policy",
    "prompt": "Requirement: only the reporting role may read objects, nobody outside the account may access the bucket, requests must use TLS, and objects must be encrypted with the company's customer-managed key. Select every setting that violates the requirement.",
    "context": "Bucket: finance-reports-prod\n1  Account-level block public access:      OFF\n2  Statement A: Allow  s3:GetObject   Principal: role/reporting\n3  Statement B: Allow  s3:GetObject   Principal: *  (anyone)\n4  Statement C: Deny   s3:*          Condition: aws:SecureTransport = false\n5  Default encryption: SSE with provider-managed key\n6  Server access logging: enabled to log-archive account",
    "options": [
      "Setting 1",
      "Setting 2",
      "Setting 3",
      "Setting 4",
      "Setting 5",
      "Setting 6"
    ],
    "answers": [
      0,
      2,
      4
    ],
    "explain": "Setting 3 grants read access to anyone, which exposes the reports publicly, and setting 1 leaves the account-level public access block off, so nothing stops that grant. Setting 5 uses a provider-managed key instead of the required customer-managed key. Setting 2 is the intended least-privilege grant, setting 4 correctly denies any request not made over TLS, and setting 6 sends access logs to a separate account, which supports accountability."
  },
  {
    "id": "security-group-review",
    "d": 3,
    "type": "select",
    "title": "Security group rules against policy",
    "prompt": "Policy: only the load balancer may reach the app tier on 443, only the app tier may reach the database on 5432, and administrators connect through the provider's session manager (no SSH or RDP from the internet). Select every rule that violates the policy.",
    "context": "Security groups - inbound rules\n#  Group     Source            Port   Protocol\n1  app-sg    lb-sg             443    tcp\n2  app-sg    0.0.0.0/0         22     tcp\n3  db-sg     app-sg            5432   tcp\n4  db-sg     10.0.0.0/16       5432   tcp\n5  lb-sg     0.0.0.0/0         443    tcp\n6  app-sg    0.0.0.0/0         3389   tcp",
    "options": [
      "Rule 1",
      "Rule 2",
      "Rule 3",
      "Rule 4",
      "Rule 5",
      "Rule 6"
    ],
    "answers": [
      1,
      3,
      5
    ],
    "explain": "Rules 2 and 6 open SSH and RDP to the entire internet, which the policy forbids because administration goes through the session manager. Rule 4 lets the whole VPC address range reach the database, not just the app tier. Rules 1 and 3 reference the load balancer and app security groups, which is the precise least-privilege pattern, and rule 5 correctly exposes only the load balancer on HTTPS to the internet."
  },
  {
    "id": "tier-match",
    "d": 3,
    "type": "match",
    "title": "Data center tiers",
    "prompt": "Match each description to the Uptime Institute tier it defines.",
    "pairs": [
      [
        "Single path for power and cooling with no redundant components; maintenance requires shutdown.",
        "Tier I"
      ],
      [
        "Redundant capacity components such as extra generators, but still a single distribution path.",
        "Tier II"
      ],
      [
        "Multiple distribution paths so any component can be maintained without shutting down IT equipment.",
        "Tier III"
      ],
      [
        "Continues operating through any single unplanned failure, with compartmentalized redundant systems.",
        "Tier IV"
      ]
    ],
    "extra": [
      "Tier 0",
      "Tier V"
    ],
    "explain": "The key words are basic (Tier I), redundant components (Tier II), concurrently maintainable (Tier III) and fault tolerant (Tier IV). Tier III is the lowest tier that allows planned maintenance without downtime; Tier IV adds tolerance of unplanned failures. The Uptime classification has only four tiers."
  },
  {
    "id": "stride-match",
    "d": 4,
    "type": "match",
    "title": "STRIDE threat classification",
    "prompt": "A team is threat modeling a cloud file-sharing API. Match each finding to its STRIDE category.",
    "pairs": [
      [
        "A caller can upload files that appear to come from another user.",
        "Spoofing"
      ],
      [
        "Files in transit between two microservices can be modified without detection.",
        "Tampering"
      ],
      [
        "Deletions are not logged, so a user can deny having removed a shared folder.",
        "Repudiation"
      ],
      [
        "An error page returns the full storage connection string.",
        "Information disclosure"
      ],
      [
        "One client can send unlimited large uploads and exhaust the service for everyone.",
        "Denial of service"
      ],
      [
        "A normal user can call an admin-only endpoint that changes other users' quotas.",
        "Elevation of privilege"
      ]
    ],
    "explain": "STRIDE maps each threat to the property it violates: spoofing breaks authentication, tampering breaks integrity, repudiation breaks non-repudiation, information disclosure breaks confidentiality, denial of service breaks availability and elevation of privilege breaks authorization. Typical mitigations are strong caller identity, signing or TLS, audit logging, generic errors and secrets management, rate limits and quotas, and server-side authorization on every request."
  },
  {
    "id": "cloud-forensics-order",
    "d": 5,
    "type": "order",
    "title": "Preserve evidence from a compromised instance",
    "prompt": "A web server in IaaS shows signs of compromise. Put the response steps in the order that stops the attack while preserving the most evidence.",
    "steps": [
      "Apply a restrictive isolation security group to the instance",
      "Capture volatile memory with the pre-installed agent",
      "Snapshot the attached disk volumes",
      "Compute and record SHA-256 hashes of the memory image and snapshots on the chain-of-custody form",
      "Analyze copies of the evidence in a separate forensic account",
      "Rebuild the workload from a clean golden image"
    ],
    "explain": "Isolation contains the attacker without powering off the instance, so memory survives. Memory is the most volatile evidence and is captured first, then disks are snapshotted. Hashing at acquisition and recording it on the chain-of-custody form proves integrity later. Analysis is done on copies in a separate account so the evidence stays untouched, and only then is the workload rebuilt. Terminating or rebooting first is the classic mistake because it destroys volatile evidence."
  },
  {
    "id": "itsm-match",
    "d": 5,
    "type": "match",
    "title": "Operational processes",
    "prompt": "Match each activity to the IT service management process (ITIL / ISO/IEC 20000-1) it belongs to.",
    "pairs": [
      [
        "Restore the checkout service within 30 minutes after it stops responding.",
        "Incident management"
      ],
      [
        "Find out why certificates keep expiring and remove the cause.",
        "Problem management"
      ],
      [
        "Assess, approve and schedule a firewall rule update with a rollback plan.",
        "Change management"
      ],
      [
        "Keep records of servers, their software versions and dependencies in the CMDB.",
        "Configuration management"
      ],
      [
        "Package, test and move a new application version into production.",
        "Release and deployment management"
      ]
    ],
    "extra": [
      "Capacity management",
      "Service level management"
    ],
    "explain": "Incident management restores service as fast as possible, while problem management finds and removes root causes so incidents do not recur. Change management controls modifications through assessment and approval, configuration management keeps an accurate record of configuration items and relationships, and release and deployment management moves tested changes into production in controlled packages."
  },
  {
    "id": "compliance-match",
    "d": 6,
    "type": "match",
    "title": "Laws, standards and programs",
    "prompt": "Match each situation to the law, standard or program that most directly governs it.",
    "pairs": [
      [
        "A US hospital's cloud provider must sign an agreement to protect patient records.",
        "HIPAA"
      ],
      [
        "An online store stores and transmits cardholder data in the cloud.",
        "PCI DSS"
      ],
      [
        "A cloud service wants to sell to US federal agencies.",
        "FedRAMP"
      ],
      [
        "A US bank must protect customers' nonpublic personal financial information.",
        "GLBA"
      ],
      [
        "A company processes personal data of people in the European Union.",
        "GDPR"
      ]
    ],
    "extra": [
      "ISO/IEC 27050",
      "SOX"
    ],
    "explain": "HIPAA covers US health information and requires business associate agreements with providers handling it. PCI DSS is the card industry's contractual standard for cardholder data. FedRAMP standardizes security authorization of cloud services for US federal use, built on NIST SP 800-53 and the RMF. GLBA covers financial institutions' customer information, and the GDPR applies to personal data of people in the EU regardless of where the organization is. ISO/IEC 27050 is about eDiscovery and SOX is about financial reporting controls."
  }
]);
