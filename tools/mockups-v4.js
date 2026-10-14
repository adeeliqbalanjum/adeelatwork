// V4 project mockups: every assets/img/mockups/*.jpg re-rendered in the V4 look (paper or graphite ground, dot grid,
// Electric Blue glow, white browser frame, black phone). Card 1400x1050 (slug-card.jpg) and cover 1400x780 (slug.jpg).
// usage: node tools/mockups-v4.js [slug]
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const sharp = require('sharp');
const C = require('../content');
const ROOT = path.resolve(__dirname, '..');
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(fs.existsSync);
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'aw-mk4-'));
const fileUrl = p => 'file:///' + p.replace(/\\/g, '/').replace(/ /g, '%20');
const IMG = rel => path.join(ROOT, 'assets/img', rel + '.jpg');
const has = rel => fs.existsSync(IMG(rel));
const src = rel => fileUrl(IMG(rel));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const FONT = `<style>@font-face{font-family:'Inter';font-weight:100 900;src:url('${fileUrl(path.join(ROOT, 'src/fonts/inter-var.woff2'))}') format('woff2')}
@font-face{font-family:'Instrument Serif';font-style:italic;src:url('${fileUrl(path.join(ROOT, 'src/fonts/instrument-serif-italic.woff2'))}') format('woff2')}</style>`;

async function shoot(html, w, h, outFile) {
  const page = path.join(TMP, 'p.html'), png = path.join(TMP, 'p.png');
  fs.writeFileSync(page, html);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--allow-file-access-from-files', '--user-data-dir=' + path.join(TMP, 'profile'), '--window-size=' + w + ',' + h, '--virtual-time-budget=4000', '--screenshot=' + png, fileUrl(page)], { stdio: 'ignore' });
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  await sharp(png).extract({ left: 0, top: 0, width: w, height: h }).jpeg({ quality: 86, mozjpeg: true }).toFile(outFile);
}

// two grounds only, like the site: paper and graphite
const GROUNDS = {
  paper: { bg: '#F5F5F2', dot: '#D6D6D1', glow: 'rgba(59,130,246,.26)', glow2: 'rgba(59,130,246,.12)', ring: 'rgba(10,10,10,.08)', shadow: 'rgba(0,0,0,.28)' },
  dark: { bg: '#0F0F0F', dot: '#262626', glow: 'rgba(59,130,246,.42)', glow2: 'rgba(59,130,246,.16)', ring: 'rgba(255,255,255,.14)', shadow: 'rgba(0,0,0,.7)' },
};
const stage = (w, h, g, inner) => `<!doctype html><meta charset="utf-8">${FONT}<style>
*{box-sizing:border-box;margin:0}html,body{width:${w}px;height:${h}px;overflow:hidden}
body{position:relative;font-family:Inter,sans-serif;background:${g.bg};-webkit-font-smoothing:antialiased}
.dots{position:absolute;inset:0;background:url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><circle cx='1.5' cy='1.5' r='1.5' fill='${g.dot}'/></svg>`)}");-webkit-mask-image:radial-gradient(ellipse 70% 70% at 50% 50%,#000 30%,transparent 80%)}
.glow{position:absolute;border-radius:50%;filter:blur(120px)}
.bw{position:absolute;border-radius:18px;overflow:hidden;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.06),0 60px 110px -40px ${g.shadow},0 0 0 1px ${g.ring}}
.bar{height:44px;background:#F1F1EE;display:flex;align-items:center;gap:8px;padding:0 18px;border-bottom:1px solid #E2E2DE}
.bar i{width:11px;height:11px;border-radius:50%;background:#D6D6D1}
.bar span{margin-left:14px;height:26px;padding:0 16px;border-radius:99px;background:#fff;border:1px solid #E2E2DE;display:flex;align-items:center;font-size:13.5px;font-weight:500;color:#5F5F5B}
.bw img{display:block;width:100%;object-fit:cover;object-position:top}
.ph{position:absolute;border-radius:42px;overflow:hidden;background:#0A0A0A;border:9px solid #0A0A0A;box-shadow:0 60px 100px -40px ${g.shadow},0 0 0 1px ${g.ring}}
.ph img{display:block;width:100%;height:100%;object-fit:cover;object-position:top;border-radius:32px}
.ph:after{content:"";position:absolute;left:50%;top:9px;width:74px;height:20px;margin-left:-37px;border-radius:99px;background:#0A0A0A}
.in{position:absolute;border-radius:16px;overflow:hidden;background:#fff;border:6px solid #fff;box-shadow:0 50px 90px -40px ${g.shadow},0 0 0 1px ${g.ring}}
.in img{display:block;width:100%;height:100%;object-fit:cover;object-position:top;border-radius:10px}
</style><body><div class="dots"></div>
<i class="glow" style="width:${w * .55}px;height:${w * .55}px;right:${-w * .12}px;top:${-w * .22}px;background:${g.glow}"></i>
<i class="glow" style="width:${w * .4}px;height:${w * .4}px;left:${-w * .14}px;bottom:${-w * .2}px;background:${g.glow2}"></i>
${inner}`;
const browser = (rel, domain, x, y, w, imgH) => `<div class="bw" style="left:${x}px;top:${y}px;width:${w}px"><div class="bar"><i></i><i></i><i></i><span>${esc(domain)}</span></div><img src="${src(rel)}" style="height:${imgH}px"></div>`;
const phone = (rel, x, y, w, h) => `<div class="ph" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"><img src="${src(rel)}"></div>`;

// designed tiles for the two projects without screenshots
const sevenSky = (w, h) => `<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;color:#fff;gap:22px">
  <div style="font-family:'Instrument Serif',serif;font-style:italic;font-size:${w * .028}px;color:#A3A3A3">Education consultancy · Lahore</div>
  <div style="font-size:${w * .11}px;font-weight:600;letter-spacing:-.045em;line-height:.98">7 Sky<br>Consultant</div>
  <div style="display:flex;gap:10px;margin-top:8px">${['Study abroad', 'WordPress', 'Elementor Pro'].map(t => `<span style="font-size:${w * .017}px;font-weight:500;padding:10px 18px;border-radius:999px;border:1px solid #2A2A2A;color:#A3A3A3">${t}</span>`).join('')}</div></div>`;
const biodynamic = (w, h) => {
  const s = w / 1400, dots = [[150, 190, 24, 78], [420, 150, 41, 96], [640, 250, 19, 70], [260, 430, 12, 62], [520, 400, 9, 56], [720, 470, 31, 84], [110, 520, 8, 50]];
  const H = h - 240 * s, cardH = Math.min(246 * s, (H - 40 * s) / 3);
  return `<div class="in" style="left:${90 * s}px;top:${120 * s}px;width:${860 * s}px;height:${H}px;border-width:0;border-radius:26px;background:#fff">
  <div style="display:flex;justify-content:space-between;align-items:center;padding:${26 * s}px ${30 * s}px;font-weight:600;font-size:${22 * s}px;letter-spacing:-.02em">Find a practitioner<span style="background:#3B82F6;color:#fff;border-radius:99px;padding:${8 * s}px ${18 * s}px;font-size:${16 * s}px">173 profiles</span></div>
  <div style="position:absolute;inset:${88 * s}px ${22 * s}px ${22 * s}px;border-radius:18px;background:#E8F0FE;overflow:hidden">
  ${dots.map(([x, y, n, r]) => `<div style="position:absolute;left:${(x - r) * s}px;top:${(y - r) * s * .8}px;width:${r * 2 * s}px;height:${r * 2 * s}px;border-radius:50%;background:rgba(59,130,246,.16)"></div><div style="position:absolute;left:${(x - 24) * s}px;top:${(y - 24) * s * .8}px;width:${48 * s}px;height:${48 * s}px;border-radius:50%;background:#3B82F6;border:4px solid #fff;display:grid;place-items:center;font-weight:600;font-size:${17 * s}px;color:#fff">${n}</div>`).join('')}
  <div style="position:absolute;right:${22 * s}px;bottom:${22 * s}px;background:#fff;border-radius:16px;padding:${16 * s}px ${20 * s}px;display:flex;gap:14px;align-items:center;box-shadow:0 20px 40px -20px rgba(0,0,0,.3)"><i style="width:${44 * s}px;height:${44 * s}px;border-radius:50%;background:linear-gradient(135deg,#BFDBFE,#3B82F6)"></i><div style="font-weight:600;font-size:${17 * s}px">Certified practitioner<div style="font-weight:500;font-size:${14 * s}px;color:#5F5F5B">City, country, profile page</div></div></div></div></div>
  ${[['173', 'practitioner profiles, each one a record with photo, city and coordinates'], ['Leaflet', 'map drawn from those same records, listing alongside'], ['ACF', 'custom post type and fields, so editors add a practitioner without touching a layout']].map(([n, t], i) => `<div style="position:absolute;left:${990 * s}px;top:${120 * s + i * (cardH + 20 * s)}px;width:${320 * s}px;height:${cardH}px;border-radius:26px;background:#fff;padding:${26 * s}px ${28 * s}px;box-shadow:0 2px 6px rgba(0,0,0,.05),0 50px 90px -50px rgba(0,0,0,.5);overflow:hidden"><div style="font-size:${(n.length > 5 ? 46 : 58) * s}px;font-weight:600;letter-spacing:-.04em;color:#3B82F6;line-height:1">${n}</div><div style="margin-top:${12 * s}px;font-size:${17 * s}px;line-height:1.4;font-weight:500;color:#5F5F5B">${t}</div></div>`).join('')}`;
};

async function main() {
  const projects = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/projects.json'), 'utf8'));
  const only = process.argv[2];
  const out = n => path.join(ROOT, 'assets/img/mockups', n + '.jpg');
  let dark = 0, n = 0;
  for (const slug of C.order) {
    if (only && only !== slug) continue;
    const p = projects.find(x => x.slug === slug), shot = 'shots/' + slug, mob = 'mobile/' + slug, inner = 'inner/' + slug;
    const domain = (p.url || slug).replace(/^https?:\/\/(www\.)?/, '').replace(/\/.*$/, '');
    if (slug === 'biodynamic-breathwork') {
      await shoot(stage(1400, 1050, GROUNDS.paper, biodynamic(1400, 1050)), 1400, 1050, out(slug));
      await shoot(stage(1400, 1050, GROUNDS.paper, biodynamic(1400, 1050)), 1400, 1050, out(slug + '-card'));
      process.stdout.write('b'); n++; continue;
    }
    if (!has(shot)) {
      await shoot(stage(1400, 1050, GROUNDS.dark, sevenSky(1400, 1050)), 1400, 1050, out(slug + '-card'));
      process.stdout.write('n'); n++; continue;
    }
    // bright screenshots sit on graphite, dark ones on paper; never more than two darks in a row so the grids stay varied
    const { dominant: d } = await sharp(IMG(shot)).resize(64).stats();
    const lum = (0.299 * d.r + 0.587 * d.g + 0.114 * d.b);
    let g = lum > 150 ? 'dark' : 'paper';
    if (g === 'dark' && dark >= 2) g = 'paper';
    dark = g === 'dark' ? dark + 1 : 0;
    const G = GROUNDS[g];
    const card = has(mob)
      ? browser(shot, domain, 96, 150, 1010, 640) + phone(mob, 1006, 330, 286, 590)
      : browser(shot, domain, 160, 150, 1080, 690);
    await shoot(stage(1400, 1050, G, card), 1400, 1050, out(slug + '-card'));
    const cover = browser(shot, domain, 80, 84, 900, 540)
      + (has(inner) ? `<div class="in" style="left:640px;top:${has(mob) ? 470 : 430}px;width:${has(mob) ? 420 : 640}px;height:${has(mob) ? 250 : 270}px"><img src="${src(inner)}"></div>` : '')
      + (has(mob) ? phone(mob, 1086, 96, 250, 520) : '');
    await shoot(stage(1400, 780, G, cover), 1400, 780, out(slug));
    process.stdout.write(g === 'dark' ? 'D' : '.'); n++;
  }
  console.log('\nmockups v4 done:', n);
}
main().then(() => fs.rmSync(TMP, { recursive: true, force: true })).catch(e => { console.error(e); process.exit(1); });
