# Compilación CBTis 246

Sitio estático que reúne proyectos y archivos de la comunidad del CBTis 246. Su página principal muestra un catálogo con búsqueda; cada proyecto puede abrirse de forma independiente.

## Contenido

- `index.html`: portada y catálogo de proyectos y archivos.
- `pages/`: proyectos HTML. Incluye el **Chismógrafo**, un formulario interactivo cuyas respuestas se procesan en el navegador y pueden exportarse a PDF mediante la opción de impresión.
- `media/`: imágenes, audio, video, PDF y otros recursos que aparecen en el catálogo.
- `scripts/generate-catalog.mjs`: genera `catalog.json` a partir del contenido de `pages/` y `media/`.
- `_redirects`: configura rutas cortas para los proyectos en plataformas que admiten este formato, como Netlify.

## Uso local

Se necesita Node.js para regenerar el catálogo. Desde la raíz del repositorio:

```bash
node scripts/generate-catalog.mjs
```

Después, sirve la carpeta con un servidor web estático y abre la dirección local que indique el servidor. Esto permite que la portada cargue `catalog.json`.

## Agregar contenido

- Para agregar una página suelta, coloca un archivo `.html` en `pages/`.
- Para agregar un proyecto con varios archivos, crea una carpeta dentro de `pages/` con un `index.html` en su raíz.
- Para agregar recursos al catálogo, colócalos dentro de `media/`; se incluyen también los archivos de sus subcarpetas.
- Regenera `catalog.json` después de los cambios y publica los archivos del repositorio.

El catálogo ordena los elementos por nombre y reconoce formatos comunes de imagen, audio, video y PDF. Los proyectos sueltos tienen rutas cortas como `/a/chismografo`; los proyectos en carpetas usan `/a/nombre/`.
