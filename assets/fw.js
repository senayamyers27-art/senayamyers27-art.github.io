/* A small firewall policy evaluator for practice: checks one traffic flow against an ordered rule
   list, first match wins, the way Palo Alto security policy and FortiGate firewall policy work.
   Rules: { name, from, to, src, dst, app, service, action, disabled } - each match field is a list
   (or a single string) of zone names, address objects/groups, CIDRs, IPs or ranges, app names,
   service objects, "tcp/443", "udp/53", "tcp/8000-8080", "icmp", "application-default" or any/all.
   Implicit rules: paloalto allows intrazone and denies interzone; fortigate and generic deny.
   Unknown names never match and are reported in warnings. Works in the browser (CertHub.fw)
   and in Node (module.exports) for content checks. */
(function (root) {
  const BUILTIN_SERVICES = {
    "service-http": ["tcp/80", "tcp/8080"], "service-https": ["tcp/443"],
    http: ["tcp/80"], https: ["tcp/443"], dns: ["tcp/53", "udp/53"], ssh: ["tcp/22"], telnet: ["tcp/23"],
    smtp: ["tcp/25"], smtps: ["tcp/465"], pop3: ["tcp/110"], imap: ["tcp/143"], ntp: ["udp/123"], snmp: ["udp/161-162"],
    rdp: ["tcp/3389"], ftp: ["tcp/21"], ldap: ["tcp/389"], ldaps: ["tcp/636"], syslog: ["udp/514"], samba: ["tcp/139", "tcp/445"],
    ping: ["icmp"], all_icmp: ["icmp"], icmp: ["icmp"], all: ["any"], all_tcp: ["tcp/1-65535"], all_udp: ["udp/1-65535"]
  };
  const BUILTIN_APPS = {
    "web-browsing": ["tcp/80"], ssl: ["tcp/443"], dns: ["tcp/53", "udp/53"], ssh: ["tcp/22"], telnet: ["tcp/23"],
    smtp: ["tcp/25"], ntp: ["udp/123"], "ms-rdp": ["tcp/3389"], ftp: ["tcp/21"], ldap: ["tcp/389"], snmp: ["udp/161"],
    ping: ["icmp"], "icmp": ["icmp"], "ms-ds-smb": ["tcp/445"], syslog: ["udp/514"], "mysql": ["tcp/3306"], "mssql-db": ["tcp/1433"]
  };
  const lc = v => String(v == null ? "" : v).trim().toLowerCase();
  const list = v => (v == null || v === "" ? ["any"] : Array.isArray(v) ? v : String(v).split(",")).map(x => String(x).trim()).filter(Boolean);
  const isAny = v => { const x = lc(v); return x === "any" || x === "all"; };
  const lower = o => { const r = {}; Object.keys(o || {}).forEach(k => { r[lc(k)] = o[k]; }); return r; };

  function ip4(s) {
    const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(String(s).trim()); if (!m) return null;
    const p = m.slice(1).map(Number); if (p.some(n => n > 255)) return null;
    return ((p[0] << 24) >>> 0) + (p[1] << 16) + (p[2] << 8) + p[3];
  }
  // A literal address: 10.0.0.0/8, 192.0.2.7 or 192.0.2.10-192.0.2.20. Returns [lo, hi] or null.
  function range(s) {
    s = String(s).trim();
    let m = /^([\d.]+)\/(\d{1,2})$/.exec(s);
    if (m) { const a = ip4(m[1]), n = +m[2]; if (a == null || n > 32) return null; const mask = n ? (0xFFFFFFFF << (32 - n)) >>> 0 : 0, lo = (a & mask) >>> 0; return [lo, lo + (2 ** (32 - n)) - 1]; }
    m = /^([\d.]+)\s*-\s*([\d.]+)$/.exec(s);
    if (m) { const a = ip4(m[1]), b = ip4(m[2]); return a == null || b == null ? null : [Math.min(a, b), Math.max(a, b)]; }
    const a = ip4(s); return a == null ? null : [a, a];
  }
  // A literal service: tcp/443, udp/53, tcp/8000-8080, tcp/80,443, icmp. Returns { proto, lo, hi } list or null.
  function svc(s) {
    s = lc(s);
    if (s === "icmp") return [{ proto: "icmp", lo: 0, hi: 65535 }];
    if (isAny(s)) return [{ proto: "any", lo: 0, hi: 65535 }];
    const m = /^(tcp|udp)\/([\d,\s-]+)$/.exec(s); if (!m) return null;
    const out = [];
    for (const part of m[2].split(",")) {
      const r = /^\s*(\d{1,5})\s*(?:-\s*(\d{1,5}))?\s*$/.exec(part); if (!r) return null;
      out.push({ proto: m[1], lo: +r[1], hi: +(r[2] || r[1]) });
    }
    return out;
  }
  const svcHit = (defs, flow) => defs.some(d => d.proto === "any" || (d.proto === lc(flow.proto) && (d.proto === "icmp" || (+flow.port >= d.lo && +flow.port <= d.hi))));

  function evaluate(rules, flow, setup) {
    setup = setup || {}; flow = flow || {};
    const warnings = [], warn = m => { if (!warnings.includes(m)) warnings.push(m); };
    const vendor = lc(setup.vendor || "generic");
    const zones = (setup.zones || []).map(lc);
    const addrs = lower(setup.addresses), groups = lower(setup.addressGroups);
    const services = lower(setup.services), sgroups = lower(setup.serviceGroups);
    const apps = Object.assign({}, BUILTIN_APPS, lower(setup.appDefaults));
    const fip = ip4(flow.src), dip = ip4(flow.dst), fapp = lc(flow.app);

    function addrHit(name, ip, where, seen) {
      if (isAny(name)) return true;
      if (ip == null) return false;
      const key = lc(name);
      if (addrs[key] != null) return list(addrs[key]).some(v => addrHit(v, ip, where, seen));
      if (groups[key] != null) {
        if (seen.has(key)) return false; seen.add(key);
        return list(groups[key]).some(v => addrHit(v, ip, where, seen));
      }
      const r = range(name);
      if (!r) { warn(`${where}: unknown address "${name}" (it never matches)`); return false; }
      return ip >= r[0] && ip <= r[1];
    }
    function serviceDefs(name, where, seen) {
      const key = lc(name);
      const lit = svc(name); if (lit) return lit;
      if (services[key] != null) return [].concat(...list(services[key]).map(v => serviceDefs(v, where, seen)));
      if (sgroups[key] != null) { if (seen.has(key)) return []; seen.add(key); return [].concat(...list(sgroups[key]).map(v => serviceDefs(v, where, seen))); }
      if (BUILTIN_SERVICES[key]) return [].concat(...BUILTIN_SERVICES[key].map(svc));
      warn(`${where}: unknown service "${name}" (it never matches)`); return [];
    }
    function serviceHit(name, ruleApps, where) {
      if (lc(name) === "application-default") {
        // The flow must use a default port of its application (when the rule names apps, the app must be one of them).
        const a = ruleApps.some(isAny) || ruleApps.map(lc).includes(fapp) ? fapp : null;
        if (!a) return false;
        if (!apps[a]) { warn(`${where}: no default port known for application "${flow.app}"`); return false; }
        return svcHit([].concat(...list(apps[a]).map(v => svc(v) || [])), flow);
      }
      return svcHit(serviceDefs(name, where, new Set()), flow);
    }
    const zoneHit = (z, fz, where) => {
      if (isAny(z)) return true;
      if (zones.length && !zones.includes(lc(z))) warn(`${where}: unknown zone "${z}" (it never matches)`);
      return lc(z) === lc(fz);
    };

    for (let i = 0; i < (rules || []).length; i++) {
      const r = rules[i] || {}; if (r.disabled) continue;
      const where = `Rule ${i + 1}${r.name ? ` (${r.name})` : ""}`;
      const appL = list(r.app);
      // Evaluate every field (no short-circuit) so warnings cover typos anywhere in the rule.
      const hits = [
        list(r.from).map(z => zoneHit(z, flow.from, where)).some(Boolean),
        list(r.to).map(z => zoneHit(z, flow.to, where)).some(Boolean),
        list(r.src).map(a => addrHit(a, fip, where, new Set())).some(Boolean),
        list(r.dst).map(a => addrHit(a, dip, where, new Set())).some(Boolean),
        appL.some(a => isAny(a) || lc(a) === fapp),
        list(r.service).map(s => serviceHit(s, appL, where)).some(Boolean)
      ];
      if (hits.every(Boolean)) {
        const act = lc(r.action);
        const action = ["allow", "accept", "permit"].includes(act) ? "allow" : "deny";
        return { action, rule: r.name || `rule ${i + 1}`, warnings };
      }
    }
    if (vendor === "paloalto") {
      const intra = flow.from != null && lc(flow.from) === lc(flow.to);
      return { action: intra ? "allow" : "deny", rule: intra ? "intrazone-default" : "interzone-default", warnings };
    }
    return { action: "deny", rule: null, warnings };
  }

  const api = { evaluate, range, svc };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.CertHub.fw = api;
})(typeof window !== "undefined" ? window : globalThis);
