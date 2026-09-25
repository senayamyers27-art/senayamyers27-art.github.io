/* Lessons for Certified Kubernetes Administrator (CKA (Kubernetes v1.35 curriculum)): one per plan topic, matched by exact topic text.
   How to write and check them: docs/LESSON_GUIDE.md */
CertHub.addLessons("cka", [
 {
  "t": "Control plane and node components: kube-apiserver, etcd, kube-scheduler, kube-controller-manager, kubelet, kube-proxy, container runtime",
  "body": [
   "A Kubernetes cluster is split into two roles. The control plane stores the desired state of everything in the cluster and makes decisions about it. The worker nodes actually run your containers. Almost every CKA troubleshooting task comes down to knowing which component owns which job, so it is worth learning this map before anything else.",
   "The kube-apiserver is the front door. Every client, from `kubectl` to the scheduler to the kubelet on each node, talks to the cluster only through the API server over HTTPS (on a kubeadm cluster, port 6443). The API server authenticates the caller, checks authorization (usually RBAC, role-based access control), runs admission controllers that can reject or modify a request, and then persists the object. It is the only component that talks to etcd directly.",
   "etcd is a distributed, strongly consistent key-value store that holds all cluster state: every Pod, Service, Secret and ConfigMap. If etcd is lost and you have no backup, the cluster's configuration is gone even if the containers keep running for a while. That is why etcd backup is its own exam objective. etcd serves clients on port 2379 and talks to its peers on 2380.",
   "The kube-scheduler watches for Pods that have no node assigned. For each one it filters out nodes that cannot run it (not enough CPU, a taint the Pod does not tolerate, an affinity rule that does not match) and then scores the rest, finally writing the chosen node name into the Pod's `spec.nodeName`. The scheduler does not start containers; it only makes the placement decision.",
   "The kube-controller-manager runs many control loops in one process: the ReplicaSet controller, Deployment controller, Node controller, Job controller, EndpointSlice controller, ServiceAccount controller and others. Each loop compares desired state with actual state and acts to close the gap. If this component is down, new Pods are not created for Deployments, but existing Pods keep running.",
   "On every node, the kubelet is the agent that makes the node's share of desired state real. It watches the API server for Pods bound to its node, asks the container runtime to pull images and start containers, runs probes and reports Pod and node status back. The kubelet is a systemd service, not a Pod, so you inspect it with `systemctl status kubelet` and `journalctl -u kubelet`. The container runtime (containerd or CRI-O) does the low-level work of creating containers, and the kubelet talks to it over the Container Runtime Interface (CRI).",
   "kube-proxy runs on each node (usually as a DaemonSet) and programs packet-forwarding rules so that traffic sent to a Service's virtual IP reaches one of the Service's backing Pods. On a kubeadm cluster, the API server, etcd, scheduler and controller-manager run as static Pods in the `kube-system` namespace, which you can see with `kubectl get pods -n kube-system`."
  ],
  "terms": [
   [
    "kube-apiserver",
    "The central REST API for the cluster; the only component that reads and writes etcd, and the one every other component talks to."
   ],
   [
    "etcd",
    "A consistent, distributed key-value store holding all cluster state."
   ],
   [
    "kube-scheduler",
    "Assigns unscheduled Pods to nodes by filtering and scoring candidate nodes."
   ],
   [
    "kube-controller-manager",
    "A single binary running many reconciliation loops such as the ReplicaSet, Node and Job controllers."
   ],
   [
    "kubelet",
    "The node agent, run by systemd, that starts Pods via the container runtime and reports status."
   ],
   [
    "kube-proxy",
    "The per-node component that programs Service virtual IP forwarding rules."
   ]
  ],
  "example": "A learner scales a Deployment from 2 to 5 replicas and nothing happens: the ReplicaSet still shows 2. `kubectl get pods -n kube-system` shows the kube-controller-manager Pod in CrashLoopBackOff because of a typo in its static Pod manifest. Fixing the manifest brings the controller back and the three new Pods appear within seconds.",
  "tip": "Match the symptom to the component: Pods stuck Pending with no events points to the scheduler; replicas not being created points to the controller-manager; kubectl refused on 6443 points to the API server; a single node NotReady points to its kubelet or runtime.",
  "check": [
   [
    "Which component is the only one that talks directly to etcd?",
    "The kube-apiserver. All other components read and write cluster state through the API server."
   ],
   [
    "Why can't you see the kubelet with `kubectl get pods -n kube-system`?",
    "The kubelet runs as a systemd service on the host, not as a Pod, so you check it with systemctl and journalctl."
   ],
   [
    "If the scheduler is stopped, what happens to a newly created Deployment's Pods?",
    "The ReplicaSet controller still creates the Pod objects, but they stay Pending because nothing assigns them a node."
   ]
  ]
 },
 {
  "t": "Preparing hosts for kubeadm: containerd, matching systemd cgroup driver, swap, overlay and br_netfilter modules, ip_forward and bridge sysctls, required ports",
  "body": [
   "kubeadm bootstraps a cluster, but it assumes each host is already prepared: a container runtime installed, the kernel configured for container networking, and the kubelet able to manage resources. Its preflight checks will stop you if some of these are wrong, and the CKA can ask you to fix a host that fails them.",
   "Start with the container runtime. containerd is the most common choice. Install it, generate a default config with `containerd config default > /etc/containerd/config.toml`, and make sure the runc runtime options set `SystemdCgroup = true`. On systemd-based distributions the kubelet uses the `systemd` cgroup driver by default when configured by kubeadm, and the runtime must use the same driver. If the kubelet and the runtime disagree on the cgroup driver, Pods and even the node can become unstable. Restart containerd after editing the file.",
   "Next, swap. Historically the kubelet refused to start with swap enabled, and the standard preparation step is still to disable it: `swapoff -a` for the running system and comment out swap lines in `/etc/fstab` so it stays off after a reboot. Newer Kubernetes releases have added configurable swap support, but unless a task tells you otherwise, disabling swap is the safe expectation.",
   "Container networking needs two kernel modules. `overlay` supports the overlay filesystem that container images use, and `br_netfilter` makes bridged traffic visible to iptables. Load them now with `modprobe` and persist them in a file under `/etc/modules-load.d/`. Then set sysctls so the kernel forwards packets and passes bridged traffic through iptables.",
   "```bash\ncat <<EOF | sudo tee /etc/modules-load.d/k8s.conf\noverlay\nbr_netfilter\nEOF\nsudo modprobe overlay && sudo modprobe br_netfilter\ncat <<EOF | sudo tee /etc/sysctl.d/k8s.conf\nnet.ipv4.ip_forward = 1\nnet.bridge.bridge-nf-call-iptables = 1\nnet.bridge.bridge-nf-call-ip6tables = 1\nEOF\nsudo sysctl --system\n```",
   "Finally, ports. Control plane nodes need 6443 (API server), 2379 and 2380 (etcd client and peer), 10250 (kubelet API), 10257 (controller-manager) and 10259 (scheduler) reachable as appropriate. Worker nodes need 10250 plus the NodePort range, 30000 to 32767 by default. Your CNI plugin may need its own ports as well. Install kubeadm, kubelet and kubectl at matching versions from the Kubernetes package repository and hold them so routine updates do not upgrade them by surprise (for example `apt-mark hold kubelet kubeadm kubectl`)."
  ],
  "terms": [
   [
    "cgroup driver",
    "How the kubelet and runtime create control groups; both must use the same one, normally systemd."
   ],
   [
    "br_netfilter",
    "A kernel module that lets iptables see traffic crossing a Linux bridge."
   ],
   [
    "net.ipv4.ip_forward",
    "The sysctl that allows the kernel to route packets between interfaces, required for Pod traffic."
   ],
   [
    "Preflight checks",
    "Tests kubeadm runs before init or join to catch host misconfiguration."
   ]
  ],
  "example": "`kubeadm init` fails preflight with a message that `/proc/sys/net/ipv4/ip_forward` contents are not set to 1. You add `net.ipv4.ip_forward = 1` to `/etc/sysctl.d/k8s.conf`, run `sysctl --system`, and rerun init, which now passes.",
  "tip": "A cgroup driver mismatch does not always stop the install; it shows up later as flapping Pods or kubelet errors. Check `SystemdCgroup = true` in the containerd config and restart containerd whenever you touch it.",
  "check": [
   [
    "Which two kernel modules are loaded when preparing a kubeadm host, and why?",
    "overlay for the container image filesystem and br_netfilter so bridged Pod traffic passes through iptables."
   ],
   [
    "Where do you persist sysctl settings so they survive a reboot?",
    "In a file under /etc/sysctl.d/, applied with `sysctl --system`."
   ],
   [
    "What is the default NodePort range that must be open on nodes?",
    "30000 to 32767."
   ]
  ]
 },
 {
  "t": "kubeadm init (pod network CIDR, control-plane endpoint), installing a CNI plugin, kubeadm join and bootstrap tokens",
  "body": [
   "Once hosts are prepared, `kubeadm init` turns the first machine into a control plane node. It generates a certificate authority and certificates, writes kubeconfig files, creates static Pod manifests for the API server, etcd, scheduler and controller-manager, starts them through the kubelet, and installs CoreDNS and kube-proxy.",
   "Two flags matter most. `--pod-network-cidr` tells the cluster which address range Pods will use, and it must match what your CNI plugin is configured to use and must not overlap your node or Service networks. For example, Flannel's default manifest expects `10.244.0.0/16`. `--control-plane-endpoint` sets a stable DNS name or IP for the API server, usually a load balancer address. You must set it at init time if you ever want to add more control plane nodes, because it is baked into certificates and kubeconfig files.",
   "```bash\nsudo kubeadm init --pod-network-cidr=10.244.0.0/16 \\\n  --control-plane-endpoint=k8s-api.lab.local:6443\nmkdir -p $HOME/.kube\nsudo cp /etc/kubernetes/admin.conf $HOME/.kube/config\nsudo chown $(id -u):$(id -g) $HOME/.kube/config\n```",
   "After init, `kubectl get nodes` shows the node as NotReady and the CoreDNS Pods stay Pending. That is expected: there is no Pod network yet. Install a CNI (Container Network Interface) plugin such as Calico, Cilium or Flannel, typically by applying its manifest or installing its operator. When the CNI Pods are running and write their config into `/etc/cni/net.d/`, the node becomes Ready and CoreDNS starts.",
   "Worker nodes join with `kubeadm join`, using the command init printed at the end. It contains the endpoint, a bootstrap token and a `--discovery-token-ca-cert-hash`. The token lets the new kubelet authenticate just long enough to request its own client certificate; the CA hash lets the joining node verify it is talking to the real control plane and not an impostor.",
   "Bootstrap tokens expire, by default after 24 hours. If you need to add a node later, create a fresh token and full command with `kubeadm token create --print-join-command`. `kubeadm token list` shows existing tokens and their expiry. To join an additional control plane node you add `--control-plane` and a `--certificate-key`, covered in the high-availability lesson."
  ],
  "terms": [
   [
    "--pod-network-cidr",
    "The IP range reserved for Pod addresses, which the CNI plugin allocates from."
   ],
   [
    "--control-plane-endpoint",
    "A shared, stable address for the API server, required for later HA expansion."
   ],
   [
    "Bootstrap token",
    "A short-lived token that lets a joining node authenticate to request its kubelet certificate."
   ],
   [
    "discovery-token-ca-cert-hash",
    "A hash of the cluster CA public key that the joining node uses to verify the control plane."
   ]
  ],
  "example": "Three days after building a lab cluster you add a third worker, but the saved join command fails with an authentication error. Running `kubeadm token create --print-join-command` on the control plane gives a new command with a valid token, and the node joins.",
  "tip": "Nodes NotReady and CoreDNS Pending immediately after init almost always mean no CNI plugin is installed yet, not a broken cluster.",
  "check": [
   [
    "Why must --control-plane-endpoint be set at init time for a future HA cluster?",
    "It is written into certificates and kubeconfigs; changing it later means regenerating them."
   ],
   [
    "How do you get a working join command when the original token has expired?",
    "Run `kubeadm token create --print-join-command` on a control plane node."
   ]
  ]
 },
 {
  "t": "Static Pods and /etc/kubernetes/manifests; kubeadm certificates (check-expiration, renew) and kubeconfig files",
  "body": [
   "A static Pod is a Pod the kubelet runs directly from a manifest file on disk, without the API server or scheduler being involved. The kubelet watches a directory, `/etc/kubernetes/manifests` on kubeadm clusters (set by `staticPodPath` in the kubelet config at `/var/lib/kubelet/config.yaml`). Put a Pod YAML file there and the kubelet starts it; delete the file and the kubelet stops it.",
   "kubeadm uses this to run the control plane itself: `etcd.yaml`, `kube-apiserver.yaml`, `kube-controller-manager.yaml` and `kube-scheduler.yaml` live in that directory. This solves a chicken-and-egg problem, because the API server cannot schedule itself. The kubelet also creates a read-only mirror Pod in the API so you can see static Pods with kubectl; their names end with the node name, like `kube-apiserver-cp1`. Deleting the mirror Pod with kubectl does nothing lasting, and editing it has no effect. To change a control plane component, edit the file on the node; the kubelet notices and recreates the Pod.",
   "kubeadm also builds a private PKI (public key infrastructure) under `/etc/kubernetes/pki`: the cluster CA, the API server serving certificate, the API server's client certificates for talking to the kubelet and etcd, the front-proxy CA, and a separate etcd CA under `pki/etcd`. Client certificates that kubeadm generates are valid for one year by default, while the CAs last much longer.",
   "Check expiry with `kubeadm certs check-expiration`. Renew with `kubeadm certs renew all` (or a single one, such as `kubeadm certs renew apiserver`). After renewing, the control plane static Pods must restart to load the new files; a common approach is to move the manifests out of the directory briefly (about 20 seconds, so the kubelet notices) and then back. Restarting the kubelet alone does not restart the running containers. kubeadm also renews certificates automatically during `kubeadm upgrade apply`, which is one reason clusters upgraded regularly rarely hit expiry.",
   "Kubeconfig files tie it together. A kubeconfig holds clusters (server URL and CA), users (credentials such as a client certificate) and contexts (a cluster plus a user plus an optional namespace). kubeadm writes `admin.conf`, `super-admin.conf` in recent versions, `controller-manager.conf`, `scheduler.conf` and `kubelet.conf` in `/etc/kubernetes`. Most of these embed client certificates, so they are also renewed by `kubeadm certs renew`; `kubelet.conf` is the exception, because it points to the kubelet's own client certificate, which the kubelet rotates automatically. Your own `~/.kube/config` is usually a copy of admin.conf, so after renewing you may need to copy it again."
  ],
  "terms": [
   [
    "Static Pod",
    "A Pod managed directly by a kubelet from a file in its staticPodPath, not by the API server."
   ],
   [
    "Mirror Pod",
    "The read-only API object the kubelet creates so a static Pod is visible to kubectl."
   ],
   [
    "kubeadm certs check-expiration",
    "Lists each kubeadm-managed certificate and when it expires."
   ],
   [
    "Kubeconfig context",
    "A named combination of a cluster, a user and a default namespace."
   ]
  ],
  "example": "A task asks you to run an nginx Pod on node01 that survives even if the API server is down. You SSH to node01, confirm `staticPodPath` in `/var/lib/kubelet/config.yaml`, write a Pod manifest into that directory, and `kubectl get pods` shows `nginx-node01` a few seconds later.",
  "tip": "To change a control plane flag, edit the manifest in /etc/kubernetes/manifests on that node, never the mirror Pod through kubectl. Keep a backup copy of the manifest outside that directory, because every YAML file inside it is treated as a Pod.",
  "check": [
   [
    "How do you find which directory a kubelet reads static Pods from?",
    "Look at `staticPodPath` in the kubelet config file, usually /var/lib/kubelet/config.yaml."
   ],
   [
    "What default lifetime do kubeadm-issued client certificates have, and how do you renew them?",
    "One year; run `kubeadm certs renew all` and restart the control plane components."
   ],
   [
    "What happens if you `kubectl delete` a static Pod's mirror Pod?",
    "The kubelet recreates the mirror Pod because the manifest file is still on disk."
   ]
  ]
 },
 {
  "t": "Cluster upgrades with kubeadm: one minor version at a time, upgrade plan/apply/node, drain, kubelet upgrade, uncordon, version skew",
  "body": [
   "Kubernetes releases a new minor version (1.x) regularly, and kubeadm supports upgrading only one minor version at a time. To go from 1.33 to 1.35 you upgrade to 1.34 first. Patch versions within a minor can be skipped. The exam frequently gives you a cluster one minor behind and asks you to upgrade the control plane and a worker.",
   "Version skew rules explain the order. The kubelet must never be newer than the API server, and it may lag it by a few minor versions. kubectl should be within one minor version of the API server. So you always upgrade the control plane first, then the nodes.",
   "On the first control plane node, upgrade the kubeadm package to the exact target version, then check the plan and apply it. `kubeadm upgrade plan` verifies the cluster can be upgraded and shows available versions. `kubeadm upgrade apply v1.X.Y` upgrades the static Pod manifests, CoreDNS and kube-proxy, and renews certificates. On additional control plane nodes you run `kubeadm upgrade node` instead of apply.",
   "```bash\n# control plane (Debian/Ubuntu, adjust version)\nsudo apt-mark unhold kubeadm && sudo apt-get install -y kubeadm='1.X.Y-*' && sudo apt-mark hold kubeadm\nsudo kubeadm upgrade plan\nsudo kubeadm upgrade apply v1.X.Y\nkubectl drain cp1 --ignore-daemonsets\nsudo apt-mark unhold kubelet kubectl && sudo apt-get install -y kubelet='1.X.Y-*' kubectl='1.X.Y-*' && sudo apt-mark hold kubelet kubectl\nsudo systemctl daemon-reload && sudo systemctl restart kubelet\nkubectl uncordon cp1\n```",
   "Each worker follows a similar pattern. From a machine with kubectl, drain the node so its Pods move elsewhere: `kubectl drain node01 --ignore-daemonsets` (add `--delete-emptydir-data` if Pods use emptyDir). On the worker, upgrade the kubeadm package and run `sudo kubeadm upgrade node`, which updates the local kubelet configuration. Then upgrade the kubelet and kubectl packages, reload systemd and restart the kubelet. Finally uncordon the node so it accepts Pods again.",
   "Note that Kubernetes package repositories are published per minor version, so moving to a new minor may require changing the repository definition on each node before the new packages appear. Verify with `kubectl get nodes`: the VERSION column shows each kubelet's version, which is the easiest way to confirm a node really finished."
  ],
  "terms": [
   [
    "kubeadm upgrade plan",
    "Checks upgradeability and lists target versions without changing anything."
   ],
   [
    "kubeadm upgrade apply",
    "Upgrades the first control plane node's components to a given version."
   ],
   [
    "kubeadm upgrade node",
    "Upgrades additional control plane nodes or updates a worker's kubelet config."
   ],
   [
    "Version skew policy",
    "Rules on how far component versions may differ; kubelets may never be newer than the API server."
   ]
  ],
  "example": "Asked to upgrade the control plane and node01 to the next patch of the next minor, you upgrade kubeadm on cp1, run plan and apply, drain and upgrade the kubelet on cp1, uncordon it, then repeat drain, `kubeadm upgrade node`, kubelet upgrade and uncordon on node01. `kubectl get nodes` shows both at the new version.",
  "tip": "Upgrading the package is not enough: forgetting `systemctl daemon-reload && systemctl restart kubelet` leaves the node reporting the old version. Also remember `upgrade apply` only on the first control plane node and `upgrade node` everywhere else.",
  "check": [
   [
    "Can you upgrade directly from 1.33 to 1.35 with kubeadm?",
    "No; upgrade one minor at a time, 1.33 to 1.34, then 1.34 to 1.35."
   ],
   [
    "Why is the control plane upgraded before worker kubelets?",
    "The version skew policy forbids a kubelet newer than the API server."
   ]
  ]
 },
 {
  "t": "etcd backup and restore with etcdctl/etcdutl and the etcd PKI; pointing the etcd static Pod at a restored data directory",
  "body": [
   "Because etcd holds all cluster state, a snapshot of etcd is a backup of the cluster's configuration. The CKA regularly asks you to take one to a given path and later restore one. You need to know the tools, the certificates and how to repoint the etcd static Pod.",
   "`etcdctl` is the client that talks to a running etcd over the network. On a kubeadm cluster etcd requires mutual TLS, so you pass three files from `/etc/kubernetes/pki/etcd`: the CA, and a client certificate and key. The simplest way to find the right paths and endpoint is to read them from `/etc/kubernetes/manifests/etcd.yaml` (look at `--listen-client-urls`, `--trusted-ca-file`, `--cert-file` and `--key-file`). The server certificate works as a client certificate in most kubeadm setups, and a dedicated `healthcheck-client` certificate is also present.",
   "```bash\n# default endpoint is the local client port 2379; add --endpoints if etcd is elsewhere\nETCDCTL_API=3 etcdctl \\\n  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\\n  --cert=/etc/kubernetes/pki/etcd/server.crt \\\n  --key=/etc/kubernetes/pki/etcd/server.key \\\n  snapshot save /opt/backup/etcd.db\netcdutl snapshot status /opt/backup/etcd.db -w table\n```",
   "`etcdutl` is the offline utility that works on files directly. In current etcd releases, snapshot restore and status are done with etcdutl, and the older `etcdctl snapshot restore` is deprecated. A restore does not overwrite the running database; it builds a new data directory from the snapshot: `etcdutl snapshot restore /opt/backup/etcd.db --data-dir /var/lib/etcd-restored`. No TLS flags are needed because it does not contact a server.",
   "Now point etcd at the restored data. Edit `/etc/kubernetes/manifests/etcd.yaml`. The data directory appears in the `--data-dir` flag and in the `hostPath` volume named `etcd-data`. The simplest reliable change is to update the hostPath `path` to `/var/lib/etcd-restored` (and the flag too, if you also change the mount path). Save the file; the kubelet restarts etcd with the old state. The API server may take a minute to reconnect, so `kubectl` can fail briefly. If it stays stuck, check with `crictl ps` and `crictl logs` on the node.",
   "Treat snapshot files as highly sensitive: they contain every Secret in the cluster, unencrypted unless you enabled encryption at rest. Store them with restrictive permissions and off the node."
  ],
  "terms": [
   [
    "etcdctl",
    "The network client for a running etcd; used for snapshot save, member list and endpoint health."
   ],
   [
    "etcdutl",
    "The offline etcd utility for working with data files, including snapshot restore and status."
   ],
   [
    "Data directory",
    "The on-disk location of the etcd database, set by --data-dir and mounted via a hostPath volume."
   ],
   [
    "etcd PKI",
    "The separate CA and certificates under /etc/kubernetes/pki/etcd used for etcd mutual TLS."
   ]
  ],
  "example": "After taking a snapshot to /opt/snap.db, a teammate deletes the `payments` namespace. You run `etcdutl snapshot restore /opt/snap.db --data-dir /var/lib/etcd-from-backup`, change the etcd-data hostPath in etcd.yaml to that directory, wait for etcd and the API server to restart, and `kubectl get ns` shows payments again.",
  "tip": "Snapshot save fails with a TLS or deadline error if you omit --cacert, --cert or --key; copy the paths straight from the etcd manifest instead of guessing. For restore, remember the hostPath volume is what actually decides which host directory etcd sees.",
  "check": [
   [
    "Does snapshot restore overwrite the running etcd database?",
    "No. It creates a new data directory; you then point etcd at it."
   ],
   [
    "Where can you look up the endpoint and certificate paths etcdctl needs?",
    "In the etcd static Pod manifest, /etc/kubernetes/manifests/etcd.yaml."
   ]
  ]
 },
 {
  "t": "Highly available control planes: stacked vs external etcd, quorum, load balancer in front of API servers, --upload-certs and --certificate-key",
  "body": [
   "A single control plane node is a single point of failure: if it dies, running Pods keep going but nothing can be changed, scheduled or healed. A highly available (HA) control plane runs several control plane nodes so the cluster survives the loss of one.",
   "kubeadm supports two topologies. In a stacked topology, each control plane node runs its own etcd member next to the API server, scheduler and controller-manager. It needs fewer machines and is what kubeadm sets up by default, but losing a node removes both a control plane instance and an etcd member. In an external etcd topology, etcd runs on its own dedicated hosts and the control plane nodes connect to it. It decouples the two failure domains and lets you size etcd separately, at the cost of more machines and more setup (you give kubeadm the etcd endpoints and certificates in a configuration file).",
   "etcd uses the Raft consensus algorithm, which needs a quorum, a majority of members, to accept writes. Quorum for n members is floor(n/2) + 1. Three members tolerate one failure; five tolerate two. Four members still tolerate only one, which is why etcd clusters use odd sizes. If quorum is lost, etcd stops accepting writes and the API server cannot change anything, even if some members are healthy.",
   "The API servers are stateless and all active at once, so clients reach them through a load balancer (for example HAProxy with keepalived, or a cloud load balancer) listening on port 6443 and forwarding to every control plane node. That load balancer's address is what you pass as `--control-plane-endpoint`. The scheduler and controller-manager are different: they run on every control plane node but use leader election, so only one instance of each is active at a time and the others wait to take over.",
   "Joining extra control plane nodes requires sharing the cluster's CA and service-account keys. kubeadm can do this for you. `kubeadm init --control-plane-endpoint=LB:6443 --upload-certs` encrypts those certificates, stores them in the `kubeadm-certs` Secret in kube-system, and prints a certificate key. Other control plane nodes join with `kubeadm join LB:6443 --token ... --discovery-token-ca-cert-hash ... --control-plane --certificate-key <key>`.",
   "The uploaded certificates are deleted automatically after a short time (two hours by default), so if you add a control plane node later, re-upload them with `kubeadm init phase upload-certs --upload-certs`, which prints a new certificate key. Without the key, the alternative is copying the certificate files to the new node manually."
  ],
  "terms": [
   [
    "Stacked etcd",
    "Topology where each control plane node also runs an etcd member."
   ],
   [
    "External etcd",
    "Topology where etcd runs on separate hosts from the control plane."
   ],
   [
    "Quorum",
    "A majority of etcd members, floor(n/2)+1, needed to commit writes."
   ],
   [
    "--certificate-key",
    "The key used to decrypt control plane certificates uploaded by --upload-certs when joining as a control plane node."
   ],
   [
    "Leader election",
    "Mechanism that keeps only one scheduler and one controller-manager active across control plane nodes."
   ]
  ],
  "example": "A three-node stacked control plane loses cp2 to a disk failure. etcd still has two of three members, so quorum holds, the load balancer stops sending traffic to cp2's dead API server, and the scheduler leader on cp1 keeps placing Pods. The team rebuilds cp2 by generating a fresh certificate key and running join with --control-plane.",
  "tip": "Know the quorum math cold: 3 members survive 1 failure, 5 survive 2, and adding a fourth member to three does not improve fault tolerance. Also remember that the scheduler and controller-manager are active/passive while API servers are active/active.",
  "check": [
   [
    "How many etcd member failures can a five-member cluster tolerate?",
    "Two, because quorum is three."
   ],
   [
    "What flag on kubeadm init shares certificates so other control plane nodes can join without copying files?",
    "--upload-certs, which prints the certificate key used with join --certificate-key."
   ],
   [
    "What is the main trade-off of external etcd versus stacked?",
    "Better failure isolation for more hosts and more setup complexity."
   ]
  ]
 },
 {
  "t": "RBAC: Roles, ClusterRoles, RoleBindings, ClusterRoleBindings, aggregated and built-in roles, users via CertificateSigningRequests, kubectl auth can-i",
  "body": [
   "Role-based access control (RBAC) decides what an authenticated identity may do. Permissions are always additive: there are no deny rules, so a user can do only what some role grants. Each rule lists API groups, resources and verbs such as get, list, watch, create, update, patch and delete.",
   "There are four objects. A Role grants permissions inside one namespace. A ClusterRole is cluster-wide: it can cover cluster-scoped resources such as nodes and PersistentVolumes, or be a reusable set of namespaced permissions. A RoleBinding grants a Role or a ClusterRole to subjects (users, groups or ServiceAccounts) within one namespace. A ClusterRoleBinding grants a ClusterRole across the whole cluster. Binding a ClusterRole with a RoleBinding is a common pattern: define 'read pods' once and grant it per namespace.",
   "```bash\nkubectl create role pod-reader -n dev --verb=get,list,watch --resource=pods\nkubectl create rolebinding jane-read -n dev --role=pod-reader --user=jane\nkubectl create clusterrolebinding ci-view --clusterrole=view --serviceaccount=ci:deployer\nkubectl auth can-i list pods -n dev --as=jane\nkubectl auth can-i --list --as=system:serviceaccount:ci:deployer -n ci\n```",
   "Kubernetes ships built-in ClusterRoles: `cluster-admin` (everything), `admin` (most things in a namespace, including RBAC there), `edit` (read and write most objects, but not roles or bindings) and `view` (read-only, excluding Secrets). Several of these are aggregated ClusterRoles. An aggregated ClusterRole has an `aggregationRule` with label selectors, and the controller manager automatically merges in the rules of any ClusterRole carrying a matching label, such as `rbac.authorization.k8s.io/aggregate-to-view: \"true\"`. That is how a CRD installer can extend the view role to its new resources.",
   "Kubernetes has no user objects. A normal user is simply whoever presents a client certificate signed by the cluster CA; the certificate's common name (CN) is the username and organization (O) fields are groups. To create one, generate a key and a certificate signing request with openssl (for example `-subj \"/CN=jane/O=dev\"`), wrap it in a CertificateSigningRequest object with `signerName: kubernetes.io/kube-apiserver-client` and `usages: [client auth]`, and put the base64-encoded CSR in `spec.request`. Then `kubectl certificate approve jane`, read the issued certificate from `.status.certificate`, decode it, and add it to a kubeconfig with `kubectl config set-credentials` and `set-context`.",
   "Verify with `kubectl auth can-i`. Using `--as` impersonates another identity, and `--as-group` adds groups, so you can prove a binding works without switching kubeconfigs."
  ],
  "terms": [
   [
    "Role / ClusterRole",
    "Sets of permission rules, namespaced or cluster-wide respectively."
   ],
   [
    "RoleBinding / ClusterRoleBinding",
    "Objects that grant a role to users, groups or ServiceAccounts, in one namespace or cluster-wide."
   ],
   [
    "Aggregated ClusterRole",
    "A ClusterRole whose rules are automatically assembled from other ClusterRoles matching a label selector."
   ],
   [
    "CertificateSigningRequest",
    "An API object that asks a signer, such as the kube-apiserver-client signer, to issue a certificate."
   ]
  ],
  "example": "A developer named Jane needs to view and delete Pods only in the `qa` namespace. You issue her a certificate through a CSR with CN=jane, create a Role with get, list and delete on pods in qa, bind it with a RoleBinding, and confirm with `kubectl auth can-i delete pods -n qa --as=jane` (yes) and `-n prod` (no).",
  "tip": "A RoleBinding that references a ClusterRole still only grants access in the RoleBinding's namespace. Also remember ServiceAccount subjects are written as system:serviceaccount:<namespace>:<name> when impersonating.",
  "check": [
   [
    "Can RBAC express 'everything except Secrets'?",
    "Not with a deny rule; RBAC is additive only, so you must grant exactly the resources you want."
   ],
   [
    "What determines a certificate-based user's username and groups?",
    "The certificate's CN is the username and each O field is a group."
   ],
   [
    "How do you check whether ServiceAccount builder in namespace ci can create Deployments there?",
    "`kubectl auth can-i create deployments -n ci --as=system:serviceaccount:ci:builder`."
   ]
  ]
 },
 {
  "t": "Node maintenance: cordon, drain, uncordon and PodDisruptionBudgets",
  "body": [
   "Nodes need maintenance: kernel patches, kubelet upgrades, hardware swaps. Kubernetes gives you three commands to take a node out of service gracefully and bring it back.",
   "`kubectl cordon node01` marks the node unschedulable. It sets `spec.unschedulable: true`, which shows up as `SchedulingDisabled` in `kubectl get nodes`. Existing Pods keep running; only new Pods are kept away. Use it when you want to stop new work landing on a node while you investigate.",
   "`kubectl drain node01` cordons the node and then evicts its Pods so their controllers recreate them elsewhere. Drain refuses to proceed in some situations, and the flags that override those checks are exam material. DaemonSet Pods cannot be moved (the DaemonSet would immediately recreate them), so you add `--ignore-daemonsets` to leave them in place. Pods using emptyDir volumes lose that data when evicted, so drain wants `--delete-emptydir-data` as an acknowledgement. Bare Pods not managed by any controller would be deleted forever, so drain requires `--force` for them. Static Pods are not evicted at all.",
   "When the work is done, `kubectl uncordon node01` makes the node schedulable again. Note that uncordon does not move existing Pods back; new Pods, and Pods rescheduled for other reasons, will gradually use it.",
   "Drain uses the Eviction API rather than plain deletion, and evictions respect PodDisruptionBudgets (PDBs). A PDB states how many Pods matching a selector must stay up during voluntary disruptions like drains: either `minAvailable` or `maxUnavailable`, as a number or a percentage. If evicting a Pod would violate the budget, the eviction is refused and drain keeps retrying, which can look like drain hanging. That is the PDB protecting your application; it waits until replacement Pods become Ready elsewhere.",
   "```bash\nkubectl create pdb web-pdb --selector=app=web --min-available=2\nkubectl get pdb   # ALLOWED DISRUPTIONS column\nkubectl drain node01 --ignore-daemonsets --delete-emptydir-data --timeout=120s\n```",
   "PDBs do not protect against involuntary disruptions such as a node crash, and a PDB with minAvailable equal to the replica count means zero allowed disruptions, so drains will block forever. If you see `Cannot evict pod as it would violate the pod's disruption budget`, check `kubectl get pdb` before reaching for `--disable-eviction`, which bypasses PDBs and should be a deliberate last resort."
  ],
  "terms": [
   [
    "Cordon",
    "Marks a node unschedulable without touching running Pods."
   ],
   [
    "Drain",
    "Cordons a node and evicts its Pods so they are rescheduled elsewhere."
   ],
   [
    "PodDisruptionBudget",
    "A policy limiting how many selected Pods can be down at once due to voluntary disruptions."
   ],
   [
    "Eviction API",
    "The API drain uses to remove Pods, which honours PodDisruptionBudgets."
   ]
  ],
  "example": "You drain node02 for a kernel update and the command pauses on a Pod from a 3-replica Deployment whose PDB requires minAvailable 3. `kubectl get pdb` shows 0 allowed disruptions. After agreeing with the app team, you change the PDB to minAvailable 2; the eviction succeeds, the Pod restarts on node03 and drain completes.",
  "tip": "The exam often wants `kubectl drain <node> --ignore-daemonsets` (plus --delete-emptydir-data if needed). If drain errors about DaemonSet-managed Pods, you forgot --ignore-daemonsets; if it complains about unmanaged Pods, it needs --force.",
  "check": [
   [
    "What is the difference between cordon and drain?",
    "Cordon only blocks new scheduling; drain also evicts the node's existing Pods."
   ],
   [
    "Why might kubectl drain appear to hang?",
    "An eviction would violate a PodDisruptionBudget, so drain keeps retrying until the budget allows it."
   ]
  ]
 },
 {
  "t": "Helm (repo add/update, upgrade --install, --version, values) and Kustomize (kubectl apply -k) for installing cluster components",
  "body": [
   "Many cluster components, such as ingress controllers, metrics-server, CNI plugins and operators, are distributed as Helm charts or Kustomize bases. The CKA expects you to install and configure them with both tools.",
   "Helm is a package manager for Kubernetes. A chart is a templated bundle of manifests with a `values.yaml` file of defaults. Installing a chart creates a release, a named instance tracked by Helm in the target namespace. First register a chart repository and refresh the local index: `helm repo add <name> <repo-url>` and `helm repo update`. `helm search repo <keyword>` finds charts, and `helm search repo <chart> --versions` lists chart versions.",
   "The most useful single command is `helm upgrade --install`: it installs the release if it does not exist and upgrades it if it does, which makes scripts and exam answers idempotent. `--version` pins the chart version (this is the chart's version, which may differ from the application's version). `-n` picks the namespace and `--create-namespace` creates it if missing. Override values with `-f my-values.yaml` or `--set key=value`; later sources win over earlier ones.",
   "```bash\nhelm show values ingress-nginx/ingress-nginx > defaults.yaml\nhelm upgrade --install ingress ingress-nginx/ingress-nginx \\\n  -n ingress --create-namespace --version <chart-version> \\\n  --set controller.replicaCount=2\nhelm list -A\nhelm get values ingress -n ingress\nhelm history ingress -n ingress && helm rollback ingress 1 -n ingress\n```",
   "Kustomize takes a different approach: no templates, just plain YAML plus a `kustomization.yaml` that lists `resources` and applies transformations, such as setting a `namespace`, adding a `namePrefix`, adding labels, changing `images` tags, applying `patches` or generating ConfigMaps and Secrets. It is built into kubectl. `kubectl kustomize <dir>` prints the rendered result and `kubectl apply -k <dir>` applies it. Overlays (for example `overlays/prod`) reference a shared `base` and patch only what differs per environment.",
   "```yaml\n# kustomization.yaml\nresources:\n  - deployment.yaml\n  - service.yaml\nnamespace: monitoring\nimages:\n  - name: metrics-app\n    newTag: \"2.1\"\n```",
   "Choose Helm when a vendor ships a chart and you mainly need to set values; choose Kustomize when you have plain manifests and need repeatable edits. They can be combined, but for the exam just be fluent with each: inspect values before installing, pin versions, and verify with `helm list` or `kubectl get` afterwards."
  ],
  "terms": [
   [
    "Chart",
    "A Helm package of templated Kubernetes manifests with default values."
   ],
   [
    "Release",
    "A named, installed instance of a chart in a namespace, with its own revision history."
   ],
   [
    "helm upgrade --install",
    "Installs a release if absent or upgrades it if present."
   ],
   [
    "kustomization.yaml",
    "The Kustomize file listing resources and transformations; applied with kubectl apply -k."
   ]
  ],
  "example": "A task asks you to install a chart at chart version 4.x into namespace `ingress` with two controller replicas. You run `helm repo update`, confirm the exact version with `helm search repo --versions`, then `helm upgrade --install` with --version, -n, --create-namespace and --set. `helm list -n ingress` shows the release deployed.",
  "tip": "Helm releases are namespaced: `helm list` shows only the current namespace, so use `helm list -A` when a release seems missing. And --version refers to the chart version, not the app version.",
  "check": [
   [
    "Why prefer `helm upgrade --install` over `helm install` in automation?",
    "It succeeds whether or not the release already exists."
   ],
   [
    "How do you preview what a Kustomize directory will produce without applying it?",
    "Run `kubectl kustomize <dir>`."
   ]
  ]
 },
 {
  "t": "Extension interfaces: CRI (containerd, CRI-O, crictl), CNI (Calico, Cilium, Flannel), CSI drivers",
  "body": [
   "Kubernetes does not run containers, wire networks or attach disks itself. It defines standard interfaces and lets plugins do the work. Knowing the three interfaces tells you where to look when something below the API breaks.",
   "The Container Runtime Interface (CRI) is a gRPC API between the kubelet and a container runtime. containerd and CRI-O are the common CRI runtimes. Docker Engine is no longer supported directly by the kubelet since dockershim was removed. The kubelet is pointed at the runtime's socket, such as `unix:///run/containerd/containerd.sock` for containerd or `unix:///var/run/crio/crio.sock` for CRI-O.",
   "`crictl` is the CRI debugging tool, and it works even when the API server is down because it talks to the local runtime. Configure its endpoint in `/etc/crictl.yaml` (`runtime-endpoint:`). Key commands: `crictl ps -a` (containers, including exited), `crictl pods`, `crictl images`, `crictl logs <container-id>`, `crictl inspect <id>` and `crictl rmi --prune`. It is not meant for building images or creating long-lived workloads.",
   "The Container Network Interface (CNI) specifies how a runtime asks a plugin to give a Pod's network namespace an interface and an IP. The kubelet and runtime read network configuration from `/etc/cni/net.d/` and plugin binaries from `/opt/cni/bin/`. If that config is missing, Pods fail with sandbox network errors and nodes report NotReady. Calico offers routed networking (optionally using BGP) or overlays, and full NetworkPolicy support. Cilium uses eBPF in the kernel for networking, policy and observability, and can even replace kube-proxy. Flannel is a simple overlay (commonly VXLAN) that is easy to install but does not enforce NetworkPolicies on its own.",
   "The Container Storage Interface (CSI) lets storage vendors ship drivers outside the Kubernetes codebase. A CSI driver usually has a controller component (a Deployment or StatefulSet that creates, deletes, attaches and snapshots volumes, with sidecars such as the external provisioner) and a node component (a DaemonSet that mounts volumes on each node). You can list installed drivers with `kubectl get csidrivers` and see the node side with `kubectl get csinodes`. A StorageClass names its CSI driver in the `provisioner` field.",
   "The practical lesson: CRI problems show up as containers that will not start (check the runtime service and crictl), CNI problems as Pods stuck ContainerCreating or unable to reach each other, and CSI problems as PVCs stuck Pending or volumes that fail to attach or mount."
  ],
  "terms": [
   [
    "CRI",
    "The gRPC interface the kubelet uses to control container runtimes such as containerd and CRI-O."
   ],
   [
    "crictl",
    "A command-line client for CRI runtimes, used for node-level debugging."
   ],
   [
    "CNI",
    "The specification and plugins that configure Pod network interfaces and IP addresses."
   ],
   [
    "CSI",
    "The standard interface for out-of-tree storage drivers that provision, attach and mount volumes."
   ]
  ],
  "example": "New Pods on node02 stay in ContainerCreating with an event saying the network plugin is not ready. On node02 you find `/etc/cni/net.d/` empty because the CNI DaemonSet Pod there is crashing. Fixing the DaemonSet's toleration lets it run, it writes the config, and the Pods start.",
  "tip": "If kubectl is unavailable, crictl is your eyes on the node. Remember Flannel alone does not enforce NetworkPolicy; a policy that seems ignored may simply have no enforcing CNI.",
  "check": [
   [
    "Which directories hold CNI configuration and plugin binaries on a node?",
    "/etc/cni/net.d for configuration and /opt/cni/bin for binaries."
   ],
   [
    "Why does crictl still work when the API server is down?",
    "It talks directly to the local container runtime over the CRI socket, not to the API server."
   ]
  ]
 },
 {
  "t": "CustomResourceDefinitions, custom resources and operators (CRD plus controller)",
  "body": [
   "Kubernetes' API is extensible. A CustomResourceDefinition (CRD) teaches the API server about a new resource type, and from then on you can create objects of that type (custom resources) with kubectl, store them in etcd and protect them with RBAC, exactly like built-in objects.",
   "A CRD lives in the `apiextensions.k8s.io/v1` API. Its name must be `<plural>.<group>`, for example `backups.example.com`. The spec declares the `group`, the `names` (plural, singular, kind and optional shortNames), the `scope` (Namespaced or Cluster) and one or more `versions`. Each version says whether it is `served`, exactly one is marked `storage: true`, and each has an OpenAPI v3 `schema` that the API server uses to validate objects.",
   "```yaml\napiVersion: apiextensions.k8s.io/v1\nkind: CustomResourceDefinition\nmetadata:\n  name: backups.example.com\nspec:\n  group: example.com\n  scope: Namespaced\n  names: {plural: backups, singular: backup, kind: Backup, shortNames: [bk]}\n  versions:\n  - name: v1\n    served: true\n    storage: true\n    schema:\n      openAPIV3Schema:\n        type: object\n        properties:\n          spec:\n            type: object\n            properties:\n              schedule: {type: string}\n```",
   "A custom resource by itself does nothing; it is just stored data. Behaviour comes from a controller that watches those objects and acts on them. A CRD plus a controller that encodes operational knowledge (how to deploy, back up, scale or upgrade a particular application) is called an operator. For example, a database operator might watch `Postgres` objects and create StatefulSets, Services and backup Jobs to match each one.",
   "Operators are normally installed with Helm or by applying manifests, and the install has distinct parts: the CRDs, a namespace, a ServiceAccount with RBAC permissions, and the controller Deployment. CRDs must exist before any custom resources that use them are applied, which is why many projects ship them as a separate file or step. Check the result with `kubectl get crd`, `kubectl api-resources --api-group=example.com`, `kubectl explain backup.spec` and `kubectl get backups -A`.",
   "Be careful with deletions: deleting a CRD deletes every custom resource of that type in the cluster. Also, if a controller adds finalizers to its custom resources and the controller is removed first, those resources can get stuck in deletion because nothing is left to remove the finalizer."
  ],
  "terms": [
   [
    "CustomResourceDefinition",
    "An object that registers a new resource type with the API server."
   ],
   [
    "Custom resource",
    "An instance of a type defined by a CRD, stored in etcd like any object."
   ],
   [
    "Operator",
    "A controller plus CRDs that automates running a specific application."
   ],
   [
    "Finalizer",
    "A key on an object that blocks its deletion until a controller performs cleanup and removes it."
   ]
  ],
  "example": "A task says to install an operator and create a `Certificate` custom resource. You apply the operator's CRD manifest first, confirm with `kubectl get crd | grep cert`, install the controller, then create the resource. `kubectl describe certificate` shows the controller's status updates, proving it is reconciling.",
  "tip": "If `kubectl apply` says 'no matches for kind', the CRD is missing or its group/version does not match the object's apiVersion. Use `kubectl api-resources` to see exactly which kinds and groups the cluster knows.",
  "check": [
   [
    "What must a CRD's metadata.name look like?",
    "The plural name followed by the group, such as backups.example.com."
   ],
   [
    "What turns a CRD into an operator?",
    "A controller that watches the custom resources and reconciles real resources to match them."
   ],
   [
    "What happens to existing custom resources if you delete their CRD?",
    "They are all deleted along with it."
   ]
  ]
 },
 {
  "t": "Deployments and ReplicaSets as self-healing primitives; rolling updates, rollout status, history, undo and restart",
  "body": [
   "You rarely create bare Pods in production, because a bare Pod that dies or whose node fails is simply gone. Instead you create a Deployment, which manages ReplicaSets, which manage Pods. This layering gives you self-healing and controlled updates.",
   "A ReplicaSet keeps a set number of Pods matching a label selector running. If a Pod is deleted, crashes out of existence or is lost with its node, the ReplicaSet controller notices the count is short and creates a replacement from its Pod template. A Deployment sits above that: each time you change the Deployment's Pod template (image, env, resources), it creates a new ReplicaSet and shifts Pods from the old one to the new one. Old ReplicaSets are kept at zero replicas as history, up to `revisionHistoryLimit`.",
   "The default strategy is RollingUpdate, controlled by `maxSurge` (how many extra Pods may exist above the desired count) and `maxUnavailable` (how many may be missing), both defaulting to 25 percent. New Pods must become Ready, according to their readiness probe, before old ones are removed, so a broken image stalls the rollout rather than taking the whole app down. The alternative strategy, Recreate, deletes all old Pods before creating new ones, which causes downtime but guarantees two versions never run together.",
   "```bash\nkubectl create deployment web --image=nginx:1.27 --replicas=3\nkubectl set image deployment/web nginx=nginx:1.28\nkubectl rollout status deployment/web\nkubectl rollout history deployment/web\nkubectl rollout history deployment/web --revision=2\nkubectl rollout undo deployment/web            # back to previous\nkubectl rollout undo deployment/web --to-revision=1\nkubectl rollout restart deployment/web\nkubectl scale deployment/web --replicas=5\n```",
   "`rollout status` waits and reports progress, which is useful for confirming a task is finished. `rollout history` lists revisions; the CHANGE-CAUSE column is filled from the `kubernetes.io/change-cause` annotation, which you can set with `kubectl annotate`. `rollout undo` rolls back to the previous or a specific revision, which really means scaling an older ReplicaSet back up. `rollout restart` adds a timestamp annotation to the Pod template, triggering a fresh rolling replacement of every Pod without changing anything else. It is the standard way to make Pods pick up a changed ConfigMap consumed as environment variables.",
   "You can also `kubectl rollout pause` a Deployment, make several changes, then `rollout resume` so they roll out as one revision. If a rollout cannot make progress within `progressDeadlineSeconds`, the Deployment's Progressing condition becomes False, which `kubectl describe` shows."
  ],
  "terms": [
   [
    "ReplicaSet",
    "A controller that keeps a specified number of identical Pods running."
   ],
   [
    "Deployment",
    "A controller that manages ReplicaSets to provide declarative rolling updates and rollbacks."
   ],
   [
    "maxSurge / maxUnavailable",
    "RollingUpdate settings for extra Pods allowed and Pods allowed to be missing during an update."
   ],
   [
    "kubectl rollout restart",
    "Triggers a rolling replacement of all Pods by changing an annotation on the Pod template."
   ]
  ],
  "example": "After `kubectl set image deployment/api api=api:2.0`, `rollout status` hangs with one new Pod in ImagePullBackOff because the tag does not exist. Because RollingUpdate waits for readiness, the old Pods still serve traffic. `kubectl rollout undo deployment/api` returns to the previous ReplicaSet and the failed Pod is removed.",
  "tip": "Editing a Deployment's replica count does not create a new revision; only changes to the Pod template do. And never edit a ReplicaSet owned by a Deployment directly, because the Deployment will overwrite it.",
  "check": [
   [
    "What does kubectl rollout undo actually do under the hood?",
    "It sets the Deployment's Pod template back to an older revision, scaling that ReplicaSet up and the current one down."
   ],
   [
    "How do you force every Pod of a Deployment to be recreated without changing its spec meaningfully?",
    "`kubectl rollout restart deployment/<name>`."
   ]
  ]
 },
 {
  "t": "DaemonSets and StatefulSets from an operator's point of view, including tolerations for control plane nodes",
  "body": [
   "Deployments suit stateless, interchangeable Pods. Two other controllers cover cases they do not: DaemonSets, which run one Pod per node, and StatefulSets, which give Pods stable identities and storage.",
   "A DaemonSet ensures that every eligible node runs exactly one copy of a Pod. When a node joins, the DaemonSet adds a Pod to it; when a node leaves, the Pod goes with it. This is how node-level agents are deployed: kube-proxy, CNI agents, log shippers, monitoring exporters and CSI node plugins. You can limit a DaemonSet to some nodes with a nodeSelector or node affinity in its Pod template. DaemonSets support RollingUpdate (the default) and OnDelete update strategies.",
   "Control plane nodes on kubeadm clusters carry the taint `node-role.kubernetes.io/control-plane:NoSchedule`. A DaemonSet whose Pods do not tolerate it will skip those nodes, so `kubectl get ds` shows fewer desired Pods than you have nodes. If an agent must also run on control plane nodes, add a toleration to the Pod template.",
   "```yaml\nspec:\n  template:\n    spec:\n      tolerations:\n      - key: node-role.kubernetes.io/control-plane\n        operator: Exists\n        effect: NoSchedule\n```",
   "The DaemonSet controller also adds some tolerations automatically, for example for not-ready, unreachable and pressure conditions, so node agents are not evicted when a node struggles. There is no `kubectl create daemonset` shortcut; a quick trick is `kubectl create deployment ... --dry-run=client -o yaml`, then change the kind to DaemonSet and remove `replicas` and `strategy`.",
   "A StatefulSet manages Pods that need a stable identity. Pods are named with an ordinal, `db-0`, `db-1`, `db-2`, and are created in order and, by default, removed in reverse order. It requires a headless Service (named in `serviceName`) that gives each Pod a stable DNS name such as `db-0.db.prod.svc.cluster.local`. Its `volumeClaimTemplates` create one PersistentVolumeClaim per Pod, like `data-db-0`, and if a Pod is rescheduled it reattaches the same claim.",
   "Operationally, scaling a StatefulSet down removes the highest ordinals first and, by default, leaves their PVCs in place so data survives a later scale-up. Rolling updates proceed from the highest ordinal to the lowest, and a `partition` value lets you update only ordinals at or above a number for canary-style testing. When a StatefulSet Pod will not start, check its PVC and the node its volume is tied to, as storage is the most common cause."
  ],
  "terms": [
   [
    "DaemonSet",
    "A controller that runs one copy of a Pod on each eligible node."
   ],
   [
    "StatefulSet",
    "A controller giving Pods stable ordinal names, stable DNS and per-Pod persistent storage."
   ],
   [
    "Headless Service",
    "A Service with clusterIP None that publishes individual Pod DNS records, required by StatefulSets."
   ],
   [
    "Control plane taint",
    "node-role.kubernetes.io/control-plane:NoSchedule, which keeps ordinary Pods off control plane nodes."
   ]
  ],
  "example": "A log-shipping DaemonSet shows DESIRED 2 in a three-node cluster. The missing node is the control plane, which is tainted. Adding a toleration for node-role.kubernetes.io/control-plane with operator Exists raises DESIRED to 3 and a Pod appears on cp1.",
  "tip": "When a DaemonSet has fewer Pods than nodes, compare node taints (`kubectl describe node | grep -i taint`) with the Pod template's tolerations and nodeSelector before anything else.",
  "check": [
   [
    "What DNS name does Pod web-1 of a StatefulSet with serviceName web in namespace shop get?",
    "web-1.web.shop.svc.cluster.local."
   ],
   [
    "What happens to PVCs when you scale a StatefulSet down, by default?",
    "They are kept, so the data is reattached if you scale back up."
   ]
  ]
 },
 {
  "t": "ConfigMaps and Secrets: creation, env and volume consumption, immutable objects, restarting workloads after changes",
  "body": [
   "ConfigMaps and Secrets separate configuration from container images. A ConfigMap holds non-sensitive key-value data; a Secret holds sensitive values such as passwords, tokens and TLS keys. Their data is only base64-encoded, which is not encryption, so protect Secrets with RBAC and, ideally, encryption at rest configured on the API server.",
   "Create them imperatively from literals, files or env files. Generic Secrets are the most common type; `tls` Secrets hold a certificate and key; `docker-registry` Secrets hold image pull credentials.",
   "```bash\nkubectl create configmap app-cfg --from-literal=MODE=prod --from-file=app.properties\nkubectl create secret generic db-cred --from-literal=user=app --from-literal=password='S3cure!'\nkubectl create secret tls web-tls --cert=tls.crt --key=tls.key\nkubectl get secret db-cred -o jsonpath='{.data.password}' | base64 -d\n```",
   "Pods consume them in two ways. As environment variables, you either reference individual keys with `env[].valueFrom.configMapKeyRef` or `secretKeyRef`, or import all keys with `envFrom`. As volumes, each key becomes a file in the mount directory, which suits configuration files and certificates; you can pick specific keys with `items` and set file permissions with `defaultMode`.",
   "```yaml\ncontainers:\n- name: app\n  image: myapp:1.0\n  envFrom:\n  - configMapRef: {name: app-cfg}\n  env:\n  - name: DB_PASSWORD\n    valueFrom: {secretKeyRef: {name: db-cred, key: password}}\n  volumeMounts:\n  - {name: cfg, mountPath: /etc/app, readOnly: true}\nvolumes:\n- name: cfg\n  configMap: {name: app-cfg}\n```",
   "Updates behave differently for each method, and this is a favourite exam distinction. Environment variables are read once when the container starts, so changing the ConfigMap does not affect a running container. Volume-mounted ConfigMaps and Secrets are refreshed by the kubelet after a short delay, though the application must re-read the file to notice. Volumes mounted with `subPath` are never updated. The dependable way to apply a change is `kubectl rollout restart deployment/<name>`.",
   "Setting `immutable: true` on a ConfigMap or Secret prevents changes to its data. It protects against accidental edits and lets the kubelet stop watching it, which reduces API server load in large clusters. To change an immutable object you must delete and recreate it (or create a new one with a new name and update the workload to reference it). If a referenced ConfigMap or Secret does not exist, the Pod stays in ContainerCreating or shows CreateContainerConfigError unless the reference is marked `optional: true`."
  ],
  "terms": [
   [
    "ConfigMap",
    "An object holding non-confidential configuration as key-value pairs."
   ],
   [
    "Secret",
    "An object for sensitive data; values are base64-encoded, not encrypted, by default."
   ],
   [
    "envFrom",
    "Imports every key of a ConfigMap or Secret as environment variables."
   ],
   [
    "Immutable ConfigMap/Secret",
    "An object with immutable: true whose data cannot be changed after creation."
   ]
  ],
  "example": "You update the LOG_LEVEL key in a ConfigMap that a Deployment consumes through envFrom, but the logs are still verbose. Running `kubectl exec` and `env` shows the old value, because env vars are fixed at container start. `kubectl rollout restart deployment/api` brings the new value in.",
  "tip": "Env-var consumption never updates live; volume consumption does (except with subPath). If a task says 'make the Pods use the new value', restart the workload.",
  "check": [
   [
    "Is base64 in a Secret a form of encryption?",
    "No, it is only encoding; anyone who can read the Secret can decode it."
   ],
   [
    "What error might a Pod show when it references a missing ConfigMap key in env?",
    "CreateContainerConfigError, unless the reference is optional."
   ],
   [
    "How do you change data in an immutable ConfigMap?",
    "Delete and recreate it, or create a new ConfigMap and point the workload at it."
   ]
  ]
 },
 {
  "t": "Resource requests and limits, LimitRange and ResourceQuota as admission controls",
  "body": [
   "Each container can declare resource requests and limits for CPU and memory. They drive scheduling, runtime enforcement and Quality of Service, and administrators enforce policies on them with LimitRange and ResourceQuota.",
   "A request is what the scheduler reserves. A node is only chosen if the sum of requests of Pods already there plus the new Pod's requests fits within the node's allocatable capacity. Actual usage does not matter to the scheduler. A limit is a ceiling enforced at runtime: a container that exceeds its CPU limit is throttled, while a container that exceeds its memory limit is killed by the kernel with an OOMKilled status. CPU is measured in cores or millicores (`500m` is half a core), memory in bytes with suffixes like `Mi` and `Gi`.",
   "```yaml\nresources:\n  requests: {cpu: 250m, memory: 128Mi}\n  limits:   {cpu: 500m, memory: 256Mi}\n```",
   "Requests and limits also set a Pod's QoS class. Guaranteed means every container has requests equal to limits for both CPU and memory. Burstable means at least one request or limit is set but not Guaranteed. BestEffort means none at all. Under memory pressure, the kubelet evicts BestEffort Pods first, then Burstable Pods using more than their requests.",
   "A LimitRange is a namespaced policy enforced at admission. It can set default requests and limits for containers that omit them (`defaultRequest` and `default`), and minimum, maximum and maximum limit-to-request ratio per container or Pod. It applies only to Pods created after it exists; existing Pods are not changed. A Pod that violates the min or max is rejected with a clear error from the API server.",
   "A ResourceQuota caps total consumption in a namespace: sums such as `requests.cpu`, `limits.memory` and `requests.storage`, and object counts such as `pods`, `services` or `persistentvolumeclaims`. Once a quota on compute resources exists, every new Pod in that namespace must specify those requests or limits, or be given defaults by a LimitRange, otherwise it is rejected. Check usage with `kubectl describe quota -n <ns>`, which shows Used and Hard for each resource.",
   "```bash\nkubectl create quota team-a --hard=requests.cpu=2,requests.memory=4Gi,pods=10 -n team-a\n```",
   "Both are admission controls, so their rejections happen at creation time. When a Deployment's Pods are refused by a quota, the Deployment object itself is created fine, but its ReplicaSet cannot create Pods. You see the reason in `kubectl describe rs` or in namespace events, not in `kubectl get pods`, which simply shows fewer Pods than expected."
  ],
  "terms": [
   [
    "Request",
    "The amount of CPU or memory reserved for a container and used for scheduling decisions."
   ],
   [
    "Limit",
    "The maximum CPU (throttled) or memory (OOM-killed) a container may use."
   ],
   [
    "LimitRange",
    "A namespaced admission policy for per-container or per-Pod defaults, minimums and maximums."
   ],
   [
    "ResourceQuota",
    "A namespaced cap on aggregate resource usage and object counts."
   ],
   [
    "QoS class",
    "Guaranteed, Burstable or BestEffort, derived from requests and limits and used for eviction order."
   ]
  ],
  "example": "A Deployment in namespace team-a shows 0/3 ready and no Pods at all. `kubectl describe rs` reports 'failed quota: must specify limits.memory'. Adding a LimitRange with default memory limits, or adding limits to the Pod template, lets the ReplicaSet create the Pods.",
  "tip": "Pods missing entirely usually means admission rejected them (quota or LimitRange), so look at ReplicaSet events. Pods existing but Pending usually means scheduling failed on insufficient requests.",
  "check": [
   [
    "What happens when a container exceeds its memory limit versus its CPU limit?",
    "Memory: it is OOM-killed. CPU: it is throttled but keeps running."
   ],
   [
    "Which QoS class does a Pod get when every container sets equal CPU and memory requests and limits?",
    "Guaranteed."
   ]
  ]
 },
 {
  "t": "Scheduling: nodeSelector, nodeName, node affinity (required vs preferred)",
  "body": [
   "By default the scheduler places a Pod on any node with enough resources. Often you need more control: GPUs on some nodes, SSDs on others, a workload that must stay in one zone. Kubernetes gives you several tools, from blunt to expressive.",
   "`nodeName` is the bluntest. Setting `spec.nodeName: node02` bypasses the scheduler entirely: the kubelet on node02 simply runs the Pod. NoSchedule taints are not enforced for it and there is no fallback if the node is missing or full; the Pod may fail rather than wait. It is useful for tests or when the scheduler is down, but not for normal workloads.",
   "`nodeSelector` is the simplest scheduler-aware method. It is a map of labels, and the Pod can only go to nodes that carry all of them. Label nodes first with `kubectl label node node02 disktype=ssd`, then add the selector. Well-known labels such as `kubernetes.io/hostname`, `kubernetes.io/os` and `topology.kubernetes.io/zone` are available too. Check labels with `kubectl get nodes --show-labels` or `-L disktype`.",
   "```yaml\nspec:\n  nodeSelector:\n    disktype: ssd\n  affinity:\n    nodeAffinity:\n      requiredDuringSchedulingIgnoredDuringExecution:\n        nodeSelectorTerms:\n        - matchExpressions:\n          - {key: topology.kubernetes.io/zone, operator: In, values: [zone-a, zone-b]}\n      preferredDuringSchedulingIgnoredDuringExecution:\n      - weight: 50\n        preference:\n          matchExpressions:\n          - {key: gpu, operator: Exists}\n```",
   "Node affinity is the expressive form. Its operators are In, NotIn, Exists, DoesNotExist, Gt and Lt. The required variant, `requiredDuringSchedulingIgnoredDuringExecution`, is a hard rule: if no node matches, the Pod stays Pending. The preferred variant is soft: each term has a weight from 1 to 100, the scheduler adds the weights of matching terms to a node's score, but will still place the Pod elsewhere if nothing matches.",
   "Two structural details are commonly tested. Multiple `nodeSelectorTerms` are ORed, while multiple `matchExpressions` within one term are ANDed. And the 'IgnoredDuringExecution' part means rules are only checked at scheduling time: if you remove a label from a node later, Pods already running there stay put. If both nodeSelector and node affinity are set, both must be satisfied.",
   "To keep other workloads off special nodes, combine affinity with taints and tolerations; affinity attracts Pods, taints repel them."
  ],
  "terms": [
   [
    "nodeName",
    "A Pod field that pins the Pod to a node directly, bypassing the scheduler."
   ],
   [
    "nodeSelector",
    "A simple label map a node must fully match for the Pod to be scheduled there."
   ],
   [
    "Required node affinity",
    "A hard scheduling rule; the Pod stays Pending if no node satisfies it."
   ],
   [
    "Preferred node affinity",
    "A weighted soft rule that influences scoring but does not block scheduling."
   ]
  ],
  "example": "A task asks you to run a Pod only on nodes labelled `tier=frontend`, but none are labelled. After adding the nodeSelector the Pod shows Pending with '0/3 nodes are available: 3 node(s) didn't match Pod's node affinity/selector'. `kubectl label node node01 tier=frontend` lets it schedule immediately.",
  "tip": "Terms are ORed, expressions within a term are ANDed. And a missing label with required affinity or nodeSelector means Pending forever, never a fallback.",
  "check": [
   [
    "Does removing a node label evict Pods that were scheduled there because of required node affinity?",
    "No. IgnoredDuringExecution means the rule is only evaluated at scheduling time."
   ],
   [
    "What happens to a Pod whose preferred node affinity matches no node?",
    "It is scheduled on another suitable node; preferences only affect scoring."
   ]
  ]
 },
 {
  "t": "Taints and tolerations: NoSchedule, PreferNoSchedule, NoExecute and tolerationSeconds",
  "body": [
   "Affinity lets a Pod choose nodes. Taints work the other way round: they let a node refuse Pods. A taint is a key, an optional value and an effect set on a node. Only Pods with a matching toleration can ignore it. A toleration does not attract a Pod to a node; it merely permits scheduling there.",
   "```bash\nkubectl taint node node02 dedicated=gpu:NoSchedule\nkubectl describe node node02 | grep -i taints\nkubectl taint node node02 dedicated=gpu:NoSchedule-   # trailing dash removes it\n```",
   "There are three effects. `NoSchedule` stops new Pods without a matching toleration from being scheduled there; Pods already running stay. `PreferNoSchedule` is a soft version: the scheduler tries to avoid the node but will use it if nothing else fits. `NoExecute` affects running Pods as well: Pods without a matching toleration are evicted immediately, and new ones are not scheduled.",
   "A toleration matches a taint when keys and effects match and either `operator: Equal` with the same value, or `operator: Exists` (no value needed). A toleration with an empty key and operator Exists tolerates everything. For NoExecute taints, a toleration can include `tolerationSeconds`, which lets a Pod stay bound for that long after the taint appears and then be evicted.",
   "```yaml\ntolerations:\n- key: dedicated\n  operator: Equal\n  value: gpu\n  effect: NoSchedule\n- key: node.kubernetes.io/unreachable\n  operator: Exists\n  effect: NoExecute\n  tolerationSeconds: 60\n```",
   "Kubernetes uses taints itself. The node lifecycle controller adds `node.kubernetes.io/not-ready` and `node.kubernetes.io/unreachable` NoExecute taints when a node stops reporting, and admission adds default tolerations of 300 seconds for these to most Pods. That is why Pods on a failed node are evicted about five minutes later rather than instantly. Pressure conditions add taints such as `node.kubernetes.io/disk-pressure`, `memory-pressure` and `unschedulable` (the last one from cordon). Control plane nodes carry `node-role.kubernetes.io/control-plane:NoSchedule`.",
   "The usual pattern for dedicated nodes is to combine both mechanisms: taint the nodes so general workloads stay off, and give the special workload a toleration plus a nodeSelector or node affinity so it actually goes there."
  ],
  "terms": [
   [
    "Taint",
    "A key, value and effect on a node that repels Pods lacking a matching toleration."
   ],
   [
    "Toleration",
    "A Pod setting that allows, but does not force, scheduling on nodes with matching taints."
   ],
   [
    "NoExecute",
    "A taint effect that evicts running non-tolerating Pods as well as blocking new ones."
   ],
   [
    "tolerationSeconds",
    "How long a Pod tolerating a NoExecute taint may stay before eviction."
   ]
  ],
  "example": "You taint node03 with `maintenance=true:NoExecute`. Every ordinary Pod on it is evicted within seconds and rescheduled elsewhere, while a monitoring DaemonSet Pod with a toleration for key maintenance and operator Exists keeps running there.",
  "tip": "A toleration alone will not put a Pod on the tainted node; pair it with nodeSelector or affinity. Removing a taint uses the same command with a trailing minus sign.",
  "check": [
   [
    "Which taint effect evicts Pods already running on the node?",
    "NoExecute."
   ],
   [
    "Why are Pods on a node that suddenly goes offline typically evicted after about five minutes?",
    "They receive default tolerations of 300 seconds for the not-ready and unreachable NoExecute taints."
   ]
  ]
 },
 {
  "t": "Pod affinity and anti-affinity with topologyKey; topologySpreadConstraints",
  "body": [
   "Node affinity relates Pods to node labels. Pod affinity and anti-affinity relate Pods to other Pods: put this web Pod near a cache Pod, or never put two replicas of the same database in the same zone.",
   "The key concept is `topologyKey`, a node label that defines what 'the same place' means. With `kubernetes.io/hostname`, the same place is the same node. With `topology.kubernetes.io/zone`, it is the same zone. The scheduler looks for Pods matching a `labelSelector` (in the Pod's own namespace by default, or in `namespaces` or a `namespaceSelector` you specify), groups nodes by the topology key's value, and applies the rule per group.",
   "Pod affinity says schedule into a topology domain that already has a matching Pod. Pod anti-affinity says avoid domains that have one. Both come in required and preferred forms, like node affinity. A classic pattern spreads replicas one per node with required anti-affinity on the Pod's own labels.",
   "```yaml\naffinity:\n  podAntiAffinity:\n    requiredDuringSchedulingIgnoredDuringExecution:\n    - labelSelector:\n        matchLabels: {app: web}\n      topologyKey: kubernetes.io/hostname\n  podAffinity:\n    preferredDuringSchedulingIgnoredDuringExecution:\n    - weight: 80\n      podAffinityTerm:\n        labelSelector:\n          matchLabels: {app: cache}\n        topologyKey: kubernetes.io/hostname\n```",
   "Required anti-affinity has a sharp edge: with one-per-node, a 4-replica Deployment on a 3-node cluster leaves the fourth Pod Pending. Preferred anti-affinity avoids that but gives no guarantee. Inter-Pod affinity is also relatively expensive for the scheduler in large clusters.",
   "`topologySpreadConstraints` is the more flexible tool for spreading. You name a `topologyKey`, a `labelSelector` for the Pods to count, and a `maxSkew`, the maximum allowed difference in matching Pod count between the most and least loaded domains. `whenUnsatisfiable: DoNotSchedule` makes it a hard rule; `ScheduleAnyway` makes it a scoring preference.",
   "```yaml\ntopologySpreadConstraints:\n- maxSkew: 1\n  topologyKey: topology.kubernetes.io/zone\n  whenUnsatisfiable: DoNotSchedule\n  labelSelector:\n    matchLabels: {app: web}\n```",
   "With maxSkew 1 across three zones, six replicas land two per zone, and seven land 3-2-2, which anti-affinity could not express. Constraints are evaluated only at scheduling time, so later node failures can leave Pods unevenly spread until they are rescheduled."
  ],
  "terms": [
   [
    "topologyKey",
    "A node label whose value defines a topology domain such as a node or zone."
   ],
   [
    "Pod anti-affinity",
    "A rule keeping a Pod away from domains that already run Pods matching a selector."
   ],
   [
    "topologySpreadConstraints",
    "Rules limiting how unevenly matching Pods are distributed across domains."
   ],
   [
    "maxSkew",
    "The maximum allowed difference in matching Pod counts between any two domains."
   ]
  ],
  "example": "A 3-replica Deployment with required anti-affinity on `app: web` and topologyKey kubernetes.io/hostname places one Pod on each of three workers. When a colleague scales it to 4, the new Pod is Pending with a message that node(s) didn't match pod anti-affinity rules, which is the rule working as designed.",
  "tip": "Read the topologyKey carefully: hostname means per node, zone means per zone. The same selector with a different key gives completely different placement.",
  "check": [
   [
    "What does maxSkew: 1 guarantee?",
    "No topology domain has more than one more matching Pod than the least-loaded domain."
   ],
   [
    "Why might required Pod anti-affinity leave Pods Pending?",
    "If there are more replicas than topology domains, extra replicas have no allowed place to go."
   ]
  ]
 },
 {
  "t": "PriorityClasses and preemption",
  "body": [
   "When a cluster is full, which Pods should win? PriorityClasses let you rank workloads so that important Pods are scheduled first and, if necessary, displace less important ones.",
   "A PriorityClass is a cluster-scoped object mapping a name to an integer `value`; higher numbers mean higher priority. Pods reference it through `spec.priorityClassName`, and admission copies the value into `spec.priority`. One PriorityClass may have `globalDefault: true`, which then applies to Pods that do not name one; without it, such Pods get priority 0. Kubernetes ships two built-in classes, `system-cluster-critical` and `system-node-critical`, with very high values, used by components like CoreDNS and the CNI agents. Ordinary user classes should use much lower values.",
   "```bash\nkubectl create priorityclass high-priority --value=100000 --description='Customer-facing APIs'\nkubectl get priorityclass\n```",
   "```yaml\nspec:\n  priorityClassName: high-priority\n  containers:\n  - name: api\n    image: api:1.0\n```",
   "Priority affects scheduling in two ways. First, the scheduling queue is ordered by priority, so higher-priority Pending Pods are tried before lower ones. Second, preemption: if a high-priority Pod cannot fit anywhere, the scheduler looks for a node where evicting one or more lower-priority Pods would make room. It then gracefully terminates those victims and records the target node in the preemptor's `status.nominatedNodeName`. The preemptor is scheduled once space frees up, though it may end up elsewhere if another node becomes available first.",
   "Preemption tries to respect PodDisruptionBudgets but may violate them if there is no other option. It does not consider Pods of equal or higher priority as victims. You can make a class non-preempting with `preemptionPolicy: Never`: such Pods still jump ahead in the queue but never evict others.",
   "Priority also plays a role when the kubelet evicts Pods under node resource pressure, alongside whether usage exceeds requests. Practically, when you see lower-priority Pods being killed with a reason mentioning preemption, or a Pending Pod with a nominated node, check `kubectl get pods -o custom-columns=NAME:.metadata.name,PRIO:.spec.priority` and the PriorityClasses involved."
  ],
  "terms": [
   [
    "PriorityClass",
    "A cluster-scoped object assigning an integer priority to Pods that reference it."
   ],
   [
    "Preemption",
    "The scheduler evicting lower-priority Pods to make room for a higher-priority Pending Pod."
   ],
   [
    "globalDefault",
    "A PriorityClass flag making it the default for Pods that name no class."
   ],
   [
    "preemptionPolicy: Never",
    "Gives a class queue priority without allowing it to evict other Pods."
   ]
  ],
  "example": "A nightly batch job fills the cluster's CPU requests. When a payments API Pod with the `high-priority` class is created, it cannot fit, so the scheduler evicts two batch Pods with priority 0 on node02, sets nominatedNodeName to node02 and then schedules the API Pod there.",
  "tip": "PriorityClass is cluster-scoped and Pods reference it by name; a typo in priorityClassName makes the Pod creation fail at admission. Only lower-priority Pods can be preempted.",
  "check": [
   [
    "What priority does a Pod get if it names no class and no globalDefault class exists?",
    "Zero."
   ],
   [
    "How can a class get scheduling-queue priority without evicting others?",
    "Set preemptionPolicy: Never on the PriorityClass."
   ]
  ]
 },
 {
  "t": "Workload autoscaling: HorizontalPodAutoscaler (kubectl autoscale, autoscaling/v2), metrics-server and CPU requests; awareness of VPA and Cluster Autoscaler",
  "body": [
   "Autoscaling in Kubernetes happens at three levels. The HorizontalPodAutoscaler (HPA) changes the number of replicas. The Vertical Pod Autoscaler (VPA) changes the requests of each Pod. The Cluster Autoscaler changes the number of nodes. The CKA focuses on the HPA and expects awareness of the other two.",
   "The HPA is a controller loop in the kube-controller-manager. Periodically it reads current metrics for the Pods of a target (a Deployment, StatefulSet or ReplicaSet), compares them with a target value and computes a desired replica count, roughly current replicas multiplied by current metric divided by target metric, clamped between `minReplicas` and `maxReplicas`.",
   "CPU and memory metrics come from the Resource Metrics API, which is served by metrics-server. metrics-server is not installed by kubeadm; you install it yourself (often from its manifest or Helm chart). In lab clusters whose kubelets use self-signed serving certificates, it commonly needs the `--kubelet-insecure-tls` argument to scrape them, which is acceptable for a lab but not for production. Confirm it works with `kubectl top pods`.",
   "Utilization targets are percentages of the Pod's requests. If the containers have no CPU request, the HPA cannot compute utilization and `kubectl get hpa` shows `<unknown>` in the TARGETS column. This is one of the most common exam and real-world pitfalls.",
   "```bash\nkubectl autoscale deployment web --cpu-percent=50 --min=2 --max=10\nkubectl get hpa web\nkubectl describe hpa web   # conditions and scaling events\n```",
   "```yaml\napiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata: {name: web}\nspec:\n  scaleTargetRef: {apiVersion: apps/v1, kind: Deployment, name: web}\n  minReplicas: 2\n  maxReplicas: 10\n  metrics:\n  - type: Resource\n    resource:\n      name: cpu\n      target: {type: Utilization, averageUtilization: 50}\n  behavior:\n    scaleDown:\n      stabilizationWindowSeconds: 120\n```",
   "The `autoscaling/v2` API supports multiple metrics (the HPA picks the largest resulting replica count), custom and external metrics through adapters, and a `behavior` section that tunes scale-up and scale-down rates and stabilization windows. By default scale-down is deliberately slow, using a stabilization window of a few minutes to avoid flapping.",
   "The VPA is a separate add-on that recommends or applies new requests for Pods; it should not control the same CPU or memory metric as an HPA on the same workload. The Cluster Autoscaler, usually tied to a cloud provider's node groups, adds nodes when Pods are Pending because nothing fits and removes underused nodes. Both are outside kubeadm's default install."
  ],
  "terms": [
   [
    "HorizontalPodAutoscaler",
    "A controller that adjusts a workload's replica count to meet a metric target."
   ],
   [
    "metrics-server",
    "An add-on that collects CPU and memory usage from kubelets and serves the Resource Metrics API."
   ],
   [
    "averageUtilization",
    "A target expressed as a percentage of the Pods' resource requests."
   ],
   [
    "Vertical Pod Autoscaler",
    "An add-on that recommends or sets container requests based on observed usage."
   ],
   [
    "Cluster Autoscaler",
    "An add-on that adds or removes nodes based on Pending Pods and node utilization."
   ]
  ],
  "example": "An HPA created with `kubectl autoscale` shows TARGETS `<unknown>/50%`. `kubectl top pods` works, so metrics-server is fine; `kubectl get deploy web -o yaml` reveals no CPU request. Adding `requests: {cpu: 100m}` and letting the Pods roll makes the HPA report real utilization and scale.",
  "tip": "`<unknown>` targets mean either metrics-server is missing or not working, or the Pods have no request for that resource. Check `kubectl top` first, then the requests.",
  "check": [
   [
    "Why does a CPU utilization HPA need CPU requests on the Pods?",
    "Utilization is calculated as a percentage of the requested CPU; with no request there is nothing to divide by."
   ],
   [
    "Which component serves the metrics the HPA uses for CPU and memory?",
    "metrics-server, via the Resource Metrics API."
   ]
  ]
 },
 {
  "t": "Static Pods vs scheduler-placed Pods; what happens when the scheduler is down",
  "body": [
   "Most Pods reach a node through the scheduler: the Pod is created in the API with an empty `spec.nodeName`, the kube-scheduler picks a node and writes a binding, and that node's kubelet sees the Pod and starts it. Static Pods take a different path: the kubelet reads a manifest from its local `staticPodPath` directory and starts the Pod itself, then creates a mirror Pod in the API so you can see it.",
   "The differences matter for troubleshooting. Scheduler-placed Pods are usually owned by controllers (ReplicaSets, DaemonSets, Jobs) and can be managed fully through kubectl. Static Pods are owned by the node: they cannot be moved, scaled or truly deleted via the API, cannot reference ConfigMaps, Secrets or ServiceAccounts in the normal way, and exist only on the node that has the file. You can recognize a mirror Pod by the node name suffix and by its `ownerReferences`, which point to the Node object, and by the `kubernetes.io/config.mirror` annotation.",
   "Now consider the scheduler going down, for example because someone broke `/etc/kubernetes/manifests/kube-scheduler.yaml`. Running Pods are unaffected; the kubelets keep them running. Controllers keep working too: a Deployment scaled up still gets new Pod objects. But those Pods stay Pending forever with an empty NODE column and, tellingly, no FailedScheduling events at all, because nothing is even trying. DaemonSet Pods are placed by the default scheduler too, so new ones will also wait.",
   "Two kinds of Pods still start. Static Pods, because the kubelet does not need the scheduler. And Pods with `spec.nodeName` already set, because they are effectively pre-bound. That is why setting nodeName is a way to run a Pod in an emergency, and why the control plane itself can come up without a scheduler.",
   "```bash\nkubectl get pods -n kube-system | grep scheduler\nkubectl get pods --field-selector=status.phase=Pending -A\n# on the control plane node\nsudo crictl ps -a | grep scheduler\nsudo crictl logs <container-id>\nsudo vi /etc/kubernetes/manifests/kube-scheduler.yaml\n```",
   "To fix it, look at the scheduler's container logs with crictl or `kubectl logs -n kube-system`, correct the manifest (a wrong image tag, a bad flag, or a wrong kubeconfig path are common), and wait for the kubelet to restart it. Pending Pods are then scheduled automatically. Note that Pods can also request a different scheduler with `spec.schedulerName`; if that scheduler does not exist, they stay Pending in exactly the same silent way."
  ],
  "terms": [
   [
    "Binding",
    "The act of assigning a Pod to a node, recorded by setting spec.nodeName."
   ],
   [
    "Mirror Pod",
    "The API representation of a static Pod, owned by the Node and not editable."
   ],
   [
    "schedulerName",
    "A Pod field naming which scheduler should place it, default-scheduler by default."
   ]
  ],
  "example": "All new Pods in the cluster are Pending with no events. `kubectl get pods -n kube-system` shows kube-scheduler-cp1 in CrashLoopBackOff, and its logs complain about an unknown flag. Removing the bad flag from the manifest restarts the scheduler, and the backlog of Pending Pods is scheduled within seconds.",
  "tip": "Pending with a FailedScheduling event means the scheduler ran and found no node. Pending with no events at all suggests the scheduler is not running or the Pod names a scheduler that does not exist.",
  "check": [
   [
    "Which Pods can still start while the scheduler is down?",
    "Static Pods and Pods with spec.nodeName already set."
   ],
   [
    "How can you tell a mirror Pod apart from a normal Pod?",
    "Its name ends in the node name, its owner reference is the Node, and it carries the config.mirror annotation."
   ]
  ]
 },
 {
  "t": "Kubernetes network model: one IP per Pod, NAT-free Pod-to-Pod traffic, the CNI plugin's role, Pod and Service CIDRs",
  "body": [
   "Kubernetes makes networking simple for applications by setting a few strict rules and leaving the implementation to a plugin. Understanding the rules helps you reason about any connectivity problem.",
   "The model has three requirements. Every Pod gets its own IP address, shared by all containers in the Pod. Every Pod can communicate with every other Pod on any node without network address translation (NAT), so the source IP a receiver sees is the sender's real Pod IP. And agents on a node, such as the kubelet, can reach all Pods on that node. Within a Pod, containers share one network namespace, so they talk over `localhost` and must not use the same port. A small pause (sandbox) container holds that namespace open.",
   "Kubernetes itself does not implement these rules. The Container Network Interface (CNI) plugin does. When the kubelet creates a Pod sandbox, the runtime calls the CNI plugin, which creates a virtual interface in the Pod's network namespace, assigns an IP from the node's range and sets up routes. Between nodes, the plugin either routes Pod traffic natively (for example with BGP) or encapsulates it in an overlay such as VXLAN. Without a working CNI, Pods get stuck in ContainerCreating and nodes stay NotReady.",
   "Two address ranges must not overlap with each other or with your node network. The Pod CIDR is the range Pods draw from, set with `kubeadm init --pod-network-cidr` (it becomes the controller-manager's `--cluster-cidr`). With node IPAM, each node gets a slice recorded in `node.spec.podCIDR`, though many CNIs manage their own allocation. The Service CIDR is the range for Service virtual IPs, set by the API server's `--service-cluster-ip-range`; kubeadm's default is `10.96.0.0/12`, which is why the `kubernetes` Service is often 10.96.0.1 and CoreDNS is often 10.96.0.10.",
   "```bash\nkubectl get pods -o wide                     # Pod IPs and nodes\nkubectl get nodes -o jsonpath='{.items[*].spec.podCIDR}'\ngrep service-cluster-ip-range /etc/kubernetes/manifests/kube-apiserver.yaml\nkubectl cluster-info dump | grep -m1 cluster-cidr\n```",
   "Service IPs are different from Pod IPs: no interface owns them, and they exist only as forwarding rules programmed by kube-proxy (or a replacement such as Cilium). Pod IPs are real, routable addresses inside the cluster network. Keep that distinction in mind: pinging a Service IP often fails even when the Service works fine, while pinging a Pod IP should normally succeed."
  ],
  "terms": [
   [
    "Pod CIDR",
    "The address range from which Pod IPs are allocated, set at cluster creation."
   ],
   [
    "Service CIDR",
    "The address range for Service ClusterIPs, set by --service-cluster-ip-range."
   ],
   [
    "Pause container",
    "The sandbox container that holds a Pod's shared network namespace."
   ],
   [
    "Overlay network",
    "An encapsulation (such as VXLAN) that carries Pod traffic between nodes over the node network."
   ]
  ],
  "example": "A new cluster was built with a Pod CIDR of 192.168.0.0/16 while the nodes themselves are on 192.168.1.0/24. Pods on different nodes cannot reach each other and some node traffic is misrouted. Rebuilding with a non-overlapping Pod CIDR such as 10.244.0.0/16 fixes it, showing why ranges must be planned first.",
  "tip": "Remember which component owns which range: the Pod CIDR is used by the CNI and controller-manager, the Service CIDR by the API server and kube-proxy. They must not overlap each other or the node subnet.",
  "check": [
   [
    "Do Pods need NAT to talk to Pods on other nodes?",
    "No, the network model requires NAT-free Pod-to-Pod communication."
   ],
   [
    "Where do you find the Service CIDR on a kubeadm cluster?",
    "In the --service-cluster-ip-range flag of the kube-apiserver static Pod manifest."
   ]
  ]
 },
 {
  "t": "kube-proxy modes (iptables, IPVS, nftables) and how Service virtual IPs work",
  "body": [
   "A Service's ClusterIP is virtual: no machine owns it and no process listens on it. Instead, kube-proxy on every node watches Services and EndpointSlices and programs the node's kernel so that packets sent to ClusterIP:port are rewritten (destination NAT) to one of the ready backend Pod IPs. Because every node has the same rules, a client Pod anywhere can reach any Service.",
   "kube-proxy supports several modes on Linux. In `iptables` mode, long the default, it creates chains in the nat table: `KUBE-SERVICES` matches the ClusterIP and port, jumps to a per-Service `KUBE-SVC-...` chain that picks a backend with random probability, and a per-endpoint `KUBE-SEP-...` chain performs the DNAT. It is reliable but rule evaluation grows with the number of Services, so very large clusters see slower updates.",
   "In `ipvs` mode, kube-proxy uses the kernel's IP Virtual Server load balancer. It creates a dummy interface, `kube-ipvs0`, holding the ClusterIPs, and IPVS virtual servers with real servers for each Pod. IPVS uses hash tables, scales better with many Services and offers several scheduling algorithms such as round robin and least connections. It needs the IPVS kernel modules and you inspect it with `ipvsadm -Ln`.",
   "In `nftables` mode, kube-proxy programs the newer nftables framework instead of iptables. It aims to combine good performance at scale with the familiar iptables-style model and is the direction the project is moving. Inspect it with `nft list table ip kube-proxy`. Which modes are available and which is recommended depends on your Kubernetes and kernel versions, so check the documentation for the version you run.",
   "On kubeadm clusters, kube-proxy runs as a DaemonSet in kube-system and reads its configuration from the `kube-proxy` ConfigMap. The `mode` field selects the mode; an empty value means the default for the platform. After editing the ConfigMap, restart the DaemonSet so the Pods pick it up.",
   "```bash\nkubectl -n kube-system get cm kube-proxy -o yaml | grep mode\nkubectl -n kube-system rollout restart ds kube-proxy\nkubectl -n kube-system logs ds/kube-proxy | head   # shows the proxier in use\nsudo iptables -t nat -L KUBE-SERVICES -n | grep <cluster-ip>\n```",
   "Because the ClusterIP is only a DNAT rule for specific ports, `ping <ClusterIP>` usually fails even when the Service works. Test with the Service's actual port, for example `curl` or `nc -zv`. Some CNIs, such as Cilium, can replace kube-proxy entirely with eBPF programs; in that case there may be no kube-proxy DaemonSet at all and the rules live in eBPF maps."
  ],
  "terms": [
   [
    "ClusterIP",
    "A virtual IP for a Service, implemented as forwarding rules rather than a real interface."
   ],
   [
    "iptables mode",
    "kube-proxy mode that uses NAT chains (KUBE-SERVICES, KUBE-SVC, KUBE-SEP) to forward Service traffic."
   ],
   [
    "IPVS mode",
    "kube-proxy mode using the kernel's IP Virtual Server hash-based load balancer."
   ],
   [
    "nftables mode",
    "kube-proxy mode that programs rules with the nftables framework."
   ]
  ],
  "example": "A Service works from node01 but not from node02. On node02 the kube-proxy Pod is in CrashLoopBackOff after someone set `mode: ipvsx` in the ConfigMap. Fixing the typo and restarting the DaemonSet restores the rules on node02 and the Service answers from both nodes.",
  "tip": "Do not use ping to test a ClusterIP; test the port. If one node cannot reach Services while others can, suspect that node's kube-proxy Pod first.",
  "check": [
   [
    "Where is kube-proxy's mode configured on a kubeadm cluster?",
    "In the mode field of the kube-proxy ConfigMap in kube-system."
   ],
   [
    "Why does ping to a ClusterIP typically fail?",
    "The ClusterIP exists only as port-specific forwarding rules; nothing answers ICMP on it."
   ]
  ]
 },
 {
  "t": "Service types: ClusterIP, NodePort (30000–32767), LoadBalancer (cloud controller or MetalLB), headless and ExternalName",
  "body": [
   "A Service gives a stable name and address to a changing set of Pods, selected by labels. Its `type` decides who can reach it and how.",
   "ClusterIP is the default. The Service gets a virtual IP from the Service CIDR reachable only inside the cluster, plus a DNS name such as `web.shop.svc.cluster.local`. `port` is what clients connect to; `targetPort` is the container port (a number or a named port) that traffic is forwarded to.",
   "NodePort builds on ClusterIP and additionally opens the same port on every node, from the range 30000 to 32767 unless the API server's `--service-node-port-range` is changed. Clients outside the cluster reach any node's IP on that port. You can let Kubernetes choose the port or set `nodePort` explicitly. LoadBalancer builds on NodePort and asks an external load balancer to be provisioned. In a cloud, the cloud-controller-manager does this. On bare metal or in a lab, nothing does it unless you install something like MetalLB, which assigns addresses from a configured pool. Without one, the Service's EXTERNAL-IP stays `<pending>`, though its NodePort and ClusterIP still work.",
   "```bash\nkubectl expose deployment web --port=80 --target-port=8080 --name=web          # ClusterIP\nkubectl expose deployment web --port=80 --target-port=8080 --type=NodePort --name=web-np\nkubectl create service nodeport web2 --tcp=80:8080 --node-port=30080\nkubectl get svc -o wide\n```",
   "A headless Service sets `clusterIP: None`. It gets no virtual IP and kube-proxy ignores it; instead DNS returns the individual Pod IPs as A records. It is used when clients need to reach specific Pods, most notably by StatefulSets, whose Pods get names like `db-0.db.ns.svc.cluster.local`.",
   "An ExternalName Service has no selector and no proxying at all. It simply makes cluster DNS return a CNAME record pointing to an external hostname given in `spec.externalName`, for example to alias `db.prod.svc.cluster.local` to a managed database's DNS name. Because it is only DNS, ports are not remapped and protocols that check hostnames, such as HTTPS, may be affected.",
   "When you create a Service with `kubectl expose`, it copies the selector from the resource you expose, which is the easiest way to get the labels right. Whatever the type, a Service only sends traffic to Pods that match its selector and are Ready, so the first check for a silent Service is always `kubectl get endpointslices -l kubernetes.io/service-name=<svc>`."
  ],
  "terms": [
   [
    "ClusterIP",
    "The default Service type, reachable only inside the cluster through a virtual IP."
   ],
   [
    "NodePort",
    "A Service type that also opens a port in the 30000–32767 range on every node."
   ],
   [
    "LoadBalancer",
    "A Service type that requests an external load balancer from a cloud controller or MetalLB."
   ],
   [
    "Headless Service",
    "A Service with clusterIP None whose DNS name resolves to Pod IPs directly."
   ],
   [
    "ExternalName",
    "A Service that returns a DNS CNAME to an external hostname, with no proxying."
   ]
  ],
  "example": "On a bare-metal kubeadm lab, a LoadBalancer Service stays at EXTERNAL-IP `<pending>`. You can still reach it through any node's IP and the assigned NodePort. Installing MetalLB with an address pool from the lab subnet gives it an external IP.",
  "tip": "port is the Service's port, targetPort is the container's port, nodePort is the node's port. Mixing up port and targetPort is the most common cause of a Service that exists but refuses connections.",
  "check": [
   [
    "Why does a LoadBalancer Service show EXTERNAL-IP pending on a bare-metal cluster?",
    "Nothing is provisioning load balancers; you need a cloud controller or something like MetalLB."
   ],
   [
    "What does DNS return for a headless Service?",
    "The IP addresses of its ready Pods, instead of a single virtual IP."
   ]
  ]
 },
 {
  "t": "EndpointSlices, Services without selectors, externalTrafficPolicy and sessionAffinity",
  "body": [
   "A Service's selector is not what kube-proxy actually uses. The EndpointSlice controller evaluates the selector and writes the matching Pods' IPs and ports into EndpointSlice objects, and kube-proxy, DNS and ingress controllers consume those. EndpointSlices replaced the older Endpoints API, which could not scale to very large Services because one object held every address.",
   "Each EndpointSlice is labelled `kubernetes.io/service-name=<service>` and holds a limited number of endpoints (100 by default), so a large Service has several slices. Each endpoint records its addresses and conditions: `ready`, `serving` and `terminating`. Pods that fail their readiness probe stay listed but not ready, and kube-proxy stops sending them new traffic.",
   "```bash\nkubectl get endpointslices -l kubernetes.io/service-name=web\nkubectl describe endpointslice <name>\n```",
   "A Service without a selector gets no automatic EndpointSlices. That is useful for pointing a cluster Service at something outside the cluster, such as a database on a fixed IP, while clients still use a normal Service DNS name. You create the Service with ports but no selector, then create an EndpointSlice yourself with the service-name label, `addressType: IPv4`, the endpoint addresses and matching port names.",
   "```yaml\napiVersion: discovery.k8s.io/v1\nkind: EndpointSlice\nmetadata:\n  name: legacy-db-1\n  labels: {kubernetes.io/service-name: legacy-db}\naddressType: IPv4\nports:\n- {name: pg, port: 5432, protocol: TCP}\nendpoints:\n- addresses: [\"10.20.0.15\"]\n```",
   "`externalTrafficPolicy` applies to NodePort and LoadBalancer Services and controls traffic arriving from outside. With `Cluster` (the default), any node accepts the traffic and may forward it to a Pod on another node; load spreads evenly, but the source IP is replaced with the node's, so the application sees the wrong client address. With `Local`, a node only forwards to Pods on itself, the client's source IP is preserved and there is no extra hop, but nodes without a local Pod drop the traffic (cloud load balancers use a health check node port to avoid them), and load can be uneven. `internalTrafficPolicy` is the equivalent for in-cluster traffic.",
   "`sessionAffinity: ClientIP` makes kube-proxy send all connections from the same client IP to the same backend Pod, for a timeout set in `sessionAffinityConfig.clientIP.timeoutSeconds` (10800 seconds, three hours, by default). The default is `None`, which picks a backend per connection. Affinity is by IP only, so many clients behind one NAT gateway all stick to one Pod."
  ],
  "terms": [
   [
    "EndpointSlice",
    "An object listing a subset of a Service's backend addresses, ports and readiness conditions."
   ],
   [
    "Selectorless Service",
    "A Service without a selector whose EndpointSlices you manage manually."
   ],
   [
    "externalTrafficPolicy: Local",
    "Only node-local Pods receive external traffic, preserving the client source IP."
   ],
   [
    "sessionAffinity: ClientIP",
    "Routes a given client IP consistently to the same backend Pod."
   ]
  ],
  "example": "A web application behind a NodePort Service logs every visitor as a node IP, breaking its rate limiting. Setting `externalTrafficPolicy: Local` preserves real client IPs. The team also runs the Pods as a DaemonSet so every node has a local endpoint and no traffic is dropped.",
  "tip": "An empty EndpointSlice means the selector matches no Ready Pods; check labels and readiness before blaming kube-proxy. For externalTrafficPolicy, remember: Local preserves source IP, Cluster spreads load.",
  "check": [
   [
    "Which label links an EndpointSlice to its Service?",
    "kubernetes.io/service-name set to the Service's name."
   ],
   [
    "What is the trade-off of externalTrafficPolicy Local?",
    "It preserves client source IPs and avoids an extra hop, but nodes without local Pods cannot serve the traffic and load may be uneven."
   ]
  ]
 },
 {
  "t": "NetworkPolicies: default deny, ingress and egress rules, podSelector, namespaceSelector (kubernetes.io/metadata.name), ipBlock, ports",
  "body": [
   "By default, every Pod can talk to every other Pod. NetworkPolicies let you restrict that, like a firewall defined with labels. They are enforced by the CNI plugin, so a plugin without policy support (plain Flannel, for example) silently ignores them.",
   "A policy selects Pods with `spec.podSelector` in its own namespace; an empty selector `{}` means all Pods in the namespace. `policyTypes` lists Ingress, Egress or both. Once a Pod is selected by any policy for a direction, only traffic explicitly allowed by some policy is permitted in that direction. Policies are additive allow-lists; there are no deny rules, and multiple policies are combined as a union.",
   "```yaml\n# default deny all ingress and egress in namespace app\napiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata: {name: default-deny, namespace: app}\nspec:\n  podSelector: {}\n  policyTypes: [Ingress, Egress]\n```",
   "Rules list peers in `from` (ingress) or `to` (egress) and optional `ports`. A peer can be a `podSelector` (Pods in the policy's namespace), a `namespaceSelector` (all Pods in matching namespaces) or an `ipBlock` with a `cidr` and optional `except` ranges, typically for traffic outside the cluster. Every namespace automatically carries the label `kubernetes.io/metadata.name=<name>`, so you can select a namespace by name without adding labels.",
   "The single most tested detail is AND versus OR. A podSelector and a namespaceSelector in the same list item mean both: Pods with that label in those namespaces. As two separate items (two dashes) they mean either: any Pod with that label in this namespace, or any Pod in those namespaces.",
   "```yaml\ningress:\n- from:\n  - namespaceSelector:\n      matchLabels: {kubernetes.io/metadata.name: frontend}\n    podSelector:            # same item: AND\n      matchLabels: {app: web}\n  ports:\n  - {protocol: TCP, port: 8080}\negress:\n- to:\n  - namespaceSelector: {}\n    podSelector: {matchLabels: {k8s-app: kube-dns}}\n  ports:\n  - {protocol: UDP, port: 53}\n  - {protocol: TCP, port: 53}\n```",
   "When you add an egress default deny, remember DNS. Without an egress rule allowing UDP and TCP port 53 to the CoreDNS Pods, name lookups fail and it looks as if every connection is broken. Replies to allowed connections are permitted automatically, because enforcement is stateful. Ports can be numbers or named container ports, and `endPort` allows a range.",
   "Test policies with a temporary Pod carrying the right labels, for example `kubectl run t --rm -it --image=busybox -l app=web -n frontend -- wget -qO- -T 2 api.app:8080`."
  ],
  "terms": [
   [
    "NetworkPolicy",
    "A namespaced object that allow-lists ingress and egress traffic for selected Pods."
   ],
   [
    "Default deny",
    "A policy selecting all Pods with no allow rules, blocking all traffic in the listed directions."
   ],
   [
    "namespaceSelector",
    "A peer selector matching all Pods in namespaces whose labels match."
   ],
   [
    "ipBlock",
    "A peer defined by a CIDR range, with optional exceptions."
   ]
  ],
  "example": "After applying a default-deny policy for Egress in namespace `api`, every request fails with a name resolution error. Adding an egress rule allowing port 53 over UDP and TCP to Pods labelled k8s-app=kube-dns in any namespace restores DNS, and further rules then allow only the database port.",
  "tip": "Count the dashes: podSelector and namespaceSelector under one dash are ANDed, under separate dashes are ORed. And egress deny without a DNS exception breaks everything.",
  "check": [
   [
    "How do you select the namespace named monitoring without adding labels to it?",
    "Use a namespaceSelector matching kubernetes.io/metadata.name: monitoring."
   ],
   [
    "If no NetworkPolicy selects a Pod, what traffic is allowed to it?",
    "All traffic; isolation only begins once some policy selects the Pod for that direction."
   ]
  ]
 },
 {
  "t": "Gateway API: GatewayClass, Gateway listeners and allowedRoutes, HTTPRoute parentRefs, matches and weighted backendRefs; installing the CRDs and a controller",
  "body": [
   "Gateway API is the newer, role-oriented way to manage traffic entering the cluster, designed as the successor to Ingress. It splits configuration into resources owned by different people: the infrastructure provider, the cluster operator and application developers.",
   "Gateway API is not built into Kubernetes; it ships as CRDs. You install the CRDs, typically the standard channel manifest from a Gateway API release, and then an implementation (a controller) such as Envoy Gateway, NGINX Gateway Fabric, Istio, Cilium or Contour, each with its own install instructions. Check with `kubectl get crd | grep gateway.networking.k8s.io` and `kubectl get gatewayclass`.",
   "A GatewayClass is cluster-scoped and names the controller that implements it in `controllerName`, much like an IngressClass. A Gateway requests a traffic entry point using a class. Its `listeners` each have a `name`, `protocol` (HTTP, HTTPS, TLS, TCP), `port`, an optional `hostname` and, for HTTPS, a `tls` section referencing certificate Secrets. `allowedRoutes` controls which routes may attach: `namespaces.from` is Same (default), All or Selector, and `kinds` can limit route types.",
   "```yaml\napiVersion: gateway.networking.k8s.io/v1\nkind: Gateway\nmetadata: {name: web-gw, namespace: infra}\nspec:\n  gatewayClassName: example\n  listeners:\n  - name: http\n    protocol: HTTP\n    port: 80\n    allowedRoutes:\n      namespaces: {from: All}\n---\napiVersion: gateway.networking.k8s.io/v1\nkind: HTTPRoute\nmetadata: {name: shop, namespace: shop}\nspec:\n  parentRefs:\n  - {name: web-gw, namespace: infra, sectionName: http}\n  hostnames: [\"shop.example.com\"]\n  rules:\n  - matches:\n    - path: {type: PathPrefix, value: /api}\n    backendRefs:\n    - {name: api-v1, port: 8080, weight: 90}\n    - {name: api-v2, port: 8080, weight: 10}\n```",
   "An HTTPRoute attaches to a Gateway through `parentRefs` (name, namespace if different, and optionally `sectionName` to pick one listener). `hostnames` filter by the Host header. Each rule has `matches`, on path (Exact, PathPrefix or RegularExpression), headers, query parameters or method, optional `filters` such as header modification, redirects or URL rewrites, and `backendRefs` pointing at Services and ports. Weights split traffic proportionally, which makes canary releases simple: 90 and 10 sends about ten percent to v2.",
   "Attachment requires agreement from both sides: the route references the Gateway, and the Gateway's allowedRoutes must permit the route's namespace. A backendRef to a Service in another namespace additionally needs a ReferenceGrant in the target namespace. When something does not work, `kubectl describe` the Gateway and HTTPRoute and read the status conditions: Accepted, Programmed on the Gateway, and ResolvedRefs on routes explain most failures, such as NotAllowedByListeners or BackendNotFound."
  ],
  "terms": [
   [
    "GatewayClass",
    "A cluster-scoped resource naming the controller that implements Gateways of that class."
   ],
   [
    "Gateway",
    "A request for a traffic entry point with one or more listeners."
   ],
   [
    "HTTPRoute",
    "Routing rules that attach to Gateway listeners via parentRefs and forward to backendRefs."
   ],
   [
    "allowedRoutes",
    "Listener setting controlling which namespaces and route kinds may attach."
   ],
   [
    "ReferenceGrant",
    "An object permitting cross-namespace references, such as a route to another namespace's Service."
   ]
  ],
  "example": "An HTTPRoute in namespace shop never receives traffic, and its status shows the parent did not accept it with reason NotAllowedByListeners. The Gateway in namespace infra uses the default allowedRoutes of Same. Changing the listener to `from: All` (or Selector with a label on shop) lets the route attach.",
  "tip": "If a route is ignored, check both sides of attachment: parentRefs (including sectionName and namespace) and the listener's allowedRoutes. The status conditions tell you which side refused.",
  "check": [
   [
    "Which Gateway API resource names the controller implementation?",
    "The GatewayClass, via controllerName."
   ],
   [
    "How do you send roughly 20 percent of traffic to a new version with HTTPRoute?",
    "List both Services in backendRefs with weights such as 80 and 20."
   ]
  ]
 },
 {
  "t": "Ingress controllers, IngressClass and the default class; Ingress rules, path types and TLS",
  "body": [
   "An Ingress is an API object describing HTTP and HTTPS routing from outside the cluster to Services, by hostname and path. On its own it does nothing. An Ingress controller, a reverse proxy such as an NGINX-, HAProxy- or Traefik-based controller running as Pods, watches Ingress objects and configures itself to match. Kubernetes does not ship one, so installing a controller (usually with Helm) is step one. The controller itself is exposed with a NodePort or LoadBalancer Service.",
   "Because a cluster can run several controllers, each Ingress names the one it wants through `spec.ingressClassName`, which refers to an IngressClass object. The IngressClass's `spec.controller` field identifies the controller implementation. An IngressClass annotated with `ingressclass.kubernetes.io/is-default-class: \"true\"` becomes the default, and Ingresses created without a class name are assigned to it. If there is no default and no class name, the Ingress may be ignored by every controller. The older `kubernetes.io/ingress.class` annotation is deprecated.",
   "Each rule has an optional `host` and a list of `paths`, each with a `path`, a `pathType` and a `backend` Service name and port. There are three path types. `Exact` matches the URL path exactly and is case sensitive. `Prefix` matches by path elements split on `/`, so `/api` matches `/api` and `/api/v1` but not `/apiv1`. `ImplementationSpecific` leaves matching to the controller. When several paths match, the longest match wins, and Exact beats Prefix for the same length. A `defaultBackend` catches requests that match no rule.",
   "```yaml\napiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata: {name: shop, namespace: shop}\nspec:\n  ingressClassName: nginx\n  tls:\n  - hosts: [shop.example.com]\n    secretName: shop-tls\n  rules:\n  - host: shop.example.com\n    http:\n      paths:\n      - path: /api\n        pathType: Prefix\n        backend:\n          service: {name: api, port: {number: 8080}}\n      - path: /\n        pathType: Prefix\n        backend:\n          service: {name: frontend, port: {number: 80}}\n```",
   "TLS is configured with a `tls` section listing hosts and a `secretName` that points to a Secret of type `kubernetes.io/tls` in the same namespace as the Ingress, created with `kubectl create secret tls shop-tls --cert=tls.crt --key=tls.key`. The controller then terminates TLS for those hosts. You can create simple Ingresses imperatively, for example `kubectl create ingress shop --class=nginx --rule=\"shop.example.com/api*=api:8080,tls=shop-tls\"`, where a trailing `*` means Prefix.",
   "Controller-specific behaviour, such as URL rewriting, is configured with annotations whose names depend on the controller. The Ingress API is stable but feature-frozen; new capabilities are going into Gateway API. For troubleshooting, `kubectl describe ingress` shows the resolved backends and events, the ADDRESS column shows whether a controller picked it up, and the controller Pod's logs show configuration errors."
  ],
  "terms": [
   [
    "Ingress controller",
    "A proxy running in the cluster that implements Ingress objects."
   ],
   [
    "IngressClass",
    "A cluster-scoped object linking an Ingress to a specific controller."
   ],
   [
    "Default IngressClass",
    "The class annotated is-default-class true, used when an Ingress sets no ingressClassName."
   ],
   [
    "pathType",
    "Exact, Prefix (element-wise) or ImplementationSpecific path matching."
   ]
  ],
  "example": "An Ingress created without ingressClassName has an empty ADDRESS and does not route. `kubectl get ingressclass` shows one class, nginx, with no default annotation. Either setting `ingressClassName: nginx` on the Ingress or annotating the class as default makes the controller adopt it.",
  "tip": "Prefix matching is by path segment, not string prefix: /app matches /app/x but not /application. And the TLS Secret must live in the same namespace as the Ingress.",
  "check": [
   [
    "Does the path /shop with pathType Prefix match /shopping?",
    "No; Prefix matches whole path elements, so it matches /shop and /shop/... only."
   ],
   [
    "What makes an IngressClass the default?",
    "The annotation ingressclass.kubernetes.io/is-default-class set to \"true\"."
   ]
  ]
 },
 {
  "t": "CoreDNS: the coredns ConfigMap and Corefile, forwarding and stub zones, Service and Pod DNS records, dnsPolicy",
  "body": [
   "CoreDNS is the cluster DNS server. On kubeadm clusters it runs as the `coredns` Deployment in kube-system, exposed by a Service still named `kube-dns` for compatibility, usually at the tenth address of the Service CIDR (10.96.0.10 with kubeadm's default). The kubelet writes that address into every Pod's `/etc/resolv.conf`.",
   "Its configuration is the Corefile, stored in the `coredns` ConfigMap. Each server block names the zones it serves and a chain of plugins. A typical default block for the root zone includes `errors`, `health`, `ready`, the `kubernetes` plugin that answers for `cluster.local` and reverse zones, `prometheus` metrics, `forward . /etc/resolv.conf` to send everything else to the node's upstream resolvers, `cache`, `loop`, `reload` and `loadbalance`.",
   "```\n.:53 {\n    errors\n    health\n    ready\n    kubernetes cluster.local in-addr.arpa ip6.arpa {\n       pods insecure\n       fallthrough in-addr.arpa ip6.arpa\n    }\n    forward . /etc/resolv.conf\n    cache 30\n    loop\n    reload\n    loadbalance\n}\ncorp.internal:53 {\n    forward . 10.0.0.53\n}\n```",
   "To send a private domain to a specific DNS server, a so-called stub zone, add a separate server block for that zone with its own `forward`, as the `corp.internal` block above does. To change upstream resolvers for everything else, change the target of `forward .`. Edit with `kubectl -n kube-system edit cm coredns`; the `reload` plugin picks up the change after a short delay, or you can `kubectl -n kube-system rollout restart deploy coredns`.",
   "Know the record formats. A normal Service gets an A (or AAAA) record `<svc>.<ns>.svc.cluster.local` pointing to its ClusterIP, and SRV records for named ports, `_<port>._<proto>.<svc>.<ns>.svc.cluster.local`. A headless Service's name resolves to its Pods' IPs, and StatefulSet Pods get `<pod>.<svc>.<ns>.svc.cluster.local`. Pods have records of the form `10-244-1-5.<ns>.pod.cluster.local`, their IP with dashes. Pod resolv.conf includes search domains `<ns>.svc.cluster.local svc.cluster.local cluster.local` and `ndots:5`, which is why a bare `web` works inside the same namespace and `web.other` works across namespaces.",
   "A Pod's `dnsPolicy` controls this. `ClusterFirst` (the default) uses cluster DNS and forwards other names upstream. `Default` inherits the node's resolv.conf, so cluster names do not resolve. `ClusterFirstWithHostNet` is what Pods with `hostNetwork: true` need to still use cluster DNS. `None` ignores all of it and uses only the `dnsConfig` you supply (nameservers, searches, options)."
  ],
  "terms": [
   [
    "Corefile",
    "CoreDNS's configuration, held in the coredns ConfigMap, made of server blocks and plugins."
   ],
   [
    "forward plugin",
    "Sends queries CoreDNS is not authoritative for to upstream resolvers."
   ],
   [
    "Stub zone",
    "A server block that forwards a specific domain to designated DNS servers."
   ],
   [
    "dnsPolicy",
    "Pod setting choosing ClusterFirst, Default, ClusterFirstWithHostNet or None DNS behaviour."
   ]
  ],
  "example": "Developers need `*.corp.internal` names to resolve from Pods, but the node resolvers do not know them. You add a `corp.internal:53 { forward . 10.0.0.53 }` block to the coredns ConfigMap, wait for reload, and `nslookup db.corp.internal` from a test Pod now returns the internal address.",
  "tip": "The Service is called kube-dns but the Pods and ConfigMap are called coredns. dnsPolicy Default is not the default; ClusterFirst is.",
  "check": [
   [
    "What is the fully qualified DNS name of Service api in namespace shop?",
    "api.shop.svc.cluster.local."
   ],
   [
    "Which dnsPolicy should a hostNetwork Pod use to resolve cluster Services?",
    "ClusterFirstWithHostNet."
   ],
   [
    "How do you forward a single private domain to a specific DNS server?",
    "Add a server block for that zone in the Corefile with its own forward directive."
   ]
  ]
 },
 {
  "t": "Testing connectivity with temporary Pods (busybox, nicolaka/netshoot), nslookup, curl and nc",
  "body": [
   "Many CKA tasks end with 'verify that ...', and many troubleshooting tasks start with 'Pod A cannot reach B'. The fastest tool is a throwaway Pod inside the cluster, because it sees the network exactly as your workloads do, including DNS and NetworkPolicies.",
   "`kubectl run` with `--rm -it --restart=Never` creates a Pod, attaches your terminal and deletes it when you exit. Put it in the right namespace with `-n`, and give it labels with `-l` if a NetworkPolicy decides access by label. You can also run a single command instead of a shell.",
   "```bash\nkubectl run tmp --rm -it --restart=Never --image=busybox -- sh\nkubectl run tmp --rm -it --restart=Never --image=busybox -n frontend -l app=web -- \\\n  wget -qO- -T 3 api.backend:8080/health\nkubectl run dns --rm -it --restart=Never --image=busybox -- nslookup kubernetes.default\nkubectl run net --rm -it --restart=Never --image=nicolaka/netshoot -- bash\n```",
   "busybox is tiny and quick to pull. It includes `nslookup`, `wget`, `nc` and `ping`, but not `curl`, so use `wget -qO- <url>` for HTTP. nicolaka/netshoot is a larger image packed with network tools: `curl`, `dig`, `nslookup`, `nc`, `tcpdump`, `ip`, `ss`, `traceroute` and more. Use it when you need detail. Some exam environments may restrict which images can be pulled, so be comfortable with whatever a task provides.",
   "Test in layers, so a failure tells you something. First DNS: `nslookup api.backend.svc.cluster.local` should return the ClusterIP; if it fails, go to DNS troubleshooting. Then the Service: `nc -zv -w 3 api.backend 8080` or `curl -m 3 api.backend:8080` tests the port through kube-proxy. Then a Pod directly by its IP from `kubectl get pods -o wide`, which bypasses the Service. If the Pod IP works but the Service does not, look at selectors, targetPort and EndpointSlices. If neither works, suspect the application, a NetworkPolicy or the CNI.",
   "Use explicit timeouts (`-T` for busybox wget, `-m` for curl, `-w` for nc) so a blocked connection fails in seconds instead of hanging, which saves real exam time. A timeout usually indicates a policy drop or routing problem, while 'connection refused' means a host answered but nothing listens on that port.",
   "You can also test from an existing Pod with `kubectl exec -it <pod> -- sh`, if its image has tools, or attach a debug container with `kubectl debug -it <pod> --image=busybox --target=<container>`. The debug container shares the Pod's network namespace, and `--target` also lets it see that container's processes. Remember to clean up anything you created without `--rm`."
  ],
  "terms": [
   [
    "kubectl run --rm -it",
    "Creates an interactive temporary Pod that is deleted when the session ends."
   ],
   [
    "busybox",
    "A minimal image with basic tools such as nslookup, wget and nc, but no curl."
   ],
   [
    "nicolaka/netshoot",
    "A troubleshooting image containing many networking tools including curl, dig and tcpdump."
   ],
   [
    "Connection refused vs timeout",
    "Refused means nothing listens on the port; timeout usually means traffic is dropped or unroutable."
   ]
  ],
  "example": "Pods in namespace frontend cannot reach Service api in backend. From a temporary busybox Pod labelled like the frontend, nslookup resolves the name, but `nc -zv -w 3 api.backend 8080` times out, while the same test to the Pod IP also times out. Checking NetworkPolicies in backend reveals a default deny with no rule for the frontend namespace.",
  "tip": "Always test from a Pod with the same namespace and labels as the real client, or NetworkPolicy results will mislead you. And busybox has wget, not curl.",
  "check": [
   [
    "What flag combination creates a temporary interactive Pod that is removed on exit?",
    "`kubectl run <name> --rm -it --restart=Never --image=<image> -- <cmd>`."
   ],
   [
    "If a Pod IP responds but its Service does not, where should you look?",
    "At the Service's selector, port and targetPort, and its EndpointSlices."
   ]
  ]
 },
 {
  "t": "Volumes vs PersistentVolumes; PV and PVC lifecycle (Available, Bound, Released) and binding rules",
  "body": [
   "A container's own filesystem disappears when the container restarts. Volumes solve that, and Kubernetes offers two levels of abstraction for them.",
   "A volume is declared directly in a Pod's `spec.volumes` and mounted with `volumeMounts`. Some volume types live and die with the Pod: `emptyDir` is scratch space shared by the Pod's containers and deleted when the Pod is removed from the node. Others reference something external, like `configMap`, `secret`, `hostPath` or an NFS share. Pod-level volumes tie the workload to specific storage details, which is awkward for developers and not portable.",
   "PersistentVolumes (PVs) separate storage supply from demand. A PV is a cluster-scoped object representing a real piece of storage, with a capacity, access modes, a reclaim policy and backend details, created by an administrator or automatically by a provisioner. A PersistentVolumeClaim (PVC) is a namespaced request: 'I need 5Gi, ReadWriteOnce, of class fast'. The Pod then uses a `persistentVolumeClaim` volume that names the claim, so the Pod spec does not care what storage is behind it.",
   "```yaml\napiVersion: v1\nkind: PersistentVolumeClaim\nmetadata: {name: data, namespace: app}\nspec:\n  accessModes: [ReadWriteOnce]\n  storageClassName: manual\n  resources:\n    requests: {storage: 1Gi}\n---\n# in the Pod spec\nvolumes:\n- name: data\n  persistentVolumeClaim: {claimName: data}\n```",
   "The PV lifecycle has four phases. `Available`: free and not bound. `Bound`: exclusively bound to one PVC; the binding is one-to-one, and a large PV bound to a small claim gives the whole PV to it. `Released`: its PVC was deleted but the resource has not yet been reclaimed, and it cannot bind to a new claim automatically because it still records the old `claimRef`. `Failed`: automatic reclamation failed.",
   "The control plane binds a PVC to a PV only when all of these match: the `storageClassName` is the same (an empty string matches only PVs with no class), the PV supports the requested access modes, its capacity is at least the requested size, its `volumeMode` (Filesystem or Block) matches, and any label `selector` on the PVC matches the PV. If nothing matches and no provisioner can create a PV, the PVC stays `Pending`, and so does any Pod using it. You can force a specific pairing with `spec.volumeName` on the PVC or a `claimRef` on the PV.",
   "Check the state with `kubectl get pv,pvc -A`; the STATUS and CLAIM columns tell the story. `kubectl describe pvc` shows events explaining why a claim is not binding."
  ],
  "terms": [
   [
    "PersistentVolume",
    "A cluster-scoped object representing a piece of storage and its properties."
   ],
   [
    "PersistentVolumeClaim",
    "A namespaced request for storage that binds to a matching PV."
   ],
   [
    "Released",
    "PV phase after its claim is deleted, before the storage is reclaimed or manually freed."
   ],
   [
    "emptyDir",
    "A Pod-scoped scratch volume removed when the Pod leaves the node."
   ]
  ],
  "example": "A PVC asking for 2Gi ReadWriteOnce with storageClassName manual stays Pending. The only PV is 5Gi ReadWriteOnce but has storageClassName slow. Changing the PVC to class slow (or creating a matching manual PV) lets it bind, and the PVC then shows the full 5Gi capacity.",
  "tip": "Pending PVCs are almost always a mismatch in storageClassName, access mode, size or selector. Compare the PVC and PV fields side by side with kubectl get -o yaml.",
  "check": [
   [
    "Can one PV be bound to two PVCs?",
    "No, PV-to-PVC binding is exclusive and one-to-one."
   ],
   [
    "Why won't a Released PV bind to a new PVC automatically?",
    "It still holds a claimRef to the deleted claim and may contain old data."
   ]
  ]
 },
 {
  "t": "Access modes: ReadWriteOnce, ReadOnlyMany, ReadWriteMany, ReadWriteOncePod",
  "body": [
   "Access modes describe how a volume can be mounted. They appear in both PVs (what the storage supports) and PVCs (what the workload needs), and a claim only binds to a volume that supports the requested modes. There are four, each with a short form you will see in kubectl output.",
   "ReadWriteOnce (RWO) means the volume can be mounted read-write by a single node. It is the most common mode and what typical block storage, such as a cloud disk or an iSCSI LUN, supports. Note the word node: several Pods on the same node can use an RWO volume at the same time. If a second Pod that needs the volume is scheduled onto a different node, it gets stuck in ContainerCreating with a Multi-Attach error.",
   "ReadOnlyMany (ROX) means many nodes can mount the volume read-only. It suits shared reference data or static content. ReadWriteMany (RWX) means many nodes can mount it read-write at the same time; it requires shared or network file storage such as NFS, CephFS or cloud file services. Block devices formatted with an ordinary filesystem cannot safely support RWX, because two machines writing the same filesystem would corrupt it.",
   "ReadWriteOncePod (RWOP) restricts the volume to a single Pod in the whole cluster. It is useful when an application must be the only writer, for example to prevent a second replica from starting against the same data. It is supported only for CSI volumes, and it is enforced: a second Pod using the claim will not start.",
   "```yaml\nspec:\n  accessModes:\n  - ReadWriteOncePod\n  resources:\n    requests: {storage: 10Gi}\n```",
   "Important subtleties are tested. A PV can list several modes it supports, but a given volume is only mounted using one mode at a time. Access modes are matching constraints for binding and attach decisions, not a general write-protection mechanism; to mount read-only, set `readOnly: true` on the volumeMount or the persistentVolumeClaim volume source. Supported modes depend on the volume plugin or CSI driver, so check the driver's documentation rather than assuming.",
   "In `kubectl get pv`, the ACCESS MODES column shows RWO, ROX, RWX or RWOP. When choosing a mode, ask where the Pods will run: one Pod, one node, or many nodes. A Deployment with several replicas spread across nodes that all write the same data needs RWX; a StatefulSet usually gives each replica its own RWO claim instead."
  ],
  "terms": [
   [
    "ReadWriteOnce (RWO)",
    "Read-write by a single node; multiple Pods on that node may share it."
   ],
   [
    "ReadOnlyMany (ROX)",
    "Read-only by many nodes."
   ],
   [
    "ReadWriteMany (RWX)",
    "Read-write by many nodes, requiring shared file storage."
   ],
   [
    "ReadWriteOncePod (RWOP)",
    "Read-write by exactly one Pod cluster-wide, supported for CSI volumes."
   ]
  ],
  "example": "A 3-replica Deployment shares one RWO PVC. The Pods on node01 run, but the replica scheduled on node02 is stuck with a Multi-Attach error. Switching to an NFS-backed RWX StorageClass, or converting to a StatefulSet with per-replica claims, resolves it.",
  "tip": "RWO is per node, not per Pod. If the question says only one Pod may ever use the volume, the answer is ReadWriteOncePod.",
  "check": [
   [
    "Can two Pods on the same node both mount an RWO volume read-write?",
    "Yes, RWO limits the volume to one node, not one Pod."
   ],
   [
    "Which access mode requires shared storage such as NFS?",
    "ReadWriteMany."
   ]
  ]
 },
 {
  "t": "Reclaim policies: Retain and Delete (Recycle deprecated) and cleaning up Released PVs",
  "body": [
   "When a PersistentVolumeClaim is deleted, its PersistentVolume's `persistentVolumeReclaimPolicy` decides what happens to the PV and the underlying storage. Choosing the wrong policy can either destroy data you wanted or leave orphaned storage behind.",
   "`Delete` removes both the PV object and the backing storage asset, such as a cloud disk, when the claim is deleted. It is the default for dynamically provisioned volumes, taken from the StorageClass's `reclaimPolicy` field, which itself defaults to Delete. It keeps the cluster tidy but offers no second chance for the data.",
   "`Retain` keeps the PV and its data. The PV moves to the `Released` phase and is not available for new claims, because it still holds a `claimRef` to the deleted claim and may contain the previous tenant's data. Manually created PVs default to Retain. It is the safe choice for important data.",
   "`Recycle` is deprecated. It used to scrub the volume with a basic delete of its contents and make it Available again, and only worked for some volume types such as NFS and hostPath. The recommended replacement is dynamic provisioning. Know that it exists and that you should not use it.",
   "To reuse a Released PV with Retain, first decide what to do with its data: back it up, delete it, or intentionally keep it for a new claim. Then remove the stale claim reference so the PV becomes Available again. Alternatively, delete the PV object and create a new one pointing at the same storage.",
   "```bash\nkubectl get pv            # STATUS Released, CLAIM app/data\nkubectl patch pv pv-data -p '{\"spec\":{\"claimRef\":null}}'\nkubectl get pv pv-data    # STATUS Available\n# change the policy of an existing (for example dynamically provisioned) PV\nkubectl patch pv pvc-1234 -p '{\"spec\":{\"persistentVolumeReclaimPolicy\":\"Retain\"}}'\n```",
   "Changing a dynamically provisioned PV to Retain before deleting its claim is a common way to protect data during a migration. Remember that deleting a PV object with Retain does not delete the storage asset; you must clean that up in the storage system yourself. Finally, Kubernetes protects in-use objects: a PVC used by a running Pod, or a PV bound to a PVC, gets a protection finalizer, so a delete request leaves it in Terminating until it is no longer in use."
  ],
  "terms": [
   [
    "persistentVolumeReclaimPolicy",
    "The PV field deciding what happens to the volume after its claim is deleted."
   ],
   [
    "Retain",
    "Keeps the PV and data after the claim is deleted; the PV becomes Released."
   ],
   [
    "Delete",
    "Removes the PV and its backing storage when the claim is deleted."
   ],
   [
    "Recycle",
    "A deprecated policy that scrubbed the volume and made it Available again."
   ]
  ],
  "example": "A team deletes a PVC for an old reporting app and later needs the data. Because the PV was manually created with Retain, it sits in Released with the files intact. You copy the data out, clear the claimRef with kubectl patch, and the PV binds to the new app's PVC.",
  "tip": "Dynamic provisioning defaults to Delete. If the exam asks you to preserve data behind a dynamically provisioned claim, patch the PV to Retain before deleting the PVC.",
  "check": [
   [
    "What phase does a Retain PV enter after its claim is deleted?",
    "Released."
   ],
   [
    "How do you make a Released PV Available again?",
    "Clean up or keep the data as appropriate, then remove spec.claimRef, for example with kubectl patch."
   ]
  ]
 },
 {
  "t": "StorageClasses, provisioners and dynamic provisioning; the default StorageClass annotation",
  "body": [
   "Creating PVs by hand does not scale. With dynamic provisioning, a PVC names a StorageClass, and a provisioner automatically creates a matching volume and PV the moment it is needed. This is how most real clusters handle storage.",
   "A StorageClass is a cluster-scoped object describing a 'class' of storage. Its key fields are `provisioner` (which driver creates volumes, usually a CSI driver name), `parameters` (driver-specific options such as disk type or replication), `reclaimPolicy` (Delete by default, or Retain), `volumeBindingMode` (Immediate or WaitForFirstConsumer), `allowVolumeExpansion` and optional `mountOptions`. Core fields such as the provisioner, parameters and reclaim policy cannot be changed after creation, so to change them you create a new class.",
   "```yaml\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata:\n  name: fast\n  annotations:\n    storageclass.kubernetes.io/is-default-class: \"true\"\nprovisioner: example.csi.vendor.com\nparameters:\n  type: ssd\nreclaimPolicy: Delete\nvolumeBindingMode: WaitForFirstConsumer\nallowVolumeExpansion: true\n```",
   "The provisioner does the work. For a CSI driver, an external-provisioner sidecar watches PVCs referencing its class, calls the driver to create a volume, and creates a PV bound to the claim. Lab clusters often use a simple provisioner that carves directories out of node disks, and some classes use `kubernetes.io/no-provisioner`, meaning no dynamic provisioning at all; PVs for that class must be created manually.",
   "One StorageClass can be the default, marked with the annotation `storageclass.kubernetes.io/is-default-class: \"true\"` and shown as `(default)` in `kubectl get storageclass`. A PVC that omits `storageClassName` receives the default class. A PVC that sets `storageClassName: \"\"` explicitly opts out and will only bind to PVs with no class. If more than one class is marked default, recent versions pick the newest, but you should avoid that ambiguity.",
   "```bash\nkubectl get sc\nkubectl patch sc standard -p '{\"metadata\":{\"annotations\":{\"storageclass.kubernetes.io/is-default-class\":\"false\"}}}'\nkubectl patch sc fast -p '{\"metadata\":{\"annotations\":{\"storageclass.kubernetes.io/is-default-class\":\"true\"}}}'\n```",
   "When a dynamic claim stays Pending, run `kubectl describe pvc`. Events such as 'waiting for a volume to be created by external provisioner' point to the provisioner (check its Pods and logs), while 'no persistent volumes available for this claim and no storage class is set' means the claim has no class and no default exists."
  ],
  "terms": [
   [
    "StorageClass",
    "A cluster-scoped description of a type of storage and how to provision it."
   ],
   [
    "Provisioner",
    "The component, usually a CSI driver, that creates volumes for a StorageClass."
   ],
   [
    "Dynamic provisioning",
    "Automatic creation of a PV when a PVC requests a StorageClass."
   ],
   [
    "Default StorageClass",
    "The class annotated is-default-class true, applied to PVCs without storageClassName."
   ]
  ],
  "example": "A task says new PVCs without a class should use `fast` instead of `standard`. You remove the default annotation from standard (set it to false) and add it to fast. A test PVC without storageClassName then gets class fast and a volume is provisioned for it.",
  "tip": "Omitting storageClassName means 'use the default'; setting it to an empty string means 'no class'. They behave very differently.",
  "check": [
   [
    "What annotation makes a StorageClass the default?",
    "storageclass.kubernetes.io/is-default-class: \"true\"."
   ],
   [
    "What reclaim policy do dynamically provisioned PVs get if the StorageClass does not specify one?",
    "Delete."
   ]
  ]
 },
 {
  "t": "volumeBindingMode Immediate vs WaitForFirstConsumer",
  "body": [
   "A StorageClass's `volumeBindingMode` decides when a PVC is bound and, for dynamic provisioning, when the volume is created. The choice matters whenever storage is tied to a topology, such as a zone or a single node.",
   "With `Immediate`, the default, binding and provisioning happen as soon as the PVC is created, before any Pod uses it. That is fine for storage reachable from every node, such as NFS. But for topology-constrained storage, the volume might be created in a zone, or on a node, where the Pod later cannot run, for example because of resource limits, node affinity or taints. The Pod then fails to schedule with a volume node affinity conflict.",
   "With `WaitForFirstConsumer`, binding is delayed until a Pod that uses the PVC is created. The scheduler first chooses a node considering all the Pod's constraints, including which nodes the storage can reach, and only then is the PV provisioned in the right place or a matching static PV selected. Until then, `kubectl get pvc` shows Pending and `kubectl describe pvc` shows an event like 'waiting for first consumer to be created before binding'. That is normal, not an error.",
   "```yaml\napiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata: {name: local-storage}\nprovisioner: kubernetes.io/no-provisioner\nvolumeBindingMode: WaitForFirstConsumer\n```",
   "Local volumes, which are disks attached to a specific node, should always use a class with WaitForFirstConsumer. Otherwise a claim might bind to a local PV on node03 while the Pod's other constraints only allow node01, and the Pod would never schedule. Many cloud CSI StorageClasses also use WaitForFirstConsumer so disks are created in the same zone as the Pod.",
   "There is one trap. Setting `spec.nodeName` directly on a Pod bypasses the scheduler, and with it the logic that triggers delayed binding, so the PVC may never bind. Use node affinity or a nodeSelector instead if you need to steer the Pod.",
   "When diagnosing, remember which mode you are in. A Pending PVC in a WaitForFirstConsumer class with no Pod using it is expected. A Pending PVC in an Immediate class means provisioning or matching failed. And a Pod Pending with 'node(s) had volume node affinity conflict' usually means a volume was bound somewhere the Pod cannot go, often because the class used Immediate."
  ],
  "terms": [
   [
    "volumeBindingMode",
    "StorageClass field controlling when PVCs bind: Immediate or WaitForFirstConsumer."
   ],
   [
    "Immediate",
    "Binds or provisions as soon as the PVC is created, regardless of Pod placement."
   ],
   [
    "WaitForFirstConsumer",
    "Delays binding until a Pod using the claim is scheduled, respecting topology."
   ],
   [
    "Volume node affinity conflict",
    "A scheduling failure where the Pod cannot run on any node the bound volume can reach."
   ]
  ],
  "example": "A learner creates a PVC in the local-storage class and panics when it stays Pending. `kubectl describe pvc` says it is waiting for the first consumer. Creating the Pod that uses it triggers scheduling to node02, the claim binds to node02's local PV, and the Pod starts.",
  "tip": "Pending with 'waiting for first consumer' is the expected state until a Pod uses the claim. Do not set nodeName on such Pods, because it skips the scheduler that triggers binding.",
  "check": [
   [
    "Which binding mode should local volumes use, and why?",
    "WaitForFirstConsumer, so the PV is chosen only after the scheduler picks a node that satisfies all of the Pod's constraints."
   ],
   [
    "What is the default volumeBindingMode?",
    "Immediate."
   ]
  ]
 },
 {
  "t": "Volume expansion with allowVolumeExpansion",
  "body": [
   "Applications grow, and their volumes eventually fill up. Kubernetes lets you enlarge a PersistentVolumeClaim in place, without copying data to a new volume, as long as the storage supports it and the administrator has allowed it.",
   "Permission comes from the StorageClass: `allowVolumeExpansion: true`. Unlike most StorageClass fields, this one can be changed on an existing class, for example with `kubectl patch sc fast -p '{\"allowVolumeExpansion\": true}'`. If it is false or missing, the API server rejects any attempt to increase a PVC's size with an error saying the claim can only be expanded if its StorageClass allows it. The underlying driver must also support expansion; the flag does not add capability that the storage does not have.",
   "To expand, edit the claim, not the PV. Increase `spec.resources.requests.storage` on the PVC with `kubectl edit pvc data` or a patch. The resize controller and the CSI driver then enlarge the backend volume, update the PV's capacity, and finally the filesystem on it is grown by the kubelet on the node where it is mounted.",
   "```bash\nkubectl get sc fast -o jsonpath='{.allowVolumeExpansion}'\nkubectl patch pvc data -n app -p '{\"spec\":{\"resources\":{\"requests\":{\"storage\":\"20Gi\"}}}}'\nkubectl get pvc data -n app -w           # CAPACITY updates when done\nkubectl describe pvc data -n app          # conditions and events\n```",
   "Expansion happens in two stages, and you may see them in the PVC's conditions. First the controller resizes the volume itself (a `Resizing` condition). Then the filesystem must be grown. Many CSI drivers support online expansion, growing the filesystem while the Pod keeps running. With drivers that only support offline expansion, the PVC shows a `FileSystemResizePending` condition and the filesystem is resized the next time a Pod mounts the volume, so you restart the Pod. The PVC's `status.capacity` only reflects the new size once the whole process completes, while `spec` shows what you asked for.",
   "Shrinking is not supported. Decreasing the requested size is rejected. If you accidentally request a much larger size than intended, check your Kubernetes version's documentation about recovering from expansion failures rather than trying to shrink.",
   "Some limits to remember: statically created PVs with no StorageClass cannot be expanded through this mechanism, and a volume can only grow as far as its backend allows. hostPath volumes have no real size enforcement at all and do not support expansion; their capacity is only a label."
  ],
  "terms": [
   [
    "allowVolumeExpansion",
    "StorageClass flag permitting PVCs of that class to be enlarged."
   ],
   [
    "Online expansion",
    "Growing a volume's filesystem while the Pod using it keeps running."
   ],
   [
    "FileSystemResizePending",
    "A PVC condition indicating the filesystem will be resized when a Pod next mounts it."
   ]
  ],
  "example": "A database PVC of 10Gi is 95 percent full. The class already has allowVolumeExpansion true, so you patch the PVC to 20Gi. `kubectl describe pvc` shows Resizing and then the CAPACITY column shows 20Gi, and `df -h` inside the Pod confirms the larger filesystem without a restart because the driver supports online expansion.",
  "tip": "Expand the PVC, never the PV, and only upwards. If the edit is rejected, check allowVolumeExpansion on the claim's StorageClass first.",
  "check": [
   [
    "Which object do you edit to grow a volume?",
    "The PersistentVolumeClaim, by raising spec.resources.requests.storage."
   ],
   [
    "Can you reduce a PVC's size after expanding it?",
    "No, shrinking PVCs is not supported."
   ]
  ]
 },
 {
  "t": "Static PVs: hostPath for labs, local volumes with nodeAffinity, NFS",
  "body": [
   "Without a dynamic provisioner, an administrator creates PersistentVolumes by hand, which is called static provisioning. The CKA often asks you to write such a PV, so know three common backends and their manifests.",
   "`hostPath` mounts a directory from the node's own filesystem. It is ideal for single-node labs but poor for production: the data lives on whichever node the Pod lands on, a rescheduled Pod on another node sees a different (empty) directory, and giving Pods access to host paths is a security risk because a container could read or modify sensitive host files. The optional `type` field, such as `DirectoryOrCreate` or `Directory`, controls whether the path is created or must already exist.",
   "```yaml\napiVersion: v1\nkind: PersistentVolume\nmetadata: {name: pv-log}\nspec:\n  capacity: {storage: 1Gi}\n  accessModes: [ReadWriteOnce]\n  persistentVolumeReclaimPolicy: Retain\n  storageClassName: manual\n  hostPath: {path: /data/log, type: DirectoryOrCreate}\n```",
   "A `local` volume also uses a disk or directory on one node, but does it properly. It requires `nodeAffinity` on the PV naming the node that holds the storage, so the scheduler knows any Pod using it must run there. The path must already exist. Pair local PVs with a StorageClass that has `provisioner: kubernetes.io/no-provisioner` and `volumeBindingMode: WaitForFirstConsumer`, so binding waits until the Pod's placement is known.",
   "```yaml\nspec:\n  capacity: {storage: 50Gi}\n  accessModes: [ReadWriteOnce]\n  storageClassName: local-storage\n  local: {path: /mnt/disks/ssd1}\n  nodeAffinity:\n    required:\n      nodeSelectorTerms:\n      - matchExpressions:\n        - {key: kubernetes.io/hostname, operator: In, values: [node02]}\n```",
   "NFS gives network storage that any node can mount, so it supports ReadWriteMany. The PV specifies the server and the exported path. Every node that may run the Pod needs the NFS client utilities installed (the package name depends on the distribution), otherwise the mount fails with an error in the Pod's events. For dynamic NFS, a CSI driver or an external NFS provisioner can be used instead.",
   "```yaml\nspec:\n  capacity: {storage: 5Gi}\n  accessModes: [ReadWriteMany]\n  storageClassName: nfs\n  nfs: {server: 10.0.0.20, path: /exports/shared}\n```",
   "For all static PVs, the claim must match on class and access mode and request no more than the PV's capacity, and capacity is a label for matching rather than a quota: a hostPath PV of 1Gi does not stop a Pod from writing more. Remember that manually created PVs default to the Retain reclaim policy."
  ],
  "terms": [
   [
    "Static provisioning",
    "Creating PV objects manually for existing storage."
   ],
   [
    "hostPath",
    "A volume type mounting a directory from the node's filesystem; suitable for labs only."
   ],
   [
    "local volume",
    "A PV for node-attached storage that requires nodeAffinity to pin Pods to that node."
   ],
   [
    "NFS volume",
    "Network file storage identified by server and path, usable read-write from many nodes."
   ]
  ],
  "example": "A task asks for a PV named pv-analytics of 100Mi, ReadWriteMany, hostPath /pv/data-analytics. You write the manifest with storageClassName matching the provided PVC, apply it, and `kubectl get pv,pvc` shows both Bound.",
  "tip": "A local PV without nodeAffinity is rejected by the API server. And hostPath data stays on one node; if the Pod moves, its data does not.",
  "check": [
   [
    "What field is required on a local PV that hostPath does not need?",
    "nodeAffinity, identifying the node that holds the storage."
   ],
   [
    "What must be installed on nodes to mount NFS PVs?",
    "The NFS client utilities for the node's operating system."
   ]
  ]
 },
 {
  "t": "CSI drivers and StatefulSet volumeClaimTemplates with PVC retention",
  "body": [
   "The Container Storage Interface (CSI) is how modern Kubernetes storage works: vendors ship drivers that the cluster installs like any other workload. As an administrator you should be able to recognize a driver's parts and see how StatefulSets use the storage it provides.",
   "A CSI driver usually has a controller component, a Deployment or StatefulSet running the driver plus sidecars such as external-provisioner (creates volumes for PVCs), external-attacher (attaches volumes to nodes), external-resizer (expansion) and external-snapshotter, and a node component, a DaemonSet with the driver and a node-driver-registrar sidecar that registers it with each kubelet and performs the actual mounts. Inspect it with `kubectl get csidrivers`, `kubectl get csinodes` and `kubectl get volumeattachments`. A StorageClass refers to the driver by its name in `provisioner`. Volume snapshots use `VolumeSnapshot`, `VolumeSnapshotContent` and `VolumeSnapshotClass` CRDs plus a snapshot controller, which must be installed separately.",
   "StatefulSets use this through `volumeClaimTemplates`. Instead of one PVC shared by all replicas, each Pod gets its own PVC created from the template, named `<template-name>-<statefulset-name>-<ordinal>`, such as `data-db-0`. When `db-1` is rescheduled to another node, it reattaches `data-db-1`, keeping its identity and data together.",
   "```yaml\napiVersion: apps/v1\nkind: StatefulSet\nmetadata: {name: db}\nspec:\n  serviceName: db\n  replicas: 3\n  selector: {matchLabels: {app: db}}\n  persistentVolumeClaimRetentionPolicy:\n    whenDeleted: Retain\n    whenScaled: Delete\n  template:\n    metadata: {labels: {app: db}}\n    spec:\n      containers:\n      - name: db\n        image: postgres:16\n        volumeMounts: [{name: data, mountPath: /var/lib/postgresql/data}]\n  volumeClaimTemplates:\n  - metadata: {name: data}\n    spec:\n      accessModes: [ReadWriteOnce]\n      storageClassName: fast\n      resources: {requests: {storage: 10Gi}}\n```",
   "By default, PVCs created from volumeClaimTemplates are never deleted automatically, whether you scale down or delete the StatefulSet. This protects data but leaves claims, and storage costs, behind. The `persistentVolumeClaimRetentionPolicy` field changes that with two settings. `whenDeleted` applies when the StatefulSet itself is deleted; `whenScaled` applies to Pods removed by scaling down. Each can be `Retain` (the default) or `Delete`. With Delete, the PVCs are removed, and then the PV follows its reclaim policy, which for dynamic volumes is usually Delete too.",
   "Keep in mind that volumeClaimTemplates are largely fixed after creation; changing the template's size does not resize existing PVCs. To grow them, expand each PVC individually. And a StatefulSet Pod stuck Pending often points to its PVC: check `kubectl get pvc` for that ordinal and describe it for provisioner or topology errors."
  ],
  "terms": [
   [
    "CSI driver",
    "A vendor storage plugin, split into controller and per-node components, that implements CSI."
   ],
   [
    "volumeClaimTemplates",
    "StatefulSet field that creates one PVC per Pod ordinal."
   ],
   [
    "persistentVolumeClaimRetentionPolicy",
    "StatefulSet setting controlling whether PVCs are deleted when the set is deleted or scaled down."
   ],
   [
    "VolumeAttachment",
    "An object recording that a CSI volume is attached to a particular node."
   ]
  ],
  "example": "After scaling a test StatefulSet from 5 to 2 replicas, `kubectl get pvc` still lists data-web-2 to data-web-4, consuming storage. Setting `whenScaled: Delete` in the retention policy means future scale-downs clean up claims automatically, and the three leftover PVCs are deleted manually after confirming the data is not needed.",
  "tip": "Default retention is Retain for both whenDeleted and whenScaled, so deleting a StatefulSet does not delete its data. PVC names follow template-statefulset-ordinal.",
  "check": [
   [
    "What is the PVC name for Pod cache-2 of StatefulSet cache with template name store?",
    "store-cache-2."
   ],
   [
    "Which CSI component runs on every node and performs mounts?",
    "The node plugin, typically a DaemonSet with the driver and node-driver-registrar."
   ]
  ]
 },
 {
  "t": "Node problems: NotReady, kubelet status and journalctl -u kubelet, kubelet config and certificates, container runtime down, node conditions (DiskPressure, MemoryPressure)",
  "body": [
   "Troubleshooting is the largest CKA domain, and a node showing NotReady is a classic task. The node's status is reported by its kubelet, so a NotReady node almost always means the kubelet is stopped, misconfigured, cannot reach the API server, or reports that its runtime or network is not ready.",
   "Start from the outside: `kubectl get nodes` and `kubectl describe node node01`. The Conditions section shows `Ready`, `MemoryPressure`, `DiskPressure`, `PIDPressure` and, with some CNIs, `NetworkUnavailable`, each with a reason and message. If Ready is `Unknown` and the message says the kubelet stopped posting node status, the kubelet is not talking to the API server at all. If Ready is `False`, the kubelet is running but reports a problem, such as the container runtime being down or the CNI not initialized.",
   "Then SSH to the node and check the kubelet service. It is a systemd unit, so `systemctl status kubelet` tells you if it is running, and `journalctl -u kubelet` (add `-f` to follow, or `--no-pager | tail -50`) shows why it fails. If it is simply stopped or disabled, `systemctl enable --now kubelet` fixes it.",
   "```bash\nsudo systemctl status kubelet\nsudo journalctl -u kubelet --no-pager | tail -50\nsudo systemctl status containerd\nsudo crictl info | head\ncat /var/lib/kubelet/config.yaml\nsystemctl cat kubelet            # unit and drop-ins, including kubeadm flags\ncat /var/lib/kubelet/kubeadm-flags.env\n```",
   "Common configuration breakages live in a few files. `/var/lib/kubelet/config.yaml` is the KubeletConfiguration (cgroup driver, static Pod path, cluster DNS, certificate settings). `/etc/kubernetes/kubelet.conf` is the kubelet's kubeconfig, including the API server address. The systemd drop-in (view it with `systemctl cat kubelet`) and `/var/lib/kubelet/kubeadm-flags.env` add command-line flags such as the runtime endpoint. A wrong path, port, binary location or typo in any of them shows up clearly in the journal. After fixing, run `systemctl daemon-reload` if you edited a unit file, then `systemctl restart kubelet`.",
   "Certificates matter too. The kubelet's client certificate, typically `/var/lib/kubelet/pki/kubelet-client-current.pem`, is normally rotated automatically. If it has expired or the CA does not match, the journal shows x509 or unauthorized errors. Check expiry with `openssl x509 -noout -enddate -in <file>`.",
   "If the kubelet runs but the runtime is down, the journal complains that it cannot connect to the containerd socket; start containerd and check its own journal. Finally, pressure conditions come from the kubelet's eviction thresholds. DiskPressure appears when the node's filesystem or image filesystem runs low; the kubelet garbage-collects images and may evict Pods, and the node gets a disk-pressure taint so new Pods avoid it. MemoryPressure similarly triggers evictions, starting with Pods that exceed their requests. Free up space or memory and the condition clears."
  ],
  "terms": [
   [
    "NotReady",
    "Node status when the Ready condition is False or Unknown."
   ],
   [
    "journalctl -u kubelet",
    "Shows the kubelet service's logs, the primary source for node-level errors."
   ],
   [
    "Node conditions",
    "Status flags such as Ready, MemoryPressure, DiskPressure and PIDPressure reported by the kubelet."
   ],
   [
    "KubeletConfiguration",
    "The kubelet's config file, typically /var/lib/kubelet/config.yaml."
   ]
  ],
  "example": "node01 is NotReady with status Unknown. On the node, `systemctl status kubelet` shows it failed; the journal says the config file cannot be loaded because the path in the drop-in points to /var/lib/kubelet/confg.yaml. Correcting the typo, running daemon-reload and restarting the kubelet brings node01 back to Ready within a minute.",
  "tip": "Ready Unknown means the kubelet has stopped reporting; Ready False means it reports a problem. In both cases, `systemctl status kubelet` and `journalctl -u kubelet` on the node are your first two commands.",
  "check": [
   [
    "Which command shows the kubelet's systemd unit together with its drop-in files?",
    "`systemctl cat kubelet`."
   ],
   [
    "What does a DiskPressure condition cause the kubelet to do?",
    "Garbage-collect images and evict Pods if needed, and taint the node to keep new Pods away."
   ]
  ]
 },
 {
  "t": "Control plane problems: static Pod manifests, crictl ps/logs when the API server is down, scheduler and controller-manager symptoms, etcd health with etcdctl",
  "body": [
   "On a kubeadm cluster, the control plane components are static Pods defined in `/etc/kubernetes/manifests`. When one breaks, the cause is usually a bad edit to its manifest: a typo in a flag, a wrong certificate path, a wrong port, an invalid image or a YAML indentation error. The skill is working out which component is broken and reading its logs, even when kubectl does not work.",
   "If the API server is down, kubectl fails with 'connection refused' on port 6443 or times out. You cannot use `kubectl logs`, so go to the control plane node and use the container runtime directly. `crictl ps -a` lists all containers, including exited ones; a component that keeps crashing shows a rising attempt count or an Exited state. `crictl logs <container-id>` shows why. If no container exists at all, the kubelet could not even parse the manifest, so check `journalctl -u kubelet` for errors about the static Pod file. Container logs are also on disk under `/var/log/pods/` and `/var/log/containers/`.",
   "```bash\nsudo crictl ps -a | grep -E 'apiserver|etcd|scheduler|controller'\nsudo crictl logs <container-id> 2>&1 | tail -20\nsudo journalctl -u kubelet | grep -i manifest | tail\nsudo ls /var/log/pods/ | grep kube-apiserver\n```",
   "Typical API server errors: it cannot reach etcd (wrong `--etcd-servers` URL or etcd certificate flags), a certificate or key file path does not exist, or a flag is misspelled. After fixing the manifest, wait: the kubelet notices the change, and the API server can take a minute to become ready.",
   "The scheduler and controller-manager fail more quietly, because kubectl still works. Recognize them by symptoms. Scheduler down: new Pods stay Pending with no node and no FailedScheduling events. Controller-manager down: scaling a Deployment does not create Pods, new Deployments get no ReplicaSet, EndpointSlices are not updated, and failed nodes are not marked or cleaned up. Check with `kubectl get pods -n kube-system` and `kubectl logs -n kube-system kube-controller-manager-<node>`, or `kubectl describe` for crash reasons. Common breakages are wrong kubeconfig paths (`/etc/kubernetes/scheduler.conf`, `controller-manager.conf`) or a bad command name in the manifest.",
   "etcd health can be checked with etcdctl using the same certificate flags as for backups. `endpoint health` reports if a member responds, `endpoint status -w table` shows the leader, database size and raft index, and `member list` shows the members. If etcd's data directory or hostPath is wrong, etcd may start empty or fail, and the API server loses its data or cannot start.",
   "```bash\nsudo ETCDCTL_API=3 etcdctl --cacert=/etc/kubernetes/pki/etcd/ca.crt \\\n  --cert=/etc/kubernetes/pki/etcd/server.crt --key=/etc/kubernetes/pki/etcd/server.key \\\n  endpoint health\n```",
   "Before editing any manifest, copy it to a backup location outside the manifests directory. A copy left inside the directory would be started as a second Pod."
  ],
  "terms": [
   [
    "crictl ps -a",
    "Lists all containers on a node from the runtime, including exited ones."
   ],
   [
    "crictl logs",
    "Reads a container's logs directly from the runtime, useful when the API server is down."
   ],
   [
    "etcdctl endpoint health",
    "Checks whether an etcd member is responding."
   ],
   [
    "/var/log/pods",
    "On-disk directory where the kubelet stores container log files per Pod."
   ]
  ],
  "example": "After a colleague changed the API server's certificate paths, kubectl reports connection refused. `crictl ps -a` shows the kube-apiserver container exiting repeatedly, and `crictl logs` says a file under /etc/kubernetes/pki does not exist because of a misspelt filename. Correcting the path in kube-apiserver.yaml brings the API back.",
  "tip": "No container at all in crictl ps -a means the manifest could not be parsed (check the kubelet journal); a crashing container means the component started but rejected its configuration (check crictl logs).",
  "check": [
   [
    "How do you read the API server's logs when kubectl cannot connect?",
    "On the control plane node, find its container with `crictl ps -a` and run `crictl logs <id>`, or read the files under /var/log/pods."
   ],
   [
    "What symptom suggests the controller-manager is down?",
    "Deployments or ReplicaSets do not create or replace Pods even though the API server works."
   ]
  ]
 },
 {
  "t": "Pending Pods: FailedScheduling messages for resources, taints, affinity and unbound PVCs",
  "body": [
   "A Pod in `Pending` has not been placed on a node, or has been placed but not yet started. When the scheduler cannot place it, it records a `FailedScheduling` event, and reading that message carefully usually tells you the exact fix. Run `kubectl describe pod <name>` and look at the Events at the bottom.",
   "The message summarises every node. It looks like: `0/4 nodes are available: 1 node(s) had untolerated taint {node-role.kubernetes.io/control-plane: }, 2 Insufficient cpu, 1 node(s) didn't match Pod's node affinity/selector.` Each phrase is a filter that ruled nodes out, and the counts add up to the total. It may add a note about whether preemption could help.",
   "`Insufficient cpu` or `Insufficient memory` means the Pod's requests do not fit in any node's remaining allocatable capacity. Remember that requests, not actual usage, count. Compare the Pod's requests with `kubectl describe node` (Allocated resources). Fixes: lower the requests if they are unrealistic, free capacity by scaling something down, or add nodes. A ResourceQuota problem looks different: the Pod is never created at all.",
   "`had untolerated taint {key: value}` means the node's taint is not tolerated. Either add a toleration (if the Pod belongs there) or remove the taint with `kubectl taint node <node> key=value:Effect-` (if it should not be there). `node(s) were unschedulable` means the node is cordoned; uncordon it if maintenance is done.",
   "`didn't match Pod's node affinity/selector` means no node has the labels the Pod requires; check `kubectl get nodes --show-labels` against the Pod's nodeSelector or required node affinity, and fix whichever is wrong. `didn't match pod affinity rules` or `didn't match pod anti-affinity rules` means inter-Pod rules cannot be satisfied, for example more replicas than nodes with one-per-node anti-affinity. `didn't match pod topology spread constraints` is the equivalent for spread rules.",
   "Storage problems show as `pod has unbound immediate PersistentVolumeClaims` (the PVC is Pending, so describe the PVC to see why: no matching PV, wrong class, provisioner failing) or `node(s) had volume node affinity conflict` (the bound volume can only be used on nodes the Pod cannot run on).",
   "```bash\nkubectl get pods --field-selector=status.phase=Pending -A\nkubectl describe pod web-7d9 | sed -n '/Events/,$p'\nkubectl get events -n app --field-selector reason=FailedScheduling\n```",
   "If a Pending Pod has no events at all, the scheduler is probably not running or the Pod names a nonexistent schedulerName. If the Pod has a node assigned but is still Pending, scheduling succeeded and the problem is on the node: image pulls, volume mounts or the CNI, visible in the same events list."
  ],
  "terms": [
   [
    "FailedScheduling",
    "Event reason recorded when the scheduler cannot find a suitable node."
   ],
   [
    "Insufficient cpu/memory",
    "Scheduler message meaning the Pod's requests exceed every node's free allocatable capacity."
   ],
   [
    "Untolerated taint",
    "Scheduler message meaning a node's taint has no matching toleration on the Pod."
   ],
   [
    "Unbound immediate PersistentVolumeClaims",
    "Scheduler message meaning a PVC the Pod needs is not bound."
   ]
  ],
  "example": "A Pod is Pending with '0/3 nodes are available: 1 node(s) had untolerated taint {node-role.kubernetes.io/control-plane: }, 2 Insufficient memory.' The Pod requests 8Gi but workers have 4Gi allocatable. Reducing the request to a realistic 1Gi lets it schedule on a worker.",
  "tip": "Read the whole FailedScheduling message: the counts tell you why each group of nodes was rejected, and the fix differs for each. Remember the scheduler uses requests, not live usage.",
  "check": [
   [
    "What does 'node(s) were unschedulable' mean in a FailedScheduling event?",
    "Those nodes are cordoned (spec.unschedulable true)."
   ],
   [
    "A Pod is Pending with 'pod has unbound immediate PersistentVolumeClaims'. What do you check next?",
    "Describe the PVC to see why it is not binding: class, access mode, size or provisioner problems."
   ]
  ]
 },
 {
  "t": "Resource monitoring: metrics-server, kubectl top nodes/pods --sort-by, describe node allocated resources",
  "body": [
   "Two kinds of numbers describe a cluster's resources, and the CKA tests whether you know which is which. Actual usage, how much CPU and memory containers are consuming right now, comes from metrics-server and is shown by `kubectl top`. Reservations, how much has been requested and limited, come from Pod specs and are shown by `kubectl describe node`.",
   "metrics-server collects usage from each kubelet's resource metrics endpoint every few seconds and serves it through the `metrics.k8s.io` API. It keeps only recent values in memory; it is not a monitoring system with history, which is what Prometheus-style tools are for. If it is not installed or not healthy, `kubectl top` fails with an error that metrics are not available. Check with `kubectl get deploy metrics-server -n kube-system` and `kubectl get apiservice v1beta1.metrics.k8s.io`.",
   "```bash\nkubectl top nodes\nkubectl top nodes --sort-by=memory\nkubectl top pods -A --sort-by=cpu\nkubectl top pods -n app --containers\nkubectl top pods -l app=web --sort-by=memory --no-headers | head -1\n```",
   "`kubectl top nodes` shows CPU in millicores and memory, with percentages of allocatable. `kubectl top pods` shows per-Pod usage; `--containers` breaks it down by container, `-A` covers all namespaces, `-l` filters by label and `--sort-by=cpu` or `--sort-by=memory` puts the largest consumer first. A common task: find the Pod using the most CPU with a given label and write its name to a file. Sort, take the first line and extract the name, for example with `awk '{print $1}'`, then check the file contents.",
   "`kubectl describe node <name>` shows `Capacity` (total resources on the machine) and `Allocatable` (what is left for Pods after system and kubelet reservations), then a table of non-terminated Pods with their requests and limits, and an `Allocated resources` summary with totals and percentages of allocatable. This is what the scheduler cares about. Limits can total more than 100 percent, which is called overcommitment; requests cannot exceed allocatable for scheduled Pods.",
   "Comparing the two views explains many puzzles. A node can show 30 percent CPU in top yet refuse new Pods, because its requests are already at 95 percent. Conversely, a node whose requests are low can be under real memory pressure if Pods use far more than they request, leading to evictions. A Pod whose usage in top keeps approaching its memory limit is a candidate for OOMKilled restarts."
  ],
  "terms": [
   [
    "kubectl top",
    "Shows current CPU and memory usage of nodes or Pods using metrics-server."
   ],
   [
    "Allocatable",
    "Node resources available for Pods after system reservations, used by the scheduler."
   ],
   [
    "Allocated resources",
    "The describe node summary of total requests and limits of Pods on the node."
   ],
   [
    "Overcommitment",
    "When the sum of limits on a node exceeds its allocatable capacity."
   ]
  ],
  "example": "A task asks: 'Write the name of the Pod with label app=batch that uses the most memory to /opt/answers/top.txt.' You run `kubectl top pods -A -l app=batch --sort-by=memory --no-headers | head -1`, note the name column (column 2 when -A adds a namespace column), and write it to the file with echo, then cat it to confirm.",
  "tip": "kubectl top shows real usage; describe node shows requests and limits. Scheduling decisions are based on requests, so 'low usage but Pods won't schedule' is a requests problem.",
  "check": [
   [
    "Where would you look to see why the scheduler thinks a node is full?",
    "The Allocated resources section of `kubectl describe node`, which shows the sum of requests against allocatable."
   ],
   [
    "What does kubectl top depend on?",
    "A working metrics-server serving the metrics.k8s.io API."
   ]
  ]
 },
 {
  "t": "Container output streams: kubectl logs options, stdout/stderr vs log files, /var/log/pods and /var/log/containers, sidecar log streaming",
  "body": [
   "Kubernetes logging starts from one convention: containers should write logs to standard output (stdout) and standard error (stderr). The container runtime captures both streams and writes them to files on the node, and `kubectl logs` reads those files through the kubelet. Anything an application writes to a file inside its own container filesystem is invisible to kubectl logs.",
   "`kubectl logs` has options you should know without looking them up. `-c <container>` picks a container in a multi-container Pod (without it, kubectl uses the default container or asks you to choose), and `--all-containers` shows them all. `-p` or `--previous` shows the logs of the previous, crashed instance of a container, which is essential for CrashLoopBackOff because the current instance may have printed nothing yet. `-f` follows, `--tail=50` limits lines, `--since=15m` limits time and `--timestamps` adds times. `-l app=web` reads from Pods matching a label, and `deploy/web` reads from one Pod of a Deployment.",
   "```bash\nkubectl logs web-6c9 -c app --tail=100\nkubectl logs web-6c9 --previous\nkubectl logs -l app=web --all-containers --since=1h\nkubectl logs deploy/web -f\nkubectl logs web-6c9 -c app > /opt/answers/web.log\n```",
   "On the node, the kubelet and runtime store logs under `/var/log/pods/<namespace>_<pod>_<uid>/<container>/`, with numbered files such as `0.log` per container restart. `/var/log/containers/` holds symlinks named `<pod>_<namespace>_<container>-<container-id>.log` pointing to those files; node-level log collectors often tail this directory. These files are rotated by the kubelet by size and count, so very old output is lost, and they disappear when the Pod is deleted. When the API server is down, reading these files or using `crictl logs` is how you see control plane logs.",
   "Some applications can only write to files. The sidecar pattern handles that: add a second container that shares an `emptyDir` volume with the application and streams the file to its own stdout, so kubectl logs and cluster log collectors can see it. Kubernetes also supports native sidecars, declared as init containers with `restartPolicy: Always`, which start before and keep running alongside the main containers.",
   "```yaml\nvolumes:\n- name: logs\n  emptyDir: {}\ncontainers:\n- name: app\n  image: legacy-app:1.0\n  volumeMounts: [{name: logs, mountPath: /var/log/app}]\n- name: log-streamer\n  image: busybox\n  args: [/bin/sh, -c, 'tail -n+1 -F /var/log/app/app.log']\n  volumeMounts: [{name: logs, mountPath: /var/log/app}]\n```",
   "Then `kubectl logs <pod> -c log-streamer` shows the application's file log. Using a separate streamer per log file also keeps different streams separate, for example access and error logs."
  ],
  "terms": [
   [
    "kubectl logs --previous",
    "Shows logs from the last terminated instance of a container."
   ],
   [
    "/var/log/pods",
    "Node directory holding container log files organized by namespace, Pod name and UID."
   ],
   [
    "/var/log/containers",
    "Node directory of symlinks to container log files, commonly tailed by log agents."
   ],
   [
    "Streaming sidecar",
    "A helper container that reads an application's log file from a shared volume and writes it to stdout."
   ]
  ],
  "example": "A legacy app writes only to /var/log/app/app.log, so `kubectl logs` shows nothing. You add a busybox sidecar sharing an emptyDir at that path and running `tail -F` on the file. `kubectl logs legacy -c log-streamer` now shows the application's messages.",
  "tip": "For a CrashLoopBackOff, the useful output is almost always in `kubectl logs <pod> --previous`. For multi-container Pods, always specify -c.",
  "check": [
   [
    "Why can't kubectl logs show a log file an app writes inside its container?",
    "kubectl logs only returns what the container writes to stdout and stderr, which the runtime captures."
   ],
   [
    "How can you make such a file visible to kubectl logs without changing the app?",
    "Add a sidecar that shares the log directory through a volume and tails the file to its own stdout."
   ]
  ]
 },
 {
  "t": "Events: kubectl get events with field selectors and sorting",
  "body": [
   "Events are short records that Kubernetes components emit when something notable happens: a Pod is scheduled, an image is pulled, a probe fails, a volume cannot mount, a node becomes NotReady. They are often the fastest way to learn why something is not working, and `kubectl describe` shows the events related to one object at the bottom of its output.",
   "Each event has a `type` (Normal or Warning), a `reason` (a short CamelCase code such as Scheduled, Pulled, FailedScheduling, BackOff, Unhealthy, FailedMount or Killing), a `message`, the `involvedObject` (kind, name and namespace it concerns), the reporting component, a count and timestamps. Events are namespaced objects, and they are kept only for a limited time, one hour by default on the API server, so they are good for recent problems but not for history.",
   "`kubectl get events` lists them in the current namespace, and `-A` lists all namespaces. The default output order is not guaranteed to be chronological, so sort explicitly. Sorting by `.metadata.creationTimestamp` or `.lastTimestamp` puts the newest at the bottom. Use `-w` to watch new events as they arrive.",
   "```bash\nkubectl get events -n app --sort-by=.metadata.creationTimestamp\nkubectl get events -A --field-selector type=Warning\nkubectl get events -n app --field-selector involvedObject.name=web-6c9\nkubectl get events -A --field-selector reason=FailedScheduling\nkubectl get events -n app --field-selector involvedObject.kind=Node,type=Warning\n```",
   "Field selectors filter on the server side. Useful fields include `type`, `reason`, `involvedObject.kind`, `involvedObject.name` and `involvedObject.namespace`; combine several with commas, which means AND. Use `!=` to exclude, for example `type!=Normal`. Unlike label selectors, only specific fields are supported for each resource, and events support a good set of them.",
   "Newer kubectl versions also include `kubectl events`, which sorts chronologically by default and has convenient flags such as `--for pod/web-6c9` and `--types=Warning`. Both approaches are valid; use whichever you remember under pressure.",
   "Events are also a good source for exam answers. A task might ask you to write all Warning events in a namespace, sorted by time, to a file; redirect the sorted output with `>` and check the file afterwards. And since events expire, if you are investigating something that happened long ago you will need logs instead."
  ],
  "terms": [
   [
    "Event",
    "A namespaced record of something that happened to an object, with type, reason and message."
   ],
   [
    "involvedObject",
    "The object an event refers to; a common field-selector target."
   ],
   [
    "--field-selector",
    "Server-side filtering on supported object fields such as type or reason."
   ],
   [
    "--sort-by",
    "Sorts kubectl output by a JSONPath field, such as .metadata.creationTimestamp."
   ]
  ],
  "example": "Several Pods restarted overnight. `kubectl get events -n app --field-selector type=Warning --sort-by=.lastTimestamp` shows a series of Unhealthy events for liveness probes followed by Killing events on the same containers, pointing to a probe that is too aggressive.",
  "tip": "Events are not sorted by time by default and expire after about an hour; add --sort-by and filter with --field-selector type=Warning to cut the noise quickly.",
  "check": [
   [
    "How do you list only Warning events across all namespaces?",
    "`kubectl get events -A --field-selector type=Warning`."
   ],
   [
    "Why might events for a problem from yesterday be missing?",
    "Events are retained only for a limited time, one hour by default."
   ]
  ]
 },
 {
  "t": "Service and networking problems: selectors, readiness and EndpointSlices, kube-proxy, cross-node CNI traffic, sandbox network errors",
  "body": [
   "Network problems feel mysterious until you follow the path a request takes: client Pod, DNS, Service virtual IP, kube-proxy rules, EndpointSlice, backend Pod, and the CNI network between nodes. Check each hop in order and the fault usually becomes obvious.",
   "Start with the Service and its endpoints. `kubectl get endpointslices -l kubernetes.io/service-name=web` (or `kubectl describe svc web`, which lists endpoints) should show backend IPs. If it is empty, compare the Service's selector with the Pods' labels: `kubectl get svc web -o jsonpath='{.spec.selector}'` and `kubectl get pods --show-labels`. A single typo, such as `app: web` versus `app: webapp`, leaves the Service with no backends. If Pods match but are listed as not ready, their readiness probe is failing; `kubectl describe pod` shows the probe errors. Kubernetes deliberately withholds traffic from unready Pods.",
   "Next check ports. The Service's `targetPort` must match the port the container actually listens on. A mismatch gives 'connection refused' even though endpoints exist. Test the Pod IP and container port directly from a temporary Pod; if that works but the Service does not, the Service definition or kube-proxy is at fault.",
   "If Services fail only from certain nodes, check kube-proxy there: `kubectl get pods -n kube-system -o wide -l k8s-app=kube-proxy`, then its logs. A crashing kube-proxy, a broken kube-proxy ConfigMap, or missing kernel modules for the chosen mode leave that node without Service rules.",
   "```bash\nkubectl describe svc web\nkubectl get endpointslices -l kubernetes.io/service-name=web -o wide\nkubectl get pods -l app=web -o wide\nkubectl logs -n kube-system -l k8s-app=kube-proxy --tail=20\nkubectl get pods -n kube-system -o wide | grep -Ei 'calico|cilium|flannel'\n```",
   "Cross-node problems point at the CNI. If Pods on the same node can reach each other but Pods on different nodes cannot, the overlay or routing between nodes is broken: a CNI agent Pod is down on one node, a firewall between nodes blocks the encapsulation or routing protocol the CNI uses (for example, Flannel's VXLAN traffic over UDP, or Calico's BGP on TCP 179), or the Pod CIDR overlaps the node network.",
   "Finally, sandbox errors. If Pods stay in ContainerCreating with events like 'Failed to create pod sandbox' and a message about the network plugin not being ready or failing to set up the network, the CNI on that node is not working. Check `/etc/cni/net.d/` for a config file, `/opt/cni/bin/` for the plugin binaries, the CNI agent Pod on that node, and whether the plugin has run out of IP addresses in the node's range."
  ],
  "terms": [
   [
    "Empty EndpointSlice",
    "A Service with no backends, usually from a selector mismatch or unready Pods."
   ],
   [
    "Readiness probe",
    "A check that decides whether a Pod receives Service traffic."
   ],
   [
    "Pod sandbox",
    "The Pod's network namespace and pause container, set up via the CNI before containers start."
   ],
   [
    "Cross-node traffic",
    "Pod-to-Pod traffic between nodes, carried by the CNI's overlay or routing."
   ]
  ],
  "example": "Service api returns connection refused. Its EndpointSlice lists three ready Pod IPs on port 80, but the containers listen on 8080. Changing the Service's targetPort to 8080 fixes it, which a direct test to PodIP:8080 had already hinted at.",
  "tip": "Empty endpoints means selector or readiness; endpoints present but refused means targetPort or the app; works on one node but not another means kube-proxy or the CNI on that node.",
  "check": [
   [
    "What is the first thing to check when a Service has no endpoints?",
    "Whether its selector matches the labels of Ready Pods."
   ],
   [
    "Pods on the same node can talk, but not across nodes. What is the likely culprit?",
    "The CNI's inter-node networking: a failing agent, blocked overlay or routing traffic, or overlapping CIDRs."
   ]
  ]
 },
 {
  "t": "DNS problems: CoreDNS Pods and logs, loop detection with systemd-resolved, testing with a temporary Pod",
  "body": [
   "When applications report errors like 'could not resolve host' or 'no such host', the cause is usually one of a small set: CoreDNS is not running, its Service has no endpoints, its configuration is wrong, a NetworkPolicy blocks port 53, or the Pod's own DNS settings are unusual. Work through them in order.",
   "First reproduce the problem from a temporary Pod. `kubectl run dns --rm -it --restart=Never --image=busybox -- nslookup kubernetes.default` should return the `kubernetes` Service's ClusterIP. Then try the failing name, both short and fully qualified (`api.shop.svc.cluster.local`), and an external name. Also inspect the Pod's `/etc/resolv.conf` with `cat`: it should list the kube-dns Service IP as nameserver, the cluster search domains and `options ndots:5`.",
   "Next check CoreDNS itself. Its Pods carry the label `k8s-app=kube-dns` in kube-system.",
   "```bash\nkubectl get pods -n kube-system -l k8s-app=kube-dns -o wide\nkubectl logs -n kube-system -l k8s-app=kube-dns --tail=30\nkubectl get svc kube-dns -n kube-system\nkubectl get endpointslices -n kube-system -l kubernetes.io/service-name=kube-dns\nkubectl get cm coredns -n kube-system -o yaml\n```",
   "If the Pods are Pending right after cluster creation, the CNI is missing. If they are Running but the Service has no endpoints, look at readiness. If the logs show errors, read the Corefile; a typo or a bad `forward` target is common after edits. After fixing the ConfigMap, CoreDNS reloads automatically, or you can restart the Deployment.",
   "A well-known failure is a forwarding loop. CoreDNS's `loop` plugin sends a probe query at startup; if the query comes back to CoreDNS itself, it logs a message that a loop was detected and exits, so the Pods go into CrashLoopBackOff. The typical cause is systemd-resolved on the node: the node's `/etc/resolv.conf` points to the local stub resolver at 127.0.0.53, the kubelet passes that file to CoreDNS, and `forward . /etc/resolv.conf` then sends queries to 127.0.0.53 inside the CoreDNS Pod, which is CoreDNS itself.",
   "The fix is to give the kubelet the real upstream resolver list instead of the stub. On systemd-resolved hosts that file is usually `/run/systemd/resolve/resolv.conf`; set `resolvConf` to it in `/var/lib/kubelet/config.yaml` and restart the kubelet, then restart CoreDNS. kubeadm usually detects systemd-resolved and sets this for you, so the problem appears mostly when someone changed it. An alternative is to point `forward` at explicit upstream IPs. Removing the loop plugin only hides the problem.",
   "Two other checks finish the list. If a namespace has an egress NetworkPolicy, it must allow UDP and TCP port 53 to the CoreDNS Pods. And a Pod with `dnsPolicy: Default` or `hostNetwork: true` without `ClusterFirstWithHostNet` will not resolve cluster names by design."
  ],
  "terms": [
   [
    "loop plugin",
    "CoreDNS plugin that detects forwarding loops and stops CoreDNS if one is found."
   ],
   [
    "systemd-resolved stub",
    "A local resolver at 127.0.0.53 that causes loops if CoreDNS forwards to it."
   ],
   [
    "resolvConf",
    "Kubelet setting naming the resolv.conf file passed to Pods using the Default policy and to CoreDNS."
   ],
   [
    "k8s-app=kube-dns",
    "The label selecting CoreDNS Pods and the kube-dns Service's backends."
   ]
  ],
  "example": "After a node rebuild, CoreDNS Pods on that node crash, and their logs report a loop detected for the root zone. The kubelet config's resolvConf had been changed to /etc/resolv.conf, which points at 127.0.0.53. Setting it back to /run/systemd/resolve/resolv.conf, restarting the kubelet and deleting the CoreDNS Pods fixes resolution.",
  "tip": "CoreDNS in CrashLoopBackOff with a 'Loop detected' log line is the systemd-resolved stub problem; fix the kubelet's resolvConf or the forward target, not the loop plugin.",
  "check": [
   [
    "What label finds the CoreDNS Pods?",
    "k8s-app=kube-dns in the kube-system namespace."
   ],
   [
    "Why does forwarding to 127.0.0.53 cause a loop inside CoreDNS?",
    "Inside the CoreDNS Pod, 127.0.0.53 is local to the Pod, so queries go back to CoreDNS itself instead of the node's resolver."
   ]
  ]
 },
 {
  "t": "Cluster access problems: kubeconfig contexts, expired certificates, connection refused on 6443",
  "body": [
   "Before you can fix anything you need to reach the right cluster. The CKA uses several clusters, and each task tells you which context to use. Access problems are also a troubleshooting topic in their own right.",
   "kubectl reads its configuration from `~/.kube/config` by default, from the files listed in the `KUBECONFIG` environment variable, or from `--kubeconfig`. A kubeconfig has clusters, users and contexts, and a current-context. Know these commands well.",
   "```bash\nkubectl config get-contexts\nkubectl config current-context\nkubectl config use-context prod-admin@prod\nkubectl config set-context --current --namespace=app\nkubectl config view --minify          # only the active context\nkubectl --kubeconfig /etc/kubernetes/admin.conf get nodes\n```",
   "In the exam, run the `use-context` command given at the top of each task before anything else. Working on the wrong cluster is one of the easiest ways to lose points, because your correct answer ends up somewhere the grader does not look.",
   "Error messages point to the layer that failed. 'connection refused' on port 6443 means nothing is listening at the address: the API server is down, the kubeconfig has the wrong host or port, or you are on a machine that cannot reach it. Check the `server:` line of the active cluster with `kubectl config view --minify`, then on the control plane use `crictl ps -a | grep kube-apiserver` and its logs, or `ss -tlnp | grep 6443` to see whether anything listens. A timeout rather than a refusal suggests a firewall or wrong IP.",
   "'x509: certificate has expired or is not yet valid' means a certificate in the chain is outside its validity period. If the client certificate in your kubeconfig expired, you need a new one; if the API server's certificates expired, all clients fail. On kubeadm clusters run `kubeadm certs check-expiration`, then `kubeadm certs renew all`, restart the control plane static Pods and copy the refreshed `/etc/kubernetes/admin.conf` to `~/.kube/config`. 'not yet valid' can also mean the node's clock is wrong. 'x509: certificate signed by unknown authority' means the CA data in the kubeconfig does not match the cluster, often from copying a kubeconfig from another cluster.",
   "Finally, distinguish the two auth failures. 'Unauthorized' (HTTP 401) is authentication: the server does not accept your credentials, such as a revoked token or a certificate from the wrong CA. 'Forbidden' (HTTP 403) is authorization: the server knows who you are, but RBAC does not permit the action. For Forbidden, check bindings with `kubectl auth can-i`; for Unauthorized, check the credentials in the kubeconfig."
  ],
  "terms": [
   [
    "Context",
    "A kubeconfig entry combining a cluster, a user and an optional namespace."
   ],
   [
    "KUBECONFIG",
    "Environment variable listing kubeconfig files for kubectl to merge."
   ],
   [
    "Unauthorized vs Forbidden",
    "401 means authentication failed; 403 means authenticated but not permitted by RBAC."
   ],
   [
    "kubeadm certs renew",
    "Command that renews kubeadm-managed certificates, including those embedded in kubeconfigs."
   ]
  ],
  "example": "One morning every kubectl command fails with an x509 expired error on a lab cluster built a year ago and never upgraded. `kubeadm certs check-expiration` shows everything expired yesterday. You run `kubeadm certs renew all`, restart the control plane Pods by moving the manifests out and back, copy admin.conf to ~/.kube/config and access returns.",
  "tip": "Refused means nothing is listening (API server down or wrong address); x509 means certificates; Unauthorized means credentials; Forbidden means RBAC. The error tells you which layer to fix.",
  "check": [
   [
    "How do you see only the details of the currently active context?",
    "`kubectl config view --minify`."
   ],
   [
    "What is the difference between an Unauthorized and a Forbidden response?",
    "Unauthorized is failed authentication; Forbidden means the identity is known but RBAC denies the action."
   ]
  ]
 },
 {
  "t": "Output handling for tasks: -o jsonpath, custom-columns, --sort-by, writing answers to files",
  "body": [
   "Many CKA tasks end with 'write the result to /opt/answers/...'. The grader reads that file, so its content must be exactly what was asked, often a name, a list or a number. kubectl's output options let you extract precisely the right data without editing by hand.",
   "JSONPath lets you pull fields out of the JSON representation of objects. Look at the structure first with `kubectl get pod web -o json` or `-o yaml`, then write a path starting at the root. For lists, `.items[*]` iterates over all objects. `range` and `end` let you print one item per line, and filters with `?()` select array elements by a condition.",
   "```bash\nkubectl get pods -o jsonpath='{.items[*].metadata.name}'\nkubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{\"\\t\"}{.status.nodeInfo.kubeletVersion}{\"\\n\"}{end}'\nkubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type==\"InternalIP\")].address}'\nkubectl get secret db -o jsonpath='{.data.password}' | base64 -d\n```",
   "Custom columns produce a readable table with headings you choose, each column defined as `NAME:<jsonpath without braces>`. Add `--no-headers` if the task wants only values. Custom columns are often easier than jsonpath for listing several fields per object.",
   "```bash\nkubectl get pods -A -o custom-columns=NS:.metadata.namespace,NAME:.metadata.name,NODE:.spec.nodeName\nkubectl get pv --sort-by=.spec.capacity.storage\nkubectl get pods --sort-by=.metadata.creationTimestamp -o name\nkubectl get pods -A --sort-by='.status.containerStatuses[0].restartCount'\n```",
   "`--sort-by` takes a JSONPath expression (braces optional) and sorts ascending. Combine it with `tail -1` or `head -1` to pick the newest, largest or most restarted. `-o name` prints `pod/web-6c9` style identifiers, and `-o wide` adds IPs and nodes. Remember that `kubectl top` has its own `--sort-by` that only accepts cpu or memory.",
   "When writing to files, use a plain redirect, `> /opt/answers/file.txt`, and then `cat` the file to confirm. Watch for details: does the task want names only or a full table, one per line or space-separated, with or without headers, and with or without the `pod/` prefix? Create the directory if needed. Quoting also matters: wrap jsonpath expressions in single quotes so the shell does not interpret braces, brackets or double quotes inside.",
   "Finally, `kubectl explain pod.spec.containers --recursive` is a quick way to discover field paths you are unsure of, without leaving the terminal."
  ],
  "terms": [
   [
    "-o jsonpath",
    "Output mode that prints values selected by a JSONPath template."
   ],
   [
    "range ... end",
    "JSONPath construct for iterating over a list, commonly used to print one item per line."
   ],
   [
    "-o custom-columns",
    "Output mode that prints a table with user-defined column names and JSONPath values."
   ],
   [
    "--sort-by",
    "Sorts list output by a JSONPath field, in ascending order."
   ]
  ],
  "example": "A task asks for the names of all nodes and their internal IPs, one pair per line, in /opt/answers/nodes.txt. You write a jsonpath range over .items printing the name, a tab and the InternalIP address filter, redirect it to the file, and cat it to confirm three lines.",
  "tip": "Single-quote jsonpath expressions, check the object structure with -o yaml before writing the path, and always cat the answer file afterwards.",
  "check": [
   [
    "How do you print each Pod name on its own line with jsonpath?",
    "`kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name}{\"\\n\"}{end}'`."
   ],
   [
    "How do you sort PersistentVolumes by capacity?",
    "`kubectl get pv --sort-by=.spec.capacity.storage`."
   ]
  ]
 },
 {
  "t": "Stuck Terminating Pods on lost nodes and force deletion",
  "body": [
   "Deleting a Pod is normally a conversation. The API server marks the Pod with a deletion timestamp and a grace period, the kubelet on its node stops the containers, sending SIGTERM and later SIGKILL, and then confirms, after which the Pod object is removed. If the node is powered off, partitioned or its kubelet is dead, no confirmation ever comes, and the Pod stays in `Terminating` indefinitely.",
   "This is deliberate. The control plane cannot tell a dead node from a node that is merely unreachable but still running the Pod. Removing the Pod object too early could allow a replacement to start while the original is still running and writing to the same data. For Deployments that is often tolerable, so after the node's unreachable taint takes effect (the default toleration is 300 seconds), the ReplicaSet creates replacement Pods elsewhere even though the old ones still show Terminating. For StatefulSets it is not tolerable: a StatefulSet will not create a new `db-1` until the old `db-1` is really gone, because it guarantees at most one Pod per identity. So a StatefulSet Pod on a lost node stays down.",
   "When you are certain the node is truly dead or its workloads are stopped, you can force-delete the Pod. This removes the object from the API immediately, without waiting for the kubelet.",
   "```bash\nkubectl get pods -o wide | grep Terminating\nkubectl get node node03            # NotReady / Unknown\nkubectl delete pod db-1 --grace-period=0 --force\n```",
   "kubectl warns that immediate deletion does not wait for confirmation that the process has stopped. That is the risk: if the node comes back with the container still running, you briefly have two copies, which for a database can mean split-brain or corruption. Force deletion is a decision, not a routine cleanup step.",
   "Safer, broader options exist. Deleting the Node object (`kubectl delete node node03`) after confirming it is gone lets the Pod garbage collector remove all Pods bound to it. For a node that was shut down without draining, Kubernetes supports the `node.kubernetes.io/out-of-service` taint (for example with value nodeshutdown and effect NoExecute): applying it tells the control plane the node is really out of service, so its Pods are force-deleted and volumes detached, letting StatefulSet Pods and their volumes move elsewhere. Remove the taint after the node is recovered.",
   "Sometimes a Pod, or any object, is stuck Terminating for another reason: a finalizer that no controller will remove. `kubectl get pod x -o jsonpath='{.metadata.finalizers}'` shows it. Removing finalizers with a patch forces deletion but skips whatever cleanup they guarded, so understand the owner first."
  ],
  "terms": [
   [
    "Terminating",
    "Pod state shown when a deletion timestamp is set but deletion has not been confirmed."
   ],
   [
    "Force deletion",
    "Removing a Pod object immediately with --grace-period=0 --force, without kubelet confirmation."
   ],
   [
    "out-of-service taint",
    "A node taint marking a node as shut down so its Pods and volume attachments are cleaned up."
   ],
   [
    "Grace period",
    "Time allowed between SIGTERM and SIGKILL for a container to shut down, 30 seconds by default."
   ]
  ],
  "example": "node03 lost power. The Deployment's Pods were recreated elsewhere after about five minutes, but StatefulSet Pod mq-2 is still Terminating on node03 and no replacement appears. After confirming with the data centre team that node03 is off, you force-delete mq-2; the StatefulSet recreates it on node01 and it reattaches its volume once the old attachment is cleaned up.",
  "tip": "StatefulSet Pods on a lost node are not replaced automatically; force deletion (or the out-of-service taint) is the fix, but only after confirming the node is really down.",
  "check": [
   [
    "Why does Kubernetes leave a Pod Terminating on an unreachable node rather than deleting it?",
    "It cannot confirm the containers stopped, and deleting too early could let a second copy run at the same time."
   ],
   [
    "What command force-deletes a Pod?",
    "`kubectl delete pod <name> --grace-period=0 --force`."
   ]
  ]
 }
]);
