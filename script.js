/* =========================================================
   AMORA MAKE — script.js
   Produtos, categorias, busca, filtros, menu mobile,
   carrinho, login, cadastro, perfil e Supabase.
   ========================================================= */


/* =========================================================
   SUPABASE
   ========================================================= */

const SUPABASE_URL =
  "https://xcwjqbqinnvnyiktyjbj.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_I8MW1Q8ovLLKI-Gb-MavTg_UankO-md";

let supabase = null;


/* =========================================================
   INICIALIZAÇÃO DO SUPABASE
   ========================================================= */

async function initSupabase() {
  try {
    const { createClient } =
      await import(
        "https://esm.sh/@supabase/supabase-js@2"
      );

    supabase = createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );

    console.log("Supabase conectado.");

    await loadCurrentUser();

  } catch (error) {
    console.error(
      "Erro ao conectar ao Supabase:",
      error
    );
  }
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

  cart: JSON.parse(
    localStorage.getItem("amora_cart") || "[]"
  ),

  user: null,

  profile: null,

  address: null

};


/* =========================================================
   REFERÊNCIAS DOM
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

  overlay:
    document.getElementById("overlay"),

  userBtn:
    document.getElementById("userBtn"),

  userBtnLabel:
    document.getElementById("userBtnLabel"),

  userDropdown:
    document.getElementById("userDropdown"),

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

  loginModal:
    document.getElementById("loginModal"),

  loginForm:
    document.getElementById("loginForm"),

  registerForm:
    document.getElementById("registerForm"),

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
    document.getElementById("profileState"),

  mobileMenuClose:
    document.getElementById("mobileMenuClose")

};


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

  const query =
    normalizeText(state.query);

  return PRODUCTS.filter(product => {

    const matchesFilter =
      state.filter === "todos" ||
      product.category === state.filter;

    const searchableText =
      normalizeText(
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
    } em ${getCategoryLabel(state.filter)}`;

}


function renderProducts() {

  if (!elements.productGrid) return;

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

  if (!elements.offersGrid) return;

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
        element.matches(
          ".category-nav-list a"
        ) ||
        element.matches(
          ".mobile-menu a"
        )
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

function saveCart() {

  localStorage.setItem(
    "amora_cart",
    JSON.stringify(state.cart)
  );

}


function openCart() {

  if (!elements.cartDrawer) return;

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

  if (!elements.cartDrawer) return;

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

  document.body.style.overflow =
    "";

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

}


function changeQuantity(
  productId,
  amount
) {

  const item =
    state.cart.find(
      cartItem =>
        cartItem.id === productId
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
        product.price *
        item.quantity;

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
              productItem.id === item.id
          );

        if (!product) return "";

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

    showToast(
      "Entre na sua conta para continuar."
    );

    openLoginModal();

    return;

  }

  showToast(
    "Finalização de compra será configurada na próxima etapa."
  );

}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function openMobileMenu() {

  if (!elements.mobileMenu) return;

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

  if (!elements.mobileMenu) return;

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
   LOGIN / CADASTRO
   ========================================================= */

function openLoginModal() {

  if (!elements.loginModal) {

    showToast(
      "Área de login não encontrada no HTML."
    );

    return;

  }

  closeUserDropdown();

  closeMobileMenu();

  closeCart();

  elements.loginModal.hidden =
    false;

  document.body.style.overflow =
    "hidden";

}


function closeLoginModal() {

  if (!elements.loginModal) return;

  elements.loginModal.hidden =
    true;

  document.body.style.overflow =
    "";

}


function switchAuthMode(mode) {

  const loginPanel =
    document.getElementById(
      "loginPanel"
    );

  const registerPanel =
    document.getElementById(
      "registerPanel"
    );

  if (loginPanel) {

    loginPanel.hidden =
      mode !== "login";

  }

  if (registerPanel) {

    registerPanel.hidden =
      mode !== "register";

  }

}


async function handleLogin(event) {

  event.preventDefault();

  if (!supabase) {

    showToast(
      "Conectando ao sistema. Tente novamente."
    );

    await initSupabase();

    if (!supabase) return;

  }

  const email =
    elements.loginEmail?.value
      .trim();

  const password =
    elements.loginPassword?.value;

  if (!email || !password) {

    showToast(
      "Preencha e-mail e senha."
    );

    return;

  }

  const submitButton =
    elements.loginForm.querySelector(
      'button[type="submit"]'
    );

  if (submitButton) {

    submitButton.disabled =
      true;

    submitButton.textContent =
      "Entrando...";

  }

  try {

    const {
      data,
      error
    } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (error) {
      throw error;
    }

    state.user =
      data.user;

    await loadUserProfile();

    updateUserInterface();

    closeLoginModal();

    showToast(
      "Login realizado com sucesso! 💜"
    );

  } catch (error) {

    console.error(error);

    showToast(
      translateAuthError(
        error.message
      )
    );

  } finally {

    if (submitButton) {

      submitButton.disabled =
        false;

      submitButton.textContent =
        "Entrar";

    }

  }

}


async function handleRegister(event) {

  event.preventDefault();

  if (!supabase) {

    await initSupabase();

    if (!supabase) return;

  }

  const name =
    elements.registerName?.value
      .trim();

  const email =
    elements.registerEmail?.value
      .trim();

  const password =
    elements.registerPassword?.value;

  const passwordConfirm =
    elements.registerPasswordConfirm?.value;

  if (
    !name ||
    !email ||
    !password ||
    !passwordConfirm
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

  const submitButton =
    elements.registerForm.querySelector(
      'button[type="submit"]'
    );

  if (submitButton) {

    submitButton.disabled =
      true;

    submitButton.textContent =
      "Criando conta...";

  }

  try {

    const {
      data,
      error
    } =
      await supabase.auth.signUp({

        email,

        password,

        options: {
          data: {
            full_name: name
          }
        }

      });

    if (error) {
      throw error;
    }

    if (data.user) {

      state.user =
        data.user;

    }

    /*
      O perfil também será salvo na tabela
      profiles quando houver sessão disponível.
    */

    if (data.session) {

      await saveProfile({
        name
      });

    }

    if (
      !data.session &&
      data.user
    ) {

      showToast(
        "Conta criada! Verifique seu e-mail para confirmar o cadastro."
      );

    } else {

      showToast(
        "Conta criada com sucesso! 💜"
      );

    }

    switchAuthMode("login");

    if (elements.loginEmail) {

      elements.loginEmail.value =
        email;

    }

  } catch (error) {

    console.error(error);

    showToast(
      translateAuthError(
        error.message
      )
    );

  } finally {

    if (submitButton) {

      submitButton.disabled =
        false;

      submitButton.textContent =
        "Criar conta";

    }

  }

}


/* =========================================================
   ERROS DO SUPABASE
   ========================================================= */

function translateAuthError(message) {

  const text =
    String(message || "")
      .toLowerCase();

  if (
    text.includes(
      "invalid login credentials"
    )
  ) {

    return "E-mail ou senha incorretos.";

  }

  if (
    text.includes(
      "user already registered"
    )
  ) {

    return "Esse e-mail já possui uma conta.";

  }

  if (
    text.includes(
      "password should be at least"
    )
  ) {

    return "A senha precisa ter pelo menos 6 caracteres.";

  }

  if (
    text.includes(
      "email not confirmed"
    )
  ) {

    return "Confirme seu e-mail antes de entrar.";

  }

  return (
    message ||
    "Não foi possível concluir a operação."
  );

}


/* =========================================================
   CARREGAR USUÁRIO ATUAL
   ========================================================= */

async function loadCurrentUser() {

  if (!supabase) return;

  try {

    const {
      data,
      error
    } =
      await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    state.user =
      data.session?.user || null;

    if (state.user) {

      await loadUserProfile();

    }

    updateUserInterface();

  } catch (error) {

    console.error(
      "Erro ao carregar sessão:",
      error
    );

  }

}


/* =========================================================
   MONITORAR LOGIN / LOGOUT
   ========================================================= */

function setupAuthListener() {

  if (!supabase) return;

  supabase.auth.onAuthStateChange(
    async (event, session) => {

      state.user =
        session?.user || null;

      if (state.user) {

        await loadUserProfile();

      } else {

        state.profile = null;

        state.address = null;

      }

      updateUserInterface();

    }
  );

}


/* =========================================================
   CARREGAR PERFIL
   ========================================================= */

async function loadUserProfile() {

  if (
    !supabase ||
    !state.user
  ) return;

  try {

    const {
      data: profile,
      error: profileError
    } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", state.user.id)
        .maybeSingle();

    if (
      profileError &&
      profileError.code !== "PGRST116"
    ) {

      console.warn(
        "Não foi possível carregar o perfil:",
        profileError
      );

    }

    state.profile =
      profile || null;


    /*
      Procura o endereço vinculado ao usuário.
      O código aceita tanto "user_id" quanto
      os campos padrão usados no projeto.
    */

    const {
      data: address,
      error: addressError
    } =
      await supabase
        .from("addresses")
        .select("*")
        .eq("user_id", state.user.id)
        .maybeSingle();

    if (
      addressError &&
      addressError.code !== "PGRST116"
    ) {

      console.warn(
        "Não foi possível carregar o endereço:",
        addressError
      );

    }

    state.address =
      address || null;

    fillProfileFields();

  } catch (error) {

    console.error(
      "Erro ao carregar perfil:",
      error
    );

  }

}


/* =========================================================
   SALVAR PERFIL
   ========================================================= */

async function saveProfile(data) {

  if (
    !supabase ||
    !state.user
  ) return false;

  const name =
    data.name ||
    elements.profileName?.value?.trim() ||
    state.user.user_metadata?.full_name ||
    "";

  try {

    const {
      data: profile,
      error
    } =
      await supabase
        .from("profiles")
        .upsert(
          {
            id: state.user.id,
            name: name,
            email: state.user.email
          },
          {
            onConflict: "id"
          }
        )
        .select()
        .single();

    if (error) {
      throw error;
    }

    state.profile =
      profile;

    return true;

  } catch (error) {

    console.error(
      "Erro ao salvar perfil:",
      error
    );

    return false;

  }

}


/* =========================================================
   SALVAR ENDEREÇO
   ========================================================= */

async function saveAddress() {

  if (
    !supabase ||
    !state.user
  ) {

    showToast(
      "Você precisa estar logado."
    );

    return false;

  }

  const address = {

    user_id:
      state.user.id,

    cep:
      elements.profileCep?.value
        ?.trim() || "",

    street:
      elements.profileStreet?.value
        ?.trim() || "",

    number:
      elements.profileNumber?.value
        ?.trim() || "",

    complement:
      elements.profileComplement?.value
        ?.trim() || "",

    neighborhood:
      elements.profileNeighborhood?.value
        ?.trim() || "",

    city:
      elements.profileCity?.value
        ?.trim() || "",

    state:
      elements.profileState?.value
        ?.trim() || ""

  };

  try {

    const {
      data,
      error
    } =
      await supabase
        .from("addresses")
        .upsert(
          address,
          {
            onConflict: "user_id"
          }
        )
        .select()
        .single();

    if (error) {
      throw error;
    }

    state.address =
      data;

    showToast(
      "Endereço salvo com sucesso! 💜"
    );

    return true;

  } catch (error) {

    console.error(
      "Erro ao salvar endereço:",
      error
    );

    showToast(
      "Não foi possível salvar o endereço."
    );

    return false;

  }

}


/* =========================================================
   PREENCHER CAMPOS DO PERFIL
   ========================================================= */

function fillProfileFields() {

  const profile =
    state.profile || {};

  const address =
    state.address || {};

  if (elements.profileName) {

    elements.profileName.value =
      profile.name ||
      state.user?.user_metadata?.full_name ||
      "";

  }

  if (elements.profileEmail) {

    elements.profileEmail.value =
      state.user?.email ||
      profile.email ||
      "";

  }

  if (elements.profileCep) {

    elements.profileCep.value =
      address.cep || "";

  }

  if (elements.profileStreet) {

    elements.profileStreet.value =
      address.street || "";

  }

  if (elements.profileNumber) {

    elements.profileNumber.value =
      address.number || "";

  }

  if (elements.profileComplement) {

    elements.profileComplement.value =
      address.complement || "";

  }

  if (elements.profileNeighborhood) {

    elements.profileNeighborhood.value =
      address.neighborhood || "";

  }

  if (elements.profileCity) {

    elements.profileCity.value =
      address.city || "";

  }

  if (elements.profileState) {

    elements.profileState.value =
      address.state || "";

  }

}


/* =========================================================
   INTERFACE DO USUÁRIO
   ========================================================= */

function updateUserInterface() {

  if (!elements.userBtn) return;

  const loggedIn =
    Boolean(state.user);

  if (elements.userBtnLabel) {

    elements.userBtnLabel.textContent =
      loggedIn
        ? (
          state.profile?.name
            ? state.profile.name.split(" ")[0]
            : "Minha conta"
        )
        : "Entrar";

  } else {

    const label =
      elements.userBtn.querySelector(
        ".icon-btn-label"
      );

    if (label) {

      label.textContent =
        loggedIn
          ? (
            state.profile?.name
              ? state.profile.name.split(" ")[0]
              : "Minha conta"
          )
          : "Entrar";

    }

  }

  updateAuthButtons();

}


/* =========================================================
   BOTÕES DE LOGIN/CADASTRO
   ========================================================= */

function updateAuthButtons() {

  const loginButton =
    document.querySelector(
      "[data-open-login]"
    );

  const registerButton =
    document.querySelector(
      "[data-open-register]"
    );

  const profileButton =
    document.querySelector(
      "[data-open-profile]"
    );

  const logoutButton =
    document.querySelector(
      "[data-logout]"
    );

  const loggedIn =
    Boolean(state.user);

  if (loginButton) {

    loginButton.hidden =
      loggedIn;

  }

  if (registerButton) {

    registerButton.hidden =
      loggedIn;

  }

  if (profileButton) {

    profileButton.hidden =
      !loggedIn;

  }

  if (logoutButton) {

    logoutButton.hidden =
      !loggedIn;

  }

}


/* =========================================================
   LOGOUT
   ========================================================= */

async function logout() {

  if (!supabase) return;

  try {

    const {
      error
    } =
      await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    state.user = null;

    state.profile = null;

    state.address = null;

    closeUserDropdown();

    closeLoginModal();

    updateUserInterface();

    showToast(
      "Você saiu da sua conta."
    );

  } catch (error) {

    console.error(error);

    showToast(
      "Não foi possível sair da conta."
    );

  }

}


/* =========================================================
   INÍCIO
   ========================================================= */

function goToHome() {

  closeMobileMenu();

  closeUserDropdown();

  closeCart();

  state.filter =
    "todos";

  state.query =
    "";

  if (elements.searchInput) {

    elements.searchInput.value =
      "";

  }

  updateActiveFilters();

  renderProducts();

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

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
   EVENTOS
   ========================================================= */

function setupEvents() {


  /* ---------- Busca ---------- */

  if (elements.searchForm) {

    elements.searchForm.addEventListener(
      "submit",
      handleSearch
    );

  }


  /* ---------- Menu mobile ---------- */

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


  /* ---------- Overlay ---------- */

  if (elements.overlay) {

    elements.overlay.addEventListener(
      "click",
      closeMobileMenu
    );

  }


  /* ---------- Carrinho ---------- */

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


  /* ---------- Conta ---------- */

  if (elements.userBtn) {

    elements.userBtn.addEventListener(
      "click",
      () => {

        if (state.user) {

          toggleUserDropdown();

        } else {

          openLoginModal();

        }

      }
    );

  }


  /* ---------- Formulário login ---------- */

  if (elements.loginForm) {

    elements.loginForm.addEventListener(
      "submit",
      handleLogin
    );

  }


  /* ---------- Formulário cadastro ---------- */

  if (elements.registerForm) {

    elements.registerForm.addEventListener(
      "submit",
      handleRegister
    );

  }


  /* ---------- Checkout ---------- */

  if (elements.checkoutBtn) {

    elements.checkoutBtn.addEventListener(
      "click",
      handleCheckout
    );

  }


  /* ---------- Delegação geral ---------- */

  document.addEventListener(
    "click",
    event => {


      /* ---------- Filtros ---------- */

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


      /* ---------- Início ---------- */

      const homeLink =
        event.target.closest(
          "[data-home]"
        );

      if (homeLink) {

        event.preventDefault();

        goToHome();

        return;

      }


      /* ---------- Adicionar ---------- */

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


      /* ---------- Remover ---------- */

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


      /* ---------- Quantidade - ---------- */

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


      /* ---------- Quantidade + ---------- */

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


      /* ---------- Abrir login ---------- */

      const loginButton =
        event.target.closest(
          "[data-open-login]"
        );

      if (loginButton) {

        event.preventDefault();

        openLoginModal();

        return;

      }


      /* ---------- Abrir cadastro ---------- */

      const registerButton =
        event.target.closest(
          "[data-open-register]"
        );

      if (registerButton) {

        event.preventDefault();

        openLoginModal();

        switchAuthMode(
          "register"
        );

        return;

      }


      /* ---------- Abrir perfil ---------- */

      const profileButton =
        event.target.closest(
          "[data-open-profile]"
        );

      if (profileButton) {

        event.preventDefault();

        closeUserDropdown();

        const profileSection =
          document.getElementById(
            "perfil"
          );

        if (profileSection) {

          profileSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        } else {

          openLoginModal();

        }

        return;

      }


      /* ---------- Logout ---------- */

      const logoutButton =
        event.target.closest(
          "[data-logout]"
        );

      if (logoutButton) {

        event.preventDefault();

        logout();

        return;

      }


      /* ---------- Trocar para login ---------- */

      const switchLogin =
        event.target.closest(
          "[data-switch-login]"
        );

      if (switchLogin) {

        event.preventDefault();

        switchAuthMode(
          "login"
        );

        return;

      }


      /* ---------- Trocar para cadastro ---------- */

      const switchRegister =
        event.target.closest(
          "[data-switch-register]"
        );

      if (switchRegister) {

        event.preventDefault();

        switchAuthMode(
          "register"
        );

        return;

      }


      /* ---------- Fechar login ---------- */

      const closeLogin =
        event.target.closest(
          "[data-close-login]"
        );

      if (closeLogin) {

        event.preventDefault();

        closeLoginModal();

        return;

      }


      /* ---------- Salvar endereço ---------- */

      const saveAddressButton =
        event.target.closest(
          "[data-save-address]"
        );

      if (saveAddressButton) {

        event.preventDefault();

        saveAddress();

        return;

      }


      /* ---------- Fechar dropdown ---------- */

      const closeDropdownButton =
        event.target.closest(
          "[data-close-dropdown]"
        );

      if (closeDropdownButton) {

        closeUserDropdown();

        return;

      }


      /* ---------- Fechar carrinho ---------- */

      const closeCartLink =
        event.target.closest(
          "[data-close-cart]"
        );

      if (closeCartLink) {

        closeCart();

        return;

      }


      /* ---------- Placeholder ---------- */

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


      /* ---------- Fecha dropdown fora ---------- */

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

      if (event.key !== "Escape") {
        return;
      }

      closeCart();

      closeMobileMenu();

      closeUserDropdown();

      closeLoginModal();

    }
  );

}


/* =========================================================
   ANO DO FOOTER
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

  renderCategoryCards();

  renderProducts();

  renderOffers();

  renderCart();

  updateCartCount();

  updateActiveFilters();

  updateCurrentYear();

  setupEvents();

  await initSupabase();

  setupAuthListener();

  updateUserInterface();

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
