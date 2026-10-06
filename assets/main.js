(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ------------------------------------------------------------------
     SOCIAL LINKS — paste your three URLs here (one place for the whole site).
     Leave a value empty ('') and that icon stays inert (no navigation).
     You can instead paste a URL straight into the href="" of the icon in the HTML.
     ------------------------------------------------------------------ */
  var BMS_SOCIAL = {
    instagram: '',
    linkedin: '',
    facebook: ''
  };

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a') : null;
      if (link && link.getAttribute('href')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Social icons: fill hrefs from BMS_SOCIAL when set; keep empty links inert
  document.querySelectorAll('a[data-social]').forEach(function (a) {
    var url = BMS_SOCIAL[a.getAttribute('data-social')];
    if (url && !a.getAttribute('href')) { a.setAttribute('href', url); }
    a.addEventListener('click', function (e) {
      if (!a.getAttribute('href')) { e.preventDefault(); }
    });
  });

  // Image placeholders: hide an <img> whose file fails to load so the placeholder shows, not a broken icon
  document.querySelectorAll('.ph img').forEach(function (img) {
    var box = img.closest('.ph');
    var fail = function () { box.classList.add('ph-broken'); };
    if (!img.getAttribute('src')) { return; }
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) { fail(); }
  });

  // Catalogue filter (resources/index.html)
  var filterBtns = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('.mat-card[data-category]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      cards.forEach(function (c) {
        c.hidden = !(f === 'all' || c.getAttribute('data-category') === f);
      });
    });
  });

  // Scroll reveals
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Contact form -> WhatsApp
  var form = document.getElementById('contact-form');
  if (form) {
    // Prefill from material pages: contact.html?intent=need|have|discuss&material=Corn%20Cobs
    var params = new URLSearchParams(window.location.search);
    var material = (params.get('material') || '').slice(0, 80);
    var intent = params.get('intent');
    var msgField = form.elements.message;
    if (msgField && !msgField.value && (material || intent === 'have')) {
      var prefill = {
        discuss: material ? 'I would like to discuss ' + material + '.' : '',
        need: material ? 'I need ' + material + '.' : '',
        have: material ? 'I have ' + material + ' available.' : 'I have a resource to offer.'
      }[intent] || (material ? 'I am enquiring about ' + material + '.' : '');
      msgField.value = prefill;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return (form.elements[id].value || '').trim(); };
      var err = document.getElementById('form-error');
      if (!v('name') || !v('phone') || !v('message')) { err.hidden = false; return; }
      err.hidden = true;
      var lines = [
        'Hello PT Berkat Muri Sejahtera,',
        '',
        'Name: ' + v('name'),
        v('company') ? 'Company: ' + v('company') : null,
        'Contact: ' + v('phone'),
        '',
        v('message')
      ].filter(function (l) { return l !== null; });
      window.open('https://wa.me/6281289090842?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  }
})();
