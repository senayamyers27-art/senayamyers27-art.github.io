/* A simulated Linux shell for command-line practice: an in-memory file system with users,
   groups, permissions and services. It is a teaching sandbox, not a real system.
   Commands: pwd cd ls cat echo mkdir touch rm rmdir cp mv head tail wc grep find sort uniq cut
   chmod chown chgrp ln whoami id hostname uname date clear history useradd groupadd usermod
   passwd systemctl ps ip df free sudo, with | pipes and > >> redirection.
   Works in the browser (CertHub.shell) and in Node (module.exports) for content checks. */
(function (root) {
  const norm = (cwd, p) => {
    const parts = (p.startsWith("/") ? p : cwd + "/" + p).split("/"), out = [];
    parts.forEach(x => { if (!x || x === ".") return; if (x === "..") out.pop(); else out.push(x); });
    return "/" + out.join("/");
  };
  const dirname = p => p.replace(/\/[^/]*$/, "") || "/", basename = p => p.split("/").pop();
  const glob = pat => new RegExp("^" + pat.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*").replace(/\?/g, ".") + "$");
  function modeStr(n, dir, link) { const b = (n >>> 0).toString(8).padStart(3, "0").slice(-3); return (link ? "l" : dir ? "d" : "-") + b.split("").map(d => { d = +d; return (d & 4 ? "r" : "-") + (d & 2 ? "w" : "-") + (d & 1 ? "x" : "-"); }).join(""); }

  function create(setup = {}) {
    const S = { cwd: setup.cwd || "/home/student", user: setup.user || "student", host: setup.hostname || "lab01", fs: {}, users: { root: { uid: 0, groups: ["root"], home: "/root", shell: "/bin/bash" } }, groups: { root: 0, wheel: 10 }, services: {}, history: [], ran: [] };
    const addUser = (n, uid) => { S.users[n] = { uid, groups: [n], home: "/home/" + n, shell: "/bin/bash" }; S.groups[n] = uid; };
    addUser(S.user, 1000);
    Object.entries(setup.users || {}).forEach(([n, u], i) => { addUser(n, 1001 + i); if (u && u.groups) S.users[n].groups.push(...u.groups); });
    (setup.groups || []).forEach((g, i) => { if (!(g in S.groups)) S.groups[g] = 2000 + i; });
    const mk = (p, dir, content = "", owner = S.user) => { S.fs[p] = { dir, content, mode: dir ? 0o755 : 0o644, owner, group: owner }; };
    ["/", "/home", "/etc", "/var", "/var/log", "/tmp", "/root", "/srv", "/opt", S.users[S.user].home].forEach(d => mk(d, true, "", d.startsWith("/home/") ? S.user : "root"));
    S.fs["/tmp"].mode = 0o1777;
    (setup.dirs || []).forEach(d => { const p = norm("/", d); let cur = ""; p.split("/").filter(Boolean).forEach(x => { cur += "/" + x; if (!S.fs[cur]) mk(cur, true); }); });
    Object.entries(setup.files || {}).forEach(([p0, c]) => { const p = norm("/", p0); let cur = ""; dirname(p).split("/").filter(Boolean).forEach(x => { cur += "/" + x; if (!S.fs[cur]) mk(cur, true); }); mk(p, false, c); });
    Object.entries(setup.modes || {}).forEach(([p, m]) => { if (S.fs[p]) S.fs[p].mode = parseInt(m, 8); });
    Object.entries(setup.owners || {}).forEach(([p, o]) => { if (S.fs[p]) { const [u, g] = o.split(":"); S.fs[p].owner = u; S.fs[p].group = g || u; } });
    Object.entries(setup.services || {}).forEach(([n, st]) => { S.services[n] = { active: st === "active" || st === "enabled", enabled: st === "enabled" }; });
    S.fs["/etc/hostname"] = S.fs["/etc/hostname"] || { dir: false, content: S.host + "\n", mode: 0o644, owner: "root", group: "root" };
    return S;
  }
  const children = (S, d) => Object.keys(S.fs).filter(p => p !== d && dirname(p) === d).sort();

  function run(S, line) {
    line = String(line || "").trim(); if (!line) return "";
    S.history.push(line);
    // Split on | and > outside quotes.
    const segs = [""]; let q = null;
    for (const ch of line) { if (q) { if (ch === q) q = null; segs[segs.length - 1] += ch; } else if (ch === '"' || ch === "'") { q = ch; segs[segs.length - 1] += ch; } else if (ch === "|") segs.push(""); else segs[segs.length - 1] += ch; }
    const lastSeg = segs[segs.length - 1]; let redirect = null, m = null, qq = null;
    for (let i = 0; i < lastSeg.length; i++) { const ch = lastSeg[i]; if (qq) { if (ch === qq) qq = null; } else if (ch === '"' || ch === "'") qq = ch; else if (ch === ">") { m = lastSeg.slice(i).match(/^(>>?)\s*(\S+)\s*$/); if (m) m.index = i; break; } }
    if (m) { redirect = { append: m[1] === ">>", path: norm(S.cwd, m[2]) }; segs[segs.length - 1] = lastSeg.slice(0, m.index); }
    let input = null, out = "";
    for (const seg of segs.map(s => s.trim())) { out = exec(S, tokens(seg), input); input = out; }
    if (redirect) {
      const p = redirect.path; if (!S.fs[dirname(p)] || !S.fs[dirname(p)].dir) return `bash: ${p}: No such file or directory`;
      const f = S.fs[p]; if (f && f.dir) return `bash: ${p}: Is a directory`;
      const text = out && !out.endsWith("\n") ? out + "\n" : out;
      if (f) f.content = redirect.append ? f.content + text : text; else S.fs[p] = { dir: false, content: text, mode: 0o644, owner: S.user, group: S.user };
      return "";
    }
    return out;
  }
  function tokens(s) { const t = []; s.replace(/"([^"]*)"|'([^']*)'|(\S+)/g, (_, a, b, c) => { t.push(a ?? b ?? c); }); return t; }
  function flags(args) { const f = new Set(), rest = []; args.forEach(a => { if (/^-[A-Za-z]+$/.test(a)) a.slice(1).split("").forEach(c => f.add(c)); else rest.push(a); }); return [f, rest]; }

  function exec(S, t, input) {
    let [cmd, ...args] = t; if (!cmd) return "";
    if (cmd === "sudo") { [cmd, ...args] = args; }
    S.ran.push(cmd);
    const P = p => norm(S.cwd, p), F = p => S.fs[P(p)], err = m => `${cmd}: ${m}`;
    const text = a => a.length ? a.map(p => { const f = F(p); return !f ? null : f.dir ? null : f.content; }) : [input || ""];
    const lines = s => s.replace(/\n$/, "").split("\n").filter((x, i, arr) => x !== "" || i < arr.length - 1);
    switch (cmd) {
      case "pwd": return S.cwd;
      case "cd": { const p = P(args[0] || S.users[S.user].home); if (!S.fs[p] || !S.fs[p].dir) return err(`${args[0]}: No such file or directory`); S.cwd = p; return ""; }
      case "whoami": return S.user;
      case "hostname": return S.host;
      case "uname": return args.includes("-r") ? "5.14.0-lab" : "Linux";
      case "date": return new Date(Date.UTC(2026, 8, 25, 12)).toUTCString();
      case "clear": return "";
      case "history": return S.history.map((h, i) => `${String(i + 1).padStart(5)}  ${h}`).join("\n");
      case "id": { const n = args[0] || S.user, u = S.users[n]; if (!u) return err(`'${n}': no such user`); return `uid=${u.uid}(${n}) gid=${S.groups[u.groups[0]]}(${u.groups[0]}) groups=${u.groups.map(g => `${S.groups[g]}(${g})`).join(",")}`; }
      case "echo": return args.join(" ");
      case "ls": {
        const [f, rest] = flags(args), targets = rest.length ? rest : ["."];
        return targets.map(a => {
          const p = P(a), node = S.fs[p]; if (!node) return err(`cannot access '${a}': No such file or directory`);
          const items = node.dir && !f.has("d") ? children(S, p).map(c => [basename(c), S.fs[c]]).filter(([n]) => f.has("a") || !n.startsWith(".")) : [[a, node]];
          if (!f.has("l")) return items.map(([n]) => n).join("  ");
          return items.map(([n, x]) => `${modeStr(x.mode, x.dir, x.link)} 1 ${x.owner} ${x.group} ${String(x.dir ? 4096 : x.content.length).padStart(5)} Sep 25 12:00 ${n}${x.link ? " -> " + x.link : ""}`).join("\n");
        }).join("\n");
      }
      case "cat": { const r = text(args); if (r.some(x => x === null)) return err(`${args[r.indexOf(null)]}: No such file or directory`); return r.join("").replace(/\n$/, ""); }
      case "mkdir": { const [f, rest] = flags(args); for (const a of rest) { const p = P(a); if (S.fs[p]) { if (f.has("p") && S.fs[p].dir) continue; return err(`cannot create directory '${a}': File exists`); } if (!S.fs[dirname(p)]) { if (!f.has("p")) return err(`cannot create directory '${a}': No such file or directory`); let cur = ""; p.split("/").filter(Boolean).forEach(x => { cur += "/" + x; if (!S.fs[cur]) S.fs[cur] = { dir: true, content: "", mode: 0o755, owner: S.user, group: S.user }; }); } else S.fs[p] = { dir: true, content: "", mode: 0o755, owner: S.user, group: S.user }; } return ""; }
      case "touch": for (const a of args) { const p = P(a); if (!S.fs[dirname(p)]) return err(`cannot touch '${a}': No such file or directory`); if (!S.fs[p]) S.fs[p] = { dir: false, content: "", mode: 0o644, owner: S.user, group: S.user }; } return "";
      case "rm": case "rmdir": { const [f, rest] = flags(args); for (const a of rest) { const p = P(a), n = S.fs[p]; if (!n) { if (f.has("f")) continue; return err(`cannot remove '${a}': No such file or directory`); } if (n.dir && cmd === "rm" && !f.has("r")) return err(`cannot remove '${a}': Is a directory`); if (n.dir && cmd === "rmdir" && children(S, p).length) return err(`failed to remove '${a}': Directory not empty`); Object.keys(S.fs).filter(k => k === p || k.startsWith(p + "/")).forEach(k => delete S.fs[k]); } return ""; }
      case "cp": case "mv": {
        const [f, rest] = flags(args); if (rest.length < 2) return err("missing destination file operand");
        const dst = P(rest.pop());
        for (const a of rest) {
          const src = P(a), n = S.fs[src]; if (!n) return err(`cannot stat '${a}': No such file or directory`);
          if (n.dir && cmd === "cp" && !f.has("r")) return err(`-r not specified; omitting directory '${a}'`);
          const to = S.fs[dst] && S.fs[dst].dir ? dst + "/" + basename(src) : dst;
          if (!S.fs[dirname(to)]) return err(`cannot create '${to}': No such file or directory`);
          Object.keys(S.fs).filter(k => k === src || k.startsWith(src + "/")).forEach(k => { S.fs[to + k.slice(src.length)] = { ...S.fs[k] }; if (cmd === "mv") delete S.fs[k]; });
        }
        return "";
      }
      case "ln": { const [f, rest] = flags(args); if (!f.has("s")) return err("only symbolic links (-s) are supported here"); if (rest.length < 2) return err("missing destination file operand"); let to = P(rest[1]); if (S.fs[to] && S.fs[to].dir) to = (to === "/" ? "" : to) + "/" + basename(rest[0]); if (!S.fs[dirname(to)]) return err(`failed to create symbolic link '${rest[1]}': No such file or directory`); S.fs[to] = { dir: false, content: "", mode: 0o777, owner: S.user, group: S.user, link: rest[0] }; return ""; }
      case "head": case "tail": { const i = args.indexOf("-n"); let n = 10, a = args; if (i >= 0) { n = +args[i + 1]; a = args.filter((_, k) => k !== i && k !== i + 1); } else if (/^-\d+$/.test(args[0] || "")) { n = +args[0].slice(1); a = args.slice(1); } const r = text(a); if (r.some(x => x === null)) return err("No such file or directory"); const ls = lines(r.join("")); return (cmd === "head" ? ls.slice(0, n) : ls.slice(-n)).join("\n"); }
      case "wc": { const [f, rest] = flags(args); const r = text(rest); if (r.some(x => x === null)) return err("No such file or directory"); const s = r.join(""), l = (s.match(/\n/g) || []).length, w = s.split(/\s+/).filter(Boolean).length; if (f.has("l")) return String(l); if (f.has("w")) return String(w); if (f.has("c")) return String(s.length); return `${l} ${w} ${s.length}`; }
      case "grep": {
        const [f, rest] = flags(args); const pat = rest.shift(); if (pat === undefined) return err("usage: grep PATTERN [FILE]");
        const re = new RegExp(pat, f.has("i") ? "i" : ""); let files = rest;
        if (f.has("r") || f.has("R")) files = rest.flatMap(d => Object.keys(S.fs).filter(k => (k === P(d) || k.startsWith(P(d) + "/")) && !S.fs[k].dir));
        const srcs = files.length ? files.map(p => [p, (S.fs[P(p)] || {}).content]) : [[null, input || ""]];
        const out = []; let count = 0;
        for (const [name, c] of srcs) { if (c == null) return err(`${name}: No such file or directory`); lines(c).forEach((ln, i) => { if (re.test(ln) !== f.has("v")) { count++; out.push(`${files.length > 1 || f.has("r") ? name + ":" : ""}${f.has("n") ? i + 1 + ":" : ""}${ln}`); } }); }
        return f.has("c") ? String(count) : f.has("l") ? [...new Set(out.map(o => o.split(":")[0]))].join("\n") : out.join("\n");
      }
      case "sort": { const [f, rest] = flags(args); const r = text(rest); let ls = lines(r.join("")); ls.sort(f.has("n") ? (a, b) => parseFloat(a) - parseFloat(b) : undefined); if (f.has("r")) ls.reverse(); if (f.has("u")) ls = [...new Set(ls)]; return ls.join("\n"); }
      case "uniq": { const [f, rest] = flags(args); const ls = lines(text(rest).join("")), out = []; ls.forEach(l => { const last = out[out.length - 1]; if (last && last[0] === l) last[1]++; else out.push([l, 1]); }); return out.map(([l, n]) => f.has("c") ? `${String(n).padStart(7)} ${l}` : l).join("\n"); }
      case "cut": {
        let d = "\t", sel = null; const files = [];
        for (let i = 0; i < args.length; i++) { const a = args[i]; if (a === "-d") d = args[++i] ?? "\t"; else if (a.startsWith("-d")) d = a.slice(2); else if (a === "-f") sel = args[++i]; else if (a.startsWith("-f")) sel = a.slice(2); else files.push(a); }
        if (!sel) return err("you must specify a list of fields");
        const want = sel.split(",").flatMap(r => { const [x, y] = r.split("-"); if (y === undefined) return [+x]; const out = []; for (let k = +x || 1; k <= (y === "" ? 50 : +y); k++) out.push(k); return out; });
        const r = text(files); if (r.some(x => x === null)) return err("No such file or directory");
        return lines(r.join("")).map(l => { if (!l.includes(d)) return l; const p = l.split(d); return want.filter(n => n <= p.length).map(n => p[n - 1]).join(d); }).join("\n");
      }
      case "find": {
        const start = args[0] && !args[0].startsWith("-") ? args[0] : "."; const base = P(start);
        const name = args[args.indexOf("-name") + 1], type = args[args.indexOf("-type") + 1];
        return Object.keys(S.fs).filter(k => (k === base || k.startsWith(base === "/" ? "/" : base + "/")) && (!args.includes("-name") || glob(name).test(basename(k))) && (!args.includes("-type") || (type === "d") === S.fs[k].dir)).sort().map(k => start === "." ? "." + k.slice(base.length) || "." : k).join("\n");
      }
      case "chmod": {
        const f = new Set(args.filter(a => a === "-R").map(() => "R")), rest = args.filter(a => a !== "-R"); const mode = rest.shift(); const targets = rest;
        if (mode === undefined || !targets.length) return err("missing operand");
        for (const a of targets) {
          const p = P(a), n = S.fs[p]; if (!n) return err(`cannot access '${a}': No such file or directory`);
          const apply = k => { const x = S.fs[k]; if (/^[0-7]{3,4}$/.test(mode)) { x.mode = parseInt(mode, 8); return; } mode.split(",").forEach(cl => { const m = cl.match(/^([ugoa]*)([-+=])([rwxX]*)$/); if (!m) throw new Error(`chmod: invalid mode: '${mode}'`); const who = m[1] || "a", bits = m[3].split("").reduce((s, c) => s | ({ r: 4, w: 2, x: 1, X: x.dir ? 1 : 0 }[c]), 0); let mask = 0; if (/[ua]/.test(who)) mask |= bits << 6; if (/[ga]/.test(who)) mask |= bits << 3; if (/[oa]/.test(who)) mask |= bits; if (m[2] === "+") x.mode |= mask; else if (m[2] === "-") x.mode &= ~mask; else { let clear = 0; if (/[ua]/.test(who)) clear |= 0o700; if (/[ga]/.test(who)) clear |= 0o070; if (/[oa]/.test(who)) clear |= 0o007; x.mode = (x.mode & ~clear) | mask; } }); };
          try { (f.has("R") ? Object.keys(S.fs).filter(k => k === p || k.startsWith(p + "/")) : [p]).forEach(apply); } catch (e) { return e.message; }
        }
        return "";
      }
      case "chown": case "chgrp": {
        const [f, rest] = flags(args); const spec = rest.shift();
        let [u, g] = cmd === "chgrp" ? [null, spec] : spec.split(":");
        if (u && !S.users[u]) return err(`invalid user: '${u}'`); if (g && !(g in S.groups)) return err(`invalid group: '${g}'`);
        for (const a of rest) { const p = P(a); if (!S.fs[p]) return err(`cannot access '${a}': No such file or directory`); (f.has("R") ? Object.keys(S.fs).filter(k => k === p || k.startsWith(p + "/")) : [p]).forEach(k => { if (u) S.fs[k].owner = u; if (g) S.fs[k].group = g; }); }
        return "";
      }
      case "groupadd": { const g = args[args.length - 1]; if (g in S.groups) return err(`group '${g}' already exists`); S.groups[g] = 3000 + Object.keys(S.groups).length; return ""; }
      case "useradd": {
        const n = args[args.length - 1]; if (S.users[n]) return err(`user '${n}' already exists`);
        const uid = 1000 + Object.keys(S.users).length; S.users[n] = { uid, groups: [n], home: "/home/" + n, shell: "/bin/bash" }; S.groups[n] = uid;
        const gi = args.indexOf("-G"); if (gi >= 0) args[gi + 1].split(",").forEach(g => { if (!(g in S.groups)) return; S.users[n].groups.push(g); });
        const si = args.indexOf("-s"); if (si >= 0) S.users[n].shell = args[si + 1];
        if (args.includes("-m")) S.fs["/home/" + n] = { dir: true, content: "", mode: 0o700, owner: n, group: n };
        return "";
      }
      case "usermod": { const n = args[args.length - 1], u = S.users[n]; if (!u) return err(`user '${n}' does not exist`); const gi = args.findIndex(a => a === "-G" || a === "-aG"); if (gi >= 0) { const gs = args[gi + 1].split(","); if (gs.some(g => !(g in S.groups))) return err("group does not exist"); u.groups = args[gi] === "-aG" || args.includes("-a") ? [...new Set([...u.groups, ...gs])] : [u.groups[0], ...gs]; } const si = args.indexOf("-s"); if (si >= 0) u.shell = args[si + 1]; return ""; }
      case "passwd": return "passwd: all authentication tokens updated successfully.";
      case "systemctl": {
        const act = args[0], svc0 = args.slice(1).find(a => !a.startsWith("-")), svc = (svc0 || "").replace(/\.service$/, ""); const s = S.services[svc];
        if (["start", "stop", "restart", "enable", "disable", "status", "is-active", "is-enabled"].includes(act) && !s) return `Unit ${svc}.service could not be found.`;
        if (act === "start" || act === "restart") s.active = true; else if (act === "stop") s.active = false; else if (act === "enable") { s.enabled = true; if (args.includes("--now")) s.active = true; } else if (act === "disable") { s.enabled = false; if (args.includes("--now")) s.active = false; }
        else if (act === "status") return `● ${svc}.service\n     Loaded: loaded (/usr/lib/systemd/system/${svc}.service; ${s.enabled ? "enabled" : "disabled"})\n     Active: ${s.active ? "active (running)" : "inactive (dead)"}`;
        else if (act === "is-active") return s.active ? "active" : "inactive"; else if (act === "is-enabled") return s.enabled ? "enabled" : "disabled";
        else if (act === "list-units") return Object.entries(S.services).map(([n, x]) => `${n}.service loaded ${x.active ? "active running" : "inactive dead"}`).join("\n");
        return "";
      }
      case "ps": return "    PID TTY          TIME CMD\n   1234 pts/0    00:00:00 bash\n   1301 pts/0    00:00:00 ps";
      case "ip": return "1: lo: <LOOPBACK,UP>\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP>\n    inet 192.168.56.10/24 brd 192.168.56.255 scope global eth0";
      case "df": return "Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda2        20G  6.1G   14G  31% /\n/dev/sda1       1014M  210M  805M  21% /boot";
      case "free": return "               total        used        free\nMem:           3.8Gi       1.2Gi       2.1Gi";
      case "man": case "help": return "Supported here: " + CMDS.join(" ");
      default: return `${cmd}: command not found (this practice shell supports: ${CMDS.join(" ")})`;
    }
  }
  const CMDS = "pwd cd ls cat echo mkdir touch rm rmdir cp mv ln head tail wc grep find sort uniq cut chmod chown chgrp whoami id hostname uname date history useradd groupadd usermod passwd systemctl ps ip df free sudo".split(" ");
  // Checks: exists, missing, dir, content (includes / equals), mode, owner, group, cwd, ingroup, service, shell, ran
  function check(S, c) {
    const n = c.path && S.fs[norm("/", c.path)];
    switch (c.type) {
      case "exists": return !!n; case "missing": return !n; case "dir": return !!n && n.dir;
      case "content": return !!n && !n.dir && (c.equals != null ? n.content.replace(/\n$/, "") === c.equals : n.content.includes(c.includes));
      case "mode": return !!n && (n.mode & 0o7777).toString(8).padStart(3, "0") === String(c.mode).replace(/^0(?=\d{3}$)/, "");
      case "owner": return !!n && n.owner === c.owner; case "group": return !!n && n.group === c.group;
      case "cwd": return S.cwd === norm("/", c.path);
      case "ingroup": return !!S.users[c.user] && S.users[c.user].groups.includes(c.group);
      case "user": return !!S.users[c.user]; case "shell": return !!S.users[c.user] && S.users[c.user].shell === c.shell;
      case "service": return !!S.services[c.service] && (c.active == null || S.services[c.service].active === c.active) && (c.enabled == null || S.services[c.service].enabled === c.enabled);
      case "ran": return S.ran.includes(c.cmd);
      default: return false;
    }
  }
  const api = { create, run, check, CMDS };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.CertHub.shell = api;
})(typeof window !== "undefined" ? window : globalThis);
