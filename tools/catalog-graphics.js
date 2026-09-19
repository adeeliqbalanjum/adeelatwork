// Renders the 4:3 cover images for the Upwork Project Catalog offers. usage: node tools/catalog-graphics.js
// Reads the demo screenshots and project mockups, writes upwork/catalog/<name>.jpg at 1600x1200.
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const sharp = require('sharp');
const ROOT = path.resolve(__dirname, '..'), OUT = path.join(ROOT, 'upwork/catalog');
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(fs.existsSync);
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'aw-cat-'));
const url = p => 'file:///' + p.replace(/\\/g, '/').replace(/ /g, '%20');
const img = rel => url(path.join(ROOT, rel));
const lattice = `url('data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='132' height='132' viewBox='0 0 100 100' fill='none' stroke='#A9D9C0' stroke-width='1.5' opacity='.2'><rect x='25' y='25' width='50' height='50'/><rect x='25' y='25' width='50' height='50' transform='rotate(45 50 50)'/><path d='M50 0v14.6M50 85.4V100M0 50h14.6M85.4 50H100'/></svg>").replace(/'/g, '%27')}')`;
const FONT = [400, 500, 700, 900].map(w => `@font-face{font-family:'Satoshi';font-weight:${w};src:url('${url(path.join(ROOT, 'src/fonts/satoshi-' + w + '.woff2'))}') format('woff2')}`).join('');

const page = (tag, title, points, body) => `<!doctype html><meta charset="utf-8"><style>${FONT}
*{box-sizing:border-box;margin:0}html,body{width:1600px;height:1200px;overflow:hidden}
body{font-family:'Satoshi',sans-serif;background:#0F2E20;color:#fff;position:relative}
.g{position:absolute;border-radius:50%;filter:blur(130px)}
.pat{position:absolute;inset:0;background:${lattice};-webkit-mask-image:linear-gradient(160deg,#000,transparent 60%)}
.tag{position:absolute;left:90px;top:84px;font-size:30px;font-weight:700;background:#F2B705;color:#111;border-radius:99px;padding:13px 28px}
h1{position:absolute;left:90px;right:90px;top:180px;font-weight:900;font-size:112px;line-height:.98;letter-spacing:-.05em}
ul{position:absolute;left:90px;right:90px;top:440px;display:flex;gap:16px;list-style:none;padding:0}
li{font-size:31px;font-weight:700;color:#DFF3E8;border:2px solid rgba(169,217,192,.5);border-radius:99px;padding:12px 26px;background:rgba(15,46,32,.5)}
.shot{position:absolute;left:90px;right:90px;top:560px;height:760px;border-radius:30px 30px 0 0;overflow:hidden;box-shadow:0 60px 110px -40px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.22);background:#F7F5EF}
.shot img{display:block;width:100%;height:100%;object-fit:cover;object-position:left top}
.pair{position:absolute;left:90px;right:90px;top:560px;display:grid;grid-template-columns:1fr 1fr;gap:28px}
.pair img{display:block;width:100%;height:560px;object-fit:cover;object-position:center bottom;border-radius:26px;box-shadow:0 40px 70px -40px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.2)}
</style><body><i class="g" style="width:960px;height:960px;left:-320px;top:-420px;background:rgba(47,163,107,.75)"></i><i class="g" style="width:700px;height:700px;right:-240px;bottom:-320px;background:rgba(242,183,5,.4)"></i><div class="pat"></div>
<div class="tag">${tag}</div><h1>${title}</h1><ul>${points.map(p => `<li>${p}</li>`).join('')}</ul>${body}`;

const shot = p => `<div class="shot"><img src="${url(p)}"></div>`;
const covers = {
  'woocommerce-checkout-fix': ['WooCommerce', 'Checkout broken? Found, fixed, tested.', ['Root cause first', 'Backup before any change', 'Test order at handover'], shot(path.join(ROOT, 'linkedin-post/_shot-checkout.png'))],
  'wordpress-speed-pass': ['WordPress speed', 'A faster site, with the numbers to prove it.', ['Core Web Vitals', 'Before and after report', 'No layout breakage'], shot(path.join(OUT, '_shot-speed.png'))],
  'figma-to-elementor': ['Figma or PSD to WordPress', 'Your design, built so your team can edit it.', ['Elementor Pro', 'Responsive on every screen', 'Matches the design'], `<div class="pair">${['fastdocnow', 'al-emirates-tours'].map(s => `<img src="${img('assets/img/mockups/' + s + '-card.jpg')}">`).join('')}</div>`],
};

(async () => {
  for (const [name, c] of Object.entries(covers)) {
    const html = path.join(TMP, 'p.html'), png = path.join(TMP, 'p.png');
    fs.writeFileSync(html, page(...c));
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--allow-file-access-from-files', '--user-data-dir=' + path.join(TMP, 'profile'), '--window-size=1600,1200', '--virtual-time-budget=4000', '--screenshot=' + png, url(html)], { stdio: 'ignore' });
    await sharp(png).extract({ left: 0, top: 0, width: 1600, height: 1200 }).jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(OUT, name + '.jpg'));
    process.stdout.write('.');
  }
  fs.rmSync(TMP, { recursive: true, force: true });
  console.log('\ncatalog covers done');
})().catch(e => { console.error(e); process.exit(1); });
