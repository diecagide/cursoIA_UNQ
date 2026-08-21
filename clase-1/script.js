/* =========================================================================
   Este archivo NO se edita para cambiar texto — el texto vive en
   contenido.txt. Acá solo hay lógica: cargar ese texto, armar el menú
   de navegación y el scroll. No hace falta tocar nada de este archivo.
   ========================================================================= */

/* ---------- 1. Cargar y aplicar el texto de contenido.txt ---------- */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Convierte un texto plano con **negrita**, *cursiva* y [link](url) a HTML.
function renderInline(text) {
  var html = escapeHtml(text);
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  return html;
}

// Parsea contenido.txt: bloques que empiezan con "## clave" seguidos de texto.
function parseContent(raw) {
  var data = {};
  var lines = raw.split(/\r?\n/);
  var currentKey = null;
  var buffer = [];

  function flush() {
    if (currentKey) {
      data[currentKey] = buffer.join('\n').trim();
    }
    buffer = [];
  }

  lines.forEach(function (line) {
    var match = line.match(/^##\s+(\S+)\s*$/);
    if (match) {
      flush();
      currentKey = match[1];
    } else if (currentKey) {
      buffer.push(line);
    }
  });
  flush();

  return data;
}

function applyContent(data) {
  document.querySelectorAll('[data-key]').forEach(function (el) {
    var key = el.getAttribute('data-key');
    var raw = data[key];
    if (raw === undefined) {
      console.warn('[contenido.txt] No se encontró la clave "' + key + '"');
      return;
    }

    var paragraphs = raw.split(/\n\s*\n+/).map(function (p) { return p.trim(); }).filter(Boolean);

    if (el.tagName === 'P') {
      // Un solo párrafo esperado; si por error hay más de uno, se unen.
      el.innerHTML = renderInline(paragraphs.join(' '));
    } else {
      el.innerHTML = '';
      paragraphs.forEach(function (p, i) {
        var pEl = document.createElement('p');
        if (i === 0 && el.getAttribute('data-lead') === 'true') {
          pEl.className = 'lead';
        }
        pEl.innerHTML = renderInline(p);
        el.appendChild(pEl);
      });
    }
  });
}

function loadContent() {
  fetch('contenido.txt')
    .then(function (res) {
      if (!res.ok) throw new Error('No se pudo cargar contenido.txt (' + res.status + ')');
      return res.text();
    })
    .then(function (raw) {
      applyContent(parseContent(raw));
    })
    .catch(function (err) {
      console.error(err);
      // Si contenido.txt no cargó (por ejemplo, abriendo el archivo local
      // sin un servidor), dejamos un aviso visible en vez de espacios vacíos.
      document.querySelectorAll('[data-key]').forEach(function (el) {
        el.textContent = '';
      });
      var firstBlock = document.querySelector('.content-inner');
      if (firstBlock && !document.getElementById('contentLoadWarning')) {
        var warning = document.createElement('p');
        warning.id = 'contentLoadWarning';
        warning.style.cssText = 'background:#fbeaea;color:#b34747;padding:14px 18px;border-radius:8px;font-size:.9rem;';
        warning.textContent = 'No se pudo cargar contenido.txt. Si estás viendo este archivo abriéndolo directo desde tu computadora, esto es esperable: subilo a GitHub Pages para verlo completo.';
        firstBlock.insertBefore(warning, firstBlock.firstChild);
      }
    });
}

/* ---------- 2. Menú: abrir/cerrar en celular + sección activa ---------- */

document.addEventListener('DOMContentLoaded', function () {
  loadContent();

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
