(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = matchMedia('(max-width:860px)').matches;
  const STATIC = /[?&]static/.test(location.search) || reduce || !window.gsap;
  const canHover = matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ---------- works in every mode ---------- */
  const refreshSoon = () => window.ScrollTrigger && setTimeout(() => ScrollTrigger.refresh(), 760);

  $$('[data-acc]').forEach(group => {
    $$(':scope > *', group).forEach(row => {
      const head = row.querySelector(':scope > button');
      if (!head) return;
      head.setAttribute('aria-expanded', row.classList.contains('on'));
      head.addEventListener('click', () => {
        const was = row.classList.contains('on');
        if (group.dataset.acc === 'single') $$(':scope > .on', group).forEach(r => { r.classList.remove('on'); r.querySelector(':scope > button').setAttribute('aria-expanded', false); });
        row.classList.toggle('on', !was);
        head.setAttribute('aria-expanded', !was);
        refreshSoon();
      });
    });
  });

  $$('.exp figure').forEach(f => {
    const pick = () => { $$('.exp figure').forEach(x => x.classList.remove('on')); f.classList.add('on'); };
    f.addEventListener('mouseenter', pick); f.addEventListener('click', pick);
  });

  $$('[data-pick]').forEach(g => $$('.chip', g).forEach(c => c.addEventListener('click', () => { $$('.chip', g).forEach(x => x.classList.remove('on')); c.classList.add('on'); })));

  const filters = $('[data-filters]');
  if (filters) $$('.chip', filters).forEach(c => c.addEventListener('click', () => {
    $$('.chip', filters).forEach(x => x.classList.remove('on')); c.classList.add('on');
    const f = c.dataset.f;
    $$('.wrow').forEach(r => r.classList.toggle('gone', f !== 'all' && !r.dataset.tags.split(' ').includes(f)));
    if (window.gsap && !STATIC) gsap.fromTo('.wrow:not(.gone)', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .5, stagger: .03, ease: 'power3.out', clearProps: 'all' });
    refreshSoon();
  }));

  $$('.vt-frame').forEach(f => {
    const v = $('video', f), b = $('.vt-play', f);
    b.addEventListener('click', () => { f.classList.add('playing'); v.controls = true; v.play(); });
    v.addEventListener('ended', () => { f.classList.remove('playing'); v.controls = false; v.load(); });
  });

  const clocks = $$('.clock');
  if (clocks.length) { const tick = () => { const t = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit' }).format(new Date()); clocks.forEach(c => c.textContent = t); }; tick(); setInterval(tick, 20000); }

  $$('form[data-wa]').forEach(form => {
    const v = n => (form.elements[n] && form.elements[n].value || '').trim();
    const text = () => ['Hi Adeel,', ...$$('.chips', form).map(c => { const on = $('.on', c); return on ? c.dataset.label + ': ' + on.textContent.trim() : ''; }), v('name') && 'Name: ' + v('name'), v('url') && 'Site: ' + v('url'), v('what')].filter(Boolean).join('\n');
    form.addEventListener('submit', e => { e.preventDefault(); window.open('https://wa.me/923054829714?text=' + encodeURIComponent(text()), '_blank', 'noopener'); });
    const mail = $('[data-mail]', form);
    if (mail) mail.addEventListener('click', () => { location.href = 'mailto:adeeliqbalajum@gmail.com?subject=' + encodeURIComponent('Website enquiry' + (v('url') ? ': ' + v('url') : '')) + '&body=' + encodeURIComponent(text()); });
  });


  /* Style control: palette and type set, remembered on this device. Visitors can also add palettes of their own. */
  const styleBtn = $('.style-btn'), stylePanel = $('.style-panel');
  if (styleBtn) {
    const store = { get(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v)); } catch (e) {} } };
    const row = $('.sw-row', stylePanel), add = $('.sw.add', stylePanel), cp = $('.cp', stylePanel), note = $('.cp-note', cp), del = $('.cp-del', cp);
    const inp = n => cp.querySelector('[name=' + n + ']');
    let customs = store.get('aw-custom', []), editing = -1;

    // colour maths: relative luminance, and darkening the main colour until white text on it passes 4.5 to 1
    const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
    const hex = v => '#' + v.map(x => Math.round(x).toString(16).padStart(2, '0')).join('');
    const lum = v => { const f = x => { x /= 255; return x <= .03928 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4); }; return .2126 * f(v[0]) + .7152 * f(v[1]) + .0722 * f(v[2]); };
    const safe = h => { let v = rgb(h), n = 0; while (1.05 / (lum(v) + .05) < 4.5 && n++ < 60) v = v.map(x => x * .94); return hex(v); };
    const make = (A, B, C) => ({ a: A, b: B, c: C, c1: safe(A), c1raw: A, c2: B, c2ink: lum(rgb(B)) > .36 ? '#111111' : '#ffffff', c3: C });
    const apply = p => { ['c1', 'c1raw', 'c2', 'c2ink', 'c3'].forEach(k => root.style.setProperty('--' + k, p[k])); root.dataset.palette = 'custom'; };

    const draw = () => {
      $$('.sw[data-custom]', row).forEach(x => x.remove());
      customs.forEach((p, i) => { const s = document.createElement('button'); s.type = 'button'; s.className = 'sw'; s.dataset.custom = i; s.style.setProperty('--a', p.c1); s.style.setProperty('--b', p.c2); s.title = s.ariaLabel = 'Your palette ' + (i + 1); row.insertBefore(s, add); });
    };
    const mark = () => {
      const pal = root.dataset.palette || 'forest', font = root.dataset.font || 'satoshi';
      $$('.sw[data-palette]', row).forEach(x => x.setAttribute('aria-pressed', x.dataset.palette === pal));
      $$('.sw[data-custom]', row).forEach(x => x.setAttribute('aria-pressed', pal === 'custom' && x.dataset.custom === root.dataset.cp));
      $$('[data-font]', stylePanel).forEach(x => x.setAttribute('aria-pressed', x.dataset.font === font));
      $$('.ty[data-bg]', stylePanel).forEach(x => x.setAttribute('aria-pressed', x.dataset.bg === (root.dataset.bg || 'soft')));
    };
    const editor = (on, i) => {
      cp.hidden = !on; add.setAttribute('aria-expanded', on && i < 0); editing = on ? i : -1; del.hidden = !(on && i >= 0); note.textContent = '';
      if (on) { const p = i >= 0 ? customs[i] : null, cs = getComputedStyle(root), pick = (v, d) => /^#[0-9a-f]{6}$/i.test(v.trim()) ? v.trim() : d; inp('a').value = p ? p.a : pick(cs.getPropertyValue('--brand'), '#1D5A3A'); inp('b').value = p ? p.b : pick(cs.getPropertyValue('--accent'), '#F2B705'); inp('c').value = p ? p.c : pick(cs.getPropertyValue('--o3'), '#7FD8C2'); }
    };
    const open = v => { stylePanel.hidden = !v; styleBtn.setAttribute('aria-expanded', v); };

    styleBtn.addEventListener('click', () => open(stylePanel.hidden));
    addEventListener('keydown', e => { if (e.key === 'Escape') open(false); });
    document.addEventListener('click', e => { if (!e.target.closest('.style')) open(false); });
    add.addEventListener('click', () => editor(cp.hidden || editing >= 0, -1));
    cp.addEventListener('input', () => {   // live preview while the pickers move
      const p = make(inp('a').value, inp('b').value, inp('c').value); apply(p); delete root.dataset.cp; mark();
      note.textContent = p.c1 !== p.a.toLowerCase() ? 'Main colour darkened a little so white text stays readable on it.' : '';
    });
    $('.cp-save', cp).addEventListener('click', () => {
      const p = make(inp('a').value, inp('b').value, inp('c').value);
      if (editing >= 0) customs[editing] = p; else { if (customs.length >= 6) customs.shift(); customs.push(p); editing = customs.length - 1; }
      store.set('aw-custom', customs); store.set('aw-palette', 'custom:' + editing); root.dataset.cp = String(editing);
      apply(p); draw(); mark(); editor(true, editing); note.textContent = 'Saved on this device.';
    });
    del.addEventListener('click', () => {
      customs.splice(editing, 1); store.set('aw-custom', customs); store.set('aw-palette', 'forest');
      root.dataset.palette = 'forest'; delete root.dataset.cp; draw(); mark(); editor(false);
    });
    stylePanel.addEventListener('click', e => {
      const x = e.target.closest('.sw[data-palette],.sw[data-custom],.ty[data-font],.ty[data-bg]'); if (!x) return;
      if (x.dataset.bg) { root.dataset.bg = x.dataset.bg; store.set('aw-bg', x.dataset.bg); mark(); return; }
      if (x.dataset.font) { root.dataset.font = x.dataset.font; store.set('aw-font', x.dataset.font); refreshSoon(); }
      else if (x.dataset.palette) { root.dataset.palette = x.dataset.palette; delete root.dataset.cp; store.set('aw-palette', x.dataset.palette); editor(false); }
      else { const i = +x.dataset.custom; apply(customs[i]); root.dataset.cp = String(i); store.set('aw-palette', 'custom:' + i); editor(true, i); }
      mark();
    });
    draw(); mark();
  }

  /* light and dark */
  const modeBtn = $('.mode');
  const setMode = v => { root.dataset.mode = v; try { localStorage.setItem('aw-mode', v); } catch (e) {} if (modeBtn) modeBtn.setAttribute('aria-pressed', v === 'dark'); };
  if (modeBtn) { modeBtn.setAttribute('aria-pressed', root.dataset.mode === 'dark'); modeBtn.addEventListener('click', () => setMode(root.dataset.mode === 'dark' ? 'light' : 'dark')); }

  const nav = $('.nav'); let lastY = 0;
  const waBar = $('.wa-bar');
  const onScroll = () => { const y = scrollY; if (waBar) waBar.classList.toggle('show', y > 520 && y < document.documentElement.scrollHeight - innerHeight - 700); nav.classList.toggle('solid', y > 30); nav.classList.toggle('hide', y > 500 && y > lastY + 2); if (y < lastY - 2) nav.classList.remove('hide'); lastY = y; };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const demo = {
    state: $('.bw-state'), btn: $('.shop-btn'), btnT: $('.shop-btn .t'), sp: $('.shop-btn .sp'),
    set(p) {
      if (!this.state) return;
      const s = p < .5 ? 'Broken' : p < .8 ? 'Fixing' : 'Fixed';
      if (this.state.textContent !== s) { this.state.textContent = s; this.state.classList.toggle('ok', s === 'Fixed'); }
      const placed = p > .88;
      this.btn.classList.toggle('ok', placed);
      this.btnT.textContent = placed ? 'Order placed' : p > .72 ? 'Place order' : 'Processing';
      this.sp.style.display = p > .72 ? 'none' : '';
    }
  };

  if (STATIC) {
    root.classList.remove('anim', 'from-nav'); root.classList.add('static');
    demo.set(1);
    $$('.shop-alert,.thumb .brk,.cache').forEach(e => e.style.display = 'none');
    $$('.proc .step').forEach(s => s.classList.add('on'));
    return;
  }

  /* ---------- motion ---------- */
  const ST = window.ScrollTrigger;
  const lite = mobile || !ST;          // phones: no scroll library, nothing hidden at first paint
  if (!lite) gsap.registerPlugin(ST);
  const refresh = () => { if (!lite) { ST.sort(); ST.refresh(); } };   // sort: three pins push everything below them down

  let lenis = null;
  if (!lite && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ST.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href')); if (!t) return; e.preventDefault();
    lenis ? lenis.scrollTo(t, { offset: -90, duration: 1.4 }) : t.scrollIntoView({ behavior: 'smooth' });
  }));

  // run cb once when an element scrolls into view
  const seen = (els, cb, margin) => {
    if (!els.length) return;
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { io.unobserve(e.target); cb(e.target); } }), { rootMargin: margin || '0px 0px -14% 0px' });
    els.forEach(el => io.observe(el));
  };

  function split(el) {
    const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [];
    while (tw.nextNode()) nodes.push(tw.currentNode);
    nodes.forEach(n => {
      if (n.parentElement.closest('[data-nosplit]')) return;
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(tok => {
        if (!tok) return;
        if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
        const w = document.createElement('span'); w.className = 'w';
        const i = document.createElement('span'); i.className = 'wi'; i.textContent = tok;
        w.appendChild(i); frag.appendChild(w);
      });
      n.replaceWith(frag);
    });
    return $$('.wi', el);
  }

  /* hero word that is visibly broken */
  const err = $('.err');
  if (err) err.innerHTML = [...err.textContent].map(c => '<i>' + c + '</i>').join('');
  const slump = at => { if (!err) return; const rot = [-9, 6, -4, 13, -7, 10, 24], dy = [.05, -.03, .09, .02, .13, -.02, .24], fs = parseFloat(getComputedStyle(err).fontSize); gsap.to($$('i', err), { rotation: i => rot[i % 7], y: i => dy[i % 7] * fs, duration: 1.1, ease: 'bounce.out', stagger: .05, delay: at }); };

  /* intro */
  let intro;
  if (lite) intro = () => slump(.5);
  else {
    const heads = $$('[data-intro]'), fades = $$('[data-intro-fade]');
    const introWords = heads.flatMap(split);
    gsap.set(introWords, { yPercent: 115 });
    gsap.set(fades, { opacity: 0, y: 24 });
    if (err) gsap.set(err, { opacity: 0, y: 40 });
    heads.concat(fades).forEach(el => { el.style.visibility = 'visible'; el.style.animation = 'none'; });
    intro = () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.to(introWords, { yPercent: 0, duration: 1.2, stagger: .045 }).to(fades, { opacity: 1, y: 0, duration: 1, stagger: .08 }, .35);
      if (err) { tl.to(err, { opacity: 1, y: 0, duration: 1 }, .3); slump(1.25); }
    };
  }

  const curtain = $('.curtain');
  if (root.classList.contains('from-nav')) {
    try { sessionStorage.removeItem('nav'); } catch (e) {}
    gsap.to(curtain, { yPercent: -100, duration: .85, ease: 'expo.inOut', onComplete: () => { root.classList.remove('from-nav'); gsap.set(curtain, { visibility: 'hidden' }); } });
    gsap.delayedCall(.3, intro);
  } else intro();

  /* page transitions */
  $$('a[href]').forEach(a => a.addEventListener('click', e => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    e.preventDefault(); try { sessionStorage.setItem('nav', 1); } catch (er) {}
    gsap.set(curtain, { visibility: 'visible', yPercent: 100 });
    gsap.to(curtain, { yPercent: 0, duration: lite ? .45 : .7, ease: 'expo.inOut', onComplete: () => location.href = a.href });
  }));
  addEventListener('pageshow', e => { if (e.persisted) gsap.set(curtain, { visibility: 'hidden' }); });

  /* headings reveal on scroll (desktop) */
  if (!lite) $$('[data-split]').forEach(el => {
    const words = split(el);
    gsap.set(words, { yPercent: 115 });
    ST.create({ trigger: el, start: 'top 86%', once: true, onEnter: () => gsap.to(words, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: .035 }) });
  });

  /* the repair demos: each builds a paused timeline, scoped to its own pin */
  const scanAndNotes = (tl, q, page, at) => {
    const notes = q('.note');
    gsap.set(notes, { autoAlpha: 0, y: 34 });
    tl.to(q('.scan'), { opacity: 1, duration: .15 })
      .fromTo(q('.scan'), { y: -120 }, { y: () => page.offsetHeight, duration: 1.1, ease: 'none' }, '<')
      .to(q('.scan'), { opacity: 0, duration: .15 }, '>-.15');
    notes.forEach((n, i) => tl.to(n, { autoAlpha: 1, y: 0, duration: .5 }, at[i]));
  };
  const badge = (el, steps) => t => { const s = steps.find(x => t < x[0]); if (el.textContent !== s[1]) { el.textContent = s[1]; el.classList.toggle('mid', s[2] === 'mid'); el.classList.toggle('ok', s[2] === 'ok'); } };

  const demos = {
    crash(pin, q) {
      const page = q('.bw-page')[0], plug = q('.plug.sus')[0], fixedT = plug.textContent;
      const state = badge(q('.bw-state')[0], [[1, 'Down'], [3.5, 'Tracing', 'mid'], [1e9, 'Back online', 'ok']]);
      const bits = q('.site-hero>*,.site-cards>div');
      gsap.set(q('.wsod'), { display: 'grid', clipPath: 'inset(0% 0% 0% 0%)' });
      gsap.set(q('.dlog'), { display: 'block', yPercent: 106 });
      gsap.set(q('.dlog p'), { autoAlpha: 0, x: -12 });
      gsap.set(q('.plugs'), { autoAlpha: 0 });
      gsap.set(q('.site-toast'), { autoAlpha: 0, y: 16 });
      gsap.set(bits, { autoAlpha: 0, y: 22 });
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onUpdate() { const t = this.time(), fixed = t >= 2.75; state(t); if (plug.classList.contains('ok') !== fixed) { plug.classList.toggle('ok', fixed); plug.textContent = fixed ? fixedT : 'Booking Widget 3.2.0'; } } });
      scanAndNotes(tl, q, page, [.45, 1.6, 2.6, 3.9]);
      tl.to(q('.dlog'), { yPercent: 0, duration: .5, ease: 'power3.out' }, 1)
        .to(q('.dlog p'), { autoAlpha: 1, x: 0, duration: .25, stagger: .16 }, 1.3)
        .fromTo(q('.dlog .hit'), { scale: 1 }, { scale: 1.06, duration: .18, yoyo: true, repeat: 3, transformOrigin: '0 50%' }, 1.9)
        .to(q('.plugs'), { autoAlpha: 1, duration: .3 }, 2.2)
        .fromTo(plug, { scale: 1 }, { scale: 1.14, duration: .16, yoyo: true, repeat: 3 }, 2.35)
        .to(q('.dlog'), { yPercent: 106, duration: .5 }, 3.1)
        .to(q('.wsod'), { clipPath: 'inset(0% 0% 100% 0%)', duration: .7, ease: 'power3.inOut' }, 3.3)
        .to(bits, { autoAlpha: 1, y: 0, duration: .5, stagger: .06, ease: 'power3.out' }, 3.5)
        .to(q('.site-toast'), { autoAlpha: 1, y: 0, duration: .4 }, 4)
        .to({}, { duration: .5 });
      state(0); plug.classList.remove('ok'); plug.textContent = 'Booking Widget 3.2.0';
      return tl;
    },
    speed(pin, q) {
      const page = q('.bw-page')[0], gauge = q('.gauge')[0], arc = q('.g-arc')[0], num = q('.g-n')[0], mb = q('.wf-mb')[0], req = q('.wf-req')[0];
      const state = badge(q('.bw-state')[0], [[2.2, 'Slow'], [3.6, 'Tuning', 'mid'], [1e9, 'Fast', 'ok']]);
      const tone = (v, good, mid) => v <= good ? '#0B7A45' : v <= mid ? '#9A6200' : '#C62F35';
      const vit = k => { const el = q('[data-v="' + k + '"]')[0]; return { el, em: $('em', el), dot: $('.v-bar i', el) }; };
      const V = { lcp: vit('lcp'), inp: vit('inp'), cls: vit('cls') };
      const o = { score: 39, lcp: 6.8, inp: 620, cls: .31, mb: 6.2, req: 148, x1: 85, x2: 74, x3: 66 };
      const render = () => {
        gauge.style.setProperty('--g', o.score >= 90 ? '#0B7A45' : o.score >= 50 ? '#9A6200' : '#C62F35');
        arc.style.strokeDashoffset = 100 - o.score; num.textContent = Math.round(o.score);
        V.lcp.em.textContent = o.lcp.toFixed(1) + ' s'; V.lcp.el.style.setProperty('--c', tone(o.lcp, 2.5, 4)); V.lcp.dot.style.setProperty('--x', o.x1 + '%');
        V.inp.em.textContent = Math.round(o.inp / 10) * 10 + ' ms'; V.inp.el.style.setProperty('--c', tone(o.inp, 200, 500)); V.inp.dot.style.setProperty('--x', o.x2 + '%');
        V.cls.em.textContent = o.cls.toFixed(2); V.cls.el.style.setProperty('--c', tone(o.cls, .1, .25)); V.cls.dot.style.setProperty('--x', o.x3 + '%');
        mb.textContent = o.mb.toFixed(1) + ' MB'; req.textContent = Math.round(o.req);
      };
      const rows = q('.wf-row'), hot = 'rgba(213,56,61,.13)', cold = 'rgba(213,56,61,0)';
      gsap.set(q('.sw .was'), { opacity: 1 }); gsap.set(q('.sw .now'), { opacity: 0 });
      gsap.set(q('.psi-pass'), { autoAlpha: 0, scale: .8 });
      gsap.set(rows, { backgroundColor: cold });
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onUpdate() { render(); state(this.time()); } });
      scanAndNotes(tl, q, page, [.45, 1.3, 2.5, 3.8]);
      tl.to(rows[0], { backgroundColor: hot, duration: .3 }, .5)
        .to([rows[1], rows[2]], { backgroundColor: hot, duration: .3, stagger: .12 }, 1.2)
        .to(o, { score: 92, lcp: 1.9, inp: 140, cls: .04, mb: 1.1, req: 41, x1: 22, x2: 18, x3: 10, duration: 1.4, ease: 'power1.inOut' }, 2.2)
        .to(rows, { backgroundColor: cold, duration: .4 }, 2.3);
      rows.forEach((row, i) => {
        const bar = $('.wf-bar i', row), w = bar.dataset.w.split(','), at = 2.25 + i * .14, end = row.dataset.end;
        tl.fromTo(bar, { width: w[0] + '%', marginLeft: '0%', backgroundColor: '#D5383D' }, { width: w[1] + '%', marginLeft: end === 'late' ? '78%' : '0%', backgroundColor: end === 'late' ? '#A3A9A3' : '#22A565', duration: .9 }, at)
          .to($$('.was', row), { opacity: 0, duration: .25 }, at + .3).to($$('.now', row), { opacity: 1, duration: .25 }, at + .45);
        if (end === 'gone') tl.fromTo(row, { opacity: 1 }, { opacity: .5, duration: .4 }, at + .5);
      });
      tl.to(q('.psi-pass'), { autoAlpha: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, 3.8).to({}, { duration: .6 });
      render(); state(0);
      return tl;
    },
  };
  const pin =$('.repair-pin[data-demo="checkout"]');
  if (pin) {
    const page = $('.bw-page', pin), notes = $$('.note', pin), scan = $('.scan', pin);
    gsap.set('.shop-sum', lite ? { rotation: 2.5, y: 26 } : { rotation: 3.5, x: 52, y: 84 });
    gsap.set('.fld-two', { x: lite ? -8 : -22, rotation: -1.6 });
    gsap.set('.fld-two .fld:last-child', { y: lite ? 12 : 22 });
    gsap.set('.shop-nav span', { y: i => [7, -5, 11, -8][i % 4] });
    gsap.set('.shop-ok', { display: 'none', opacity: 0 });
    gsap.set(notes, { autoAlpha: 0, y: 34 });
    demo.set(0);
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' }, onUpdate() { demo.set(this.progress()); } });
    tl.to(scan, { opacity: 1, duration: .15 })
      .fromTo(scan, { y: -120 }, { y: () => page.offsetHeight, duration: 1.1, ease: 'none' }, '<')
      .to(scan, { opacity: 0, duration: .15 }, '>-.15')
      .to(notes[0], { autoAlpha: 1, y: 0, duration: .5 }, .45)
      .to('.cache', { scale: 1.3, duration: .25, yoyo: true, repeat: 3, transformOrigin: '100% 50%' }, 1.2)
      .to(notes[1], { autoAlpha: 1, y: 0, duration: .5 }, 1.3)
      .to('.shop-sum', { rotation: 0, x: 0, y: 0, duration: .9, ease: 'back.out(1.4)' }, 2.2)
      .to('.fld-two,.fld-two .fld:last-child,.shop-nav span', { x: 0, y: 0, rotation: 0, duration: .8, ease: 'back.out(1.6)' }, 2.3)
      .to('.thumb .brk', { opacity: 0, duration: .4 }, 2.5)
      .to('.shop-alert', { height: 0, paddingTop: 0, paddingBottom: 0, marginTop: 0, opacity: 0, duration: .6 }, 2.5)
      .to('.cache', { opacity: 0, scale: .6, duration: .4 }, 2.6)
      .to(notes[2], { autoAlpha: 1, y: 0, duration: .5 }, 2.5)
      .set('.shop-ok', { display: 'block' }, 3.7)
      .to('.shop-ok', { opacity: 1, duration: .4 }, 3.7)
      .fromTo('.shop-btn', { scale: 1 }, { scale: .97, duration: .12, yoyo: true, repeat: 1 }, 3.55)
      .to(notes[3], { autoAlpha: 1, y: 0, duration: .5 }, 3.7)
      .to({}, { duration: .5 });
    if (lite) seen([$('.bw')], () => tl.timeScale(.5).play(), '0px 0px -35% 0px');
    else {
      ST.create({ trigger: pin, start: 'top 104px', end: '+=2000', pin: true, scrub: .8, animation: tl, anticipatePin: 1 });
      gsap.to('.scrollhint', { opacity: 0, scrollTrigger: { trigger: pin, start: 'top 104px', end: '+=200', scrub: true } });
    }
  }
  $$('.repair-pin[data-demo]').forEach(pin => {
    const make = demos[pin.dataset.demo]; if (!make) return;
    const tl = make(pin, gsap.utils.selector(pin));
    if (lite) seen([$('.bw', pin)], () => tl.timeScale(.5).play(), '0px 0px -35% 0px');
    else ST.create({ trigger: pin, start: 'top 104px', end: '+=1800', pin: true, scrub: .8, animation: tl, anticipatePin: 1 });
  });

  /* counters */
  const counters = $$('[data-count]');
  counters.forEach(el => { el.textContent = +el.dataset.from || 0; });
  seen(counters, el => { const o = { v: +el.dataset.from || 0 }; gsap.to(o, { v: +el.dataset.count, duration: 1.8, ease: 'power3.out', onUpdate: () => el.textContent = Math.round(o.v) }); }, '0px 0px -8% 0px');

  /* client names: CSS loop on phones, scroll reactive on desktop */
  const mq = $('.marquee-in');
  if (mq) {
    mq.innerHTML += mq.innerHTML;
    if (lite) mq.classList.add('loop');
    else {
      const tw = gsap.to(mq, { xPercent: -50, duration: 36, ease: 'none', repeat: -1 });
      let boost = 0;
      ST.create({ onUpdate: s => boost = Math.min(7, Math.abs(s.getVelocity()) / 260) });
      gsap.ticker.add(() => { if (boost < .01 && tw.timeScale() === 1) return; boost *= .93; tw.timeScale(boost < .01 ? 1 : 1 + boost); });
    }
  }

  /* sound familiar: the panel follows the quote in view */
  const fam = $$('.fam-list li'), dt = $('.diag-t'), dk = $('.diag-k'), bar = $('.diag-bar i');
  if (fam.length && dt && !lite) {
    let cur = -1;
    const go = i => {
      if (i === cur) return; cur = i;
      fam.forEach((li, k) => { li.classList.toggle('on', k === i); li.classList.toggle('past', k < i); });
      bar.style.width = ((i + 1) / fam.length * 100) + '%';
      gsap.to([dt, dk], { opacity: 0, y: 10, duration: .18, onComplete: () => { dt.textContent = fam[i].dataset.cause; dk.textContent = fam[i].dataset.k || 'Usually behind it'; gsap.to([dt, dk], { opacity: 1, y: 0, duration: .45, ease: 'power3.out' }); } });
    };
    fam.forEach((li, i) => ST.create({ trigger: li, start: 'top 58%', end: 'bottom 58%', onToggle: s => s.isActive && go(i) }));
    go(0);
  }

  /* process steps */
  const proc = $('.proc');
  if (proc) {
    const steps = $$('.step', proc);
    if (lite) seen(steps, s => s.classList.add('on'), '0px 0px -25% 0px');
    else gsap.fromTo('.proc-line i', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: proc, start: 'top 78%', end: 'top 28%', scrub: .6, onUpdate: s => steps.forEach((st, i) => st.classList.toggle('on', s.progress >= i / (steps.length - 1) * .98 - .001)) } });
  }

  /* record fields light up */
  const rec = $$('.rec li');
  if (rec.length) { let k = 0; setInterval(() => { rec.forEach(l => l.classList.remove('lit')); rec[k++ % rec.length].classList.add('lit'); }, 900); }

  if (lite) return;

  /* ---------- desktop only from here ---------- */
  const cases = $$('.case');
  cases.forEach((c, i) => { if (cases[i + 1]) gsap.to(c, { scale: .92, opacity: .55, ease: 'none', scrollTrigger: { trigger: cases[i + 1], start: 'top bottom', end: 'top 130px', scrub: true } }); });
  $$('.case-media img,.portrait img,.shots img').forEach(img => gsap.fromTo(img, { yPercent: -10 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
  $$('[data-wipe]').forEach(el => gsap.from(el, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } }));
  const cover = $('.cover');
  if (cover) gsap.fromTo(cover, { scale: 1.06 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: cover, start: 'top bottom', end: 'top 20%', scrub: true } });
  const mega = $('.mega');
  if (mega) gsap.fromTo(mega, { '--mt': '0.18em', opacity: .25 }, { '--mt': '0em', opacity: 1, ease: 'none', scrollTrigger: { trigger: mega, start: 'top 98%', end: 'top 40%', scrub: .6 } });

  if (canHover) {
    /* the light behind the glass trails the pointer, slowly, and the icon layer drifts the other way for depth */
    const fol = $('body>.orbs>.follow'), mot = $('body>.orbs>.motif');
    if (fol && mot) {
      const fx = gsap.quickTo(fol, 'x', { duration: 1.5, ease: 'power3' }), fy = gsap.quickTo(fol, 'y', { duration: 1.5, ease: 'power3' });
      const mx = gsap.quickTo(mot, 'x', { duration: 2.2, ease: 'power3' }), my = gsap.quickTo(mot, 'y', { duration: 2.2, ease: 'power3' });
      gsap.set(fol, { x: innerWidth / 2, y: innerHeight / 2 });
      addEventListener('mousemove', e => { fol.classList.add('on'); fx(e.clientX); fy(e.clientY); mx((e.clientX / innerWidth - .5) * -30); my((e.clientY / innerHeight - .5) * -30); }, { passive: true });
      document.documentElement.addEventListener('mouseleave', () => fol.classList.remove('on'));
    }
    $$('[data-magnet]').forEach(el => {
      const xTo = gsap.quickTo(el, 'x', { duration: .6, ease: 'power3' }), yTo = gsap.quickTo(el, 'y', { duration: .6, ease: 'power3' });
      el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * .28); yTo((e.clientY - r.top - r.height / 2) * .4); });
      el.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
    });
    const cur = $('.cur');
    if (cur) {
      const cx = gsap.quickTo(cur, 'x', { duration: .35, ease: 'power3' }), cy = gsap.quickTo(cur, 'y', { duration: .35, ease: 'power3' });
      addEventListener('mousemove', e => { cx(e.clientX); cy(e.clientY); }, { passive: true });
      $$('[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => { cur.textContent = el.dataset.cursor; gsap.to(cur, { scale: 1, duration: .45, ease: 'back.out(1.8)' }); });
        el.addEventListener('mouseleave', () => gsap.to(cur, { scale: 0, duration: .3 }));
      });
    }
    const peek = $('.peek');
    if (peek) {
      const img = $('img', peek), px = gsap.quickTo(peek, 'x', { duration: .5, ease: 'power3' }), py = gsap.quickTo(peek, 'y', { duration: .5, ease: 'power3' });
      addEventListener('mousemove', e => { px(e.clientX + 36); py(e.clientY - 150); }, { passive: true });
      $$('.wrow').forEach(r => {
        r.addEventListener('mouseenter', () => { if (!r.dataset.img) return; img.src = r.dataset.img; gsap.to(peek, { opacity: 1, scale: 1, rotation: gsap.utils.random(-4, 4), duration: .5, ease: 'power3.out' }); });
        r.addEventListener('mouseleave', () => gsap.to(peek, { opacity: 0, scale: .8, duration: .3 }));
      });
    }
  }

  addEventListener('load', refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
})();
