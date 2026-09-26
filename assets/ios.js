/* A simulated Cisco IOS switch/router command line for CCNA, CCST Networking and Network+ practice.
   Mode-aware (user EXEC >, privileged #, global config, and interface/line/vlan/router/acl/dhcp sub-modes),
   with command abbreviations (conf t, int g0/1, sh run, no shut, wr). It is a teaching sandbox, not a real device.
   Commands: enable disable configure exit end hostname banner username service, interface line vlan router ospf,
   ip (address route domain-name ssh default-gateway routing helper-address nat access-list access-group dhcp),
   switchport spanning-tree shutdown description crypto, show (running-config, ip interface brief, vlan brief,
   interfaces trunk, ip route, access-lists, port-security, startup-config), copy, write, and do.
   Works in the browser (CertHub.ios) and in Node (module.exports) for content checks. */
(function (root) {
  const ip2n = ip => ip.split(".").reduce((a, b) => a * 256 + (+b), 0) >>> 0;
  const n2ip = n => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");
  const mlen = m => ((ip2n(m) >>> 0).toString(2).match(/1/g) || []).length;
  const netOf = (ip, m) => n2ip((ip2n(ip) & ip2n(m)) >>> 0);
  const wildMask = w => n2ip((~ip2n(w)) >>> 0);
  const ab = (w, f) => !!w && f.startsWith(w);
  const IFTYPES = ["GigabitEthernet", "FastEthernet", "TenGigabitEthernet", "Ethernet", "Serial", "Loopback", "Vlan", "Port-channel"];
  // Turn "g0/1", "gi0/1", "vlan 10" (already joined) into a canonical interface name.
  function ifname(str) {
    if (!str) return null;
    const m = str.match(/^([A-Za-z-]+)\s*([\d/.]+)$/);
    if (!m) return null;
    const a = m[1].toLowerCase(), num = m[2];
    for (const full of IFTYPES) if (full.toLowerCase().startsWith(a)) return full + num;
    return null;
  }
  const shortIf = n => n.replace(/^GigabitEthernet/, "Gi").replace(/^FastEthernet/, "Fa").replace(/^TenGigabitEthernet/, "Te").replace(/^Ethernet/, "Et").replace(/^Serial/, "Se").replace(/^Port-channel/, "Po").replace(/^Loopback/, "Lo").replace(/^Vlan/, "Vl");

  function create(setup = {}) {
    const S = {
      host: setup.hostname || "Switch", type: setup.type || "switch", mode: "user", ctx: null,
      history: [], interfaces: {}, vlans: {}, lines: {}, users: {}, routes: [], ospf: {}, acls: {}, dhcp: {},
      enableSecret: null, enablePw: null, svcEnc: false, banner: null, domain: null, sshVersion: null,
      crypto: false, defGw: null, ipRouting: false, startup: null
    };
    Object.entries(setup.interfaces || {}).forEach(([name, cfg]) => {
      S.interfaces[name] = Object.assign({ desc: "", ip: null, mask: null, shut: name.startsWith("Vlan") ? true : setup.type === "router", swMode: null, accessVlan: null, trunkNative: null, trunkAllowed: null, ps: null, portfast: false, helper: null, nat: null, aclIn: null, aclOut: null }, cfg || {});
    });
    Object.entries(setup.vlans || {}).forEach(([id, name]) => { S.vlans[id] = name; });
    (setup.users || []).forEach(u => { S.users[u.name] = { priv: u.priv || null, secret: u.secret || null, pw: u.pw || null }; });
    return S;
  }
  const getIf = (S, name) => { if (!S.interfaces[name]) S.interfaces[name] = { desc: "", ip: null, mask: null, shut: name.startsWith("Vlan") ? true : S.type === "router", swMode: null, accessVlan: null, trunkNative: null, trunkAllowed: null, ps: null, portfast: false, helper: null, nat: null, aclIn: null, aclOut: null }; return S.interfaces[name]; };
  const INVALID = "% Invalid input detected at '^' marker.";
  const INCOMPLETE = "% Incomplete command.";

  function prompt(S) {
    if (S.mode === "user") return S.host + ">";
    if (S.mode === "priv") return S.host + "#";
    const c = S.ctx;
    if (!c) return S.host + "(config)#";
    const tag = { if: "config-if", line: "config-line", vlan: "config-vlan", ospf: "config-router", dhcp: "config-dhcp" };
    if (c.type === "acl") return S.host + "(config-" + (c.kind === "standard" ? "std" : "ext") + "-nacl)#";
    return S.host + "(" + (tag[c.type] || "config") + ")#";
  }

  function run(S, line) {
    line = String(line || "").replace(/\s+$/, "").replace(/^\s+/, "");
    if (!line) return "";
    S.history.push(line);
    let t = line.split(/\s+/);
    // "do <cmd>" runs an EXEC command from any config mode.
    if ((S.mode === "config") && ab(t[0], "do") && t[0].length >= 2) return execPriv(S, t.slice(1));
    if (S.mode === "user") return execUser(S, t);
    if (S.mode === "priv") return execPriv(S, t);
    return execConfig(S, t);
  }

  function execUser(S, t) {
    const c = t[0];
    if (ab(c, "enable") && c.length >= 2) { S.mode = "priv"; return ""; }
    if (ab(c, "disable")) return "";
    if (ab(c, "exit") || ab(c, "logout")) return "";
    if (ab(c, "ping")) return pingOut(t[1]);
    if (c === "?" || ab(c, "help")) return "Exec commands: enable  ping  show (after enable)  exit\nType help for the full list once in privileged mode (#).";
    if (ab(c, "show")) return "% Enter privileged mode first: type enable, then run show commands.";
    return INVALID;
  }

  function execPriv(S, t) {
    const c = t[0];
    if (ab(c, "disable")) { S.mode = "user"; return ""; }
    if (ab(c, "exit") || ab(c, "logout")) { S.mode = "user"; return ""; }
    if (ab(c, "enable")) return "";
    if (ab(c, "configure") && c.length >= 4) { if (t[1] && !ab(t[1], "terminal")) return INVALID; S.mode = "config"; S.ctx = null; return "Enter configuration commands, one per line.  End with CNTL/Z."; }
    if (ab(c, "copy")) {
      if (t[1] && ab(t[1], "running-config") && t[2] && ab(t[2], "startup-config")) { S.startup = runCfg(S); return "Destination filename [startup-config]?\nBuilding configuration...\n[OK]"; }
      return INVALID;
    }
    if (ab(c, "write") && c.length >= 2) { S.startup = runCfg(S); return "Building configuration...\n[OK]"; }
    if (ab(c, "reload")) return "Proceed with reload? [confirm]";
    if (ab(c, "ping")) return pingOut(t[1]);
    if (ab(c, "show") && c.length >= 2) return showCmd(S, t.slice(1));
    if (c === "?" || ab(c, "help")) return helpText();
    return INVALID;
  }

  function execConfig(S, t) {
    let neg = false;
    if (t[0] === "no") { neg = true; t = t.slice(1); if (!t.length) return INCOMPLETE; }
    const c = S.ctx;
    if (ab(t[0], "exit")) { if (c) { S.ctx = null; return ""; } S.mode = "priv"; return ""; }
    if (ab(t[0], "end")) { S.mode = "priv"; S.ctx = null; return ""; }
    if (c && c.type === "if") return ifCmd(S, t, neg);
    if (c && c.type === "line") return lineCmd(S, t, neg);
    if (c && c.type === "vlan") return vlanCmd(S, t, neg);
    if (c && c.type === "ospf") return ospfCmd(S, t, neg);
    if (c && c.type === "acl") return aclCmd(S, t, neg);
    if (c && c.type === "dhcp") return dhcpCmd(S, t, neg);
    return globalCmd(S, t, neg);
  }

  function globalCmd(S, t, neg) {
    const c = t[0];
    if (ab(c, "hostname")) { if (!t[1]) return INCOMPLETE; S.host = t[1]; return ""; }
    if (ab(c, "enable")) {
      if (ab(t[1], "secret")) { if (!t[2]) return INCOMPLETE; S.enableSecret = t.slice(2).join(" "); return ""; }
      if (ab(t[1], "password")) { if (!t[2]) return INCOMPLETE; S.enablePw = t.slice(2).join(" "); return ""; }
      return INVALID;
    }
    if (ab(c, "service") && ab(t[1], "password-encryption")) { S.svcEnc = !neg; return ""; }
    if (ab(c, "banner") && ab(t[1], "motd")) {
      const rest = t.slice(2).join(" "); const d = rest[0];
      if (!d) return INCOMPLETE;
      const body = rest.slice(1); const end = body.indexOf(d);
      S.banner = end >= 0 ? body.slice(0, end) : body;
      return "";
    }
    if (ab(c, "username")) {
      const name = t[1]; if (!name) return INCOMPLETE;
      const u = S.users[name] || (S.users[name] = { priv: null, secret: null, pw: null });
      const pi = t.indexOf("privilege"); if (pi > 0) u.priv = t[pi + 1];
      const si = t.findIndex(x => ab(x, "secret") && x.length >= 3); if (si > 1) u.secret = t.slice(si + 1).join(" ");
      const wi = t.findIndex(x => ab(x, "password") && x.length >= 4); if (wi > 1 && si < 0) u.pw = t.slice(wi + 1).join(" ");
      return "";
    }
    if (ab(c, "crypto") && ab(t[1], "key")) {
      S.crypto = true;
      return "The name for the keys will be: " + S.host + "." + (S.domain || "local") + "\n% The key modulus size is " + (t[t.indexOf("modulus") + 1] || "1024") + " bits\n% Generating RSA keys, this may take a few minutes.\n[OK]";
    }
    if (ab(c, "line")) {
      const key = t.slice(1).join(" "); if (!key) return INCOMPLETE;
      S.lines[key] = S.lines[key] || { password: null, login: null, transport: null };
      S.ctx = { type: "line", key }; return "";
    }
    if (ab(c, "interface")) {
      let rest = t.slice(1);
      let joined = /^[A-Za-z-]+$/.test(rest[0] || "") && /^\d/.test(rest[1] || "") ? rest[0] + rest[1] : rest[0];
      const name = ifname(joined); if (!name) return INVALID;
      getIf(S, name); S.ctx = { type: "if", name }; return "";
    }
    if (ab(c, "vlan")) {
      const id = t[1]; if (!/^\d+$/.test(id || "")) return INVALID;
      if (!S.vlans[id]) S.vlans[id] = "VLAN" + String(id).padStart(4, "0");
      S.ctx = { type: "vlan", id }; return "";
    }
    if (ab(c, "router") && ab(t[1], "ospf")) {
      const pid = t[2]; if (!/^\d+$/.test(pid || "")) return INCOMPLETE;
      S.ospf[pid] = S.ospf[pid] || { routerId: null, networks: [] };
      S.ctx = { type: "ospf", pid }; return "";
    }
    if (ab(c, "ip")) return ipGlobal(S, t, neg);
    if (ab(c, "spanning-tree")) return "";
    return INVALID;
  }

  function ipGlobal(S, t, neg) {
    if (ab(t[1], "domain-name")) { S.domain = t[2] || S.domain; return ""; }
    if (ab(t[1], "ssh") && ab(t[2], "version")) { S.sshVersion = t[3] || "2"; return ""; }
    if (ab(t[1], "default-gateway")) { S.defGw = neg ? null : t[2]; return ""; }
    if (ab(t[1], "routing")) { S.ipRouting = !neg; return ""; }
    if (ab(t[1], "route")) {
      if (t.length < 5) return INCOMPLETE;
      S.routes.push({ prefix: t[2], mask: t[3], nh: t[4] }); return "";
    }
    if (ab(t[1], "access-list")) {
      const kind = ab(t[2], "standard") ? "standard" : ab(t[2], "extended") ? "extended" : null;
      if (!kind) return INVALID;
      const name = t[3]; if (!name) return INCOMPLETE;
      S.acls[name] = S.acls[name] || { kind, lines: [] };
      S.ctx = { type: "acl", name, kind }; return "";
    }
    if (ab(t[1], "dhcp") && ab(t[2], "pool")) {
      const name = t[3]; if (!name) return INCOMPLETE;
      S.dhcp[name] = S.dhcp[name] || { network: null, mask: null, defRouter: null, dns: null };
      S.ctx = { type: "dhcp", name }; return "";
    }
    return INVALID;
  }

  function ifCmd(S, t, neg) {
    const I = getIf(S, S.ctx.name), c = t[0];
    if (ab(c, "description")) { I.desc = neg ? "" : t.slice(1).join(" "); return ""; }
    if (ab(c, "shutdown")) { I.shut = !neg; return ""; }
    if (ab(c, "ip")) {
      if (ab(t[1], "address")) { if (neg) { I.ip = I.mask = null; return ""; } if (!t[3]) return INCOMPLETE; I.ip = t[2]; I.mask = t[3]; return ""; }
      if (ab(t[1], "helper-address")) { I.helper = neg ? null : t[2]; return ""; }
      if (ab(t[1], "nat")) { I.nat = neg ? null : (ab(t[2], "inside") ? "inside" : "outside"); return ""; }
      if (ab(t[1], "access-group")) { const d = ab(t[3], "in") ? "aclIn" : "aclOut"; I[d] = neg ? null : t[2]; return ""; }
      return INVALID;
    }
    if (ab(c, "switchport")) {
      if (ab(t[1], "mode")) { I.swMode = ab(t[2], "trunk") ? "trunk" : "access"; return ""; }
      if (ab(t[1], "access") && ab(t[2], "vlan")) { I.accessVlan = neg ? null : t[3]; return ""; }
      if (ab(t[1], "trunk") && ab(t[2], "native") && ab(t[3], "vlan")) { I.trunkNative = neg ? null : t[4]; return ""; }
      if (ab(t[1], "trunk") && ab(t[2], "allowed") && ab(t[3], "vlan")) { I.trunkAllowed = neg ? null : t[4]; return ""; }
      if (ab(t[1], "port-security")) {
        if (neg && t.length === 2) { I.ps = null; return ""; }
        I.ps = I.ps || { max: 1, violation: "shutdown", sticky: false };
        if (ab(t[2], "maximum")) I.ps.max = t[3];
        else if (ab(t[2], "violation")) I.ps.violation = t[3];
        else if (ab(t[2], "mac-address") && ab(t[3], "sticky")) I.ps.sticky = true;
        return "";
      }
      return INVALID;
    }
    if (ab(c, "spanning-tree") && ab(t[1], "portfast")) { I.portfast = !neg; return ""; }
    return INVALID;
  }

  function lineCmd(S, t, neg) {
    const l = S.lines[S.ctx.key], c = t[0];
    if (ab(c, "password")) { l.password = neg ? null : t.slice(1).join(" "); return ""; }
    if (ab(c, "login")) { l.login = ab(t[1], "local") ? "local" : "password"; return ""; }
    if (ab(c, "transport") && ab(t[1], "input")) { l.transport = t.slice(2).join(" "); return ""; }
    if (ab(c, "exec-timeout") || ab(c, "logging")) return "";
    return INVALID;
  }

  function vlanCmd(S, t, neg) {
    if (ab(t[0], "name")) { if (!t[1]) return INCOMPLETE; S.vlans[S.ctx.id] = t[1]; return ""; }
    return INVALID;
  }

  function ospfCmd(S, t, neg) {
    const o = S.ospf[S.ctx.pid];
    if (ab(t[0], "router-id")) { o.routerId = t[1]; return ""; }
    if (ab(t[0], "network")) {
      if (!t[4] || !ab(t[3], "area")) return INCOMPLETE;
      o.networks.push({ addr: t[1], wild: t[2], area: t[4] }); return "";
    }
    if (ab(t[0], "passive-interface")) return "";
    return INVALID;
  }

  function aclCmd(S, t, neg) {
    const a = S.acls[S.ctx.name];
    if (ab(t[0], "permit") || ab(t[0], "deny") || ab(t[0], "remark")) { a.lines.push(t.join(" ")); return ""; }
    return INVALID;
  }

  function dhcpCmd(S, t, neg) {
    const d = S.dhcp[S.ctx.name];
    if (ab(t[0], "network")) { d.network = t[1]; d.mask = t[2]; return ""; }
    if (ab(t[0], "default-router")) { d.defRouter = t[1]; return ""; }
    if (ab(t[0], "dns-server")) { d.dns = t[1]; return ""; }
    if (ab(t[0], "domain-name") || ab(t[0], "lease")) return "";
    return INVALID;
  }

  function pingOut(ip) {
    if (!ip) return INCOMPLETE;
    return "Type escape sequence to abort.\nSending 5, 100-byte ICMP Echos to " + ip + ", timeout is 2 seconds:\n!!!!!\nSuccess rate is 100 percent (5/5), round-trip min/avg/max = 1/1/2 ms";
  }

  function runCfg(S) {
    const L = [], P = x => L.push(x);
    P("!"); P("version 15.2");
    P(S.svcEnc ? "service password-encryption" : "no service password-encryption");
    P("!"); P("hostname " + S.host); P("!");
    if (S.enableSecret) P("enable secret 5 $1$mERr$" + "u2W9lXhq3exampleHash01");
    else if (S.enablePw) P("enable password " + (S.svcEnc ? "7 08221D40481B" : S.enablePw));
    Object.entries(S.users).forEach(([n, u]) => P("username " + n + (u.priv ? " privilege " + u.priv : "") + (u.secret ? " secret 5 $1$abcd$exampleHash" : u.pw ? " password " + (S.svcEnc ? "7 060506324F41" : u.pw) : "")));
    P("!");
    if (S.ipRouting) P("ip routing");
    if (S.domain) P("ip domain-name " + S.domain);
    P("!");
    Object.keys(S.vlans).map(Number).sort((a, b) => a - b).forEach(id => { if (id === 1) return; P("vlan " + id); if (S.vlans[id]) P(" name " + S.vlans[id]); P("!"); });
    Object.keys(S.interfaces).forEach(name => {
      const I = S.interfaces[name]; P("interface " + name);
      if (I.desc) P(" description " + I.desc);
      if (I.swMode) P(" switchport mode " + I.swMode);
      if (I.accessVlan) P(" switchport access vlan " + I.accessVlan);
      if (I.trunkNative) P(" switchport trunk native vlan " + I.trunkNative);
      if (I.trunkAllowed) P(" switchport trunk allowed vlan " + I.trunkAllowed);
      if (I.ps) { P(" switchport port-security maximum " + I.ps.max); if (I.ps.violation) P(" switchport port-security violation " + I.ps.violation); if (I.ps.sticky) P(" switchport port-security mac-address sticky"); P(" switchport port-security"); }
      if (I.portfast) P(" spanning-tree portfast");
      if (I.ip) P(" ip address " + I.ip + " " + I.mask);
      if (I.helper) P(" ip helper-address " + I.helper);
      if (I.nat) P(" ip nat " + I.nat);
      if (I.aclIn) P(" ip access-group " + I.aclIn + " in");
      if (I.aclOut) P(" ip access-group " + I.aclOut + " out");
      if (I.shut) P(" shutdown");
      P("!");
    });
    if (S.defGw) { P("ip default-gateway " + S.defGw); }
    if (S.sshVersion) P("ip ssh version " + S.sshVersion);
    S.routes.forEach(r => P("ip route " + r.prefix + " " + r.mask + " " + r.nh));
    Object.keys(S.ospf).forEach(pid => { const o = S.ospf[pid]; P("!"); P("router ospf " + pid); if (o.routerId) P(" router-id " + o.routerId); o.networks.forEach(n => P(" network " + n.addr + " " + n.wild + " area " + n.area)); });
    Object.keys(S.acls).forEach(name => { const a = S.acls[name]; P("!"); P("ip access-list " + a.kind + " " + name); a.lines.forEach(x => P(" " + x)); });
    Object.keys(S.dhcp).forEach(name => { const d = S.dhcp[name]; P("!"); P("ip dhcp pool " + name); if (d.network) P(" network " + d.network + " " + d.mask); if (d.defRouter) P(" default-router " + d.defRouter); if (d.dns) P(" dns-server " + d.dns); });
    P("!");
    if (S.banner) P("banner motd ^C" + S.banner + "^C");
    P("!");
    Object.keys(S.lines).forEach(key => { const l = S.lines[key]; P("line " + key); if (l.password) P(" password " + (S.svcEnc ? "7 0822455D0A16" : l.password)); if (l.login) P(l.login === "local" ? " login local" : " login"); if (l.transport) P(" transport input " + l.transport); });
    P("!"); P("end");
    return L.join("\n");
  }

  function routeText(S) {
    const L = ["Codes: L - local, C - connected, S - static, O - OSPF", "", "Gateway of last resort is not set", ""];
    Object.keys(S.interfaces).forEach(name => { const I = S.interfaces[name]; if (I.ip && !I.shut) L.push("C    " + netOf(I.ip, I.mask) + "/" + mlen(I.mask) + " is directly connected, " + name); });
    S.routes.forEach(r => L.push((r.prefix === "0.0.0.0" ? "S*   " : "S    ") + r.prefix + "/" + mlen(r.mask) + " [1/0] via " + r.nh));
    Object.keys(S.ospf).forEach(pid => S.ospf[pid].networks.forEach(n => L.push("O    " + netOf(n.addr, wildMask(n.wild)) + "/" + mlen(wildMask(n.wild)) + " [110/2] via " + (S.ospf[pid].routerId || "0.0.0.0"))));
    return L.join("\n");
  }

  function showCmd(S, t) {
    if (ab(t[0], "running-config") || (ab(t[0], "run"))) return "Building configuration...\n\nCurrent configuration:\n" + runCfg(S);
    if (ab(t[0], "startup-config") || ab(t[0], "start")) return S.startup ? S.startup : "startup-config is not present";
    if (ab(t[0], "ip") && ab(t[1], "interface") && ab(t[2], "brief")) {
      const rows = Object.keys(S.interfaces).map(name => {
        const I = S.interfaces[name], status = I.shut ? "administratively down" : "up", proto = I.shut ? "down" : "up";
        return name.padEnd(23) + (I.ip || "unassigned").padEnd(16) + "YES " + (I.ip ? "manual" : "unset ").padEnd(6) + " " + status.padEnd(22) + proto;
      });
      return "Interface".padEnd(23) + "IP-Address".padEnd(16) + "OK? Method Status                Protocol\n" + rows.join("\n");
    }
    if (ab(t[0], "vlan") && (ab(t[1], "brief") || !t[1])) {
      const byV = {}; Object.keys(S.interfaces).forEach(n => { if (n.startsWith("Vlan")) return; const I = S.interfaces[n]; const v = I.swMode === "access" ? (I.accessVlan || "1") : I.swMode === "trunk" ? null : "1"; if (v) (byV[v] = byV[v] || []).push(shortIf(n)); });
      const ids = new Set(["1", ...Object.keys(S.vlans), ...Object.keys(byV)]);
      const names = { 1: "default" };
      const rows = [...ids].map(Number).sort((a, b) => a - b).map(id => String(id).padEnd(5) + (S.vlans[id] || names[id] || "VLAN" + String(id).padStart(4, "0")).padEnd(33) + "active    " + (byV[id] || []).join(", "));
      return "VLAN Name                             Status    Ports\n---- -------------------------------- --------- -------------------------------\n" + rows.join("\n");
    }
    if (ab(t[0], "interfaces") && ab(t[1], "trunk")) {
      const trunks = Object.keys(S.interfaces).filter(n => S.interfaces[n].swMode === "trunk");
      if (!trunks.length) return "";
      const h1 = "Port        Mode             Encapsulation  Status        Native vlan\n" + trunks.map(n => shortIf(n).padEnd(12) + "on               802.1q         trunking      " + (S.interfaces[n].trunkNative || "1")).join("\n");
      const h2 = "\n\nPort        Vlans allowed on trunk\n" + trunks.map(n => shortIf(n).padEnd(12) + (S.interfaces[n].trunkAllowed || "1-4094")).join("\n");
      return h1 + h2;
    }
    if (ab(t[0], "ip") && ab(t[1], "route")) return routeText(S);
    if (ab(t[0], "access-lists") || (ab(t[0], "access-list"))) {
      const names = Object.keys(S.acls); if (!names.length) return "";
      return names.map(n => { const a = S.acls[n]; return (a.kind === "standard" ? "Standard" : "Extended") + " IP access list " + n + "\n" + a.lines.map((x, i) => "    " + (10 * (i + 1)) + " " + x).join("\n"); }).join("\n");
    }
    if (ab(t[0], "port-security")) {
      const secs = Object.keys(S.interfaces).filter(n => S.interfaces[n].ps);
      const rows = secs.map(n => { const p = S.interfaces[n].ps; return shortIf(n).padEnd(13) + String(p.max).padEnd(15) + "0".padEnd(13) + "0".padEnd(19) + (p.violation[0].toUpperCase() + p.violation.slice(1)); });
      return "Secure Port  MaxSecureAddr  CurrentAddr  SecurityViolation  Security Action\n-----------  -------------  -----------  -----------------  ---------------\n" + rows.join("\n");
    }
    if (ab(t[0], "version")) return "Cisco IOS Software, Version 15.2\n" + S.host + " uptime is 1 hour, 0 minutes\nSystem image file is \"flash:c-universalk9.bin\"";
    if (ab(t[0], "clock")) return "*00:00:00.000 UTC Mon Jan 1 2001";
    if (ab(t[0], "cdp") && ab(t[1], "neighbors")) return "Device ID    Local Intrfce   Holdtme   Capability   Platform   Port ID";
    return INVALID;
  }

  const CMDS = "enable disable configure exit end hostname banner username service line interface vlan router shutdown description switchport spanning-tree crypto ip copy write show do ping help".split(" ");
  function helpText() {
    return "This simulator supports (with standard IOS abbreviations):\n" +
      "  enable / disable, configure terminal, exit, end\n" +
      "  Global: hostname, enable secret, service password-encryption, banner motd, username, ip domain-name, crypto key generate rsa, ip ssh version, ip default-gateway, ip routing, ip route, ip access-list, ip dhcp pool, line, interface, vlan, router ospf\n" +
      "  Interface: description, ip address, shutdown/no shutdown, switchport mode/access/trunk, switchport port-security, spanning-tree portfast, ip helper-address, ip nat, ip access-group\n" +
      "  Line: password, login/login local, transport input\n" +
      "  show: running-config, startup-config, ip interface brief, vlan brief, interfaces trunk, ip route, access-lists, port-security, version\n" +
      "  copy running-config startup-config, write memory";
  }

  function isError(o) { return /^%|% (Invalid|Incomplete|Ambiguous|Unknown|Unrecognized|Bad|Not)/.test(o || "") || /Invalid input detected/.test(o || ""); }

  // Checks: config {includes}, intf {name, path, value|includes}, vlan {id, name}, route {prefix}, saved, mode {mode}
  function check(S, c) {
    switch (c.type) {
      case "config": return runCfg(S).includes(c.includes);
      case "mode": {
        const m = c.mode;
        if (m === "privileged" || m === "priv") return S.mode === "priv";
        if (m === "user") return S.mode === "user";
        if (m === "config" || m === "global") return S.mode === "config";
        return false;
      }
      case "vlan": return !!S.vlans[c.id] && (c.name == null || S.vlans[c.id] === c.name);
      case "route": return routeText(S).includes(c.prefix);
      case "saved": return S.startup != null && S.startup === runCfg(S);
      case "intf": {
        const I = S.interfaces[c.name]; if (!I) return false;
        const map = { shutdown: I.shut, mode: I.swMode, vlan: I.accessVlan, ip: I.ip, mask: I.mask, description: I.desc, native: I.trunkNative, allowed: I.trunkAllowed, portfast: I.portfast, helper: I.helper, nat: I.nat, portsec: !!I.ps, aclin: I.aclIn, aclout: I.aclOut };
        let val = map[c.path];
        if (c.path === "psmax" && I.ps) val = I.ps.max;
        if (c.path === "psviolation" && I.ps) val = I.ps.violation;
        if (c.path === "pssticky") val = !!(I.ps && I.ps.sticky);
        if ("value" in c) return String(val) === String(c.value) || val === c.value;
        if (c.includes != null) return typeof val === "string" && val.includes(c.includes);
        return val != null && val !== false && val !== "";
      }
      default: return false;
    }
  }

  const api = { create, run, check, prompt, isError, CMDS };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.CertHub.ios = api;
})(typeof window !== "undefined" ? window : globalThis);
