/* A small Kusto (KQL) interpreter for practice: runs queries over in-memory sample tables.
   Supports: Table | where | project | project-away | extend | summarize (count, dcount, sum, avg,
   min, max, make_set) by ... | sort/order by | take/limit | top N by | count | distinct.
   Expressions: == != =~ < > <= >= has contains startswith endswith in (...) !in (...) and or not,
   numbers, "strings", bin(x, n), tolower(), toupper(), strlen(), ago(Nd|h|m) and now().
   Works in the browser (CertHub.kql) and in Node (module.exports) for content checks. */
(function (root) {
  const NOW = Date.parse("2026-09-25T12:00:00Z"); // fixed "now" so sample data and answers never drift
  function lex(src) {
    const t = []; let i = 0;
    const re = /\s+|\/\/[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\d+(?:\.\d+)?[dhms]?|[A-Za-z_][\w-]*(?:\(\))?|==|!=|=~|<=|>=|!in\b|[|(),<>=!*]/y;
    while (i < src.length) {
      re.lastIndex = i; const m = re.exec(src);
      if (!m) throw new Error(`Unexpected "${src.slice(i, i + 10)}"`);
      i = re.lastIndex;
      if (/^\s|^\/\//.test(m[0])) continue;
      t.push(m[0]);
    }
    return t;
  }
  function parseExpr(tk) {
    let p = 0;
    const peek = () => tk[p], next = () => tk[p++], eat = x => { if (tk[p] !== x) throw new Error(`Expected ${x} near "${tk[p] || "end"}"`); p++; };
    const kw = w => (tk[p] || "").toLowerCase() === w;
    function or() { let l = and(); while (kw("or")) { p++; const r = and(); const a = l; l = row => !!a(row) || !!r(row); } return l; }
    function and() { let l = not(); while (kw("and")) { p++; const r = not(); const a = l; l = row => !!a(row) && !!r(row); } return l; }
    function not() { if (kw("not")) { p++; eat("("); const e = or(); eat(")"); return row => !e(row); } return cmp(); }
    function cmp() {
      const l = atom(); const op = (peek() || "").toLowerCase();
      const ops = { "==": (a, b) => a === b, "!=": (a, b) => a !== b, "=~": (a, b) => String(a).toLowerCase() === String(b).toLowerCase(), "<": (a, b) => a < b, ">": (a, b) => a > b, "<=": (a, b) => a <= b, ">=": (a, b) => a >= b,
        has: (a, b) => new RegExp(`(^|[^A-Za-z0-9])${String(b).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|[^A-Za-z0-9])`, "i").test(String(a)),
        contains: (a, b) => String(a).toLowerCase().includes(String(b).toLowerCase()), startswith: (a, b) => String(a).toLowerCase().startsWith(String(b).toLowerCase()), endswith: (a, b) => String(a).toLowerCase().endsWith(String(b).toLowerCase()) };
      if (op === "in" || op === "!in") { p++; eat("("); const vals = []; while (peek() !== ")") { vals.push(atom()); if (peek() === ",") p++; } eat(")"); return row => { const v = l(row), has = vals.some(f => f(row) === v); return op === "in" ? has : !has; }; }
      if (ops[op]) { p++; const r = atom(); return row => ops[op](l(row), r(row)); }
      return l;
    }
    function atom() {
      const x = next(); if (x === undefined) throw new Error("Expression ended early");
      if (x === "(") { const e = or(); eat(")"); return e; }
      if (/^["']/.test(x)) { const v = x.slice(1, -1).replace(/\\(.)/g, "$1"); return () => v; }
      if (/^\d+(\.\d+)?$/.test(x)) { const v = +x; return () => v; }
      if (/^\d+[dhms]$/.test(x)) { const n = parseInt(x, 10), u = { d: 864e5, h: 36e5, m: 6e4, s: 1e3 }[x.slice(-1)]; return () => n * u; }
      if (x === "now()") return () => NOW;
      const fn = x.toLowerCase();
      if (["ago", "tolower", "toupper", "strlen", "bin", "todatetime", "tostring", "toint"].includes(fn) && peek() === "(") {
        eat("("); const a = []; while (peek() !== ")") { a.push(or()); if (peek() === ",") p++; } eat(")");
        if (fn === "ago") return row => NOW - a[0](row);
        if (fn === "tolower") return row => String(a[0](row)).toLowerCase();
        if (fn === "toupper") return row => String(a[0](row)).toUpperCase();
        if (fn === "strlen") return row => String(a[0](row)).length;
        if (fn === "tostring") return row => String(a[0](row));
        if (fn === "toint") return row => parseInt(a[0](row), 10);
        if (fn === "todatetime") return row => Date.parse(a[0](row));
        return row => { const v = a[0](row), n = a[1](row); return Math.floor(v / n) * n; };
      }
      if (/^[A-Za-z_]/.test(x)) return row => { const v = row[x]; if (v === undefined) throw new Error(`Unknown column "${x}"`); return /Time|Generated$/.test(x) && typeof v === "string" ? Date.parse(v) : v; };
      throw new Error(`Unexpected "${x}"`);
    }
    const f = or(); if (p < tk.length) throw new Error(`Unexpected "${tk[p]}"`); return f;
  }
  const splitTop = (tk, sep) => { const out = [[]]; let d = 0; tk.forEach(x => { if (x === "(") d++; if (x === ")") d--; if (x === sep && !d) out.push([]); else out[out.length - 1].push(x); }); return out; };
  function run(query, tables) {
    const stages = splitTop(lex(query), "|");
    const src = stages.shift();
    if (src.length !== 1 || !tables[src[0]]) throw new Error(`Start with a table name: ${Object.keys(tables).join(", ")}`);
    let rows = tables[src[0]].map(r => ({ ...r })), ordered = false;
    for (const st of stages) {
      const op = (st[0] || "").toLowerCase(), rest = st.slice(1);
      if (op === "where") { const f = parseExpr(rest); rows = rows.filter(r => f(r)); }
      else if (op === "project" || op === "extend") {
        const cols = splitTop(rest, ",").map(c => { const eq = c.indexOf("="); return eq === 1 ? [c[0], parseExpr(c.slice(2))] : [c.join(""), parseExpr(c)]; });
        rows = rows.map(r => { const o = op === "extend" ? { ...r } : {}; cols.forEach(([n, f]) => { o[n] = f(r); }); return o; });
      } else if (op === "project-away") { const cols = splitTop(rest, ",").map(c => c.join("")); rows = rows.map(r => { const o = { ...r }; cols.forEach(c => delete o[c]); return o; }); }
      else if (op === "take" || op === "limit") rows = rows.slice(0, +rest[0]);
      else if (op === "count") { rows = [{ Count: rows.length }]; }
      else if (op === "distinct") { const cols = splitTop(rest, ",").map(c => c.join("")), seen = new Set(); rows = rows.map(r => Object.fromEntries(cols.map(c => [c, r[c]]))).filter(r => { const k = JSON.stringify(r); return !seen.has(k) && seen.add(k); }); }
      else if (op === "sort" || op === "order" || op === "top") {
        let n = null, i = 0; if (op === "top") { n = +rest[0]; i = 1; }
        if ((rest[i] || "").toLowerCase() !== "by") throw new Error(`${op} needs "by"`);
        const keys = splitTop(rest.slice(i + 1), ",").map(k => { const dir = (k[k.length - 1] || "").toLowerCase(); const asc = dir === "asc"; const e = parseExpr(dir === "asc" || dir === "desc" ? k.slice(0, -1) : k); return [e, asc]; });
        rows = rows.slice().sort((a, b) => { for (const [e, asc] of keys) { const x = e(a), y = e(b); if (x < y) return asc ? -1 : 1; if (x > y) return asc ? 1 : -1; } return 0; });
        if (n != null) rows = rows.slice(0, n); ordered = true;
      } else if (op === "summarize") {
        const byAt = rest.findIndex(x => x.toLowerCase() === "by");
        const aggs = splitTop(byAt < 0 ? rest : rest.slice(0, byAt), ",").filter(a => a.length).map(a => {
          let name = null; if (a[1] === "=") { name = a[0]; a = a.slice(2); }
          const fn = a[0].replace(/\(\)$/, "").toLowerCase(), inner = a[0].endsWith("()") ? [] : a.slice(2, -1);
          const f = inner.length ? parseExpr(inner) : null;
          const col = inner.join("");
          const nm = name || (fn === "count" ? "count_" : fn === "make_set" ? `set_${col}` : `${fn}_${col}`);
          const agg = { count: g => g.length, dcount: g => new Set(g.map(f)).size, sum: g => g.reduce((s, r) => s + +f(r), 0), avg: g => g.reduce((s, r) => s + +f(r), 0) / g.length, min: g => Math.min(...g.map(f)), max: g => Math.max(...g.map(f)), make_set: g => [...new Set(g.map(f))] }[fn];
          if (!agg) throw new Error(`Unsupported aggregation "${fn}"`);
          return [nm, agg];
        });
        const bys = byAt < 0 ? [] : splitTop(rest.slice(byAt + 1), ",").map(c => { const eq = c.indexOf("="); return eq === 1 ? [c[0], parseExpr(c.slice(2))] : [c[0] === "bin" ? `${c[2]}` : c.join(""), parseExpr(c)]; });
        const groups = new Map();
        rows.forEach(r => { const key = bys.map(([, f]) => f(r)); const k = JSON.stringify(key); if (!groups.has(k)) groups.set(k, { key, rows: [] }); groups.get(k).rows.push(r); });
        if (!bys.length && !groups.size) groups.set("[]", { key: [], rows: [] });
        ordered = false;
        rows = [...groups.values()].map(g => { const o = {}; bys.forEach(([n], i) => { o[n] = g.key[i]; }); aggs.forEach(([n, f]) => { o[n] = f(g.rows); }); return o; });
      } else throw new Error(`Unsupported operator "${op}"`);
    }
    // Times are compared as numbers internally; show them as ISO dates.
    const isTime = k => /Time|Generated$/.test(k);
    rows = rows.map(r => { const o = {}; for (const k in r) o[k] = isTime(k) && typeof r[k] === "number" && r[k] > 1e11 ? new Date(r[k]).toISOString().replace(".000Z", "Z") : r[k]; return o; });
    return { rows, ordered };
  }
  // Two results match when they have the same columns and rows (row order matters only if sorted).
  function same(a, b) {
    const norm = r => JSON.stringify(Object.keys(r).sort().map(k => [k, Array.isArray(r[k]) ? r[k].slice().sort() : r[k]]));
    if (a.rows.length !== b.rows.length) return false;
    const x = a.rows.map(norm), y = b.rows.map(norm);
    if (!b.ordered) { x.sort(); y.sort(); }
    return x.every((v, i) => v === y[i]);
  }
  const api = { run, same, NOW };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.CertHub.kql = api;
})(typeof window !== "undefined" ? window : globalThis);
