/**
 * Agytorna – adatkezelés (demó napló + opcionális háttérrendszer)
 * --------------------------------------------------------------
 * DEMÓ MÓD (config.backend.enabled = false):
 *   Semmilyen adat nem hagyja el a böngészőt. Az oklevélkérés és a
 *   marketing-hozzájárulás KÜLÖN naplóba kerül a böngésző localStorage-ába,
 *   hogy a működés bemutatható legyen.
 * ÉLES MÓD:
 *   A rekordok + a PDF a beállított végpontra mennek (lásd api/send-certificate.php).
 */
window.AP15 = window.AP15 || {};

AP15.store = (function () {
  var KEY = 'ap15_demo_log_v1';

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && v.certificates && v.marketingConsents) return v;
    } catch (e) { /* privát mód vagy tiltott tárolás */ }
    return { certificates: [], marketingConsents: [] };
  }

  function write(log) {
    try { localStorage.setItem(KEY, JSON.stringify(log)); } catch (e) {}
  }

  /** Oklevélkérés naplózása (a teljesítéshez szükséges adatok) */
  function live() { return !!(AP15.config.backend && AP15.config.backend.enabled); }

  function logCertificate(rec) {
    if (live()) return; // élesben a szerver naplóz, a böngészőben nem tárolunk személyes adatot
    var log = read();
    log.certificates.push(rec);
    write(log);
  }

  /** Marketing-hozzájárulás külön naplózása időbélyeggel */
  function logMarketingConsent(rec) {
    if (live()) return;
    var log = read();
    log.marketingConsents.push(rec);
    write(log);
  }

  function clear() {
    try { localStorage.removeItem(KEY); } catch (e) {}
  }

  function blobToBase64(blob) {
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onload = function () { resolve(String(r.result).split(',')[1]); };
      r.onerror = reject;
      r.readAsDataURL(blob);
    });
  }

  /**
   * Oklevél e-mailes küldése a háttérrendszeren keresztül.
   * @returns {Promise<{ok:boolean,demo?:boolean,message?:string}>}
   */
  function sendCertificate(payload, pdfBlob) {
    var cfg = AP15.config.backend;
    if (!cfg || !cfg.enabled) return Promise.resolve({ ok: true, demo: true });

    return blobToBase64(pdfBlob).then(function (b64) {
      return fetch(cfg.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign({}, payload, { pdfBase64: b64 }))
      });
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (j) {
        return { ok: res.ok && j.ok !== false, message: j.message };
      });
    }).catch(function () {
      return { ok: false, message: 'Nem sikerült kapcsolódni a szerverhez.' };
    });
  }

  /**
   * Névtelen kitöltésszámláló (kezdés / befejezés témánként). Nem küld személyes
   * adatot, sütit nem használ; csak összesített számlálót növel a szerveren.
   */
  function stat(event, pack, score) {
    var url = AP15.config.statsEndpoint;
    if (!url) return;
    var body = JSON.stringify({ event: event, pack: pack, score: typeof score === 'number' ? score : null });
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }))) return;
    } catch (e) {}
    try { fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }); } catch (e) {}
  }

  return {
    stat: stat,
    read: read,
    logCertificate: logCertificate,
    logMarketingConsent: logMarketingConsent,
    clear: clear,
    sendCertificate: sendCertificate
  };
})();
