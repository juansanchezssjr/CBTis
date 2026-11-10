# Guía de estilos

Referencia para recrear el lenguaje visual de este sitio en otros proyectos. Los estilos originales siguen en `index.html` y `pages/chismografo.html`; esta guía los documenta, no los reemplaza. Hay dos variantes del mismo sistema: **clara** (índice) y **oscura** (chismógrafo).

## 1. Tipografía y carga

- Fuente principal: **JetBrains Mono**, pesos 400, 500, 600 y 700, cargada desde Google Fonts.
- Alternativas locales: `"Cascadia Code"`, `Consolas`, `monospace`.
- La tipografía monoespaciada, etiquetas en minúsculas, comandos, numeración y símbolos de terminal definen el carácter visual.
- Tamaño base: 13 px en el índice y 14 px en el chismógrafo; en móvil, el chismógrafo baja a 13 px.
- Interlineado base: 1.65 en el índice y 1.7 en el chismógrafo.
- Títulos principales: peso 600, interlineado 1.2 y espaciado de letras `-0.07em`.

Carga usada en las páginas:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## 2. Variables de diseño

Conservar los mismos nombres facilita compartir componentes; cambiar los valores de la paleta permite alternar entre temas.

### Tema claro — índice

```css
:root {
  color-scheme: light;
  --bg: #f5f3f8;
  --panel: #fff;
  --panel-soft: #faf8fc;
  --line: #e7e2ed;
  --line-strong: #d7d0e0;
  --text: #282432;
  --muted: #716b7c;
  --dim: #938c9e;
  --lilac: #7651a8;
  --pink: #b94e78;
  --mint: #397c64;
  --mono: "JetBrains Mono", "Cascadia Code", Consolas, monospace;
}
```

### Tema oscuro — chismógrafo

```css
:root {
  color-scheme: dark;
  --bg: #18171f;
  --panel: #211f29;
  --panel-soft: #25232e;
  --line: #393641;
  --line-strong: #504b5c;
  --text: #f0edf4;
  --muted: #a7a1b1;
  --dim: #777181;
  --lilac: #c9a7ff;
  --pink: #ffacc8;
  --mint: #a8e6cf;
  --yellow: #f2dfa0;
  --mono: "JetBrains Mono", "Cascadia Code", Consolas, monospace;
}
```

### Colores auxiliares presentes

| Uso | Valor |
|---|---|
| Fondo oscuro de campos | `#191820` |
| Fondo oscuro del lateral | `#1c1a23` |
| Placeholder oscuro | `#777181` |
| Error en tema claro: borde / texto | `#dfb4c3` / `#8f3655` |
| Fondo de cuadrícula claro | `rgb(70 52 92 / 3%)` |
| Fondo de cuadrícula oscuro | `rgb(255 255 255 / 2%)` |
| Texto de impresión | `#211f29` |
| Acento de impresión | `#74628c` |
| Texto secundario de impresión | `#615b69` |
| Borde de impresión | `#c9c2d1` y `#ded9e3` |
| Respuesta impresa | `#48434f` |

## 3. Medidas y principios comunes

- Usar `box-sizing: border-box` globalmente.
- Mantener superficies rectangulares: bordes finos de 1 px y `border-radius: 0`; no usar sombras pronunciadas ni efectos de volumen.
- Contenedor principal centrado, con ancho máximo de 1120 px. El índice usa sombra tenue `0 12px 40px rgb(52 39 68 / 6%)`; el chismógrafo no usa sombra.
- Líneas y divisores usan `--line` o `--line-strong`. Los paneles y controles usan los colores de tema.
- Los espacios fluidos se expresan con `clamp()`: las zonas introductorias y el padding de secciones crecen con el viewport y tienen límites.
- El fondo lleva una línea vertical sutil cada 40 px, creada con `linear-gradient`; no debe competir con el contenido.
- Links, controles y botones eliminan el tap highlight del navegador. Los elementos interactivos muestran un foco visible de 2 px en `--lilac`, separado 3 px.
- Transiciones cortas y discretas: 120 ms para hover de tarjetas; 180 ms para la barra de progreso.
- No sustituir el diseño por colores genéricos del navegador: campos, selectores, estados y foco también siguen la paleta.

## 4. Componentes del índice

| Selector / elemento | Tratamiento |
|---|---|
| `body` | Ancho mínimo 320 px; alto mínimo 100 vh; margen 0; fondo claro con cuadrícula; texto `--text`, fuente `--mono`, 13 px / 1.65. |
| `.terminal` | `width: min(1120px, calc(100% - 32px))`; margen `28px auto`; contenido recortado; borde `--line-strong`; fondo `--panel`; sombra tenue. |
| `.terminal-bar` | Flex, mínimo 42 px, centrado vertical, separación 12 px; padding 8 px 18 px; borde inferior; fondo `--panel-soft`; texto `--muted`, 11 px, tracking 0.05em, mayúsculas. |
| `.terminal-mark`, `.scan-state` | Acento `--mint`; estado alineado a la derecha. |
| `.intro` | Padding vertical/horizontal fluido: `clamp(24px, 6vw, 56px)` y `clamp(20px, 6vw, 64px)`, con 30 px abajo. |
| `.eyebrow` | Sin margen superior, 10 px abajo; `--mint`, 12 px. |
| `h1` | 10 px abajo; tamaño `clamp(27px, 5vw, 44px)`; peso 600; tracking -0.07em; línea 1.2; permite partir palabras largas. |
| `.title-accent` | Color `--lilac`. |
| `.intro-copy` | Máximo 720 px; 22 px abajo; `--muted`. |
| `.search-wrap` | Posición relativa; máximo 560 px. Prefijo `/` posicionado a la izquierda, centrado vertical y en `--dim`. |
| `.search` | Ancho 100%, mínimo 44 px; padding 9 px 14 px 9 px 30 px; borde `--line-strong`; sin radio; fondo `--panel`; color `--text`; fuente heredada. Placeholder `--dim`. |
| `.catalog` | Grid de dos columnas iguales (`minmax(0, 1fr)`), con borde superior `--line`. |
| `.section` | `min-width: 0`; padding `24px clamp(16px, 3vw, 32px) 30px`. La sección siguiente tiene borde izquierdo. |
| `.section-heading` | Flex, línea base, espacio entre contenido; gap 12 px; margen inferior 5 px. |
| `h2` | Sin margen inferior; 17 px, peso 600, tracking -0.04em. |
| `.count` | `--lilac`, 11 px, sin salto de línea. |
| `.section-copy` | Mínimo 42 px, margen inferior 15 px, `--muted`, 11 px. |
| `.item-list` | Grid con gap 8 px; alto máximo 430 px; padding 2 px 6 px 2 px 2 px; scroll; sin viñetas; scrollbar fina en `--line-strong`. |
| `.item-link` | Flex, mínimo 62 px, centrado vertical, gap 12 px; padding 10 px 12 px; borde `--line`; fondo `--panel-soft`; texto heredado; sin subrayado. Transición de 120 ms en borde, fondo y posición. |
| `.item-link:hover` | Sube 1 px, borde `--line-strong`, fondo blanco. |
| `.item-icon` | Cuadro 34 × 34 px, no se encoge; grid centrado; borde `--line`, fondo blanco, `--lilac`, 10 px y peso 700. |
| `.item-name`, `.item-path` | Bloque de una línea con overflow oculto y ellipsis. Nombre en peso 600; ruta `--muted`, 10 px. |
| `.message` | Padding 16 px; borde discontinuo `--line-strong`; `--muted`, 11 px. Estado de error: borde `#dfb4c3`, texto `#8f3655`. `[hidden]` se oculta. |
| `.footer` | Padding `14px clamp(20px, 6vw, 64px)`; borde superior `--line`; `--dim`, 10 px. |

## 5. Componentes del chismógrafo

| Selector / elemento | Tratamiento |
|---|---|
| `html` | Desplazamiento suave y `scroll-padding-top: 1.5rem`. |
| `body` | Ancho mínimo 0; alto mínimo 100 vh; margen 0; fondo oscuro con cuadrícula; `--text`; fuente `--mono`, 14 px / 1.7. |
| `button`, `input`, `select`, `textarea` | Heredan color y fuente. Los elementos interactivos no muestran tap highlight. |
| `.terminal` | `width: min(1120px, calc(100% - 48px))`; margen `36px auto 28px`; borde `--line-strong`; fondo `--bg`. |
| `.terminal-bar` | Flex, mínimo 42 px, separación; padding 8 px 16 px; borde inferior; fondo `--panel`; `--muted`, 11 px, tracking 0.06em, mayúsculas. |
| `.terminal-name` | Flex centrado, gap 10 px. `.terminal-mark` y `.terminal-state`: `--mint`. El estado antepone un punto de 9 px. |
| `.intro` | Padding `clamp(24px, 6vw, 64px) clamp(20px, 7vw, 78px) 32px`. |
| `.eyebrow` | `--mint`, 12 px; margen inferior 12 px. |
| `h1` | Margen inferior 12 px; `clamp(28px, 5vw, 48px)`; peso 600; tracking -0.07em; línea 1.2; ajuste de palabras largas. |
| `.intro-copy` | Máximo 690 px; margen inferior 26 px; `--muted`, 13 px. |
| `.prompt-line` | Flex con wrap; gap 8 px; `--dim`, 12 px. El `strong` usa `--pink`, peso 500. |
| `.workspace` | Grid `minmax(0, 1fr) 250px`; borde superior `--line`. |
| `.form-area` | `min-width: 0`; padding `28px clamp(16px, 4vw, 46px) 44px`. |
| `.form-intro` | Flex, alineado al inicio, espacio entre lados; gap 18 px; margen inferior 28 px. Su párrafo: sin margen inferior, `--muted`, 12 px. |
| `.command-menu` | Posición relativa, no se encoge. Su `summary`: padding 7 px 10 px, borde `--line-strong`, `--lilac`, cursor, 11 px, sin marcador ni salto de línea. Agrega `v`/`^` al cerrar/abrir. |
| `.menu-options` | Menú absoluto, z-index 2, 4 px bajo el disparador, alineado a la derecha; grid, mínimo 190 px; borde `--line-strong`, fondo `--panel`. Enlaces: padding 8 px 11 px, texto `--text`, 11 px, sin subrayado; hover `--panel-soft` / `--lilac`. |
| `.section-heading` | Flex, línea base, gap 12 px; margen 34 px 0 13 px; padding inferior 8 px; borde inferior `--line`; `--lilac`, 12 px, peso 500, tracking 0.04em. El `span`: `--dim`, 10 px, peso 400. |
| `.question-grid` | Grid de dos columnas iguales; gap 10 px. |
| `.question` | `min-width: 0`; margen 0; padding 16 px; borde `--line`; fondo `--panel`. |
| `.question legend` | Flex a ancho completo, alineado arriba, gap 10 px; padding 0; `--text`, 12 px, peso 500, línea 1.65. |
| `.question-number` | No se encoge; `--lilac`, 13 px, peso 700. |
| `.question-status` | Margen 8 px 0 12 px 25 px; `--dim`, 10 px. En `.is-complete`, `--mint`. |
| `.answer-part + .answer-part` | Margen superior 13 px; padding superior 11 px; borde superior discontinuo `--line`. |
| `.field-label` | Bloque, margen inferior 6 px; `--muted`, 10 px. |
| `.answer-control` | Bloque, ancho 100%, mínimo 40 px; padding 9 px 10 px; borde `--line-strong`, sin radio; fondo `#191820`; `--text`, 12 px. Placeholder `#777181`, opacidad 1. |
| `textarea.answer-control` | Mínimo 72 px; redimensionable verticalmente. |
| `select.answer-control` | Apariencia nativa anulada; padding derecho 32 px; flecha lilac dibujada con dos gradientes; cursor de selección. |
| `.choice-list` | Grid con gap 7 px. `.choice`: flex, gap 9 px, alineado arriba, `--muted`, cursor, 11 px / 1.55. |
| `.choice input` | 14 × 14 px, no se encoge; margen superior 2 px; `accent-color: --lilac`; cursor. |
| `.question-note` | Margen 10 px 0 0; `--dim`, 10 px. |
| `.action-row` | Flex con wrap y gap 10 px; margen superior 25 px; padding superior 18 px; borde superior `--line`. |
| `.action-button` | Mínimo 42 px; padding 9 px 13 px; borde `--line-strong`, sin radio; fondo transparente; cursor; 11 px, alineado a la izquierda. Hover: fondo `--panel`. Variante `.primary`: borde y texto `--lilac`; `.secondary`: texto `--muted`. |
| `.sidebar` | Padding 28 px 20 px; borde izquierdo `--line`; fondo `#1c1a23`. |
| `.side-block + .side-block` | Margen superior 26 px; padding superior 20 px; borde superior `--line`. |
| `.side-label` | Margen inferior 10 px; `--dim`, 10 px, tracking 0.05em, mayúsculas. |
| `.progress-count` | Margen inferior 8 px; `--text`, 18 px. Su `span` usa `--mint`. |
| `.progress-track` | Alto 5 px; overflow oculto; borde `--line-strong`; fondo `--bg`. `.progress-fill`: ancho inicial 0, alto 100%, fondo `--mint`, transición de ancho 180 ms. |
| `.progress-hint`, `.privacy-copy`, `.nav-list` | `--muted`, 10 px. Ayuda y privacidad: margen 9 px 0 0. |
| `.nav-list` | Grid, gap 7 px; margen y padding 0; sin viñetas. Enlaces `--muted`, sin subrayado; hover `--lilac`; prefijo `> ` en `--pink`. |
| `.side-command` | Color `--yellow`. |
| `.terminal-footer` | Flex con wrap y espacio entre extremos; gap 8 px 20 px; padding 12 px 18 px; borde superior `--line-strong`; fondo `--panel`; `--dim`, 10 px. `strong`: `--pink`, peso 500. |
| `.print-document` | Oculto en pantalla; se muestra únicamente al imprimir. |

## 6. Responsive

Conservar estos puntos de quiebre y simplificar columnas antes de reducir demasiado los espacios.

### Índice — hasta 700 px

```css
@media (max-width: 700px) {
  .terminal {
    width: min(100% - 20px, 560px);
    margin: 10px auto;
  }
  .catalog {
    grid-template-columns: 1fr;
  }
  .section + .section {
    border-top: 1px solid var(--line);
    border-left: 0;
  }
  .section-copy {
    min-height: 0;
  }
  .item-list {
    max-height: 340px;
  }
}
```

### Chismógrafo — hasta 820 px

- `.workspace` pasa a una columna.
- `.sidebar` se convierte en grid de dos columnas iguales; añade borde superior y quita el izquierdo.
- Los bloques laterales dejan de tener separadores verticales. El último ocupa ambas columnas, con padding superior de 16 px y borde superior.

### Chismógrafo — hasta 560 px

- `body`: tamaño de fuente 13 px.
- `.terminal`: ancho `calc(100% - 20px)`, margen `10px auto`.
- `.terminal-bar`: padding horizontal 10 px y fuente 9 px.
- `.intro`: padding 29 px 18 px 24 px; `.intro-copy`: 12 px.
- `.form-area`: padding 22 px 12 px 30 px.
- `.form-intro` pasa a columna; menú alineado al inicio. El menú desplegable se alinea a la izquierda.
- `.question-grid` pasa a una columna; `.question` reduce padding a 14 px.
- `.sidebar` pasa a una columna con padding 22 px 16 px; los bloques recuperan el borde superior y separación vertical.
- `.terminal-footer`: padding horizontal 12 px.

### Movimiento accesible

Con `prefers-reduced-motion: reduce`, desactivar el desplazamiento suave y reducir la duración de todas las transiciones a `0.01ms`.

## 7. Impresión del chismógrafo

- Página A4 con margen de 16 mm (`@page`).
- En impresión, cambiar `color-scheme` a claro; fondo blanco, texto `#211f29`, fuente monoespaciada y cuerpo de 10 pt.
- Ocultar la interfaz (`.terminal`, barra, introducción, área de trabajo y footer) y mostrar `.print-document`.
- Encabezado: margen inferior 18 pt, padding inferior 12 pt y borde inferior de 2 px `#74628c`. Kicker en 8 pt, mayúsculas y tracking 0.08em; título en 23 pt.
- Metadatos: flex entre extremos, gap 12 pt, 8 pt, color `#615b69`.
- Títulos de sección: margen 17 pt 0 8 pt, padding inferior 5 pt, borde `#c9c2d1`, color `#74628c`, 10 pt; evitar salto después.
- Respuestas: margen inferior 7 pt, padding 7 pt 9 pt, borde `#ded9e3`; evitar dividir una respuesta entre páginas.
- Preguntas: 9 pt, peso 600; números en `#74628c`. Respuestas: 8.5 pt, `#48434f`, respetar saltos y permitir cortar palabras largas.
- Etiquetas de partes: `#74628c`, 7 pt, mayúsculas. Footer: margen superior 18 pt, padding superior 7 pt, borde `#c9c2d1`, `#777181`, 7 pt.

## 8. Accesibilidad y consistencia

- Mantener un indicador de foco visible de 2 px en `--lilac` y `outline-offset: 3px` para enlaces, botones, campos, selectores, áreas de texto y controles de menú.
- No comunicar estados solo con color: conservar etiquetas de estado como “pendiente” y “completo”, y el texto de errores.
- Mantener tamaños de controles táctiles: campos de al menos 40 px y botones de al menos 42 px de alto.
- Respetar `prefers-reduced-motion`; no depender de animaciones para comunicar cambios.
- En pantallas estrechas, usar columnas únicas, permitir que textos largos se ajusten y evitar anchos fijos para el contenido principal.
