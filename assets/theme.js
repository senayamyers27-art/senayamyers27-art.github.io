/* Runs in <head> before anything else on the page.
   1. Trusted Types (the CSP requires them): every HTML string the app writes into the page goes through this one
      policy, which refuses real <script>, <iframe>, <object>-style tags, event-handler attributes and javascript:
      URLs, and scripts and workers may only load from this site. Escaped text (&lt;...&gt;) is never affected.
      It also refuses <style> tags: the CSP allows <style> elements only because the terminal library creates them.
   2. The CSP blocks inline style attributes (style-src-attr 'none'), so the app's markup uses data-style attributes instead,
      and an observer applies it through the CSSOM, which the CSP allows. It runs before the page is painted.
   3. A saved light/dark or accent choice is applied before paint, so it never flashes.
   4. A ?lang=es or ?lang=en link (from the Spanish lesson pages) sets the interface language, then the parameter is removed. */
try {
  if (window.trustedTypes && trustedTypes.createPolicy && !trustedTypes.defaultPolicy) {
    var DANGER = /<\s*\/?\s*(script|style|iframe|frame|frameset|object|embed|base|meta|link)\b|<[a-z][^>]*\son[a-z]+\s*=|<[a-z][^>]*\s(href|src|action|formaction|xlink:href)\s*=\s*["']?\s*(javascript|vbscript|data:text\/html)/i;
    var refuse = function (what, s) { var e = new TypeError("Blocked unsafe " + what); console.error(e.message, String(s).slice(0, 200)); throw e; };
    trustedTypes.createPolicy("default", {
      createHTML: function (s) { return DANGER.test(s) ? refuse("HTML", s) : s; },
      // Same-origin scripts and the emulator's blob: worker; plus Cloudflare's Turnstile script, which the CSP
      // only allows when the optional sign-in bot check is configured.
      createScriptURL: function (u) { var x = new URL(u, location.href); return x.origin === location.origin || x.protocol === "blob:" || (x.origin === "https://challenges.cloudflare.com" && x.pathname === "/turnstile/v0/api.js") ? u : refuse("script URL", u); },
      createScript: function (s) { return refuse("dynamic script", s); }
    });
  }
} catch (e) {}
try {
  var applyStyle = function (el) {
    var css = el.getAttribute("data-style");
    el.removeAttribute("data-style");
    css.split(";").forEach(function (d) { var i = d.indexOf(":"); if (i > 0) el.style.setProperty(d.slice(0, i).trim(), d.slice(i + 1).trim()); });
  };
  var scanStyles = function (n) {
    if (n.nodeType !== 1) return;
    if (n.hasAttribute("data-style")) applyStyle(n);
    var l = n.querySelectorAll("[data-style]");
    for (var i = 0; i < l.length; i++) applyStyle(l[i]);
  };
  new MutationObserver(function (ms) {
    ms.forEach(function (m) { if (m.type === "attributes") scanStyles(m.target); else m.addedNodes.forEach(scanStyles); });
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-style"] });
} catch (e) {}
try {
  var q = /[?&]lang=(es|en)\b/.exec(location.search);
  if (q) { localStorage.setItem("certhub:lang", q[1]); history.replaceState(null, "", location.pathname + location.search.replace(/([?&])lang=(es|en)\b&?/, "$1").replace(/[?&]$/, "") + location.hash); }
  var t = localStorage.getItem("certhub:theme"); if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  var a = localStorage.getItem("certhub:accent"); if (/^(green|purple|rose|amber|classic)$/.test(a || "")) document.documentElement.setAttribute("data-accent", a);
} catch (e) {}
