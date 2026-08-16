/* =========================================================
   AMORA MAKE — script.js
   Produtos, categorias, busca, menu mobile,
   carrinho, login/cadastro e Supabase.
   ========================================================= */


/* =========================================================
   SUPABASE
   ========================================================= */

const SUPABASE_URL = "https://xcwjqbqinnvnyiktyjbj.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_I8MW1Q8ovLLKI-Gb-MavTg_UankO-md";

let supabaseClient = null;

try {
  if (window.supabase) {
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
   ESTADO
   ========================================================= */

const state = {
  filter: "todos",
  query: "",
  cart: []
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
  anoAtual: document.getElementById("anoAtual"),

  loginModal: document.getElementById("loginModal"),
  loginForm: document.getElementById("loginForm"),
  loginEmail: document.getElementById("loginEmail"),
  loginPassword: document.getElementById("loginPassword"),

  registerModal: document.getElementById("registerModal"),
  registerForm: document.getElementById("registerForm"),
  registerName: document.getElementById("registerName"),
  registerEmail: document.getElementById("registerEmail"),
  registerPassword: document.getElementById("registerPassword"),
  registerPasswordConfirm:
    document.getElementById("registerPasswordConfirm"),

  addressModal: document.getElementById("addressModal"),
  addressForm: document.getElementById("addressForm"),

  logoutBtn: document.getElementById("logoutBtn"),

  accountName: document.getElementById("accountName"),
  accountEmail: document.getElementById("accountEmail")
};


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer = null;

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
    FEATURED_CATEGORIES
      .map(category => `
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

  if (
    !elements.mobileMenu ||
    elements.mobileMenu.hidden
  ) {
    document.body.style.overflow = "";
  }
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
    state.cart
      .map(item => {

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


function handleCheckout() {
  if (state.cart.length === 0) {
    showToast(
      "Seu carrinho está vazio."
    );
    return;
  }

  const user =
    getCurrentUser();

  if (!user) {
    showToast(
      "Entre na sua conta para continuar."
    );

    openLoginModal();

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
    document.body.style.overflow =
      "";
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
   DROPDOWN DA CONTA
   ========================================================= */

function openUserDropdown() {
  if (!elements.userDropdown) return;

  closeMobileMenu();
  closeCart();

  elements.userDropdown.hidden = false;

  if (elements.userBtn) {
    elements.userBtn.setAttribute(
      "aria-expanded",
      "true"
    );
  }

  updateAccountUI();
}


function closeUserDropdown() {
  if (!elements.userDropdown) return;

  elements.userDropdown.hidden = true;

  if (elements.userBtn) {
    elements.userBtn.setAttribute(
      "aria-expanded",
      "false"
    );
  }
}


function toggleUserDropdown() {
  if (!elements.userDropdown) return;

  if (
    elements.userDropdown.hidden
  ) {
    openUserDropdown();
  } else {
    closeUserDropdown();
  }
}


/* =========================================================
   MODAIS DE LOGIN
   ========================================================= */

function openLoginModal() {
  closeUserDropdown();

  if (!elements.loginModal) {
    showToast(
      "O formulário de login não foi encontrado no HTML."
    );
    return;
  }

  elements.loginModal.hidden = false;

  document.body.style.overflow =
    "hidden";
}


function closeLoginModal() {
  if (!elements.loginModal) return;

  elements.loginModal.hidden = true;

  restoreBodyScroll();
}


function openRegisterModal() {
  closeUserDropdown();

  if (!elements.registerModal) {
    showToast(
      "O formulário de cadastro não foi encontrado no HTML."
    );
    return;
  }

  elements.registerModal.hidden =
    false;

  document.body.style.overflow =
    "hidden";
}


function closeRegisterModal() {
  if (!elements.registerModal) return;

  elements.registerModal.hidden =
    true;

  restoreBodyScroll();
}


function openAddressModal() {
  if (!elements.addressModal) {
    showToast(
      "Formulário de endereço não encontrado."
    );
    return;
  }

  elements.addressModal.hidden =
    false;

  document.body.style.overflow =
    "hidden";
}


function closeAddressModal() {
  if (!elements.addressModal) return;

  elements.addressModal.hidden =
    true;

  restoreBodyScroll();
}


function restoreBodyScroll() {
  const modalOpen =
    (elements.loginModal &&
      !elements.loginModal.hidden) ||
    (elements.registerModal &&
      !elements.registerModal.hidden) ||
    (elements.addressModal &&
      !elements.addressModal.hidden);

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

async function loginUser(email, password) {
  if (!supabaseClient) {
    showToast(
      "Supabase não está conectado."
    );
    return;
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
      console.error(
        "Erro no login:",
        error
      );

      showToast(
        getAuthErrorMessage(
          error.message
        )
      );

      return;
    }

    console.log(
      "Login realizado:",
      data.user
    );

    showToast(
      "Login realizado com sucesso!"
    );

    closeLoginModal();

    await loadUserProfile();

    updateAccountUI();

  } catch (error) {

    console.error(
      "Erro inesperado no login:",
      error
    );

    showToast(
      "Não foi possível entrar na conta."
    );
  }
}


/* =========================================================
   SUPABASE — CADASTRO
   ========================================================= */

async function registerUser({
  name,
  email,
  password,
  passwordConfirm
}) {

  if (!supabaseClient) {
    showToast(
      "Supabase não está conectado."
    );
    return;
  }

  if (
    !name ||
    !email ||
    !password
  ) {
    showToast(
      "Preencha todos os campos."
    );
    return;
  }

  if (password.length < 6) {
    showToast(
      "A senha precisa ter pelo menos 6 caracteres."
    );
    return;
  }

  if (
    password !== passwordConfirm
  ) {
    showToast(
      "As senhas não são iguais."
    );
    return;
  }

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

      showToast(
        getAuthErrorMessage(
          error.message
        )
      );

      return;
    }

    console.log(
      "Cadastro realizado:",
      data
    );

    if (data.user) {

      await createProfile(
        data.user,
        name
      );
    }

    if (
      data.session
    ) {

      showToast(
        "Conta criada com sucesso!"
      );

      closeRegisterModal();

      await loadUserProfile();

      updateAccountUI();

    } else {

      showToast(
        "Conta criada! Verifique seu e-mail para confirmar o cadastro."
      );

      closeRegisterModal();
    }

  } catch (error) {

    console.error(
      "Erro inesperado no cadastro:",
      error
    );

    showToast(
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

  if (!supabaseClient || !user) {
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
              user.email || ""
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

let currentProfile = null;

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

      return null;
    }

    currentProfile =
      data || {
        id: user.id,
        email: user.email,
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
      await supabaseClient.auth.getUser();

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

  if (!elements.userDropdown) {
    return;
  }

  const user =
    await getCurrentUser();

  const title =
    elements.userDropdown.querySelector(
      ".user-dropdown-title"
    );

  const text =
    elements.userDropdown.querySelector(
      ".user-dropdown-text"
    );

  if (!user) {

    if (title) {
      title.textContent =
        "Área da cliente";
    }

    if (text) {
      text.textContent =
        "Entre na sua conta ou crie seu cadastro para salvar seus dados e endereço.";
    }

    if (elements.userBtn) {
      const label =
        elements.userBtn.querySelector(
          ".icon-btn-label"
        );

      if (label) {
        label.textContent =
          "Entrar";
      }
    }

    return;
  }

  const name =
    currentProfile?.full_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Cliente";

  if (title) {
    title.textContent =
      `Olá, ${name}!`;
  }

  if (text) {
    text.textContent =
      user.email || "";
  }

  if (elements.userBtn) {

    const label =
      elements.userBtn.querySelector(
        ".icon-btn-label"
      );

    if (label) {
      label.textContent =
        name;
    }
  }

  if (elements.accountName) {
    elements.accountName.textContent =
      name;
  }

  if (elements.accountEmail) {
    elements.accountEmail.textContent =
      user.email || "";
  }
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
      await supabaseClient.auth.signOut();

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

    closeUserDropdown();

    updateAccountUI();

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

async function saveAddress(event) {

  event.preventDefault();

  if (!supabaseClient) {
    showToast(
      "Supabase não está conectado."
    );
    return;
  }

  const user =
    await getCurrentUser();

  if (!user) {

    showToast(
      "Entre na sua conta primeiro."
    );

    closeAddressModal();
    openLoginModal();

    return;
  }

  const form =
    elements.addressForm;

  if (!form) return;

  const formData =
    new FormData(form);

  const addressData = {
    user_id: user.id,

    cep:
      formData.get("cep") || "",

    rua:
      formData.get("rua") || "",

    numero:
      formData.get("numero") || "",

    complemento:
      formData.get("complemento") || "",

    bairro:
      formData.get("bairro") || "",

    cidade:
      formData.get("cidade") || "",

    estado:
      formData.get("estado") || ""
  };

  try {

    const {
      error
    } =
      await supabaseClient
        .from("addresses")
        .upsert(
          addressData,
          {
            onConflict: "user_id"
          }
        );

    if (error) {

      console.error(
        "Erro ao salvar endereço:",
        error
      );

      showToast(
        "Não foi possível salvar o endereço."
      );

      return;
    }

    showToast(
      "Endereço salvo com sucesso!"
    );

    closeAddressModal();

  } catch (error) {

    console.error(
      "Erro inesperado ao salvar endereço:",
      error
    );

    showToast(
      "Erro ao salvar endereço."
    );
  }
}


/* =========================================================
   TRADUÇÃO DE ERROS DO SUPABASE
   ========================================================= */

function getAuthErrorMessage(
  message
) {

  const normalized =
    String(message)
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

  return (
    message ||
    "Ocorreu um erro. Tente novamente."
  );
}


/* =========================================================
   LINKS DE LOGIN/CADASTRO
   ========================================================= */

function handleAccountAction(event) {

  const loginButton =
    event.target.closest(
      "[data-login]"
    );

  if (loginButton) {

    event.preventDefault();

    closeUserDropdown();
    openLoginModal();

    return;
  }

  const registerButton =
    event.target.closest(
      "[data-register]"
    );

  if (registerButton) {

    event.preventDefault();

    closeUserDropdown();
    openRegisterModal();

    return;
  }

  const addressButton =
    event.target.closest(
      "[data-address]"
    );

  if (addressButton) {

    event.preventDefault();

    closeUserDropdown();
    openAddressModal();

    return;
  }

  const logoutButton =
    event.target.closest(
      "[data-logout]"
    );

  if (logoutButton) {

    event.preventDefault();

    logoutUser();

    return;
  }
}


/* =========================================================
   PLACEHOLDER
   ========================================================= */

function handlePlaceholderLink(event) {
  event.preventDefault();

  showToast(
    "Esta área ainda faz parte da demonstração."
  );
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


  /* Formulário de login */

  if (elements.loginForm) {

    elements.loginForm.addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        const email =
          elements.loginEmail?.value
            .trim();

        const password =
          elements.loginPassword?.value;

        await loginUser(
          email,
          password
        );
      }
    );
  }


  /* Formulário de cadastro */

  if (elements.registerForm) {

    elements.registerForm.addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        await registerUser({
          name:
            elements.registerName?.value
              .trim(),

          email:
            elements.registerEmail?.value
              .trim(),

          password:
            elements.registerPassword?.value,

          passwordConfirm:
            elements
              .registerPasswordConfirm
              ?.value
        });
      }
    );
  }


  /* Formulário de endereço */

  if (elements.addressForm) {

    elements.addressForm.addEventListener(
      "submit",
      saveAddress
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


      /* Quantidade - */

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


      /* Quantidade + */

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


      /* Login / cadastro / endereço / logout */

      handleAccountAction(event);


      /* Fechar dropdown */

      const closeDropdownButton =
        event.target.closest(
          "[data-close-dropdown]"
        );

      if (closeDropdownButton) {

        closeUserDropdown();

        return;
      }


      /* Fechar modal login */

      const closeLoginButton =
        event.target.closest(
          "[data-close-login]"
        );

      if (closeLoginButton) {

        closeLoginModal();

        return;
      }


      /* Fechar modal cadastro */

      const closeRegisterButton =
        event.target.closest(
          "[data-close-register]"
        );

      if (closeRegisterButton) {

        closeRegisterModal();

        return;
      }


      /* Fechar endereço */

      const closeAddressButton =
        event.target.closest(
          "[data-close-address]"
        );

      if (closeAddressButton) {

        closeAddressModal();

        return;
      }


      /* Abrir cadastro */

      const goRegisterButton =
        event.target.closest(
          "[data-open-register]"
        );

      if (goRegisterButton) {

        event.preventDefault();

        closeLoginModal();
        openRegisterModal();

        return;
      }


      /* Abrir login */

      const goLoginButton =
        event.target.closest(
          "[data-open-login]"
        );

      if (goLoginButton) {

        event.preventDefault();

        closeRegisterModal();
        openLoginModal();

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


      /* Links placeholder */

      const placeholder =
        event.target.closest(
          "[data-placeholder-link]"
        );

      if (placeholder) {

        handlePlaceholderLink(event);

        return;
      }


      /* Clique fora do dropdown */

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

      if (
        event.key !== "Escape"
      ) {
        return;
      }

      closeCart();
      closeMobileMenu();
      closeUserDropdown();
      closeLoginModal();
      closeRegisterModal();
      closeAddressModal();
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
    async (event, session) => {

      console.log(
        "Estado de autenticação:",
        event
      );

      if (session?.user) {

        await loadUserProfile();

      } else {

        currentProfile = null;
      }

      updateAccountUI();
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

    updateAccountUI();
  }

  console.log(
    "Amora Make inicializado."
  );
}


if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    init
  );

} else {

  init();
}
