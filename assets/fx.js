/* Motion and delight: celebrations (confetti and a badge pop), a fade when you change page or tab, numbers
   that count up, progress rings, loading skeletons and small icons. Everything is decoration: it respects the
   "reduce motion" setting (no confetti, no count-up, no fades), and nothing here is needed to use the site.
   Loaded right after core.js; other scripts call CertHub.fx. */
(function () {
  const esc = CertHub.U.esc;
  // Reduced motion: the device setting, or "Reduce motion" in Settings → Accessibility.
  const calm = () => document.documentElement.getAttribute("data-motion") === "reduce" || !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
  const css = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  /* ---------- celebrations ---------- */
  function confetti() {
    if (calm() || document.hidden) return;
    const c = document.createElement("canvas");
    c.className = "fx-confetti"; c.setAttribute("aria-hidden", "true");
    const dpr = Math.min(2, window.devicePixelRatio || 1), W = innerWidth, H = innerHeight;
    c.width = W * dpr; c.height = H * dpr;
    document.body.appendChild(c);
    const g = c.getContext("2d"); if (!g) { c.remove(); return; }
    g.scale(dpr, dpr);
    const colors = ["--accent", "--d1", "--d2", "--d3", "--d4", "--d5", "--d7"].map(css).filter(Boolean);
    const bits = Array.from({ length: Math.min(160, Math.round(W / 6)) }, (_, i) => ({
      x: W / 2 + (Math.random() - .5) * W * .3, y: H * .35, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4,
      w: 6 + Math.random() * 6, h: 8 + Math.random() * 8, r: Math.random() * 6, vr: (Math.random() - .5) * .3, col: colors[i % colors.length]
    }));
    const t0 = performance.now();
    (function frame(t) {
      const age = t - t0; g.clearRect(0, 0, W, H);
      bits.forEach(b => {
        b.vy += .35; b.vx *= .99; b.x += b.vx; b.y += b.vy; b.r += b.vr;
        g.save(); g.translate(b.x, b.y); g.rotate(b.r); g.globalAlpha = Math.max(0, 1 - age / 2600);
        g.fillStyle = b.col; g.fillRect(-b.w / 2, -b.h / 2, b.w, b.h * Math.abs(Math.cos(b.r * 2))); g.restore();
      });
      if (age < 2600) requestAnimationFrame(frame); else c.remove();
    })(t0);
  }
  // A medal that pops in with a title and a line of detail, announced to screen readers, then fades.
  function celebrate({ title, sub = "" }) {
    confetti(); sound("win");
    document.querySelectorAll(".fx-pop").forEach(x => x.remove());
    const box = document.createElement("div");
    box.className = "fx-pop"; box.setAttribute("role", "status");
    box.innerHTML = `${icon("medal")}<div><strong></strong><span></span></div>`;
    box.querySelector("strong").textContent = title;
    box.querySelector("span").textContent = sub;
    document.body.appendChild(box);
    setTimeout(() => box.classList.add("out"), 3400);
    setTimeout(() => box.remove(), 4000);
  }

  /* ---------- page and tab changes fade in ---------- */
  window.addEventListener("hashchange", () => {
    const app = document.getElementById("app"); if (!app || calm()) return;
    app.classList.remove("fx-enter"); void app.offsetWidth; app.classList.add("fx-enter");
  });

  /* ---------- numbers that count up: <span data-count="87">87</span> ---------- */
  function countUp(el) {
    const to = +el.dataset.count; delete el.dataset.count;
    if (!isFinite(to) || calm() || to <= 1) return;
    const t0 = performance.now(), dur = 700;
    (function step(t) {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(to * e);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  const scan = n => { if (n.nodeType !== 1) return; if (n.dataset && n.dataset.count != null) countUp(n); n.querySelectorAll("[data-count]").forEach(countUp); };
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(scan))).observe(document.documentElement, { childList: true, subtree: true });

  /* ---------- building blocks for views ---------- */
  // A progress ring around a number: pct 0-100, color a CSS color (usually a var()), inner is markup.
  function ring(pct, color, inner) {
    const p = Math.max(0, Math.min(100, Math.round(+pct || 0)));
    return `<span class="ring" data-style="--p:${p};--rc:${esc(color)}"><svg viewBox="0 0 36 36" aria-hidden="true" focusable="false"><circle class="rbg" cx="18" cy="18" r="15.9155"/><circle class="rfg" cx="18" cy="18" r="15.9155" pathLength="100"/></svg><span class="rnum">${/* html: callers pass escaped markup */ inner}</span></span>`;
  }
  // Shimmering placeholder lines while something loads; the text is for screen readers.
  const skeleton = (lines = 3) => `<div class="skel" role="status" aria-busy="true"><span class="sr-only">Loading…</span>${Array.from({ length: Math.max(1, Math.min(8, lines)) }, () => "<i></i>").join("")}</div>`;

  // Small line icons (24x24, drawn with the current text color).
  const ICONS = {
    all: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    cybersecurity: '<path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
    network: '<circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="18" r="2.2"/><path d="M12 7.2v4.3M12 11.5L6.5 16.2M12 11.5l5.5 4.7"/>',
    software: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    secadmin: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 018 0v2.5M12 14.5v2.5"/>',
    sysadmin: '<rect x="4" y="4" width="16" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="16" height="6.5" rx="1.5"/><path d="M7.5 7.2h.01M7.5 16.7h.01M11 7.2h5M11 16.7h5"/>',
    cloud: '<path d="M7 18.5h10.5a4 4 0 00.6-7.95A6 6 0 006.4 9.1 4.7 4.7 0 007 18.5z"/>',
    "data-ai": '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    medal: '<circle cx="12" cy="14.5" r="5.5"/><path d="M9 3l3 6 3-6M12 12v5M10.5 13.5l1.5-1.5"/>',
    flame: '<path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.4 2.4-5.4 3.6-8.3.6 1.9 1.6 2.9 2.8 3.4C12 7.3 13 4.6 15.4 3c-.3 3.6 3.1 5.8 3.1 11.2C18.5 18.4 15.9 21 12 21z"/>'
  };
  const icon = (name, cls = "") => `<svg class="ico ${esc(cls)}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${/* html: fixed SVG shapes defined above */ ICONS[name] || ICONS.all}</svg>`;

  /* ---------- share cards: a square image of a score, for social posts ---------- */
  // Resolves "var(--ok)" and similar to the color the page is using right now.
  const color = c => { const m = /^var\((--[\w-]+)\)$/.exec(c || ""); return (m ? css(m[1]) : c) || "#2D5BD0"; };
  function drawCard({ kicker, title, pct, ringColor, big, line1, line2 }) {
    const T = s => (CertHub.i18n && CertHub.i18n.t ? CertHub.i18n.t(s) : s);
    [title, line1, line2] = [title, line1, line2].map(T);
    const S = 1080, cv = document.createElement("canvas"); cv.width = cv.height = S;
    const g = cv.getContext("2d"); if (!g) return null;
    const grad = g.createLinearGradient(0, 0, S, S); grad.addColorStop(0, "#131B26"); grad.addColorStop(1, "#24407F");
    g.fillStyle = grad; g.fillRect(0, 0, S, S);
    const font = (w, px) => `${w} ${px}px "Public Sans", system-ui, sans-serif`;
    const fit = (text, w, px, max) => { let t = String(text || ""); g.font = font(w, px); while (t.length > 1 && g.measureText(t).width > max) t = t.slice(0, -2) + "…"; return t; };
    g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "alphabetic";
    g.font = font(700, 40); g.fillText("StudyToCert", S / 2, 110);
    g.fillStyle = "rgba(255,255,255,.75)"; g.fillText(fit(kicker, 600, 38, S - 160), S / 2, 180);
    // The ring: a faint full circle and the score's arc, starting at the top.
    const cx = S / 2, cy = 470, r = 200;
    g.lineWidth = 36; g.lineCap = "round";
    g.strokeStyle = "rgba(255,255,255,.14)"; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke();
    const p = Math.max(0, Math.min(100, +pct || 0));
    if (p > 0) { g.strokeStyle = color(ringColor); g.beginPath(); g.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p / 100); g.stroke(); }
    g.fillStyle = "#fff"; g.textBaseline = "middle"; g.font = font(800, 130); g.fillText(String(big), cx, cy + 6);
    g.textBaseline = "alphabetic";
    g.fillText(fit(title, 800, 66, S - 140), S / 2, 800);
    g.fillStyle = "rgba(255,255,255,.85)"; g.fillText(fit(line1, 500, 40, S - 160), S / 2, 870);
    g.fillStyle = "rgba(255,255,255,.6)"; g.fillText(fit(line2, 400, 32, S - 160), S / 2, 1000);
    return cv;
  }
  // Opens the phone's share sheet with the image, or downloads it where sharing files isn't supported.
  function shareCard(opts) {
    const cv = drawCard(opts); if (!cv) return;
    const name = (opts.file || "studytocert-score") + ".png";
    cv.toBlob(async b => {
      if (!b) return;
      const file = typeof File === "function" ? new File([b], name, { type: "image/png" }) : null;
      const data = { files: file ? [file] : [], title: "StudyToCert", text: opts.text || "" };
      if (file && navigator.canShare && navigator.canShare(data)) {
        try { await navigator.share(data); return; } catch (e) { if (e && e.name === "AbortError") return; }
      }
      const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = name;
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      if (CertHub.ui && CertHub.ui.toast) CertHub.ui.toast("Image saved. Add it to your post.");
    }, "image/png");
  }

  /* ---------- sounds (off unless turned on in Appearance; silent when reduce motion is on) ---------- */
  let actx = null;
  const soundOn = () => CertHub.store.get("certhub:sound") === "on" && !calm();
  // Short tones made in the browser: no audio files to download.
  function sound(kind) {
    if (!soundOn()) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const notes = { right: [[660, 0], [880, .08]], wrong: [[220, 0], [180, .09]], win: [[523, 0], [659, .1], [784, .2], [1047, .3]], tick: [[1200, 0]] }[kind] || [];
      const t0 = actx.currentTime + .01;
      notes.forEach(([f, at]) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = kind === "wrong" ? "triangle" : "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t0 + at); g.gain.exponentialRampToValueAtTime(kind === "tick" ? .04 : .12, t0 + at + .015); g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + (kind === "win" ? .35 : .18));
        o.connect(g).connect(actx.destination); o.start(t0 + at); o.stop(t0 + at + .4);
      });
    } catch (e) {}
  }

  CertHub.fx = { celebrate, confetti, ring, skeleton, icon, calm, shareCard, drawCard, sound, soundOn };
})();
