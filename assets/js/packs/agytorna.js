/**
 * Agytorna – „Mennyire vág az eszed?” témacsomag
 * --------------------------------------------------------------
 * 15 kérdéshely (5 kategória × 3 nehézségi szint), helyenként
 * 6 egyenértékű kérdéssel = 90 kérdés. Minden kitöltés helyenként
 * egyet húz (lásd engine.js), így a sorrend, a nehézség és a pontozás
 * mindig azonos, a konkrét kérdések viszont változnak.
 *
 * Kérdésmezők:
 *   id       – egyedi azonosító (ne változtasd: ez alapján jegyezzük meg, mit látott már a látogató)
 *   text     – kérdés
 *   visual   – opcionális kiemelt feladvány (sortörés: \n)
 *   options  – pontosan 4 válasz
 *   correct  – a helyes válasz indexe (0–3) a fenti listában  ← MEGOLDÓKULCS
 *              (a válaszok sorrendjét a motor kitöltésenként összekeveri;
 *              fixOrder: true esetén a megadott sorrend marad)
 *   explain  – indoklás az eredményoldalhoz
 */
AP15.registerPack({
  id: 'agytorna',
  title: 'Agytorna',

  // Tartalomfrissítés: mikor néztük át utoljára, és hány havonta esedékes.
  // A gondolkodási feladatok nem évülnek el – évente átnézés, igény szerint bővítés.
  // (Az ellenőrzéshez: node tools/review-status.js)
  review: { lastReviewed: '2026-11-12', intervalMonths: 12 },

  landing: {
    titleLead: 'Mennyire',
    titleAccent: 'vág az eszed?',
    subtitle: '15 kérdés. Néhány perc. Egy izgalmas kihívás!',
    lead: 'Tedd próbára a logikai érzékedet, a mintafelismerést és a problémamegoldó képességedet! Derítsd ki, hogyan teljesítesz!',
    features: [
      ['🧠', '15 izgalmas kérdés'],
      ['⏱️', '5–7 perc'],
      ['💎', 'Teljesen ingyenes'],
      ['⚡', 'Azonnali eredmény'],
      ['📜', 'Digitális oklevél']
    ]
  },

  rounds: {
    1: { label: '1. kör', name: 'Bemelegítés' },
    2: { label: '2. kör', name: 'Belejövünk' },
    3: { label: '3. kör', name: 'A nagy kihívás' }
  },

  categories: {
    logic:     { name: 'Logikai gondolkodás',      short: 'Logika',   icon: '🧩', color: '#8b5cf6' },
    pattern:   { name: 'Mintafelismerés',          short: 'Minták',   icon: '🔷', color: '#22d3ee' },
    problem:   { name: 'Problémamegoldás',         short: 'Probléma', icon: '🛠️', color: '#f5b942' },
    verbal:    { name: 'Verbális gondolkodás',     short: 'Verbális', icon: '💬', color: '#f472b6' },
    attention: { name: 'Figyelem és koncentráció', short: 'Figyelem', icon: '🎯', color: '#34d399' }
  },

  levels: [
    { min: 0, max: 5, key: 'explorer', title: 'Kíváncsi felfedező', emoji: '🌱',
      summary: 'Elindultál az úton, és ez a legfontosabb lépés! A feladatok egy része trükkös volt – a jó hír, hogy a gondolkodási képességek gyakorlással kifejezetten jól fejleszthetők.' },
    { min: 6, max: 9, key: 'thinker', title: 'Gondolkodó felfedező', emoji: '🔍',
      summary: 'Szép teljesítmény! A feladatok jelentős részét jól oldottad meg, és több területen is látszik a biztos alap. Egy kis rendszeres gyakorlással gyorsan léphetsz feljebb.' },
    { min: 10, max: 12, key: 'solver', title: 'Ügyes problémamegoldó', emoji: '⚡',
      summary: 'Nagyon jó eredmény! A nehezebb, csapdát rejtő kérdéseknél is gyakran megtaláltad a helyes utat. Az összetett, több lépésben megoldható feladatok láthatóan jól mennek neked.' },
    { min: 13, max: 15, key: 'master', title: 'Logikai kihívásmester', emoji: '🏆',
      summary: 'Kiemelkedő teljesítmény! Szinte minden kihívást sikerrel vettél, a trükkös feladatok sem fogtak ki rajtad. Ez remek alap bármilyen új, összetett tudás elsajátításához.' }
  ],

  categoryBands: [
    { min: 3, label: 'Erős terület',         tone: 'great' },
    { min: 2, label: 'Biztos alap',          tone: 'good'  },
    { min: 1, label: 'Fejleszthető terület', tone: 'ok'    },
    { min: 0, label: 'Felfedezésre vár',     tone: 'grow'  }
  ],

  tips: {
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
  },
  masterTip: 'Keress összetettebb kihívásokat: programozási feladványokat, stratégiai játékokat vagy versenyfeladatokat.',

  /* =====================================================================
     KÉRDÉSHELYEK – sorrend = a teszt sorrendje (3 kör × 5 kategória)
     ===================================================================== */
  slots: [

    /* ---------------- 1. KÖR – BEMELEGÍTÉS ---------------- */

    { id: 'L1', category: 'logic', level: 1, questions: [
      { id: 'L1a', text: 'Minden róka ravasz. Rozi egy róka. Melyik állítás biztosan igaz?',
        options: ['Minden ravasz állat róka.', 'Rozi ravasz.', 'Rozi nem ravasz.', 'Csak Rozi ravasz.'], correct: 1,
        explain: 'Ha minden róka ravasz, és Rozi róka, akkor Rozi is ravasz. A többi állítás nem következik a feltételekből.' },
      { id: 'L1b', text: 'Ha esik az eső, Péter esernyőt visz. Ma esik az eső. Melyik állítás biztosan igaz?',
        options: ['Péter ma esernyőt visz.', 'Péter ma nem megy ki.', 'Ha Péter esernyőt visz, akkor esik.', 'Holnap is esni fog.'], correct: 0,
        explain: 'A szabály szerint eső esetén Péter esernyőt visz, és ma esik – tehát ma esernyőt visz. A fordított irány („ha esernyő, akkor eső”) nem következik.' },
      { id: 'L1c', text: 'Kati idősebb Zolinál. Zoli idősebb Marinál. Ki a legfiatalabb?',
        options: ['Kati', 'Zoli', 'Nem lehet eldönteni', 'Mari'], correct: 3,
        explain: 'Életkor szerint: Kati > Zoli > Mari, tehát Mari a legfiatalabb.' },
      { id: 'L1d', text: 'Egy dobozban csak piros és kék golyók vannak. Kihúztál egy golyót, és az nem piros. Milyen színű?',
        options: ['Piros', 'Nem lehet tudni', 'Kék', 'Zöld'], correct: 2,
        explain: 'Csak kétféle golyó van a dobozban. Ha a kihúzott nem piros, akkor csak kék lehet.' },
      { id: 'L1e', text: 'Egyik barátom sem szereti a spenótot. Lili a barátom. Melyik állítás biztosan igaz?',
        options: ['Lili szereti a spenótot.', 'Lili nem szereti a spenótot.', 'Aki nem szereti a spenótot, az a barátom.', 'Lili nem a barátom.'], correct: 1,
        explain: 'Ha egyik barátom sem szereti a spenótot, és Lili a barátom, akkor Lili sem szereti.' },
      { id: 'L1f', text: 'Hárman állnak sorban. Ági Bence előtt áll, Bence pedig Cili előtt. Ki áll középen?',
        options: ['Ági', 'Cili', 'Bence', 'Nem lehet tudni'], correct: 2,
        explain: 'A sorrend elölről: Ági, Bence, Cili – Bence áll középen.' }
    ]},

    { id: 'P1', category: 'pattern', level: 1, questions: [
      { id: 'P1a', text: 'Melyik nyíl következik a sorban?', visual: '↑  →  ↓  ←  ↑  →  ?',
        options: ['←', '↑', '↓', '→'], correct: 2,
        explain: 'A nyíl minden lépésben negyed fordulatot tesz az óramutató járásával megegyezően: ↑ → ↓ ← … így a „→” után „↓” jön.' },
      { id: 'P1b', text: 'Melyik szám következik?', visual: '3,  7,  11,  15,  ?',
        options: ['17', '19', '18', '21'], correct: 1,
        explain: 'Minden szám 4-gyel nagyobb az előzőnél: 15 + 4 = 19.' },
      { id: 'P1c', text: 'Melyik alakzat következik a sorban?', visual: '●  ■  ▲  ●  ■  ▲  ●  ?',
        options: ['●', '▲', '◆', '■'], correct: 3,
        explain: 'A „● ■ ▲” hármas ismétlődik. A „●” után mindig „■” jön.' },
      { id: 'P1d', text: 'Melyik szám következik?', visual: '3,  6,  12,  24,  ?',
        options: ['48', '36', '42', '30'], correct: 0,
        explain: 'Minden szám az előző kétszerese: 24 × 2 = 48.' },
      { id: 'P1e', text: 'Melyik szám következik?', visual: '20,  17,  14,  11,  ?',
        options: ['7', '9', '8', '10'], correct: 2,
        explain: 'Minden lépésben 3-mal csökken a szám: 11 − 3 = 8.' },
      { id: 'P1f', text: 'Melyik időpont következik?', visual: '1:00  →  1:15  →  1:30  →  1:45  →  ?',
        options: ['1:50', '2:00', '1:55', '2:15'], correct: 1,
        explain: 'Az időpontok negyedóránként követik egymást: 1:45 után 2:00 jön.' }
    ]},

    { id: 'S1', category: 'problem', level: 1, questions: [
      { id: 'S1a', text: 'Egy pizzát 8 egyenlő szeletre vágtak. Hárman ettek belőle, mindenki 2 szeletet. Hány szelet maradt?',
        options: ['1', '3', '4', '2'], correct: 3,
        explain: '3 × 2 = 6 szelet fogyott el, 8 − 6 = 2 szelet maradt.' },
      { id: 'S1b', text: 'Egy busz 8:40-kor indul, és az út 35 percig tart. Mikor érkezik?',
        options: ['9:05', '9:15', '9:10', '9:25'], correct: 1,
        explain: '8:40 + 20 perc = 9:00, majd még 15 perc: 9:15.' },
      { id: 'S1c', text: 'A ceruzát csak 6 darabos csomagban árulják. Legalább hány csomagot kell venned, ha 27 ceruzára van szükséged?',
        options: ['4', '6', '5', '3'], correct: 2,
        explain: '4 csomag = 24 ceruza, ez kevés. 5 csomag = 30 ceruza, ez már elég.' },
      { id: 'S1d', text: 'Anna vett 3 almát darabonként 120 Ft-ért és 2 körtét darabonként 150 Ft-ért. Mennyit fizetett összesen?',
        options: ['660 Ft', '540 Ft', '600 Ft', '720 Ft'], correct: 0,
        explain: '3 × 120 = 360 Ft és 2 × 150 = 300 Ft, összesen 660 Ft.' },
      { id: 'S1e', text: 'Egy könyv 240 oldalas. Péter naponta 30 oldalt olvas. Hány nap alatt olvassa ki?',
        options: ['6', '9', '12', '8'], correct: 3,
        explain: '240 : 30 = 8 nap.' },
      { id: 'S1f', text: 'Egy recept 4 főre 300 g lisztet ír. Mennyi liszt kell ugyanebből 6 főre?',
        options: ['400 g', '450 g', '500 g', '600 g'], correct: 1,
        explain: 'Egy főre 300 : 4 = 75 g jut, 6 főre 6 × 75 = 450 g.' }
    ]},

    { id: 'V1', category: 'verbal', level: 1, questions: [
      { id: 'V1a', text: 'Melyik szó NEM illik a többi közé?',
        options: ['alma', 'körte', 'répa', 'szilva'], correct: 2,
        explain: 'Az alma, a körte és a szilva gyümölcs, a répa zöldség.' },
      { id: 'V1b', text: 'Melyik szó NEM illik a többi közé?',
        options: ['kalapács', 'kanál', 'csavarhúzó', 'fogó'], correct: 1,
        explain: 'A kalapács, a csavarhúzó és a fogó szerszám, a kanál evőeszköz.' },
      { id: 'V1c', text: 'Melyik szó jelentése ELLENTÉTES a „bátor” szóéval?',
        options: ['merész', 'erős', 'vidám', 'gyáva'], correct: 3,
        explain: 'A bátor ellentéte a gyáva. A merész rokon értelmű, a másik kettő más tulajdonság.' },
      { id: 'V1d', text: 'Melyik szó NEM illik a többi közé?',
        options: ['ecset', 'hegedű', 'gitár', 'dob'], correct: 0,
        explain: 'A hegedű, a gitár és a dob hangszer, az ecset festőeszköz.' },
      { id: 'V1e', text: 'Melyik szó jelentése áll a legközelebb a „gyors” szóéhoz?',
        options: ['lassú', 'magas', 'sebes', 'csendes'], correct: 2,
        explain: 'A sebes a gyors rokon értelmű párja; a lassú éppen az ellentéte.' },
      { id: 'V1f', text: 'Egészítsd ki az analógiát! Tehén : bőg = kacsa : ?',
        options: ['csipog', 'hápog', 'ugat', 'nyerít'], correct: 1,
        explain: 'Az állatok hangjáról van szó: a tehén bőg, a kacsa hápog. (A csibe csipog, a kutya ugat, a ló nyerít.)' }
    ]},

    { id: 'F1', category: 'attention', level: 1, questions: [
      { id: 'F1a', text: 'Hány „A” betű van ebben a szóban?', visual: 'ALMAFA',
        options: ['2', '3', '4', '5'], correct: 1,
        explain: 'A-L-M-A-F-A: az első, a negyedik és a hatodik betű „A”, összesen 3.' },
      { id: 'F1b', text: 'Hány „K” betű van ebben a szóban?', visual: 'KEREKES',
        options: ['1', '3', '2', '4'], correct: 2,
        explain: 'K-E-R-E-K-E-S: az első és az ötödik betű „K”, összesen 2.' },
      { id: 'F1c', text: 'Melyik szám hiányzik a sorból?', visual: '1   2   3   4   6   7   8   9',
        options: ['6', '0', '10', '5'], correct: 3,
        explain: 'A sor 1-től 9-ig tart, és a 4 után a 6 jön – az 5 kimaradt.' },
      { id: 'F1d', text: 'Hány háromszög (▲) van a sorban?', visual: '▲  ●  ▲  ▲  ■  ▲  ●  ▲',
        options: ['5', '4', '6', '3'], correct: 0,
        explain: 'Az 1., 3., 4., 6. és 8. helyen áll háromszög, összesen 5.' },
      { id: 'F1e', text: 'Melyik szó van HIBÁSAN írva?',
        options: ['könyvtár', 'ablakkeret', 'szekrény', 'bizonyitvány'], correct: 3,
        explain: 'Helyesen „bizonyítvány”, hosszú í-vel. A többi szó helyesen van írva.' },
      { id: 'F1f', text: 'Ma szerda van. Milyen nap lesz holnapután?',
        options: ['csütörtök', 'péntek', 'szombat', 'kedd'], correct: 1,
        explain: 'Holnap csütörtök, holnapután péntek.' }
    ]},

    /* ---------------- 2. KÖR – BELEJÖVÜNK ---------------- */

    { id: 'L2', category: 'logic', level: 2, questions: [
      { id: 'L2a', text: 'Anna magasabb Bencénél. Csaba alacsonyabb Bencénél. Dóra magasabb Annánál. Ki a második legmagasabb?',
        options: ['Anna', 'Bence', 'Csaba', 'Dóra'], correct: 0,
        explain: 'A sorrend magasság szerint: Dóra > Anna > Bence > Csaba. A második legmagasabb Anna.' },
      { id: 'L2b', text: 'Ha holnapután péntek lesz, milyen nap volt tegnapelőtt?',
        options: ['vasárnap', 'kedd', 'szombat', 'hétfő'], correct: 3,
        explain: 'Ha holnapután péntek, akkor ma szerda van. Tegnapelőtt tehát hétfő volt.' },
      { id: 'L2c', text: 'Négyen ülnek egy padon. Csongor a bal szélen ül. Bori közvetlenül Csongor mellett ül. Ádám nem ül a szélen. Ki ül a jobb szélen?',
        options: ['Ádám', 'Bori', 'Dalma', 'Csongor'], correct: 2,
        explain: 'Balról: 1. Csongor, 2. Bori. Ádám nem ülhet szélen, ezért ő a 3. – így a jobb szélen (4.) Dalma ül.' },
      { id: 'L2d', text: 'Egy futóversenyen Gergő Hanna előtt ért célba. Ivett Hanna után, de János előtt érkezett. Ki lett a harmadik a négy versenyző közül?',
        options: ['Hanna', 'Ivett', 'János', 'Gergő'], correct: 1,
        explain: 'A befutási sorrend: Gergő, Hanna, Ivett, János. A harmadik Ivett.' },
      { id: 'L2e', text: 'Minden zorg flip. Egyik flip sem kék. Melyik állítás biztosan igaz?',
        options: ['Néhány zorg kék.', 'Minden flip zorg.', 'Minden kék dolog zorg.', 'Egyik zorg sem kék.'], correct: 3,
        explain: 'Minden zorg a flipek közé tartozik, a flipek között pedig nincs kék – így zorg sem lehet kék. (A kitalált szavak miatt csak a logikára hagyatkozhatsz.)' },
      { id: 'L2f', text: 'Egy fiókban 6 fekete és 6 fehér zokni van összekeverve. Sötétben húzol. Legalább hány zoknit kell kihúznod, hogy biztosan legyen köztük két azonos színű?',
        options: ['2', '3', '6', '7'], correct: 1,
        explain: 'Két húzásnál még lehet egy fekete és egy fehér. A harmadik zokni viszont biztosan egyezik valamelyikkel – csak két szín van.' }
    ]},

    { id: 'P2', category: 'pattern', level: 2, questions: [
      { id: 'P2a', text: 'Melyik szám következik?', visual: '2,  3,  5,  8,  12,  17,  ?',
        options: ['21', '22', '23', '24'], correct: 2,
        explain: 'A különbségek egyesével nőnek: +1, +2, +3, +4, +5, így a következő lépés +6: 17 + 6 = 23.' },
      { id: 'P2b', text: 'Melyik szám következik?', visual: '1,  4,  9,  16,  25,  ?',
        options: ['36', '30', '35', '49'], correct: 0,
        explain: 'Ezek a négyzetszámok: 1², 2², 3², 4², 5² – a következő 6² = 36.' },
      { id: 'P2c', text: 'Melyik szám következik?', visual: '1,  1,  2,  3,  5,  8,  ?',
        options: ['11', '12', '15', '13'], correct: 3,
        explain: 'Minden szám az előző kettő összege: 5 + 8 = 13.' },
      { id: 'P2d', text: 'Melyik szám következik?', visual: '2,  5,  4,  7,  6,  9,  ?',
        options: ['10', '8', '11', '12'], correct: 1,
        explain: 'Felváltva +3 és −1 a lépés: 2 → 5 → 4 → 7 → 6 → 9 → 8.' },
      { id: 'P2e', text: 'Melyik szám következik?', visual: '100,  50,  25,  ?',
        options: ['15', '12', '12,5', '20'], correct: 2,
        explain: 'Minden szám az előző fele: 25 : 2 = 12,5.' },
      { id: 'P2f', text: 'Melyik szám következik?', visual: '1,  10,  2,  20,  3,  30,  ?',
        options: ['40', '4', '31', '33'], correct: 1,
        explain: 'Két sor fonódik össze: 1, 2, 3, … és 10, 20, 30, … A 30 után az első sor folytatódik: 4.' }
    ]},

    { id: 'S2', category: 'problem', level: 2, questions: [
      { id: 'S2a', text: 'Egy könyv árát 20%-kal csökkentették, így most 4000 Ft. Mennyi volt az eredeti ára?',
        options: ['4800 Ft', '5000 Ft', '4400 Ft', '5200 Ft'], correct: 1,
        explain: 'Az új ár az eredeti 80%-a: 0,8 × x = 4000, tehát x = 5000 Ft. (A 4800 Ft csapda: az a 4000 Ft 20%-kal megemelve.)' },
      { id: 'S2b', text: 'Egy 10 méteres egyenes kerítés mentén 2 méterenként oszlopot állítunk, a kerítés mindkét végére is. Hány oszlop kell?',
        options: ['5', '4', '10', '6'], correct: 3,
        explain: 'Az oszlopok a 0., 2., 4., 6., 8. és 10. méternél állnak: ez 6 oszlop. (Az 5 csapda: annyi a köz, nem az oszlop.)' },
      { id: 'S2c', text: 'Egy osztályba 28 tanuló jár. A lányok 4-gyel többen vannak, mint a fiúk. Hány fiú van az osztályban?',
        options: ['12', '14', '16', '10'], correct: 0,
        explain: 'Ha x fiú van, akkor x + (x + 4) = 28, vagyis x = 12. Ellenőrzés: 12 fiú + 16 lány = 28.' },
      { id: 'S2d', text: 'Az egyik csap 10 perc alatt tölti meg a kádat, a másik 15 perc alatt. Ha egyszerre nyitjuk meg mindkettőt, hány perc alatt telik meg a kád?',
        options: ['5 perc', '12,5 perc', '6 perc', '25 perc'], correct: 2,
        explain: 'Percenként az egyik a kád 1/10-ét, a másik az 1/15-ét tölti meg, együtt 1/10 + 1/15 = 1/6-ot. Így 6 perc alatt telik meg.' },
      { id: 'S2e', text: 'Egy autó átlagosan 90 km/h sebességgel halad. Mennyi idő alatt tesz meg 210 km-t?',
        options: ['2 óra 10 perc', '2 óra 30 perc', '2 óra 33 perc', '2 óra 20 perc'], correct: 3,
        explain: '210 : 90 = 2⅓ óra, egy harmad óra pedig 20 perc. Tehát 2 óra 20 perc.' },
      { id: 'S2f', text: 'Egy 3 × 4 méteres szoba padlóját 50 × 50 cm-es csempékkel burkoljuk. Hány csempe kell?',
        options: ['24', '48', '96', '12'], correct: 1,
        explain: 'Egy méterre 2 csempe fér, így a szoba 6 × 8 = 48 csempével fedhető le. (Terület szerint: 12 m² : 0,25 m² = 48.)' }
    ]},

    { id: 'V2', category: 'verbal', level: 2, questions: [
      { id: 'V2a', text: 'Egészítsd ki az analógiát! Madár : fészek = méh : ?',
        options: ['méz', 'virág', 'fullánk', 'kaptár'], correct: 3,
        explain: 'A madár otthona a fészek, a méhé a kaptár. A méz és a fullánk a méhhez tartozik, de nem az otthona.' },
      { id: 'V2b', text: 'Egészítsd ki az analógiát! Orvos : kórház = tanár : ?',
        options: ['könyv', 'iskola', 'diák', 'tábla'], correct: 1,
        explain: 'A kapcsolat: hol dolgozik? Az orvos a kórházban, a tanár az iskolában.' },
      { id: 'V2c', text: 'Melyik szó NEM illik a többi közé?',
        options: ['folyó', 'patak', 'tó', 'csermely'], correct: 2,
        explain: 'A folyó, a patak és a csermely folyóvíz, a tó állóvíz.' },
      { id: 'V2d', text: 'Egészítsd ki az analógiát! Írni : toll = vágni : ?',
        options: ['olló', 'papír', 'fodrász', 'haj'], correct: 0,
        explain: 'A kapcsolat: mivel végezzük a tevékenységet? Írni tollal, vágni ollóval.' },
      { id: 'V2e', text: 'Melyik közmondás jelentése áll a legközelebb ehhez: „A kicsi, de rendszeres lépések idővel nagy eredményt hoznak”?',
        options: ['Ki korán kel, aranyat lel.', 'Addig üsd a vasat, amíg meleg.', 'Sok kicsi sokra megy.', 'Ajándék lónak ne nézd a fogát.'], correct: 2,
        explain: 'A „Sok kicsi sokra megy” pontosan azt jelenti, hogy apró részekből is nagy egész lesz.' },
      { id: 'V2f', text: 'Melyik szó jelentése áll a legközelebb az „ideiglenes” szóéhoz?',
        options: ['állandó', 'átmeneti', 'időszerű', 'véletlen'], correct: 1,
        explain: 'Az ideiglenes = átmeneti, csak egy ideig tartó. Az „időszerű” csapda: az azt jelenti, hogy aktuális.' }
    ]},

    { id: 'F2', category: 'attention', level: 2, questions: [
      { id: 'F2a', text: 'Az alábbi négy kód közül három pontosan megegyezik a mintával. Melyik tér el?', visual: 'Minta:  KX7-49B-TQ2',
        options: ['KX7-49B-TQ2', 'KX7-49B-TQ2', 'KX7-498-TQ2', 'KX7-49B-TQ2'], correct: 2,
        explain: 'Az eltérő kódban a „B” betű helyén a hozzá nagyon hasonló „8” számjegy áll: KX7-498-TQ2.' },
      { id: 'F2b', text: 'Melyik telefonszám NEM egyezik a mintával?', visual: 'Minta:  06 30 418 2795',
        options: ['06 30 418 2795', '06 30 418 2795', '06 30 418 2795', '06 30 481 2795'], correct: 3,
        explain: 'Az eltérő számban „418” helyett „481” áll – két számjegy helyet cserélt.' },
      { id: 'F2c', text: 'Hány darab 7-es számjegy van összesen a sorban?', visual: '17   27   71   77   47   70   57',
        options: ['6', '7', '9', '8'], correct: 3,
        explain: 'Minden számban van egy 7-es, a 77-ben kettő is: 7 szám + 1 = 8 darab.' },
      { id: 'F2d', text: 'Olvasd el figyelmesen! Hány állatot vitt fel Mózes a bárkára a bibliai történet szerint?',
        options: ['Fajonként kettőt', 'Fajonként egyet', 'Hetet', 'Egyet sem'], correct: 3,
        explain: 'A bárkát a történetben Noé építette és töltötte meg állatokkal, nem Mózes – ezért a helyes válasz: egyet sem.' },
      { id: 'F2e', text: 'Melyik szó szerepel KÉTSZER a listában?', visual: 'kő,  kéz,  kés,  kör,  kép,  kéz,  kos',
        options: ['kés', 'kép', 'kéz', 'kő'], correct: 2,
        explain: 'A „kéz” a második és a hatodik helyen is szerepel. A hasonló szavak (kés, kép) elterelik a figyelmet.' },
      { id: 'F2f', text: 'Egy sorban elölről is és hátulról is te vagy a 7. Hányan állnak a sorban?',
        options: ['13', '14', '12', '15'], correct: 0,
        explain: 'Előtted 6-an, mögötted 6-an állnak, plusz te: 6 + 6 + 1 = 13. (A 14 csapda: úgy téged kétszer számolnánk.)' }
    ]},

    /* ---------------- 3. KÖR – A NAGY KIHÍVÁS ---------------- */

    { id: 'L3', category: 'logic', level: 3, questions: [
      { id: 'L3a', text: 'Egy szigeten mindenki vagy mindig igazat mond, vagy mindig hazudik. „A” ezt mondja: „B hazudik.” „B” ezt mondja: „A és én ugyanolyanok vagyunk.” Ki mond igazat?',
        options: ['Csak A', 'Csak B', 'Mindketten', 'Egyikük sem'], correct: 0,
        explain: 'Ha A igazat mond, B hazudós – ekkor B állítása („ugyanolyanok vagyunk”) valóban hamis, ez ellentmondásmentes. Ha A hazudna, B igazmondó lenne, de akkor B állítása hamis lenne – ellentmondás. Tehát csak A mond igazat.' },
      { id: 'L3b', text: 'Egy szigeten mindenki vagy mindig igazat mond, vagy mindig hazudik. „C” ezt mondja: „Én és D is hazudósok vagyunk.” Mi igaz?',
        options: ['Mindketten igazmondók.', 'Mindketten hazudósok.', 'C igazmondó, D hazudós.', 'C hazudós, D igazmondó.'], correct: 3,
        explain: 'Igazmondó nem mondhatja magáról, hogy hazudós, tehát C hazudik. Akkor az állítása hamis: nem igaz, hogy mindketten hazudósok – vagyis D igazmondó.' },
      { id: 'L3c', text: 'Három doboz közül az egyikben alma, a másikban körte, a harmadikban vegyesen van mindkettő. A dobozok címkéi: „Alma”, „Körte”, „Vegyes” – de MINDHÁROM címke hibás. A „Vegyes” feliratú dobozból kihúzol egy almát. Mi van a „Körte” feliratú dobozban?',
        options: ['Alma', 'Körte', 'Nem dönthető el', 'Vegyes'], correct: 3,
        explain: 'A „Vegyes” doboz nem vegyes (hibás a címke), és almát húztunk belőle – tehát ez az almás doboz. A „Körte” dobozban nem lehet körte (hibás címke), az alma már megvan, így csak a vegyes maradhat.' },
      { id: 'L3d', text: 'Tegyük fel, hogy igaz: „Aki korán kel, aranyat lel.” Melyik állítás következik ebből BIZTOSAN?',
        options: ['Aki aranyat lel, az korán kelt.', 'Aki nem lel aranyat, az nem kelt korán.', 'Aki nem kel korán, nem lel aranyat.', 'Mindenki korán kel.'], correct: 1,
        explain: 'Ha a korán kelés mindig aranyhoz vezet, akkor akinél nincs arany, az nem kelhetett korán (ez a megfordított tagadás). A többi irány nem következik: aranyat más is lelhet.' },
      { id: 'L3e', text: 'Négy kártya mindegyikének egyik oldalán betű, másik oldalán szám van. Ezt látod: A, K, 4, 7. Szabály: „Ha egy kártya egyik oldalán magánhangzó van, a másik oldalán páros szám.” Mely kártyákat KELL megfordítani a szabály ellenőrzéséhez?',
        options: ['A és 4', 'Csak az A', 'A és 7', 'A, 4 és 7'], correct: 2,
        explain: 'Az A-t meg kell nézni (páros-e a hátoldala), és a 7-et is (nincs-e mögötte magánhangzó). A 4 hátoldala bármi lehet, a szabály nem tiltja – ez a gyakori csapda.' },
      { id: 'L3f', text: 'Három gyanúsított közül egyikük vitte el a sütit. Aladár: „Béla volt.” Béla: „Nem én voltam.” Csilla: „Nem én voltam.” Pontosan EGYIKÜK mond igazat. Ki vitte el a sütit?',
        options: ['Aladár', 'Béla', 'Csilla', 'Nem dönthető el'], correct: 2,
        explain: 'Ha Aladár vagy Béla lenne a tettes, két igaz állítás lenne. Ha Csilla: Aladár hazudik, Béla igazat mond, Csilla hazudik – pontosan egy igaz állítás. Tehát Csilla.' }
    ]},

    { id: 'P3', category: 'pattern', level: 3, questions: [
      { id: 'P3a', text: 'Egy gép minden számot ugyanazzal a szabállyal alakít át. Mit ad ki a 6-ra?', visual: '2 → 5     3 → 10     4 → 17     6 → ?',
        options: ['36', '37', '26', '30'], correct: 1,
        explain: 'A szabály: a szám négyzete + 1 (2²+1 = 5, 3²+1 = 10, 4²+1 = 17). Így 6² + 1 = 37.' },
      { id: 'P3b', text: 'Melyik szám következik?', visual: '2,  6,  12,  20,  30,  ?',
        options: ['40', '36', '44', '42'], correct: 3,
        explain: 'A különbségek: +4, +6, +8, +10, így a következő +12: 30 + 12 = 42. (Másként: 1×2, 2×3, 3×4, … 6×7 = 42.)' },
      { id: 'P3c', text: 'Melyik szám következik?', visual: '1,  2,  6,  24,  120,  ?',
        options: ['240', '720', '600', '840'], correct: 1,
        explain: 'A szorzó minden lépésben eggyel nő: ×2, ×3, ×4, ×5, így most ×6: 120 × 6 = 720.' },
      { id: 'P3d', text: 'Egy gép minden számot ugyanazzal a szabállyal alakít át. Mit ad ki a 9-re?', visual: '3 → 8     5 → 24     6 → 35     9 → ?',
        options: ['81', '72', '80', '78'], correct: 2,
        explain: 'A szabály: a szám négyzete − 1 (3²−1 = 8, 5²−1 = 24, 6²−1 = 35). Így 9² − 1 = 80.' },
      { id: 'P3e', text: 'Melyik szám hiányzik? Minden sorban ugyanaz a szabály érvényes.', visual: '3    5    8\n4    6    10\n7    2    ?',
        options: ['9', '14', '5', '10'], correct: 0,
        explain: 'Minden sorban az első két szám összege a harmadik: 3+5 = 8, 4+6 = 10, így 7+2 = 9. (A 14 csapda: szorzás az első két sorra nem működik.)' },
      { id: 'P3f', text: 'Melyik szám következik?', visual: '1,  3,  7,  15,  31,  ?',
        options: ['47', '62', '64', '63'], correct: 3,
        explain: 'Minden szám az előző kétszerese + 1: 31 × 2 + 1 = 63. (A különbségek is duplázódnak: 2, 4, 8, 16, 32.)' }
    ]},

    { id: 'S3', category: 'problem', level: 3, questions: [
      { id: 'S3a', text: 'Egy csiga egy 10 méter mély kút alján van. Nappal 3 métert mászik felfelé, éjszaka 2 métert csúszik vissza. Hányadik napon ér ki a kútból?',
        options: ['10.', '7.', '9.', '8.'], correct: 3,
        explain: 'Minden teljes nap-éjszaka 1 méter nyereség. A 7. nap végére (éjszaka után) 7 méteren van, a 8. napon 3 métert mászva eléri a 10 métert, és kiér – nem csúszik vissza.' },
      { id: 'S3b', text: 'Egy apa 36 éves, a fia 12. Hány év múlva lesz az apa pontosan kétszer olyan idős, mint a fia?',
        options: ['6', '18', '12', '24'], correct: 2,
        explain: '36 + x = 2 × (12 + x), ebből x = 12. Ellenőrzés: 12 év múlva az apa 48, a fia 24 éves.' },
      { id: 'S3c', text: '5 gép 5 perc alatt 5 terméket gyárt. Hány perc alatt gyárt 100 gép 100 terméket?',
        options: ['100', '20', '1', '5'], correct: 3,
        explain: 'Egy gép 5 perc alatt 1 terméket gyárt. 100 gép párhuzamosan dolgozva 5 perc alatt 100 terméket készít.' },
      { id: 'S3d', text: 'Egy tavon a tavirózsák által borított terület minden nap megkétszereződik. A 30. napon borítják be a teljes tavat. Hányadik napon borították be a tó felét?',
        options: ['15.', '29.', '28.', '20.'], correct: 1,
        explain: 'Mivel a terület naponta duplázódik, a teljes borítás előtti napon (a 29.-en) még csak a fele volt beborítva.' },
      { id: 'S3e', text: 'Egy megbeszélésen 6 ember vesz részt, és mindenki mindenkivel pontosan egyszer fog kezet. Hány kézfogás történik?',
        options: ['15', '12', '30', '36'], correct: 0,
        explain: 'Mindenki 5 emberrel fog kezet: 6 × 5 = 30, de így minden kézfogást kétszer számoltunk. 30 : 2 = 15.' },
      { id: 'S3f', text: 'Egy bögrében 3 dl tea van. Megiszod a felét, visszatöltesz 1 dl-t, majd megint megiszod a felét. Mennyi tea marad a bögrében?',
        options: ['1 dl', '1,5 dl', '1,25 dl', '0,75 dl'], correct: 2,
        explain: '3 dl → fele: 1,5 dl → +1 dl: 2,5 dl → fele: 1,25 dl.' }
    ]},

    { id: 'V3', category: 'verbal', level: 3, questions: [
      { id: 'V3a', text: 'Melyik szó illik MINDKÉT üres helyre, hogy két értelmes összetett szót kapjunk?', visual: 'TŰZ ____     ____ LAP',
        options: ['hely', 'kő', 'oltó', 'papír'], correct: 1,
        explain: 'Tűzkő és kőlap – mindkettő értelmes szó. A „hely” (tűzhely), az „oltó” (tűzoltó) és a „papír” (papírlap) csak az egyik oldalra illik.' },
      { id: 'V3b', text: 'Melyik szó illik MINDKÉT üres helyre, hogy két értelmes összetett szót kapjunk?', visual: 'VAS ____     ____ VONAL',
        options: ['érc', 'határ', 'kerítés', 'út'], correct: 3,
        explain: 'Vasút és útvonal. Az „érc” (vasérc) és a „kerítés” (vaskerítés) csak az elejére, a „határ” (határvonal) csak a végére illik.' },
      { id: 'V3c', text: 'Melyik szó illik MINDKÉT üres helyre, hogy két értelmes összetett szót kapjunk?', visual: 'NAP ____     ____ KÉP',
        options: ['sugár', 'fény', 'tükör', 'óra'], correct: 1,
        explain: 'Napfény és fénykép. A „sugár” (napsugár) és az „óra” (napóra) csak az elejére, a „tükör” (tükörkép) csak a végére illik.' },
      { id: 'V3d', text: 'Mit jelent pontosan ez a mondat? „Nem igaz, hogy minden diák elkésett.”',
        options: ['Egyik diák sem késett el.', 'Volt olyan diák, aki nem késett el.', 'Minden diák időben érkezett.', 'Pontosan egy diák késett el.'], correct: 1,
        explain: 'A „minden diák elkésett” tagadása annyi, hogy legalább egy diák nem késett el. Hogy hányan késtek, azt a mondat nem mondja meg.' },
      { id: 'V3e', text: 'Melyik szópár viszonya ugyanolyan, mint a „mag : fa” páré?',
        options: ['levél : ág', 'gyökér : föld', 'tojás : madár', 'toll : madár'], correct: 2,
        explain: 'A magból fa fejlődik, a tojásból madár. A levél és a toll csak része valaminek, a gyökér a földben van – ezek más viszonyok.' },
      { id: 'V3f', text: 'Melyik szó NEM illik a többi közé?',
        options: ['elhalaszt', 'elodáz', 'siettet', 'halogat'], correct: 2,
        explain: 'Az elhalaszt, az elodáz és a halogat mind azt jelenti, hogy későbbre tolunk valamit. A siettet ennek éppen az ellentéte.' }
    ]},

    { id: 'F3', category: 'attention', level: 3, questions: [
      { id: 'F3a', text: 'Egy ütő és egy labda együtt 1100 Ft. Az ütő 1000 Ft-tal drágább, mint a labda. Mennyibe kerül a labda?',
        options: ['100 Ft', '10 Ft', '50 Ft', '150 Ft'], correct: 2,
        explain: 'Ha a labda 50 Ft, az ütő 1050 Ft, együtt 1100 Ft. A gyors „100 Ft” válasz csapda: akkor az ütő 1100 Ft lenne, együtt 1200 Ft.' },
      { id: 'F3b', text: 'Egy futóversenyen megelőzöd a másodikat. Hányadik vagy most?',
        options: ['Első', 'Harmadik', 'Második', 'Nem tudható'], correct: 2,
        explain: 'Ha a másodikat előzöd meg, az ő helyére lépsz: második leszel. Az első helyen továbbra is valaki más áll.' },
      { id: 'F3c', text: 'Hány hónapban van 28 nap?',
        options: ['1', '2', '11', '12'], correct: 3,
        explain: 'Mind a 12 hónapban van legalább 28 nap. A kérdés nem azt kérdezi, melyik hónap pontosan 28 napos.' },
      { id: 'F3d', text: 'Egy pásztornak 17 báránya van. Egy kivételével mind elszökik. Hány bárány marad?',
        options: ['16', '1', '0', '17'], correct: 1,
        explain: 'Az „egy kivételével mind elszökik” azt jelenti, hogy egy marad. A 16 csapda – az a megszökött bárányok száma.' },
      { id: 'F3e', text: 'Három almád van. Elveszel közülük kettőt. Hány almád van?',
        options: ['1', '3', '2', '0'], correct: 2,
        explain: 'A kérdés az, hogy neked mennyi van: a kettőt, amit elvettél, most te tartod. (Az 1 az asztalon maradt alma.)' },
      { id: 'F3f', text: 'Egy kikötött hajó oldalán kötéllétra lóg. A legalsó foka éppen a vízfelszínen van, a fokok 30 cm-re vannak egymástól. A dagály óránként 15 cm-rel emeli a vízszintet. Hány fok lesz víz alatt 4 óra múlva?',
        options: ['2', '0', '4', '1'], correct: 1,
        explain: 'A hajó a vízzel együtt emelkedik, a létrával együtt. Így egyetlen fok sem kerül víz alá – a számolás itt csak elterelés.' }
    ]}
  ]
});
