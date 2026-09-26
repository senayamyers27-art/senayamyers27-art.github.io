/* Policy pages: privacy, terms of use and security. Shown at #privacy, #terms and #security
   (and at /privacy/, /terms/, /security/ on the real site). Keep these accurate: they describe
   what the code actually does, so update them whenever storage, hosting or tracking changes. */
(function () {
  const EFFECTIVE = "September 26, 2026";
  const SITE = "StudyToCert";
  const U = CertHub.U;
  const contact = () => `<a href="https://github.com/senayamyers27-art/Claude.ai-stuff/security/advisories/new" target="_blank" rel="noopener">GitHub private reporting</a>`;

  // Accounts exist only when site.config.json sets apiOrigin; the policies describe whichever is true.
  const accounts = () => !!(CertHub.site && CertHub.site.apiUrl);
  const counts = () => !!(CertHub.site && CertHub.site.analytics);

  function accountPrivacy() {
    return `<h2>Optional accounts</h2>
    <p>You can use everything without an account. If you choose to create one, we store on our server (a Cloudflare Worker with a Cloudflare D1 database):</p>
    <ul>
      <li>Your email address, used to send sign-in links and nothing else (no newsletters unless you ask)</li>
      <li>A copy of your study progress and lab progress, including lab notes, so it can sync between your devices</li>
      <li>One cookie, <code>__Host-cs_session</code>, that keeps you signed in for up to 30 days. It is secure, HTTP-only and not used for tracking. The site stores only a hash of it.</li>
      <li>If you buy Pro or a group plan: a Stripe customer ID and your plan status. Payment details are handled by Stripe; we never see card numbers.</li>
      <li>If you join an organization through an invite: your membership. Instructors of your cohort can see your email and progress numbers (questions answered, accuracy, days checked, labs finished, last test score and last activity). They cannot see your lab notes.</li>
      <li>If you join a class with a teacher's join code: the name you choose for that class and, only if you tick the box, your email address. Nothing is shared until you read what the teacher will see and agree to it. From then on the teacher sees a progress summary computed from your synced progress: which certifications you study and, for each, exam readiness, lessons read, best practice exam score, questions answered, hands-on exercises done and when you were last active, plus how many labs you've finished. Teachers never see your answers, review queue, lab notes or write-ups. You can leave a class at any time on the Account page, which stops sharing immediately; a teacher can also remove you or delete the class.</li>
      <li>If you teach a class: its name, the name you show students, its join code and who has joined.</li>
      <li>A security log of account events (sign-in, billing and organization changes) with the time and IP address, kept to investigate abuse.</li>
    </ul>
    <p>Sign-in emails are sent through our email provider (Resend). On the Account page you can download all your account data or delete your account at any time. Deleting it removes your server data and cancels any subscription; progress on your own device stays until you clear it.</p>`;
  }

  function privacy() {
    return `<h1>Privacy Policy</h1>
    <p class="meta">Effective ${EFFECTIVE}</p>
    <div class="status notice"><strong>Short version:</strong> ${accounts()
      ? `${SITE} has no ads and no tracking${counts() ? ", and counts page views without cookies or personal data" : " and no analytics"}. Without an account your study progress and lab notes stay in your own browser. Accounts are optional; if you create one, we store your email and a synced copy of your progress, and nothing else about you. If you join a teacher's class, the teacher sees a summary of your progress, only after you agree, until you leave.`
      : `${SITE} has no accounts, no cookies, no ads and no tracking${counts() ? ". It counts page views without cookies or personal data" : ", and no analytics"}. Your study progress and lab notes stay in your own browser. We never receive them.`}</div>
    <div class="prose">
    <h2>What this policy covers</h2>
    <p>This policy explains what information ${SITE} (“the site”, “we”) handles when you use the study plans, quizzes, labs and portfolio pages.</p>

    <h2>Information stored in your browser</h2>
    <p>To remember your progress, the site saves the following in your browser's local storage on your device:</p>
    <ul>
      <li>Study plan start and exam dates you set, and which study days you checked off</li>
      <li>Quiz and test results, accuracy by domain, and your spaced-review queue</li>
      <li>Lab progress: steps and checks you ticked, when you finished a lab, and the notes you type</li>
      <li>Your light or dark theme choice</li>
    </ul>
    <p>${accounts() ? "Unless you sign in to sync it (see Optional accounts below), this" : "This"} data never leaves your device unless you choose to move it. It is not sent to us or to anyone else. Clearing your browser's site data deletes it. Anyone with access to your device and browser profile can see it, so don't put passwords, API keys or other secrets in lab notes.</p>

    <h2>Backups you create</h2>
    <p>“Download backup” and “Copy backup” produce a file or text containing the data above. It goes only where you save or paste it. “Restore” reads a backup you choose back into your browser.</p>

    <h2>Offline copy</h2>
    <p>The site uses a service worker to keep a copy of its own pages, scripts, fonts and question banks on your device so it works offline. It caches only the site's files, not your data.</p>

    ${accounts() ? accountPrivacy() : ""}
    <h2>What we don't collect</h2>
    <ul>
      ${accounts() ? `<li>No passwords or profiles; an email address only if you create an account, and a display name only for classes you join or teach</li>
      <li>No cookies except the sign-in cookie for people who create an account</li>` : `<li>No accounts, names, email addresses or passwords</li>
      <li>No cookies</li>`}
      <li>No advertising, social media or tracking scripts, and no fingerprinting${counts() ? "" : ", and no analytics"}</li>
      <li>No requests to other websites: fonts and all other files are served from this site${accounts() ? " (signed-in accounts also talk to the site's own account service)" : ""}${counts() ? ", apart from the page counter below" : ""}</li>
    </ul>
    ${counts() ? `<h2>Page counts</h2>
    <p>To learn which study plans and lessons people use, the site tells GoatCounter, a privacy-friendly counter, which page was opened, its title and the site that linked to it. GoatCounter sets no cookies, doesn't track you across sites and doesn't store your IP address. It isn't told anything about your answers or progress. If your browser sends "Do Not Track" or Global Privacy Control, nothing is counted.</p>` : ""}

    <h2>Hosting and server logs</h2>
    <p>The site is hosted on Cloudflare Pages. Like any web host, Cloudflare processes technical request data such as IP address, browser user agent, the page requested and time, to deliver the site and protect it from abuse. We don't use this data to identify or profile visitors. Cloudflare's handling is described in the <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">Cloudflare Privacy Policy</a>.</p>

    <h2>Donations</h2>
    <p>If you choose to donate through the Support page, the payment is handled entirely by that donation service under its own terms and privacy policy. We never see card details; we receive only what that service shares with creators (typically your name or a message, if you choose to include them).</p>

    <h2>Links to other sites</h2>
    <p>Labs and exam pages link to official documentation and vendor sites (for example CompTIA, ISC2, Cisco, NIST and tool vendors). Those sites have their own privacy practices. Labs that use cloud services (such as AWS) or third-party tools involve accounts you create with those providers under their terms.</p>

    <h2>Children</h2>
    <p>The site is intended for adults and students preparing for professional certifications. It is not directed to children under 13${accounts() ? "" : ", and it does not knowingly collect personal information from anyone"}.</p>
    ${accounts() ? `<p>Accounts are only for people aged 13 or older, or the minimum age for consenting to online services where you live if that is higher (up to 16 in some EU countries). We don't knowingly collect personal information from children under 13. If you believe a child has created an account, contact us and we will delete it. Studying without an account needs no personal information at all.</p>` : ""}

    <h2>Your choices</h2>
    <p>You can view, back up, restore or erase your data at any time: use the backup and reset options on the Progress tab or home page, or clear this site's data in your browser settings.</p>

    <h2>Changes</h2>
    <p>If this policy changes, the new version will be posted here with a new effective date. Material changes, such as any new data collection, will be announced on the home page first.</p>

    <h2>Contact</h2>
    <p>Questions about privacy or security: ${contact()}.</p>
    </div>`;
  }

  function terms() {
    return `<h1>Terms of Use</h1>
    <p class="meta">Effective ${EFFECTIVE}</p>
    <div class="prose">
    <p>By using ${SITE} you agree to these terms. If you don't agree, please don't use the site.</p>

    <h2>1. Educational use</h2>
    <p>The site provides free study plans, practice questions and hands-on lab instructions for learning cybersecurity and preparing for certification exams. It is for personal, non-commercial educational use.</p>

    <h2>2. Lab safety and authorized use only</h2>
    <p>Many labs involve scanning networks, capturing traffic, running vulnerable systems or analyzing security data. You agree to:</p>
    <ul>
      <li><strong>Only test systems you own or have written permission to test.</strong> Scanning, capturing traffic on, or attempting to access systems without authorization may be illegal, including under the U.S. Computer Fraud and Abuse Act and state laws.</li>
      <li>Run vulnerable machines, honeypots and sample data only inside an isolated lab network, never exposed to the internet or a shared network.</li>
      <li>Follow the safety notes in each lab, and the terms of any service you use (for example cloud providers, practice platforms and sample-data sites).</li>
      <li>Watch your own costs: some labs use free tiers of paid services. You are responsible for any charges on your accounts.</li>
    </ul>
    <p>You are solely responsible for how you use the instructions and for any consequences.</p>

    <h2>3. No affiliation and trademarks</h2>
    <p>${SITE} is independent. It is not affiliated with, endorsed by or sponsored by CompTIA, Cisco, ISC2 or any tool vendor. Security+, CySA+, Network+, CCNA, SSCP, CC, CISSP and other names are trademarks of their respective owners and are used only to identify the exams.</p>

    <h2>4. Accuracy and no guarantee</h2>
    <p>Exam objectives, domain weights, formats and dates change. We work to keep content current and show when each exam's details were last checked, but we can't guarantee that questions, plans or lab steps are complete, current or error-free, or that using the site will lead to passing an exam. Always confirm details with the official exam objectives. Practice questions are original study material, not actual exam questions.</p>

    <h2>5. Your content</h2>
    <p>Notes, write-ups and portfolio text you create belong to you. They are stored in your browser${accounts() ? ", and on our server only if you sign in to sync them," : ""} (see the <a href="#privacy">Privacy Policy</a>).${accounts() ? " You let us store and copy them only to sync them to your devices." : ""}</p>
    ${accounts() ? `<h2>5a. Accounts and paid plans</h2>
    <p>Accounts are optional. You must be at least 13 years old to create one, or older where local law sets a higher age for consenting to online services. Keep your email account secure, since sign-in links go there. Pro and group plans renew automatically until cancelled; you can cancel any time from Manage billing and keep access until the end of the paid period. If you're not happy with Pro, ask within 7 days of your first payment for a full refund. Prices and taxes are shown at checkout by Stripe. Organization owners are responsible for inviting only people who agreed to share their progress numbers with instructors. We may suspend accounts that abuse the service.</p>` : ""}

    <h2>6. Acceptable use</h2>
    <p>Don't try to disrupt the site or its hosting, bypass its security controls, or use automated tools to overload it. If you find a security issue, please report it privately (see the <a href="#security">Security</a> page).</p>

    <h2>7. Disclaimer of warranties</h2>
    <p>The site and all content are provided “as is” and “as available”, without warranties of any kind, express or implied, including fitness for a particular purpose and non-infringement.</p>

    <h2>8. Limitation of liability</h2>
    <p>To the fullest extent permitted by law, the site's owner is not liable for any indirect, incidental, special or consequential damages, or for any loss of data, systems, profits or exam fees, arising from your use of the site or its lab instructions.</p>

    <h2>9. Changes and termination</h2>
    <p>We may update these terms or change or discontinue the site at any time. Updated terms take effect when posted here with a new effective date.</p>

    <h2>10. Governing law</h2>
    <p>These terms are governed by the laws of the State of Texas, United States, without regard to conflict-of-law rules.</p>

    <h2>Contact</h2>
    <p>${contact()}.</p>
    </div>`;
  }

  function security() {
    const row = (what, how) => `<tr><td><strong>${what}</strong></td><td>${how}</td></tr>`;
    return `<h1>Security</h1>
    <p class="meta">How ${SITE} protects visitors, and how to report a problem. Last reviewed ${EFFECTIVE}.</p>
    <div class="status notice">${accounts()
      ? "Without an account the site stores nothing about you on a server. Optional accounts are protected as described under Accounts below."
      : "The site stores nothing about you on a server: there are no accounts, no database and no cookies. That removes most of the risks a typical website has."}</div>
    <h2>In the browser</h2>
    <div class="scroll" tabindex="0" role="region" aria-label="Table (scrolls sideways on small screens)"><table class="sectable"><tbody>
      ${row("Content Security Policy", "Scripts, styles, fonts and connections are allowed only from the site itself. No inline scripts, <code>eval</code> or third-party code. Plugins (<code>object-src</code>) are blocked.")}
      ${row("No third parties", counts() ? "Fonts are self-hosted and there are no ads or CDNs. The only outside service is a cookie-free page counter (see the Privacy Policy). An automated check fails if any page loads code from another site." : "Fonts are self-hosted and there are no analytics, ads or CDNs, so no outside service sees your visits. An automated test fails if any page requests another site.")}
      ${row("Output escaping", "All content is escaped before it's placed on the page, which prevents injected HTML or script (XSS). A lint check blocks unescaped values.")}
      ${row("Clickjacking protection", "<code>frame-ancestors 'none'</code> and <code>X-Frame-Options: DENY</code> stop other sites from framing the pages.")}
      ${row("Isolation headers", "<code>Cross-Origin-Opener-Policy</code> and <code>Cross-Origin-Resource-Policy: same-origin</code>, <code>X-Content-Type-Options: nosniff</code>, a strict <code>Referrer-Policy</code>, and a <code>Permissions-Policy</code> that turns off camera, microphone, location, payment and USB access.")}
      ${row("Local data only", accounts() ? "Progress and notes stay in your browser's storage. Nothing is uploaded unless you sign in to sync." : "Progress and notes stay in your browser's storage. Nothing is uploaded.")}
    </tbody></table></div>
    ${accounts() ? `<h2>Accounts</h2>
    <div class="scroll" tabindex="0" role="region" aria-label="Table (scrolls sideways on small screens)"><table class="sectable"><tbody>
      ${row("No passwords", "Sign-in uses one-time email links that expire in 15 minutes. Only a SHA-256 hash of each link and session token is stored, so a database leak can't be used to sign in.")}
      ${row("Session cookie", "<code>__Host-</code> prefixed, <code>Secure</code>, <code>HttpOnly</code>, <code>SameSite=Lax</code>, 30-day sliding expiry; signing out deletes it on the server.")}
      ${row("Request forgery", "Every change must come from the site's own origin; the API allows cross-origin requests only from the site.")}
      ${row("Abuse limits", "Sign-in links are rate-limited per IP address and per email, and request sizes are capped.")}
      ${row("Access control", "Every query is scoped to the signed-in user. Instructors see progress numbers for their own cohorts only, never lab notes. CSV exports are protected against spreadsheet formula injection.")}
      ${row("Payments", "Handled by Stripe Checkout. Webhooks are verified with Stripe's signature and processed once; plans are decided on the server, never in the browser.")}
      ${row("Your control", "Download everything the server holds about you, or delete your account, from the Account page.")}
    </tbody></table></div>` : ""}
    <h2>In transit</h2>
    <div class="scroll" tabindex="0" role="region" aria-label="Table (scrolls sideways on small screens)"><table class="sectable"><tbody>
      ${row("HTTPS everywhere", "Every <code>http://</code> request is redirected to <code>https://</code> (301), and pages upgrade any insecure request.")}
      ${row("HSTS", "<code>Strict-Transport-Security</code> for two years including subdomains, so browsers refuse plain HTTP after the first visit.")}
      ${row("Modern TLS", "TLS 1.2 minimum and TLS 1.3 enabled; TLS 1.0 and 1.1 are refused. Certificates are issued and renewed automatically by Cloudflare.")}
      ${row("One canonical address", "<code>www</code> and the Cloudflare preview address redirect to the main domain; preview builds are hidden from search engines.")}
    </tbody></table></div>
    <h2>In development and operations</h2>
    <div class="scroll" tabindex="0" role="region" aria-label="Table (scrolls sideways on small screens)"><table class="sectable"><tbody>
      ${row("Checks on every change", "Automated CI validates content, runs a security lint (CSP, inline scripts, insecure links, escaping), audits dependencies and runs a browser test of every page before anything can deploy.")}
      ${row("Code and secret scanning", "CodeQL static analysis and gitleaks secret scanning run on the repository.")}
      ${row("Dependency updates", "Dependabot opens updates for build tools and GitHub Actions weekly; actions are pinned to exact commit SHAs.")}
      ${row("Least-privilege automation", "Workflows run with read-only permissions by default; deploy tokens are stored as encrypted secrets and never exposed to pull-request code.")}
      ${row("Daily live monitoring", "A daily job checks HTTPS, redirects, security headers, certificate validity and that old TLS versions are refused, and alerts on any failure.")}
      ${row("Configuration drift", "A weekly job checks the Cloudflare HTTPS/TLS settings and DNSSEC and can restore them.")}
    </tbody></table></div>
    <h2>Report a vulnerability</h2>
    <p>Please report security issues privately through ${contact()} rather than a public issue. Include steps to reproduce. You'll get a response as soon as possible, and fixes are credited if you like. A machine-readable contact is at <a href="/.well-known/security.txt">/.well-known/security.txt</a>.</p>
    <p class="note">Please don't run automated scanners or load tests against the live site.</p>`;
  }

  function install() {
    const I = CertHub.install, plat = I.platform();
    const framed = document.documentElement.classList.contains("framed");
    const state = I.installed()
      ? `<div class="status notice"><strong>You're using the installed app.</strong> It works offline and updates itself when a new version is published.</div>`
      : framed
      ? `<div class="status warn"><strong>This is a preview copy.</strong> To install, open the live site in your phone's browser (Safari on iPhone, Chrome on Android) and follow the steps below.</div>`
      : I.prompt
      ? `<div class="btns"><button type="button" class="btn" data-gact="install">Install StudyToCert</button></div>`
      : "";
    const step = (n, t) => `<li><strong>${n}</strong> ${t}</li>`;
    return `<h1>Install the app</h1>
    <p class="meta">Add ${SITE} to your phone's home screen. It opens full screen like any app, works with no connection, and keeps your progress, lab notes and portfolio on the device.</p>
    ${state}
    ${[["ios", `    <h2${plat === "ios" ? ' class="here"' : ""}>iPhone or iPad</h2>
    <ol class="steps-list plain">
      ${step("Open the site in Safari.", "Installing works from Safari (and from Chrome or Edge on iOS 16.4 and later).")}
      ${step("Tap the Share button", "(the square with an arrow pointing up) at the bottom of the screen, or at the top on iPad.")}
      ${step("Scroll down and tap “Add to Home Screen”.", "If you don't see it, tap “Edit Actions” and add it.")}
      ${step("Tap “Add”.", "The StudyToCert icon appears on your home screen.")}
    </ol>
    <p class="note">On iPhone the installed app keeps its own storage, separate from Safari. If you already studied in Safari, use <strong>Copy backup</strong> there, then <strong>Restore from text</strong> in the app.</p>
`], ["android", `    <h2${plat === "android" ? ' class="here"' : ""}>Android</h2>
    <ol class="steps-list plain">
      ${step("Open the site in Chrome.", "Samsung Internet and Edge work the same way.")}
      ${step("Tap “Install” if a banner or the button above appears.", "Otherwise tap the ⋮ menu at the top right.")}
      ${step("Tap “Install app” (or “Add to Home screen”), then “Install”.", "The app appears in your app drawer and on your home screen.")}
    </ol>
`], ["desktop", `    <h2${plat === "desktop" ? ' class="here"' : ""}>Computer (Chrome or Edge)</h2>
    <ol class="steps-list plain">
      ${step("Look for the install icon", "(a monitor with a down arrow) at the right end of the address bar, or open the browser menu.")}
      ${step("Choose “Install StudyToCert”.", "It opens in its own window and appears with your other apps.")}
    </ol>
`]].sort((x, y) => (y[0] === plat) - (x[0] === plat)).map(x => x[1]).join("")}
    <h2>Good to know</h2>
    <ul class="clean">
      <li>No app store or account needed, and nothing to pay.</li>
      <li>Updates arrive automatically; when one is ready you'll see “Update now”.</li>
      <li>Removing the app removes its saved progress, so back up first.</li>
    </ul>`;
  }

  function support() {
    const site = CertHub.site || {}, sup = site.support || {};
    const donate = sup.url
      ? `<div class="panel donate"><strong>Donate</strong><p>If the plans or labs helped you, a small donation covers the domain and hosting and funds new labs and questions. Payments are handled by ${U.esc(sup.label || "the donation service")}; this site never sees your payment details.</p><div class="btns"><a class="btn" href="${U.esc(sup.url)}" target="_blank" rel="noopener">Donate${sup.label ? ` on ${U.esc(sup.label)}` : ""}</a></div></div>`
      : "";
    const shareUrl = location.origin && /^https:/.test(location.origin) ? location.origin + "/" : "";
    return `<h1>Support this site</h1>
    <p class="meta">${SITE} is free, with no ads, no accounts and no tracking. Here's how you can help keep it that way.</p>
    ${donate}
    <h2>Share it</h2>
    <p>Send it to classmates, your bootcamp cohort or anyone studying for a certification. Word of mouth is the biggest help.</p>
    ${shareUrl ? `<div class="btns"><button type="button" class="btn ghost" data-gact="share">Share the site</button></div>` : ""}
    <h2>Report mistakes and suggest labs</h2>
    <p>Found a wrong answer, a lab command that doesn't work on your system, or a topic you want covered? ${site.feedbackUrl ? `<a href="${U.esc(site.feedbackUrl)}" target="_blank" rel="noopener">Open an issue on GitHub</a>` : "Let us know"} with the page and what you saw. Security problems go to the <a href="#security">Security</a> page instead.</p>
    <h2>Show your work</h2>
    <p>Finished labs make a strong portfolio. If you publish yours, mentioning where you practiced helps others find the site.</p>`;
  }

  CertHub.policyViews = { privacy, terms, security, install, support };
})();
