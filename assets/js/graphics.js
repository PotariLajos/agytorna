/**
 * Agytorna – oklevél és megosztható eredménykártya (canvas)
 * --------------------------------------------------------------
 * Mindkét kép a böngészőben készül, külső szolgáltatás nélkül.
 */
window.AP15 = window.AP15 || {};

AP15.graphics = (function () {
  var SERIF = '"Playfair Display", Georgia, "Times New Roman", serif';
  var SANS = '"Outfit", "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif';

  var C = {
    ink: '#24154f',
    purple: '#6d3df2',
    teal: '#18c3d6',
    gold: '#d9a43a',
    goldLight: '#f6d58a',
    goldDark: '#a8761e',
    muted: '#6f6788'
  };

  /** Betűtípusok betöltése, hogy a canvas a jó fontot használja */
  function ensureFonts() {
    if (!document.fonts || !document.fonts.load) return Promise.resolve();
    var sample = 'ŐőŰűÁÉÍÓÖÚÜáéíóöúü';
    return Promise.all([
      document.fonts.load('700 40px "Playfair Display"', sample),
      document.fonts.load('italic 700 40px "Playfair Display"', sample),
      document.fonts.load('400 40px "Outfit"', sample),
      document.fonts.load('600 40px "Outfit"', sample),
      document.fonts.load('800 40px "Outfit"', sample)
    ]).catch(function () {}).then(function () {
      // ha a webfont nem érhető el (pl. offline), 1,5 mp után a tartalék fonttal megyünk tovább
    });
  }

  function withTimeout(p, ms) {
    return Promise.race([p, new Promise(function (r) { setTimeout(r, ms); })]);
  }

  /* ---------------- segédfüggvények ---------------- */

  function spacedText(ctx, text, x, y, spacing, align) {
    var chars = Array.from(text);
    var widths = chars.map(function (ch) { return ctx.measureText(ch).width; });
    var total = widths.reduce(function (a, b) { return a + b; }, 0) + spacing * (chars.length - 1);
    var start = align === 'left' ? x : align === 'right' ? x - total : x - total / 2;
    var prevAlign = ctx.textAlign;
    ctx.textAlign = 'left';
    chars.forEach(function (ch, i) {
      ctx.fillText(ch, start, y);
      start += widths[i] + spacing;
    });
    ctx.textAlign = prevAlign;
    return total;
  }

  function fitFont(ctx, text, maxWidth, size, tpl) {
    var s = size;
    ctx.font = tpl.replace('{s}', s);
    while (ctx.measureText(text).width > maxWidth && s > 20) {
      s -= 2;
      ctx.font = tpl.replace('{s}', s);
    }
    return s;
  }

  function wrapLines(ctx, text, maxWidth) {
    var words = text.split(' '), lines = [], line = '';
    words.forEach(function (w) {
      var test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function goldGradient(ctx, x0, y0, x1, y1) {
    var g = ctx.createLinearGradient(x0, y0, x1, y1);
    g.addColorStop(0, C.goldDark);
    g.addColorStop(0.35, C.goldLight);
    g.addColorStop(0.6, C.gold);
    g.addColorStop(1, C.goldDark);
    return g;
  }

  function hexPath(ctx, cx, cy, r) {
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
      var a = Math.PI / 6 + i * Math.PI / 3;
      var px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  function drawLogo(ctx, cx, cy, r) {
    var g = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    g.addColorStop(0, '#7c3aed');
    g.addColorStop(1, '#14b8c9');
    ctx.save();
    hexPath(ctx, cx, cy, r);
    ctx.fillStyle = g;
    ctx.fill();
    ctx.lineWidth = r * 0.06;
    ctx.strokeStyle = goldGradient(ctx, cx - r, cy - r, cx + r, cy + r);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '800 ' + Math.round(r * 0.9) + 'px ' + SANS;
    ctx.fillText('15', cx, cy + r * 0.04);
    ctx.restore();
  }

  function diamond(ctx, x, y, s) {
    ctx.beginPath();
    ctx.moveTo(x, y - s);
    ctx.lineTo(x + s, y);
    ctx.lineTo(x, y + s);
    ctx.lineTo(x - s, y);
    ctx.closePath();
    ctx.fill();
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  /* ---------------- OKLEVÉL ---------------- */

  /**
   * @param {{name:string,score:number,max:number,levelTitle:string,date:string,certId:string}} d
   * @returns {Promise<HTMLCanvasElement>}
   */
  function renderCertificate(d) {
    return withTimeout(ensureFonts(), 1500).then(function () {
      var W = 2480, H = 1754;
      var cv = document.createElement('canvas');
      cv.width = W; cv.height = H;
      var ctx = cv.getContext('2d');
      ctx.textBaseline = 'alphabetic';

      // háttér
      var bg = ctx.createRadialGradient(W / 2, H / 2, 200, W / 2, H / 2, W * 0.7);
      bg.addColorStop(0, '#fffdf8');
      bg.addColorStop(1, '#f4eddc');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // finom guilloche-minta
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = C.purple;
      ctx.lineWidth = 2;
      for (var r = 120; r < 900; r += 26) {
        ctx.beginPath();
        ctx.ellipse(W / 2, H / 2 + 40, r * 1.5, r, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // keretek
      ctx.lineWidth = 26;
      ctx.strokeStyle = C.ink;
      ctx.strokeRect(52, 52, W - 104, H - 104);
      ctx.lineWidth = 6;
      ctx.strokeStyle = goldGradient(ctx, 0, 0, W, H);
      ctx.strokeRect(96, 96, W - 192, H - 192);
      ctx.lineWidth = 2;
      ctx.strokeRect(116, 116, W - 232, H - 232);

      // sarokdíszek
      ctx.fillStyle = goldGradient(ctx, 0, 0, W, H);
      [[116, 116, 1, 1], [W - 116, 116, -1, 1], [116, H - 116, 1, -1], [W - 116, H - 116, -1, -1]].forEach(function (c) {
        var x = c[0], y = c[1], sx = c[2], sy = c[3];
        diamond(ctx, x, y, 22);
        ctx.fillRect(Math.min(x, x + sx * 170), y + sy * 30 - 2, 170, 4);
        ctx.fillRect(x + sx * 30 - 2, Math.min(y, y + sy * 170), 4, 170);
        diamond(ctx, x + sx * 190, y + sy * 30, 9);
        diamond(ctx, x + sx * 30, y + sy * 190, 9);
      });

      ctx.textAlign = 'center';

      // logó + márkanév
      drawLogo(ctx, W / 2, 255, 82);
      ctx.fillStyle = C.ink;
      ctx.font = '700 44px ' + SANS;
      spacedText(ctx, 'AGYTORNA', W / 2, 400, 14, 'center');

      // OKLEVÉL
      ctx.fillStyle = goldGradient(ctx, W / 2 - 500, 430, W / 2 + 500, 590);
      ctx.font = '700 168px ' + SERIF;
      spacedText(ctx, 'OKLEVÉL', W / 2, 590, 26, 'center');

      // díszvonal
      ctx.fillStyle = goldGradient(ctx, W / 2 - 400, 0, W / 2 + 400, 0);
      ctx.fillRect(W / 2 - 380, 648, 330, 4);
      ctx.fillRect(W / 2 + 50, 648, 330, 4);
      diamond(ctx, W / 2, 650, 16);
      diamond(ctx, W / 2 - 400, 650, 7);
      diamond(ctx, W / 2 + 400, 650, 7);

      ctx.fillStyle = C.muted;
      ctx.font = '400 46px ' + SANS;
      ctx.fillText('Ezt az oklevelet büszkén adományozzuk', W / 2, 760);

      // név
      ctx.fillStyle = C.ink;
      fitFont(ctx, d.name, 1800, 140, 'italic 700 {s}px ' + SERIF);
      ctx.fillText(d.name, W / 2, 925);
      ctx.fillStyle = goldGradient(ctx, W / 2 - 700, 0, W / 2 + 700, 0);
      ctx.fillRect(W / 2 - 700, 965, 1400, 4);

      ctx.fillStyle = C.muted;
      ctx.font = '400 44px ' + SANS;
      ctx.fillText('részére, aki sikeresen teljesítette az Agytorna interaktív gondolkodási kihívást.', W / 2, 1050);

      // eredménysor
      var colL = W / 2 - 480, colR = W / 2 + 480;
      ctx.fillStyle = C.purple;
      ctx.font = '600 32px ' + SANS;
      spacedText(ctx, 'ELÉRT PONTSZÁM', colL, 1165, 6, 'center');
      spacedText(ctx, 'TELJESÍTMÉNYSZINT', colR, 1165, 6, 'center');

      ctx.fillStyle = C.ink;
      ctx.font = '800 96px ' + SANS;
      ctx.fillText(d.score + ' / ' + d.max, colL, 1270);
      fitFont(ctx, d.levelTitle, 780, 72, '700 {s}px ' + SERIF);
      ctx.fillText(d.levelTitle, colR, 1262);

      ctx.fillStyle = 'rgba(36,21,79,.18)';
      ctx.fillRect(W / 2 - 1, 1125, 2, 170);

      // gratuláció
      ctx.fillStyle = '#5b4d80';
      var congrats = 'Gratulálunk! Kitartásod és éles eszed bizonyította: a gondolkodás kalandja csak most kezdődik.';
      fitFont(ctx, congrats, 1900, 42, 'italic 400 {s}px ' + SERIF);
      ctx.fillText(congrats, W / 2, 1360);

      // alsó sor: dátum – pecsét – azonosító
      var baseY = 1525;
      ctx.fillStyle = C.ink;
      ctx.font = '600 40px ' + SANS;
      ctx.fillText(d.date, 560, baseY);
      ctx.font = '600 36px ' + SANS;
      ctx.fillText(d.certId, W - 560, baseY);
      ctx.fillStyle = 'rgba(36,21,79,.35)';
      ctx.fillRect(330, baseY + 22, 460, 2);
      ctx.fillRect(W - 790, baseY + 22, 460, 2);
      ctx.fillStyle = C.muted;
      ctx.font = '400 28px ' + SANS;
      spacedText(ctx, 'TELJESÍTÉS DÁTUMA', 560, baseY + 68, 4, 'center');
      spacedText(ctx, 'OKLEVÉLAZONOSÍTÓ', W - 560, baseY + 68, 4, 'center');

      drawSeal(ctx, W / 2, 1495, 100);

      ctx.fillStyle = 'rgba(111,103,136,.85)';
      ctx.font = '400 24px ' + SANS;
      ctx.fillText('Saját fejlesztésű, játékos képességfelmérő – nem minősül hiteles IQ-mérésnek.', W / 2, 1630);

      return cv;
    });
  }

  function drawSeal(ctx, cx, cy, r) {
    ctx.save();
    // csipkézett szél
    ctx.beginPath();
    var spikes = 36;
    for (var i = 0; i <= spikes * 2; i++) {
      var a = (i / (spikes * 2)) * Math.PI * 2;
      var rr = i % 2 === 0 ? r : r * 0.9;
      var x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.shadowColor = 'rgba(120,80,10,.35)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = goldGradient(ctx, cx - r, cy - r, cx + r, cy + r);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.74, 0, Math.PI * 2);
    ctx.fillStyle = C.ink;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = C.goldLight;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.66, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = C.goldLight;
    ctx.textAlign = 'center';
    ctx.font = '700 15px ' + SANS;
    spacedText(ctx, 'AGYTORNA', cx, cy - 24, 2, 'center');
    ctx.font = '800 42px ' + SANS;
    ctx.fillText('15', cx, cy + 18);
    ctx.font = '700 13px ' + SANS;
    spacedText(ctx, 'TELJESÍTVE', cx, cy + 42, 1.5, 'center');
    ctx.restore();
  }

  /* ---------------- EREDMÉNYKÁRTYA ---------------- */


  /**
   * @param {{name:string,score:number,max:number,levelTitle:string,categories:object}} d
   */
  function renderShareCard(d) {
    return withTimeout(ensureFonts(), 1500).then(function () {
      var W = 1080, H = 1350;
      var cv = document.createElement('canvas');
      cv.width = W; cv.height = H;
      var ctx = cv.getContext('2d');

      var bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#1d0f45');
      bg.addColorStop(0.55, '#100a2c');
      bg.addColorStop(1, '#071a2a');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      function glow(x, y, rad, color) {
        var g = ctx.createRadialGradient(x, y, 0, x, y, rad);
        g.addColorStop(0, color);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
      glow(150, 180, 520, 'rgba(139,92,246,.45)');
      glow(W - 80, H - 200, 560, 'rgba(34,211,238,.30)');
      glow(W - 200, 420, 360, 'rgba(245,185,66,.16)');

      // pontrács
      ctx.fillStyle = 'rgba(255,255,255,.05)';
      for (var x = 30; x < W; x += 40) for (var y = 30; y < H; y += 40) ctx.fillRect(x, y, 2, 2);

      // kártyakeret
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255,255,255,.14)';
      roundRect(ctx, 40, 40, W - 80, H - 80, 48);
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';

      // logó + márkanév középre igazítva
      ctx.font = '700 44px ' + SANS;
      var brandW = Array.from('AGYTORNA').reduce(function (a, ch) { return a + ctx.measureText(ch).width; }, 0) + 6 * 7;
      var groupX = W / 2 - (80 + 24 + brandW) / 2;
      drawLogo(ctx, groupX + 40, 140, 40);
      ctx.fillStyle = '#fff';
      ctx.textAlign = 'left';
      spacedText(ctx, 'AGYTORNA', groupX + 104, 156, 6, 'left');
      ctx.textAlign = 'center';

      ctx.fillStyle = '#67e8f9';
      ctx.font = '600 28px ' + SANS;
      spacedText(ctx, 'AZ ÉN EREDMÉNYEM', W / 2, 270, 8, 'center');

      // pontgyűrű
      var cx = W / 2, cy = 525, R = 190;
      ctx.lineCap = 'round';
      ctx.lineWidth = 34;
      ctx.strokeStyle = 'rgba(255,255,255,.10)';
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      var ring = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      ring.addColorStop(0, '#22d3ee');
      ring.addColorStop(0.5, '#8b5cf6');
      ring.addColorStop(1, '#f5b942');
      ctx.strokeStyle = ring;
      var frac = Math.max(0.001, d.score / d.max);
      ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2); ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = '800 170px ' + SANS;
      ctx.fillText(String(d.score), cx, cy + 50);
      ctx.fillStyle = 'rgba(255,255,255,.6)';
      ctx.font = '600 44px ' + SANS;
      ctx.fillText('/ ' + d.max + ' pont', cx, cy + 112);

      // név
      ctx.fillStyle = '#fff';
      fitFont(ctx, d.name, W - 200, 76, '700 {s}px ' + SANS);
      ctx.fillText(d.name, W / 2, 860);

      // szint
      ctx.font = '700 54px ' + SERIF;
      var lvl = d.levelTitle;
      var tw = ctx.measureText(lvl).width + 90;
      roundRect(ctx, W / 2 - tw / 2, 905, tw, 96, 48);
      ctx.fillStyle = 'rgba(245,185,66,.12)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(245,185,66,.55)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = goldGradient(ctx, W / 2 - tw / 2, 0, W / 2 + tw / 2, 0);
      ctx.fillText(lvl, W / 2, 970);

      // kitöltési idő
      if (d.time) {
        ctx.fillStyle = 'rgba(255,255,255,.6)';
        ctx.font = '500 30px ' + SANS;
        ctx.fillText('⏱ ' + d.time, W / 2, 1052);
      }

      // kategóriák
      var keys = Object.keys(d.categories);
      var colW = (W - 160) / keys.length;
      keys.forEach(function (k, i) {
        var x = 80 + colW * i + colW / 2;
        var c = d.categories[k];
        var col = AP15.categories[k].color;
        for (var j = 0; j < c.total; j++) {
          ctx.beginPath();
          ctx.arc(x - 30 + j * 30, 1118, 10, 0, Math.PI * 2);
          ctx.fillStyle = j < c.correct ? col : 'rgba(255,255,255,.15)';
          ctx.fill();
        }
        ctx.fillStyle = 'rgba(255,255,255,.75)';
        ctx.font = '500 27px ' + SANS;
        ctx.fillText(AP15.categories[k].short || AP15.categories[k].name, x, 1168);
      });

      ctx.fillStyle = 'rgba(255,255,255,.85)';
      ctx.font = '600 34px ' + SANS;
      ctx.fillText(AP15.pack.landing.titleLead + ' ' + AP15.pack.landing.titleAccent + ' Próbáld ki te is!', W / 2, 1255);

      return cv;
    });
  }

  return {
    renderCertificate: renderCertificate,
    renderShareCard: renderShareCard
  };
})();
