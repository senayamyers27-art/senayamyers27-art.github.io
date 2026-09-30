/* StudyToCert for iOS and Android. The apps (Capacitor, see ../../mobile/) bundle this site; mobile/build-www.js
   adds this file to the app's copy of index.html, right after theme.js, so it runs before the other scripts. On the
   website it isn't loaded, and if it were it would do nothing (there is no native bridge).
   It sets window.CertHubNative, which the site's scripts check to:
   - sign in with the code from the sign-in email and keep the session as a bearer token (the site's cookie can't
     reach the app);
   - follow the stores' rules for paid plans: in the US the app may link to the website to subscribe; elsewhere it
     shows no prices, buy buttons or links, and members sign in to use a plan they already have;
   - use the phone for study reminders (a daily notification), sharing, saving files and the Android back button;
   - skip the service worker and "Install App" (the app is already installed and its files are on the phone). */
(function () {
  "use strict";
  var Cap = window.Capacitor;
  if (!Cap || typeof Cap.isNativePlatform !== "function" || !Cap.isNativePlatform()) return;
  var P = Cap.Plugins || {};
  var script = document.currentScript;
  var WEB = (script && script.getAttribute("data-web")) || "https://www.studytocert.com";
  var TOKEN_KEY = "certhub:apptoken", REMINDER_KEY = "certhub:appreminder";
  var get = function (k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } };
  var set = function (k, v) { try { if (v) localStorage.setItem(k, v); else localStorage.removeItem(k); } catch (e) {} };

  // The device's region (from its language setting, e.g. en-US). Only an explicit region counts: "en" alone
  // doesn't mean the US. Store rules allow a link to buy on the website only in the US storefront.
  var region = "";
  try { region = (new Intl.Locale(navigator.language || "").region || "").toUpperCase(); } catch (e) {}

  var N = window.CertHubNative = {
    platform: Cap.getPlatform(),
    web: WEB,
    webPurchase: region === "US",
    token: function () { return get(TOKEN_KEY); },
    setToken: function (t) { set(TOKEN_KEY, /^[0-9a-f]{64}$/.test(t || "") ? t : ""); },
    // Opens a page of the website in the phone's browser (in-app browser sheet).
    openWeb: function (path) { return N.openUrl(WEB + (path || "/")); },
    openUrl: function (url) {
      if (!/^https:\/\//.test(url)) return Promise.resolve();
      return P.Browser ? P.Browser.open({ url: url }) : Promise.resolve(window.open(url, "_blank"));
    },
    // Saves a file (backup, calendar event, CSV) by handing it to the share sheet: Files, Drive, email and so on.
    saveFile: function (name, text, type) {
      if (!P.Filesystem || !P.Share) return Promise.reject(new Error("Saving files isn't available in this version of the app."));
      var safe = String(name || "file.txt").replace(/[^A-Za-z0-9._-]/g, "_");
      return P.Filesystem.writeFile({ path: safe, data: String(text), directory: "CACHE", encoding: "utf8" })
        .then(function (r) { return P.Share.share({ title: safe, files: [r.uri], dialogTitle: "Save or send " + safe }); })
        .catch(function (e) { if (!/cancel/i.test(String(e && e.message))) throw e; });
    },
    // A daily study reminder as a phone notification, at a time the person picks.
    reminder: function (title) {
      var LN = P.LocalNotifications; if (!LN) return;
      var cur = get(REMINDER_KEY);
      var wrap = document.createElement("div");
      wrap.className = "modal-wrap";
      wrap.innerHTML = '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="nrm-h"><p id="nrm-h"><strong>Daily study reminder</strong><br><span class="note">A notification on this phone every day at the time you choose.</span></p>' +
        '<label for="nrm-time">Time</label> <input type="time" id="nrm-time">' +
        '<div class="btns"><button type="button" class="btn" data-nrm="ok">Remind me</button>' + (cur ? '<button type="button" class="btn ghost" data-nrm="off">Turn off</button>' : "") + '<button type="button" class="btn ghost" data-nrm="cancel">Cancel</button></div></div>';
      wrap.querySelector("#nrm-time").value = cur || "19:00";
      var toast = function (m) { if (window.CertHub && CertHub.ui) CertHub.ui.toast(m); };
      var close = function () { wrap.remove(); };
      wrap.addEventListener("click", function (e) {
        var b = e.target.closest("[data-nrm]"); if (!b && e.target !== wrap) return;
        var act = b && b.dataset.nrm; close();
        if (act === "off") LN.cancel({ notifications: [{ id: 1 }] }).then(function () { set(REMINDER_KEY, ""); toast("Daily reminder turned off."); });
        if (act !== "ok") return;
        var time = wrap.querySelector("#nrm-time").value || "19:00", hm = time.split(":");
        LN.requestPermissions().then(function (p) {
          if (p.display !== "granted") { toast("Allow notifications for StudyToCert in your phone's settings, then try again."); return; }
          return LN.cancel({ notifications: [{ id: 1 }] }).catch(function () {}).then(function () {
            return LN.schedule({ notifications: [{ id: 1, title: "StudyToCert", body: title || "Time to study: a lesson, your review and a quiz.", schedule: { on: { hour: +hm[0], minute: +hm[1] } } }] });
          }).then(function () { set(REMINDER_KEY, time); toast("Daily reminder set for " + time + "."); });
        }).catch(function () { toast("Couldn't set the reminder. Try again."); });
      });
      document.body.appendChild(wrap);
      wrap.querySelector("#nrm-time").focus();
    }
  };

  document.documentElement.classList.add("native-app", "native-" + N.platform);

  // Android WebView has no Web Share API; pass text and links to the share sheet. (Files still use saveFile.)
  if (!navigator.share && P.Share) navigator.share = function (d) {
    if (d && d.files && d.files.length) return Promise.reject(new Error("unsupported"));
    return P.Share.share({ title: d && d.title, text: d && d.text, url: d && d.url });
  };
  navigator.canShare = navigator.canShare || function (d) { return !(d && d.files && d.files.length); };

  // Links to other sites open in the browser. Links to the website's own pages that aren't in the app (comparisons,
  // policies, static lesson pages) open on the website too; the app itself only uses #routes.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]"); if (!a || e.defaultPrevented) return;
    var href = a.getAttribute("href") || "";
    if (/^(#|mailto:|tel:|blob:|data:|javascript:)/i.test(href) || a.hasAttribute("download")) return;
    var u; try { u = new URL(href, location.href); } catch (err) { return; }
    if (u.origin === location.origin) {
      if (u.pathname === "/" || u.pathname === "/index.html") return;
      e.preventDefault(); N.openWeb(u.pathname + u.search + u.hash); return;
    }
    if (/^https?:$/.test(u.protocol)) { e.preventDefault(); N.openUrl(u.href.replace(/^http:/, "https:")); }
  }, true);

  // Android back button: back through the app's pages, then leave the app.
  if (P.App) P.App.addListener("backButton", function (ev) {
    if (document.querySelector(".modal-wrap")) { document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })); return; }
    if (ev && ev.canGoBack) history.back(); else P.App.minimizeApp ? P.App.minimizeApp() : P.App.exitApp();
  });

  if (P.SplashScreen) document.addEventListener("DOMContentLoaded", function () { setTimeout(function () { P.SplashScreen.hide(); }, 150); });
})();
