```javascript
/* =========================================================
   AMORA MAKE — script.js
   Produtos, categorias, busca, menu mobile, carrinho,
   autenticação Supabase, perfil e endereço de entrega.
   ========================================================= */


/* =========================================================
   SUPABASE
   ========================================================= */

/*
  COLOQUE AQUI OS DADOS DO SEU PROJETO.

  URL:
  https://xcwjqbqinnvnyiktyjbj.supabase.co

  Chave:
  use a sua chave sb_publishable_...
*/

const SUPABASE_URL =
  "https://xcwjqbqinnvnyiktyjbj.supabase.co";

const SUPABASE_ANON_KEY =
  "COLE_AQUI_SUA_CHAVE_SB_PUBLISHABLE";


const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );


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
   NOMES DAS CATEGORIAS
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


/* =========================================================
   CATEGORIAS EM DESTAQUE
   ========================================================= */

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

  return Number(value).toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL"
    }
  );

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

    return getProductIcon(
      product.category
    );

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

  cart: [],

  user: null,

  profile: null,

  address: null

};


/* =========================================================
   REFERÊNCIAS DO DOM
   ========================================================= */

const elements = {

  catGrid:
    document.getElementById("catGrid"),

  productGrid:
    document.getElementById("productGrid"),

  offersGrid:
    document.getElementById("offersGrid"),

  emptyState:
    document.getElementById("emptyState"),

  filterLabel:
    document.getElementById("filterLabel"),

  searchForm:
    document.getElementById("searchForm"),

  searchInput:
    document.getElementById("searchInput"),

  menuToggle:
    document.getElementById("menuToggle"),

  mobileMenu:
    document.getElementById("mobileMenu"),

  mobileMenuClose:
    document.getElementById("mobileMenuClose"),

  overlay:
    document.getElementById("overlay"),

  userBtn:
    document.getElementById("userBtn"),

  userBtnLabel:
    document.getElementById("userBtnLabel"),

  userDropdown:
    document.getElementById("userDropdown"),

  loggedOutAccount:
    document.getElementById("loggedOutAccount"),

  loggedInAccount:
    document.getElementById("loggedInAccount"),

  accountName:
    document.getElementById("accountName"),

  openLoginBtn:
    document.getElementById("openLoginBtn"),

  openRegisterBtn:
    document.getElementById("openRegisterBtn"),

  openProfileBtn:
    document.getElementById("openProfileBtn"),

  logoutBtn:
    document.getElementById("logoutBtn"),

  cartBtn:
    document.getElementById("cartBtn"),

  cartCloseBtn:
    document.getElementById("cartCloseBtn"),

  cartDrawer:
    document.getElementById("cartDrawer"),

  cartOverlay:
    document.getElementById("cartOverlay"),

  cartCount:
    document.getElementById("cartCount"),

  cartItemsList:
    document.getElementById("cartItemsList"),

  cartEmptyMsg:
    document.getElementById("cartEmptyMsg"),

  cartFooter:
    document.getElementById("cartFooter"),

  cartSubtotal:
    document.getElementById("cartSubtotal"),

  checkoutBtn:
    document.getElementById("checkoutBtn"),

  toast:
    document.getElementById("toast"),

  anoAtual:
    document.getElementById("anoAtual"),

  authModal:
    document.getElementById("authModal"),

  closeAuthModal:
    document.getElementById("closeAuthModal"),

  loginForm:
    document.getElementById("loginForm"),

  registerForm:
    document.getElementById("registerForm"),

  showRegisterBtn:
    document.getElementById("showRegisterBtn"),

  showLoginBtn:
    document.getElementById("showLoginBtn"),

  loginMessage:
    document.getElementById("loginMessage"),

  registerMessage:
    document.getElementById("registerMessage"),

  loginEmail:
    document.getElementById("loginEmail"),

  loginPassword:
    document.getElementById("loginPassword"),

  registerName:
    document.getElementById("registerName"),

  registerEmail:
    document.getElementById("registerEmail"),

  registerPassword:
    document.getElementById("registerPassword"),

  registerPasswordConfirm:
    document.getElementById("registerPasswordConfirm"),

  profileModal:
    document.getElementById("profileModal"),

  closeProfileModal:
    document.getElementById("closeProfileModal"),

  profileForm:
    document.getElementById("profileForm"),

  profileMessage:
    document.getElementById("profileMessage"),

  profileName:
    document.getElementById("profileName"),

  profileEmail:
    document.getElementById("profileEmail"),

  profileCep:
    document.getElementById("profileCep"),

  profileStreet:
    document.getElementById("profileStreet"),

  profileNumber:
    document.getElementById("profileNumber"),

  profileComplement:
    document.getElementById("profileComplement"),

  profileNeighborhood:
    document.getElementById("profileNeighborhood"),

  profileCity:
    document.getElementById("profileCity"),

  profileState:
    document.getElementById("profileState")

};


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer = null;


function showToast(message) {

  if (!elements.toast) return;

  elements.toast.textContent =
    message;

  elements.toast.hidden = false;

  requestAnimationFrame(() => {

    elements.toast.classList.add(
      "show"
    );

  });

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    elements.toast.classList.remove(
      "show"
    );

    setTimeout(() => {

      elements.toast.hidden = true;

    }, 220);

  }, 2400);

}


/* =========================================================
   MENSAGENS DE FORMULÁRIO
   ========================================================= */

function showFormMessage(
  element,
  message,
  type = "error"
) {

  if (!element) return;

  element.textContent =
    message;

  element.dataset.type =
    type;

  element.hidden = false;

}


function clearFormMessage(element) {

  if (!element) return;

  element.textContent = "";

  element.hidden = true;

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

  const isInCart =
    state.cart.some(
      item =>
        item.id === product.id
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
          class="product-add-btn ${
            isInCart ? "added" : ""
          }"
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

  const query =
    normalizeText(
      state.query
    );

  return PRODUCTS.filter(
    product => {

      const matchesFilter =
        state.filter === "todos" ||
        product.category ===
          state.filter;

      const searchableText =
        normalizeText(
          `${product.name} ${getCategoryLabel(product.category)}`
        );

      const matchesQuery =
        !query ||
        searchableText.includes(
          query
        );

      return (
        matchesFilter &&
        matchesQuery
      );

    }
  );

}


function updateFilterLabel(total) {

  if (!elements.filterLabel)
    return;

  if (state.query) {

    elements.filterLabel.textContent =
      `${total} produto${
        total === 1 ? "" : "s"
      } encontrado${
        total === 1 ? "" : "s"
      }`;

    return;

  }

  if (state.filter === "todos") {

    elements.filterLabel.textContent =
      `Mostrando todos os ${PRODUCTS.length} produtos`;

    return;

  }

  elements.filterLabel.textContent =
    `Mostrando ${total} produto${
      total === 1 ? "" : "s"
    } em ${
      getCategoryLabel(
        state.filter
      )
    }`;

}


function renderProducts() {

  if (!elements.productGrid)
    return;

  const products =
    getFilteredProducts();

  elements.productGrid.innerHTML =
    products
      .map(createProductCard)
      .join("");

  if (elements.emptyState) {

    elements.emptyState.hidden =
      products.length !== 0;

  }

  updateFilterLabel(
    products.length
  );

}


/* =========================================================
   OFERTAS
   ========================================================= */

function renderOffers() {

  if (!elements.offersGrid)
    return;

  const featuredProducts =
    PRODUCTS.slice(0, 6);

  elements.offersGrid.innerHTML =
    featuredProducts
      .map(createProductCard)
      .join("");

}


/* =========================================================
   FILTROS
   ========================================================= */

function setFilter(filter) {

  state.filter =
    filter || "todos";

  updateActiveFilters();

  renderProducts();

  const productsSection =
    document.getElementById(
      "produtos"
    );

  if (productsSection) {

    productsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}


function updateActiveFilters() {

  document
    .querySelectorAll(
      "[data-filter]"
    )
    .forEach(element => {

      const filter =
        element.dataset.filter;

      if (
        element.matches(
          ".category-nav-list a"
        ) ||
        element.matches(
          ".mobile-menu a"
        )
      ) {

        element.classList.toggle(
          "active",
          filter ===
            state.filter
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
    document.getElementById(
      "produtos"
    );

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

  if (!elements.cartDrawer)
    return;

  closeUserDropdown();

  closeMobileMenu();

  elements.cartDrawer.hidden =
    false;

  if (elements.cartOverlay) {

    elements.cartOverlay.hidden =
      false;

  }

  if (elements.cartBtn) {

    elements.cartBtn.setAttribute(
      "aria-expanded",
      "true"
    );

  }

  document.body.style.overflow =
    "hidden";

  renderCart();

}


function closeCart() {

  if (!elements.cartDrawer)
    return;

  elements.cartDrawer.hidden =
    true;

  if (elements.cartOverlay) {

    elements.cartOverlay.hidden =
      true;

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

    document.body.style.overflow =
      "";

  }

}


function toggleCart() {

  if (!elements.cartDrawer)
    return;

  if (
    elements.cartDrawer.hidden
  ) {

    openCart();

  } else {

    closeCart();

  }

}


function addToCart(productId) {

  const product =
    PRODUCTS.find(
      item =>
        item.id === productId
    );

  if (!product) return;

  const existingItem =
    state.cart.find(
      item =>
        item.id === productId
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
      item =>
        item.id !== productId
    );

  saveCart();

  updateCartCount();

  renderCart();

  renderProducts();

  renderOffers();

}


function changeQuantity(
  productId,
  amount
) {

  const item =
    state.cart.find(
      cartItem =>
        cartItem.id ===
        productId
    );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {

    removeFromCart(
      productId
    );

    return;

  }

  saveCart();

  updateCartCount();

  renderCart();

  renderProducts();

  renderOffers();

}


function updateCartCount() {

  if (!elements.cartCount)
    return;

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
            productItem.id ===
            item.id
        );

      if (!product)
        return total;

      return (
        total +
        product.price *
          item.quantity
      );

    },
    0
  );

}


function renderCart() {

  if (
    !elements.cartItemsList
  )
    return;

  const hasItems =
    state.cart.length > 0;

  if (elements.cartEmptyMsg) {

    elements.cartEmptyMsg.hidden =
      hasItems;

  }

  if (!hasItems) {

    elements.cartItemsList.innerHTML =
      "";

    if (elements.cartFooter) {

      elements.cartFooter.hidden =
        true;

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
              productItem.id ===
              item.id
          );

        if (!product)
          return "";

        const itemTotal =
          product.price *
          item.quantity;

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
                  aria-label="Diminuir quantidade"
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
                  aria-label="Aumentar quantidade"
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

  const subtotal =
    calculateCartSubtotal();

  if (elements.cartSubtotal) {

    elements.cartSubtotal.textContent =
      formatBRL(subtotal);

  }

  if (elements.cartFooter) {

    elements.cartFooter.hidden =
      false;

  }

  updateCartCount();

}


function saveCart() {

  try {

    localStorage.setItem(
      "amora_cart",
      JSON.stringify(
        state.cart
      )
    );

  } catch (error) {

    console.warn(
      "Não foi possível salvar o carrinho.",
      error
    );

  }

}


function loadCart() {

  try {

    const saved =
      localStorage.getItem(
        "amora_cart"
      );

    if (!saved)
      return;

    const parsed =
      JSON.parse(saved);

    if (
      Array.isArray(parsed)
    ) {

      state.cart =
        parsed;

    }

  } catch (error) {

    console.warn(
      "Não foi possível carregar o carrinho.",
      error
    );

  }

}


/* =========================================================
   CHECKOUT
   ========================================================= */

function handleCheckout() {

  if (
    state.cart.length === 0
  ) {

    showToast(
      "Seu carrinho está vazio."
    );

    return;

  }

  if (!state.user) {

    showToast(
      "Entre na sua conta antes de finalizar a compra."
    );

    closeCart();

    openAuthModal(
      "login"
    );

    return;

  }

  if (!state.address) {

    showToast(
      "Cadastre seu endereço de entrega antes de finalizar."
    );

    closeCart();

    openProfileModal();

    return;

  }

  showToast(
    "Seu pedido está pronto para a próxima etapa."
  );

}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function openMobileMenu() {

  if (!elements.mobileMenu)
    return;

  closeUserDropdown();

  closeCart();

  elements.mobileMenu.hidden =
    false;

  if (elements.overlay) {

    elements.overlay.hidden =
      false;

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

  if (!elements.mobileMenu)
    return;

  elements.mobileMenu.hidden =
    true;

  if (elements.overlay) {

    elements.overlay.hidden =
      true;

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

  if (!elements.mobileMenu)
    return;

  if (
    elements.mobileMenu.hidden
  ) {

    openMobileMenu();

  } else {

    closeMobileMenu();

  }

}


/* =========================================================
   DROPDOWN DA CONTA
   ========================================================= */

function openUserDropdown() {

  if (!elements.userDropdown)
    return;

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

}


function closeUserDropdown() {

  if (!elements.userDropdown)
    return;

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

  if (!elements.userDropdown)
    return;

  if (
    elements.userDropdown.hidden
  ) {

    openUserDropdown();

  } else {

    closeUserDropdown();

  }

}


/* =========================================================
   MODAL DE LOGIN
   ========================================================= */

function openAuthModal(
  mode = "login"
) {

  if (!elements.authModal)
    return;

  closeUserDropdown();

  closeMobileMenu();

  closeCart();

  elements.authModal.hidden =
    false;

  elements.authModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow =
    "hidden";

  showAuthMode(mode);

}


function closeAuthModal() {

  if (!elements.authModal)
    return;

  elements.authModal.hidden =
    true;

  elements.authModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

  clearFormMessage(
    elements.loginMessage
  );

  clearFormMessage(
    elements.registerMessage
  );

}


function showAuthMode(
  mode
) {

  const isRegister =
    mode === "register";

  if (elements.loginForm) {

    elements.loginForm.hidden =
      isRegister;

  }

  if (elements.registerForm) {

    elements.registerForm.hidden =
      !isRegister;

  }

  if (elements.authModalTitle) {

    elements.authModalTitle.textContent =
      isRegister
        ? "Criar sua conta"
        : "Entre na sua conta";

  }

}


/* =========================================================
   CADASTRO
   ========================================================= */

async function handleRegister(
  event
) {

  event.preventDefault();

  clearFormMessage(
    elements.registerMessage
  );

  const name =
    elements.registerName.value.trim();

  const email =
    elements.registerEmail.value
      .trim()
      .toLowerCase();

  const password =
    elements.registerPassword.value;

  const passwordConfirm =
    elements.registerPasswordConfirm
      .value;

  if (
    password !==
    passwordConfirm
  ) {

    showFormMessage(
      elements.registerMessage,
      "As senhas não são iguais."
    );

    return;

  }

  if (password.length < 6) {

    showFormMessage(
      elements.registerMessage,
      "A senha precisa ter pelo menos 6 caracteres."
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

            name

          }

        }

      });

    if (error)
      throw error;

    if (!data.user) {

      throw new Error(
        "Não foi possível criar a conta."
      );

    }

    /*
      O trigger do Supabase pode criar
      automaticamente o perfil.

      Caso o projeto esteja configurado
      para confirmação de e-mail, o usuário
      precisará confirmar o endereço antes
      de entrar.
    */

    showFormMessage(
      elements.registerMessage,
      "Conta criada com sucesso! Verifique seu e-mail se o Supabase pedir confirmação.",
      "success"
    );

    elements.registerForm.reset();

    /*
      Se a confirmação de e-mail estiver
      desativada, o usuário já pode estar
      autenticado.
    */

    if (data.session) {

      await loadCurrentUser();

      closeAuthModal();

      showToast(
        "Conta criada com sucesso! 💜"
      );

    } else {

      showToast(
        "Conta criada. Confira seu e-mail para continuar."
      );

    }

  } catch (error) {

    console.error(
      "Erro no cadastro:",
      error
    );

    showFormMessage(
      elements.registerMessage,
      translateSupabaseError(
        error
      )
    );

  }

}


/* =========================================================
   LOGIN
   ========================================================= */

async function handleLogin(
  event
) {

  event.preventDefault();

  clearFormMessage(
    elements.loginMessage
  );

  const email =
    elements.loginEmail.value
      .trim()
      .toLowerCase();

  const password =
    elements.loginPassword.value;

  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.signInWithPassword({

        email,

        password

      });

    if (error)
      throw error;

    state.user =
      data.user;

    await loadCurrentUser();

    closeAuthModal();

    showToast(
      `Bem-vindo de volta, ${
        state.profile?.name ||
        "cliente"
      }! 💜`
    );

    updateAccountUI();

  } catch (error) {

    console.error(
      "Erro no login:",
      error
    );

    showFormMessage(
      elements.loginMessage,
      translateSupabaseError(
        error
      )
    );

  }

}


/* =========================================================
   LOGOUT
   ========================================================= */

async function logout() {

  try {

    const {
      error
    } =
      await supabaseClient.auth.signOut();

    if (error)
      throw error;

    state.user = null;

    state.profile = null;

    state.address = null;

    updateAccountUI();

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
   CARREGAR USUÁRIO ATUAL
   ========================================================= */

async function loadCurrentUser() {

  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.getUser();

    if (error)
      throw error;

    state.user =
      data.user || null;

    if (!state.user) {

      state.profile = null;

      state.address = null;

      updateAccountUI();

      return;

    }

    await loadProfile();

    await loadAddress();

    updateAccountUI();

  } catch (error) {

    console.error(
      "Erro ao carregar usuário:",
      error
    );

  }

}


/* =========================================================
   CARREGAR PERFIL
   ========================================================= */

async function loadProfile() {

  if (!state.user)
    return;

  try {

    const {
      data,
      error
    } =
      await supabaseClient
        .from("profiles")
        .select("*")
        .eq(
          "id",
          state.user.id
        )
        .maybeSingle();

    if (error)
      throw error;

    state.profile =
      data || {

        id:
          state.user.id,

        name:
          state.user.user_metadata
            ?.name ||
          ""

      };

  } catch (error) {

    console.error(
      "Erro ao carregar perfil:",
      error
    );

  }

}


/* =========================================================
   CARREGAR ENDEREÇO
   ========================================================= */

async function loadAddress() {

  if (!state.user)
    return;

  try {

    const {
      data,
      error
    } =
      await supabaseClient
        .from("addresses")
        .select("*")
        .eq(
          "user_id",
          state.user.id
        )
        .maybeSingle();

    if (error)
      throw error;

    state.address =
      data || null;

  } catch (error) {

    console.error(
      "Erro ao carregar endereço:",
      error
    );

  }

}


/* =========================================================
   ATUALIZAR INTERFACE DA CONTA
   ========================================================= */

function updateAccountUI() {

  const loggedIn =
    Boolean(state.user);

  if (
    elements.loggedOutAccount
  ) {

    elements.loggedOutAccount.hidden =
      loggedIn;

  }

  if (
    elements.loggedInAccount
  ) {

    elements.loggedInAccount.hidden =
      !loggedIn;

  }

  if (elements.userBtnLabel) {

    elements.userBtnLabel.textContent =
      loggedIn
        ? "Minha conta"
        : "Entrar";

  }

  if (elements.accountName) {

    elements.accountName.textContent =
      state.profile?.name ||
      state.user?.user_metadata
        ?.name ||
      "cliente";

  }

}


/* =========================================================
   MODAL DE PERFIL
   ========================================================= */

async function openProfileModal() {

  if (!state.user) {

    openAuthModal(
      "login"
    );

    return;

  }

  await loadProfile();

  await loadAddress();

  fillProfileForm();

  clearFormMessage(
    elements.profileMessage
  );

  elements.profileModal.hidden =
    false;

  elements.profileModal.setAttribute(
    "aria-hidden",
    "false"
  );

  closeUserDropdown();

  document.body.style.overflow =
    "hidden";

}


function closeProfileModal() {

  if (!elements.profileModal)
    return;

  elements.profileModal.hidden =
    true;

  elements.profileModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow =
    "";

}


function fillProfileForm() {

  if (!state.user)
    return;

  if (elements.profileName) {

    elements.profileName.value =
      state.profile?.name ||
      state.user.user_metadata
        ?.name ||
      "";

  }

  if (elements.profileEmail) {

    elements.profileEmail.value =
      state.user.email ||
      "";

  }

  if (elements.profileCep) {

    elements.profileCep.value =
      state.address?.cep ||
      "";

  }

  if (elements.profileStreet) {

    elements.profileStreet.value =
      state.address?.street ||
      "";

  }

  if (elements.profileNumber) {

    elements.profileNumber.value =
      state.address?.number ||
      "";

  }

  if (elements.profileComplement) {

    elements.profileComplement.value =
      state.address?.complement ||
      "";

  }

  if (
    elements.profileNeighborhood
  ) {

    elements.profileNeighborhood.value =
      state.address?.neighborhood ||
      "";

  }

  if (elements.profileCity) {

    elements.profileCity.value =
      state.address?.city ||
      "";

  }

  if (elements.profileState) {

    elements.profileState.value =
      state.address?.state ||
      "";

  }

}


/* =========================================================
   SALVAR PERFIL + ENDEREÇO
   ========================================================= */

async function handleProfileSave(
  event
) {

  event.preventDefault();

  if (!state.user) {

    showFormMessage(
      elements.profileMessage,
      "Você precisa estar logado."
    );

    return;

  }

  clearFormMessage(
    elements.profileMessage
  );

  const name =
    elements.profileName.value.trim();

  const cep =
    elements.profileCep.value.trim();

  const street =
    elements.profileStreet.value.trim();

  const number =
    elements.profileNumber.value.trim();

  const complement =
    elements.profileComplement.value.trim();

  const neighborhood =
    elements.profileNeighborhood
      .value
      .trim();

  const city =
    elements.profileCity.value.trim();

  const stateUF =
    elements.profileState.value
      .trim()
      .toUpperCase();

  try {

    /* ---------- PERFIL ---------- */

    const {
      data: profileData,
      error: profileError
    } =
      await supabaseClient
        .from("profiles")
        .upsert(
          {

            id:
              state.user.id,

            name,

            email:
              state.user.email

          },
          {
            onConflict:
              "id"
          }
        )
        .select()
        .single();

    if (profileError)
      throw profileError;

    state.profile =
      profileData;


    /* ---------- ENDEREÇO ---------- */

    const hasAddress =
      cep ||
      street ||
      number ||
      complement ||
      neighborhood ||
      city ||
      stateUF;

    if (hasAddress) {

      const {
        data: addressData,
        error: addressError
      } =
        await supabaseClient
          .from("addresses")
          .upsert(
            {

              user_id:
                state.user.id,

              cep,

              street,

              number,

              complement,

              neighborhood,

              city,

              state:
                stateUF

            },
            {
              onConflict:
                "user_id"
            }
          )
          .select()
          .single();

      if (addressError)
        throw addressError;

      state.address =
        addressData;

    } else {

      state.address =
        null;

    }


    updateAccountUI();

    showFormMessage(
      elements.profileMessage,
      "Seus dados foram salvos com sucesso.",
      "success"
    );

    showToast(
      "Dados salvos com sucesso! 💜"
    );

  } catch (error) {

    console.error(
      "Erro ao salvar perfil:",
      error
    );

    showFormMessage(
      elements.profileMessage,
      translateSupabaseError(
        error
      )
    );

  }

}


/* =========================================================
   CEP
   ========================================================= */

function formatCEP(value) {

  const numbers =
    String(value)
      .replace(/\D/g, "")
      .slice(0, 8);

  if (
    numbers.length <= 5
  ) {

    return numbers;

  }

  return (
    numbers.slice(0, 5) +
    "-" +
    numbers.slice(5)
  );

}


function setupCepFormatter() {

  if (!elements.profileCep)
    return;

  elements.profileCep.addEventListener(
    "input",
    () => {

      elements.profileCep.value =
        formatCEP(
          elements.profileCep.value
        );

    }
  );

}


/* =========================================================
   TRADUZIR ERROS DO SUPABASE
   ========================================================= */

function translateSupabaseError(
  error
) {

  const message =
    String(
      error?.message ||
      error ||
      ""
    );

  const normalized =
    normalizeText(
      message
    );

  if (
    normalized.includes(
      "invalid login credentials"
    )
  ) {

    return (
      "E-mail ou senha incorretos."
    );

  }

  if (
    normalized.includes(
      "user already registered"
    )
  ) {

    return (
      "Esse e-mail já possui uma conta."
    );

  }

  if (
    normalized.includes(
      "email not confirmed"
    )
  ) {

    return (
      "Seu e-mail ainda não foi confirmado."
    );

  }

  if (
    normalized.includes(
      "password should be at least"
    )
  ) {

    return (
      "A senha precisa ter pelo menos 6 caracteres."
    );

  }

  if (
    normalized.includes(
      "profiles"
    ) ||
    normalized.includes(
      "addresses"
    )
  ) {

    return (
      "Não foi possível salvar os dados. Verifique se as tabelas e permissões do Supabase estão configuradas."
    );

  }

  return (
    message ||
    "Ocorreu um erro. Tente novamente."
  );

}


/* =========================================================
   LINKS PLACEHOLDER
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


  /* ---------- BUSCA ---------- */

  if (elements.searchForm) {

    elements.searchForm.addEventListener(
      "submit",
      handleSearch
    );

  }


  /* ---------- MENU MOBILE ---------- */

  if (elements.menuToggle) {

    elements.menuToggle.addEventListener(
      "click",
      toggleMobileMenu
    );

  }


  if (elements.mobileMenuClose) {

    elements.mobileMenuClose.addEventListener(
      "click",
      closeMobileMenu
    );

  }


  if (elements.overlay) {

    elements.overlay.addEventListener(
      "click",
      closeMobileMenu
    );

  }


  /* ---------- CARRINHO ---------- */

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


  /* ---------- CONTA ---------- */

  if (elements.userBtn) {

    elements.userBtn.addEventListener(
      "click",
      toggleUserDropdown
    );

  }


  if (elements.openLoginBtn) {

    elements.openLoginBtn.addEventListener(
      "click",
      () => {

        openAuthModal(
          "login"
        );

      }
    );

  }


  if (elements.openRegisterBtn) {

    elements.openRegisterBtn.addEventListener(
      "click",
      () => {

        openAuthModal(
          "register"
        );

      }
    );

  }


  if (elements.openProfileBtn) {

    elements.openProfileBtn.addEventListener(
      "click",
      openProfileModal
    );

  }


  if (elements.logoutBtn) {

    elements.logoutBtn.addEventListener(
      "click",
      logout
    );

  }


  /* ---------- MODAL AUTH ---------- */

  if (elements.closeAuthModal) {

    elements.closeAuthModal.addEventListener(
      "click",
      closeAuthModal
    );

  }


  if (elements.showRegisterBtn) {

    elements.showRegisterBtn.addEventListener(
      "click",
      () => {

        showAuthMode(
          "register"
        );

      }
    );

  }


  if (elements.showLoginBtn) {

    elements.showLoginBtn.addEventListener(
      "click",
      () => {

        showAuthMode(
          "login"
        );

      }
    );

  }


  if (elements.loginForm) {

    elements.loginForm.addEventListener(
      "submit",
      handleLogin
    );

  }


  if (elements.registerForm) {

    elements.registerForm.addEventListener(
      "submit",
      handleRegister
    );

  }


  /* ---------- PERFIL ---------- */

  if (elements.closeProfileModal) {

    elements.closeProfileModal.addEventListener(
      "click",
      closeProfileModal
    );

  }


  if (elements.profileForm) {

    elements.profileForm.addEventListener(
      "submit",
      handleProfileSave
    );

  }


  setupCepFormatter();


  /* ---------- CHECKOUT ---------- */

  if (elements.checkoutBtn) {

    elements.checkoutBtn.addEventListener(
      "click",
      handleCheckout
    );

  }


  /* ---------- DELEGAÇÃO GERAL ---------- */

  document.addEventListener(
    "click",
    event => {


      /* ---------- FILTROS ---------- */

      const filterElement =
        event.target.closest(
          "[data-filter]"
        );

      if (filterElement) {

        event.preventDefault();

        const filter =
          filterElement.dataset.filter;

        if (filter) {

          setFilter(
            filter
          );

          closeMobileMenu();

        }

        return;

      }


      /* ---------- ADICIONAR AO CARRINHO ---------- */

      const addButton =
        event.target.closest(
          "[data-add-cart]"
        );

      if (addButton) {

        const productId =
          addButton.dataset
            .addCart;

        addToCart(
          productId
        );

        return;

      }


      /* ---------- REMOVER ---------- */

      const removeButton =
        event.target.closest(
          "[data-remove-cart]"
        );

      if (removeButton) {

        const productId =
          removeButton.dataset
            .removeCart;

        removeFromCart(
          productId
        );

        return;

      }


      /* ---------- QUANTIDADE - ---------- */

      const minusButton =
        event.target.closest(
          "[data-qty-minus]"
        );

      if (minusButton) {

        const productId =
          minusButton.dataset
            .qtyMinus;

        changeQuantity(
          productId,
          -1
        );

        return;

      }


      /* ---------- QUANTIDADE + ---------- */

      const plusButton =
        event.target.closest(
          "[data-qty-plus]"
        );

      if (plusButton) {

        const productId =
          plusButton.dataset
            .qtyPlus;

        changeQuantity(
          productId,
          1
        );

        return;

      }


      /* ---------- FECHAR DROPDOWN ---------- */

      const closeDropdownButton =
        event.target.closest(
          "[data-close-dropdown]"
        );

      if (closeDropdownButton) {

        closeUserDropdown();

        return;

      }


      /* ---------- FECHAR CARRINHO ---------- */

      const closeCartLink =
        event.target.closest(
          "[data-close-cart]"
        );

      if (closeCartLink) {

        closeCart();

        return;

      }


      /* ---------- PLACEHOLDER ---------- */

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


      /* ---------- FECHA DROPDOWN AO CLICAR FORA ---------- */

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


  /* ---------- ESC ---------- */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !== "Escape"
      )
        return;

      closeCart();

      closeMobileMenu();

      closeUserDropdown();

      closeAuthModal();

      closeProfileModal();

    }
  );


  /* ---------- CLIQUE NO OVERLAY DO AUTH ---------- */

  if (elements.authModal) {

    elements.authModal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          elements.authModal
        ) {

          closeAuthModal();

        }

      }
    );

  }


  /* ---------- CLIQUE NO OVERLAY DO PERFIL ---------- */

  if (elements.profileModal) {

    elements.profileModal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          elements.profileModal
        ) {

          closeProfileModal();

        }

      }
    );

  }

}


/* =========================================================
   ANO DO FOOTER
   ========================================================= */

function updateCurrentYear() {

  if (!elements.anoAtual)
    return;

  elements.anoAtual.textContent =
    new Date().getFullYear();

}


/* =========================================================
   AUTENTICAÇÃO — OBSERVADOR DE SESSÃO
   ========================================================= */

function setupAuthListener() {

  supabaseClient.auth.onAuthStateChange(
    async (
      event,
      session
    ) => {

      state.user =
        session?.user ||
        null;

      if (state.user) {

        /*
          Pequeno atraso para evitar
          problemas de concorrência entre
          o evento de autenticação e as
          consultas das tabelas.
        */

        setTimeout(
          async () => {

            await loadCurrentUser();

          },
          0
        );

      } else {

        state.profile =
          null;

        state.address =
          null;

        updateAccountUI();

      }

    }
  );

}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

async function init() {

  renderCategoryCards();

  loadCart();

  renderProducts();

  renderOffers();

  renderCart();

  updateCartCount();

  updateActiveFilters();

  updateCurrentYear();

  updateAccountUI();

  setupEvents();

  setupAuthListener();

  await loadCurrentUser();

}


/* =========================================================
   INICIAR
   ========================================================= */

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
```
