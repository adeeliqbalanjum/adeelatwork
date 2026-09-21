// Renders the square graphics for a social post about the portfolio. usage: node tools/post-graphics.js
// Reads the screenshots in ./linkedin-post (_shot-*.png) and the project mockups, writes linkedin-post/1..4.jpg at 1200x1200.
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const sharp = require('sharp');
const C = require('../content');
const ROOT = path.resolve(__dirname, '..'), OUT = path.join(ROOT, 'linkedin-post');
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(fs.existsSync);
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'aw-post-'));
const url = p => 'file:///' + p.replace(/\\/g, '/').replace(/ /g, '%20');
const img = rel => url(path.join(ROOT, rel));
const lattice = `url('data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='132' height='132' viewBox='0 0 100 100' fill='none' stroke='#E9C6EA' stroke-width='1.5' opacity='.2'><rect x='25' y='25' width='50' height='50'/><rect x='25' y='25' width='50' height='50' transform='rotate(45 50 50)'/><path d='M50 0v14.6M50 85.4V100M0 50h14.6M85.4 50H100'/></svg>").replace(/'/g, '%27')}')`;
const FONT = [400, 500, 700, 900].map(w => `@font-face{font-family:'Satoshi';font-weight:${w};src:url('${url(path.join(ROOT, 'src/fonts/satoshi-' + w + '.woff2'))}') format('woff2')}`).join('');

const page = (kicker, title, body) => `<!doctype html><meta charset="utf-8"><style>${FONT}
*{box-sizing:border-box;margin:0}html,body{width:1200px;height:1200px;overflow:hidden}
body{font-family:'Satoshi',sans-serif;background:#44194A;color:#fff;position:relative}
.g{position:absolute;border-radius:50%;filter:blur(110px)}
.pat{position:absolute;inset:0;background:${lattice};-webkit-mask-image:linear-gradient(160deg,#000,transparent 65%)}
.top{position:absolute;left:70px;right:70px;top:62px;display:flex;align-items:center;justify-content:space-between;font-weight:900;font-size:30px;letter-spacing:-.03em}
.top div{display:flex;align-items:center;gap:16px} .top img{width:60px;height:60px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.7)}
.top span{font-size:21px;font-weight:700;letter-spacing:0;background:#75FF42;color:#111;border-radius:99px;padding:10px 20px}
.k{position:absolute;left:70px;top:176px;font-size:25px;font-weight:700;color:#F8A3F6}
h1{position:absolute;left:70px;right:70px;top:216px;font-weight:900;font-size:74px;line-height:1;letter-spacing:-.05em}
.shot{position:absolute;left:70px;right:70px;border-radius:26px;overflow:hidden;box-shadow:0 60px 110px -40px rgba(0,0,0,.75),0 0 0 1px rgba(255,255,255,.2);background:#F7F5EF}
.shot img{display:block;width:100%;height:100%;object-fit:cover;object-position:left top}
.grid{position:absolute;left:70px;right:70px;display:grid;grid-template-columns:1fr 1fr;gap:20px}
.grid img{display:block;width:100%;height:322px;object-fit:cover;border-radius:20px;box-shadow:0 40px 70px -40px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.18)}
.foot{position:absolute;left:70px;right:70px;bottom:54px;display:flex;justify-content:space-between;font-size:23px;font-weight:500;color:#D9BBDA} .foot b{color:#fff;font-weight:700}
</style><body><i class="g" style="width:760px;height:760px;left:-260px;top:-320px;background:rgba(243,88,238,.75)"></i><i class="g" style="width:560px;height:560px;right:-200px;bottom:-260px;background:rgba(117,255,66,.42)"></i><i class="g" style="width:44%;height:62%;left:40%;top:16%;background:rgba(215,129,9,.36)"></i><div class="pat"></div>
<div class="top"><div><img src="${img('assets/img/adeel-face.jpg')}">${C.site.brand}</div><span>${kicker}</span></div>${title}${body}
<div class="foot"><span>WordPress and WooCommerce developer, Lahore</span><b>adeeliqbalanjum.github.io/adeelatwork</b></div>`;

const slides = [
  ['New portfolio', '<h1 style="top:176px">My new portfolio is live.</h1>', `<div class="shot" style="top:372px;height:700px"><img src="${url(path.join(OUT, '_shot-hero.png'))}"></div>`],
  ['Scroll demos', '<h1 style="top:176px">Scroll, and watch the checkout get fixed.</h1>', `<div class="shot" style="top:452px;height:596px"><img src="${url(path.join(OUT, '_shot-checkout.png'))}"></div>`],
  ['Scroll demos', '<h1 style="top:176px">The form says sent. Nothing ever arrives.</h1>', `<div class="shot" style="top:452px;height:596px"><img src="${url(path.join(OUT, '_shot-mail.png'))}"></div>`],
  ['The work', `<h1 style="top:176px">${C.order.length} client projects. Each one says what it solved.</h1>`, `<div class="grid" style="top:426px">${['rockbusto-fleet', 'desert-safari-dubai', 'fastdocnow', 'al-emirates-tours'].map(s => `<img src="${img('assets/img/mockups/' + s + '-card.jpg')}">`).join('')}</div>`],
];

(async () => {
  for (let i = 0; i < slides.length; i++) {
    const html = path.join(TMP, 'p.html'), png = path.join(TMP, 'p.png');
    fs.writeFileSync(html, page(...slides[i]));
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--allow-file-access-from-files', '--user-data-dir=' + path.join(TMP, 'profile'), '--window-size=1200,1200', '--virtual-time-budget=4000', '--screenshot=' + png, url(html)], { stdio: 'ignore' });
    await sharp(png).extract({ left: 0, top: 0, width: 1200, height: 1200 }).jpeg({ quality: 90, mozjpeg: true }).toFile(path.join(OUT, (i + 1) + '.jpg'));
    process.stdout.write('.');
  }
  fs.rmSync(TMP, { recursive: true, force: true });
  console.log('\npost graphics done');
})().catch(e => { console.error(e); process.exit(1); });
