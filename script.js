/* =========================================================
   AMORA MAKE — script.js
   Produtos, categorias, busca, filtros, menu mobile,
   dropdown, carrinho e interações da página.
   ========================================================= */


/* =========================================================
   ÍCONES — SVG INLINE POR CATEGORIA
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
   PRODUTOS REAIS INFORMADOS
   ========================================================= */

const PRODUCTS = [
  {
    id: "p01",
    name: "Esponja Chanfrada",
    category: "acessorio",
    price: 5.00
  },

  {
    id: "p02",
    name: "Fixador Fix Matte",
    category: "maquiagem",
    price: 15.00
  },

  {
    id: "p03",
    name: "Máscara de Cílios Alonga e Define",
    category: "mascara",
    price: 10.00
  },

  {
    id: "p04",
    name: "Lip Oil Sweet Hello Kitty",
    category: "gloss",
    price: 10.00
  },

  {
    id: "p05",
    name: "Lip Oil Raios de Sol",
    category: "gloss",
    price: 10.00
  },

  {
    id: "p06",
    name: "Demaquilante Aquatic Awe",
    category: "maquiagem",
    price: 10.00
  },

  {
    id: "p07",
    name: "Demaquilante Sunset Coral",
    category: "maquiagem",
    price: 10.00
  },

  {
    id: "p08",
    name: "Perfume Capilar Atração Fatal",
    category: "acessorio",
    price: 10.00
  },

  {
    id: "p09",
    name: "Perfume Capilar Desejo Secreto",
    category: "acessorio",
    price: 10.00
  },

  {
    id: "p10",
    name: "Delineador Líquido Super Poderes",
    category: "maquiagem",
    price: 10.00
  },

  {
    id: "p11",
    name: "Folhas Antioliosidade",
    category: "maquiagem",
    price: 10.00
  },

  {
    id: "p12",
    name: "Esfoliante Labial Honey Scrub Vivai",
    category: "maquiagem",
    price: 10.00
  },

  {
    id: "p13",
    name: "Pó Compacto Efeito Aveludado",
    category: "maquiagem",
    price: 10.00
  },

  {
    id: "p14",
    name: "Par de Cílios 6D",
    category: "acessorio",
    price: 10.00
  },

  {
    id: "p15",
    name: "Batom Bala Matte Lovely",
    category: "batom",
    price: 10.00
  },

  {
    id: "p16",
    name: "Pincel para Esfumar",
    category: "pincel",
    price: 10.00
  },

  {
    id: "p17",
    name: "Pincel para Corretivo Língua de Gato",
    category: "pincel",
    price: 10.00
  },

  {
    id: "p18",
    name: "Elástico para Cabelo",
    category: "acessorio",
    price: 5.00
  },

  {
    id: "p19",
    name: "Kit com 2 Esponjas para Pó",
    category: "acessorio",
    price: 5.00
  },

  {
    id: "p20",
    name: "Máscara Facial Peel Off Total Black",
    category: "maquiagem",
    price: 5.00
  },

  {
    id: "p21",
    name: "Hidratante Facial Rosa Mosqueta",
    category: "maquiagem",
    price: 5.00
  },

  {
    id: "p22",
    name: "Mini Batom Princesa",
    category: "batom",
    price: 5.00
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


/* =========================================================
   ESTADO
   ========================================================= */

const state = {
  filter: "todos",
  query: "",
  cart: []
};


/* =========================================================
   REFERÊNCIAS DO DOM
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

  cartItems: document.getElementById("cartItems"),
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

let toastTimer = null;

function showToast(message) {
  if (!elements.toast) return;

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

  elements.catGrid.innerHTML = FEATURED_CATEGORIES
    .map((category) => `
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
        ${getProductIcon(product.category)}
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
          ${isInCart ? "✓ Adicionado ao carrinho" : "Adicionar ao carrinho"}
        </button>

      </div>

    </article>
  `;
}


function getFilteredProducts() {
  const query = normalizeText(state.query);

  return PRODUCTS.filter((product) => {
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

  elements.productGrid.innerHTML = products
    .map(createProductCard)
    .join("");

  if (elements.emptyState) {
    elements.emptyState.hidden = products.length !== 0;
  }

  updateFilterLabel(products.length);
}


/* =========================================================
   OFERTAS
   ========================================================= */

/*
   Como você passou apenas os preços atuais e não informou
   preços antigos, não vamos inventar descontos.
   A seção recebe alguns produtos como destaques.
*/

function renderOffers() {
  if (!elements.offersGrid) return;

  const featuredProducts = PRODUCTS.slice(0, 6);

  elements.offersGrid.innerHTML = featuredProducts
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

  const productsSection = document.getElementById("produtos");

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
    .forEach((element) => {
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

  state.query = elements.searchInput
    ? elements.searchInput.value
    : "";

  renderProducts();

  const productsSection = document.getElementById("produtos");

  if (productsSection) {
    productsSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* =========================================================
   CARRINHO — ABRIR
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


/* =========================================================
   CARRINHO — FECHAR
   ========================================================= */

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


/* =========================================================
   CARRINHO — TOGGLE
   ========================================================= */

function toggleCart() {
  if (!elements.cartDrawer) return;

  if (elements.cartDrawer.hidden) {
    openCart();
  } else {
    closeCart();
  }
}


/* =========================================================
   ADICIONAR AO CARRINHO
   ========================================================= */

function addToCart(productId) {
  const product = PRODUCTS.find(
    item => item.id === productId
  );

  if (!product) return;

  const existingItem = state.cart.find(
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


/* =========================================================
   REMOVER DO CARRINHO
   ========================================================= */

function removeFromCart(productId) {
  state.cart = state.cart.filter(
    item => item.id !== productId
  );

  updateCartCount();
  renderCart();
  renderProducts();
  renderOffers();
}


/* =========================================================
   ALTERAR QUANTIDADE
   ========================================================= */

function changeQuantity(productId, amount) {
  const item = state.cart.find(
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


/* =========================================================
   CONTADOR DO CARRINHO
   ========================================================= */

function updateCartCount() {
  if (!elements.cartCount) return;

  const totalItems = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  elements.cartCount.textContent = totalItems;
}


/* =========================================================
   TOTAL DO CARRINHO
   ========================================================= */

function calculateCartSubtotal() {
  return state.cart.reduce((total, item) => {
    const product = PRODUCTS.find(
      productItem => productItem.id === item.id
    );

    if (!product) return total;

    return total + (
      product.price * item.quantity
    );
  }, 0);
}


/* =========================================================
   RENDERIZAÇÃO DO CARRINHO
   ========================================================= */

function renderCart() {
  if (!elements.cartItemsList) return;

  const hasItems = state.cart.length > 0;

  if (elements.cartEmptyMsg) {
    elements.cartEmptyMsg.hidden = hasItems;
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

  elements.cartItemsList.innerHTML = state.cart
    .map((item) => {
      const product = PRODUCTS.find(
        productItem => productItem.id === item.id
      );

      if (!product) return "";

      const itemTotal =
        product.price * item.quantity;

      return `
        <div class="cart-item">

          <div class="cart-item-media">
            ${getProductIcon(product.category)}
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

  const subtotal = calculateCartSubtotal();

  if (elements.cartSubtotal) {
    elements.cartSubtotal.textContent =
      formatBRL(subtotal);
  }

  if (elements.cartFooter) {
    elements.cartFooter.hidden = false;
  }

  updateCartCount();
}


/* =========================================================
   CHECKOUT
   ========================================================= */

function handleCheckout() {
  if (state.cart.length === 0) {
    showToast("Seu carrinho está vazio.");
    return;
  }

  showToast(
    "Finalização de compra disponível apenas na demonstração."
  );
}


/* =========================================================
   MENU MOBILE — ABRIR
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

  document.body.style.overflow = "hidden";
}


/* =========================================================
   MENU MOBILE — FECHAR
   ========================================================= */

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
    (!elements.cartDrawer || elements.cartDrawer.hidden)
  ) {
    document.body.style.overflow = "";
  }
}


/* =========================================================
   MENU MOBILE — TOGGLE
   ========================================================= */

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

  if (elements.userDropdown.hidden) {
    openUserDropdown();
  } else {
    closeUserDropdown();
  }
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


  /* ---------- Overlay mobile ---------- */

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
      toggleUserDropdown
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

  document.addEventListener("click", (event) => {

    const filterElement =
      event.target.closest("[data-filter]");

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


    const addButton =
      event.target.closest("[data-add-cart]");

    if (addButton) {
      const productId =
        addButton.dataset.addCart;

      addToCart(productId);
      return;
    }


    const removeButton =
      event.target.closest("[data-remove-cart]");

    if (removeButton) {
      const productId =
        removeButton.dataset.removeCart;

      removeFromCart(productId);
      return;
    }


    const minusButton =
      event.target.closest("[data-qty-minus]");

    if (minusButton) {
      const productId =
        minusButton.dataset.qtyMinus;

      changeQuantity(productId, -1);
      return;
    }


    const plusButton =
      event.target.closest("[data-qty-plus]");

    if (plusButton) {
      const productId =
        plusButton.dataset.qtyPlus;

      changeQuantity(productId, 1);
      return;
    }


    const closeDropdownButton =
      event.target.closest("[data-close-dropdown]");

    if (closeDropdownButton) {
      closeUserDropdown();
      return;
    }


    const closeCartLink =
      event.target.closest("[data-close-cart]");

    if (closeCartLink) {
      closeCart();
      return;
    }


    const placeholder =
      event.target.closest("[data-placeholder-link]");

    if (placeholder) {
      handlePlaceholderLink(event);
      return;
    }


    /* Fecha dropdown ao clicar fora */

    if (
      elements.userDropdown &&
      !elements.userDropdown.hidden &&
      !event.target.closest("#userDropdown") &&
      !event.target.closest("#userBtn")
    ) {
      closeUserDropdown();
    }

  });


  /* ---------- ESC fecha interfaces ---------- */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") return;

      closeCart();
      closeMobileMenu();
      closeUserDropdown();
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

function init() {
  renderCategoryCards();
  renderProducts();
  renderOffers();
  renderCart();

  updateCartCount();
  updateActiveFilters();
  updateCurrentYear();

  setupEvents();
}


if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    init
  );
} else {
  init();
}
