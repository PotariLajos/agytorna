/**
 * Agytorna – alkalmazás (képernyők, folyamat, interakciók)
 * --------------------------------------------------------------
 * Folyamat: Landing → 15 kérdés → Eredmény → Oklevéladatok →
 *           Oklevél (PDF + e-mail) → Eredménykártya → Skool-ajánlat
 *
 * Indítás: AP15.mount(document.getElementById('agytorna'))
 * A teljes felület ebbe az egy elembe renderelődik, így WordPress
 * shortcode-ba is beilleszthető (lásd wordpress/agytorna.php).
 */
window.AP15 = window.AP15 || {};

(function () {
  var root;
  var state;
  // Csak az embed.js által létrehozott iframe-ben (…?embed=1) váltunk beágyazott módra
  var embedded = /[?&]embed=1\b/.test(location.search) &&
    (function () { try { return window.self !== window.top; } catch (e) { return true; } })();
  var exitArmed = 0;
  var forcedPack = null; // ha a téma rögzítve van (?pack= / data-pack), nincs témaválasztó

  function pickerPacks() {
    if (forcedPack) return [];
    return (AP15.config.packs || []).filter(function (id) { return AP15.packs[id]; });
  }

  /** Beágyazott módban (iframe) üzenet a befogadó oldalnak – lásd embed.js */
  function tellParent(type, data) {
    if (!embedded) return;
    try { window.parent.postMessage(Object.assign({ source: 'agytorna', type: type }, data || {}), '*'); } catch (e) {}
  }

  var LETTERS = ['A', 'B', 'C', 'D'];

  function freshState() {
    return {
      screen: 'landing',
      index: 0,
      questions: [],
      answers: [],
      selected: null,
      locked: false,
      startedAt: null,
      finishedAt: null,
      result: null,
      feedback: null,
      cert: null,
      pdfBlob: null,
      shareBlob: null
    };
  }

  /* ---------------- segédek ---------------- */

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function $(sel, ctx) { return (ctx || root).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || root).querySelectorAll(sel)); }

  function logoSvg(size) {
    size = size || 40;
    return '<svg class="ap15-logo-mark" width="' + size + '" height="' + size + '" viewBox="0 0 100 100" aria-hidden="true">' +
      '<defs><linearGradient id="ap15lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c3aed"/><stop offset="1" stop-color="#14b8c9"/></linearGradient>' +
      '<linearGradient id="ap15gd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a8761e"/><stop offset=".4" stop-color="#f6d58a"/><stop offset="1" stop-color="#d9a43a"/></linearGradient></defs>' +
      '<polygon points="93.3,75 50,100 6.7,75 6.7,25 50,0 93.3,25" transform="translate(50 50) scale(.9) translate(-50 -50)" fill="url(#ap15lg)" stroke="url(#ap15gd)" stroke-width="5"/>' +
      '<text x="50" y="63" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="800" font-size="40" fill="#fff">15</text></svg>';
  }

  function header() {
    return '<header class="ap15-header"><button class="ap15-brand" data-action="home" aria-label="Agytorna – kezdőlap">' +
      logoSvg(36) + '<span>Agy<b>torna</b></span></button>' +
      (AP15.config.backend.enabled ? '' : '<span class="ap15-demo-pill" title="A prototípus nem küld adatot szerverre">DEMÓ</span>') +
      '</header>';
  }

  function show(html, opts) {
    opts = opts || {};
    root.innerHTML = '<div class="ap15-bg" aria-hidden="true"><i></i><i></i><i></i></div>' +
      header() + '<main class="ap15-screen ap15-screen--' + state.screen + '">' + html + '</main>' +
      '<footer class="ap15-footer">' + esc(AP15.config.brand) + ' · ' + esc(AP15.pack.disclaimer || '') + '</footer>';
    if (!opts.keepScroll && embedded) {
      tellParent('top');
    } else if (!opts.keepScroll) {
      var top = root.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: Math.max(0, top - 0), behavior: 'auto' });
    }
    var focusEl = $('[data-autofocus]');
    if (focusEl) focusEl.focus({ preventScroll: true });
  }

  function formatDuration(ms) {
    var s = Math.max(0, Math.round(ms / 1000));
    var m = Math.floor(s / 60);
    return m ? m + ' perc ' + (s % 60) + ' mp' : s + ' mp';
  }

  function huDate(d) {
    return d.toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function makeCertId(date) {
    var abc = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var bytes = new Uint8Array(8);
    (window.crypto || window.msCrypto).getRandomValues(bytes);
    var rnd = Array.from(bytes).map(function (b) { return abc[b % abc.length]; }).join('');
    var y = String(date.getFullYear()).slice(2);
    var m = ('0' + (date.getMonth() + 1)).slice(-2);
    var d = ('0' + date.getDate()).slice(-2);
    return AP15.config.certificatePrefix + '-' + y + m + d + '-' + rnd.slice(0, 4) + '-' + rnd.slice(4);
  }

  /* Claude-artifact környezetben a böngészős letöltés tiltott; ott a
     platform mentési funkcióját használjuk. Normál weboldalon sima letöltés. */
  var downloadsCap = null;
  function getDownloads() {
    if (!window.claude || typeof window.claude.use !== 'function') return Promise.resolve(null);
    if (!downloadsCap) downloadsCap = Promise.resolve(window.claude.use('downloads')).catch(function () { return null; });
    return downloadsCap;
  }

  function downloadBlob(blob, filename) {
    getDownloads().then(function (d) {
      if (!d) return plainDownload(blob, filename);
      d.save({ filename: filename, data: blob }).catch(function (err) {
        if (err && err.code === 'declined') return;
        if (err && err.code === 'rate_limited') { toast('Már nyitva van egy mentési ablak.', 2400); return; }
        toast('A mentés ebben a nézetben nem érhető el.', 2800);
      });
    });
  }

  function plainDownload(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function slug(s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'oklevel';
  }

  function toast(text, ms) {
    var t = document.createElement('div');
    t.className = 'ap15-toast';
    t.setAttribute('role', 'status');
    t.innerHTML = text;
    root.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('is-in'); });
    setTimeout(function () {
      t.classList.remove('is-in');
      setTimeout(function () { t.remove(); }, 400);
    }, ms || 1800);
  }

  /* ---------------- 1. LANDING ---------------- */

  function renderLanding() {
    state.screen = 'landing';
    var list = pickerPacks();
    if (list.length > 1) { renderPicker(list); return; }
    var L = AP15.pack.landing;
    var feats = L.features;
    var n = AP15.pack.slots.length;
    var cats = Object.keys(AP15.categories).map(function (k) {
      var c = AP15.categories[k];
      return '<li style="--c:' + c.color + '"><span>' + c.icon + '</span>' + esc(c.name) + '</li>';
    }).join('');

    show(
      '<section class="ap15-hero">' +
        '<div class="ap15-hero-badge"><span class="ap15-dot"></span> Ingyenes gondolkodási kihívás · regisztráció nélkül</div>' +
        '<h1 class="ap15-title" tabindex="-1" data-autofocus>' + esc(L.titleLead) + ' <span class="ap15-grad">' + esc(L.titleAccent) + '</span></h1>' +
        '<p class="ap15-subtitle">' + esc(L.subtitle) + '</p>' +
        '<p class="ap15-lead">' + esc(L.lead) + '</p>' +
        '<ul class="ap15-features">' + feats.map(function (f, i) {
          return '<li style="--i:' + i + '"><span class="ap15-feat-ico">' + f[0] + '</span>' + f[1] + '</li>';
        }).join('') + '</ul>' +
        '<button class="ap15-btn ap15-btn--cta ap15-btn--xl" data-action="start">INDÍTOM A TESZTET <span aria-hidden="true">→</span></button>' +
        '<p class="ap15-fineprint">Nem kell regisztrálni. Saját fejlesztésű, játékos képességfelmérő – nem hiteles IQ-mérés.</p>' +
      '</section>' +
      '<section class="ap15-how">' +
        '<h2>Mit mér a kihívás?</h2>' +
        '<ul class="ap15-cat-list">' + cats + '</ul>' +
        '<ol class="ap15-steps">' +
          '<li><b>1</b><span>Válaszolj ' + n + ' kérdésre, három egyre nehezebb körben. Újrakezdéskor új kérdéseket kapsz!</span></li>' +
          '<li><b>2</b><span>Nézd meg a részletes, ingyenes eredményedet.</span></li>' +
          '<li><b>3</b><span>Töltsd le a személyre szóló digitális oklevelet.</span></li>' +
        '</ol>' +
      '</section>'
    );
  }

  /* ---------------- 1/B. TÉMAVÁLASZTÓ ---------------- */

  function renderPicker(list) {
    // a nyitóoldal a fő (alapértelmezett) csomag szövegeit használja
    var main = AP15.packs[AP15.config.pack] || AP15.packs[list[0]];
    AP15.activatePack(main.id);
    var L = main.landing;

    var cards = list.map(function (id, i) {
      var p = AP15.packs[id];
      var cats = Object.keys(p.categories).map(function (k) {
        return '<li>' + p.categories[k].icon + ' ' + esc(p.categories[k].short || p.categories[k].name) + '</li>';
      }).join('');
      var first = p.categories[Object.keys(p.categories)[0]].color;
      return '<article class="ap15-pack-card" style="--c:' + first + ';--i:' + i + '">' +
        '<div class="ap15-pack-head"><span class="ap15-pack-ico" aria-hidden="true">' + p.icon + '</span>' +
        '<h3>' + esc(p.title) + '</h3></div>' +
        '<p>' + esc(p.cardDesc) + '</p>' +
        '<ul class="ap15-pack-cats" aria-label="Témakörök">' + cats + '</ul>' +
        '<button class="ap15-btn ap15-btn--cta ap15-btn--block" data-action="start" data-pack="' + esc(id) + '">INDÍTOM A TESZTET <span aria-hidden="true">→</span></button>' +
      '</article>';
    }).join('');

    show(
      '<section class="ap15-hero ap15-hero--picker">' +
        '<div class="ap15-hero-badge"><span class="ap15-dot"></span> Ingyenes kihívások · regisztráció nélkül</div>' +
        '<h1 class="ap15-title" tabindex="-1" data-autofocus>' + esc(L.titleLead) + ' <span class="ap15-grad">' + esc(L.titleAccent) + '</span></h1>' +
        '<p class="ap15-subtitle">' + esc(L.subtitle) + '</p>' +
        '<p class="ap15-lead">Válaszd ki, miben mérnéd össze magad: gondolkodás, mesterséges intelligencia vagy szabadúszás. Derítsd ki, hogyan teljesítesz!</p>' +
        '<ul class="ap15-features">' + L.features.map(function (f, i) {
          return '<li style="--i:' + i + '"><span class="ap15-feat-ico">' + f[0] + '</span>' + f[1] + '</li>';
        }).join('') + '</ul>' +
      '</section>' +
      '<section class="ap15-picker" aria-labelledby="ap15-picker-h">' +
        '<h2 id="ap15-picker-h">Válassz kihívást!</h2>' +
        '<div class="ap15-pack-grid">' + cards + '</div>' +
        '<p class="ap15-fineprint">Nem kell regisztrálni. Minden kihívás saját fejlesztésű, játékos felmérés – nem hivatalos vizsga vagy IQ-mérés.</p>' +
      '</section>' +
      '<section class="ap15-how">' +
        '<ol class="ap15-steps">' +
          '<li><b>1</b><span>Válassz témát, és válaszolj 15 kérdésre, három egyre nehezebb körben.</span></li>' +
          '<li><b>2</b><span>Nézd meg a részletes, ingyenes eredményedet.</span></li>' +
          '<li><b>3</b><span>Töltsd le a személyre szóló digitális oklevelet.</span></li>' +
        '</ol>' +
      '</section>'
    );
  }

  /* ---------------- 2. KVÍZ ---------------- */

  function startQuiz() {
    state = freshState();
    var draw = AP15.drawQuestions();
    state.questions = draw.questions;
    state.screen = 'quiz';
    state.startedAt = Date.now();
    renderQuestion();
    startTimer();
    if (draw.reshuffled) toast('🌟 <b>Minden kérdést láttál már!</b> Mostantól újra keverjük őket.', 3200);
  }

  /* --- óra a teszt alatt (csak tájékoztató, a pontszámba nem számít) --- */
  var timerId = null;
  function timerHidden() {
    try { return localStorage.getItem('ap15_timer_hidden') === '1'; } catch (e) { return false; }
  }
  function clock(ms) {
    var s = Math.max(0, Math.floor(ms / 1000));
    return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
  }
  function updateTimer() {
    var el = root.querySelector('[data-timer]');
    if (el && state.startedAt) el.textContent = clock(Date.now() - state.startedAt);
  }
  function startTimer() { stopTimer(); timerId = setInterval(updateTimer, 1000); }
  function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; }
  function toggleTimer(btn) {
    var hide = !btn.classList.contains('is-hidden');
    try { localStorage.setItem('ap15_timer_hidden', hide ? '1' : '0'); } catch (e) {}
    btn.classList.toggle('is-hidden', hide);
    btn.setAttribute('aria-pressed', String(!hide));
    btn.title = hide ? 'Idő mutatása' : 'Idő elrejtése';
  }

  function renderQuestion(opts) {
    state.screen = 'quiz';
    var i = state.index;
    var q = state.questions[i];
    var total = state.questions.length;
    var cat = AP15.categories[q.category];
    var round = AP15.pack.rounds[q.level];
    var tHidden = timerHidden();
    var isLast = i === total - 1;

    var segs = state.questions.map(function (_, j) {
      return '<span class="' + (j < i ? 'is-done' : j === i ? 'is-current' : '') + '"></span>';
    }).join('');

    var options = q.options.map(function (o, j) {
      var sel = state.selected === j;
      return '<button type="button" class="ap15-option' + (sel ? ' is-selected' : '') + '" role="radio" aria-checked="' + sel + '" data-option="' + j + '" style="--i:' + j + '">' +
        '<span class="ap15-option-letter">' + LETTERS[j] + '</span>' +
        '<span class="ap15-option-text">' + esc(o) + '</span>' +
        '<span class="ap15-option-check" aria-hidden="true">✓</span></button>';
    }).join('');

    show(
      '<div class="ap15-quiz">' +
        '<div class="ap15-progress" aria-live="polite">' +
          '<div class="ap15-progress-top">' +
            '<span class="ap15-progress-count"><b>' + (i + 1) + '</b>/' + total + '</span>' +
            '<button type="button" class="ap15-timer' + (tHidden ? ' is-hidden' : '') + '" data-action="toggle-timer" aria-pressed="' + !tHidden + '" title="' + (tHidden ? 'Idő mutatása' : 'Idő elrejtése') + '">' +
              '<span aria-hidden="true">⏱</span> <span data-timer>' + clock(Date.now() - state.startedAt) + '</span></button>' +
            '<span class="ap15-round">' + round.label + ' · ' + round.name + '</span>' +
          '</div>' +
          '<div class="ap15-segs" aria-hidden="true">' + segs + '</div>' +
        '</div>' +
        '<article class="ap15-card ap15-qcard' + (opts && opts.enter ? ' is-entering' : '') + '">' +
          '<div class="ap15-chip" style="--c:' + cat.color + '"><span>' + cat.icon + '</span>' + esc(cat.name) +
            '<span class="ap15-diff" aria-label="Nehézség: ' + q.level + '/3">' + [1, 2, 3].map(function (n) { return '<i class="' + (n <= q.level ? 'on' : '') + '"></i>'; }).join('') + '</span></div>' +
          '<h2 class="ap15-question" tabindex="-1" data-autofocus>' + esc(q.text) + '</h2>' +
          (q.visual ? '<div class="ap15-visual">' + esc(q.visual) + '</div>' : '') +
          '<div class="ap15-options" role="radiogroup" aria-label="Válaszlehetőségek">' + options + '</div>' +
          '<div class="ap15-qfoot">' +
            '<span class="ap15-hint">' + (state.selected === null ? 'Válassz egy lehetőséget!' : 'Válaszod rögzítve – mehetünk tovább?') + '</span>' +
            '<button type="button" class="ap15-btn ap15-btn--primary" data-action="next"' + (state.selected === null ? ' disabled' : '') + '>' +
              (isLast ? 'Eredmény megtekintése' : 'Tovább') + ' <span aria-hidden="true">→</span></button>' +
          '</div>' +
        '</article>' +
        '<p class="ap15-kbd-hint">Tipp: billentyűzeten az A–D (vagy 1–4) gombokkal választhatsz, Enterrel léphetsz tovább.</p>' +
      '</div>',
      { keepScroll: opts && opts.keepScroll }
    );
  }

  function selectOption(j) {
    if (state.screen !== 'quiz' || state.locked) return;
    state.selected = j;
    // csak az érintett elemeket frissítjük, hogy ne ugráljon a nézet
    $all('.ap15-option').forEach(function (b) {
      var on = Number(b.getAttribute('data-option')) === j;
      b.classList.toggle('is-selected', on);
      b.setAttribute('aria-checked', on);
    });
    var next = $('[data-action="next"]');
    next.disabled = false;
    $('.ap15-hint').textContent = 'Válaszod rögzítve – mehetünk tovább?';
    if (navigator.vibrate) { try { navigator.vibrate(8); } catch (e) {} }
  }

  function nextQuestion() {
    if (state.selected === null || state.locked) return;
    state.locked = true; // dupla kattintás / dupla válasz ellen
    state.answers[state.index] = state.selected;
    var card = $('.ap15-qcard');
    if (card) card.classList.add('is-leaving');

    setTimeout(function () {
      state.index++;
      state.selected = null;
      state.locked = false;
      if (state.index >= state.questions.length) {
        finishQuiz();
        return;
      }
      renderQuestion({ enter: true });
      if (state.index === 5) toast('🔥 <b>Szuper!</b> Jön a 2. kör – egy kicsit nehezebb.');
      if (state.index === 10) toast('🚀 <b>Utolsó kör!</b> Most jönnek a legnagyobb kihívások.');
    }, 260);
  }

  /* ---------------- 3. KIÉRTÉKELÉS ---------------- */

  function finishQuiz() {
    state.finishedAt = Date.now();
    stopTimer();
    state.result = AP15.computeResult(state.answers, state.questions);
    state.feedback = AP15.buildFeedback(state.result);
    state.screen = 'calculating';
    show(
      '<div class="ap15-calc" role="status">' +
        '<div class="ap15-calc-orb">' + logoSvg(84) + '</div>' +
        '<h2>Eredmény kiszámítása…</h2>' +
        '<ul class="ap15-calc-steps"><li>Válaszok ellenőrzése</li><li>Kategóriák elemzése</li><li>Személyre szabott értékelés</li></ul>' +
      '</div>'
    );
    setTimeout(renderResult, 1900);
  }

  function renderResult() {
    state.screen = 'result';
    var r = state.result, fb = state.feedback;
    var circ = 2 * Math.PI * 88;

    var catRows = Object.keys(r.categories).map(function (k, i) {
      var c = r.categories[k], meta = AP15.categories[k], band = AP15.getBand(c.correct);
      return '<li class="ap15-catrow" style="--c:' + meta.color + ';--i:' + i + '">' +
        '<div class="ap15-catrow-head"><span class="ap15-catrow-name"><span>' + meta.icon + '</span>' + esc(meta.name) + '</span>' +
        '<span class="ap15-catrow-score"><b>' + c.correct + '</b>/' + c.total + '</span></div>' +
        '<div class="ap15-bar"><i style="--w:' + (c.correct / c.total * 100) + '%"></i></div>' +
        '<span class="ap15-band ap15-band--' + band.tone + '">' + band.label + '</span></li>';
    }).join('');

    var review = r.details.map(function (d, i) {
      var q = d.question;
      return '<li class="' + (d.ok ? 'ok' : 'bad') + '">' +
        '<div class="ap15-rv-head"><span class="ap15-rv-num">' + (i + 1) + '</span><span class="ap15-rv-q">' + esc(q.text) + (q.visual ? ' <code>' + esc(q.visual) + '</code>' : '') + '</span><span class="ap15-rv-mark">' + (d.ok ? '✓' : '✗') + '</span></div>' +
        '<div class="ap15-rv-body">' +
          (d.ok ? '' : '<p><span class="lbl">A te válaszod:</span> ' + LETTERS[d.chosen] + ') ' + esc(q.options[d.chosen]) + '</p>') +
          '<p><span class="lbl">Helyes válasz:</span> ' + LETTERS[q.correct] + ') ' + esc(q.options[q.correct]) + '</p>' +
          '<p class="ap15-rv-ex">' + esc(q.explain) + '</p>' +
        '</div></li>';
    }).join('');

    show(
      '<section class="ap15-result">' +
        '<p class="ap15-congrats-kicker">🎉 Kihívás teljesítve</p>' +
        '<h1 class="ap15-congrats" tabindex="-1" data-autofocus>GRATULÁLUNK! SIKERESEN TELJESÍTETTED A KIHÍVÁST!</h1>' +

        '<div class="ap15-card ap15-scorecard">' +
          '<div class="ap15-ring">' +
            '<svg viewBox="0 0 200 200" aria-hidden="true"><defs><linearGradient id="ap15ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset=".5" stop-color="#8b5cf6"/><stop offset="1" stop-color="#f5b942"/></linearGradient></defs>' +
              '<circle cx="100" cy="100" r="88" class="track"/>' +
              '<circle cx="100" cy="100" r="88" class="fill" stroke-dasharray="' + circ.toFixed(1) + '" stroke-dashoffset="' + circ.toFixed(1) + '" data-target="' + (circ * (1 - r.score / r.max)).toFixed(1) + '"/></svg>' +
            '<div class="ap15-ring-text"><b data-count="' + r.score + '">0</b><span>/ ' + r.max + ' pont</span></div>' +
          '</div>' +
          '<div class="ap15-level">' +
            '<span class="ap15-level-label">Teljesítményszinted</span>' +
            '<div class="ap15-level-title"><span class="ap15-level-emoji">' + r.level.emoji + '</span>' + esc(r.level.title) + '</div>' +
            '<div class="ap15-level-scale">' + AP15.levels.map(function (l) {
              return '<span class="' + (l.key === r.level.key ? 'on' : '') + '">' + l.min + '–' + l.max + '</span>';
            }).join('') + '</div>' +
            '<p class="ap15-meta">Kitöltési idő: <b>' + formatDuration(state.finishedAt - state.startedAt) + '</b></p>' +
          '</div>' +
        '</div>' +

        '<div class="ap15-grid2">' +
          '<div class="ap15-card">' +
            '<h2 class="ap15-h2">Eredményed kategóriánként</h2>' +
            '<ul class="ap15-cats">' + catRows + '</ul>' +
            '<p class="ap15-note">Kategóriánként 3 kérdés volt – ezek tájékoztató jelzések, nem végleges értékelések.</p>' +
          '</div>' +
          '<div class="ap15-card">' +
            '<h2 class="ap15-h2">Személyre szabott értékelés</h2>' +
            fb.text.map(function (t, i) { return '<p class="' + (i === fb.text.length - 1 ? 'ap15-note' : 'ap15-p') + '">' + esc(t) + '</p>'; }).join('') +
            '<h3 class="ap15-h3">Fejlesztési javaslatok</h3>' +
            '<ul class="ap15-tips">' + fb.tips.map(function (t) {
              var c = t.cat ? AP15.categories[t.cat] : null;
              return '<li><span class="ap15-tip-ico" style="--c:' + (c ? c.color : '#f5b942') + '">' + (c ? c.icon : '🚀') + '</span>' + esc(t.text) + '</li>';
            }).join('') + '</ul>' +
          '</div>' +
        '</div>' +

        '<div class="ap15-card ap15-cert-cta">' +
          '<div class="ap15-cert-cta-ico" aria-hidden="true">📜</div>' +
          '<div><h2 class="ap15-h2">Kérd a digitális okleveledet!</h2>' +
          '<p class="ap15-p">Elegáns, személyre szóló PDF-oklevél a pontszámoddal, teljesítményszinteddel és egyedi azonosítóval – azonnal letölthető.</p></div>' +
          '<button class="ap15-btn ap15-btn--cta" data-action="to-form">OKLEVELET KÉREK <span aria-hidden="true">→</span></button>' +
        '</div>' +

        '<details class="ap15-card ap15-review"><summary><span>Válaszaid áttekintése és a megoldások</span><span class="ap15-review-count">' + r.score + ' helyes / ' + (r.max - r.score) + ' hibás</span></summary>' +
          '<ol class="ap15-review-list">' + review + '</ol></details>' +

        '<p class="ap15-center"><button class="ap15-link" data-action="restart">↻ Újrakezdem a tesztet (új kérdésekkel)</button>' +
          (pickerPacks().length > 1 ? ' · <button class="ap15-link" data-action="home">Másik kihívást választok</button>' : '') + '</p>' +
      '</section>'
    );
    animateResult();
    AP15.confetti(root);
  }

  function animateResult() {
    var ring = $('.ap15-ring .fill');
    var num = $('[data-count]');
    requestAnimationFrame(function () {
      setTimeout(function () {
        if (ring) ring.style.strokeDashoffset = ring.getAttribute('data-target');
        root.classList.add('ap15-result-in');
      }, 120);
    });
    if (num) {
      var target = Number(num.getAttribute('data-count'));
      var t0 = null;
      var step = function (t) {
        if (!t0) t0 = t;
        var p = Math.min(1, (t - t0) / 1300);
        num.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }

  /* ---------------- 4. OKLEVÉLADATOK ---------------- */

  function renderForm(prefill) {
    state.screen = 'form';
    prefill = prefill || state.cert || { nameMode: 'full', name: '', email: '', marketing: false };
    var r = state.result;

    show(
      '<section class="ap15-formwrap">' +
        '<button class="ap15-link ap15-back" data-action="to-result">← Vissza az eredményhez</button>' +
        '<div class="ap15-card ap15-form-card">' +
          '<div class="ap15-form-head"><span class="ap15-form-ico" aria-hidden="true">📜</span>' +
          '<div><h1 class="ap15-h1" tabindex="-1" data-autofocus>Oklevél igénylése</h1>' +
          '<p class="ap15-p">Eredményed: <b>' + r.score + '/' + r.max + ' pont</b> · ' + esc(r.level.title) + '</p></div></div>' +

          '<form class="ap15-form" novalidate>' +
            '<fieldset class="ap15-field">' +
              '<legend>Milyen név szerepeljen az oklevélen?</legend>' +
              '<div class="ap15-seg" role="radiogroup">' +
                '<label><input type="radio" name="nameMode" value="full"' + (prefill.nameMode !== 'nick' ? ' checked' : '') + '><span>Teljes név</span></label>' +
                '<label><input type="radio" name="nameMode" value="nick"' + (prefill.nameMode === 'nick' ? ' checked' : '') + '><span>Becenév</span></label>' +
              '</div>' +
            '</fieldset>' +
            '<div class="ap15-field">' +
              '<label for="ap15-name" class="ap15-label" data-name-label>' + (prefill.nameMode === 'nick' ? 'Becenév' : 'Teljes név') + '</label>' +
              '<input id="ap15-name" name="name" type="text" maxlength="48" autocomplete="name" placeholder="' + (prefill.nameMode === 'nick' ? 'pl. Agytorna Bajnok' : 'pl. Kovács Anna') + '" value="' + esc(prefill.name) + '" required>' +
              '<span class="ap15-err" data-err="name"></span>' +
            '</div>' +
            '<div class="ap15-field">' +
              '<label for="ap15-email" class="ap15-label">E-mail-cím</label>' +
              '<input id="ap15-email" name="email" type="email" inputmode="email" autocomplete="email" placeholder="nev@pelda.hu" value="' + esc(prefill.email) + '" required>' +
              '<span class="ap15-help">Erre a címre küldjük el az oklevelet PDF-mellékletként.</span>' +
              '<span class="ap15-err" data-err="email"></span>' +
            '</div>' +
            '<label class="ap15-check">' +
              '<input type="checkbox" name="marketing"' + (prefill.marketing ? ' checked' : '') + '>' +
              '<span class="ap15-check-box" aria-hidden="true"></span>' +
              '<span class="ap15-check-text">' + esc(AP15.config.consentText) + ' <em>(Nem kötelező – az oklevelet enélkül is megkapod.)</em></span>' +
            '</label>' +
            '<p class="ap15-privacy">A nevet és az e-mail-címet kizárólag az oklevél elkészítéséhez és elküldéséhez használjuk. ' +
              '<a href="' + esc(AP15.config.privacyUrl) + '" data-action="privacy">Adatkezelési tájékoztató</a> <span class="ap15-tag">helykitöltő</span></p>' +
            (AP15.config.backend.enabled ? '' :
              '<div class="ap15-demo-box"><b>DEMÓ MÓD:</b> nincs beállított háttérrendszer, ezért a megadott adatok nem kerülnek szerverre – csak ebben a böngészőben, bemutató célú naplóban tárolódnak.</div>') +
            '<button type="submit" class="ap15-btn ap15-btn--cta ap15-btn--block">OKLEVÉL ELKÉSZÍTÉSE <span aria-hidden="true">→</span></button>' +
          '</form>' +
        '</div>' +
      '</section>'
    );

    var form = $('.ap15-form');
    $all('input[name="nameMode"]', form).forEach(function (r) {
      r.addEventListener('change', function () {
        var nick = form.nameMode.value === 'nick';
        $('[data-name-label]').textContent = nick ? 'Becenév' : 'Teljes név';
        form.name.placeholder = nick ? 'pl. Agytorna Bajnok' : 'pl. Kovács Anna';
        form.name.autocomplete = nick ? 'nickname' : 'name';
      });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitForm(form);
    });
  }

  function setErr(form, field, msg) {
    var el = $('[data-err="' + field + '"]', form);
    el.textContent = msg || '';
    form[field].classList.toggle('is-invalid', !!msg);
    form[field].setAttribute('aria-invalid', msg ? 'true' : 'false');
  }

  function submitForm(form) {
    var name = form.name.value.trim().replace(/\s+/g, ' ');
    var email = form.email.value.trim();
    var ok = true;

    if (name.length < 2) { setErr(form, 'name', 'Kérjük, adj meg legalább 2 karaktert.'); ok = false; }
    else setErr(form, 'name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setErr(form, 'email', 'Kérjük, érvényes e-mail-címet adj meg.'); ok = false; }
    else setErr(form, 'email');
    if (!ok) {
      var bad = form.querySelector('.is-invalid');
      if (bad) bad.focus();
      return;
    }

    var btn = form.querySelector('[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span class="ap15-spinner"></span> Oklevél készül…';

    var now = new Date();
    state.cert = {
      nameMode: form.nameMode.value,
      name: name,
      email: email,
      marketing: form.marketing.checked,
      id: makeCertId(now),
      date: huDate(now),
      issuedAt: now.toISOString()
    };

    // 1) oklevélkérés naplózása
    AP15.store.logCertificate({
      certId: state.cert.id,
      issuedAt: state.cert.issuedAt,
      pack: AP15.pack.id,
      name: name,
      nameMode: state.cert.nameMode,
      email: email,
      score: state.result.score,
      level: state.result.level.title,
      marketingConsent: state.cert.marketing
    });
    // 2) marketing-hozzájárulás KÜLÖN naplózása, időbélyeggel
    if (state.cert.marketing) {
      AP15.store.logMarketingConsent({
        email: email,
        name: name,
        consent: true,
        consentText: AP15.config.consentText,
        consentVersion: AP15.config.consentVersion,
        timestamp: new Date().toISOString(),
        source: 'agytorna-oklevel-urlap',
        certId: state.cert.id
      });
    }

    buildAssets().then(renderCertificate).catch(function (err) {
      console.error(err);
      btn.disabled = false;
      btn.textContent = 'Újrapróbálom';
      toast('Hiba történt az oklevél készítésekor. Kérjük, próbáld újra!', 3000);
    });
  }

  function buildAssets() {
    var r = state.result, c = state.cert;
    return AP15.graphics.renderCertificate({
      name: c.name, score: r.score, max: r.max, levelTitle: r.level.title, date: c.date, certId: c.id,
      certPhrase: AP15.pack.certPhrase, disclaimer: AP15.pack.disclaimer, congrats: AP15.pack.certCongrats
    }).then(function (cv) {
      state.certPreview = cv.toDataURL('image/jpeg', 0.85);
      state.pdfBlob = AP15.pdf.fromCanvas(cv, {
        widthPt: 841.89, heightPt: 595.28, quality: 0.9,
        title: 'Agytorna oklevél – ' + c.name, author: 'Agytorna'
      });
      return AP15.graphics.renderShareCard({
        name: c.name, score: r.score, max: r.max, levelTitle: r.level.title, categories: r.categories,
        time: formatDuration(state.finishedAt - state.startedAt)
      });
    }).then(function (cv) {
      state.sharePreview = cv.toDataURL('image/png');
      return new Promise(function (res) { cv.toBlob(function (b) { state.shareBlob = b; res(); }, 'image/png'); });
    });
  }

  /* ---------------- 5. OKLEVÉL + MEGOSZTÁS + SKOOL ---------------- */

  function renderCertificate() {
    state.screen = 'certificate';
    var c = state.cert, r = state.result;
    var kb = Math.round(state.pdfBlob.size / 1024);
    var canShareFiles = false;
    try {
      canShareFiles = !!(navigator.canShare && state.shareBlob &&
        navigator.canShare({ files: [new File([state.shareBlob], 'agytorna.png', { type: 'image/png' })] }));
    } catch (e) {}

    show(
      '<section class="ap15-certpage">' +
        '<p class="ap15-congrats-kicker">✨ Elkészült</p>' +
        '<h1 class="ap15-h1 ap15-center" tabindex="-1" data-autofocus>Itt az okleveled, ' + esc(c.name) + '!</h1>' +

        '<div class="ap15-cert-preview"><img src="' + state.certPreview + '" alt="Oklevél ' + esc(c.name) + ' részére: ' + r.score + '/' + r.max + ' pont, ' + esc(r.level.title) + '"></div>' +
        '<div class="ap15-actions">' +
          '<button class="ap15-btn ap15-btn--cta" data-action="download-pdf">⬇ PDF LETÖLTÉSE</button>' +
          '<button class="ap15-btn ap15-btn--ghost" data-action="send-email">✉ Küldés e-mailben</button>' +
        '</div>' +
        '<p class="ap15-meta ap15-center">Azonosító: <b>' + esc(c.id) + '</b> · PDF, A4 fekvő · ' + kb + ' KB</p>' +
        '<div class="ap15-email-status" aria-live="polite"></div>' +

        '<div class="ap15-card ap15-share">' +
          '<div class="ap15-share-img"><img src="' + state.sharePreview + '" alt="Megosztható eredménykártya"></div>' +
          '<div class="ap15-share-body">' +
            '<h2 class="ap15-h2">Oszd meg az eredményed!</h2>' +
            '<p class="ap15-p">Töltsd le az eredménykártyát, és tedd ki a közösségi oldaladra vagy küldd el a barátaidnak – vajon ők mennyit érnek el?</p>' +
            '<div class="ap15-actions ap15-actions--left">' +
              (canShareFiles ? '<button class="ap15-btn ap15-btn--primary" data-action="share">↗ Megosztás</button>' : '') +
              '<button class="ap15-btn ap15-btn--' + (canShareFiles ? 'ghost' : 'primary') + '" data-action="download-card">⬇ Kép letöltése (PNG)</button>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<aside class="ap15-skool">' +
          '<div class="ap15-skool-glow" aria-hidden="true"></div>' +
          '<span class="ap15-skool-kicker">Következő lépés – ha szeretnéd</span>' +
          '<h2>Szeretnél tovább fejlődni?</h2>' +
          '<p>Fedezd fel a digitális világ, az AI és az online tanulás lehetőségeit egy támogató közösségben!</p>' +
          '<a class="ap15-btn ap15-btn--cta" href="' + esc(AP15.config.skoolUrl) + '" target="_blank" rel="noopener noreferrer" data-action="skool">MEGNÉZEM A SKOOL KÖZÖSSÉGET <span aria-hidden="true">↗</span></a>' +
          (AP15.config.skoolUrlIsPlaceholder ? '<p class="ap15-skool-note"><span class="ap15-tag">helykitöltő link</span> A végleges Skool-cím a config.js fájlban állítható be.</p>' :
            (AP15.config.skoolDisclosure ? '<p class="ap15-skool-note">' + esc(AP15.config.skoolDisclosure) + '</p>' : '')) +
        '</aside>' +

        demoLogPanel() +

        '<p class="ap15-center"><button class="ap15-link" data-action="restart">↻ Új kitöltés</button></p>' +
      '</section>'
    );
    AP15.confetti(root, 70);
  }

  function demoLogPanel() {
    if (AP15.config.backend.enabled) return '';
    var log = AP15.store.read();
    var last = log.certificates.slice(-3).reverse();
    var cons = log.marketingConsents.slice(-3).reverse();
    return '<details class="ap15-card ap15-demolog"><summary>🛠 Demó adatnapló (csak ebben a böngészőben)</summary>' +
      '<p class="ap15-note">Ez a panel a fejlesztés bemutatását szolgálja, éles változatban nem jelenik meg. Így néznek ki a háttérrendszer felé küldendő, egymástól elkülönített rekordok.</p>' +
      '<h3 class="ap15-h3">Oklevélkérések (' + log.certificates.length + ')</h3><pre>' + esc(JSON.stringify(last, null, 2)) + '</pre>' +
      '<h3 class="ap15-h3">Marketing-hozzájárulások (' + log.marketingConsents.length + ')</h3><pre>' +
        esc(cons.length ? JSON.stringify(cons, null, 2) : '– Nincs rögzített hozzájárulás (a jelölőnégyzet üresen maradt).') + '</pre>' +
      '<button class="ap15-link" data-action="clear-log">Demó napló törlése</button></details>';
  }

  function sendEmail(btn) {
    var box = $('.ap15-email-status');
    var c = state.cert, r = state.result;
    btn.disabled = true;
    var payload = {
      certId: c.id, issuedAt: c.issuedAt, pack: AP15.pack.id, name: c.name, nameMode: c.nameMode, email: c.email,
      score: r.score, max: r.max, level: r.level.title,
      marketingConsent: c.marketing,
      consentText: c.marketing ? AP15.config.consentText : null,
      consentVersion: c.marketing ? AP15.config.consentVersion : null
    };
    AP15.store.sendCertificate(payload, state.pdfBlob).then(function (res) {
      btn.disabled = false;
      if (res.demo) {
        box.innerHTML =
          '<div class="ap15-mail-preview">' +
            '<div class="ap15-mail-flag">DEMÓ – valódi e-mail nem került kiküldésre</div>' +
            '<dl><dt>Címzett</dt><dd>' + esc(c.email) + '</dd>' +
            '<dt>Tárgy</dt><dd>Gratulálunk! Itt az Agytorna okleveled 🎓</dd>' +
            '<dt>Melléklet</dt><dd>📎 agytorna-oklevel-' + esc(slug(c.name)) + '.pdf (' + Math.round(state.pdfBlob.size / 1024) + ' KB)</dd></dl>' +
            '<p>Kedves ' + esc(c.name) + '!<br>Gratulálunk, sikeresen teljesítetted az Agytorna kihívást <b>' + r.score + '/' + r.max + ' ponttal</b> (' + esc(r.level.title) + '). Csatoltan küldjük személyre szóló okleveledet.</p>' +
            '<p class="ap15-note">Élesítéshez kapcsold be a háttérrendszert a config.js fájlban (backend.enabled), és állítsd be az api/send-certificate.php végpontot.</p>' +
          '</div>';
      } else if (res.ok) {
        box.innerHTML = '<div class="ap15-ok-box">✓ Elküldtük az oklevelet ide: <b>' + esc(c.email) + '</b></div>';
      } else {
        box.innerHTML = '<div class="ap15-err-box">Az e-mail küldése most nem sikerült' + (res.message ? ': ' + esc(res.message) : '') + '. A PDF-et letöltheted a fenti gombbal.</div>';
      }
    });
  }

  /* ---------------- események ---------------- */

  function onClick(e) {
    var opt = e.target.closest('[data-option]');
    if (opt && root.contains(opt)) { selectOption(Number(opt.getAttribute('data-option'))); return; }

    var el = e.target.closest('[data-action]');
    if (!el || !root.contains(el)) return;
    var a = el.getAttribute('data-action');

    switch (a) {
      case 'home':
        // megerősítés az oldalon belül (a confirm() nem mindenhol működik)
        if (state.screen === 'quiz' && Date.now() - exitArmed > 4000) {
          exitArmed = Date.now();
          toast('Kilépsz? A válaszaid elvesznek. Kattints <b>újra a logóra</b> a kilépéshez.', 3500);
          return;
        }
        exitArmed = 0;
        state = freshState(); renderLanding(); break;
      case 'start':
        if (el.getAttribute('data-pack')) AP15.activatePack(el.getAttribute('data-pack'));
        startQuiz();
        break;
      case 'next': nextQuestion(); break;
      case 'toggle-timer': toggleTimer(el); break;
      case 'to-form': renderForm(); break;
      case 'to-result': renderResult(); break;
      case 'restart': state = freshState(); startQuiz(); break;
      case 'download-pdf':
        downloadBlob(state.pdfBlob, 'agytorna-oklevel-' + slug(state.cert.name) + '.pdf'); break;
      case 'download-card':
        downloadBlob(state.shareBlob, 'agytorna-eredmeny-' + slug(state.cert.name) + '.png'); break;
      case 'share':
        navigator.share({
          title: 'Agytorna',
          text: state.result.score + '/' + state.result.max + ' pont – ' + state.result.level.title + '! Mennyire vág az eszed? Próbáld ki te is!',
          files: [new File([state.shareBlob], 'agytorna-eredmeny.png', { type: 'image/png' })]
        }).catch(function (err) {
          if (err && err.name === 'AbortError') return;
          downloadBlob(state.shareBlob, 'agytorna-eredmeny-' + slug(state.cert.name) + '.png');
        });
        break;
      case 'send-email': sendEmail(el); break;
      case 'privacy':
        e.preventDefault();
        if (AP15.config.privacyUrl.charAt(0) === '#') toast('Az adatkezelési tájékoztató helykitöltő – élesítés előtt elkészítendő.', 2800);
        else window.open(AP15.config.privacyUrl, '_blank', 'noopener');
        break;
      case 'skool':
        if (AP15.config.skoolUrlIsPlaceholder) {
          e.preventDefault();
          toast('Demó: ez még helykitöltő link. A végleges Skool-címet a config.js-ben lehet megadni.', 3200);
        }
        break;
      case 'clear-log':
        AP15.store.clear();
        var p = $('.ap15-demolog');
        if (p) { p.outerHTML = demoLogPanel(); }
        break;
    }
  }

  function onKey(e) {
    if (state.screen !== 'quiz' || e.altKey || e.ctrlKey || e.metaKey) return;
    var k = e.key.toUpperCase();
    var idx = LETTERS.indexOf(k);
    if (idx < 0 && /^[1-4]$/.test(k)) idx = Number(k) - 1;
    if (idx >= 0) { e.preventDefault(); selectOption(idx); return; }
    if (e.key === 'Enter' && state.selected !== null && !(e.target.closest && e.target.closest('[data-option]'))) {
      e.preventDefault();
      nextQuestion();
    }
  }

  /** @param {HTMLElement} el  @param {{pack?: string}} [opts] */
  AP15.mount = function (el, opts) {
    opts = opts || {};
    forcedPack = opts.pack && AP15.packs[opts.pack] ? opts.pack : null;
    AP15.activatePack(forcedPack || AP15.config.pack);
    root = el;
    root.classList.add('ap15');
    if (embedded) {
      root.classList.add('ap15--embed');
      document.documentElement.classList.add('ap15-embedded');
      var lastH = 0;
      var report = function () {
        var h = Math.ceil(root.getBoundingClientRect().height);
        if (h !== lastH) { lastH = h; tellParent('height', { height: h }); }
      };
      if (window.ResizeObserver) new ResizeObserver(report).observe(root);
      setInterval(report, 1000); // tartalék régi böngészőkhöz
    }
    state = freshState();
    root.addEventListener('click', onClick);
    getDownloads(); // előre lekérjük, hogy a gombnyomás után ne kelljen várni
    document.addEventListener('keydown', onKey);
    window.addEventListener('beforeunload', function (e) {
      if (state.screen === 'quiz' && state.answers.length) { e.preventDefault(); e.returnValue = ''; }
    });
    renderLanding();
  };

  /** Az aktuális kitöltés kérdései (teszteléshez, hibakereséshez) */
  AP15.currentQuestions = function () { return state.questions; };

  /* ---------------- konfetti ---------------- */

  AP15.confetti = function (host, count) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var cv = document.createElement('canvas');
    cv.className = 'ap15-confetti';
    host.appendChild(cv);
    var ctx = cv.getContext('2d');
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var viewH = embedded ? Math.min(window.innerHeight, 900) : window.innerHeight;
    if (embedded) { cv.style.position = 'absolute'; cv.style.height = viewH + 'px'; }
    var W = cv.width = window.innerWidth * dpr, H = cv.height = viewH * dpr;
    var colors = ['#8b5cf6', '#22d3ee', '#f5b942', '#f472b6', '#34d399', '#ffffff'];
    var parts = [];
    for (var i = 0; i < (count || 140); i++) {
      parts.push({
        x: W * (0.2 + Math.random() * 0.6), y: H * 0.35 + Math.random() * 40 * dpr,
        vx: (Math.random() - 0.5) * 16 * dpr, vy: (-Math.random() * 14 - 6) * dpr,
        s: (5 + Math.random() * 7) * dpr, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
        c: colors[i % colors.length]
      });
    }
    var t0 = performance.now();
    (function frame(t) {
      var age = t - t0;
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = Math.max(0, 1 - age / 3200);
      parts.forEach(function (p) {
        p.vy += 0.35 * dpr; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      });
      if (age < 3200) requestAnimationFrame(frame); else cv.remove();
    })(t0);
  };
})();
