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

  // Contact form -> WhatsApp (prefill + message follow the selected language, see assets/i18n.js)
  var form = document.getElementById('contact-form');
  if (form) {
    var I18N = window.BMS_I18N || null;
    var isId = function () { return !!I18N && I18N.lang === 'id'; };

    // Prefill from material pages: contact.html?intent=need|have|discuss&material=Corn%20Cobs
    var params = new URLSearchParams(window.location.search);
    var material = (params.get('material') || '').slice(0, 80);
    var intent = params.get('intent');
    var msgField = form.elements.message;

    var buildPrefill = function () {
      var id = isId();
      var m = id ? I18N.material(material) : material;
      var texts = id ? {
        discuss: material ? 'Saya ingin membahas ' + m + '.' : '',
        need: material ? 'Saya membutuhkan ' + m + '.' : '',
        have: material ? 'Saya memiliki ' + m + ' yang tersedia.' : 'Saya memiliki sumber daya yang ingin ditawarkan.'
      } : {
        discuss: material ? 'I would like to discuss ' + m + '.' : '',
        need: material ? 'I need ' + m + '.' : '',
        have: material ? 'I have ' + m + ' available.' : 'I have a resource to offer.'
      };
      return texts[intent] || (material ? (id ? 'Saya ingin menanyakan tentang ' + m + '.' : 'I am enquiring about ' + m + '.') : '');
    };

    var lastPrefill = '';
    if (msgField && !msgField.value && (material || intent === 'have')) {
      lastPrefill = buildPrefill();
      msgField.value = lastPrefill;
    }
    // Switching language updates the prefilled message, but never overwrites text the visitor edited
    document.addEventListener('bms:langchange', function () {
      if (msgField && lastPrefill && msgField.value === lastPrefill) {
        lastPrefill = buildPrefill();
        msgField.value = lastPrefill;
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { return (form.elements[id].value || '').trim(); };
      var err = document.getElementById('form-error');
      if (!v('name') || !v('phone') || !v('message')) { err.hidden = false; return; }
      err.hidden = true;
      var id = isId();
      var lines = [
        id ? 'Halo PT Berkat Muri Sejahtera,' : 'Hello PT Berkat Muri Sejahtera,',
        '',
        (id ? 'Nama: ' : 'Name: ') + v('name'),
        v('company') ? (id ? 'Perusahaan: ' : 'Company: ') + v('company') : null,
        (id ? 'Kontak: ' : 'Contact: ') + v('phone'),
        '',
        v('message')
      ].filter(function (l) { return l !== null; });
      window.open('https://wa.me/6281289090842?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  }
})();
