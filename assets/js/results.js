/**
 * Agytorna – pontozás és eredményszövegek
 * --------------------------------------------------------------
 * Minden helyes válasz 1 pont, max. 15.
 * A kategóriánkénti (3 kérdéses) eredmény csak tájékoztató jelzés,
 * ezért a szövegek szándékosan óvatosak és motiválók.
 */
window.AP15 = window.AP15 || {};

AP15.levels = [
  {
    min: 0, max: 5, key: 'explorer', title: 'Kíváncsi felfedező', emoji: '🌱',
    summary: 'Elindultál az úton, és ez a legfontosabb lépés! A feladatok egy része trükkös volt – a jó hír, hogy a gondolkodási képességek gyakorlással kifejezetten jól fejleszthetők.'
  },
  {
    min: 6, max: 9, key: 'thinker', title: 'Gondolkodó felfedező', emoji: '🔍',
    summary: 'Szép teljesítmény! A feladatok jelentős részét jól oldottad meg, és több területen is látszik a biztos alap. Egy kis rendszeres gyakorlással gyorsan léphetsz feljebb.'
  },
  {
    min: 10, max: 12, key: 'solver', title: 'Ügyes problémamegoldó', emoji: '⚡',
    summary: 'Nagyon jó eredmény! A nehezebb, csapdát rejtő kérdéseknél is gyakran megtaláltad a helyes utat. Az összetett, több lépésben megoldható feladatok láthatóan jól mennek neked.'
  },
  {
    min: 13, max: 15, key: 'master', title: 'Logikai kihívásmester', emoji: '🏆',
    summary: 'Kiemelkedő teljesítmény! Szinte minden kihívást sikerrel vettél, a trükkös feladatok sem fogtak ki rajtad. Ez remek alap bármilyen új, összetett tudás elsajátításához.'
  }
];

// 3 kérdéses részterület – óvatos megfogalmazás
AP15.categoryBands = [
  { min: 3, label: 'Erős terület',        tone: 'great' },
  { min: 2, label: 'Biztos alap',         tone: 'good'  },
  { min: 1, label: 'Fejleszthető terület', tone: 'ok'   },
  { min: 0, label: 'Felfedezésre vár',     tone: 'grow'  }
];

AP15.tips = {
  logic: [
    'Próbálj ki logikai rejtvényeket (pl. sudoku, „ki hazudik?” típusú feladványok).',
    'Egy állításnál mindig kérdezd meg: „Ez biztosan következik, vagy csak valószínű?”'
  ],
  pattern: [
    'Számsoroknál nézd meg a szomszédos tagok különbségét és hányadosát is.',
    'Napi 5 perc mintakereső játék (számsorok, alakzatok) gyorsan érezhető fejlődést hoz.'
  ],
  problem: [
    'Bonyolultabb feladatnál írd le a lépéseket, vagy rajzolj egy gyors vázlatot.',
    'A kész választ ellenőrizd vissza: behelyettesítve tényleg kijön az eredmény?'
  ],
  verbal: [
    'Olvass változatos szövegeket, és játssz szójátékokat (pl. szólánc, analógiák).',
    'Ha egy szó jelentése nem biztos, nézz utána – a szókincs a gondolkodás egyik eszköze.'
  ],
  attention: [
    'Lassíts a „túl könnyűnek tűnő” kérdéseknél – gyakran ott van a csapda.',
    'Rövid, zavaró tényezőktől mentes fókuszblokkok (pl. 15 perc telefon nélkül) erősítik a koncentrációt.'
  ]
};

/* ---------------- Számítás ---------------- */

AP15.getLevel = function (score) {
  return AP15.levels.find(function (l) { return score >= l.min && score <= l.max; }) || AP15.levels[0];
};

AP15.getBand = function (catScore) {
  return AP15.categoryBands.find(function (b) { return catScore >= b.min; });
};

/**
 * @param {number[]} answers – a választott opciók indexei kérdésenként
 * @returns {{score:number,max:number,level:object,categories:object,details:object[]}}
 */
AP15.computeResult = function (answers) {
  var cats = {};
  Object.keys(AP15.categories).forEach(function (k) { cats[k] = { correct: 0, total: 0 }; });

  var details = AP15.questions.map(function (q, i) {
    var ok = answers[i] === q.correct;
    cats[q.category].total++;
    if (ok) cats[q.category].correct++;
    return { question: q, chosen: answers[i], ok: ok };
  });

  var score = details.filter(function (d) { return d.ok; }).length;
  return {
    score: score,
    max: AP15.questions.length,
    level: AP15.getLevel(score),
    categories: cats,
    details: details
  };
};

/** Rövid, személyre szabott értékelés + fejlesztési javaslatok */
AP15.buildFeedback = function (result) {
  var entries = Object.keys(result.categories).map(function (k) {
    return { key: k, c: result.categories[k].correct };
  });
  var best = Math.max.apply(null, entries.map(function (e) { return e.c; }));
  var worst = Math.min.apply(null, entries.map(function (e) { return e.c; }));
  var strong = entries.filter(function (e) { return e.c === best && best >= 2; });
  var weak = entries.filter(function (e) { return e.c === worst && worst < 3; });

  var names = function (list) {
    return list.map(function (e) { return AP15.categories[e.key].name.toLowerCase(); });
  };
  var join = function (arr) {
    if (arr.length <= 1) return arr.join('');
    return arr.slice(0, -1).join(', ') + ' és ' + arr[arr.length - 1];
  };

  var parts = [result.level.summary];

  if (strong.length && strong.length < 5) {
    parts.push(strong.length === 1
      ? 'Ebben a kitöltésben ez a terület ment a legjobban: ' + join(names(strong)) + '.'
      : 'Ebben a kitöltésben ezek a területek mentek a legjobban: ' + join(names(strong)) + '.');
  } else if (strong.length === 5) {
    parts.push('Mind az öt területen kiegyensúlyozottan teljesítettél.');
  }
  if (weak.length && weak.length < 5 && best !== worst) {
    parts.push('A legtöbb fejlődési lehetőség itt rejlik: ' + join(names(weak)) + '.');
  }
  parts.push('Fontos: kategóriánként csak három kérdés volt, ezért ezek az eredmények tájékoztató jellegűek, nem végleges ítéletek.');

  // Javaslatok: a leggyengébb terület(ek)re, max. 3 db
  var tipSource = weak.length && best !== worst ? weak : entries.slice().sort(function (a, b) { return a.c - b.c; }).slice(0, 2);
  var tips = [];
  tipSource.forEach(function (e) {
    AP15.tips[e.key].forEach(function (t) {
      tips.push({ cat: e.key, text: t });
    });
  });
  if (result.score >= 13) {
    tips = [{ cat: null, text: 'Keress összetettebb kihívásokat: programozási feladványokat, stratégiai játékokat vagy versenyfeladatokat.' }].concat(tips);
  }

  return { text: parts, tips: tips.slice(0, 3) };
};
