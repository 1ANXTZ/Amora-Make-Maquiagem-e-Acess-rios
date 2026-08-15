/* =========================================================
   AMORA MAKE — script.js
   Dados de produtos (mock), renderização, filtro/busca,
   menu mobile, dropdown e carrinho 100% frontend.
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
   PRODUTOS FICTÍCIOS
   ========================================================= */

const PRODUCTS = [
  {
    id: "p01",
    name: "Batom Amora Matte — Vinho Profundo",
    category: "batom",
    price: 39.9,
    oldPrice: 54.9,
    rating: 4.8,
    reviews: 128,
    badge: "Mais vendido"
  },

  {
    id: "p02",
    name: "Batom Líquido Amora Velvet",
    category: "batom",
    price: 44.9,
    oldPrice: null,
    rating: 4.6,
    reviews: 74
  },

  {
    id: "p03",
    name: "Gloss Amora Efeito Espelhado",
    category: "gloss",
    price: 29.9,
    oldPrice: 36.9,
    rating: 4.7,
    reviews: 96
  },

  {
    id: "p04",
    name: "Gloss Hidratante Amora Silvestre",
    category: "gloss",
    price: 27.5,
    oldPrice: null,
    rating: 4.4,
    reviews: 41
  },

  {
    id: "p05",
    name: "Base Líquida Amora Alta Cobertura",
    category: "base",
    price: 69.9,
    oldPrice: 84.9,
    rating: 4.9,
    reviews: 203,
    badge: "Favorito"
  },

  {
    id: "p06",
    name: "Base Fluída Amora Toque Seco",
    category: "base",
    price: 62.0,
    oldPrice: null,
    rating: 4.5,
    reviews: 58
  },

  {
    id: "p07",
    name: "Corretivo Amora Longa Duração",
    category: "corretivo",
    price: 34.9,
    oldPrice: 42.0,
    rating: 4.6,
    reviews: 87
  },

  {
    id: "p08",
    name: "Corretivo Amora Iluminador",
    category: "corretivo",
    price: 32.0,
    oldPrice: null,
    rating: 4.3,
    reviews: 29
  },

  {
    id: "p09",
    name: "Blush Compacto Amora Silvestre",
    category: "blush",
    price: 36.5,
    oldPrice: 45.0,
    rating: 4.7,
    reviews: 63
  },

  {
    id: "p10",
    name: "Blush Líquido Amora Natural",
    category: "blush",
    price: 39.0,
    oldPrice: null,
    rating: 4.5,
    reviews: 34
  },

  {
    id: "p11",
    name: "Máscara de Cílios Amora Volume+",
    category: "mascara",
    price: 42.9,
    oldPrice: 52.0,
    rating: 4.8,
    reviews: 152,
    badge: "Novo"
  },

  {
    id: "p12",
    name: "Máscara de Cílios Amora Curl Fix",
    category: "mascara",
    price: 40.0,
    oldPrice: null,
    rating: 4.4,
    reviews: 47
  },

  {
    id: "p13",
    name: "Paleta de Sombras Amora Sunset",
    category: "paleta",
    price: 89.9,
    oldPrice: 119.9,
    rating: 4.9,
    reviews: 176,
    badge: "Edição limitada"
  },

  {
    id: "p14",
    name: "Paleta de Sombras Amora Nude",
    category: "paleta",
    price: 79.9,
    oldPrice: null,
    rating: 4.6,
    reviews: 65
  },

  {
    id: "p15",
    name: "Kit Pincéis Amora Profissional (8 peças)",
    category: "pincel",
    price: 99.0,
    oldPrice: 139.0,
    rating: 4.9,
    reviews: 211,
    badge: "Mais vendido"
  },

  {
    id: "p16",
    name: "Pincel Amora para Base",
    category: "pincel",
    price: 24.9,
    oldPrice: null,
    rating: 4.5,
    reviews: 38
  },

  {
    id: "p17",
    name: "Necessaire Amora Veludo",
    category: "acessorio",
    price: 54.9,
    oldPrice: 69.9,
    rating: 4.7,
    reviews: 52
  },

  {
    id: "p18",
    name: "Espelho de Bolsa Amora",
    category: "acessorio",
    price: 19.9,
    oldPrice: null,
    rating: 4.3,
    reviews: 22
  },

  {
    id: "p19",
    name: "Esponja de Maquiagem Amora Duo",
    category: "acessorio",
    price: 22.9,
    oldPrice: 28.0,
    rating: 4.6,
    reviews: 44
  },

  {
    id: "p20",
    name: "Kit Maquiagem Amora Essencial",
    category: "maquiagem",
    price: 129.9,
    oldPrice: 169.9,
    rating: 4.9,
    reviews: 98,
    badge: "Novo"
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

const formatBRL = (value) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });


const discountPercent = (price, oldPrice) =>
  oldPrice
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : null;


function starString(rating) {
  const full = Math.round(rating);

  return (
    "★".repeat(full) +
    "☆".repeat(5 - full)
  );
}


/* =========================================================
   ESTADO DA APLICAÇÃO
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
  emptyState: document.getElementById("emptyState"),
  filterLabel: document.getElementById("filterLabel"),

  searchForm: document.getElementById("searchForm"),
  searchInput: document.getElementById("searchInput"),

  menuToggle: document.getElementById("menuToggle"),
  mobileMenu: document.getElementById("mobileMenu"),
  overlay: document.getElementById("overlay"),

  userBtn: document.getElementById("userBtn"),
  userDropdown: document.getElementById("userDropdown"),

  cartDrawer: document.getElementById("cartDrawer"),
  cartOverlay: document.getElementById("cartOverlay"),
  cartBtn: document.getElementById("cartBtn"),
  cartCloseBtn: document.getElementById("cartCloseBtn"),
  cartCount: document.getElementById("cartCount"),

  cartItems: document.getElementById("cartItems"),
  cartItemsList: document.getElementById("cartItemsList"),
  cartEmptyMsg: document.getElementById("cartEmptyMsg"),

  cartFooter: document.getElementById("cartFooter"),
  cartSubtotal: document.getElementById("cartSubtotal"),

  checkoutBtn: document.getElementById("checkoutBtn"),

  toast: document.getElementById("toast"),

  offersGrid: document.getElementById("offersGrid"),
  anoAtual: document.getElementById("anoAtual")
};


/* =========================================================
   CATEGORIAS EM DESTAQUE
   ========================================================= */

function renderCategoryCards() {
  if (!elements.catGrid) return;

  elements.catGrid.innerHTML = FEATURED_CATEGORIES
    .map((cat) => `
      <button
        type="button"
        class="cat-card"
        data-filter="${cat}"
      >
        <span class="cat-card-icon">
          ${ICONS[cat] || ICONS.maquiagem}
        </span>

        <span class="cat-card-name">
          ${CATEGORY_LABELS[cat]}
        </span>
      </button>
    `)
    .join("");

  elements.catGrid
    .querySelectorAll(".cat-card")
    .forEach((button) => {
      button.addEventListener("click", () => {
        applyFilter(button.dataset.filter);

        document
          .getElementById("produtos")
          ?.scrollIntoView({
            behavior: "smooth"
          });
      });
    });
}


/* =========================================================
   CARD DE PRODUTO
   ========================================================= */

function productCardHTML(product) {
  const discount = discountPercent(
    product.price,
    product.oldPrice
  );

  const icon =
    ICONS[product.category] ||
    ICONS.maquiagem;

  return `
    <article
      class="product-card"
      data-id="${product.id}"
    >

      <div class="product-media">

        ${
          product.badge
            ? `<span class="product-badge">${product.badge}</span>`
            : ""
        }

        ${icon}

      </div>

      <div class="product-body">

        <span class="product-category">
          ${CATEGORY_LABELS[product.category] || "Produto"}
        </span>

        <h3 class="product-name">
          ${product.name}
        </h3>

        <div class="product-rating">

          <span
            class="stars"
            aria-hidden="true"
          >
            ${starString(product.rating)}
          </span>

          <span>
            ${product.rating.toFixed(1)}
            (${product.reviews})
          </span>

        </div>

        <div class="product-price-row">

          <span class="product-price">
            ${formatBRL(product.price)}
          </span>

          ${
            product.oldPrice
              ? `
                <span class="product-price-old">
                  ${formatBRL(product.oldPrice)}
                </span>
              `
              : ""
          }

          ${
            discount
              ? `
                <span class="product-discount">
                  -${discount}%
                </span>
              `
              : ""
          }

        </div>

        <button
          type="button"
          class="product-add-btn"
          data-add="${product.id}"
        >

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 4h2l2.4 12.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          Adicionar ao carrinho

        </button>

      </div>

    </article>
  `;
}


/* =========================================================
   GRADE PRINCIPAL
   ========================================================= */

function renderProductGrid() {
  if (
    !elements.productGrid ||
    !elements.emptyState ||
    !elements.filterLabel
  ) {
    return;
  }

  let list = PRODUCTS;

  if (state.filter !== "todos") {
    list = list.filter(
      (product) =>
        product.category === state.filter
    );
  }

  const query = state.query.trim().toLowerCase();

  if (query) {
    list = list.filter((product) =>
      product.name
        .toLowerCase()
        .includes(query)
    );
  }

  if (query) {
    elements.filterLabel.textContent =
      `Resultados para "${state.query.trim()}" (${list.length})`;
  } else if (state.filter === "todos") {
    elements.filterLabel.textContent =
      `Mostrando todos os produtos (${list.length})`;
  } else {
    elements.filterLabel.textContent =
      `${CATEGORY_LABELS[state.filter]} (${list.length})`;
  }

  if (list.length === 0) {
    elements.productGrid.innerHTML = "";
    elements.emptyState.hidden = false;
    return;
  }

  elements.emptyState.hidden = true;

  elements.productGrid.innerHTML =
    list.map(productCardHTML).join("");

  attachAddButtons(
    elements.productGrid
  );
}


/* =========================================================
   OFERTAS
   ========================================================= */

function renderOffersGrid() {
  if (!elements.offersGrid) return;

  const offers = PRODUCTS
    .filter((product) => product.oldPrice)
    .slice(0, 4);

  elements.offersGrid.innerHTML =
    offers.map(productCardHTML).join("");

  attachAddButtons(
    elements.offersGrid
  );
}


/* =========================================================
   BOTÕES "ADICIONAR AO CARRINHO"
   ========================================================= */

function attachAddButtons(container) {
  if (!container) return;

  container
    .querySelectorAll("[data-add]")
    .forEach((button) => {

      button.addEventListener("click", () => {

        addToCart(button.dataset.add);

        const originalHTML =
          button.innerHTML;

        button.classList.add("added");
        button.innerHTML =
          "Adicionado ✓";

        setTimeout(() => {
          button.classList.remove("added");
          button.innerHTML =
            originalHTML;
        }, 1200);

      });

    });
}


/* =========================================================
   FILTROS
   ========================================================= */

function updateActiveFilters() {
  document
    .querySelectorAll(
      ".category-nav-list a, .mobile-menu a, .footer-col a[data-filter]"
    )
    .forEach((link) => {

      link.classList.toggle(
        "active",
        link.dataset.filter === state.filter
      );

    });
}


function applyFilter(category) {
  state.filter = category;
  state.query = "";

  if (elements.searchInput) {
    elements.searchInput.value = "";
  }

  updateActiveFilters();
  renderProductGrid();
}


/* =========================================================
   EVENTOS DOS LINKS DE CATEGORIA
   ========================================================= */

function setupFilterLinks() {
  document
    .querySelectorAll(
      ".category-nav-list a, .mobile-menu a, .footer-col a[data-filter]"
    )
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        event.preventDefault();

        applyFilter(
          link.dataset.filter
        );

        closeMobileMenu();

        document
          .getElementById("produtos")
          ?.scrollIntoView({
            behavior: "smooth"
          });

      });

    });
}


/* =========================================================
   BUSCA
   ========================================================= */

function setupSearch() {
  if (!elements.searchForm) return;

  elements.searchForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();

      state.query =
        elements.searchInput?.value || "";

      state.filter = "todos";

      updateActiveFilters();
      renderProductGrid();

      document
        .getElementById("produtos")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }
  );
}


/* =========================================================
   MENU MOBILE
   ========================================================= */

function openMobileMenu() {
  if (!elements.mobileMenu) return;

  elements.mobileMenu.hidden = false;

  if (elements.overlay) {
    elements.overlay.hidden = false;
  }

  elements.menuToggle?.setAttribute(
    "aria-expanded",
    "true"
  );
}


function closeMobileMenu() {
  if (!elements.mobileMenu) return;

  elements.mobileMenu.hidden = true;

  if (elements.overlay) {
    elements.overlay.hidden = true;
  }

  elements.menuToggle?.setAttribute(
    "aria-expanded",
    "false"
  );
}


function setupMobileMenu() {
  if (!elements.menuToggle) return;

  elements.menuToggle.addEventListener(
    "click",
    () => {

      if (elements.mobileMenu?.hidden) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }

    }
  );

  elements.overlay?.addEventListener(
    "click",
    closeMobileMenu
  );
}


/* =========================================================
   DROPDOWN DO USUÁRIO
   ========================================================= */

function closeUserDropdown() {
  if (!elements.userDropdown) return;

  elements.userDropdown.hidden = true;

  elements.userBtn?.setAttribute(
    "aria-expanded",
    "false"
  );
}


function setupUserDropdown() {
  if (
    !elements.userBtn ||
    !elements.userDropdown
  ) {
    return;
  }

  elements.userBtn.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      const willOpen =
        elements.userDropdown.hidden;

      elements.userDropdown.hidden =
        !willOpen;

      elements.userBtn.setAttribute(
        "aria-expanded",
        String(willOpen)
      );

    }
  );

  const closeButton =
    elements.userDropdown.querySelector(
      "[data-close-dropdown]"
    );

  closeButton?.addEventListener(
    "click",
    closeUserDropdown
  );

  document.addEventListener(
    "click",
    (event) => {

      if (
        !elements.userDropdown.hidden &&
        !elements.userDropdown.contains(
          event.target
        ) &&
        !elements.userBtn.contains(
          event.target
        )
      ) {
        closeUserDropdown();
      }

    }
  );
}


/* =========================================================
   CARRINHO — HELPERS
   ========================================================= */

function findProduct(id) {
  return PRODUCTS.find(
    (product) => product.id === id
  );
}


function cartTotalItems() {
  return state.cart.reduce(
    (sum, item) =>
      sum + item.qty,
    0
  );
}


function cartSubtotal() {
  return state.cart.reduce(
    (sum, item) => {

      const product =
        findProduct(item.id);

      return product
        ? sum +
            product.price *
              item.qty
        : sum;

    },
    0
  );
}


/* =========================================================
   ADICIONAR AO CARRINHO
   ========================================================= */

function addToCart(id) {
  const product = findProduct(id);

  if (!product) return;

  const existing =
    state.cart.find(
      (item) => item.id === id
    );

  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({
      id,
      qty: 1
    });
  }

  renderCart();

  showToast(
    "Produto adicionado ao carrinho ✓"
  );
}


/* =========================================================
   ALTERAR QUANTIDADE
   ========================================================= */

function updateQty(id, delta) {
  const item =
    state.cart.find(
      (cartItem) =>
        cartItem.id === id
    );

  if (!item) return;

  item.qty += delta;

  if (item.qty <= 0) {
    removeFromCart(id);
    return;
  }

  renderCart();
}


/* =========================================================
   REMOVER PRODUTO
   ========================================================= */

function removeFromCart(id) {
  state.cart =
    state.cart.filter(
      (item) =>
        item.id !== id
    );

  renderCart();
}


/* =========================================================
   RENDERIZAÇÃO DO CARRINHO
   ========================================================= */

function renderCart() {
  if (
    !elements.cartCount ||
    !elements.cartEmptyMsg ||
    !elements.cartFooter ||
    !elements.cartSubtotal ||
    !elements.cartItemsList
  ) {
    return;
  }

  elements.cartCount.textContent =
    cartTotalItems();

  /* Carrinho vazio */

  if (state.cart.length === 0) {

    elements.cartEmptyMsg.hidden =
      false;

    elements.cartFooter.hidden =
      true;

    elements.cartItemsList.innerHTML =
      "";

    return;
  }

  /* Carrinho com produtos */

  elements.cartEmptyMsg.hidden =
    true;

  elements.cartFooter.hidden =
    false;

  elements.cartItemsList.innerHTML =
    state.cart
      .map((item) => {

        const product =
          findProduct(item.id);

        if (!product) return "";

        const icon =
          ICONS[product.category] ||
          ICONS.maquiagem;

        return `
          <div
            class="cart-item"
            data-id="${product.id}"
          >

            <div class="cart-item-media">
              ${icon}
            </div>

            <div class="cart-item-info">

              <p class="cart-item-name">
                ${product.name}
              </p>

              <p class="cart-item-price">
                ${formatBRL(product.price)}
              </p>

              <div class="cart-item-qty">

                <button
                  type="button"
                  class="qty-btn"
                  data-qty="-1"
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>

                <span>
                  ${item.qty}
                </span>

                <button
                  type="button"
                  class="qty-btn"
                  data-qty="1"
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>

              </div>

            </div>

            <button
              type="button"
              class="cart-item-remove"
              data-remove
            >
              Remover
            </button>

          </div>
        `;

      })
      .join("");

  elements.cartSubtotal.textContent =
    formatBRL(
      cartSubtotal()
    );

  setupCartItemEvents();
}


/* =========================================================
   EVENTOS DOS ITENS DO CARRINHO
   ========================================================= */

function setupCartItemEvents() {
  if (!elements.cartItemsList) return;

  elements.cartItemsList
    .querySelectorAll(".cart-item")
    .forEach((itemElement) => {

      const id =
        itemElement.dataset.id;

      itemElement
        .querySelectorAll("[data-qty]")
        .forEach((button) => {

          button.addEventListener(
            "click",
            () => {

              updateQty(
                id,
                Number(
                  button.dataset.qty
                )
              );

            }
          );

        });

      itemElement
        .querySelector("[data-remove]")
        ?.addEventListener(
          "click",
          () => {
            removeFromCart(id);
          }
        );

    });
}


/* =========================================================
   ABRIR / FECHAR CARRINHO
   ========================================================= */

function openCart() {
  if (!elements.cartDrawer) return;

  elements.cartDrawer.hidden =
    false;

  if (elements.cartOverlay) {
    elements.cartOverlay.hidden =
      false;
  }

  elements.cartBtn?.setAttribute(
    "aria-expanded",
    "true"
  );
}


function closeCart() {
  if (!elements.cartDrawer) return;

  elements.cartDrawer.hidden =
    true;

  if (elements.cartOverlay) {
    elements.cartOverlay.hidden =
      true;
  }

  elements.cartBtn?.setAttribute(
    "aria-expanded",
    "false"
  );
}


/* =========================================================
   EVENTOS DO CARRINHO
   ========================================================= */

function setupCart() {
  elements.cartBtn?.addEventListener(
    "click",
    openCart
  );

  elements.cartCloseBtn?.addEventListener(
    "click",
    closeCart
  );

  elements.cartOverlay?.addEventListener(
    "click",
    closeCart
  );

  elements.cartItems?.addEventListener(
    "click",
    (event) => {

      const closeButton =
        event.target.closest(
          "[data-close-cart]"
        );

      if (closeButton) {
        closeCart();
      }

    }
  );

  elements.checkoutBtn?.addEventListener(
    "click",
    () => {

      showToast(
        "Esta é uma demonstração — pagamento ainda não implementado."
      );

    }
  );
}


/* =========================================================
   TECLA ESC
   ========================================================= */

function setupKeyboardControls() {
  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key !== "Escape") {
        return;
      }

      closeCart();
      closeMobileMenu();
      closeUserDropdown();

    }
  );
}


/* =========================================================
   LINKS PLACEHOLDER
   ========================================================= */

function setupPlaceholderLinks() {
  document
    .querySelectorAll(
      "[data-placeholder-link]"
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

          showToast(
            "Esta seção ainda está em desenvolvimento."
          );

        }
      );

    });
}


/* =========================================================
   TOAST
   ========================================================= */

let toastTimeout;


function showToast(message) {
  if (!elements.toast) return;

  elements.toast.textContent =
    message;

  elements.toast.hidden =
    false;

  requestAnimationFrame(() => {
    elements.toast.classList.add(
      "show"
    );
  });

  clearTimeout(
    toastTimeout
  );

  toastTimeout = setTimeout(
    () => {

      elements.toast.classList.remove(
        "show"
      );

      setTimeout(() => {

        elements.toast.hidden =
          true;

      }, 200);

    },
    2400
  );
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

function init() {

  if (elements.anoAtual) {
    elements.anoAtual.textContent =
      new Date().getFullYear();
  }

  renderCategoryCards();

  renderProductGrid();

  renderOffersGrid();

  renderCart();

  setupFilterLinks();

  setupSearch();

  setupMobileMenu();

  setupUserDropdown();

  setupCart();

  setupKeyboardControls();

  setupPlaceholderLinks();

  updateActiveFilters();
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
