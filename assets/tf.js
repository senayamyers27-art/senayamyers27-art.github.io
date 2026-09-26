/* A small Terraform plan simulator for practice: parses a useful subset of HCL and prints what
   `terraform plan` would do against a simulated prior state. It is a teaching sandbox: no providers,
   no network, no files. Supports terraform {} (required_version, required_providers), provider,
   resource and data blocks, variable (type, default, sensitive, validation), locals, output
   (value, sensitive, precondition), module (local or registry source; contents come from
   prior.modules or are treated as opaque), moved blocks, count, for_each (maps and sets of strings),
   dynamic blocks, depends_on, lifecycle (create_before_destroy, prevent_destroy, ignore_changes,
   replace_triggered_by, precondition), "${}" interpolation, heredocs, lists, maps, for expressions,
   conditionals, splats and common functions. plan(hcl, prior) diffs against
   prior = { resources: { addr: attrs }, vars, outputs, modules, data } and returns
   { ok, text, changes, instances, counts, outputs, errors, moved }. check(result, c) scores tasks.
   Works in the browser (CertHub.tf) and in Node (module.exports) for content checks. */
(function (root) {
  const VERSION = "1.12.2";
  const U = Object.freeze({ unknown: true }), isU = v => v === U;
  const isObj = v => v !== null && typeof v === "object" && !Array.isArray(v) && v !== U;
  const hasU = v => v === U || (v !== null && typeof v === "object" && Object.values(v).some(hasU));
  const mark = (a, k, v = true) => Object.defineProperty(a, k, { value: v, enumerable: false });
  class TfErr extends Error { constructor(s, d, line) { super(s); this.summary = s; this.detail = d || ""; this.line = line; } }
  const fail = (s, d, line) => { throw new TfErr(s, d, line); };
  const q = JSON.stringify;
  const keyStr = k => typeof k === "number" ? `[${k}]` : `[${q(k)}]`;
  const lev = (a, b) => { const d = Array.from({ length: a.length + 1 }, (_, i) => [i]); for (let j = 1; j <= b.length; j++) d[0][j] = j; for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[a.length][b.length]; };
  const suggest = (n, list) => { const s = list.filter(x => lev(n, x) <= Math.max(1, Math.floor(n.length / 3))).sort((a, b) => lev(n, a) - lev(n, b))[0]; return s ? ` Did you mean "${s}"?` : ""; };

  /* ---------- lexer ---------- */
  function scanStr(s, i) { // index of the closing quote of a string starting at i, or -1
    let depth = 0;
    while (i < s.length) {
      const c = s[i];
      if (!depth) {
        if (c === "\\") { i += 2; continue; }
        if (c === '"') return i;
        if (c === "\n") return -1;
        if ((c === "$" || c === "%") && s[i + 1] === c && s[i + 2] === "{") { i += 3; continue; }
        if ((c === "$" || c === "%") && s[i + 1] === "{") { depth = 1; i += 2; continue; }
      } else if (c === '"') { const e = scanStr(s, i + 1); if (e < 0) return -1; i = e + 1; continue; }
      else if (c === "{") depth++; else if (c === "}") depth--;
      i++;
    }
    return -1;
  }
  const OPS = ["...", "=>", "==", "!=", "<=", ">=", "&&", "||"];
  function lex(src, line = 1) {
    const t = [], n = src.length; let i = 0;
    const push = (k, v, l = line) => t.push({ k, v, line: l });
    while (i < n) {
      const c = src[i];
      if (c === "\n") { if (t.length && t[t.length - 1].k !== "nl") push("nl", "\n"); line++; i++; continue; }
      if (c === " " || c === "\t" || c === "\r") { i++; continue; }
      if (c === "#" || (c === "/" && src[i + 1] === "/")) { while (i < n && src[i] !== "\n") i++; continue; }
      if (c === "/" && src[i + 1] === "*") { const e = src.indexOf("*/", i + 2); if (e < 0) fail("Unterminated comment", "There is no closing marker for this multi-line comment.", line); line += (src.slice(i, e).match(/\n/g) || []).length; i = e + 2; continue; }
      if (c === '"') { const e = scanStr(src, i + 1); if (e < 0) fail("Unterminated template string", "No closing quote was found for this string before the end of the line.", line); push("str", src.slice(i + 1, e)); i = e + 1; continue; }
      if (c === "<" && src[i + 1] === "<") {
        const m = /^<<(-?)([A-Za-z_][\w-]*)[ \t]*\r?\n/.exec(src.slice(i, i + 200));
        if (m) {
          const start = line, rows = src.slice(i + m[0].length).split("\n"); let k = 0;
          while (k < rows.length && rows[k].trim() !== m[2]) k++;
          if (k >= rows.length) fail("Unterminated template string", `The heredoc has no closing marker "${m[2]}" on a line of its own.`, start);
          let body = rows.slice(0, k).map(r => r.replace(/\r$/, ""));
          if (m[1]) { const ind = Math.min(...body.filter(r => r.trim()).map(r => r.match(/^[ \t]*/)[0].length), 1e9); body = body.map(r => r.slice(Math.min(ind, r.match(/^[ \t]*/)[0].length))); }
          push("heredoc", body.join("\n") + (k ? "\n" : ""), start);
          i += m[0].length + rows.slice(0, k + 1).join("\n").length; line += k + 1; continue;
        }
      }
      let m = /^\d+(\.\d+)?([eE][+-]?\d+)?/.exec(src.slice(i, i + 40));
      if (m) { push("num", m[0]); i += m[0].length; continue; }
      m = /^[A-Za-z_][\w-]*/.exec(src.slice(i, i + 200));
      if (m) { push("id", m[0]); i += m[0].length; continue; }
      const op = OPS.find(o => src.startsWith(o, i)) || ("{}[]()=,.:?!<>+-*/%".includes(c) ? c : null);
      if (!op) fail("Invalid character", `The "${c}" character is not used within the Terraform language.`, line);
      push("op", op); i += op.length;
    }
    return t;
  }

  /* ---------- parser ---------- */
  function unescape(raw, line) {
    return raw.replace(/\\(u[0-9a-fA-F]{4}|.)/g, (_, e) => e[0] === "u" ? String.fromCharCode(parseInt(e.slice(1), 16)) : e === "n" ? "\n" : e === "t" ? "\t" : e === "r" ? "\r" : e === '"' || e === "\\" ? e : fail("Invalid escape sequence", `The symbol "${e}" is not a valid escape sequence selector.`, line));
  }
  function parser(tk) {
    let p = 0, depth = 0;
    const skip = () => { if (depth > 0) while (tk[p] && tk[p].k === "nl") p++; };
    const peek = () => { skip(); return tk[p]; };
    const is = v => { const x = peek(); return !!x && x.k === "op" && x.v === v; };
    const isId = v => { const x = peek(); return !!x && x.k === "id" && x.v === v; };
    const next = () => { skip(); return tk[p++]; };
    const here = () => (tk[p] || tk[tk.length - 1] || { line: 1 }).line;
    const found = x => !x ? "the end of the file" : x.k === "nl" ? "a new line" : `"${x.v}"`;
    const eat = v => { if (!is(v)) fail("Invalid expression", `Expected "${v}" here, but found ${found(tk[p])}.`, here()); p++; };
    const ident = what => { const x = next(); if (!x || x.k !== "id") fail("Invalid expression", `Expected ${what} here, but found ${found(x)}.`, x ? x.line : here()); return x.v; };
    function body(openLine) {
      const items = [];
      for (;;) {
        while (tk[p] && tk[p].k === "nl") p++;
        const x = tk[p];
        if (!x) { if (openLine) fail("Unclosed configuration block", "There is no closing brace for this block before the end of the file. This may be caused by incorrect brace nesting elsewhere in this file.", openLine); return items; }
        if (x.k === "op" && x.v === "}" && openLine) { p++; return items; }
        if (x.k !== "id") fail("Argument or block definition required", "An argument or block definition is required here. To set an argument, use the equals sign \"=\" to introduce the argument value.", x.line);
        p++;
        const y = tk[p], endOk = z => !z || z.k === "nl" || (openLine && z.k === "op" && z.v === "}");
        if (y && y.k === "op" && y.v === "=") {
          p++; const e = expr();
          if (!endOk(tk[p])) fail("Missing newline after argument", "An argument definition must end with a newline.", tk[p].line);
          items.push({ a: x.v, e, line: x.line }); continue;
        }
        const labels = [];
        while (tk[p] && (tk[p].k === "str" || tk[p].k === "id")) { labels.push(tk[p].k === "str" ? unescape(tk[p].v, tk[p].line) : tk[p].v); p++; }
        if (!(tk[p] && tk[p].k === "op" && tk[p].v === "{")) fail(labels.length ? "Invalid block definition" : "Argument or block definition required", labels.length ? "Either a quoted string block label or an opening brace (\"{\") is expected here." : `An argument or block definition is required here. To set an argument, use the equals sign "=" to introduce the argument value.`, (tk[p] || x).line);
        p++;
        items.push({ b: x.v, labels, body: body(x.line), line: x.line });
        if (!endOk(tk[p])) fail("Missing newline after block definition", "A block definition must end with a newline.", tk[p].line);
      }
    }
    function expr() {
      const c = bin(0);
      if (is("?")) { p++; const a = expr(); eat(":"); const b = expr(); return { t: "cond", c, a, b, line: c.line }; }
      return c;
    }
    const BIN = [["||"], ["&&"], ["==", "!="], ["<", ">", "<=", ">="], ["+", "-"], ["*", "/", "%"]];
    function bin(l) {
      if (l === BIN.length) return unary();
      let a = bin(l + 1);
      for (;;) { const x = peek(); if (x && x.k === "op" && BIN[l].includes(x.v)) { p++; a = { t: "bin", op: x.v, a, b: bin(l + 1), line: x.line }; } else return a; }
    }
    function unary() {
      const x = peek();
      if (x && x.k === "op" && (x.v === "!" || x.v === "-")) { p++; return { t: "un", op: x.v, e: unary(), line: x.line }; }
      return postfix(primary());
    }
    function postfix(e) {
      const ops = [];
      for (;;) {
        const x = tk[p]; // postfix operators never follow a newline
        if (x && x.k === "op" && x.v === ".") {
          p++; const y = tk[p++];
          if (y && y.k === "id") ops.push({ attr: y.v });
          else if (y && y.k === "num" && /^\d+$/.test(y.v)) ops.push({ idx: { t: "lit", v: +y.v } });
          else if (y && y.k === "op" && y.v === "*") ops.push({ splat: true });
          else fail("Invalid attribute name", "An attribute name is required after a dot.", x.line);
        } else if (x && x.k === "op" && x.v === "[") {
          p++; depth++;
          if (is("*")) { p++; ops.push({ splat: true }); } else ops.push({ idx: expr() });
          eat("]"); depth--;
        } else break;
      }
      if (!ops.length) return e;
      if (e.t === "trav") { e.ops.push(...ops); return e; }
      return { t: "post", base: e, ops, line: e.line };
    }
    function forExpr(close, line) {
      p++; const k1 = ident("a symbol name"); let k2 = null;
      if (is(",")) { p++; k2 = ident("a symbol name"); }
      if (!isId("in")) fail("Invalid 'for' expression", "The 'in' keyword is required after the symbol names in a 'for' expression.", here());
      p++; const coll = expr(); eat(":");
      let key = null, val = expr(), group = false, cond = null;
      if (close === "}") { if (!is("=>")) fail("Invalid 'for' expression", "Key expression is required when building an object: use key => value.", here()); p++; key = val; val = expr(); if (is("...")) { p++; group = true; } }
      if (isId("if")) { p++; cond = expr(); }
      return { t: "for", k: k2 ? k1 : null, v: k2 || k1, coll, key, val, group, cond, obj: close === "}", line };
    }
    function primary() {
      const x = next();
      if (!x || x.k === "nl") fail("Invalid expression", `Expected the start of an expression, but found ${found(x)}.`, x ? x.line : here());
      if (x.k === "num") return { t: "lit", v: +x.v, line: x.line };
      if (x.k === "str") return tmpl(x.v, x.line, false);
      if (x.k === "heredoc") return tmpl(x.v, x.line, true);
      if (x.k === "id") {
        if (x.v === "true" || x.v === "false") return { t: "lit", v: x.v === "true", line: x.line };
        if (x.v === "null") return { t: "lit", v: null, line: x.line };
        if (tk[p] && tk[p].k === "op" && tk[p].v === "(") {
          p++; depth++; const args = [];
          while (!is(")")) { args.push(expr()); if (is("...")) { p++; args[args.length - 1] = { t: "expand", e: args[args.length - 1] }; } if (is(",")) p++; else break; }
          eat(")"); depth--;
          return { t: "call", name: x.v, args, line: x.line };
        }
        return { t: "trav", root: x.v, ops: [], line: x.line };
      }
      if (x.v === "(") { depth++; const e = expr(); eat(")"); depth--; return { t: "paren", e, line: x.line }; }
      if (x.v === "[") {
        depth++; let e;
        if (isId("for")) e = forExpr("]", x.line);
        else { const items = []; while (!is("]")) { items.push(expr()); if (is(",")) p++; else break; } e = { t: "list", items, line: x.line }; }
        eat("]"); depth--; return e;
      }
      if (x.v === "{") {
        depth++; let e;
        if (isId("for")) e = forExpr("}", x.line);
        else {
          const items = [];
          while (!is("}")) {
            const a = peek(), b = tk[p + 1]; let k;
            if (a && a.k === "id" && b && b.k === "op" && (b.v === "=" || b.v === ":")) { p++; k = { t: "lit", v: a.v }; } else k = expr();
            if (is("=") || is(":")) p++; else fail("Missing key/value separator", "Expected an equals sign (\"=\") to mark the beginning of the attribute value.", here());
            items.push([k, expr()]); if (is(",")) p++;
          }
          e = { t: "map", items, line: x.line };
        }
        eat("}"); depth--; return e;
      }
      fail("Invalid expression", `Expected the start of an expression, but found "${x.v}".`, x.line);
    }
    function tmpl(raw, line, heredoc) {
      const parts = []; let s = "", i = 0;
      while (i < raw.length) {
        const c = raw[i];
        if (!heredoc && c === "\\") { const m = /^\\(u[0-9a-fA-F]{4}|.)/.exec(raw.slice(i)); s += unescape(m[0], line); i += m[0].length; continue; }
        if ((c === "$" || c === "%") && raw[i + 1] === c && raw[i + 2] === "{") { s += c + "{"; i += 3; continue; }
        if (c === "%" && raw[i + 1] === "{") fail("Template directives are not supported here", "This simulator supports ${ } interpolation but not %{ } template directives. Use a conditional expression or a for expression instead.", line);
        if (c === "$" && raw[i + 1] === "{") {
          let j = i + 2, d = 1;
          while (j < raw.length && d > 0) { if (raw[j] === '"') { const e = scanStr(raw, j + 1); j = e < 0 ? raw.length : e + 1; continue; } if (raw[j] === "{") d++; else if (raw[j] === "}") d--; j++; }
          if (d) fail("Unterminated template string", "The interpolation sequence \"${\" has no closing brace.", line);
          const P = parser(lex(raw.slice(i + 2, j - 1).replace(/^~|~$/g, ""), line)); P.nest();
          const e = P.expr(); if (!P.done()) fail("Extra characters after interpolation expression", "Expected a closing brace to end the interpolation expression, but found extra characters.", line);
          if (s) parts.push(s); s = ""; parts.push(e); i = j; continue;
        }
        s += c; i++;
      }
      if (s || !parts.length) parts.push(s);
      return parts.length === 1 && typeof parts[0] === "string" ? { t: "lit", v: parts[0], line } : { t: "tmpl", parts, line };
    }
    return { body: () => body(0), expr, nest: () => { depth = 1; }, done: () => { skip(); return p >= tk.length; } };
  }
  const parse = src => parser(lex(src)).body();

  /* ---------- provider knowledge (a small, fixed table) ---------- */
  const FORCE_NEW = { aws_instance: "ami availability_zone subnet_id key_name", aws_s3_bucket: "bucket bucket_prefix", aws_vpc: "cidr_block", aws_subnet: "availability_zone cidr_block vpc_id", aws_security_group: "name name_prefix description vpc_id", aws_db_instance: "identifier availability_zone db_name engine username", aws_iam_role: "name name_prefix path", aws_iam_policy: "name name_prefix path description", aws_key_pair: "key_name public_key", aws_ebs_volume: "availability_zone", aws_dynamodb_table: "name", aws_lambda_function: "function_name", aws_kms_alias: "name", google_compute_instance: "name zone", google_storage_bucket: "name location", terraform_data: "triggers_replace", null_resource: "triggers" };
  const forceNew = (type, k) => /^(random|local|tls)_/.test(type) || (/^azurerm_/.test(type) && ["name", "location", "resource_group_name"].includes(k)) || (FORCE_NEW[type] || "").split(" ").includes(k);
  const COMPUTED = { aws_instance: "arn id private_ip public_ip", aws_s3_bucket: "arn bucket_domain_name id", aws_vpc: "arn id", aws_subnet: "arn id", aws_security_group: "arn id", aws_iam_role: "arn id unique_id", aws_iam_user: "arn id unique_id", aws_db_instance: "address arn endpoint id", aws_dynamodb_table: "arn id", aws_kms_key: "arn id key_id", aws_lambda_function: "arn id", aws_eip: "id public_ip", azurerm_storage_account: "id primary_blob_endpoint", random_id: "b64_std hex id", random_string: "id result", random_password: "id result", tls_private_key: "id private_key_pem public_key_openssh" };
  const computed = type => (COMPUTED[type] || "id").split(" ");
  const SENS_NAMES = new Set(["password", "master_password", "secret", "secret_string", "private_key_pem", "token"]);
  const isSensAttr = (type, k) => SENS_NAMES.has(k) || (type === "random_password" && k === "result");
  const GUID = n => `00000000-0000-0000-0000-00000000000${n}`;
  const DATA = {
    aws_ami: () => ({ id: "ami-0a1b2c3d4e5f67890", image_id: "ami-0a1b2c3d4e5f67890", architecture: "x86_64", name: "al2023-ami-2023-x86_64" }),
    aws_availability_zones: () => ({ id: "us-east-1", names: ["us-east-1a", "us-east-1b", "us-east-1c"] }),
    aws_caller_identity: () => ({ id: "123456789012", account_id: "123456789012", arn: "arn:aws:iam::123456789012:user/learner", user_id: "AIDAEXAMPLEUSERID" }),
    aws_region: () => ({ id: "us-east-1", name: "us-east-1", region: "us-east-1", description: "US East (N. Virginia)" }),
    aws_vpc: () => ({ id: "vpc-0a1b2c3d4e5f60001", arn: "arn:aws:ec2:us-east-1:123456789012:vpc/vpc-0a1b2c3d4e5f60001", cidr_block: "10.0.0.0/16", default: false }),
    aws_subnet: () => ({ id: "subnet-0a1b2c3d4e5f60001", vpc_id: "vpc-0a1b2c3d4e5f60001", cidr_block: "10.0.1.0/24", availability_zone: "us-east-1a" }),
    aws_iam_policy_document: c => ({ id: "1234567890", json: jsonenc({ Statement: (c.statement || []).map(s => ({ Action: s.actions, Effect: s.effect || "Allow", Resource: s.resources })), Version: "2012-10-17" }) }),
    azurerm_client_config: () => ({ id: "client-config", client_id: GUID(1), tenant_id: GUID(2), subscription_id: GUID(3), object_id: GUID(4) }),
    azurerm_subscription: () => ({ id: `/subscriptions/${GUID(3)}`, subscription_id: GUID(3), display_name: "Practice subscription" }),
    azurerm_resource_group: c => ({ id: `/subscriptions/${GUID(3)}/resourceGroups/${c.name}`, location: "eastus" })
  };

  /* ---------- values and functions ---------- */
  const sortKeys = v => Array.isArray(v) ? v.map(sortKeys) : isObj(v) ? Object.keys(v).sort().reduce((o, k) => (o[k] = sortKeys(v[k]), o), {}) : v;
  const jsonenc = v => hasU(v) ? U : JSON.stringify(sortKeys(v));
  const eq = (a, b) => { if (hasU(a) || hasU(b)) return false; return q(sortKeys(a ?? null)) === q(sortKeys(b ?? null)); };
  const typeName = v => v === null ? "null" : Array.isArray(v) ? (v._set ? "set" : v._ty || "tuple") : typeof v === "object" ? "object" : typeof v;
  const toStr = (v, line) => { if (typeof v === "string") return v; if (typeof v === "number" || typeof v === "boolean") return String(v); fail("Invalid template interpolation value", v === null ? "The expression result is null. Cannot include a null value in a string template." : `Cannot include the given value in a string template: string required, but have ${typeName(v)}.`, line); };
  const toNum = (v, line, side) => { if (typeof v === "number") return v; if (typeof v === "string" && v.trim() && !isNaN(+v)) return +v; fail("Invalid operand", `Unsuitable value for ${side} operand: a number is required.`, line); };
  const toBool = (v, line, what) => { if (typeof v === "boolean") return v; if (v === "true" || v === "false") return v === "true"; fail(what || "Invalid operand", "A bool value (true or false) is required.", line); };
  const mkSet = arr => { const out = [], seen = new Set(); arr.forEach(x => { const k = q(x); if (!seen.has(k)) { seen.add(k); out.push(x); } }); out.sort((a, b) => typeof a === "number" && typeof b === "number" ? a - b : String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0); return mark(out, "_set"); };
  function cidrsubnet(prefix, bits, num) {
    const m = /^(\d+)\.(\d+)\.(\d+)\.(\d+)\/(\d+)$/.exec(prefix); if (!m) throw new Error(`invalid CIDR address "${prefix}"`);
    const plen = +m[5], len = plen + bits; if (len > 32) throw new Error(`insufficient address space to extend prefix of ${plen} by ${bits}`);
    if (num < 0 || num >= 2 ** bits) throw new Error(`prefix extension of ${bits} does not accommodate a subnet numbered ${num}`);
    const ip = ((+m[1] * 256 + +m[2]) * 256 + +m[3]) * 256 + +m[4], base = Math.floor(ip / 2 ** (32 - plen)) * 2 ** (32 - plen), n = base + num * 2 ** (32 - len);
    return [24, 16, 8, 0].map(s => Math.floor(n / 2 ** s) % 256).join(".") + "/" + len;
  }
  function fmt(f, args) {
    let i = 0;
    return f.replace(/%([-0]*)(\d+)?(\.\d+)?([sdvqf%])/g, (_, fl, wd, prec, v) => {
      if (v === "%") return "%"; if (i >= args.length) throw new Error("not enough arguments for the format string");
      const a = args[i++]; let s;
      if (v === "d") { if (typeof a !== "number") throw new Error(`unsupported value for "%d" at ${i}: number required`); s = String(Math.trunc(a)); }
      else if (v === "f") s = Number(a).toFixed(prec ? +prec.slice(1) : 6);
      else if (v === "q") s = q(String(a));
      else s = typeof a === "object" && a !== null ? JSON.stringify(a) : String(a);
      const w = +(wd || 0); return fl.includes("-") ? s.padEnd(w) : s.padStart(w, fl.includes("0") && v !== "s" ? "0" : " ");
    });
  }
  const need = (n, a) => { if (a.length < n) throw new Error(`expects at least ${n} argument${n === 1 ? "" : "s"}`); };
  const FN = {
    length: a => { need(1, a); const v = a[0]; if (typeof v === "string") return [...v].length; if (Array.isArray(v)) return v.length; if (isObj(v)) return Object.keys(v).length; throw new Error("argument must be a string, a collection type, or a structural type"); },
    upper: a => String(a[0]).toUpperCase(), lower: a => String(a[0]).toLowerCase(), title: a => String(a[0]).replace(/\b\w/g, c => c.toUpperCase()),
    trimspace: a => String(a[0]).trim(), replace: a => { need(3, a); const m = /^\/(.*)\/$/.exec(a[1]); return String(a[0]).split(m ? new RegExp(m[1], "g") : a[1]).join(a[2]); },
    split: a => String(a[1]).split(a[0]), join: a => { need(2, a); if (!Array.isArray(a[1])) throw new Error("the second argument must be a list"); return a[1].map(x => String(x)).join(a[0]); },
    substr: a => [...String(a[0])].slice(a[1], a[2] < 0 ? undefined : a[1] + a[2]).join(""),
    format: a => { need(1, a); return fmt(String(a[0]), a.slice(1)); },
    startswith: a => String(a[0]).startsWith(a[1]), endswith: a => String(a[0]).endsWith(a[1]), strcontains: a => String(a[0]).includes(a[1]),
    concat: a => [].concat(...a.map(x => { if (!Array.isArray(x)) throw new Error("all arguments must be lists or tuples"); return x; })),
    toset: a => { if (!Array.isArray(a[0])) throw new Error("a list or set is required"); return mkSet(a[0]); },
    tolist: a => { if (!Array.isArray(a[0])) throw new Error("a list or set is required"); return a[0].slice(); },
    tomap: a => { if (!isObj(a[0])) throw new Error("a map or object is required"); return { ...a[0] }; },
    tostring: a => toStr(a[0]), tonumber: a => { const n = +a[0]; if (a[0] === null || isNaN(n)) throw new Error("a number is required"); return n; },
    tobool: a => toBool(a[0]),
    lookup: a => { need(2, a); if (!isObj(a[0])) throw new Error("the first argument must be a map"); if (a[1] in a[0]) return a[0][a[1]]; if (a.length > 2) return a[2]; throw new Error(`the given key "${a[1]}" does not exist in the map`); },
    merge: a => Object.assign({}, ...a.filter(x => x !== null).map(x => { if (!isObj(x)) throw new Error("arguments must be maps or objects"); return x; })),
    keys: a => Object.keys(a[0] || {}).sort(), values: a => Object.keys(a[0] || {}).sort().map(k => a[0][k]),
    element: a => { if (!Array.isArray(a[0]) || !a[0].length) throw new Error("cannot use element function with an empty list"); return a[0][((a[1] % a[0].length) + a[0].length) % a[0].length]; },
    contains: a => (a[0] || []).some(x => eq(x, a[1])), index: a => { const i = (a[0] || []).findIndex(x => eq(x, a[1])); if (i < 0) throw new Error("item not found"); return i; },
    distinct: a => a[0].filter((x, i) => a[0].findIndex(y => eq(x, y)) === i), flatten: a => { const f = v => v.reduce((o, x) => o.concat(Array.isArray(x) ? f(x) : [x]), []); return f(a[0]); },
    reverse: a => a[0].slice().reverse(), sort: a => a[0].map(String).sort(), slice: a => a[0].slice(a[1], a[2]),
    range: a => { const [s, e, st] = a.length === 1 ? [0, a[0], 1] : [a[0], a[1], a[2] || 1]; const o = []; for (let i = s; st > 0 ? i < e : i > e; i += st) { o.push(i); if (o.length > 1024) throw new Error("more than 1024 values"); } return o; },
    zipmap: a => { if (a[0].length !== a[1].length) throw new Error("number of keys and values must match"); const o = {}; a[0].forEach((k, i) => { o[k] = a[1][i]; }); return o; },
    coalesce: a => { const v = a.find(x => x !== null && x !== ""); if (v === undefined) throw new Error("no non-null, non-empty-string arguments"); return v; },
    one: a => { if (a[0].length > 1) throw new Error("must be a list, set, or tuple value with either zero or one elements"); return a[0].length ? a[0][0] : null; },
    min: a => Math.min(...a), max: a => Math.max(...a), abs: a => Math.abs(a[0]), ceil: a => Math.ceil(a[0]), floor: a => Math.floor(a[0]), sum: a => a[0].reduce((s, x) => s + x, 0),
    cidrsubnet: a => { need(3, a); return cidrsubnet(String(a[0]), +a[1], +a[2]); },
    cidrhost: a => { const s = cidrsubnet(String(a[0]), 0, 0).split("/")[0].split(".").reduce((n, o) => n * 256 + +o, 0) + +a[1]; return [24, 16, 8, 0].map(x => Math.floor(s / 2 ** x) % 256).join("."); },
    jsonencode: a => jsonenc(a[0]), jsondecode: a => JSON.parse(a[0]),
    timestamp: () => U, uuid: () => U, sensitive: a => a[0], nonsensitive: a => a[0],
    file: () => { throw new Error("this simulator has no files on disk, so file() can't read anything. Put the content in the configuration instead"); }
  };
  FN.templatefile = FN.filebase64 = FN.file;

  /* ---------- plan ---------- */
  function plan(hcl, prior) {
    prior = prior || {};
    const src = String(hcl == null ? "" : hcl), srcLines = src.split("\n"), errors = [], errKeys = new Set(), G = { sens: false };
    const V = {}, L = {}, R = {}, O = {}, M = {}, provs = [], tfBlocks = [], movedDecl = [], providers = {};
    const P = {}, movedFrom = {}, moved = [], claimed = new Set(), insts = [], dataInsts = [], modChanges = [], outputs = {}, outRows = [];
    const addErr = (e, where, blockLine) => {
      if (!(e instanceof TfErr)) e = new TfErr("Simulator error", String((e && e.message) || e));
      const k = [e.summary, e.line, e.detail].join("|"); if (errKeys.has(k)) return; errKeys.add(k);
      errors.push({ summary: e.summary, detail: e.detail, line: e.line || null, where: whereOf(e.line) });
    };
    let items = [];
    // The enclosing top-level block of a line, for "on main.tf line N, in resource ..." (blank on the block's own line).
    const whereOf = line => { let b = null; items.forEach(it => { if (it.b && it.line <= line) b = it; }); return !b || b.line === line ? "" : b.b === "locals" || b.b === "terraform" ? b.b : `${b.b} ${b.labels.map(l => q(l)).join(" ")}`; };
    try { items = parse(src); } catch (e) { addErr(e); return finish(); }

    // Arguments of a block body, with duplicate checks. Returns { args: {name: item}, blocks: [item] }.
    function split(body, where, bl) {
      const args = {}, blocks = [];
      body.forEach(it => { if (it.a) { if (args[it.a]) addErr(new TfErr("Attribute redefined", `The argument "${it.a}" was already set at main.tf:${args[it.a].line}. Each argument may be set only once.`, it.line), where, bl); else args[it.a] = it; } else blocks.push(it); });
      return { args, blocks };
    }
    const labelsOk = (it, n, what) => { if (it.labels.length === n) return true; addErr(new TfErr(`${it.labels.length < n ? "Missing" : "Extraneous"} label for ${it.b}`, `All ${it.b} blocks must have ${n} label${n > 1 ? "s" : ""} (${what}).`, it.line)); return false; };
    const nameOk = (n, line) => { if (/^[A-Za-z_][\w-]*$/.test(n)) return true; addErr(new TfErr("Invalid name", "A name must start with a letter or underscore and may contain only letters, digits, underscores, and dashes.", line)); return false; };

    for (const it of items) {
      if (it.a) { addErr(new TfErr("Unsupported argument", `An argument named "${it.a}" is not expected here.`, it.line)); continue; }
      const lb = it.labels;
      if (it.b === "variable") { if (!labelsOk(it, 1, "name") || !nameOk(lb[0], it.line)) continue; if (V[lb[0]]) addErr(new TfErr("Duplicate variable declaration", `A variable named "${lb[0]}" was already declared at main.tf:${V[lb[0]].line}. Variable names must be unique within a module.`, it.line)); else V[lb[0]] = { name: lb[0], line: it.line, ...split(it.body, `variable "${lb[0]}"`, it.line) }; }
      else if (it.b === "locals") { if (!labelsOk(it, 0, "no labels")) continue; it.body.forEach(x => { if (!x.a) return addErr(new TfErr("Unsupported block type", `Blocks of type "${x.b}" are not expected here.`, x.line)); if (L[x.a]) addErr(new TfErr("Duplicate local value definition", `A local value named "${x.a}" was already defined at main.tf:${L[x.a].item.line}. Local value names must be unique within a module.`, x.line)); else L[x.a] = { item: x }; }); }
      else if (it.b === "output") { if (!labelsOk(it, 1, "name") || !nameOk(lb[0], it.line)) continue; if (O[lb[0]]) addErr(new TfErr("Duplicate output definition", `An output named "${lb[0]}" was already defined at main.tf:${O[lb[0]].line}. Output names must be unique within a module.`, it.line)); else O[lb[0]] = { name: lb[0], line: it.line, ...split(it.body, `output "${lb[0]}"`, it.line) }; }
      else if (it.b === "resource" || it.b === "data") {
        if (!labelsOk(it, 2, "type, name") || !nameOk(lb[0], it.line) || !nameOk(lb[1], it.line)) continue;
        const data = it.b === "data", addr = (data ? "data." : "") + lb[0] + "." + lb[1];
        if (R[addr]) { addErr(new TfErr(`Duplicate ${data ? "data" : "resource"} "${lb[0]}" configuration`, `A ${lb[0]} ${data ? "data resource" : "resource"} named "${lb[1]}" was already declared at main.tf:${R[addr].line}. Resource names must be unique per type in each module.`, it.line)); continue; }
        R[addr] = { kind: data ? "data" : "managed", type: lb[0], name: lb[1], addr, line: it.line, body: it.body, where: `${it.b} "${lb[0]}" "${lb[1]}"`, ...split(it.body, `${it.b} "${lb[0]}" "${lb[1]}"`, it.line) };
      }
      else if (it.b === "module") { if (!labelsOk(it, 1, "name") || !nameOk(lb[0], it.line)) continue; if (M[lb[0]]) addErr(new TfErr("Duplicate module call", `A module call named "${lb[0]}" was already defined at main.tf:${M[lb[0]].line}. Module calls must have unique names within a module.`, it.line)); else M[lb[0]] = { name: lb[0], line: it.line, addr: "module." + lb[0], where: `module "${lb[0]}"`, ...split(it.body, `module "${lb[0]}"`, it.line) }; }
      else if (it.b === "provider") { if (labelsOk(it, 1, "name")) provs.push(it); }
      else if (it.b === "terraform") tfBlocks.push(it);
      else if (it.b === "moved") movedDecl.push(it);
      else if (["import", "removed", "check", "ephemeral"].includes(it.b)) addErr(new TfErr("Not available in this simulator", `"${it.b}" blocks are real Terraform features, but this practice simulator doesn't model them. Remove the block to continue.`, it.line));
      else addErr(new TfErr("Unsupported block type", `Blocks of type "${it.b}" are not expected here.` + suggest(it.b, ["resource", "data", "variable", "output", "locals", "module", "provider", "terraform", "moved"]), it.line));
    }

    /* ----- expression evaluation ----- */
    function ev(e, sc) {
      switch (e.t) {
        case "lit": return e.v;
        case "paren": return ev(e.e, sc);
        case "tmpl": {
          if (e.parts.length === 1) return ev(e.parts[0], sc);
          let s = "", unk = false;
          for (const p of e.parts) { if (typeof p === "string") { s += p; continue; } const v = ev(p, sc); if (isU(v)) unk = true; else s += toStr(v, p.line || e.line); }
          return unk ? U : s;
        }
        case "list": { const out = []; e.items.forEach(x => out.push(ev(x, sc))); return out; }
        case "map": {
          const o = {}; let unk = false;
          e.items.forEach(([k, v]) => { const kk = ev(k, sc), vv = ev(v, sc); if (isU(kk)) unk = true; else o[toStr(kk, e.line)] = vv; });
          return unk ? U : o;
        }
        case "un": { const v = ev(e.e, sc); if (isU(v)) return U; return e.op === "!" ? !toBool(v, e.line) : -toNum(v, e.line, "right"); }
        case "bin": {
          const a = ev(e.a, sc), b = ev(e.b, sc);
          if (isU(a) || isU(b)) return U;
          switch (e.op) {
            case "==": return eq(a, b) && typeName(a) === typeName(b); case "!=": return !(eq(a, b) && typeName(a) === typeName(b));
            case "&&": return toBool(a, e.line) && toBool(b, e.line); case "||": return toBool(a, e.line) || toBool(b, e.line);
          }
          const x = toNum(a, e.line, "left"), y = toNum(b, e.line, "right");
          return { "+": x + y, "-": x - y, "*": x * y, "/": x / y, "%": x % y, "<": x < y, ">": x > y, "<=": x <= y, ">=": x >= y }[e.op];
        }
        case "cond": { const c = ev(e.c, sc); if (isU(c)) return U; return toBool(c, e.line, "Incorrect condition type") ? ev(e.a, sc) : ev(e.b, sc); }
        case "for": {
          const coll = ev(e.coll, sc); if (isU(coll)) return U;
          if (coll === null || typeof coll !== "object") fail("Iteration over non-iterable value", `A value of type ${typeName(coll)} cannot be used as the collection in a 'for' expression.`, e.line);
          const pairs = Array.isArray(coll) ? coll.map((v, i) => [coll._set ? v : i, v]) : Object.keys(coll).sort().map(k => [k, coll[k]]);
          const out = e.obj ? {} : [];
          for (const [k, v] of pairs) {
            const s2 = { ...sc, vars: { ...(sc.vars || {}), [e.v]: v, ...(e.k ? { [e.k]: k } : {}) } };
            if (e.cond) { const c = ev(e.cond, s2); if (isU(c)) return U; if (!toBool(c, e.line)) continue; }
            if (!e.obj) { out.push(ev(e.val, s2)); continue; }
            const kk = ev(e.key, s2); if (isU(kk)) return U; const ks = toStr(kk, e.line), vv = ev(e.val, s2);
            if (e.group) (out[ks] = out[ks] || []).push(vv);
            else { if (ks in out) fail("Duplicate object key", `Two different items produced the key "${ks}" in this 'for' expression. If duplicates are expected, use the ellipsis (...) after the value expression to enable grouping by key.`, e.line); out[ks] = vv; }
          }
          return out;
        }
        case "call": {
          if (e.name === "try" || e.name === "can") {
            for (const a of e.args) { try { const v = ev(a, sc); return e.name === "can" ? true : v; } catch (err) { if (!(err instanceof TfErr)) throw err; } }
            if (e.name === "can") return false;
            fail("Error in function call", "Call to function \"try\" failed: no expression succeeded.", e.line);
          }
          const f = FN[e.name];
          if (!f) fail("Call to unknown function", `There is no function named "${e.name}".` + suggest(e.name, Object.keys(FN)), e.line);
          const args = [];
          e.args.forEach(a => { if (a.t === "expand") { const v = ev(a.e, sc); if (isU(v)) args.push(U); else args.push(...v); } else args.push(ev(a, sc)); });
          if (e.name === "sensitive") G.sens = true;
          if (e.name !== "timestamp" && e.name !== "uuid" && args.some(hasU)) return U;
          try { return f(args); } catch (err) { if (err instanceof TfErr) throw err; fail("Error in function call", `Call to function "${e.name}" failed: ${err.message}.`, e.line); }
        }
        case "post": return applyOps(ev(e.base, sc), e.ops, 0, sc, e.line);
        case "trav": return materialize(resolve(e, sc));
        case "expand": fail("Invalid expanding argument value", "The ... symbol can only be used after the last argument of a function call.", e.line);
      }
      fail("Invalid expression", "This expression isn't supported by the simulator.", e.line);
    }
    function applyOps(v, ops, i, sc, line) {
      for (; i < ops.length; i++) {
        const op = ops[i];
        if (op.splat) { if (isU(v)) return U; const arr = Array.isArray(v) ? v : v === null ? [] : [v]; return arr.map(x => applyOps(x, ops, i + 1, sc, line)); }
        v = op.attr !== undefined ? getAttr(v, op.attr, line) : getIndex(v, ev(op.idx, sc), line);
      }
      return v;
    }
    function getAttr(v, n, line) {
      if (isU(v)) return U;
      if (v === null) fail("Attempt to get attribute from null value", "This value is null, so it does not have any attributes.", line);
      if (v.__inst) return instAttr(v.__inst, n, line);
      if (v.__mod) return modAttr(v.__mod, n, line);
      if (v._counted) fail("Missing resource instance key", `Because ${v._counted.addr} has "${v._counted.mode}" set, its attributes must be accessed on specific instances.\n\nFor example, to correlate with indices of a referring resource, use:\n    ${v._counted.addr}[${v._counted.mode === "count" ? "count.index" : "each.key"}]`, line);
      if (Array.isArray(v)) fail("Unsupported attribute", `Can't access attributes on a list of objects. Did you mean to access attribute "${n}" for a specific element of the list, or across all elements of the list?`, line);
      if (typeof v !== "object") fail("Unsupported attribute", `Can't access attributes on a primitive-typed value (${typeName(v)}).`, line);
      if (!(n in v)) fail("Unsupported attribute", `This object does not have an attribute named "${n}".` + suggest(n, Object.keys(v)), line);
      return v[n];
    }
    function getIndex(v, k, line) {
      if (isU(v) || isU(k)) return U;
      if (v === null) fail("Attempt to index null value", "This value is null, so it does not have any indices.", line);
      if (v.__inst || v.__mod) return getAttr(v, String(k), line);
      if (Array.isArray(v)) {
        if (v._set) fail("Invalid index", "Elements of a set are identified only by their value and don't have any separate index or key to select with, so it's only possible to perform operations across all elements of the set.", line);
        const i = typeof k === "number" ? k : /^\d+$/.test(k) ? +k : fail("Invalid index", "The given key does not identify an element in this collection value: a number is required.", line);
        if (i < 0) fail("Invalid index", "The given key does not identify an element in this collection value: a negative number is not a valid index for a sequence.", line);
        if (i >= v.length) fail("Invalid index", "The given key does not identify an element in this collection value: the given index is greater than or equal to the length of the collection.", line);
        return v[i];
      }
      if (typeof v !== "object") fail("Invalid index", "This value does not have any indices.", line);
      if (!(String(k) in v)) fail("Invalid index", "The given key does not identify an element in this collection value.", line);
      return v[String(k)];
    }
    // Resolve a reference like var.x, local.y, aws_s3_bucket.logs.arn, data.aws_ami.al.id, module.net.vpc_id.
    function resolve(e, sc) {
      const r = e.root, ops = e.ops, line = e.line, a0 = ops[0] && ops[0].attr, a1 = ops[1] && ops[1].attr;
      if (sc.vars && r in sc.vars) return applyOps(sc.vars[r], ops, 0, sc, line);
      if (sc.noRefs) fail("Variables not allowed", "Variables may not be used here.", line);
      const need1 = what => { if (!a0) fail("Invalid reference", `The "${r}" object cannot be accessed directly. Instead, access ${what}.`, line); };
      switch (r) {
        case "var": need1("one of its attributes"); return applyOps(varVal(a0, line), ops, 1, sc, line);
        case "local": need1("one of its attributes"); return applyOps(localVal(a0, line), ops, 1, sc, line);
        case "count":
          if (sc.count === undefined) fail('Reference to "count" in non-counted context', 'The "count" object can only be used in "module", "resource", and "data" blocks, and only when the "count" argument is set.', line);
          if (a0 !== "index") fail("Invalid count attribute", `The "count" object does not have an attribute named "${a0 || ""}". The only supported attribute is count.index, which is the index of each instance of a resource block that has the "count" argument set.`, line);
          return applyOps(sc.count, ops, 1, sc, line);
        case "each":
          if (!sc.each) fail('Reference to "each" in context without for_each', 'The "each" object can be used only in "module" or "resource" blocks, and only when the "for_each" argument is set.', line);
          if (a0 !== "key" && a0 !== "value") fail("Invalid \"each\" attribute", `The "each" object does not have an attribute named "${a0 || ""}". The supported attributes are each.key and each.value, the current key and value pair of the "for_each" attribute set.`, line);
          return applyOps(sc.each[a0], ops, 1, sc, line);
        case "path": need1("path.module, path.root or path.cwd"); return applyOps(".", ops, 1, sc, line);
        case "terraform": need1("terraform.workspace"); return applyOps("default", ops, 1, sc, line);
        case "self": fail('Invalid "self" reference', 'The "self" object is not available in this context. This object can be used only in resource provisioner, connection, and postcondition blocks.', line);
        case "data": {
          if (!a0 || !a1) fail("Invalid data resource reference", "A data resource reference must include the resource type and name, like data.aws_ami.example.", line);
          const res = R["data." + a0 + "." + a1];
          if (!res) fail("Reference to undeclared resource", `A data resource "${a0}" "${a1}" has not been declared in the root module.` + suggest(`data.${a0}.${a1}`, Object.keys(R).filter(k => k.startsWith("data."))), line);
          return applyOps(resRef(res), ops, 2, sc, line);
        }
        case "module": {
          need1("one of its attributes"); const m = M[a0];
          if (!m) fail("Reference to undeclared module", `No module call named "${a0}" is declared in the root module.` + suggest(a0, Object.keys(M)), line);
          return applyOps(modRef(m), ops, 1, sc, line);
        }
      }
      if (!a0) fail("Invalid reference", "A reference to a resource type must be followed by at least one attribute access, specifying the resource name.", line);
      const res = R[r + "." + a0];
      if (!res) fail("Reference to undeclared resource", `A managed resource "${r}" "${a0}" has not been declared in the root module.` + suggest(r + "." + a0, Object.keys(R).filter(k => !k.startsWith("data."))), line);
      return applyOps(resRef(res), ops, 1, sc, line);
    }
    function materialize(v) {
      if (v === null || typeof v !== "object" || isU(v)) return v;
      if (v.__inst) { const it = v.__inst; resolveInst(it); if (it.broken) return U; const o = it.kind === "data" ? { ...it.fake } : {}; if (it.kind !== "data") { computed(it.res.type).forEach(k => { o[k] = it.prior && it.action !== "replace" && k in it.prior ? it.prior[k] : U; }); if (it.prior && it.action !== "replace") Object.assign(o, it.prior); } if ([...it.sens].length) G.sens = true; return Object.assign(o, it.cfg); }
      if (v.__mod) { const it = v.__mod, o = {}; Object.keys((it.m.spec && it.m.spec.outputs) || {}).forEach(k => { o[k] = modAttr(it, k); }); return it.m.spec ? o : U; }
      if (Array.isArray(v)) { const a = v.map(materialize); if (v._set) mark(a, "_set"); if (v._ty) mark(a, "_ty", v._ty); return a; }
      const o = {}; for (const k in v) o[k] = materialize(v[k]); return o;
    }

    /* ----- variables ----- */
    const TYPES = ["string", "number", "bool", "any"];
    function typeOf(e) {
      if (e.t === "trav" && !e.ops.length && TYPES.includes(e.root)) return { k: e.root };
      if (e.t === "call" && ["list", "set", "map"].includes(e.name) && e.args.length === 1) return { k: e.name, el: typeOf(e.args[0]) };
      if (e.t === "call" && e.name === "object" && e.args[0] && e.args[0].t === "map") { const attrs = {}; e.args[0].items.forEach(([k, v]) => { const opt = v.t === "call" && v.name === "optional"; attrs[k.v] = opt ? { ...typeOf(v.args[0]), opt: true, def: v.args[1] } : typeOf(v); }); return { k: "object", attrs }; }
      if (e.t === "call" && e.name === "tuple" && e.args[0] && e.args[0].t === "list") return { k: "tuple", els: e.args[0].items.map(typeOf) };
      fail("Invalid type specification", `The keyword "${e.root || e.name || "?"}" is not a valid type specification.`, e.line);
    }
    function convert(v, T) {
      if (v === null || isU(v) || T.k === "any") return v;
      switch (T.k) {
        case "string": if (typeof v === "string") return v; if (typeof v === "number" || typeof v === "boolean") return String(v); throw new Error("string required");
        case "number": if (typeof v === "number") return v; if (typeof v === "string" && v.trim() && !isNaN(+v)) return +v; throw new Error("a number is required");
        case "bool": if (typeof v === "boolean") return v; if (v === "true" || v === "false") return v === "true"; throw new Error("bool required");
        case "list": case "set": { if (!Array.isArray(v)) throw new Error(`${T.k} of ${T.el.k} required`); const a = v.map(x => convert(x, T.el)); return T.k === "set" ? mkSet(a) : mark(a, "_ty", "list of " + T.el.k); }
        case "tuple": if (!Array.isArray(v) || v.length !== T.els.length) throw new Error(`tuple required`); return v.map((x, i) => convert(x, T.els[i]));
        case "map": { if (!isObj(v)) throw new Error(`map of ${T.el.k} required`); const o = {}; for (const k in v) o[k] = convert(v[k], T.el); return o; }
        case "object": {
          if (!isObj(v)) throw new Error("object required"); const o = {};
          for (const k in T.attrs) { const A = T.attrs[k]; if (k in v) o[k] = convert(v[k], A); else if (A.opt) o[k] = A.def ? ev(A.def, { noRefs: true }) : null; else throw new Error(`attribute "${k}" is required`); }
          return o;
        }
      }
      return v;
    }
    function setupVar(n) {
      const d = V[n]; if (d.ready) return d; d.ready = true; d.value = U;
      const where = `variable "${n}"`;
      try {
        Object.keys(d.args).forEach(k => { if (!["description", "sensitive", "nullable", "ephemeral", "default", "type"].includes(k)) addErr(new TfErr("Unsupported argument", `An argument named "${k}" is not expected here.`, d.args[k].line), where, d.line); });
        d.blocks.forEach(b => { if (b.b !== "validation") addErr(new TfErr("Unsupported block type", `Blocks of type "${b.b}" are not expected here.`, b.line), where, d.line); });
        const T = d.args.type ? typeOf(d.args.type.e) : { k: "any" };
        d.sens = !!(d.args.sensitive && ev(d.args.sensitive.e, { noRefs: true }));
        const given = prior.vars && Object.prototype.hasOwnProperty.call(prior.vars, n);
        if (given) { try { d.value = convert(prior.vars[n], T); } catch (e) { fail("Invalid value for input variable", `The given value is not suitable for var.${n} declared at main.tf:${d.line}: ${e.message}.`, d.line); } }
        else if (d.args.default) { const v = ev(d.args.default.e, { noRefs: true }); try { d.value = convert(v, T); } catch (e) { fail("Invalid default value for variable", `This default value is not compatible with the variable's type constraint: ${e.message}.`, d.args.default.line); } }
        else fail("No value for required variable", `The root module input variable "${n}" is not set, and has no default value. Use a -var or -var-file command line argument to provide a value for this variable.`, d.line);
        d.blocks.filter(b => b.b === "validation").forEach(b => {
          const s = split(b.body, where, d.line), c = s.args.condition; if (!c) return;
          const ok = ev(c.e, {}); if (isU(ok) || ok === true) return;
          const msg = s.args.error_message ? ev(s.args.error_message.e, {}) : "The value is not valid.";
          addErr(new TfErr("Invalid value for variable", `${msg}\n\nThis was checked by the validation rule at main.tf:${c.line}.`, d.line));
        });
      } catch (e) { addErr(e, where, d.line); }
      return d;
    }
    function varVal(n, line) {
      if (!V[n]) fail("Reference to undeclared input variable", `An input variable with the name "${n}" has not been declared.` + (suggest(n, Object.keys(V)) || ` This variable can be declared with a variable "${n}" {} block.`), line);
      const d = setupVar(n); if (d.sens) G.sens = true; return d.value;
    }
    function localVal(n, line) {
      const l = L[n];
      if (!l) fail("Reference to undeclared local value", `A local value with the name "${n}" has not been declared.` + suggest(n, Object.keys(L)), line);
      if (l.busy) fail(`Cycle: local.${n}`, "This local value refers to itself, directly or through other values, so Terraform can't work out an order to evaluate them.", l.item.line);
      if (!l.done) {
        l.busy = true; const s0 = G.sens; G.sens = false;
        try { l.v = ev(l.item.e, {}); } catch (e) { addErr(e, "locals", -1); l.v = U; }
        l.sens = G.sens; G.sens = s0; l.busy = false; l.done = true;
      }
      if (l.sens) G.sens = true; return l.v;
    }

    /* ----- resources, data sources and modules ----- */
    const META = new Set(["count", "for_each", "depends_on", "provider", "providers", "source", "version"]), SKIPB = new Set(["lifecycle", "provisioner", "connection"]);
    function evalBody(body, sc, skip, where, bl) {
      const obj = {}, sens = new Set(), blocks = new Set(), seen = {};
      for (const it of body) {
        if (it.a) {
          if (skip.has(it.a)) continue;
          if (seen[it.a]) { addErr(new TfErr("Attribute redefined", `The argument "${it.a}" was already set at main.tf:${seen[it.a]}. Each argument may be set only once.`, it.line), where, bl); continue; }
          seen[it.a] = it.line; G.sens = false; let v;
          try { v = ev(it.e, sc); } catch (e) { addErr(e, where, bl); v = U; }
          if (G.sens || SENS_NAMES.has(it.a)) sens.add(it.a); obj[it.a] = v; continue;
        }
        if (SKIPB.has(it.b)) continue;
        if (it.b === "dynamic") {
          const name = it.labels[0], s = split(it.body, where, bl), content = s.blocks.find(b => b.b === "content");
          if (!name || !s.args.for_each || !content) { addErr(new TfErr("Invalid dynamic block", 'A dynamic block needs a label naming the block type, a "for_each" argument and a nested "content" block.', it.line), where, bl); continue; }
          const iter = s.args.iterator ? s.args.iterator.e.root : name; let coll;
          try { coll = ev(s.args.for_each.e, sc); } catch (e) { addErr(e, where, bl); coll = U; }
          blocks.add(name); if (!obj[name]) obj[name] = [];
          if (isU(coll) || coll === null) { if (isU(coll)) obj[name] = U; continue; }
          const pairs = Array.isArray(coll) ? coll.map((v, i) => [coll._set ? v : i, v]) : Object.keys(coll).sort().map(k => [k, coll[k]]);
          pairs.forEach(([k, v]) => { const sub = evalBody(content.body, { ...sc, vars: { ...(sc.vars || {}), [iter]: { key: k, value: v } } }, new Set(), where, bl); obj[name].push(sub.obj); if (sub.sens.size) sens.add(name); });
          continue;
        }
        const sub = evalBody(it.body, sc, new Set(), where, bl);
        blocks.add(it.b); (obj[it.b] = obj[it.b] || []).push(sub.obj); if (sub.sens.size) sens.add(it.b);
      }
      [...blocks].forEach(b => { if (Array.isArray(obj[b])) mark(obj[b], "_blk"); });
      return { obj, sens, blocks };
    }
    // count / for_each expansion into instances with their own scope.
    function expandOf(x, where) {
      if (x.insts) return x.insts;
      if (x.expanding) fail(`Cycle: ${x.addr}`, "The count or for_each of this block depends on itself.", x.line);
      x.expanding = true; x.mode = "single"; let insts = [{ key: null, addr: x.addr, sc: {} }];
      const c = x.args.count, f = x.args.for_each;
      try {
        if (c && f) fail('Invalid combination of "count" and "for_each"', 'The "count" and "for_each" meta-arguments are mutually-exclusive, only one should be used to be explicit about the number of resources to be created.', f.line);
        if (c) {
          x.mode = "count"; let n = ev(c.e, {});
          if (isU(n)) fail("Invalid count argument", 'The "count" value depends on resource attributes that cannot be determined until apply, so Terraform cannot predict how many instances will be created. To work around this, use the -target argument to first apply only the resources that the count depends on.', c.line);
          if (typeof n === "string" && /^\d+$/.test(n)) n = +n;
          if (typeof n !== "number" || n % 1) fail("Invalid count argument", 'The given "count" argument value is unsuitable: a whole number is required.', c.line);
          if (n < 0) fail("Invalid count argument", 'The given "count" argument value is unsuitable: must be greater than or equal to zero.', c.line);
          insts = Array.from({ length: n }, (_, i) => ({ key: i, addr: x.addr + `[${i}]`, sc: { count: i } }));
        } else if (f) {
          x.mode = "for_each"; G.sens = false; const v = ev(f.e, {});
          const unknownMsg = 'The "for_each" map includes keys derived from resource attributes that cannot be determined until apply, and so Terraform cannot determine the full set of keys that will identify the instances of this resource.\n\nWhen working with unknown values in for_each, it\'s better to define the map keys statically in your configuration and place apply-time results only in the map values.';
          if (isU(v)) fail("Invalid for_each argument", unknownMsg, f.line);
          if (G.sens) fail("Invalid for_each argument", "Sensitive values, or values derived from sensitive values, cannot be used as for_each arguments. If used, the sensitive value could be exposed as a resource instance key.", f.line);
          if (v === null) fail("Invalid for_each argument", 'The given "for_each" argument value is unsuitable: the given "for_each" argument value is null. A map, or set of strings is allowed.', f.line);
          let pairs;
          if (Array.isArray(v)) {
            if (!v._set) fail("Invalid for_each argument", `The given "for_each" argument value is unsuitable: the "for_each" argument must be a map, or set of strings, and you have provided a value of type ${v._ty || "tuple"}.`, f.line);
            if (v.some(isU)) fail("Invalid for_each argument", unknownMsg, f.line);
            if (v.some(k => typeof k !== "string")) fail("Invalid for_each set argument", `The given "for_each" argument value is unsuitable: "for_each" supports sets of strings, but you have provided a set containing type ${typeName(v.find(k => typeof k !== "string"))}.`, f.line);
            pairs = v.map(k => [k, k]);
          } else if (isObj(v)) pairs = Object.keys(v).sort().map(k => [k, v[k]]);
          else fail("Invalid for_each argument", `The given "for_each" argument value is unsuitable: the "for_each" argument must be a map, or set of strings, and you have provided a value of type ${typeName(v)}.`, f.line);
          insts = pairs.map(([k, val]) => ({ key: k, addr: x.addr + keyStr(k), sc: { each: { key: k, value: val } } }));
        }
      } catch (e) { addErr(e, where, x.line); x.broken = true; insts = []; }
      x.expanding = false; x.insts = insts.map(i => ({ ...i, res: x, kind: x.kind }));
      return x.insts;
    }
    function resRef(res) {
      const insts = expandOf(res, res.where); if (res.broken) return U;
      if (res.mode === "single") return { __inst: insts[0] };
      const tag = { addr: res.addr, mode: res.mode };
      if (res.mode === "count") return mark(insts.map(i => ({ __inst: i })), "_counted", tag);
      const o = {}; insts.forEach(i => { o[i.key] = { __inst: i }; }); return mark(o, "_counted", tag);
    }
    function instAttr(it, n, line) {
      resolveInst(it); if (it.broken) return U;
      if (it.sens.has(n) || isSensAttr(it.res.type, n)) G.sens = true;
      if (n in it.cfg) return it.cfg[n];
      if (it.kind === "data") { if (n in it.fake) return it.fake[n]; if (DATA[it.res.type]) fail("Unsupported attribute", `This object has no argument, nested block, or exported attribute named "${n}".` + suggest(n, Object.keys(it.fake)), line); return `${n}-from-${it.res.name}`; }
      if (it.prior && it.action !== "replace" && n in it.prior) return it.prior[n];
      return U;
    }
    // Lifecycle settings for a resource: literal values only, the way Terraform requires.
    function lifecycleOf(res) {
      if (res.lc) return res.lc;
      const lc = res.lc = { cbd: false, prevent: false, ignore: [], ignoreAll: false, triggers: [], pre: [] };
      res.blocks.filter(b => b.b === "lifecycle").forEach(b => {
        const s = split(b.body, res.where, res.line);
        for (const k in s.args) {
          const it = s.args[k];
          try {
            if (k === "create_before_destroy") lc.cbd = toBool(ev(it.e, { noRefs: true }), it.line);
            else if (k === "prevent_destroy") lc.prevent = toBool(ev(it.e, { noRefs: true }), it.line);
            else if (k === "ignore_changes") {
              if (it.e.t === "trav" && it.e.root === "all" && !it.e.ops.length) lc.ignoreAll = true;
              else if (it.e.t === "list") it.e.items.forEach(x => { if (x.t !== "trav") fail("Invalid ignore_changes argument", "The ignore_changes list must contain attribute names, like tags or tags[\"Owner\"].", it.line); lc.ignore.push([x.root, ...x.ops.map(o => o.attr !== undefined ? o.attr : o.idx && o.idx.t === "lit" ? String(o.idx.v) : null)]); });
              else fail("Invalid ignore_changes argument", 'The ignore_changes argument must be a list of attribute names or the keyword all.', it.line);
            } else if (k === "replace_triggered_by") {
              if (it.e.t !== "list") fail("Invalid replace_triggered_by expression", "replace_triggered_by must be a list of references to managed resources or their attributes.", it.line);
              it.e.items.forEach(x => { if (x.t !== "trav" || !R[x.root + "." + (x.ops[0] && x.ops[0].attr)]) fail("Invalid replace_triggered_by expression", "Only references to managed resources, or their attributes, are allowed in replace_triggered_by.", it.line); lc.triggers.push(x); });
            } else addErr(new TfErr("Unsupported argument", `An argument named "${k}" is not expected here.`, it.line), res.where, res.line);
          } catch (e) { addErr(e, res.where, res.line); }
        }
        s.blocks.forEach(x => { if (x.b === "precondition") lc.pre.push(x); else if (x.b !== "postcondition") addErr(new TfErr("Unsupported block type", `Blocks of type "${x.b}" are not expected here.`, x.line), res.where, res.line); });
      });
      return lc;
    }
    function checkConds(list, sc, where, bl, summary) {
      list.forEach(b => {
        const s = split(b.body, where, bl), c = s.args.condition; if (!c) return;
        try { const ok = ev(c.e, sc); if (isU(ok) || ok === true) return; const msg = s.args.error_message ? ev(s.args.error_message.e, sc) : "The condition was false."; addErr(new TfErr(summary, `${msg}\n\nThis was checked by the condition at main.tf:${c.line}.`, c.line), where, bl); } catch (e) { addErr(e, where, bl); }
      });
    }
    // Prior state, after moved blocks rename addresses.
    Object.entries(prior.resources || {}).forEach(([a, v]) => { P[a] = v && isObj(v.attrs) ? v.attrs : (v || {}); });
    const addrOf = e => e && e.t === "trav" ? e.root + e.ops.map(o => o.attr !== undefined ? "." + o.attr : o.idx && o.idx.t === "lit" ? keyStr(o.idx.v) : "?").join("") : "?";
    movedDecl.forEach(b => {
      const s = split(b.body, "moved", b.line), from = addrOf(s.args.from && s.args.from.e), to = addrOf(s.args.to && s.args.to.e);
      if (from.includes("?") || to.includes("?")) return addErr(new TfErr("Invalid moved block", 'A moved block needs "from" and "to" arguments that are static resource or module addresses, like aws_instance.web[0].', b.line));
      Object.keys(P).filter(k => k === from || k.startsWith(from + "[") || (from.startsWith("module.") && k.startsWith(from + "."))).forEach(k => {
        const nk = to + k.slice(from.length); if (P[nk]) return;
        P[nk] = P[k]; delete P[k]; movedFrom[nk] = k; moved.push({ from: k, to: nk });
      });
    });
    function resolveInst(it) {
      if (it.done) return;
      if (it.busy) fail(`Cycle: ${it.addr}`, "This resource refers to itself, directly or through other resources, so Terraform can't work out an order to create them.", it.res.line);
      it.busy = true; const res = it.res;
      try {
        const b = evalBody(res.body, it.sc, META, res.where, res.line); it.cfg = b.obj; it.sens = b.sens; it.blocks = b.blocks;
        Object.keys(it.cfg).forEach(k => { if (isSensAttr(res.type, k)) it.sens.add(k); });
        if (res.kind === "data") { const fk = DATA[res.type] ? DATA[res.type](it.cfg) : { id: res.name }; it.fake = { ...fk, ...((prior.data || {})[it.addr] || {}) }; it.action = "read"; return; }
        decide(it, lifecycleOf(res));
        checkConds(lifecycleOf(res).pre, it.sc, res.where, res.line, "Resource precondition failed");
      } catch (e) { addErr(e, res.where, res.line); it.broken = true; it.cfg = it.cfg || {}; it.sens = it.sens || new Set(); it.action = it.action || "create"; }
      finally { it.busy = false; it.done = true; }
    }
    function decide(it, lc) {
      const Pv = P[it.addr]; claimed.add(it.addr); it.prior = Pv; it.movedFrom = movedFrom[it.addr]; it.changed = [];
      if (!Pv) { it.action = "create"; return; }
      if (lc.ignoreAll) Object.keys(it.cfg).forEach(k => { if (k in Pv) it.cfg[k] = Pv[k]; });
      lc.ignore.forEach(([k, sub]) => {
        if (!(k in it.cfg)) return;
        if (sub == null) { if (k in Pv) it.cfg[k] = Pv[k]; else delete it.cfg[k]; return; }
        if (isObj(it.cfg[k])) { const o = { ...it.cfg[k] }; if (isObj(Pv[k]) && sub in Pv[k]) o[sub] = Pv[k][sub]; else delete o[sub]; it.cfg[k] = o; }
      });
      it.changed = Object.keys(it.cfg).filter(k => !eq(it.cfg[k], Pv[k]));
      it.forced = new Set(it.changed.filter(k => forceNew(it.res.type, k)));
      it.trig = lc.triggers.some(x => {
        const ops = x.ops.slice(1); let targets = expandOf(R[x.root + "." + x.ops[0].attr]);
        if (ops[0] && ops[0].idx) { const k = ev(ops[0].idx, it.sc); targets = targets.filter(t => t.key === k); ops.shift(); }
        return targets.some(t => { resolveInst(t); return t.action === "replace" || (ops[0] && ops[0].attr ? (t.changed || []).includes(ops[0].attr) : t.action === "update"); });
      });
      it.action = it.forced.size || it.trig ? "replace" : it.changed.length ? "update" : "noop";
      if (it.action === "replace" && lc.prevent) preventErr(it.addr, it.res);
    }
    const preventErr = (addr, res) => addErr(new TfErr("Instance cannot be destroyed", `Resource ${addr} has lifecycle.prevent_destroy set, but the plan calls for this resource to be destroyed. To avoid this error and continue with the plan, either disable lifecycle.prevent_destroy or reduce the scope of the plan using the -target option.`, res.line));

    // Modules: contents come from prior.modules[source or name] = { resources, variables, outputs }.
    function modInsts(m) {
      if (m.minsts) return m.minsts;
      const where = m.where; m.minsts = [];
      let source = null;
      try {
        if (!m.args.source) fail("Missing required argument", 'The argument "source" is required, but no definition was found.', m.line);
        source = ev(m.args.source.e, { noRefs: true });
      } catch (e) { addErr(e, where, m.line); m.broken = true; }
      m.source = source; m.spec = (prior.modules || {})[source] || (prior.modules || {})[m.name] || null;
      const insts = expandOf(m, where);
      m.minsts = insts.map(i => {
        const inputs = {}; Object.keys(m.args).filter(k => !META.has(k)).forEach(k => { G.sens = false; try { inputs[k] = ev(m.args[k].e, i.sc); } catch (e) { addErr(e, where, m.line); inputs[k] = U; } });
        m.blocks.forEach(x => addErr(new TfErr("Unsupported block type", `Blocks of type "${x.b}" are not expected here.`, x.line), where, m.line));
        const spec = m.spec, vars = spec && spec.variables;
        if (vars) {
          const decl = Array.isArray(vars) ? vars.reduce((o, n) => (o[n] = { required: true }, o), {}) : vars;
          Object.keys(decl).forEach(n => { if (decl[n] && decl[n].required !== false && !("default" in decl[n]) && !(n in inputs)) addErr(new TfErr("Missing required argument", `The argument "${n}" is required, but no definition was found.`, m.line)); else if (!(n in inputs) && decl[n] && "default" in decl[n]) inputs[n] = decl[n].default; });
          Object.keys(inputs).forEach(n => { if (!(n in decl)) addErr(new TfErr("Unsupported argument", `An argument named "${n}" is not expected here.` + suggest(n, Object.keys(decl)), m.args[n].line)); });
        }
        return { ...i, m, inputs };
      });
      return m.minsts;
    }
    function modRef(m) {
      const insts = modInsts(m); if (m.broken) return U;
      if (m.mode === "single") return { __mod: insts[0] };
      const tag = { addr: m.addr, mode: m.mode };
      if (m.mode === "count") return mark(insts.map(i => ({ __mod: i })), "_counted", tag);
      const o = {}; insts.forEach(i => { o[i.key] = { __mod: i }; }); return mark(o, "_counted", tag);
    }
    function modAttr(it, n, line) {
      const spec = it.m.spec; if (!spec || !spec.outputs) return U;
      if (!(n in spec.outputs)) fail("Unsupported attribute", `This object does not have an attribute named "${n}".` + suggest(n, Object.keys(spec.outputs)), line);
      const v = spec.outputs[n]; if (typeof v === "string" && /^var\.\w+$/.test(v)) return it.inputs[v.slice(4)] ?? null;
      return v === null ? U : v;
    }

    /* ----- run the plan ----- */
    tfBlocks.forEach(b => {
      const s = split(b.body, "terraform", b.line);
      Object.keys(s.args).forEach(k => {
        if (k !== "required_version") return addErr(new TfErr("Unsupported argument", `An argument named "${k}" is not expected here.`, s.args[k].line));
        try { const c = ev(s.args[k].e, { noRefs: true }); if (!versionOk(VERSION, c, s.args[k].line)) addErr(new TfErr("Unsupported Terraform Core version", `This configuration does not support Terraform version ${VERSION}. To proceed, either choose another supported Terraform version or update this version constraint. Version constraints are normally set for good reason, so updating the constraint may lead to other errors or unexpected behavior.`, s.args[k].line)); } catch (e) { addErr(e, "terraform", b.line); }
      });
      s.blocks.filter(x => x.b === "required_providers").forEach(x => x.body.forEach(it => {
        if (!it.a) return;
        try { let v = ev(it.e, { noRefs: true }); if (typeof v === "string") v = { version: v }; providers[it.a] = { source: v.source || "hashicorp/" + it.a, version: v.version || null }; if (v.version) versionOk("0.0.0", v.version, it.line); } catch (e) { addErr(e, "terraform", b.line); }
      }));
    });
    provs.forEach(b => { const w = `provider "${b.labels[0]}"`; evalBody(b.body, {}, new Set(["alias"]), w, b.line); });
    Object.keys(V).forEach(setupVar);
    Object.keys(L).forEach(n => { try { localVal(n, L[n].item.line); } catch (e) { addErr(e, "locals", -1); } });
    Object.values(R).forEach(res => {
      const list = expandOf(res, res.where); lifecycleOf(res);
      list.forEach(it => { resolveInst(it); (res.kind === "data" ? dataInsts : insts).push(it); });
      const dep = res.args.depends_on;
      if (dep) { if (dep.e.t !== "list") addErr(new TfErr("Invalid depends_on reference", "The depends_on argument must be a list of references to resources or modules.", dep.line), res.where, res.line); else dep.e.items.forEach(x => { try { if (x.t !== "trav") fail("Invalid depends_on reference", "References in depends_on must be to a whole object (resource, etc), not an expression.", dep.line); resolve({ ...x, ops: x.ops.slice(0, x.root === "data" ? 2 : 1) }, {}); } catch (e) { addErr(e, res.where, res.line); } }); }
    });
    // Module child resources.
    Object.values(M).forEach(m => modInsts(m).forEach(i => {
      const spec = m.spec, base = m.addr + (i.key === null ? "" : keyStr(i.key));
      if (!spec) {
        const existing = Object.keys(P).filter(k => k.startsWith(base + "."));
        if (existing.length) existing.forEach(k => { claimed.add(k); insts.push({ addr: k, kind: "managed", res: { type: k.split(".").slice(-2)[0], name: "" }, action: "noop", prior: P[k], cfg: {}, sens: new Set(), blocks: new Set(), opaque: true }); });
        else modChanges.push({ addr: base, action: "create", cfg: i.inputs, sens: new Set(), blocks: new Set(), opaque: true, source: m.source, res: { type: "module", name: m.name } });
        return;
      }
      const rs = Array.isArray(spec.resources) ? spec.resources.reduce((o, a) => (o[a] = {}, o), {}) : (spec.resources || {});
      Object.keys(rs).forEach(child => {
        const cfg = {}; Object.entries(rs[child] || {}).forEach(([k, v]) => { cfg[k] = typeof v === "string" && /^var\.\w+$/.test(v) ? (i.inputs[v.slice(4)] ?? null) : v; });
        const [type, nameKey] = child.split("."), it = { addr: base + "." + child, kind: "managed", res: { type, name: nameKey.replace(/\[.*$/, ""), line: m.line }, cfg, sens: new Set(), blocks: new Set() };
        decide(it, { ignore: [], triggers: [] }); insts.push(it);
      });
    }));
    // Leftover prior resources are destroyed.
    Object.keys(P).filter(a => !claimed.has(a)).forEach(a => {
      const m = /^(.*?)(\[[^\]]*\])?$/.exec(a), base = m[1], key = m[2] ? JSON.parse(m[2].slice(1, -1)) : null, res = R[base];
      let why = `(because ${a} is not in configuration)`;
      const modName = (/^module\.([\w-]+)/.exec(a) || [])[1];
      if (modName && !M[modName]) why = `(because module.${modName} is not in configuration)`;
      else if (res) {
        if (typeof key === "number") why = res.mode === "count" ? `(because index [${key}] is out of range for count)` : "(because resource does not use count)";
        else if (typeof key === "string") why = res.mode === "for_each" ? `(because key [${q(key)}] is not in for_each map)` : "(because resource does not use for_each)";
        else if (res.mode !== "single") why = "(because resource uses count or for_each)";
        if (lifecycleOf(res).prevent) preventErr(a, res);
      }
      const parts = a.replace(/^(module\.[\w-]+(\[[^\]]*\])?\.)+/, "").split(".");
      insts.push({ addr: a, kind: "managed", res: { type: parts[0], name: parts[1] ? parts[1].replace(/\[.*$/, "") : "" }, action: "destroy", prior: P[a], cfg: {}, sens: new Set(), blocks: new Set(), why, movedFrom: movedFrom[a] });
    });
    // Outputs.
    Object.values(O).forEach(o => {
      const where = `output "${o.name}"`;
      Object.keys(o.args).forEach(k => { if (!["value", "description", "sensitive", "depends_on", "ephemeral"].includes(k)) addErr(new TfErr("Unsupported argument", `An argument named "${k}" is not expected here.`, o.args[k].line), where, o.line); });
      try {
        if (!o.args.value) fail("Missing required argument", 'The argument "value" is required, but no definition was found.', o.line);
        const sensDecl = o.args.sensitive ? toBool(ev(o.args.sensitive.e, { noRefs: true }), o.line) : false;
        checkConds(o.blocks.filter(b => b.b === "precondition"), {}, where, o.line, "Module output value precondition failed");
        G.sens = false; const v = ev(o.args.value.e, {});
        if (G.sens && !sensDecl) fail("Output refers to sensitive values", "To reduce the risk of accidentally exporting sensitive data that was intended to be only internal, Terraform requires that any root module output containing sensitive data be explicitly marked as sensitive, to confirm your intent.\n\nIf you do intend to export this data, annotate the output value as sensitive by adding the following argument:\n    sensitive = true", o.line);
        outputs[o.name] = { value: exportV(v), sensitive: sensDecl, known: !hasU(v) };
        const old = (prior.outputs || {})[o.name];
        if (old === undefined) outRows.push(["+", o.name, v, sensDecl]); else if (!eq(old, v)) outRows.push(["~", o.name, [old, v], sensDecl]);
      } catch (e) { addErr(e, where, o.line); }
    });
    Object.keys(prior.outputs || {}).forEach(n => { if (!O[n]) outRows.push(["-", n, prior.outputs[n], false]); });
    outRows.sort((a, b) => a[1] < b[1] ? -1 : 1);
    return finish();

    function finish() {
      const refresh = [];
      Object.keys(prior.resources || {}).sort(byAddr).forEach(a => { const v = P[a] || P[Object.keys(movedFrom).find(k => movedFrom[k] === a)] || {}; if (v.id !== undefined) refresh.push(`${a}: Refreshing state... [id=${v.id}]`); });
      dataInsts.filter(d => !d.broken).forEach(d => { refresh.push(`${d.addr}: Reading...`, `${d.addr}: Read complete after 0s [id=${d.fake.id}]`); });
      const head = refresh.length ? refresh.join("\n") + "\n\n" : "";
      if (errors.length) {
        const box = errors.map(e => ["╷", `│ Error: ${e.summary}`, "│", ...(e.line ? [`│   on main.tf line ${e.line}${e.where ? `, in ${e.where}` : ""}:`, `│ ${String(e.line).padStart(4)}: ${(srcLines[e.line - 1] || "").replace(/\t/g, "  ")}`, "│"] : []), ...e.detail.split("\n").map(l => ("│ " + l).trimEnd()), "╵"].join("\n")).join("\n");
        return { ok: false, text: head + box, changes: [], instances: [], counts: { add: 0, change: 0, destroy: 0 }, outputs: {}, errors, moved: [] };
      }
      const all = insts.concat(modChanges).sort((a, b) => byAddr(a.addr, b.addr));
      const inst = all.map(i => ({ addr: i.addr, action: i.action, attrs: exportV(i.action === "destroy" ? i.prior : { ...(i.prior && i.action !== "replace" ? i.prior : {}), ...i.cfg }) }));
      const changes = inst.filter(i => i.action !== "noop");
      const counts = { add: 0, change: 0, destroy: 0 };
      changes.forEach(c => { if (c.action === "create" || c.action === "replace") counts.add++; if (c.action === "update") counts.change++; if (c.action === "destroy" || c.action === "replace") counts.destroy++; });
      const shown = all.filter(i => i.action !== "noop" || i.movedFrom);
      let text = head;
      if (!shown.length && !outRows.length) text += "No changes. Your infrastructure matches the configuration.\n\nTerraform has compared your real infrastructure against your configuration and found no\ndifferences, so no changes are needed.";
      else {
        if (changes.length) {
          const used = new Set(changes.map(c => c.action === "replace" ? (all.find(i => i.addr === c.addr).res.lc || {}).cbd ? "+/-" : "-/+" : c.action));
          text += "Terraform used the selected providers to generate the following execution\nplan. Resource actions are indicated with the following symbols:\n" + [["create", "  + create"], ["update", "  ~ update in-place"], ["destroy", "  - destroy"], ["-/+", "-/+ destroy and then create replacement"], ["+/-", "+/- create replacement and then destroy"]].filter(([k]) => used.has(k)).map(x => x[1]).join("\n") + "\n\n";
        }
        if (shown.length) text += "Terraform will perform the following actions:\n\n" + shown.map(renderInst).join("\n\n") + `\n\nPlan: ${counts.add} to add, ${counts.change} to change, ${counts.destroy} to destroy.\n`;
        if (outRows.length) {
          const w = Math.max(...outRows.map(r => r[1].length));
          text += (shown.length ? "\n" : "") + "Changes to Outputs:\n" + outRows.map(([s, n, v, sens]) => ln(0, s, n.padEnd(w) + " = " + (s === "~" ? `${sens ? "(sensitive value)" : inl(v[0])} -> ${sens ? "(sensitive value)" : fmtV(v[1], 0, "+")}` : s === "-" ? fmtV(v, 0, "-") + " -> null" : fmtV(v, 0, "+", sens)))).join("\n") + "\n";
          if (!shown.length) text += "\nYou can apply this plan to save these new output values to the Terraform state, without\nchanging any real infrastructure.\n";
        }
        text += "\n─────────────────────────────────────────────────────────────────────────────\n\nNote: You didn't use the -out option to save this plan, so Terraform can't\nguarantee to take exactly these actions if you run \"terraform apply\" now.";
      }
      return { ok: true, text: text.replace(/\n+$/, ""), changes, instances: inst, counts, outputs, errors: [], moved, providers };
    }
  }

  /* ---------- version constraints ---------- */
  function versionOk(ver, constraint, line) {
    const num = s => s.split(".").map(Number), cmp = (a, b) => { for (let i = 0; i < 3; i++) { const d = (a[i] || 0) - (b[i] || 0); if (d) return d; } return 0; };
    const v = num(ver);
    return String(constraint).split(",").every(part => {
      const m = /^\s*(~>|>=|<=|!=|=|>|<)?\s*v?(\d+(?:\.\d+){0,2})(-[\w.]+)?\s*$/.exec(part);
      if (!m) fail("Invalid version constraint", "This string does not use correct version constraint syntax.", line);
      const op = m[1] || "=", c = num(m[2]), r = cmp(v, c);
      if (op === "~>") { const parts = m[2].split(".").length; if (r < 0) return false; const up = c.slice(0, Math.max(1, parts - 1)); up[up.length - 1]++; return cmp(v, up.concat([0, 0, 0]).slice(0, 3)) < 0; }
      return { "=": r === 0, "!=": r !== 0, ">": r > 0, ">=": r >= 0, "<": r < 0, "<=": r <= 0 }[op];
    });
  }

  /* ---------- rendering ---------- */
  const pad = n => " ".repeat(n);
  const ln = (D, sym, text) => pad(4 * D) + sym.padStart(3) + " " + text;
  const byAddr = (a, b) => { const k = s => s.replace(/\[(\d+)\]/g, (_, n) => `[${n.padStart(8, "0")}]`); return k(a) < k(b) ? -1 : k(a) > k(b) ? 1 : 0; };
  const exportV = v => isU(v) ? "(known after apply)" : Array.isArray(v) ? v.map(exportV) : isObj(v) ? Object.keys(v).reduce((o, k) => (o[k] = exportV(v[k]), o), {}) : v;
  const inl = v => isU(v) ? "(known after apply)" : v === null || v === undefined ? "null" : typeof v === "string" ? q(v) : Array.isArray(v) ? "[" + v.map(inl).join(", ") + "]" : typeof v === "object" ? (Object.keys(v).length ? "{ " + Object.keys(v).sort().map(k => `${q(k)} = ${inl(v[k])}`).join(", ") + " }" : "{}") : String(v);
  const isBlk = v => Array.isArray(v) && !!v.length && (v._blk || v.every(isObj));
  function fmtV(v, D, sym, sens) {
    if (sens) return "(sensitive value)";
    if (isU(v)) return "(known after apply)";
    if (v === null || v === undefined) return "null";
    if (typeof v === "string") return q(v);
    if (typeof v !== "object") return String(v);
    if (Array.isArray(v)) return v.length ? "[\n" + v.map(x => ln(D + 1, sym, fmtV(x, D + 1, sym) + ",")).join("\n") + "\n" + pad(4 * D + 4) + "]" : "[]";
    const ks = Object.keys(v).sort(); if (!ks.length) return "{}";
    const w = Math.max(...ks.map(k => q(k).length));
    return "{\n" + ks.map(k => ln(D + 1, sym, q(k).padEnd(w) + " = " + fmtV(v[k], D + 1, sym))).join("\n") + "\n" + pad(4 * D + 4) + "}";
  }
  const plural = (n, w) => `${n} unchanged ${w}${n === 1 ? "" : "s"} hidden`;
  // Lines for a whole object being created ("+") or destroyed ("-").
  function bodyLines(obj, D, sym, sens, suffix) {
    const ks = Object.keys(obj).sort(), attrs = ks.filter(k => !isBlk(obj[k])), w = Math.max(0, ...attrs.map(k => k.length)), out = [];
    attrs.forEach(k => out.push(ln(D, sym, k.padEnd(w) + " = " + fmtV(obj[k], D, sym, sens && sens.has(k)) + (suffix && obj[k] !== null && !isU(obj[k]) ? suffix : ""))));
    ks.filter(k => isBlk(obj[k])).forEach(k => obj[k].forEach(el => { out.push(ln(D, sym, k + " {")); out.push(...bodyLines(el, D + 1, sym, null, suffix)); out.push(pad(4 * D + 4) + "}"); }));
    return out;
  }
  // Lines for an in-place update or replacement: old vs new, unchanged values hidden.
  function diffLines(o, n, D, opt) {
    const ks = [...new Set(Object.keys(o).concat(Object.keys(n)))].sort(), out = [], blockOut = [];
    let hidA = 0, hidB = 0;
    const attrs = ks.filter(k => !isBlk(o[k]) && !isBlk(n[k]));
    const rows = [];
    attrs.forEach(k => {
      const a = o[k] ?? null, b = k in n ? n[k] : opt.top ? (opt.replace ? U : a) : null, sens = opt.sens && opt.sens.has(k), fn = opt.forced && opt.forced.has(k) ? " # forces replacement" : "";
      if (eq(a, b)) { if (opt.top && k === "id") rows.push([" ", k, sens ? "(sensitive value)" : inl(a)]); else hidA++; return; }
      if (a === null) rows.push(["+", k, fmtV(b, D, "+", sens) + fn]);
      else if (b === null) rows.push(["-", k, fmtV(a, D, "-", sens) + " -> null" + fn]);
      else if (isObj(a) && isObj(b) && !sens) { const sub = diffLines(a, b, D + 1, { map: true }); rows.push(["~", k, "{\n" + sub.join("\n") + "\n" + pad(4 * D + 4) + "}" + fn]); }
      else rows.push(["~", k, (sens ? "(sensitive value)" : inl(a) + " -> " + inl(b)) + fn]);
    });
    const w = Math.max(0, ...rows.map(r => (opt.map ? q(r[1]) : r[1]).length));
    rows.forEach(([s, k, t]) => out.push(ln(D, s, (opt.map ? q(k) : k).padEnd(w) + " = " + t)));
    ks.filter(k => isBlk(o[k]) || isBlk(n[k])).forEach(k => {
      const a = isBlk(o[k]) ? o[k] : [], b = k in n ? (Array.isArray(n[k]) ? n[k] : []) : opt.top && !opt.replace ? a : [];
      for (let i = 0; i < Math.max(a.length, b.length); i++) {
        if (i >= b.length) { blockOut.push(ln(D, "-", k + " {"), ...bodyLines(a[i], D + 1, "-", null, " -> null"), pad(4 * D + 4) + "}"); continue; }
        if (i >= a.length) { blockOut.push(ln(D, "+", k + " {"), ...bodyLines(b[i], D + 1, "+"), pad(4 * D + 4) + "}"); continue; }
        if (eq(a[i], b[i])) { hidB++; continue; }
        blockOut.push(ln(D, "~", k + " {"), ...diffLines(a[i], b[i], D + 1, {}), pad(4 * D + 4) + "}");
      }
    });
    if (hidA) out.push(pad(4 * D + 4) + `# (${plural(hidA, opt.map ? "element" : "attribute")})`);
    out.push(...blockOut);
    if (hidB) out.push(pad(4 * D + 4) + `# (${plural(hidB, "block")})`);
    return out;
  }
  function renderInst(i) {
    const t = i.res.type, n = i.res.name, label = i.opaque && i.action === "create" ? `module "${n}"` : `resource "${t}" "${n}"`;
    const mv = i.movedFrom ? `  # (moved from ${i.movedFrom})\n` : "";
    if (i.action === "create") {
      const obj = { ...i.cfg }; if (!i.opaque) computed(t).forEach(k => { if (!(k in obj)) obj[k] = U; });
      if (i.opaque) obj.source = i.source;
      return `  # ${i.addr} will be created${i.opaque ? " (module contents are not simulated)" : ""}\n${mv}` + [ln(0, "+", label + " {"), ...bodyLines(obj, 1, "+", i.sens), pad(4) + "}"].join("\n");
    }
    if (i.action === "destroy") return `  # ${i.addr} will be destroyed\n  # ${i.why}\n` + [ln(0, "-", label + " {"), ...bodyLines(i.prior || {}, 1, "-", new Set(Object.keys(i.prior || {}).filter(k => isSensAttr(t, k))), " -> null"), pad(4) + "}"].join("\n");
    if (i.action === "noop") return `  # ${i.movedFrom} has moved to ${i.addr}\n` + [ln(0, " ", label + " {"), ...diffLines(i.prior, i.cfg, 1, { top: true, sens: i.sens }), pad(4) + "}"].join("\n");
    const rep = i.action === "replace", sym = rep ? (i.res.lc && i.res.lc.cbd ? "+/-" : "-/+") : "~";
    const headTxt = rep ? (i.trig && !i.forced.size ? "will be replaced due to changes in replace_triggered_by" : "must be replaced") : "will be updated in-place";
    const n2 = { ...i.cfg }; if (rep) computed(t).forEach(k => { if (!(k in n2)) n2[k] = U; });
    return `  # ${i.addr} ${headTxt}\n${mv}` + [ln(0, sym, label + " {"), ...diffLines(i.prior, n2, 1, { top: true, replace: rep, forced: i.forced, sens: i.sens }), pad(4) + "}"].join("\n");
  }

  /* ---------- task checks ---------- */
  const deepEq = (a, b) => q(sortKeys(a ?? null)) === q(sortKeys(b ?? null));
  const pathGet = (o, key) => String(key).split(".").reduce((v, k) => v == null ? undefined : v[k], o);
  function check(r, c) {
    if (!r || !c) return false;
    const inst = a => (r.instances || []).find(i => i.addr === a);
    switch (c.type) {
      case "ok": return !!r.ok;
      case "error": return !r.ok && String(r.text).includes(c.includes || "");
      case "create": case "update": case "replace": case "destroy": return !!r.ok && (r.changes || []).some(x => x.addr === c.addr && x.action === c.type);
      case "noop": { const i = inst(c.addr); return !!r.ok && !!i && i.action === "noop"; }
      case "counts": return !!r.ok && ["add", "change", "destroy"].every(k => c[k] === undefined || r.counts[k] === c[k]);
      case "attr": { const i = inst(c.addr); return !!r.ok && !!i && i.action !== "destroy" && deepEq(pathGet(i.attrs, c.key), c.equals); }
      case "output": { const o = (r.outputs || {})[c.name]; return !!r.ok && !!o && (!("equals" in c) || deepEq(o.value, c.equals)) && (c.sensitive === undefined || o.sensitive === c.sensitive); }
      case "moved": return !!r.ok && (r.moved || []).some(m => m.from === c.from && m.to === c.to);
    }
    return false;
  }

  const api = { plan, check, VERSION };
  if (typeof module !== "undefined" && module.exports) module.exports = api; else root.CertHub.tf = api;
})(typeof window !== "undefined" ? window : globalThis);
