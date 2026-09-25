CertHub.addPbqs("cka", [

  /* ---------- Domain 5: Troubleshooting ---------- */
  { id: "component-symptom-match", d: 5, type: "match",
    title: "Match the symptom to the failed cluster component",
    prompt: "Each row is a symptom on a kubeadm cluster. Match it to the component that is most likely at fault.",
    pairs: [
      ["New Pods stay Pending and get no scheduling events at all", "kube-scheduler"],
      ["A Deployment shows 5 desired but no Pods are ever created", "kube-controller-manager"],
      ["kubectl fails with 'connection to 10.0.0.10:6443 was refused'", "kube-apiserver"],
      ["A node is NotReady and kubelet logs 'failed to connect to /run/containerd/containerd.sock'", "containerd"]
    ],
    extra: ["kube-proxy", "CoreDNS"],
    explain: "The scheduler is the only thing that writes FailedScheduling events, so total silence means it is down. The Deployment and ReplicaSet controllers live in kube-controller-manager, so missing Pod objects point there rather than at the scheduler. A refused connection on 6443 is the API server itself, and a kubelet that cannot reach the CRI socket has lost its container runtime (containerd)." },

  { id: "pending-cpu-select", d: 5, type: "select",
    title: "Fix a Pending Pod without using the control plane",
    prompt: "Select every action that could let this Pod schedule while keeping workloads off the control plane node.",
    context: "$ kubectl describe pod report-job\n...\nEvents:\n  Type     Reason            Message\n  ----     ------            -------\n  Warning  FailedScheduling  0/3 nodes are available: 1 node(s) had untolerated taint\n                             {node-role.kubernetes.io/control-plane: }, 2 Insufficient cpu.",
    options: [
      "Lower the Pod's CPU request so it fits on a worker",
      "Add a worker node (or free CPU that reserved requests are holding)",
      "Add a toleration for node-role.kubernetes.io/control-plane to the Pod",
      "Remove the control-plane taint from the control plane node",
      "Raise the Pod's CPU limit so it is granted more CPU"
    ],
    answers: [0, 1],
    explain: "The two workers have no allocatable CPU left for the request, so shrinking the request or adding capacity are the fixes that respect the control plane. Tolerating or removing the control-plane taint would let workloads land on the control plane, which the task forbids. Scheduling is decided by requests, not limits, so raising the limit changes nothing." },

  { id: "cluster-ports-fill", d: 5, type: "fill",
    title: "Key ports and paths for troubleshooting",
    prompt: "Fill in these facts you rely on when the API server or a node is misbehaving on a kubeadm cluster.",
    fields: [
      { label: "Secure port the kube-apiserver listens on", answers: ["6443"] },
      { label: "Port etcd serves clients on", answers: ["2379"] },
      { label: "Directory where the runtime writes Pod stdout/stderr log files", answers: ["/var/log/pods"] }
    ],
    explain: "kubectl talks to the API server on 6443, so 'connection refused' there means the static Pod is down. etcd serves clients on 2379 (and peers on 2380), which is what the API server dials. Container stdout and stderr are written under /var/log/pods (linked from /var/log/containers), readable with crictl logs even when the API server is unavailable." },

  /* ---------- Domain 1: Cluster Architecture, Installation and Configuration ---------- */
  { id: "kubeadm-upgrade-order", d: 1, type: "order",
    title: "Upgrade the first control plane node with kubeadm",
    prompt: "Put these steps in the correct order for upgrading the first control plane node from 1.34 to 1.35.",
    steps: [
      "Upgrade the kubeadm package to the 1.35 version",
      "Run kubeadm upgrade plan to confirm the path",
      "Run kubeadm upgrade apply v1.35.x",
      "Drain the node with --ignore-daemonsets",
      "Upgrade the kubelet and kubectl packages",
      "systemctl daemon-reload and restart kubelet",
      "Uncordon the node"
    ],
    explain: "kubeadm must be upgraded first because plan and apply come from that binary; apply upgrades the control plane static Pods. Only after the control plane is on the new version do you drain, upgrade and restart kubelet, then uncordon. Upgrading kubelet before the API server would make it newer than the control plane, which the version skew policy forbids." },

  { id: "kubeadm-paths-match", d: 1, type: "match",
    title: "Match the kubeadm path or command to its purpose",
    prompt: "Match each file, directory or command to what it does on a kubeadm control plane node.",
    pairs: [
      ["/etc/kubernetes/manifests/", "Static Pod manifests kubelet runs for the control plane"],
      ["/etc/kubernetes/pki/etcd/", "The etcd CA and client certificates"],
      ["kubeadm certs check-expiration", "Reports the expiry dates of control-plane certificates"],
      ["kubeadm token create --print-join-command", "Prints a fresh worker join command with the CA hash"]
    ],
    extra: ["The kubelet config file loaded from --config at startup"],
    explain: "kubelet watches /etc/kubernetes/manifests and runs whatever it finds there, which is how the API server, etcd, scheduler and controller-manager start. etcd's mutual-TLS material lives under /etc/kubernetes/pki/etcd, which etcdctl needs for snapshots. check-expiration lists cert expiry, while kubeadm token create --print-join-command mints a new bootstrap token and prints the full join line." },

  /* ---------- Domain 3: Services and Networking ---------- */
  { id: "networkpolicy-flows-select", d: 3, type: "select",
    title: "Read a NetworkPolicy and pick the allowed flows",
    prompt: "This is the only NetworkPolicy in namespace shop. Select every traffic flow it allows.",
    context: "apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: db-allow\n  namespace: shop\nspec:\n  podSelector:\n    matchLabels: {app: db}\n  policyTypes: [Ingress]\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels: {app: api}\n    ports:\n    - protocol: TCP\n      port: 5432",
    options: [
      "api Pod in shop -> db Pod on TCP 5432",
      "api Pod in shop -> db Pod on TCP 6379",
      "web Pod in shop -> db Pod on TCP 5432",
      "api Pod in namespace analytics -> db Pod on TCP 5432",
      "db Pod -> an external host on TCP 443 (egress)"
    ],
    answers: [0, 4],
    explain: "The ingress rule admits only Pods labelled app=api, and only on TCP 5432, so the api-to-db 5432 flow is allowed. Port 6379 and the web Pod both fail the rule, and a bare podSelector matches only the policy's own namespace, so api in analytics is blocked. policyTypes lists Ingress only, so egress from db Pods is not restricted by this policy and is allowed." },

  { id: "dns-nodeport-fill", d: 3, type: "fill",
    title: "Service DNS name and NodePort range",
    prompt: "Cluster DNS domain is cluster.local. For a Service named web in namespace shop, fill in:",
    fields: [
      { label: "Fully qualified DNS name of the Service", answers: ["web.shop.svc.cluster.local"] },
      { label: "Lowest port a NodePort Service uses by default", answers: ["30000"] },
      { label: "Highest port a NodePort Service uses by default", answers: ["32767"] }
    ],
    explain: "A Service's FQDN follows <service>.<namespace>.svc.<cluster-domain>, so web in shop resolves as web.shop.svc.cluster.local. The API server allocates node ports from --service-node-port-range, which defaults to 30000-32767. That range is independent of the Service's port and targetPort." },

  /* ---------- Domain 2: Workloads and Scheduling ---------- */
  { id: "taint-effects-match", d: 2, type: "match",
    title: "Match taint effects and fields to their behaviour",
    prompt: "Match each taint effect or field to what it does.",
    pairs: [
      ["NoSchedule", "Blocks new Pods that lack a matching toleration"],
      ["PreferNoSchedule", "Soft: the scheduler avoids the node when it can"],
      ["NoExecute", "Blocks new Pods and evicts running Pods that do not tolerate it"],
      ["tolerationSeconds", "How long a Pod stays before a NoExecute taint evicts it"]
    ],
    extra: ["Attracts Pods that request the matching node label"],
    explain: "NoSchedule keeps unmatched Pods off but leaves running Pods alone, while PreferNoSchedule is only a preference the scheduler tries to honour. NoExecute additionally evicts running Pods that do not tolerate it, and tolerationSeconds sets how long such a Pod may stay before that eviction. Attracting Pods is the job of nodeSelector or affinity, not taints." },

  { id: "node-affinity-select", d: 2, type: "select",
    title: "Where can this Pod be scheduled?",
    prompt: "Given the Pod's rules and the node table, select every node the Pod can be scheduled on.",
    context: "Pod spec:\n  affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution:\n    - key: disktype  operator: In  values: [ssd]\n  tolerations: (none)\n\nNodes:\n  node-a  labels: disktype=ssd   taints: (none)\n  node-b  labels: disktype=hdd   taints: (none)\n  node-c  labels: disktype=ssd   taints: dedicated=gpu:NoSchedule",
    options: [
      "node-a",
      "node-b",
      "node-c",
      "Any node, because IgnoredDuringExecution relaxes the rule"
    ],
    answers: [0],
    explain: "required node affinity is a hard filter, so only nodes labelled disktype=ssd qualify, ruling out node-b. node-c is labelled ssd but carries a NoSchedule taint the Pod does not tolerate, so it is filtered out too, leaving only node-a. IgnoredDuringExecution only means an existing Pod is not evicted if labels change later; it does not loosen scheduling." },

  /* ---------- Domain 4: Storage ---------- */
  { id: "retain-pv-recovery-order", d: 4, type: "order",
    title: "Reuse a Released Retain PersistentVolume",
    prompt: "A PV with reclaimPolicy Retain is Released after its PVC was deleted. Put the recovery steps in order so a new PVC can bind to it.",
    steps: [
      "Confirm the reclaim policy is Retain so the data was kept",
      "Back up or verify the data on the underlying volume",
      "Edit the PV and remove its spec.claimRef",
      "Confirm the PV status becomes Available",
      "Create a new PVC that binds to the now-Available PV"
    ],
    explain: "Retain keeps the PV and its data but leaves it Released with a stale claimRef pointing at the deleted PVC. Because the admin owns that data, you verify or back it up before touching the object, then clear spec.claimRef so the PV returns to Available. Only an Available PV can bind a new PVC that matches its class, size and access modes." }

]);
