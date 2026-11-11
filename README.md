# Agytorna – Interaktív gondolkodási kihívás (prototípus)

Ingyenes, játékos, 15 kérdéses logikai és gondolkodási kihívás, magyar nyelven, mobilra optimalizálva.
**Nem hiteles IQ-mérés**, hanem saját fejlesztésű, játékos képességfelmérő – ezt a felület és az oklevél is jelzi.

Teljes folyamat: **Landing → 15 kérdés → Eredmény → Oklevéladatok → PDF-oklevél (+ e-mail) → Eredménykártya → Skool-ajánlat**

## Indítás

Statikus oldal, build lépés nélkül. Bármilyen webszerverrel futtatható:

```bash
cd agytorna
php -S localhost:8000        # vagy: python3 -m http.server 8000
```

Majd: <http://localhost:8000>. (Közvetlenül fájlként – `file://` – is megnyitható.)

## Mappaszerkezet

| Fájl | Tartalom |
|---|---|
| `index.html` | Önálló oldal, csak egy `<div id="agytorna">` + a modulok betöltése |
| `assets/js/config.js` | **Beállítások**: Skool-link, háttérrendszer ki/be, hozzájárulási szöveg és verzió |
| `assets/js/questions.js` | **Kérdésbank és megoldókulcs** (5 kategória × 3 kérdés, indoklással) |
| `assets/js/results.js` | **Pontozás és eredményszövegek** (szintek, kategóriasávok, javaslatok) |
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

A megoldókulcs (`correct`) és az indoklás (`explain`) a `questions.js`-ben van; az eredményoldalon a kitöltő
minden kérdésnél láthatja a helyes választ és a magyarázatot.

Pontozás: helyes válasz = 1 pont, max. 15. Szintek: 0–5 Kíváncsi felfedező · 6–9 Gondolkodó felfedező ·
10–12 Ügyes problémamegoldó · 13–15 Logikai kihívásmester. A 3 kérdéses részterületek óvatos, tájékoztató
címkét kapnak (Erős terület / Biztos alap / Fejleszthető terület / Felfedezésre vár).

## Mi működik valóban, és mi demó?

| Funkció | Állapot |
|---|---|
| Teljes tesztfolyamat, pontozás, kategóriaeredmények, értékelés, javaslatok | ✅ működik |
| PDF-oklevél generálás és letöltés (ékezethelyes, egyedi azonosítóval) | ✅ működik, a böngészőben |
| Megosztható eredménykártya (PNG letöltés; mobilon natív megosztás) | ✅ működik |
| Oklevélkérés + marketing-hozzájárulás **külön** naplózása időbélyeggel | 🟡 **DEMÓ**: csak a böngésző localStorage-ában („Demó adatnapló” panel) |
| Oklevél küldése e-mail-mellékletként | 🟡 **DEMÓ**: e-mail-előnézet jelenik meg, valódi küldés nincs |
| Skool-link | 🟡 **HELYKITÖLTŐ** – `config.js` → `skoolUrl` |
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

A mappa egyben bővítményként is telepíthető (`wp-content/plugins/agytorna`), majd bármely oldalra:
`[agytorna]`. A beállítások `window.AP15_CONFIG`-on keresztül kerülnek át (Skool-link: `ap15_skool_url` opció).
Következő lépés: admin beállítóoldal, REST végpont `wp_mail()`-lel, és a naplók saját adatbázistáblában.
