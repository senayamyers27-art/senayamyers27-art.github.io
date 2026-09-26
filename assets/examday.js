/* Exam-day guides: how each vendor's exams work (scoring, question types, time strategy, check-in,
   online vs test center, retakes) plus general test-taking advice. Data: data/examday.js. */
(function () {
  const { U } = CertHub;
  const { $, esc } = U;
  let data = null;
  CertHub.addExamDay = d => { data = d; };
  // Spanish mode reads data/examday-es.js (same shape) when it exists, and falls back to English.
  const load = () => data ? Promise.resolve(data) : (CertHub.i18n.lang() === "es" ? CertHub.loadScript("data/examday-es.js") : Promise.resolve(false)).then(() => data || CertHub.loadScript("data/examday.js").then(() => data));
  const inline = x => esc(x).replace(/`([^`\n]+)`/g, "<code>$1</code>");
  const vendorOf = certId => data && data.vendors.find(v => v.certs.includes(certId));
  const sections = list => list.map(s => `<h2>${esc(s.h)}</h2><div class="panel"><ul class="clean">${s.points.map(p => `<li>${inline(p)}</li>`).join("")}</ul></div>`).join("");
  function index() {
    return `<h1>Exam-day guides</h1>
    <p class="meta">What to expect on the day, vendor by vendor: how scoring works, the question types, pacing, check-in and what happens after. Always confirm policies on the vendor's official page before you book; they change.</p>
    <div class="cards">${data.vendors.map(v => `<a class="card" href="#exam-day-${esc(v.id)}"><strong>${esc(v.name)}</strong><span class="note">${v.certs.map(id => CertHub.certs[id] ? esc(CertHub.certs[id].short) : "").filter(Boolean).join(", ")}</span></a>`).join("")}</div>
    ${sections(data.general)}`;
  }
  function vendor(v) {
    return `<p class="crumbs"><a href="#exam-day">Exam-day guides</a> / ${esc(v.name)}</p>
    <h1>${esc(v.name)} exam day</h1>
    <p class="meta">${esc(v.intro)}</p>
    <p class="note">Covers: ${v.certs.map(id => CertHub.certs[id] ? `<a href="#${esc(id)}.about">${esc(CertHub.certs[id].short)}</a>` : "").filter(Boolean).join(", ")}</p>
    ${sections(v.sections)}
    <p class="note">Policies change. Check the vendor's candidate handbook and your booking confirmation for the current rules.</p>`;
  }
  CertHub.examDay = {
    vendorOf: id => vendorOf(id),
    load,
    show(head) {
      $("#app").innerHTML = `<p class="note">Loading…</p>`;
      load().then(d => {
        if (!d) { $("#app").innerHTML = `<p class="note">The exam-day guides couldn't load. Check your connection and try again.</p>`; return; }
        const v = head.startsWith("exam-day-") && d.vendors.find(x => x.id === head.slice(9));
        $("#app").innerHTML = v ? vendor(v) : index();
      });
    }
  };
})();
