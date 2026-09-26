/* Hands-on exercises for the Certified Kubernetes Application Developer (CKAD). Checked by tools/check-data.js. */
CertHub.addHandson("ckad", {
  tables: {},
  items: [
    {
      id: "ckad-run-pod", kind: "kube", d: 1,
      title: "Run a single Pod from an image",
      prompt: "You want a one-off Pod to test an image, not a Deployment.\n\nIn the `dev` namespace, run a Pod named `probe` from the image `busybox:1.36` with the restart policy set to Never. Then check it with `kubectl get pods -n dev`.",
      hint: "kubectl run probe --image=busybox:1.36 --restart=Never -n dev creates a bare Pod. Without --restart=Never, run would still create a Pod but with the default Always policy.",
      explain: "kubectl run creates a single Pod, which is the right choice for a quick test or a task Pod rather than a managed workload. --restart=Never gives the Pod restartPolicy Never, suited to run-once containers, while the default Always suits long-running servers. Generating and tweaking Pods this way is a core Application Design and Build skill.",
      setup: { namespace: "default", nodes: [{ name: "w1" }], objects: [] },
      checks: [
        { label: "The probe Pod exists in dev", type: "exists", kind: "pod", name: "probe", namespace: "dev" },
        { label: "It uses the busybox:1.36 image", type: "image", kind: "pod", name: "probe", namespace: "dev", image: "busybox:1.36" }
      ],
      solution: ["kubectl run probe --image=busybox:1.36 --restart=Never -n dev", "kubectl get pods -n dev"]
    },
    {
      id: "ckad-create-job", kind: "kube", d: 1,
      title: "Create a Job to run a task to completion",
      prompt: "A data import needs to run once and then stop, retrying only if it fails.\n\nIn the `batch` namespace, create a Job named `importer` from the image `busybox:1.36`. Then list Jobs with `kubectl get jobs -n batch`.",
      hint: "kubectl create job importer --image=busybox:1.36 -n batch creates a Job. A Job runs its Pod until it completes successfully rather than keeping it running forever.",
      explain: "A Job runs one or more Pods until a set number complete successfully, which fits batch work like migrations, imports and reports. It differs from a Deployment, which keeps Pods running indefinitely. Fields such as completions, parallelism and backoffLimit tune how a Job behaves, and choosing Job over Deployment for run-to-completion work is a key design decision on the exam.",
      setup: { namespace: "default", nodes: [{ name: "w1" }], objects: [] },
      checks: [
        { label: "The importer Job exists in batch", type: "exists", kind: "job", name: "importer", namespace: "batch" },
        { label: "It uses the busybox:1.36 image", type: "image", kind: "job", name: "importer", namespace: "batch", image: "busybox:1.36" }
      ],
      solution: ["kubectl create job importer --image=busybox:1.36 -n batch", "kubectl get jobs -n batch"]
    },
    {
      id: "ckad-create-cronjob", kind: "kube", d: 1,
      title: "Schedule recurring work with a CronJob",
      prompt: "A cleanup task must run every night at 2:00 AM in the `batch` namespace.\n\nCreate a CronJob named `cleanup` from the image `busybox:1.36` with the schedule `0 2 * * *`. Then check it with `kubectl get cronjob -n batch`.",
      hint: "kubectl create cronjob cleanup --image=busybox:1.36 --schedule=\"0 2 * * *\" -n batch. Quote the schedule so the shell keeps the five fields together.",
      explain: "A CronJob creates a Job on a repeating schedule written in standard cron syntax: minute, hour, day of month, month, day of week. So 0 2 * * * means 02:00 every day. concurrencyPolicy and the history limits control overlapping runs and how many finished Jobs are kept. CronJobs are the go-to for periodic maintenance and reporting tasks.",
      setup: { namespace: "default", nodes: [{ name: "w1" }], objects: [] },
      checks: [
        { label: "The cleanup CronJob exists in batch", type: "exists", kind: "cronjob", name: "cleanup", namespace: "batch" },
        { label: "Its schedule is 0 2 * * *", type: "field", kind: "cronjob", name: "cleanup", namespace: "batch", path: "spec.schedule", equals: "0 2 * * *" }
      ],
      solution: ["kubectl create cronjob cleanup --image=busybox:1.36 --schedule=\"0 2 * * *\" -n batch", "kubectl get cronjob -n batch"]
    },
    {
      id: "ckad-deploy-create", kind: "kube", d: 2,
      title: "Deploy an application with several replicas",
      prompt: "A stateless web app needs to run redundantly in the `web` namespace.\n\nCreate a Deployment named `site` from the image `httpd:2.4` with 4 replicas. Then check it with `kubectl get deploy -n web`.",
      hint: "kubectl create deployment site --image=httpd:2.4 --replicas=4 -n web creates the Deployment and its ReplicaSet in one step.",
      explain: "A Deployment declares the desired state for a stateless app: which image to run and how many replicas. Its ReplicaSet keeps that many Pods alive and reschedules them after failures, giving you self-healing and rolling updates for free. Creating a Deployment with the right replica count is the most common deployment task on the exam.",
      setup: { namespace: "default", nodes: [{ name: "w1" }], objects: [] },
      checks: [
        { label: "The site Deployment exists in web", type: "exists", kind: "deploy", name: "site", namespace: "web" },
        { label: "It requests 4 replicas", type: "field", kind: "deploy", name: "site", namespace: "web", path: "spec.replicas", equals: 4 },
        { label: "It uses the httpd:2.4 image", type: "image", kind: "deploy", name: "site", namespace: "web", image: "httpd:2.4" }
      ],
      solution: ["kubectl create deployment site --image=httpd:2.4 --replicas=4 -n web", "kubectl get deploy -n web"]
    },
    {
      id: "ckad-rolling-update", kind: "kube", d: 2,
      title: "Perform a rolling update and scale out",
      prompt: "The `api` Deployment in the `web` namespace runs `api:1.0` with 2 replicas. A new version is ready and traffic is up.\n\n1. Update the container `api` to the image `api:2.0`.\n2. Scale the Deployment to 5 replicas.\n\nConfirm with `kubectl rollout status deployment/api -n web`.",
      hint: "kubectl set image deployment/api api=api:2.0 -n web updates the image; kubectl scale deployment api --replicas=5 -n web changes the count. The name before the = in set image is the container name.",
      explain: "kubectl set image edits the Pod template so the Deployment rolls out the new version gradually, replacing old Pods with new ones under maxSurge and maxUnavailable. Scaling separately adjusts how many replicas run. Together they cover the everyday deployment lifecycle, and rollout status, history and undo let you watch or reverse a bad release.",
      setup: { namespace: "default", nodes: [{ name: "w1" }], objects: [{ kind: "Deployment", name: "api", namespace: "web", containers: [{ name: "api", image: "api:1.0" }], replicas: 2 }] },
      checks: [
        { label: "The api container now uses api:2.0", type: "image", kind: "deploy", name: "api", namespace: "web", container: "api", image: "api:2.0" },
        { label: "The Deployment now requests 5 replicas", type: "field", kind: "deploy", name: "api", namespace: "web", path: "spec.replicas", equals: 5 }
      ],
      solution: ["kubectl set image deployment/api api=api:2.0 -n web", "kubectl scale deployment api --replicas=5 -n web", "kubectl rollout status deployment/api -n web"]
    },
    {
      id: "ckad-logs", kind: "kube", d: 3,
      title: "Read a Pod's logs to diagnose a crash",
      prompt: "The Pod `worker` in the `apps` namespace keeps restarting and you need to see why.\n\nView the logs of the `worker` Pod. The simulator returns the container's captured output.",
      hint: "kubectl logs worker -n apps prints the container's stdout and stderr. For a Pod with more than one container, add -c CONTAINER.",
      explain: "kubectl logs streams a container's stdout and stderr, which is the first place to look when a Pod crashes or misbehaves. Adding --previous shows the logs of the last crashed container, and -c selects a container in a multi-container Pod. Reading logs quickly is central to the Observability and Maintenance objective.",
      setup: { namespace: "default", nodes: [{ name: "w1" }], objects: [{ kind: "Pod", name: "worker", namespace: "apps", image: "worker:1.0", logs: "2026-09-26T02:00:01Z starting worker\n2026-09-26T02:00:02Z ERROR cannot connect to database: connection refused\n2026-09-26T02:00:02Z fatal: exiting" }] },
      checks: [
        { label: "You viewed the worker Pod's logs", type: "ran", includes: "logs worker" },
        { label: "The worker Pod is present to inspect", type: "exists", kind: "pod", name: "worker", namespace: "apps" }
      ],
      solution: ["kubectl logs worker -n apps"]
    },
    {
      id: "ckad-rollout-restart", kind: "kube", d: 3,
      title: "Restart a Deployment to reload configuration",
      prompt: "You changed a ConfigMap that the `frontend` Deployment in the `web` namespace reads at startup, and the running Pods need to pick up the change.\n\nTrigger a rolling restart of the `frontend` Deployment, then watch it with `kubectl rollout status deployment/frontend -n web`.",
      hint: "kubectl rollout restart deployment/frontend -n web recreates the Pods in a controlled rolling fashion so they re-read their configuration.",
      explain: "Pods do not automatically reload most ConfigMap or Secret values consumed as environment variables, so after a config change you often restart the workload. kubectl rollout restart replaces the Pods gradually rather than deleting them all at once, avoiding downtime. It is a routine maintenance action and a clean alternative to deleting Pods by hand.",
      setup: { namespace: "default", nodes: [{ name: "w1" }], objects: [{ kind: "Deployment", name: "frontend", namespace: "web", image: "frontend:1.0", replicas: 3 }] },
      checks: [
        { label: "You triggered a rollout restart of the Deployment", type: "ran", includes: "rollout restart" },
        { label: "The frontend Deployment still exists", type: "exists", kind: "deploy", name: "frontend", namespace: "web" }
      ],
      solution: ["kubectl rollout restart deployment/frontend -n web", "kubectl rollout status deployment/frontend -n web"]
    },
    {
      id: "ckad-configmap", kind: "kube", d: 4,
      title: "Create a ConfigMap from literal values",
      prompt: "An application in the `web` namespace reads its settings from a ConfigMap.\n\nCreate a ConfigMap named `app-config` in `web` with two entries: `APP_MODE=production` and `LOG_LEVEL=info`. Then check it with `kubectl get configmap -n web`.",
      hint: "kubectl create configmap app-config --from-literal=APP_MODE=production --from-literal=LOG_LEVEL=info -n web. Repeat --from-literal for each key.",
      explain: "A ConfigMap holds non-secret configuration as key-value pairs that Pods consume as environment variables or mounted files, keeping settings out of the image. --from-literal adds one key per flag, while --from-file loads whole files. Separating config from code is a twelve-factor principle and a central part of the Application Environment and Configuration objective.",
      setup: { namespace: "default", nodes: [{ name: "w1" }], objects: [] },
      checks: [
        { label: "The app-config ConfigMap exists in web", type: "exists", kind: "cm", name: "app-config", namespace: "web" },
        { label: "APP_MODE is set to production", type: "field", kind: "cm", name: "app-config", namespace: "web", path: "data.APP_MODE", equals: "production" },
        { label: "LOG_LEVEL is set to info", type: "field", kind: "cm", name: "app-config", namespace: "web", path: "data.LOG_LEVEL", equals: "info" }
      ],
      solution: ["kubectl create configmap app-config --from-literal=APP_MODE=production --from-literal=LOG_LEVEL=info -n web", "kubectl get configmap -n web"]
    },
    {
      id: "ckad-secret", kind: "kube", d: 4,
      title: "Store a credential in a Secret",
      prompt: "A database password must be stored as a Secret rather than in a ConfigMap or the image.\n\nCreate a generic Secret named `db-credentials` in the `web` namespace with the entry `password=S3cure!`. Then list Secrets with `kubectl get secret -n web`.",
      hint: "kubectl create secret generic db-credentials --from-literal=password=S3cure! -n web. The generic subtype is for arbitrary key-value data.",
      explain: "A Secret holds sensitive data such as passwords, tokens and keys, kept separate from ConfigMaps so access can be restricted with RBAC and the values can be encrypted at rest. generic is the subtype for arbitrary literals or files, alongside tls and docker-registry secrets. Note that Secret data is only base64-encoded, not encrypted, unless the cluster enables encryption at rest.",
      setup: { namespace: "default", nodes: [{ name: "w1" }], objects: [] },
      checks: [
        { label: "The db-credentials Secret exists in web", type: "exists", kind: "secret", name: "db-credentials", namespace: "web" },
        { label: "It holds a password entry", type: "field", kind: "secret", name: "db-credentials", namespace: "web", path: "data.password", equals: "S3cure!" }
      ],
      solution: ["kubectl create secret generic db-credentials --from-literal=password=S3cure! -n web", "kubectl get secret -n web"]
    },
    {
      id: "ckad-sa-rbac", kind: "kube", d: 4,
      title: "Give a workload its own identity and access",
      prompt: "A reporting app in the `apps` namespace should read ConfigMaps under a dedicated identity, not the default ServiceAccount.\n\n1. Create a ServiceAccount named `reporter` in `apps`.\n2. Create a Role named `cm-reader` allowing the verbs get and list on the resource configmaps.\n3. Bind `cm-reader` to `reporter` with a RoleBinding named `reporter-cm`.\n\nVerify with `kubectl auth can-i list configmaps --as=system:serviceaccount:apps:reporter -n apps`.",
      hint: "Create the ServiceAccount, then a Role with --verb=get --verb=list --resource=configmaps, then a rolebinding with --role=cm-reader --serviceaccount=apps:reporter. Add -n apps to each.",
      explain: "Running a workload under a dedicated ServiceAccount and binding it to a narrow Role follows least privilege: the app can do only what it needs. A Role plus RoleBinding scopes the grant to one namespace, and kubectl auth can-i --as lets you confirm the effective permissions. This ServiceAccount-plus-RBAC pattern is central to the Security objective.",
      setup: { namespace: "default", nodes: [{ name: "w1" }], objects: [] },
      checks: [
        { label: "The reporter ServiceAccount exists in apps", type: "exists", kind: "sa", name: "reporter", namespace: "apps" },
        { label: "reporter can list configmaps", type: "can", verb: "list", resource: "configmaps", as: "system:serviceaccount:apps:reporter", namespace: "apps", allowed: true },
        { label: "reporter cannot delete configmaps", type: "can", verb: "delete", resource: "configmaps", as: "system:serviceaccount:apps:reporter", namespace: "apps", allowed: false }
      ],
      solution: ["kubectl create serviceaccount reporter -n apps", "kubectl create role cm-reader --verb=get --verb=list --resource=configmaps -n apps", "kubectl create rolebinding reporter-cm --role=cm-reader --serviceaccount=apps:reporter -n apps", "kubectl auth can-i list configmaps --as=system:serviceaccount:apps:reporter -n apps"]
    },
    {
      id: "ckad-expose", kind: "kube", d: 5,
      title: "Expose a Deployment inside the cluster",
      prompt: "Other services need to reach the `api` Deployment in the `web` namespace by a stable name. The containers listen on port 8080.\n\nExpose the Deployment as a ClusterIP Service named `api-svc` on port 80 targeting port 8080. Then check it with `kubectl get svc -n web`.",
      hint: "kubectl expose deployment api --port=80 --target-port=8080 --name=api-svc -n web. --port is the Service port, --target-port is the container port.",
      explain: "A Service gives a group of Pods one stable ClusterIP and DNS name and load-balances requests across the Pods that match its selector. ClusterIP, the default, is reachable only inside the cluster, which suits service-to-service traffic. Getting --port versus --target-port right, the Service port versus the container port, is a common exam pitfall.",
      setup: { namespace: "default", nodes: [{ name: "w1" }], objects: [{ kind: "Deployment", name: "api", namespace: "web", image: "api:1.0", replicas: 2, selector: { app: "api" }, labels: { app: "api" } }] },
      checks: [
        { label: "The api-svc Service exists in web", type: "exists", kind: "svc", name: "api-svc", namespace: "web" },
        { label: "It is a ClusterIP Service", type: "field", kind: "svc", name: "api-svc", namespace: "web", path: "spec.type", equals: "ClusterIP" }
      ],
      solution: ["kubectl expose deployment api --port=80 --target-port=8080 --name=api-svc -n web", "kubectl get svc -n web"]
    },
    {
      id: "ckad-nodeport", kind: "kube", d: 5,
      title: "Publish a Service on a node port",
      prompt: "A demo in the `demo` namespace must be reachable from outside the cluster without a cloud load balancer.\n\nCreate a NodePort Service named `demo-svc` on port 8080 with target port 8080. Then confirm the type with `kubectl get svc -n demo`.",
      hint: "kubectl create service nodeport demo-svc --tcp=8080:8080 -n demo. The --tcp value is servicePort:targetPort.",
      explain: "A NodePort Service opens a port in the 30000 to 32767 range on every node and forwards it to the Service, letting outside clients reach the app through any node's address. It builds on ClusterIP, which it still provides internally, and is a simple way to expose an app when there is no cloud LoadBalancer or Ingress. Knowing the Service types and when each fits is part of Services and Networking.",
      setup: { namespace: "default", nodes: [{ name: "w1" }], objects: [] },
      checks: [
        { label: "The demo-svc Service exists in demo", type: "exists", kind: "svc", name: "demo-svc", namespace: "demo" },
        { label: "It is a NodePort Service", type: "field", kind: "svc", name: "demo-svc", namespace: "demo", path: "spec.type", equals: "NodePort" }
      ],
      solution: ["kubectl create service nodeport demo-svc --tcp=8080:8080 -n demo", "kubectl get svc -n demo"]
    }
  ]
});
