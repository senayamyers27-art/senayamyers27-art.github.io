/* Premium Pro AI tutor window: "Explain with the AI tutor" on missed questions, the AI study coach on the dashboard
   and AI mock interviews on career pages. Loaded on first use by the [data-tutor] buttons (see premium in sync.js).
   Talks to POST /v1/tutor/chat. The conversation lives only in this window: nothing is saved. */
(function () {
  const { U } = CertHub;
  const { esc } = U;
  const TITLES = { explain: "AI Tutor", coach: "AI Study Coach", interview: "AI Mock Interview", resume: "AI Resume Review", writeup: "AI Lab Review", drill: "AI Weak-Spot Practice", path: "AI Career & Certification Advisor" };
  const HINTS = { explain: "Ask a follow-up, or answer the tutor's check question", coach: "Tell the coach what to change, e.g. \"I only have 3 hours this week\"", interview: "Type your answer, or \"finish\" for your feedback", resume: "Ask about a section, or paste a new version", writeup: "Ask for help with a part of your write-up", drill: "Answer A, B, C or D, or ask a question", path: "Ask about a step, or compare two options, e.g. \"cloud or security first?\"" };
  const OPENERS = { explain: "Explain this question for me.", coach: "Make my study plan for the next 7 days.", interview: "I'm ready. Please start the interview.", resume: "Please review my resume for this role.", writeup: "Please review my lab notes and help me turn them into a strong write-up.", drill: "Give me my first practice question.", path: "Recommend a career direction and certification path for me." };

  // Replies are shown as text with a small Markdown subset (bold, code, lists). No links at all.
  function md(text) {
    const inline = s => esc(s)
      .replace(/`([^`]{1,80})`/g, "<code>$1</code>")
      .replace(/\*\*([^*]{1,200})\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]{1,80})\]\([^)]*\)/g, "$1");
    const out = []; let list = null;
    for (const line of String(text).split(/\n/)) {
      const m = /^\s*(?:[-*•]|\d+[.)])\s+(.*)$/.exec(line);
      if (m) { (list = list || []).push(`<li>${inline(m[1])}</li>`); continue; }
      if (list) { out.push(`<ul>${/* html: items built with inline(), which escapes first */ list.join("")}</ul>`); list = null; }
      const h = /^\s*#{1,4}\s+(.*)$/.exec(line);
      if (h) out.push(`<p><strong>${inline(h[1])}</strong></p>`);
      else if (line.trim()) out.push(`<p>${inline(line.trim())}</p>`);
    }
    if (list) out.push(`<ul>${/* html: items built with inline(), which escapes first */ list.join("")}</ul>`);
    return out.join("");
  }

  let open = null; // the window that's showing: { wrap, mode, context, messages, busy, opener }

  function render() {
    const w = open; if (!w) return;
    const log = w.wrap.querySelector(".tutlog");
    // The first message (the mode's opener) isn't shown; the tutor's first reply is.
    log.innerHTML = w.messages.slice(1).map(m => `<div class="tutmsg ${m.role === "user" ? "me" : "ai"}">${m.role === "user" ? `<p>${esc(m.content)}</p>` : md(m.content)}</div>`).join("")
      + (w.busy ? `<div class="tutmsg ai" aria-busy="true"><p class="note">Thinking…</p></div>` : "")
      + (w.error ? `<div class="status warn" role="alert">${esc(w.error)}${w.retry ? ` <button type="button" class="linkbtn" data-tut="retry">Try again</button>` : ""}</div>` : "");
    log.scrollTop = log.scrollHeight;
    const send = w.wrap.querySelector("[data-tut=send]"), box = w.wrap.querySelector("textarea");
    send.disabled = w.busy; box.disabled = w.busy;
  }

  async function ask() {
    const w = open; if (!w || w.busy) return;
    w.busy = true; w.error = ""; w.retry = false; render();
    try {
      const { data } = await CertHub.sync.api("POST", "/v1/tutor/chat", { mode: w.mode, context: w.context, messages: w.messages.slice(-12) });
      if (open !== w) return;
      w.messages.push({ role: "assistant", content: String(data.reply || "") });
    } catch (e) {
      if (open !== w) return;
      w.error = e.status === 402 ? "The AI tutor is part of Premium Pro." : e.message || "The tutor couldn't answer just now.";
      w.retry = e.status !== 402 && e.status !== 400;
    } finally {
      if (open === w) { w.busy = false; render(); const box = w.wrap.querySelector("textarea"); if (!w.error) box.focus(); }
    }
  }

  function close() {
    const w = open; if (!w) return;
    open = null;
    w.wrap.remove();
    document.removeEventListener("keydown", onKey, true);
    if (w.opener && document.contains(w.opener)) w.opener.focus();
  }
  function onKey(e) {
    if (!open) return;
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key === "Tab") {
      const f = [...open.wrap.querySelectorAll("button:not([disabled]), textarea:not([disabled])")];
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  }

  CertHub.tutor = {
    // mode: explain | coach | interview. context: the fields tutor.js on the server expects. subtitle: shown under the title.
    open(mode, context, subtitle, opener) {
      if (!TITLES[mode]) return;
      close();
      const wrap = document.createElement("div");
      wrap.className = "modal-wrap";
      wrap.innerHTML = `<div class="modal wide tutor" role="dialog" aria-modal="true" aria-labelledby="tut-h">
        <div class="tuthead"><div class="grow"><strong id="tut-h">${esc(TITLES[mode])}</strong> <span class="chip premchip">Premium Pro</span><br><span class="note">${esc(subtitle || "")}</span></div>
          <button type="button" class="btn ghost sm" data-tut="close" aria-label="Close">✕</button></div>
        <div class="tutlog" role="log" aria-live="polite"></div>
        <form class="tutform"><label for="tut-in" class="sr-only">Your message</label><textarea id="tut-in" rows="2" maxlength="1500" placeholder="${esc(HINTS[mode])}"></textarea>
          <button type="submit" class="btn sm" data-tut="send">Send</button></form>
        <p class="note tutnote">AI can make mistakes: check important facts against the lessons and the official exam objectives. Nothing you type is saved.</p>
      </div>`;
      document.body.appendChild(wrap);
      open = { wrap, mode, context, messages: [{ role: "user", content: OPENERS[mode] }], busy: false, error: "", opener: opener || document.activeElement };
      document.addEventListener("keydown", onKey, true);
      wrap.addEventListener("click", e => {
        if (e.target === wrap) return close();
        const b = e.target.closest("[data-tut]"); if (!b) return;
        if (b.dataset.tut === "close") close();
        if (b.dataset.tut === "retry") ask();
      });
      wrap.querySelector("form").addEventListener("submit", e => {
        e.preventDefault();
        const box = wrap.querySelector("textarea"), text = box.value.trim();
        if (!text || !open || open.busy) return;
        // A failed turn is replaced rather than stacked, so the conversation keeps alternating.
        if (open.messages.length > 1 && open.messages[open.messages.length - 1].role === "user") open.messages.pop();
        open.messages.push({ role: "user", content: text.slice(0, 1500) });
        box.value = "";
        ask();
      });
      wrap.querySelector("textarea").addEventListener("keydown", e => {
        if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); wrap.querySelector("form").requestSubmit(); }
      });
      wrap.querySelector("[data-tut=close]").focus();
      ask();
    }
  };
})();
