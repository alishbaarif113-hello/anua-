// ==========================================================
// ANUA SKINCARE — Application Logic & E-Commerce State Engine
// Support Email: alishbarif333@gmail.com
// ==========================================================

const SUPPORT_EMAIL = "alishbarif333@gmail.com";
const FREE_SHIPPING_THRESHOLD = 50.00;

// Application State
let cart = JSON.parse(localStorage.getItem("anua_cart")) || [
  { productId: "anua-gua-sha-cream", quantity: 1 },
  { productId: "anua-eye-patch", quantity: 1 }
];

let wishlist = JSON.parse(localStorage.getItem("anua_wishlist")) || [
  "anua-gua-sha-cream"
];

let appliedDiscount = { code: "", percentage: 0 };
let selectedShippingCost = 0.00;

// Init on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  renderHeroProducts();
  renderFreeGiftOffers();
  renderProductsGrid("ALL");
  renderComparisonTable();
  renderReviews();
  updateCartBadges();
  updateWishlistBadges();
  bindEventListeners();

  // If URL has #checkout, open checkout directly
  if (window.location.hash === "#checkout") {
    openCheckout();
  }
});

// Save to LocalStorage
function saveCart() {
  localStorage.setItem("anua_cart", JSON.stringify(cart));
  updateCartBadges();
  renderCartDrawer();
  if (isCheckoutActive()) {
    renderCheckoutSummary();
  }
}

function saveWishlist() {
  localStorage.setItem("anua_wishlist", JSON.stringify(wishlist));
  updateWishlistBadges();
}

// Badge Counters
function updateCartBadges() {
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll(".cart-count-badge").forEach(badge => {
    badge.textContent = totalQty;
  });
}

function updateWishlistBadges() {
  document.querySelectorAll(".wishlist-count-badge").forEach(badge => {
    badge.textContent = wishlist.length;
  });
}

// Render Hero Retinol Carousel Products (Reference Image 1)
function renderHeroProducts() {
  const container = document.getElementById("hero-products-slider");
  if (!container) return;

  const heroItems = ANUA_PRODUCTS.filter(p => p.featuredHero);
  container.innerHTML = heroItems.map(p => `
    <div class="mini-product-card" data-id="${p.id}">
      <div class="mini-card-badge">
        ${p.tags.map(t => `<span class="badge-tag tag-${p.badgeType}">${t}</span>`).join('')}
      </div>
      <div class="mini-card-img-wrapper" onclick="openQuickView('${p.id}')">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <h4 class="mini-card-title" onclick="openQuickView('${p.id}')">${p.name}</h4>
      <div class="mini-card-reviews">
        <span class="stars">★★★★★</span>
        <span>${p.reviewsCount} Reviews</span>
      </div>
      <div class="mini-card-bottom">
        <span class="mini-card-price">$${p.price.toFixed(2)}</span>
        <button class="mini-card-add-btn" onclick="addToCart('${p.id}', 1)" title="Add to bag">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 5v14M5 12h14"></path>
          </svg>
        </button>
      </div>
    </div>
  `).join('');
}

// Render Free Gift Offers Section (Reference Image 2)
function renderFreeGiftOffers() {
  const container = document.getElementById("free-gifts-grid");
  if (!container) return;

  const giftProducts = ANUA_PRODUCTS.filter(p => p.category === "VALUE SETS" || p.tags.includes("SPECIAL FREE GIFT"));
  container.innerHTML = giftProducts.slice(0, 5).map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="free-gift-circle">
        <span>SPECIAL</span>
        <strong>FREE</strong>
        <span>GIFT</span>
      </div>
      <div class="card-top-badges">
        ${p.tags.map(t => {
          let cls = 'tag-black';
          if (t.includes('SAVE')) cls = 'tag-gold';
          if (t.includes('CODE')) cls = 'tag-gold';
          if (t.includes('BEST')) cls = 'tag-black';
          return `<span class="badge-tag ${cls}">${t}</span>`;
        }).join('')}
      </div>
      <div class="product-img-box" onclick="openQuickView('${p.id}')">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <button class="quick-view-hover-btn" onclick="event.stopPropagation(); openQuickView('${p.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Quick View
        </button>
      </div>
      <div class="product-card-body">
        <span class="product-card-cat">${p.category}</span>
        <h3 class="product-card-title" onclick="openQuickView('${p.id}')">${p.name}</h3>
        <div class="product-card-reviews">
          <span class="stars">★★★★★</span>
          <span>${p.reviewsCount.toLocaleString()} Reviews</span>
        </div>
        <div class="product-card-bottom">
          <div class="price-container">
            <span class="current-price">$${p.price.toFixed(2)}</span>
            ${p.originalPrice ? `<span class="original-price">$${p.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="add-to-cart-action-btn" onclick="addToCart('${p.id}', 1)">
            Add
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Products Grid with Category Filtering
function renderProductsGrid(category = "ALL") {
  const container = document.getElementById("main-products-grid");
  if (!container) return;

  let filtered = ANUA_PRODUCTS;
  if (category === "BEST SELLERS") {
    filtered = ANUA_PRODUCTS.filter(p => p.isBestseller);
  } else if (category === "VIRAL PDRN") {
    filtered = ANUA_PRODUCTS.filter(p => p.category === "VIRAL PDRN");
  } else if (category === "VALUE SETS") {
    filtered = ANUA_PRODUCTS.filter(p => p.category === "VALUE SETS");
  } else if (category === "RETINOL COLLECTION") {
    filtered = ANUA_PRODUCTS.filter(p => p.category === "RETINOL COLLECTION");
  }

  container.innerHTML = filtered.map(p => `
    <div class="product-card" data-id="${p.id}">
      <div class="card-top-badges">
        ${p.tags.map(t => `<span class="badge-tag tag-${p.badgeType}">${t}</span>`).join('')}
      </div>
      <div class="product-img-box" onclick="openQuickView('${p.id}')">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <button class="quick-view-hover-btn" onclick="event.stopPropagation(); openQuickView('${p.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Quick View
        </button>
      </div>
      <div class="product-card-body">
        <span class="product-card-cat">${p.category}</span>
        <h3 class="product-card-title" onclick="openQuickView('${p.id}')">${p.name}</h3>
        <div class="product-card-reviews">
          <span class="stars">★★★★★</span>
          <span>${p.reviewsCount.toLocaleString()} Reviews</span>
        </div>
        <div class="product-card-bottom">
          <div class="price-container">
            <span class="current-price">$${p.price.toFixed(2)}</span>
            ${p.originalPrice ? `<span class="original-price">$${p.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="add-to-cart-action-btn" onclick="addToCart('${p.id}', 1)">
            Add
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Comparison Matrix
function renderComparisonTable() {
  const tbody = document.getElementById("comparison-table-body");
  if (!tbody) return;

  tbody.innerHTML = ANUA_COMPARISON_DATA.map(row => `
    <tr>
      <td style="font-weight: 700; color: #111827; background: #FAF9F6;">${row.attribute}</td>
      <td style="text-align: center;">${row.guaSha}</td>
      <td style="text-align: center;">${row.eyePatch}</td>
      <td style="text-align: center;">${row.glassSkin}</td>
      <td style="text-align: center;">${row.pdrnSet}</td>
      <td style="text-align: center;">${row.cleansingDuo}</td>
    </tr>
  `).join('');
}

// Render Customer Reviews
function renderReviews() {
  const container = document.getElementById("reviews-grid");
  if (!container) return;

  container.innerHTML = ANUA_REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-header">
        <span class="stars">★★★★★</span>
        <span class="review-verified">✓ Verified Buyer</span>
      </div>
      <h4 class="review-title">"${r.title}"</h4>
      <p class="review-content">${r.content}</p>
      <div class="review-footer">
        <strong>${r.author}</strong>
        <span>${r.product}</span>
      </div>
    </div>
  `).join('');
}

// Cart Drawer Operations
function toggleCart(forceOpen = null) {
  const overlay = document.getElementById("cart-drawer-overlay");
  if (!overlay) return;

  const shouldOpen = forceOpen !== null ? forceOpen : !overlay.classList.contains("active");
  if (shouldOpen) {
    overlay.classList.add("active");
    renderCartDrawer();
  } else {
    overlay.classList.remove("active");
  }
}

function addToCart(productId, qty = 1) {
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ productId, quantity: qty });
  }

  saveCart();
  const product = ANUA_PRODUCTS.find(p => p.id === productId);
  showToast(`Added ${product ? product.name : 'Item'} to Bag`);
  toggleCart(true);
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.productId === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  saveCart();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.productId !== productId);
  saveCart();
  showToast("Item removed from Bag");
}

function calculateCartSubtotal() {
  return cart.reduce((total, item) => {
    const product = ANUA_PRODUCTS.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

function renderCartDrawer() {
  const itemsContainer = document.getElementById("cart-items-list");
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="1.5" style="margin: 0 auto 12px;">
          <path d="M16 10a4 4 0 0 1-8 0"></path>
          <path d="M3.103 6.034h17.794"></path>
          <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"></path>
        </svg>
        <p style="font-weight: 600; color: #111827;">Your shopping bag is empty</p>
        <p style="font-size: 13px; margin-top: 4px;">Explore our viral Retinol & Glass Skin essentials.</p>
        <button class="support-action-btn" style="margin-top: 16px; width: 100%;" onclick="toggleCart(false)">Start Shopping</button>
      </div>
    `;
    updateCartTotals(0);
    return;
  }

  itemsContainer.innerHTML = cart.map(item => {
    const p = ANUA_PRODUCTS.find(prod => prod.id === item.productId);
    if (!p) return '';
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}" class="cart-item-thumb">
        <div class="cart-item-details">
          <h4 class="cart-item-name">${p.name}</h4>
          <span class="cart-item-price">$${p.price.toFixed(2)}</span>
          <div class="cart-qty-row">
            <div class="qty-stepper">
              <button class="qty-btn" onclick="updateCartQty('${p.id}', -1)">−</button>
              <span class="qty-number">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQty('${p.id}', 1)">+</button>
            </div>
            <button class="cart-item-remove-btn" onclick="removeFromCart('${p.id}')">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const subtotal = calculateCartSubtotal();
  updateCartTotals(subtotal);
  renderShippingProgress(subtotal);
}

function renderShippingProgress(subtotal) {
  const trackText = document.getElementById("shipping-progress-text");
  const trackFill = document.getElementById("shipping-progress-fill");
  if (!trackText || !trackFill) return;

  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    trackText.innerHTML = `<strong>Congratulations!</strong> You unlocked <strong>FREE Standard Shipping</strong>!`;
    trackFill.style.width = "100%";
    trackFill.style.background = "#15803D";
  } else {
    const remaining = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);
    const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    trackText.innerHTML = `Add <strong>$${remaining}</strong> more to unlock <strong>FREE Shipping</strong>!`;
    trackFill.style.width = `${pct}%`;
    trackFill.style.background = "#111111";
  }
}

function updateCartTotals(subtotal) {
  const subtotalEl = document.getElementById("cart-subtotal-val");
  const totalEl = document.getElementById("cart-total-val");
  const discountRow = document.getElementById("cart-discount-row");
  const discountVal = document.getElementById("cart-discount-val");

  let discountAmount = 0;
  if (appliedDiscount.percentage > 0) {
    discountAmount = (subtotal * appliedDiscount.percentage) / 100;
    if (discountRow) discountRow.style.display = "flex";
    if (discountVal) discountVal.textContent = `-$${discountAmount.toFixed(2)} (${appliedDiscount.code})`;
  } else {
    if (discountRow) discountRow.style.display = "none";
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;
}

// Promo Code Apply
function applyPromoCode(inputCode) {
  const code = (inputCode || "").trim().toUpperCase();
  if (code === "GLOW20") {
    appliedDiscount = { code: "GLOW20", percentage: 20 };
    showToast("Code GLOW20 applied! 20% discount granted.");
  } else if (code === "ANUA10") {
    appliedDiscount = { code: "ANUA10", percentage: 10 };
    showToast("Code ANUA10 applied! 10% discount granted.");
  } else if (code === "") {
    appliedDiscount = { code: "", percentage: 0 };
    showToast("Promo code cleared.");
  } else {
    showToast("Invalid discount code. Try GLOW20!");
    return;
  }

  saveCart();
  renderCartDrawer();
  if (isCheckoutActive()) {
    renderCheckoutSummary();
  }
}

// ==========================================================
// CHECKOUT PAGE LOGIC
// ==========================================================
function isCheckoutActive() {
  const checkoutView = document.getElementById("checkout-view");
  return checkoutView && checkoutView.classList.contains("active");
}

function openCheckout() {
  if (cart.length === 0) {
    showToast("Your bag is empty! Add products before checking out.");
    return;
  }

  toggleCart(false);
  document.getElementById("storefront-view").style.display = "none";
  const checkoutView = document.getElementById("checkout-view");
  checkoutView.classList.add("active");
  window.location.hash = "#checkout";
  window.scrollTo({ top: 0, behavior: "smooth" });

  renderCheckoutSummary();
}

function returnToStore() {
  const checkoutView = document.getElementById("checkout-view");
  checkoutView.classList.remove("active");
  document.getElementById("storefront-view").style.display = "block";
  history.pushState("", document.title, window.location.pathname + window.location.search);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setShippingMethod(cost, cardEl) {
  selectedShippingCost = cost;
  document.querySelectorAll(".shipping-method-card").forEach(c => c.classList.remove("selected"));
  if (cardEl) cardEl.classList.add("selected");
  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const listEl = document.getElementById("checkout-items-list");
  if (!listEl) return;

  listEl.innerHTML = cart.map(item => {
    const p = ANUA_PRODUCTS.find(prod => prod.id === item.productId);
    if (!p) return '';
    return `
      <div class="checkout-item-row">
        <div class="checkout-thumb-wrapper">
          <img src="${p.image}" alt="${p.name}">
          <span class="checkout-thumb-badge">${item.quantity}</span>
        </div>
        <div class="checkout-item-info">
          <h4 class="checkout-item-title">${p.name}</h4>
          <span style="font-size: 11px; color: #6B7280;">${p.volume}</span>
        </div>
        <span class="checkout-item-cost">$${(p.price * item.quantity).toFixed(2)}</span>
      </div>
    `;
  }).join('');

  const subtotal = calculateCartSubtotal();
  let discountAmount = 0;
  if (appliedDiscount.percentage > 0) {
    discountAmount = (subtotal * appliedDiscount.percentage) / 100;
  }

  // Determine shipping
  let shippingFinal = selectedShippingCost;
  if (subtotal >= FREE_SHIPPING_THRESHOLD && selectedShippingCost === 0.00) {
    shippingFinal = 0.00;
  }

  const tax = (subtotal - discountAmount) * 0.06; // 6% estimated sales tax
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFinal + tax);

  document.getElementById("summary-subtotal").textContent = `$${subtotal.toFixed(2)}`;
  
  const discountRow = document.getElementById("summary-discount-row");
  if (appliedDiscount.percentage > 0) {
    discountRow.style.display = "flex";
    document.getElementById("summary-discount-val").textContent = `-$${discountAmount.toFixed(2)} (${appliedDiscount.code})`;
  } else {
    discountRow.style.display = "none";
  }

  document.getElementById("summary-shipping").textContent = shippingFinal === 0 ? "FREE" : `$${shippingFinal.toFixed(2)}`;
  document.getElementById("summary-tax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("summary-total").textContent = `$${grandTotal.toFixed(2)}`;
}

// Checkout Form Submission
function handleCheckoutSubmit(e) {
  e.preventDefault();

  const email = document.getElementById("checkout-email").value.trim();
  const firstName = document.getElementById("checkout-first-name").value.trim();
  const lastName = document.getElementById("checkout-last-name").value.trim();
  const address = document.getElementById("checkout-address").value.trim();
  const city = document.getElementById("checkout-city").value.trim();
  const zip = document.getElementById("checkout-zip").value.trim();

  if (!email || !firstName || !lastName || !address || !city) {
    showToast("Please fill in all required shipping fields.");
    return;
  }

  // Generate unique order number
  const orderId = `ANUA-${Math.floor(100000 + Math.random() * 900000)}`;
  const subtotal = calculateCartSubtotal();
  let discountAmount = appliedDiscount.percentage > 0 ? (subtotal * appliedDiscount.percentage) / 100 : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount + selectedShippingCost + ((subtotal - discountAmount) * 0.06));

  // Render Confirmation Modal
  const orderModal = document.getElementById("order-confirmation-modal");
  document.getElementById("confirm-order-id").textContent = orderId;
  document.getElementById("confirm-customer-email").textContent = email;
  document.getElementById("confirm-shipping-address").textContent = `${firstName} ${lastName}, ${address}, ${city} ${zip}`;
  document.getElementById("confirm-order-total").textContent = `$${grandTotal.toFixed(2)}`;
  document.getElementById("confirm-support-email").textContent = SUPPORT_EMAIL;

  orderModal.classList.add("active");

  // Clear Cart
  cart = [];
  appliedDiscount = { code: "", percentage: 0 };
  saveCart();
}

function closeOrderConfirmation() {
  document.getElementById("order-confirmation-modal").classList.remove("active");
  returnToStore();
}

// Quick View Modal
function openQuickView(productId) {
  const p = ANUA_PRODUCTS.find(item => item.id === productId);
  if (!p) return;

  const modal = document.getElementById("quick-view-modal");
  const body = document.getElementById("quick-view-content");

  body.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.1fr; gap: 28px; align-items: start;">
      <div style="border-radius: var(--radius-lg); overflow: hidden; background: #F8F9FA; border: 1px solid var(--border-subtle);">
        <img src="${p.image}" alt="${p.name}" style="width: 100%; aspect-ratio: 1/1; object-fit: cover;">
      </div>
      <div>
        <div style="display: flex; gap: 6px; margin-bottom: 8px;">
          ${p.tags.map(t => `<span class="badge-tag tag-${p.badgeType}">${t}</span>`).join('')}
        </div>
        <h2 style="font-size: 22px; font-weight: 700; color: #111827; line-height: 1.3;">${p.name}</h2>
        <div style="display: flex; align-items: center; gap: 8px; margin: 8px 0 14px; font-size: 13px; color: #4B5563;">
          <span class="stars">★★★★★</span>
          <strong>${p.rating}</strong>
          <span>(${p.reviewsCount.toLocaleString()} Verified Reviews)</span>
        </div>
        <div class="price-container" style="margin-bottom: 16px;">
          <span class="current-price" style="font-size: 22px;">$${p.price.toFixed(2)}</span>
          ${p.originalPrice ? `<span class="original-price" style="font-size: 15px;">$${p.originalPrice.toFixed(2)}</span>` : ''}
          <span style="font-size: 12px; color: #15803D; font-weight: 700; background: #DCFCE7; padding: 2px 6px; border-radius: 4px;">In Stock</span>
        </div>
        <p style="font-size: 13.5px; color: #4B5563; line-height: 1.6; margin-bottom: 16px;">${p.description}</p>
        
        <div style="background: #F9FAFB; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px 14px; margin-bottom: 20px;">
          <strong style="font-size: 12px; text-transform: uppercase; color: #111827; display: block; margin-bottom: 4px;">Key Actives:</strong>
          <span style="font-size: 12.5px; color: #4B5563;">${p.ingredients}</span>
        </div>

        <button class="proceed-checkout-btn" style="margin-top: 0;" onclick="addToCart('${p.id}', 1); closeQuickView();">
          Add to Bag • $${p.price.toFixed(2)}
        </button>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function closeQuickView() {
  const modal = document.getElementById("quick-view-modal");
  if (modal) modal.classList.remove("active");
}

// Contact Modal
function openContactModal() {
  document.getElementById("contact-modal").classList.add("active");
}

function closeContactModal() {
  document.getElementById("contact-modal").classList.remove("active");
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const message = document.getElementById("contact-message").value;

  showToast(`Thank you ${name}! Your inquiry has been sent to ${SUPPORT_EMAIL}.`);
  closeContactModal();
  e.target.reset();
}

// Live Search Modal
function toggleSearchModal(forceOpen = null) {
  const modal = document.getElementById("search-modal");
  if (!modal) return;
  const active = forceOpen !== null ? forceOpen : !modal.classList.contains("active");
  if (active) {
    modal.classList.add("active");
    const input = document.getElementById("search-input");
    if (input) {
      input.focus();
      renderSearchResults(input.value);
    }
  } else {
    modal.classList.remove("active");
  }
}

function renderSearchResults(query = "") {
  const resultsContainer = document.getElementById("search-results-list");
  if (!resultsContainer) return;

  const q = query.trim().toLowerCase();
  const matches = ANUA_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) || 
    p.ingredients.toLowerCase().includes(q)
  );

  if (matches.length === 0) {
    resultsContainer.innerHTML = `<p style="padding: 20px; text-align: center; color: #6B7280;">No products found matching "${query}".</p>`;
    return;
  }

  resultsContainer.innerHTML = matches.map(p => `
    <div style="display: flex; align-items: center; gap: 14px; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); cursor: pointer;" onclick="toggleSearchModal(false); openQuickView('${p.id}')">
      <img src="${p.image}" alt="${p.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-subtle);">
      <div style="flex: 1;">
        <h4 style="font-size: 13.5px; font-weight: 600; color: #111827;">${p.name}</h4>
        <span style="font-size: 11px; color: #6B7280;">${p.category}</span>
      </div>
      <span style="font-size: 13.5px; font-weight: 700; color: #111827;">$${p.price.toFixed(2)}</span>
    </div>
  `).join('');
}

// Toast System
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toast-notice");
  if (!toast) return;

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E2C08D" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// Event Bindings
function bindEventListeners() {
  // Category tabs
  document.querySelectorAll(".category-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProductsGrid(btn.dataset.category);
    });
  });

  // Promo code apply in drawer
  const promoApplyBtn = document.getElementById("apply-promo-btn");
  if (promoApplyBtn) {
    promoApplyBtn.addEventListener("click", () => {
      const code = document.getElementById("promo-input-field").value;
      applyPromoCode(code);
    });
  }

  // Promo apply in checkout
  const checkoutPromoBtn = document.getElementById("checkout-apply-promo-btn");
  if (checkoutPromoBtn) {
    checkoutPromoBtn.addEventListener("click", () => {
      const code = document.getElementById("checkout-promo-input").value;
      applyPromoCode(code);
    });
  }

  // Live search input
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderSearchResults(e.target.value);
    });
  }
}
