/**
 * Agytorna – minimális, függőség nélküli PDF-író
 * --------------------------------------------------------------
 * Egyoldalas PDF-et készít egy JPEG képből (DCTDecode), így
 * nincs szükség külső könyvtárra vagy CDN-re, és az ékezetes
 * (ő, ű) betűk is hibátlanok, mert a szöveget a canvas rajzolja.
 */
window.AP15 = window.AP15 || {};

AP15.pdf = (function () {
  function dataUrlToBytes(dataUrl) {
    var b64 = dataUrl.split(',')[1];
    var bin = atob(b64);
    var out = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }

  // PDF szövegmező UTF-16BE hex formában (ékezetes metaadatokhoz)
  function pdfUtf16(str) {
    var hex = 'FEFF';
    for (var i = 0; i < str.length; i++) {
      hex += ('0000' + str.charCodeAt(i).toString(16).toUpperCase()).slice(-4);
    }
    return '<' + hex + '>';
  }

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {{widthPt:number,heightPt:number,title?:string,author?:string,quality?:number}} opt
   * @returns {Blob} application/pdf
   */
  function fromCanvas(canvas, opt) {
    var jpeg = dataUrlToBytes(canvas.toDataURL('image/jpeg', opt.quality || 0.92));
    var W = opt.widthPt.toFixed(2), H = opt.heightPt.toFixed(2);
    var enc = new TextEncoder();
    var chunks = [], offsets = [], length = 0;

    function push(part) {
      var bytes = typeof part === 'string' ? enc.encode(part) : part;
      chunks.push(bytes);
      length += bytes.length;
    }
    function obj(n, body) {
      offsets[n] = length;
      push(n + ' 0 obj\n' + body + '\nendobj\n');
    }

    push('%PDF-1.4\n');
    push(new Uint8Array([0x25, 0xE2, 0xE3, 0xCF, 0xD3, 0x0A])); // bináris jelző

    obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
    obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
    obj(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + W + ' ' + H + '] ' +
           '/Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');

    offsets[4] = length;
    push('4 0 obj\n<< /Type /XObject /Subtype /Image /Width ' + canvas.width +
         ' /Height ' + canvas.height + ' /ColorSpace /DeviceRGB /BitsPerComponent 8' +
         ' /Filter /DCTDecode /Length ' + jpeg.length + ' >>\nstream\n');
    push(jpeg);
    push('\nendstream\nendobj\n');

    var content = 'q ' + W + ' 0 0 ' + H + ' 0 0 cm /Im0 Do Q';
    obj(5, '<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream');

    var now = new Date();
    var pad = function (n) { return ('0' + n).slice(-2); };
    var pdfDate = 'D:' + now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) +
                  pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());
    obj(6, '<< /Title ' + pdfUtf16(opt.title || 'Oklevél') +
           ' /Author ' + pdfUtf16(opt.author || 'Agytorna') +
           ' /Producer ' + pdfUtf16('Agytorna prototípus') +
           ' /CreationDate (' + pdfDate + ') >>');

    var xrefPos = length;
    var xref = 'xref\n0 7\n0000000000 65535 f \n';
    for (var i = 1; i <= 6; i++) xref += ('0000000000' + offsets[i]).slice(-10) + ' 00000 n \n';
    push(xref);
    push('trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n' + xrefPos + '\n%%EOF\n');

    return new Blob(chunks, { type: 'application/pdf' });
  }

  return { fromCanvas: fromCanvas };
})();
