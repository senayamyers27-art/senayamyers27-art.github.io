/* Performance-based practice for Google Cloud Associate Cloud Engineer. */
CertHub.addPbqs("google-ace", [
  { id: "gcloud-config-match", d: 1, type: "match", title: "Match gcloud setup tasks to commands",
    prompt: "You are setting up the Google Cloud CLI on a new laptop for two projects. Match each task to the command that does it.",
    pairs: [
      ["Authorize an account and create a configuration interactively", "gcloud init"],
      ["Set the default zone in the active configuration", "gcloud config set compute/zone us-central1-a"],
      ["Create a new named configuration called prod", "gcloud config configurations create prod"],
      ["Switch back to the dev configuration", "gcloud config configurations activate dev"],
      ["Enable the Compute Engine API in the current project", "gcloud services enable compute.googleapis.com"]
    ],
    extra: ["gcloud compute zones set us-central1-a", "gcloud auth application-default revoke"],
    explain: "gcloud init walks you through authorization and a first configuration. Properties such as compute/zone are set with gcloud config set SECTION/PROPERTY. Named configurations are created with configurations create (which also activates the new one) and switched with configurations activate. APIs are turned on per project with gcloud services enable. There is no gcloud compute zones set command, and application-default revoke removes the credentials client libraries use, which is unrelated to these tasks." },

  { id: "new-project-order", d: 1, type: "order", title: "Stand up a new project for a VM workload",
    prompt: "A team needs a new project in the Retail folder and one VM in it. Put these steps in the order they must happen.",
    steps: [
      "Create the project in the Retail folder with gcloud projects create --folder",
      "Link the project to the company billing account with gcloud billing projects link",
      "Enable the Compute Engine API with gcloud services enable compute.googleapis.com",
      "Create the VM with gcloud compute instances create"
    ],
    explain: "The project has to exist before anything can be attached to it. Compute Engine is a paid service, so the project needs an active billing account before its API can be enabled and used. Only after the API is enabled can you create instances; trying earlier fails with an error that the API is disabled or that billing is required." },

  { id: "data-product-match", d: 2, type: "match", title: "Choose the data product for each workload",
    prompt: "Match each workload to the Google Cloud product that fits it best.",
    pairs: [
      ["Regional web shop that needs a managed PostgreSQL database", "Cloud SQL"],
      ["Global inventory ledger needing strongly consistent relational transactions across regions", "Spanner"],
      ["Millions of IoT sensor readings per second, read by device ID and time", "Bigtable"],
      ["Analysts running SQL over years of sales history at petabyte scale", "BigQuery"],
      ["Mobile app storing user profiles as JSON-like documents with real-time sync", "Firestore"],
      ["Compliance archive of scanned PDFs read less than once a year", "Cloud Storage Archive class"]
    ],
    extra: ["Memorystore", "Filestore"],
    explain: "Cloud SQL is managed MySQL, PostgreSQL or SQL Server for regional transactional apps. Spanner is the relational choice when you need horizontal scale and strong consistency across regions. Bigtable handles massive, low-latency key-based workloads such as time series. BigQuery is the serverless analytics warehouse. Firestore is a document database built for web and mobile apps with real-time listeners. Archive is the cheapest Cloud Storage class for data read less than once a year. Memorystore is a cache and Filestore is managed NFS, so neither fits these needs." },

  { id: "subnet-fill", d: 2, type: "fill", title: "Plan addresses in a custom mode subnet",
    prompt: "You create a subnet in a custom mode VPC with the primary range 10.20.0.0/22. Remember that Google Cloud reserves four addresses in every primary range. Fill in:",
    context: "gcloud compute networks subnets create app-subnet \\\n  --network=prod-vpc --region=us-east1 --range=10.20.0.0/22",
    fields: [
      { label: "Total addresses in the range", answers: ["1024"] },
      { label: "Addresses you can assign to VMs", answers: ["1020"] },
      { label: "Default gateway address", answers: ["10.20.0.1"] },
      { label: "First address a VM can receive", answers: ["10.20.0.2"] },
      { label: "Last address a VM can receive", answers: ["10.20.3.253"] }
    ],
    explain: "A /22 has 2^10 = 1024 addresses, from 10.20.0.0 to 10.20.3.255. Google Cloud reserves the network address (10.20.0.0), the default gateway (10.20.0.1), the second-to-last address (10.20.3.254) and the broadcast address (10.20.3.255), leaving 1020 usable addresses from 10.20.0.2 to 10.20.3.253. Many learners subtract only two, as in traditional networking, and get 1022." },

  { id: "firewall-select", d: 2, type: "select", title: "Which firewall rules apply to a web VM?",
    prompt: "VM web-1 is in the network prod-vpc and has only the network tag web. It runs as the service account web-sa. Select every rule that applies to inbound (ingress) traffic reaching web-1.",
    context: "NAME              NETWORK   DIRECTION  PRIORITY  ALLOW/DENY    SOURCE/DEST RANGES              TARGETS\nallow-web         prod-vpc  INGRESS    1000      ALLOW tcp:80,tcp:443  src 0.0.0.0/0             tag: web\nallow-iap-ssh     prod-vpc  INGRESS    1000      ALLOW tcp:22          src 35.235.240.0/20       all instances\nallow-db          prod-vpc  INGRESS    1000      ALLOW tcp:5432        src 10.20.0.0/22          tag: db\ndeny-smtp-out     prod-vpc  EGRESS     900       DENY tcp:25           dst 0.0.0.0/0             all instances\nallow-lb-health   prod-vpc  INGRESS    1000      ALLOW tcp:80          src 35.191.0.0/16,130.211.0.0/22  tag: web\nallow-batch       prod-vpc  INGRESS    1000      ALLOW tcp:9000        src 10.20.0.0/22          sa: batch-sa",
    options: ["allow-web", "allow-iap-ssh", "allow-db", "deny-smtp-out", "allow-lb-health", "allow-batch"],
    answers: [0, 1, 4],
    explain: "A rule applies to a VM when its direction matches and its target covers the VM: all instances, a network tag the VM has, or the service account it runs as. allow-web and allow-lb-health target the web tag, and allow-iap-ssh targets all instances, so all three govern ingress to web-1. allow-db targets the db tag and allow-batch targets the batch-sa service account, which web-1 doesn't use. deny-smtp-out applies to web-1, but it is an egress rule, so it doesn't affect inbound traffic." },

  { id: "cloud-run-canary", d: 3, type: "order", title: "Release a Cloud Run revision as a canary",
    prompt: "You need to release version 2.0 of the Cloud Run service shop with minimal risk. Put the steps in the correct order.",
    steps: [
      "Deploy the 2.0 image with gcloud run deploy --no-traffic --tag=green",
      "Test the new revision through its green tagged URL",
      "Send 10% of traffic to the new revision with gcloud run services update-traffic",
      "Watch error rates and latency for the new revision in Cloud Monitoring",
      "Move 100% of traffic to the latest revision with update-traffic --to-latest"
    ],
    explain: "Deploying with --no-traffic creates the revision without sending users to it, and the tag gives it its own URL for testing. Once it passes, a small traffic split exposes real users gradually while you watch metrics. Only when the canary is healthy do you shift all traffic. If metrics look bad at any point, you roll back by sending traffic to the previous revision, with no rebuild." },

  { id: "audit-log-select", d: 3, type: "select", title: "Find who deleted resources",
    prompt: "An incident review asks which resources were deleted by people rather than by automation. Select every audit log entry that shows a human user deleting a resource.",
    context: "timestamp             principalEmail                                        methodName                                   resource\n2026-09-20T08:02:11Z  alice@example.com                                     v1.compute.instances.delete                  instances/web-3\n2026-09-20T08:05:40Z  123456789012@cloudservices.gserviceaccount.com        v1.compute.instances.delete                  instances/web-mig-x7k2\n2026-09-20T09:14:03Z  bob@example.com                                       v1.compute.instances.insert                  instances/web-4\n2026-09-20T09:30:27Z  carol@example.com                                     storage.buckets.delete                       buckets/tmp-exports-2026\n2026-09-20T10:01:55Z  deploy-sa@shop-prod.iam.gserviceaccount.com           google.cloud.run.v1.Services.DeleteService   services/old-api\n2026-09-20T11:45:19Z  dave@example.com                                      SetIamPolicy                                 projects/shop-prod",
    options: [
      "08:02:11 alice@example.com deletes instances/web-3",
      "08:05:40 cloudservices service account deletes instances/web-mig-x7k2",
      "09:14:03 bob@example.com inserts instances/web-4",
      "09:30:27 carol@example.com deletes buckets/tmp-exports-2026",
      "10:01:55 deploy-sa deletes services/old-api",
      "11:45:19 dave@example.com calls SetIamPolicy on the project"
    ],
    answers: [0, 3],
    explain: "Admin Activity audit logs record the principal and method of every configuration change. Alice's instances.delete and Carol's buckets.delete are deletions by user accounts. The cloudservices account is the Google APIs service agent, which a managed instance group uses when it removes VMs, and deploy-sa is a service account used by automation. Bob created a VM and Dave changed IAM policy, which are changes but not deletions." },

  { id: "ops-tools-match", d: 3, type: "match", title: "Pick the operations tool for each question",
    prompt: "Match each operational need to the Google Cloud Observability feature that meets it.",
    pairs: [
      ["Email the team when average CPU stays above 80% for 5 minutes", "Alerting policy"],
      ["Check that the public home page answers from several continents", "Uptime check"],
      ["Chart how many times 'payment declined' appears in logs", "Log-based metric"],
      ["Copy every project's audit logs into one BigQuery dataset", "Aggregated log sink"],
      ["Group new exceptions from a Cloud Run service and notify on them", "Error Reporting"],
      ["Find which microservice adds the most latency to a request", "Cloud Trace"],
      ["Collect memory and disk usage from inside VMs", "Ops Agent"]
    ],
    extra: ["Cloud Profiler", "VPC Flow Logs"],
    explain: "Alerting policies turn metric conditions into notifications, while uptime checks probe endpoints from global locations. Log-based metrics turn matching log entries into chartable metrics, and an aggregated sink at the organization or folder routes logs from all child projects. Error Reporting groups exceptions, Cloud Trace breaks request latency into spans, and the Ops Agent collects guest OS metrics that aren't available by default. Cloud Profiler shows CPU and memory use by function, and VPC Flow Logs record network flows, so neither fits these needs." },

  { id: "iam-roles-match", d: 4, type: "match", title: "Grant the least-privilege role",
    prompt: "Match each requirement to the predefined role that meets it with the least privilege.",
    pairs: [
      ["Let a developer attach app-sa to the VMs they create", "Service Account User"],
      ["Let an admin run gcloud as deploy-sa without creating a key", "Service Account Token Creator"],
      ["Let a Cloud Run service read one database password from Secret Manager", "Secret Manager Secret Accessor"],
      ["Let an auditor list resources and view IAM policies without changing anything", "Security Reviewer"],
      ["Let operators SSH to Linux VMs with sudo through OS Login", "Compute OS Admin Login"],
      ["Let engineers open SSH tunnels to private VMs through IAP", "IAP-secured Tunnel User"]
    ],
    extra: ["Owner", "Service Account Key Admin"],
    explain: "Service Account User allows attaching (acting as) a service account, while Token Creator allows minting short-lived tokens for impersonation. Secret Accessor reads secret values, ideally granted on a single secret. Security Reviewer is read-only for resources and IAM policies. Compute OS Admin Login grants OS Login access with sudo, and IAP-secured Tunnel User allows IAP TCP forwarding. Owner is far broader than any of these needs, and Service Account Key Admin manages keys, which you want to avoid." },

  { id: "iam-policy-fill", d: 4, type: "fill", title: "Read a project's IAM policy",
    prompt: "You ran gcloud projects get-iam-policy shop-prod. Use the output to fill in the answers (email addresses only, without the member-type prefix).",
    context: "bindings:\n- members:\n  - group:data-team@example.com\n  - serviceAccount:etl-sa@shop-prod.iam.gserviceaccount.com\n  role: roles/bigquery.dataViewer\n- members:\n  - user:alice@example.com\n  role: roles/owner\n- members:\n  - group:ops@example.com\n  role: roles/compute.osAdminLogin\n- condition:\n    expression: request.time < timestamp(\"2026-12-31T00:00:00Z\")\n    title: audit-q4\n  members:\n  - user:auditor@example.net\n  role: roles/viewer\netag: BwYexample00=\nversion: 3",
    fields: [
      { label: "Principal who can change this project's IAM policy", answers: ["alice@example.com", "user:alice@example.com"] },
      { label: "Group that can log in to Linux VMs with sudo", answers: ["ops@example.com", "group:ops@example.com"] },
      { label: "Service account with read access to BigQuery data", answers: ["etl-sa@shop-prod.iam.gserviceaccount.com", "serviceAccount:etl-sa@shop-prod.iam.gserviceaccount.com"] },
      { label: "Year in which the auditor's access ends", answers: ["2026"] },
      { label: "Policy version", answers: ["3"] }
    ],
    explain: "Only Owner among these roles includes permission to set IAM policies, so alice@example.com can change the policy. roles/compute.osAdminLogin gives the ops group OS Login access with sudo. The BigQuery Data Viewer binding includes etl-sa as well as the data team. The auditor's Viewer grant has an IAM Condition that stops applying at the end of 2026, and conditional bindings require policy version 3." }
]);
