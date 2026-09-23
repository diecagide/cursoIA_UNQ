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

   CARRUSEL DE IMÁGENES (varias imágenes en fila, con flechas):
   Dentro de una clave que uses solo para esto, escribí "@carousel" en
   su propio renglón, y debajo, una imagen por bloque (misma sintaxis
   de siempre, con epígrafe opcional pegado debajo si querés):

     @carousel
     ![texto alternativo](images/foto1.jpg)
     Epígrafe opcional de la primera foto

     ![texto alternativo](images/foto2.jpg)
     Epígrafe opcional de la segunda foto

     ![texto alternativo](images/foto3.jpg)

   Podés agregar tantas imágenes como quieras (o sacar alguna) siguiendo
   el mismo patrón, con una línea en blanco entre cada una — no hace
   falta tocar ningún otro archivo. Con una sola imagen no aparecen
   flechas ni puntitos (no hace falta navegar). Al hacer clic en
   cualquier imagen del carrusel, se agranda igual que cualquier otra
   imagen (ver LIGHTBOX arriba), y ahí también aparecen flechas para
   pasar a la imagen anterior o siguiente del mismo carrusel sin cerrar
   el popup.

   SUMAR FOTOS A UN CARRUSEL YA ARMADO, SIN TOCAR CONTENIDO.TXT:
   Si la última foto de un carrusel se llama, por ejemplo,
   "referencias6.jpg", alcanza con subir a la carpeta images/ un archivo
   llamado "referencias7.jpg" (mismo nombre base, siguiente número
   seguido) — la página lo detecta sola al cargar y lo agrega como una
   foto más al final del carrusel, con flechas y puntito nuevos incluidos.
   Podés seguir sumando "referencias8.jpg", "referencias9.jpg", etc., de
   a una por vez, siempre que sigan el mismo número correlativo. Ojo: una
   foto agregada así NO tiene epígrafe (Modelo/Prompt) propio, porque ese
   texto vive en contenido.txt — si más adelante le querés poner epígrafe,
   agregala como una imagen más dentro de esa clave en contenido.txt (con
   su epígrafe debajo, como cualquier otra) y a partir de ahí la
   auto-detección sigue probando el número siguiente a esa.

   BOTÓN "VER PROMPT Y MODELO" DEBAJO DE CADA IMAGEN:
   Si una imagen tiene epígrafe, aparece un botón chico debajo para
   mostrarlo u ocultarlo — arranca oculto, así la página no se ve tan
   cargada de texto técnico de entrada. Es automático, no hay que
   escribir nada en contenido.txt para que aparezca; es independiente del
   epígrafe agrandado del lightbox, que siempre se ve entero al hacer
   clic en la imagen.
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

  // Si el epígrafe arranca con "@split" en su propio renglón, es una marca
  // (no texto para mostrar) que indica que la imagen es un compuesto real
  // 50/50 de dos fotos lado a lado (ver LEEME/contenido.txt) — en el
  // lightbox, el epígrafe se muestra entonces partido en dos paneles
  // (izquierda/derecha) en vez de un solo bloque abajo. Acá solo se saca
  // la marca del texto y se guarda como atributo para que initLightbox()
  // la use.
  var splitCaption = false;
  if (caption) {
    var trimmed = caption.replace(/^\s+/, '');
    if (/^@split\s*(\n|$)/.test(trimmed)) {
      splitCaption = true;
      caption = trimmed.replace(/^@split\s*\n?/, '');
    }
  }

  // Imagen y rótulo van dentro de un mismo contenedor (.img-block) para que
  // el espacio entre ambos sea siempre el mismo, sin depender de que los
  // márgenes de dos elementos separados "colapsen" bien.
  var html = '<div class="img-block"' + (splitCaption ? ' data-split-caption="true"' : '') + '><div class="img-placeholder">' +
    '<img src="' + safeSrc + '" alt="' + safeAlt + '" loading="lazy" ' +
    'onerror="this.style.display=\'none\'; this.closest(\'.img-placeholder\').classList.remove(\'has-image\');" ' +
    'onload="this.closest(\'.img-placeholder\').classList.add(\'has-image\');">' +
    '<span class="img-placeholder__icon">🖼️</span>' +
    '<p class="img-placeholder__hint">Se completa reemplazando ' + escapeHtml(src) + '</p>' +
    '</div>';
  if (caption && caption.trim()) {
    // El epígrafe arranca oculto (atributo "hidden"): cada imagen tiene su
    // propio botón chico para mostrarlo u ocultarlo, sin afectar a las
    // demás imágenes de la página ni hacer falta agrandar la imagen (ver
    // el listener de ".caption-toggle-inline" en initInlineCaptionToggles()).
    html += '<button type="button" class="caption-toggle-inline" aria-expanded="false">Ver prompt y modelo</button>' +
      '<p class="img-caption" hidden>' + renderInline(caption.trim()) + '</p>';
  }
  html += '</div>';
  return html;
}

// Si un párrafo entero de contenido.txt arranca con una imagen (con o sin
// epígrafe en los renglones siguientes), esta expresión lo detecta y separa
// la ruta de la imagen del texto del epígrafe.
var SOLO_IMAGE_RE = /^!\[([^\]]*)\]\(([^)\s]+)\)[ \t]*\n?([\s\S]*)$/;

// Marca que indica que una clave entera (todos sus párrafos, uno por
// imagen) se arma como carrusel en vez de imágenes sueltas en fila. Ver
// documentación "CARRUSEL DE IMÁGENES" más arriba.
var CAROUSEL_MARKER = '@carousel';
var carouselAutoId = 0;

// Arma el carrusel completo: una fila de imágenes (cada una con el mismo
// tratamiento de "pendiente"/epígrafe que renderImageBlock), flechas para
// pasar de una a otra y puntitos de navegación directa. Si solo hay una
// imagen, no tiene sentido mostrar flechas ni puntitos — se omiten.
function renderCarousel(slideParagraphs) {
  carouselAutoId += 1;
  var id = 'carousel-' + carouselAutoId;

  var slidesHtml = '';
  var count = 0;
  slideParagraphs.forEach(function (p) {
    var m = p.match(SOLO_IMAGE_RE);
    if (!m) return; // párrafo que no es una imagen: se ignora dentro de un carrusel
    count++;
    slidesHtml += '<div class="carousel__slide">' + renderImageBlock(m[1], m[2], m[3]) + '</div>';
  });

  var html = '<div class="carousel" id="' + id + '">' +
    '<div class="carousel__viewport"><div class="carousel__track">' + slidesHtml + '</div></div>';

  if (count > 1) {
    html += '<button class="carousel__arrow carousel__arrow--prev" type="button" aria-label="Imagen anterior">' +
      '<span aria-hidden="true">‹</span></button>' +
      '<button class="carousel__arrow carousel__arrow--next" type="button" aria-label="Imagen siguiente">' +
      '<span aria-hidden="true">›</span></button>' +
      '<div class="carousel__dots">';
    for (var i = 0; i < count; i++) {
      html += '<button class="carousel__dot' + (i === 0 ? ' is-active' : '') + '" type="button" ' +
        'data-index="' + i + '" aria-label="Ir a la imagen ' + (i + 1) + '"></button>';
    }
    html += '</div>';
  }

  html += '</div>';
  return html;
}

// ---------- Auto-extensión de carruseles: fotos nuevas con sufijo
// numérico correlativo, SIN tocar contenido.txt ----------
//
// Si un carrusel ya termina, por ejemplo, en "...referencias6.jpg", esta
// función prueba automáticamente si también existe "...referencias7.jpg"
// subida a la carpeta images/ (aunque contenido.txt no la mencione) y, si
// existe, la agrega como una foto más al final del carrusel — sin
// epígrafe propio, porque contenido.txt no tiene ese texto. Sigue
// probando 8, 9, etc. hasta la primera que no exista. Sirve para sumar
// fotos a un carrusel ya armado con solo subir el archivo con el próximo
// número seguido a la carpeta images/, sin editar contenido.txt.
var AUTO_EXTEND_MAX = 15; // tope de fotos nuevas a probar por carrusel, por las dudas

// A partir de la ruta de la última foto de un carrusel ("images/algo6.jpg"),
// calcula la ruta de la siguiente ("images/algo7.jpg"). Si esa última foto
// no tiene ningún número al final (es la primera del carrusel, sin
// sufijo), asume que la siguiente sería la "2" — mismo criterio que ya se
// usa en toda la clase (primera foto sin número, de la segunda en
// adelante con 2, 3, 4...).
function nextCarouselSrc(src) {
  var m = src.match(/^(.*?)(\d+)?(\.[a-zA-Z0-9]+)$/);
  if (!m) return null;
  var base = m[1];
  var num = m[2];
  var ext = m[3];
  var nextNum = num ? (parseInt(num, 10) + 1) : 2;
  return base + nextNum + ext;
}

// Prueba si una imagen existe precargándola (no hace falta pedirle nada
// especial al servidor: si carga, existe; si tira error, no existe).
function probeImage(src) {
  return new Promise(function (resolve) {
    var probe = new Image();
    probe.onload = function () { resolve(true); };
    probe.onerror = function () { resolve(false); };
    probe.src = src;
  });
}

// Prueba, de a una, las fotos siguientes de UN carrusel y las va agregando
// mientras existan. Se para en la primera que no encuentra.
function autoExtendCarousel(carouselEl) {
  var track = carouselEl.querySelector('.carousel__track');
  if (!track) return Promise.resolve();

  function step(triesLeft) {
    if (triesLeft <= 0) return Promise.resolve();
    var slides = track.querySelectorAll('.carousel__slide');
    var lastImg = slides.length ? slides[slides.length - 1].querySelector('.img-placeholder img') : null;
    if (!lastImg) return Promise.resolve();

    var nextSrc = nextCarouselSrc(lastImg.getAttribute('src'));
    if (!nextSrc) return Promise.resolve();

    return probeImage(nextSrc).then(function (exists) {
      if (!exists) return; // no hay más fotos siguientes: se para acá
      var slideDiv = document.createElement('div');
      slideDiv.className = 'carousel__slide';
      slideDiv.innerHTML = renderImageBlock(lastImg.getAttribute('alt') || '', nextSrc, '');
      track.appendChild(slideDiv);
      return step(triesLeft - 1);
    });
  }

  return step(AUTO_EXTEND_MAX);
}

// Arma (o reconstruye) las flechas y los puntitos de un carrusel para que
// coincidan con la cantidad final de fotos — hace falta porque
// renderCarousel() solo los arma si al principio había más de una foto, y
// acá la cantidad puede haber crecido recién después, con
// autoExtendCarousel().
function ensureCarouselControls(carouselEl) {
  var count = carouselEl.querySelectorAll('.carousel__slide').length;
  if (count <= 1) return;

  if (!carouselEl.querySelector('.carousel__arrow--prev')) {
    var prevBtn = document.createElement('button');
    prevBtn.className = 'carousel__arrow carousel__arrow--prev';
    prevBtn.type = 'button';
    prevBtn.setAttribute('aria-label', 'Imagen anterior');
    prevBtn.innerHTML = '<span aria-hidden="true">‹</span>';
    carouselEl.appendChild(prevBtn);
  }
  if (!carouselEl.querySelector('.carousel__arrow--next')) {
    var nextBtn = document.createElement('button');
    nextBtn.className = 'carousel__arrow carousel__arrow--next';
    nextBtn.type = 'button';
    nextBtn.setAttribute('aria-label', 'Imagen siguiente');
    nextBtn.innerHTML = '<span aria-hidden="true">›</span>';
    carouselEl.appendChild(nextBtn);
  }

  // Se reconstruye siempre, para que la cantidad de puntitos coincida con
  // la cantidad final de fotos (haya crecido o no en esta carga).
  var oldDots = carouselEl.querySelector('.carousel__dots');
  if (oldDots) oldDots.remove();
  var dotsDiv = document.createElement('div');
  dotsDiv.className = 'carousel__dots';
  for (var i = 0; i < count; i++) {
    var dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
    dot.type = 'button';
    dot.setAttribute('data-index', i);
    dot.setAttribute('aria-label', 'Ir a la imagen ' + (i + 1));
    dotsDiv.appendChild(dot);
  }
  carouselEl.appendChild(dotsDiv);
}

// Recorre todos los carruseles de la página y les prueba fotos nuevas en
// paralelo. Se llama después de aplicar contenido.txt y antes de
// initCarousels(), para que las flechas/puntitos ya contemplen las fotos
// que se hayan sumado automáticamente.
function extendCarousels() {
  var carousels = Array.prototype.slice.call(document.querySelectorAll('.carousel'));
  return Promise.all(carousels.map(autoExtendCarousel)).then(function () {
    carousels.forEach(ensureCarouselControls);
  });
}

// Recorre cada carrusel ya insertado en la página y conecta sus flechas y
// puntitos. Se llama después de aplicar el contenido Y de autoextender los
// carruseles (los carruseles recién existen en su forma final en el DOM
// en ese momento).
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel__track');
    var slides = carousel.querySelectorAll('.carousel__slide');
    var dots = carousel.querySelectorAll('.carousel__dot');
    var prevBtn = carousel.querySelector('.carousel__arrow--prev');
    var nextBtn = carousel.querySelector('.carousel__arrow--next');
    var index = 0;

    if (slides.length <= 1) return; // nada que navegar

    function update() {
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === index); });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });
  });
}

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

    // Si la clave arranca con "@carousel", ese marcador puede venir pegado
    // a la primera imagen (sin línea en blanco en el medio) o separado con
    // una línea en blanco — los dos casos son válidos, por eso se detecta
    // sobre el texto crudo (antes de partir en párrafos) y recién después
    // se saca esa primera línea para partir el resto en imágenes.
    var isCarousel = /^@carousel[ \t]*\r?\n/.test(raw);
    var rawForParagraphs = isCarousel ? raw.replace(/^@carousel[ \t]*\r?\n/, '') : raw;
    var paragraphs = rawForParagraphs.split(/\n\s*\n+/).map(function (p) { return p.trim(); }).filter(Boolean);

    if (el.tagName === 'P') {
      // Un solo párrafo esperado; si por error (o a propósito) hay más de
      // uno separado por línea en blanco, se muestran como párrafos
      // distintos (salto de línea doble) en vez de pegarse en un renglón.
      el.innerHTML = paragraphs.map(renderInline).join('<br><br>');
    } else if (isCarousel) {
      el.innerHTML = renderCarousel(paragraphs);
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
      return extendCarousels();
    })
    .then(function () {
      initCarousels();
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
    '<button class="lightbox__arrow lightbox__arrow--prev" type="button" aria-label="Imagen anterior"><span aria-hidden="true">‹</span></button>' +
    '<button class="lightbox__arrow lightbox__arrow--next" type="button" aria-label="Imagen siguiente"><span aria-hidden="true">›</span></button>' +
    '<div class="lightbox__frame">' +
    '<img class="lightbox__img" src="" alt="">' +
    '<p class="lightbox__caption"></p>' +
    '<div class="lightbox__split-captions">' +
    '<div class="lightbox__split-panel lightbox__split-panel--left"></div>' +
    '<div class="lightbox__split-panel lightbox__split-panel--right"></div>' +
    '</div>' +
    '</div>';
  document.body.appendChild(lightbox);

  var lightboxImg = lightbox.querySelector('.lightbox__img');
  var lightboxCaption = lightbox.querySelector('.lightbox__caption');
  var lightboxSplitLeft = lightbox.querySelector('.lightbox__split-panel--left');
  var lightboxSplitRight = lightbox.querySelector('.lightbox__split-panel--right');

  // Corta el epígrafe ya renderizado (HTML) justo antes de "Imagen 2:" en
  // negrita, para repartirlo en dos paneles (izquierda/derecha) sobre cada
  // mitad de una imagen compuesta 50/50. Si no encuentra ese punto de
  // corte (formato inesperado), devuelve null y se usa el epígrafe normal.
  function splitCaptionHtml(html) {
    var marker = '<strong>Imagen 2:';
    var idx = html.indexOf(marker);
    if (idx === -1) return null;
    var left = html.slice(0, idx).replace(/<br>\s*$/, '');
    var right = html.slice(idx);
    if (!left.trim()) return null;
    return { left: left, right: right };
  }

  // Si la imagen agrandada pertenece a un carrusel, acá se guardan las
  // demás imágenes del mismo carrusel para poder pasar de una a otra sin
  // cerrar el popup (ver botones lightbox__arrow).
  var galleryImgs = [];
  var galleryIndex = -1;

  function showImage(img) {
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt || '';

    // Si la imagen tiene epígrafe (Modelo/Prompt) en su .img-block, lo
    // mostramos sobreimpreso abajo de la imagen agrandada. Si además la
    // imagen es un compuesto 50/50 marcado con @split en contenido.txt, el
    // epígrafe se reparte en dos paneles (izquierda/derecha) sobre cada
    // mitad, para que un prompt largo no tape la imagen entera.
    var block = img.closest('.img-block');
    var captionEl = block ? block.querySelector('.img-caption') : null;
    var isSplit = block && block.hasAttribute('data-split-caption');
    var splitParts = isSplit && captionEl ? splitCaptionHtml(captionEl.innerHTML) : null;

    if (splitParts) {
      lightboxSplitLeft.innerHTML = splitParts.left;
      lightboxSplitRight.innerHTML = splitParts.right;
      lightboxCaption.innerHTML = '';
      lightbox.classList.remove('has-caption');
      lightbox.classList.add('has-split-caption');
    } else if (captionEl && captionEl.textContent.trim()) {
      lightboxCaption.innerHTML = captionEl.innerHTML;
      lightbox.classList.add('has-caption');
      lightbox.classList.remove('has-split-caption');
      lightboxSplitLeft.innerHTML = '';
      lightboxSplitRight.innerHTML = '';
    } else {
      lightboxCaption.innerHTML = '';
      lightbox.classList.remove('has-caption', 'has-split-caption');
      lightboxSplitLeft.innerHTML = '';
      lightboxSplitRight.innerHTML = '';
    }
  }

  function openLightbox(img) {
    var carouselEl = img.closest('.carousel');
    if (carouselEl) {
      galleryImgs = Array.prototype.slice.call(
        carouselEl.querySelectorAll('.img-placeholder.has-image img, .content-img')
      );
      galleryIndex = galleryImgs.indexOf(img);
    } else {
      galleryImgs = [];
      galleryIndex = -1;
    }
    lightbox.classList.toggle('has-gallery', galleryImgs.length > 1);

    showImage(img);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function showGalleryOffset(offset) {
    if (galleryImgs.length < 2) return;
    galleryIndex = (galleryIndex + offset + galleryImgs.length) % galleryImgs.length;
    showImage(galleryImgs[galleryIndex]);
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open', 'has-caption', 'has-gallery', 'has-split-caption');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lightboxImg.src = '';
    lightboxCaption.innerHTML = '';
    lightboxSplitLeft.innerHTML = '';
    lightboxSplitRight.innerHTML = '';
    galleryImgs = [];
    galleryIndex = -1;
  }

  // Delegado en document: las imágenes de contenido.txt se insertan recién
  // después de cargar el archivo, así que todavía no existen en este punto.
  document.addEventListener('click', function (e) {
    if (lightbox.classList.contains('is-open')) {
      if (e.target.closest('.lightbox__arrow--prev')) { showGalleryOffset(-1); return; }
      if (e.target.closest('.lightbox__arrow--next')) { showGalleryOffset(1); return; }
    }

    var img = e.target.closest('.img-placeholder.has-image img, .content-img');
    if (img) {
      openLightbox(img);
      return;
    }
    // Un clic afuera de la imagen agrandada (fondo oscuro, la ✕ o fuera de
    // las flechas) cierra el popup. Un clic sobre el epígrafe sobreimpreso
    // no debe cerrarlo, por eso el chequeo es contra todo el "cuadro"
    // (imagen + epígrafe) más las flechas de navegación del carrusel.
    if (
      lightbox.classList.contains('is-open') &&
      !e.target.closest('.lightbox__frame') &&
      !e.target.closest('.lightbox__arrow')
    ) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showGalleryOffset(-1);
    if (e.key === 'ArrowRight') showGalleryOffset(1);
  });
}

// Botón "Ver prompt y modelo" individual, debajo de cada imagen que tiene
// epígrafe (ver renderImageBlock() más arriba, que arma el botón con el
// epígrafe oculto al lado). Un solo listener delegado en document, porque
// los botones se insertan recién al aplicar contenido.txt. Cada botón
// muestra/oculta SOLO el epígrafe de esa imagen puntual, sin afectar a las
// demás ni hacer falta agrandarla — no tiene relación con el epígrafe del
// lightbox, que es aparte y siempre se ve entero al agrandar la imagen.
function initInlineCaptionToggles() {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.caption-toggle-inline');
    if (!btn) return;
    var caption = btn.nextElementSibling;
    if (!caption || !caption.classList.contains('img-caption')) return;
    var isHidden = caption.hasAttribute('hidden');
    if (isHidden) {
      caption.removeAttribute('hidden');
      btn.textContent = 'Ocultar prompt y modelo';
      btn.setAttribute('aria-expanded', 'true');
    } else {
      caption.setAttribute('hidden', '');
      btn.textContent = 'Ver prompt y modelo';
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  loadContent();
  initLightbox();
  initInlineCaptionToggles();

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
