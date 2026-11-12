/**
 * Agytorna – Szabadúszó-próba témacsomag
 * --------------------------------------------------------------
 * 15 kérdéshely × 3 kérdés = 45 kérdés (bővíthető helyenként 6-ra).
 * Általános, jó gyakorlatokra épülő kérdések. Konkrét adókulcsokra,
 * adózási formákra és jogszabályokra szándékosan NEM kérdezünk,
 * mert ezek gyakran változnak.
 * A helyes válasz mindig az első (correct: 0) – a motor kitöltésenként
 * összekeveri a válaszok sorrendjét.
 */
AP15.registerPack({
  id: 'szabaduszo',
  title: 'Szabadúszó-próba',
  icon: '💼',
  cardDesc: 'Felkészült vagy a szabadúszásra? Árazás, ügyfelek, marketing és hatékonyság.',
  certPhrase: 'az Agytorna Szabadúszó-próbáját',
  cardLabel: 'SZABADÚSZÓ-PRÓBA · EREDMÉNYEM',
  certCongrats: 'Gratulálunk! Felkészültséged bizonyította: jó úton jársz az önálló, sikeres munka felé.',
  disclaimer: 'Játékos tudáspróba általános tájékoztatással – nem minősül jogi, adó- vagy pénzügyi tanácsadásnak.',

  review: { lastReviewed: '2026-11-12', intervalMonths: 6 },

  landing: {
    titleLead: 'Mennyire vagy kész',
    titleAccent: 'a szabadúszásra?',
    subtitle: '15 kérdés. Néhány perc. Valódi helyzetek.',
    lead: 'Árazás, ügyfélkezelés, marketing és időbeosztás – derítsd ki, mennyire vagy felkészült az önálló munkára!',
    features: [
      ['💼', '15 gyakorlati kérdés'],
      ['⏱️', '5–7 perc'],
      ['💎', 'Teljesen ingyenes'],
      ['⚡', 'Azonnali eredmény'],
      ['📜', 'Digitális oklevél']
    ]
  },

  rounds: {
    1: { label: '1. kör', name: 'Alapok' },
    2: { label: '2. kör', name: 'Mindennapi helyzetek' },
    3: { label: '3. kör', name: 'Profi kihívások' }
  },

  categories: {
    pricing:  { name: 'Árazás és pénzügyek',          short: 'Árazás',     icon: '💰', color: '#f5b942' },
    clients:  { name: 'Ügyfelek és kommunikáció',     short: 'Ügyfelek',   icon: '🤝', color: '#22d3ee' },
    marketing:{ name: 'Marketing és személyes márka', short: 'Marketing',  icon: '📣', color: '#f472b6' },
    focus:    { name: 'Hatékonyság és időbeosztás',   short: 'Hatékonyság', icon: '⏳', color: '#34d399' },
    business: { name: 'Vállalkozói alapok',           short: 'Alapok',     icon: '🧾', color: '#8b5cf6' }
  },

  levels: [
    { min: 0, max: 5, key: 'starter', title: 'Szabadúszó-jelölt', emoji: '🌱',
      summary: 'Most indulsz a szabadúszás felé – és ez izgalmas út! Az alapok gyorsan megtanulhatók, és sokat segít, ha tapasztaltabbaktól tanulsz.' },
    { min: 6, max: 9, key: 'beginner', title: 'Tudatos kezdő', emoji: '🔍',
      summary: 'Szép eredmény! Több fontos alapelvet már ismersz. Néhány területen még érdemes rendszert építeni – ez teszi a szabadúszást kiszámíthatóvá.' },
    { min: 10, max: 12, key: 'ready', title: 'Felkészült szabadúszó', emoji: '⚡',
      summary: 'Nagyon jó eredmény! Átlátod az árazást, az ügyfélkapcsolatokat és a saját idődet is. Erre az alapra stabil, növekvő vállalkozást lehet építeni.' },
    { min: 13, max: 15, key: 'pro', title: 'Szabadúszó profi', emoji: '🏆',
      summary: 'Kiemelkedő! Profi szemlélettel kezeled az ügyfeleket, az árazást és a saját működésedet. A következő lépés lehet a skálázás vagy mások mentorálása.' }
  ],

  categoryBands: [
    { min: 3, label: 'Erős terület',         tone: 'great' },
    { min: 2, label: 'Biztos alap',          tone: 'good'  },
    { min: 1, label: 'Fejleszthető terület', tone: 'ok'    },
    { min: 0, label: 'Felfedezésre vár',     tone: 'grow'  }
  ],

  tips: {
    pricing: [
      'Számold ki a minimális óradíjadat: havi célbevétel osztva a valóban számlázható órákkal.',
      'Nagyobb projekteknél kérj előleget, és mindig írásban rögzítsd az árat.'
    ],
    clients: [
      'Minden megbízás elején foglald össze írásban a feladatot, a határidőt és az árat.',
      'Jelezd előre, mikor és milyen csatornán vagy elérhető – ez csökkenti a feszültséget.'
    ],
    marketing: [
      'Fogalmazd meg egy mondatban: kinek, milyen problémáját oldod meg.',
      'Minden sikeres projekt után kérj rövid ajánlást, és építsd be a portfóliódba.'
    ],
    focus: [
      'Kötegeld a hasonló feladatokat (pl. e-mailek napi két idősávban).',
      'Ismétlődő munkákhoz készíts sablont és ellenőrzőlistát.'
    ],
    business: [
      'Minden bevételből tegyél félre egy részt az adókra és egy tartalékalapba.',
      'Konkrét adózási kérdésekben kérd könyvelő segítségét – a szabályok gyakran változnak.'
    ]
  },
  masterTip: 'Gondolkodj a következő szinten: termékesítés, ismétlődő bevétel vagy mások mentorálása egy közösségben.',

  slots: [
    /* ---------- 1. kör ---------- */
    { id: 'Z-A1', category: 'pricing', level: 1, questions: [
      { id: 'SZa1a', text: 'Mi a „fix áras” (projektáras) megbízás?',
        options: ['Előre megállapodott összeg a teljes munkáért, a ráfordított órák számától függetlenül', 'Óránként számolt díj', 'Ingyenes próbamunka', 'Havonta automatikusan emelkedő ár'], correct: 0,
        explain: 'Fix árnál az ügyfél előre tudja a végösszeget; neked ezért a becslésnél kell pontosnak lenned.' },
      { id: 'SZa1b', text: 'Mit érdemes beépíteni a díjaidba szabadúszóként?',
        options: ['Az eszközeid, előfizetéseid és a szabadság idejének költségét is', 'Csak a tényleges munkaórákat', 'Csak az ügyfél útiköltségét', 'Semmilyen költséget'], correct: 0,
        explain: 'Alkalmazottként ezeket a munkáltató fizeti; szabadúszóként a díjaidnak kell fedezniük őket.' },
      { id: 'SZa1c', text: 'Mi a legjobb módja az árajánlat elküldésének?',
        options: ['Írásban, a feladat, a határidő és az ár pontos leírásával', 'Szóban, telefonon, hogy gyorsabb legyen', 'Csak a végösszeget elküldve, magyarázat nélkül', 'Utólag, a munka befejezése után'], correct: 0,
        explain: 'Az írásos, részletes ajánlat egyértelmű, és később hivatkozni lehet rá.' }
    ]},
    { id: 'Z-U1', category: 'clients', level: 1, questions: [
      { id: 'SZu1a', text: 'Hogyan érdemes rögzíteni egy megbízás részleteit?',
        options: ['Írásban összefoglalod, és jóváhagyatod az ügyféllel', 'Szóban megbeszélitek, mindenki emlékszik rá', 'Sehogy, majd menet közben kiderül', 'Csak a saját jegyzetfüzetedbe írod'], correct: 0,
        explain: 'A közösen jóváhagyott írásos összefoglaló megelőzi a félreértéseket és a vitákat.' },
      { id: 'SZu1b', text: 'Mi a jó gyakorlat az ügyfél-e-mailekre adott válaszidővel kapcsolatban?',
        options: ['Előre jelzed, mennyi időn belül válaszolsz, és ezt tartod is', 'Mindig azonnal válaszolsz, éjjel is', 'Akkor válaszolsz, amikor eszedbe jut', 'Csak telefonon reagálsz'], correct: 0,
        explain: 'A kiszámíthatóság bizalmat épít, és közben a saját idődet is véded.' },
      { id: 'SZu1c', text: 'Nem érted pontosan, mit kér az ügyfél. Mit teszel?',
        options: ['Visszakérdezel, és a saját szavaiddal összefoglalod, amit kér', 'Kitalálod, mire gondolhatott', 'Visszautasítod a munkát', 'Elkezded, majd kiderül'], correct: 0,
        explain: 'A visszakérdezés és az összefoglalás percekbe kerül, a félreértés viszont napokba.' }
    ]},
    { id: 'Z-M1', category: 'marketing', level: 1, questions: [
      { id: 'SZm1a', text: 'Mi a portfólió?',
        options: ['Korábbi munkáid válogatott bemutatása', 'Egy bankszámlatípus', 'Az adóbevallásod', 'Egy irodai táska'], correct: 0,
        explain: 'A portfólió megmutatja, mit tudsz – az ügyfelek ez alapján döntenek a leggyakrabban.' },
      { id: 'SZm1b', text: 'Mire jó egy elégedett ügyfél ajánlása (véleménye)?',
        options: ['Bizalmat épít az új érdeklődőkben', 'Csökkenti az adódat', 'Kiváltja a szerződést', 'Semmire'], correct: 0,
        explain: 'Mások valódi tapasztalata meggyőzőbb, mint bármilyen saját dicséret.' },
      { id: 'SZm1c', text: 'Melyik bemutatkozó mondat a legmeggyőzőbb egy szabadúszó profilján?',
        options: ['„Kisvállalkozásoknak készítek gyors, mobilbarát weboldalakat.”', '„Mindent megcsinálok, amit kell.”', '„Szabadúszó vagyok.”', '„Olcsó vagyok.”'], correct: 0,
        explain: 'A jó bemutatkozás megmondja, kinek és mit oldasz meg – ettől lesz konkrét és emlékezetes.' }
    ]},
    { id: 'Z-H1', category: 'focus', level: 1, questions: [
      { id: 'SZh1a', text: 'Mit érdemes használni a feladataid és határidőid nyomon követésére?',
        options: ['Egy feladatlistát vagy naptárat', 'Csak az emlékezetedet', 'Az ügyfelek emlékeztetőit', 'Semmit, a határidők maguktól megoldódnak'], correct: 0,
        explain: 'Több ügyfél mellett egy egyszerű lista vagy naptár is rengeteg stressztől és csúszástól ment meg.' },
      { id: 'SZh1b', text: 'Mi a „pomodoro” technika lényege?',
        options: ['Rövid, fókuszált munkablokkok (pl. 25 perc) rövid szünetekkel váltakozva', 'Paradicsomos étrend munka közben', 'Egész napos megszakítás nélküli munka', 'Minden feladat azonnali delegálása'], correct: 0,
        explain: 'A rövid, időzített blokkok segítenek elkezdeni a munkát és fenntartani a fókuszt.' },
      { id: 'SZh1c', text: 'Melyik szokás segít leginkább elkerülni a figyelemelterelést munka közben?',
        options: ['Az értesítések kikapcsolása a fókuszidő alatt', 'Minden üzenetre azonnal válaszolni', 'Több feladaton dolgozni egyszerre', 'Háttérben videót nézni'], correct: 0,
        explain: 'Minden megszakítás után időbe telik visszatalálni a fókuszba; az értesítések lenémítása ezt előzi meg.' }
    ]},
    { id: 'Z-V1', category: 'business', level: 1, questions: [
      { id: 'SZv1a', text: 'Ki a szabadúszó?',
        options: ['Önálló szakember, aki több megbízónak dolgozik, nem alkalmazottként', 'Aki nem dolgozik', 'Egy cég teljes munkaidős alkalmazottja', 'Aki csak hétvégén dolgozik'], correct: 0,
        explain: 'A szabadúszó saját maga szervezi a munkáját, és jellemzően több ügyfélnek dolgozik.' },
      { id: 'SZv1b', text: 'Miért érdemes elkülöníteni a vállalkozói és a magánkiadásaidat?',
        options: ['Átláthatóbb a pénzügyed, és könnyebb a könyvelés', 'Mert így több pénzed lesz automatikusan', 'Mert így nem kell számlát adni', 'Nem érdemes, mindegy'], correct: 0,
        explain: 'Külön számlával vagy legalább külön nyilvántartással mindig látod, mennyit keres valójában a vállalkozásod.' },
      { id: 'SZv1c', text: 'Mit érdemes félretenni minden bevételből?',
        options: ['Egy részt az adókra és járulékokra, hogy a befizetéskor meglegyen', 'Semmit', 'A teljes összeget', 'Csak a borravalót'], correct: 0,
        explain: 'Így a befizetési határidő nem ér váratlanul. A pontos arányt érdemes könyvelővel egyeztetni.' }
    ]},

    /* ---------- 2. kör ---------- */
    { id: 'Z-A2', category: 'pricing', level: 2, questions: [
      { id: 'SZa2a', text: 'Az óradíjad 8000 Ft. Egy projektet 12 órára becsülsz, és 25% tartalékkal számolsz. Mennyi az ajánlati ár?',
        options: ['120 000 Ft', '96 000 Ft', '104 000 Ft', '108 000 Ft'], correct: 0,
        explain: '12 × 8000 = 96 000 Ft, ehhez jön 25% tartalék: 96 000 × 1,25 = 120 000 Ft.' },
      { id: 'SZa2b', text: 'Egy ügyfél 30% kedvezményt kér. Mi a legjobb válasz?',
        options: ['Az árral arányosan csökkented a munka terjedelmét, vagy megindoklod az árat', 'Azonnal elfogadod', 'Sértődötten megszakítod a kapcsolatot', 'A duplájára emeled az árat'], correct: 0,
        explain: 'Kedvezmény helyett érdemes a terjedelemről tárgyalni – így az értéked nem csökken.' },
      { id: 'SZa2c', text: 'Mi az előleg haszna egy nagyobb projektnél?',
        options: ['Csökkenti a kockázatot: az ügyfél elköteleződik, neked pedig a munka elején is van bevételed', 'Semmi, csak bonyolítja a dolgot', 'Kiváltja a szerződést', 'Az ügyfél így többet fizet'], correct: 0,
        explain: 'Az előleg mindkét fél elköteleződését jelzi, és védi a szabadúszót a ki nem fizetett munkától.' }
    ]},
    { id: 'Z-U2', category: 'clients', level: 2, questions: [
      { id: 'SZu2a', text: 'Projekt közben az ügyfél egyre több plusz feladatot kér az eredeti áron. Mi a helyes lépés?',
        options: ['Jelzed, hogy ez új tétel, és külön árajánlatot adsz rá', 'Mindent megcsinálsz ingyen, hogy elégedett legyen', 'Szó nélkül abbahagyod a munkát', 'Titokban lassítasz'], correct: 0,
        explain: 'Ezt hívják „feladatkúszásnak” (scope creep). Udvariasan, de egyértelműen különítsd el az új kéréseket.' },
      { id: 'SZu2b', text: 'Az ügyfél dühös e-mailt ír egy késés miatt, ami valóban a te hibád. Mi a legjobb első lépés?',
        options: ['Elnézést kérsz, vállalod a felelősséget, és konkrét új határidőt adsz', 'Az ügyfelet hibáztatod', 'Nem válaszolsz', 'Hosszan magyarázkodsz, határidő nélkül'], correct: 0,
        explain: 'A felelősségvállalás és egy konkrét megoldás gyorsabban helyreállítja a bizalmat, mint bármilyen magyarázat.' },
      { id: 'SZu2c', text: 'Mikor érdemes visszautasítani egy megbízást?',
        options: ['Ha nem fér bele a kapacitásodba, vagy nincs meg hozzá a szükséges tudásod', 'Soha', 'Ha kicsi az ügyfél', 'Ha hétfő van'], correct: 0,
        explain: 'Egy rosszul teljesített munka többet árt, mint egy udvarias nem. Akár egy kollégát is ajánlhatsz helyetted.' }
    ]},
    { id: 'Z-M2', category: 'marketing', level: 2, questions: [
      { id: 'SZm2a', text: 'Mi az előnye, ha egy szűkebb célpiacra (szakterületre) specializálódsz?',
        options: ['Könnyebb kitűnni, szakértőként ismernek meg, és célzottan kommunikálhatsz', 'Kevesebb munkát kell végezned', 'Automatikusan több ügyfeled lesz minden területről', 'Nincs előnye'], correct: 0,
        explain: 'A specialistát könnyebb megjegyezni és ajánlani, és általában magasabb díjat is kérhet.' },
      { id: 'SZm2b', text: 'Mikor a legjobb ajánlást kérni egy elégedett ügyféltől?',
        options: ['Közvetlenül a sikeres átadás után, néhány egyszerű kérdéssel megkönnyítve', 'Fél évvel később', 'Soha, kínos megkérdezni', 'A munka elején, még mielőtt bármit láttak'], correct: 0,
        explain: 'Amíg friss az élmény, az ügyfél szívesebben és konkrétabban ír. A rövid kérdések (pl. „Mi volt a legnagyobb segítség?”) megkönnyítik.' },
      { id: 'SZm2c', text: 'Mit jelent az „értékajánlat”?',
        options: ['Rövid megfogalmazás arról, kinek milyen problémáját oldod meg, és miben vagy más', 'Az árlistád', 'A legolcsóbb ajánlatod', 'Egy kedvezménykupon'], correct: 0,
        explain: 'Az értékajánlat választ ad arra, miért éppen téged válasszon az ügyfél.' }
    ]},
    { id: 'Z-H2', category: 'focus', level: 2, questions: [
      { id: 'SZh2a', text: 'Az Eisenhower-mátrix szerint mivel foglalkozz először?',
        options: ['A sürgős és fontos feladatokkal', 'A nem sürgős és nem fontos feladatokkal', 'A legkellemesebb feladatokkal', 'Amelyik a legrövidebb'], correct: 0,
        explain: 'A mátrix négy csoportra osztja a teendőket; a sürgős és fontos az első, a nem sürgős, de fontos a következő, amit be kell ütemezni.' },
      { id: 'SZh2b', text: 'Hogyan becsülheted meg pontosabban egy új típusú feladat időigényét?',
        options: ['Kisebb részekre bontod, mindegyikre becsülsz, majd tartalékot adsz hozzá', 'Ránézésre mondasz egy számot', 'Megkérdezed az ügyfelet, mennyi időt szán rá', 'Mindig 1 napot mondasz'], correct: 0,
        explain: 'A részfeladatokra bontott becslés sokkal pontosabb, a tartalék pedig fedezi a váratlan akadályokat.' },
      { id: 'SZh2c', text: 'Mit jelent a feladatok „kötegelése”?',
        options: ['A hasonló feladatokat egy blokkban végzed, pl. minden e-mailt egyszerre', 'Minden feladatot külön napra teszel', 'A feladatokat másra bízod', 'A feladatokat véletlenszerű sorrendben végzed'], correct: 0,
        explain: 'A kötegelés csökkenti a feladatváltásokból adódó időveszteséget.' }
    ]},
    { id: 'Z-V2', category: 'business', level: 2, questions: [
      { id: 'SZv2a', text: 'Mi egy megbízási szerződés egyik legfontosabb tartalmi eleme?',
        options: ['A feladat pontos leírása, a határidő és a díjazás', 'Az ügyfél kedvenc színe', 'A szerződés betűtípusa', 'A szabadúszó hobbija'], correct: 0,
        explain: 'Ha ezek egyértelműek, a legtöbb későbbi vita megelőzhető.' },
      { id: 'SZv2b', text: 'Miért fontos a rendszeres biztonsági mentés a munkáidról?',
        options: ['Gépelromlás vagy lopás esetén sem vesznek el az ügyfélmunkák', 'Mert gyorsabb lesz tőle a gép', 'Mert az ügyfelek így többet fizetnek', 'Nem fontos, a gépek nem romlanak el'], correct: 0,
        explain: 'Egy elveszett projekt pénzbe és bizalomba kerül; az automatikus mentés olcsó biztosítás.' },
      { id: 'SZv2c', text: 'Mi a „vésztartalék” lényege szabadúszóknál?',
        options: ['Néhány havi kiadásnak megfelelő összeg félretéve a gyengébb hónapokra', 'Egy hitelkártya-keret', 'A következő havi bevétel előre elköltése', 'Egy ügyfél, aki mindig fizet'], correct: 0,
        explain: 'A szabadúszó bevétele hullámzó; a tartalék biztonságot ad, és nem kényszerít rossz megbízások elvállalására.' }
    ]},

    /* ---------- 3. kör ---------- */
    { id: 'Z-A3', category: 'pricing', level: 3, questions: [
      { id: 'SZa3a', text: 'Havi 600 000 Ft bevételt szeretnél. Havonta kb. 100 órát tudsz ténylegesen ügyfélmunkaként kiszámlázni (a többi idő admin és marketing). Legalább mekkora óradíj kell?',
        options: ['6000 Ft', '3750 Ft', '5000 Ft', '7500 Ft'], correct: 0,
        explain: '600 000 : 100 = 6000 Ft. A 3750 Ft csapda: az a teljes, kb. 160 órás munkaidővel számol, pedig abból nem minden óra számlázható.' },
      { id: 'SZa3b', text: 'Mi az „értékalapú árazás”?',
        options: ['Az árat az ügyfélnek nyújtott eredmény értékéhez igazítod, nem csak a ráfordított időhöz', 'Mindig a legolcsóbb versenytárs árát kéred', 'Az árat a saját hangulatodhoz igazítod', 'Csak órabérben dolgozol'], correct: 0,
        explain: 'Ha a munkád például havi többletbevételt hoz az ügyfélnek, az ár ehhez az értékhez is igazodhat.' },
      { id: 'SZa3c', text: 'Egy 300 000 Ft-os projektnél az ügyfél 45 napos fizetési határidőt kér, te általában 8 napot adsz. Mi a legjobb megoldás?',
        options: ['Előleget kérsz, és a fennmaradó részre elfogadod a hosszabb határidőt vagy részszámlázást javasolsz', 'Szó nélkül elfogadod', 'Azonnal lemondod a projektet', 'A teljes összeget előre kéred, kétszeres áron'], correct: 0,
        explain: 'Az előleg és a részszámlázás egyensúlyt teremt: az ügyfél rugalmasságot kap, te pedig nem finanszírozod a projektet hetekig.' }
    ]},
    { id: 'Z-U3', category: 'clients', level: 3, questions: [
      { id: 'SZu3a', text: 'A projekt végén az ügyfél azt mondja: „nem ilyenre gondoltam”, pedig minden az írásos megállapodás szerint készült. Mi a legjobb lépés?',
        options: ['A megállapodásra hivatkozva tisztázod, mi készült el, és a változtatásokra külön ajánlatot adsz', 'Mindent ingyen újracsinálsz', 'Megsértődsz, és nem válaszolsz', 'Nem adod át az elkészült munkát'], correct: 0,
        explain: 'Az írásos megállapodás éppen erre való: tárgyszerű alapot ad, a módosítások pedig új munkának számítanak.' },
      { id: 'SZu3b', text: 'Mi előzi meg legjobban a félreértéseket egy több hetes projektben?',
        options: ['Előre egyeztetett mérföldkövek és rendszeres, rövid állapotjelentések', 'Csak a végén mutatod meg az eredményt', 'Minél kevesebb kommunikáció', 'Napi többórás megbeszélések'], correct: 0,
        explain: 'A közbenső ellenőrzési pontoknál az eltérések korán kiderülnek, amikor még könnyű javítani őket.' },
      { id: 'SZu3c', text: 'Egy ügyfél 30 napja nem fizetett, pedig lejárt a határidő. Mi a helyes sorrend?',
        options: ['Udvarias emlékeztető → határozott felszólítás új határidővel → a további munka felfüggesztése, végső esetben jogi lépés', 'Azonnal ügyvédhez fordulsz', 'Nyilvánosan megszégyeníted a közösségi médiában', 'Nem teszel semmit, majd fizet'], correct: 0,
        explain: 'A fokozatos, írásos lépések gyakran megoldják a helyzetet, és ha mégsem, dokumentáltan állsz a további lépésekhez.' }
    ]},
    { id: 'Z-M3', category: 'marketing', level: 3, questions: [
      { id: 'SZm3a', text: 'Melyik mutató mond a legtöbbet egy szabadúszó weboldalának üzleti hatékonyságáról?',
        options: ['Hány látogatóból lesz érdeklődő (konverziós arány)', 'Hány színt használ az oldal', 'Hány aloldalból áll', 'Hány lájkot kapott a profilkép'], correct: 0,
        explain: 'A forgalom önmagában keveset mond; az számít, hány látogatóból lesz megkeresés vagy ügyfél.' },
      { id: 'SZm3b', text: 'Mi az „érdeklődőszerző ajánlat” (lead magnet)?',
        options: ['Ingyenes, hasznos tartalom (pl. útmutató, teszt), amelyet az érdeklődő az elérhetőségéért cserébe kap', 'Egy erős mágnes az iroda ajtaján', 'Egy fizetett hirdetés', 'Egy ügyfél, aki mindig visszatér'], correct: 0,
        explain: 'Például egy ingyenes teszt oklevéllel – mint ez az Agytorna – valódi értéket ad, és kapcsolatot épít.' },
      { id: 'SZm3c', text: 'Egy szabadúszó minden közösségi platformon jelen akar lenni, de egyiken sem halad. Mi a legjobb tanács?',
        options: ['1–2 platformra fókuszál, ahol a célügyfelei vannak, és ott rendszeresen jelen van', 'Még több platformra regisztrál', 'Abbahagyja a marketinget', 'Követőket vásárol'], correct: 0,
        explain: 'A rendszeresség és a megfelelő közönség többet ér, mint a mindenhol felületes jelenlét.' }
    ]},
    { id: 'Z-H3', category: 'focus', level: 3, questions: [
      { id: 'SZh3a', text: 'Parkinson törvénye szerint „a munka kitölti a rendelkezésre álló időt”. Mi ebből a gyakorlati tanulság?',
        options: ['Reális, de feszes belső határidőket érdemes szabni magadnak', 'Minden feladatra a lehető legtöbb időt kell hagyni', 'A határidők feleslegesek', 'Mindig az utolsó pillanatban kell kezdeni'], correct: 0,
        explain: 'Ha egy feladatra „egész hét” jut, általában egész hétig is tart. A belső határidő fókuszt ad.' },
      { id: 'SZh3b', text: 'Sok apró ügyfélkérés szétszabdalja a napjaidat. Mi a leghatékonyabb megoldás?',
        options: ['Fix ügyfélidősávokat jelölsz ki, és a kéréseket ezekben kötegelve intézed', 'Minden kérésre azonnal reagálsz', 'Figyelmen kívül hagyod a kéréseket', 'Éjszaka dolgozol, hogy napközben ráérj'], correct: 0,
        explain: 'Az előre közölt idősávok kiszámíthatóak az ügyfélnek, neked pedig összefüggő fókuszidőt hagynak.' },
      { id: 'SZh3c', text: 'Hogyan teheted a leggyorsabbá egy rendszeresen ismétlődő feladatot (pl. ajánlatkészítést)?',
        options: ['Sablont és ellenőrzőlistát készítesz, és ahol lehet, automatizálsz', 'Minden alkalommal a nulláról kezded', 'Gyorsabban gépelsz', 'Kihagyod az ellenőrzést'], correct: 0,
        explain: 'Ami ismétlődik, azt érdemes egyszer jól megcsinálni, és utána újrahasznosítani.' }
    ]},
    { id: 'Z-V3', category: 'business', level: 3, questions: [
      { id: 'SZv3a', text: 'Mi a fő kockázata annak, ha a bevételed 80%-a egyetlen ügyféltől származik?',
        options: ['Ha az ügyfél elmegy, a bevételed nagy része egyszerre megszűnik', 'Semmi, ez a legbiztonságosabb', 'Túl sok adminisztráció', 'Túl sok különböző feladat'], correct: 0,
        explain: 'A kitettség egyetlen ügyféltől sérülékennyé tesz – érdemes fokozatosan több lábon állni.' },
      { id: 'SZv3b', text: 'Mi a jó gyakorlat egy elkészült munka (pl. design, szöveg) felhasználási jogaival kapcsolatban?',
        options: ['A szerződésben rögzíted, mikor és milyen jogok szállnak át, pl. a teljes kifizetés után', 'Nem kell vele foglalkozni', 'Mindig a tiéd marad, az ügyfél nem használhatja', 'Az ügyfél a munka elején minden jogot megkap, fizetéstől függetlenül'], correct: 0,
        explain: 'Az egyértelmű jogátruházási feltétel védi a szabadúszót, és az ügyfélnek is biztonságot ad. Részletekben jogász tud segíteni.' },
      { id: 'SZv3c', text: 'Egy hónapban kiugróan magas a bevételed. Mi a legjobb lépés?',
        options: ['Először félreteszed az adóra és a tartalékra eső részt, csak utána költesz', 'Rögtön elköltöd, hiszen megérdemelted', 'Azonnal felmondasz minden kisebb ügyfelednek', 'Megduplázod az áraidat'], correct: 0,
        explain: 'Egy erős hónap után is jöhet gyengébb; a félretett rész kisimítja a hullámzást.' }
    ]}
  ]
});
