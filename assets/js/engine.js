/**
 * Agytorna – motor: témacsomagok, kérdéshúzás, pontozás, értékelés
 * --------------------------------------------------------------
 * A TARTALOM (kérdések, kategóriák, szintek, szövegek) témacsomagokban
 * van: assets/js/packs/<téma>.js. Új téma = új csomagfájl, a motor és
 * a felület változatlan marad.
 *
 * Kérdéshúzás: a csomag „helyekből” (slot) áll. Egy hely = egy kategória
 * + egy nehézségi szint + több egyenértékű kérdés. Minden kitöltésnél
 * helyenként egy kérdést húzunk, előnyben részesítve azokat, amelyeket a
 * látogató ebben a böngészőben még nem látott. Ha egy hely összes
 * kérdését látta, az a hely újrakeveredik.
 */
window.AP15 = window.AP15 || {};

AP15.packs = AP15.packs || {};

/** Témacsomag regisztrálása (a packs/*.js fájlok hívják) */
AP15.registerPack = function (pack) {
  AP15.packs[pack.id] = pack;
};

/** Témacsomag bekapcsolása: a felület ezekből a mezőkből dolgozik */
AP15.activatePack = function (id) {
  var pack = AP15.packs[id] || AP15.packs[Object.keys(AP15.packs)[0]];
  if (!pack) throw new Error('Agytorna: nincs betöltött témacsomag.');
  AP15.pack = pack;
  AP15.categories = pack.categories;
  AP15.levels = pack.levels;
  AP15.categoryBands = pack.categoryBands;
  AP15.tips = pack.tips;
  return pack;
};

/* ---------------- kérdéshúzás ---------------- */

function ap15SeenKey() { return 'ap15_seen_' + AP15.pack.id; }

function ap15ReadSeen() {
  try { return JSON.parse(localStorage.getItem(ap15SeenKey())) || {}; } catch (e) { return {}; }
}
function ap15WriteSeen(seen) {
  try { localStorage.setItem(ap15SeenKey(), JSON.stringify(seen)); } catch (e) {}
}

function ap15RandomInt(n) {
  try {
    var a = new Uint32Array(1);
    window.crypto.getRandomValues(a);
    return a[0] % n;
  } catch (e) {
    return Math.floor(Math.random() * n);
  }
}

/** A válaszok sorrendjének összekeverése (a megoldókulcs követi) */
function ap15ShuffleOptions(q) {
  if (q.fixOrder) return q;
  var order = q.options.map(function (_, i) { return i; });
  for (var i = order.length - 1; i > 0; i--) {
    var j = ap15RandomInt(i + 1);
    var t = order[i]; order[i] = order[j]; order[j] = t;
  }
  return Object.assign({}, q, {
    options: order.map(function (i) { return q.options[i]; }),
    correct: order.indexOf(q.correct)
  });
}

/**
 * 15 kérdés húzása a bekapcsolt csomagból.
 * @returns {{questions: object[], reshuffled: boolean}}
 */
AP15.drawQuestions = function () {
  var seen = ap15ReadSeen();
  var reshuffled = false;

  var questions = AP15.pack.slots.map(function (slot) {
    var used = seen[slot.id] || [];
    var fresh = slot.questions.filter(function (q) { return used.indexOf(q.id) < 0; });
    if (!fresh.length) {
      reshuffled = true;
      // újrakeverés: az előzőleg utoljára kapott kérdést kerüljük, ha lehet
      var last = used[used.length - 1];
      fresh = slot.questions.filter(function (q) { return q.id !== last; });
      used = [];
    }
    var q = fresh[ap15RandomInt(fresh.length)];
    used.push(q.id);
    seen[slot.id] = used;
    // a hely adatait (kategória, szint) a kérdés is megkapja
    return ap15ShuffleOptions(Object.assign({ slot: slot.id, category: slot.category, level: slot.level }, q));
  });

  ap15WriteSeen(seen);
  return { questions: questions, reshuffled: reshuffled };
};

/* ---------------- pontozás ---------------- */

AP15.getLevel = function (score) {
  return AP15.levels.find(function (l) { return score >= l.min && score <= l.max; }) || AP15.levels[0];
};

AP15.getBand = function (catScore) {
  return AP15.categoryBands.find(function (b) { return catScore >= b.min; });
};

/**
 * @param {number[]} answers   – a választott opciók indexei kérdésenként
 * @param {object[]} questions – a kitöltésben szereplő (kihúzott) kérdések
 */
AP15.computeResult = function (answers, questions) {
  var cats = {};
  Object.keys(AP15.categories).forEach(function (k) { cats[k] = { correct: 0, total: 0 }; });

  var details = questions.map(function (q, i) {
    var ok = answers[i] === q.correct;
    cats[q.category].total++;
    if (ok) cats[q.category].correct++;
    return { question: q, chosen: answers[i], ok: ok };
  });

  var score = details.filter(function (d) { return d.ok; }).length;
  return {
    score: score,
    max: questions.length,
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

  if (strong.length && strong.length < entries.length) {
    parts.push(strong.length === 1
      ? 'Ebben a kitöltésben ez a terület ment a legjobban: ' + join(names(strong)) + '.'
      : 'Ebben a kitöltésben ezek a területek mentek a legjobban: ' + join(names(strong)) + '.');
  } else if (strong.length === entries.length) {
    parts.push('Mind az öt területen kiegyensúlyozottan teljesítettél.');
  }
  if (weak.length && weak.length < entries.length && best !== worst) {
    parts.push('A legtöbb fejlődési lehetőség itt rejlik: ' + join(names(weak)) + '.');
  }
  parts.push('Fontos: kategóriánként csak három kérdés volt, ezért ezek az eredmények tájékoztató jellegűek, nem végleges ítéletek.');

  var tips = [];
  if (best !== worst) {
    weak.forEach(function (e) {
      AP15.tips[e.key].forEach(function (t) { tips.push({ cat: e.key, text: t }); });
    });
  } else {
    // minden terület egyforma: egy-egy javaslat több különböző területről
    entries.forEach(function (e) { tips.push({ cat: e.key, text: AP15.tips[e.key][0] }); });
  }
  if (result.score >= 13 && AP15.pack.masterTip) {
    tips = [{ cat: null, text: AP15.pack.masterTip }].concat(tips);
  }

  return { text: parts, tips: tips.slice(0, 3) };
};
