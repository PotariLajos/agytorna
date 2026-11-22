/**
 * Agytorna – Szabadúszó-próba témacsomag
 * --------------------------------------------------------------
 * 15 kérdéshely × 6 kérdés = 90 kérdés.
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

  review: { lastReviewed: '2026-11-22', intervalMonths: 6 },

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
        explain: 'Az írásos, részletes ajánlat egyértelmű, és később hivatkozni lehet rá.' },
      { id: "SZa1d", text: "Mi az óradíj?",
        options: ["Az a díj, amit egy óra munkádért kérsz", "A havi fizetésed", "Az ügyféltől kapott borravaló", "A bankszámla havidíja"], correct: 0,
        explain: "Az óradíj az árazás alapja – akkor is érdemes ismerned a sajátodat, ha projektárat adsz." },
      { id: "SZa1e", text: "Miért nem jó stratégia mindig a legolcsóbbnak lenni?",
        options: ["Mert kevés bevételt és gyakran nehéz ügyfeleket hoz – jobb az értéket hangsúlyozni", "Mert tilos", "Mert úgysem fizet senki", "Mert a legolcsóbb mindig megnyeri az összes munkát"], correct: 0,
        explain: "Az árverseny lefelé visz. Aki a minőséget, a megbízhatóságot és az eredményt mutatja meg, jobb ügyfeleket és több bevételt szerez." },
      { id: "SZa1f", text: "Mit érdemes megadni egy árajánlatban az ár mellett?",
        options: ["Mit tartalmaz a munka, mennyi a határidő, és meddig érvényes az ajánlat", "Csak egy számot", "A saját magánéletedet", "Semmit, az ár mindent elmond"], correct: 0,
        explain: "A világos ajánlat megelőzi a vitákat: az ügyfél pontosan látja, mit kap és mikor." }
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
        explain: 'A visszakérdezés és az összefoglalás percekbe kerül, a félreértés viszont napokba.' },
      { id: "SZu1d", text: "Hol találhatod meg a legkönnyebben az első ügyfeleidet?",
        options: ["A saját ismeretségi körödben és olyan közösségekben, ahol már megbíznak benned", "Kizárólag drága hirdetésekkel", "Sehol, az ügyfél magától jön", "Csak külföldön"], correct: 0,
        explain: "Az első megbízások gyakran ismerősök, volt kollégák vagy szakmai közösségek ajánlásából jönnek – a bizalom a legjobb belépő." },
      { id: "SZu1e", text: "Mi a jó első lépés egy új ügyféllel?",
        options: ["Rövid egyeztetés a céljairól, a határidőről és a keretről", "Azonnal elkezded a munkát kérdések nélkül", "Elküldöd a számlát", "Megvárod, hogy mindent ő kérdezzen"], correct: 0,
        explain: "Egy 15 perces jó beszélgetés napoknyi félreértést előz meg – és profi benyomást kelt." },
      { id: "SZu1f", text: "Mit érdemes küldeni egy projekt átadása után?",
        options: ["Rövid köszönőüzenetet, összefoglalót, és megkérdezed, elégedett-e", "Semmit", "Kérés nélkül rögtön egy újabb árajánlatot", "Panaszt a projekt nehézségeiről"], correct: 0,
        explain: "A gondos lezárás emlékezetes – ilyenkor szívesen ajánlanak és visszatérnek az ügyfelek." }
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
        explain: 'A jó bemutatkozás megmondja, kinek és mit oldasz meg – ettől lesz konkrét és emlékezetes.' },
      { id: "SZm1d", text: "Mi a személyes márka szabadúszóként?",
        options: ["Az, amiről ismernek és amiért ajánlanak: a szakértelmed, a stílusod és az értékeid együtt", "A logód színe", "Egy cégbejegyzés", "Egy drága névjegykártya"], correct: 0,
        explain: "A személyes márka nem reklám, hanem hírnév: amit az ügyfelek mondanak rólad, amikor nem vagy jelen." },
      { id: "SZm1e", text: "Melyik tartalom vonzza leginkább a leendő ügyfeleket?",
        options: ["Hasznos tipp vagy rövid esettanulmány, amely az ő problémájukra ad választ", "Csak arról írni, mennyire elfoglalt vagy", "Panaszkodás az ügyfelekre", "Árlista magyarázat nélkül"], correct: 0,
        explain: "Ha rendszeresen segítesz ingyen egy kis tudással, az emberek szakértőként kezdenek rád gondolni – és megkeresnek." },
      { id: "SZm1f", text: "Milyen legyen egy jó szakmai profilkép?",
        options: ["Barátságos, jól látható arc, egyszerű háttérrel", "Napszemüveges csoportkép egy buliról", "Egy elmosódott logó", "Egy tájkép"], correct: 0,
        explain: "Az emberek emberektől vásárolnak: egy barátságos, tiszta portré sokkal több bizalmat ébreszt." }
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
        explain: 'Minden megszakítás után időbe telik visszatalálni a fókuszba; az értesítések lenémítása ezt előzi meg.' },
      { id: "SZh1d", text: "Miért jó, ha minden reggel kiválasztod a nap 1–3 legfontosabb feladatát?",
        options: ["Mert így a nap végére biztosan elkészül az, ami valóban számít", "Hogy kevesebbet dolgozz", "Mert így a többi feladat eltűnik", "Nincs jelentősége"], correct: 0,
        explain: "Szabadúszóként te vagy a saját főnököd – a világos napi prioritás a legegyszerűbb hatékonysági eszköz." },
      { id: "SZh1e", text: "Mi segít, hogy otthonról dolgozva is legyen munkaidő és pihenőidő?",
        options: ["Rögzített munkaidő-keretek és egy kijelölt munkasarok", "Egész nap az ágyból dolgozni", "Éjjel-nappal elérhetőnek lenni", "Soha nem tartani szünetet"], correct: 0,
        explain: "A szabadság akkor jó, ha keretek is vannak: így a munka nem folyik bele az egész napodba." },
      { id: "SZh1f", text: "Mit érdemes tenni, ha egy feladat túl nagynak tűnik ahhoz, hogy elkezdd?",
        options: ["Kisebb, konkrét lépésekre bontod, és az elsővel azonnal kezdesz", "Halogatod, amíg kisebb nem lesz", "Egyszerre mindent csinálsz", "Lemondasz a projektről"], correct: 0,
        explain: "Az első 10 perc a legnehezebb. Ha a lépés kicsi és konkrét („írd meg a vázlat 3 pontját”), a halogatás elolvad." }
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
        explain: 'Így a befizetési határidő nem ér váratlanul. A pontos arányt érdemes könyvelővel egyeztetni.' },
      { id: "SZv1d", text: "Miért vonzó sokaknak a szabadúszás?",
        options: ["Mert maga osztja be az idejét, és megválaszthatja, kivel és min dolgozik", "Mert sosem kell dolgozni", "Mert nincs felelősség", "Mert garantált a fix fizetés"], correct: 0,
        explain: "A szabadúszás igazi ajándéka a döntési szabadság – ehhez önfegyelem és tudatos tervezés párosul." },
      { id: "SZv1e", text: "Mire figyelj, mielőtt szabadúszóként számlázni kezdesz?",
        options: ["Legyen megfelelő vállalkozási formád, és ismerd az adózási lehetőségeidet – ebben könyvelő segít", "Semmire, bárki adhat számlát", "Csak a számla színére", "Arra, hogy minél később fizess adót"], correct: 0,
        explain: "A jó kezdés fél siker: egy könyvelővel érdemes átbeszélni, melyik forma és adózás a legkedvezőbb számodra." },
      { id: "SZv1f", text: "Mire jó egy egyszerű bevétel–kiadás táblázat?",
        options: ["Látod, mennyit keresel ténylegesen, és mire megy el a pénz", "Csak a könyvelőnek kell", "Semmire", "Csak a banknak kötelező"], correct: 0,
        explain: "Amit mérsz, azt tudod javítani: már egy egyszerű táblázat is megmutatja, melyik munka éri meg igazán." }
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
        explain: 'Az előleg mindkét fél elköteleződését jelzi, és védi a szabadúszót a ki nem fizetett munkától.' },
      { id: "SZa2d", text: "Egy projektet 150 000 Ft-ért vállalsz, és 30 órát dolgozol rajta. Mennyi a tényleges óradíjad?",
        options: ["5 000 Ft", "4 500 Ft", "6 000 Ft", "3 000 Ft"], correct: 0,
        explain: "150 000 ÷ 30 = 5 000 Ft/óra. Érdemes minden projekt után kiszámolni – így látod, melyik munka éri meg." },
      { id: "SZa2e", text: "Mi az előnye, ha háromféle csomagot (alap, közepes, prémium) kínálsz?",
        options: ["Az ügyfél választhat, és sokan a középső vagy a drágább csomagot választják", "Bonyolultabb, ezért mindig rossz", "Mindenki a legolcsóbbat választja", "Semmi különbség nincs"], correct: 0,
        explain: "A választási lehetőség növeli a bizalmat, a középső csomag pedig gyakran a legnépszerűbb – ez emeli az átlagos bevételt." },
      { id: "SZa2f", text: "Mikor érdemes árat emelni?",
        options: ["Ha tele vagy munkával, nőtt a tapasztalatod, és az ügyfelek elégedettek", "Soha", "Minden héten", "Amikor egyáltalán nincs ügyfeled"], correct: 0,
        explain: "Ha a naptárad megtelt, az a piac jelzése: értékesebb vagy, mint amennyit kérsz. Az új ügyfeleknél kezdd az emelést." }
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
        explain: 'Egy rosszul teljesített munka többet árt, mint egy udvarias nem. Akár egy kollégát is ajánlhatsz helyetted.' },
      { id: "SZu2d", text: "Az ügyfél ötödször kér „még egy apró módosítást”. Hogyan előzheted meg ezt legközelebb?",
        options: ["Az ajánlatban rögzíted, hány javítási kör jár az árban", "Minden kérést ingyen teljesítesz", "Nem válaszolsz", "Utólag szó nélkül megemeled az árat"], correct: 0,
        explain: "A „2 javítási kör az árban, utána óradíj” típusú szabály mindkét félnek tiszta helyzetet teremt." },
      { id: "SZu2e", text: "Hogyan mondj nemet úgy, hogy megmaradjon a jó kapcsolat?",
        options: ["Udvariasan megindokolod, és alternatívát ajánlasz (pl. későbbi időpontot vagy külön díjat)", "Egyszerűen nem válaszolsz", "Ingerülten visszautasítod", "Igent mondasz, aztán nem csinálod meg"], correct: 0,
        explain: "A jó „nem” egyben ajánlat is: az ügyfél érzi, hogy fontos, és tudja, mire számíthat." },
      { id: "SZu2f", text: "Miért érdemes hosszabb projektnél rendszeres rövid állapotjelentést küldeni?",
        options: ["Az ügyfél nyugodt, látja a haladást, és korán kiderülnek az eltérések", "Hogy több e-mailed legyen", "Mert törvény írja elő", "Nincs haszna"], correct: 0,
        explain: "Egy heti 3 soros összefoglaló („kész, folyamatban, kérdés”) rengeteg bizalmat épít." }
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
        explain: 'Az értékajánlat választ ad arra, miért éppen téged válasszon az ügyfél.' },
      { id: "SZm2d", text: "Mi az esettanulmány?",
        options: ["Egy elvégzett munka bemutatása: mi volt a probléma, mit tettél, és mi lett az eredmény", "Egy tankönyvfejezet", "Egy panaszlevél", "Egy árlista"], correct: 0,
        explain: "Az esettanulmány a legmeggyőzőbb marketing: a leendő ügyfél magára ismer a problémában, és látja az eredményt." },
      { id: "SZm2e", text: "Hogyan segíthet egy szakmai tanuló közösség a szabadúszónak?",
        options: ["Másoktól tanulhatsz, kapcsolatokat építhetsz, és gyakran megbízások is innen érkeznek", "Csak időrabló", "Kizárólag szórakozás", "Ott tilos üzletről beszélni"], correct: 0,
        explain: "Egyedül lassabb az út: egy jó közösségben megosztják a bevált módszereket, és egymást ajánlják a tagok." },
      { id: "SZm2f", text: "Mit érdemes megmutatni a portfóliódban?",
        options: ["A legjobb, a célügyfeleidhez legjobban illő munkáidat, rövid leírással", "Minden valaha készült munkádat válogatás nélkül", "Csak a legolcsóbb munkáidat", "Semmit, a tudás magáért beszél"], correct: 0,
        explain: "A kevesebb több: 5–8 jól kiválasztott munka rövid magyarázattal sokkal erősebb, mint 50 válogatás nélkül." }
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
        explain: 'A kötegelés csökkenti a feladatváltásokból adódó időveszteséget.' },
      { id: "SZh2d", text: "Mit jelent az „időblokkolás”?",
        options: ["A naptáradban előre kijelölsz idősávokat egy-egy feladattípusra", "Letiltod az órát a telefonodon", "Soha nem nézel órát", "Csak éjszaka dolgozol"], correct: 0,
        explain: "Például: délelőtt alkotó munka, délután e-mailek és egyeztetések. A blokkok védik a fókuszt." },
      { id: "SZh2e", text: "Hogyan segíthet az AI a szabadúszó adminisztrációjában?",
        options: ["Árajánlat-, e-mail- és összefoglaló-vázlatokat készít, amelyeket te átnézel", "Helyetted tárgyal az ügyféllel", "Ellenőrzés nélkül kitölti az adóbevallást", "Semmiben"], correct: 0,
        explain: "Az AI-val a rutinszövegek percek alatt elkészülnek – így több időd marad a fizetős, érdemi munkára." },
      { id: "SZh2f", text: "Mi a kiégés egyik legjobb megelőzése?",
        options: ["Rendszeres pihenő, határok kijelölése és reális vállalások", "Még több kávé", "Minden megbízás elvállalása", "Egész évben szabadság nélkül dolgozni"], correct: 0,
        explain: "A szabadúszó legfontosabb „munkaeszköze” te magad vagy – a pihenés befektetés, nem luxus." }
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
        explain: 'A szabadúszó bevétele hullámzó; a tartalék biztonságot ad, és nem kényszerít rossz megbízások elvállalására.' },
      { id: "SZv2d", text: "Mit nevezünk skálázható bevételnek?",
        options: ["Olyan bevételt, amely nem közvetlenül a ledolgozott órákon múlik, pl. egy online kurzus vagy sablon eladása", "A fizetésemelést", "Egy bankkölcsönt", "A borravalót"], correct: 0,
        explain: "Az órabér plafonja a napi 24 óra. Egy egyszer elkészített termék (kurzus, sablon, e-könyv) sokszor eladható." },
      { id: "SZv2e", text: "Miért fontos, hogy a megállapodásban szerepeljen a fizetési határidő?",
        options: ["Mert egyértelmű, mikor kell fizetni, és késés esetén hivatkozhatsz rá", "Mert szebben mutat", "Nincs jelentősége", "Mert az ügyfél úgyis akkor fizet, amikor akar"], correct: 0,
        explain: "A világos határidő a legegyszerűbb védelem a késedelmes fizetés ellen." },
      { id: "SZv2f", text: "Egy hónapban 400 000 Ft a bevételed és 120 000 Ft a költséged. Mennyi a nyereséged adó előtt?",
        options: ["280 000 Ft", "520 000 Ft", "400 000 Ft", "120 000 Ft"], correct: 0,
        explain: "400 000 − 120 000 = 280 000 Ft. Nem a bevétel, hanem a nyereség mutatja meg, mennyit keresel valójában." }
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
        explain: 'Az előleg és a részszámlázás egyensúlyt teremt: az ügyfél rugalmasságot kap, te pedig nem finanszírozod a projektet hetekig.' },
      { id: "SZa3d", text: "Az óradíjad 10 000 Ft, de a munkaidődnek csak 60%-a számlázható. Összesen hány órát kell dolgoznod 600 000 Ft bevételhez?",
        options: ["100 órát", "60 órát", "80 órát", "120 órát"], correct: 0,
        explain: "600 000 ÷ 10 000 = 60 számlázható óra kell. Ha ez a munkaidő 60%-a, akkor összesen 60 ÷ 0,6 = 100 órát dolgozol." },
      { id: "SZa3e", text: "Mi a havidíjas (állandó megbízásos) együttműködés fő előnye?",
        options: ["Kiszámítható, rendszeres bevétel és hosszú távú ügyfélkapcsolat", "Mindig kevesebb munka", "Nem kell számlázni", "Nincs határidő"], correct: 0,
        explain: "Néhány havidíjas ügyfél stabil alapot ad – így nyugodtabban választhatod meg a további projekteket." },
      { id: "SZa3f", text: "Az ügyfél azt mondja: „Ez túl drága.” Mi a legjobb első reakció?",
        options: ["Rákérdezel, mihez viszonyítja, megmutatod az értéket, vagy kisebb terjedelmet ajánlasz", "Azonnal a felére csökkented az árat", "Megsértődsz", "Nem válaszolsz"], correct: 0,
        explain: "A „drága” gyakran azt jelenti: „nem látom, mit kapok érte”. Az érték megmutatása vagy a terjedelem igazítása megőrzi az árad becsületét." }
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
        explain: 'A fokozatos, írásos lépések gyakran megoldják a helyzetet, és ha mégsem, dokumentáltan állsz a további lépésekhez.' },
      { id: "SZu3d", text: "Hogyan lesz egy egyszeri ügyfeledből visszatérő ügyfél?",
        options: ["A kiváló munka után magadtól javasolsz egy következő lépést, ami az ő céljait szolgálja", "Többé nem keresed", "Hetente kéretlen ajánlatot küldesz", "Drágábban számlázol neki"], correct: 0,
        explain: "Ha érted az ügyfél céljait, te veszed észre a következő lehetőséget – ez a legtermészetesebb értékesítés." },
      { id: "SZu3e", text: "Nem akarsz tovább együtt dolgozni egy ügyféllel. Mi a profi lezárás?",
        options: ["Előre jelzed, rendesen befejezed a vállalt munkát, és ha tudsz, ajánlasz mást helyetted", "Egyszerűen eltűnsz", "A munka közepén abbahagyod", "Megmondod neki, hogy rossz ügyfél"], correct: 0,
        explain: "A szakmai hírneved azon is múlik, hogyan zársz le egy kapcsolatot – a korrekt befejezés hosszú távon kifizetődik." },
      { id: "SZu3f", text: "Mi segít leginkább, ha egy ügyfél gyakran változtat a döntésein?",
        options: ["Minden döntést írásban visszaigazolsz, a változásokat pedig külön egyeztetett díjjal és határidővel kezeled", "Mindent szó nélkül újracsinálsz", "Nem foglalkozol a változásokkal", "Azonnal megszakítod a kapcsolatot"], correct: 0,
        explain: "Az írásos visszaigazolás („Ahogy megbeszéltük: …”) és a változáskezelés rendet visz a legkaotikusabb projektbe is." }
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
        explain: 'A rendszeresség és a megfelelő közönség többet ér, mint a mindenhol felületes jelenlét.' },
      { id: "SZm3d", text: "Mi a „közösségi bizonyíték” (social proof)?",
        options: ["Mások pozitív tapasztalata – vélemények, eredmények, ismert ügyfelek –, ami bizalmat épít", "Egy hatósági igazolás", "Megvásárolt követők", "Egy közösségi oldal szabályzata"], correct: 0,
        explain: "Az emberek arra figyelnek, mit tapasztaltak mások. Néhány hiteles vélemény többet ér bármilyen reklámszövegnél." },
      { id: "SZm3e", text: "Mit jelent a marketingben a „tölcsér”?",
        options: ["Azt az utat, amelyen egy érdeklődő megismer, kipróbál, majd ügyféllé válik", "Egy konyhai eszközt", "A hirdetési költséget", "A weboldal betűtípusát"], correct: 0,
        explain: "Ez a kvíz is ilyen: kipróbálod (teszt), kapsz valamit (oklevél), és felkínálunk egy következő lépést (közösség)." },
      { id: "SZm3f", text: "Hogyan lesz egy ingyenes tartalomból (pl. kvízből vagy útmutatóból) ügyfél?",
        options: ["Valódi értéket adsz, majd egy világos, nem tolakodó következő lépést kínálsz", "Elrejted a lényeget, hogy fizessen", "Kéretlen e-mailekkel árasztod el", "Nem kínálsz semmilyen következő lépést"], correct: 0,
        explain: "Az ingyenes érték bizalmat épít; a világos, de nem nyomulós ajánlat pedig utat mutat annak, akit érdekel a folytatás." }
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
        explain: 'Ami ismétlődik, azt érdemes egyszer jól megcsinálni, és utána újrahasznosítani.' },
      { id: "SZh3d", text: "Mi a 80/20 szabály (Pareto-elv) tanulsága egy szabadúszónak?",
        options: ["Az eredmények nagy része gyakran a tevékenységek kis részéből jön – ezekre érdemes fókuszálni", "Heti 80 órát kell dolgozni", "Az ügyfelek 80%-a sosem fizet", "Mindig 20% kedvezményt kell adni"], correct: 0,
        explain: "Nézd meg, melyik 20% ügyfél és tevékenység hozza a bevétel zömét – és tegyél bele több energiát." },
      { id: "SZh3e", text: "Hogyan szabadíthatsz fel heti több órát anélkül, hogy kevesebbet dolgoznál az érdemi munkán?",
        options: ["Automatizálod vagy kiszervezed az ismétlődő, alacsony értékű feladatokat", "Kevesebbet alszol", "Nem válaszolsz az ügyfeleknek", "Nem tartasz szünetet"], correct: 0,
        explain: "Számlázás, időpontfoglalás, sablon-e-mailek – ezek nagy része automatizálható, AI-val pedig még gyorsabb." },
      { id: "SZh3f", text: "Melyik heti szokás javítja legjobban a következő hét hatékonyságát?",
        options: ["Péntek délutáni rövid áttekintés: mi készült el, mi csúszott, mi a 3 fő cél jövő hétre", "Hétvégén minden e-mailre azonnal válaszolni", "Hétfő reggel rögtönözni a teendőket", "Semmilyen tervezés"], correct: 0,
        explain: "Egy 15 perces heti áttekintés tisztánlátást ad, és hétfőn már indulhatsz is a fontos munkával." }
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
        explain: 'Egy erős hónap után is jöhet gyengébb; a félretett rész kisimítja a hullámzást.' },
      { id: "SZv3d", text: "Miért érdemes tanuló közösséghez vagy mentorhoz csatlakozni szabadúszóként?",
        options: ["Mások tapasztalatából gyorsabban tanulsz, és elkerülheted a drága hibákat", "Mert kötelező", "Hogy ne kelljen dolgozni", "Nincs haszna"], correct: 0,
        explain: "Amit egy tapasztaltabb társ egy beszélgetésben elmond, arra egyedül hónapok alatt jönnél rá." },
      { id: "SZv3e", text: "Mit jelent a bevételek diverzifikálása?",
        options: ["Több ügyfélből és bevételi forrásból élsz, így egy kiesés nem borít fel mindent", "Csak egyetlen ügyféllel dolgozol", "Minden bevételt egy számlán tartasz", "Csak devizában számlázol"], correct: 0,
        explain: "Több láb – több stabilitás: például 4–5 ügyfél, plusz egy kis termékbevétel." },
      { id: "SZv3f", text: "Mi a szabadúszó legjobb hosszú távú befektetése?",
        options: ["A saját tudása és készségei folyamatos fejlesztése", "Minden évben a legdrágább laptop", "Minél több előfizetés", "Semmi, a mostani tudás elég"], correct: 0,
        explain: "A piac változik – az AI-val különösen gyorsan. Aki folyamatosan tanul, az mindig keresett marad." }
    ]}
  ]
});
