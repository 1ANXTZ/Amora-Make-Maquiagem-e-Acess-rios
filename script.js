/* =========================================================
   AMORA MAKE — script.js
   Dados de produtos (mock), renderização, filtro/busca,
   e carrinho 100% em frontend (sem backend, sem pagamento).
   ========================================================= */

/* ---------- Ícones (SVG inline por categoria) ---------- */
const ICONS = {
  batom: `<svg viewBox="0 0 64 64" width="100%" height="100%"><rect x="22" y="8" width="20" height="14" rx="4" fill="var(--color-berry-bright)"/><rect x="24" y="20" width="16" height="30" rx="6" fill="var(--color-berry-deep)"/><rect x="24" y="45" width="16" height="10" rx="3" fill="var(--color-gold)"/></svg>`,
  gloss: `<svg viewBox="0 0 64 64" width="100%" height="100%"><rect x="20" y="14" width="24" height="34" rx="7" fill="var(--color-berry-soft)"/><rect x="26" y="4" width="12" height="14" rx="4" fill="var(--color-gold)"/><ellipse cx="32" cy="34" rx="7" ry="10" fill="#fff" opacity="0.35"/></svg>`,
  base: `<svg viewBox="0 0 64 64" width="100%" height="100%"><rect x="18" y="16" width="28" height="36" rx="6" fill="var(--color-berry-deep)"/><rect x="24" y="8" width="16" height="10" rx="3" fill="var(--color-gold)"/><rect x="22" y="24" width="20" height="4" rx="2" fill="var(--color-cream)" opacity="0.7"/></svg>`,
  corretivo: `<svg viewBox="0 0 64 64" width="100%" height="100%"><rect x="27" y="6" width="10" height="40" rx="5" fill="var(--color-gold)"/><circle cx="32" cy="50" r="9" fill="var(--color-berry-bright)"/></svg>`,
  blush: `<svg viewBox="0 0 64 64" width="100%" height="100%"><circle cx="32" cy="34" r="22" fill="var(--color-blush)"/><circle cx="32" cy="34" r="22" fill="none" stroke="var(--color-gold)" stroke-width="2"/><circle cx="32" cy="34" r="10" fill="var(--color-berry-soft)"/></svg>`,
  mascara: `<svg viewBox="0 0 64 64" width="100%" height="100%"><rect x="28" y="6" width="8" height="16" rx="3" fill="var(--color-gold)"/><rect x="24" y="20" width="16" height="34" rx="7" fill="var(--color-ink)"/><rect x="27" y="26" width="10" height="4" rx="2" fill="var(--color-berry-bright)"/></svg>`,
  paleta: `<svg viewBox="0 0 64 64" width="100%" height="100%"><rect x="8" y="16" width="48" height="32" rx="6" fill="#fff"/><circle cx="20" cy="32" r="6" fill="var(--color-berry-bright)"/><circle cx="32" cy="32" r="6" fill="var(--color-gold)"/><circle cx="44" cy="32" r="6" fill="var(--color-berry-soft)"/></svg>`,
  pincel: `<svg viewBox="0 0 64 64" width="100%" height="100%"><rect x="29" y="6" width="6" height="20" rx="3" fill="var(--color-gold)"/><rect x="27" y="24" width="10" height="14" rx="3" fill="var(--color-ink)"/><path d="M20 38 Q32 30 44 38 Q40 56 32 58 Q24 56 20 38Z" fill="var(--color-berry-soft)"/></svg>`,
  acessorio: `<svg viewBox="0 0 64 64" width="100%" height="100%"><rect x="12" y="22" width="40" height="30" rx="8" fill="var(--color-berry-deep)"/><path d="M22 22 v-4 a10 10 0 0 1 20 0 v4" fill="none" stroke="var(--color-gold)" stroke-width="4"/></svg>`,
  maquiagem: `<svg viewBox="0 0 64 64" width="100%" height="100%"><circle cx="24" cy="26" r="12" fill="var(--color-berry-bright)"/><circle cx="38" cy="38" r="12" fill="var(--color-gold)" opacity="0.85"/></svg>`
};

const CATEGORY_LABELS = {
  maquiagem: "Maquiagem",
  batom: "Batom",
  gloss: "Gloss",
  base: "Base",
  corretivo: "Corretivo",
  blush: "Blush",
  mascara: "Máscara de Cílios",
  paleta: "Paletas",
  pincel: "Pincéis",
  acessorio: "Acessórios"
};

/* ---------- Dados fictícios de produtos ---------- */
/* Estrutura simples e fácil de editar/expandir futuramente */
const PRODUCTS = [
  { id: "p01", name: "Batom Amora Matte — Vinho Profundo", category: "batom", price: 39.9, oldPrice: 54.9, rating: 4.8, reviews: 128, badge: "Mais vendido" },
  { id: "p02", name: "Batom Líquido Amora Velvet", category: "batom", price: 44.9, oldPrice: null, rating: 4.6, reviews: 74 },
  { id: "p03", name: "Gloss Amora Efeito Espelhado", category: "gloss", price: 29.9, oldPrice: 36.9, rating: 4.7, reviews: 96 },
  { id: "p04", name: "Gloss Hidratante Amora Silvestre", category: "gloss", price: 27.5, oldPrice: null, rating: 4.4, reviews: 41 },
  { id: "p05", name: "Base Líquida Amora Alta Cobertura", category: "base", price: 69.9, oldPrice: 84.9, rating: 4.9, reviews: 203, badge: "Favorito" },
  { id: "p06", name: "Base Fluída Amora Toque Seco", category: "base", price: 62.0, oldPrice: null, rating: 4.5, reviews: 58 },
  { id: "p07", name: "Corretivo Amora Longa Duração", category: "corretivo", price: 34.9, oldPrice: 42.0, rating: 4.6, reviews: 87 },
  { id: "p08", name: "Corretivo Amora Iluminador", category: "corretivo", price: 32.0, oldPrice: null, rating: 4.3, reviews: 29 },
  { id: "p09", name: "Blush Compacto Amora Silvestre", category: "blush", price: 36.5, oldPrice: 45.0, rating: 4.7, reviews: 63 },
  { id: "p10", name: "Blush Líquido Amora Natural", category: "blush", price: 39.0, oldPrice: null, rating: 4.5, reviews: 34 },
  { id: "p11", name: "Máscara de Cílios Amora Volume+", category: "mascara", price: 42.9, oldPrice: 52.0, rating: 4.8, reviews: 152, badge: "Novo" },
  { id: "p12", name: "Máscara de Cílios Amora Curl Fix", category: "mascara", price: 40.0, oldPrice: null, rating: 4.4, reviews: 47 },
  { id: "p13", name: "Paleta de Sombras Amora Sunset", category: "paleta", price: 89.9, oldPrice: 119.9, rating: 4.9, reviews: 176, badge: "Edição limitada" },
  { id: "p14", name: "Paleta de Sombras Amora Nude", category: "paleta", price: 79.9, oldPrice: null, rating: 4.6, reviews: 65 },
  { id: "p15", name: "Kit Pincéis Amora Profissional (8 peças)", category: "pincel", price: 99.0, oldPrice: 139.0, rating: 4.9, reviews: 211, badge: "Mais vendido" },
  { id: "p16", name: "Pincel Amora para Base", category: "pincel", price: 24.9, oldPrice: null, rating: 4.5, reviews: 38 },
  { id: "p17", name: "Necessaire Amora Veludo", category: "acessorio", price: 54.9, oldPrice: 69.9, rating: 4.7, reviews: 52 },
  { id: "p18", name: "Espelho de Bolsa Amora", category: "acessorio", price: 19.9, oldPrice: null, rating: 4.3, reviews: 22 },
  { id: "p19", name: "Esponja de Maquiagem Amora Duo", category: "acessorio", price: 22.9, oldPrice: 28.0, rating: 4.6, reviews: 44 },
  { id: "p20", name: "Kit Maquiagem Amora Essencial", category: "maquiagem", price: 129.9, oldPrice: 169.9, rating: 4.9, reviews: 98, badge: "Novo" }
];

const FEATURED_CATEGORIES = ["maquiagem", "batom", "gloss", "base", "blush", "paleta", "pincel", "acessorio"];

/* ---------- Helpers ---------- */
const formatBRL = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const discountPercent = (price, oldPrice) =>
  oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

function starString(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

/* ---------- Estado ---------- */
let state = {
  filter: "todos",
  query: "",
  cart: [] // { id, qty }
};

/* ---------- Renderização: categorias em destaque ---------- */
function renderCategoryCards() {
  const grid = document.getElementById("catGrid");
  grid.innerHTML = FEATURED_CATEGORIES.map((cat) => `
    <button type="button" class="cat-card" data-filter="${cat}">
      <span class="cat-card-icon">${ICONS[cat] || ICONS.maquiagem}</span>
      <span class="cat-card-name">${CATEGORY_LABELS[cat]}</span>
    </button>
  `).join("");

  grid.querySelectorAll(".cat-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyFilter(btn.dataset.filter);
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* ---------- Renderização: card de produto ---------- */
function productCardHTML(product) {
  const discount = discountPercent(product.price, product.oldPrice);
  const icon = ICONS[product.category] || ICONS.maquiagem;

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-media">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        ${icon}
      </div>
      <div class="product-body">
        <span class="product-category">${CATEGORY_LABELS[product.category]}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <span class="stars" aria-hidden="true">${starString(product.rating)}</span>
          <span>${product.rating.toFixed(1)} (${product.reviews})</span>
        </div>
        <div class="product-price-row">
          <span class="product-price">${formatBRL(product.price)}</span>
          ${product.oldPrice ? `<span class="product-price-old">${formatBRL(product.oldPrice)}</span>` : ""}
          ${discount ? `<span class="product-discount">-${discount}%</span>` : ""}
        </div>
        <button type="button" class="product-add-btn" data-add="${product.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  `;
}

/* ---------- Renderização: grade principal (com filtro/busca) ---------- */
function renderProductGrid() {
  const grid = document.getElementById("productGrid");
  const empty = document.getElementById("emptyState");
  const label = document.getElementById("filterLabel");

  let list = PRODUCTS;
  if (state.filter !== "todos") {
    list = list.filter((p) => p.category === state.filter);
  }
  if (state.query.trim()) {
    const q = state.query.trim().toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q));
  }

  label.textContent = state.query.trim()
    ? `Resultados para "${state.query.trim()}" (${list.length})`
    : state.filter === "todos"
      ? `Mostrando todos os produtos (${list.length})`
      : `${CATEGORY_LABELS[state.filter]} (${list.length})`;

  if (list.length === 0) {
    grid.innerHTML = "";
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  grid.innerHTML = list.map(productCardHTML).join("");
  attachAddButtons(grid);
}

/* ---------- Renderização: seção de ofertas ---------- */
function renderOffersGrid() {
  const grid = document.getElementById("offersGrid");
  const offers = PRODUCTS.filter((p) => p.oldPrice).slice(0, 4);
  grid.innerHTML = offers.map(productCardHTML).join("");
  attachAddButtons(grid);
}

function attachAddButtons(container) {
  container.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      addToCart(btn.dataset.add);
      const original = btn.innerHTML;
      btn.classList.add("added");
      btn.innerHTML = "Adicionado ✓";
      setTimeout(() => {
        btn.classList.remove("added");
        btn.innerHTML = original;
      }, 1200);
    });
  });
}

/* ---------- Filtro por categoria ---------- */
function applyFilter(cat) {
  state.filter = cat;
  document.querySelectorAll(".category-nav-list a, .mobile-menu a").forEach((a) => {
    a.classList.toggle("active", a.dataset.filter === cat);
  });
  renderProductGrid();
}

document.querySelectorAll(".category-nav-list a, .mobile-menu a, .footer-col a[data-filter]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    applyFilter(link.dataset.filter);
    closeMobileMenu();
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  });
});

/* ---------- Busca ---------- */
document.getElementById("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  state.query = document.getElementById("searchInput").value;
  state.filter = "todos";
  document.querySelectorAll(".category-nav-list a").forEach((a) => a.classList.toggle("active", a.dataset.filter === "todos"));
  renderProductGrid();
  document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
});

/* ---------- Menu mobile ---------- */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

function openMobileMenu() {
  mobileMenu.hidden = false;
  overlay.hidden = false;
  menuToggle.setAttribute("aria-expanded", "true");
}
function closeMobileMenu() {
  mobileMenu.hidden = true;
  overlay.hidden = true;
  menuToggle.setAttribute("aria-expanded", "false");
}
menuToggle.addEventListener("click", () => {
  mobileMenu.hidden ? openMobileMenu() : closeMobileMenu();
});
overlay.addEventListener("click", closeMobileMenu);

/* ---------- Dropdown de usuário (mock) ---------- */
const userBtn = document.getElementById("userBtn");
const userDropdown = document.getElementById("userDropdown");
userBtn.addEventListener("click", () => {
  const isHidden = userDropdown.hidden;
  userDropdown.hidden = !isHidden;
  userBtn.setAttribute("aria-expanded", String(isHidden));
});
userDropdown.querySelector("[data-close-dropdown]").addEventListener("click", () => {
  userDropdown.hidden = true;
  userBtn.setAttribute("aria-expanded", "false");
});
document.addEventListener("click", (e) => {
  if (!userDropdown.hidden && !userDropdown.contains(e.target) && !userBtn.contains(e.target)) {
    userDropdown.hidden = true;
    userBtn.setAttribute("aria-expanded", "false");
  }
});

/* =========================================================
   CARRINHO (100% frontend — sem pagamento real)
   ========================================================= */
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartBtn = document.getElementById("cartBtn");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartCount = document.getElementById("cartCount");
const cartItemsEl = document.getElementById("cartItems");
const cartEmptyMsg = document.getElementById("cartEmptyMsg");
const cartFooter = document.getElementById("cartFooter");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const toast = document.getElementById("toast");

function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function addToCart(id) {
  const existing = state.cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id, qty: 1 });
  }
  renderCart();
  showToast("Produto adicionado ao carrinho ✓");
}

function updateQty(id, delta) {
  const item = state.cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter((i) => i.id !== id);
  }
  renderCart();
}

function removeFromCart(id) {
  state.cart = state.cart.filter((i) => i.id !== id);
  renderCart();
}

function cartTotalItems() {
  return state.cart.reduce((sum, item) => sum + item.qty, 0);
}
function cartSubtotal() {
  return state.cart.reduce((sum, item) => {
    const product = findProduct(item.id);
    return product ? sum + product.price * item.qty : sum;
  }, 0);
}

function renderCart() {
  cartCount.textContent = cartTotalItems();

  if (state.cart.length === 0) {
    cartEmptyMsg.hidden = false;
    cartFooter.hidden = true;
    cartItemsEl.querySelectorAll(".cart-item").forEach((el) => el.remove());
    return;
  }

  cartEmptyMsg.hidden = true;
  cartFooter.hidden = false;

  cartItemsEl.innerHTML = state.cart.map((item) => {
    const product = findProduct(item.id);
    if (!product) return "";
    const icon = ICONS[product.category] || ICONS.maquiagem;
    return `
      <div class="cart-item" data-id="${product.id}">
        <div class="cart-item-media">${icon}</div>
        <div>
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">${formatBRL(product.price)}</p>
          <div class="cart-item-qty">
            <button type="button" class="qty-btn" data-qty="-1" aria-label="Diminuir quantidade">−</button>
            <span>${item.qty}</span>
            <button type="button" class="qty-btn" data-qty="1" aria-label="Aumentar quantidade">+</button>
          </div>
        </div>
        <button type="button" class="cart-item-remove" data-remove>Remover</button>
      </div>
    `;
  }).join("");

  cartItemsEl.querySelectorAll(".cart-item").forEach((el) => {
    const id = el.dataset.id;
    el.querySelectorAll("[data-qty]").forEach((btn) => {
      btn.addEventListener("click", () => updateQty(id, Number(btn.dataset.qty)));
    });
    el.querySelector("[data-remove]").addEventListener("click", () => removeFromCart(id));
  });

  cartSubtotalEl.textContent = formatBRL(cartSubtotal());
}

function openCart() {
  cartDrawer.hidden = false;
  cartOverlay.hidden = false;
  cartBtn.setAttribute("aria-expanded", "true");
}
function closeCart() {
  cartDrawer.hidden = true;
  cartOverlay.hidden = true;
  cartBtn.setAttribute("aria-expanded", "false");
}
cartBtn.addEventListener("click", openCart);
cartCloseBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCart();
    closeMobileMenu();
  }
});
cartItemsEl.addEventListener("click", (e) => {
  if (e.target.matches("[data-close-cart]")) closeCart();
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  showToast("Esta é uma demonstração — pagamento ainda não implementado.");
});

/* ---------- Toast ---------- */
let toastTimeout;
function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add("show"));
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => { toast.hidden = true; }, 200);
  }, 2400);
}

/* ---------- Inicialização ---------- */
document.getElementById("anoAtual").textContent = new Date().getFullYear();
renderCategoryCards();
renderProductGrid();
renderOffersGrid();
renderCart();
