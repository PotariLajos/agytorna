#!/usr/bin/env node
/**
 * Agytorna – tartalomfrissítési állapot
 * Használat:  node tools/review-status.js
 * Kilistázza a témacsomagokat: mikor néztük át utoljára, mikor esedékes
 * a következő átnézés, és melyik témánál JÁRT LE.
 */
const fs = require('fs');
const path = require('path');

global.window = global;
global.AP15 = { packs: {}, registerPack(p) { this.packs[p.id] = p; } };

const dir = path.join(__dirname, '..', 'assets', 'js', 'packs');
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.js'))) {
  (0, eval)(fs.readFileSync(path.join(dir, f), 'utf8'));
}

const today = new Date();
let due = 0;
for (const p of Object.values(AP15.packs)) {
  const n = p.slots.reduce((a, s) => a + s.questions.length, 0);
  const r = p.review || {};
  if (!r.lastReviewed || !r.intervalMonths) {
    console.log(`! ${p.id}: nincs megadva review adat`);
    due++;
    continue;
  }
  const next = new Date(r.lastReviewed);
  next.setMonth(next.getMonth() + r.intervalMonths);
  const late = next <= today;
  if (late) due++;
  console.log(
    `${late ? 'ESEDÉKES' : 'rendben  '}  ${p.id.padEnd(14)} ${String(n).padStart(3)} kérdés · ` +
    `utolsó átnézés: ${r.lastReviewed} · ${r.intervalMonths} havonta · következő: ${next.toISOString().slice(0, 10)}`
  );
}
console.log(due ? `\n${due} téma átnézése esedékes.` : '\nMinden téma naprakész.');
