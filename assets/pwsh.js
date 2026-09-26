/* A simulated Windows PowerShell session for administrator practice: an in-memory drive with
   files, services, local and Active Directory accounts, Windows features, firewall rules and
   Azure resource groups. It is a teaching sandbox, not a real system.
   Cmdlets: Get-ChildItem Set-Location Get-Content Set-Content Add-Content New-Item Remove-Item
   Copy-Item Move-Item Get-Location Get-Service Start-Service Stop-Service Restart-Service Set-Service
   Get-Process Stop-Process Get-LocalUser New-LocalUser Enable-LocalUser Disable-LocalUser
   Add-LocalGroupMember Get-LocalGroupMember Get-WindowsFeature Install-WindowsFeature
   Get-NetIPAddress Get-NetIPConfiguration Test-NetConnection Resolve-DnsName Get-NetFirewallRule
   New-NetFirewallRule Enable-NetFirewallRule Disable-NetFirewallRule Get-ADUser New-ADUser Set-ADUser
   Enable-ADAccount Disable-ADAccount Unlock-ADAccount Add-ADGroupMember Get-ADGroupMember
   Get-EventLog Get-WinEvent Get-Command Get-Help New-AzResourceGroup Get-AzResourceGroup
   Remove-AzResourceGroup Write-Output, with aliases (ls dir cd cat sc ac ni rm cp mv gsv gps ...),
   | pipelines through Where-Object Select-Object Sort-Object Format-Table Measure-Object Out-File,
   > and >> redirection, and $var = ... assignment.
   Works in the browser (CertHub.pwsh) and in Node (module.exports) for content checks. */
(function (root) {
  const isAbs = p => /^[A-Za-z]:/.test(p);
  const normPath = (cwd, p) => {
    p = String(p).replace(/\//g, "\\"); if (!isAbs(p)) p = cwd.replace(/\\+$/, "") + "\\" + p;
    const seg = p.split("\\"), drive = seg.shift().toUpperCase(), out = [];
    seg.forEach(x => { if (!x || x === ".") return; if (x === "..") out.pop(); else out.push(x); });
    return drive + "\\" + out.join("\\");
  };
  const parentOf = p => { const i = p.lastIndexOf("\\"); return i <= p.indexOf(":") + 1 ? p.slice(0, p.indexOf(":") + 1) + "\\" : p.slice(0, i); };
  const baseOf = p => p.slice(p.lastIndexOf("\\") + 1);
  const gv = (o, prop) => { if (o == null || typeof o !== "object") return undefined; const k = Object.keys(o).find(k => k.toLowerCase() === String(prop).toLowerCase()); return k === undefined ? undefined : o[k]; };
  const ci = (map, name) => { if (!map) return undefined; const k = Object.keys(map).find(k => k.toLowerCase() === String(name).toLowerCase()); return k === undefined ? undefined : map[k]; };
  const cik = (map, name) => { if (!map) return undefined; return Object.keys(map).find(k => k.toLowerCase() === String(name).toLowerCase()); };
  const truthy = v => v === true || /^\$?true$/i.test(String(v));
  const list = (arr, cols) => { arr._cols = cols; return arr; };

  function create(setup = {}) {
    const S = {
      cwd: setup.cwd || "C:\\Users\\Administrator", computer: setup.computer || "SRV1", user: setup.user || "Administrator",
      files: {}, dirs: new Set(), history: [], ran: [], vars: {},
      services: {}, localUsers: {}, localGroups: (setup.localGroups || []).slice(),
      features: {}, adUsers: {}, adGroups: (setup.adGroups || []).slice(),
      firewallRules: {}, processes: [], netip: setup.netip || {}, events: setup.events || null,
      azResourceGroups: {}, azVMs: {}
    };
    ["Administrators", "Users", "Remote Desktop Users"].forEach(g => { if (!S.localGroups.some(x => x.toLowerCase() === g.toLowerCase())) S.localGroups.push(g); });
    ["Domain Admins", "Domain Users"].forEach(g => { if (!S.adGroups.some(x => x.toLowerCase() === g.toLowerCase())) S.adGroups.push(g); });
    const addDir = p => { let cur = p.slice(0, p.indexOf(":") + 1) + "\\"; S.dirs.add(cur); p.split("\\").slice(1).filter(Boolean).forEach(x => { cur = (cur === p.slice(0, p.indexOf(":") + 1) + "\\" ? cur : cur + "\\") + x; S.dirs.add(cur); }); };
    ["C:\\", "C:\\Windows", "C:\\Windows\\System32", "C:\\Users", "C:\\Temp", S.cwd].forEach(addDir);
    (setup.dirs || []).forEach(d => addDir(normPath(S.cwd, d)));
    Object.entries(setup.files || {}).forEach(([p, c]) => { const np = normPath(S.cwd, p); addDir(parentOf(np)); S.files[np] = String(c); });
    Object.entries(setup.services || {}).forEach(([n, s]) => { S.services[n] = { status: s.status || "Stopped", startType: s.startType || "Manual", display: s.display || n }; });
    Object.entries(setup.localUsers || {}).forEach(([n, u]) => { S.localUsers[n] = { enabled: u.enabled !== false, groups: (u.groups || []).slice(), description: u.description || "" }; });
    Object.entries(setup.features || {}).forEach(([n, v]) => { S.features[n] = { installed: !!v, display: n }; });
    Object.entries(setup.adUsers || {}).forEach(([s, u]) => { S.adUsers[s] = { enabled: u.enabled !== false, ou: u.ou || "CN=Users", groups: (u.groups || []).slice(), name: u.name || s }; });
    Object.entries(setup.firewallRules || {}).forEach(([n, r]) => { S.firewallRules[n] = { enabled: r.enabled !== false, direction: r.direction || "Inbound", action: r.action || "Allow", port: r.port != null ? String(r.port) : "", protocol: r.protocol || "TCP" }; });
    (setup.processes || []).forEach((p, i) => { const o = typeof p === "string" ? { name: p } : p; S.processes.push({ Id: o.id || 1000 + i * 4, ProcessName: o.name, CPU: o.cpu != null ? o.cpu : (i + 1) * 1.5 }); });
    Object.entries(setup.azResourceGroups || {}).forEach(([n, r]) => { S.azResourceGroups[n] = { location: (r && r.location) || "eastus", state: "Succeeded" }; });
    Object.entries(setup.azVMs || {}).forEach(([n, v]) => { S.azVMs[n] = { rg: v.rg || "", size: v.size || "Standard_B2s", state: v.state || "VM running" }; });
    return S;
  }

  function tokens(s) {
    const t = []; let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (/\s/.test(ch)) { i++; continue; }
      if (ch === "{") { let d = 0, j = i; for (; j < s.length; j++) { if (s[j] === "{") d++; else if (s[j] === "}") { d--; if (!d) { j++; break; } } } t.push(s.slice(i, j)); i = j; continue; }
      if (ch === '"' || ch === "'") { const q = ch; let j = i + 1; while (j < s.length && s[j] !== q) j++; t.push(s.slice(i + 1, j)); i = j + 1; continue; }
      let j = i; while (j < s.length && !/\s/.test(s[j]) && s[j] !== "{") j++; t.push(s.slice(i, j)); i = j;
    }
    return t;
  }
  const SWITCH = new Set(["force", "recurse", "nopassword", "descending", "autosize", "append", "unique", "wrap"]);
  function parse(args) {
    const opt = {}, pos = [], sw = new Set();
    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (a[0] === "-" && /[A-Za-z]/.test(a[1] || "")) {
        const name = a.slice(1).toLowerCase(), nx = args[i + 1];
        if (SWITCH.has(name) || nx === undefined || (nx[0] === "-" && /[A-Za-z]/.test(nx[1] || "") && !/^-?\d/.test(nx))) sw.add(name);
        else { opt[name] = nx; i++; }
      } else pos.push(a);
    }
    return { opt, pos, sw };
  }
  function splitPipe(line) {
    const segs = [""]; let q = null, d = 0;
    for (const ch of line) {
      if (q) { if (ch === q) q = null; segs[segs.length - 1] += ch; }
      else if (ch === '"' || ch === "'") { q = ch; segs[segs.length - 1] += ch; }
      else if (ch === "{") { d++; segs[segs.length - 1] += ch; }
      else if (ch === "}") { d--; segs[segs.length - 1] += ch; }
      else if (ch === "|" && !d) segs.push("");
      else segs[segs.length - 1] += ch;
    }
    return segs.map(s => s.trim());
  }

  const fmt = v => v === true ? "True" : v === false ? "False" : v == null ? "" : String(v);
  function renderTable(arr) {
    if (!arr.length) return "";
    if (arr.every(x => typeof x === "string" || typeof x === "number")) return arr.map(String).join("\n");
    const cols = arr._cols || Object.keys(arr[0]);
    const rows = arr.map(o => cols.map(c => fmt(gv(o, c))));
    const w = cols.map((c, i) => Math.max(c.length, ...rows.map(r => r[i].length)));
    const line = cells => cells.map((s, i) => s.padEnd(w[i])).join(" ").replace(/\s+$/, "");
    return [line(cols), line(w.map(x => "-".repeat(x))), ...rows.map(line)].join("\n");
  }
  const renderAny = v => v == null ? "" : typeof v === "string" ? v : Array.isArray(v) ? renderTable(v) : String(v);

  function run(S, line) {
    line = String(line || "").trim(); if (!line) return "";
    S.history.push(line);
    const asn = line.match(/^\$(\w+)\s*=\s*([\s\S]+)$/);
    if (asn) { try { S.vars[asn[1].toLowerCase()] = evalPipeline(S, asn[2]); } catch (e) { return e.message; } return ""; }
    let redir = null, work = line, q = null, d = 0;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (q) { if (ch === q) q = null; } else if (ch === '"' || ch === "'") q = ch; else if (ch === "{") d++; else if (ch === "}") d--;
      else if (ch === ">" && !d) { const m = line.slice(i).match(/^(>>?)\s*(\S+)\s*$/); if (m) { redir = { append: m[1] === ">>", path: m[2] }; work = line.slice(0, i); } break; }
    }
    let out; try { out = evalPipeline(S, work); } catch (e) { return e.message; }
    const text = renderAny(out);
    if (redir) { const np = normPath(S.cwd, redir.path); const k = cik(S.files, np); const prev = redir.append && k ? S.files[k] : ""; S.files[k || np] = prev + text + (text.endsWith("\n") ? "" : "\n"); S.dirs.add(parentOf(np)); return ""; }
    return text;
  }
  function evalPipeline(S, str) { let val = null; for (const seg of splitPipe(str)) { if (seg) val = exec(S, tokens(seg), val); } return val; }

  function exec(S, t, input) {
    if (!t.length) return "";
    let raw = t[0], args = t.slice(1);
    if (raw[0] === "$") { const v = S.vars[raw.slice(1).toLowerCase()]; return v === undefined ? "" : v; }
    const cmd = (ALIAS[raw.toLowerCase()] || raw).toLowerCase();
    S.ran.push(cmd);
    const { opt, pos, sw } = parse(args);
    const inArr = Array.isArray(input) ? input : input != null && typeof input === "object" ? [input] : input != null && input !== "" ? [input] : [];
    const P = p => normPath(S.cwd, p), fk = p => cik(S.files, P(p)), dhas = p => { const np = P(p); return [...S.dirs].some(d => d.toLowerCase() === np.toLowerCase()); };
    const err = m => `${raw} : ${m}`;
    switch (cmd) {
      case "clear": return "";
      case "get-location": return S.cwd;
      case "write-output": return pos.length ? pos.join(" ") : input;
      case "set-location": { const target = opt.path || pos[0] || "C:\\"; const np = P(target); if (!dhas(np) && np !== np.slice(0, np.indexOf(":") + 1) + "\\") return err(`Cannot find path '${target}' because it does not exist.`); S.cwd = np; return ""; }
      case "get-childitem": {
        const target = opt.path || pos[0] || S.cwd, np = P(target), rec = sw.has("recurse");
        const under = k => { const par = parentOf(k); return rec ? (k.toLowerCase().startsWith(np.toLowerCase() + "\\")) : par.toLowerCase() === np.toLowerCase(); };
        const items = [];
        [...S.dirs].filter(under).sort().forEach(dp => items.push({ Mode: "d-----", LastWriteTime: "9/25/2026   9:00 AM", Length: "", Name: baseOf(dp) }));
        Object.keys(S.files).filter(under).sort().forEach(fp => items.push({ Mode: "-a----", LastWriteTime: "9/25/2026   9:00 AM", Length: S.files[fp].length, Name: baseOf(fp) }));
        if (!dhas(np) && !cik(S.files, np)) return err(`Cannot find path '${target}' because it does not exist.`);
        return list(items, ["Mode", "LastWriteTime", "Length", "Name"]);
      }
      case "get-content": { const k = fk(opt.path || pos[0]); if (!k) return err(`Cannot find path '${opt.path || pos[0]}' because it does not exist.`); return S.files[k].replace(/\n$/, "").split("\n"); }
      case "set-content": case "add-content": {
        const target = opt.path || pos[0]; if (!target) return err("Cannot bind argument to parameter 'Path'."); const np = P(target);
        let val = opt.value != null ? opt.value : pos.slice(1).join(" "); if (Array.isArray(input) && !pos[1] && opt.value == null) val = input.map(x => renderAny(x)).join("\n");
        const k = cik(S.files, np); const cur = cmd === "add-content" && k ? S.files[k] : "";
        S.files[k || np] = cur + val + "\n"; S.dirs.add(parentOf(np)); return "";
      }
      case "new-item": {
        let target = opt.path || pos[0]; if (opt.name) target = (target || S.cwd) + "\\" + opt.name; if (!target) return err("Cannot bind argument to parameter 'Path'.");
        const np = P(target), type = (opt.itemtype || (sw.has("directory") ? "directory" : "file")).toLowerCase();
        if (dhas(np) || cik(S.files, np)) { if (sw.has("force")) return ""; return err(`An item with the specified name ${np} already exists.`); }
        if (type[0] === "d") { S.dirs.add(np); let cur = np.slice(0, np.indexOf(":") + 1) + "\\"; np.split("\\").slice(1).filter(Boolean).forEach(x => { cur = cur.endsWith("\\") ? cur + x : cur + "\\" + x; S.dirs.add(cur); }); }
        else { S.dirs.add(parentOf(np)); S.files[np] = opt.value != null ? opt.value + "\n" : ""; }
        return "";
      }
      case "remove-item": {
        let target = opt.path || opt.literalpath || pos[0]; if (!target) return err("Cannot bind argument to parameter 'Path'."); const np = P(target);
        if (np.includes("*")) { const re = new RegExp("^" + np.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$", "i"); const hit = Object.keys(S.files).filter(k => re.test(k)); if (!hit.length && !sw.has("force")) return err(`Cannot find path '${target}' because it does not exist.`); hit.forEach(k => delete S.files[k]); return ""; }
        const fk2 = cik(S.files, np);
        if (fk2) { delete S.files[fk2]; return ""; }
        if (dhas(np)) { const kids = Object.keys(S.files).some(k => k.toLowerCase().startsWith(np.toLowerCase() + "\\")) || [...S.dirs].some(d => d.toLowerCase().startsWith(np.toLowerCase() + "\\")); if (kids && !sw.has("recurse")) return err(`The item at ${np} has children and the Recurse parameter was not specified.`); Object.keys(S.files).filter(k => k.toLowerCase() === np.toLowerCase() || k.toLowerCase().startsWith(np.toLowerCase() + "\\")).forEach(k => delete S.files[k]); [...S.dirs].filter(d => d.toLowerCase() === np.toLowerCase() || d.toLowerCase().startsWith(np.toLowerCase() + "\\")).forEach(d => S.dirs.delete(d)); return ""; }
        if (sw.has("force")) return ""; return err(`Cannot find path '${target}' because it does not exist.`);
      }
      case "copy-item": case "move-item": {
        const src = opt.path || pos[0], dst = opt.destination || pos[1]; if (!src || !dst) return err("Cannot bind argument to parameter 'Destination'.");
        const sp = P(src), sk = cik(S.files, sp); if (!sk) return err(`Cannot find path '${src}' because it does not exist.`);
        let dp = P(dst); if (dhas(dp)) dp = dp.replace(/\\+$/, "") + "\\" + baseOf(sp);
        S.dirs.add(parentOf(dp)); S.files[dp] = S.files[sk]; if (cmd === "move-item") delete S.files[sk]; return "";
      }
      case "get-service": {
        const pat = opt.name || pos[0]; let names = Object.keys(S.services);
        if (pat) { const re = new RegExp("^" + pat.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$", "i"); names = names.filter(n => re.test(n)); if (!names.length) return err(`Cannot find any service with service name '${pat}'.`); }
        return list(names.map(n => ({ Status: S.services[n].status, Name: n, DisplayName: S.services[n].display, StartType: S.services[n].startType })), ["Status", "Name", "DisplayName"]);
      }
      case "start-service": case "stop-service": case "restart-service": {
        const targets = opt.name ? [opt.name] : pos.length ? pos : inArr.map(x => gv(x, "Name") || x);
        for (const t2 of targets) { const k = cik(S.services, t2); if (!k) return err(`Cannot find any service with service name '${t2}'.`); S.services[k].status = cmd === "stop-service" ? "Stopped" : "Running"; }
        return "";
      }
      case "set-service": { const n = opt.name || pos[0], k = cik(S.services, n); if (!k) return err(`Cannot find any service with service name '${n}'.`); if (opt.startuptype) S.services[k].startType = opt.startuptype; if (opt.status) S.services[k].status = opt.status; return ""; }
      case "get-process": { let ps = S.processes.slice(); const nm = opt.name || pos[0]; if (nm) { ps = ps.filter(p => p.ProcessName && p.ProcessName.toLowerCase() === nm.toLowerCase()); if (!ps.length) return err(`Cannot find a process with the name "${nm}".`); } return list(ps, ["Id", "CPU", "ProcessName"]); }
      case "stop-process": { const nm = opt.name, id = opt.id; const before = S.processes.length; S.processes = S.processes.filter(p => nm ? p.ProcessName.toLowerCase() !== nm.toLowerCase() : id ? String(p.Id) !== String(id) : true); if (S.processes.length === before) return err(`Cannot find a process with the name "${nm || id}".`); return ""; }
      case "get-localuser": { let names = Object.keys(S.localUsers); const nm = opt.name || pos[0]; if (nm) { names = names.filter(n => n.toLowerCase() === nm.toLowerCase()); if (!names.length) return err(`User ${nm} was not found.`); } return list(names.map(n => ({ Name: n, Enabled: S.localUsers[n].enabled, Description: S.localUsers[n].description })), ["Name", "Enabled", "Description"]); }
      case "new-localuser": { const n = opt.name || pos[0]; if (!n) return err("Cannot bind argument to parameter 'Name'."); if (cik(S.localUsers, n)) return err(`The account ${n} already exists.`); S.localUsers[n] = { enabled: true, groups: [], description: opt.description || "" }; return ""; }
      case "enable-localuser": case "disable-localuser": { const n = opt.name || pos[0], k = cik(S.localUsers, n); if (!k) return err(`User ${n} was not found.`); S.localUsers[k].enabled = cmd === "enable-localuser"; return ""; }
      case "add-localgroupmember": { const g = opt.group || pos[0], mem = (opt.member || pos[1] || "").split(",").map(x => x.trim()).filter(Boolean); if (!cik2(S.localGroups, g)) return err(`Group ${g} was not found.`); for (const m of mem) { const k = cik(S.localUsers, m); if (!k) return err(`Principal ${m} was not found.`); if (!S.localUsers[k].groups.some(x => x.toLowerCase() === g.toLowerCase())) S.localUsers[k].groups.push(g); } return ""; }
      case "get-localgroupmember": { const g = opt.group || pos[0]; if (!cik2(S.localGroups, g)) return err(`Group ${g} was not found.`); return list(Object.keys(S.localUsers).filter(n => S.localUsers[n].groups.some(x => x.toLowerCase() === g.toLowerCase())).map(n => ({ ObjectClass: "User", Name: S.computer + "\\" + n, PrincipalSource: "Local" })), ["ObjectClass", "Name", "PrincipalSource"]); }
      case "get-windowsfeature": { let names = Object.keys(S.features); const nm = opt.name || pos[0]; if (nm) names = names.filter(n => n.toLowerCase() === nm.toLowerCase()); return list(names.map(n => ({ InstallState: S.features[n].installed ? "Installed" : "Available", Name: n, DisplayName: S.features[n].display })), ["InstallState", "Name", "DisplayName"]); }
      case "install-windowsfeature": case "add-windowsfeature": { const nm = opt.name || pos[0]; if (!nm) return err("Cannot bind argument to parameter 'Name'."); nm.split(",").map(x => x.trim()).forEach(n => { S.features[n] = { installed: true, display: (S.features[n] && S.features[n].display) || n }; }); return "Success Restart Needed Exit Code Feature Result\n------- -------------- --------- --------------\nTrue    No             Success   {" + nm + "}"; }
      case "get-netipaddress": return "IPAddress         : " + (S.netip.ip || "10.0.0.20") + "\nInterfaceAlias    : " + (S.netip.alias || "Ethernet") + "\nPrefixLength      : " + (S.netip.prefix || 24) + "\nAddressFamily     : IPv4";
      case "get-netipconfiguration": return "InterfaceAlias       : " + (S.netip.alias || "Ethernet") + "\nIPv4Address          : " + (S.netip.ip || "10.0.0.20") + "\nIPv4DefaultGateway   : " + (S.netip.gateway || "10.0.0.1") + "\nDNSServer            : " + (S.netip.dns || "10.0.0.10");
      case "test-netconnection": { const c = opt.computername || pos[0] || "10.0.0.10", port = opt.port || opt.commontcpport; return "ComputerName     : " + c + "\nRemoteAddress    : " + c + "\n" + (port ? "RemotePort       : " + port + "\n" : "") + "InterfaceAlias   : Ethernet\nSourceAddress    : " + (S.netip.ip || "10.0.0.20") + "\n" + (port ? "TcpTestSucceeded : True" : "PingSucceeded    : True"); }
      case "resolve-dnsname": { const nm = opt.name || pos[0] || "dc01.corp.local"; return list([{ Name: nm, Type: "A", TTL: 3600, Section: "Answer", IPAddress: "10.0.0.10" }], ["Name", "Type", "TTL", "Section", "IPAddress"]); }
      case "get-netfirewallrule": { let names = Object.keys(S.firewallRules); const nm = opt.displayname || opt.name || pos[0]; if (nm) { names = names.filter(n => n.toLowerCase() === nm.toLowerCase()); if (!names.length) return err(`No MSFT_NetFirewallRule objects found with property 'DisplayName' equal to '${nm}'.`); } return list(names.map(n => ({ Name: n, DisplayName: n, Enabled: S.firewallRules[n].enabled, Direction: S.firewallRules[n].direction, Action: S.firewallRules[n].action })), ["DisplayName", "Enabled", "Direction", "Action"]); }
      case "new-netfirewallrule": { const dn = opt.displayname || opt.name; if (!dn) return err("Cannot bind argument to parameter 'DisplayName'."); S.firewallRules[dn] = { enabled: opt.enabled ? truthy(opt.enabled) : true, direction: opt.direction || "Inbound", action: opt.action || "Allow", port: opt.localport != null ? String(opt.localport) : "", protocol: opt.protocol || "TCP" }; return ""; }
      case "enable-netfirewallrule": case "disable-netfirewallrule": { const nm = opt.displayname || opt.name || pos[0], k = cik(S.firewallRules, nm); if (!k) return err(`No firewall rule '${nm}' was found.`); S.firewallRules[k].enabled = cmd === "enable-netfirewallrule"; return ""; }
      case "get-aduser": {
        const id = opt.identity || pos[0], filter = opt.filter;
        let sams = Object.keys(S.adUsers);
        if (id && id !== "*") { const k = cik(S.adUsers, id) || Object.keys(S.adUsers).find(s => S.adUsers[s].name.toLowerCase() === id.toLowerCase()); if (!k) return err(`Cannot find an object with identity: '${id}'.`); sams = [k]; }
        else if (filter && filter !== "*") { const m = filter.match(/(\w+)\s*-eq\s*['"]?([^'"]+)['"]?/); if (m) sams = sams.filter(s => String(gv(Object.assign({ SamAccountName: s }, S.adUsers[s]), m[1]) || "").toLowerCase() === m[2].toLowerCase()); }
        return list(sams.map(s => ({ Name: S.adUsers[s].name, SamAccountName: s, Enabled: S.adUsers[s].enabled, DistinguishedName: `CN=${S.adUsers[s].name},${S.adUsers[s].ou},DC=corp,DC=local` })), ["Name", "SamAccountName", "Enabled"]);
      }
      case "new-aduser": { const sam = opt.samaccountname || opt.name || pos[0]; if (!sam) return err("Cannot bind argument to parameter 'Name'."); if (cik(S.adUsers, sam)) return err(`The specified account already exists.`); S.adUsers[sam] = { enabled: opt.enabled ? truthy(opt.enabled) : false, ou: opt.path || "CN=Users", groups: [], name: opt.name || sam }; return ""; }
      case "set-aduser": { const id = opt.identity || pos[0], k = cik(S.adUsers, id); if (!k) return err(`Cannot find an object with identity: '${id}'.`); if (opt.enabled != null) S.adUsers[k].enabled = truthy(opt.enabled); return ""; }
      case "enable-adaccount": case "disable-adaccount": { const id = opt.identity || pos[0], k = cik(S.adUsers, id); if (!k) return err(`Cannot find an object with identity: '${id}'.`); S.adUsers[k].enabled = cmd === "enable-adaccount"; return ""; }
      case "unlock-adaccount": { const id = opt.identity || pos[0]; if (!cik(S.adUsers, id)) return err(`Cannot find an object with identity: '${id}'.`); return ""; }
      case "add-adgroupmember": { const g = opt.identity || pos[0], mem = (opt.members || opt.member || pos[1] || "").split(",").map(x => x.trim()).filter(Boolean); if (!cik2(S.adGroups, g)) return err(`Cannot find an object with identity: '${g}'.`); for (const m of mem) { const k = cik(S.adUsers, m); if (!k) return err(`Cannot find an object with identity: '${m}'.`); if (!S.adUsers[k].groups.some(x => x.toLowerCase() === g.toLowerCase())) S.adUsers[k].groups.push(g); } return ""; }
      case "get-adgroupmember": { const g = opt.identity || pos[0]; if (!cik2(S.adGroups, g)) return err(`Cannot find an object with identity: '${g}'.`); return list(Object.keys(S.adUsers).filter(s => S.adUsers[s].groups.some(x => x.toLowerCase() === g.toLowerCase())).map(s => ({ SamAccountName: s, name: S.adUsers[s].name, objectClass: "user" })), ["SamAccountName", "name", "objectClass"]); }
      case "get-eventlog": case "get-winevent": { const ev = S.events || DEFEV; return list(ev.map(e => ({ TimeCreated: e.time || "9/25/2026 9:00:00 AM", Id: e.id || 0, LevelDisplayName: e.level || e.entryType || "Information", ProviderName: e.source || e.provider || "System", Message: e.message || "" })), ["TimeCreated", "Id", "LevelDisplayName", "Message"]); }
      case "new-azresourcegroup": { const n = opt.name || pos[0], loc = opt.location || pos[1] || "eastus"; if (!n) return err("Cannot bind argument to parameter 'Name'."); S.azResourceGroups[n] = { location: loc, state: "Succeeded" }; return `ResourceGroupName : ${n}\nLocation          : ${loc}\nProvisioningState : Succeeded`; }
      case "get-azresourcegroup": { let names = Object.keys(S.azResourceGroups); const nm = opt.name || pos[0]; if (nm) { names = names.filter(n => n.toLowerCase() === nm.toLowerCase()); if (!names.length) return err(`Resource group '${nm}' could not be found.`); } return list(names.map(n => ({ ResourceGroupName: n, Location: S.azResourceGroups[n].location, ProvisioningState: S.azResourceGroups[n].state })), ["ResourceGroupName", "Location", "ProvisioningState"]); }
      case "remove-azresourcegroup": { const n = opt.name || pos[0], k = cik(S.azResourceGroups, n); if (!k) return err(`Resource group '${n}' could not be found.`); delete S.azResourceGroups[k]; return ""; }
      case "get-azvm": { return list(Object.keys(S.azVMs).map(n => ({ Name: n, ResourceGroupName: S.azVMs[n].rg, Location: "eastus", VmSize: S.azVMs[n].size })), ["Name", "ResourceGroupName", "VmSize"]); }
      case "where-object": return whereObj(inArr, args);
      case "select-object": return selectObj(inArr, opt, pos, sw);
      case "sort-object": { let arr = inArr.slice(); const prop = opt.property || pos.join("").split(",").filter(Boolean)[0]; arr.sort((a, b) => { const x = prop ? gv(a, prop) : a, y = prop ? gv(b, prop) : b; return (typeof x === "number" && typeof y === "number") ? x - y : String(x).localeCompare(String(y)); }); if (sw.has("descending")) arr.reverse(); if (inArr._cols) arr._cols = inArr._cols; return arr; }
      case "measure-object": { const prop = opt.property || pos.join("").split(",").filter(Boolean)[0]; let o = "Count    : " + inArr.length; if (prop) { const nums = inArr.map(x => Number(gv(x, prop))).filter(n => !isNaN(n)); if (sw.has("sum") || opt.sum !== undefined) o += "\nSum      : " + nums.reduce((a, b) => a + b, 0); if (opt.average !== undefined) o += "\nAverage  : " + (nums.reduce((a, b) => a + b, 0) / (nums.length || 1)); o += "\nProperty : " + prop; } return o; }
      case "format-table": case "format-list": { const props = (opt.property || pos.join("").split(",").filter(Boolean).join(",")).split(",").filter(Boolean); const arr = inArr.slice(); if (inArr._cols) arr._cols = inArr._cols; if (props.length) arr._cols = props; return arr; }
      case "out-file": { const target = opt.filepath || pos[0]; if (!target) return err("Cannot bind argument to parameter 'FilePath'."); const np = P(target); const text = renderAny(input); const k = cik(S.files, np); S.files[k || np] = (sw.has("append") && k ? S.files[k] : "") + text + "\n"; S.dirs.add(parentOf(np)); return ""; }
      case "get-command": { const nm = opt.name || pos[0]; let cs = CMDS; if (nm) cs = CMDS.filter(c => c.toLowerCase().includes(nm.replace(/\*/g, "").toLowerCase())); return list(cs.map(c => ({ CommandType: "Cmdlet", Name: c, Source: "SimModule" })), ["CommandType", "Name", "Source"]); }
      case "get-help": { const nm = opt.name || pos[0]; return nm ? `NAME\n    ${nm}\n\nSYNOPSIS\n    Simulated help for ${nm}. This practice session supports a subset of parameters.\n\nSYNTAX\n    ${nm} [-Name] [-Path] [<CommonParameters>]` : "Supported cmdlets: " + CMDS.join(" "); }
      case "help": return "Supported cmdlets: " + CMDS.join(" ") + "\nAliases: ls dir cd cat sc ac ni rm cp mv gsv gps select where sort ft. Pipe with | and Where-Object, Select-Object, Sort-Object, Format-Table, Measure-Object, Out-File. Redirect with > and >>.";
      default: return `${raw} : The term '${raw}' is not recognized as the name of a cmdlet, function, script file, or operable program. Type help to list supported cmdlets.`;
    }
  }
  const cik2 = (arr, name) => arr.find(x => x.toLowerCase() === String(name).toLowerCase());

  function condTest(rec, cond) {
    let m = cond.match(/\$_\.(\w+)\s*(-eq|-ne|-like|-match|-gt|-lt|-ge|-le|-contains)\s*(.+)/i);
    if (!m) { m = cond.match(/^\s*(\w+)\s+(-eq|-ne|-like|-match|-gt|-lt|-ge|-le)\s+(.+)$/i); if (!m) return false; }
    let [, prop, op, rhs] = m; rhs = rhs.trim().replace(/^['"]|['"]$/g, "");
    let v = gv(rec, prop); op = op.toLowerCase();
    const num = !isNaN(Number(v)) && !isNaN(Number(rhs)) && v !== "" && rhs !== "";
    const vs = String(v).toLowerCase(), rs = rhs.toLowerCase();
    switch (op) {
      case "-eq": return truthy(rhs) || /^\$?false$/i.test(rhs) ? !!v === truthy(rhs) : num ? Number(v) === Number(rhs) : vs === rs;
      case "-ne": return num ? Number(v) !== Number(rhs) : vs !== rs;
      case "-gt": return Number(v) > Number(rhs); case "-lt": return Number(v) < Number(rhs);
      case "-ge": return Number(v) >= Number(rhs); case "-le": return Number(v) <= Number(rhs);
      case "-like": return new RegExp("^" + rs.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$", "i").test(vs);
      case "-match": return new RegExp(rhs, "i").test(String(v));
      case "-contains": return Array.isArray(v) && v.some(x => String(x).toLowerCase() === rs);
      default: return false;
    }
  }
  function whereObj(inArr, args) {
    let block = args.join(" ").trim().replace(/^\{|\}$/g, "").trim();
    const orParts = block.split(/\s+-or\s+/i);
    const out = inArr.filter(rec => orParts.some(op => op.split(/\s+-and\s+/i).every(c => condTest(rec, c))));
    if (inArr._cols) out._cols = inArr._cols; return out;
  }
  function selectObj(inArr, opt, pos, sw) {
    if (opt.expandproperty) return inArr.map(x => gv(x, opt.expandproperty));
    let arr = inArr.slice(); if (inArr._cols) arr._cols = inArr._cols;
    if (opt.first) arr = arr.slice(0, Number(opt.first));
    if (opt.last) arr = arr.slice(-Number(opt.last));
    const props = (opt.property || pos.join("").split(",").filter(Boolean).join(",")).split(",").filter(Boolean);
    if (props.length) { const mapped = arr.map(x => { const o = {}; props.forEach(p => o[p] = gv(x, p)); return o; }); mapped._cols = props; return mapped; }
    return arr;
  }

  const DEFEV = [
    { time: "9/25/2026 9:05:00 AM", id: 4624, level: "Information", source: "Security", message: "An account was successfully logged on." },
    { time: "9/25/2026 9:06:00 AM", id: 4625, level: "Warning", source: "Security", message: "An account failed to log on." },
    { time: "9/25/2026 9:07:00 AM", id: 7036, level: "Information", source: "Service Control Manager", message: "A service entered the running state." }
  ];
  const ALIAS = { ls: "get-childitem", dir: "get-childitem", gci: "get-childitem", cd: "set-location", sl: "set-location", pwd: "get-location", gl: "get-location", cat: "get-content", gc: "get-content", type: "get-content", sc: "set-content", ac: "add-content", ni: "new-item", ri: "remove-item", rm: "remove-item", del: "remove-item", erase: "remove-item", rd: "remove-item", cpi: "copy-item", copy: "copy-item", cp: "copy-item", mi: "move-item", move: "move-item", mv: "move-item", gsv: "get-service", gps: "get-process", ps: "get-process", kill: "stop-process", spps: "stop-process", spsv: "start-service", echo: "write-output", write: "write-output", select: "select-object", where: "where-object", "?": "where-object", sort: "sort-object", measure: "measure-object", ft: "format-table", fl: "format-list", gcm: "get-command", man: "get-help", cls: "clear" };
  const CMDS = "Get-ChildItem Set-Location Get-Content Set-Content Add-Content New-Item Remove-Item Copy-Item Move-Item Get-Location Get-Service Start-Service Stop-Service Restart-Service Set-Service Get-Process Stop-Process Get-LocalUser New-LocalUser Enable-LocalUser Disable-LocalUser Add-LocalGroupMember Get-LocalGroupMember Get-WindowsFeature Install-WindowsFeature Get-NetIPAddress Get-NetIPConfiguration Test-NetConnection Resolve-DnsName Get-NetFirewallRule New-NetFirewallRule Enable-NetFirewallRule Disable-NetFirewallRule Get-ADUser New-ADUser Set-ADUser Enable-ADAccount Disable-ADAccount Unlock-ADAccount Add-ADGroupMember Get-ADGroupMember Get-EventLog Get-WinEvent Get-Command Get-Help New-AzResourceGroup Get-AzResourceGroup Remove-AzResourceGroup Where-Object Select-Object Sort-Object Format-Table Measure-Object Out-File Write-Output".split(" ");

  function prompt(S) { return `PS ${S.cwd}>`; }
  function isError(o) { return typeof o === "string" && /(is not recognized|Cannot find|cannot find|does not exist|already exists|has children|could not be found|Cannot bind|was not found|Access is denied|Unable to|ObjectNotFound|Cannot find an object with identity)/i.test(o); }

  function check(S, c) {
    switch (c.type) {
      case "file": { const k = cik(S.files, normPath(S.cwd, c.path)); return !!k && S.files[k].includes(c.includes); }
      case "exists": { const np = normPath(S.cwd, c.path); return !!cik(S.files, np) || [...S.dirs].some(d => d.toLowerCase() === np.toLowerCase()); }
      case "missing": { const np = normPath(S.cwd, c.path); return !cik(S.files, np) && ![...S.dirs].some(d => d.toLowerCase() === np.toLowerCase()); }
      case "service": { const s = ci(S.services, c.name); return !!s && (c.status == null || s.status.toLowerCase() === String(c.status).toLowerCase()) && (c.startType == null || s.startType.toLowerCase() === String(c.startType).toLowerCase()); }
      case "localUser": { const u = ci(S.localUsers, c.name); return !!u && (c.enabled == null || u.enabled === c.enabled); }
      case "inGroup": { const u = ci(S.localUsers, c.user); return !!u && u.groups.some(g => g.toLowerCase() === String(c.group).toLowerCase()); }
      case "feature": { const f = ci(S.features, c.name); return !!f && f.installed === (c.installed !== false); }
      case "adUser": { const u = ci(S.adUsers, c.sam); return !!u && (c.enabled == null || u.enabled === c.enabled); }
      case "adGroupMember": { const u = ci(S.adUsers, c.sam); return !!u && u.groups.some(g => g.toLowerCase() === String(c.group).toLowerCase()); }
      case "firewallRule": { const r = ci(S.firewallRules, c.name); return !!r && (c.enabled == null || r.enabled === c.enabled) && (c.port == null || String(r.port) === String(c.port)); }
      case "azRg": { const has = !!cik(S.azResourceGroups, c.name); return c.exists === false ? !has : has; }
      case "ran": { const hay = S.history.join("\n").toLowerCase(); return hay.includes(String(c.includes || c.cmd).toLowerCase()); }
      default: return false;
    }
  }

  const api = { create, run, check, prompt, isError, CMDS };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else { root.CertHub = root.CertHub || {}; root.CertHub.pwsh = api; }
})(typeof window !== "undefined" ? window : globalThis);
