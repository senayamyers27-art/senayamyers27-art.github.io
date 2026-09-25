CertHub.addWhys("cka", {
  "cka1": [
    "--data-dir is for etcd itself and for etcdutl restore, not for a live snapshot save; it does nothing about the TLS handshake that is timing out.",
    "etcdctl authenticates with mutual-TLS certificates, not a kubeconfig; --kubeconfig is a kubectl concept that etcdctl does not accept.",
    null,
    "Snapshots are taken online from a running etcd; stopping the API server does not quiet etcd and would take the cluster down for no benefit."
  ],
  "cka2": [
    null,
    "kubectl cannot read a raw etcd data directory; apply expects Kubernetes manifests, not etcd's on-disk database files.",
    "kubelet has no --etcd-dir flag and never talks to etcd; only the etcd static Pod points at the data directory.",
    "kubeadm upgrade apply changes cluster versions; it does not re-read etcd data and would not load the restored state."
  ],
  "cka3": [
    "This upgrades kubelet before running apply, so kubelet would be newer than the control plane, breaking the version skew policy; plan and apply come first.",
    "kubeadm upgrade node is for the other nodes, not the first control plane node, and draining before apply is out of order.",
    "You never drain every node at once, and workers are upgraded after the control plane apply, not before or during it.",
    null
  ],
  "cka4": [
    "kubeadm upgrade apply is run only once, on the first control plane node; repeating it on other nodes is not the documented flow.",
    null,
    "There is no --upgrade flag on kubeadm join; join adds new nodes, it does not upgrade existing ones.",
    "kubeadm init phase is used during initial cluster creation, not for upgrading already-joined nodes."
  ],
  "cka5": [
    "kubeadm allows only one minor version per upgrade, so jumping 1.33 straight to 1.35 is unsupported and is refused.",
    null,
    "Workers must never be newer than the API server, so upgrading them before the control plane breaks the skew policy.",
    "Rebuilding the control plane is unnecessary and risks losing state; the supported path is a normal stepwise kubeadm upgrade."
  ],
  "cka6": [
    "There is no --renew option on kubeadm init phase bootstrap-token, and it does not print a ready-to-use join command.",
    "kubectl create token issues ServiceAccount tokens, which are not bootstrap tokens and cannot authenticate a joining node.",
    "kubeadm certs renew handles certificates, not bootstrap tokens; there is no 'bootstrap' cert or --print-join option.",
    null
  ],
  "cka7": [
    null,
    "ip_forward is a sysctl, not a kernel module, so modprobe cannot set it; the value must be written through sysctl.",
    "--ignore-preflight-errors only hides the check; Pod networking still needs forwarding enabled, so the cluster misbehaves later.",
    "Disabling firewalld does not enable IP forwarding; the sysctl stays 0 and the same preflight error remains."
  ],
  "cka8": [
    "Switching kubelet to cgroupfs is the wrong direction; systemd is the recommended driver on systemd hosts, so fix the runtime instead.",
    "The drivers do not auto-negotiate; leaving them unset does not guarantee they match and can still cause the mismatch.",
    null,
    "Reinstalling containerd resets config to defaults, which still ship SystemdCgroup = false, so the mismatch persists."
  ],
  "cka9": [
    "ip_vs is only needed for kube-proxy IPVS mode, and nf_nat_ftp is unrelated to bridged Pod traffic or containerd.",
    "vxlan and 8021q are overlay/VLAN modules some CNIs use, not the base modules kubeadm requires on every node.",
    "bonding and bridge_ipv6 concern NIC bonding and IPv6 bridging, neither of which is the required containerd/bridge pair.",
    null
  ],
  "cka10": [
    "--apiserver-advertise-address sets this node's own IP, not the shared load-balanced name every kubeconfig should use.",
    "--apiserver-bind-port sets the local port and --node-name the node's name; neither writes the LB endpoint into certs and kubeconfigs.",
    null,
    "--service-dns-domain sets the cluster DNS suffix (such as cluster.local), which has nothing to do with the API endpoint."
  ],
  "cka11": [
    "A token and advertise address let a node join, but without --control-plane --certificate-key it joins as a worker, not a control plane node.",
    null,
    "--upload-certs is an init flag, not a join flag, and skip-ca-verification disables CA checks rather than fetching the shared certs.",
    "There is no --node-role flag on join; --cri-socket only selects the runtime and does not download control-plane certificates."
  ],
  "cka12": [
    null,
    "Zero tolerance is too strict; with 3 members a quorum of 2 remains after one failure, so one node can be lost.",
    "Losing two of three members leaves one, which is below the majority of 2, so etcd can no longer commit writes.",
    "Losing all three obviously stops etcd; three members tolerate only one failure, not three."
  ],
  "cka13": [
    "etcd always persists to disk in both topologies; it never stores cluster state only in the API server's memory.",
    "Both topologies still need a load balancer in front of the multiple API servers; that is not what distinguishes them.",
    null,
    "etcd membership is not one member per worker; both topologies run a small odd number of members for quorum."
  ],
  "cka14": [
    null,
    "CSRs are pending requests for new certificates, not a report of which issued kubeadm certs have expired.",
    "openssl x509 -checkend inspects a single cert file, and /etc/kubernetes is a directory, so it cannot enumerate all certs.",
    "kubeadm token list shows bootstrap tokens, not the control-plane certificates that expired."
  ],
  "cka15": [
    "/var/lib/etcd holds etcd's data, and --data-dir has no manifests subdirectory that kubelet reads.",
    "/etc/kubernetes/pki stores certificates, not Pod manifests; kubelet does not run static Pods from there.",
    "/opt/cni/bin holds CNI plugin binaries and has nothing to do with static Pod manifests.",
    null
  ],
  "cka16": [
    "kubectl create rolebinding has no -A flag; a RoleBinding is confined to one namespace, so it cannot cover future ones.",
    null,
    "This defines a new ClusterRole but creates no binding, so nobody is granted access; the built-in view role already exists anyway.",
    "kubectl auth reconcile applies RBAC objects from files; it does not create a group binding from these flags."
  ],
  "cka17": [
    "A ClusterRoleBinding grants the role in every namespace, which is broader than the payments-only scope requested.",
    null,
    "A Role holds its own rules and cannot reference a ClusterRole; roleRef to a ClusterRole belongs on a binding, not a Role.",
    "ClusterRoleBindings have no namespace field to scope them; metadata.namespace does not limit their cluster-wide effect."
  ],
  "cka18": [
    "list does not depend on watch; the real problem is that nodes are cluster-scoped, so a namespaced Role cannot cover them.",
    "RoleBindings apply to users, groups and ServiceAccounts alike, so the subject type is not the issue.",
    "Nodes are not owned by kube-system; they are cluster-scoped, so a Role in any namespace still would not work.",
    null
  ],
  "cka19": [
    null,
    "A binding grants permissions only after the user can authenticate; it does not approve or sign the pending CSR.",
    "kubeadm certs renew rotates control-plane certificates; it does not sign a user's CSR.",
    "There is no kubectl sign csr command; approval, then the controller-manager signing, is the correct mechanism."
  ],
  "cka20": [
    "kubectl cordon only marks the node unschedulable and has no --evict-all or --force-daemonsets flags; it moves nothing.",
    "Deleting the Node object does not gracefully stop its Pods and is destructive; drain is the safe way to evacuate a node.",
    null,
    "kubectl taint has no --drain flag; a NoSchedule taint stops new Pods but does not evict the running ones."
  ],
  "cka21": [
    "A toleration for the unschedulable taint is unrelated; the message is specifically about a pod disruption budget.",
    "A NoExecute taint would evict Pods, not block the Eviction API; the error names a PodDisruptionBudget.",
    "If kubelet were down you would see different errors; this message means eviction is being held back by a budget.",
    null
  ],
  "cka22": [
    "This scrambles the roles: CRI does not configure DNS, CNI is not the kubelet-to-containerd link, and CSI does not store Secrets.",
    "Wrong across the board: CRI is not the API server's storage, CNI does not handle Ingress, and CSI does not run sandboxes.",
    null,
    "None map correctly: CRI does not sign certs, CNI does not enforce RBAC, and CSI does not load-balance Services."
  ],
  "cka23": [
    "Namespaced vs Cluster scope only changes how the object is addressed; it does not stop a controller, and the object is already listed.",
    null,
    "A ValidatingWebhook can reject writes but is not required to store a custom resource; the object was saved, so admission is fine.",
    "--server-side changes how the apply is merged, not whether a controller reconciles the resource into Pods and Services."
  ],
  "cka24": [
    null,
    "--app-version does not pin the chart version and is not an install flag; --replace reuses a deleted release name rather than being idempotent.",
    "A .tgz is a Helm chart archive, not a manifest, so kubectl apply cannot install it.",
    "Helm 3 removed --name, and there is no --tag flag; the chart version is set with --version."
  ],
  "cka25": [
    "NoExecute would also evict the Pods already running on gpu1, which the requirement forbids.",
    "A label only attracts Pods that request it; it does nothing to keep other Pods off the node.",
    null,
    "cordon has no --selector flag and would block all new Pods, not just keep non-GPU ones off while allowing GPU ones."
  ],
  "cka26": [
    null,
    "There is no kubectl untaint command; taints are removed by appending a minus to the key or effect.",
    ":None is not a valid taint effect; it neither sets nor removes a taint.",
    "There is no kubectl delete taint subcommand with that syntax."
  ],
  "cka27": [
    "A toleration permits but never pins a Pod to a tainted node; it does not force scheduling onto gpu1.",
    "A nodeSelector is not required for the Pod to schedule; the Pod can also run on untainted nodes without it.",
    "The toleration lets the Pod run on gpu1 as well, so it is not restricted to untainted nodes.",
    null
  ],
  "cka28": [
    "required affinity is a hard rule; with no matching node the Pod is not scheduled anywhere, it stays Pending.",
    null,
    "The scheduler matches the disktype=ssd label, not free disk space; a label mismatch leaves the Pod Pending.",
    "The API server accepts the Pod; it is the scheduler that cannot place it, so it waits rather than being rejected."
  ],
  "cka29": [
    "A nodeSelector still requires the scheduler to filter and bind the Pod, so it cannot start while the scheduler is down.",
    null,
    "Tolerations only affect scheduling decisions the scheduler makes; without the scheduler the Pod is never bound.",
    "A Deployment's Pods go through the scheduler like any others, so they remain Pending until it recovers."
  ],
  "cka30": [
    "podAffinity co-locates Pods, and 'preferred' by zone is soft; it does not guarantee at most one per node.",
    "nodeAffinity selects nodes by label, not by the presence of other replicas, so NotIn hostname cannot enforce one-per-node.",
    "A PodDisruptionBudget limits voluntary evictions; it does not influence where replicas are placed.",
    null
  ],
  "cka31": [
    null,
    "DoNotSchedule leaves extra Pods Pending; the API server does not reject them at admission.",
    "DoNotSchedule is a hard constraint, not a preference; ScheduleAnyway would be the soft version.",
    "The scheduler never relocates running Pods to rebalance; spread constraints only affect new placements."
  ],
  "cka32": [
    "kubectl scale sets a fixed replica count and has no --min, --max or --cpu options.",
    "There is no kubectl create hpa command with these flags; autoscale is the correct verb.",
    null,
    "There is no kubectl set autoscale subcommand; that syntax is invalid."
  ],
  "cka33": [
    "An HPA reads the Metrics API regardless of namespace; it does not need to live in kube-system.",
    "The Deployment strategy does not prevent HPA scaling, and <unknown> points to a metrics/requests problem, not the strategy.",
    "If maxReplicas were the limit you would see it capped at max, not a <unknown> utilization reading.",
    null
  ],
  "cka34": [
    "By default a higher-priority Pod does not simply wait; it can preempt lower-priority Pods to make room.",
    "Adding nodes is the Cluster Autoscaler's job, a separate component; the scheduler itself preempts instead.",
    null,
    "The Pod is not rejected at admission; it is accepted and the scheduler preempts to fit it."
  ],
  "cka35": [
    "A nodeSelector for the control-plane label would pull the DaemonSet off the workers; DaemonSets already target all nodes.",
    null,
    "spec.nodeName pins a Pod to one node and is not how DaemonSets place Pods; it would not add a tolerated Pod to the control plane.",
    "hostNetwork changes the Pod's networking, not whether it tolerates the control-plane taint."
  ],
  "cka36": [
    null,
    "Deleting a Pod does not change the Deployment's replica count; it stays at 3 and no new revision is recorded.",
    "No manual rollout restart is needed; the ReplicaSet controller replaces the missing Pod automatically.",
    "kubelet restarts containers within a Pod, but a deleted Pod object is recreated by the ReplicaSet, with a new name."
  ],
  "cka37": [
    "rollout undo reverts to a previous Pod template; it would not pick up the new Secret and could roll back other changes.",
    "Replacing the Secret does not restart Pods that read it as env vars at startup; the running containers keep the old value.",
    null,
    "Annotating the Secret changes its metadata but does not restart the Pods, so env vars are not re-read."
  ],
  "cka38": [
    null,
    "Once immutable is true, the immutable field itself cannot be flipped back, so kubectl edit rejects the change.",
    "kubectl patch cannot bypass immutability; the API server rejects any data change on an immutable object.",
    "Server-side apply still honours the immutable constraint; it does not skip the check."
  ],
  "cka39": [
    "The model gives each Pod its own IP; Pods are not distinguished by port on a shared node IP.",
    "Pods can reach each other directly by Pod IP; Services are a convenience on top, not a requirement.",
    "Pod-to-Pod traffic across nodes is NAT-free by design; that is a core requirement of the network model.",
    null
  ],
  "cka40": [
    "A healthy ClusterIP does not answer ping; the Service still works for its declared ports even though ICMP gets no reply.",
    null,
    "No NetworkPolicy is implied; a ClusterIP simply has no interface to answer ICMP, so ping never works regardless of policy.",
    "The address is used directly as an IP, so DNS is not involved; CoreDNS being down would not affect this ping."
  ],
  "cka41": [
    "Assigning Pod IPs from the Pod CIDR is the CNI plugin's job, not kube-proxy's.",
    null,
    "Answering Service-name DNS queries is CoreDNS's role; kube-proxy does not serve DNS.",
    "kube-proxy does not proxy kubectl or kubelet API traffic; components reach the API server directly."
  ],
  "cka42": [
    "An Ingress routes HTTP to Services; it does not allocate the external IP a LoadBalancer Service is waiting for.",
    "externalTrafficPolicy only affects source-IP handling and node routing; it does not make an IP get assigned.",
    "The kube-proxy mode does not control external IP allocation for LoadBalancer Services.",
    null
  ],
  "cka43": [
    null,
    "nodePort is independent of targetPort; they do not need to match.",
    "Port 8080 is not reserved for the API server; the problem is only that it falls outside the node-port range.",
    "NodePort and LoadBalancer Services both set nodePort; the restriction is the allowed range, not the Service type."
  ],
  "cka44": [
    "A Service spec has no .spec.endpoints field, so this jsonpath returns nothing.",
    "Pods are not auto-labelled service=web, and describe pods does not list a Service's endpoints.",
    null,
    "There is no ep-slices resource name or web.shop syntax; the resource is endpointslices with a service-name label."
  ],
  "cka45": [
    "sessionAffinity: ClientIP pins a client to a Pod but does not preserve the client's source IP for the Pods to see.",
    "internalTrafficPolicy affects in-cluster routing, not external client-IP preservation; Cluster mode actually SNATs and hides it.",
    "Switching to ClusterIP with externalIPs changes exposure entirely and does not preserve source IP as asked.",
    null
  ],
  "cka46": [
    "GatewayClass names the controller implementation; it does not define the actual listeners (ports, TLS, hostnames).",
    "HTTPRoutes are attached by app teams and define routing rules, not the listeners; they reference a Gateway via parentRefs.",
    null,
    "IngressClass belongs to the older Ingress API, not the Gateway API's listener resource."
  ],
  "cka47": [
    "Naming the Gateway's namespace in parentRefs does not override allowedRoutes; from: Same still restricts attachment to infra.",
    null,
    "Rejected routes carry no traffic; the route does not silently redirect to a Service in infra.",
    "Gateways do not copy routes across namespaces; the route simply is not accepted."
  ],
  "cka48": [
    null,
    "A 9:1 replica ratio only approximates a split by Pod count and does not give an exact 90/10 weighting.",
    "There is no canary annotation on a Gateway listener in the Gateway API; weighting lives on backendRefs.",
    "GatewayClass parameters configure the implementation, not per-route traffic splits."
  ],
  "cka49": [
    "HTTPRoute is not in networking.k8s.io and is not toggled on the API server; it comes from separately installed CRDs.",
    "An IngressClass is for the Ingress API; it has nothing to do with the missing HTTPRoute kind.",
    null,
    "ingress-nginx serves Ingress resources; even installing it would not register the HTTPRoute CRD, which must be applied first."
  ],
  "cka50": [
    null,
    "defaultBackend handles unmatched requests within a controller; it does not choose which controller an unclassed Ingress uses.",
    "Deleting the traefik class is unnecessary and disruptive; marking an IngressClass default is the intended mechanism.",
    "There is no such namespace label for selecting an ingress controller; the default IngressClass annotation is what applies."
  ],
  "cka51": [
    "Editing every Pod's resolv.conf via dnsConfig is unmanageable and would not centrally route just the corp.example zone.",
    "An ExternalName Service aliases one name to another; it does not forward a whole zone to a specific DNS server.",
    "Changing clusterDNS would send all lookups, including cluster-internal names, to the corporate server, breaking DNS.",
    null
  ],
  "cka52": [
    "The node's resolv.conf is used only with dnsPolicy Default; with ClusterFirst kubelet writes the cluster DNS address instead.",
    null,
    "CNI plugins do not run per-node DNS servers or write this address; DNS is served by CoreDNS behind the kube-dns Service.",
    "The address is the stable kube-dns Service ClusterIP, not a CoreDNS Pod IP, and the scheduler does not write resolv.conf."
  ],
  "cka53": [
    "dnsPolicy Default uses the node's DNS, which is exactly the behaviour that loses cluster Service resolution.",
    null,
    "Removing the search line does not restore cluster DNS; the Pod still points at the node's resolver.",
    "hostAliases adds static /etc/hosts entries; it cannot resolve arbitrary Service names."
  ],
  "cka54": [
    "The name label only exists if someone added it; here no custom labels were set, so this selector matches nothing.",
    "podSelector selects Pods, not namespaces, and there is no namespace label on Pods to match this way.",
    "NetworkPolicy has no matchNames field; namespace selection uses matchLabels.",
    null
  ],
  "cka55": [
    null,
    "The except clause removes 10.20.5.0/24 from the allowed range; it does not grant all traffic to it.",
    "The rule allows the whole /16 minus the except range, not only the /24, and only on TCP 5432.",
    "The ports list restricts the rule to TCP 5432; it does not allow everything except that port."
  ],
  "cka56": [
    "externalTrafficPolicy controls node-level routing and source IP, not stickiness of a client to a Pod.",
    "publishNotReadyAddresses exposes not-yet-ready Pods in endpoints; it does not pin clients to a Pod.",
    null,
    "ipFamilyPolicy selects IPv4/IPv6 behaviour and has nothing to do with session stickiness."
  ],
  "cka57": [
    "Retain PVs are not rebound by name alone; the stale claimRef must be cleared regardless of the new PVC's name or namespace.",
    "A PV does not need a StorageClass to bind again; the blocker is the leftover claimRef, not a missing class.",
    "Retain does not scrub data, so there is no kubelet cleanup delay; the PV stays Released until an admin acts.",
    null
  ],
  "cka58": [
    "With the default Delete policy the PV and its storage are removed, not left Released; Released is the Retain behaviour.",
    "Recycle is deprecated and not the default; dynamically provisioned volumes default to Delete.",
    null,
    "The PV does not stay Bound after the PVC is deleted; deletion triggers the reclaim policy."
  ],
  "cka59": [
    "The 'waiting for first consumer' message is expected behaviour, not a broken provisioner; binding is simply deferred.",
    null,
    "An access-mode mismatch gives a different error; this message specifically means WaitForFirstConsumer is delaying binding.",
    "A ResourceQuota block would report a quota error, not the first-consumer message."
  ],
  "cka60": [
    null,
    "volumeBindingMode changes when binding happens, not whether a class is picked when the PVC names none.",
    "Labelling namespaces does not select a default StorageClass; the is-default-class annotation does.",
    "The name 'default' has no special meaning; the default class is chosen by the annotation."
  ],
  "cka61": [
    "Editing the PV capacity directly is not how expansion works; the request is made on the PVC and the PV follows.",
    "Changing StorageClass parameters and recreating the PVC would lose the data; expansion is done in place on the PVC.",
    null,
    "sizeLimit applies to ephemeral volumes like emptyDir, not to expanding a PVC."
  ],
  "cka62": [
    null,
    "ReadWriteMany is not required for static binding; both objects already share ReadWriteOnce, so access modes are fine.",
    "storageClassName: manual with no provisioner is used precisely for static PVs; it does not require dynamic provisioning.",
    "spec.volumeName is optional; the bind fails because capacity is too small, not because the PV is unnamed."
  ],
  "cka63": [
    "ReadWriteOnce limits mounting to one node, but multiple Pods on that node can still write, which the requirement forbids.",
    "ReadOnlyMany is read-only and allows many mounters, so it cannot give a single writer.",
    "ReadWriteMany allows many nodes to write concurrently, the opposite of a single-Pod writer.",
    null
  ],
  "cka64": [
    "Core Kubernetes has no dynamic provisioner for local volumes, so a StorageClass is optional and does not satisfy the requirement.",
    null,
    "The hostPath type is a different volume kind; a local PV specifically requires nodeAffinity, which the API server demands.",
    "Access mode is unrelated to the rejection; local PVs need nodeAffinity to pin them to their node."
  ],
  "cka65": [
    "PVCs are retained on scale-down by default, so they are not deleted along with the Pods.",
    null,
    "PVCs are not resized to zero or marked Released on scale-down; they simply remain for reuse.",
    "Each PVC stays tied to its ordinal (data-db-1, data-db-2); they are not reattached to db-0."
  ],
  "cka66": [
    "kubelet is a systemd service, not a Pod, so kubectl logs cannot fetch its logs; use journalctl -u kubelet.",
    "Resetting and rejoining destroys the node before you know the cause; it is a last resort, not a first step.",
    "Pruning images and rebooting wipes evidence and may not fix the underlying kubelet issue.",
    null
  ],
  "cka67": [
    null,
    "kubeadm upgrade apply runs on a control plane node, not a worker, and does not fix a mis-named kubelet config file.",
    "Deleting the Node object does not create the missing config file; kubelet still cannot load its config.",
    "containerd does not write kubelet's config file, so restarting it does not resolve the missing-file error."
  ],
  "cka68": [
    "On kubeadm the API server is a static Pod, not a systemd unit, so systemctl status kube-apiserver finds nothing.",
    "kubectl needs the very API server that is down, so it cannot report the container's state.",
    null,
    "kubeadm uses containerd, not Docker Swarm, so docker service ls is not applicable."
  ],
  "cka69": [
    "kubectl describe needs the API server, which is down, and with no container created there is no Pod status to describe.",
    "There is no /var/log/kube-apiserver.log; a static Pod that never started writes no container log.",
    "kubectl get events also depends on the API server being up, so it cannot help here.",
    null
  ],
  "cka70": [
    "kube-proxy handles Service routing; it does not place Pods, so it would not cause Pending Pods with no events.",
    "CoreDNS resolves names and is unrelated to Pod scheduling and FailedScheduling events.",
    null,
    "A CNI problem shows up as ContainerCreating/network errors after scheduling, not as Pending with no events."
  ],
  "cka71": [
    "A scheduler outage leaves created Pods Pending; here no Pod objects exist at all, so the controllers are the suspect.",
    null,
    "If etcd were down the API server would fail broadly, not silently fail to create Pods for one Deployment.",
    "kubelet runs Pods once they exist; it does not create Pod objects from a Deployment's desired count."
  ],
  "cka72": [
    null,
    "Removing the control-plane taint would allow workloads onto the control plane, which the requirement forbids.",
    "Adding a toleration also lets the Pod run on the control plane, again violating the constraint.",
    "Scheduling uses requests, not limits, so raising the limit does not help the Pod fit on a worker."
  ],
  "cka73": [
    "A Pod spec has no .spec.cpu field to sort on, so this command cannot order Pods by CPU usage.",
    "describe nodes | grep cpu shows node capacity text, not per-Pod live CPU usage.",
    null,
    "kubectl top nodes reports per-node totals, not the individual Pod using the most CPU."
  ],
  "cka74": [
    null,
    "kubectl top node shows actual live usage, not the CPU/memory reserved by Pod requests.",
    "get node -o wide shows addresses and versions, not the sum of requested resources.",
    "Listing Pods on the node does not aggregate their requests against allocatable capacity."
  ],
  "cka75": [
    "--previous shows the prior container's stdout/stderr, not a file the app writes, so the log stream is still empty.",
    "Mounting /var/log/pods into the container does not redirect the app's file logs into the runtime's stdout capture.",
    "terminationMessagePath is only read on container exit for a termination message; it does not stream ongoing logs.",
    null
  ],
  "cka76": [
    "kubectl needs the API server, which is down, so kubectl logs cannot reach the etcd container.",
    null,
    "kubeadm's etcd runs as a static Pod, not a systemd unit, so journalctl -u etcd has nothing to show.",
    "etcdctl has no logs subcommand; it queries the datastore, it does not fetch container logs."
  ],
  "cka77": [
    "kubectl describe events is not a valid command form, and there is no --all --type filter like this.",
    null,
    "Events are API objects, not a log stream, so kubectl logs events does not exist.",
    "There is no --warnings-only flag; filtering is done with --field-selector type=Warning."
  ],
  "cka78": [
    "kube-proxy handles Service routing and is unrelated to the CRI socket connection failure.",
    "CoreDNS is a DNS service; it does not explain kubelet being unable to reach the container runtime.",
    "The bootstrap token is only used when a node first joins; it does not affect a running node's CRI connection.",
    null
  ],
  "cka79": [
    null,
    "An image-pull failure shows ImagePullBackOff, not a NotReady node caused by missing Pod networking.",
    "kubeadm starts kube-proxy itself, so it is not the missing piece right after init.",
    "A missing admin.conf would stop kubectl entirely, not leave the node NotReady while the API server is healthy."
  ],
  "cka80": [
    "Service selectors affect endpoint membership, not sandbox network setup; the Pods are already scheduled to the node.",
    "A ResourceQuota would block admission earlier; here the Pods reached the node and fail at network setup.",
    null,
    "The scheduler lease affects placement, but these Pods are already placed and failing on CNI networking."
  ],
  "cka81": [
    "A default-deny NetworkPolicy would also block same-node traffic, but here same-node works, so a policy is not the cause.",
    "CoreDNS problems affect name resolution, not raw cross-node Pod-to-Pod IP connectivity.",
    "The Service type does not determine whether cross-node traffic works; the pattern points at the node-to-node CNI path.",
    null
  ],
  "cka82": [
    "Removing the loop plugin hides the detection but leaves the actual forwarding loop, so DNS stays broken.",
    "Scaling to one replica does not stop CoreDNS from forwarding to 127.0.0.53 and looping back to itself.",
    null,
    "dnsPolicy on the CoreDNS Deployment does not change the upstream resolv.conf that causes the loop."
  ],
  "cka83": [
    "The CoreDNS image has no shell or dig binary, so this exec fails and it cleans nothing up.",
    null,
    "kubectl debug node uses the host's DNS by default, not the cluster DNS path a normal Pod would use.",
    "There is no /api/v1/dns endpoint; the API server does not resolve names this way."
  ],
  "cka84": [
    null,
    "EndpointSlices are shared cluster-wide, so they cannot explain a failure isolated to one node's Pods.",
    "The Pods reach Pod IPs fine, so CoreDNS is not the issue; only ClusterIP (kube-proxy) access is broken on that node.",
    "The Ingress controller is not involved in in-cluster ClusterIP access from Pods on a specific node."
  ],
  "cka85": [
    "--service-cluster-ip-range sets the VIP range and does not affect whether Pods appear as ready endpoints.",
    "Swap and cgroup driver relate to kubelet startup, not to a Ready Pod being excluded from endpoints.",
    null,
    "Changing the Service type does not make unready Pods become endpoints; readiness is the deciding factor."
  ],
  "cka86": [
    null,
    "Removing the disk-pressure taint by hand does not free space; kubelet re-applies it until disk usage drops.",
    "Restarting the scheduler does not clear a node condition set by kubelet's eviction thresholds.",
    "Tolerating disk-pressure lets Pods schedule onto a full node, worsening the problem rather than fixing the cause."
  ],
  "cka87": [
    "rollout restart cannot proceed while the old Pod is stuck Terminating on a dead node; the replica still cannot be recreated.",
    "cordon only stops new scheduling; with kubelet gone it never confirms the Pod stopped, so waiting does not help.",
    "Scaling to zero and back does not clear a Pod stuck Terminating on an unreachable node; force deletion is needed.",
    null
  ],
  "cka88": [
    ".spec.podCIDR is the Pod IP range for the node, not the node's own InternalIP address.",
    null,
    "grep -i externalip returns the external address (often empty on-prem), not the InternalIP requested.",
    "There is no .spec.internalIP field; node addresses live under status.addresses."
  ],
  "cka89": [
    "There is no --context-list flag and no kubectl login command for switching contexts.",
    null,
    "There is no kubectl get clusters or set cluster command for changing the active target.",
    "kubeadm config manages cluster configuration, not kubectl contexts, and has no use command."
  ],
  "cka90": [
    "componentstatuses is deprecated and needs a working API server, which is the thing failing to reach etcd.",
    "etcd requires client TLS, so a plain HTTP curl to /healthz is refused and does not report health.",
    "kubeadm's etcd is a static Pod, not a systemd unit, so systemctl status etcd shows nothing.",
    null
  ],
  "cka91": [
    null,
    "Deleting kube-root-ca.crt concerns the cluster CA bundle, not kubelet serving certs with missing IP SANs.",
    "kubeadm certs renew rotates control-plane certs, not the kind kubelet serving certificates causing this scrape error.",
    "The read-only port 10255 is deprecated and disabled by default; metrics-server does not scrape it."
  ]
});
