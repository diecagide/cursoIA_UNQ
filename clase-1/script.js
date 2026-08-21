/* =========================================================================
   Navegación de la clase: no hace falta editar este archivo.
   - Abre/cierra el menú en celular
   - Marca en el menú la sección que se está leyendo
   - Cierra el menú al hacer click en un link (en celular)
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {
  var nav = document.getElementById('siteNav');
  var toggle = document.getElementById('navToggle');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? '✕' : '☰';
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.innerWidth <= 720) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      }
    });
  }

  var sections = document.querySelectorAll('section.block[id], h3[id]');
  var links = document.querySelectorAll('.site-nav a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length && links.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          links.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }
});
