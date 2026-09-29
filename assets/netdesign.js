/* Network design puzzles (#net-design): a scenario and a network drawn as rows of devices with blank slots.
   Pick the device for each slot, check, and read why each belongs where it does. Network+, Security+, CCNA and A+
   level. Loaded on first visit. */
(function () {
  const { U, store } = CertHub;
  const { $, esc } = U;
  const KEY = "certhub:netdesign";
  const DEVICES = ["Router", "Firewall", "Switch", "Wireless access point", "Load balancer", "IDS sensor", "IPS", "Web server", "Proxy server", "VPN concentrator"];
  // A puzzle: rows of nodes; a node is a fixed label ("Internet") or a slot { id, answer, why }.
  const PUZZLES = [
    { id: "soho", title: "A small office", level: "A+, Network+", text: "A 12-person office gets internet from the ISP's modem. Desktops plug into wall ports, laptops use Wi-Fi, and everything shares one public IP address.",
      rows: [["Internet (ISP modem)", { id: "a", answer: "Router", why: "The router connects the office network to the ISP and does NAT, so every device shares the one public address. In a small office it usually has a firewall built in." },
        { id: "b", answer: "Switch", why: "A switch connects the wired desktops on the same network and forwards frames by MAC address. The router has only a few ports." }, "Desktops"],
        [{ id: "c", answer: "Wireless access point", why: "An access point bridges Wi-Fi clients onto the wired network. It plugs into the switch, so laptops end up on the same network as the desktops." }, "Laptops"]] },
    { id: "dmz", title: "A public website and a private office", level: "Security+, Network+", text: "The company hosts its public website itself. Anyone on the internet must reach the web server, but nobody outside should reach the office PCs, and a compromised web server shouldn't give access to them either.",
      rows: [["Internet", { id: "a", answer: "Firewall", why: "The edge firewall allows only web traffic (TCP 443) from the internet into the screened subnet (DMZ), and nothing from the internet to the internal network." },
        "DMZ", { id: "b", answer: "Web server", why: "Public servers go in the screened subnet (DMZ), separated from the internal network. If the web server is compromised, the firewall still stands between it and the office." }],
        ["DMZ", { id: "c", answer: "Firewall", why: "A second firewall (or a separate interface with its own rules) between the DMZ and the internal network means the web server can't simply reach office PCs. Two layers is defense in depth." }, "Office PCs"]] },
    { id: "ips", title: "Stop attacks, don't just log them", level: "Security+, CySA+", text: "The security team wants to automatically block known attack traffic between the firewall and the core switch, and separately keep a copy of all traffic for investigations without affecting the network if that tool fails.",
      rows: [["Firewall", { id: "a", answer: "IPS", why: "An intrusion prevention system sits inline, so traffic passes through it and it can drop malicious packets. The trade-off: if it fails closed, traffic stops." }, "Core switch"],
        ["Core switch (mirror port)", { id: "b", answer: "IDS sensor", why: "An intrusion detection system receives a copy of traffic from a mirror (SPAN) port or tap. It only alerts, can't block, and can't slow down or break the network if it fails." }]] },
    { id: "loadbalance", title: "Keep the website up during busy periods", level: "Security+, Network+, cloud", text: "One web server can't handle the traffic, and the site must stay up when a server is patched. There are now three identical web servers.",
      rows: [["Internet", "Firewall", { id: "a", answer: "Load balancer", why: "A load balancer spreads requests across the servers and runs health checks, so a server being patched or failing is taken out of rotation. It can also terminate TLS in one place." }],
        [{ id: "b", answer: "Web server", why: "The servers behind the load balancer are identical, so any one of them can answer any request. That's horizontal scaling." }, "Web server", "Web server"]] },
    { id: "remote", title: "Staff working from home", level: "Security+, Network+", text: "Employees at home need to reach internal file shares securely over the internet, and the company wants all staff web browsing filtered and logged.",
      rows: [["Home laptops (VPN client)", "Internet", { id: "a", answer: "VPN concentrator", why: "A VPN concentrator terminates many remote-access VPN tunnels, authenticates users (ideally with MFA) and puts them on the internal network over an encrypted connection." }, "File shares"],
        ["Staff browsers", { id: "b", answer: "Proxy server", why: "A forward proxy makes web requests on behalf of users, so it can filter categories, block known-bad sites, scan downloads and log who visited what." }, "Internet"]] }
  ];
  // Spanish text: title, scenario and the reason for each slot, in slot order.
  const ES = {
    soho: ["Una oficina pequeña", "Una oficina de 12 personas recibe internet del módem del proveedor. Los equipos de escritorio van a las tomas de pared, los portátiles usan Wi-Fi y todo comparte una única dirección IP pública.", [
      "El router conecta la red de la oficina con el proveedor y hace NAT, así que todos los dispositivos comparten la única dirección pública. En una oficina pequeña suele traer un firewall integrado.",
      "Un switch conecta los equipos de escritorio cableados en la misma red y reenvía tramas según la dirección MAC. El router solo tiene unos pocos puertos.",
      "Un punto de acceso une los clientes Wi-Fi a la red cableada. Se conecta al switch, así que los portátiles quedan en la misma red que los equipos de escritorio."]],
    dmz: ["Un sitio web público y una oficina privada", "La empresa aloja su propio sitio web público. Cualquiera en internet debe llegar al servidor web, pero nadie de fuera debe llegar a los equipos de la oficina, y un servidor web comprometido tampoco debería dar acceso a ellos.", [
      "El firewall perimetral solo permite tráfico web (TCP 443) desde internet hacia la subred apantallada (DMZ), y nada desde internet hacia la red interna.",
      "Los servidores públicos van en la subred apantallada (DMZ), separada de la red interna. Si el servidor web se ve comprometido, el firewall sigue entre él y la oficina.",
      "Un segundo firewall (o una interfaz aparte con sus propias reglas) entre la DMZ y la red interna impide que el servidor web llegue sin más a los equipos de la oficina. Dos capas es defensa en profundidad."]],
    ips: ["Detener ataques, no solo registrarlos", "El equipo de seguridad quiere bloquear automáticamente el tráfico de ataques conocidos entre el firewall y el switch principal, y por separado guardar una copia de todo el tráfico para investigaciones sin afectar la red si esa herramienta falla.", [
      "Un sistema de prevención de intrusiones va en línea, así que el tráfico pasa por él y puede descartar paquetes maliciosos. La contrapartida: si falla cerrado, el tráfico se detiene.",
      "Un sistema de detección de intrusiones recibe una copia del tráfico desde un puerto espejo (SPAN) o un tap. Solo alerta, no puede bloquear y no puede ralentizar ni cortar la red si falla."]],
    loadbalance: ["Mantener el sitio web en pie en las horas de más tráfico", "Un servidor web no aguanta el tráfico, y el sitio debe seguir funcionando mientras se parchea un servidor. Ahora hay tres servidores web idénticos.", [
      "Un balanceador de carga reparte las solicitudes entre los servidores y hace comprobaciones de estado, así que un servidor en mantenimiento o caído sale de la rotación. También puede terminar TLS en un solo lugar.",
      "Los servidores detrás del balanceador son idénticos, así que cualquiera puede responder a cualquier solicitud. Eso es escalado horizontal."]],
    remote: ["Personal que trabaja desde casa", "Los empleados en casa necesitan llegar a las carpetas compartidas internas de forma segura por internet, y la empresa quiere filtrar y registrar la navegación web de todo el personal.", [
      "Un concentrador VPN termina muchos túneles VPN de acceso remoto, autentica a los usuarios (idealmente con MFA) y los pone en la red interna mediante una conexión cifrada.",
      "Un proxy de reenvío hace las solicitudes web en nombre de los usuarios, así que puede filtrar categorías, bloquear sitios maliciosos conocidos, analizar descargas y registrar quién visitó qué."]]
  };
  if (CertHub.i18n.lang() === "es") PUZZLES.forEach(p => { const e = ES[p.id]; if (!e) return; p.title = e[0]; p.text = e[1]; p.rows.flat().filter(n => typeof n !== "string").forEach((n, i) => { if (e[2][i]) n.why = e[2][i]; }); });
  const saved = () => { try { return JSON.parse(store.get(KEY) || "{}") || {}; } catch (e) { return {}; } };
  let S = { i: 0, picks: {}, checked: false };

  function nodeHtml(n, p) {
    if (typeof n === "string") return `<div class="nd fixed">${esc(n)}</div>`;
    const v = S.picks[n.id] || "", ok = S.checked && v === n.answer, bad = S.checked && v !== n.answer;
    return `<label class="nd slot${ok ? " right" : bad ? " wrong" : ""}"><span class="sl">${esc(n.id.toUpperCase())}</span><select data-nslot="${esc(n.id)}"${S.checked ? " disabled" : ""}><option value="">Choose…</option>${DEVICES.map(d => `<option${v === d ? " selected" : ""}>${esc(d)}</option>`).join("")}</select></label>`;
  }
  function view() {
    const p = PUZZLES[S.i], done = saved();
    const slots = p.rows.flat().filter(n => typeof n !== "string");
    const right = slots.filter(n => S.picks[n.id] === n.answer).length;
    return `<p class="crumbs"><a href="#labs">Labs</a> / Network design</p><h1>Network design puzzles</h1>
      <p class="meta">Put the right device in each blank. ${PUZZLES.filter(x => done[x.id]).length} of ${PUZZLES.length} solved.</p>
      <div class="panel"><div class="flex"><strong>${esc(S.i + 1)}. ${esc(p.title)}</strong><span class="note">${esc(p.level)}</span></div>
        <p>${esc(p.text)}</p>
        <div class="netdiagram">${p.rows.map(r => `<div class="nrow">${r.map(n => nodeHtml(n, p)).join('<span class="nlink" aria-hidden="true"></span>')}</div>`).join("")}</div>
        ${S.checked ? `<div class="expl" role="status" data-style="--c:${right === slots.length ? "var(--ok)" : "var(--warn)"}"><strong data-ui>${right === slots.length ? "All correct." : `${right} of ${slots.length} correct.`}</strong><ul class="clean">${slots.map(n => `<li><strong>${esc(n.id.toUpperCase())}: ${esc(n.answer)}.</strong> ${esc(n.why)}</li>`).join("")}</ul></div>` : ""}
        <div class="btns">${S.checked ? `<button type="button" class="btn ghost" data-nd="retry">Try again</button>` : `<button type="button" class="btn" data-nd="check">Check my design</button>`}
          ${S.i > 0 ? `<button type="button" class="btn ghost" data-nd="prev">Previous</button>` : ""}${S.i < PUZZLES.length - 1 ? `<button type="button" class="btn ghost" data-nd="next">Next puzzle</button>` : ""}</div></div>`;
  }
  const draw = () => { const b = $("#ndbox"); if (b) b.innerHTML = view(); };
  document.addEventListener("change", e => { const s = e.target.closest("[data-nslot]"); if (s && $("#ndbox")) S.picks[s.dataset.nslot] = s.value; });
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-nd]"); if (!b || !$("#ndbox")) return;
    const a = b.dataset.nd, p = PUZZLES[S.i];
    if (a === "check") {
      S.checked = true;
      const slots = p.rows.flat().filter(n => typeof n !== "string");
      if (slots.every(n => S.picks[n.id] === n.answer)) {
        const d = saved(); d[p.id] = 1; store.set(KEY, JSON.stringify(d)); CertHub.activity.mark(); CertHub.fx.sound("right");
        if (PUZZLES.every(x => d[x.id])) CertHub.fx.celebrate({ title: "Every network designed!", sub: "All five puzzles solved." });
      } else CertHub.fx.sound("wrong");
    }
    if (a === "retry") { S.checked = false; S.picks = {}; }
    if (a === "next" || a === "prev") S = { i: Math.max(0, Math.min(PUZZLES.length - 1, S.i + (a === "next" ? 1 : -1))), picks: {}, checked: false };
    draw();
  });
  function show() { S = { i: 0, picks: {}, checked: false }; $("#app").innerHTML = `<div id="ndbox">${view()}</div>`; return "Network Design Puzzles"; }
  CertHub.netdesign = { show, puzzles: PUZZLES.map(p => ({ id: p.id, answers: p.rows.flat().filter(n => typeof n !== "string").map(n => [n.id, n.answer]) })) };
})();
