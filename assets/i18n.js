/* ==========================================================================
   BMS language switcher (EN / ID)
   --------------------------------------------------------------------------
   - Injects an EN | ID button into the nav on every page.
   - English is the source text in the HTML. Indonesian is applied on top of it
     by matching each piece of text against the dictionary below.
   - Choice is remembered in localStorage ("bms-lang"). ?lang=id or ?lang=en in
     the URL also works (handy for sharing an Indonesian link).

   ADDING / CHANGING TEXT
   - New sentence on any page?  Add   "English text": "Teks Indonesia"   to DICT.
   - New material page?  Add it to MAT (name) and, if it uses a new category,
     to CAT. The repeated sentences on material pages are handled by PATTERNS.
   - To find anything not yet translated, open a page with ?i18ndebug in the
     URL, switch to ID and look at the browser console.
   ========================================================================== */
(function () {
  'use strict';

  var KEY = 'bms-lang';
  var LANGS = ['en', 'id'];

  /* ---------- Material names ---------- */
  var MAT = {
    'corn cobs': 'Tongkol Jagung',
    'candlenuts': 'Kemiri',
    'cocoa': 'Kakao',
    'rubber seeds': 'Biji Karet',
    'rubber seed oil': 'Minyak Biji Karet',
    'palm-based derivatives': 'Turunan Kelapa Sawit',
    'cnsl': 'CNSL',
    'uco': 'UCO',
    'pome': 'POME',
    'petrochemicals': 'Petrokimia'
  };

  /* ---------- Category names as used inside sentences ---------- */
  var CAT = {
    'agricultural commodities': 'komoditas pertanian',
    'bio-based materials': 'bahan berbasis hayati',
    'industrial': 'industri',
    'industrial materials': 'material industri'
  };

  /* ---------- Exact-text dictionary (English -> Indonesian) ---------- */
  var DICT = {
    /* Header / footer / shared */
    "Skip to content": "Langsung ke konten",
    "Home": "Beranda",
    "Our Network": "Jaringan Kami",
    "Resources": "Sumber Daya",
    "Applications": "Aplikasi",
    "How We Work": "Cara Kerja Kami",
    "About BMS": "Tentang BMS",
    "Contact": "Kontak",
    "Contact Us": "Hubungi Kami",
    "Language": "Bahasa",
    "PT Berkat Muri Sejahtera, home": "PT Berkat Muri Sejahtera, beranda",
    "Toggle menu": "Buka/tutup menu",
    "Primary": "Utama",
    "Social media": "Media sosial",
    "Breadcrumb": "Jejak halaman",
    "Filter by category": "Filter berdasarkan kategori",
    "Materials": "Material",
    "Company details": "Detail perusahaan",
    "BMS network: resource sources, BMS, business opportunities": "Jaringan BMS: sumber pasokan, BMS, peluang bisnis",
    "Corn cob pathway": "Alur tongkol jagung",
    "Instagram": "Instagram",
    "LinkedIn": "LinkedIn",
    "Facebook": "Facebook",
    "BMS": "BMS",
    "PT Berkat Muri Sejahtera": "PT Berkat Muri Sejahtera",
    "PT Berkat Muri Sejahtera (BMS)": "PT Berkat Muri Sejahtera (BMS)",
    "Berkat Muri Sejahtera": "Berkat Muri Sejahtera",
    "Jakarta, Indonesia": "Jakarta, Indonesia",
    "Indonesia": "Indonesia",
    "NIB": "NIB",
    "NIB 0807240054536": "NIB 0807240054536",
    "Kris Dwi Atmaja": "Kris Dwi Atmaja",
    "Kristian Febrianta": "Kristian Febrianta",
    "PT Berkat Muri Sejahtera · Jakarta, Indonesia": "PT Berkat Muri Sejahtera · Jakarta, Indonesia",
    "© 2025 PT Berkat Muri Sejahtera": "© 2025 PT Berkat Muri Sejahtera",

    /* Home: hero */
    "Connecting Agricultural Resources with Business Opportunities": "Menghubungkan Sumber Daya Pertanian dengan Peluang Bisnis",
    "BMS connects resources, suppliers, processors, and buyers across Indonesia to create practical sourcing opportunities.": "BMS menghubungkan sumber daya, pemasok, pengolah, dan pembeli di seluruh Indonesia untuk menciptakan peluang pengadaan yang praktis.",
    "Starting with corn cobs, agricultural commodities, and bio-based materials.": "Dimulai dari tongkol jagung, komoditas pertanian, dan bahan berbasis hayati.",
    "See how the network works": "Lihat cara kerja jaringan kami",
    "Hero image": "Gambar utama",
    "BMS hero image": "Gambar utama BMS",

    /* Home: network */
    "One Network. Multiple Opportunities.": "Satu Jaringan. Banyak Peluang.",
    "BMS sits between those who hold resources and those who need them, coordinating the steps in between.": "BMS berada di antara pihak yang memiliki sumber daya dan pihak yang membutuhkannya, mengoordinasikan setiap langkah di antaranya.",
    "Resource sources": "Sumber pasokan",
    "Farms": "Lahan pertanian",
    "Collectors": "Pengepul",
    "Plantations": "Perkebunan",
    "Suppliers": "Pemasok",
    "Agricultural businesses": "Pelaku usaha pertanian",
    "Sourcing": "Pengadaan",
    "Aggregation": "Agregasi",
    "Coordination": "Koordinasi",
    "Processing partnerships": "Kemitraan pengolahan",
    "Logistics coordination": "Koordinasi logistik",
    "Business opportunities": "Peluang bisnis",
    "Manufacturers": "Produsen",
    "Processors": "Pengolah",
    "Distributors": "Distributor",
    "Industrial buyers": "Pembeli industri",
    "Cosmetic & personal care companies": "Perusahaan kosmetik & perawatan pribadi",
    "Network image": "Gambar jaringan",
    "The BMS network of resource sources and buyers": "Jaringan BMS yang menghubungkan sumber pasokan dan pembeli",
    "For resource holders": "Untuk pemilik sumber daya",
    "If you hold agricultural or industrial resources, BMS can help explore where they fit in the supply chain and who may need them.": "Jika Anda memiliki sumber daya pertanian atau industri, BMS dapat membantu menjajaki posisinya dalam rantai pasok dan siapa yang mungkin membutuhkannya.",
    "For buyers": "Untuk pembeli",
    "If you have a material requirement, BMS can help explore sourcing options and coordinate suppliers and processing partners.": "Jika Anda memiliki kebutuhan material, BMS dapat membantu menjajaki opsi pengadaan serta mengoordinasikan pemasok dan mitra pengolahan.",

    /* Home: corn focus */
    "Current focus": "Fokus saat ini",
    "Corn cobs are collected through collectors, plantations and logistics partners. Through processing partners they are milled and sieved into granules and powder. Formats and particle sizes are discussed according to each buyer's requirements.": "Tongkol jagung dikumpulkan melalui pengepul, perkebunan, dan mitra logistik. Melalui mitra pengolahan, tongkol jagung digiling dan diayak menjadi granul dan bubuk. Format dan ukuran partikel dibahas sesuai kebutuhan masing-masing pembeli.",
    "Corn cobs": "Tongkol jagung",
    "Collect": "Kumpulkan",
    "Collectors, plantations, logistics partners": "Pengepul, perkebunan, mitra logistik",
    "Mill & sieve": "Giling & ayak",
    "Via processing partners": "Melalui mitra pengolahan",
    "Granules & powder": "Granul & bubuk",
    "Formats and sizes per buyer requirements": "Format dan ukuran sesuai kebutuhan pembeli",

    /* Home: applications */
    "Where processed corn cobs may fit": "Penggunaan tongkol jagung olahan",
    "Suitability depends on processing, specification and the buyer's own testing.": "Kesesuaian bergantung pada pengolahan, spesifikasi, dan pengujian oleh pembeli sendiri.",
    "Cosmetic and personal care application": "Aplikasi kosmetik dan perawatan pribadi",
    "Industrial application": "Aplikasi industri",
    "Application image": "Gambar aplikasi",
    "Cosmetic & personal care": "Kosmetik & perawatan pribadi",
    "Appropriately processed corn cob powder can serve as a physical exfoliating material in selected formulations.": "Bubuk tongkol jagung yang diolah dengan tepat dapat berfungsi sebagai bahan pengelupas (eksfoliasi) fisik pada formulasi tertentu.",
    "Industrial": "Industri",
    "Corn cob granules and powder can be used as absorbent or polishing media.": "Granul dan bubuk tongkol jagung dapat digunakan sebagai media penyerap atau pemoles.",
    "Specifications, particle sizes and suitability for a given use are discussed per buyer requirement and confirmed through the buyer's own testing.": "Spesifikasi, ukuran partikel, dan kesesuaian untuk penggunaan tertentu dibahas sesuai kebutuhan pembeli dan dikonfirmasi melalui pengujian oleh pembeli sendiri.",

    /* Home: resource network */
    "Resource network": "Jaringan sumber daya",
    "Corn cobs lead our current work, alongside a wider network of commodities and materials.": "Tongkol jagung menjadi fokus utama kami saat ini, bersama jaringan komoditas dan material yang lebih luas.",
    "Current focus. Granules and powder, formats discussed per buyer.": "Fokus saat ini. Granul dan bubuk, format dibahas sesuai pembeli.",
    "Explore Material →": "Jelajahi Material →",
    "Agricultural commodities": "Komoditas pertanian",
    "Bio-based materials": "Bahan berbasis hayati",
    "Other relevant industrial materials": "Material industri relevan lainnya",
    "Browse the materials catalogue": "Telusuri katalog material",

    /* Home: value */
    "How BMS creates value": "Cara BMS Menciptakan Nilai",
    "Source. Aggregate. Process. Connect. Deliver.": "Cari. Himpun. Olah. Hubungkan. Antar.",
    "Source": "Cari",
    "Find resources through the network.": "Temukan sumber daya melalui jaringan.",
    "Aggregate": "Himpun",
    "Bring supply together.": "Satukan pasokan.",
    "Process": "Olah",
    "Work with processing partners.": "Bekerja sama dengan mitra pengolahan.",
    "Connect": "Hubungkan",
    "Match supply with demand.": "Pertemukan pasokan dengan permintaan.",
    "Deliver": "Antar",
    "Coordinate logistics.": "Koordinasikan logistik.",

    /* Home: chain */
    "Resource to value": "Dari Sumber Daya ke Nilai",
    "Turning Available Resources Into Commercial Opportunities": "Mengubah Sumber Daya yang Tersedia Menjadi Peluang Komersial",
    "Resource": "Sumber Daya",
    "Processing": "Pengolahan",
    "Application": "Aplikasi",
    "Commercial Value": "Nilai Komersial",

    /* Home: how we work */
    "A practical process": "Proses yang praktis",
    "Understand Requirements": "Memahami Kebutuhan",
    "Explore Sourcing Options": "Menjajaki Opsi Pengadaan",
    "Coordinate Suppliers & Processors": "Mengoordinasikan Pemasok & Pengolah",
    "Discuss Commercial Arrangements": "Membahas Kesepakatan Komersial",
    "Considerations": "Pertimbangan",
    "Material": "Material",
    "Packing": "Pengemasan",
    "Shipping": "Pengiriman",

    /* Home: about */
    "An Indonesian trading company established in 2025 and based in Jakarta, focused on sourcing, aggregation and distribution. BMS is building a growing network across Indonesia and developing toward Asia-Pacific and international opportunities.": "Perusahaan perdagangan Indonesia yang didirikan pada 2025 dan berbasis di Jakarta, berfokus pada pengadaan, agregasi, dan distribusi. BMS sedang membangun jaringan yang terus berkembang di seluruh Indonesia dan bergerak menuju peluang di Asia-Pasifik serta internasional.",
    "Company": "Perusahaan",
    "Type": "Jenis",
    "Indonesian trading company": "Perusahaan perdagangan Indonesia",
    "Established": "Berdiri",
    "Based in": "Berkantor di",
    "Focus": "Fokus",
    "Sourcing, aggregation, distribution": "Pengadaan, agregasi, distribusi",

    /* Home: markets */
    "Markets": "Pasar",
    "Growing step by step": "Tumbuh selangkah demi selangkah",
    "Home network": "Jaringan utama",
    "Asia-Pacific": "Asia-Pasifik",
    "Developing": "Sedang dikembangkan",
    "International Opportunities": "Peluang Internasional",
    "Growth ahead": "Pertumbuhan ke depan",

    /* CTA (home, catalogue, contact) */
    "What's Moving Through Your Network?": "Apa yang Mengalir di Jaringan Anda?",
    "Whether you have resources to offer or a material requirement to fulfil, BMS can help explore the connection.": "Baik Anda memiliki sumber daya untuk ditawarkan maupun kebutuhan material yang perlu dipenuhi, BMS dapat membantu menjajaki koneksinya.",

    /* Contact page */
    "Name": "Nama",
    "Company": "Perusahaan",
    "(optional)": "(opsional)",
    "Phone or email": "Telepon atau email",
    "Message": "Pesan",
    "Please fill in your name, contact details and message.": "Mohon isi nama, kontak, dan pesan Anda.",
    "Send via WhatsApp": "Kirim via WhatsApp",
    "Sending opens WhatsApp with your message ready to send to our team.": "Mengirim akan membuka WhatsApp dengan pesan Anda yang siap dikirim ke tim kami.",
    "Get in touch with BMS to explore a sourcing connection.": "Hubungi BMS untuk menjajaki koneksi pengadaan.",
    "Contact PT Berkat Muri Sejahtera (BMS), Jakarta, Indonesia, about resources, material requirements or sourcing.": "Hubungi PT Berkat Muri Sejahtera (BMS), Jakarta, Indonesia, mengenai sumber daya, kebutuhan material, atau pengadaan.",

    /* Catalogue page */
    "Materials Catalogue": "Katalog Material",
    "Corn cobs lead our current work, alongside a wider network of commodities and materials. Select a material to see more.": "Tongkol jagung menjadi fokus utama kami saat ini, bersama jaringan komoditas dan material yang lebih luas. Pilih material untuk melihat selengkapnya.",
    "All": "Semua",
    "Current focus. Collected through collectors, plantations and logistics partners, then milled and sieved into granules and powder via processing partners.": "Fokus saat ini. Dikumpulkan melalui pengepul, perkebunan, dan mitra logistik, lalu digiling dan diayak menjadi granul dan bubuk melalui mitra pengolahan.",
    "The BMS network also covers other relevant industrial materials. If you do not see what you need, get in touch.": "Jaringan BMS juga mencakup material industri relevan lainnya. Jika Anda tidak menemukan yang Anda butuhkan, silakan hubungi kami.",
    "Browse the PT Berkat Muri Sejahtera (BMS) materials catalogue: corn cobs, agricultural commodities, bio-based materials and industrial resources.": "Telusuri katalog material PT Berkat Muri Sejahtera (BMS): tongkol jagung, komoditas pertanian, bahan berbasis hayati, dan sumber daya industri.",

    /* Home: meta */
    "PT Berkat Muri Sejahtera (BMS) is a Jakarta-based Indonesian trading company connecting resources, suppliers, processors and buyers. Starting with corn cobs, agricultural commodities and bio-based materials.": "PT Berkat Muri Sejahtera (BMS) adalah perusahaan perdagangan Indonesia yang berbasis di Jakarta, menghubungkan sumber daya, pemasok, pengolah, dan pembeli. Dimulai dari tongkol jagung, komoditas pertanian, dan bahan berbasis hayati.",
    "Sourcing, aggregation and distribution across Indonesia. Starting with corn cobs, agricultural commodities and bio-based materials.": "Pengadaan, agregasi, dan distribusi di seluruh Indonesia. Dimulai dari tongkol jagung, komoditas pertanian, dan bahan berbasis hayati.",
    "Connecting agricultural resources with business opportunities.": "Menghubungkan sumber daya pertanian dengan peluang bisnis.",

    /* Material pages: shared */
    "Overview": "Gambaran Umum",
    "Potential Uses": "Potensi Penggunaan",
    "How It Can Help": "Bagaimana Kami Dapat Membantu",
    "Turning an available resource into a commercial opportunity": "Mengubah sumber daya yang tersedia menjadi peluang komersial",
    "Connect resource holders with buyers": "Menghubungkan pemilik sumber daya dengan pembeli",
    "Explore sourcing options": "Menjajaki opsi pengadaan",
    "Support processing and application": "Mendukung pengolahan dan aplikasi",
    "BMS works with processing partners and coordinates logistics. Material, processing, packing and shipping are considered as part of each enquiry.": "BMS bekerja sama dengan mitra pengolahan dan mengoordinasikan logistik. Material, pengolahan, pengemasan, dan pengiriman dipertimbangkan dalam setiap permintaan.",
    "Turn resources into commercial value": "Mengubah sumber daya menjadi nilai komersial",
    "BMS looks at how an available resource can move from processing to application and toward commercial value.": "BMS melihat bagaimana sumber daya yang tersedia dapat bergerak dari pengolahan ke aplikasi hingga menjadi nilai komersial.",
    "Potential Applications": "Potensi Aplikasi",
    "Application areas": "Bidang aplikasi",
    "Supply / Resource Information": "Informasi Pasokan / Sumber Daya",
    "What we can share today": "Yang dapat kami bagikan saat ini",
    "Details are added here as they are confirmed. Items marked “Information coming soon” are not yet available.": "Detail ditambahkan di sini setelah dikonfirmasi. Item yang bertanda “Informasi segera hadir” belum tersedia.",
    "Information coming soon": "Informasi segera hadir",
    "Category": "Kategori",
    "Form": "Bentuk",
    "Specifications": "Spesifikasi",
    "Packing & shipping": "Pengemasan & pengiriman",
    "Volumes & availability": "Volume & ketersediaan",
    "Considered as part of each enquiry": "Dipertimbangkan dalam setiap permintaan",
    "Discuss This Material": "Diskusikan Material Ini",
    "I Need This Material": "Saya Butuh Material Ini",
    "Have This Resource?": "Punya Sumber Daya Ini?",
    "← All materials": "← Semua material",
    "← Back to the materials catalogue": "← Kembali ke katalog material",

    /* Corn Cobs page */
    "Corn cobs are BMS's current focus: collected through collectors, plantations and logistics partners, then milled and sieved into granules and powder through processing partners.": "Tongkol jagung adalah fokus BMS saat ini: dikumpulkan melalui pengepul, perkebunan, dan mitra logistik, lalu digiling dan diayak menjadi granul dan bubuk melalui mitra pengolahan.",
    "Corn cobs are BMS's current focus material. They are collected through collectors, plantations and logistics partners.": "Tongkol jagung adalah material fokus BMS saat ini. Tongkol jagung dikumpulkan melalui pengepul, perkebunan, dan mitra logistik.",
    "Through processing partners, they are milled and sieved into granules and powder. Formats and particle sizes are discussed according to each buyer's requirements.": "Melalui mitra pengolahan, tongkol jagung digiling dan diayak menjadi granul dan bubuk. Format dan ukuran partikel dibahas sesuai kebutuhan masing-masing pembeli.",
    "Cosmetics / personal care": "Kosmetik / perawatan pribadi",
    "Industrial applications": "Aplikasi industri",
    "Granules and powder": "Granul dan bubuk",
    "Collectors, plantations and logistics partners": "Pengepul, perkebunan, dan mitra logistik",
    "Milled and sieved via processing partners": "Digiling dan diayak melalui mitra pengolahan",
    "Formats & particle sizes": "Format & ukuran partikel",
    "Discussed per buyer requirement": "Dibahas sesuai kebutuhan pembeli"
  };

  /* ---------- Repeated sentences on material pages ---------- */
  var M = '(Corn Cobs|Candlenuts|Cocoa|Rubber Seed Oil|Rubber Seeds|Palm-Based Derivatives|CNSL|UCO|POME|Petrochemicals)';
  function mn(name) { return MAT[String(name).toLowerCase()] || name; }
  function cat(name) { return CAT[String(name).toLowerCase()] || String(name).toLowerCase(); }
  function re(s) { return new RegExp('^' + s + '$', 'i'); }

  var PATTERNS = [
    [re('Explore ' + M), function (m) { return 'Jelajahi ' + mn(m[1]); }],
    [re(M + ' image'), function (m) { return 'Gambar ' + mn(m[1]); }],
    [re('What is ' + M + '\\?'), function (m) { return 'Apa itu ' + mn(m[1]) + '?'; }],
    [re('Where ' + M + ' may be used'), function (m) { return 'Di mana ' + mn(m[1]) + ' dapat digunakan'; }],
    [re('Interested in ' + M + '\\?'), function (m) { return 'Tertarik dengan ' + mn(m[1]) + '?'; }],
    [re('\\/ ' + M), function (m) { return '/ ' + mn(m[1]); }],
    [re(M + ': (.+)'), function (m) { return mn(m[1]) + ': ' + (lookup(m[2]) || m[2]); }],
    [re(M + ' is listed in the BMS resource network under (.+?)\\. Detailed information about this material is coming soon\\.'),
      function (m) { return mn(m[1]) + ' terdaftar dalam jaringan sumber daya BMS pada kategori ' + cat(m[2]) + '. Informasi rinci tentang material ini segera hadir.'; }],
    [re(M + ' is part of the BMS network of (.+?)\\. Detailed information coming soon\\.'),
      function (m) { return mn(m[1]) + ' merupakan bagian dari jaringan ' + cat(m[2]) + ' BMS. Informasi rinci segera hadir.'; }],
    [re('A full description of ' + M + ' will be added here\\. In the meantime, BMS can discuss this material directly\\.'),
      function (m) { return 'Deskripsi lengkap ' + mn(m[1]) + ' akan ditambahkan di sini. Sementara itu, BMS dapat membahas material ini secara langsung.'; }],
    [re('Potential uses for ' + M + ' will be listed here once confirmed\\.'),
      function (m) { return 'Potensi penggunaan ' + mn(m[1]) + ' akan dicantumkan di sini setelah dikonfirmasi.'; }],
    [re('Application details for ' + M + ' will be added here once confirmed\\.'),
      function (m) { return 'Detail aplikasi ' + mn(m[1]) + ' akan ditambahkan di sini setelah dikonfirmasi.'; }],
    [re('If you hold ' + M + ', BMS can help explore where it fits in the supply chain and who may need it\\.'),
      function (m) { return 'Jika Anda memiliki ' + mn(m[1]) + ', BMS dapat membantu menjajaki posisinya dalam rantai pasok dan siapa yang mungkin membutuhkannya.'; }],
    [re('If you have a requirement for ' + M + ', BMS can help explore sourcing options and coordinate suppliers and processing partners\\.'),
      function (m) { return 'Jika Anda membutuhkan ' + mn(m[1]) + ', BMS dapat membantu menjajaki opsi pengadaan serta mengoordinasikan pemasok dan mitra pengolahan.'; }],
    [re('Whether you have ' + M + ' to offer or a requirement to fulfil, BMS can help explore the connection\\.'),
      function (m) { return 'Baik Anda memiliki ' + mn(m[1]) + ' untuk ditawarkan maupun memiliki kebutuhan yang perlu dipenuhi, BMS dapat membantu menjajaki koneksinya.'; }]
  ];

  /* ---------- Lookup ---------- */
  var has = Object.prototype.hasOwnProperty;
  function lookup(norm) {
    if (has.call(DICT, norm)) { return DICT[norm]; }
    var low = norm.toLowerCase();
    if (has.call(MAT, low)) { return MAT[low]; }
    for (var i = 0; i < PATTERNS.length; i++) {
      var m = PATTERNS[i][0].exec(norm);
      if (m) { return PATTERNS[i][1](m); }
    }
    return null;
  }

  // Translate a string, keeping its leading/trailing whitespace. Returns null when no translation exists.
  function tr(str) {
    var parts = /^(\s*)([\s\S]*?)(\s*)$/.exec(str);
    var norm = parts[2].replace(/\s+/g, ' ');
    if (!/[A-Za-z]/.test(norm)) { return null; }
    var out = lookup(norm);
    return out === null ? null : parts[1] + out + parts[3];
  }

  // Titles / meta: "Left | PT Berkat Muri Sejahtera (BMS)" is translated part by part.
  function trMeta(str) {
    var whole = tr(str);
    if (whole !== null) { return whole; }
    if (str.indexOf(' | ') === -1) { return null; }
    var any = false;
    var out = str.split(' | ').map(function (p) {
      var t = tr(p);
      if (t !== null) { any = true; return t; }
      return p;
    }).join(' | ');
    return any ? out : null;
  }

  /* ---------- Language state ---------- */
  function readSaved() {
    try {
      var q = new URLSearchParams(window.location.search).get('lang');
      if (q && LANGS.indexOf(q) !== -1) {
        try { localStorage.setItem(KEY, q); } catch (e) {}
        return q;
      }
    } catch (e) {}
    try {
      var s = localStorage.getItem(KEY);
      if (s && LANGS.indexOf(s) !== -1) { return s; }
    } catch (e) {}
    return 'en';
  }

  var current = 'en';
  var textItems = [];   // { node, orig }
  var attrItems = [];   // { el, attr, orig, meta }
  var titleOrig = null;
  var switchEl = null;

  function buildSwitch() {
    var nav = document.getElementById('nav');
    if (!nav || nav.querySelector('.lang-switch')) { return; }
    switchEl = document.createElement('div');
    switchEl.className = 'lang-switch';
    switchEl.setAttribute('role', 'group');
    switchEl.setAttribute('aria-label', 'Language');
    [['en', 'EN', 'English'], ['id', 'ID', 'Bahasa Indonesia']].forEach(function (l) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-lang', l[0]);
      b.setAttribute('lang', l[0]);
      b.setAttribute('aria-label', l[2]);
      b.setAttribute('title', l[2]);
      b.textContent = l[1];
      b.addEventListener('click', function () { setLang(l[0]); });
      switchEl.appendChild(b);
    });
    nav.insertBefore(switchEl, nav.querySelector('.nav-cta') || null);
  }

  function collect() {
    textItems = [];
    attrItems = [];
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var n;
    while ((n = walker.nextNode())) {
      var p = n.parentNode && n.parentNode.nodeName;
      if (p === 'SCRIPT' || p === 'STYLE' || p === 'NOSCRIPT') { continue; }
      if (n.parentNode.closest && n.parentNode.closest('.lang-switch')) { continue; } // EN / ID labels stay as they are
      if (/[A-Za-z]/.test(n.nodeValue)) { textItems.push({ node: n, orig: n.nodeValue }); }
    }
    document.querySelectorAll('[aria-label],[alt],[title],[placeholder]').forEach(function (el) {
      if (el.closest && el.closest('.lang-switch') && el !== switchEl) { return; } // buttons keep fixed labels
      ['aria-label', 'alt', 'title', 'placeholder'].forEach(function (a) {
        if (el.hasAttribute(a) && /[A-Za-z]/.test(el.getAttribute(a))) {
          attrItems.push({ el: el, attr: a, orig: el.getAttribute(a), meta: false });
        }
      });
    });
    document.querySelectorAll('meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[name="twitter:title"],meta[name="twitter:description"]').forEach(function (el) {
      attrItems.push({ el: el, attr: 'content', orig: el.getAttribute('content') || '', meta: true });
    });
    titleOrig = document.title;
  }

  function apply(lang) {
    var id = lang === 'id';
    textItems.forEach(function (it) {
      var out = id ? tr(it.orig) : null;
      it.node.nodeValue = out !== null ? out : it.orig;
    });
    attrItems.forEach(function (it) {
      var out = id ? (it.meta ? trMeta(it.orig) : tr(it.orig)) : null;
      it.el.setAttribute(it.attr, out !== null ? out : it.orig);
    });
    var t = id ? trMeta(titleOrig) : null;
    document.title = t !== null ? t : titleOrig;
  }

  function updateButtons() {
    if (!switchEl) { return; }
    switchEl.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === current));
    });
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) { return; }
    current = lang;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    document.documentElement.setAttribute('lang', lang);
    apply(lang);
    updateButtons();
    try { document.dispatchEvent(new CustomEvent('bms:langchange', { detail: { lang: lang } })); } catch (e) {}
    if (lang === 'id' && /[?&]i18ndebug/.test(window.location.search) && window.console) {
      var miss = missing();
      console.warn('[i18n] ' + miss.length + ' untranslated string(s):', miss);
    }
  }

  // Strings on this page that have no Indonesian translation yet.
  function missing() {
    var seen = {}, out = [];
    textItems.forEach(function (it) {
      var k = it.orig.replace(/\s+/g, ' ').trim();
      if (tr(it.orig) === null && !seen[k]) { seen[k] = 1; out.push(k); }
    });
    attrItems.forEach(function (it) {
      var k = it.orig.replace(/\s+/g, ' ').trim();
      var t = it.meta ? trMeta(it.orig) : tr(it.orig);
      if (t === null && !seen[k]) { seen[k] = 1; out.push(k); }
    });
    if (trMeta(titleOrig) === null) { out.push(titleOrig); }
    return out;
  }

  window.BMS_I18N = {
    get lang() { return current; },
    setLang: setLang,
    t: function (s) { var r = tr(String(s)); return r === null ? s : r; },
    material: function (name) { return mn(name); },
    missing: missing
  };

  function init() {
    buildSwitch();
    collect();
    current = readSaved();
    document.documentElement.setAttribute('lang', current);
    if (current !== 'en') { apply(current); }
    updateButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
