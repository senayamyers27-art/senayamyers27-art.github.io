/* Hands-on exercises for the Certified Kubernetes Administrator (CKA). Checked by tools/check-data.js. */
CertHub.addHandson("cka", {
  tables: {},
  items: [
    {
      id: "cka-ns-create", kind: "kube", d: 1,
      title: "Create a namespace for a team",
      prompt: "A new team needs its own space in the cluster so their objects stay separate from everyone else's.\n\nCreate a namespace called `team-blue`. Then confirm it with `kubectl get ns`.",
      hint: "kubectl create namespace NAME makes a new namespace. There is no --namespace flag involved because a namespace is cluster-scoped, not inside another one.",
      explain: "Namespaces partition a single cluster into virtual clusters so names, quotas and access control can be scoped per team or environment. kubectl create namespace is the quickest way to make one on the exam, and cluster-scoped objects like namespaces and nodes are never placed inside another namespace themselves.",
      setup: { namespace: "default", nodes: [{ name: "cp", roles: "control-plane" }, { name: "w1" }], objects: [] },
      checks: [
        { label: "The team-blue namespace exists", type: "exists", kind: "namespace", name: "team-blue" },
        { label: "The default namespace was not disturbed", type: "exists", kind: "namespace", name: "default" }
      ],
      solution: ["kubectl create namespace team-blue", "kubectl get ns"]
    },
    {
      id: "cka-sa-create", kind: "kube", d: 1,
      title: "Create a ServiceAccount for a workload",
      prompt: "An application in the `apps` namespace should run under its own identity instead of the default ServiceAccount.\n\nCreate a ServiceAccount named `app-runner` in the `apps` namespace, then list the ServiceAccounts there to confirm it.",
      hint: "kubectl create serviceaccount NAME makes one; add -n apps so it lands in the right namespace. The short name for the resource is sa.",
      explain: "Every Pod runs as a ServiceAccount, and using a dedicated one instead of the namespace default lets you grant it exactly the RBAC permissions it needs and no more. Creating a ServiceAccount is the first half of the common pattern of binding a Role to a workload identity.",
      setup: { namespace: "default", nodes: [{ name: "cp", roles: "control-plane" }], objects: [] },
      checks: [
        { label: "The app-runner ServiceAccount exists in apps", type: "exists", kind: "sa", name: "app-runner", namespace: "apps" },
        { label: "It was created, not left missing", type: "ran", includes: "create serviceaccount" }
      ],
      solution: ["kubectl create serviceaccount app-runner -n apps", "kubectl get sa -n apps"]
    },
    {
      id: "cka-rbac-role", kind: "kube", d: 1,
      title: "Grant read-only Pod access with RBAC",
      prompt: "The ServiceAccount `viewer` in the `web` namespace must be able to get and list Pods, but nothing else.\n\n1. Create a Role named `pod-reader` in `web` that allows the verbs get and list on the resource pods.\n2. Create a RoleBinding named `read-pods` that binds `pod-reader` to the ServiceAccount `viewer`.\n\nConfirm with `kubectl auth can-i list pods --as=system:serviceaccount:web:viewer -n web`.",
      hint: "kubectl create role NAME --verb=get --verb=list --resource=pods, then kubectl create rolebinding NAME --role=pod-reader --serviceaccount=web:viewer. Add -n web to both.",
      explain: "RBAC in Kubernetes is additive and deny-by-default: a subject can do only what a Role grants. A Role plus RoleBinding scopes permission to one namespace, while ClusterRoles and ClusterRoleBindings work cluster-wide. kubectl auth can-i --as lets you verify a subject's access without logging in as them, which is exactly how you check your work on the exam.",
      setup: { namespace: "web", nodes: [{ name: "cp", roles: "control-plane" }], objects: [{ kind: "ServiceAccount", name: "viewer", namespace: "web" }] },
      checks: [
        { label: "The pod-reader Role exists in web", type: "exists", kind: "role", name: "pod-reader", namespace: "web" },
        { label: "viewer can list pods", type: "can", verb: "list", resource: "pods", as: "system:serviceaccount:web:viewer", namespace: "web", allowed: true },
        { label: "viewer cannot delete pods", type: "can", verb: "delete", resource: "pods", as: "system:serviceaccount:web:viewer", namespace: "web", allowed: false }
      ],
      solution: ["kubectl create role pod-reader --verb=get --verb=list --resource=pods -n web", "kubectl create rolebinding read-pods --role=pod-reader --serviceaccount=web:viewer -n web", "kubectl auth can-i list pods --as=system:serviceaccount:web:viewer -n web"]
    },
    {
      id: "cka-drain-node", kind: "kube", d: 1,
      title: "Drain a node for maintenance",
      prompt: "Worker node `worker-2` needs an operating-system patch and must stop accepting Pods and hand off its running Pods.\n\nDrain `worker-2`, ignoring DaemonSet-managed Pods. Confirm the node shows SchedulingDisabled with `kubectl get nodes`.",
      hint: "kubectl drain NODE --ignore-daemonsets cordons the node and evicts its Pods. DaemonSet Pods are expected, so --ignore-daemonsets keeps drain from stopping on them.",
      explain: "Draining is the safe way to take a node out of service: it cordons the node so the scheduler places nothing new there, then evicts existing Pods so controllers reschedule them elsewhere. --ignore-daemonsets is almost always needed because DaemonSet Pods run on every node by design. After maintenance you run kubectl uncordon to let the node accept Pods again.",
      setup: { namespace: "default", nodes: [{ name: "cp", roles: "control-plane" }, { name: "worker-2" }], objects: [{ kind: "Pod", name: "app-1", namespace: "default", image: "nginx", node: "worker-2" }] },
      checks: [
        { label: "worker-2 is no longer schedulable", type: "nodeSchedulable", node: "worker-2", schedulable: false },
        { label: "The app-1 Pod was evicted from the node", type: "missing", kind: "pod", name: "app-1", namespace: "default" }
      ],
      solution: ["kubectl drain worker-2 --ignore-daemonsets", "kubectl get nodes"]
    },
    {
      id: "cka-deploy-create", kind: "kube", d: 2,
      title: "Create a Deployment with three replicas",
      prompt: "The `shop` namespace needs a web front end that survives Pod failures.\n\nCreate a Deployment named `frontend` in the `shop` namespace using the image `nginx:1.25` with 3 replicas. Then check it with `kubectl get deploy -n shop`.",
      hint: "kubectl create deployment NAME --image=nginx:1.25 --replicas=3, and add -n shop so it goes in the right namespace.",
      explain: "A Deployment manages a ReplicaSet, which keeps the requested number of Pod replicas running and reschedules them when a Pod or node fails. Setting replicas at creation time is faster than creating one and scaling it, and the Deployment is the standard self-healing primitive the exam expects for stateless workloads.",
      setup: { namespace: "default", nodes: [{ name: "cp", roles: "control-plane" }, { name: "w1" }], objects: [] },
      checks: [
        { label: "The frontend Deployment exists in shop", type: "exists", kind: "deploy", name: "frontend", namespace: "shop" },
        { label: "It requests 3 replicas", type: "field", kind: "deploy", name: "frontend", namespace: "shop", path: "spec.replicas", equals: 3 },
        { label: "It uses the nginx:1.25 image", type: "image", kind: "deploy", name: "frontend", namespace: "shop", image: "nginx:1.25" }
      ],
      solution: ["kubectl create deployment frontend --image=nginx:1.25 --replicas=3 -n shop", "kubectl get deploy -n shop"]
    },
    {
      id: "cka-scale-deploy", kind: "kube", d: 2,
      title: "Scale a Deployment up",
      prompt: "Traffic to the `api` Deployment in the `prod` namespace has grown and two replicas are no longer enough.\n\nScale the `api` Deployment to 5 replicas, then confirm the new count with `kubectl get deploy -n prod`.",
      hint: "kubectl scale deployment api --replicas=5 -n prod sets the desired count. You can also scale with kubectl scale deployment/api.",
      explain: "Scaling changes the desired replica count on the Deployment, and the ReplicaSet controller adds or removes Pods to match. Horizontal scaling like this is the first response to load for stateless workloads, ahead of automating it with a HorizontalPodAutoscaler. The command is quick and idempotent, so it is a common exam task.",
      setup: { namespace: "default", nodes: [{ name: "cp", roles: "control-plane" }, { name: "w1" }], objects: [{ kind: "Deployment", name: "api", namespace: "prod", image: "api:2.0", replicas: 2 }] },
      checks: [
        { label: "The api Deployment now requests 5 replicas", type: "field", kind: "deploy", name: "api", namespace: "prod", path: "spec.replicas", equals: 5 },
        { label: "The Deployment still exists", type: "exists", kind: "deploy", name: "api", namespace: "prod" }
      ],
      solution: ["kubectl scale deployment api --replicas=5 -n prod", "kubectl get deploy -n prod"]
    },
    {
      id: "cka-rollout-image", kind: "kube", d: 2,
      title: "Roll out a new image version",
      prompt: "The `web` Deployment in the `prod` namespace runs `nginx:1.24` and must move to `nginx:1.25`.\n\nUpdate the image of the container `web` to `nginx:1.25`, then watch the rollout with `kubectl rollout status deployment/web -n prod`.",
      hint: "kubectl set image deployment/web web=nginx:1.25 -n prod changes the container image and triggers a rolling update. The part before the = is the container name.",
      explain: "kubectl set image edits the Pod template, which the Deployment rolls out gradually by creating a new ReplicaSet and shifting Pods to it under maxSurge and maxUnavailable. rollout status waits until the update finishes, and rollout undo would revert it. Knowing the container=image syntax and the rollout subcommands is core to the Workloads objective.",
      setup: { namespace: "default", nodes: [{ name: "cp", roles: "control-plane" }, { name: "w1" }], objects: [{ kind: "Deployment", name: "web", namespace: "prod", containers: [{ name: "web", image: "nginx:1.24" }], replicas: 3 }] },
      checks: [
        { label: "The web container now uses nginx:1.25", type: "image", kind: "deploy", name: "web", namespace: "prod", container: "web", image: "nginx:1.25" },
        { label: "The Deployment still exists", type: "exists", kind: "deploy", name: "web", namespace: "prod" }
      ],
      solution: ["kubectl set image deployment/web web=nginx:1.25 -n prod", "kubectl rollout status deployment/web -n prod"]
    },
    {
      id: "cka-taint-node", kind: "kube", d: 2,
      title: "Reserve a node with a taint",
      prompt: "Node `gpu-1` has special hardware and should only run Pods that explicitly tolerate it.\n\nAdd a taint to `gpu-1` with key `dedicated`, value `gpu` and effect `NoSchedule`, then confirm with `kubectl describe node gpu-1`.",
      hint: "kubectl taint nodes gpu-1 dedicated=gpu:NoSchedule. The format is key=value:Effect, and NoSchedule keeps Pods without a matching toleration off the node.",
      explain: "Taints repel Pods from a node unless the Pod carries a matching toleration, which is how you reserve nodes for particular workloads such as GPU jobs. NoSchedule blocks new Pods, PreferNoSchedule is a soft version, and NoExecute also evicts running Pods that do not tolerate the taint. Taints and tolerations are a frequent scheduling task on the exam.",
      setup: { namespace: "default", nodes: [{ name: "cp", roles: "control-plane" }, { name: "gpu-1" }], objects: [] },
      checks: [
        { label: "gpu-1 has the dedicated=gpu:NoSchedule taint", type: "taint", node: "gpu-1", key: "dedicated", effect: "NoSchedule", present: true },
        { label: "gpu-1 is still schedulable for tolerating Pods", type: "nodeSchedulable", node: "gpu-1", schedulable: true }
      ],
      solution: ["kubectl taint nodes gpu-1 dedicated=gpu:NoSchedule", "kubectl describe node gpu-1"]
    },
    {
      id: "cka-expose-svc", kind: "kube", d: 3,
      title: "Expose a Deployment with a Service",
      prompt: "The `frontend` Deployment in the `web` namespace listens on container port 8080 and needs a stable in-cluster address.\n\nExpose it with a ClusterIP Service named `frontend-svc` on port 80 that targets port 8080. Then list Services with `kubectl get svc -n web`.",
      hint: "kubectl expose deployment frontend --port=80 --target-port=8080 --name=frontend-svc -n web. --port is what the Service listens on, --target-port is the container's port.",
      explain: "A Service gives a set of Pods one stable virtual IP and DNS name, load-balancing across the Pods that match its selector, which it copies from the Deployment. ClusterIP is the default type and is reachable only inside the cluster. The --port and --target-port distinction, Service listens versus container listens, is a classic point of confusion the exam probes.",
      setup: { namespace: "default", nodes: [{ name: "cp", roles: "control-plane" }, { name: "w1" }], objects: [{ kind: "Deployment", name: "frontend", namespace: "web", image: "frontend:1.0", replicas: 2, selector: { app: "frontend" }, labels: { app: "frontend" } }] },
      checks: [
        { label: "The frontend-svc Service exists in web", type: "exists", kind: "svc", name: "frontend-svc", namespace: "web" },
        { label: "It is a ClusterIP Service", type: "field", kind: "svc", name: "frontend-svc", namespace: "web", path: "spec.type", equals: "ClusterIP" }
      ],
      solution: ["kubectl expose deployment frontend --port=80 --target-port=8080 --name=frontend-svc -n web", "kubectl get svc -n web"]
    },
    {
      id: "cka-nodeport-svc", kind: "kube", d: 3,
      title: "Create a NodePort Service",
      prompt: "A demo app in the `demo` namespace must be reachable from outside the cluster through a port on every node.\n\nCreate a NodePort Service named `demo-np` on port 80 with target port 80. Then confirm the type with `kubectl get svc -n demo`.",
      hint: "kubectl create service nodeport demo-np --tcp=80:80 -n demo. The --tcp value is port:targetPort.",
      explain: "A NodePort Service opens the same high port (30000 to 32767) on every node and forwards it to the Service, which is the simplest way to reach a workload from outside a cluster that has no cloud load balancer. It builds on ClusterIP, which it still gets internally. Knowing when NodePort fits versus LoadBalancer or Ingress is part of the Services and Networking objective.",
      setup: { namespace: "default", nodes: [{ name: "cp", roles: "control-plane" }, { name: "w1" }], objects: [] },
      checks: [
        { label: "The demo-np Service exists in demo", type: "exists", kind: "svc", name: "demo-np", namespace: "demo" },
        { label: "It is a NodePort Service", type: "field", kind: "svc", name: "demo-np", namespace: "demo", path: "spec.type", equals: "NodePort" }
      ],
      solution: ["kubectl create service nodeport demo-np --tcp=80:80 -n demo", "kubectl get svc -n demo"]
    },
    {
      id: "cka-config-context-ns", kind: "kube", d: 4,
      title: "Set the default namespace for your context",
      prompt: "You will run many commands against the `storage` namespace and do not want to type -n storage every time.\n\nSet the current context's default namespace to `storage`, then confirm your Pods with `kubectl get pods`.",
      hint: "kubectl config set-context --current --namespace=storage changes the namespace on your active context so later commands default to it.",
      explain: "A kubeconfig context ties together a cluster, a user and a default namespace. Setting the namespace on the current context saves typing and avoids running commands in the wrong namespace, a common source of mistakes under exam time pressure. It changes only your local kubeconfig, not anything in the cluster.",
      setup: { namespace: "default", nodes: [{ name: "cp", roles: "control-plane" }], objects: [{ kind: "PersistentVolumeClaim", name: "data", namespace: "storage", status: "Bound", capacity: "5Gi" }] },
      checks: [
        { label: "The current context now defaults to the storage namespace", type: "context", namespace: "storage" },
        { label: "The storage PVC is present in the cluster", type: "exists", kind: "pvc", name: "data", namespace: "storage" }
      ],
      solution: ["kubectl config set-context --current --namespace=storage", "kubectl get pods"]
    },
    {
      id: "cka-fix-cordon", kind: "kube", d: 5,
      title: "Troubleshoot Pods that will not schedule on a node",
      prompt: "Node `worker-1` was cordoned during maintenance and never brought back, so new Pods avoid it. Maintenance is finished.\n\nMake `worker-1` schedulable again, then confirm it no longer shows SchedulingDisabled with `kubectl get nodes`.",
      hint: "kubectl uncordon worker-1 marks the node schedulable again. Check kubectl get nodes first to see the SchedulingDisabled marker.",
      explain: "A cordoned node stays Ready but is marked unschedulable, so the scheduler will not place new Pods on it even though it is healthy. Forgetting to uncordon after maintenance is a frequent cause of Pods stuck Pending or piling onto other nodes. Reading the STATUS column for SchedulingDisabled and running uncordon is a quick troubleshooting win.",
      setup: { namespace: "default", nodes: [{ name: "cp", roles: "control-plane" }, { name: "worker-1", schedulable: false }], objects: [] },
      checks: [
        { label: "worker-1 is schedulable again", type: "nodeSchedulable", node: "worker-1", schedulable: true },
        { label: "The uncordon command was used", type: "ran", includes: "uncordon" }
      ],
      solution: ["kubectl get nodes", "kubectl uncordon worker-1", "kubectl get nodes"]
    }
  ]
});
