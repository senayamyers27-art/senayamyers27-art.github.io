/* Help widget: the "Help" button at the bottom right of every page. Searches the site's help answers (data/help.js),
   which works offline and needs no account. When the site's API has the AI assistant switched on
   (/v1/me reports support: true), it can also answer questions in a short chat. Chats stay in this tab only
   (sessionStorage) and the server doesn't store them. Loaded on first click by app.js. */
(function () {
  const { U, store } = CertHub;
  const { $, esc } = U;
  const API = (CertHub.site && CertHub.site.apiUrl) || "";
  const TS_KEY = (CertHub.site && CertHub.site.turnstileSiteKey) || "";
  const CHAT_KEY = "certhub:supportchat";
  const es = () => CertHub.i18n.lang() === "es";
  const tr = s => CertHub.i18n.t(s);
  const aiOn = () => !!(API && CertHub.sync && CertHub.sync.me && CertHub.sync.me.support);

  /* ---------- help answers ---------- */
  const entry = h => (es() && h.es ? { ...h, q: h.es.q, a: h.es.a } : h);
  const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  function search(text) {
    const words = norm(text).split(/[^a-z0-9+]+/).filter(w => w.length > 2);
    if (!words.length) return [];
    return CertHub.help.map(h => {
      const e = entry(h), hay = norm(`${e.q} ${h.q} ${h.k} ${e.a}`), title = norm(`${e.q} ${h.k}`);
      const score = words.reduce((n, w) => n + (title.includes(w) ? 3 : hay.includes(w) ? 1 : 0), 0);
      return { h, score };
    }).filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 4).map(x => x.h);
  }
  const linkList = h => h.links.length ? `<p class="suplinks">${h.links.map(([l, u]) => `<a href="${esc(u)}" data-supnav>${esc(tr(l))}</a>`).join("")}</p>` : "";
  const answerHtml = (h, open) => { const e = entry(h); return `<details class="supqa"${open ? " open" : ""}><summary>${esc(e.q)}</summary><p>${esc(e.a)}</p>${/* html: links built with esc() */ linkList(h)}</details>`; };

  /* ---------- assistant replies: a tiny, safe Markdown subset ---------- */
  // Escape everything first, then allow **bold**, `code`, "- " lists and links to the site's own pages only.
  function md(text) {
    const inline = s => esc(s)
      .replace(/`([^`]{1,80})`/g, "<code>$1</code>")
      .replace(/\*\*([^*]{1,200})\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]{1,80})\]\((#[a-z0-9][a-z0-9.-]{0,60})\)/g, '<a href="$2" data-supnav>$1</a>')
      .replace(/\[([^\]]{1,80})\]\([^)]*\)/g, "$1"); // any other link keeps its text only
    const out = []; let list = null;
    for (const line of String(text).split(/\n/)) {
      const m = /^\s*(?:[-*•]|\d+[.)])\s+(.*)$/.exec(line);
      if (m) { (list = list || []).push(`<li>${inline(m[1])}</li>`); continue; }
      if (list) { out.push(`<ul>${/* html: items built with inline(), which escapes first */ list.join("")}</ul>`); list = null; }
      if (line.trim()) out.push(`<p>${inline(line.trim())}</p>`);
    }
    if (list) out.push(`<ul>${/* html: items built with inline(), which escapes first */ list.join("")}</ul>`);
    return out.join("");
  }

  /* ---------- chat ---------- */
  const load = () => { try { const v = JSON.parse(sessionStorage.getItem(CHAT_KEY) || "[]"); return Array.isArray(v) ? v.slice(-20) : []; } catch (e) { return []; } };
  const save = m => { try { sessionStorage.setItem(CHAT_KEY, JSON.stringify(m.slice(-20))); } catch (e) {} };
  let chat = load(), busy = false, tsToken = "", tsWidgets = [], pass = "";
  // The help box can appear in several places at once (the floating panel, the home page, the Help page). Each copy
  // has its own element ids, made from a prefix: "sup" (panel), "hsup" (home), "psup" (Help page). All copies share
  // one conversation.
  const el = (p, name) => document.getElementById(p + name);
  const prefixOf = node => { const r = node && node.closest && node.closest("[data-sup]"); return r ? r.dataset.sup : null; };
  const bubble = m => `<div class="supmsg ${m.role === "user" ? "me" : "bot"}">${m.role === "user" ? `<p>${esc(m.content)}</p>` : /* html: md() escapes first */ md(m.content)}</div>`;
  function renderChat() {
    document.querySelectorAll(".suplog").forEach(log => {
      log.innerHTML = chat.map(bubble).join("") + (busy ? `<div class="supmsg bot typing" aria-label="${esc(tr("The assistant is typing"))}"><span></span><span></span><span></span></div>` : "");
      log.scrollTop = log.scrollHeight;
    });
  }
  function turnstile(p) {
    const box = el(p, "-ts"); if (!TS_KEY || !box || box.dataset.ready) return;
    box.dataset.ready = "1";
    const go = () => { tsWidgets.push(window.turnstile.render(box, { sitekey: TS_KEY, action: "support", callback: t => { tsToken = t; }, "expired-callback": () => { tsToken = ""; } })); };
    if (window.turnstile) return go();
    const s = document.createElement("script"); s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; s.async = true; s.onload = go; document.head.appendChild(s);
  }
  const status = (p, text) => { const m = el(p, "msg-status"); if (m) m.textContent = text; };
  async function ask(p, text) {
    if (busy) return;
    // Signed out, the bot check runs once per chat; the server then hands back a short-lived pass.
    if (TS_KEY && !pass && !tsToken) { status(p, tr("Complete the check that you're not a bot first.")); return; }
    chat.push({ role: "user", content: text }); busy = true; save(chat); renderChat(); status(p, "");
    try {
      const res = await fetch(API + "/v1/support/chat", {
        method: "POST", credentials: "omit", cache: "no-store", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chat.map(m => ({ role: m.role, content: m.content })), turnstile: tsToken || undefined, pass: pass || undefined })
      });
      const data = await res.json().catch(() => ({}));
      if (data.error === "challenge_required") pass = "";
      if (!res.ok) throw new Error(data.message || tr("The assistant couldn't answer just now. Try again."));
      if (typeof data.pass === "string") pass = data.pass;
      chat.push({ role: "assistant", content: String(data.reply || "") });
    } catch (e) {
      chat.pop(); // take the question back so it can be sent again
      status(p, e.message || tr("The assistant couldn't answer just now. Try again."));
      const input = el(p, "q"); if (input && !input.value) input.value = text;
    }
    busy = false; save(chat); renderChat();
    if (tsWidgets.length && window.turnstile) { tsWidgets.forEach(w => window.turnstile.reset(w)); tsToken = ""; }
  }

  /* ---------- the help box (shared by the panel and the pages) ---------- */
  const popularHtml = n => `<p class="pickq">${esc(tr(n > 5 ? "All help answers" : "Popular questions"))}</p>${/* html: answers built with esc() */ CertHub.help.slice(0, n).map(h => answerHtml(h, false)).join("")}`;
  // opts.all: list every help answer (the Help page) instead of the five most asked.
  function boxHtml(p, opts = {}) {
    const n = opts.all ? CertHub.help.length : 5;
    return `<label for="${esc(p)}search" class="sr-only">${esc(tr("Search help"))}</label>
        <input type="search" id="${esc(p)}search" class="textin supsearch" data-n="${/* num */ n}" placeholder="${esc(tr("Search help, e.g. backup, Spanish, labs"))}" autocomplete="off">
        <div id="${esc(p)}results" class="supresults" aria-live="polite">${/* html: built with esc() */ popularHtml(n)}</div>
        ${aiOn() ? `<div class="supchat">
          <p class="pickq">${esc(tr("Ask the assistant"))}</p>
          <div id="${esc(p)}log" class="suplog" role="log" aria-live="polite" aria-label="${esc(tr("Conversation with the assistant"))}"></div>
          <form id="${esc(p)}form" class="supform" novalidate>
            <label for="${esc(p)}q" class="sr-only">${esc(tr("Your question"))}</label>
            <textarea id="${esc(p)}q" class="textin supq" rows="2" maxlength="1500" placeholder="${esc(tr("Ask about the site or an exam topic…"))}"></textarea>
            ${TS_KEY ? `<div id="${esc(p)}-ts" class="tsbox"></div>` : ""}
            <div class="btns"><button type="submit" class="btn sm">${esc(tr("Send"))}</button><button type="button" class="btn ghost sm" data-supact="new">${esc(tr("New chat"))}</button></div>
            <p class="note" id="${esc(p)}msg-status" role="status"></p>
          </form>
          <p class="note">${esc(tr("AI answers can be wrong: check important details, like exam rules, with the exam provider. Chats aren't saved."))}</p>
        </div>` : `<p class="note supmore">${esc(tr("Still stuck?"))} <a href="#settings.about" data-supnav>${esc(tr("Report a problem"))}</a></p>`}`;
  }
  // Put a help box inside a page element (the home page card and the Help page).
  function embed(node, p, opts = {}) {
    if (!node) return;
    node.dataset.sup = p; node.dataset.all = opts.all ? "1" : "";
    node.innerHTML = boxHtml(p, opts);
    renderChat(); turnstile(p);
  }

  /* ---------- the floating panel ---------- */
  let opener = null;
  const panelHtml = () => `<div class="suphead"><h2 id="suptitle">${esc(tr("Help"))}</h2><button type="button" class="suphide" data-supact="close" aria-label="${esc(tr("Close help"))}">✕</button></div>
      <div class="supbody" data-sup="sup">${/* html: built with esc() */ boxHtml("sup")}</div>`;
  function open() {
    let panel = $("#supportpanel");
    opener = document.activeElement;
    if (!panel) {
      panel = document.createElement("section");
      panel.id = "supportpanel"; panel.className = "supportpanel"; panel.setAttribute("role", "dialog"); panel.setAttribute("aria-labelledby", "suptitle");
      document.body.appendChild(panel);
    }
    panel.innerHTML = panelHtml(); panel.hidden = false;
    const b = $("#helpbtn"); if (b) b.setAttribute("aria-expanded", "true");
    renderChat(); turnstile("sup");
    setTimeout(() => { const s = $("#supsearch"); if (s) s.focus(); }, 0);
  }
  function close() {
    const panel = $("#supportpanel"); if (!panel || panel.hidden) return;
    panel.hidden = true;
    const b = $("#helpbtn"); if (b) { b.setAttribute("aria-expanded", "false"); }
    (opener && opener !== document.body && document.contains(opener) ? opener : b || document.body).focus();
  }

  document.addEventListener("input", e => {
    if (!e.target.classList || !e.target.classList.contains("supsearch")) return;
    const p = prefixOf(e.target), box = el(p, "results"), text = e.target.value.trim();
    if (!box) return;
    if (!text) { box.innerHTML = popularHtml(+e.target.dataset.n || 5); return; }
    const hits = search(text);
    box.innerHTML = hits.length ? hits.map((h, i) => answerHtml(h, i === 0)).join("")
      : `<p class="note">${esc(tr(aiOn() ? "No matching help answer. Ask the assistant below." : "No matching help answer. Try other words, or report a problem."))}</p>`;
  });
  document.addEventListener("submit", e => {
    if (!e.target.classList || !e.target.classList.contains("supform")) return;
    e.preventDefault();
    const p = prefixOf(e.target), q = el(p, "q"), text = q.value.trim();
    if (!text) { status(p, tr("Type a question first.")); q.focus(); return; }
    q.value = ""; ask(p, text);
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && $("#supportpanel") && !$("#supportpanel").hidden && !document.querySelector(".modal-wrap")) close();
    if (e.key === "Enter" && !e.shiftKey && e.target.classList && e.target.classList.contains("supq")) { e.preventDefault(); e.target.form.requestSubmit(); }
  });
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-supact]");
    if (a && a.dataset.supact === "close") close();
    if (a && a.dataset.supact === "new") { const p = prefixOf(a); chat = []; save(chat); renderChat(); status(p, ""); const q = el(p, "q"); if (q) q.focus(); }
    // Following a link to a page of the site closes the panel on small screens so the page is visible.
    if (e.target.closest("#supportpanel [data-supnav]") && window.innerWidth < 700) setTimeout(close, 0);
  });

  // The assistant becomes available once the site learns the API has it on (the first /v1/me answer): redraw every
  // help box that's showing without it.
  document.addEventListener("certhub:me", () => {
    if (!aiOn()) return;
    const panel = $("#supportpanel");
    if (panel && !panel.hidden && !$("#supform")) { panel.innerHTML = panelHtml(); turnstile("sup"); }
    document.querySelectorAll("[data-sup]:not(.supbody)").forEach(node => { if (!node.querySelector(".supform")) embed(node, node.dataset.sup, { all: node.dataset.all === "1" }); });
    renderChat();
  });

  CertHub.support = { open, close, embed, md, search };
})();
