<?php
/**
 * Plugin Name: Agytorna – Interaktív gondolkodási kihívás
 * Description: 15 kérdéses, játékos gondolkodási teszt eredményoldallal, PDF-oklevéllel és megosztható eredménykártyával. Használat: [agytorna] shortcode.
 * Version:     0.1.0 (prototípus)
 * Text Domain: agytorna
 *
 * VÁZ a következő fejlesztési fázishoz: a mappa egyben WordPress-bővítményként
 * is telepíthető (wp-content/plugins/agytorna). A frontend ugyanaz, mint az
 * önálló index.html-ben, a beállítások window.AP15_CONFIG-on keresztül jutnak el.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_shortcode('agytorna', function () {
    $base = plugin_dir_url(__FILE__) . 'assets/';
    $ver  = '0.1.0';

    wp_enqueue_style('ap15-fonts', 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap', [], null);
    wp_enqueue_style('ap15', $base . 'css/style.css', ['ap15-fonts'], $ver);

    $deps = [];
    foreach (['config', 'questions', 'results', 'storage', 'pdf', 'graphics', 'app'] as $mod) {
        wp_enqueue_script('ap15-' . $mod, $base . 'js/' . $mod . '.js', $deps, $ver, true);
        $deps = ['ap15-' . $mod];
    }

    // Szerveroldali beállítások (később admin oldalról szerkeszthetők)
    $config = [
        'skoolUrl'              => get_option('ap15_skool_url', 'https://www.skool.com/IDE-JON-A-KOZOSSEG-LINKJE'),
        'skoolUrlIsPlaceholder' => !get_option('ap15_skool_url'),
        'privacyUrl'            => get_privacy_policy_url() ?: '#adatkezeles',
        'backend'               => ['enabled' => false, 'endpoint' => ''], // következő fázis: REST végpont + wp_mail
    ];
    wp_add_inline_script('ap15-config', 'window.AP15_CONFIG = ' . wp_json_encode($config) . ';', 'before');
    wp_add_inline_script('ap15-app', 'document.querySelectorAll(".ap15-mount").forEach(function(el){AP15.mount(el);});');

    return '<div class="ap15-mount"></div>';
});
