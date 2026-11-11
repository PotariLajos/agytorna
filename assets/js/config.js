/**
 * Agytorna – konfiguráció
 * --------------------------------------------------------------
 * Minden, ami élesítéskor változhat, itt van egy helyen.
 * WordPressben ezt az objektumot a bővítmény is felülírhatja
 * (wp_localize_script / wp_add_inline_script → window.AP15_CONFIG).
 */
window.AP15 = window.AP15 || {};

AP15.config = Object.assign(
  {
    brand: 'Agytorna',

    // Skool közösség – ajánlói (affiliate) link
    skoolUrl: 'https://www.skool.com/szabaduszo-affiliate/about?ref=47fda19cfe6e4a4cbdfea472011ceff2',
    skoolUrlIsPlaceholder: false,
    // Ajánlói link jelzése a gomb alatt (üres szöveg = nem jelenik meg)
    skoolDisclosure: 'Ajánlói link: csatlakozás esetén jutalékot kaphatok, neked ez nem kerül többe.',

    // Háttérrendszer az oklevél e-mailes küldéséhez és a hozzájárulás naplózásához.
    // Amíg enabled:false, SEMMILYEN adat nem hagyja el a böngészőt (demó mód).
    backend: {
      enabled: false,
      endpoint: 'api/send-certificate.php'
    },

    // A marketing-hozzájárulás szövege + verziója (a naplóba is ez kerül)
    consentText:
      'Szeretnék később e-mailben értesülni digitális tanulási lehetőségekről, AI-tippekről és közösségi programokról.',
    consentVersion: '2026-11-v1',

    privacyUrl: '#adatkezeles', // helykitöltő
    certificatePrefix: 'AT15'
  },
  window.AP15_CONFIG || {}
);
