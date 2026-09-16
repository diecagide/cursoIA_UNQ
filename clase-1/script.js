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

   LISTAS CON VIÑETAS (bullets):
   Dentro de cualquier bloque de texto, si TODOS los renglones de un
   párrafo (separado por línea en blanco del resto) arrancan con
   "- " (guion + espacio), ese párrafo se convierte en una lista con
   viñetas en vez de un párrafo corrido:

     - Primer punto de la lista.
     - Segundo punto, también puede llevar **negrita** o *cursiva*.
     - Tercer punto.

   Cada renglón (Enter simple, sin línea en blanco) es un ítem distinto
   de la lista.

   NOTA EMERGENTE (pastilla con triangulito, para biografías o definiciones
   cortas sin cortar la lectura del párrafo):
   Dentro de cualquier bloque de texto, escribí:

     ^[Mike Caulfield](Investigador estadounidense especializado en
     alfabetización digital...)

   Eso muestra "Mike Caulfield" seguido de un triangulito (▸); al tocarlo
   se despliega el texto entre paréntesis como una tarjeta emergente. El
   texto de la nota admite **negrita** y *cursiva* igual que el resto,
   pero OJO: no puede contener un paréntesis de cierre ")" — si lo
   necesitás, reformulá la frase para evitarlo.

   VIDEO DE YOUTUBE (una sola forma de hacerlo, para todas las clases):
   Dentro de cualquier bloque de texto, en su propio párrafo (con línea
   en blanco antes y después), escribí:

     @video[Título del video](https://link-que-copiaste-de-youtube)

   El link puede ser cualquiera de los que da YouTube (el de "Compartir",
   el de la barra de direcciones, o el de "Insertar") — no hace falta el
   código <iframe>, alcanza con pegar el link normal. Mientras no
   completes el título y el link, se muestra un recuadro de "pendiente"
   (como con las imágenes). Si el link no se reconoce como de YouTube, se
   avisa en el recuadro en vez de romper la página.

   Debajo de cada video se agrega automáticamente un avisito ("Si se ve
   borroso, tocá el ⚙️...") — la calidad con la que arranca un video la
   decide YouTube (según la conexión de quien mira), no esta página, y
   ya no existe una forma soportada de forzar 1080p por defecto. Esto es
   automático: no hay que escribir nada en contenido.txt para que
   aparezca.

   LIGHTBOX (agrandar una imagen al hacer clic):
   Cualquier imagen de contenido que subas (con la sintaxis de arriba)
   ya se puede agrandar con un clic — se abre en un popup sobre fondo
   oscuro, y se cierra tocando afuera, la ✕ o la tecla Escape. Es
   automático: no hay que escribir nada en contenido.txt para que
   funcione, y no aplica a los logos ni íconos chicos de la página.
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
// Aplica negrita, cursiva, notas emergentes y links sobre un texto que ya
// pasó por escapeHtml (por eso está separada de renderInline: así una nota
// emergente puede llamarse a sí misma sobre su propio contenido sin volver
// a escapar entidades ya escapadas).
function applyInlineMarks(html) {
  // Nota emergente (pastilla con triangulito): va ANTES que el link común
  // de más abajo porque comparte la misma sintaxis de corchetes + paréntesis
  // — la diferencia es el "^" pegado adelante.
  //   ^[Texto que se muestra](contenido de la nota)
  html = html.replace(/\^\[([^\]]+)\]\(([^)]+)\)/g, function (match, label, note) {
    return '<span class="note">' + label +
      '<details class="note__popover"><summary class="note__trigger" aria-label="Ver más"><span aria-hidden="true">▸</span></summary>' +
      '<div class="note__body">' + applyInlineMarks(note.trim()) + '</div></details></span>';
  });
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  return html;
}

function renderInline(text) {
  var html = escapeHtml(text);
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img class="content-img" src="$2" alt="$1" loading="lazy">');
  html = applyInlineMarks(html);
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

// Si un párrafo entero es "@video[Título](link)", esta expresión separa el
// título del link (ver documentación arriba). Título y/o link pueden venir
// vacíos: eso es lo que pasa antes de que Diego cargue el video real.
var VIDEO_RE = /^@video\[([^\]]*)\]\(([^)]*)\)\s*$/;

// Saca el ID de un video de YouTube de cualquiera de los formatos de link
// que da YouTube (compartir, barra de direcciones, insertar, shorts).
function extractYouTubeId(url) {
  var patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/watch\?[^#]*[?&]v=([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/
  ];
  for (var i = 0; i < patterns.length; i++) {
    var m = url.match(patterns[i]);
    if (m) return m[1];
  }
  return null;
}

// Arma el bloque completo de un video: el título (si hay) como
// .interactive-title y el iframe de YouTube adentro de
// .interactive-placeholder, con el mismo look que el resto de los
// recuadros "pendiente" mientras no se cargó título+link o el link no se
// reconoce.
function renderVideoBlock(title, url) {
  var safeTitle = (title || '').trim();
  var safeUrl = (url || '').trim();

  if (!safeTitle && !safeUrl) {
    return '<div class="interactive-placeholder">' +
      '<span class="interactive-placeholder__icon" aria-hidden="true">🎬</span>' +
      '<p class="interactive-placeholder__label">Video pendiente</p>' +
      '<p class="interactive-placeholder__hint">Reemplazá esta línea por @video[Título del video](link de YouTube)</p>' +
      '</div>';
  }

  var videoId = safeUrl ? extractYouTubeId(safeUrl) : null;
  if (!videoId) {
    console.warn('[contenido.txt] No se reconoce como link de YouTube: "' + safeUrl + '"');
    return '<div class="interactive-placeholder">' +
      '<span class="interactive-placeholder__icon" aria-hidden="true">⚠️</span>' +
      '<p class="interactive-placeholder__label">No se reconoce ese link de YouTube</p>' +
      '<p class="interactive-placeholder__hint">Revisá que sea un link completo, por ejemplo https://youtu.be/... o https://www.youtube.com/watch?v=...</p>' +
      '</div>';
  }

  var titleHtml = safeTitle ? '<h3 class="interactive-title">Video: ' + escapeHtml(safeTitle) + '</h3>' : '';
  var iframeTitle = escapeAttr(safeTitle || 'Video de YouTube');
  return titleHtml +
    '<div class="interactive-placeholder has-video">' +
    '<iframe src="https://www.youtube.com/embed/' + videoId + '" title="' + iframeTitle + '" ' +
    'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
    'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>' +
    '</div>' +
    '<p class="video-quality-tip">💡 Arriba a la derecha del video están los íconos de subtítulos (CC) y de configuración (⚙️). Si se ve borroso, tocá ⚙️ y elegí 1080p o la calidad más alta disponible; desde CC podés activar o desactivar los subtítulos.</p>';
}

// Si TODOS los renglones no vacíos de un párrafo empiezan con "- ", se
// arma una lista con viñetas en vez de un párrafo corrido (ver
// documentación arriba).
function isListChunk(p) {
  var lines = p.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
  return lines.length > 0 && lines.every(function (l) { return /^-[ \t]+/.test(l); });
}

function renderListBlock(p) {
  var lines = p.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
  var html = '<ul class="content-list">';
  lines.forEach(function (l) {
    html += '<li>' + renderInline(l.replace(/^-[ \t]+/, '')) + '</li>';
  });
  html += '</ul>';
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
      // Un solo párrafo esperado; si por error (o a propósito) hay más de
      // uno separado por línea en blanco, se muestran como párrafos
      // distintos (salto de línea doble) en vez de pegarse en un renglón.
      el.innerHTML = paragraphs.map(renderInline).join('<br><br>');
    } else {
      el.innerHTML = '';
      paragraphs.forEach(function (p, i) {
        var soloImage = p.match(SOLO_IMAGE_RE);
        var video = p.match(VIDEO_RE);
        if (video) {
          el.insertAdjacentHTML('beforeend', renderVideoBlock(video[1], video[2]));
        } else if (soloImage) {
          el.insertAdjacentHTML('beforeend', renderImageBlock(soloImage[1], soloImage[2], soloImage[3]));
        } else if (isListChunk(p)) {
          el.insertAdjacentHTML('beforeend', renderListBlock(p));
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

/* ---------- 3. Lightbox: agrandar imágenes de contenido al hacer clic ---------- */

function initLightbox() {
  var lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Cerrar imagen">✕</button>' +
    '<img class="lightbox__img" src="" alt="">';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector('.lightbox__img');

  function openLightbox(img) {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lightboxImg.src = '';
  }

  // Delegado en document: las imágenes de contenido.txt se insertan recién
  // después de cargar el archivo, así que todavía no existen en este punto.
  document.addEventListener('click', function (e) {
    var img = e.target.closest('.img-placeholder.has-image img, .content-img');
    if (img) {
      openLightbox(img);
      return;
    }
    // Un clic afuera de la imagen agrandada (fondo oscuro o la ✕) cierra el popup.
    if (lightbox.classList.contains('is-open') && !e.target.closest('.lightbox__img')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  loadContent();
  initLightbox();

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
