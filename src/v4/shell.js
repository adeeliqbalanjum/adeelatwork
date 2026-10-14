/* V4 shell: preloader Concept A ("The fix"), page transition curtain, submit animation. Needs GSAP. */
window.__errs = []; addEventListener('error', function (e) { window.__errs.push((e.message || '') + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno); });
(function () {
  'use strict';
  var g = window.gsap, reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ss = { get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }, del: function (k) { try { sessionStorage.removeItem(k); } catch (e) {} } };
  var pre = $('#pre'), curtain = $('#curtain');
  var lighthouse = /Lighthouse|Chrome-Lighthouse|HeadlessChrome/.test(navigator.userAgent);
  var fromNav = !!ss.get('aw-nav'); ss.del('aw-nav');

  /* ---------- preloader: once per session, 1.6 s, never waits on the network ---------- */
  function runPreloader() {
    if (!pre) return Promise.resolve();
    if (!g || reduced || lighthouse || ss.get('aw-seen') || fromNav || /[?&]nopre/.test(location.search)) { pre.hidden = true; return Promise.resolve(); }
    ss.set('aw-seen', '1');
    document.documentElement.classList.add('pre-on');
    var outline = $('.pre-outline rect', pre), blocks = $$('.pre-blk', pre), bar = $('.pre-bar', pre), scan = $('.pre-scan', pre), gauge = $('.pre-gauge', pre), arc = $('.arc', gauge), num = $('b', gauge), live = $('.pre-live', pre), inner = $('.pre-in', pre), top = $('.pre-top', pre), bot = $('.pre-bot', pre), mark = $('.pre-mark', pre);
    var browser = $('.pre-browser', pre);
    var tl = g.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo(mark, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3 }, 0)
      .to(outline, { strokeDashoffset: 0, duration: 0.35, ease: 'power1.inOut' }, 0)
      .to([bar].concat(blocks), { x: 0, opacity: 1, duration: 0.3, stagger: 0.06 }, 0.3)
      .fromTo(scan, { opacity: 1, y: 0 }, { y: browser.offsetHeight, duration: 0.5, ease: 'none', onUpdate: function () {
        var y = scan.getBoundingClientRect().top; blocks.forEach(function (b) { if (b.getBoundingClientRect().top < y) b.classList.add('on'); });
      } }, 0.7)
      .add(function () { bar.classList.add('ok'); blocks.forEach(function (b) { b.classList.add('on'); }); }, 1.0)
      .to(scan, { opacity: 0, duration: 0.15 }, 1.15)
      .to(gauge, { opacity: 1, duration: 0.25 }, 0.8)
      .to(arc, { strokeDashoffset: 339 * (1 - 0.55), duration: 0.4 }, 0.85)
      .add(g.to({ v: 0 }, { v: 55, duration: 0.4, onUpdate: function () { num.textContent = Math.round(this.targets()[0].v); } }), 0.85)
      .to(arc, { strokeDashoffset: 339 * (1 - 0.92), duration: 0.35, ease: 'back.out(1.4)', onStart: function () { gauge.classList.add('ok'); } }, 1.2)
      .add(g.to({ v: 55 }, { v: 92, duration: 0.35, ease: 'back.out(1.4)', onUpdate: function () { num.textContent = Math.round(this.targets()[0].v); } }), 1.2)
      .to(live, { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' }, 1.25)
      .to([inner, mark], { opacity: 0, scale: 0.9, duration: 0.3 }, 1.45)
      .to(top, { yPercent: -100, duration: 0.5, ease: 'power3.inOut' }, 1.5)
      .to(bot, { yPercent: 100, duration: 0.5, ease: 'power3.inOut' }, 1.5)
      .to(pre, { backgroundColor: 'rgba(10,10,10,0)', duration: 0.3 }, 1.5)
      .set(pre, { display: 'none' }, 2.0);
    var done = new Promise(function (res) { tl.eventCallback('onComplete', function () { document.documentElement.classList.remove('pre-on'); res(); }); });
    var cap = setTimeout(function () { if (tl.progress() < 0.75) tl.seek(1.45); }, 1700);
    done.then(function () { clearTimeout(cap); pre.remove(); });
    return done;
  }
  window.AWPreloader = runPreloader();

  /* ---------- page transition: internal links only ---------- */
  if (curtain && g && !reduced) {
    if (fromNav) { g.set(curtain, { yPercent: 0 }); g.set($('.mark', curtain), { opacity: 1 }); g.to(curtain, { yPercent: -100, duration: 0.45, ease: 'power3.inOut', delay: 0.05 }); }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]'); if (!a) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return;
      var url; try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return;
      if (/\.(pdf|jpg|png|mp4|zip)$/i.test(url.pathname)) return;
      e.preventDefault(); ss.set('aw-nav', '1');
      g.set(curtain, { yPercent: 100 }); g.set($('.mark', curtain), { opacity: 0 });
      g.timeline().to(curtain, { yPercent: 0, duration: 0.32, ease: 'power3.in' }).to($('.mark', curtain), { opacity: 1, duration: 0.15 }, 0.2).add(function () { location.href = url.href; }, 0.42);
    }, true);
    addEventListener('pageshow', function (e) { if (e.persisted) g.set(curtain, { yPercent: 100 }); });
  }

  /* ---------- submit animation ---------- */
  // AWSubmit(form, openUrl, opts): validates (opts.validate returns a hint string or null), animates the primary button, opens the URL at the tick.
  window.AWSubmit = function (form, openUrl, opts) {
    opts = opts || {};
    var btn = $('.btn.primary, .btn.dark', form) || $('button[type=submit]', form); if (!btn) return;
    var field = opts.field || $('input, textarea', form);
    var hint = $('.hint', form) || (function () { var h = document.createElement('p'); h.className = 'hint'; form.appendChild(h); return h; })();
    var bad = opts.validate ? opts.validate() : null;
    if (bad) { hint.textContent = bad; hint.classList.add('show'); if (field) { field.classList.remove('is-shake'); void field.offsetWidth; field.classList.add('is-shake'); field.focus(); field.style.borderColor = '#EF4444'; } form.classList.add('is-error'); return false; }
    hint.classList.remove('show'); form.classList.remove('is-error'); if (field) field.style.borderColor = '';
    var win = openUrl ? window.open(openUrl, '_blank', 'noopener') : null;
    if (!g || reduced) { btn.classList.add('is-done'); btn.innerHTML = '<span class="lbl">Sent ✓</span>'; return true; }
    var w = btn.offsetWidth, h = btn.offsetHeight;
    btn.classList.add('is-busy'); btn.style.width = w + 'px'; btn.style.height = h + 'px';
    var lbl = btn.querySelector('.lbl') || (function () { var s = document.createElement('span'); s.className = 'lbl'; while (btn.firstChild) s.appendChild(btn.firstChild); btn.appendChild(s); return s; })();
    var sweep = document.createElement('i'); sweep.className = 'sweep'; btn.insertBefore(sweep, lbl);
    var arc = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); arc.setAttribute('class', 'arc'); arc.setAttribute('viewBox', '0 0 54 54'); arc.innerHTML = '<path d="M27 7 A20 20 0 1 1 7 27"/>'; btn.appendChild(arc);
    var tick = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); tick.setAttribute('class', 'tick'); tick.setAttribute('viewBox', '0 0 54 54'); tick.innerHTML = '<path d="M14 28 L23 37 L41 17"/>'; btn.appendChild(tick);
    var burst = document.createElement('span'); burst.className = 'burst'; var cols = ['#3B82F6', '#22C55E', '#F59E0B', '#FFFFFF']; for (var i = 0; i < 18; i++) { var p = document.createElement('i'); p.style.background = cols[i % 4]; burst.appendChild(p); } btn.appendChild(burst);
    var wrap = form.classList.contains('form-wrap') ? form : (form.closest('.form-wrap') || form); if (getComputedStyle(wrap).position === 'static') wrap.style.position = 'relative';
    var card = document.createElement('div'); card.className = 'sent-card'; card.innerHTML = '<span class="ok"><svg viewBox="0 0 24 24"><path d="M6 12.5 L10 16.5 L18 8"/></svg></span><span><b>' + (opts.doneTitle || 'Sent. I will look today.') + '</b><small>' + (opts.doneSub || (win ? 'WhatsApp is opening with your message filled in.' : 'Thanks, you will hear back within a day.')) + '</small></span>';
    wrap.appendChild(card);
    var br = btn.getBoundingClientRect(), wr = wrap.getBoundingClientRect(); card.style.left = (br.left - wr.left) + 'px'; card.style.top = (br.top - wr.top + h / 2) + 'px';
    var tl = g.timeline();
    tl.to(btn, { scale: 0.96, duration: 0.08 }).to(btn, { scale: 1, duration: 0.12 })
      .to(lbl, { opacity: 0, duration: 0.15 }, 0.05).add(function () { lbl.textContent = 'Sending'; }, 0.2).to(lbl, { opacity: 0.8, duration: 0.15 }, 0.2)
      .to(sweep, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, 0.1)
      .to(lbl, { opacity: 0, duration: 0.15 }, 0.55)
      .to(btn, { width: 54, height: 54, padding: 0, duration: 0.25, ease: 'back.in(1.4)', onStart: function () { btn.classList.add('is-circle'); } }, 0.6)
      .to(arc, { opacity: 1, duration: 0.1 }, 0.75).to(arc, { rotation: 360, duration: 0.4, ease: 'power1.inOut', transformOrigin: '50% 50%' }, 0.75).to(arc, { opacity: 0, duration: 0.1 }, 1.1)
      .add(function () { btn.classList.add('is-done'); }, 0.85)
      .to(tick, { opacity: 1, duration: 0.1 }, 0.9).to(tick.querySelector('path'), { strokeDashoffset: 0, duration: 0.3, ease: 'power2.out' }, 0.9)
      .add(function () { $$('i', burst).forEach(function (p, i) { var a = (i / 18) * Math.PI * 2 + Math.random() * 0.4, d = 80 + Math.random() * 60; g.fromTo(p, { x: 0, y: 0, opacity: 1, scale: 1 }, { x: Math.cos(a) * d, y: Math.sin(a) * d + 40, opacity: 0, scale: 0.6, duration: 0.6, ease: 'power2.out', delay: i * 0.01 }); }); }, 0.9)
      .to(card, { opacity: 1, duration: 0.3 }, 1.15).fromTo(card, { scaleX: 0.3, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.4, ease: 'power3.out' }, 1.1)
      .to(btn, { opacity: 0, duration: 0.2 }, 1.15);
    return true;
  };
})();
