# Agytorna – Interaktív gondolkodási kihívás (prototípus)

Ingyenes, játékos, 15 kérdéses logikai és gondolkodási kihívás, magyar nyelven, mobilra optimalizálva.
**Nem hiteles IQ-mérés**, hanem saját fejlesztésű, játékos képességfelmérő – ezt a felület és az oklevél is jelzi.

Teljes folyamat: **Landing → 15 kérdés → Eredmény → Oklevéladatok → PDF-oklevél (+ e-mail) → Eredménykártya → Skool-ajánlat**

## Indítás

Statikus oldal, build lépés nélkül. Bármilyen webszerverrel futtatható:

```bash
php -S localhost:8000        # vagy: python3 -m http.server 8000
```

Majd: <http://localhost:8000>. (Közvetlenül fájlként – `file://` – is megnyitható.)

## Mappaszerkezet

| Fájl | Tartalom |
|---|---|
| `index.html` | Önálló oldal, csak egy `<div id="agytorna">` + a modulok betöltése |
| `assets/js/config.js` | **Beállítások**: Skool-link, háttérrendszer ki/be, hozzájárulási szöveg és verzió |
| `assets/js/engine.js` | Motor: témacsomagok, kérdéshúzás, válaszkeverés, pontozás, értékelés |
| `assets/js/packs/agytorna.js` | **Gondolkodási próba**: 120 kérdés megoldókulccsal és indoklással, kategóriák, szintek, szövegek |
| `assets/js/packs/ai.js` | **AI-próba**: 90 kérdés (havonta átnézendő) |
| `assets/js/packs/szabaduszo.js` | **Szabadúszó-próba**: 90 kérdés (félévente átnézendő) |
| `assets/js/storage.js` | Naplózás (demó: localStorage) és a háttérrendszer hívása |
| `assets/js/pdf.js` | Függőség nélküli PDF-író (JPEG → A4 fekvő PDF) |
| `assets/js/graphics.js` | Oklevél és eredménykártya rajzolása (canvas) |
| `assets/js/app.js` | Képernyők, folyamat, interakciók, animációk |
| `assets/css/style.css` | Teljes dizájn, `.ap15` alá szűkítve (WordPress-témákkal nem ütközik) |
| `api/send-certificate.php` | **Kikapcsolt** szerveroldali sablon: e-mail PDF-melléklettel + naplózás |
| `agytorna.php` | WordPress-bővítményváz: `[agytorna]` shortcode |
| `embed.js` | Beágyazó kód bármely más oldalhoz (iframe, automatikus magasság) |

## A teszt felépítése

Három kör, egyre nehezedő kérdésekkel; minden körben mind az öt kategória egyszer szerepel:

| Kör | Logika | Minta | Problémamegoldás | Verbális | Figyelem |
|---|---|---|---|---|---|
| 1. Bemelegítés | szillogizmus | nyílforgás | pizzaszeletek | kakukktojás | betűszámlálás |
| 2. Belejövünk | magassági sorrend | növekvő különbségek | 20%-os árcsökkentés | analógia | kódösszevetés |
| 3. Nagy kihívás | igazmondók/hazugok | n²+1 szabály | csiga a kútban | összetett szó | ütő és labda |

A megoldókulcs (`correct`) és az indoklás (`explain`) a `packs/agytorna.js`-ben van; az eredményoldalon a kitöltő
minden kérdésnél láthatja a helyes választ és a magyarázatot.

Pontozás: helyes válasz = 1 pont, max. 15. Szintek: 0–5 Kíváncsi felfedező · 6–9 Gondolkodó felfedező ·
10–12 Ügyes problémamegoldó · 13–15 Logikai kihívásmester. A 3 kérdéses részterületek óvatos, tájékoztató
címkét kapnak (Erős terület / Biztos alap / Fejleszthető terület / Felfedezésre vár).

## Témaválasztó

Ha több témacsomag van betöltve, a nyitóoldalon témakártyák jelennek meg (sorrend: `config.js` → `packs`).
Egy konkrét téma közvetlenül is indítható: `?pack=ai`, beágyazásnál `data-pack="ai"`, WordPressben
`[agytorna tema="ai"]` – ilyenkor nincs témaválasztó.

## Variációk és új témák

- A teszt 15 **kérdéshelyből** áll (5 kategória × 3 nehézségi szint), helyenként **6–8 egyenértékű kérdéssel**.
  Minden kitöltés helyenként egyet húz, és a válaszok sorrendjét is összekeveri.
- Ugyanabban a böngészőben a látogató 6–8 kitöltésen át nem kap ismétlődő kérdést; utána a kérdések
  újrakeverednek („Minden kérdést láttál már!” üzenettel).
- A nehézség és a pontozás minden kitöltésnél azonos, így az eredmények összevethetők.
- **Új téma** (pl. AI-tudás): másold le a `packs/agytorna.js`-t új néven, írd át az `id`-t és a tartalmat,
  töltsd be az oldalon, és indítsd így: `?pack=<id>`, beágyazásnál `data-pack="<id>"`, WordPressben `[agytorna tema="<id>"]`.
- Teszt közben egy elrejthető óra mutatja az eltelt időt (a pontszámba nem számít); a kitöltési idő
  az eredményoldalon és a megosztható kártyán is megjelenik.

## Tartalomfrissítés

Minden témacsomagban van egy `review` mező: `lastReviewed` (utolsó átnézés dátuma) és `intervalMonths`
(hány havonta esedékes). Állapot lekérdezése: `node tools/review-status.js`.

| Téma | Átnézés |
|---|---|
| AI | havonta |
| Webes/digitális, online biztonság | negyedévente (3) |
| Szabadúszás, sport | félévente (6) |
| Gondolkodás, általános műveltség | évente (12) |

Átnézéskor: elavult vagy kétértelmű kérdések cseréje (az `id`-t új kérdésnél újra kell adni),
a `lastReviewed` dátum frissítése. Havi emlékeztető jelez, ha valamelyik téma esedékes.

## Mi működik valóban, és mi demó?

| Funkció | Állapot |
|---|---|
| Teljes tesztfolyamat, pontozás, kategóriaeredmények, értékelés, javaslatok | ✅ működik |
| PDF-oklevél generálás és letöltés (ékezethelyes, egyedi azonosítóval) | ✅ működik, a böngészőben |
| Megosztható eredménykártya (PNG letöltés; mobilon natív megosztás) | ✅ működik |
| Oklevélkérés + marketing-hozzájárulás **külön** naplózása időbélyeggel | 🟡 **DEMÓ**: csak a böngésző localStorage-ában („Demó adatnapló” panel) |
| Oklevél küldése e-mail-mellékletként | 🟡 **DEMÓ**: e-mail-előnézet jelenik meg, valódi küldés nincs |
| Skool-link | ✅ beállítva (ajánlói link, jelzéssel) – `config.js` → `skoolUrl`, `skoolDisclosure` |
| Adatkezelési tájékoztató | 🟡 **HELYKITÖLTŐ** – `config.js` → `privacyUrl` |

Demó módban **semmilyen adat nem hagyja el a böngészőt.**

## Élesítés (következő fázis)

1. `config.js`: `skoolUrl` beállítása, `skoolUrlIsPlaceholder: false`, `privacyUrl` megadása.
2. Háttérrendszer: `api/send-certificate.php` → `AP15_ENABLED = true`, feladócím beállítása, HTTPS,
   majd `config.js` → `backend.enabled: true`. A naplók az `api/data/` mappába kerülnek
   (`certificates.jsonl`, `marketing-consents.jsonl`), amelyet `.htaccess` zár el a webtől.
   Éles használatra SMTP/tranzakciós levelezőszolgáltatás ajánlott; a hozzájárulásokat később
   hírlevélrendszerbe (double opt-in) érdemes továbbítani.
3. Javasolt még: rate limit / CAPTCHA a végponton, adatmegőrzési idő, leiratkozási lehetőség.

## Beágyazás más oldalakba (domainek, aldomainek)

Ajánlott felállás: az Agytorna **egy központi helyen** fut (pl. `agytorna.oldalad.hu` vagy `oldalad.hu/agytorna/`),
a többi oldal pedig csak beágyazza. Így egy helyen frissül, és minden oklevélkérés és hozzájárulás egy helyre fut be.

Bármely oldalra (WordPress „Egyéni HTML” blokk, Elementor HTML widget, sima HTML):

```html
<div data-agytorna></div>
<script src="https://agytorna.oldalad.hu/embed.js" async></script>
```

- Az iframe magassága automatikusan igazodik, képernyőváltáskor az oldal a teszt tetejére görget.
- Ragadós fejlécnél: `<div data-agytorna data-offset="80"></div>`.
- A beágyazó oldal neve `?ref=` paraméterként átmegy (később statisztikához).
- A PDF-letöltés, az eredménykártya és a mobilos megosztás beágyazva is működik.

## WordPress

A tároló egyben **éles WordPress-bővítmény (1.2.0)**: `wp-content/plugins/agytorna` (a zipből a `.git`, `tools/`, `api/` elhagyható), majd bármely oldalra `[agytorna]`.

WordPressben a bővítmény automatikusan élesre kapcsol (nincs DEMÓ):

- **Oklevél e-mailben:** REST `agytorna/v1/certificate` → `wp_mail()` PDF-melléklettel, validálás, 5 kérés/óra/IP korlát (csak hash-elt kulcs, 1 óráig). Az oklevél az elkészülte után automatikusan megy.
- **Naplók külön táblában:** `{prefix}agytorna_certificates` (24 hónap után napi cron törli) és `{prefix}agytorna_consents` (marketing-hozzájárulás szöveggel, verzióval, időbélyeggel). WP adatexport/-törlés (Eszközök → Személyes adatok) támogatott.
- **Névtelen kitöltésszámláló:** REST `agytorna/v1/stat` → napi összesítés témánként (kezdés, befejezés, átlagpont), IP és süti nélkül.
- **Admin: Eszközök → Agytorna** – Skool-link, feladó e-mail és név, értesítési cím (új oklevélkérésről), kitöltésszámok, oklevél- és hozzájárulás-lista CSV-exporttal.
- **Adatvédelem:** a betűk helyben (`assets/css/fonts.css`, `assets/fonts/`, SIL Open Font License – Outfit, Playfair Display), nincs Google Fonts; a WP emoji-szkript kikapcsolva (`ap15_disable_emoji` szűrő). Az adatkezelési link a WP adatvédelmi oldalára mutat (Beállítások → Adatvédelem).
- **Megosztási előnézet:** OG- és Twitter-címkék a kezdőlapon és a `[agytorna]` oldalakon (cím, leírás, 1200×630 kép – mintakép: `assets/og-image.png`); Eszközök → Agytorna alatt átírható. SEO-bővítmény (Yoast/Rank Math) esetén nem dupláz.
- **Látogatásszámláló:** a megnyitások is számolódnak (névtelenül), az admin „tölcsér” táblázata: megnyitotta → elkezdte → befejezte → oklevelet kért.
- **Felület:** Skool „Következő lépés” az eredményoldalon (kompakt) és az oklevél alatt; lábléc: adatkezelési link + „Készítette” (`config.js` → `credit`).

Kézbesítéshez a feladó legyen létező postafiók a domainen, vagy használj SMTP-bővítményt.
