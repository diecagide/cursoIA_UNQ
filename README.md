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
- Clase 2: `https://diecagide.github.io/cursoIA_UNQ/clase-2/`
- Clase 3, 4, 5: mismo patrón, cambiando el número (cuando estén).

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
4. Para separar en **párrafos** (con más separación visual) dentro de
   un mismo bloque, dejá una línea en blanco entre uno y otro.
5. Para pasar de renglón sin que sea un párrafo nuevo (como cuando en
   Word apretás Enter una sola vez), simplemente apretá Enter una vez:
   no hace falta dejar línea en blanco. Se va a ver como dos renglones
   pegados, en vez de uno solo corrido.
6. Podés usar:
   - `**texto**` para **negrita**
   - `*texto*` para *cursiva*
   - `[texto](https://...)` para un link
   - Una LISTA con viñetas: si todos los renglones de un párrafo
     empiezan con `- ` (guion + espacio), se muestran como una lista
     en vez de texto corrido:

     ```
     - Primer punto.
     - Segundo punto.
     ```

   - Para una IMAGEN, ver la sección 4 más abajo — es la misma lógica
     en cualquier bloque de texto, no solo para las imágenes "fijas".
7. Abajo de todo hay un botón verde "Commit changes" — con eso
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

Todas las imágenes de una clase (las que ya tiene y cualquiera nueva
que quieras sumar) se manejan desde `contenido.txt` — **no hay que
tocar `index.html` para esto**. Es una sola forma de hacerlo, en
cualquier bloque de texto:

1. Entrá a `clase-1/contenido.txt` en GitHub, botón del lápiz (✏️).
2. En el bloque (`## algo`) donde quieras que aparezca la imagen,
   agregala en su propio párrafo (con línea en blanco antes y después):

   ```
   ![texto alternativo opcional](images/nombre-del-archivo.jpg)
   ```

3. Si querés un epígrafe debajo (modelo usado, prompt, lo que sea),
   escribilo pegado en el renglón siguiente, sin dejar línea en blanco:

   ```
   ![texto alternativo opcional](images/nombre-del-archivo.jpg)
   Modelo: el que hayas usado
   Prompt: el que hayas usado — podés escribir con comillas, paréntesis
   o lo que haga falta, sin problema.
   ```

   El epígrafe es opcional: si no escribís nada debajo, no se muestra.
4. Subí el archivo de imagen a `clase-1/images/` con **ese mismo
   nombre** ("Add file" → "Upload files"). Tamaño recomendado: entre
   1200 y 1600 px de ancho, formato `.jpg` o `.png`.
5. Commit changes en los dos archivos que hayas tocado.

Mientras el archivo de imagen no esté subido, la página muestra
automáticamente un recuadro punteado de "pendiente" en su lugar — no
rompe nada, y podés ir escribiendo el texto antes de tener la imagen
lista.

La carpeta `images/` de cada clase tiene además un `LEEME.txt` con una
lista de referencia de qué imágenes usa esa clase — es solo para tu
orientación, no hace falta mantenerlo actualizado a mano.

---

## 5. Agregar un recurso interactivo (Genially, un video de YouTube, etc.)

Algunos bloques tienen un recuadro punteado que marca dónde va un
recurso interactivo — la línea de tiempo de Genially en la Clase 1, o
un video de YouTube en la Clase 2. Se agrega igual en los dos casos:

1. En Genially usá "Compartir" → "Insertar" (embed); en YouTube usá el
   botón "Compartir" → "Insertar" debajo del video. En los dos casos
   te va a dar un código parecido a este:

   ```html
   <iframe src="https://www.youtube.com/embed/XXXXXXX" ...></iframe>
   ```

2. En el `index.html` de la clase correspondiente, buscá el comentario
   que dice:

   `<!-- PEGAR ACÁ EL <iframe ...>...</iframe> QUE TE DA GENIALLY -->`

   o, para un video:

   `<!-- PEGAR ACÁ EL <iframe ...>...</iframe> QUE TE DA YOUTUBE -->`

3. Pegá el código justo debajo de ese comentario, y borrá las líneas
   de "pendiente" que están arriba (el ícono y los dos textos de
   aviso) — a diferencia de las imágenes, acá sí hay que borrarlas a
   mano para que no queden mezcladas con el video.
4. Commit changes.

---

## 6. Cuando armemos la Clase 3 (y siguientes)

Va a sumarse una carpeta `clase-3/` nueva, con la misma estructura que
`clase-1/` y `clase-2/` (su propio `index.html`, y copias de
`styles.css` y `script.js` para que funcione de forma independiente).
El link va a ser `https://diecagide.github.io/cursoIA_UNQ/clase-3/`,
siguiendo el mismo patrón. Cada clase tiene, además, un tono levemente
distinto en el degradé de la barra lateral para distinguirse de un
vistazo — no hace falta hacer nada para eso, ya viene armado en
`styles.css`.

---

## 7. Estructura de este repositorio

```
cursoIA_UNQ/
├── README.md              este archivo
├── clase-1/
│   ├── index.html          esqueleto de la clase (no hace falta tocarlo)
│   ├── contenido.txt        todo el texto de la clase (esto sí se edita)
│   ├── styles.css           diseño visual (no hace falta tocarlo)
│   ├── script.js             menú, scroll y carga de contenido.txt (no hace falta tocarlo)
│   └── images/
│       ├── LEEME.txt          lista de referencia de las imágenes que usa la clase
│       └── (acá van tus imágenes)
└── clase-2/                misma estructura que clase-1/
    └── (ídem)
```
