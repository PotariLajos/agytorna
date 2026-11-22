/**
 * Agytorna – AI-próba témacsomag
 * --------------------------------------------------------------
 * 15 kérdéshely × 6 kérdés = 90 kérdés.
 * Időtálló kérdések: fogalmak, működés, biztonságos és okos használat –
 * konkrét termékekre, árakra, verziószámokra NEM kérdezünk.
 * A helyes válasz mindig az első (correct: 0) – a motor kitöltésenként
 * összekeveri a válaszok sorrendjét.
 */
AP15.registerPack({
  id: 'ai',
  title: 'AI-próba',
  icon: '🤖',
  cardDesc: 'Mennyire vagy otthon a mesterséges intelligencia világában? Alapok, promptolás, biztonság.',
  certPhrase: 'az Agytorna AI-próbáját',
  cardLabel: 'AI-PRÓBA · EREDMÉNYEM',
  certCongrats: 'Gratulálunk! Tudásod és kíváncsiságod bizonyította: készen állsz az AI kínálta lehetőségekre.',
  disclaimer: 'Saját fejlesztésű, játékos tudáspróba – nem minősül hivatalos vizsgának vagy minősítésnek.',

  // Az AI gyorsan változik: havonta átnézzük (node tools/review-status.js)
  review: { lastReviewed: '2026-11-22', intervalMonths: 1 },

  landing: {
    titleLead: 'Mennyire vagy otthon',
    titleAccent: 'az AI világában?',
    subtitle: '15 kérdés. Néhány perc. Gyakorlati AI-tudás.',
    lead: 'Teszteld, mennyire érted, hogyan működik a mesterséges intelligencia, hogyan kérdezz tőle jól, és hogyan használd biztonságosan!',
    features: [
      ['🤖', '15 AI-kérdés'],
      ['⏱️', '5–7 perc'],
      ['💎', 'Teljesen ingyenes'],
      ['⚡', 'Azonnali eredmény'],
      ['📜', 'Digitális oklevél']
    ]
  },

  rounds: {
    1: { label: '1. kör', name: 'Alapok' },
    2: { label: '2. kör', name: 'Haladó használat' },
    3: { label: '3. kör', name: 'Profi szint' }
  },

  categories: {
    basics:   { name: 'AI-alapok',               short: 'Alapok',     icon: '🧠', color: '#8b5cf6' },
    prompt:   { name: 'Promptolás',              short: 'Prompt',     icon: '✍️', color: '#22d3ee' },
    tools:    { name: 'Eszközök és működés',     short: 'Eszközök',   icon: '🧰', color: '#f5b942' },
    safety:   { name: 'Biztonság és hitelesség', short: 'Biztonság',  icon: '🛡️', color: '#f472b6' },
    practice: { name: 'Gyakorlati alkalmazás',   short: 'Gyakorlat',  icon: '🚀', color: '#34d399' }
  },

  levels: [
    { min: 0, max: 5, key: 'curious', title: 'AI-kíváncsi', emoji: '🌱',
      summary: 'Most ismerkedsz az AI világával – és ez remek kiindulópont! A legjobb módja a tanulásnak, ha kipróbálod: kérdezz, kísérletezz, és figyeld, mire jó és mire nem.' },
    { min: 6, max: 9, key: 'explorer', title: 'AI-felfedező', emoji: '🔍',
      summary: 'Szép eredmény! Az alapokkal tisztában vagy, és már látod, hogyan segíthet az AI a mindennapokban. Egy kis tudatos gyakorlással gyorsan profibb felhasználó lehetsz.' },
    { min: 10, max: 12, key: 'user', title: 'Tudatos AI-használó', emoji: '⚡',
      summary: 'Nagyon jó eredmény! Érted az AI működését, jól kérdezel tőle, és figyelsz a buktatókra is. Ez az a tudás, amellyel valódi időt és energiát spórolhatsz.' },
    { min: 13, max: 15, key: 'master', title: 'AI-mester', emoji: '🏆',
      summary: 'Kiemelkedő! Az AI működését, a jó promptolást és a biztonságos használatot is magabiztosan kezeled. Ezzel a tudással másoknak is sokat segíthetsz.' }
  ],

  categoryBands: [
    { min: 3, label: 'Erős terület',         tone: 'great' },
    { min: 2, label: 'Biztos alap',          tone: 'good'  },
    { min: 1, label: 'Fejleszthető terület', tone: 'ok'    },
    { min: 0, label: 'Felfedezésre vár',     tone: 'grow'  }
  ],

  tips: {
    basics: [
      'Nézz meg egy rövid, közérthető bevezetőt arról, hogyan működnek a nyelvi modellek.',
      'Kérdezd meg magát az AI-t is, hogy magyarázzon el egy fogalmat egyszerűen, példákkal.'
    ],
    prompt: [
      'Promptjaidban add meg a célt, a célközönséget és a kívánt formátumot (pl. „5 pontban, közérthetően”).',
      'Ha nem jó a válasz, ne kezdd elölről: kérj javítást konkrét visszajelzéssel.'
    ],
    tools: [
      'Próbálj ki többféle AI-eszközt (szöveg, kép, hang), hogy lásd, melyik mire való.',
      'Figyeld meg, milyen bemenetet fogad el egy eszköz (dokumentum, kép), és mire használhatod ezt.'
    ],
    safety: [
      'Soha ne adj meg jelszót, bankkártyaadatot vagy bizalmas ügyféladatot nyilvános AI-eszközben.',
      'Fontos tényeket, számokat és forrásokat mindig ellenőrizz megbízható helyen.'
    ],
    practice: [
      'Válassz ki egy heti ismétlődő feladatodat, és próbáld ki, hogyan gyorsíthatja az AI.',
      'Az AI-t vázlatkészítőként használd: a végső ellenőrzés és a döntés maradjon a tiéd.'
    ]
  },
  masterTip: 'Oszd meg a tudásod: segíts másoknak az AI biztonságos használatában, vagy építs saját AI-alapú munkafolyamatot.',

  slots: [
    /* ---------- 1. kör ---------- */
    { id: 'A-B1', category: 'basics', level: 1, questions: [
      { id: 'AIb1a', text: 'Mit jelent az „AI” rövidítés?',
        options: ['Mesterséges intelligencia', 'Automatikus internet', 'Alkalmazás-integráció', 'Adatbázis-index'], correct: 0,
        explain: 'Az AI az angol „Artificial Intelligence” rövidítése, magyarul mesterséges intelligencia.' },
      { id: 'AIb1b', text: 'Mi az AI-chatbot?',
        options: ['Olyan program, amellyel írásban vagy szóban beszélgetni lehet', 'Egy robotporszívó', 'Egy közösségi oldal', 'Egy vírusirtó program'], correct: 0,
        explain: 'A chatbot olyan program, amely beszélgetésszerűen válaszol a kérdéseidre.' },
      { id: 'AIb1c', text: 'Honnan „tanulnak” a nagy nyelvi modellek (a chatbotok mögötti AI)?',
        options: ['Rengeteg szöveg feldolgozásából', 'Minden válasz előtt felhívnak egy szakértőt', 'Csak a te saját beszélgetéseidből', 'Kizárólag egy szótárból'], correct: 0,
        explain: 'A nyelvi modelleket hatalmas mennyiségű szövegen tanítják, ebből tanulják meg a nyelv mintázatait.' },
      { id: "AIb1d", text: "Hol találkozol már ma is mesterséges intelligenciával, akár észrevétlenül?",
        options: ["A telefon arcfelismerős feloldásában és a fotók automatikus rendezésében", "A villanykapcsolóban", "A papír naptárban", "A fogkefe sörtéiben"], correct: 0,
        explain: "Az arcfelismerés, a fotók témák szerinti csoportosítása, a spamszűrő vagy a navigáció forgalomelőrejelzése mind AI-ra épül – sokszor észre sem vesszük." },
      { id: "AIb1e", text: "Kell-e programozni tudnod ahhoz, hogy hasznát vedd egy AI-chatbotnak?",
        options: ["Nem, elég hétköznapi nyelven – akár magyarul – leírni, mit szeretnél", "Igen, legalább egy programnyelvet ismerni kell", "Csak angolul lehet használni", "Csak informatikusok használhatják"], correct: 0,
        explain: "A mai chatbotokkal egyszerűen beszélgetni lehet, magyarul is. Ezért lett ennyire népszerű: bárki elkezdheti." },
      { id: "AIb1f", text: "Mit jelent, hogy egy AI-t „tanítanak”?",
        options: ["Rengeteg példát mutatnak neki, amelyekből mintázatokat tanul meg", "Iskolába járatják", "Előre beírják minden lehetséges kérdés válaszát", "Megtanítják gépelni"], correct: 0,
        explain: "Az AI nem kész válaszokat tárol, hanem sok példából általános mintázatokat tanul – ezért tud új kérdésekre is válaszolni." }
    ]},
    { id: 'A-P1', category: 'prompt', level: 1, questions: [
      { id: 'AIp1a', text: 'Mit jelent a „prompt”?',
        options: ['Az utasítás vagy kérdés, amit az AI-nak adsz', 'Az AI válasza', 'Egy fizetős előfizetés', 'Egy hibaüzenet'], correct: 0,
        explain: 'A prompt az a szöveg (kérés, kérdés, utasítás), amellyel az AI-t munkára fogod.' },
      { id: 'AIp1b', text: 'Melyik prompt ad várhatóan jobb eredményt?',
        options: ['„Írj egy 5 mondatos, vidám meghívót a szombati születésnapi bulimra, 20 főre.”', '„Írj valamit.”', '„Meghívó?”', '„Szöveg kell.”'], correct: 0,
        explain: 'Minél konkrétabb a kérés (cél, hossz, hangnem, részletek), annál jobban eltalálja az AI, mit szeretnél.' },
      { id: 'AIp1c', text: 'Az AI válasza túl hosszú. Mi a legegyszerűbb teendő?',
        options: ['Megkéred, hogy válaszoljon rövidebben, pl. 3 mondatban', 'Új fiókot nyitsz', 'Ugyanazt a kérdést csupa nagybetűvel írod újra', 'Kikapcsolod a gépet'], correct: 0,
        explain: 'A formátumot és a hosszt egyszerűen kérheted: „foglald össze 3 mondatban”.' },
      { id: "AIp1d", text: "Szeretnéd, hogy az AI nagyon egyszerűen magyarázzon el valamit. Mit írj?",
        options: ["„Magyarázd el úgy, mintha egy 10 éves gyereknek mondanád.”", "„Légy okos.”", "Semmit, magától kitalálja", "„Írj nagyon hosszan.”"], correct: 0,
        explain: "A célközönség megadása (pl. „10 évesnek”, „kezdőnek”) azonnal érthetőbbé teszi a választ – ez az egyik leghasznosabb prompttrükk." },
      { id: "AIp1e", text: "Az AI első válasza nem tetszik. Mi a legjobb lépés?",
        options: ["Folytatod a beszélgetést, és pontosítod, mit szeretnél másképp", "Feladod, az AI úgysem ért meg", "Változatlanul újra és újra beírod ugyanazt", "Bezárod, és soha többé nem használod"], correct: 0,
        explain: "Az AI-val beszélgetni kell: „legyen rövidebb”, „tegeződve”, „adj még 3 ötletet”. A második-harmadik válasz gyakran sokkal jobb." },
      { id: "AIp1f", text: "Melyik kéréssel kapsz azonnal használható bevásárlólistát?",
        options: ["„Írj bevásárlólistát 4 fős vacsorához (rakott krumpli + saláta), boltrészlegek szerint csoportosítva.”", "„Vacsora.”", "„Mit egyek?”", "„Lista.”"], correct: 0,
        explain: "Ha megadod a célt (4 fő, menü) és a formát (csoportosítva), az AI olyan listát ad, amivel már mehetsz is a boltba." }
    ]},
    { id: 'A-T1', category: 'tools', level: 1, questions: [
      { id: 'AIt1a', text: 'Mire alkalmas egy képgeneráló AI?',
        options: ['Szöveges leírásból kép készítésére', 'Számlák kiállítására', 'Telefonhívások fogadására', 'A wifi erősítésére'], correct: 0,
        explain: 'A képgeneráló AI a leírásod (prompt) alapján új képet hoz létre.' },
      { id: 'AIt1b', text: 'Miben segít egy beszédfelismerő (diktáló) AI?',
        options: ['A kimondott szöveg leírásában', 'Fényképek élesítésében', 'Táblázatok kinyomtatásában', 'Jelszavak tárolásában'], correct: 0,
        explain: 'A beszédfelismerés a hangot alakítja írott szöveggé – például jegyzetelésnél vagy feliratozásnál hasznos.' },
      { id: 'AIt1c', text: 'Mire jó egy AI-alapú fordító?',
        options: ['Szövegek egyik nyelvről a másikra fordítására', 'Fájlok vírusmentesítésére', 'A telefon akkumulátorának töltésére', 'Weboldalak gyorsítására'], correct: 0,
        explain: 'Az AI-fordítók gyorsan és jellemzően jó minőségben fordítanak, de fontos szövegnél érdemes átnézni az eredményt.' },
      { id: "AIt1d", text: "Lefotózol egy ismeretlen növényt, és megkérdezed egy képfelismerő AI-t. Miben segíthet?",
        options: ["Felismeri a növényt, és gondozási tippeket adhat hozzá", "Megöntözi a növényt", "Ingyen virágot rendel", "Automatikusan eladja a fotót"], correct: 0,
        explain: "A képfelismerő AI fotó alapján azonosít növényt, tárgyat, tereptárgyat – remek a kíváncsiaknak. (Gombánál, mérgező növénynél sose csak erre hagyatkozz!)" },
      { id: "AIt1e", text: "Mit tud egy szövegfelolvasó (szövegből beszédet készítő) AI?",
        options: ["Írott szöveget természetes hangon felolvas", "Hangot alakít képpé", "Fényképet nyomtat", "Zenéből szöveget töröl"], correct: 0,
        explain: "A szövegfelolvasó AI segít a gyengénlátóknak, a nyelvtanulásban, és így készülnek a hangoskönyvek, videók narrációi is." },
      { id: "AIt1f", text: "Mire használható egy AI-alapú képszerkesztő?",
        options: ["Például a háttér eltávolítására vagy egy zavaró tárgy kitörlésére a fotóról", "Papírképek bekeretezésére", "A fényképezőgép megjavítására", "Képek postai kiküldésére"], correct: 0,
        explain: "Ami régen órás munka volt, ma pár kattintás: háttér cseréje, tárgy eltüntetése, régi fotó javítása." }
    ]},
    { id: 'A-S1', category: 'safety', level: 1, questions: [
      { id: 'AIs1a', text: 'Mit NE írj be egy nyilvános AI-chatbotba?',
        options: ['A bankkártyád számát és PIN-kódját', 'Egy receptkérést', 'Egy versírási ötletet', 'Egy matekpéldát'], correct: 0,
        explain: 'Pénzügyi adatokat, jelszavakat és más bizalmas információt soha ne adj meg AI-eszközben.' },
      { id: 'AIs1b', text: 'Az AI azt írja, hogy egy gyógyszerből naponta 10 szemet kell bevenni. Mit tegyél?',
        options: ['Ellenőrzöd orvossal vagy a betegtájékoztatóban', 'Azonnal beveszed', 'Megkérdezed még egyszer ugyanazt az AI-t, és ha ugyanazt mondja, elhiszed', 'Kiírod a közösségi oldaladra'], correct: 0,
        explain: 'Egészségügyi kérdésekben az AI tévedhet; az ismételt azonos válasz sem garancia. Mindig szakember vagy hivatalos forrás döntsön.' },
      { id: 'AIs1c', text: 'Mi a „deepfake”?',
        options: ['AI-val hamisított, valósághű kép, videó vagy hang', 'Egy mélytengeri hal', 'Egy jelszófajta', 'Egy játékkonzol'], correct: 0,
        explain: 'A deepfake AI-val készült hamisítvány, amely valódi embereket mutathat olyasmit mondani vagy tenni, amit soha nem tettek.' },
      { id: "AIs1d", text: "Hibátlan magyarságú e-mail érkezik a „bankodtól”, hogy azonnal add meg a jelszavad. Mire gondolj?",
        options: ["Valószínűleg csalás – AI-val ma már hibátlan adathalász leveleket is írnak", "Biztosan valódi, hiszen nincs benne helyesírási hiba", "Gyorsan válaszolsz, hogy ne zárják le a számlát", "Továbbküldöd az ismerőseidnek is"], correct: 0,
        explain: "A bank soha nem kér jelszót e-mailben. Régen a hibás nyelvezet árulkodó volt – az AI korában a sürgetés és az adatkérés a gyanús jel." },
      { id: "AIs1e", text: "Az AI egy nagyon meglepő tényt állít. Mi a legjobb hozzáállás?",
        options: ["Megbízható forrásból ellenőrzöd, mielőtt elhiszed vagy továbbadod", "Elhiszed, mert a gép nem tévedhet", "Azonnal megosztod", "Soha semmit nem hiszel el, amit AI írt"], correct: 0,
        explain: "Az AI nagyon hasznos, de tévedhet. Az egészséges középút: használd bátran, de a fontos tényeket ellenőrizd." },
      { id: "AIs1f", text: "Ki felel a tartalomért, ha egy AI-jal írt szöveget a saját neveden teszel közzé?",
        options: ["Te – ezért érdemes átnézni, mielőtt közzéteszed", "Az AI-t készítő cég", "Senki", "Az olvasók"], correct: 0,
        explain: "Az AI eszköz, a felelősség a közzétevőé. Egy gyors átolvasás megóvhat a kínos hibáktól." }
    ]},
    { id: 'A-G1', category: 'practice', level: 1, questions: [
      { id: 'AIg1a', text: 'Melyik feladatban segíthet a legtöbbet egy szöveges AI-asszisztens?',
        options: ['Egy hosszú e-mail rövid összefoglalásában', 'A fű lenyírásában', 'A hűtő megjavításában', 'Egy csomag kézbesítésében'], correct: 0,
        explain: 'A szöveges AI erőssége a szövegekkel végzett munka: összefoglalás, átfogalmazás, ötletelés.' },
      { id: 'AIg1b', text: 'Állásinterjúra készülsz. Hogyan segíthet az AI?',
        options: ['Gyakorló kérdéseket tesz fel, és visszajelez a válaszaidra', 'Elmegy helyetted az interjúra', 'Garantálja, hogy felvesznek', 'Megszerzi a cég titkos fizetési adatait'], correct: 0,
        explain: 'Az AI jó gyakorlópartner: kérdez, visszajelez, javaslatot ad – a felkészülés és az interjú viszont a tiéd.' },
      { id: 'AIg1c', text: 'Egy recept 4 adagra szól, de neked 2 adag kell. Miben segíthet gyorsan az AI?',
        options: ['Átszámolja a hozzávalókat a kisebb adagra', 'Elhozza a hozzávalókat', 'Megfőzi az ételt', 'Megmondja, mi van a hűtődben'], correct: 0,
        explain: 'Az ilyen gyors átszámolásban és átalakításban az AI kényelmes segítség (fontos mennyiségeknél azért érdemes ránézni).' },
      { id: "AIg1d", text: "Hogyan segíthet az AI egy idegen nyelv gyakorlásában?",
        options: ["Beszélgethetsz vele az adott nyelven, és megkérheted, hogy javítsa a hibáidat", "Helyetted tanulja meg a nyelvet", "Beülteti a szavakat az agyadba", "Sehogy, csak egy nyelvet ismer"], correct: 0,
        explain: "Az AI türelmes beszélgetőtárs: gyakorolhatsz vele bármikor, kérhetsz egyszerűbb szavakat, vagy hogy magyarázza el a hibáidat." },
      { id: "AIg1e", text: "Elfelejtettél születésnapi üdvözletet írni. Miben segít az AI egy perc alatt?",
        options: ["Kedves, személyre szabott szöveget ír, amit a saját stílusodra igazíthatsz", "Ajándékot vásárol a nevedben", "Elhalasztja a születésnapot", "Semmiben"], correct: 0,
        explain: "Add meg, kinek szól, mit szeret, milyen a kapcsolatotok – és máris van egy jó kiindulópont, amit a saját szavaiddal tehetsz igazán személyessé." },
      { id: "AIg1f", text: "Mire jó, ha a hűtőd tartalma alapján kérsz menüötletet az AI-tól?",
        options: ["A meglévő alapanyagokból ad ötleteket, így kevesebb étel megy kárba", "Automatikusan feltölti a hűtőt", "Leadja helyetted a bolti rendelést", "Megfőzi az ételt"], correct: 0,
        explain: "Sorold fel, mi van otthon, és kérj 3 receptet – spórolsz időt, pénzt, és kevesebbet dobsz ki." }
    ]},

    /* ---------- 2. kör ---------- */
    { id: 'A-B2', category: 'basics', level: 2, questions: [
      { id: 'AIb2a', text: 'Mit jelent, ha egy AI „hallucinál”?',
        options: ['Magabiztosan állít valamit, ami nem igaz vagy kitalált', 'Túlmelegszik a számítógép', 'Képeket generál', 'Lassan válaszol'], correct: 0,
        explain: 'A hallucináció az, amikor a modell hihetően hangzó, de hamis információt ad – ezért kell ellenőrizni a fontos tényeket.' },
      { id: 'AIb2b', text: 'Mit jelent, hogy egy nyelvi modellnek „tudáshatára” van?',
        options: ['Egy bizonyos időpont utáni eseményekről a tanítása alapján nem tud', 'Csak meghatározott számú szót ismer', 'Naponta csak korlátozott ideig használható', 'Csak egyetlen nyelven ért'], correct: 0,
        explain: 'A modellt egy adott időpontig gyűjtött adatokon tanítják; az utána történtekről külön (pl. kereséssel) kaphat információt.' },
      { id: 'AIb2c', text: 'Leegyszerűsítve hogyan állítja elő a válaszát egy nyelvi modell?',
        options: ['A tanult minták alapján megjósolja, milyen szöveg következzen', 'Minden választ egy ember gépel be élőben', 'Véletlenszerű szavakat sorsol', 'Kimásolja az első keresési találatot'], correct: 0,
        explain: 'A nyelvi modell lépésről lépésre a legvalószínűbb folytatást állítja elő – ezért ír gördülékenyen, és ezért is tévedhet.' },
      { id: "AIb2d", text: "Miért fogalmaz néha nagyon magabiztosan az AI akkor is, ha téved?",
        options: ["Mert a legvalószínűbb szövegfolytatást állítja elő, nem „tudja”, mi igaz", "Mert szándékosan hazudik", "Mert minden válasz előtt ellenőrzi a tényeket", "Mert csak a biztos válaszokat írja magabiztosan"], correct: 0,
        explain: "A nyelvi modell gördülékeny szöveget alkot – a magabiztos hangnem nem bizonyítja az igazságot. Ezért kell a fontos tényeket ellenőrizni." },
      { id: "AIb2e", text: "Mit jelent a „generatív” AI?",
        options: ["Olyan AI, amely új tartalmat – szöveget, képet, hangot, videót – hoz létre", "Olyan AI, amely csak törölni tud", "Generátorral működő gép", "Csak meglévő fájlokat másol"], correct: 0,
        explain: "A generatív AI alkot: a chatbotok, a képgenerátorok és a zenét készítő eszközök mind ide tartoznak." },
      { id: "AIb2f", text: "Mi a „gépi tanulás” lényege?",
        options: ["A program adatokból tanulja meg a szabályokat, ahelyett hogy minden lépést kézzel beírnának", "A gép iskolába jár", "Gépírás-tanfolyam", "Számítógép-szerelés"], correct: 0,
        explain: "A gépi tanulásnál a rendszer példákból általánosít – így ismeri fel például a spamet vagy az arcokat a fotókon." }
    ]},
    { id: 'A-P2', category: 'prompt', level: 2, questions: [
      { id: 'AIp2a', text: 'Mit jelent a „szerepadás” a promptolásban?',
        options: ['Megadod, milyen szakértőként vagy stílusban válaszoljon az AI', 'Több embernek osztod ki a feladatot', 'Megadod a saját nevedet', 'Az AI-t színpadi szerepre tanítod'], correct: 0,
        explain: 'Például: „Válaszolj tapasztalt személyi edzőként, kezdőknek szóló nyelven.” Ez segít eltalálni a szakmai mélységet és a hangnemet.' },
      { id: 'AIp2b', text: 'Egy összetettebb feladatnál mi segít a legjobban a promptban?',
        options: ['Megadod a célt, a célközönséget és a kívánt formátumot', 'Minél rövidebb, egyszavas kérdés', 'Csupa nagybetűs írás', 'Ugyanazt a mondatot többször megismétled'], correct: 0,
        explain: 'A cél, a közönség és a formátum megadása a jó prompt három alappillére.' },
      { id: 'AIp2c', text: 'Mi a „példával irányítás” lényege?',
        options: ['Néhány mintát mutatsz arról, milyen választ vársz', 'Több AI-t használsz egyszerre', 'Képet töltesz fel szöveg helyett', 'A promptot más nyelven írod'], correct: 0,
        explain: 'Ha mutatsz 1–3 példát a kívánt stílusra vagy formára, az AI sokkal pontosabban követi.' },
      { id: "AIp2d", text: "Mit nyersz azzal, ha megadod a promptban a célközönséget (pl. „nyugdíjasoknak szól”)?",
        options: ["Az AI a hangnemet, a szóhasználatot és a példákat a közönséghez igazítja", "Semmit", "Gyorsabb lesz az internet", "A válasz mindig rövidebb lesz"], correct: 0,
        explain: "Ugyanaz a téma másképp szól egy diáknak, egy vállalkozónak vagy egy nagymamának – az AI ezt jól kezeli, ha tudja, kinek ír." },
      { id: "AIp2e", text: "Miért érdemes megkérni az AI-t, hogy kérdezzen vissza, mielőtt elkezdi a munkát?",
        options: ["Így kiderülnek a hiányzó részletek, és pontosabb lesz az eredmény", "Hogy tovább tartson", "Mert különben nem válaszol", "Hogy ingyenes legyen"], correct: 0,
        explain: "A „Mielőtt elkezded, kérdezz rá, ami hiányzik” mondat profi trükk: az AI felméri az igényt, mint egy jó szakember." },
      { id: "AIp2f", text: "Áttekinthető összehasonlítást szeretnél. Melyik a legjobb kérés?",
        options: ["„Foglald táblázatba – oszlopok: termék, ár, előny, hátrány.”", "„Legyen szép.”", "„Táblázat?”", "Ehhez külön programot kell venni"], correct: 0,
        explain: "Az AI tud táblázatot, felsorolást, lépéslistát készíteni – csak kérd a formát, és add meg az oszlopokat." }
    ]},
    { id: 'A-T2', category: 'tools', level: 2, questions: [
      { id: 'AIt2a', text: 'Mi a fő különbség egy internetes kereső és egy AI-chatbot között?',
        options: ['A kereső weboldalakat listáz, a chatbot saját szöveget fogalmaz a kérdésedre', 'Nincs különbség', 'A chatbot csak képeket mutat', 'A kereső csak angolul működik'], correct: 0,
        explain: 'A kereső találatokat ad, amelyeket te nézel át; a chatbot összefoglalt választ ír – ami kényelmes, de ellenőrizni kell.' },
      { id: 'AIt2b', text: 'Mire jó, ha egy AI-eszköz dokumentumot (pl. PDF-et) is be tud olvasni?',
        options: ['Kérdezhetsz a dokumentum tartalmáról, és összefoglaltathatod', 'Automatikusan kinyomtatja', 'Megvédi a vírusoktól', 'Kisebb lesz tőle a fájl'], correct: 0,
        explain: 'Feltöltött dokumentumból az AI kiemeli a lényeget, válaszol a tartalmára vonatkozó kérdésekre.' },
      { id: 'AIt2c', text: 'Mit jelent, hogy egy AI-modell „multimodális”?',
        options: ['Többféle bemenetet – pl. szöveget, képet, hangot – is tud kezelni', 'Több nyelven beszél', 'Egyszerre több felhasználó használja', 'Több számítógépen fut'], correct: 0,
        explain: 'A multimodális modell például egy fotóról is tud válaszolni, vagy hangot is értelmez a szöveg mellett.' },
      { id: "AIt2d", text: "Mire jó egy AI-alapú átiratkészítő egy online megbeszélés után?",
        options: ["Leírja az elhangzottakat, és összefoglalót, teendőlistát készíthet belőle", "Felveszi helyetted a telefont", "Meghosszabbítja a megbeszélést", "Kitörli a hangfelvételt"], correct: 0,
        explain: "Jegyzetelés helyett figyelhetsz a beszélgetésre. Fontos: a felvételhez a résztvevők tudta és hozzájárulása kell." },
      { id: "AIt2e", text: "Egy táblázatban bonyolult képletre van szükséged. Hogyan segít az AI?",
        options: ["Szavakkal leírod, mit számoljon, ő megírja a képletet és elmagyarázza", "Véletlen számokkal tölti ki a táblázatot", "Megveszi helyetted a táblázatkezelőt", "Sehogy"], correct: 0,
        explain: "Például: „Ha a B oszlop 50 000 fölött van, írjon a C-be 10% kedvezményt.” Az AI megírja a képletet – programozás nélkül." },
      { id: "AIt2f", text: "Mit jelent, ha egy chatbot webes keresést is tud használni?",
        options: ["Friss információt is lekérhet az internetről, és forrást adhat hozzá", "Gyorsabban gépel", "Minden válasza biztosan hibátlan", "Nem kell hozzá internetkapcsolat"], correct: 0,
        explain: "A kereséssel a tudáshatáron túli, friss adatokhoz is hozzáfér, és megadja a forrást – amit érdemes megnyitni és ellenőrizni." }
    ]},
    { id: 'A-S2', category: 'safety', level: 2, questions: [
      { id: 'AIs2a', text: 'Egy bizalmas céges ügyféllistát szeretnél AI-val rendezni. Mi a helyes első lépés?',
        options: ['Megnézed, a céged engedélyezi-e, és hogyan kezeli az adatokat az eszköz', 'Bemásolod bármelyik ingyenes chatbotba', 'Közzéteszed, hogy mások is segítsenek', 'Kinyomtatod és lefényképezed'], correct: 0,
        explain: 'Személyes és üzleti adatoknál a cég szabályai és az eszköz adatkezelése az első – az adatvédelmi előírások is ezt kívánják.' },
      { id: 'AIs2b', text: 'Ismeretlen számról hívnak, és a „gyermeked” hangja sürgősen pénzt kér. Mi a legjobb lépés?',
        options: ['Leteszed, és a gyermekedet a megszokott számán hívod vissza', 'Azonnal utalsz', 'Megadod a bankkártyaadataidat', 'Visszahívod az ismeretlen számot'], correct: 0,
        explain: 'AI-val ma már hangot is lehet utánozni. Mindig ellenőrizd egy általad ismert csatornán, mielőtt bármit tennél.' },
      { id: 'AIs2c', text: 'Miért fontos ellenőrizni az AI által megadott forrásokat és linkeket?',
        options: ['Mert előfordul, hogy nem létező forrást vagy linket ír', 'Mert a linkek mindig vírusosak', 'Mert az AI soha nem ad forrást', 'Nem fontos, a források mindig pontosak'], correct: 0,
        explain: 'Az AI néha kitalál hihető címeket, szerzőket vagy linkeket. Kattints rá, és nézd meg, valóban létezik-e és azt írja-e.' },
      { id: "AIs2d", text: "Videót kapsz, amelyben egy ismert ember nagyon meglepő dolgot mond. Mi a legokosabb?",
        options: ["Megnézed, hogy hiteles hírforrások is beszámolnak-e róla, mielőtt elhiszed vagy megosztod", "Azonnal megosztod", "Elhiszed, hiszen videó", "Kommentben vitatkozol róla"], correct: 0,
        explain: "AI-val ma már élethű hamis videó is készíthető. A megosztás előtti 1 perc ellenőrzés sokat számít." },
      { id: "AIs2e", text: "Miért érdemes megnézni, hogy a beszélgetéseidet felhasználhatják-e az AI továbbfejlesztéséhez?",
        options: ["Mert így jobban kézben tartod, mi történik a beírt adataiddal", "Mert különben drágább", "Mert így gyorsabb az AI", "Nincs jelentősége"], correct: 0,
        explain: "Sok szolgáltatásnál a beállításokban dönthetsz erről. Bizalmas anyagnál ez különösen fontos." },
      { id: "AIs2f", text: "Egy weboldal „ingyenes AI-eszközt” kínál, de előbb egy ismeretlen programot kell telepítened. Mit teszel?",
        options: ["Gyanús – csak megbízható, hivatalos forrásból telepítesz", "Telepíted, hiszen ingyenes", "Kikapcsolod a vírusirtót, hogy működjön", "Megadod a bankkártyádat „ellenőrzésre”"], correct: 0,
        explain: "A csalók szívesen bújnak a felkapott AI-eszközök mögé. Hivatalos oldalról, ismert alkalmazásboltból telepíts." }
    ]},
    { id: 'A-G2', category: 'practice', level: 2, questions: [
      { id: 'AIg2a', text: 'Egy webshop termékleírásait írod AI-val. Mi a legjobb munkamenet?',
        options: ['Az AI vázlatot ír, te ellenőrzöd a tényeket és a saját hangodra igazítod', 'Az AI szövegét ellenőrzés nélkül közzéteszed', 'Minden terméknél ugyanazt a szöveget használod', 'Inkább egy másik webshop leírásait másolod'], correct: 0,
        explain: 'Az AI gyors vázlatot ad, de a pontos adatokért és a márkahangért te felelsz.' },
      { id: 'AIg2b', text: 'Melyik feladatot NEM érdemes ellenőrzés nélkül teljesen az AI-ra bízni?',
        options: ['Egy szerződés jogi tartalmának véglegesítését', 'Ötletelést egy születésnapi buli témájára', 'Egy e-mail hangnemének barátságosabbá tételét', 'Egy szöveg címjavaslatainak összegyűjtését'], correct: 0,
        explain: 'Jogi, pénzügyi és egészségügyi kérdésekben a hiba komoly következményekkel járhat – ott szakember ellenőrzése kell.' },
      { id: 'AIg2c', text: 'Egy 40 oldalas jelentésből kell rövid összefoglalót tartanod. Melyik a legokosabb AI-használat?',
        options: ['Összefoglaltatod a fő pontokat, majd az eredetiben ellenőrzöd őket', 'Megkéred, hogy a cím alapján találjon ki egy összefoglalót', 'Csak az utolsó oldalt adod meg neki', 'Az összefoglalót ellenőrzés nélkül előadod'], correct: 0,
        explain: 'Az AI-összefoglaló jó kiindulópont, de a fontos állításokat érdemes visszakeresni az eredeti szövegben.' },
      { id: "AIg2d", text: "Hogyan segíthet az AI egy új készség – például a táblázatkezelés – megtanulásában?",
        options: ["Személyre szabott magyarázatot és gyakorlófeladatokat kérhetsz tőle, a saját tempódban", "Helyetted vizsgázik", "Letölti a tudást az agyadba", "Tanulásra nem alkalmas"], correct: 0,
        explain: "Az AI olyan, mint egy türelmes magántanár: annyiszor magyaráz, ahányszor kell, és a szintedhez igazítja a feladatokat." },
      { id: "AIg2e", text: "Közösségi posztot írsz AI segítségével. Mi teszi igazán jóvá?",
        options: ["Megadod a saját gondolataidat, példáidat, és a végén a saját hangodra igazítod", "Hagyod, hogy teljesen általános szöveget írjon", "Minél több emojit kérsz", "Átolvasás nélkül közzéteszed"], correct: 0,
        explain: "Az AI felgyorsítja az írást, de a személyes történet, vélemény és tapasztalat teszi a posztot hitelessé és érdekessé." },
      { id: "AIg2f", text: "Hivatalos levelet kell írnod (például reklamációt). Hogyan segít az AI?",
        options: ["Felépíti a levél szerkezetét udvarias, határozott hangnemben, te pedig kiegészíted a tényekkel", "Elküldi a hatóságnak a nevedben", "Ügyvédként képvisel", "Kitalálja hozzá a tényeket"], correct: 0,
        explain: "A hivatalos hangnem sokaknak nehéz – az AI ebben remek segítség. A tényeket (dátum, összeg, rendelésszám) te adod meg." }
    ]},

    /* ---------- 3. kör ---------- */
    { id: 'A-B3', category: 'basics', level: 3, questions: [
      { id: 'AIb3a', text: 'Mit jelent a „token” a nyelvi modelleknél?',
        options: ['Szövegdarab (szó vagy szórészlet), amelyekre bontva a modell a szöveget feldolgozza', 'Belépési jelszó', 'Egyfajta kriptopénz', 'Az AI hibaüzenete'], correct: 0,
        explain: 'A modellek nem betűnként vagy egész mondatonként, hanem tokenekben „olvasnak” és írnak; a hosszkorlátokat is gyakran tokenben adják meg.' },
      { id: 'AIb3b', text: 'Mi a „kontextusablak”?',
        options: ['Az a szövegmennyiség, amelyet a modell egyszerre figyelembe tud venni', 'A böngésző ablaka', 'A modell tanításának időtartama', 'Az AI képernyőjének mérete'], correct: 0,
        explain: 'Ha egy beszélgetés vagy dokumentum túl hosszú, a modell a kontextusablakon kívül eső részeket nem „látja”.' },
      { id: 'AIb3c', text: 'Ugyanarra a kérdésre kétszer kissé eltérő választ kapsz. Mi ennek a legvalószínűbb oka?',
        options: ['A válaszadásban beépített véletlenszerűség van', 'Az AI elfelejtette a nyelvtant', 'Meghibásodott a gép', 'Valaki más válaszolt helyette'], correct: 0,
        explain: 'A modellek a valószínű folytatások közül kis véletlenszerűséggel választanak – ezért változatosak a válaszok.' },
      { id: "AIb3d", text: "Hogyan tud egy nyelvi modell verset írni, ha senki nem programozta bele a rímeket?",
        options: ["Rengeteg szövegből megtanulta a nyelvi mintázatokat, köztük a rím és a ritmus szabályszerűségeit", "Minden lehetséges verset tárol", "Egy költő írja meg valós időben", "Véletlenszerűen sorsol szavakat"], correct: 0,
        explain: "Ez a gépi tanulás „varázsa”: a modell nem szabálylistát kap, hanem a példákból sajátítja el a mintázatokat." },
      { id: "AIb3e", text: "Mit jelent a „neurális háló” kifejezés?",
        options: ["Az agy idegsejtjei által ihletett, egymással összekötött számítási egységekből álló modell", "Egy internetes közösségi oldal", "Halászháló", "Idegrendszeri orvosi vizsgálat"], correct: 0,
        explain: "A neurális háló sok egyszerű, egymásra épülő számítási egységből áll – a mai AI-modellek többsége ilyen." },
      { id: "AIb3f", text: "Miért lehet egy AI jobb az egyik nyelven, mint a másikon?",
        options: ["Mert a tanítószövegek között nyelvenként eltérő mennyiségű anyag volt", "Mert a nyelvek nehézségét törvény szabályozza", "Mert egyszerre csak egy nyelvet tud", "Mert a billentyűzet kiosztása befolyásolja"], correct: 0,
        explain: "Angol szövegből jóval több van az interneten, mint magyarból – ezért a kisebb nyelveken néha gyengébb a minőség." }
    ]},
    { id: 'A-P3', category: 'prompt', level: 3, questions: [
      { id: 'AIp3a', text: 'Egy többlépéses feladatnál az AI rendre kihagy egy lépést. Mi segít a legvalószínűbben?',
        options: ['Megkéred, hogy lépésről lépésre gondolja végig, és sorolja fel a lépéseket', 'Udvariatlanabb hangnemre váltasz', 'Rövidebbre írod a promptot', 'Változtatás nélkül újra elküldöd ugyanazt'], correct: 0,
        explain: 'A lépésenkénti végiggondolás kérése és a lépések listázása átláthatóbbá és pontosabbá teszi a választ.' },
      { id: 'AIp3b', text: 'Melyik utasítás segít leginkább a pontos, ellenőrizhető válaszban?',
        options: ['„Ha nem vagy biztos benne, mondd meg, és jelöld, mit kell ellenőriznem.”', '„Válaszolj magabiztosan, akkor is, ha nem tudod.”', '„Ne kérdezz vissza semmit.”', '„Ha nincs forrás, találj ki egyet.”'], correct: 0,
        explain: 'Ha engedélyt adsz a bizonytalanság jelzésére, kevésbé valószínű, hogy a modell kitalált választ ad.' },
      { id: 'AIp3c', text: 'Egy blogcikkhez kért AI-szöveg túl általános lett. Mi segít a legtöbbet?',
        options: ['Megadod a saját tapasztalataidat, konkrét példákat és a célolvasó leírását', 'Megkéred, hogy legyen hosszabb', 'Több felkiáltójelet használsz', 'Angolul kérdezel'], correct: 0,
        explain: 'Az egyedi tartalomhoz egyedi alapanyag kell: a saját példáid és tudásod teszi a szöveget személyessé és hitelessé.' },
      { id: "AIp3d", text: "Mi a haszna, ha arra kéred az AI-t, hogy „gondold végig lépésről lépésre”?",
        options: ["Részenként vezeti le a megoldást, ami összetett feladatnál gyakran pontosabb eredményt ad", "Lassabban gépel", "Kevesebbet ír", "Kikapcsolja a hibákat"], correct: 0,
        explain: "A lépésenkénti levezetés matekos, logikai és tervezési feladatoknál segít – és te is könnyebben ellenőrzöd." },
      { id: "AIp3e", text: "Hogyan kaphatsz egyetlen kérésből sokféle, valóban eltérő ötletet?",
        options: ["Kifejezetten több, egymástól nagyon különböző változatot kérsz, pl. „adj 5 eltérő stílusú címet”", "Ötször beírod ugyanazt", "Csupa nagybetűvel írsz", "Erre nincs mód"], correct: 0,
        explain: "Ötleteléshez kérj több változatot, és add meg, miben térjenek el (hangnem, hossz, célközönség) – utána válogathatsz." },
      { id: "AIp3f", text: "Hogyan kaphatsz igazán hasznos visszajelzést az AI-tól a saját szövegedre?",
        options: ["Megadod a szempontokat (pl. érthetőség, meggyőzőerő, hossz), és konkrét javítási javaslatokat kérsz", "„Jó lett?”", "Elhallgatod a szöveg célját", "Csak dicséretet kérsz"], correct: 0,
        explain: "A célzott kérdés célzott választ hoz: „Mi a 3 leggyengébb pont, és hogyan javítanád?” – így valódi fejlődést kapsz." }
    ]},
    { id: 'A-T3', category: 'tools', level: 3, questions: [
      { id: 'AIt3a', text: 'Mit jelent az „AI-ügynök” kifejezés?',
        options: ['Olyan AI, amely önállóan, több lépésben, eszközöket használva old meg egy feladatot', 'Egy AI-t árusító kereskedő', 'Titkosügynököknek készült program', 'Egy chatbot, amely csak egyetlen mondatot tud'], correct: 0,
        explain: 'Az ügynök például keres, fájlokat olvas, programot futtat, és ezekből lépésenként halad a cél felé.' },
      { id: 'AIt3b', text: 'Mi a „finomhangolás” egy AI-modellnél?',
        options: ['Egy meglévő modell további tanítása egy szűkebb feladatra vagy stílusra', 'A képernyő fényerejének beállítása', 'A prompt helyesírásának javítása', 'Az AI hangerejének állítása'], correct: 0,
        explain: 'Finomhangolással egy általános modellt specializálnak, például egy cég szakszavaira vagy egy adott írásstílusra.' },
      { id: 'AIt3c', text: 'Egy cég azt szeretné, hogy a chatbotja a saját belső dokumentumai alapján válaszoljon. Mi erre a bevett megoldás?',
        options: ['A kérdéshez illő dokumentumrészeket kikeresik, és a válaszhoz átadják a modellnek', 'Kinyomtatják a dokumentumokat', 'Megtiltják a kérdezést', 'Csak a cég nevét írják be a promptba'], correct: 0,
        explain: 'Ez a „keresésre támaszkodó válaszadás” (angol rövidítéssel RAG): a modell a releváns, friss céges szövegrészek alapján válaszol.' },
      { id: "AIt3d", text: "Mi az előnye egy saját gépen (helyben) futó AI-modellnek?",
        options: ["Az adatok nem hagyják el a gépet, ami bizalmas anyagoknál előny", "Mindig okosabb a felhőben futóknál", "Nem kell hozzá áram", "Ingyen internetet ad"], correct: 0,
        explain: "A helyi modellek kisebbek lehetnek, de az adatvédelem szempontjából nagy előnyük, hogy minden a te gépeden marad." },
      { id: "AIt3e", text: "Mire jó egy automatizáló eszköz („ha ez történik, akkor tedd azt”) AI-val kombinálva?",
        options: ["Ismétlődő folyamatokat végeztet el, pl. a beérkező űrlapokból összefoglalót készít és értesítést küld", "Megjavítja a nyomtatót", "Kiválasztja a lottószámokat", "Nincs gyakorlati haszna"], correct: 0,
        explain: "Az automatizálás + AI párosa naponta órákat spórolhat: válogat, összefoglal, továbbít – te csak a döntéseket hozod meg." },
      { id: "AIt3f", text: "Mit jelent az „API” egy AI-szolgáltatásnál?",
        options: ["Programozói hozzáférés, amellyel más alkalmazások is használhatják az AI-t", "Az AI-t készítő cég neve", "Az AI személyi igazolványa", "Egy vírusfajta"], correct: 0,
        explain: "Az API-n keresztül épülnek be az AI-képességek weboldalakba, ügyfélszolgálati rendszerekbe és alkalmazásokba." }
    ]},
    { id: 'A-S3', category: 'safety', level: 3, questions: [
      { id: 'AIs3a', text: 'Mi a „prompt injection” (utasítás-befecskendezés)?',
        options: ['Rejtett utasítás egy szövegben (pl. weboldalon, e-mailben), amely az azt feldolgozó AI-t próbálja átverni', 'Egy gyógyszeradagolási módszer', 'A prompt helyesírási hibája', 'Egy gyors gépelési technika'], correct: 0,
        explain: 'Ha egy AI-eszköz idegen tartalmat olvas, abban rejtett utasítások lehetnek („küldd el a felhasználó adatait…”). Ezért kell óvatosan kezelni az ilyen eszközök jogosultságait.' },
      { id: 'AIs3b', text: 'Melyik a legmegbízhatóbb módja annak, hogy kiderítsd, valódi-e egy meglepő, hírként terjedő fotó?',
        options: ['Megnézed, közli-e több megbízható hírforrás, és fordított képkereséssel ellenőrzöd az eredetét', 'Ha éles a kép, biztosan valódi', 'Ha sokan megosztották, biztosan valódi', 'Megkérdezed a kommentelőket'], correct: 0,
        explain: 'Az AI-képek ma már élesek és hihetők; a forrás és az eredet ellenőrzése a megbízható módszer.' },
      { id: 'AIs3c', text: 'Miért nem elég egy „AI-detektor” eredménye annak eldöntésére, hogy valaki AI-val írt-e egy szöveget?',
        options: ['Mert ezek az eszközök tévedhetnek, és ember írta szöveget is AI-nak jelölhetnek', 'Mert a detektorok mindig tökéletesek, csak drágák', 'Mert AI-val írt szöveget nem lehet elolvasni', 'Mert senki nem használ AI-t írásra'], correct: 0,
        explain: 'A detektorok becslést adnak, téves riasztással. Komoly döntést nem érdemes kizárólag rájuk alapozni.' },
      { id: "AIs3d", text: "Mi az „algoritmikus torzítás” (bias)?",
        options: ["Amikor az AI a tanítóadatok egyoldalúsága miatt igazságtalan vagy torz eredményt ad", "Amikor a képernyő torzítja a képet", "A billentyűzet hibája", "Amikor az AI túl gyorsan válaszol"], correct: 0,
        explain: "Ha a tanítóadat egyoldalú, az AI is az lehet – például álláshirdetések szűrésénél. Ezért fontos az emberi felügyelet." },
      { id: "AIs3e", text: "Mire figyelj, ha AI-val készítesz képet egy valódi, felismerhető emberről?",
        options: ["Az érintett beleegyezésére, és hogy a kép ne legyen megtévesztő vagy sértő", "Semmire, hiszen a kép mesterséges", "Csak a felbontásra", "Hogy minél valósághűbb legyen, és ne derüljön ki"], correct: 0,
        explain: "Valódi emberről készült hamis kép sértheti a jó hírnevét és a jogait – beleegyezés nélkül ne készíts és ne terjessz ilyet." },
      { id: "AIs3f", text: "Miért érdemes jelezni, ha egy tartalom AI segítségével készült?",
        options: ["Mert átlátható, építi a bizalmat, és egyre több platform és szabály el is várja", "Mert így szebb", "Mert különben semmit nem lehet feltölteni", "Nincs értelme"], correct: 0,
        explain: "Az átláthatóság hosszú távon megéri: a közönség értékeli az őszinteséget, és sok helyen már szabály is előírja." }
    ]},
    { id: 'A-G3', category: 'practice', level: 3, questions: [
      { id: 'AIg3a', text: 'Kisvállalkozóként heti 5 órát töltesz ügyfél-e-mailek megválaszolásával. Melyik AI-használat a legokosabb?',
        options: ['A gyakori kérdésekre válaszsablonokat készíttetsz, és személyre szabva használod őket', 'Minden e-mailt ellenőrzés nélkül automatikusan megválaszoltatsz', 'Nem válaszolsz többé e-mailekre', 'Elkéred az ügyfelek jelszavait, hogy helyettük intézd'], correct: 0,
        explain: 'A sablonok sok időt spórolnak, a személyre szabás és az ellenőrzés pedig megőrzi a minőséget és a bizalmat.' },
      { id: 'AIg3b', text: 'AI-val generált képet szeretnél egy fizetett hirdetésben használni. Mire figyelj leginkább?',
        options: ['Az eszköz felhasználási feltételeire, és hogy ne utánozzon védett márkát vagy valós személyt', 'Csak a kép felbontására', 'Semmire, az AI-kép mindig szabadon használható', 'Hogy minél több szöveg legyen rajta'], correct: 0,
        explain: 'A kereskedelmi felhasználást az eszköz feltételei szabályozzák, és más márkájának vagy valós személy képmásának utánzása jogi gondot okozhat.' },
      { id: 'AIg3c', text: 'Egy AI-chatbot kiszámolja a havi költségvetésedet. Mi a legjobb lépés?',
        options: ['A fontos számokat újraszámolod számológéppel vagy táblázatban', 'Elfogadod, mert a gépek nem tévednek számolásban', 'Megkéred, hogy írja le szebben', 'Megmutatod egy ismerősödnek, és ha tetszik neki, jó'], correct: 0,
        explain: 'A nyelvi modellek szövegre készültek, számolásban hibázhatnak. Pénzügyi számokat mindig ellenőrizz.' },
      { id: "AIg3d", text: "Kisvállalkozó vagy, és sok a visszatérő ügyfélkérdés (szállítás, árak). Mi a legokosabb első AI-lépés?",
        options: ["Összeállítod a gyakori kérdéseket, és AI-val sablonválaszokat készítesz, amelyeket ellenőrzöl", "Kikapcsolod az e-mailt", "Átnézés nélkül mindenkinek ugyanazt küldöd", "Megszünteted az ügyfélszolgálatot"], correct: 0,
        explain: "A jó sablonválaszok órákat spórolnak, és egységessé teszik a kommunikációt – az ellenőrzés pedig megőrzi a minőséget." },
      { id: "AIg3e", text: "Hogyan derítheted ki, hogy tényleg megéri-e az AI a munkádban?",
        options: ["Egy-két hétig méred, mennyi időt spórolsz, és milyen lett az eredmény minősége", "Megnézed, hányan beszélnek róla", "Rögtön a legdrágább előfizetést veszed", "Megérzés alapján döntesz"], correct: 0,
        explain: "Egy kis kísérlet sokat elárul: válassz ki 2–3 ismétlődő feladatot, és hasonlítsd össze az időt és a minőséget AI-val és nélküle." },
      { id: "AIg3f", text: "Melyik hozzáállás hozza a legtöbbet az AI-ból hosszú távon?",
        options: ["Rendszeresen kísérletezel, a bevált promptjaidat elmented és újrahasznosítod", "Egyszer kipróbálod, és ha nem tökéletes, abbahagyod", "Mindent ellenőrzés nélkül rábízol", "Megvárod, amíg mások kitanulják"], correct: 0,
        explain: "A legjobb AI-használók gyűjtik a bevált promptokat, és folyamatosan tanulnak – egy tanuló közösségben ez még gyorsabban megy." }
    ]}
  ]
});
