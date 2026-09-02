// ---------------------------------------------------------------------------
// Constantes y referencias al DOM
// ---------------------------------------------------------------------------
const API_BASE_URL = "https://rickandmortyapi.com/api/character";
const FAVORITES_STORAGE_KEY = "rm-explorer-favorites";
const THEME_STORAGE_KEY = "rm-explorer-theme";

const searchInput = document.getElementById("search-input");
const statusFilter = document.getElementById("status-filter");
const searchBtn = document.getElementById("search-btn");
const showFavoritesBtn = document.getElementById("show-favorites-btn");
const resultsCountEl = document.getElementById("results-count");
const loadingIndicator = document.getElementById("loading-indicator");
const errorMessageEl = document.getElementById("error-message");
const resultsGrid = document.getElementById("results-grid");
const paginationEl = document.getElementById("pagination");
const prevPageBtn = document.getElementById("prev-page-btn");
const nextPageBtn = document.getElementById("next-page-btn");
const pageInfoEl = document.getElementById("page-info");
const themeToggleBtn = document.getElementById("theme-toggle-btn");
const characterModal = document.getElementById("character-modal");
const modalBody = document.getElementById("modal-body");
const modalCloseBtn = document.getElementById("modal-close-btn");

// Estado de la aplicación
let currentPage = 1;
let totalPages = 1;
let isShowingFavoritesOnly = false;
let favoriteIds = loadFavorites();

// Sección de favoritos para logica de negocio

function loadFavorites() {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch {
    return new Set();
  }
}

function saveFavorites() {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favoriteIds]));
}

function toggleFavorite(characterId) {
  if (favoriteIds.has(characterId)) {
    favoriteIds.delete(characterId);
  } else {
    favoriteIds.add(characterId);
  }
  saveFavorites();
}

// Construcción de la URL de búsqueda según los filtros activos

function buildSearchUrl(page) {
  const params = new URLSearchParams();
  const nameQuery = searchInput.value.trim();

  if (nameQuery) params.set("name", nameQuery);
  if (statusFilter.value) params.set("status", statusFilter.value);
  params.set("page", String(page));

  return `${API_BASE_URL}/?${params.toString()}`;
}

// Llamada a la API y manejo de la respuesta
async function fetchCharacters(page = 1) {
  showLoading(true);
  hideError();

  try {
    const response = await fetch(buildSearchUrl(page));

    // La API responde 404 cuando no hay coincidencias para el filtro dado
    if (response.status === 404) {
      renderResults([]);
      paginationEl.classList.add("hidden");
      resultsCountEl.textContent = "";
      showError(
        "No se encontraron personajes con esos criterios. Intenta con otro nombre o filtro.",
      );
      return;
    }

    if (!response.ok) {
      throw new Error(`Error del servidor (código ${response.status})`);
    }

    const data = await response.json();
    currentPage = page;
    totalPages = data.info.pages;

    renderResults(data.results);
    updatePagination();
    resultsCountEl.textContent = `${data.info.count} resultado(s) encontrado(s)`;
  } catch (error) {
    // Cubre errores de red (sin conexión, CORS, timeout, etc.)
    showError(
      "Ocurrió un error al consultar la API. Verifica tu conexión e intenta nuevamente.",
    );
    console.error("Error al obtener personajes:", error);
  } finally {
    showLoading(false);
  }
}

// ---------------------------------------------------------------------------
// Modo "solo favoritos": obtiene cada personaje guardado por su ID
// ---------------------------------------------------------------------------
async function fetchFavoriteCharacters() {
  showLoading(true);
  hideError();
  paginationEl.classList.add("hidden");

  if (favoriteIds.size === 0) {
    renderResults([]);
    resultsCountEl.textContent = "";
    showError(
      "Aún no has marcado personajes como favoritos. Haz clic en la estrella de una tarjeta para guardarla.",
    );
    showLoading(false);
    return;
  }

  try {
    const ids = [...favoriteIds].join(",");
    const response = await fetch(`${API_BASE_URL}/${ids}`);
    if (!response.ok)
      throw new Error(`Error del servidor (código ${response.status})`);

    const data = await response.json();
    const characters = Array.isArray(data) ? data : [data];
    renderResults(characters);
    resultsCountEl.textContent = `${characters.length} favorito(s)`;
  } catch (error) {
    showError("No se pudieron cargar tus favoritos. Intenta nuevamente.");
    console.error("Error al obtener favoritos:", error);
  } finally {
    showLoading(false);
  }
}

// ---------------------------------------------------------------------------
// Renderizado del listado de tarjetas
// ---------------------------------------------------------------------------
function renderResults(characters) {
  resultsGrid.innerHTML = "";

  characters.forEach((character) => {
    const card = document.createElement("article");
    card.className = "character-card";

    const isFavorite = favoriteIds.has(character.id);
    const statusClass =
      character.status.toLowerCase() === "alive"
        ? "alive"
        : character.status.toLowerCase() === "dead"
          ? "dead"
          : "";

    card.innerHTML = `
      <button class="favorite-btn ${isFavorite ? "is-favorite" : ""}" aria-label="Marcar como favorito">
        ${isFavorite ? "★" : "☆"}
      </button>
      <img src="${character.image}" alt="Imagen de ${character.name}" loading="lazy" />
      <div class="card-body">
        <h3>${character.name}</h3>
        <span class="status-badge">
          <span class="status-dot ${statusClass}"></span>
          ${translateStatus(character.status)} · ${character.species}
        </span>
        <span class="card-meta">📍 ${character.location.name}</span>
      </div>
    `;

    // Abrir el modal de detalle al hacer clic en la tarjeta
    card.addEventListener("click", () => openCharacterModal(character));

    // El botón de favorito no debe propagar el clic hacia la tarjeta
    const favoriteBtn = card.querySelector(".favorite-btn");
    favoriteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleFavorite(character.id);
      favoriteBtn.classList.toggle("is-favorite");
      favoriteBtn.textContent = favoriteBtn.classList.contains("is-favorite")
        ? "★"
        : "☆";
    });

    resultsGrid.appendChild(card);
  });
}

function translateStatus(status) {
  const map = { Alive: "Vivo", Dead: "Muerto", unknown: "Desconocido" };
  return map[status] || status;
}

// ---------------------------------------------------------------------------
// Modal con el detalle completo del personaje
// ---------------------------------------------------------------------------
function openCharacterModal(character) {
  modalBody.innerHTML = `
    <div class="modal-body-header">
      <img src="${character.image}" alt="Imagen de ${character.name}" />
      <div>
        <h2>${character.name}</h2>
        <span class="status-badge">${translateStatus(character.status)}</span>
      </div>
    </div>
    <ul class="modal-detail-list">
      <li><strong>Especie</strong> <span>${character.species}</span></li>
      <li><strong>Género</strong> <span>${character.gender}</span></li>
      <li><strong>Origen</strong> <span>${character.origin.name}</span></li>
      <li><strong>Ubicación actual</strong> <span>${character.location.name}</span></li>
      <li><strong>Episodios</strong> <span>${character.episode.length}</span></li>
    </ul>
  `;
  characterModal.classList.remove("hidden");
}

function closeCharacterModal() {
  characterModal.classList.add("hidden");
}

// ---------------------------------------------------------------------------
// Paginación
// ---------------------------------------------------------------------------
function updatePagination() {
  paginationEl.classList.remove("hidden");
  pageInfoEl.textContent = `Página ${currentPage} de ${totalPages}`;
  prevPageBtn.disabled = currentPage <= 1;
  nextPageBtn.disabled = currentPage >= totalPages;
}

// ---------------------------------------------------------------------------
// Estados visuales: carga y error
// ---------------------------------------------------------------------------
function showLoading(isLoading) {
  loadingIndicator.classList.toggle("hidden", !isLoading);
}

function showError(message) {
  errorMessageEl.textContent = message;
  errorMessageEl.classList.remove("hidden");
}

function hideError() {
  errorMessageEl.classList.add("hidden");
}

// ---------------------------------------------------------------------------
// Tema claro/oscuro persistente
// ---------------------------------------------------------------------------
function applyStoredTheme() {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";
  document.documentElement.setAttribute("data-theme", storedTheme);
  themeToggleBtn.textContent = storedTheme === "dark" ? "☀️" : "🌙";
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  themeToggleBtn.textContent = nextTheme === "dark" ? "☀️" : "🌙";
}

// ---------------------------------------------------------------------------
// Debounce simple para no saturar la API mientras el usuario escribe
// ---------------------------------------------------------------------------
function debounce(callback, delayMs) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delayMs);
  };
}

const debouncedSearch = debounce(() => runSearch(), 500);

// ---------------------------------------------------------------------------
// Orquestación de la búsqueda según el modo activo (normal o favoritos)
// ---------------------------------------------------------------------------
function runSearch(page = 1) {
  if (isShowingFavoritesOnly) {
    fetchFavoriteCharacters();
  } else {
    fetchCharacters(page);
  }
}

function setFavoritesMode(enabled) {
  isShowingFavoritesOnly = enabled;
  showFavoritesBtn.classList.toggle("active", enabled);
  searchInput.disabled = enabled;
  statusFilter.disabled = enabled;
  searchBtn.disabled = enabled;
  runSearch();
}

// ---------------------------------------------------------------------------
// Registro de eventos
// ---------------------------------------------------------------------------
searchBtn.addEventListener("click", () => runSearch(1));
searchInput.addEventListener("input", debouncedSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") runSearch(1);
});
statusFilter.addEventListener("change", () => runSearch(1));

showFavoritesBtn.addEventListener("click", () =>
  setFavoritesMode(!isShowingFavoritesOnly),
);

prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) runSearch(currentPage - 1);
});
nextPageBtn.addEventListener("click", () => {
  if (currentPage < totalPages) runSearch(currentPage + 1);
});

themeToggleBtn.addEventListener("click", toggleTheme);
modalCloseBtn.addEventListener("click", closeCharacterModal);
characterModal.addEventListener("click", (event) => {
  if (event.target === characterModal) closeCharacterModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCharacterModal();
});

// ---------------------------------------------------------------------------
// Inicialización de la aplicación
// ---------------------------------------------------------------------------
applyStoredTheme();
runSearch(1);
