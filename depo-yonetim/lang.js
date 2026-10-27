// Türkçe / English seçimi. Tarayıcı dili Türkçe ise TR, değilse EN açılır; ?lang=tr / ?lang=en ile zorlanabilir.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var param = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('dy_lang'); } catch (e) {}
  var nav = (navigator.language || 'en').toLowerCase();
  var lang = param || saved || (nav.indexOf('tr') === 0 ? 'tr' : 'en');
  if (lang !== 'tr' && lang !== 'en') lang = 'en';

  function apply(l) {
    root.classList.remove('show-tr', 'show-en');
    root.classList.add('show-' + l);
    root.setAttribute('lang', l);
    var t = document.querySelector('[data-title-' + l + ']');
    if (t) document.title = t.getAttribute('data-title-' + l);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false');
    });
    try { localStorage.setItem('dy_lang', l); } catch (e) {}
  }
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.getAttribute('data-lang')); });
    });
    apply(lang);
  });
})();
