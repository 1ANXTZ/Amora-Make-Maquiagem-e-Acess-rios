# script.js

```javascript
/* =========================================================
   AMORA MAKE — script.js
   Produtos, categorias, busca, filtros, menu mobile,
   carrinho, autenticação Supabase, perfil e endereço.
   ========================================================= */


/* =========================================================
   SUPABASE
   ========================================================= */

const SUPABASE_URL =
  "https://xcwjqbqinnvnyiktyjbj.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_I8MW1Q8ovLLKI-Gb-MavTg_UankO-md";

let supabaseClient = null;

if (window.supabase) {
  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );

  console.log("Supabase conectado.");
} else {
  console.error(
    "Supabase não foi carregado. Verifique o script do Supabase no index.html."
  );
}


/* =========================================================
   ÍCONES
   ========================================================= */

const ICONS = {
  batom: `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect x="22" y="8" width="20" height="14" rx="4"
        fill="var(--color-berry-bright)"/>
      <rect x="24" y="20" width="16" height="30" rx="6"
        fill="var(--color-berry-deep)"/>
      <rect x="24" y="45" width="16" height="10" rx="3"
        fill="var(--color-gold)"/>
    </svg>
  `,

  gloss: `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect x="20" y="14" width="24" height="34" rx="7"
        fill="var(--color-berry-soft)"/>
      <rect x="26" y="4" width="12" height="14" rx="4"
        fill="var(--color-gold)"/>
      <ellipse cx="32" cy="34" rx="7" ry="10"
        fill="#fff" opacity="0.35"/>
    </svg>
  `,

  base: `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect x="18" y="16" width="28" height="36" rx="6"
        fill="var(--color-berry-deep)"/>
      <rect x="24" y="8" width="16" height="10" rx="3"
        fill="var(--color-gold)"/>
      <rect x="22" y="24" width="20" height="4" rx="2"
        fill="var(--color-cream)" opacity="0.7"/>
    </svg>
  `,

  corretivo: `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect x="27" y="6" width="10" height="40" rx="5"
        fill="var(--color-gold)"/>
      <circle cx="32" cy="50" r="9"
        fill="var(--color-berry-bright)"/>
    </svg>
  `,

  blush: `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <circle cx="32" cy="34" r="22"
        fill="var(--color-blush)"/>
      <circle cx="32" cy="34" r="22"
        fill="none"
        stroke="var(--color-gold)"
        stroke-width="2"/>
      <circle cx="32" cy="34" r="10"
        fill="var(--color-berry-soft)"/>
    </svg>
  `,

  mascara: `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect x="28" y="6" width="8" height="16" rx="3"
        fill="var(--color-gold)"/>
      <rect x="24" y="20" width="16" height="34" rx="7"
        fill="var(--color-ink)"/>
      <rect x="27" y="26" width="10" height="4" rx="2"
        fill="var(--color-berry-bright)"/>
    </svg>
  `,

  paleta: `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect x="8" y="16" width="48" height="32" rx="6"
        fill="#fff"/>
      <circle cx="20" cy="32" r="6"
        fill="var(--color-berry-bright)"/>
      <circle cx="32" cy="32" r="6"
        fill="var(--color-gold)"/>
      <circle cx="44" cy="32" r="6"
        fill="var(--color-berry-soft)"/>
    </svg>
  `,

  pincel: `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect x="29" y="6" width="6" height="20" rx="3"
        fill="var(--color-gold)"/>
      <rect x="27" y="24" width="10" height="14" rx="3"
        fill="var(--color-ink)"/>
      <path
        d="M20 38 Q32 30 44 38 Q40 56 32 58 Q24 56 20 38Z"
        fill="var(--color-berry-soft)"
      />
    </svg>
  `,

  acessorio: `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <rect x="12" y="22" width="40" height="30" rx="8"
        fill="var(--color-berry-deep)"/>
      <path
        d="M22 22 v-4 a10 10 0 0 1 20 0 v4"
        fill="none"
        stroke="var(--color-gold)"
        stroke-width="4"
      />
    </svg>
  `,

  maquiagem: `
    <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
      <circle cx="24" cy="26" r="12"
        fill="var(--color-berry-bright)"/>
      <circle cx="38" cy="38" r="12"
        fill="var(--color-gold)"
        opacity="0.85"/>
    </svg>
  `
};


/* =========================================================
   CATEGORIAS
   ========================================================= */

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


/* =========================================================
   PRODUTOS
   ========================================================= */

const PRODUCTS = [
  {
    id: "p01",
    name: "Esponja Chanfrada",
    category: "acessorio",
    price: 5.00,
    image: "images/produtos/esponja-chanfrada.jpeg"
  },
  {
    id: "p02",
    name: "Fixador Fix Matte",
    category: "maquiagem",
    price: 15.00,
    image: "images/produtos/fixador-fix-matte.jpeg"
  },
  {
    id: "p03",
    name: "Máscara de Cílios Alonga e Define",
    category: "mascara",
    price: 10.00,
    image: "images/produtos/mascara-de-cilios-alonga-e-define.jpeg"
  },
  {
    id: "p04",
    name: "Lip Oil Sweet Hello Kitty",
    category: "gloss",
    price: 10.00,
    image: "images/produtos/lip-oil-sweet-hello-kitty.jpeg"
  },
  {
    id: "p05",
    name: "Lip Oil Raios de Sol",
    category: "gloss",
    price: 10.00,
    image: "images/produtos/lip-oil-raios-de-sol.jpeg"
  },
  {
    id: "p06",
    name: "Demaquilante Aquatic Awe",
    category: "maquiagem",
    price: 10.00,
    image: "images/produtos/demaquilante-aquatic-awe.jpeg"
  },
  {
    id: "p07",
    name: "Demaquilante Sunset Coral",
    category: "maquiagem",
    price: 10.00,
    image: "images/produtos/demaquilante-sunset-coral.jpeg"
  },
  {
    id: "p08",
    name: "Perfume Capilar Atração Fatal",
    category: "acessorio",
    price: 10.00,
    image: "images/produtos/perfume-capilar-atracao-fatal.jpeg"
  },
  {
    id: "p09",
    name: "Perfume Capilar Desejo Secreto",
    category: "acessorio",
    price: 10.00,
    image: "images/produtos/perfume-capilar-desejo-secreto.jpeg"
  },
  {
    id: "p10",
    name: "Delineador Líquido Super Poderes",
    category: "maquiagem",
    price: 10.00,
    image: "images/produtos/delineador-liquido-super-poderes.jpeg"
  },
  {
    id: "p11",
    name: "Folhas Antioliosidade",
    category: "maquiagem",
    price: 10.00,
    image: "images/produtos/folhas-anti-oleosidade.jpeg"
  },
  {
    id: "p12",
    name: "Esfoliante Labial Honey Scrub Vivai",
    category: "maquiagem",
    price: 10.00,
    image: "images/produtos/esfoliante-labial-honey-scrub-vivai.jpeg"
  },
  {
    id: "p13",
    name: "Pó Compacto Efeito Aveludado",
    category: "maquiagem",
    price: 10.00,
    image: "images/produtos/po-compacto-efeito-aveludado.jpeg"
  },
  {
    id: "p14",
    name: "Par de Cílios 6D",
    category: "acessorio",
    price: 10.00,
    image: "images/produtos/par-de-cilios-6d.jpeg"
  },
  {
    id: "p15",
    name: "Batom Bala Matte Lovely",
    category: "batom",
    price: 10.00,
    image: "images/produtos/batom-bala-matte-lovely.jpeg"
  },
  {
    id: "p16",
    name: "Pincel para Esfumar",
    category: "pincel",
    price: 10.00,
    image: "images/produtos/pincel-p-esfumar.jpeg"
  },
  {
    id: "p17",
    name: "Pincel para Corretivo Língua de Gato",
    category: "pincel",
    price: 10.00,
    image: "images/produtos/pincel-p-corretivo-lingua-de-gato.jpeg"
  },
  {
    id: "p18",
    name: "Elástico para Cabelo",
    category: "acessorio",
    price: 5.00,
    image: "images/produtos/elastico-p-cabelo.jpeg"
  },
  {
    id: "p19",
    name: "Kit com 2 Esponjas para Pó",
    category: "acessorio",
    price: 5.00,
    image: "images/produtos/kit-c-2-esponjas-p-po.jpeg"
  },
  {
    id: "p20",
    name: "Máscara Facial Peel Off Total Black",
    category: "maquiagem",
    price: 5.00,
    image: "images/produtos/mascara-facial-peel-off-total-black.jpeg"
  },
  {
    id: "p21",
    name: "Hidratante Facial Rosa Mosqueta",
    category: "maquiagem",
    price: 5.00,
    image: "images/produtos/hidratante-facial-rosa-mosqueta.jpeg"
  },
  {
    id: "p22",
    name: "Mini Batom Princesa",
    category: "batom",
    price: 5.00,
    image: "images/produtos/mini-batom-princesa.jpeg"
  }
];


const FEATURED_CATEGORIES = [
  "maquiagem",
  "batom",
  "gloss",
  "base",
  "blush",
  "paleta",
  "pincel",
  "acessorio"
];


/* =========================================================
   ESTADO
   ========================================================= */

const state = {
  filter: "todos",
  query: "",
  cart: [],
  user: null,
  profile: null
};


/* =========================================================
   DOM
   ========================================================= */

const elements = {
  catGrid: document.getElementById("catGrid"),
  productGrid: document.getElementById("productGrid"),
  offersGrid: document.getElementById("offersGrid"),

  emptyState: document.getElementById("emptyState"),
  filterLabel: document.getElementById("filterLabel"),

  searchForm: document.getElementById("searchForm"),
  searchInput: document.getElementById("searchInput"),

  menuToggle: document.getElementById("menuToggle"),
  mobileMenu: document.getElementById("mobileMenu"),
  overlay: document.getElementById("overlay"),

  userBtn: document.getElementById("userBtn"),
  userDropdown: document.getElementById("userDropdown"),

  cartBtn: document.getElementById("cartBtn"),
  cartCloseBtn: document.getElementById("cartCloseBtn"),
  cartDrawer: document.getElementById("cartDrawer"),
  cartOverlay: document.getElementById("cartOverlay"),

  cartCount: document.getElementById("cartCount"),
  cartItemsList: document.getElementById("cartItemsList"),
  cartEmptyMsg: document.getElementById("cartEmptyMsg"),
  cartFooter: document.getElementById("cartFooter"),
  cartSubtotal: document.getElementById("cartSubtotal"),
  checkoutBtn: document.getElementById("checkoutBtn"),

  toast: document.getElementById("toast"),
  anoAtual: document.getElementById("anoAtual")
};


/* =========================================================
   HELPERS
   ========================================================= */

function formatBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


function normalizeText(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}


function getProductIcon(category) {
  return ICONS[category] || ICONS.maquiagem;
}


function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || "Maquiagem";
}


function getProductImage(product) {
  if (!product.image) {
    return getProductIcon(product.category);
  }

  return `
    <img
      src="${product.image}"
      alt="${product.name}"
      loading="lazy"
      decoding="async"
    >
  `;
}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer = null;

function showToast(message) {
  if (!elements.toast) {
    alert(message);
    return;
  }

  elements.toast.textContent = message;
  elements.toast.hidden = false;

  requestAnimationFrame(() => {
    elements.toast.classList.add("show");
  });

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    elements.toast.classList.remove("show");

    setTimeout(() => {
      elements.toast.hidden = true;
    }, 220);
  }, 2400);
}


/* =========================================================
   CATEGORIAS
   ========================================================= */

function renderCategoryCards() {
  if (!elements.catGrid) return;

  elements.catGrid.innerHTML =
    FEATURED_CATEGORIES.map(category => `
      <button
        type="button"
        class="cat-card"
        data-filter="${category}"
      >
        <span class="cat-card-icon">
          ${getProductIcon(category)}
        </span>

        <span class="cat-card-name">
          ${getCategoryLabel(category)}
        </span>
      </button>
    `).join("");
}


/* =========================================================
   PRODUTOS
   ========================================================= */

function createProductCard(product) {
  const isInCart = state.cart.some(
    item => item.id === product.id
  );

  return `
    <article class="product-card">

      <div class="product-media">
        ${getProductImage(product)}
      </div>

      <div class="product-body">

        <span class="product-category">
          ${getCategoryLabel(product.category)}
        </span>

        <h3 class="product-name">
          ${product.name}
        </h3>

        <div class="product-price-row">
          <span class="product-price">
            ${formatBRL(product.price)}
          </span>
        </div>

        <button
          type="button"
          class="product-add-btn ${isInCart ? "added" : ""}"
          data-add-cart="${product.id}"
        >
          ${
            isInCart
              ? "✓ Adicionado ao carrinho"
              : "Adicionar ao carrinho"
          }
        </button>

      </div>

    </article>
  `;
}


function getFilteredProducts() {
  const query = normalizeText(state.query);

  return PRODUCTS.filter(product => {

    const matchesFilter =
      state.filter === "todos" ||
      product.category === state.filter;

    const searchableText = normalizeText(
      `${product.name} ${getCategoryLabel(product.category)}`
    );

    const matchesQuery =
      !query ||
      searchableText.includes(query);

    return matchesFilter && matchesQuery;
  });
}


function updateFilterLabel(total) {
  if (!elements.filterLabel) return;

  if (state.query) {
    elements.filterLabel.textContent =
      `${total} produto${total === 1 ? "" : "s"} encontrado${total === 1 ? "" : "s"}`;

    return;
  }

  if (state.filter === "todos") {
    elements.filterLabel.textContent =
      `Mostrando todos os ${PRODUCTS.length} produtos`;

    return;
  }

  elements.filterLabel.textContent =
    `Mostrando ${total} produto${total === 1 ? "" : "s"} em ${getCategoryLabel(state.filter)}`;
}


function renderProducts() {
  if (!elements.productGrid) return;

  const products = getFilteredProducts();

  elements.productGrid.innerHTML =
    products.map(createProductCard).join("");

  if (elements.emptyState) {
    elements.emptyState.hidden =
      products.length !== 0;
  }

  updateFilterLabel(products.length);
}


function renderOffers() {
  if (!elements.offersGrid) return;

  const featuredProducts =
    PRODUCTS.slice(0, 6);

  elements.offersGrid.innerHTML =
    featuredProducts.map(createProductCard).join("");
}


/* =========================================================
   FILTROS
   ========================================================= */

function setFilter(filter) {
  state.filter = filter || "todos";

  updateActiveFilters();
  renderProducts();

  const productsSection =
    document.getElementById("produtos");

  if (productsSection) {
    productsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


function updateActiveFilters() {
  document
    .querySelectorAll("[data-filter]")
    .forEach(element => {

      const filter =
        element.dataset.filter;

      if (
        element.matches(".category-nav-list a") ||
        element.matches(".mobile-menu a")
      ) {
        element.classList.toggle(
          "active",
          filter === state.filter
        );
      }
    });
}


/* =========================================================
   BUSCA
   ========================================================= */

function handleSearch(event) {
  event.preventDefault();

  state.query =
    elements.searchInput
      ? elements.searchInput.value
      : "";

  renderProducts();

  const productsSection =
    document.getElementById("produtos");

  if (productsSection) {
    productsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* =========================================================
   CARRINHO
   ========================================================= */

function openCart() {
  if (!elements.cartDrawer) return;

  closeUserDropdown();
  closeMobileMenu();

  elements.cartDrawer.hidden = false;

  if (elements.cartOverlay) {
    elements.cartOverlay.hidden = false;
  }

  if (elements.cartBtn) {
    elements.cartBtn.setAttribute(
      "aria-expanded",
      "true"
    );
  }

  document.body.style.overflow = "hidden";

  renderCart();
}


function closeCart() {
  if (!elements.cartDrawer) return;

  elements.cartDrawer.hidden = true;

  if (elements.cartOverlay) {
    elements.cartOverlay.hidden = true;
  }

  if (elements.cartBtn) {
    elements.cartBtn.setAttribute(
      "aria-expanded",
      "false"
    );
  }

  document.body.style.overflow = "";
}


function toggleCart() {
  if (!elements.cartDrawer) return;

  if (elements.cartDrawer.hidden) {
    openCart();
  } else {
    closeCart();
  }
}


function addToCart(productId) {
  const product =
    PRODUCTS.find(item => item.id === productId);

  if (!product) return;

  const existingItem =
    state.cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      quantity: 1
    });
  }

  saveCart();

  updateCartCount();
  renderCart();
  renderProducts();
  renderOffers();

  showToast(
    `${product.name} foi adicionado ao carrinho.`
  );
}


function removeFromCart(productId) {
  state.cart =
    state.cart.filter(
      item => item.id !== productId
    );

  saveCart();

  updateCartCount();
  renderCart();
  renderProducts();
  renderOffers();
}


function changeQuantity(productId, amount) {
  const item =
    state.cart.find(
      cartItem => cartItem.id === productId
    );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();

  updateCartCount();
  renderCart();
  renderProducts();
  renderOffers();
}


function updateCartCount() {
  if (!elements.cartCount) return;

  const totalItems =
    state.cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  elements.cartCount.textContent =
    totalItems;
}


function calculateCartSubtotal() {
  return state.cart.reduce(
    (total, item) => {

      const product =
        PRODUCTS.find(
          productItem =>
            productItem.id === item.id
        );

      if (!product) return total;

      return total +
        product.price * item.quantity;

    },
    0
  );
}


function renderCart() {
  if (!elements.cartItemsList) return;

  const hasItems =
    state.cart.length > 0;

  if (elements.cartEmptyMsg) {
    elements.cartEmptyMsg.hidden =
      hasItems;
  }

  if (!hasItems) {

    elements.cartItemsList.innerHTML = "";

    if (elements.cartFooter) {
      elements.cartFooter.hidden = true;
    }

    if (elements.cartSubtotal) {
      elements.cartSubtotal.textContent =
        formatBRL(0);
    }

    updateCartCount();

    return;
  }

  elements.cartItemsList.innerHTML =
    state.cart.map(item => {

      const product =
        PRODUCTS.find(
          productItem =>
            productItem.id === item.id
        );

      if (!product) return "";

      const itemTotal =
        product.price * item.quantity;

      return `
        <div class="cart-item">

          <div class="cart-item-media">
            ${getProductImage(product)}
          </div>

          <div>

            <p class="cart-item-name">
              ${product.name}
            </p>

            <p class="cart-item-price">
              ${formatBRL(itemTotal)}
            </p>

            <div class="cart-item-qty">

              <button
                type="button"
                class="qty-btn"
                data-qty-minus="${product.id}"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                type="button"
                class="qty-btn"
                data-qty-plus="${product.id}"
              >
                +
              </button>

            </div>

          </div>

          <button
            type="button"
            class="cart-item-remove"
            data-remove-cart="${product.id}"
          >
            Remover
          </button>

        </div>
      `;

    }).join("");

  const subtotal =
    calculateCartSubtotal();

  if (elements.cartSubtotal) {
    elements.cartSubtotal.textContent =
      formatBRL(subtotal);
  }

  if (elements.cartFooter) {
    elements.cartFooter.hidden = false;
  }

  updateCartCount();
}


function saveCart() {
  localStorage.setItem(
    "amora_make_cart",
    JSON.stringify(state.cart)
  );
}


function loadCart() {
  try {

    const saved =
      localStorage.getItem(
        "amora_make_cart"
      );

    if (!saved) return;

    const parsed =
      JSON.parse(saved);

    if (Array.isArray(parsed)) {
      state.cart = parsed;
    }

  } catch (error) {

    console.error(
      "Erro ao carregar carrinho:",
      error
    );

    state.cart = [];
  }
}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function openMobileMenu() {
  if (!elements.mobileMenu) return;

  closeUserDropdown();
  closeCart();

  elements.mobileMenu.hidden = false;

  if (elements.overlay) {
    elements.overlay.hidden = false;
  }

  if (elements.menuToggle) {
    elements.menuToggle.setAttribute(
      "aria-expanded",
      "true"
    );
  }

  document.body.style.overflow =
    "hidden";
}


function closeMobileMenu() {
  if (!elements.mobileMenu) return;

  elements.mobileMenu.hidden = true;

  if (elements.overlay) {
    elements.overlay.hidden = true;
  }

  if (elements.menuToggle) {
    elements.menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  }

  if (
    !elements.cartDrawer ||
    elements.cartDrawer.hidden
  ) {
    document.body.style.overflow = "";
  }
}


function toggleMobileMenu() {
  if (!elements.mobileMenu) return;

  if (elements.mobileMenu.hidden) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
}


/* =========================================================
   CONTA / LOGIN
   ========================================================= */

function openUserDropdown() {
  if (!elements.userDropdown) return;

  closeMobileMenu();
  closeCart();

  elements.userDropdown.hidden =
    false;

  if (elements.userBtn) {
    elements.userBtn.setAttribute(
      "aria-expanded",
      "true"
    );
  }

  updateUserDropdown();
}


function closeUserDropdown() {
  if (!elements.userDropdown) return;

  elements.userDropdown.hidden =
    true;

  if (elements.userBtn) {
    elements.userBtn.setAttribute(
      "aria-expanded",
      "false"
    );
  }
}


function toggleUserDropdown() {
  if (!elements.userDropdown) return;

  if (elements.userDropdown.hidden) {
    openUserDropdown();
  } else {
    closeUserDropdown();
  }
}


/* =========================================================
   CRIA ÁREA DE LOGIN DINAMICAMENTE
   ========================================================= */

function updateUserDropdown() {
  if (!elements.userDropdown) return;

  if (!state.user) {

    elements.userDropdown.innerHTML = `
      <div class="user-dropdown-inner">

        <p class="user-dropdown-title">
          Área da cliente
        </p>

        <p class="user-dropdown-text">
          Entre na sua conta ou crie seu cadastro.
        </p>

        <button
          type="button"
          class="btn btn-primary btn-small btn-full"
          data-login-action="login"
        >
          Entrar
        </button>

        <button
          type="button"
          class="btn btn-ghost btn-small btn-full"
          data-login-action="signup"
        >
          Criar conta
        </button>

      </div>
    `;

    return;
  }


  const name =
    state.profile?.nome ||
    state.user.user_metadata?.nome ||
    state.user.email ||
    "Cliente";

  elements.userDropdown.innerHTML = `
    <div class="user-dropdown-inner">

      <p class="user-dropdown-title">
        Olá, ${escapeHTML(name)}
      </p>

      <p class="user-dropdown-text">
        Sua conta está conectada.
      </p>

      <button
        type="button"
        class="btn btn-primary btn-small btn-full"
        data-login-action="profile"
      >
        Meu perfil
      </button>

      <button
        type="button"
        class="btn btn-ghost btn-small btn-full"
        data-login-action="logout"
      >
        Sair da conta
      </button>

    </div>
  `;
}


function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* =========================================================
   MODAL DE AUTENTICAÇÃO
   ========================================================= */

function createAuthModal() {

  if (document.getElementById("authModal")) {
    return;
  }

  const modal =
    document.createElement("div");

  modal.id = "authModal";
  modal.className = "auth-modal";
  modal.hidden = true;

  modal.innerHTML = `
    <div
      class="auth-modal-overlay"
      data-auth-close
    ></div>

    <div
      class="auth-modal-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="authModalTitle"
    >

      <button
        type="button"
        class="auth-modal-close"
        aria-label="Fechar"
        data-auth-close
      >
        ×
      </button>

      <h2 id="authModalTitle">
        Entrar
      </h2>

      <p
        class="auth-modal-description"
        id="authModalDescription"
      >
        Entre na sua conta Amora Make.
      </p>

      <form id="authForm">

        <div
          class="auth-name-field"
          id="authNameField"
          hidden
        >

          <label for="authName">
            Nome
          </label>

          <input
            type="text"
            id="authName"
            autocomplete="name"
          >

        </div>


        <div>

          <label for="authEmail">
            E-mail
          </label>

          <input
            type="email"
            id="authEmail"
            autocomplete="email"
            required
          >

        </div>


        <div>

          <label for="authPassword">
            Senha
          </label>

          <input
            type="password"
            id="authPassword"
            autocomplete="current-password"
            minlength="6"
            required
          >

        </div>


        <div
          class="auth-address-fields"
          id="authAddressFields"
          hidden
        >

          <h3>
            Endereço de entrega
          </h3>

          <div>

            <label for="authCep">
              CEP
            </label>

            <input
              type="text"
              id="authCep"
              autocomplete="postal-code"
              inputmode="numeric"
            >

          </div>


          <div>

            <label for="authRua">
              Rua
            </label>

            <input
              type="text"
              id="authRua"
              autocomplete="street-address"
            >

          </div>


          <div>

            <label for="authNumero">
              Número
            </label>

            <input
              type="text"
              id="authNumero"
              autocomplete="address-line2"
            >

          </div>


          <div>

            <label for="authComplemento">
              Complemento
            </label>

            <input
              type="text"
              id="authComplemento"
              autocomplete="off"
            >

          </div>


          <div>

            <label for="authBairro">
              Bairro
            </label>

            <input
              type="text"
              id="authBairro"
              autocomplete="address-level3"
            >

          </div>


          <div>

            <label for="authCidade">
              Cidade
            </label>

            <input
              type="text"
              id="authCidade"
              autocomplete="address-level2"
            >

          </div>


          <div>

            <label for="authEstado">
              Estado
            </label>

            <input
              type="text"
              id="authEstado"
              maxlength="2"
              autocomplete="address-level1"
            >

          </div>

        </div>


        <button
          type="submit"
          class="btn btn-primary btn-full"
          id="authSubmit"
        >
          Entrar
        </button>

      </form>


      <button
        type="button"
        class="auth-switch"
        id="authSwitch"
      >
        Ainda não tenho uma conta
      </button>


      <p
        class="auth-message"
        id="authMessage"
        aria-live="polite"
      ></p>

    </div>
  `;

  document.body.appendChild(modal);

  setupAuthModalEvents();
}


let authMode = "login";


function openAuthModal(mode = "login") {

  createAuthModal();

  authMode = mode;

  const modal =
    document.getElementById("authModal");

  if (!modal) return;

  modal.hidden = false;

  updateAuthModal();

  document.body.style.overflow =
    "hidden";
}


function closeAuthModal() {

  const modal =
    document.getElementById("authModal");

  if (!modal) return;

  modal.hidden = true;

  document.body.style.overflow = "";
}


function updateAuthModal() {

  const title =
    document.getElementById("authModalTitle");

  const description =
    document.getElementById("authModalDescription");

  const nameField =
    document.getElementById("authNameField");

  const addressFields =
    document.getElementById("authAddressFields");

  const submit =
    document.getElementById("authSubmit");

  const switchButton =
    document.getElementById("authSwitch");

  if (!title) return;


  if (authMode === "signup") {

    title.textContent =
      "Criar conta";

    description.textContent =
      "Crie sua conta e salve seu endereço de entrega.";

    nameField.hidden = false;

    addressFields.hidden = false;

    submit.textContent =
      "Criar minha conta";

    switchButton.textContent =
      "Já tenho uma conta";

    return;
  }


  title.textContent =
    "Entrar";

  description.textContent =
    "Entre na sua conta Amora Make.";

  nameField.hidden = true;

  addressFields.hidden = true;

  submit.textContent =
    "Entrar";

  switchButton.textContent =
    "Ainda não tenho uma conta";
}


function setupAuthModalEvents() {

  const modal =
    document.getElementById("authModal");

  if (!modal) return;


  modal.addEventListener(
    "click",
    event => {

      if (
        event.target.matches(
          "[data-auth-close]"
        )
      ) {
        closeAuthModal();
      }

    }
  );


  const switchButton =
    document.getElementById(
      "authSwitch"
    );

  if (switchButton) {

    switchButton.addEventListener(
      "click",
      () => {

        authMode =
          authMode === "login"
            ? "signup"
            : "login";

        updateAuthModal();

      }
    );

  }


  const form =
    document.getElementById(
      "authForm"
    );

  if (form) {

    form.addEventListener(
      "submit",
      handleAuthSubmit
    );

  }
}


/* =========================================================
   LOGIN / CADASTRO
   ========================================================= */

async function handleAuthSubmit(event) {

  event.preventDefault();

  if (!supabaseClient) {

    showAuthMessage(
      "Supabase não está conectado."
    );

    return;
  }


  const email =
    document
      .getElementById("authEmail")
      ?.value
      .trim();

  const password =
    document
      .getElementById("authPassword")
      ?.value;


  if (!email || !password) {

    showAuthMessage(
      "Preencha e-mail e senha."
    );

    return;
  }


  if (authMode === "login") {

    await loginUser(
      email,
      password
    );

    return;
  }


  await signupUser(
    email,
    password
  );
}


/* =========================================================
   CRIAR CONTA
   ========================================================= */

async function signupUser(
  email,
  password
) {

  const submit =
    document.getElementById(
      "authSubmit"
    );

  if (submit) {
    submit.disabled = true;
    submit.textContent =
      "Criando conta...";
  }


  try {

    const nome =
      document
        .getElementById("authName")
        ?.value
        .trim();


    if (!nome) {

      showAuthMessage(
        "Informe seu nome."
      );

      return;
    }


    const {
      data,
      error
    } =
      await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome
          }
        }
      });


    if (error) {
      throw error;
    }


    if (!data.user) {
      throw new Error(
        "Não foi possível criar o usuário."
      );
    }


    state.user =
      data.user;


    /*
     * Caso o projeto esteja configurado
     * para exigir confirmação de e-mail,
     * o usuário ainda não estará autenticado.
     */

    if (!data.session) {

      showAuthMessage(
        "Conta criada! Verifique seu e-mail para confirmar a conta antes de entrar."
      );

      return;
    }


    await saveUserProfile(
      data.user.id
    );


    await loadUserProfile();


    closeAuthModal();
    updateUserDropdown();

    showToast(
      "Conta criada com sucesso!"
    );

  } catch (error) {

    console.error(
      "Erro ao criar conta:",
      error
    );

    showAuthMessage(
      translateSupabaseError(
        error
      )
    );

  } finally {

    if (submit) {
      submit.disabled = false;

      submit.textContent =
        "Criar minha conta";
    }

  }
}


/* =========================================================
   LOGIN
   ========================================================= */

async function loginUser(
  email,
  password
) {

  const submit =
    document.getElementById(
      "authSubmit"
    );

  if (submit) {
    submit.disabled = true;
    submit.textContent =
      "Entrando...";
  }


  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.signInWithPassword({
        email,
        password
      });


    if (error) {
      throw error;
    }


    state.user =
      data.user;


    await loadUserProfile();


    closeAuthModal();

    updateUserDropdown();

    showToast(
      "Login realizado com sucesso!"
    );

  } catch (error) {

    console.error(
      "Erro ao entrar:",
      error
    );

    showAuthMessage(
      translateSupabaseError(
        error
      )
    );

  } finally {

    if (submit) {
      submit.disabled = false;
      submit.textContent =
        "Entrar";
    }

  }
}


/* =========================================================
   SALVAR PERFIL E ENDEREÇO
   ========================================================= */

async function saveUserProfile(
  userId
) {

  if (!supabaseClient) return;


  const nome =
    document
      .getElementById("authName")
      ?.value
      .trim() || "";


  const cep =
    document
      .getElementById("authCep")
      ?.value
      .trim() || "";


  const rua =
    document
      .getElementById("authRua")
      ?.value
      .trim() || "";


  const numero =
    document
      .getElementById("authNumero")
      ?.value
      .trim() || "";


  const complemento =
    document
      .getElementById("authComplemento")
      ?.value
      .trim() || "";


  const bairro =
    document
      .getElementById("authBairro")
      ?.value
      .trim() || "";


  const cidade =
    document
      .getElementById("authCidade")
      ?.value
      .trim() || "";


  const estado =
    document
      .getElementById("authEstado")
      ?.value
      .trim()
      .toUpperCase() || "";


  /*
   * Tabela profiles
   */

  const {
    error: profileError
  } =
    await supabaseClient
      .from("profiles")
      .upsert(
        {
          id: userId,
          nome
        },
        {
          onConflict: "id"
        }
      );


  if (profileError) {
    console.error(
      "Erro ao salvar perfil:",
      profileError
    );
  }


  /*
   * Tabela addresses
   */

  const {
    error: addressError
  } =
    await supabaseClient
      .from("addresses")
      .upsert(
        {
          user_id: userId,
          cep,
          rua,
          numero,
          complemento,
          bairro,
          cidade,
          estado
        },
        {
          onConflict: "user_id"
        }
      );


  if (addressError) {

    console.error(
      "Erro ao salvar endereço:",
      addressError
    );

    /*
     * Não interrompe o cadastro inteiro
     * caso a tabela de endereço ainda
     * esteja sendo configurada.
     */
  }
}


/* =========================================================
   CARREGAR PERFIL
   ========================================================= */

async function loadUserProfile() {

  if (
    !supabaseClient ||
    !state.user
  ) {
    return;
  }


  try {

    const {
      data: profile,
      error: profileError
    } =
      await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", state.user.id)
        .maybeSingle();


    if (profileError) {
      console.error(
        "Erro ao carregar perfil:",
        profileError
      );
    }


    const {
      data: address,
      error: addressError
    } =
      await supabaseClient
        .from("addresses")
        .select("*")
        .eq(
          "user_id",
          state.user.id
        )
        .maybeSingle();


    if (addressError) {
      console.error(
        "Erro ao carregar endereço:",
        addressError
      );
    }


    state.profile = {
      ...(profile || {}),
      address:
        address || {}
    };

  } catch (error) {

    console.error(
      "Erro ao carregar dados do usuário:",
      error
    );

  }
}


/* =========================================================
   PERFIL
   ========================================================= */

function showProfile() {

  if (!state.user) {
    openAuthModal("login");
    return;
  }


  const profile =
    state.profile || {};

  const address =
    profile.address || {};


  const modal =
    document.getElementById(
      "authModal"
    );


  if (!modal) {
    createAuthModal();
  }


  const currentModal =
    document.getElementById(
      "authModal"
    );


  const card =
    currentModal?.querySelector(
      ".auth-modal-card"
    );


  if (!card) return;


  card.innerHTML = `

    <button
      type="button"
      class="auth-modal-close"
      aria-label="Fechar"
      data-auth-close
    >
      ×
    </button>

    <h2>
      Meu perfil
    </h2>

    <p class="auth-modal-description">
      Seus dados cadastrados.
    </p>


    <div class="profile-info">

      <div>
        <strong>
          Nome
        </strong>

        <span>
          ${escapeHTML(
            profile.nome ||
            state.user.email ||
            "Não informado"
          )}
        </span>
      </div>


      <div>
        <strong>
          E-mail
        </strong>

        <span>
          ${escapeHTML(
            state.user.email || ""
          )}
        </span>
      </div>


      <h3>
        Endereço de entrega
      </h3>


      <div>
        <strong>
          CEP
        </strong>

        <span>
          ${escapeHTML(
            address.cep || "Não informado"
          )}
        </span>
      </div>


      <div>
        <strong>
          Endereço
        </strong>

        <span>
          ${escapeHTML(
            address.rua
              ? `${address.rua}, ${address.numero || "s/n"}`
              : "Não informado"
          )}
        </span>
      </div>


      <div>
        <strong>
          Bairro
        </strong>

        <span>
          ${escapeHTML(
            address.bairro ||
            "Não informado"
          )}
        </span>
      </div>


      <div>
        <strong>
          Cidade / Estado
        </strong>

        <span>
          ${escapeHTML(
            address.cidade
              ? `${address.cidade} - ${address.estado || ""}`
              : "Não informado"
          )}
        </span>
      </div>


      ${
        address.complemento
          ? `
            <div>
              <strong>
                Complemento
              </strong>

              <span>
                ${escapeHTML(
                  address.complemento
                )}
              </span>
            </div>
          `
          : ""
      }

    </div>


    <button
      type="button"
      class="btn btn-ghost btn-small btn-full"
      data-auth-close
    >
      Fechar
    </button>
  `;


  currentModal.hidden = false;

  currentModal
    .querySelectorAll(
      "[data-auth-close]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        closeAuthModal
      );

    });
}


/* =========================================================
   LOGOUT
   ========================================================= */

async function logoutUser() {

  if (!supabaseClient) return;

  try {

    const {
      error
    } =
      await supabaseClient.auth.signOut();

    if (error) {
      throw error;
    }


    state.user = null;
    state.profile = null;

    updateUserDropdown();

    closeUserDropdown();

    showToast(
      "Você saiu da sua conta."
    );

  } catch (error) {

    console.error(
      "Erro ao sair:",
      error
    );

    showToast(
      "Não foi possível sair da conta."
    );
  }
}


/* =========================================================
   MENSAGEM DE AUTENTICAÇÃO
   ========================================================= */

function showAuthMessage(message) {

  const element =
    document.getElementById(
      "authMessage"
    );

  if (!element) return;

  element.textContent =
    message;
}


function translateSupabaseError(error) {

  const message =
    error?.message ||
    "Ocorreu um erro.";

  const normalized =
    normalizeText(message);


  if (
    normalized.includes(
      "invalid login credentials"
    )
  ) {
    return "E-mail ou senha incorretos.";
  }


  if (
    normalized.includes(
      "user already registered"
    )
  ) {
    return "Esse e-mail já possui uma conta.";
  }


  if (
    normalized.includes(
      "password should be at least"
    )
  ) {
    return "A senha precisa ter pelo menos 6 caracteres.";
  }


  if (
    normalized.includes(
      "email not confirmed"
    )
  ) {
    return "Seu e-mail ainda não foi confirmado.";
  }


  if (
    normalized.includes(
      "rate limit"
    )
  ) {
    return "Muitas tentativas. Aguarde um pouco e tente novamente.";
  }


  return message;
}


/* =========================================================
   SESSÃO DO SUPABASE
   ========================================================= */

async function loadCurrentUser() {

  if (!supabaseClient) {
    return;
  }


  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.getSession();


    if (error) {
      throw error;
    }


    state.user =
      data.session?.user || null;


    if (state.user) {
      await loadUserProfile();
    }


    updateUserDropdown();

  } catch (error) {

    console.error(
      "Erro ao verificar sessão:",
      error
    );

  }
}


/* =========================================================
   OBSERVAR LOGIN / LOGOUT
   ========================================================= */

function setupAuthListener() {

  if (!supabaseClient) return;

  supabaseClient.auth.onAuthStateChange(
    async (_event, session) => {

      state.user =
        session?.user || null;

      if (state.user) {
        await loadUserProfile();
      } else {
        state.profile = null;
      }

      updateUserDropdown();
    }
  );
}


/* =========================================================
   CHECKOUT
   ========================================================= */

function handleCheckout() {

  if (state.cart.length === 0) {

    showToast(
      "Seu carrinho está vazio."
    );

    return;
  }


  if (!state.user) {

    closeCart();

    openAuthModal("login");

    showToast(
      "Entre na sua conta para continuar."
    );

    return;
  }


  showToast(
    "Checkout será configurado na próxima etapa."
  );
}


/* =========================================================
   LINKS PLACEHOLDER
   ========================================================= */

function handlePlaceholderLink(event) {

  event.preventDefault();

  showToast(
    "Esta área ainda faz parte da demonstração."
  );
}


/* =========================================================
   BOTÃO INÍCIO
   ========================================================= */

function goToHome(event) {

  if (event) {
    event.preventDefault();
  }

  closeMobileMenu();
  closeUserDropdown();
  closeCart();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   EVENTOS
   ========================================================= */

function setupEvents() {

  /* Busca */

  if (elements.searchForm) {

    elements.searchForm.addEventListener(
      "submit",
      handleSearch
    );

  }


  /* Menu */

  if (elements.menuToggle) {

    elements.menuToggle.addEventListener(
      "click",
      toggleMobileMenu
    );

  }


  /* Overlay */

  if (elements.overlay) {

    elements.overlay.addEventListener(
      "click",
      closeMobileMenu
    );

  }


  /* Carrinho */

  if (elements.cartBtn) {

    elements.cartBtn.addEventListener(
      "click",
      toggleCart
    );

  }


  if (elements.cartCloseBtn) {

    elements.cartCloseBtn.addEventListener(
      "click",
      closeCart
    );

  }


  if (elements.cartOverlay) {

    elements.cartOverlay.addEventListener(
      "click",
      closeCart
    );

  }


  /* Conta */

  if (elements.userBtn) {

    elements.userBtn.addEventListener(
      "click",
      toggleUserDropdown
    );

  }


  /* Checkout */

  if (elements.checkoutBtn) {

    elements.checkoutBtn.addEventListener(
      "click",
      handleCheckout
    );

  }


  /* Delegação */

  document.addEventListener(
    "click",
    event => {

      /* Filtros */

      const filterElement =
        event.target.closest(
          "[data-filter]"
        );

      if (filterElement) {

        event.preventDefault();

        const filter =
          filterElement.dataset.filter;

        if (filter) {

          setFilter(filter);

          closeMobileMenu();

        }

        return;
      }


      /* Início */

      const homeLink =
        event.target.closest(
          "[data-home-link]"
        );

      if (homeLink) {

        goToHome(event);

        return;
      }


      /* Adicionar */

      const addButton =
        event.target.closest(
          "[data-add-cart]"
        );

      if (addButton) {

        addToCart(
          addButton.dataset.addCart
        );

        return;
      }


      /* Remover */

      const removeButton =
        event.target.closest(
          "[data-remove-cart]"
        );

      if (removeButton) {

        removeFromCart(
          removeButton.dataset.removeCart
        );

        return;
      }


      /* Menos */

      const minusButton =
        event.target.closest(
          "[data-qty-minus]"
        );

      if (minusButton) {

        changeQuantity(
          minusButton.dataset.qtyMinus,
          -1
        );

        return;
      }


      /* Mais */

      const plusButton =
        event.target.closest(
          "[data-qty-plus]"
        );

      if (plusButton) {

        changeQuantity(
          plusButton.dataset.qtyPlus,
          1
        );

        return;
      }


      /* Ações da conta */

      const loginAction =
        event.target.closest(
          "[data-login-action]"
        );

      if (loginAction) {

        const action =
          loginAction.dataset.loginAction;

        if (action === "login") {

          openAuthModal("login");

          return;
        }


        if (action === "signup") {

          openAuthModal("signup");

          return;
        }


        if (action === "profile") {

          showProfile();

          return;
        }


        if (action === "logout") {

          logoutUser();

          return;
        }

      }


      /* Fechar dropdown */

      const closeDropdownButton =
        event.target.closest(
          "[data-close-dropdown]"
        );

      if (closeDropdownButton) {

        closeUserDropdown();

        return;
      }


      /* Fechar carrinho */

      const closeCartLink =
        event.target.closest(
          "[data-close-cart]"
        );

      if (closeCartLink) {

        closeCart();

        return;
      }


      /* Placeholder */

      const placeholder =
        event.target.closest(
          "[data-placeholder-link]"
        );

      if (placeholder) {

        handlePlaceholderLink(
          event
        );

        return;
      }


      /* Fora do dropdown */

      if (
        elements.userDropdown &&
        !elements.userDropdown.hidden &&
        !event.target.closest(
          "#userDropdown"
        ) &&
        !event.target.closest(
          "#userBtn"
        )
      ) {

        closeUserDropdown();

      }

    }
  );


  /* ESC */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape") {
        return;
      }

      closeCart();
      closeMobileMenu();
      closeUserDropdown();
      closeAuthModal();

    }
  );
}


/* =========================================================
   ANO
   ========================================================= */

function updateCurrentYear() {

  if (!elements.anoAtual) return;

  elements.anoAtual.textContent =
    new Date().getFullYear();
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

async function init() {

  loadCart();

  renderCategoryCards();
  renderProducts();
  renderOffers();
  renderCart();

  updateCartCount();
  updateActiveFilters();
  updateCurrentYear();

  createAuthModal();

  setupEvents();

  await loadCurrentUser();

  setupAuthListener();

  console.log(
    "Amora Make inicializada."
  );
}


/* =========================================================
   START
   ========================================================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    init
  );

} else {

  init();

}
```
