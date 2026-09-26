/* Runs in <head> before paint so a saved light/dark or accent choice never flashes.
   A ?lang=es or ?lang=en link (from the Spanish lesson pages) sets the interface language, then the parameter is removed. */
try {
  var q = /[?&]lang=(es|en)\b/.exec(location.search);
  if (q) { localStorage.setItem("certhub:lang", q[1]); history.replaceState(null, "", location.pathname + location.search.replace(/([?&])lang=(es|en)\b&?/, "$1").replace(/[?&]$/, "") + location.hash); }
  var t = localStorage.getItem("certhub:theme"); if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  var a = localStorage.getItem("certhub:accent"); if (/^(green|purple|rose|amber|classic)$/.test(a || "")) document.documentElement.setAttribute("data-accent", a);
} catch (e) {}
