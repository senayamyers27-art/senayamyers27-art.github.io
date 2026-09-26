/* A simulated Kubernetes cluster for practising kubectl (CKA and CKAD). An in-memory set of
   nodes and objects; a teaching sandbox, not a real cluster (no controllers actually reconcile).
   Commands: kubectl get describe create run expose scale set label annotate taint cordon
   uncordon drain delete rollout logs config auth explain version help, with -n -A -o -l --show-labels.
   Works in the browser (CertHub.kube) and in Node (module.exports) for content checks. */
(function (root) {
  const CMDS = "get describe create run expose scale set label annotate taint cordon uncordon drain delete rollout logs config auth explain version help".split(" ");
  const ALIAS = { po: "Pod", pod: "Pod", pods: "Pod", deploy: "Deployment", deployment: "Deployment", deployments: "Deployment", svc: "Service", service: "Service", services: "Service", no: "Node", node: "Node", nodes: "Node", ns: "Namespace", namespace: "Namespace", namespaces: "Namespace", cm: "ConfigMap", configmap: "ConfigMap", configmaps: "ConfigMap", secret: "Secret", secrets: "Secret", sa: "ServiceAccount", serviceaccount: "ServiceAccount", serviceaccounts: "ServiceAccount", role: "Role", roles: "Role", rolebinding: "RoleBinding", rolebindings: "RoleBinding", rb: "RoleBinding", pvc: "PersistentVolumeClaim", persistentvolumeclaim: "PersistentVolumeClaim", persistentvolumeclaims: "PersistentVolumeClaim", pv: "PersistentVolume", persistentvolume: "PersistentVolume", persistentvolumes: "PersistentVolume", ing: "Ingress", ingress: "Ingress", ingresses: "Ingress", networkpolicy: "NetworkPolicy", networkpolicies: "NetworkPolicy", netpol: "NetworkPolicy", job: "Job", jobs: "Job", cronjob: "CronJob", cronjobs: "CronJob", cj: "CronJob" };
  const REF = { Pod: "pod", Service: "service", Namespace: "namespace", ConfigMap: "configmap", Secret: "secret", ServiceAccount: "serviceaccount", PersistentVolumeClaim: "persistentvolumeclaim", PersistentVolume: "persistentvolume", Deployment: "deployment.apps", Job: "job.batch", CronJob: "cronjob.batch", Role: "role.rbac.authorization.k8s.io", RoleBinding: "rolebinding.rbac.authorization.k8s.io", Ingress: "ingress.networking.k8s.io", NetworkPolicy: "networkpolicy.networking.k8s.io", Node: "node" };
  const CLUSTER = k => k === "Node" || k === "Namespace" || k === "PersistentVolume";
  const kind = s => ALIAS[String(s || "").toLowerCase()] || null;
  const E = m => "error: " + m;

  function normTaint(t) { if (typeof t === "string") { const m = t.match(/^([^=:]+)(?:=([^:]*))?:(.+)$/); return m ? { key: m[1], value: m[2] || "", effect: m[3] } : { key: t, value: "", effect: "NoSchedule" }; } return { key: t.key, value: t.value || "", effect: t.effect || "NoSchedule" }; }
  function normObj(o, defNs) {
    const k = kind(o.kind) || o.kind, obj = { kind: k, name: o.name, ns: CLUSTER(k) ? null : (o.namespace || o.ns || defNs), labels: Object.assign({}, o.labels), ann: Object.assign({}, o.annotations), age: o.age || "10m" };
    ["replicas", "type", "clusterIP", "ports", "data", "rules", "roleRef", "subjects", "capacity", "accessModes", "storageClass", "status", "schedule", "suspend", "completions", "node", "restartPolicy", "ip", "logs", "secretType", "class", "hosts", "podSelector", "claim", "volume", "reclaimPolicy", "restarts", "selector"].forEach(f => { if (o[f] !== undefined) obj[f] = o[f]; });
    if (o.containers) obj.containers = o.containers.map(c => ({ name: c.name, image: c.image }));
    else if (o.image) obj.containers = [{ name: o.name, image: o.image }];
    return obj;
  }

  function create(setup = {}) {
    const S = { ns: setup.namespace || "default", history: [], ran: [], nodes: [], objects: [], namespaces: new Set(["default", "kube-system", "kube-public", "kube-node-lease"]), ctx: setup.context || "kubernetes-admin@kubernetes" };
    S.namespaces.add(S.ns);
    (setup.nodes || []).forEach(n => S.nodes.push({ name: n.name, ready: n.ready !== false, schedulable: n.schedulable !== false, taints: (n.taints || []).map(normTaint), labels: Object.assign({}, n.labels), roles: n.roles || "<none>", version: n.version || "v1.35.0", age: n.age || "20d" }));
    (setup.objects || []).forEach(o => { const obj = normObj(o, S.ns); S.objects.push(obj); if (obj.ns) S.namespaces.add(obj.ns); });
    return S;
  }

  const findObj = (S, k, name, ns) => S.objects.find(o => o.kind === k && o.name === name && (CLUSTER(k) || o.ns === ns));
  const findNode = (S, name) => S.nodes.find(n => n.name === name);
  function podStatus(o) { if (o.status) return o.status; const img = (o.containers && o.containers[0] || {}).image || ""; if (/bad-image|doesnotexist|does-not-exist|:missing/.test(img)) return "ImagePullBackOff"; if (/crash/.test(img)) return "CrashLoopBackOff"; if (/pending/.test(img)) return "Pending"; return "Running"; }
  const labelStr = o => { const e = Object.entries(o.labels || {}); return e.length ? e.map(([k, v]) => k + "=" + v).join(",") : "<none>"; };
  function matchSel(o, sel) { return sel.split(",").every(p => { let m; if (m = p.match(/^(.+?)!=(.+)$/)) return (o.labels || {})[m[1]] !== m[2]; if (m = p.match(/^(.+?)=(.+)$/)) return (o.labels || {})[m[1]] === m[2]; return (o.labels || {})[p] !== undefined; }); }

  function parse(args) {
    const val = new Set(["image", "replicas", "from-literal", "verb", "resource", "role", "clusterrole", "serviceaccount", "user", "tcp", "schedule", "port", "target-port", "type", "name", "labels", "to-revision", "container", "as", "restart"]);
    const multi = { "from-literal": "fromLiteral", verb: "verbs", resource: "resources" };
    const o = { _: [], ns: null, allNs: false, out: null, selector: null, showLabels: false, f: {} };
    for (let i = 0; i < args.length; i++) {
      let a = args[i], eq = a.indexOf("=");
      if (a === "-n" || a === "--namespace") { o.ns = args[++i]; continue; }
      if (a.startsWith("--namespace=")) { o.ns = a.slice(12); continue; }
      if (a === "-A" || a === "--all-namespaces") { o.allNs = true; continue; }
      if (a === "-o") { o.out = args[++i]; continue; }
      if (a.startsWith("-o") && a.length > 2) { o.out = a.slice(2); continue; }
      if (a.startsWith("--output=")) { o.out = a.slice(9); continue; }
      if (a === "-l") { o.selector = args[++i]; continue; }
      if (a.startsWith("-l") && a.length > 2) { o.selector = a.slice(2); continue; }
      if (a.startsWith("--selector=")) { o.selector = a.slice(11); continue; }
      if (a === "--show-labels") { o.showLabels = true; continue; }
      if (a === "-c") { o.f.container = args[++i]; continue; }
      if (a.startsWith("--")) { const name = eq >= 0 ? a.slice(2, eq) : a.slice(2); const v = eq >= 0 ? a.slice(eq + 1) : (val.has(name) ? args[++i] : true); if (multi[name]) (o.f[multi[name]] = o.f[multi[name]] || []).push(v); else o.f[name] = v; continue; }
      o._.push(a);
    }
    return o;
  }
  function tokens(s) { const t = []; let cur = "", q = null, has = false; for (const ch of s) { if (q) { if (ch === q) q = null; else cur += ch; has = true; } else if (ch === '"' || ch === "'") { q = ch; has = true; } else if (/\s/.test(ch)) { if (has) { t.push(cur); cur = ""; has = false; } } else { cur += ch; has = true; } } if (has) t.push(cur); return t; }
  const parseRef = pos => pos[0] && pos[0].includes("/") ? pos[0].split("/") : [pos[0], pos[1]];

  function run(S, line) {
    line = String(line || "").trim(); if (!line) return "";
    S.history.push(line);
    let t = tokens(line); if (t[0] === "kubectl" || t[0] === "k") t = t.slice(1);
    if (!t.length) return E('you must specify a command');
    S.ran.push(t[0]);
    const o = parse(t.slice(1)), cmd = t[0], pos = o._, f = o.f, ns = o.ns || S.ns;
    try { return dispatch(S, cmd, pos, f, o, ns); } catch (e) { return E(e.message); }
  }

  function add(S, obj) { if (findObj(S, obj.kind, obj.name, obj.ns)) return "Error from server (AlreadyExists): " + REF[obj.kind] + ' "' + obj.name + '" already exists'; S.objects.push(obj); if (obj.ns) S.namespaces.add(obj.ns); return REF[obj.kind] + "/" + obj.name + " created"; }
  const mk = (k, name, ns, extra) => Object.assign({ kind: k, name, ns: CLUSTER(k) ? null : ns, labels: {}, ann: {}, age: "5s" }, extra);

  function dispatch(S, cmd, pos, f, o, ns) {
    switch (cmd) {
      case "help": case "--help": return "kubectl controls the Kubernetes cluster manager.\n\nSupported here:\n  " + CMDS.join(" ") + "\n\nUse -n/--namespace, -A/--all-namespaces, -o wide|yaml|name, -l selector and --show-labels.";
      case "version": return "Client Version: v1.35.0\nServer Version: v1.35.0";
      case "explain": return (pos[0] || "resource") + "\nKIND:     " + (kind(pos[0]) || pos[0]) + "\nDESCRIPTION:\n     A Kubernetes resource. Use the docs for the full field reference.";
      case "get": return getCmd(S, pos, o, ns);
      case "describe": return describeCmd(S, pos, ns);
      case "create": return createCmd(S, pos, f, ns);
      case "run": return runCmd(S, pos, f, o, ns);
      case "expose": return exposeCmd(S, pos, f, ns);
      case "scale": return scaleCmd(S, pos, f, ns);
      case "set": return setCmd(S, pos, ns);
      case "label": return labelCmd(S, pos, f, ns, "labels", "labeled");
      case "annotate": return labelCmd(S, pos, f, ns, "ann", "annotated");
      case "taint": return taintCmd(S, pos);
      case "cordon": case "uncordon": { const n = findNode(S, pos[0]); if (!n) return notFound("Node", pos[0]); n.schedulable = cmd === "uncordon"; return "node/" + n.name + " " + (cmd === "cordon" ? "cordoned" : "uncordoned"); }
      case "drain": return drainCmd(S, pos, f);
      case "delete": return deleteCmd(S, pos, ns);
      case "rollout": return rolloutCmd(S, pos, f);
      case "logs": return logsCmd(S, pos, f, ns);
      case "config": return configCmd(S, pos, f, o);
      case "auth": return authCmd(S, pos, f, ns);
      default: return E('unknown command "' + cmd + '" for "kubectl"');
    }
  }
  const notFound = (k, name) => "Error from server (NotFound): " + REF[k].split(".")[0] + 's "' + name + '" not found';

  function listOf(S, k, o, ns) {
    if (k === "Node") return S.nodes;
    if (k === "Namespace") return [...S.namespaces].sort().map(n => ({ kind: "Namespace", name: n, labels: {}, age: "30d" }));
    let items = S.objects.filter(x => x.kind === k);
    if (!CLUSTER(k) && !o.allNs) items = items.filter(x => x.ns === ns);
    if (o.selector) items = items.filter(x => matchSel(x, o.selector));
    return items;
  }
  function getCmd(S, pos, o, ns) {
    const k = kind(pos[0]); if (!k) return E('the server doesn\'t have a resource type "' + (pos[0] || "") + '"');
    let items = listOf(S, k, o, ns);
    if (pos[1]) { items = items.filter(x => x.name === pos[1]); if (!items.length) return notFound(k, pos[1]); }
    if (o.out === "name") return items.map(x => REF[k] + "/" + x.name).join("\n");
    if (o.out === "yaml") return items.map(x => toYaml(S, k, x)).join("\n---\n") || "No resources found";
    if (!items.length) return CLUSTER(k) ? "No resources found" : "No resources found in " + (o.allNs ? "" : ns + " ") + "namespace.";
    return table(S, k, items, o);
  }

  function cols(S, k, o) {
    const wide = o.out === "wide", show = o.showLabels, A = o.allNs && !CLUSTER(k);
    let h, r;
    switch (k) {
      case "Node": h = ["NAME", "STATUS", "ROLES", "AGE", "VERSION"]; r = n => [n.name, (n.ready ? "Ready" : "NotReady") + (n.schedulable ? "" : ",SchedulingDisabled"), n.roles, n.age, n.version]; if (wide) { h = h.concat(["INTERNAL-IP", "OS-IMAGE"]); r = n => [n.name, (n.ready ? "Ready" : "NotReady") + (n.schedulable ? "" : ",SchedulingDisabled"), n.roles, n.age, n.version, "10.0.0." + (S.nodes.indexOf(n) + 10), "Ubuntu 24.04"]; } break;
      case "Namespace": h = ["NAME", "STATUS", "AGE"]; r = x => [x.name, "Active", x.age]; break;
      case "Pod": h = ["NAME", "READY", "STATUS", "RESTARTS", "AGE"]; r = p => { const st = podStatus(p); return [p.name, st === "Running" ? "1/1" : "0/1", st, String(p.restarts || 0), p.age]; }; if (wide) { h = ["NAME", "READY", "STATUS", "RESTARTS", "AGE", "IP", "NODE"]; r = p => { const st = podStatus(p); return [p.name, st === "Running" ? "1/1" : "0/1", st, String(p.restarts || 0), p.age, p.ip || "10.244.0.5", p.node || (S.nodes[0] && S.nodes[0].name) || "<none>"]; }; } break;
      case "Deployment": h = ["NAME", "READY", "UP-TO-DATE", "AVAILABLE", "AGE"]; r = d => { const n = d.replicas == null ? 1 : d.replicas; return [d.name, n + "/" + n, String(n), String(n), d.age]; }; break;
      case "Service": h = ["NAME", "TYPE", "CLUSTER-IP", "EXTERNAL-IP", "PORT(S)", "AGE"]; r = s => [s.name, s.type || "ClusterIP", s.clusterIP || "10.96.0.10", (s.type === "NodePort" || s.type === "LoadBalancer") ? "<none>" : "<none>", (s.ports || []).map(p => p.port + (p.nodePort ? ":" + p.nodePort : "") + "/" + (p.protocol || "TCP")).join(",") || "<none>", s.age]; break;
      case "ConfigMap": h = ["NAME", "DATA", "AGE"]; r = c => [c.name, String(Object.keys(c.data || {}).length), c.age]; break;
      case "Secret": h = ["NAME", "TYPE", "DATA", "AGE"]; r = s => [s.name, s.secretType || "Opaque", String(Object.keys(s.data || {}).length), s.age]; break;
      case "ServiceAccount": h = ["NAME", "SECRETS", "AGE"]; r = s => [s.name, "0", s.age]; break;
      case "Role": h = ["NAME", "CREATED AT"]; r = x => [x.name, "2026-01-01T00:00:00Z"]; break;
      case "RoleBinding": h = ["NAME", "ROLE", "AGE"]; r = x => [x.name, "Role/" + (x.roleRef && (x.roleRef.name || x.roleRef) || ""), x.age]; break;
      case "PersistentVolumeClaim": h = ["NAME", "STATUS", "VOLUME", "CAPACITY", "ACCESS MODES", "STORAGECLASS", "AGE"]; r = p => [p.name, p.status || "Bound", p.volume || "pvc-vol", p.capacity || "1Gi", (p.accessModes || ["RWO"]).join(","), p.storageClass || "standard", p.age]; break;
      case "PersistentVolume": h = ["NAME", "CAPACITY", "ACCESS MODES", "RECLAIM POLICY", "STATUS", "CLAIM", "STORAGECLASS", "AGE"]; r = p => [p.name, p.capacity || "1Gi", (p.accessModes || ["RWO"]).join(","), p.reclaimPolicy || "Retain", p.status || "Available", p.claim || "<none>", p.storageClass || "standard", p.age]; break;
      case "Ingress": h = ["NAME", "CLASS", "HOSTS", "ADDRESS", "PORTS", "AGE"]; r = i => [i.name, i.class || "<none>", (i.hosts || ["*"]).join(","), "", "80", i.age]; break;
      case "NetworkPolicy": h = ["NAME", "POD-SELECTOR", "AGE"]; r = n => [n.name, n.podSelector ? Object.entries(n.podSelector).map(([k, v]) => k + "=" + v).join(",") : "<none>", n.age]; break;
      case "Job": h = ["NAME", "STATUS", "COMPLETIONS", "DURATION", "AGE"]; r = j => [j.name, j.status || "Complete", (j.completions || 1) + "/" + (j.completions || 1), "5s", j.age]; break;
      case "CronJob": h = ["NAME", "SCHEDULE", "SUSPEND", "ACTIVE", "LAST SCHEDULE", "AGE"]; r = c => [c.name, c.schedule || "* * * * *", String(!!c.suspend), "0", "<none>", c.age]; break;
      default: h = ["NAME", "AGE"]; r = x => [x.name, x.age];
    }
    if (A) { h = ["NAMESPACE"].concat(h); const r0 = r; r = x => [x.ns].concat(r0(x)); }
    if (show) { h = h.concat(["LABELS"]); const r1 = r; r = x => r1(x).concat([labelStr(x)]); }
    return { h, r };
  }
  function table(S, k, items, o) {
    const c = cols(S, k, o), rows = items.map(c.r), w = c.h.map((hd, i) => Math.max(hd.length, ...rows.map(rw => String(rw[i]).length)));
    const fmt = cells => cells.map((v, i) => i === cells.length - 1 ? String(v) : String(v).padEnd(w[i] + 3)).join("");
    return [fmt(c.h)].concat(rows.map(fmt)).join("\n");
  }

  function describeCmd(S, pos, ns) {
    const k = kind(pos[0]); if (!k) return E('the server doesn\'t have a resource type "' + (pos[0] || "") + '"');
    if (k === "Node") { const n = findNode(S, pos[1]); if (!n) return notFound(k, pos[1]); return "Name:               " + n.name + "\nRoles:              " + n.roles + "\nLabels:             " + (Object.entries(n.labels).map(([a, b]) => a + "=" + b).join("\n                    ") || "<none>") + "\nTaints:             " + (n.taints.length ? n.taints.map(t => t.key + "=" + t.value + ":" + t.effect).join("\n                    ") : "<none>") + "\nUnschedulable:      " + (!n.schedulable) + "\nConditions:\n  Ready             " + (n.ready ? "True" : "False"); }
    const x = findObj(S, k, pos[1], ns); if (!x) return notFound(k, pos[1]);
    let out = "Name:         " + x.name + "\n" + (CLUSTER(k) ? "" : "Namespace:    " + x.ns + "\n") + "Labels:       " + labelStr(x) + "\nAnnotations:  " + (Object.keys(x.ann || {}).length ? Object.entries(x.ann).map(([a, b]) => a + ": " + b).join("\n              ") : "<none>");
    if (x.containers) out += "\nContainers:\n" + x.containers.map(c => "  " + c.name + ":\n    Image:  " + c.image).join("\n");
    if (k === "Deployment") out += "\nReplicas:     " + (x.replicas == null ? 1 : x.replicas) + " desired";
    if (k === "Pod") out += "\nStatus:       " + podStatus(x) + "\nNode:         " + (x.node || "<none>");
    if (k === "Service") out += "\nType:         " + (x.type || "ClusterIP") + "\nIP:           " + (x.clusterIP || "10.96.0.10") + "\nPort:         " + (x.ports || []).map(p => p.port + "/" + (p.protocol || "TCP")).join(", ") + "\nSelector:     " + (x.selector ? Object.entries(x.selector).map(([a, b]) => a + "=" + b).join(",") : "<none>");
    if (k === "ConfigMap" || k === "Secret") out += "\nData\n====\n" + Object.keys(x.data || {}).map(kk => kk + ":").join("\n");
    if (k === "Role") out += "\nPolicyRules:\n" + (x.rules || []).map(r => "  Resources: " + (r.resources || []).join(",") + "   Verbs: [" + (r.verbs || []).join(" ") + "]").join("\n");
    return out;
  }

  function createCmd(S, pos, f, ns) {
    const sub = pos[0];
    if (sub === "namespace" || sub === "ns") { const name = pos[1]; if (!name) return E("resource name may not be empty"); if (S.namespaces.has(name)) return "Error from server (AlreadyExists): namespaces \"" + name + "\" already exists"; S.namespaces.add(name); return "namespace/" + name + " created"; }
    if (sub === "deployment" || sub === "deploy") { const name = pos[1]; if (!name) return E("NAME is required"); if (!f.image) return E("--image is required"); return add(S, mk("Deployment", name, ns, { replicas: f.replicas ? +f.replicas : 1, containers: [{ name, image: f.image }], labels: { app: name }, selector: { app: name } })); }
    if (sub === "service" || sub === "svc") { const st = pos[1], name = pos[2]; if (!/^(clusterip|nodeport|loadbalancer|externalname)$/.test(st || "")) return E("Unknown service type " + st); if (!name) return E("NAME is required"); const tp = String(f.tcp || "").split(":"); const type = { clusterip: "ClusterIP", nodeport: "NodePort", loadbalancer: "LoadBalancer", externalname: "ExternalName" }[st]; return add(S, mk("Service", name, ns, { type, clusterIP: "10.96.0." + (S.objects.filter(x => x.kind === "Service").length + 20), ports: [{ port: +tp[0] || 80, targetPort: +(tp[1] || tp[0]) || 80, protocol: "TCP", nodePort: type === "NodePort" ? 30080 : undefined }], selector: { app: name } })); }
    if (sub === "configmap" || sub === "cm") { const name = pos[1]; if (!name) return E("NAME is required"); const data = {}; (f.fromLiteral || []).forEach(l => { const i = l.indexOf("="); data[l.slice(0, i)] = l.slice(i + 1); }); return add(S, mk("ConfigMap", name, ns, { data })); }
    if (sub === "secret") { const st = pos[1], name = pos[2]; if (st !== "generic" && st !== "tls" && st !== "docker-registry") return E("unknown secret sub-command " + st); if (!name) return E("NAME is required"); const data = {}; (f.fromLiteral || []).forEach(l => { const i = l.indexOf("="); data[l.slice(0, i)] = l.slice(i + 1); }); return add(S, mk("Secret", name, ns, { data, secretType: "Opaque" })); }
    if (sub === "serviceaccount" || sub === "sa") { const name = pos[1]; if (!name) return E("NAME is required"); return add(S, mk("ServiceAccount", name, ns, {})); }
    if (sub === "role") { const name = pos[1]; if (!name) return E("NAME is required"); if (!f.verbs || !f.resources) return E("at least one --verb and --resource must be specified"); return add(S, mk("Role", name, ns, { rules: [{ verbs: f.verbs, resources: f.resources }] })); }
    if (sub === "rolebinding" || sub === "rb") { const name = pos[1]; if (!name) return E("NAME is required"); if (!f.role && !f.clusterrole) return E("exactly one of --role or --clusterrole must be specified"); const subjects = []; if (f.serviceaccount) { const p = String(f.serviceaccount).split(":"); subjects.push({ kind: "ServiceAccount", name: p[1] || p[0], namespace: p.length > 1 ? p[0] : ns }); } if (f.user) subjects.push({ kind: "User", name: f.user }); if (!subjects.length) return E("one of --user or --serviceaccount must be specified"); return add(S, mk("RoleBinding", name, ns, { roleRef: { name: f.role || f.clusterrole, kind: f.role ? "Role" : "ClusterRole" }, subjects })); }
    if (sub === "job") { const name = pos[1]; if (!name) return E("NAME is required"); if (!f.image) return E("--image is required"); return add(S, mk("Job", name, ns, { containers: [{ name, image: f.image }], completions: 1, status: "Complete" })); }
    if (sub === "cronjob" || sub === "cj") { const name = pos[1]; if (!name) return E("NAME is required"); if (!f.image) return E("--image is required"); if (!f.schedule) return E("--schedule is required"); return add(S, mk("CronJob", name, ns, { schedule: f.schedule, suspend: false, containers: [{ name, image: f.image }] })); }
    return E('unknown object type "' + (sub || "") + '"');
  }

  function runCmd(S, pos, f, o, ns) {
    const name = pos[0]; if (!name) return E("NAME is required"); if (!f.image) return E("--image is required");
    const labels = {}; (String(f.labels || "").split(",").filter(Boolean)).forEach(l => { const i = l.indexOf("="); labels[l.slice(0, i)] = l.slice(i + 1); });
    const restart = f.restart || "Always";
    if ((f["dry-run"] === "client" || f["dry-run"] === true) && o.out === "yaml") {
      const lab = Object.keys(labels).length ? labels : { run: name };
      return "apiVersion: v1\nkind: Pod\nmetadata:\n  creationTimestamp: null\n  labels:\n" + Object.entries(lab).map(([k, v]) => "    " + k + ": " + v).join("\n") + "\n  name: " + name + "\nspec:\n  containers:\n  - image: " + f.image + "\n    name: " + name + "\n    resources: {}\n  dnsPolicy: ClusterFirst\n  restartPolicy: " + restart + "\nstatus: {}";
    }
    return add(S, mk("Pod", name, ns, { containers: [{ name, image: f.image }], labels: Object.keys(labels).length ? labels : { run: name }, restartPolicy: restart, node: (S.nodes[0] && S.nodes[0].name) || "worker-1", ip: "10.244.0.7" }));
  }

  function exposeCmd(S, pos, f, ns) {
    const k = kind(pos[0]), src = findObj(S, k, pos[1], ns); if (!src) return notFound(k || "Deployment", pos[1]);
    const name = f.name || pos[1];
    return add(S, mk("Service", name, ns, { type: f.type || "ClusterIP", clusterIP: "10.96.0." + (S.objects.filter(x => x.kind === "Service").length + 20), ports: [{ port: +f.port || 80, targetPort: +(f["target-port"] || f.port) || 80, protocol: "TCP" }], selector: src.selector || src.labels || { app: pos[1] } })).replace("created", "exposed");
  }
  function scaleCmd(S, pos, f, ns) { const [kt, name] = parseRef(pos), k = kind(kt) || "Deployment", d = findObj(S, k, name, ns); if (!d) return notFound(k, name); if (f.replicas == null) return E("--replicas is required"); d.replicas = +f.replicas; return REF[k] + "/" + name + " scaled"; }
  function setCmd(S, pos, ns) { if (pos[0] !== "image") return E('"' + (pos[0] || "") + '" is not a valid subresource'); const [kt, name] = parseRef(pos.slice(1)), k = kind(kt) || "Deployment", d = findObj(S, k, name, ns); if (!d) return notFound(k, name); pos.slice(pos[1] && pos[1].includes("/") ? 2 : 3).forEach(a => { const i = a.indexOf("="); if (i < 0) return; const cn = a.slice(0, i), img = a.slice(i + 1); (d.containers || []).forEach(c => { if (cn === "*" || c.name === cn) c.image = img; }); }); return REF[k] + "/" + name + " image updated"; }

  function labelCmd(S, pos, f, ns, field, verb) {
    const k = kind(pos[0]); if (!k) return E("resource type not specified");
    const target = k === "Node" ? findNode(S, pos[1]) : findObj(S, k, pos[1], ns); if (!target) return notFound(k, pos[1]);
    target[field] = target[field] || {}; let changed = false;
    pos.slice(2).forEach(a => { if (a.endsWith("-")) { delete target[field][a.slice(0, -1)]; changed = true; return; } const i = a.indexOf("="); if (i < 0) return; const key = a.slice(0, i), v = a.slice(i + 1); if (target[field][key] !== undefined && target[field][key] !== v && !f.overwrite) throw new Error("'" + key + "' already has a value (" + target[field][key] + "), and --overwrite is false"); target[field][key] = v; changed = true; });
    if (!changed) return E("at least one label update is required");
    return REF[k] + "/" + pos[1] + " " + verb;
  }

  function taintCmd(S, pos) {
    const n = findNode(S, pos[1]); if (!n) return notFound("Node", pos[1]);
    const spec = pos[2] || ""; if (spec.endsWith("-")) { const key = spec.slice(0, -1).split(":")[0].split("=")[0]; const before = n.taints.length; n.taints = n.taints.filter(t => t.key !== key); return before === n.taints.length ? E('taint "' + key + '" not found') : "node/" + n.name + " untainted"; }
    const t = normTaint(spec); if (!t.effect) return E("invalid taint spec: " + spec); if (n.taints.some(x => x.key === t.key && x.effect === t.effect)) return E('Node ' + n.name + ' already has ' + t.key + ' taint'); n.taints.push(t); return "node/" + n.name + " tainted";
  }
  function drainCmd(S, pos, f) {
    const n = findNode(S, pos[0]); if (!n) return notFound("Node", pos[0]); n.schedulable = false;
    const pods = S.objects.filter(o => o.kind === "Pod" && o.node === n.name);
    pods.forEach(p => { S.objects = S.objects.filter(o => o !== p); });
    return "node/" + n.name + " cordoned" + (pods.length ? "\n" + pods.map(p => "evicting pod " + p.ns + "/" + p.name).join("\n") : "") + "\nnode/" + n.name + " drained";
  }
  function deleteCmd(S, pos, ns) {
    const [kt, name] = parseRef(pos), k = kind(kt); if (!k) return E('the server doesn\'t have a resource type "' + (kt || "") + '"');
    if (k === "Namespace") { if (!S.namespaces.has(name)) return notFound(k, name); S.namespaces.delete(name); S.objects = S.objects.filter(o => o.ns !== name); return 'namespace "' + name + '" deleted'; }
    const before = S.objects.length; S.objects = S.objects.filter(o => !(o.kind === k && o.name === name && (CLUSTER(k) || o.ns === ns)));
    if (S.objects.length === before) return notFound(k, name);
    return REF[k].split(".")[0] + ' "' + name + '" deleted';
  }
  function rolloutCmd(S, pos, f) {
    const act = pos[0], [kt, name] = parseRef(pos.slice(1)), k = kind(kt) || "Deployment", d = findObj(S, k, name, S.ns) || S.objects.find(o => o.kind === k && o.name === name);
    if (!d) return notFound(k, name);
    if (act === "status") return "deployment \"" + name + "\" successfully rolled out";
    if (act === "history") return "deployment.apps/" + name + " \nREVISION  CHANGE-CAUSE\n1         <none>\n2         <none>";
    if (act === "undo") { return "deployment.apps/" + name + " rolled back"; }
    if (act === "restart") return "deployment.apps/" + name + " restarted";
    if (act === "pause") return "deployment.apps/" + name + " paused";
    if (act === "resume") return "deployment.apps/" + name + " resumed";
    return E("unknown rollout subcommand " + act);
  }
  function logsCmd(S, pos, f, ns) { const p = findObj(S, "Pod", pos[0], ns); if (!p) return notFound("Pod", pos[0]); if (typeof p.logs === "string") return p.logs; if (p.logs && f.container) return p.logs[f.container] || ""; return ""; }
  function configCmd(S, pos, f, o) {
    if (pos[0] === "set-context") { const nn = o && o.ns != null ? o.ns : f.namespace; if (nn != null) { S.ns = nn; S.namespaces.add(nn); } return 'Context "' + S.ctx + '" modified.'; }
    if (pos[0] === "current-context") return S.ctx;
    if (pos[0] === "view") return "current-context: " + S.ctx + "\nnamespace: " + S.ns;
    return E("unknown config subcommand " + pos[0]);
  }
  function authCmd(S, pos, f, ns) { if (pos[0] !== "can-i") return E("unknown auth subcommand " + pos[0]); return canI(S, pos[1], pos[2], f.as, ns) ? "yes" : "no"; }

  function subjectMatch(subjects, as, ns) {
    let want; if (String(as).startsWith("system:serviceaccount:")) { const p = as.split(":"); want = { kind: "ServiceAccount", name: p[3], ns: p[2] }; } else want = { kind: "User", name: as };
    return (subjects || []).some(s => s.kind === want.kind && s.name === want.name && (want.kind !== "ServiceAccount" || (s.namespace || ns) === want.ns));
  }
  function canI(S, verb, resource, as, ns) {
    if (!as) return true;
    const res = kind(resource) ? REF[kind(resource)].split(".")[0] + "s" : resource;
    const rbs = S.objects.filter(o => o.kind === "RoleBinding" && o.ns === ns);
    for (const rb of rbs) {
      if (!subjectMatch(rb.subjects, as, ns)) continue;
      const role = S.objects.find(o => o.kind === "Role" && o.name === (rb.roleRef && (rb.roleRef.name || rb.roleRef)) && o.ns === ns);
      if (!role) continue;
      for (const r of (role.rules || [])) { const vok = (r.verbs || []).some(v => v === "*" || v === verb); const rok = (r.resources || []).some(x => x === "*" || x === resource || x === res); if (vok && rok) return true; }
    }
    return false;
  }

  function toYaml(S, k, x) {
    const L = ["apiVersion: " + (REF[k].includes(".") ? REF[k].split("/")[0].replace(REF[k].split(".")[0] + ".", "") + "/v1" : "v1"), "kind: " + k, "metadata:", "  name: " + x.name];
    if (x.ns) L.push("  namespace: " + x.ns);
    if (Object.keys(x.labels || {}).length) { L.push("  labels:"); Object.entries(x.labels).forEach(([a, b]) => L.push("    " + a + ": " + b)); }
    L.push("spec:");
    if (x.replicas != null) L.push("  replicas: " + x.replicas);
    if (x.containers) { L.push("  containers:"); x.containers.forEach(c => L.push("  - image: " + c.image, "    name: " + c.name)); }
    if (x.type) L.push("  type: " + x.type);
    if (x.schedule) L.push("  schedule: " + x.schedule);
    return L.join("\n");
  }

  function fieldVal(o, path) {
    let p = String(path).replace(/^spec\./, "").replace(/^status\./, "").replace(/^metadata\./, "");
    if (p === "replicas") return o.replicas == null ? 1 : o.replicas;
    if (p === "schedule") return o.schedule; if (p === "suspend") return !!o.suspend; if (p === "type") return o.type;
    const m = p.match(/containers\[(\d+)\]\.image/); if (m) return (o.containers || [])[+m[1]] && o.containers[+m[1]].image;
    if (p.startsWith("data.")) return (o.data || {})[p.slice(5)];
    let cur = o; for (const key of p.split(".")) { if (cur == null) return undefined; cur = cur[key]; } return cur;
  }

  // Checks: exists, missing, field, label, image, nodeSchedulable, taint, can, ran, context
  function check(S, c) {
    const k = c.kind && kind(c.kind), ns = c.namespace || "default";
    const getO = () => k === "Node" ? findNode(S, c.name) : k === "Namespace" ? (S.namespaces.has(c.name) ? { name: c.name } : null) : findObj(S, k, c.name, ns);
    switch (c.type) {
      case "exists": return !!getO();
      case "missing": return !getO();
      case "field": { const o = getO(); if (!o) return false; return String(fieldVal(o, c.path)) === String(c.equals); }
      case "label": { const o = getO(); return !!o && (o.labels || {})[c.key] === c.value; }
      case "image": { const o = getO(); if (!o || !o.containers) return false; const cc = c.container ? o.containers.find(x => x.name === c.container) : o.containers[0]; return !!cc && cc.image === c.image; }
      case "nodeSchedulable": { const n = findNode(S, c.node); return !!n && n.schedulable === c.schedulable; }
      case "taint": { const n = findNode(S, c.node); if (!n) return false; const has = n.taints.some(t => t.key === c.key && (!c.effect || t.effect === c.effect)); return has === (c.present !== false); }
      case "can": return canI(S, c.verb, c.resource, c.as, c.namespace || S.ns) === (c.allowed !== false);
      case "ran": { const want = c.includes || c.cmd || ""; return S.history.some(h => h.includes(want)); }
      case "context": return S.ns === c.namespace;
      default: return false;
    }
  }
  const prompt = S => "$"; // kubectl practice: a plain shell prompt; namespace is shown via config
  function isError(o) { return /^(error:|Error from server|The connection to the server)/i.test(String(o || "").trim()); }

  const api = { create, run, check, prompt, isError, CMDS };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else { root.CertHub = root.CertHub || {}; root.CertHub.kube = api; }
})(typeof window !== "undefined" ? window : globalThis);
