/**
 * Agytorna – kérdésbank és megoldókulcs
 * --------------------------------------------------------------
 * 5 kategória × 3 kérdés. A sorrend három körből áll
 * (könnyű → közepes → nehéz), minden körben mind az öt kategória
 * szerepel egyszer, így a teszt fokozatosan nehezedik.
 *
 * Mezők:
 *   id         – egyedi azonosító
 *   category   – kategóriakulcs (lásd AP15.categories)
 *   level      – nehézség: 1 könnyű, 2 közepes, 3 nehéz
 *   text       – a kérdés szövege
 *   visual     – opcionális kiemelt „feladvány” sor (sorozat, kód stb.)
 *   options    – pontosan 4 válasz
 *   correct    – a helyes válasz indexe (0–3)  ← MEGOLDÓKULCS
 *   explain    – rövid indoklás az eredményoldali áttekintéshez
 */
window.AP15 = window.AP15 || {};

AP15.categories = {
  logic:     { name: 'Logikai gondolkodás',     icon: '🧩', color: '#8b5cf6' },
  pattern:   { name: 'Mintafelismerés',         icon: '🔷', color: '#22d3ee' },
  problem:   { name: 'Problémamegoldás',        icon: '🛠️', color: '#f5b942' },
  verbal:    { name: 'Verbális gondolkodás',    icon: '💬', color: '#f472b6' },
  attention: { name: 'Figyelem és koncentráció', icon: '🎯', color: '#34d399' }
};

AP15.questions = [
  /* ---------- 1. kör – bemelegítés ---------- */
  {
    id: 'L1', category: 'logic', level: 1,
    text: 'Minden róka ravasz. Rozi egy róka. Melyik állítás biztosan igaz?',
    options: ['Minden ravasz állat róka.', 'Rozi ravasz.', 'Rozi nem ravasz.', 'Csak Rozi ravasz.'],
    correct: 1,
    explain: 'Ha minden róka ravasz, és Rozi róka, akkor Rozi is ravasz. A többi állítás nem következik a feltételekből.'
  },
  {
    id: 'P1', category: 'pattern', level: 1,
    text: 'Melyik nyíl következik a sorban?',
    visual: '↑  →  ↓  ←  ↑  →  ?',
    options: ['←', '↑', '↓', '→'],
    correct: 2,
    explain: 'A nyíl minden lépésben negyed fordulatot tesz az óramutató járásával megegyezően: ↑ → ↓ ← … így a „→” után „↓” jön.'
  },
  {
    id: 'S1', category: 'problem', level: 1,
    text: 'Egy pizzát 8 egyenlő szeletre vágtak. Hárman ettek belőle, mindenki 2 szeletet. Hány szelet maradt?',
    options: ['1', '3', '4', '2'],
    correct: 3,
    explain: '3 × 2 = 6 szelet fogyott el, 8 − 6 = 2 szelet maradt.'
  },
  {
    id: 'V1', category: 'verbal', level: 1,
    text: 'Melyik szó NEM illik a többi közé?',
    options: ['alma', 'körte', 'répa', 'szilva'],
    correct: 2,
    explain: 'Az alma, a körte és a szilva gyümölcs, a répa zöldség.'
  },
  {
    id: 'F1', category: 'attention', level: 1,
    text: 'Hány „A” betű van ebben a szóban?',
    visual: 'ALMAFA',
    options: ['2', '3', '4', '5'],
    correct: 1,
    explain: 'A-L-M-A-F-A: az első, a negyedik és a hatodik betű „A”, összesen 3.'
  },

  /* ---------- 2. kör – belejövünk ---------- */
  {
    id: 'L2', category: 'logic', level: 2,
    text: 'Anna magasabb Bencénél. Csaba alacsonyabb Bencénél. Dóra magasabb Annánál. Ki a második legmagasabb?',
    options: ['Anna', 'Bence', 'Csaba', 'Dóra'],
    correct: 0,
    explain: 'A sorrend magasság szerint: Dóra > Anna > Bence > Csaba. A második legmagasabb Anna.'
  },
  {
    id: 'P2', category: 'pattern', level: 2,
    text: 'Melyik szám következik?',
    visual: '2,  3,  5,  8,  12,  17,  ?',
    options: ['21', '22', '23', '24'],
    correct: 2,
    explain: 'A különbségek egyesével nőnek: +1, +2, +3, +4, +5, így a következő lépés +6: 17 + 6 = 23.'
  },
  {
    id: 'S2', category: 'problem', level: 2,
    text: 'Egy könyv árát 20%-kal csökkentették, így most 4000 Ft. Mennyi volt az eredeti ára?',
    options: ['4800 Ft', '5000 Ft', '4400 Ft', '5200 Ft'],
    correct: 1,
    explain: 'Az új ár az eredeti 80%-a: 0,8 × x = 4000, tehát x = 5000 Ft. (A 4800 Ft csapda: az a 4000 Ft 20%-kal megemelve.)'
  },
  {
    id: 'V2', category: 'verbal', level: 2,
    text: 'Egészítsd ki az analógiát! Madár : fészek = méh : ?',
    options: ['méz', 'virág', 'fullánk', 'kaptár'],
    correct: 3,
    explain: 'A madár otthona a fészek, a méhé a kaptár. A méz és a fullánk a méhhez tartozik, de nem az otthona.'
  },
  {
    id: 'F2', category: 'attention', level: 2,
    text: 'Az alábbi négy kód közül három pontosan megegyezik a mintával. Melyik tér el?',
    visual: 'Minta:  KX7-49B-TQ2',
    options: ['KX7-49B-TQ2', 'KX7-49B-TQ2', 'KX7-498-TQ2', 'KX7-49B-TQ2'],
    optionLetters: true,
    correct: 2,
    explain: 'A „C” kódban a „B” betű helyén a hozzá nagyon hasonló „8” számjegy áll.'
  },

  /* ---------- 3. kör – a nagy kihívás ---------- */
  {
    id: 'L3', category: 'logic', level: 3,
    text: 'Egy szigeten mindenki vagy mindig igazat mond, vagy mindig hazudik. „A” ezt mondja: „B hazudik.” „B” ezt mondja: „A és én ugyanolyanok vagyunk.” Ki mond igazat?',
    options: ['Csak A', 'Csak B', 'Mindketten', 'Egyikük sem'],
    correct: 0,
    explain: 'Ha A igazat mond, B hazudós – ekkor B állítása („ugyanolyanok vagyunk”) valóban hamis, ez ellentmondásmentes. Ha A hazudna, B igazmondó lenne, de akkor B állítása hamis lenne – ellentmondás. Tehát csak A mond igazat.'
  },
  {
    id: 'P3', category: 'pattern', level: 3,
    text: 'Egy gép minden számot ugyanazzal a szabállyal alakít át. Mit ad ki a 6-ra?',
    visual: '2 → 5     3 → 10     4 → 17     6 → ?',
    options: ['36', '37', '26', '30'],
    correct: 1,
    explain: 'A szabály: a szám négyzete + 1 (2²+1 = 5, 3²+1 = 10, 4²+1 = 17). Így 6² + 1 = 37.'
  },
  {
    id: 'S3', category: 'problem', level: 3,
    text: 'Egy csiga egy 10 méter mély kút alján van. Nappal 3 métert mászik felfelé, éjszaka 2 métert csúszik vissza. Hányadik napon ér ki a kútból?',
    options: ['10.', '7.', '9.', '8.'],
    correct: 3,
    explain: 'Minden teljes nap-éjszaka 1 méter nyereség. A 7. nap végére (éjszaka után) 7 méteren van, a 8. napon 3 métert mászva eléri a 10 métert, és kiér – nem csúszik vissza.'
  },
  {
    id: 'V3', category: 'verbal', level: 3,
    text: 'Melyik szó illik MINDKÉT üres helyre, hogy két értelmes összetett szót kapjunk?',
    visual: 'TŰZ ____     ____ LAP',
    options: ['hely', 'kő', 'oltó', 'papír'],
    correct: 1,
    explain: 'Tűzkő és kőlap – mindkettő értelmes szó. A „hely” (tűzhely), az „oltó” (tűzoltó) és a „papír” (papírlap) csak az egyik oldalra illik.'
  },
  {
    id: 'F3', category: 'attention', level: 3,
    text: 'Egy ütő és egy labda együtt 1100 Ft. Az ütő 1000 Ft-tal drágább, mint a labda. Mennyibe kerül a labda?',
    options: ['100 Ft', '10 Ft', '50 Ft', '150 Ft'],
    correct: 2,
    explain: 'Ha a labda 50 Ft, az ütő 1050 Ft, együtt 1100 Ft. A gyors „100 Ft” válasz csapda: akkor az ütő 1100 Ft lenne, együtt 1200 Ft.'
  }
];
