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
  let chat = load(), busy = false, tsToken = "", tsWidget = null;
  const bubble = m => `<div class="supmsg ${m.role === "user" ? "me" : "bot"}">${m.role === "user" ? `<p>${esc(m.content)}</p>` : /* html: md() escapes first */ md(m.content)}</div>`;
  function renderChat() {
    const log = $("#suplog"); if (!log) return;
    log.innerHTML = chat.map(bubble).join("") + (busy ? `<div class="supmsg bot typing" aria-label="${esc(tr("The assistant is typing"))}"><span></span><span></span><span></span></div>` : "");
    log.scrollTop = log.scrollHeight;
  }
  function turnstile() {
    const box = $("#sup-ts"); if (!TS_KEY || !box || box.dataset.ready) return;
    box.dataset.ready = "1";
    const go = () => { tsWidget = window.turnstile.render(box, { sitekey: TS_KEY, action: "support", callback: t => { tsToken = t; }, "expired-callback": () => { tsToken = ""; } }); };
    if (window.turnstile) return go();
    const s = document.createElement("script"); s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; s.async = true; s.onload = go; document.head.appendChild(s);
  }
  async function ask(text) {
    if (busy) return;
    const msg = $("#supmsg-status");
    if (TS_KEY && !chat.some(m => m.role === "user") && !tsToken) { msg.textContent = tr("Complete the check that you're not a bot first."); return; }
    chat.push({ role: "user", content: text }); busy = true; save(chat); renderChat(); msg.textContent = "";
    try {
      const res = await fetch(API + "/v1/support/chat", {
        method: "POST", credentials: "omit", cache: "no-store", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chat.map(m => ({ role: m.role, content: m.content })), turnstile: tsToken || undefined })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || tr("The assistant couldn't answer just now. Try again."));
      chat.push({ role: "assistant", content: String(data.reply || "") });
    } catch (e) {
      chat.pop(); // take the question back so it can be sent again
      msg.textContent = e.message || tr("The assistant couldn't answer just now. Try again.");
      const input = $("#supq"); if (input && !input.value) input.value = text;
    }
    busy = false; save(chat); renderChat();
    if (tsWidget != null && window.turnstile) { window.turnstile.reset(tsWidget); tsToken = ""; }
  }

  /* ---------- the panel ---------- */
  let opener = null;
  function panelHtml() {
    const popular = CertHub.help.slice(0, 5).map(h => answerHtml(h, false)).join("");
    return `<div class="suphead"><h2 id="suptitle">${esc(tr("Help"))}</h2><button type="button" class="suphide" data-supact="close" aria-label="${esc(tr("Close help"))}">✕</button></div>
      <div class="supbody">
        <label for="supsearch" class="sr-only">${esc(tr("Search help"))}</label>
        <input type="search" id="supsearch" class="textin" placeholder="${esc(tr("Search help, e.g. backup, Spanish, labs"))}" autocomplete="off">
        <div id="supresults" aria-live="polite"><p class="pickq">${esc(tr("Popular questions"))}</p>${/* html: answers built with esc() */ popular}</div>
        ${aiOn() ? `<div class="supchat">
          <p class="pickq">${esc(tr("Ask the assistant"))}</p>
          <div id="suplog" class="suplog" role="log" aria-live="polite" aria-label="${esc(tr("Conversation with the assistant"))}"></div>
          <form id="supform" novalidate>
            <label for="supq" class="sr-only">${esc(tr("Your question"))}</label>
            <textarea id="supq" class="textin" rows="2" maxlength="1500" placeholder="${esc(tr("Ask about the site or an exam topic…"))}"></textarea>
            ${TS_KEY ? `<div id="sup-ts" class="tsbox"></div>` : ""}
            <div class="btns"><button type="submit" class="btn sm">${esc(tr("Send"))}</button><button type="button" class="btn ghost sm" data-supact="new">${esc(tr("New chat"))}</button></div>
            <p class="note" id="supmsg-status" role="status"></p>
          </form>
          <p class="note">${esc(tr("AI answers can be wrong: check important details, like exam rules, with the exam provider. Chats aren't saved."))}</p>
        </div>` : `<p class="note supmore">${esc(tr("Still stuck?"))} <a href="#settings.about" data-supnav>${esc(tr("Report a problem"))}</a></p>`}
      </div>`;
  }
  function open() {
    let p = $("#supportpanel");
    opener = document.activeElement;
    if (!p) {
      p = document.createElement("section");
      p.id = "supportpanel"; p.className = "supportpanel"; p.setAttribute("role", "dialog"); p.setAttribute("aria-labelledby", "suptitle");
      document.body.appendChild(p);
    }
    p.innerHTML = panelHtml(); p.hidden = false;
    const b = $("#helpbtn"); if (b) b.setAttribute("aria-expanded", "true");
    renderChat(); turnstile();
    setTimeout(() => { const s = $("#supsearch"); if (s) s.focus(); }, 0);
  }
  function close() {
    const p = $("#supportpanel"); if (!p || p.hidden) return;
    p.hidden = true;
    const b = $("#helpbtn"); if (b) { b.setAttribute("aria-expanded", "false"); }
    (opener && opener !== document.body && document.contains(opener) ? opener : b || document.body).focus();
  }

  document.addEventListener("input", e => {
    if (e.target.id !== "supsearch") return;
    const box = $("#supresults"), text = e.target.value.trim();
    if (!text) { box.innerHTML = `<p class="pickq">${esc(tr("Popular questions"))}</p>${/* html: built with esc() */ CertHub.help.slice(0, 5).map(h => answerHtml(h, false)).join("")}`; return; }
    const hits = search(text);
    box.innerHTML = hits.length ? hits.map((h, i) => answerHtml(h, i === 0)).join("")
      : `<p class="note">${esc(tr(aiOn() ? "No matching help answer. Ask the assistant below." : "No matching help answer. Try other words, or report a problem."))}</p>`;
  });
  document.addEventListener("submit", e => {
    if (e.target.id !== "supform") return;
    e.preventDefault();
    const q = $("#supq"), text = q.value.trim();
    if (!text) { $("#supmsg-status").textContent = tr("Type a question first."); q.focus(); return; }
    q.value = ""; ask(text);
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && $("#supportpanel") && !$("#supportpanel").hidden && !document.querySelector(".modal-wrap")) close();
    if (e.key === "Enter" && !e.shiftKey && e.target.id === "supq") { e.preventDefault(); $("#supform").requestSubmit(); }
  });
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-supact]");
    if (a && a.dataset.supact === "close") close();
    if (a && a.dataset.supact === "new") { chat = []; save(chat); renderChat(); $("#supmsg-status").textContent = ""; $("#supq").focus(); }
    // Following a link to a page of the site closes the panel on small screens so the page is visible.
    if (e.target.closest("[data-supnav]") && window.innerWidth < 700) setTimeout(close, 0);
  });

  // The assistant becomes available once the site learns the API has it on (the first /v1/me answer).
  document.addEventListener("certhub:me", () => { const p = $("#supportpanel"); if (p && !p.hidden && aiOn() && !$("#supform")) { p.innerHTML = panelHtml(); renderChat(); turnstile(); } });

  CertHub.support = { open, close, md, search };
})();
