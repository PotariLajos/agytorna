<?php
/**
 * Agytorna – oklevélküldő és hozzájárulás-naplózó végpont (SABLON)
 * ----------------------------------------------------------------------
 * ALAPÉRTELMEZÉSBEN KIKAPCSOLVA. A frontend csak akkor hívja, ha a
 * assets/js/config.js fájlban backend.enabled = true.
 *
 * Élesítés előtt:
 *   1. HTTPS kötelező.
 *   2. Állítsd be lent a FELADÓ címet, és ellenőrizd, hogy a szerver
 *      tud-e leveleket küldeni (mail()). Éles környezetben javasolt
 *      SMTP/tranzakciós levelezőszolgáltatás (pl. WordPressben wp_mail + SMTP bővítmény).
 *   3. Az adatok mappája ne legyen webről elérhető (lásd data/.htaccess).
 *   4. Készüljön el az adatkezelési tájékoztató.
 *
 * Bemenet (JSON, POST):
 *   certId, issuedAt, name, nameMode, email, score, max, level,
 *   marketingConsent, consentText, consentVersion, pdfBase64
 */

declare(strict_types=1);

const AP15_ENABLED     = false;                       // ← élesítéskor true
const AP15_FROM_EMAIL  = 'oklevel@pelda.hu';          // ← HELYKITÖLTŐ
const AP15_FROM_NAME   = 'Agytorna';
const AP15_DATA_DIR    = __DIR__ . '/data';
const AP15_MAX_PDF     = 3 * 1024 * 1024;             // 3 MB

header('Content-Type: application/json; charset=utf-8');

function ap15_out(int $code, array $body): void {
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (!AP15_ENABLED) {
    ap15_out(503, ['ok' => false, 'message' => 'A háttérrendszer nincs bekapcsolva (demó mód).']);
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    ap15_out(405, ['ok' => false, 'message' => 'Csak POST kérés engedélyezett.']);
}

$raw = file_get_contents('php://input', false, null, 0, 6 * 1024 * 1024);
$in  = json_decode((string)$raw, true);
if (!is_array($in)) {
    ap15_out(400, ['ok' => false, 'message' => 'Érvénytelen kérés.']);
}

// ---- Validálás ----
$name  = trim(preg_replace('/\s+/u', ' ', (string)($in['name'] ?? '')));
$email = trim((string)($in['email'] ?? ''));
$certId = (string)($in['certId'] ?? '');
$score = (int)($in['score'] ?? -1);
$max   = (int)($in['max'] ?? 15);
$level = mb_substr(trim((string)($in['level'] ?? '')), 0, 60);
$marketing = ($in['marketingConsent'] ?? false) === true;

if (mb_strlen($name) < 2 || mb_strlen($name) > 48 || preg_match('/[\r\n<>]/', $name)) {
    ap15_out(422, ['ok' => false, 'message' => 'Érvénytelen név.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    ap15_out(422, ['ok' => false, 'message' => 'Érvénytelen e-mail-cím.']);
}
if (!preg_match('/^AT15-\d{6}-[A-Z0-9]{4}-[A-Z0-9]{4}$/', $certId)) {
    ap15_out(422, ['ok' => false, 'message' => 'Érvénytelen oklevélazonosító.']);
}
if ($score < 0 || $score > $max) {
    ap15_out(422, ['ok' => false, 'message' => 'Érvénytelen pontszám.']);
}
$pdf = base64_decode((string)($in['pdfBase64'] ?? ''), true);
if ($pdf === false || strncmp($pdf, '%PDF-', 5) !== 0 || strlen($pdf) > AP15_MAX_PDF) {
    ap15_out(422, ['ok' => false, 'message' => 'Érvénytelen PDF.']);
}

// ---- Naplózás (két külön fájl) ----
if (!is_dir(AP15_DATA_DIR)) {
    mkdir(AP15_DATA_DIR, 0750, true);
}
$now = gmdate('c');
$ipHash = hash('sha256', ($_SERVER['REMOTE_ADDR'] ?? '') . '|' . $certId); // nem tárolunk nyers IP-t

$certRecord = [
    'certId' => $certId, 'issuedAt' => $now, 'name' => $name, 'email' => $email,
    'score' => $score, 'max' => $max, 'level' => $level, 'marketingConsent' => $marketing,
];
file_put_contents(AP15_DATA_DIR . '/certificates.jsonl',
    json_encode($certRecord, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

if ($marketing) {
    $consentRecord = [
        'email' => $email, 'name' => $name, 'consent' => true,
        'consentText' => mb_substr((string)($in['consentText'] ?? ''), 0, 500),
        'consentVersion' => mb_substr((string)($in['consentVersion'] ?? ''), 0, 40),
        'timestamp' => $now, 'source' => 'agytorna-oklevel-urlap',
        'certId' => $certId, 'ipHash' => $ipHash,
    ];
    file_put_contents(AP15_DATA_DIR . '/marketing-consents.jsonl',
        json_encode($consentRecord, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);
}

// ---- E-mail PDF-melléklettel ----
$boundary = 'ap15_' . bin2hex(random_bytes(12));
$subject  = '=?UTF-8?B?' . base64_encode('Gratulálunk! Itt az Agytorna okleveled') . '?=';
$fromName = '=?UTF-8?B?' . base64_encode(AP15_FROM_NAME) . '?=';
$fileName = 'agytorna-oklevel-' . strtolower($certId) . '.pdf';

$text = "Kedves {$name}!\n\n"
      . "Gratulálunk, sikeresen teljesítetted az Agytorna kihívást {$score}/{$max} ponttal ({$level}).\n"
      . "Csatoltan küldjük személyre szóló okleveledet (azonosító: {$certId}).\n\n"
      . "Üdvözlettel:\nAz Agytorna csapata\n\n"
      . "Az Agytorna saját fejlesztésű, játékos képességfelmérő – nem minősül hiteles IQ-mérésnek.";

$headers = [
    'From: ' . $fromName . ' <' . AP15_FROM_EMAIL . '>',
    'MIME-Version: 1.0',
    'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
];
$body = "--{$boundary}\r\n"
      . "Content-Type: text/plain; charset=UTF-8\r\n"
      . "Content-Transfer-Encoding: base64\r\n\r\n"
      . chunk_split(base64_encode($text)) . "\r\n"
      . "--{$boundary}\r\n"
      . "Content-Type: application/pdf; name=\"{$fileName}\"\r\n"
      . "Content-Disposition: attachment; filename=\"{$fileName}\"\r\n"
      . "Content-Transfer-Encoding: base64\r\n\r\n"
      . chunk_split(base64_encode($pdf)) . "\r\n"
      . "--{$boundary}--\r\n";

$sent = @mail($email, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    ap15_out(502, ['ok' => false, 'message' => 'A levelet most nem sikerült elküldeni.']);
}
ap15_out(200, ['ok' => true]);
