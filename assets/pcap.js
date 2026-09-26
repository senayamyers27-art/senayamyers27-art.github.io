/* A Wireshark-style display filter for packet capture practice. It filters sample packets
   ({ no, t, src, dst, proto, len, info, f: { "ip.src": ..., ... }, layers }) held in memory.
   Supports: protocol names (eth arp ip ipv6 icmp tcp udp dns http tls dhcp ftp smtp ssh telnet smb
   ntp snmp rdp ...), any field in packet.f plus frame.len, frame.number and frame.time_relative,
   ip.addr / tcp.port / udp.port / eth.addr (source or destination), == != > < >= <= (and eq ne gt
   lt ge le), contains, matches or ~ (regex, case-insensitive), in {a b 1..9}, and or not xor && || !,
   parentheses, a bare field (present; flag fields must be set) and IPv4 CIDR (ip.addr == 10.0.0.0/8).
   Strings compare case-sensitively, as in Wireshark. It is a teaching aid, not a full dissector.
   Works in the browser (CertHub.pcap) and in Node (module.exports) for content checks. */
(function (root) {
  const PROTOS = ["frame", "eth", "arp", "ip", "ipv6", "icmp", "icmpv6", "tcp", "udp", "dns", "http", "tls", "dhcp", "ftp", "ftp-data", "smtp", "ssh", "telnet", "smb", "smb2", "ntp", "snmp", "rdp"];
  const PALIAS = { ssl: "tls", bootp: "dhcp" };
  const ALIAS = { "ip.addr": ["ip.src", "ip.dst"], "ipv6.addr": ["ipv6.src", "ipv6.dst"], "eth.addr": ["eth.src", "eth.dst"], "tcp.port": ["tcp.srcport", "tcp.dstport"], "udp.port": ["udp.srcport", "udp.dstport"], "ssl.handshake.extensions_server_name": ["tls.handshake.extensions_server_name"] };
  const FIELDS = {
    "frame.number": "Packet number", "frame.len": "Frame length in bytes", "frame.time_relative": "Seconds since the first packet",
    "eth.src": "Source MAC", "eth.dst": "Destination MAC", "eth.addr": "Source or destination MAC",
    "arp.opcode": "1 = request, 2 = reply", "arp.src.hw_mac": "Sender MAC", "arp.src.proto_ipv4": "Sender IP", "arp.dst.proto_ipv4": "Target IP",
    "ip.src": "Source IPv4 address", "ip.dst": "Destination IPv4 address", "ip.addr": "Source or destination IPv4 (CIDR allowed)", "ip.ttl": "Time to live", "ip.proto": "6 = TCP, 17 = UDP, 1 = ICMP",
    "icmp.type": "8 = echo request, 0 = echo reply, 11 = time exceeded, 3 = unreachable", "icmp.code": "ICMP code",
    "tcp.srcport": "TCP source port", "tcp.dstport": "TCP destination port", "tcp.port": "TCP source or destination port", "tcp.stream": "Conversation index",
    "tcp.flags": "All TCP flags as a number, e.g. 0x012 for SYN+ACK", "tcp.flags.syn": "SYN flag (1 or 0)", "tcp.flags.ack": "ACK flag", "tcp.flags.reset": "RST flag", "tcp.flags.fin": "FIN flag", "tcp.flags.push": "PSH flag",
    "tcp.seq": "Relative sequence number", "tcp.ack": "Relative acknowledgment number", "tcp.len": "TCP payload length", "tcp.window_size": "Receive window",
    "tcp.analysis.retransmission": "Set on a retransmitted segment", "tcp.analysis.duplicate_ack": "Set on a duplicate ACK",
    "udp.srcport": "UDP source port", "udp.dstport": "UDP destination port", "udp.port": "UDP source or destination port",
    "dns.qry.name": "Name asked for", "dns.qry.type": "1 = A, 28 = AAAA, 16 = TXT, 15 = MX", "dns.flags.response": "0 = query, 1 = response", "dns.a": "IPv4 answer", "dns.flags.rcode": "0 = no error, 3 = NXDOMAIN",
    "http.request.method": "GET, POST, ...", "http.request.uri": "Requested path", "http.host": "Host header", "http.user_agent": "User-Agent header", "http.authorization": "Authorization header", "http.response.code": "Status code, e.g. 404", "http.content_length": "Body length",
    "tls.handshake.type": "1 = Client Hello, 2 = Server Hello", "tls.handshake.extensions_server_name": "SNI: the hostname in the Client Hello", "tls.record.version": "Record version",
    "dhcp.option.dhcp": "1 Discover, 2 Offer, 3 Request, 5 ACK", "dhcp.ip.your": "Address offered (yiaddr)", "dhcp.option.dhcp_server_id": "DHCP server", "dhcp.option.router": "Default gateway", "dhcp.option.domain_name_server": "DNS server", "dhcp.hw.mac_addr": "Client MAC",
    "ftp.request.command": "USER, PASS, RETR, STOR ...", "ftp.request.arg": "Command argument", "ftp.response.code": "FTP reply code",
    "smtp.req.command": "SMTP command", "ssh.protocol": "SSH version banner", "telnet.data": "Telnet payload", "smb2.cmd": "SMB2 command number", "smb2.tree": "SMB2 share path", "smb2.filename": "SMB2 file name",
    "ntp.flags.mode": "3 = client, 4 = server", "snmp.community": "SNMP community string", "rdp.rt_cookie": "RDP routing cookie (mstshash=user)"
  };
  const KW = { eq: "==", ne: "!=", gt: ">", lt: "<", ge: ">=", le: "<=", contains: "contains", matches: "matches", "~": "matches", in: "in" };
  const EX = { ip: "ip.addr", tcp: "tcp.port", udp: "udp.port", eth: "eth.addr", arp: "arp.opcode", icmp: "icmp.type", dns: "dns.qry.name", http: "http.request.method", tls: "tls.handshake.extensions_server_name", dhcp: "dhcp.option.dhcp", ftp: "ftp.request.command", frame: "frame.len" };
  const REL = new Set(["==", "!=", ">", "<", ">=", "<=", "contains", "matches"]);

  function lex(src) {
    const out = [], re = /\s+|"((?:[^"\\]|\\.)*)"|(&&|\|\||\^\^|==|!=|>=|<=|~=|[<>!~(){},])|([^\s"&|^=!<>~(){},]+)/y;
    let i = 0;
    while (i < src.length) {
      re.lastIndex = i; const m = re.exec(src);
      if (!m) {
        const c = src[i];
        if (c === '"') throw new Error("A quoted string is missing its closing quote.");
        if (c === "=") throw new Error('Use "==" (two equals signs) to compare a field with a value.');
        if (c === "&" || c === "|") throw new Error(`Use "${c}${c}" (or "${c === "&" ? "and" : "or"}") to combine tests.`);
        throw new Error(`Unexpected character "${c}" at position ${i + 1}.`);
      }
      i = re.lastIndex;
      if (m[1] !== undefined) out.push({ k: "str", v: m[1].replace(/\\(.)/g, "$1") });
      else if (m[2]) out.push({ k: "op", v: m[2] === "~=" ? "!=" : m[2] });
      else if (m[3]) out.push({ k: "word", v: m[3] });
    }
    return out;
  }

  const dist = (a, b) => { const d = Array.from({ length: a.length + 1 }, (_, i) => [i]); for (let j = 1; j <= b.length; j++) d[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; };

  function parse(src, known, exact) {
    const T = lex(src); let i = 0;
    const peek = () => T[i], word = w => T[i] && T[i].k === "word" && T[i].v.toLowerCase() === w, op = o => T[i] && T[i].k === "op" && T[i].v === o;
    const need = () => { if (!T[i]) throw new Error("The filter ends too early. Finish the comparison or close the parenthesis."); return T[i++]; };
    function field(name) {
      const n = name.toLowerCase(), p = PALIAS[n] || n;
      if (known.has(p) || ALIAS[p] || PROTOS.includes(p)) return p;
      let best = null, bd = 4;
      known.forEach(k => { const d = dist(n, k); if (d < bd) { bd = d; best = k; } });
      throw new Error(`"${name}" isn't a field or protocol in this capture.${best ? ` Did you mean ${best}?` : " Try ip.addr, tcp.port, dns.qry.name or http.request.method."}`);
    }
    function value() {
      const t = need();
      if (t.k === "str") return { s: t.v, q: true };
      if (t.k === "word" && !["and", "or", "not", "xor"].includes(t.v.toLowerCase())) return { s: t.v };
      throw new Error(`Expected a value but found "${t.v}".`);
    }
    function set() {
      if (!op("{")) throw new Error('"in" needs a set in braces, e.g. tcp.port in {80 443}.');
      i++; const items = [];
      while (!op("}")) {
        if (op(",")) { i++; continue; }
        const v = value(), r = !v.q && v.s.split("..");
        items.push(r && r.length === 2 && r[0] && r[1] ? { lo: r[0], hi: r[1] } : v);
        if (!T[i]) throw new Error('The set is missing its closing "}".');
      }
      i++; if (!items.length) throw new Error("The set in braces is empty.");
      return items;
    }
    function test() {
      const t = need();
      if (t.k !== "word") throw new Error(t.k === "str" ? `A value ("${t.v}") needs a field before it, e.g. http.host == "${t.v}".` : `Unexpected "${t.v}".`);
      const f = field(t.v), n = peek(); let o = null;
      if (n && n.k === "op" && REL.has(n.v)) o = n.v;
      else if (n && n.k === "op" && n.v === "~") o = "matches";
      else if (n && n.k === "word" && KW[n.v.toLowerCase()]) o = KW[n.v.toLowerCase()];
      else if (n && n.k === "word" && n.v.toLowerCase() === "not" && T[i + 1] && T[i + 1].k === "word" && T[i + 1].v.toLowerCase() === "in") { i += 2; return { k: "not", a: { k: "in", f, set: set() } }; }
      if (!o) {
        if (n && (n.k === "str" || (n.k === "word" && !["and", "or", "xor"].includes(n.v.toLowerCase())))) throw new Error(`Expected an operator after ${f}, e.g. ${f} == ${n.v}.`);
        return { k: "has", f };
      }
      i++;
      if (PROTOS.includes(f) && !exact.has(f)) throw new Error(`${f} is a protocol. Compare one of its fields instead${EX[f] ? `, e.g. ${EX[f]}` : ` (${f}.something)`}.`);
      if (o === "in") return { k: "in", f, set: set() };
      const v = value();
      if (o === "matches") { try { v.re = new RegExp(v.s, "i"); } catch (e) { throw new Error(`"${v.s}" isn't a valid regular expression.`); } }
      return { k: "cmp", f, o, v };
    }
    function prim() {
      if (op("!") || word("not")) { i++; return { k: "not", a: prim() }; }
      if (op("(")) { i++; const e = or(); if (!op(")")) throw new Error('A "(" is missing its closing ")".'); i++; return e; }
      return test();
    }
    const chain = (next, ops, k) => () => { let a = next(); while (ops.some(o => op(o) || word(o))) { i++; a = { k, a, b: next() }; } return a; };
    const and = chain(prim, ["&&", "and"], "and"), xor = chain(and, ["^^", "xor"], "xor"), or = chain(xor, ["||", "or"], "or");
    if (!T.length) return null;
    const e = or();
    if (i < T.length) throw new Error(T[i].v === ")" ? 'There is a ")" without a matching "(".' : `Unexpected "${T[i].v}". Join tests with and, or, &&, ||.`);
    return e;
  }

  const V4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/, MAC = /^[0-9a-f]{2}([:-][0-9a-f]{2}){5}$/i;
  const ip4 = s => { const m = V4.exec(String(s)); return m && m.slice(1).every(x => +x < 256) ? ((+m[1] << 24) >>> 0) + (+m[2] << 16) + (+m[3] << 8) + +m[4] : null; };
  const num = x => { if (typeof x === "number") return x; if (typeof x === "boolean") return x ? 1 : 0; const s = String(x).trim(); if (/^(true|false)$/i.test(s)) return /^t/i.test(s) ? 1 : 0; if (/^0x[0-9a-f]+$/i.test(s)) return parseInt(s, 16); return /^-?\d+(\.\d+)?$/.test(s) ? +s : null; };
  const macn = s => String(s).toLowerCase().replace(/-/g, ":");

  function vals(p, f) {
    if (ALIAS[f]) return ALIAS[f].flatMap(g => vals(p, g));
    const v = f === "frame.len" ? p.len : f === "frame.number" ? p.no : f === "frame.time_relative" ? p.t : (p.f || {})[f];
    return v === undefined || v === null ? [] : Array.isArray(v) ? v : [v];
  }
  function hasProto(p, n) {
    const f = p.f || {}, col = String(p.proto || "").toLowerCase();
    if (n === "frame") return true;
    if (Object.keys(f).some(k => k === n || k.startsWith(n + "."))) return true;
    if (n === "smb" && Object.keys(f).some(k => k.startsWith("smb2."))) return true;
    return col === n || (n === "tls" && /^(tls|ssl)/.test(col)) || (n === "smb" && col === "smb2");
  }
  function cmp1(a, o, v) {
    const s = v.s;
    if (o === "contains") return String(a).includes(s);
    if (o === "matches") return v.re.test(String(a));
    const cidr = /^(\d+\.\d+\.\d+\.\d+)\/(\d{1,2})$/.exec(s);
    if (cidr && ip4(a) !== null) {
      const bits = +cidr[2], mask = bits ? (~0 << (32 - bits)) >>> 0 : 0, inside = ((ip4(a) & mask) >>> 0) === ((ip4(cidr[1]) & mask) >>> 0);
      if (o === "==") return inside; if (o === "!=") return !inside;
      throw new Error("A CIDR range works only with == or !=.");
    }
    let x, y;
    if (ip4(a) !== null && ip4(s) !== null) { x = ip4(a); y = ip4(s); }
    else if (num(a) !== null && num(s) !== null && !(v.q && typeof a === "string")) { x = num(a); y = num(s); }
    else if (MAC.test(String(a)) && MAC.test(s)) { x = macn(a); y = macn(s); }
    else { x = String(a); y = s; }
    return o === "==" ? x === y : o === "!=" ? x !== y : o === ">" ? x > y : o === "<" ? x < y : o === ">=" ? x >= y : x <= y;
  }
  function ev(e, p) {
    switch (e.k) {
      case "and": return ev(e.a, p) && ev(e.b, p);
      case "or": return ev(e.a, p) || ev(e.b, p);
      case "xor": return ev(e.a, p) !== ev(e.b, p);
      case "not": return !ev(e.a, p);
      case "has": {
        const v = vals(p, e.f);
        if (!v.length) return Object.keys(p.f || {}).some(k => k.startsWith(e.f + ".")) || (PROTOS.includes(e.f) && hasProto(p, e.f));
        return /\.flags?\.|analysis\./.test(e.f) ? v.some(x => num(x) !== 0 && x !== "" && x !== false) : true;
      }
      case "in": return vals(p, e.f).some(a => e.set.some(m => m.lo !== undefined ? num(a) !== null && num(a) >= num(m.lo) && num(a) <= num(m.hi) : cmp1(a, "==", m)));
      case "cmp": { const v = vals(p, e.f); if (!v.length) return false; return e.o === "!=" ? !v.some(a => cmp1(a, "==", e.v)) : v.some(a => cmp1(a, e.o, e.v)); }
    }
    return false;
  }
  function filter(packets, expr) {
    const list = Array.isArray(packets) ? packets : [];
    const known = new Set(Object.keys(FIELDS).concat(Object.keys(ALIAS), PROTOS)), exact = new Set();
    list.forEach(p => Object.keys(p.f || {}).forEach(k => { known.add(k); exact.add(k); const parts = k.split("."); for (let j = 1; j < parts.length; j++) known.add(parts.slice(0, j).join(".")); }));
    const e = parse(String(expr || "").trim(), known, exact);
    return e ? list.filter(p => ev(e, p)) : list.slice();
  }
  const api = { filter, FIELDS, PROTOCOLS: PROTOS };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.CertHub.pcap = api;
})(typeof window !== "undefined" ? window : globalThis);
