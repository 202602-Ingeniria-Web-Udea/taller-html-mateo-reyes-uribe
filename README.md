<div align="center">

# 🛸 Rick &amp; Morty Explorer

### Explora el multiverso: busca, filtra y colecciona personajes de *Rick and Morty*

<br />

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/Rick_and_Morty_API-00B0C8?style=for-the-badge&logo=rickandmorty&logoColor=white)

![Sin dependencias](https://img.shields.io/badge/dependencias-0-brightgreen?style=flat-square)
![Sin build](https://img.shields.io/badge/build_step-ninguno-blue?style=flat-square)
![Vanilla JS](https://img.shields.io/badge/framework-vanilla-yellow?style=flat-square)
![Licencia](https://img.shields.io/badge/licencia-académica-lightgrey?style=flat-square)

<br />

<em>Mini aplicación web para el <strong>Taller Evaluativo 1</strong> de la asignatura<br />Ingeniería Web (Prof. Juan Pablo Arango) — Universidad de Antioquia</em>

</div>

---

## 📑 Tabla de contenidos

- [Demo rápida](#-demo-rápida)
- [Descripción](#-descripción)
- [Características](#-características)
- [Capturas](#-capturas)
- [Stack tecnológico](#️-stack-tecnológico)
- [Estructura del proyecto](#️-estructura-del-proyecto)
- [Cómo ejecutar el proyecto](#-cómo-ejecutar-el-proyecto)
- [Arquitectura y flujo de datos](#-arquitectura-y-flujo-de-datos)
- [API utilizada](#-api-utilizada)
- [Manejo de errores](#️-manejo-de-errores)
- [Decisiones de diseño](#-decisiones-de-diseño)
- [Accesibilidad](#-accesibilidad)
- [Posibles mejoras](#-posibles-mejoras-futuras)
- [Autor](#-autor)

---

## ⚡ Demo rápida

```bash
# 1. Clona el repositorio
git clone <url-del-repo>
cd Taller_1_ingeWeb

# 2. Levanta un servidor local (elige una opción)
python -m http.server 8000        # Python 3
npx serve .                       # Node.js
#   … o simplemente: clic derecho sobre index.html → "Open with Live Server"

# 3. Abre el navegador
#    http://localhost:8000
```

> 💡 También funciona abriendo `index.html` directamente con doble clic, pero se recomienda un servidor local para evitar restricciones del navegador.

---

## 📋 Descripción

**Rick &amp; Morty Explorer** es una aplicación de página única (SPA ligera, sin framework) que consume la
[Rick and Morty API](https://rickandmortyapi.com/) para permitir al usuario **buscar, filtrar, inspeccionar y
coleccionar** personajes de la serie animada.

El proyecto está construido **100 % con tecnologías web nativas** (HTML, CSS y JavaScript vanilla): no usa
librerías externas, no requiere instalación de dependencias y no tiene paso de compilación. Todo el estado de
usuario (favoritos y tema) se persiste localmente con `localStorage`.

---

## ✨ Características

### Requeridas por el taller

| # | Funcionalidad | Detalle |
|---|---------------|---------|
| 1 | **Búsqueda por nombre** | Campo de texto que consulta la API por coincidencia parcial de nombre. |
| 2 | **Listado dinámico** | Grid responsivo de tarjetas con imagen, nombre, estado y especie. |
| 3 | **Detalle del personaje** | Modal con género, origen, ubicación actual y número de episodios. |
| 4 | **Manejo de errores** | Mensajes amigables ante `404` (sin resultados) o fallos de red/servidor. |
| 5 | **Diseño responsivo** | Adaptable a móvil, tablet y escritorio mediante CSS Grid + *media queries*. |

### Adicionales (creatividad y valor extra)

| Funcionalidad | Descripción |
|---------------|-------------|
| 🔎 **Búsqueda con *debounce*** | Se busca automáticamente 500 ms después de dejar de escribir, reduciendo llamadas innecesarias a la API. |
| 🟢 **Filtro por estado** | Selector para acotar por *Vivo · Muerto · Desconocido*, combinable con la búsqueda por nombre. |
| ⭐ **Sistema de favoritos** | Marca personajes con la estrella de cada tarjeta; se guardan en `localStorage` y se pueden ver en una vista exclusiva. |
| 📄 **Paginación** | Navegación *Anterior / Siguiente* cuando la API devuelve más de una página, con indicador *Página X de Y*. |
| 🌗 **Tema claro / oscuro** | Alternancia con un clic; la preferencia se recuerda entre sesiones. |
| 🌐 **Traducción de estados** | Los valores de la API (`Alive`, `Dead`, `unknown`) se muestran en español. |
| ⌨️ **Atajos de teclado** | `Enter` lanza la búsqueda · `Esc` cierra el modal · clic fuera del modal también lo cierra. |
| ⏳ **Estados de carga** | *Spinner* animado mientras se resuelve cada petición. |
| 🖼️ **Carga diferida de imágenes** | `loading="lazy"` en las imágenes de las tarjetas para mejorar el rendimiento. |

---

## 🖼️ Capturas

> _Agrega aquí tus capturas de pantalla o un GIF de la aplicación en funcionamiento._

| Vista principal | Detalle (modal) | Tema oscuro |
|:---:|:---:|:---:|
| _`docs/screenshot-home.png`_ | _`docs/screenshot-modal.png`_ | _`docs/screenshot-dark.png`_ |

---

## 🛠️ Stack tecnológico

| Capa | Tecnología | Uso en el proyecto |
|------|-----------|--------------------|
| **Estructura** | HTML5 semántico | `header`, `main`, `section`, `article`, `footer`, atributos `aria-*`. |
| **Estilos** | CSS3 | Variables CSS para *theming*, Flexbox y Grid para *layout*, `clamp()`, transiciones, `@media` para responsividad. |
| **Lógica** | JavaScript ES6+ (vanilla) | `fetch` + `async/await`, `URLSearchParams`, `Set`, *módulos de función*, `localStorage`, manipulación directa del DOM. |
| **Datos** | [Rick and Morty API](https://rickandmortyapi.com/documentation) | API REST pública, sin autenticación ni *API key*. |
| **Tooling** | Ninguno | Sin `npm install`, sin *bundler*, sin *transpiler*. Se ejecuta tal cual en el navegador. |

---

## 🗂️ Estructura del proyecto

```
Taller_1_ingeWeb/
├── index.html          # Estructura y marcado semántico de la aplicación
├── css/
│   └── styles.css      # Variables de tema, layout, componentes y responsividad
├── js/
│   └── app.js          # Estado, llamadas a la API, renderizado y eventos
└── README.md           # Este archivo
```

### Responsabilidades por archivo

<details>
<summary><strong>index.html</strong></summary>

- Cabecera con título, subtítulo y botón de cambio de tema.
- Panel de búsqueda: input de nombre, selector de estado, botón de búsqueda y botón "Ver favoritos".
- Contenedores para: indicador de carga, mensaje de error, grid de resultados y controles de paginación.
- Modal de detalle (oculto por defecto).
- Pie de página con atribución de datos.
</details>

<details>
<summary><strong>css/styles.css</strong></summary>

- **Bloque de variables** (`:root` y `[data-theme="dark"]`) para colores, sombras y radios.
- Secciones comentadas por componente: encabezado, panel de búsqueda, estados de carga/error, tarjetas, paginación, modal, pie y *media queries*.
</details>

<details>
<summary><strong>js/app.js</strong></summary>

| Bloque | Funciones clave |
|--------|-----------------|
| Constantes y refs al DOM | `API_BASE_URL`, `*_STORAGE_KEY`, nodos cacheados |
| Favoritos | `loadFavorites`, `saveFavorites`, `toggleFavorite` |
| Construcción de peticiones | `buildSearchUrl` |
| Llamadas a la API | `fetchCharacters`, `fetchFavoriteCharacters` |
| Renderizado | `renderResults`, `translateStatus`, `openCharacterModal`, `closeCharacterModal` |
| Paginación | `updatePagination` |
| Estados visuales | `showLoading`, `showError`, `hideError` |
| Tema | `applyStoredTheme`, `toggleTheme` |
| Utilidades | `debounce` |
| Orquestación | `runSearch`, `setFavoritesMode` |
| Eventos e inicialización | *listeners* + arranque `applyStoredTheme()` / `runSearch(1)` |
</details>

---

## 🚀 Cómo ejecutar el proyecto

**No requiere instalación de dependencias ni herramientas de compilación.**

### Opción A — Live Server (VS Code)
1. Instala la extensión **Live Server**.
2. Clic derecho sobre `index.html` → **"Open with Live Server"**.

### Opción B — Servidor con Python
```bash
python -m http.server 8000
# Visita http://localhost:8000
```

### Opción C — Servidor con Node.js
```bash
npx serve .
```

### Opción D — Abrir el archivo directamente
Haz doble clic en `index.html`. Funciona, aunque un servidor local es más fiable.

> Al cargar, la app muestra automáticamente el listado completo de personajes. Escribe `Rick`, `Morty` o `Summer`
> para probar la búsqueda, o combina con el filtro de estado.

---

## 🔄 Arquitectura y flujo de datos

```
┌──────────────┐   input / click / change   ┌─────────────────┐
│  Eventos DOM │ ─────────────────────────▶ │   runSearch()   │
└──────────────┘                            └────────┬────────┘
                                                     │
                            ¿modo favoritos activo?  │
                          ┌──────────────────────────┴───────────────┐
                          ▼                                          ▼
             ┌────────────────────────┐               ┌──────────────────────────────┐
             │  fetchCharacters(page) │               │  fetchFavoriteCharacters()   │
             │  buildSearchUrl()      │               │  GET /character/{ids}        │
             │  GET /character/?...    │               └───────────────┬──────────────┘
             └───────────┬────────────┘                               │
                         │            respuesta JSON                  │
                         └──────────────────┬────────────────────────-┘
                                            ▼
                                  ┌────────────────────┐
                                  │  renderResults()   │  → tarjetas en el grid
                                  │  updatePagination()│  → controles de página
                                  └────────────────────┘
                                            │
                              clic en tarjeta ▼
                                  ┌────────────────────┐
                                  │ openCharacterModal │  → modal de detalle
                                  └────────────────────┘
```

**Estado de la aplicación** (variables de módulo en `app.js`):

| Variable | Propósito |
|----------|-----------|
| `currentPage` / `totalPages` | Control de paginación. |
| `isShowingFavoritesOnly` | Alterna entre búsqueda normal y vista de favoritos. |
| `favoriteIds` | `Set` de IDs favoritos, sincronizado con `localStorage`. |

---

## 🌐 API utilizada

**Base:** `https://rickandmortyapi.com/api/character`

| Necesidad | Endpoint | Ejemplo |
|-----------|----------|---------|
| Listado / búsqueda / filtro | `GET /character/?name={q}&status={s}&page={n}` | `/character/?name=rick&status=alive&page=2` |
| Varios personajes por ID (favoritos) | `GET /character/{id,id,id}` | `/character/1,2,183` |

- Respuesta de listado: `{ info: { count, pages, next, prev }, results: [...] }`.
- La API responde **`404`** cuando ningún personaje coincide con los filtros → se trata como "sin resultados", no como error.
- Es pública: **no necesita API key** ni cabeceras de autenticación.

---

## ⚠️ Manejo de errores

| Escenario | Comportamiento de la app |
|-----------|--------------------------|
| Búsqueda sin coincidencias (`404`) | Se limpia el grid y se muestra: *"No se encontraron personajes con esos criterios…"*. |
| Error de red / sin conexión / CORS | Mensaje: *"Ocurrió un error al consultar la API. Verifica tu conexión…"* + `console.error` con el detalle. |
| Error del servidor (`5xx` u otro `!ok`) | Se lanza una excepción capturada por el `catch`, mostrando el mensaje de error genérico. |
| Vista de favoritos vacía | Mensaje guía: *"Aún no has marcado personajes como favoritos…"*. |
| `localStorage` corrupto o inaccesible | `loadFavorites()` captura la excepción y devuelve un `Set` vacío en lugar de romper la app. |

En todos los casos el *spinner* de carga se oculta mediante `finally`, evitando que la interfaz quede bloqueada.

---

## 🎨 Decisiones de diseño

- **Vanilla sobre framework:** el alcance del taller no justifica React/Vue; el DOM nativo mantiene el *bundle* en 0 KB de dependencias y el código 100 % legible.
- **Variables CSS para *theming*:** cambiar de tema es solo alternar el atributo `data-theme` en `<html>`; ninguna regla se duplica.
- **`Set` para favoritos:** búsquedas O(1) de pertenencia y serialización trivial a `JSON`.
- **`debounce` propio:** una utilidad de 6 líneas evita traer *lodash* por una sola función.
- **Separación por responsabilidades:** marcado en `index.html`, presentación en `styles.css`, comportamiento en `app.js`; sin estilos en línea ni JS incrustado.
- **Funciones pequeñas y nombradas:** cada bloque de `app.js` hace una sola cosa (`buildSearchUrl`, `renderResults`, `updatePagination`…), lo que facilita la lectura y el mantenimiento.

---

## ♿ Accesibilidad

- Marcado semántico (`header`, `main`, `section`, `article`, `footer`).
- Atributos `aria-label` en botones de icono y `aria-live="polite"` en el grid de resultados para anunciar cambios.
- Foco visible personalizado (`outline`) en campos de búsqueda.
- Contraste de color cuidado en ambos temas.
- Navegación por teclado: `Enter` para buscar, `Esc` para cerrar el modal.

---

## 🔮 Posibles mejoras futuras

- [ ] Ruteo con *hash* para enlaces profundos a un personaje (`#/character/42`).
- [ ] Pestañas para explorar **ubicaciones** y **episodios** de la API.
- [ ] *Skeleton loaders* en lugar del *spinner* central.
- [ ] Tests unitarios para `buildSearchUrl`, `translateStatus` y `debounce`.
- [ ] *Service worker* para funcionamiento offline y caché de imágenes.
- [ ] Migrar el estado a módulos ES (`import`/`export`) y dividir `app.js`.

---

## 👤 Autor

- **Nombre:** _Tu Nombre Aquí_ &nbsp;·&nbsp; <!-- reemplaza con tu nombre completo -->
- **Correo:** mateo.reyesu@udea.edu.co
- **Asignatura:** Ingeniería Web — Prof. Juan Pablo Arango
- **Institución:** Universidad de Antioquia
- **Entrega:** Taller Evaluativo 1

---

<div align="center">

Proyecto académico. Datos proporcionados por
<a href="https://rickandmortyapi.com/">The Rick and Morty API</a>.

<sub>Hecho con HTML, CSS y JavaScript vanilla — sin dependencias, sin build. 🛸</sub>

</div>
