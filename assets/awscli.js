/* A simulated AWS CLI v2 for cloud practice: one fixed account (111122223333) in us-east-1 with
   in-memory IAM, S3, EC2, CloudTrail, CloudWatch, CloudWatch Logs, KMS, Lambda and RDS.
   It is a teaching sandbox, not a real account: nothing is created or billed.
   Commands: aws --version, aws configure list|get|set, aws sts get-caller-identity,
   aws s3 ls|mb|rb|cp|rm,
   aws s3api create-bucket delete-bucket list-buckets put-bucket-versioning get-bucket-versioning
     put-public-access-block get-public-access-block put-bucket-encryption get-bucket-encryption
     put-bucket-policy get-bucket-policy delete-bucket-policy list-objects-v2,
   aws iam create-user get-user list-users create-group list-groups add-user-to-group list-groups-for-user
     attach-user-policy detach-user-policy attach-group-policy list-attached-user-policies
     list-attached-group-policies create-role list-roles attach-role-policy list-attached-role-policies
     create-policy get-account-summary create-access-key list-access-keys update-access-key delete-access-key,
   aws ec2 describe-instances run-instances start-instances stop-instances terminate-instances
     create-security-group describe-security-groups authorize-security-group-ingress
     revoke-security-group-ingress describe-volumes create-snapshot describe-snapshots create-tags
     describe-vpcs describe-subnets describe-key-pairs,
   aws cloudtrail create-trail start-logging stop-logging describe-trails get-trail-status,
   aws cloudwatch put-metric-alarm describe-alarms delete-alarms,
   aws logs create-log-group put-retention-policy describe-log-groups,
   aws kms create-key describe-key list-keys create-alias list-aliases enable-key-rotation get-key-rotation-status,
   aws lambda list-functions get-function-configuration update-function-configuration,
   aws rds describe-db-instances modify-db-instance,
   with --region, --output json|text|table, --query (JMESPath paths, [], [*], [n], [?a=='b'], [a,b], {K:a}),
   shorthand (Key=Name,Value=web) or JSON parameters, and file:// for the local files listed by ls.
   Works in the browser (CertHub.awscli) and in Node (module.exports) for content checks. */
(function (root) {
  const ACCT = "111122223333", NOW = "2026-09-25T12:00:00+00:00", OLD = "2026-03-02T09:15:00+00:00", NOWMS = 1758801600000;
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1), opName = op => op.split("-").map(cap).join("");
  const ents = x => !x ? [] : Array.isArray(x) ? x.map(v => typeof v === "string" ? [v, {}] : [v.name || v.id, v]) : Object.entries(x).map(([k, v]) => [k, v && typeof v === "object" ? v : { value: v }]);
  const L = x => x == null ? [] : Array.isArray(x) ? x : [x];
  const hash = s => { let h = 2166136261; for (const c of String(s)) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0; return h.toString(16).padStart(8, "0"); };
  const glob = p => new RegExp("^" + String(p).replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$");
  const bool = v => v === true || /^true$/i.test(String(v));
  const tagList = o => Object.entries(o || {}).map(([Key, Value]) => ({ Key, Value }));
  const STEM = { i: "4f1a7c2e9b", sg: "2b8e6d1f0a", vol: "7c3e9a5d2b", snap: "5d0b8f3a6e", vpc: "1a2b3c4d5e", subnet: "6e5d4c3b2a", r: "8a1f4c7e2d", sgr: "3c9d1e7f5a" };
  const MANAGED = "AdministratorAccess ReadOnlyAccess PowerUserAccess SecurityAudit IAMReadOnlyAccess IAMUserChangePassword AmazonS3ReadOnlyAccess AmazonS3FullAccess AmazonEC2ReadOnlyAccess AmazonEC2FullAccess AmazonRDSReadOnlyAccess AmazonDynamoDBReadOnlyAccess AmazonDynamoDBFullAccess AmazonSQSFullAccess AmazonSNSFullAccess CloudWatchReadOnlyAccess CloudWatchAgentServerPolicy CloudWatchLogsFullAccess AmazonSSMManagedInstanceCore AWSXRayDaemonWriteAccess AWSLambda_ReadOnlyAccess AWSLambda_FullAccess AWSBillingReadOnlyAccess AWSCloudTrail_ReadOnlyAccess job-function/ViewOnlyAccess job-function/Billing job-function/DatabaseAdministrator service-role/AWSLambdaBasicExecutionRole service-role/AWSLambdaVPCAccessExecutionRole".split(" ");
  const TAKEN = ["test", "backup", "backups", "logs", "my-bucket", "data", "assets", "website", "example"];
  const RETENTION = [1, 3, 5, 7, 14, 30, 60, 90, 120, 150, 180, 365, 400, 545, 731, 1096, 1827, 2192, 2557, 2922, 3288, 3653];
  const STATE = { pending: 0, running: 16, "shutting-down": 32, terminated: 48, stopping: 64, stopped: 80 };
  const OPS = {
    configure: "list get set", sts: "get-caller-identity", s3: "ls mb rb cp rm",
    s3api: "create-bucket delete-bucket list-buckets put-bucket-versioning get-bucket-versioning put-public-access-block get-public-access-block put-bucket-encryption get-bucket-encryption put-bucket-policy get-bucket-policy delete-bucket-policy list-objects-v2",
    iam: "create-user get-user list-users create-group list-groups add-user-to-group list-groups-for-user attach-user-policy detach-user-policy attach-group-policy list-attached-user-policies list-attached-group-policies create-role list-roles attach-role-policy list-attached-role-policies create-policy get-account-summary create-access-key list-access-keys update-access-key delete-access-key",
    ec2: "describe-instances run-instances start-instances stop-instances terminate-instances create-security-group describe-security-groups authorize-security-group-ingress revoke-security-group-ingress describe-volumes create-snapshot describe-snapshots create-tags describe-vpcs describe-subnets describe-key-pairs",
    cloudtrail: "create-trail start-logging stop-logging describe-trails get-trail-status", cloudwatch: "put-metric-alarm describe-alarms delete-alarms",
    logs: "create-log-group put-retention-policy describe-log-groups", kms: "create-key describe-key list-keys create-alias list-aliases enable-key-rotation get-key-rotation-status",
    lambda: "list-functions get-function-configuration update-function-configuration", rds: "describe-db-instances modify-db-instance"
  };
  const CMDS = Object.entries(OPS).map(([s, o]) => `aws ${s} ${o.split(" ").join("|")}`);

  function create(setup = {}) {
    const S = { region: setup.region || "us-east-1", output: "json", history: [], ok: [], seq: 0, users: {}, groups: {}, roles: {}, policies: {}, buckets: {}, instances: [], sgs: [], vpcs: [], subnets: [], keyPairs: [], volumes: [], snapshots: [], trails: {}, alarms: {}, logs: {}, functions: {}, dbs: {}, keys: [], aliases: {},
      local: Object.assign({ "index.html": "<h1>Hello from S3</h1>\n", "report.csv": "month,cost\nAugust,412.50\n" }, setup.files || {}) };
    const id = S.id = p => `${p}-0${STEM[p]}${String(++S.seq).padStart(6, "0")}`;
    const iam = setup.iam || {}, s3 = (setup.s3 || {}).buckets || {}, ec2 = setup.ec2 || {};
    const ident = (setup.sts && setup.sts.identity) || {};
    S.identity = { UserId: ident.userId || "AIDASAMPLEADMINID0001", Account: ACCT, Arn: ident.arn || `arn:aws:iam::${ACCT}:user/${ident.user || "cloud-admin"}` };
    S.rootMfa = iam.rootMfa !== false; S.rootKeys = !!iam.rootKeys;
    ents(iam.policies).forEach(([n, v]) => { S.policies[n] = { arn: `arn:aws:iam::${ACCT}:policy/${n}`, doc: v.document || v }; });
    if (!ident.arn) S.users[ident.user || "cloud-admin"] = newUser(S, ident.user || "cloud-admin", OLD, ["arn:aws:iam::aws:policy/AdministratorAccess"]);
    ents(iam.groups).forEach(([n, v]) => { S.groups[n] = { policies: L(v.policies).map(p => pol(S, p)), created: OLD }; });
    ents(iam.users).forEach(([n, v]) => {
      const u = S.users[n] = newUser(S, n, OLD, L(v.policies).map(p => pol(S, p)));
      L(v.groups).forEach(g => { if (!S.groups[g]) S.groups[g] = { policies: [], created: OLD }; u.groups.push(g); });
      (typeof v.keys === "number" ? Array(v.keys).fill({}) : L(v.keys)).forEach(k => u.keys.push({ id: k.id || keyId(S), status: k.status || "Active", created: k.created || OLD }));
    });
    ents(iam.roles).forEach(([n, v]) => { S.roles[n] = { policies: L(v.policies).map(p => pol(S, p)), trust: typeof v.trust === "object" ? v.trust : trustFor(v.trust || "ec2.amazonaws.com"), created: OLD, id: "AROA" + hash(n).toUpperCase() + "EXAMPLE" }; });
    Object.entries(s3).forEach(([n, v]) => {
      v = v || {}; const pab = v.publicAccessBlock === undefined ? true : v.publicAccessBlock;
      const enc = v.encryption === undefined ? "AES256" : v.encryption;
      S.buckets[n] = { created: OLD, objects: {}, versioning: v.versioning === true ? "Enabled" : v.versioning || null, pab: pab === false || pab === null ? null : pab === true ? pabAll(true) : Object.assign(pabAll(false), pab),
        enc: !enc ? null : typeof enc === "string" ? { alg: enc } : { alg: enc.alg || enc.SSEAlgorithm || "aws:kms", key: enc.key || enc.KMSMasterKeyID }, policy: v.policy ? (typeof v.policy === "string" ? v.policy : JSON.stringify(v.policy)) : null };
      Object.entries(v.objects || {}).forEach(([k, c]) => { S.buckets[n].objects[k] = { size: typeof c === "number" ? c : String(c).length, body: typeof c === "number" ? "" : String(c) }; });
    });
    S.vpcs.push({ id: "vpc-0" + STEM.vpc + "000000", cidr: "172.31.0.0/16", def: true, tags: {} });
    ents(ec2.vpcs).forEach(([n, v]) => S.vpcs.push({ id: v.id || id("vpc"), cidr: v.cidr || "10.0.0.0/16", def: false, tags: v.name ? { Name: v.name } : {} }));
    const defVpc = S.vpcs[0].id, vpcOf = x => !x ? defVpc : (S.vpcs.find(v => v.id === x || v.tags.Name === x) || {}).id || x;
    [["us-east-1a", "172.31.0.0/20"], ["us-east-1b", "172.31.16.0/20"]].forEach(([az, cidr], i) => S.subnets.push({ id: "subnet-0" + STEM.subnet + "00000" + (i + 1), vpc: defVpc, cidr, az, pub: true, tags: {} }));
    ents(ec2.subnets).forEach(([n, v]) => S.subnets.push({ id: v.id || id("subnet"), vpc: vpcOf(v.vpc), cidr: v.cidr || "10.0.1.0/24", az: v.az || "us-east-1a", pub: !!v.public, tags: v.name ? { Name: v.name } : {} }));
    S.vpcs.forEach(v => S.sgs.push({ id: v.def ? "sg-0" + STEM.sg + "000000" : id("sg"), name: "default", desc: `${v.def ? "default VPC" : "default"} security group`, vpc: v.id, rules: [], tags: {} }));
    ents(ec2.securityGroups).forEach(([n, v]) => S.sgs.push({ id: v.id || id("sg"), name: v.name || n, desc: v.description || v.desc || n, vpc: vpcOf(v.vpc), tags: {}, rules: L(v.ingress).map(r => rule(r.protocol || r.proto || "tcp", r.port != null ? String(r.port) : r.from != null ? `${r.from}-${r.to}` : null, r.cidr || "0.0.0.0/0")) }));
    S.keyPairs = L(ec2.keyPairs).map(k => typeof k === "string" ? k : k.name);
    L(ec2.instances).forEach(v => {
      const sn = S.subnets.find(s => s.id === v.subnet || s.tags.Name === v.subnet) || S.subnets[0];
      const sgs = v.securityGroups || v.sgs ? L(v.securityGroups || v.sgs).map(g => (S.sgs.find(s => s.id === g || s.name === g) || {}).id).filter(Boolean) : [S.sgs.find(s => s.vpc === sn.vpc && s.name === "default").id];
      S.instances.push(newInst(S, { id: v.id, ami: v.ami || v.image || "ami-0abcdef1234567890", type: v.type || "t3.micro", state: v.state || "running", subnet: sn, sgs, key: v.keyName, profile: v.profile, launched: OLD, tags: Object.assign(v.name ? { Name: v.name } : {}, v.tags || {}) }));
    });
    L(ec2.volumes).forEach(v => { const inst = S.instances.find(i => i.id === v.instance || i.tags.Name === v.instance); S.volumes.push({ id: v.id || id("vol"), size: v.size || 8, type: v.type || "gp3", enc: !!v.encrypted, inst: inst ? inst.id : null, az: inst ? inst.subnet.az : "us-east-1a", tags: v.name ? { Name: v.name } : {} }); });
    L(ec2.snapshots).forEach(v => S.snapshots.push({ id: v.id || id("snap"), vol: v.volume, desc: v.description || "", size: v.size || 8, tags: {}, start: OLD }));
    const ct = setup.cloudtrail || {}; ents(ct.trails || ct).forEach(([n, v]) => { S.trails[n] = { bucket: v.bucket || "", logging: !!v.logging, multi: v.multiRegion !== false, validation: !!v.validation }; });
    ents((setup.cloudwatch || {}).alarms).forEach(([n, v]) => { S.alarms[n] = alarm(n, { metric: v.metric || "CPUUtilization", ns: v.namespace || "AWS/EC2", stat: v.statistic || "Average", period: v.period || 300, evals: v.evaluationPeriods || 1, threshold: v.threshold != null ? v.threshold : 80, op: v.comparison || "GreaterThanThreshold", dims: tagList(v.dimensions).map(t => ({ Name: t.Key, Value: t.Value })), actions: L(v.actions) }); });
    const lg = setup.logs || {}; ents(lg.groups || lg).forEach(([n, v]) => { S.logs[n] = { retention: v.retention || null, bytes: v.bytes || 0 }; });
    const lm = setup.lambda || {}; ents(lm.functions || lm).forEach(([n, v]) => { S.functions[n] = { runtime: v.runtime || "python3.12", handler: v.handler || "app.handler", role: v.role || `arn:aws:iam::${ACCT}:role/${n}-role`, timeout: v.timeout || 3, memory: v.memory || 128, env: Object.assign({}, v.env || {}), tracing: v.tracing || "PassThrough", size: v.size || 2048, desc: v.description || "" }; });
    const rd = setup.rds || {}; ents(rd.instances || rd).forEach(([n, v]) => { S.dbs[n] = { engine: v.engine || "mysql", cls: v.class || "db.t3.micro", multiAZ: !!v.multiAZ, backup: v.backupRetention != null ? v.backupRetention : 1, enc: !!v.encrypted, pub: !!v.public, pending: {} }; });
    const km = setup.kms || {}; L(km.keys).forEach(v => { const k = newKey(S, v.description || ""); k.rotation = !!v.rotation; if (v.alias) S.aliases[v.alias] = { key: k.id, created: OLD }; });
    return S;
  }
  const pabAll = b => ({ BlockPublicAcls: b, IgnorePublicAcls: b, BlockPublicPolicy: b, RestrictPublicBuckets: b });
  const keyId = S => "AKIA5EXAMPLE" + String(++S.seq).padStart(8, "0");
  const trustFor = svc => ({ Version: "2012-10-17", Statement: [{ Effect: "Allow", Principal: { Service: svc }, Action: "sts:AssumeRole" }] });
  function newUser(S, n, created, policies) { return { id: "AIDA" + hash(n).toUpperCase() + "EXAMPLE" + String(Object.keys(S.users).length).padStart(2, "0"), created, groups: [], policies: policies || [], keys: [] }; }
  function pol(S, p) { if (/^arn:/.test(p)) return p; if (S.policies[p]) return S.policies[p].arn; const m = MANAGED.find(x => x === p || x.split("/").pop() === p); return "arn:aws:iam::aws:policy/" + (m || p); }
  function newKey(S, desc) { const n = S.keys.length + 1, kid = `0f1e2d3c-4b5a-4c6d-8e7f-${String(n).padStart(12, "0")}`; const k = { id: kid, arn: `arn:aws:kms:us-east-1:${ACCT}:key/${kid}`, desc, rotation: false, created: NOW }; S.keys.push(k); return k; }
  function newInst(S, o) {
    const n = S.instances.length + 1, base = o.subnet.cidr.split(".").slice(0, 3).join(".");
    return { id: o.id || S.id("i"), rid: S.id("r"), ami: o.ami, type: o.type, state: o.state, subnet: o.subnet, sgs: o.sgs, key: o.key, profile: o.profile, launched: o.launched || NOW, tags: o.tags || {}, ip: `${base}.${10 + n}`, pub: o.subnet.pub ? `54.210.${10 + n}.${100 + n}` : null };
  }
  function rule(proto, port, cidr) { proto = String(proto).toLowerCase(); if (proto === "all" || proto === "-1") return { proto: "-1", from: -1, to: -1, cidr }; const [a, b] = String(port).split("-"); return { proto, from: +a, to: b != null && b !== "" ? +b : +a, cidr }; }
  function alarm(n, a) { return Object.assign({ name: n }, a); }

  // Tokenize like a POSIX shell: quotes group words and are removed.
  function tokens(s) {
    const t = []; let cur = null, q = null;
    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (q === "'") { if (ch === "'") q = null; else cur += ch; continue; }
      if (q === '"') { if (ch === '"') q = null; else if (ch === "\\" && /["\\$`]/.test(s[i + 1] || "")) cur += s[++i]; else cur += ch; continue; }
      if (/\s/.test(ch)) { if (cur !== null) { t.push(cur); cur = null; } continue; }
      if (cur === null) cur = "";
      if (ch === "'" || ch === '"') q = ch; else if (ch === "\\" && i + 1 < s.length) cur += s[++i]; else cur += ch;
    }
    if (cur !== null) t.push(cur);
    return t;
  }
  const BOOL = new Set("recursive force dry-run no-dry-run multi-az no-multi-az apply-immediately no-apply-immediately is-multi-region-trail no-is-multi-region-trail enable-log-file-validation human-readable summarize no-paginate debug no-cli-pager include-global-service-events associate-public-ip-address".split(" "));
  function parseArgs(t) {
    const pos = [], opts = {}; let cur = null;
    for (const a of t) {
      if (/^--[a-z0-9]/.test(a)) { const eq = a.indexOf("="), n = eq > 0 ? a.slice(2, eq) : a.slice(2); opts[n] = opts[n] || []; cur = BOOL.has(n) ? null : n; if (eq > 0) { opts[n].push(a.slice(eq + 1)); cur = null; } else if (BOOL.has(n)) opts[n].push(true); }
      else if (cur) opts[cur].push(a); else pos.push(a);
    }
    return { pos, opts };
  }
  // Shorthand syntax (Key=Name,Value=web / Tags=[{Key=a,Value=b}] / Values=a,b) or JSON.
  function sh(s) {
    s = String(s).trim();
    if (/^[[{]/.test(s)) { try { return JSON.parse(s); } catch (e) { if (s[0] === "[") return shList(s, { i: 1 }); } }
    const P = { i: 0 };
    return shObj(s, P, null);
  }
  function shScalar(s, P) { let v = ""; while (P.i < s.length && !/[,\]}]/.test(s[P.i])) v += s[P.i++]; return v.trim(); }
  function shVal(s, P) { if (s[P.i] === "[") { P.i++; return shList(s, P); } if (s[P.i] === "{") { P.i++; return shObj(s, P, "}"); } return shScalar(s, P); }
  function shList(s, P) { const out = []; while (P.i < s.length && s[P.i] !== "]") { out.push(shVal(s, P)); if (s[P.i] === ",") P.i++; } P.i++; return out; }
  function shObj(s, P, end) {
    const o = {}; let last = null;
    while (P.i < s.length && s[P.i] !== end) {
      const rest = s.slice(P.i), m = rest.match(/^([A-Za-z0-9_:.\-/]+)=/);
      if (m) { P.i += m[0].length; last = m[1]; o[last] = shVal(s, P); }
      else { const v = shVal(s, P); if (last) o[last] = L(o[last]).concat(v); }
      if (s[P.i] === ",") P.i++;
    }
    if (end) P.i++;
    return o;
  }

  // A small JMESPath subset.
  function segs(q) {
    const out = []; let i = 0;
    while (i < q.length) {
      const ch = q[i];
      if (ch === ".") { i++; continue; }
      if (ch === "[" || ch === "{") { const close = ch === "[" ? "]" : "}"; let d = 0, j = i, qu = null; for (; j < q.length; j++) { const c = q[j]; if (qu) { if (c === qu) qu = null; continue; } if (c === "'" || c === "`") qu = c; else if (c === ch) d++; else if (c === close && !--d) break; } const body = q.slice(i + 1, j); i = j + 1;
        if (ch === "{") out.push({ hash: splitTop(body).map(p => { const k = p.indexOf(":"); return [p.slice(0, k).trim(), p.slice(k + 1).trim()]; }) });
        else if (body === "") out.push({ flat: 1 }); else if (body === "*") out.push({ star: 1 }); else if (/^-?\d+$/.test(body)) out.push({ idx: +body }); else if (body[0] === "?") out.push({ filter: body.slice(1).trim() }); else out.push({ multi: splitTop(body) });
        continue; }
      const m = q.slice(i).match(/^("[^"]*"|[A-Za-z0-9_@]+|\*)/); if (!m) throw new Error(`Bad value for --query ${q}: invalid token`); out.push({ field: m[1].replace(/"/g, "") }); i += m[1].length;
    }
    return out;
  }
  function splitTop(s) { const out = [""]; let d = 0, qu = null; for (const c of s) { if (qu) { if (c === qu) qu = null; } else if (c === "'" || c === "`") qu = c; else if ("[{(".includes(c)) d++; else if ("]})".includes(c)) d--; else if (c === "," && !d) { out.push(""); continue; } out[out.length - 1] += c; } return out.map(x => x.trim()).filter(Boolean); }
  function lit(s) { s = s.trim(); if (/^'.*'$/.test(s)) return s.slice(1, -1); if (/^`.*`$/.test(s)) { try { return JSON.parse(s.slice(1, -1)); } catch (e) { return s.slice(1, -1); } } if (/^-?\d+(\.\d+)?$/.test(s)) return +s; return undefined; }
  function cond(c, x) {
    const ors = c.split("||"); if (ors.length > 1) return ors.some(p => cond(p, x));
    const ands = c.split("&&"); if (ands.length > 1) return ands.every(p => cond(p, x));
    const m = c.match(/^(.+?)\s*(==|!=|>=|<=|>|<)\s*(.+)$/);
    if (!m) { const f = c.trim().match(/^contains\((.+?),\s*(.+)\)$/); if (f) { const v = query(f[1], x), w = lit(f[2]); return Array.isArray(v) ? v.includes(w) : typeof v === "string" && v.includes(w); } const v = query(c.trim(), x); return v != null && v !== false && !(Array.isArray(v) && !v.length); }
    const a = query(m[1].trim(), x), b = lit(m[3]) !== undefined ? lit(m[3]) : query(m[3].trim(), x);
    return { "==": a === b, "!=": a !== b, ">": a > b, "<": a < b, ">=": a >= b, "<=": a <= b }[m[2]];
  }
  function query(q, data) {
    const pipes = splitPipe(q); if (pipes.length > 1) return pipes.reduce((v, p) => query(p, v), data);
    q = q.trim(); const fn = q.match(/^(length|sort|reverse)\((.*)\)$/);
    if (fn) { const v = query(fn[2] || "@", data); return fn[1] === "length" ? (v == null ? null : v.length != null ? v.length : Object.keys(v).length) : fn[1] === "sort" ? [...L(v)].sort() : [...L(v)].reverse(); }
    let val = data, d = 0;
    const ap = (v, depth, f) => depth === 0 ? f(v) : Array.isArray(v) ? v.map(x => ap(x, depth - 1, f)).filter(x => x != null) : null;
    const collapse = (v, depth) => depth === 0 ? v : L(v).flatMap(x => { const c = collapse(x, depth - 1); return depth === 1 ? [c] : c; });
    for (const s of segs(q)) {
      if (s.field != null) val = ap(val, d, x => s.field === "@" ? x : x && typeof x === "object" && !Array.isArray(x) ? (x[s.field] === undefined ? null : x[s.field]) : null);
      else if (s.idx != null) val = ap(val, d, x => Array.isArray(x) ? (x[s.idx < 0 ? x.length + s.idx : s.idx] ?? null) : null);
      else if (s.star) { val = ap(val, d, x => Array.isArray(x) ? x : x && typeof x === "object" ? Object.values(x) : null); d++; }
      else if (s.flat) { const c = collapse(val, d); if (!Array.isArray(c)) { val = null; d = 0; continue; } val = c.flatMap(x => Array.isArray(x) ? x : [x]).filter(x => x != null); d = 1; }
      else if (s.filter) { val = ap(val, d, x => Array.isArray(x) ? x.filter(y => cond(s.filter, y)) : null); d++; }
      else if (s.multi) val = ap(val, d, x => x == null ? null : s.multi.map(p => query(p, x)));
      else if (s.hash) val = ap(val, d, x => x == null ? null : Object.fromEntries(s.hash.map(([k, p]) => [k, query(p, x)])));
    }
    return val;
  }
  function splitPipe(q) { const out = [""]; let qu = null, d = 0; for (let i = 0; i < q.length; i++) { const c = q[i]; if (qu) { if (c === qu) qu = null; } else if (c === "'" || c === "`") qu = c; else if ("[{(".includes(c)) d++; else if ("]})".includes(c)) d--; else if (c === "|" && q[i + 1] !== "|" && q[i - 1] !== "|" && !d) { out.push(""); continue; } out[out.length - 1] += c; } return out; }

  const scal = v => v === null || typeof v !== "object";
  const txt = v => v == null ? "None" : v === true ? "True" : v === false ? "False" : String(v);
  function textOut(v, key) {
    if (scal(v)) return txt(v);
    if (Array.isArray(v)) return v.every(scal) ? v.map(txt).join("\t") : v.map(x => textOut(x, key)).filter(s => s !== "").join("\n");
    const ks = Object.keys(v), sc = ks.filter(k => scal(v[k])), nest = ks.filter(k => !scal(v[k]));
    const lines = []; if (sc.length) lines.push((key ? key.toUpperCase() + "\t" : "") + sc.map(k => txt(v[k])).join("\t"));
    nest.forEach(k => { const s = textOut(v[k], k); if (s) lines.push(s); });
    return lines.join("\n");
  }
  function tableOut(title, v) {
    const rows = []; const walk = x => { if (scal(x)) rows.push([txt(x)]); else if (Array.isArray(x)) { if (x.every(y => Array.isArray(y) && y.every(scal))) x.forEach(y => rows.push(y.map(txt))); else x.forEach(walk); } else Object.entries(x).forEach(([k, y]) => scal(y) ? rows.push([k, txt(y)]) : (rows.push([k + ":"]), walk(y))); };
    walk(v); const n = Math.max(1, ...rows.map(r => r.length)), w = Array(n).fill(0); rows.forEach(r => r.forEach((c, i) => { w[i] = Math.max(w[i], c.length); }));
    let total = w.reduce((a, b) => a + b + 5, -1); total = Math.max(total, title.length + 4);
    const line = r => "|" + (r.length === 1 && n > 1 ? "  " + r[0].padEnd(total - 4) + "  " : r.map((c, i) => "  " + c.padEnd(i === r.length - 1 ? total - w.slice(0, i).reduce((a, b) => a + b + 5, 0) - 4 : w[i]) + "  ").join("|")) + "|";
    const bar = "-".repeat(total + 2), mid = "|" + title.padStart(Math.floor((total + title.length) / 2)).padEnd(total) + "|";
    return [bar, mid, "+" + "-".repeat(total) + "+", ...rows.map(line), bar].join("\n");
  }

  function run(S, line) {
    line = String(line || "").trim(); if (!line) return "";
    S.history.push(line);
    let out; try { out = exec(S, tokens(line)); } catch (e) { out = e && e.aws ? e.aws : "An error occurred (InternalFailure): " + (e && e.message); }
    out = out == null ? "" : String(out);
    if (!isError(out)) S.ok.push(line);
    return out;
  }
  function exec(S, t) {
    const [c0, ...rest] = t;
    if (c0 === "help" || (c0 === "aws" && (!rest.length || rest[0] === "help"))) return "Supported in this practice AWS CLI:\n  " + CMDS.join("\n  ") + "\nGlobal options: --region  --output json|text|table  --query <JMESPath>\nLocal shell: ls, cat <file>, echo, history, clear";
    if (c0 === "ls") return Object.keys(S.local).sort().join("  ");
    if (c0 === "cat") { const f = S.local[(rest[0] || "").replace(/^\.\//, "")]; return f == null ? `cat: ${rest[0] || ""}: No such file or directory` : f.replace(/\n$/, ""); }
    if (c0 === "echo") return rest.join(" ");
    if (c0 === "history") return S.history.map((h, i) => `${String(i + 1).padStart(5)}  ${h}`).join("\n");
    if (c0 !== "aws") return `bash: ${c0}: command not found`;
    if (rest.includes("--version")) return "aws-cli/2.17.40 Python/3.11.9 Linux/6.1.102 exe/x86_64.amzn.2023";
    const { pos, opts } = parseArgs(rest), [svc, op, ...args] = pos;
    const o = n => opts[n] && opts[n].length ? opts[n][0] : undefined, has = n => !!opts[n];
    const output = o("output") || S.output, region = o("region") || S.region, qy = o("query");
    if (!["json", "text", "table", "yaml"].includes(output)) return `aws: error: argument --output: Invalid choice, valid choices are:\n\njson                                     | text\ntable                                    | yaml\nyaml-stream`;
    if (o("profile") && o("profile") !== "default") return `The config profile (${o("profile")}) could not be found`;
    if (!OPS[svc]) return `usage: aws [options] <command> <subcommand> [<subcommand> ...] [parameters]\nTo see help text, you can run:\n\n  aws help\n  aws <command> help\n  aws <command> <subcommand> help\n\naws: error: argument command: Invalid choice, valid choices are (in this practice CLI):\n\n${Object.keys(OPS).join(" | ")}`;
    const ops = OPS[svc].split(" ");
    if (!op || op === "help" || !ops.includes(op)) return `usage: aws [options] <command> <subcommand> [<subcommand> ...] [parameters]\n\naws: error: argument operation: Invalid choice, valid choices are:\n\n${ops.join(" | ")}`;
    const ON = opName(op), fail = (code, msg) => { throw { aws: `An error occurred (${code}) when calling the ${ON} operation: ${msg}` }; };
    const need = (...ns) => { const miss = ns.filter(n => !has(n)); if (miss.length) throw { aws: `usage: aws [options] <command> <subcommand> [<subcommand> ...] [parameters]\n\naws: error: the following arguments are required: ${miss.map(n => "--" + n).join(", ")}` }; };
    const val = n => { let v = o(n); if (typeof v === "string" && v.startsWith("file://")) { const f = v.slice(7).replace(/^\.\//, ""); if (S.local[f] == null) throw { aws: `Error parsing parameter '--${n}': Unable to load paramfile ${v}, [Errno 2] No such file or directory: '${v.slice(7)}'` }; v = S.local[f]; } return v; };
    const json = n => { try { return typeof val(n) === "object" ? val(n) : sh(val(n)); } catch (e) { if (e.aws) throw e; throw { aws: `Error parsing parameter '--${n}': Invalid JSON: ${e.message}` }; } };
    const many = n => (opts[n] || []).flatMap(v => { const p = sh(v); return Array.isArray(p) ? p : [p]; });
    const C = { S, o, has, need, fail, val, json, many, args, region, all: n => opts[n] || [] };
    const H = HANDLERS[svc][op] || (() => fail("InvalidAction", "This operation isn't simulated here."));
    const res = H(C);
    if (res === undefined || res === "" || typeof res === "string") return res || "";
    const v = qy ? query(qy, res) : res;
    if (output === "text") return textOut(v); if (output === "table") return tableOut(ON, v);
    return JSON.stringify(v, null, 4);
  }

  // ---------- helpers for services ----------
  const s3url = u => { const m = String(u || "").match(/^s3:\/\/([^/]+)\/?(.*)$/); return m ? { b: m[1], k: m[2] } : null; };
  const bucket = (C, n) => { const b = C.S.buckets[n]; if (!b) C.fail("NoSuchBucket", "The specified bucket does not exist"); return b; };
  const s3d = d => d.replace("T", " ").slice(0, 19);
  const policyName = arn => arn.split("/").pop();
  function attachable(C, arn) { if (!/^arn:aws:iam::(aws|\d{12}):policy\/.+/.test(arn)) C.fail("InvalidInput", `ARN ${arn} is not valid.`); const ok = arn.startsWith("arn:aws:iam::aws:policy/") ? MANAGED.includes(arn.slice(24)) : Object.values(C.S.policies).some(p => p.arn === arn); if (!ok) C.fail("NoSuchEntity", `Policy ${arn} does not exist or is not attachable.`); return arn; }
  const user = (C, n) => { const u = C.S.users[n]; if (!u) C.fail("NoSuchEntity", `The user with name ${n} cannot be found.`); return u; };
  const group = (C, n) => { const g = C.S.groups[n]; if (!g) C.fail("NoSuchEntity", `The group with name ${n} cannot be found.`); return g; };
  const role = (C, n) => { const r = C.S.roles[n]; if (!r) C.fail("NoSuchEntity", `The role with name ${n} cannot be found.`); return r; };
  const userOut = (n, u) => ({ Path: "/", UserName: n, UserId: u.id, Arn: `arn:aws:iam::${ACCT}:user/${n}`, CreateDate: u.created });
  const attached = arr => ({ AttachedPolicies: arr.map(a => ({ PolicyName: policyName(a), PolicyArn: a })) });
  const bucketName = n => /^(?!xn--)(?!.*\.\.)[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(n) && !/^\d+\.\d+\.\d+\.\d+$/.test(n);
  function makeBucket(C, n) {
    if (!bucketName(n)) C.fail("InvalidBucketName", "The specified bucket is not valid.");
    if (C.S.buckets[n]) C.fail("BucketAlreadyOwnedByYou", "Your previous request to create the named bucket succeeded and you already own it.");
    if (TAKEN.includes(n)) C.fail("BucketAlreadyExists", "The requested bucket name is not available. The bucket namespace is shared by all users of the system. Please select a different name and try again.");
    C.S.buckets[n] = { created: NOW, objects: {}, versioning: null, pab: pabAll(true), enc: { alg: "AES256" }, policy: null };
  }
  const inst = (C, id) => { const i = C.S.instances.find(x => x.id === id); if (!i) C.fail(/^i-[0-9a-f]{8,17}$/.test(id) ? "InvalidInstanceID.NotFound" : "InvalidInstanceID.Malformed", /^i-[0-9a-f]{8,17}$/.test(id) ? `The instance ID '${id}' does not exist` : `Invalid id: "${id}"`); return i; };
  const instOut = (i, S) => Object.assign({ AmiLaunchIndex: 0, ImageId: i.ami, InstanceId: i.id, InstanceType: i.type }, i.key ? { KeyName: i.key } : {}, { LaunchTime: i.launched, Monitoring: { State: "disabled" }, Placement: { AvailabilityZone: i.subnet.az, GroupName: "", Tenancy: "default" }, PrivateIpAddress: i.ip },
    i.pub && i.state === "running" ? { PublicIpAddress: i.pub } : {}, { State: { Code: STATE[i.state], Name: i.state }, SubnetId: i.subnet.id, VpcId: i.subnet.vpc, Architecture: "x86_64", RootDeviceType: "ebs", RootDeviceName: "/dev/xvda" },
    i.profile ? { IamInstanceProfile: { Arn: `arn:aws:iam::${ACCT}:instance-profile/${i.profile}` } } : {}, { SecurityGroups: i.sgs.map(g => ({ GroupId: g, GroupName: ((S && S.sgs.find(x => x.id === g)) || {}).name || "" })), Tags: tagList(i.tags) });
  const sgFind = (C, idOrName, byName) => { const g = C.S.sgs.find(s => byName ? s.name === idOrName && s.vpc === C.S.vpcs[0].id : s.id === idOrName); if (!g) C.fail(byName ? "InvalidGroup.NotFound" : "InvalidGroup.NotFound", byName ? `The security group '${idOrName}' does not exist in default VPC '${C.S.vpcs[0].id}'` : `The security group '${idOrName}' does not exist`); return g; };
  function sgOut(g) {
    const perms = []; g.rules.forEach(r => { let p = perms.find(x => x._k === `${r.proto}/${r.from}/${r.to}`); if (!p) { p = Object.assign({ _k: `${r.proto}/${r.from}/${r.to}` }, r.proto === "-1" ? {} : { FromPort: r.from }, { IpProtocol: r.proto, IpRanges: [], Ipv6Ranges: [], PrefixListIds: [] }, r.proto === "-1" ? {} : { ToPort: r.to }, { UserIdGroupPairs: [] }); perms.push(p); } p.IpRanges.push({ CidrIp: r.cidr }); });
    perms.forEach(p => delete p._k);
    return Object.assign({ Description: g.desc, GroupName: g.name, IpPermissions: perms, OwnerId: ACCT, GroupId: g.id, IpPermissionsEgress: [{ IpProtocol: "-1", IpRanges: [{ CidrIp: "0.0.0.0/0" }], Ipv6Ranges: [], PrefixListIds: [], UserIdGroupPairs: [] }] }, Object.keys(g.tags).length ? { Tags: tagList(g.tags) } : {}, { VpcId: g.vpc });
  }
  function rulesFrom(C) {
    if (C.has("ip-permissions")) return C.many("ip-permissions").flatMap(p => { const ranges = L(p.IpRanges).map(r => typeof r === "string" ? r : r.CidrIp); if (!ranges.length) C.fail("MissingParameter", "Either 'ipPermissions.ipRanges' or 'sourceSecurityGroup' must be specified."); return ranges.map(c => rule(p.IpProtocol, p.FromPort != null ? `${p.FromPort}-${p.ToPort != null ? p.ToPort : p.FromPort}` : null, c)); });
    const proto = C.o("protocol"); if (!proto) C.fail("MissingParameter", "The request must contain the parameter ipPermissions");
    if (!["tcp", "udp", "icmp", "all", "-1"].includes(String(proto).toLowerCase()) && !/^\d+$/.test(proto)) C.fail("InvalidParameterValue", `Invalid value '${proto}' for IP protocol. Unknown protocol.`);
    if (!/^(all|-1)$/i.test(proto) && C.o("port") == null) C.fail("InvalidParameterValue", "Invalid value 'Must specify both from and to ports with TCP/UDP.' for portRange.");
    const cidr = C.o("cidr") || "0.0.0.0/0"; if (!/^\d{1,3}(\.\d{1,3}){3}\/\d{1,2}$/.test(cidr)) C.fail("InvalidParameterValue", `CIDR block ${cidr} is malformed`);
    return [rule(proto, C.o("port"), cidr)];
  }
  const ruleStr = r => `peer: ${r.cidr}, ${r.proto === "-1" ? "ALL" : r.proto.toUpperCase()}, from port: ${r.from}, to port: ${r.to}, ALLOW`;
  function filtersMatch(C, filters, get) { return filters.every(f => { const n = f.Name, vals = L(f.Values).map(glob), c = get(n); if (c === undefined) C.fail("InvalidParameterValue", `The filter '${n}' is invalid`); return L(c).some(x => vals.some(r => r.test(String(x)))); }); }
  function tagsFrom(C, n) { const o = {}; C.many(n).forEach(t => { if (t.Key != null) o[t.Key] = t.Value != null ? String(t.Value) : ""; }); return o; }
  const keyFind = (C, k) => { const S = C.S, a = S.aliases[k]; const key = S.keys.find(x => x.id === k || x.arn === k || (a && x.id === a.key)); if (!key) C.fail("NotFoundException", `Key '${/^arn:/.test(k) ? k : `arn:aws:kms:us-east-1:${ACCT}:${/^alias\//.test(k) ? k : "key/" + k}`}' does not exist`); return key; };
  const keyOut = k => ({ AWSAccountId: ACCT, KeyId: k.id, Arn: k.arn, CreationDate: k.created, Enabled: true, Description: k.desc, KeyUsage: "ENCRYPT_DECRYPT", KeyState: "Enabled", Origin: "AWS_KMS", KeyManager: "CUSTOMER", CustomerMasterKeySpec: "SYMMETRIC_DEFAULT", KeySpec: "SYMMETRIC_DEFAULT", EncryptionAlgorithms: ["SYMMETRIC_DEFAULT"], MultiRegion: false });
  const fnFind = (C, n) => { const f = C.S.functions[n]; if (!f) C.fail("ResourceNotFoundException", `Function not found: arn:aws:lambda:us-east-1:${ACCT}:function:${n}`); return f; };
  const fnOut = (n, f) => Object.assign({ FunctionName: n, FunctionArn: `arn:aws:lambda:us-east-1:${ACCT}:function:${n}`, Runtime: f.runtime, Role: f.role, Handler: f.handler, CodeSize: f.size, Description: f.desc, Timeout: f.timeout, MemorySize: f.memory, LastModified: "2026-09-20T08:00:00.000+0000", CodeSha256: hash(n) + "EXAMPLEsha256=", Version: "$LATEST" }, Object.keys(f.env).length ? { Environment: { Variables: f.env } } : {}, { TracingConfig: { Mode: f.tracing }, PackageType: "Zip", Architectures: ["x86_64"], EphemeralStorage: { Size: 512 }, State: "Active", LastUpdateStatus: "Successful" });
  const dbOut = (n, d) => ({ DBInstanceIdentifier: n, DBInstanceClass: d.cls, Engine: d.engine, DBInstanceStatus: "available", Endpoint: { Address: `${n}.c9akciq32example.us-east-1.rds.amazonaws.com`, Port: /postgres/.test(d.engine) ? 5432 : 3306 }, BackupRetentionPeriod: d.backup, MultiAZ: d.multiAZ, PubliclyAccessible: d.pub, StorageEncrypted: d.enc, PendingModifiedValues: Object.assign({}, d.pending), DBInstanceArn: `arn:aws:rds:us-east-1:${ACCT}:db:${n}` });
  const alarmOut = a => ({ AlarmName: a.name, AlarmArn: `arn:aws:cloudwatch:us-east-1:${ACCT}:alarm:${a.name}`, AlarmDescription: a.desc || "", ActionsEnabled: true, OKActions: [], AlarmActions: a.actions, InsufficientDataActions: [], StateValue: "INSUFFICIENT_DATA", StateReason: "Unchecked: Initial alarm creation", MetricName: a.metric, Namespace: a.ns, Statistic: a.stat, Dimensions: a.dims, Period: a.period, EvaluationPeriods: a.evals, Threshold: a.threshold, ComparisonOperator: a.op });

  const HANDLERS = {
    configure: {
      list: C => `      Name                    Value             Type    Location\n      ----                    -----             ----    --------\n   profile                <not set>             None    None\naccess_key     ****************MPLE shared-credentials-file    \nsecret_key     ****************EKEY shared-credentials-file    \n    region                ${C.S.region.padStart(9)}      config-file    ~/.aws/config`,
      get: C => { const k = C.args[0]; return k === "region" ? C.S.region : k === "output" ? C.S.output : ""; },
      set: C => { const [k, v] = C.args; if (k === "region") C.S.region = v; else if (k === "output" && ["json", "text", "table"].includes(v)) C.S.output = v; return ""; }
    },
    sts: { "get-caller-identity": C => Object.assign({}, C.S.identity) },
    s3: {
      ls: C => {
        const S = C.S, u = s3url(C.args[0]);
        if (!C.args[0]) return Object.keys(S.buckets).sort().map(n => `${s3d(S.buckets[n].created)} ${n}`).join("\n");
        if (!u) return `\nParameter validation failed:\nInvalid bucket name "${C.args[0]}"`;
        const b = S.buckets[u.b]; if (!b) return "An error occurred (NoSuchBucket) when calling the ListObjectsV2 operation: The specified bucket does not exist";
        const keys = Object.keys(b.objects).filter(k => k.startsWith(u.k)).sort(), row = (k, n) => `${s3d(NOW)} ${String(b.objects[k].size).padStart(10)} ${n}`;
        if (C.has("recursive")) return keys.map(k => row(k, k)).join("\n");
        const pre = u.k && !u.k.endsWith("/") && keys.some(k => k.startsWith(u.k + "/")) ? u.k + "/" : u.k, dirs = new Set(), out = [];
        keys.filter(k => k.startsWith(pre)).forEach(k => { const r = k.slice(pre.length), i = r.indexOf("/"); if (i >= 0) dirs.add(r.slice(0, i + 1)); else out.push(row(k, r)); });
        return [...[...dirs].map(d => `${" ".repeat(27)}PRE ${d}`), ...out].join("\n");
      },
      mb: C => { const u = s3url(C.args[0]); if (!u) return `\nParameter validation failed:\nInvalid bucket name "${C.args[0] || ""}"`; try { makeBucket(C, u.b); } catch (e) { return `make_bucket failed: s3://${u.b} ${e.aws.replace("calling the Mb", "calling the CreateBucket")}`; } return `make_bucket: ${u.b}`; },
      rb: C => {
        const u = s3url(C.args[0]), S = C.S; if (!u) return `\nParameter validation failed:\nInvalid bucket name "${C.args[0] || ""}"`; const b = S.buckets[u.b];
        if (!b) return `remove_bucket failed: s3://${u.b} An error occurred (NoSuchBucket) when calling the DeleteBucket operation: The specified bucket does not exist`;
        const ks = Object.keys(b.objects); if (ks.length && !C.has("force")) return `remove_bucket failed: s3://${u.b} An error occurred (BucketNotEmpty) when calling the DeleteBucket operation: The bucket you tried to delete is not empty`;
        delete S.buckets[u.b]; return [...ks.map(k => `delete: s3://${u.b}/${k}`), `remove_bucket: ${u.b}`].join("\n");
      },
      cp: C => {
        const [src, dst] = C.args, S = C.S, a = s3url(src), b = s3url(dst); if (!src || !dst) return "usage: aws s3 cp <LocalPath> <S3Uri> or <S3Uri> <LocalPath> or <S3Uri> <S3Uri>\nError: Invalid argument type";
        if (!a && !b) return "usage: aws s3 cp <LocalPath> <S3Uri> or <S3Uri> <LocalPath> or <S3Uri> <S3Uri>\nError: Invalid argument type";
        if (!a) { const f = src.replace(/^\.\//, ""); if (S.local[f] == null) return `The user-provided path ${src} does not exist.`; const key = !b.k || b.k.endsWith("/") ? b.k + f.split("/").pop() : b.k; if (!S.buckets[b.b]) return `upload failed: ./${f} to s3://${b.b}/${key} An error occurred (NoSuchBucket) when calling the PutObject operation: The specified bucket does not exist`; S.buckets[b.b].objects[key] = { size: S.local[f].length, body: S.local[f] }; return `upload: ./${f} to s3://${b.b}/${key}`; }
        const sb = S.buckets[a.b]; if (!sb) return "fatal error: An error occurred (NoSuchBucket) when calling the HeadObject operation: The specified bucket does not exist";
        const obj = sb.objects[a.k]; if (!obj) return `fatal error: An error occurred (404) when calling the HeadObject operation: Key "${a.k}" does not exist`;
        if (!b) { const name = dst === "." || dst === "./" ? a.k.split("/").pop() : dst.replace(/^\.\//, ""); S.local[name] = obj.body; return `download: s3://${a.b}/${a.k} to ./${name}`; }
        if (!S.buckets[b.b]) return `copy failed: s3://${a.b}/${a.k} to s3://${b.b}/${b.k} An error occurred (NoSuchBucket) when calling the CopyObject operation: The specified bucket does not exist`;
        const key = !b.k || b.k.endsWith("/") ? b.k + a.k.split("/").pop() : b.k; S.buckets[b.b].objects[key] = Object.assign({}, obj); return `copy: s3://${a.b}/${a.k} to s3://${b.b}/${key}`;
      },
      rm: C => { const u = s3url(C.args[0]); if (!u) return `\nParameter validation failed:\nInvalid bucket name "${C.args[0] || ""}"`; const b = C.S.buckets[u.b]; if (!b) return "delete failed: An error occurred (NoSuchBucket) when calling the DeleteObject operation: The specified bucket does not exist"; const ks = C.has("recursive") ? Object.keys(b.objects).filter(k => k.startsWith(u.k)) : [u.k]; ks.forEach(k => delete b.objects[k]); return ks.map(k => `delete: s3://${u.b}/${k}`).join("\n"); }
    },
    s3api: {
      "create-bucket": C => { C.need("bucket"); const n = C.o("bucket"), lc = C.has("create-bucket-configuration") ? C.json("create-bucket-configuration").LocationConstraint : null;
        if (lc === "us-east-1") C.fail("InvalidLocationConstraint", "The specified location-constraint is not valid");
        if (C.region !== "us-east-1" && !lc) C.fail("IllegalLocationConstraintException", "The unspecified location constraint is incompatible for the region specific endpoint this request was sent to.");
        makeBucket(C, n); return { Location: lc ? "http:" + "//" + n + ".s3.amazonaws.com/" : "/" + n }; },
      "delete-bucket": C => { C.need("bucket"); const b = bucket(C, C.o("bucket")); if (Object.keys(b.objects).length) C.fail("BucketNotEmpty", "The bucket you tried to delete is not empty"); delete C.S.buckets[C.o("bucket")]; },
      "list-buckets": C => ({ Buckets: Object.keys(C.S.buckets).sort().map(n => ({ Name: n, CreationDate: C.S.buckets[n].created })), Owner: { DisplayName: "cloud-admin", ID: "79a59df900b949e55d96a1e698fbacedfd6e09d98eacf8f8d5218e7cd47ef2be" } }),
      "put-bucket-versioning": C => { C.need("bucket", "versioning-configuration"); const b = bucket(C, C.o("bucket")), st = C.json("versioning-configuration").Status; if (!["Enabled", "Suspended"].includes(st)) C.fail("MalformedXML", "The XML you provided was not well-formed or did not validate against our published schema"); b.versioning = st; },
      "get-bucket-versioning": C => { C.need("bucket"); const b = bucket(C, C.o("bucket")); return b.versioning ? { Status: b.versioning, MFADelete: "Disabled" } : ""; },
      "put-public-access-block": C => { C.need("bucket", "public-access-block-configuration"); const b = bucket(C, C.o("bucket")), c = C.json("public-access-block-configuration"); b.pab = pabAll(false); Object.keys(b.pab).forEach(k => { if (c[k] != null) b.pab[k] = bool(c[k]); }); },
      "get-public-access-block": C => { C.need("bucket"); const b = bucket(C, C.o("bucket")); if (!b.pab) C.fail("NoSuchPublicAccessBlockConfiguration", "The public access block configuration was not found"); return { PublicAccessBlockConfiguration: Object.assign({}, b.pab) }; },
      "put-bucket-encryption": C => { C.need("bucket", "server-side-encryption-configuration"); const b = bucket(C, C.o("bucket")), c = C.json("server-side-encryption-configuration"), r = L(c.Rules)[0] || {}, d = r.ApplyServerSideEncryptionByDefault || {};
        if (!["AES256", "aws:kms", "aws:kms:dsse"].includes(d.SSEAlgorithm)) C.fail("MalformedXML", "The XML you provided was not well-formed or did not validate against our published schema");
        if (d.KMSMasterKeyID && d.SSEAlgorithm === "AES256") C.fail("InvalidArgument", "a KMSMasterKeyID is not applicable if the default sse algorithm is not aws:kms or aws:kms:dsse");
        b.enc = { alg: d.SSEAlgorithm, key: d.KMSMasterKeyID, bucketKey: bool(r.BucketKeyEnabled) }; },
      "get-bucket-encryption": C => { C.need("bucket"); const b = bucket(C, C.o("bucket")); if (!b.enc) C.fail("ServerSideEncryptionConfigurationNotFoundError", "The server side encryption configuration was not found"); return { ServerSideEncryptionConfiguration: { Rules: [{ ApplyServerSideEncryptionByDefault: Object.assign({ SSEAlgorithm: b.enc.alg }, b.enc.key ? { KMSMasterKeyID: b.enc.key } : {}), BucketKeyEnabled: !!b.enc.bucketKey }] } }; },
      "put-bucket-policy": C => { C.need("bucket", "policy"); const b = bucket(C, C.o("bucket")), raw = String(C.val("policy")); let doc; try { doc = JSON.parse(raw); } catch (e) { C.fail("MalformedPolicy", "Policies must be valid JSON and the first byte must be '{'"); }
        const pub = L(doc.Statement).some(s => s.Effect === "Allow" && (s.Principal === "*" || (s.Principal && L(s.Principal.AWS).includes("*"))) && !s.Condition);
        if (pub && b.pab && b.pab.BlockPublicPolicy) C.fail("AccessDenied", `User: ${C.S.identity.Arn} is not authorized to perform: s3:PutBucketPolicy on resource: "arn:aws:s3:::${C.o("bucket")}" because public policies are blocked by the BlockPublicPolicy block public access setting.`);
        b.policy = JSON.stringify(doc); },
      "get-bucket-policy": C => { C.need("bucket"); const b = bucket(C, C.o("bucket")); if (!b.policy) C.fail("NoSuchBucketPolicy", "The bucket policy does not exist"); return { Policy: b.policy }; },
      "delete-bucket-policy": C => { C.need("bucket"); bucket(C, C.o("bucket")).policy = null; },
      "list-objects-v2": C => { C.need("bucket"); const b = bucket(C, C.o("bucket")), p = C.o("prefix") || ""; const ks = Object.keys(b.objects).filter(k => k.startsWith(p)).sort();
        return Object.assign(ks.length ? { Contents: ks.map(k => ({ Key: k, LastModified: NOW, ETag: `"${hash(k)}${hash(k + "x")}${hash(k + "y")}${hash(k + "z")}"`, ChecksumAlgorithm: ["CRC32"], Size: b.objects[k].size, StorageClass: "STANDARD" })) } : {}, { RequestCharged: null, Prefix: p, KeyCount: ks.length }); }
    },
    iam: {
      "create-user": C => { C.need("user-name"); const n = C.o("user-name"), S = C.S; if (S.users[n]) C.fail("EntityAlreadyExists", `User with name ${n} already exists.`); S.users[n] = newUser(S, n, NOW); return { User: userOut(n, S.users[n]) }; },
      "get-user": C => { const n = C.o("user-name"); if (!n) return { User: userOut("cloud-admin", C.S.users["cloud-admin"] || newUser(C.S, "cloud-admin", OLD)) }; return { User: userOut(n, user(C, n)) }; },
      "list-users": C => ({ Users: Object.keys(C.S.users).sort().map(n => userOut(n, C.S.users[n])) }),
      "create-group": C => { C.need("group-name"); const n = C.o("group-name"); if (C.S.groups[n]) C.fail("EntityAlreadyExists", `Group with name ${n} already exists.`); C.S.groups[n] = { policies: [], created: NOW }; return { Group: { Path: "/", GroupName: n, GroupId: "AGPA" + hash(n).toUpperCase() + "EXAMPLE", Arn: `arn:aws:iam::${ACCT}:group/${n}`, CreateDate: NOW } }; },
      "list-groups": C => ({ Groups: Object.keys(C.S.groups).sort().map(n => ({ Path: "/", GroupName: n, GroupId: "AGPA" + hash(n).toUpperCase() + "EXAMPLE", Arn: `arn:aws:iam::${ACCT}:group/${n}`, CreateDate: C.S.groups[n].created })) }),
      "add-user-to-group": C => { C.need("group-name", "user-name"); group(C, C.o("group-name")); const u = user(C, C.o("user-name")); if (!u.groups.includes(C.o("group-name"))) u.groups.push(C.o("group-name")); },
      "list-groups-for-user": C => { C.need("user-name"); const u = user(C, C.o("user-name")); return { Groups: u.groups.map(n => ({ Path: "/", GroupName: n, GroupId: "AGPA" + hash(n).toUpperCase() + "EXAMPLE", Arn: `arn:aws:iam::${ACCT}:group/${n}`, CreateDate: C.S.groups[n].created })) }; },
      "attach-user-policy": C => { C.need("user-name", "policy-arn"); const u = user(C, C.o("user-name")), a = attachable(C, C.o("policy-arn")); if (!u.policies.includes(a)) u.policies.push(a); },
      "detach-user-policy": C => { C.need("user-name", "policy-arn"); const u = user(C, C.o("user-name")), a = C.o("policy-arn"); if (!u.policies.includes(a)) C.fail("NoSuchEntity", `Policy ${a} was not found.`); u.policies = u.policies.filter(x => x !== a); },
      "attach-group-policy": C => { C.need("group-name", "policy-arn"); const g = group(C, C.o("group-name")), a = attachable(C, C.o("policy-arn")); if (!g.policies.includes(a)) g.policies.push(a); },
      "list-attached-user-policies": C => { C.need("user-name"); return attached(user(C, C.o("user-name")).policies); },
      "list-attached-group-policies": C => { C.need("group-name"); return attached(group(C, C.o("group-name")).policies); },
      "create-role": C => { C.need("role-name", "assume-role-policy-document"); const n = C.o("role-name"), S = C.S; if (S.roles[n]) C.fail("EntityAlreadyExists", `Role with name ${n} already exists.`); let doc; try { doc = JSON.parse(String(C.val("assume-role-policy-document"))); } catch (e) { if (e.aws) throw e; C.fail("MalformedPolicyDocument", "This policy contains invalid Json"); }
        if (!L(doc.Statement).length || !L(doc.Statement).every(s => s.Principal && s.Action)) C.fail("MalformedPolicyDocument", "Has prohibited field Resource" + (L(doc.Statement).some(s => !s.Principal) ? ": a trust policy needs a Principal" : ""));
        S.roles[n] = { policies: [], trust: doc, created: NOW, id: "AROA" + hash(n).toUpperCase() + "EXAMPLE" }; return { Role: { Path: "/", RoleName: n, RoleId: S.roles[n].id, Arn: `arn:aws:iam::${ACCT}:role/${n}`, CreateDate: NOW, AssumeRolePolicyDocument: doc } }; },
      "list-roles": C => ({ Roles: Object.keys(C.S.roles).sort().map(n => ({ Path: "/", RoleName: n, RoleId: C.S.roles[n].id, Arn: `arn:aws:iam::${ACCT}:role/${n}`, CreateDate: C.S.roles[n].created, AssumeRolePolicyDocument: C.S.roles[n].trust, MaxSessionDuration: 3600 })) }),
      "attach-role-policy": C => { C.need("role-name", "policy-arn"); const r = role(C, C.o("role-name")), a = attachable(C, C.o("policy-arn")); if (!r.policies.includes(a)) r.policies.push(a); },
      "list-attached-role-policies": C => { C.need("role-name"); return attached(role(C, C.o("role-name")).policies); },
      "create-policy": C => { C.need("policy-name", "policy-document"); const n = C.o("policy-name"); if (C.S.policies[n]) C.fail("EntityAlreadyExists", `A policy called ${n} already exists. Duplicate names are not allowed.`); let doc; try { doc = JSON.parse(String(C.val("policy-document"))); } catch (e) { if (e.aws) throw e; C.fail("MalformedPolicyDocument", "This policy contains invalid Json"); }
        const arn = `arn:aws:iam::${ACCT}:policy/${n}`; C.S.policies[n] = { arn, doc }; return { Policy: { PolicyName: n, PolicyId: "ANPA" + hash(n).toUpperCase() + "EXAMPLE", Arn: arn, Path: "/", DefaultVersionId: "v1", AttachmentCount: 0, IsAttachable: true, CreateDate: NOW, UpdateDate: NOW } }; },
      "get-account-summary": C => { const S = C.S, us = Object.values(S.users); return { SummaryMap: { Users: us.length, UsersQuota: 5000, Groups: Object.keys(S.groups).length, GroupsQuota: 300, Roles: Object.keys(S.roles).length, RolesQuota: 1000, Policies: Object.keys(S.policies).length, PoliciesQuota: 1500, AccessKeysPerUserQuota: 2, AccountMFAEnabled: S.rootMfa ? 1 : 0, AccountAccessKeysPresent: S.rootKeys ? 1 : 0, AccountSigningCertificatesPresent: 0, MFADevices: S.rootMfa ? 1 : 0, MFADevicesInUse: S.rootMfa ? 1 : 0 } }; },
      "create-access-key": C => { const n = C.o("user-name") || "cloud-admin", u = user(C, n); if (u.keys.length >= 2) C.fail("LimitExceeded", "Cannot exceed quota for AccessKeysPerUser: 2"); const k = { id: keyId(C.S), status: "Active", created: NOW }; u.keys.push(k); return { AccessKey: { UserName: n, AccessKeyId: k.id, Status: "Active", SecretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCY" + k.id.slice(-8) + "KEY", CreateDate: NOW } }; },
      "list-access-keys": C => { const n = C.o("user-name") || "cloud-admin"; return { AccessKeyMetadata: user(C, n).keys.map(k => ({ UserName: n, AccessKeyId: k.id, Status: k.status, CreateDate: k.created })) }; },
      "update-access-key": C => { C.need("access-key-id", "status"); const u = user(C, C.o("user-name") || "cloud-admin"), k = u.keys.find(x => x.id === C.o("access-key-id")); if (!["Active", "Inactive"].includes(C.o("status"))) return `\nParameter validation failed:\nInvalid value for parameter Status, value: ${C.o("status")}, valid values: Active, Inactive`; if (!k) C.fail("NoSuchEntity", `The Access Key with id ${C.o("access-key-id")} cannot be found.`); k.status = C.o("status"); },
      "delete-access-key": C => { C.need("access-key-id"); const u = user(C, C.o("user-name") || "cloud-admin"), i = u.keys.findIndex(x => x.id === C.o("access-key-id")); if (i < 0) C.fail("NoSuchEntity", `The Access Key with id ${C.o("access-key-id")} cannot be found.`); u.keys.splice(i, 1); }
    },
    ec2: {
      "describe-instances": C => { const S = C.S, ids = C.all("instance-ids"), fs = C.many("filters"); ids.forEach(i => inst(C, i));
        const list = S.instances.filter(i => (!ids.length || ids.includes(i.id)) && filtersMatch(C, fs, n => n === "instance-state-name" ? i.state : n === "instance-type" ? i.type : n === "instance-id" ? i.id : n === "subnet-id" ? i.subnet.id : n === "vpc-id" ? i.subnet.vpc : n === "image-id" ? i.ami : n === "tag-key" ? Object.keys(i.tags) : n.startsWith("tag:") ? (i.tags[n.slice(4)] != null ? i.tags[n.slice(4)] : []) : n === "availability-zone" ? i.subnet.az : undefined));
        return { Reservations: list.map(i => ({ Groups: [], Instances: [instOut(i, S)], OwnerId: ACCT, ReservationId: i.rid })) }; },
      "run-instances": C => { C.need("image-id"); const S = C.S, ami = C.o("image-id");
        if (!/^ami-[0-9a-f]{8,17}$/.test(ami)) C.fail("InvalidAMIID.Malformed", `Invalid id: "${ami}" (expecting "ami-...")`);
        const sn = C.o("subnet-id") ? S.subnets.find(s => s.id === C.o("subnet-id")) : S.subnets[0]; if (!sn) C.fail("InvalidSubnetID.NotFound", `The subnet ID '${C.o("subnet-id")}' does not exist`);
        const sgs = C.all("security-group-ids").length ? C.all("security-group-ids") : [S.sgs.find(s => s.vpc === sn.vpc && s.name === "default").id];
        sgs.forEach(g => { const x = S.sgs.find(s => s.id === g); if (!x) C.fail("InvalidGroup.NotFound", `The security group '${g}' does not exist in VPC '${sn.vpc}'`); if (x.vpc !== sn.vpc) C.fail("InvalidParameter", `Security group ${g} and subnet ${sn.id} belong to different networks.`); });
        if (C.o("key-name") && !S.keyPairs.includes(C.o("key-name"))) C.fail("InvalidKeyPair.NotFound", `The key pair '${C.o("key-name")}' does not exist`);
        const prof = C.has("iam-instance-profile") ? (C.json("iam-instance-profile").Name || String(C.o("iam-instance-profile")).split("/").pop()) : null;
        if (C.has("dry-run")) C.fail("DryRunOperation", "Request would have succeeded, but DryRun flag is set.");
        const tags = {}; C.many("tag-specifications").filter(t => t.ResourceType === "instance").forEach(t => L(t.Tags).forEach(x => { tags[x.Key] = String(x.Value); }));
        const made = []; for (let k = 0; k < (+C.o("count") || 1); k++) { const i = newInst(S, { ami, type: C.o("instance-type") || "m1.small", state: "running", subnet: sn, sgs, key: C.o("key-name"), profile: prof, tags: Object.assign({}, tags) }); S.instances.push(i); made.push(i); }
        return { Groups: [], Instances: made.map(i => Object.assign(instOut(i, S), { State: { Code: 0, Name: "pending" } })), OwnerId: ACCT, ReservationId: made[0].rid }; },
      "start-instances": C => stateChange(C, "StartingInstances", "running", "pending", i => i.state === "terminated" || i.state === "shutting-down" ? `The instance '${i.id}' is not in a state from which it can be started.` : null),
      "stop-instances": C => stateChange(C, "StoppingInstances", "stopped", "stopping", i => i.state === "terminated" ? `The instance '${i.id}' is not in a state from which it can be stopped.` : null),
      "terminate-instances": C => stateChange(C, "TerminatingInstances", "terminated", "shutting-down", () => null),
      "create-security-group": C => { C.need("group-name", "description"); const S = C.S, vpc = C.o("vpc-id") || S.vpcs[0].id, n = C.o("group-name");
        if (!S.vpcs.some(v => v.id === vpc)) C.fail("InvalidVpcID.NotFound", `The vpc ID '${vpc}' does not exist`);
        if (S.sgs.some(g => g.name === n && g.vpc === vpc)) C.fail("InvalidGroup.Duplicate", `The security group '${n}' already exists for VPC '${vpc}'`);
        if (/^sg-/i.test(n)) C.fail("InvalidParameterValue", "Group names may not be in the format sg-*.");
        const g = { id: S.id("sg"), name: n, desc: C.o("description"), vpc, rules: [], tags: {} }; S.sgs.push(g); return { GroupId: g.id, SecurityGroupArn: `arn:aws:ec2:us-east-1:${ACCT}:security-group/${g.id}` }; },
      "describe-security-groups": C => { const S = C.S, ids = C.all("group-ids"), names = C.all("group-names"); ids.forEach(i => sgFind(C, i)); names.forEach(n => sgFind(C, n, true));
        const fs = C.many("filters"); return { SecurityGroups: S.sgs.filter(g => (!ids.length || ids.includes(g.id)) && (!names.length || (names.includes(g.name) && g.vpc === S.vpcs[0].id)) && filtersMatch(C, fs, n => n === "group-name" ? g.name : n === "group-id" ? g.id : n === "vpc-id" ? g.vpc : n === "ip-permission.from-port" ? g.rules.map(r => r.from) : n === "ip-permission.cidr" ? g.rules.map(r => r.cidr) : n.startsWith("tag:") ? (g.tags[n.slice(4)] || []) : undefined)).map(sgOut) }; },
      "authorize-security-group-ingress": C => { if (!C.has("group-id") && !C.has("group-name")) C.fail("MissingParameter", "The request must contain the parameter groupName or groupId"); const g = C.has("group-id") ? sgFind(C, C.o("group-id")) : sgFind(C, C.o("group-name"), true), rs = rulesFrom(C);
        rs.forEach(r => { if (g.rules.some(x => x.proto === r.proto && x.from === r.from && x.to === r.to && x.cidr === r.cidr)) C.fail("InvalidPermission.Duplicate", `the specified rule "${ruleStr(r)}" already exists`); });
        const out = rs.map(r => { g.rules.push(r); return Object.assign({ SecurityGroupRuleId: C.S.id("sgr"), GroupId: g.id, GroupOwnerId: ACCT, IsEgress: false, IpProtocol: r.proto, FromPort: r.from, ToPort: r.to, CidrIpv4: r.cidr }); });
        return { Return: true, SecurityGroupRules: out }; },
      "revoke-security-group-ingress": C => { if (!C.has("group-id") && !C.has("group-name")) C.fail("MissingParameter", "The request must contain the parameter groupName or groupId"); const g = C.has("group-id") ? sgFind(C, C.o("group-id")) : sgFind(C, C.o("group-name"), true), rs = rulesFrom(C);
        rs.forEach(r => { const i = g.rules.findIndex(x => x.proto === r.proto && x.from === r.from && x.to === r.to && x.cidr === r.cidr); if (i < 0) C.fail("InvalidPermission.NotFound", "The specified rule does not exist in this security group."); g.rules.splice(i, 1); });
        return { Return: true }; },
      "describe-volumes": C => { const ids = C.all("volume-ids"), fs = C.many("filters"); ids.forEach(i => { if (!C.S.volumes.some(v => v.id === i)) C.fail("InvalidVolume.NotFound", `The volume '${i}' does not exist.`); });
        return { Volumes: C.S.volumes.filter(v => (!ids.length || ids.includes(v.id)) && filtersMatch(C, fs, n => n === "attachment.instance-id" ? v.inst || [] : n === "volume-id" ? v.id : n === "encrypted" ? String(v.enc) : n === "status" ? (v.inst ? "in-use" : "available") : n.startsWith("tag:") ? (v.tags[n.slice(4)] || []) : undefined)).map(v => Object.assign({ Attachments: v.inst ? [{ AttachTime: OLD, Device: "/dev/xvda", InstanceId: v.inst, State: "attached", VolumeId: v.id, DeleteOnTermination: true }] : [], AvailabilityZone: v.az, CreateTime: OLD, Encrypted: v.enc, Size: v.size, SnapshotId: "", State: v.inst ? "in-use" : "available", VolumeId: v.id, Iops: 3000 }, Object.keys(v.tags).length ? { Tags: tagList(v.tags) } : {}, { VolumeType: v.type, MultiAttachEnabled: false, Throughput: 125 })) }; },
      "create-snapshot": C => { C.need("volume-id"); const v = C.S.volumes.find(x => x.id === C.o("volume-id")); if (!v) C.fail("InvalidVolume.NotFound", `The volume '${C.o("volume-id")}' does not exist.`);
        const tags = {}; C.many("tag-specifications").filter(t => t.ResourceType === "snapshot").forEach(t => L(t.Tags).forEach(x => { tags[x.Key] = String(x.Value); }));
        const s = { id: C.S.id("snap"), vol: v.id, desc: C.o("description") || "", size: v.size, enc: v.enc, tags, start: NOW }; C.S.snapshots.push(s);
        return Object.assign({ Description: s.desc, Encrypted: v.enc, OwnerId: ACCT, Progress: "", SnapshotId: s.id, StartTime: NOW, State: "pending", VolumeId: v.id, VolumeSize: v.size }, Object.keys(tags).length ? { Tags: tagList(tags) } : {}); },
      "describe-snapshots": C => { const fs = C.many("filters"), ids = C.all("snapshot-ids"); return { Snapshots: C.S.snapshots.filter(s => (!ids.length || ids.includes(s.id)) && filtersMatch(C, fs, n => n === "volume-id" ? s.vol : n === "snapshot-id" ? s.id : n === "status" ? "completed" : n.startsWith("tag:") ? (s.tags[n.slice(4)] || []) : undefined)).map(s => ({ Description: s.desc, Encrypted: !!s.enc, OwnerId: ACCT, Progress: "100%", SnapshotId: s.id, StartTime: s.start, State: "completed", VolumeId: s.vol, VolumeSize: s.size, Tags: tagList(s.tags) })) }; },
      "create-tags": C => { C.need("resources", "tags"); const S = C.S, tags = tagsFrom(C, "tags");
        C.all("resources").forEach(r => { const x = S.instances.find(i => i.id === r) || S.volumes.find(v => v.id === r) || S.sgs.find(g => g.id === r) || S.snapshots.find(s => s.id === r) || S.vpcs.find(v => v.id === r) || S.subnets.find(s => s.id === r);
          if (!x) C.fail(/^i-/.test(r) ? "InvalidInstanceID.NotFound" : "InvalidID", /^i-/.test(r) ? `The instance ID '${r}' does not exist` : `The ID '${r}' is not valid`); Object.assign(x.tags, tags); }); },
      "describe-vpcs": C => ({ Vpcs: C.S.vpcs.map(v => Object.assign({ CidrBlock: v.cidr, DhcpOptionsId: "dopt-0a1b2c3d4e5f60001", State: "available", VpcId: v.id, OwnerId: ACCT, InstanceTenancy: "default", IsDefault: v.def }, Object.keys(v.tags).length ? { Tags: tagList(v.tags) } : {})) }),
      "describe-subnets": C => { const fs = C.many("filters"); return { Subnets: C.S.subnets.filter(s => filtersMatch(C, fs, n => n === "vpc-id" ? s.vpc : n === "subnet-id" ? s.id : n === "availability-zone" ? s.az : n.startsWith("tag:") ? (s.tags[n.slice(4)] || []) : undefined)).map(s => Object.assign({ AvailabilityZone: s.az, AvailableIpAddressCount: 4091, CidrBlock: s.cidr, DefaultForAz: s.vpc === C.S.vpcs[0].id, MapPublicIpOnLaunch: s.pub, State: "available", SubnetId: s.id, VpcId: s.vpc, OwnerId: ACCT }, Object.keys(s.tags).length ? { Tags: tagList(s.tags) } : {})) }; },
      "describe-key-pairs": C => ({ KeyPairs: C.S.keyPairs.map((k, i) => ({ KeyPairId: `key-0${hash(k)}${String(i).padStart(8, "0")}`, KeyFingerprint: "1f:51:ae:28:bf:89:e9:d8:1f:25:5d:37:2d:7d:b8:ca:9f:f5:f1:6f", KeyName: k, KeyType: "rsa", CreateTime: OLD })) })
    },
    cloudtrail: {
      "create-trail": C => { C.need("name", "s3-bucket-name"); const S = C.S, n = C.o("name"); if (S.trails[n]) C.fail("TrailAlreadyExistsException", `Trail ${n} already exists for customer: ${ACCT}`); if (!S.buckets[C.o("s3-bucket-name")]) C.fail("S3BucketDoesNotExistException", `S3 bucket ${C.o("s3-bucket-name")} does not exist.`);
        S.trails[n] = { bucket: C.o("s3-bucket-name"), logging: false, multi: C.has("is-multi-region-trail"), validation: C.has("enable-log-file-validation") }; return trailOut(n, S.trails[n]); },
      "start-logging": C => { C.need("name"); trail(C).logging = true; },
      "stop-logging": C => { C.need("name"); trail(C).logging = false; },
      "describe-trails": C => ({ trailList: Object.entries(C.S.trails).map(([n, t]) => Object.assign(trailOut(n, t), { HomeRegion: "us-east-1", HasCustomEventSelectors: false, HasInsightSelectors: false })) }),
      "get-trail-status": C => { C.need("name"); const t = trail(C); return Object.assign({ IsLogging: t.logging }, t.logging ? { LatestDeliveryTime: "2026-09-25T11:55:00+00:00", StartLoggingTime: "2026-09-25T11:40:00+00:00" } : {}, { LatestDeliveryAttemptTime: t.logging ? "2026-09-25T11:55:00Z" : "", LatestNotificationAttemptTime: "", LatestNotificationAttemptSucceeded: "", LatestDeliveryAttemptSucceeded: t.logging ? "2026-09-25T11:55:00Z" : "", TimeLoggingStarted: t.logging ? "2026-09-25T11:40:00Z" : "", TimeLoggingStopped: "" }); }
    },
    cloudwatch: {
      "put-metric-alarm": C => { C.need("alarm-name", "evaluation-periods", "comparison-operator"); const ops = ["GreaterThanOrEqualToThreshold", "GreaterThanThreshold", "LessThanThreshold", "LessThanOrEqualToThreshold"];
        if (!ops.includes(C.o("comparison-operator"))) return `\nParameter validation failed:\nInvalid value for parameter ComparisonOperator, value: ${C.o("comparison-operator")}, valid values: ${ops.join(", ")}`;
        if (!C.has("metric-name") || !C.has("namespace")) C.fail("ValidationError", "Exactly one element of the metrics list should return data.");
        const st = C.o("statistic") || "Average"; if (!["SampleCount", "Average", "Sum", "Minimum", "Maximum"].includes(st)) return `\nParameter validation failed:\nInvalid value for parameter Statistic, value: ${st}, valid values: SampleCount, Average, Sum, Minimum, Maximum`;
        C.S.alarms[C.o("alarm-name")] = alarm(C.o("alarm-name"), { metric: C.o("metric-name"), ns: C.o("namespace"), stat: st, period: +C.o("period") || 60, evals: +C.o("evaluation-periods"), threshold: +C.o("threshold"), op: C.o("comparison-operator"), dims: C.many("dimensions").map(d => ({ Name: d.Name, Value: String(d.Value) })), actions: C.all("alarm-actions"), desc: C.o("alarm-description") }); },
      "describe-alarms": C => { const ns = C.all("alarm-names"), p = C.o("alarm-name-prefix") || ""; return { MetricAlarms: Object.values(C.S.alarms).filter(a => (!ns.length || ns.includes(a.name)) && a.name.startsWith(p)).map(alarmOut), CompositeAlarms: [] }; },
      "delete-alarms": C => { C.need("alarm-names"); C.all("alarm-names").forEach(n => { if (!C.S.alarms[n]) C.fail("ResourceNotFound", `Alarm ${n} not found`); delete C.S.alarms[n]; }); }
    },
    logs: {
      "create-log-group": C => { C.need("log-group-name"); const n = C.o("log-group-name"); if (C.S.logs[n]) C.fail("ResourceAlreadyExistsException", "The specified log group already exists"); C.S.logs[n] = { retention: null, bytes: 0 }; },
      "put-retention-policy": C => { C.need("log-group-name", "retention-in-days"); const g = C.S.logs[C.o("log-group-name")], d = +C.o("retention-in-days"); if (!RETENTION.includes(d)) C.fail("InvalidParameterException", `1 validation error detected: Value '${C.o("retention-in-days")}' at 'retentionInDays' failed to satisfy constraint: Member must satisfy enum value set: [${RETENTION.join(", ")}]`); if (!g) C.fail("ResourceNotFoundException", "The specified log group does not exist."); g.retention = d; },
      "describe-log-groups": C => { const p = C.o("log-group-name-prefix") || ""; return { logGroups: Object.keys(C.S.logs).sort().filter(n => n.startsWith(p)).map(n => Object.assign({ logGroupName: n, creationTime: NOWMS - 86400000 * 30, metricFilterCount: 0, arn: `arn:aws:logs:us-east-1:${ACCT}:log-group:${n}:*`, storedBytes: C.S.logs[n].bytes }, C.S.logs[n].retention ? { retentionInDays: C.S.logs[n].retention } : {}, { logGroupClass: "STANDARD", logGroupArn: `arn:aws:logs:us-east-1:${ACCT}:log-group:${n}` })) }; }
    },
    kms: {
      "create-key": C => ({ KeyMetadata: keyOut(newKey(C.S, C.o("description") || "")) }),
      "describe-key": C => { C.need("key-id"); return { KeyMetadata: keyOut(keyFind(C, C.o("key-id"))) }; },
      "list-keys": C => ({ Keys: C.S.keys.map(k => ({ KeyId: k.id, KeyArn: k.arn })) }),
      "create-alias": C => { C.need("alias-name", "target-key-id"); const S = C.S, a = C.o("alias-name"); if (!/^alias\/[A-Za-z0-9/_-]+$/.test(a)) C.fail("ValidationException", `1 validation error detected: Value '${a}' at 'aliasName' failed to satisfy constraint: Member must satisfy regular expression pattern: ^alias/[a-zA-Z0-9/_-]+$`);
        if (/^alias\/aws\//.test(a)) C.fail("NotAuthorizedException", "Cannot create alias with prefix 'alias/aws/'"); if (S.aliases[a]) C.fail("AlreadyExistsException", `An alias with the name arn:aws:kms:us-east-1:${ACCT}:${a} already exists`);
        const t = C.o("target-key-id"); if (/^alias\//.test(t)) C.fail("ValidationException", "Aliases must refer to keys. Not aliases"); S.aliases[a] = { key: keyFind(C, t).id, created: NOW }; },
      "list-aliases": C => ({ Aliases: [...["alias/aws/ebs", "alias/aws/s3", "alias/aws/rds"].map(a => ({ AliasName: a, AliasArn: `arn:aws:kms:us-east-1:${ACCT}:${a}`, TargetKeyId: hash(a) + "-aws1-4bbb-8ccc-managedkey01" })), ...Object.entries(C.S.aliases).sort().map(([a, v]) => ({ AliasName: a, AliasArn: `arn:aws:kms:us-east-1:${ACCT}:${a}`, TargetKeyId: v.key, CreationDate: v.created, LastUpdatedDate: v.created }))].filter(a => !C.o("key-id") || a.TargetKeyId === C.o("key-id")) }),
      "enable-key-rotation": C => { C.need("key-id"); if (/^alias\//.test(C.o("key-id"))) C.fail("NotFoundException", `Invalid keyId '${C.o("key-id")}'`); keyFind(C, C.o("key-id")).rotation = true; },
      "get-key-rotation-status": C => { C.need("key-id"); const k = keyFind(C, C.o("key-id")); return Object.assign({ KeyRotationEnabled: k.rotation, KeyId: k.arn }, k.rotation ? { RotationPeriodInDays: 365 } : {}); }
    },
    lambda: {
      "list-functions": C => ({ Functions: Object.keys(C.S.functions).sort().map(n => fnOut(n, C.S.functions[n])) }),
      "get-function-configuration": C => { C.need("function-name"); return fnOut(C.o("function-name"), fnFind(C, C.o("function-name"))); },
      "update-function-configuration": C => { C.need("function-name"); const n = C.o("function-name"), f = fnFind(C, n);
        if (C.has("timeout")) { const t = +C.o("timeout"); if (!(t >= 1 && t <= 900)) C.fail("ValidationException", `1 validation error detected: Value '${C.o("timeout")}' at 'timeout' failed to satisfy constraint: Member must have value ${t < 1 ? "greater than or equal to 1" : "less than or equal to 900"}`); f.timeout = t; }
        if (C.has("memory-size")) { const m = +C.o("memory-size"); if (!(m >= 128 && m <= 10240)) C.fail("ValidationException", `1 validation error detected: Value '${C.o("memory-size")}' at 'memorySize' failed to satisfy constraint: Member must have value ${m < 128 ? "greater than or equal to 128" : "less than or equal to 10240"}`); f.memory = m; }
        if (C.has("environment")) { const e = C.json("environment"); f.env = Object.fromEntries(Object.entries(e.Variables || {}).map(([k, v]) => [k, String(v)])); }
        if (C.has("tracing-config")) { const m = C.json("tracing-config").Mode; if (!["Active", "PassThrough"].includes(m)) return `\nParameter validation failed:\nInvalid value for parameter TracingConfig.Mode, value: ${m}, valid values: Active, PassThrough`; f.tracing = m; }
        if (C.has("role")) f.role = C.o("role");
        return Object.assign(fnOut(n, f), { LastUpdateStatus: "InProgress", LastUpdateStatusReason: "The function is being created." }); }
    },
    rds: {
      "describe-db-instances": C => { const id = C.o("db-instance-identifier"); if (id && !C.S.dbs[id]) C.fail("DBInstanceNotFound", `DBInstance ${id} not found.`); return { DBInstances: Object.keys(C.S.dbs).filter(n => !id || n === id).map(n => dbOut(n, C.S.dbs[n])) }; },
      "modify-db-instance": C => { C.need("db-instance-identifier"); const n = C.o("db-instance-identifier"), d = C.S.dbs[n]; if (!d) C.fail("DBInstanceNotFound", `DBInstance ${n} not found.`);
        if (C.has("storage-encrypted")) return "\nUnknown options: --storage-encrypted (encryption can't be turned on for an existing DB instance; restore an encrypted snapshot copy instead)";
        if (C.has("backup-retention-period")) { const b = +C.o("backup-retention-period"); if (!(b >= 0 && b <= 35)) C.fail("InvalidParameterCombination", "The backup retention period must be between 0 and 35 days."); d.backup = b; }
        const ch = {}; if (C.has("multi-az")) ch.MultiAZ = true; if (C.has("no-multi-az")) ch.MultiAZ = false; if (C.has("db-instance-class")) ch.DBInstanceClass = C.o("db-instance-class");
        if (C.has("apply-immediately")) { if ("MultiAZ" in ch) d.multiAZ = ch.MultiAZ; if (ch.DBInstanceClass) d.cls = ch.DBInstanceClass; d.pending = {}; } else Object.assign(d.pending, ch);
        return { DBInstance: Object.assign(dbOut(n, d), C.has("apply-immediately") && Object.keys(ch).length ? { DBInstanceStatus: "modifying" } : {}) }; }
    }
  };
  function trail(C) { const n = C.o("name"), key = n.split("/").pop(); const t = C.S.trails[key]; if (!t) C.fail("TrailNotFoundException", `Unknown trail: arn:aws:cloudtrail:us-east-1:${ACCT}:trail/${key} for the user: ${ACCT}`); return t; }
  const trailOut = (n, t) => ({ Name: n, S3BucketName: t.bucket, IncludeGlobalServiceEvents: true, IsMultiRegionTrail: t.multi, TrailARN: `arn:aws:cloudtrail:us-east-1:${ACCT}:trail/${n}`, LogFileValidationEnabled: t.validation, IsOrganizationTrail: false });
  function stateChange(C, key, final, transit, bad) {
    C.need("instance-ids"); const ids = C.all("instance-ids"), list = ids.map(i => inst(C, i));
    list.forEach(i => { const m = bad(i); if (m) C.fail("IncorrectInstanceState", m); });
    if (C.has("dry-run")) C.fail("DryRunOperation", "Request would have succeeded, but DryRun flag is set.");
    return { [key]: list.map(i => { const prev = i.state; i.state = prev === final && final !== "terminated" ? prev : final; return { CurrentState: { Code: STATE[prev === final ? prev : transit], Name: prev === final ? prev : transit }, InstanceId: i.id, PreviousState: { Code: STATE[prev], Name: prev } }; }) };
  }

  function prompt(S) { return "[cloudshell-user@ip-10-2-34-56 ~]$"; }
  function isError(o) { return typeof o === "string" && /(^|\n)(An error occurred \(|aws: error|usage: aws|bash: |fatal error|Parameter validation failed|Error parsing parameter|Unknown options)|failed: s3:\/\/|upload failed|copy failed|delete failed|user-provided path .* does not exist|could not be found|No such file or directory/.test(o); }

  // Checks: bucket, object, user, group, role, instance, sgRule, trail, alarm, logGroup, keyAlias, accessKey, snapshot, lambda, rds, ran
  function check(S, c) {
    switch (c.type) {
      case "bucket": { const b = S.buckets[c.name]; if (c.exists === false) return !b; if (!b) return false;
        if (c.versioning && (b.versioning || "Disabled") !== (c.versioning === true ? "Enabled" : c.versioning)) return false;
        if (c.publicAccessBlocked != null && (!!b.pab && Object.values(b.pab).every(Boolean)) !== c.publicAccessBlocked) return false;
        if (c.encrypted != null && !!b.enc !== c.encrypted) return false; if (c.sse && (!b.enc || b.enc.alg !== c.sse)) return false; if (c.kmsKey && (!b.enc || !String(b.enc.key || "").includes(c.kmsKey))) return false;
        if (c.policyIncludes && !(b.policy || "").includes(c.policyIncludes)) return false; return true; }
      case "object": { const b = S.buckets[c.bucket], has = !!b && !!b.objects[c.key]; return c.present === false ? !has : has; }
      case "user": { const u = S.users[c.name]; if (c.exists === false) return !u; return !!u && (!c.inGroup || u.groups.includes(c.inGroup)) && (!c.policy || u.policies.some(p => p === c.policy || p.endsWith("/" + c.policy))) && (!c.noPolicy || !u.policies.some(p => p === c.noPolicy || p.endsWith("/" + c.noPolicy))); }
      case "group": { const g = S.groups[c.name]; return !!g && (!c.policy || g.policies.some(p => p === c.policy || p.endsWith("/" + c.policy))); }
      case "role": { const r = S.roles[c.name]; return !!r && (!c.policy || r.policies.some(p => p === c.policy || p.endsWith("/" + c.policy))) && (!c.trust || JSON.stringify(r.trust).includes(c.trust)); }
      case "instance": { const list = S.instances.filter(i => c.id ? i.id === c.id : i.tags.Name === c.tagName); if (c.count != null) return list.filter(i => !c.state || i.state === c.state).length === c.count;
        return list.some(i => (!c.state || i.state === c.state) && (!c.instanceType || i.type === c.instanceType) && (!c.subnet || i.subnet.id === c.subnet) && (!c.sg || i.sgs.includes(c.sg)) && (!c.tag || Object.entries(c.tag).every(([k, v]) => i.tags[k] === v))); }
      case "sgRule": { const g = S.sgs.find(x => x.id === c.group || x.name === c.group); if (!g) return c.present === false; const proto = String(c.protocol || "tcp");
        const hit = g.rules.some(r => (r.proto === "-1" || (r.proto === proto && r.from <= +c.port && +c.port <= r.to)) && (!c.cidr || r.cidr === c.cidr)); return c.present === false ? !hit : hit; }
      case "trail": { const t = S.trails[c.name]; return !!t && (c.logging == null || t.logging === c.logging) && (c.multiRegion == null || t.multi === c.multiRegion) && (c.validation == null || t.validation === c.validation) && (!c.bucket || t.bucket === c.bucket); }
      case "alarm": { const a = S.alarms[c.name]; return !!a && (!c.metric || a.metric === c.metric) && (!c.namespace || a.ns === c.namespace) && (c.threshold == null || a.threshold === c.threshold) && (!c.dimension || a.dims.some(d => d.Value === c.dimension)) && (!c.comparison || a.op === c.comparison); }
      case "logGroup": { const g = S.logs[c.name]; return !!g && (c.retention == null || g.retention === c.retention); }
      case "keyAlias": { const a = S.aliases[c.alias]; if (!a) return false; const k = S.keys.find(x => x.id === a.key); return !!k && (c.rotation == null || k.rotation === c.rotation); }
      case "accessKey": { const u = S.users[c.user]; if (!u) return false; const ks = u.keys.filter(k => !c.status || k.status === c.status); return c.count != null ? ks.length === c.count : ks.length > 0; }
      case "snapshot": return S.snapshots.some(s => s.vol === c.volume && (!c.description || s.desc.includes(c.description)));
      case "lambda": { const f = S.functions[c.name]; return !!f && (c.timeout == null || f.timeout === c.timeout) && (c.memory == null || f.memory === c.memory) && (!c.tracing || f.tracing === c.tracing) && Object.entries(c.env || {}).every(([k, v]) => f.env[k] === v); }
      case "rds": { const d = S.dbs[c.id]; return !!d && (c.multiAZ == null || d.multiAZ === c.multiAZ) && (c.backupRetention == null || d.backup >= c.backupRetention) && (!c.cls || d.cls === c.cls); }
      case "ran": return S.ok.some(l => l.includes(c.includes));
      default: return false;
    }
  }
  const api = { create, run, check, prompt, isError, CMDS, query };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.CertHub.awscli = api;
})(typeof window !== "undefined" ? window : globalThis);
