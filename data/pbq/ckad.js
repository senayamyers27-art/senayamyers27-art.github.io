CertHub.addPbqs("ckad", [
  { id: "job-fields-match", d: 1, type: "match", title: "Match Job and CronJob fields to their behavior",
    prompt: "A batch workload in namespace reports uses the Job and CronJob fields below. Match each field to what it controls.",
    context: "apiVersion: batch/v1\nkind: CronJob\nmetadata:\n  name: nightly-report\n  namespace: reports\nspec:\n  schedule: \"30 2 * * *\"\n  concurrencyPolicy: Forbid\n  successfulJobsHistoryLimit: 3\n  jobTemplate:\n    spec:\n      completions: 6\n      parallelism: 2\n      backoffLimit: 4\n      activeDeadlineSeconds: 900\n      template:\n        spec:\n          restartPolicy: Never\n          containers:\n          - name: report\n            image: registry.example.com/reports/builder:1.8",
    pairs: [
      ["completions: 6", "Total number of Pods that must finish successfully for the Job to be complete"],
      ["parallelism: 2", "Maximum number of Pods of the Job running at the same time"],
      ["backoffLimit: 4", "Number of retries before the Job is marked Failed"],
      ["activeDeadlineSeconds: 900", "Wall-clock time limit after which the whole Job is terminated"],
      ["concurrencyPolicy: Forbid", "Skip a new scheduled run while the previous Job is still running"],
      ["successfulJobsHistoryLimit: 3", "How many finished successful Jobs are kept for inspection"]
    ],
    extra: ["Number of Pods kept running permanently on every node", "Delay in seconds before the first run after the CronJob is created"],
    explain: "completions is the success target and parallelism caps how many Pods run at once, so this Job runs 2 Pods at a time until 6 have succeeded. backoffLimit counts failed retries, while activeDeadlineSeconds is a hard time budget for the whole Job that wins even if retries remain. concurrencyPolicy and the history limits live on the CronJob spec, not the Job template: Forbid skips overlapping runs (Replace would kill the old one), and successfulJobsHistoryLimit controls how many old Jobs stay around."
  },
  { id: "entrypoint-cmd-fill", d: 1, type: "fill", title: "Work out the process a container runs",
    prompt: "The image registry.example.com/shop/api:2.0 was built from the Dockerfile shown. For each Pod spec, type the full command line the container runs (words separated by single spaces).",
    context: "# Dockerfile (last lines)\nENTRYPOINT [\"python\", \"app.py\"]\nCMD [\"--port\", \"8080\"]\n\n# Pod A container\n  image: registry.example.com/shop/api:2.0\n\n# Pod B container\n  image: registry.example.com/shop/api:2.0\n  args: [\"--port\", \"9090\"]\n\n# Pod C container\n  image: registry.example.com/shop/api:2.0\n  command: [\"python\", \"worker.py\"]",
    fields: [
      { label: "Pod A runs", answers: ["python app.py --port 8080"] },
      { label: "Pod B runs", answers: ["python app.py --port 9090"] },
      { label: "Pod C runs", answers: ["python worker.py"] }
    ],
    explain: "In Kubernetes, `command` replaces the image ENTRYPOINT and `args` replaces the image CMD. Pod A overrides nothing, so ENTRYPOINT plus CMD runs. Pod B only sets args, so the ENTRYPOINT stays and the new args replace CMD. Pod C sets command without args, and when command is set the image CMD is ignored too, so no --port flag is passed at all."
  },
  { id: "rollout-undo-order", d: 2, type: "order", title: "Roll out a new image and roll back a bad release",
    prompt: "Deployment web in namespace shop must move to image web:1.5. The new version fails its readiness probe, so you must return to the last good revision. Put the steps in the correct order.",
    steps: [
      "kubectl -n shop set image deployment/web web=registry.example.com/shop/web:1.5",
      "kubectl -n shop rollout status deployment/web  (it stalls: new Pods never become Ready)",
      "kubectl -n shop rollout history deployment/web  (find the revision that ran web:1.4)",
      "kubectl -n shop rollout undo deployment/web --to-revision=3",
      "kubectl -n shop rollout status deployment/web  (confirm it reports successfully rolled out)"
    ],
    explain: "set image changes the Pod template and triggers a new ReplicaSet, and rollout status is how you watch it progress. Because the rolling update never removes more old Pods than maxUnavailable allows, a failing readiness probe stalls the rollout instead of taking the app down. rollout history lists revisions so you can pick the right target, undo --to-revision scales the old ReplicaSet back up, and a final rollout status proves the rollback finished."
  },
  { id: "rolling-update-math", d: 2, type: "fill", title: "Calculate rolling update limits",
    prompt: "Use the Deployment strategy shown. During the rollout, fill in the Pod limits the controller enforces.",
    context: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: checkout\nspec:\n  replicas: 10\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 25%\n      maxUnavailable: 25%",
    fields: [
      { label: "maxSurge as a Pod count", answers: ["3"] },
      { label: "maxUnavailable as a Pod count", answers: ["2"] },
      { label: "Maximum total Pods (old + new) at any moment", answers: ["13"] },
      { label: "Minimum available Pods at any moment", answers: ["8"] }
    ],
    explain: "25% of 10 is 2.5. Kubernetes rounds maxSurge up (3) and maxUnavailable down (2), which errs toward keeping capacity. So the Deployment may run up to 10 + 3 = 13 Pods and must keep at least 10 - 2 = 8 available. If both values were 0 the rollout could never make progress, which is why the API rejects that combination."
  },
  { id: "helm-commands-match", d: 2, type: "match", title: "Match Helm commands to tasks",
    prompt: "You manage an application release named web with Helm 3. Match each task to the command that does it.",
    pairs: [
      ["See the configurable defaults of a chart before installing", "helm show values example/web"],
      ["Render the manifests locally without touching the cluster", "helm template web example/web -f prod.yaml"],
      ["Install into namespace shop, which does not exist yet", "helm install web example/web -n shop --create-namespace"],
      ["Return the release to revision 2 after a bad upgrade", "helm rollback web 2 -n shop"],
      ["Refresh the local cache of chart repository indexes", "helm repo update"]
    ],
    extra: ["helm uninstall web -n shop", "helm list -A"],
    explain: "helm show values prints the chart's values.yaml so you know what to override with --set or -f. helm template renders YAML client-side, which is handy for review or piping into kubectl. install -n with --create-namespace creates the namespace for you, rollback takes a release name and revision number, and repo update refreshes indexes so search and install see new chart versions. uninstall removes the release and list shows releases; neither performs these tasks."
  },
  { id: "pod-status-match", d: 3, type: "match", title: "Match Pod symptoms to their likely cause",
    prompt: "kubectl get pods -n shop shows these symptoms. Match each to the most likely cause.",
    context: "NAME                      READY   STATUS                       RESTARTS   AGE\ncart-5f7c9d8b6-2kq4m      0/1     ImagePullBackOff             0          4m\norders-6b8d7c5f9-lx9pz    0/1     CrashLoopBackOff             7          12m\nsearch-7c6d5b4f8-mm2rt    0/1     Pending                      0          9m\npayments-84f6c7d9b-qw7nc  0/1     CreateContainerConfigError   0          3m\ncatalog-5d9f8b7c6-vt3hx   0/1     Running                      0          6m",
    pairs: [
      ["cart: ImagePullBackOff", "Wrong image name or tag, or missing registry pull credentials"],
      ["orders: CrashLoopBackOff", "The process starts and exits repeatedly; check kubectl logs --previous"],
      ["search: Pending", "No node has enough unrequested CPU or memory to schedule it"],
      ["payments: CreateContainerConfigError", "A referenced ConfigMap, Secret or key does not exist"],
      ["catalog: Running but 0/1 READY", "The readiness probe is failing"]
    ],
    extra: ["The Service selector does not match the Pod labels", "The Deployment was paused with kubectl rollout pause"],
    explain: "ImagePullBackOff means the kubelet cannot pull the image, so check the image string and imagePullSecrets. CrashLoopBackOff means the container runs and exits; the previous container's logs usually show why. Pending with no node assigned points at the scheduler: kubectl describe shows FailedScheduling, often for insufficient CPU or memory. CreateContainerConfigError happens before start when env or envFrom references a missing ConfigMap, Secret or key. Running but not Ready is a readiness probe problem. A bad Service selector does not change Pod status at all; it only leaves the Service with no endpoints."
  },
  { id: "oomkilled-describe", d: 3, type: "select", title: "Find the evidence in kubectl describe",
    prompt: "The api Pod keeps restarting. Select every line that is direct evidence the container is being killed for exceeding its memory limit.",
    context: "$ kubectl -n shop describe pod api-7d9c5b6f4-x2k8q\nName:         api-7d9c5b6f4-x2k8q\nNamespace:    shop\nStatus:       Running\nContainers:\n  api:\n    Image:          registry.example.com/shop/api:2.4.1\n    State:          Waiting\n      Reason:       CrashLoopBackOff\n    Last State:     Terminated\n      Reason:       OOMKilled\n      Exit Code:    137\n    Restart Count:  6\n    Limits:\n      memory:  128Mi\n    Requests:\n      cpu:     100m\n      memory:  128Mi\nEvents:\n  Normal   Pulled   2m (x7 over 14m)  kubelet  Container image \"registry.example.com/shop/api:2.4.1\" already present on machine\n  Warning  BackOff  30s (x25 over 13m) kubelet  Back-off restarting failed container api",
    options: [
      "Status: Running",
      "State: Waiting / Reason: CrashLoopBackOff",
      "Last State: Terminated / Reason: OOMKilled",
      "Exit Code: 137",
      "Requests: cpu: 100m",
      "Event: Container image already present on machine"
    ],
    answers: [2, 3],
    explain: "OOMKilled in Last State is the kernel's out-of-memory killer ending the container at its memory limit, and exit code 137 (128 + 9, SIGKILL) is consistent with that. CrashLoopBackOff only says the container keeps restarting, not why, and the Pod phase Running tells you nothing about the cause. The CPU request and the image pull event are unrelated. The fix is to raise the memory limit or reduce the app's memory use."
  },
  { id: "securitycontext-match", d: 4, type: "match", title: "Map security requirements to securityContext fields",
    prompt: "A security review lists requirements for the payments Pod. Match each requirement to the securityContext setting that enforces it.",
    pairs: [
      ["Refuse to start the container if the image would run as UID 0", "runAsNonRoot: true"],
      ["Block writes anywhere except mounted volumes", "readOnlyRootFilesystem: true"],
      ["Stop setuid binaries from gaining more privileges than their parent", "allowPrivilegeEscalation: false"],
      ["Remove every Linux capability from the container", "capabilities: { drop: [\"ALL\"] }"],
      ["Make mounted volumes group-owned by GID 2000 (Pod level)", "fsGroup: 2000"]
    ],
    extra: ["privileged: true", "runAsUser: 0"],
    explain: "runAsNonRoot makes the kubelet check the effective UID and refuse to start a root container; it does not pick a UID for you (runAsUser does). readOnlyRootFilesystem forces writes into volumes such as an emptyDir. allowPrivilegeEscalation: false sets no_new_privs so setuid binaries cannot elevate. Dropping ALL capabilities removes kernel privileges like NET_ADMIN, and fsGroup is a Pod-level field that sets group ownership on supported volumes. privileged: true and runAsUser: 0 do the opposite of hardening."
  },
  { id: "rbac-can-i", d: 4, type: "select", title: "Decide what a ServiceAccount is allowed to do",
    prompt: "Given the Role and RoleBinding shown (and no other bindings for this ServiceAccount), select every request that kubectl auth can-i would answer yes for.",
    context: "apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  name: deployer\n  namespace: dev\nrules:\n- apiGroups: [\"\"]\n  resources: [\"pods\", \"pods/log\"]\n  verbs: [\"get\", \"list\", \"watch\"]\n- apiGroups: [\"apps\"]\n  resources: [\"deployments\"]\n  verbs: [\"get\", \"list\", \"patch\"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata:\n  name: ci-bot-deployer\n  namespace: dev\nsubjects:\n- kind: ServiceAccount\n  name: ci-bot\n  namespace: dev\nroleRef:\n  apiGroup: rbac.authorization.k8s.io\n  kind: Role\n  name: deployer\n\n# every check below uses --as=system:serviceaccount:dev:ci-bot",
    options: [
      "kubectl auth can-i list pods -n dev",
      "kubectl auth can-i delete pods -n dev",
      "kubectl auth can-i get pods/log -n dev",
      "kubectl auth can-i patch deployments.apps -n dev",
      "kubectl auth can-i list pods -n prod",
      "kubectl auth can-i create deployments.apps -n dev",
      "kubectl auth can-i get secrets -n dev",
      "kubectl auth can-i create pods/exec -n dev"
    ],
    answers: [0, 2, 3],
    explain: "RBAC is additive and deny-by-default: only listed resource and verb combinations are allowed. The Role grants read verbs on pods and pods/log and get, list and patch on apps/deployments, which is enough for kubectl logs and kubectl set image. Delete, create, secrets and the pods/exec subresource are not listed, and a Role bound by a RoleBinding in dev grants nothing in prod."
  },
  { id: "quota-requests-fill", d: 4, type: "fill", title: "Fit a Deployment under a ResourceQuota",
    prompt: "Namespace team-a has the ResourceQuota shown and nothing else running. The Deployment's container uses the resources shown. Fill in the values.",
    context: "apiVersion: v1\nkind: ResourceQuota\nmetadata:\n  name: team-a-quota\n  namespace: team-a\nspec:\n  hard:\n    requests.cpu: \"1\"\n    requests.memory: 1Gi\n    limits.cpu: \"4\"\n    limits.memory: 2Gi\n\n# Deployment api, container resources:\nresources:\n  requests:\n    cpu: 200m\n    memory: 256Mi\n  limits:\n    cpu: 500m\n    memory: 256Mi",
    fields: [
      { label: "QoS class of each api Pod", answers: ["Burstable"] },
      { label: "Maximum api replicas that can run under the quota", answers: ["4"] },
      { label: "Quota resource that runs out first", answers: ["requests.memory", "memory requests", "requests memory"] }
    ],
    explain: "The Pod is Burstable because requests and limits are set but CPU request (200m) differs from CPU limit (500m); Guaranteed needs requests equal to limits for every resource. Per replica the quota sees 200m CPU and 256Mi memory requested, 500m and 256Mi in limits. requests.memory allows 1024/256 = 4 replicas, fewer than requests.cpu (5), limits.cpu (8) or limits.memory (8), so a fifth Pod is rejected with an exceeded quota error on the ReplicaSet."
  },
  { id: "service-endpoints", d: 5, type: "select", title: "Predict a Service's ready endpoints",
    prompt: "Service web lives in namespace shop with the selector shown. Select every Pod whose IP will be listed as a ready endpoint of this Service.",
    context: "$ kubectl -n shop get svc web -o jsonpath='{.spec.selector}'\n{\"app\":\"web\",\"tier\":\"frontend\"}\n\n$ kubectl get pods -A --show-labels\nNAMESPACE  NAME        READY  STATUS   LABELS\nshop       web-1       1/1    Running  app=web,tier=frontend,version=v2\nshop       web-2       1/1    Running  app=web,tier=frontend\nshop       web-3       0/1    Running  app=web,tier=frontend\nshop       web-4       1/1    Running  app=Web,tier=frontend\nshop       web-canary  1/1    Running  app=web,tier=frontend,track=canary\nshop       web-old     1/1    Running  app=web\nshop       api-1       1/1    Running  app=api,tier=frontend\ndefault    web-5       1/1    Running  app=web,tier=frontend",
    options: ["web-1", "web-2", "web-3", "web-4", "web-canary", "web-old", "api-1", "web-5 (namespace default)"],
    answers: [0, 1, 4],
    explain: "A Service selects Pods in its own namespace whose labels include every key/value in the selector; extra labels such as version or track do not matter, which is how canary Pods join a Service. web-3 matches but is not Ready, so it is held out of the ready endpoints until its readiness probe passes. Label values are case-sensitive (Web is not web), web-old lacks tier, api-1 has the wrong app, and web-5 is in another namespace."
  },
  { id: "netpol-db-select", d: 5, type: "select", title: "Evaluate a NetworkPolicy",
    prompt: "This is the only NetworkPolicy in the cluster and the CNI enforces policies. Select every connection that is allowed.",
    context: "apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: db-ingress\n  namespace: shop\nspec:\n  podSelector:\n    matchLabels:\n      app: db\n  policyTypes:\n  - Ingress\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          app: api\n    - namespaceSelector:\n        matchLabels:\n          team: monitoring\n    ports:\n    - protocol: TCP\n      port: 5432",
    options: [
      "Pod app=api in namespace shop -> db Pod on TCP 5432",
      "Pod app=api in namespace shop -> db Pod on TCP 22",
      "Pod app=web in namespace shop -> db Pod on TCP 5432",
      "Any Pod in a namespace labeled team=monitoring -> db Pod on TCP 5432",
      "Pod app=api in namespace staging (no team label) -> db Pod on TCP 5432",
      "db Pod -> 203.0.113.10 on TCP 443",
      "Pod app=api in namespace shop -> db Pod on UDP 5432"
    ],
    answers: [0, 3, 5],
    explain: "The two items under from are separate list entries, so they are ORed: api Pods in the policy's own namespace, or any Pod in a namespace labeled team=monitoring, and only on TCP 5432. A podSelector without a namespaceSelector only matches Pods in the same namespace, so the staging api Pod is blocked. policyTypes lists only Ingress, so egress from db Pods is not restricted. Combining podSelector and namespaceSelector in a single entry (no dash before namespaceSelector) would instead AND them."
  },
  { id: "nodeport-fill", d: 5, type: "fill", title: "Trace ports through a NodePort Service",
    prompt: "Using the Service and node shown, fill in the values.",
    context: "apiVersion: v1\nkind: Service\nmetadata:\n  name: web\n  namespace: shop\nspec:\n  type: NodePort\n  selector:\n    app: web\n  ports:\n  - port: 80\n    targetPort: 8080\n    nodePort: 30080\n\n$ kubectl get nodes -o wide\nNAME     STATUS  INTERNAL-IP\nworker1  Ready   192.168.56.11",
    fields: [
      { label: "Port a Pod in namespace shop uses to reach the web Service by name", answers: ["80"] },
      { label: "Port a client outside the cluster uses on 192.168.56.11", answers: ["30080"] },
      { label: "Port the web container must listen on", answers: ["8080"] },
      { label: "Shortest DNS name a Pod in namespace payments can use for this Service", answers: ["web.shop"] }
    ],
    explain: "port is the Service's own port on its ClusterIP and DNS name, targetPort is where traffic is delivered on the selected Pods, and nodePort (30000-32767 by default) is opened on every node for outside clients. From another namespace the short name web would resolve in payments, so you need at least web.shop; web.shop.svc.cluster.local is the fully qualified form. A NodePort Service still gets a ClusterIP, so in-cluster clients keep using port 80."
  }
]);
