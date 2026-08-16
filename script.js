/* =========================================================
   AMORA MAKE — script.js
   Produtos, categorias, busca, menu mobile,
   carrinho, login/cadastro, endereço e Supabase.
   ========================================================= */


/* =========================================================
   SUPABASE
   ========================================================= */

const SUPABASE_URL = "https://xcwjqbqinnvnyiktyjbj.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_I8MW1Q8ovLLKI-Gb-MavTg_UankO-md";

let supabaseClient = null;

try {
  if (
    window.supabase &&
    typeof window.supabase.createClient === "function"
  ) {
    supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_KEY
    );

    console.log("Supabase conectado.");
  } else {
    console.error(
      "Biblioteca do Supabase não encontrada no HTML."
    );
  }
} catch (error) {
  console.error(
    "Erro ao conectar com o Supabase:",
    error
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
    price: 5,
    image: "images/produtos/esponja-chanfrada.jpeg"
  },
  {
    id: "p02",
    name: "Fixador Fix Matte",
    category: "maquiagem",
    price: 15,
    image: "images/produtos/fixador-fix-matte.jpeg"
  },
  {
    id: "p03",
    name: "Máscara de Cílios Alonga e Define",
    category: "mascara",
    price: 10,
    image: "images/produtos/mascara-de-cilios-alonga-e-define.jpeg"
  },
  {
    id: "p04",
    name: "Lip Oil Sweet Hello Kitty",
    category: "gloss",
    price: 10,
    image: "images/produtos/lip-oil-sweet-hello-kitty.jpeg"
  },
  {
    id: "p05",
    name: "Lip Oil Raios de Sol",
    category: "gloss",
    price: 10,
    image: "images/produtos/lip-oil-raios-de-sol.jpeg"
  },
  {
    id: "p06",
    name: "Demaquilante Aquatic Awe",
    category: "maquiagem",
    price: 10,
    image: "images/produtos/demaquilante-aquatic-awe.jpeg"
  },
  {
    id: "p07",
    name: "Demaquilante Sunset Coral",
    category: "maquiagem",
    price: 10,
    image: "images/produtos/demaquilante-sunset-coral.jpeg"
  },
  {
    id: "p08",
    name: "Perfume Capilar Atração Fatal",
    category: "acessorio",
    price: 10,
    image: "images/produtos/perfume-capilar-atracao-fatal.jpeg"
  },
  {
    id: "p09",
    name: "Perfume Capilar Desejo Secreto",
    category: "acessorio",
    price: 10,
    image: "images/produtos/perfume-capilar-desejo-secreto.jpeg"
  },
  {
    id: "p10",
    name: "Delineador Líquido Super Poderes",
    category: "maquiagem",
    price: 10,
    image: "images/produtos/delineador-liquido-super-poderes.jpeg"
  },
  {
    id: "p11",
    name: "Folhas Antioliosidade",
    category: "maquiagem",
    price: 10,
    image: "images/produtos/folhas-anti-oleosidade.jpeg"
  },
  {
    id: "p12",
    name: "Esfoliante Labial Honey Scrub Vivai",
    category: "maquiagem",
    price: 10,
    image: "images/produtos/esfoliante-labial-honey-scrub-vivai.jpeg"
  },
  {
    id: "p13",
    name: "Pó Compacto Efeito Aveludado",
    category: "maquiagem",
    price: 10,
    image: "images/produtos/po-compacto-efeito-aveludado.jpeg"
  },
  {
    id: "p14",
    name: "Par de Cílios 6D",
    category: "acessorio",
    price: 10,
    image: "images/produtos/par-de-cilios-6d.jpeg"
  },
  {
    id: "p15",
    name: "Batom Bala Matte Lovely",
    category: "batom",
    price: 10,
    image: "images/produtos/batom-bala-matte-lovely.jpeg"
  },
  {
    id: "p16",
    name: "Pincel para Esfumar",
    category: "pincel",
    price: 10,
    image: "images/produtos/pincel-p-esfumar.jpeg"
  },
  {
    id: "p17",
    name: "Pincel para Corretivo Língua de Gato",
    category: "pincel",
    price: 10,
    image: "images/produtos/pincel-p-corretivo-lingua-de-gato.jpeg"
  },
  {
    id: "p18",
    name: "Elástico para Cabelo",
    category: "acessorio",
    price: 5,
    image: "images/produtos/elastico-p-cabelo.jpeg"
  },
  {
    id: "p19",
    name: "Kit com 2 Esponjas para Pó",
    category: "acessorio",
    price: 5,
    image: "images/produtos/kit-c-2-esponjas-p-po.jpeg"
  },
  {
    id: "p20",
    name: "Máscara Facial Peel Off Total Black",
    category: "maquiagem",
    price: 5,
    image: "images/produtos/mascara-facial-peel-off-total-black.jpeg"
  },
  {
    id: "p21",
    name: "Hidratante Facial Rosa Mosqueta",
    category: "maquiagem",
    price: 5,
    image: "images/produtos/hidratante-facial-rosa-mosqueta.jpeg"
  },
  {
    id: "p22",
    name: "Mini Batom Princesa",
    category: "batom",
    price: 5,
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
   HELPERS
   ========================================================= */

function formatBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}


function normalizeText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}


function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function getProductIcon(category) {
  return ICONS[category] || ICONS.maquiagem;
}


function getCategoryLabel(category) {
  return CATEGORY_LABELS[category] || "Maquiagem";
}


function getProductImage(product) {
  if (!product?.image) {
    return getProductIcon(product?.category);
  }

  return `
    <img
      src="${escapeHTML(product.image)}"
      alt="${escapeHTML(product.name)}"
      loading="lazy"
      decoding="async"
      onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('image-error');"
    >
  `;
}


/* =========================================================
   ESTADO
   ========================================================= */

const CART_STORAGE_KEY = "amora_make_cart";

const state = {
  filter: "todos",
  query: "",
  cart: []
};


let currentProfile = null;
let toastTimer = null;


/* =========================================================
   PERSISTÊNCIA DO CARRINHO
   ========================================================= */

function saveCart() {
  try {
    if (state.cart.length === 0) {
      localStorage.removeItem(
        CART_STORAGE_KEY
      );

      return;
    }

    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(state.cart)
    );

  } catch (error) {
    console.error(
      "Erro ao salvar carrinho:",
      error
    );
  }
}


function loadCart() {
  try {
    const savedCart =
      localStorage.getItem(
        CART_STORAGE_KEY
      );

    if (!savedCart) {
      state.cart = [];
      return;
    }

    const parsedCart =
      JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      state.cart = [];
      return;
    }

    state.cart =
      parsedCart
        .filter(item =>
          item &&
          typeof item.id === "string" &&
          PRODUCTS.some(
            product =>
              product.id === item.id
          )
        )
        .map(item => ({
          id: item.id,
          quantity: Math.max(
            1,
            Number(item.quantity) || 1
          )
        }));

    saveCart();

  } catch (error) {
    console.error(
      "Erro ao carregar carrinho:",
      error
    );

    state.cart = [];

    try {
      localStorage.removeItem(
        CART_STORAGE_KEY
      );
    } catch (storageError) {
      console.error(
        "Erro ao limpar carrinho salvo:",
        storageError
      );
    }
  }
}


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
  userBtnLabel: document.getElementById("userBtnLabel"),
  accountModal: document.getElementById("accountModal"),
  accountOverlay: document.getElementById("accountOverlay"),
  accountCloseBtn: document.getElementById("accountCloseBtn"),
  accountModalTitle: document.getElementById("accountModalTitle"),

  loginForm: document.getElementById("loginForm"),
  loginEmail: document.getElementById("loginEmail"),
  loginPassword: document.getElementById("loginPassword"),
  loginError: document.getElementById("loginError"),

  registerForm: document.getElementById("registerForm"),
  registerName: document.getElementById("registerName"),
  registerEmail: document.getElementById("registerEmail"),
  registerPassword: document.getElementById("registerPassword"),
  registerPasswordConfirm: document.getElementById("registerPasswordConfirm"),
  registerCep: document.getElementById("registerCep"),
  registerStreet: document.getElementById("registerStreet"),
  registerNumber: document.getElementById("registerNumber"),
  registerComplement: document.getElementById("registerComplement"),
  registerNeighborhood: document.getElementById("registerNeighborhood"),
  registerCity: document.getElementById("registerCity"),
  registerState: document.getElementById("registerState"),
  registerError: document.getElementById("registerError"),

  showRegisterBtn: document.getElementById("showRegisterBtn"),
  showLoginBtn: document.getElementById("showLoginBtn"),

  loggedAccount: document.getElementById("loggedAccount"),
  loggedUserName: document.getElementById("loggedUserName"),
  loggedUserEmail: document.getElementById("loggedUserEmail"),
  loggedUserAddress: document.getElementById("loggedUserAddress"),
  logoutBtn: document.getElementById("logoutBtn"),

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
   TOAST
   ========================================================= */

function showToast(message) {
  if (!elements.toast) {
    console.log(message);
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
      if (!elements.toast.classList.contains("show")) {
        elements.toast.hidden = true;
      }
    }, 220);
  }, 2400);
}


/* =========================================================
   CATEGORIAS
   ========================================================= */

function renderCategoryCards() {
  if (!elements.catGrid) return;

  elements.catGrid.innerHTML =
    FEATURED_CATEGORIES
      .map(category => `
        <button
          type="button"
          class="cat-card"
          data-filter="${escapeHTML(category)}"
        >
          <span class="cat-card-icon">
            ${getProductIcon(category)}
          </span>

          <span class="cat-card-name">
            ${escapeHTML(getCategoryLabel(category))}
          </span>
        </button>
      `)
      .join("");
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
          ${escapeHTML(getCategoryLabel(product.category))}
        </span>

        <h3 class="product-name">
          ${escapeHTML(product.name)}
        </h3>

        <div class="product-price-row">
          <span class="product-price">
            ${formatBRL(product.price)}
          </span>
        </div>

        <button
          type="button"
          class="product-add-btn ${isInCart ? "added" : ""}"
          data-add-cart="${escapeHTML(product.id)}"
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

  elements.offersGrid.innerHTML =
    PRODUCTS
      .slice(0, 6)
      .map(createProductCard)
      .join("");
}


/* =========================================================
   FILTROS
   ========================================================= */

function setFilter(filter) {
  state.filter =
    filter && CATEGORY_LABELS[filter]
      ? filter
      : "todos";

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
      const filter = element.dataset.filter;

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
    elements.searchInput?.value?.trim() || "";

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

  closeAccountModal();
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

  restoreBodyScroll();
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
    PRODUCTS.find(
      item => item.id === productId
    );

  if (!product) return;

  const existingItem =
    state.cart.find(
      item => item.id === productId
    );

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

  showToast("Produto removido do carrinho.");
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
        total + Number(item.quantity || 0),
      0
    );

  elements.cartCount.textContent =
    totalItems;

  elements.cartCount.hidden =
    totalItems <= 0;
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
        product.price *
        Number(item.quantity || 0);
    },
    0
  );
}


function renderCart() {
  if (!elements.cartItemsList) return;

  const validItems =
    state.cart.filter(item =>
      PRODUCTS.some(
        product => product.id === item.id
      )
    );

  if (validItems.length !== state.cart.length) {
    state.cart = validItems;
    saveCart();
  }

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
    state.cart
      .map(item => {
        const product =
          PRODUCTS.find(
            productItem =>
              productItem.id === item.id
          );

        if (!product) return "";

        const itemTotal =
          product.price *
          Number(item.quantity || 0);

        return `
          <div class="cart-item">

            <div class="cart-item-media">
              ${getProductImage(product)}
            </div>

            <div class="cart-item-info">

              <p class="cart-item-name">
                ${escapeHTML(product.name)}
              </p>

              <p class="cart-item-price">
                ${formatBRL(itemTotal)}
              </p>

              <div class="cart-item-qty">

                <button
                  type="button"
                  class="qty-btn"
                  data-qty-minus="${escapeHTML(product.id)}"
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>

                <span>
                  ${Number(item.quantity || 0)}
                </span>

                <button
                  type="button"
                  class="qty-btn"
                  data-qty-plus="${escapeHTML(product.id)}"
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>

              </div>

            </div>

            <button
              type="button"
              class="cart-item-remove"
              data-remove-cart="${escapeHTML(product.id)}"
            >
              Remover
            </button>

          </div>
        `;
      })
      .join("");

  if (elements.cartSubtotal) {
    elements.cartSubtotal.textContent =
      formatBRL(
        calculateCartSubtotal()
      );
  }

  if (elements.cartFooter) {
    elements.cartFooter.hidden = false;
  }

  updateCartCount();
}


async function handleCheckout() {
  if (state.cart.length === 0) {
    showToast(
      "Seu carrinho está vazio."
    );
    return;
  }

  const user =
    await getCurrentUser();

  if (!user) {
    showToast(
      "Entre na sua conta para continuar."
    );

    closeCart();
    openAccountModal();
    showLoginView();

    return;
  }

  showToast(
    "Checkout será configurado na próxima etapa."
  );
}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function openMobileMenu() {
  if (!elements.mobileMenu) return;

  closeAccountModal();
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

  restoreBodyScroll();
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
   MODAL DE CONTA
   ========================================================= */

function openAccountModal() {
  closeCart();
  closeMobileMenu();

  if (!elements.accountModal) return;

  elements.accountModal.hidden = false;

  if (elements.accountOverlay) {
    elements.accountOverlay.hidden = false;
  }

  document.body.style.overflow =
    "hidden";

  updateAccountUI().then(() => {
    if (
      !elements.loggedAccount ||
      elements.loggedAccount.hidden
    ) {
      if (
        elements.registerForm &&
        elements.registerForm.hidden === false
      ) {
        elements.registerName?.focus();
      } else {
        elements.loginEmail?.focus();
      }
    }
  });

  if (elements.userBtn) {
    elements.userBtn.setAttribute(
      "aria-expanded",
      "true"
    );
  }
}


function closeAccountModal() {
  if (elements.accountModal) {
    elements.accountModal.hidden = true;
  }

  if (elements.accountOverlay) {
    elements.accountOverlay.hidden = true;
  }

  if (elements.userBtn) {
    elements.userBtn.setAttribute(
      "aria-expanded",
      "false"
    );
  }

  restoreBodyScroll();
}


function toggleAccountModal() {
  if (!elements.accountModal) return;

  if (elements.accountModal.hidden) {
    openAccountModal();
  } else {
    closeAccountModal();
  }
}


function showLoginView() {
  if (elements.loginForm) {
    elements.loginForm.hidden = false;
  }

  if (elements.registerForm) {
    elements.registerForm.hidden = true;
  }

  if (elements.loggedAccount) {
    elements.loggedAccount.hidden = true;
  }

  if (elements.accountModalTitle) {
    elements.accountModalTitle.textContent =
      "Entrar";
  }

  clearAccountErrors();

  elements.loginEmail?.focus();
}


function showRegisterView() {
  if (elements.loginForm) {
    elements.loginForm.hidden = true;
  }

  if (elements.registerForm) {
    elements.registerForm.hidden = false;
  }

  if (elements.loggedAccount) {
    elements.loggedAccount.hidden = true;
  }

  if (elements.accountModalTitle) {
    elements.accountModalTitle.textContent =
      "Criar conta";
  }

  clearAccountErrors();

  elements.registerName?.focus();
}


function clearAccountErrors() {
  [
    elements.loginError,
    elements.registerError
  ].forEach(error => {
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
  });
}


function showAccountError(element, message) {
  if (!element) {
    showToast(message);
    return;
  }

  element.textContent = message;
  element.hidden = false;
}


/* =========================================================
   ENDEREÇO DO USUÁRIO
   ========================================================= */

async function loadAddressForUser(user) {
  if (
    !supabaseClient ||
    !user ||
    !elements.loggedUserAddress
  ) {
    return;
  }

  try {
    const {
      data,
      error
    } =
      await supabaseClient
        .from("addresses")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (error) {
      console.error(
        "Erro ao carregar endereço:",
        error
      );

      elements.loggedUserAddress.textContent =
        "Endereço não informado.";

      return;
    }

    if (!data) {
      elements.loggedUserAddress.textContent =
        "Endereço não informado.";

      return;
    }

    const parts = [
      data.rua,
      data.numero,
      data.complemento,
      data.bairro,
      data.cidade,
      data.estado,
      data.cep
    ].filter(Boolean);

    elements.loggedUserAddress.textContent =
      parts.length
        ? parts.join(", ")
        : "Endereço não informado.";

  } catch (error) {
    console.error(
      "Erro inesperado ao carregar endereço:",
      error
    );

    elements.loggedUserAddress.textContent =
      "Endereço não informado.";
  }
}


function restoreBodyScroll() {
  const modalOpen =
    elements.accountModal &&
    !elements.accountModal.hidden;

  const cartOpen =
    elements.cartDrawer &&
    !elements.cartDrawer.hidden;

  const menuOpen =
    elements.mobileMenu &&
    !elements.mobileMenu.hidden;

  if (
    !modalOpen &&
    !cartOpen &&
    !menuOpen
  ) {
    document.body.style.overflow =
      "";
  }
}


/* =========================================================
   SUPABASE — LOGIN
   ========================================================= */

async function loginUser(
  email,
  password
) {
  if (!supabaseClient) {
    showAccountError(
      elements.loginError,
      "Supabase não está conectado."
    );

    return;
  }

  if (!email || !password) {
    showAccountError(
      elements.loginError,
      "Digite seu e-mail e sua senha."
    );

    return;
  }

  clearAccountErrors();

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
      console.error(
        "Erro no login:",
        error
      );

      showAccountError(
        elements.loginError,
        getAuthErrorMessage(
          error.message
        )
      );

      return;
    }

    await loadUserProfile();
    await updateAccountUI();

    showToast(
      "Login realizado com sucesso!"
    );

  } catch (error) {
    console.error(
      "Erro inesperado no login:",
      error
    );

    showAccountError(
      elements.loginError,
      "Não foi possível entrar na conta."
    );
  }
}


/* =========================================================
   VALIDAÇÃO DE CADASTRO
   ========================================================= */

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(email || "").trim()
  );
}


function isValidCep(cep) {
  return /^\d{5}-?\d{3}$/.test(
    String(cep || "").trim()
  );
}


function isValidState(uf) {
  return /^[A-Za-z]{2}$/.test(
    String(uf || "").trim()
  );
}


/* =========================================================
   SUPABASE — CADASTRO
   ========================================================= */

async function registerUser({
  name,
  email,
  password,
  passwordConfirm,
  cep,
  street,
  number,
  complement,
  neighborhood,
  city,
  state
}) {
  if (!supabaseClient) {
    showAccountError(
      elements.registerError,
      "Supabase não está conectado."
    );

    return;
  }

  if (
    !name ||
    !email ||
    !password ||
    !passwordConfirm ||
    !cep ||
    !street ||
    !number ||
    !neighborhood ||
    !city ||
    !state
  ) {
    showAccountError(
      elements.registerError,
      "Preencha todos os campos obrigatórios."
    );

    return;
  }

  if (password.length < 6) {
    showAccountError(
      elements.registerError,
      "A senha precisa ter pelo menos 6 caracteres."
    );

    return;
  }

  if (password !== passwordConfirm) {
    showAccountError(
      elements.registerError,
      "As senhas não coincidem."
    );

    return;
  }

  if (!isValidEmail(email)) {
    showAccountError(
      elements.registerError,
      "Digite um e-mail válido."
    );

    return;
  }

  if (!isValidCep(cep)) {
    showAccountError(
      elements.registerError,
      "Digite um CEP válido."
    );

    return;
  }

  if (!isValidState(state)) {
    showAccountError(
      elements.registerError,
      "Digite o estado usando duas letras."
    );

    return;
  }

  clearAccountErrors();

  try {
    const {
      data,
      error
    } =
      await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });

    if (error) {
      console.error(
        "Erro no cadastro:",
        error
      );

      showAccountError(
        elements.registerError,
        getAuthErrorMessage(
          error.message
        )
      );

      return;
    }

    if (data.user) {
      await createProfile(
        data.user,
        name
      );
    }

    if (
      data.session &&
      data.user
    ) {
      await saveAddressData(
        data.user,
        {
          cep,
          rua: street,
          numero: number,
          complemento: complement,
          bairro: neighborhood,
          cidade: city,
          estado: state
        }
      );

      await loadUserProfile();
      await updateAccountUI();

      showToast(
        "Conta criada com sucesso!"
      );

    } else {
      showToast(
        "Conta criada! Verifique seu e-mail para confirmar o cadastro."
      );

      showLoginView();
    }

  } catch (error) {
    console.error(
      "Erro inesperado no cadastro:",
      error
    );

    showAccountError(
      elements.registerError,
      "Não foi possível criar a conta."
    );
  }
}


/* =========================================================
   CRIAR PERFIL
   ========================================================= */

async function createProfile(
  user,
  name
) {
  if (
    !supabaseClient ||
    !user
  ) {
    return;
  }

  try {
    const {
      error
    } =
      await supabaseClient
        .from("profiles")
        .upsert(
          {
            id: user.id,

            full_name:
              name ||
              user.user_metadata?.full_name ||
              "",

            email:
              user.email ||
              ""
          },
          {
            onConflict: "id"
          }
        );

    if (error) {
      console.error(
        "Erro ao criar perfil:",
        error
      );
    }

  } catch (error) {
    console.error(
      "Erro inesperado ao criar perfil:",
      error
    );
  }
}


/* =========================================================
   PERFIL DO USUÁRIO
   ========================================================= */

async function loadUserProfile() {
  if (!supabaseClient) {
    return null;
  }

  const user =
    await getCurrentUser();

  if (!user) {
    currentProfile = null;
    return null;
  }

  try {
    const {
      data,
      error
    } =
      await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

    if (error) {
      console.error(
        "Erro ao buscar perfil:",
        error
      );

      currentProfile = {
        id: user.id,

        email:
          user.email ||
          "",

        full_name:
          user.user_metadata?.full_name ||
          ""
      };

      return currentProfile;
    }

    currentProfile =
      data ||
      {
        id: user.id,

        email:
          user.email ||
          "",

        full_name:
          user.user_metadata?.full_name ||
          ""
      };

    return currentProfile;

  } catch (error) {
    console.error(
      "Erro ao carregar perfil:",
      error
    );

    return null;
  }
}


/* =========================================================
   USUÁRIO ATUAL
   ========================================================= */

async function getCurrentUser() {
  if (!supabaseClient) {
    return null;
  }

  try {
    const {
      data,
      error
    } =
      await supabaseClient
        .auth
        .getUser();

    if (error) {
      return null;
    }

    return data?.user || null;

  } catch (error) {
    console.error(
      "Erro ao buscar usuário:",
      error
    );

    return null;
  }
}


/* =========================================================
   ATUALIZAR INTERFACE DA CONTA
   ========================================================= */

async function updateAccountUI() {
  const user =
    await getCurrentUser();

  if (!user) {
    currentProfile = null;

    if (elements.userBtnLabel) {
      elements.userBtnLabel.textContent =
        "Entrar";
    }

    if (elements.accountModalTitle) {
      elements.accountModalTitle.textContent =
        "Entrar";
    }

    if (elements.loginForm) {
      elements.loginForm.hidden = false;
    }

    if (elements.registerForm) {
      elements.registerForm.hidden = true;
    }

    if (elements.loggedAccount) {
      elements.loggedAccount.hidden = true;
    }

    return;
  }

  const name =
    currentProfile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Cliente";

  if (elements.userBtnLabel) {
    elements.userBtnLabel.textContent =
      name;
  }

  if (elements.accountModalTitle) {
    elements.accountModalTitle.textContent =
      "Minha conta";
  }

  if (elements.loginForm) {
    elements.loginForm.hidden = true;
  }

  if (elements.registerForm) {
    elements.registerForm.hidden = true;
  }

  if (elements.loggedAccount) {
    elements.loggedAccount.hidden = false;
  }

  if (elements.loggedUserName) {
    elements.loggedUserName.textContent =
      name;
  }

  if (elements.loggedUserEmail) {
    elements.loggedUserEmail.textContent =
      user.email || "";
  }

  await loadAddressForUser(
    user
  );
}


/* =========================================================
   LOGOUT
   ========================================================= */

async function logoutUser() {
  if (!supabaseClient) {
    return;
  }

  try {
    const {
      error
    } =
      await supabaseClient
        .auth
        .signOut();

    if (error) {
      console.error(
        "Erro ao sair:",
        error
      );

      showToast(
        "Não foi possível sair da conta."
      );

      return;
    }

    currentProfile = null;

    showToast(
      "Você saiu da sua conta."
    );

    closeAccountModal();

    await updateAccountUI();

  } catch (error) {
    console.error(
      "Erro inesperado ao sair:",
      error
    );
  }
}


/* =========================================================
   ENDEREÇO
   ========================================================= */

async function saveAddressData(
  user,
  addressData
) {
  if (
    !supabaseClient ||
    !user
  ) {
    return false;
  }

  try {
    const {
      error
    } =
      await supabaseClient
        .from("addresses")
        .upsert(
          {
            user_id: user.id,
            ...addressData
          },
          {
            onConflict: "user_id"
          }
        );

    if (error) {
      console.error(
        "Erro ao salvar endereço:",
        error
      );

      return false;
    }

    return true;

  } catch (error) {
    console.error(
      "Erro inesperado ao salvar endereço:",
      error
    );

    return false;
  }
}


/* =========================================================
   TRADUÇÃO DE ERROS DO SUPABASE
   ========================================================= */

function getAuthErrorMessage(
  message
) {
  const normalized =
    String(message || "")
      .toLowerCase();

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
    ) ||
    normalized.includes(
      "already registered"
    )
  ) {
    return "Este e-mail já possui uma conta.";
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
    return "Confirme seu e-mail antes de entrar.";
  }

  if (
    normalized.includes(
      "rate limit"
    )
  ) {
    return "Muitas tentativas. Aguarde um pouco e tente novamente.";
  }

  if (
    normalized.includes(
      "email address"
    ) &&
    normalized.includes(
      "invalid"
    )
  ) {
    return "Digite um endereço de e-mail válido.";
  }

  return (
    message ||
    "Ocorreu um erro. Tente novamente."
  );
}


/* =========================================================
   LINKS DE LOGIN/CADASTRO
   ========================================================= */

function handleAccountAction(
  event
) {
  const loginButton =
    event.target.closest(
      "[data-login]"
    );

  if (loginButton) {
    event.preventDefault();

    openAccountModal();
    showLoginView();

    return true;
  }

  const registerButton =
    event.target.closest(
      "[data-register]"
    );

  if (registerButton) {
    event.preventDefault();

    openAccountModal();
    showRegisterView();

    return true;
  }

  const logoutButton =
    event.target.closest(
      "[data-logout]"
    );

  if (logoutButton) {
    event.preventDefault();

    logoutUser();

    return true;
  }

  return false;
}


/* =========================================================
   PLACEHOLDER
   ========================================================= */

function handlePlaceholderLink(
  event
) {
  event.preventDefault();

  showToast(
    "Esta área ainda faz parte da demonstração."
  );
}


/* =========================================================
   EVENTOS
   ========================================================= */

function setupEvents() {

  /* =======================================================
     BUSCA
     ======================================================= */

  if (elements.searchForm) {
    elements.searchForm.addEventListener(
      "submit",
      handleSearch
    );
  }


  /* =======================================================
     MENU
     ======================================================= */

  if (elements.menuToggle) {
    elements.menuToggle.addEventListener(
      "click",
      toggleMobileMenu
    );
  }

  if (elements.overlay) {
    elements.overlay.addEventListener(
      "click",
      closeMobileMenu
    );
  }


  /* =======================================================
     CARRINHO
     ======================================================= */

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


  /* =======================================================
     CONTA
     ======================================================= */

  if (elements.userBtn) {
    elements.userBtn.addEventListener(
      "click",
      toggleAccountModal
    );
  }

  if (elements.accountCloseBtn) {
    elements.accountCloseBtn.addEventListener(
      "click",
      closeAccountModal
    );
  }

  if (elements.accountOverlay) {
    elements.accountOverlay.addEventListener(
      "click",
      closeAccountModal
    );
  }

  if (elements.showRegisterBtn) {
    elements.showRegisterBtn.addEventListener(
      "click",
      showRegisterView
    );
  }

  if (elements.showLoginBtn) {
    elements.showLoginBtn.addEventListener(
      "click",
      showLoginView
    );
  }

  if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener(
      "click",
      logoutUser
    );
  }


  /* =======================================================
     LOGIN
     ======================================================= */

  if (elements.loginForm) {
    elements.loginForm.addEventListener(
      "submit",
      async event => {
        event.preventDefault();

        await loginUser(
          elements.loginEmail?.value?.trim() || "",
          elements.loginPassword?.value || ""
        );
      }
    );
  }


  /* =======================================================
     CADASTRO
     ======================================================= */

  if (elements.registerForm) {
    elements.registerForm.addEventListener(
      "submit",
      async event => {
        event.preventDefault();

        await registerUser({
          name:
            elements.registerName?.value?.trim() || "",

          email:
            elements.registerEmail?.value?.trim() || "",

          password:
            elements.registerPassword?.value || "",

          passwordConfirm:
            elements.registerPasswordConfirm?.value || "",

          cep:
            elements.registerCep?.value?.trim() || "",

          street:
            elements.registerStreet?.value?.trim() || "",

          number:
            elements.registerNumber?.value?.trim() || "",

          complement:
            elements.registerComplement?.value?.trim() || "",

          neighborhood:
            elements.registerNeighborhood?.value?.trim() || "",

          city:
            elements.registerCity?.value?.trim() || "",

          state:
            elements.registerState?.value
              ?.trim()
              .toUpperCase() || ""
        });
      }
    );
  }


  /* =======================================================
     MÁSCARA DE CEP
     ======================================================= */

  if (elements.registerCep) {
    elements.registerCep.addEventListener(
      "input",
      event => {
        const value =
          event.target.value
            .replace(/\D/g, "")
            .slice(0, 8);

        event.target.value =
          value.length > 5
            ? `${value.slice(0, 5)}-${value.slice(5)}`
            : value;
      }
    );
  }


  /* =======================================================
     ESTADO
     ======================================================= */

  if (elements.registerState) {
    elements.registerState.addEventListener(
      "input",
      event => {
        event.target.value =
          event.target.value
            .replace(/[^a-zA-Z]/g, "")
            .slice(0, 2)
            .toUpperCase();
      }
    );
  }


  /* =======================================================
     CHECKOUT
     ======================================================= */

  if (elements.checkoutBtn) {
    elements.checkoutBtn.addEventListener(
      "click",
      handleCheckout
    );
  }


  /* =======================================================
     DELEGAÇÃO GLOBAL
     ======================================================= */

  document.addEventListener(
    "click",
    event => {

      /* -----------------------------------------------------
         FILTROS
         ----------------------------------------------------- */

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


      /* -----------------------------------------------------
         ADICIONAR AO CARRINHO
         ----------------------------------------------------- */

      const addButton =
        event.target.closest(
          "[data-add-cart]"
        );

      if (addButton) {
        event.preventDefault();

        addToCart(
          addButton.dataset.addCart
        );

        return;
      }


      /* -----------------------------------------------------
         REMOVER DO CARRINHO
         ----------------------------------------------------- */

      const removeButton =
        event.target.closest(
          "[data-remove-cart]"
        );

      if (removeButton) {
        event.preventDefault();

        removeFromCart(
          removeButton.dataset.removeCart
        );

        return;
      }


      /* -----------------------------------------------------
         DIMINUIR QUANTIDADE
         ----------------------------------------------------- */

      const minusButton =
        event.target.closest(
          "[data-qty-minus]"
        );

      if (minusButton) {
        event.preventDefault();

        changeQuantity(
          minusButton.dataset.qtyMinus,
          -1
        );

        return;
      }


      /* -----------------------------------------------------
         AUMENTAR QUANTIDADE
         ----------------------------------------------------- */

      const plusButton =
        event.target.closest(
          "[data-qty-plus]"
        );

      if (plusButton) {
        event.preventDefault();

        changeQuantity(
          plusButton.dataset.qtyPlus,
          1
        );

        return;
      }


      /* -----------------------------------------------------
         AÇÕES DE CONTA
         ----------------------------------------------------- */

      if (
        handleAccountAction(event)
      ) {
        return;
      }


      /* -----------------------------------------------------
         FECHAR CARRINHO
         ----------------------------------------------------- */

      const closeCartLink =
        event.target.closest(
          "[data-close-cart]"
        );

      if (closeCartLink) {
        event.preventDefault();

        closeCart();

        return;
      }


      /* -----------------------------------------------------
         LINKS PLACEHOLDER
         ----------------------------------------------------- */

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
    }
  );


  /* =======================================================
     ESC
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {
      if (
        event.key !== "Escape"
      ) {
        return;
      }

      closeCart();
      closeMobileMenu();
      closeAccountModal();
    }
  );
}


/* =========================================================
   SUPABASE — OBSERVAR LOGIN
   ========================================================= */

function setupAuthListener() {
  if (!supabaseClient) {
    return;
  }

  supabaseClient.auth.onAuthStateChange(
    async (
      event,
      session
    ) => {

      console.log(
        "Estado de autenticação:",
        event
      );

      if (session?.user) {
        await loadUserProfile();
      } else {
        currentProfile = null;
      }

      await updateAccountUI();
    }
  );
}


/* =========================================================
   ANO
   ========================================================= */

function updateCurrentYear() {
  if (!elements.anoAtual) {
    return;
  }

  elements.anoAtual.textContent =
    new Date().getFullYear();
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

async function init() {

  /* Restaurar carrinho salvo antes de renderizar */
  loadCart();

  renderCategoryCards();

  renderProducts();

  renderOffers();

  renderCart();

  updateCartCount();

  updateActiveFilters();

  updateCurrentYear();

  setupEvents();

  setupAuthListener();

  if (supabaseClient) {
    await loadUserProfile();
    await updateAccountUI();
  }

  console.log(
    "Amora Make inicializado."
  );
}


/* =========================================================
   START
   ========================================================= */

if (
  document.readyState ===
  "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    init,
    {
      once: true
    }
  );
} else {
  init();
}
