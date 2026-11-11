/**
 * Agytorna – beágyazó kód bármely weboldalhoz
 * --------------------------------------------------------------
 * Használat (WordPress „Egyéni HTML” blokk, Elementor HTML widget,
 * vagy bármilyen sima HTML oldal):
 *
 *   <div data-agytorna></div>
 *   <script src="https://AGYTORNA-CIME/embed.js" async></script>
 *
 * A teszt egy iframe-ben fut a központi címről, így minden oldalon
 * ugyanaz a verzió, és az adatok (oklevélkérés, hozzájárulás) egy
 * helyre futnak be. Az iframe magassága automatikusan igazodik.
 *
 * Opcionális attribútumok a <div>-en:
 *   data-offset="80"   – ragadós fejléc magassága px-ben (görgetéshez)
 *   data-src="..."     – egyedi cím (alapból az embed.js melletti index.html)
 */
(function () {
  var script = document.currentScript;
  var base = script ? script.src.replace(/[^/]*$/, '') : '';
  var origin = base ? new URL(base).origin : '*';

  function init(host) {
    if (host.getAttribute('data-agytorna-ready')) return;
    host.setAttribute('data-agytorna-ready', '1');

    var src = host.getAttribute('data-src') || base + 'index.html';
    // honnan jött a látogató – később statisztikához használható
    src += (src.indexOf('?') < 0 ? '?' : '&') + 'embed=1&ref=' + encodeURIComponent(location.hostname);

    var frame = document.createElement('iframe');
    frame.src = src;
    frame.title = 'Agytorna – interaktív gondolkodási kihívás';
    frame.setAttribute('allow', 'web-share; clipboard-write');
    frame.setAttribute('loading', 'lazy');
    frame.style.cssText = 'display:block;width:100%;border:0;height:900px;border-radius:18px;background:#0b0820;overflow:hidden;';
    host.innerHTML = '';
    host.appendChild(frame);

    window.addEventListener('message', function (e) {
      if (e.source !== frame.contentWindow) return;
      if (origin !== '*' && e.origin !== origin) return;
      var d = e.data || {};
      if (d.source !== 'agytorna') return;

      if (d.type === 'height' && d.height > 200) {
        frame.style.height = d.height + 'px';
      } else if (d.type === 'top') {
        var offset = Number(host.getAttribute('data-offset') || 0);
        var top = frame.getBoundingClientRect().top + window.pageYOffset - offset;
        // csak akkor görgetünk, ha a teszt teteje nem látszik
        var rect = frame.getBoundingClientRect();
        if (rect.top < offset || rect.top > window.innerHeight * 0.4) {
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
        }
      }
    });
  }

  function run() {
    var hosts = document.querySelectorAll('[data-agytorna]');
    for (var i = 0; i < hosts.length; i++) init(hosts[i]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
