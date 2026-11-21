<?php
/**
 * Plugin Name: Agytorna – Interaktív gondolkodási kihívás
 * Description: 15 kérdéses, játékos gondolkodási teszt eredményoldallal, PDF-oklevéllel (e-mailben is), megosztható eredménykártyával és Skool-ajánlattal. Használat: [agytorna] shortcode. Beállítások: Eszközök → Agytorna.
 * Version:     1.1.1
 * Requires PHP: 7.4
 * Text Domain: agytorna
 */

if (!defined('ABSPATH')) {
    exit;
}

define('AP15_VERSION', '1.1.1');
define('AP15_DB_VERSION', '1');
define('AP15_DEFAULT_SKOOL', 'https://www.skool.com/szabaduszo-affiliate/about?ref=47fda19cfe6e4a4cbdfea472011ceff2');
define('AP15_CERT_RETENTION_MONTHS', 24); // oklevél-rekordok megőrzése (hitelesség-ellenőrzéshez)
define('AP15_RATE_LIMIT', 5);              // e-mail / óra / IP
define('AP15_MAX_PDF', 3 * 1024 * 1024);

/* ------------------------------------------------------------------ *
 * Adatbázis: két KÜLÖN tábla (oklevélkérés / marketing-hozzájárulás)
 * ------------------------------------------------------------------ */

function ap15_tables() {
    global $wpdb;
    return [
        'certs'    => $wpdb->prefix . 'agytorna_certificates',
        'consents' => $wpdb->prefix . 'agytorna_consents',
    ];
}

function ap15_install() {
    global $wpdb;
    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    $t = ap15_tables();
    $cs = $wpdb->get_charset_collate();
    dbDelta("CREATE TABLE {$t['certs']} (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        cert_id VARCHAR(40) NOT NULL,
        created_at DATETIME NOT NULL,
        pack VARCHAR(40) NOT NULL DEFAULT '',
        name VARCHAR(60) NOT NULL,
        email VARCHAR(190) NOT NULL,
        score TINYINT UNSIGNED NOT NULL,
        max_score TINYINT UNSIGNED NOT NULL,
        level VARCHAR(60) NOT NULL DEFAULT '',
        marketing TINYINT(1) NOT NULL DEFAULT 0,
        mail_sent TINYINT(1) NOT NULL DEFAULT 0,
        PRIMARY KEY  (id),
        KEY cert_id (cert_id),
        KEY created_at (created_at)
    ) $cs;");
    dbDelta("CREATE TABLE {$t['consents']} (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        created_at DATETIME NOT NULL,
        email VARCHAR(190) NOT NULL,
        name VARCHAR(60) NOT NULL,
        consent_text TEXT NOT NULL,
        consent_version VARCHAR(40) NOT NULL,
        source VARCHAR(60) NOT NULL,
        cert_id VARCHAR(40) NOT NULL DEFAULT '',
        ip_hash CHAR(64) NOT NULL DEFAULT '',
        withdrawn_at DATETIME NULL,
        PRIMARY KEY  (id),
        KEY email (email)
    ) $cs;");
    update_option('ap15_db_version', AP15_DB_VERSION, false);
    if (!wp_next_scheduled('ap15_daily_cleanup')) {
        wp_schedule_event(time() + HOUR_IN_SECONDS, 'daily', 'ap15_daily_cleanup');
    }
}
register_activation_hook(__FILE__, 'ap15_install');
// Feltöltéssel frissített bővítménynél az aktiválási hook nem fut le újra.
add_action('plugins_loaded', function () {
    if (get_option('ap15_db_version') !== AP15_DB_VERSION) {
        ap15_install();
    }
});

register_deactivation_hook(__FILE__, function () {
    wp_clear_scheduled_hook('ap15_daily_cleanup');
});

// Adatmegőrzés: a 24 hónapnál régebbi oklevél-rekordok törlése.
add_action('ap15_daily_cleanup', function () {
    global $wpdb;
    $t = ap15_tables();
    $wpdb->query($wpdb->prepare(
        "DELETE FROM {$t['certs']} WHERE created_at < %s",
        gmdate('Y-m-d H:i:s', strtotime('-' . AP15_CERT_RETENTION_MONTHS . ' months'))
    ));
});

/* ------------------------------------------------------------------ *
 * Beállítások
 * ------------------------------------------------------------------ */

function ap15_opt($key) {
    $defaults = [
        'ap15_skool_url'  => AP15_DEFAULT_SKOOL,
        'ap15_from_email' => 'noreply@' . preg_replace('/^www\./', '', (string) wp_parse_url(home_url(), PHP_URL_HOST)),
        'ap15_from_name'  => get_bloginfo('name'),
        'ap15_notify_email' => get_option('admin_email'),
    ];
    $v = get_option($key);
    return ($v === false || $v === '') ? $defaults[$key] : $v;
}

// Adatvédelem: a WP emoji-szkript ne töltsön képeket a s.w.org-ról (kikapcsolható: add_filter('ap15_disable_emoji','__return_false')).
add_action('init', function () {
    if (!apply_filters('ap15_disable_emoji', true)) {
        return;
    }
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_enqueue_scripts', 'wp_enqueue_emoji_styles');
    remove_filter('the_content_feed', 'wp_staticize_emoji');
    remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
});

/* ------------------------------------------------------------------ *
 * Megosztási előnézet (Facebook / Messenger / LinkedIn / X)
 * ------------------------------------------------------------------ */

add_action('init', function () {
    // show_in_rest: a /wp/v2/settings végponton is állítható (adminból)
    register_setting('ap15', 'ap15_og_image', ['type' => 'string', 'sanitize_callback' => 'esc_url_raw', 'show_in_rest' => true, 'default' => '']);
    register_setting('ap15', 'ap15_og_title', ['type' => 'string', 'sanitize_callback' => 'sanitize_text_field', 'show_in_rest' => true, 'default' => '']);
    register_setting('ap15', 'ap15_og_desc', ['type' => 'string', 'sanitize_callback' => 'sanitize_textarea_field', 'show_in_rest' => true, 'default' => '']);
});

function ap15_og_defaults() {
    return [
        'title' => get_bloginfo('name') . ' – Mennyire vág az eszed?',
        'desc'  => 'Ingyenes, 15 kérdéses gondolkodási kihívás: logika, minták, problémamegoldás. Néhány perc, regisztráció nélkül – a végén személyre szóló PDF-oklevéllel.',
    ];
}

add_action('wp_head', function () {
    if (is_admin() || is_404()) {
        return;
    }
    $post = get_queried_object();
    $hasShortcode = $post instanceof WP_Post && has_shortcode((string) $post->post_content, 'agytorna');
    if (!is_front_page() && !$hasShortcode) {
        return;
    }
    // Ha SEO-bővítmény (Yoast / Rank Math) már ír OG-címkéket, nem duplázunk.
    if (defined('WPSEO_VERSION') || class_exists('RankMath')) {
        return;
    }
    $d     = ap15_og_defaults();
    $title = get_option('ap15_og_title') ?: $d['title'];
    $desc  = get_option('ap15_og_desc') ?: $d['desc'];
    $img   = get_option('ap15_og_image');
    $url   = is_front_page() ? home_url('/') : get_permalink($post);
    echo "\n<!-- Agytorna: megosztási előnézet -->\n";
    echo '<meta name="description" content="' . esc_attr($desc) . "\">\n";
    echo '<meta property="og:type" content="website">' . "\n";
    echo '<meta property="og:locale" content="hu_HU">' . "\n";
    echo '<meta property="og:site_name" content="' . esc_attr(get_bloginfo('name')) . "\">\n";
    echo '<meta property="og:title" content="' . esc_attr($title) . "\">\n";
    echo '<meta property="og:description" content="' . esc_attr($desc) . "\">\n";
    echo '<meta property="og:url" content="' . esc_url($url) . "\">\n";
    if ($img) {
        echo '<meta property="og:image" content="' . esc_url($img) . "\">\n";
        echo '<meta property="og:image:width" content="1200">' . "\n";
        echo '<meta property="og:image:height" content="630">' . "\n";
        echo '<meta property="og:image:alt" content="' . esc_attr($title) . "\">\n";
    }
    echo '<meta name="twitter:card" content="' . ($img ? 'summary_large_image' : 'summary') . "\">\n";
    echo '<meta name="twitter:title" content="' . esc_attr($title) . "\">\n";
    echo '<meta name="twitter:description" content="' . esc_attr($desc) . "\">\n";
    if ($img) {
        echo '<meta name="twitter:image" content="' . esc_url($img) . "\">\n";
    }
}, 5);

/* ------------------------------------------------------------------ *
 * Shortcode + frontend
 * ------------------------------------------------------------------ */

add_shortcode('agytorna', function ($atts = []) {
    $atts = shortcode_atts(['tema' => ''], $atts, 'agytorna'); // üres = témaválasztó
    $base = plugin_dir_url(__FILE__) . 'assets/';
    $ver  = AP15_VERSION;

    wp_enqueue_style('ap15-fonts', $base . 'css/fonts.css', [], $ver); // helyben tárolt betűk
    wp_enqueue_style('ap15', $base . 'css/style.css', ['ap15-fonts'], $ver);

    $deps = [];
    foreach (['config', 'engine', 'packs/agytorna', 'packs/ai', 'packs/szabaduszo', 'storage', 'pdf', 'graphics', 'app'] as $mod) {
        wp_enqueue_script('ap15-' . $mod, $base . 'js/' . $mod . '.js', $deps, $ver, true);
        $deps = ['ap15-' . $mod];
    }

    $config = [
        'skoolUrl'              => ap15_opt('ap15_skool_url'),
        'skoolUrlIsPlaceholder' => false,
        'privacyUrl'            => get_privacy_policy_url() ?: '#adatkezeles',
        'backend'               => ['enabled' => true, 'endpoint' => rest_url('agytorna/v1/certificate')],
        'statsEndpoint'         => rest_url('agytorna/v1/stat'),
    ];
    wp_add_inline_script('ap15-config', 'window.AP15_CONFIG = ' . wp_json_encode($config) . ';', 'before');
    wp_add_inline_script('ap15-app', 'document.querySelectorAll(".ap15-mount").forEach(function(el){AP15.mount(el,{pack:el.getAttribute("data-pack")||undefined});});');

    return '<div class="ap15-mount"' . ($atts['tema'] ? ' data-pack="' . esc_attr($atts['tema']) . '"' : '') . '></div>';
});

/* ------------------------------------------------------------------ *
 * REST végpont: oklevél e-mailben + naplózás
 * ------------------------------------------------------------------ */

add_action('rest_api_init', function () {
    register_rest_route('agytorna/v1', '/certificate', [
        'methods'             => 'POST',
        'callback'            => 'ap15_rest_certificate',
        'permission_callback' => '__return_true', // nyilvános űrlap; védelem: validálás + rate limit
    ]);
    register_rest_route('agytorna/v1', '/stat', [
        'methods'             => 'POST',
        'callback'            => 'ap15_rest_stat',
        'permission_callback' => '__return_true', // névtelen számláló, személyes adat nélkül
    ]);
});

/**
 * Névtelen kitöltésszámláló: napi összesítés témánként (kezdés, befejezés, pontösszeg).
 * Nem tárol IP-t, sütit, azonosítót – csak számokat.
 */
function ap15_rest_stat(WP_REST_Request $req) {
    $in = $req->get_json_params();
    if (!is_array($in)) {
        $in = json_decode((string) $req->get_body(), true); // sendBeacon
    }
    $event = (string) ($in['event'] ?? '');
    $pack  = sanitize_key((string) ($in['pack'] ?? ''));
    if ($event === 'view') {
        $pack = '_all'; // oldalmegnyitás: témától független
    } elseif (!in_array($event, ['start', 'finish'], true) || !in_array($pack, ['agytorna', 'ai', 'szabaduszo'], true)) {
        return new WP_REST_Response(['ok' => false], 400);
    }
    $day   = current_time('Y-m-d');
    $stats = get_option('ap15_stats', []);
    if (!is_array($stats)) {
        $stats = [];
    }
    $row = $stats[$day][$pack] ?? ['start' => 0, 'finish' => 0, 'scoreSum' => 0];
    $row[$event] = ($row[$event] ?? 0) + 1;
    if ($event === 'finish' && isset($in['score']) && is_numeric($in['score'])) {
        $row['scoreSum'] += max(0, min(50, (int) $in['score']));
    }
    $stats[$day][$pack] = $row;
    if (count($stats) > 400) { // kb. 13 hónap napi bontás
        ksort($stats);
        $stats = array_slice($stats, -400, null, true);
    }
    update_option('ap15_stats', $stats, false);
    return new WP_REST_Response(['ok' => true], 200);
}

function ap15_fail($code, $msg) {
    return new WP_REST_Response(['ok' => false, 'message' => $msg], $code);
}

function ap15_rest_certificate(WP_REST_Request $req) {
    global $wpdb;
    $in = $req->get_json_params();
    if (!is_array($in)) {
        return ap15_fail(400, 'Érvénytelen kérés.');
    }

    // Rate limit (nyers IP-t nem tárolunk, csak sóval hash-elt kulcsot, 1 óráig)
    $ip   = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '';
    $rkey = 'ap15_rl_' . substr(hash_hmac('sha256', $ip, wp_salt('nonce')), 0, 32);
    $hits = (int) get_transient($rkey);
    if ($hits >= AP15_RATE_LIMIT) {
        return ap15_fail(429, 'Túl sok kérés érkezett. Kérjük, próbáld újra később.');
    }
    set_transient($rkey, $hits + 1, HOUR_IN_SECONDS);

    // Validálás
    $name   = trim(preg_replace('/\s+/u', ' ', (string) ($in['name'] ?? '')));
    $email  = trim((string) ($in['email'] ?? ''));
    $certId = (string) ($in['certId'] ?? '');
    $pack   = sanitize_key((string) ($in['pack'] ?? ''));
    $score  = (int) ($in['score'] ?? -1);
    $max    = (int) ($in['max'] ?? 15);
    $level  = mb_substr(sanitize_text_field((string) ($in['level'] ?? '')), 0, 60);
    $mkt    = ($in['marketingConsent'] ?? false) === true;

    if (mb_strlen($name) < 2 || mb_strlen($name) > 48 || preg_match('/[\r\n<>]/', $name)) {
        return ap15_fail(422, 'Érvénytelen név.');
    }
    if (!is_email($email)) {
        return ap15_fail(422, 'Érvénytelen e-mail-cím.');
    }
    if (!preg_match('/^AT15-\d{6}-[A-Z0-9]{4}-[A-Z0-9]{4}$/', $certId)) {
        return ap15_fail(422, 'Érvénytelen oklevélazonosító.');
    }
    if ($max < 1 || $max > 50 || $score < 0 || $score > $max) {
        return ap15_fail(422, 'Érvénytelen pontszám.');
    }
    $pdf = base64_decode((string) ($in['pdfBase64'] ?? ''), true);
    if ($pdf === false || strncmp($pdf, '%PDF-', 5) !== 0 || strlen($pdf) > AP15_MAX_PDF) {
        return ap15_fail(422, 'Érvénytelen PDF.');
    }

    $t   = ap15_tables();
    $now = current_time('mysql', true);

    // 1) oklevélkérés
    $wpdb->insert($t['certs'], [
        'cert_id' => $certId, 'created_at' => $now, 'pack' => $pack, 'name' => $name, 'email' => $email,
        'score' => $score, 'max_score' => $max, 'level' => $level, 'marketing' => $mkt ? 1 : 0,
    ]);
    $rowId = (int) $wpdb->insert_id;

    // 2) marketing-hozzájárulás KÜLÖN, időbélyeggel, a pontos szöveggel és verzióval
    if ($mkt) {
        $wpdb->insert($t['consents'], [
            'created_at'      => $now,
            'email'           => $email,
            'name'            => $name,
            'consent_text'    => mb_substr(sanitize_textarea_field((string) ($in['consentText'] ?? '')), 0, 500),
            'consent_version' => mb_substr(sanitize_text_field((string) ($in['consentVersion'] ?? '')), 0, 40),
            'source'          => 'agytorna-oklevel-urlap',
            'cert_id'         => $certId,
            'ip_hash'         => hash_hmac('sha256', $ip . '|' . $certId, wp_salt('auth')),
        ]);
    }

    // 3) e-mail PDF-melléklettel (ideiglenes fájl, küldés után törölve)
    $dir = trailingslashit(get_temp_dir()) . 'ap15-' . wp_generate_password(12, false);
    wp_mkdir_p($dir);
    $file = $dir . '/oklevel-' . strtolower($certId) . '.pdf';
    file_put_contents($file, $pdf);

    $site    = get_bloginfo('name');
    $skool   = ap15_opt('ap15_skool_url');
    $subject = 'Gratulálunk! Itt az okleveled – ' . $site;
    $body    = "Kedves {$name}!\n\n"
             . "Gratulálunk, sikeresen teljesítetted a kihívást {$score}/{$max} ponttal ({$level}).\n"
             . "Csatoltan küldjük személyre szóló okleveledet (azonosító: {$certId}).\n\n"
             . "Következő lépés – ha szeretnél tovább fejlődni:\n{$skool}\n"
             . "(Ajánlói link: csatlakozás esetén jutalékot kaphatok, neked ez nem kerül többe.)\n\n"
             . "Üdvözlettel:\n{$site}\n" . home_url('/') . "\n\n"
             . "A teszt saját fejlesztésű, játékos képességfelmérő – nem minősül hiteles IQ-mérésnek.\n"
             . (get_privacy_policy_url() ? 'Adatkezelési tájékoztató: ' . get_privacy_policy_url() . "\n" : '');

    $fromMail = sanitize_email(ap15_opt('ap15_from_email'));
    $fromName = ap15_opt('ap15_from_name');
    $setFrom  = function ($phpmailer) use ($fromMail, $fromName) {
        try { $phpmailer->setFrom($fromMail, $fromName, false); } catch (\Exception $e) {}
    };
    add_action('phpmailer_init', $setFrom);
    $sent = wp_mail($email, $subject, $body, ['Content-Type: text/plain; charset=UTF-8'], [$file]);
    remove_action('phpmailer_init', $setFrom);

    @unlink($file);
    @rmdir($dir);

    if ($rowId) {
        $wpdb->update($t['certs'], ['mail_sent' => $sent ? 1 : 0], ['id' => $rowId]);
    }

    // Értesítés az oldal gazdájának (melléklet nélkül)
    $notify = sanitize_email(ap15_opt('ap15_notify_email'));
    if ($notify) {
        $packs = ['agytorna' => 'Gondolkodási próba', 'ai' => 'AI-próba', 'szabaduszo' => 'Szabadúszó-próba'];
        add_action('phpmailer_init', $setFrom);
        wp_mail($notify, '[' . $site . '] Új oklevélkérés: ' . $name . ' (' . $score . '/' . $max . ')',
            "Új oklevélkérés érkezett az oldalon.\n\n"
            . "Név: {$name}\nE-mail: {$email}\nTéma: " . ($packs[$pack] ?? $pack) . "\nPontszám: {$score}/{$max} ({$level})\n"
            . 'Hírlevél-hozzájárulás: ' . ($mkt ? 'IGEN' : 'nem') . "\n"
            . 'Oklevél kiküldve: ' . ($sent ? 'igen' : 'NEM – ellenőrizd a levelezést') . "\nAzonosító: {$certId}\n\n"
            . 'Összes adat: ' . admin_url('tools.php?page=agytorna') . "\n",
            ['Content-Type: text/plain; charset=UTF-8']);
        remove_action('phpmailer_init', $setFrom);
    }
    if (!$sent) {
        return ap15_fail(502, 'A levelet most nem sikerült elküldeni');
    }
    return new WP_REST_Response(['ok' => true], 200);
}

/* ------------------------------------------------------------------ *
 * Admin: Eszközök → Agytorna (beállítások, lista, CSV-export)
 * ------------------------------------------------------------------ */

add_action('admin_menu', function () {
    add_management_page('Agytorna', 'Agytorna', 'manage_options', 'agytorna', 'ap15_admin_page');
});

add_action('admin_init', function () {
    register_setting('ap15', 'ap15_skool_url', ['type' => 'string', 'sanitize_callback' => 'esc_url_raw']);
    register_setting('ap15', 'ap15_from_email', ['type' => 'string', 'sanitize_callback' => 'sanitize_email']);
    register_setting('ap15', 'ap15_from_name', ['type' => 'string', 'sanitize_callback' => 'sanitize_text_field']);
    register_setting('ap15', 'ap15_notify_email', ['type' => 'string', 'sanitize_callback' => 'sanitize_email']);

    // Névtelen számláló nullázása (csak az ap15_stats; oklevél- és hozzájárulás-rekordok maradnak)
    if (isset($_POST['ap15_reset_stats']) && current_user_can('manage_options')) {
        check_admin_referer('ap15_reset_stats');
        delete_option('ap15_stats');
        wp_safe_redirect(admin_url('tools.php?page=agytorna&ap15_reset=1'));
        exit;
    }

    if (isset($_GET['page'], $_GET['ap15_export']) && $_GET['page'] === 'agytorna' && current_user_can('manage_options')) {
        check_admin_referer('ap15_export');
        global $wpdb;
        $t     = ap15_tables();
        $which = $_GET['ap15_export'] === 'consents' ? 'consents' : 'certs';
        $rows  = $wpdb->get_results("SELECT * FROM {$t[$which]} ORDER BY id DESC", ARRAY_A);
        nocache_headers();
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=agytorna-' . ($which === 'consents' ? 'hozzajarulasok' : 'oklevelek') . '-' . gmdate('Ymd') . '.csv');
        $out = fopen('php://output', 'w');
        fwrite($out, "\xEF\xBB\xBF"); // Excelnek UTF-8 BOM
        if ($rows) {
            fputcsv($out, array_keys($rows[0]), ';');
            foreach ($rows as $r) {
                fputcsv($out, $r, ';');
            }
        }
        fclose($out);
        exit;
    }
});

function ap15_admin_page() {
    global $wpdb;
    $t      = ap15_tables();
    $certs  = $wpdb->get_results("SELECT * FROM {$t['certs']} ORDER BY id DESC LIMIT 50");
    $cons   = $wpdb->get_results("SELECT * FROM {$t['consents']} ORDER BY id DESC LIMIT 50");
    $nCerts = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$t['certs']}");
    $nCons  = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$t['consents']}");
    $exp    = function ($w) { return wp_nonce_url(admin_url('tools.php?page=agytorna&ap15_export=' . $w), 'ap15_export'); };
    ?>
    <div class="wrap">
      <h1>Agytorna</h1>
      <p>Használat: <code>[agytorna]</code> rövidkód bármelyik oldalon (téma rögzítése: <code>[agytorna tema="ai"]</code>).
         Adatkezelési tájékoztató: <?php echo get_privacy_policy_url() ? '<a href="' . esc_url(get_privacy_policy_url()) . '" target="_blank">' . esc_html(get_privacy_policy_url()) . '</a>' : '<b style="color:#b32d2e">nincs beállítva (Beállítások → Adatvédelem)</b>'; ?></p>

      <h2>Beállítások</h2>
      <form method="post" action="options.php">
        <?php settings_fields('ap15'); ?>
        <table class="form-table" role="presentation">
          <tr><th><label for="ap15_skool_url">Skool-link (Következő lépés)</label></th>
              <td><input class="large-text" id="ap15_skool_url" name="ap15_skool_url" type="url" value="<?php echo esc_attr(ap15_opt('ap15_skool_url')); ?>"></td></tr>
          <tr><th><label for="ap15_from_email">Feladó e-mail-cím</label></th>
              <td><input class="regular-text" id="ap15_from_email" name="ap15_from_email" type="email" value="<?php echo esc_attr(ap15_opt('ap15_from_email')); ?>">
              <p class="description">Legyen létező postafiók a domainen (hPanel → E-mailek), különben a levelek spambe kerülhetnek. Megbízhatóbb kézbesítéshez SMTP-bővítmény ajánlott.</p></td></tr>
          <tr><th><label for="ap15_from_name">Feladó neve</label></th>
              <td><input class="regular-text" id="ap15_from_name" name="ap15_from_name" type="text" value="<?php echo esc_attr(ap15_opt('ap15_from_name')); ?>"></td></tr>
          <tr><th><label for="ap15_notify_email">Értesítés új oklevélkérésről</label></th>
              <td><input class="regular-text" id="ap15_notify_email" name="ap15_notify_email" type="email" value="<?php echo esc_attr(ap15_opt('ap15_notify_email')); ?>">
              <p class="description">Erre a címre jön levél, ha valaki megadja az adatait (név, e-mail, pontszám, hírlevél igen/nem).</p></td></tr>
          <tr><th><label for="ap15_og_title">Megosztási cím (Facebook)</label></th>
              <td><input class="large-text" id="ap15_og_title" name="ap15_og_title" type="text" value="<?php echo esc_attr(get_option('ap15_og_title')); ?>" placeholder="<?php echo esc_attr(ap15_og_defaults()['title']); ?>"></td></tr>
          <tr><th><label for="ap15_og_desc">Megosztási leírás</label></th>
              <td><textarea class="large-text" rows="2" id="ap15_og_desc" name="ap15_og_desc" placeholder="<?php echo esc_attr(ap15_og_defaults()['desc']); ?>"><?php echo esc_textarea(get_option('ap15_og_desc')); ?></textarea></td></tr>
          <tr><th><label for="ap15_og_image">Megosztási kép URL (1200×630)</label></th>
              <td><input class="large-text" id="ap15_og_image" name="ap15_og_image" type="url" value="<?php echo esc_attr(get_option('ap15_og_image')); ?>">
              <p class="description">Médiatárba feltöltött kép címe. Módosítás után a Facebook Sharing Debuggerben kattints az „Újrakaparás” gombra.</p></td></tr>
        </table>
        <?php submit_button(); ?>
      </form>

      <?php
      $stats  = get_option('ap15_stats', []);
      $stats  = is_array($stats) ? $stats : [];
      krsort($stats);
      $names  = ['agytorna' => 'Gondolkodási próba', 'ai' => 'AI-próba', 'szabaduszo' => 'Szabadúszó-próba'];
      $tot    = [];
      foreach ($stats as $day => $packs) {
          foreach ($packs as $p => $r) {
              $tot[$p]['view']     = ($tot[$p]['view'] ?? 0) + ($r['view'] ?? 0);
              $tot[$p]['start']    = ($tot[$p]['start'] ?? 0) + ($r['start'] ?? 0);
              $tot[$p]['finish']   = ($tot[$p]['finish'] ?? 0) + ($r['finish'] ?? 0);
              $tot[$p]['scoreSum'] = ($tot[$p]['scoreSum'] ?? 0) + ($r['scoreSum'] ?? 0);
          }
      }
      $views   = (int) ($tot['_all']['view'] ?? 0);
      $starts  = 0; $fins = 0;
      foreach ($names as $p => $l) { $starts += (int) ($tot[$p]['start'] ?? 0); $fins += (int) ($tot[$p]['finish'] ?? 0); }
      $pct = function ($a, $b) { return $b ? round($a / $b * 100) . '%' : '–'; };
      ?>
      <h2>Látogatás és kitöltés (névtelen, süti nélkül)</h2>
      <table class="widefat striped" style="max-width:720px"><thead><tr><th></th><th>Megnyitotta</th><th>Elkezdte</th><th>Befejezte</th><th>Oklevelet kért</th></tr></thead><tbody>
        <tr><td><b>Összesen</b></td><td><b><?php echo $views; ?></b></td><td><b><?php echo $starts; ?></b> (<?php echo $pct($starts, $views); ?>)</td>
            <td><b><?php echo $fins; ?></b> (<?php echo $pct($fins, $starts); ?>)</td><td><b><?php echo (int) $nCerts; ?></b> (<?php echo $pct($nCerts, $fins); ?>)</td></tr>
      </tbody></table>
      <p class="description">A százalék az előző lépéshez viszonyít. A megnyitást csak böngészőben futó oldal számolja (a robotok többsége kimarad); egy látogató újratöltése új megnyitásnak számít.</p>
      <?php if (!empty($_GET['ap15_reset'])) echo '<div class="notice notice-success inline"><p>A számláló nullázva.</p></div>'; ?>
      <form method="post" onsubmit="return confirm('Biztosan nullázod a látogatás- és kitöltésszámlálót? (Az oklevélkérések és a hozzájárulások megmaradnak.)');">
        <?php wp_nonce_field('ap15_reset_stats'); ?>
        <button type="submit" name="ap15_reset_stats" value="1" class="button">Számláló nullázása</button>
      </form>
      <h3>Témánként</h3>
      <table class="widefat striped" style="max-width:720px"><thead><tr><th>Téma</th><th>Elkezdte</th><th>Befejezte</th><th>Befejezési arány</th><th>Átlagpont</th></tr></thead><tbody>
      <?php foreach ($names as $p => $label) : $r = $tot[$p] ?? ['start' => 0, 'finish' => 0, 'scoreSum' => 0]; ?>
        <tr><td><?php echo esc_html($label); ?></td><td><?php echo (int) $r['start']; ?></td><td><b><?php echo (int) $r['finish']; ?></b></td>
            <td><?php echo $r['start'] ? round($r['finish'] / $r['start'] * 100) . '%' : '–'; ?></td>
            <td><?php echo $r['finish'] ? number_format($r['scoreSum'] / $r['finish'], 1, ',', '') . ' / 15' : '–'; ?></td></tr>
      <?php endforeach; ?>
      </tbody></table>
      <h3>Utolsó 14 nap</h3>
      <table class="widefat striped" style="max-width:720px"><thead><tr><th>Nap</th><th>Megnyitotta</th><th>Elkezdte</th><th>Befejezte</th></tr></thead><tbody>
      <?php $i = 0; foreach ($stats as $day => $packs) : if ($i++ >= 14) break;
          $v = 0; $s = 0; $f = 0; foreach ($packs as $r) { $v += $r['view'] ?? 0; $s += $r['start'] ?? 0; $f += $r['finish'] ?? 0; } ?>
        <tr><td><?php echo esc_html($day); ?></td><td><?php echo (int) $v; ?></td><td><?php echo (int) $s; ?></td><td><?php echo (int) $f; ?></td></tr>
      <?php endforeach; if (!$stats) echo '<tr><td colspan="4">Még nincs adat.</td></tr>'; ?>
      </tbody></table>

      <h2>Oklevélkérések (<?php echo (int) $nCerts; ?>) <a class="button" href="<?php echo esc_url($exp('certs')); ?>">CSV letöltése</a></h2>
      <p class="description">Megőrzés: <?php echo (int) AP15_CERT_RETENTION_MONTHS; ?> hónap, utána automatikusan törlődnek.</p>
      <table class="widefat striped"><thead><tr><th>Idő (UTC)</th><th>Azonosító</th><th>Név</th><th>E-mail</th><th>Téma</th><th>Pont</th><th>Szint</th><th>Hírlevél</th><th>E-mail elment</th></tr></thead><tbody>
      <?php foreach ($certs as $c) : ?>
        <tr><td><?php echo esc_html($c->created_at); ?></td><td><?php echo esc_html($c->cert_id); ?></td><td><?php echo esc_html($c->name); ?></td><td><?php echo esc_html($c->email); ?></td>
            <td><?php echo esc_html($c->pack); ?></td><td><?php echo (int) $c->score . '/' . (int) $c->max_score; ?></td><td><?php echo esc_html($c->level); ?></td>
            <td><?php echo $c->marketing ? '✓' : '–'; ?></td><td><?php echo $c->mail_sent ? '✓' : '✗'; ?></td></tr>
      <?php endforeach; if (!$certs) echo '<tr><td colspan="9">Még nincs oklevélkérés.</td></tr>'; ?>
      </tbody></table>

      <h2>Marketing-hozzájárulások (<?php echo (int) $nCons; ?>) <a class="button" href="<?php echo esc_url($exp('consents')); ?>">CSV letöltése</a></h2>
      <table class="widefat striped"><thead><tr><th>Idő (UTC)</th><th>E-mail</th><th>Név</th><th>Verzió</th><th>Forrás</th><th>Oklevél</th></tr></thead><tbody>
      <?php foreach ($cons as $c) : ?>
        <tr><td><?php echo esc_html($c->created_at); ?></td><td><?php echo esc_html($c->email); ?></td><td><?php echo esc_html($c->name); ?></td>
            <td><?php echo esc_html($c->consent_version); ?></td><td><?php echo esc_html($c->source); ?></td><td><?php echo esc_html($c->cert_id); ?></td></tr>
      <?php endforeach; if (!$cons) echo '<tr><td colspan="6">Még nincs hozzájárulás.</td></tr>'; ?>
      </tbody></table>
    </div>
    <?php
}

/* ------------------------------------------------------------------ *
 * WP adatvédelmi eszközök (Eszközök → Személyes adatok exportja/törlése)
 * ------------------------------------------------------------------ */

add_filter('wp_privacy_personal_data_exporters', function ($ex) {
    $ex['agytorna'] = ['exporter_friendly_name' => 'Agytorna', 'callback' => function ($email) {
        global $wpdb;
        $t = ap15_tables();
        $data = [];
        foreach ($wpdb->get_results($wpdb->prepare("SELECT * FROM {$t['certs']} WHERE email = %s", $email)) as $r) {
            $data[] = ['group_id' => 'agytorna-certs', 'group_label' => 'Agytorna oklevelek', 'item_id' => 'cert-' . $r->id, 'data' => [
                ['name' => 'Azonosító', 'value' => $r->cert_id], ['name' => 'Név', 'value' => $r->name],
                ['name' => 'Pontszám', 'value' => $r->score . '/' . $r->max_score], ['name' => 'Időpont (UTC)', 'value' => $r->created_at]]];
        }
        foreach ($wpdb->get_results($wpdb->prepare("SELECT * FROM {$t['consents']} WHERE email = %s", $email)) as $r) {
            $data[] = ['group_id' => 'agytorna-consents', 'group_label' => 'Agytorna hozzájárulások', 'item_id' => 'consent-' . $r->id, 'data' => [
                ['name' => 'Szöveg', 'value' => $r->consent_text], ['name' => 'Verzió', 'value' => $r->consent_version],
                ['name' => 'Időpont (UTC)', 'value' => $r->created_at]]];
        }
        return ['data' => $data, 'done' => true];
    }];
    return $ex;
});

add_filter('wp_privacy_personal_data_erasers', function ($er) {
    $er['agytorna'] = ['eraser_friendly_name' => 'Agytorna', 'callback' => function ($email) {
        global $wpdb;
        $t = ap15_tables();
        $n = (int) $wpdb->delete($t['certs'], ['email' => $email]) + (int) $wpdb->delete($t['consents'], ['email' => $email]);
        return ['items_removed' => $n > 0, 'items_retained' => false, 'messages' => [], 'done' => true];
    }];
    return $er;
});
