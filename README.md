# Curso "La imaginación al poder" — clases en HTML

Este repositorio va a contener las 5 clases del curso, cada una en su
propia carpeta (`clase-1`, `clase-2`, ...). Por ahora solo está lista
la **Clase 1**.

No hace falta saber programar para mantener esto al día: las tareas
más comunes (cambiar texto, agregar una imagen) se hacen editando o
subiendo archivos desde la propia web de GitHub, sin instalar nada.

---

## 1. Publicar el sitio con GitHub Pages (una sola vez)

1. Si todavía no tenés cuenta, creá una gratis en [github.com](https://github.com).
2. Creá un repositorio nuevo (botón verde "New"). Le podés poner de
   nombre, por ejemplo, `curso-ia-docentes`. Dejalo en "Public".
3. Subí el contenido de esta carpeta al repositorio:
   - Entrá al repositorio recién creado → "Add file" → "Upload files".
   - Arrastrá **todo** el contenido de esta carpeta (incluida la
     carpeta `clase-1` completa, con su subcarpeta `images`).
   - Confirmá con "Commit changes".
4. Andá a la pestaña **Settings** del repositorio → en el menú de la
   izquierda, **Pages**.
5. En "Build and deployment" → "Source", elegí **Deploy from a
   branch**. En "Branch" elegí `main` y la carpeta `/ (root)`. Guardá.
6. Esperá 1-2 minutos. GitHub te va a mostrar un link parecido a:

   `https://tu-usuario.github.io/curso-ia-docentes/`

   Ese es el link del **repositorio**. El link directo a la Clase 1
   (el que vas a pegar en Moodle) es ese mismo link + `clase-1/`:

   `https://tu-usuario.github.io/curso-ia-docentes/clase-1/`

Guardá ese link: no cambia nunca, aunque actualices el contenido
adentro. Es el que vas a dejar en el Aula Virtual.

---

## 2. Pegar el link en Moodle

En el Aula Virtual, dentro del tema/sección correspondiente:

- "Añadir una actividad o recurso" → **URL**.
- Nombre: "Clase 1 — Modelos de IA y plataformas".
- En "URL externa" pegá el link de arriba.
- Guardar.

Los estudiantes van a hacer clic y se les va a abrir la clase en una
pestaña nueva, con su propio menú de navegación — no hace falta
descargar nada.

(Alternativa: algunos temas de Moodle permiten incrustar un `<iframe>`
directamente en una página o etiqueta, para que la clase se vea sin
salir de Moodle. Si querés esa opción decime y lo vemos, pero la más
simple y la que recomiendo para empezar es el link directo.)

---

## 3. Editar el texto de una clase

1. Entrá al repositorio en github.com → carpeta `clase-1` → archivo
   `index.html`.
2. Botón del lápiz (✏️) arriba a la derecha, "Edit this file".
3. El archivo tiene comentarios que dicen `<!-- EDITAR AQUÍ -->` y
   `<!-- FIN EDITAR -->`: todo el texto entre esos dos comentarios es
   seguro de cambiar. Buscá el párrafo que querés modificar (el texto
   normal está entre `<p>` y `</p>`) y escribí encima, sin tocar las
   etiquetas `<...>`.
4. Para agregar un párrafo nuevo, copiá una línea `<p>...</p>` que ya
   exista, pegala debajo, y reemplazá el texto de adentro.
5. Abajo de todo hay un botón verde "Commit changes" — con eso
   guardás. El sitio publicado se actualiza solo, en 1-2 minutos
   (mismo link de siempre).

Consejo: si vas a hacer un cambio grande, primero copiá todo el
contenido del archivo a un Word o Google Docs aparte, como respaldo.

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

En el Bloque A hay un recuadro que marca dónde va la línea de tiempo
hecha en Genially. Cuando la tengas lista:

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

## 6. Estructura de este repositorio

```
curso-ia-docentes/
├── README.md              este archivo
└── clase-1/
    ├── index.html          contenido de la clase (texto + estructura)
    ├── styles.css           diseño visual (no hace falta tocarlo)
    ├── script.js             menú y scroll (no hace falta tocarlo)
    └── images/
        ├── LEEME.txt          lista de imágenes que faltan y sus nombres
        └── (acá van tus imágenes)
```

Cuando armemos la Clase 2, va a sumarse una carpeta `clase-2/` con la
misma estructura, y así con las demás — todas van a compartir el
mismo estilo visual.
