/* Runs learner Python in a web worker with Pyodide (self-hosted in /vendor/pyodide), so a
   runaway loop can be stopped by terminating the worker. Messages: { id, code, tests, stdin }. */
import { loadPyodide } from "../vendor/pyodide/pyodide.mjs";
let ready = null;
const last = m => String(m || "").trim().split("\n").filter(Boolean).slice(-1)[0] || "Error";
self.onmessage = async e => {
  const { id, code, tests = [], stdin = "" } = e.data || {};
  try {
    if (!ready) ready = loadPyodide({ indexURL: new URL("../vendor/pyodide/", import.meta.url).href });
    const py = await ready;
    let out = "";
    py.setStdout({ batched: s => { out += s + "\n"; } });
    py.setStderr({ batched: s => { out += s + "\n"; } });
    const lines = String(stdin).split("\n");
    py.setStdin({ stdin: () => (lines.length ? lines.shift() : undefined) });
    const ns = py.globals.get("dict")();
    try { await py.runPythonAsync(code, { globals: ns }); }
    catch (err) { self.postMessage({ id, ok: false, out, error: last(err.message) }); ns.destroy(); return; }
    const results = [];
    for (const t of tests) {
      try { await py.runPythonAsync(t.code, { globals: ns }); results.push({ name: t.name, ok: true }); }
      catch (err) { results.push({ name: t.name, ok: false, msg: last(err.message) }); }
    }
    ns.destroy();
    self.postMessage({ id, ok: true, out, results });
  } catch (err) { self.postMessage({ id, ok: false, error: "Python couldn't start: " + last(err && err.message) }); }
};
