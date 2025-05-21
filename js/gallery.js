let artworks = [];
let filteredArtworks = [];
let currentPage = 1;
const itemsPerPage = 8;

// Fetch and render all
fetch('data/artworks.json')
  .then(res => res.json())
  .then(data => {
    artworks = data;
    filteredArtworks = artworks;
    renderFilters();
    renderGallery();
    renderPagination();
  });

function renderGallery() {
  const gallery = document.getElementById("gallery-grid");
  gallery.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredArtworks.slice(start, start + itemsPerPage);

  paginatedItems.forEach(art => {
    const item = document.createElement("div");
    item.className = "bg-black rounded-2xl shadow-xl p-2 transition transform hover:scale-105";

    item.innerHTML = `
      <div class="aspect-[4/3] overflow-hidden rounded-xl bg-gray-800 cursor-pointer" onclick="openLightbox('${art.image}', '${art.title}', '${art.description}')">
        <img loading="lazy" src="${art.image}" alt="${art.title}" class="w-full h-full object-contain" />
      </div>
      <h3 class="text-lg font-semibold text-white mt-2">${art.title}</h3>
      <p class="text-sm text-gray-400">${art.description}</p>
    `;
    gallery.appendChild(item);
  });
}

// Render filters
function renderFilters() {
  const categories = [...new Set(artworks.map(a => a.category || "All"))];
  const container = document.getElementById("filters");

  container.innerHTML = `
    <button onclick="filterGallery('All')" class="bg-pink-500 px-4 py-2 rounded hover:bg-pink-600">All</button>
  `;

  categories.forEach(cat => {
    if (cat !== "All") {
      container.innerHTML += `
        <button onclick="filterGallery('${cat}')" class="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">${cat}</button>
      `;
    }
  });
}

function filterGallery(category) {
  currentPage = 1;
  filteredArtworks = category === "All" ? artworks : artworks.filter(a => a.category === category);
  renderGallery();
  renderPagination();
}

// Pagination controls
function renderPagination() {
  const container = document.getElementById("pagination");
  container.innerHTML = "";
  const totalPages = Math.ceil(filteredArtworks.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    container.innerHTML += `
      <button onclick="goToPage(${i})" class="px-3 py-1 rounded ${i === currentPage ? 'bg-pink-500' : 'bg-gray-800 hover:bg-gray-700'}">${i}</button>
    `;
  }
}

function goToPage(page) {
  currentPage = page;
  renderGallery();
  renderPagination();
}

// Lightbox
function openLightbox(image, title, description) {
  const modal = document.createElement("div");
  modal.id = "lightbox-modal";
  modal.className = "fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center";
  modal.innerHTML = `
    <div class="bg-[#111] rounded-xl p-4 max-w-3xl mx-4 text-center relative">
      <button onclick="closeLightbox()" class="absolute top-2 right-4 text-white text-2xl">&times;</button>
      <img src="${image}" alt="${title}" class="max-h-[70vh] mx-auto rounded mb-4 object-contain" />
      <h2 class="text-xl font-bold text-white">${title}</h2>
      <p class="text-gray-400">${description}</p>
    </div>
  `;
  document.body.appendChild(modal);
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (modal) modal.remove();
}
