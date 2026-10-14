// V4 share images (1200x630) for every page, in the V4 look: paper ground, Inter, black headline with a grey tail,
// Electric Blue accent, the head-to-shoulders photo as the mark and the real project mockup on the right.
// usage: node tools/og-v4.js [key]        (keys: home, portfolio, services, contact, demos, cv, service-<slug>, case-<slug>)
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process');
const sharp = require('sharp');
const C = require('../content');
const ROOT = path.resolve(__dirname, '..');
const CHROME = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'].find(fs.existsSync);
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'aw-og4-'));
const fileUrl = p => 'file:///' + p.replace(/\\/g, '/').replace(/ /g, '%20');
const IMG = rel => path.join(ROOT, 'assets/img', rel + '.jpg');
const has = rel => fs.existsSync(IMG(rel));
const src = rel => fileUrl(IMG(rel));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

const T = { ground: '#F5F5F2', paper: '#fff', ink: '#0A0A0A', soft: '#5F5F5B', mute: '#8C8C88', line: '#E2E2DE', blue: '#3B82F6', green: '#22C55E' };
const FONT = `<style>@font-face{font-family:'Inter';font-weight:100 900;src:url('${fileUrl(path.join(ROOT, 'src/fonts/inter-var.woff2'))}') format('woff2')}
@font-face{font-family:'Instrument Serif';font-style:italic;src:url('${fileUrl(path.join(ROOT, 'src/fonts/instrument-serif-italic.woff2'))}') format('woff2')}</style>`;

async function shoot(html, w, h, outFile, quality) {
  const page = path.join(TMP, 'p.html'), png = path.join(TMP, 'p.png');
  fs.writeFileSync(page, html);
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--allow-file-access-from-files', '--user-data-dir=' + path.join(TMP, 'profile'), '--window-size=' + w + ',' + h, '--virtual-time-budget=4000', '--screenshot=' + png, fileUrl(page)], { stdio: 'ignore' });
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  await sharp(png).extract({ left: 0, top: 0, width: w, height: h }).jpeg({ quality: quality || 86, mozjpeg: true }).toFile(outFile);
}

// headline = [black part, grey part]
function card(key, kicker, headline, chip, rel, dark, shotHtml) {
  const [a, b] = headline;
  const len = (a + ' ' + b).length;
  const size = len > 70 ? 42 : len > 52 ? 47 : len > 36 ? 54 : 62;
  const bg = dark ? T.ink : T.ground, fg = dark ? '#fff' : T.ink, grey = dark ? '#8C8C88' : '#9A9A96', sub = dark ? '#A3A3A3' : T.soft;
  const dots = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28'><circle cx='1.5' cy='1.5' r='1.5' fill='${dark ? '#2A2A2A' : '#D6D6D1'}'/></svg>`)}")`;
  return `<!doctype html><meta charset="utf-8">${FONT}<style>
*{box-sizing:border-box;margin:0}html,body{width:1200px;height:630px;overflow:hidden}
body{font-family:'Inter',sans-serif;background:${bg};color:${fg};position:relative;-webkit-font-smoothing:antialiased}
.dots{position:absolute;inset:0;background:${dots};-webkit-mask-image:radial-gradient(ellipse 70% 70% at 70% 50%,#000 20%,transparent 75%)}
.glow{position:absolute;border-radius:50%;filter:blur(110px)}
.mark{position:absolute;left:64px;top:52px;display:flex;align-items:center;gap:16px}
.mark img{width:56px;height:56px;border-radius:17px;object-fit:cover;box-shadow:0 2px 6px rgba(0,0,0,.08)}
.mark b{font-size:22px;font-weight:600;letter-spacing:-.02em;display:block}.mark small{font-size:15px;color:${sub};font-weight:500;display:block;margin-top:2px}
.dot{position:absolute;left:104px;top:46px;width:14px;height:14px;border-radius:50%;background:${T.blue};border:3px solid ${bg}}
.kick{position:absolute;left:64px;top:170px;width:540px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:'Instrument Serif',serif;font-style:italic;font-size:26px;color:${sub};display:flex;align-items:center;gap:14px}
.kick i{width:36px;height:1.5px;background:${dark ? '#3A3A3A' : '#C9C9C4'}}
.h{position:absolute;left:64px;top:218px;width:540px;font-size:${size}px;font-weight:600;letter-spacing:-.045em;line-height:1.02}.h span{color:${grey}}
.foot{position:absolute;left:64px;bottom:54px;display:flex;align-items:center;gap:16px}
.chip{display:inline-flex;align-items:center;gap:10px;background:${T.blue};color:#fff;font-weight:600;font-size:19px;padding:13px 24px;border-radius:999px;box-shadow:0 12px 30px -10px rgba(59,130,246,.6)}
.chip i{width:9px;height:9px;border-radius:50%;background:#fff;opacity:.9}
.tag{font-size:18px;font-weight:500;color:${sub}}
.shot{position:absolute;right:48px;top:112px;width:500px;height:404px;border-radius:28px;overflow:hidden;background:${dark ? '#161616' : '#fff'};box-shadow:0 2px 6px rgba(0,0,0,.06),0 44px 80px -24px rgba(0,0,0,${dark ? '.7' : '.28'}),0 0 0 1px ${dark ? 'rgba(255,255,255,.14)' : 'rgba(10,10,10,.08)'}}
.shot>img{width:100%;height:100%;object-fit:cover;object-position:${rel.startsWith('mockups/') ? 'center' : 'left top'}}
.bw{position:absolute;left:28px;top:34px;width:430px;height:330px;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 30px 60px -20px rgba(0,0,0,.45),0 0 0 1px rgba(0,0,0,.08)}
.bw .bar{height:26px;background:#F1F1EE;display:flex;align-items:center;gap:6px;padding:0 10px;border-bottom:1px solid #E2E2DE}.bw .bar i{width:7px;height:7px;border-radius:50%;background:#D6D6D1}.bw .bar span{margin-left:8px;height:14px;width:200px;border-radius:7px;background:#fff;border:1px solid #E2E2DE;font-size:9px;color:#8C8C88;line-height:12px;padding:0 8px;overflow:hidden;white-space:nowrap}
.bw img{width:100%;height:304px;object-fit:cover;object-position:top}
.ph{position:absolute;right:26px;bottom:22px;width:118px;height:244px;border-radius:22px;background:#0A0A0A;padding:5px;box-shadow:0 30px 50px -16px rgba(0,0,0,.55)}.ph img{width:100%;height:100%;object-fit:cover;object-position:top;border-radius:17px;display:block}.ph i{position:absolute;left:50%;top:9px;width:34px;height:5px;margin-left:-17px;border-radius:3px;background:#0A0A0A;z-index:2}
.url{position:absolute;right:52px;top:536px;width:520px;text-align:center;font-size:15px;color:${T.mute};font-weight:500;letter-spacing:.01em}
</style><body>
<div class="dots"></div>
<i class="glow" style="width:560px;height:560px;right:-120px;top:-220px;background:rgba(59,130,246,${dark ? '.28' : '.22'})"></i>
<i class="glow" style="width:380px;height:380px;left:-160px;bottom:-200px;background:rgba(59,130,246,${dark ? '.14' : '.10'})"></i>
<div class="mark"><img src="${src('adeel-head')}"><span><b>Muhammad Adeel</b><small>WordPress &amp; WooCommerce developer</small></span></div><i class="dot"></i>
<div class="kick"><i></i>${esc(kicker)}</div>
<div class="h">${esc(a)} <span>${esc(b)}</span></div>
<div class="foot"><span class="chip"><i></i>${esc(chip)}</span><span class="tag">WordPress · WooCommerce · Elementor Pro</span></div>
<div class="shot">${shotHtml}</div>
<div class="url">adeeliqbalanjum.github.io/adeelatwork</div>`;
}

// Projects with no screenshots get a designed tile in the V4 look (500x404 area inside the white card).
const SPECIAL = {
  '7sky-consultant': () => `<div style="position:absolute;inset:0;background:#0A0A0A;color:#fff;display:flex;flex-direction:column;justify-content:center;padding:0 44px">
    <i style="position:absolute;right:-120px;top:-140px;width:360px;height:360px;border-radius:50%;background:rgba(59,130,246,.45);filter:blur(80px)"></i>
    <div style="font-family:'Instrument Serif',serif;font-style:italic;font-size:20px;color:#A3A3A3">Education consultancy</div>
    <div style="font-size:64px;font-weight:600;letter-spacing:-.045em;line-height:1;margin-top:10px">7 Sky<br>Consultant</div>
    <div style="margin-top:22px;display:flex;gap:8px;flex-wrap:wrap">${['Study abroad', 'Lahore, Pakistan', 'WordPress'].map(t => `<span style="font-size:13px;font-weight:500;padding:6px 12px;border-radius:999px;border:1px solid #2A2A2A;color:#A3A3A3">${t}</span>`).join('')}</div></div>`,
  'biodynamic-breathwork': () => {
    const dots = [[70, 60, 24, 26], [200, 40, 41, 30], [300, 90, 19, 22], [120, 170, 12, 20], [250, 150, 9, 18], [330, 200, 31, 28], [50, 230, 8, 16]];
    return `<div style="position:absolute;inset:0;background:#F5F5F2">
    <div style="position:absolute;left:22px;top:22px;width:300px;height:360px;border-radius:18px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,.05),0 18px 40px -6px rgba(0,0,0,.08);overflow:hidden">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 16px;font-weight:600;font-size:14px">Find a practitioner<span style="background:#3B82F6;color:#fff;border-radius:99px;padding:4px 10px;font-size:11px">173 profiles</span></div>
      <div style="position:absolute;inset:50px 12px 12px;border-radius:12px;background:#E8F0FE;overflow:hidden">${dots.map(([x, y, n, r]) => `<div style="position:absolute;left:${x - r}px;top:${y - r}px;width:${r * 2}px;height:${r * 2}px;border-radius:50%;background:rgba(59,130,246,.16)"></div><div style="position:absolute;left:${x - 14}px;top:${y - 14}px;width:28px;height:28px;border-radius:50%;background:#3B82F6;border:3px solid #fff;display:grid;place-items:center;font-weight:700;font-size:11px;color:#fff">${n}</div>`).join('')}</div></div>
    ${[['173', 'profiles, each a record with photo, city and coordinates', 22], ['Leaflet', 'map drawn from the same records', 150], ['ACF', 'editors add a practitioner, no layout work', 278]].map(([n, t, y]) => `<div style="position:absolute;left:338px;top:${y}px;width:140px;height:104px;border-radius:16px;background:#fff;padding:14px;box-shadow:0 2px 6px rgba(0,0,0,.05),0 18px 40px -6px rgba(0,0,0,.08)"><div style="font-size:${n.length > 4 ? 22 : 30}px;font-weight:600;letter-spacing:-.04em;color:#3B82F6">${n}</div><div style="margin-top:6px;font-size:11px;line-height:1.35;color:#5F5F5B">${t}</div></div>`).join('')}</div>`;
  }
};

async function main() {
  const projects = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/projects.json'), 'utf8'));
  const mock = slug => has('mockups/' + slug + '-card') ? 'mockups/' + slug + '-card' : 'mockups/' + slug;
  const split = (h1) => { // break a case/service h1 into a black lead and a grey tail at the first comma or "that/and/with"
    const m = h1.match(/^(.{12,}?)(,| that | and | with | so )(.*)$/);
    if (!m) return [h1, ''];
    return [m[1] + (m[2] === ',' ? ',' : ''), (m[2] === ',' ? '' : m[2].trim() + ' ') + m[3]];
  };
  const items = [
    ['home', 'For businesses and agencies', ['WordPress sites that bring in business,', 'and stay fixed.'], 'Free first look, same day', mock('rockbusto-fleet')],
    ['portfolio', 'Work · ' + C.order.length + ' client projects', ['Every site here is real.', 'Open any of them.'], 'Case studies with real numbers', mock('desert-safari-dubai')],
    ['services', 'Services and prices', ['Pick what you need.', 'See the price before you commit.'], 'Fixes from $150', mock('hercules-roof-system')],
    ['contact', 'Contact', ['Say hi.', 'Tell me what the site needs to do.'], 'Replies the same day', mock('fastdocnow')],
    ['demos', 'Live demos', ['Watch WordPress problems get fixed,', 'and a design get built.'], 'Free first look', mock('desert-safari-dubai')],
    ['cv', 'CV · WordPress and WooCommerce developer', ['Muhammad Adeel Iqbal.', '21 client projects across 5 countries.'], 'Open to projects', mock('al-emirates-tours')],
  ].concat(C.services.map(s => ['service-' + s.slug, s.nav === 'Partner' ? 'For agencies' : s.nav === 'Fix' ? 'WooCommerce and WordPress fixes' : 'Website builds', split(s.h1), s.nav === 'Fix' ? 'Fix from $150' : s.nav === 'Build' ? 'Sites $300 to $500' : 'White-label, $25 an hour', s.image]))
    .concat(C.order.map(slug => { const p = projects.find(x => x.slug === slug), o = C.overrides[slug] || {}; return ['case-' + slug, 'Case study · ' + p.name, split(o.h1 || p.h1 || p.tagline || p.name), 'Read the case study', mock(slug)]; }));
  const only = process.argv[2];
  let n = 0;
  for (const [key, kicker, headline, chip, rel] of items) {
    if (only && only !== key) continue;
    if (!has(rel)) { console.log('\nmissing image for', key, rel); continue; }
    const slug = rel.replace(/^(mockups|inner|shots)\//, '').replace(/-card$/, ''), p = projects.find(x => x.slug === slug), desk = rel.startsWith('inner/') ? rel : 'shots/' + slug;
    const shotHtml = SPECIAL[slug] ? SPECIAL[slug]() : has(desk) ? `<div class="bw"><div class="bar"><i></i><i></i><i></i><span>${esc(p && p.url ? p.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : slug)}</span></div><img src="${src(desk)}"></div>${has('mobile/' + slug) ? `<div class="ph"><i></i><img src="${src('mobile/' + slug)}"></div>` : ''}` : `<img src="${src(rel)}">`;
    await shoot(card(key, kicker, headline, chip, rel, key === 'contact' || key === 'cv', shotHtml), 1200, 630, path.join(ROOT, 'assets/og', key + '.jpg'), 84);
    process.stdout.write('.'); n++;
  }
  console.log('\nog v4 done:', n, 'of', items.length);
}
main().then(() => fs.rmSync(TMP, { recursive: true, force: true })).catch(e => { console.error(e); process.exit(1); });
