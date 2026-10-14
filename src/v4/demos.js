/* V4 demos page: the seven scenario timelines (ported from the old app.js), pinned and scrubbed with ScrollTrigger.
   Phones and reduced motion: nothing pins; phones play each scene once when it comes into view, reduced motion shows the end state. */
(function () {
  'use strict';
  if (document.body.getAttribute('data-page') !== 'demos') return;
  var g = window.gsap, ST = window.ScrollTrigger;
  if (!g) return;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches, mobile = matchMedia('(max-width: 900px)').matches;
  var lite = mobile || !ST;
  if (ST) g.registerPlugin(ST);
  var start = window.AWPreloader || Promise.resolve();
  var seen = function (els, cb, margin) {
    if (!els.length) return;
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); cb(e.target); } }); }, { rootMargin: margin || '0px 0px -14% 0px' });
    els.forEach(function (el) { io.observe(el); });
  };

  /* callouts: anything marked data-flag gets a pin that pops as the scan line reaches it, turns green at the fix, then leaves */
  var flags = function (tl, q, page, scanAt, fixAt) {
    q('[data-flag]').forEach(function (el, i) {
      var f = document.createElement('span'); f.className = 'flag' + (el.dataset.flagTone ? ' ' + el.dataset.flagTone : ''); f.textContent = el.dataset.flag; page.appendChild(f);
      var place = function () {
        var a = el.getBoundingClientRect(), b = page.getBoundingClientRect(), w = f.offsetWidth, x = a.left - b.left, y = a.top - b.top;
        var pos = el.dataset.flagPos === 'below' ? [x + a.width - w - 10, y + a.height - 9] : a.width < 90 ? [x, y + a.height + 5] : a.height < 40 ? [x + a.width - w, y - 20] : [x + a.width - w - 10, y + 9];
        f.style.left = Math.max(6, Math.min(b.width - w - 6, pos[0])) + 'px'; f.style.top = Math.max(4, Math.min(b.height - 30, pos[1])) + 'px';
        return y / (b.height || 1);
      };
      var rel = Math.max(0, Math.min(1, place()));
      addEventListener('load', place);
      tl.fromTo(f, { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.24, ease: 'back.out(2.4)' }, scanAt + 0.1 + rel)
        .to(f, { backgroundColor: '#16A34A', duration: 0.25 }, fixAt + i * 0.12)
        .to(f, { autoAlpha: 0, y: -10, duration: 0.3 }, fixAt + 0.6 + i * 0.12);
    });
  };
  var scanAndNotes = function (tl, q, page, at, o) {
    o = o || {}; var s = o.scanAt || 0, notes = q('.dnote'), scan = q('.scan');
    g.set(notes, { autoAlpha: 0, y: 34 });
    tl.to(scan, { opacity: 1, duration: 0.15 }, s)
      .fromTo(scan, { y: -120 }, { y: function () { return page.offsetHeight; }, duration: 1.1, ease: 'none' }, s)
      .to(scan, { opacity: 0, duration: 0.15 }, s + 0.95);
    notes.forEach(function (n, i) { tl.to(n, { autoAlpha: 1, y: 0, duration: 0.5 }, at[i]); });
    if (o.fixAt) flags(tl, q, page, s, o.fixAt);
  };
  var pointer = function (page) { var c = document.createElement('span'); c.className = 'fcur'; c.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6.4 1.7L9.5 19z"/></svg>'; page.appendChild(c); g.set(c, { autoAlpha: 0, x: 30, y: 30 }); return c; };
  var spot = function (page, el, fx, fy) { var a = el.getBoundingClientRect(), b = page.getBoundingClientRect(); return [a.left - b.left + a.width * (fx == null ? 0.5 : fx), a.top - b.top + a.height * (fy == null ? 0.6 : fy)]; };
  var go = function (tl, c, page, el, t, d, fx, fy) { return tl.to(c, { autoAlpha: 1, duration: 0.15 }, t).to(c, { x: function () { return spot(page, el, fx, fy)[0]; }, y: function () { return spot(page, el, fx, fy)[1]; }, duration: d || 0.55, ease: 'power2.inOut' }, t); };
  var click = function (tl, c, t) { return tl.to(c, { scale: 0.74, duration: 0.09, yoyo: true, repeat: 1 }, t); };
  var badge = function (el, steps) { return function (t) { var s = steps.find(function (x) { return t < x[0]; }); if (el.textContent !== s[1]) { el.textContent = s[1]; el.classList.toggle('mid', s[2] === 'mid'); el.classList.toggle('ok', s[2] === 'ok'); } }; };

  var demos = {
    checkout: function (pin, q) {
      var page = q('.bw-page')[0], notes = q('.dnote'), scan = q('.scan')[0], buy = q('.shop-btn')[0], btnT = q('.shop-btn .t')[0], sp = q('.shop-btn .sp')[0];
      var state = badge(q('.bw-state')[0], [[2.1, 'Broken'], [3.4, 'Fixing', 'mid'], [1e9, 'Fixed', 'ok']]);
      g.set(q('.shop-sum'), lite ? { rotation: 2.5, y: 26 } : { rotation: 3.5, x: 52, y: 84 });
      g.set(q('.dfld-two'), { x: lite ? -8 : -22, rotation: -1.6 });
      g.set(q('.dfld-two .dfld:last-child'), { y: lite ? 12 : 22 });
      g.set(q('.shop-nav span'), { y: function (i) { return [7, -5, 11, -8][i % 4]; } });
      g.set(q('.shop-ok'), { display: 'none', opacity: 0 });
      g.set(notes, { autoAlpha: 0, y: 34 });
      var paint = function (t) { state(t); var placed = t > 3.75, ready = t > 3.05; buy.classList.toggle('ok', placed); btnT.textContent = placed ? 'Order placed' : ready ? 'Place order' : 'Processing'; sp.style.display = ready ? 'none' : ''; };
      var c = pointer(page);
      var tl = g.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onUpdate: function () { paint(this.time()); } });
      tl.to(scan, { opacity: 1, duration: 0.15 })
        .fromTo(scan, { y: -120 }, { y: function () { return page.offsetHeight; }, duration: 1.1, ease: 'none' }, '<')
        .to(scan, { opacity: 0, duration: 0.15 }, '>-.15')
        .to(notes[0], { autoAlpha: 1, y: 0, duration: 0.5 }, 0.45)
        .to(q('.cache'), { scale: 1.3, duration: 0.25, yoyo: true, repeat: 3, transformOrigin: '100% 50%' }, 1.2)
        .to(notes[1], { autoAlpha: 1, y: 0, duration: 0.5 }, 1.3)
        .to(q('.shop-sum'), { rotation: 0, x: 0, y: 0, duration: 0.9, ease: 'back.out(1.4)' }, 2.2)
        .to(q('.dfld-two,.dfld-two .dfld:last-child,.shop-nav span'), { x: 0, y: 0, rotation: 0, duration: 0.8, ease: 'back.out(1.6)' }, 2.3)
        .to(q('.thumb .brk'), { opacity: 0, duration: 0.4 }, 2.5)
        .to(q('.shop-alert'), { height: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, opacity: 0, duration: 0.6 }, 2.5)
        .to(q('.cache'), { opacity: 0, scale: 0.6, duration: 0.4 }, 2.6)
        .to(notes[2], { autoAlpha: 1, y: 0, duration: 0.5 }, 2.5)
        .set(q('.shop-ok'), { display: 'block' }, 3.7)
        .to(q('.shop-ok'), { opacity: 1, duration: 0.4 }, 3.7)
        .fromTo(buy, { scale: 1 }, { scale: 0.97, duration: 0.12, yoyo: true, repeat: 1 }, 3.55)
        .to(notes[3], { autoAlpha: 1, y: 0, duration: 0.5 }, 3.7);
      flags(tl, q, page, 0, 2.3);
      go(tl, c, page, buy, 3.05, 0.45); click(tl, c, 3.52);
      tl.to(c, { autoAlpha: 0, duration: 0.3 }, 4.05).to({}, { duration: 0.4 });
      paint(0);
      return tl;
    },
    crash: function (pin, q) {
      var page = q('.bw-page')[0], plug = q('.plug.sus')[0], fixedT = plug.textContent;
      var state = badge(q('.bw-state')[0], [[1, 'Down'], [3.5, 'Tracing', 'mid'], [1e9, 'Back online', 'ok']]);
      var bits = q('.site-hero>*,.site-cards>div');
      g.set(q('.wsod'), { display: 'grid', clipPath: 'inset(0% 0% 0% 0%)' });
      g.set(q('.dlog'), { display: 'block', yPercent: 106 });
      g.set(q('.dlog p'), { autoAlpha: 0, x: -12 });
      g.set(q('.plugs'), { autoAlpha: 0 });
      g.set(q('.site-toast'), { autoAlpha: 0, y: 16 });
      g.set(bits, { autoAlpha: 0, y: 22 });
      var tl = g.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onUpdate: function () { var t = this.time(), fixed = t >= 2.75; state(t); if (plug.classList.contains('ok') !== fixed) { plug.classList.toggle('ok', fixed); plug.textContent = fixed ? fixedT : 'Booking Widget 3.2.0'; } } });
      scanAndNotes(tl, q, page, [0.45, 1.6, 2.6, 3.9], { fixAt: 3.3 });
      tl.to(q('.dlog'), { yPercent: 0, duration: 0.5, ease: 'power3.out' }, 1)
        .to(q('.dlog p'), { autoAlpha: 1, x: 0, duration: 0.25, stagger: 0.16 }, 1.3)
        .fromTo(q('.dlog .hit'), { scale: 1 }, { scale: 1.06, duration: 0.18, yoyo: true, repeat: 3, transformOrigin: '0 50%' }, 1.9)
        .to(q('.plugs'), { autoAlpha: 1, duration: 0.3 }, 2.2)
        .fromTo(plug, { scale: 1 }, { scale: 1.14, duration: 0.16, yoyo: true, repeat: 3 }, 2.35)
        .to(q('.dlog'), { yPercent: 106, duration: 0.5 }, 3.1)
        .to(q('.wsod'), { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.7, ease: 'power3.inOut' }, 3.3)
        .to(bits, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, 3.5)
        .to(q('.site-toast'), { autoAlpha: 1, y: 0, duration: 0.4 }, 4)
        .to({}, { duration: 0.5 });
      state(0); plug.classList.remove('ok'); plug.textContent = 'Booking Widget 3.2.0';
      return tl;
    },
    speed: function (pin, q) {
      var page = q('.bw-page')[0], gauge = q('.dgauge')[0], arc = q('.g-arc')[0], num = q('.g-n')[0], mb = q('.wf-mb')[0], req = q('.wf-req')[0];
      var state = badge(q('.bw-state')[0], [[2.2, 'Slow'], [3.6, 'Tuning', 'mid'], [1e9, 'Fast', 'ok']]);
      var tone = function (v, good, mid) { return v <= good ? '#16A34A' : v <= mid ? '#B45309' : '#DC2626'; };
      var vit = function (k) { var el = q('[data-v="' + k + '"]')[0]; return { el: el, em: $('em', el), dot: $('.v-bar i', el) }; };
      var V = { lcp: vit('lcp'), inp: vit('inp'), cls: vit('cls') };
      var o = { score: 39, lcp: 6.8, inp: 620, cls: 0.31, mb: 6.2, req: 148, x1: 85, x2: 74, x3: 66 };
      var render = function () {
        gauge.style.setProperty('--g', o.score >= 90 ? '#16A34A' : o.score >= 50 ? '#B45309' : '#DC2626');
        arc.style.strokeDashoffset = 100 - o.score; num.textContent = Math.round(o.score);
        V.lcp.em.textContent = o.lcp.toFixed(1) + ' s'; V.lcp.el.style.setProperty('--c', tone(o.lcp, 2.5, 4)); V.lcp.dot.style.setProperty('--x', o.x1 + '%');
        V.inp.em.textContent = Math.round(o.inp / 10) * 10 + ' ms'; V.inp.el.style.setProperty('--c', tone(o.inp, 200, 500)); V.inp.dot.style.setProperty('--x', o.x2 + '%');
        V.cls.em.textContent = o.cls.toFixed(2); V.cls.el.style.setProperty('--c', tone(o.cls, 0.1, 0.25)); V.cls.dot.style.setProperty('--x', o.x3 + '%');
        mb.textContent = o.mb.toFixed(1) + ' MB'; req.textContent = Math.round(o.req);
      };
      var rows = q('.wf-row'), hot = 'rgba(239,68,68,.12)', cold = 'rgba(239,68,68,0)';
      g.set(q('.sw .was'), { opacity: 1 }); g.set(q('.sw .now'), { opacity: 0 });
      g.set(q('.psi-pass'), { autoAlpha: 0, scale: 0.8 });
      g.set(rows, { backgroundColor: cold });
      var tl = g.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onUpdate: function () { render(); state(this.time()); } });
      scanAndNotes(tl, q, page, [0.45, 1.3, 2.5, 3.8], { fixAt: 2.4 });
      tl.to(rows[0], { backgroundColor: hot, duration: 0.3 }, 0.5)
        .to([rows[1], rows[2]], { backgroundColor: hot, duration: 0.3, stagger: 0.12 }, 1.2)
        .to(o, { score: 92, lcp: 1.9, inp: 140, cls: 0.04, mb: 1.1, req: 41, x1: 22, x2: 18, x3: 10, duration: 1.4, ease: 'power1.inOut' }, 2.2)
        .to(rows, { backgroundColor: cold, duration: 0.4 }, 2.3);
      rows.forEach(function (row, i) {
        var bar = $('.wf-bar i', row), w = bar.dataset.w.split(','), at = 2.25 + i * 0.14, end = row.dataset.end;
        tl.fromTo(bar, { width: w[0] + '%', marginLeft: '0%', backgroundColor: '#EF4444' }, { width: w[1] + '%', marginLeft: end === 'late' ? '78%' : '0%', backgroundColor: end === 'late' ? '#A3A3A3' : '#22C55E', duration: 0.9 }, at)
          .to($$('.was', row), { opacity: 0, duration: 0.25 }, at + 0.3).to($$('.now', row), { opacity: 1, duration: 0.25 }, at + 0.45);
        if (end === 'gone') tl.fromTo(row, { opacity: 1 }, { opacity: 0.5, duration: 0.4 }, at + 0.5);
      });
      tl.to(q('.psi-pass'), { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 3.8).to({}, { duration: 0.6 });
      render(); state(0);
      return tl;
    },
    mobile: function (pin, q) {
      var page = q('.bw-page')[0], cards = q('.m-cards>div'), wrap = q('.m-cards')[0], phone = q('.ph2')[0], ruler = q('.ruler-t')[0];
      var state = badge(q('.bw-state')[0], [[2.3, 'Broken on phones'], [3.4, 'Adjusting', 'mid'], [1e9, 'Fits every screen', 'ok']]);
      var widths = [[3.75, '390 px'], [4.15, '360 px'], [4.6, '430 px'], [1e9, '390 px']];
      g.set(q('.m-h'), { scale: 1.6, transformOrigin: '0 50%' });
      g.set(q('.m-img svg'), { scaleX: 1.55, transformOrigin: '0 50%' });
      g.set(wrap, { height: 44 });
      g.set(cards, { width: 134, x: function (i) { return i * 142; }, y: function (i) { return -i * 52; } });
      g.set(q('.m-btn'), { x: 150 });
      g.set(q('.m-scroll'), { autoAlpha: 1 });
      var tl = g.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onUpdate: function () { var t = this.time(), w = widths.find(function (x) { return t < x[0]; })[1]; state(t); if (ruler.textContent !== w) ruler.textContent = w; } });
      scanAndNotes(tl, q, page, [0.45, 1.3, 2.5, 3.9], { fixAt: 2.3 });
      tl.to(q('.m-body'), { x: -58, duration: 0.4, yoyo: true, repeat: 1, ease: 'power1.inOut' }, 1.25)
        .to(q('.m-h'), { scale: 1, duration: 0.7, ease: 'back.out(1.5)' }, 2.3)
        .to(q('.m-img svg'), { scaleX: 1, duration: 0.7 }, 2.35)
        .to(wrap, { height: 148, duration: 0.75 }, 2.45)
        .to(cards, { width: '100%', x: 0, y: 0, duration: 0.8, stagger: 0.07, ease: 'back.out(1.3)' }, 2.45)
        .to(q('.m-btn'), { x: 0, duration: 0.6, ease: 'back.out(1.6)' }, 2.75)
        .to(q('.m-scroll'), { autoAlpha: 0, y: 10, duration: 0.3 }, 2.6)
        .to(phone, { width: 250, duration: 0.4 }, 3.75).to(phone, { width: 298, duration: 0.45 }, 4.15).to(phone, { width: 270, duration: 0.4 }, 4.6)
        .to({}, { duration: 0.5 });
      state(0);
      return tl;
    },
    mail: function (pin, q) {
      var page = q('.bw-page')[0], btn = q('.mbtn')[0], sent = q('.msent')[0], env = q('.env')[0], vd = q('.void')[0], row = q('.irow.new')[0], chips = q('.dns span'), inboxTop = q('.inbox .h4')[0];
      var state = badge(q('.bw-state')[0], [[1.45, 'Looks fine', 'ok'], [3.45, 'Losing enquiries'], [5, 'Fixing', 'mid'], [1e9, 'Delivering', 'ok']]);
      var c = pointer(page);
      g.set(sent, { autoAlpha: 0, y: 8 }); g.set(env, { autoAlpha: 0 }); g.set(vd, { autoAlpha: 0, y: 12 });
      g.set(row, { autoAlpha: 0, height: 0, paddingTop: 0, paddingBottom: 0, marginBottom: 0 });
      var tl = g.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onUpdate: function () { var t = this.time(); state(t); chips.forEach(function (s, i) { s.classList.toggle('ok', t >= 3.5 + i * 0.22); }); } });
      var fly = function (t, target, d) {
        tl.set(env, { x: function () { return spot(page, btn, 0.5, 0)[0] - 15; }, y: function () { return spot(page, btn, 0.5, 0)[1] - 26; }, scale: 0.5, rotation: -8 }, t)
          .to(env, { autoAlpha: 1, scale: 1, duration: 0.15 }, t)
          .to(env, { x: function () { return spot(page, target, 0.5, 0.5)[0] - 15; }, rotation: 10, duration: d, ease: 'power1.inOut' }, t + 0.05)
          .to(env, { y: function () { return spot(page, target, 0.5, 0.5)[1] - 15; }, duration: d, ease: 'back.in(1.6)' }, t + 0.05)
          .to(env, { autoAlpha: 0, scale: 0.4, duration: 0.15 }, t + d - 0.05);
      };
      go(tl, c, page, btn, 0.15, 0.5); click(tl, c, 0.7);
      tl.fromTo(btn, { scale: 1 }, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 }, 0.7).to(sent, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.8);
      fly(0.9, vd, 0.6);
      tl.to(vd, { autoAlpha: 1, y: 0, duration: 0.3, ease: 'back.out(2)' }, 1.45).fromTo(vd, { x: 0 }, { x: 5, duration: 0.06, yoyo: true, repeat: 5 }, 1.5);
      scanAndNotes(tl, q, page, [2, 2.8, 3.6, 5.1], { scanAt: 1.7, fixAt: 3.5 });
      tl.to(vd, { autoAlpha: 0, y: -8, duration: 0.4 }, 4.1);
      click(tl, c, 4.45);
      tl.fromTo(btn, { scale: 1 }, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 }, 4.45);
      fly(4.55, inboxTop, 0.6);
      tl.to(row, { autoAlpha: 1, height: 54, paddingTop: 9, paddingBottom: 9, marginBottom: 8, duration: 0.45, ease: 'back.out(1.4)' }, 5.1)
        .to(c, { autoAlpha: 0, duration: 0.3 }, 5.2)
        .to({}, { duration: 0.6 });
      state(0); chips.forEach(function (s) { s.classList.remove('ok'); });
      return tl;
    },
    fields: function (pin, q) {
      var page = q('.bw-page')[0], tangle = q('.tangle')[0], rows = q('.afields>*'), pv = q('.pv')[0], prices = q('.pz'), upd = q('.upd')[0], field = q('.price-in')[0], caret = q('.caret')[0];
      var state = badge(q('.bw-state')[0], [[2.3, 'Developer needed'], [4.5, 'Restructuring', 'mid'], [1e9, 'Team can edit', 'ok']]);
      var typed = [[3.6, '$129'], [3.72, '$1'], [3.84, '$14'], [1e9, '$149']];
      var c = pointer(page);
      g.set(tangle, { autoAlpha: 1 }); g.set(rows, { autoAlpha: 0, y: 14 });
      var paint = function (t) { var v = typed.find(function (x) { return t < x[0]; })[1], live = t >= 4.5 ? '$149' : '$129'; if (pv.textContent !== v) pv.textContent = v; prices.forEach(function (p) { if (p.textContent !== live) p.textContent = live; }); caret.style.opacity = t > 3.45 && t < 4.3 ? 1 : 0; field.classList.toggle('focus', t > 3.45 && t < 4.3); };
      var tl = g.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onUpdate: function () { var t = this.time(); state(t); paint(t); } });
      scanAndNotes(tl, q, page, [0.45, 1.3, 2.5, 4.6], { fixAt: 2.3 });
      tl.to(tangle, { autoAlpha: 0, scale: 0.96, duration: 0.5 }, 2.3)
        .to(rows, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.09, ease: 'power3.out' }, 2.55);
      go(tl, c, page, field, 3, 0.45, 0.6, 0.55); click(tl, c, 3.45);
      go(tl, c, page, upd, 3.95, 0.42); click(tl, c, 4.4);
      tl.fromTo(upd, { scale: 1 }, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1 }, 4.4)
        .fromTo(prices, { backgroundColor: 'rgba(34,197,94,0)', scale: 1 }, { backgroundColor: 'rgba(34,197,94,.3)', scale: 1.18, duration: 0.22, yoyo: true, repeat: 1, stagger: 0.09 }, 4.5)
        .to(c, { autoAlpha: 0, duration: 0.3 }, 5)
        .to({}, { duration: 0.6 });
      state(0); paint(0);
      return tl;
    },
    figma: function (pin, q) {
      var page = q('.bw-page')[0], stage = q('.fig-stage')[0], frame = q('.fig-frame')[0], split = q('.fig-split')[0], wlabel = q('.fig-w')[0], match = q('.fig-match')[0];
      var state = badge(q('.bw-state')[0], [[2, 'Figma file', 'mid'], [3.35, 'Building', 'mid'], [1e9, 'Live in WordPress', 'ok']]);
      var widths = lite ? [[1e9, '390']] : [[3.75, '1440'], [4.25, '768'], [4.75, '390'], [1e9, '1440']];
      var c = pointer(page);
      g.set(stage, { '--p': '0%' }); g.set(split, { autoAlpha: 1 }); g.set(match, { autoAlpha: 0, scale: 0.7 });
      var tl = g.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onUpdate: function () { var t = this.time(), w = widths.find(function (x) { return t < x[0]; })[1]; state(t); if (wlabel.textContent !== w) wlabel.textContent = w; } });
      scanAndNotes(tl, q, page, [0.45, 1.4, 2.5, 3.9], { fixAt: 2.15 });
      var edge = function (f) { return function () { var a = frame.getBoundingClientRect(), b = page.getBoundingClientRect(); return a.left - b.left + a.width * f; }; }, mid = function () { var a = frame.getBoundingClientRect(), b = page.getBoundingClientRect(); return a.top - b.top + a.height / 2 + 4; };
      tl.to(c, { autoAlpha: 1, duration: 0.15 }, 1.35).to(c, { x: edge(0), y: mid, duration: 0.5 }, 1.35);
      click(tl, c, 1.9);
      tl.to(stage, { '--p': '100%', duration: 1.25, ease: 'power1.inOut' }, 2)
        .to(c, { x: edge(1), duration: 1.25, ease: 'power1.inOut' }, 2)
        .to([split, c], { autoAlpha: 0, duration: 0.25 }, 3.3)
        .to(match, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 3.4);
      if (!lite) tl.to(frame, { width: '62%', duration: 0.42 }, 3.75).to(frame, { width: '38%', duration: 0.42 }, 4.25).to(frame, { width: '100%', duration: 0.45 }, 4.75);
      tl.to({}, { duration: lite ? 0.9 : 0.6 });
      state(0);
      return tl;
    }
  };

  start.then(function () {
    $$('.dpin[data-demo]').forEach(function (pin) {
      var make = demos[pin.dataset.demo]; if (!make) return;
      var tl = make(pin, g.utils.selector(pin));
      if (reduced) { tl.progress(1); return; }
      if (lite) { seen([$('.bw', pin)], function () { tl.timeScale(0.5).play(); }, '0px 0px -35% 0px'); return; }
      ST.create({ trigger: pin, start: 'top 100px', end: '+=' + (pin.dataset.len || 1800), pin: true, scrub: 0.8, animation: tl, anticipatePin: 1 });
      var hint = $('.scrollhint', pin); if (hint) g.to(hint, { opacity: 0, scrollTrigger: { trigger: pin, start: 'top 100px', end: '+=200', scrub: true } });
    });
    if (ST) { ST.refresh(); addEventListener('load', function () { ST.refresh(); }); }
  });
})();
