/* Runs in <head> before paint so a saved light/dark choice never flashes. */
try { var t = localStorage.getItem("certhub:theme"); if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t); } catch (e) {}
