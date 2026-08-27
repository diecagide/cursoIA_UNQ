/* =========================================================================
   Este archivo NO se edita para cambiar texto — el texto vive en
   contenido.txt. Acá solo hay lógica: cargar ese texto, armar el menú
   de navegación y el scroll. No hace falta tocar nada de este archivo.

   SISTEMA DE IMÁGENES (una sola forma de hacerlo, para todas las clases):
   Dentro de cualquier bloque de texto de contenido.txt, escribí en su
   propio párrafo (con línea en blanco antes y después):

     ![texto alternativo opcional](images/archivo.jpg)

   Eso alcanza para que aparezca la imagen (con su recuadro de "pendiente"
   mientras no subas el archivo). Si además querés un epígrafe debajo
   (con qué modelo se generó, el prompt, etc.), escribilo pegado en el o
   los renglones siguientes, SIN dejar línea en blanco en el medio:

     ![texto alternativo opcional](images/archivo.jpg)
     Modelo: el que hayas usado
     Prompt: el que hayas usado, con comillas, paréntesis o lo que haga
     falta — no hay que preocuparse por caracteres especiales acá.

   Ver más detalle en el encabezado de contenido.txt y en el README.
   ========================================================================= */

/* ---------- 1. Cargar y aplicar el texto de contenido.txt ---------- */

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, '&quot;');
}

// Convierte un texto plano con **negrita**, *cursiva*, [link](url),
// ![imagen suelta dentro de una oración](ruta) y saltos de línea sueltos
// (Enter simple) a HTML.
//
// Nota: esta función se usa para texto normal. Cuando una imagen ocupa
// un párrafo ENTERO (el caso normal para agregar una imagen), no pasa
// por acá — la maneja renderImageBlock() más abajo, que además arma el
// recuadro de "pendiente" y el epígrafe opcional.
function renderInline(text) {
  var html = escapeHtml(text);
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img class="content-img" src="$2" alt="$1" loading="lazy">');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // Un solo Enter (sin línea en blanco) se muestra como salto de línea,
  // no como continuación pegada del mismo renglón.
  html = html.replace(/\n/g, '<br>');
  return html;
}

// Arma el bloque completo de una imagen: recuadro con "pendiente" mientras
// no subiste el archivo (igual que el resto de las imágenes de la clase),
// y el epígrafe opcional debajo (si hay texto después de la línea de la
// imagen). Mismo look en todas las clases.
function renderImageBlock(alt, src, caption) {
  var safeAlt = escapeAttr(alt);
  var safeSrc = escapeAttr(src);
  // Imagen y rótulo van dentro de un mismo contenedor (.img-block) para que
  // el espacio entre ambos sea siempre el mismo, sin depender de que los
  // márgenes de dos elementos separados "colapsen" bien.
  var html = '<div class="img-block"><div class="img-placeholder">' +
    '<img src="' + safeSrc + '" alt="' + safeAlt + '" loading="lazy" ' +
    'onerror="this.style.display=\'none\'; this.closest(\'.img-placeholder\').classList.remove(\'has-image\');" ' +
    'onload="this.closest(\'.img-placeholder\').classList.add(\'has-image\');">' +
    '<span class="img-placeholder__icon">🖼️</span>' +
    '<p class="img-placeholder__hint">Se completa reemplazando ' + escapeHtml(src) + '</p>' +
    '</div>';
  if (caption && caption.trim()) {
    html += '<p class="img-caption">' + renderInline(caption.trim()) + '</p>';
  }
  html += '</div>';
  return html;
}

// Si un párrafo entero de contenido.txt arranca con una imagen (con o sin
// epígrafe en los renglones siguientes), esta expresión lo detecta y separa
// la ruta de la imagen del texto del epígrafe.
var SOLO_IMAGE_RE = /^!\[([^\]]*)\]\(([^)\s]+)\)[ \t]*\n?([\s\S]*)$/;

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
      // Un solo párrafo esperado; si por error (o a propósito) hay más de
      // uno separado por línea en blanco, se muestran como párrafos
      // distintos (salto de línea doble) en vez de pegarse en un renglón.
      el.innerHTML = paragraphs.map(renderInline).join('<br><br>');
    } else {
      el.innerHTML = '';
      paragraphs.forEach(function (p, i) {
        var soloImage = p.match(SOLO_IMAGE_RE);
        if (soloImage) {
          el.insertAdjacentHTML('beforeend', renderImageBlock(soloImage[1], soloImage[2], soloImage[3]));
        } else {
          var pEl = document.createElement('p');
          if (i === 0 && el.getAttribute('data-lead') === 'true') {
            pEl.className = 'lead';
          }
          pEl.innerHTML = renderInline(p);
          el.appendChild(pEl);
        }
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

  var sections = document.querySelectorAll('section.block[id], h3[id], .highlight-box[id]');
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
