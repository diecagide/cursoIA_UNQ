# cursoIA_UNQ — "La imaginación al poder", clases en HTML

Este repositorio aloja **todas las clases** del curso, cada una en su
propia carpeta (`clase-1`, `clase-2`, `clase-3`...). Comparten el mismo
diseño visual (`styles.css` y `script.js` de cada carpeta son copias
idénticas entre sí).

No hace falta saber programar para mantener esto al día: las tareas
más comunes (cambiar texto, agregar una imagen) se hacen editando o
subiendo archivos desde la propia web de GitHub, sin instalar nada.

Links de cada clase (una vez publicado, ver paso 1):

- Clase 1: `https://diecagide.github.io/cursoIA_UNQ/clase-1/`
- Clase 2: `https://diecagide.github.io/cursoIA_UNQ/clase-2/` (cuando esté)
- Clase 3, 4, 5: mismo patrón, cambiando el número.

---

## 0. Si tu repo quedó con archivos sueltos en la raíz

En una vuelta anterior armamos esto para que cada clase fuera un
repositorio separado, y por eso te pedí subir `index.html`,
`styles.css`, `script.js` e `images/` directo en la raíz del repo.
Como decidiste volver al esquema de un solo repositorio con todas las
clases adentro, hay que deshacer eso:

1. Entrá a tu repositorio `cursoIA_UNQ` (ya renombrado) en github.com.
2. Si en la raíz ves sueltos `index.html`, `styles.css`, `script.js` o
   una carpeta `images/`, borralos: abrís cada archivo → ícono de
   tacho de basura arriba a la derecha → "Commit changes". (La carpeta
   `images/` se borra archivo por archivo, igual que antes.)
3. Subí el contenido de este paquete tal cual está: la carpeta
   `clase-1/` completa (con `index.html`, `styles.css`, `script.js` e
   `images/` adentro) y este `README.md` en la raíz — "Add file" →
   "Upload files", arrastrás la carpeta `clase-1` entera.
4. Confirmá con "Commit changes".

Si tu repo ya tiene la carpeta `clase-1/` con estos archivos adentro
(y nada suelto en la raíz), este paso no hace falta: pasá directo al
punto 1.

---

## 1. Publicar el sitio con GitHub Pages (una sola vez)

1. En el repositorio `cursoIA_UNQ` → pestaña **Settings** → **Pages**
   (menú de la izquierda).
2. En "Build and deployment" → "Source", elegí **Deploy from a
   branch**. En "Branch" elegí `main` y la carpeta `/ (root)`. Guardá.
3. Esperá 1-2 minutos. GitHub te va a mostrar un link parecido a:

   `https://diecagide.github.io/cursoIA_UNQ/`

   Ese es el link del **repositorio completo**. El link de cada clase
   es ese mismo link + `clase-1/`, `clase-2/`, etc.:

   `https://diecagide.github.io/cursoIA_UNQ/clase-1/`

Guardá esos links: no cambian nunca, aunque actualices el contenido
adentro. Son los que vas a dejar en el Aula Virtual.

---

## 2. Pegar el link en Moodle

En el Aula Virtual, dentro del tema/sección correspondiente:

- "Añadir una actividad o recurso" → **URL**.
- Nombre: "Clase 1 — Introducción a la IA Generativa".
- En "URL externa" pegá `https://diecagide.github.io/cursoIA_UNQ/clase-1/`.
- Guardar.

Los estudiantes van a hacer clic y se les va a abrir la clase en una
pestaña nueva, con su propio menú de navegación — no hace falta
descargar nada. Repetís lo mismo para cada clase cuando esté lista,
cambiando el número de carpeta en el link.

---

## 3. Editar el texto de una clase

Todo el texto de la clase vive en un solo archivo simple:
`clase-1/contenido.txt`. **No hace falta tocar `index.html` ni
`script.js` nunca** para cambiar texto — esos archivos son el
"esqueleto" de la página y ya están listos.

1. Entrá al repositorio en github.com → carpeta `clase-1` → archivo
   `contenido.txt`.
2. Botón del lápiz (✏️) arriba a la derecha, "Edit this file".
3. Vas a ver el texto organizado en bloques, cada uno empieza con una
   línea como `## bienvenida_1`. Esa línea es el "nombre" del bloque
   — **no la toques ni la borres** — y debajo está el texto real, que
   sí podés editar libremente.
4. Para separar párrafos dentro de un mismo bloque, dejá una línea en
   blanco entre uno y otro.
5. Podés usar:
   - `**texto**` para **negrita**
   - `*texto*` para *cursiva*
   - `[texto](https://...)` para un link
6. Abajo de todo hay un botón verde "Commit changes" — con eso
   guardás. El sitio publicado se actualiza solo, en 1-2 minutos
   (mismo link de siempre).

Ejemplo — así se ve un bloque en `contenido.txt`:

```
## proxima_clase
En la próxima clase vamos a ver **prompting avanzado** y casos de uso
concretos para el aula. Te dejamos más recursos en [este link](https://ejemplo.com).
```

Si querés cambiar ese texto, solo reemplazás lo que está debajo de la
línea `## proxima_clase` por el texto nuevo, sin tocar la línea
`## proxima_clase` en sí.

Tip: si preferís un editor más cómodo (con resaltado de colores),
apretá la tecla `.` estando en la página del repositorio en GitHub —
se abre el mismo archivo en un editor tipo Visual Studio Code, en el
navegador, sin instalar nada.

Consejo: si vas a hacer un cambio grande, primero copiá todo el
contenido del archivo a un Word o Google Docs aparte, como respaldo.

Nota técnica (por si algo se ve raro): si borrás por accidente la
línea `## algunaClave` de un bloque, ese texto va a dejar de
aparecer en la página (con un aviso en la consola del navegador, no
visible para los estudiantes). Si eso pasa, deshacé el cambio desde
"History" del archivo en GitHub, o escribime y lo revisamos.

---

## 4. Agregar o cambiar una imagen

Cada clase tiene una carpeta `images/` con un archivo `LEEME.txt` que
lista exactamente qué nombre de archivo espera cada imagen (por
ejemplo `01-imagen-curso.jpg`). Mientras no subas la imagen, la página
muestra automáticamente un recuadro punteado de "pendiente" en su
lugar — no rompe nada.

Para agregarla:

1. Entrá a la carpeta `clase-1/images` en GitHub.
2. "Add file" → "Upload files".
3. Subí tu imagen y **renombrala exactamente** como indica el
   `LEEME.txt` de esa carpeta (respetando mayúsculas/minúsculas y la
   extensión `.jpg`).
4. Commit changes. En un par de minutos la imagen va a reemplazar al
   recuadro punteado automáticamente — no hace falta tocar el HTML.

Si preferís usar `.png` en vez de `.jpg`, avisame y te ajusto el
archivo `index.html` para que apunte a esa extensión.

---

## 5. Agregar el recurso interactivo de Genially

En el Bloque A de la Clase 1 hay un recuadro que marca dónde va la
línea de tiempo hecha en Genially. Cuando la tengas lista:

1. En Genially, usá la opción "Compartir" → "Insertar" (embed) y
   copiá el código que te da, que va a tener esta forma:

   ```html
   <div style="width:100%;"><iframe src="https://view.genially.com/XXXXXXX" ...></iframe></div>
   ```

2. En `clase-1/index.html`, buscá el comentario que dice:

   `<!-- PEGAR ACÁ EL <iframe ...>...</iframe> QUE TE DA GENIALLY -->`

3. Pegá el código de Genially justo debajo de ese comentario.
4. Borrá (o dejá, como prefieras) las 3 líneas de "pendiente" que
   están arriba (el ícono 🔗 y los dos textos de aviso).
5. Commit changes.

---

## 6. Cuando armemos la Clase 2 (y siguientes)

Va a sumarse una carpeta `clase-2/` nueva, con la misma estructura que
`clase-1/` (su propio `index.html`, y copias de `styles.css` y
`script.js` para que funcione de forma independiente). El link va a
ser `https://diecagide.github.io/cursoIA_UNQ/clase-2/`, siguiendo el
mismo patrón.

---

## 7. Estructura de este repositorio

```
cursoIA_UNQ/
├── README.md              este archivo
└── clase-1/
    ├── index.html          esqueleto de la clase (no hace falta tocarlo)
    ├── contenido.txt        todo el texto de la clase (esto sí se edita)
    ├── styles.css           diseño visual (no hace falta tocarlo)
    ├── script.js             menú, scroll y carga de contenido.txt (no hace falta tocarlo)
    └── images/
        ├── LEEME.txt          lista de imágenes que faltan y sus nombres
        └── (acá van tus imágenes)
```
