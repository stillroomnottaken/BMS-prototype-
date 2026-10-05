(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

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
