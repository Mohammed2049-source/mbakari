const products = [
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    category: 'Electronics',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviews: 234,
    badge: 'sale',
    emoji: '🎧',
    description: 'Premium wireless sound with deep bass, long battery life, and smart noise reduction built for focused work and travel.'
  },
  {
    id: 2,
    name: 'Smart Watch Pro Series X',
    category: 'Electronics',
    price: 449.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 189,
    badge: 'new',
    emoji: '⌚',
    description: 'Track health, productivity, and movement with an elegant smartwatch designed for everyday performance.'
  },
  {
    id: 3,
    name: 'Premium Leather Backpack',
    category: 'Fashion',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviews: 156,
    badge: 'sale',
    emoji: '🎒',
    description: 'Minimal, durable, and polished enough for work meetings, travel, and daily commutes.'
  },
  {
    id: 4,
    name: 'Ultra-Slim Laptop 15" M3',
    category: 'Electronics',
    price: 1299.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 312,
    badge: 'new',
    emoji: '💻',
    description: 'Lightweight design, sharp visuals, and all-day power for creators, remote workers, and modern professionals.'
  },
  {
    id: 5,
    name: 'Smart Home Hub Controller',
    category: 'Home & Living',
    price: 199.99,
    originalPrice: 279.99,
    rating: 4.6,
    reviews: 98,
    badge: 'sale',
    emoji: '🏠',
    description: 'Control lighting, climate, and security from one integrated, user-friendly home automation hub.'
  },
  {
    id: 6,
    name: 'Professional Camera Drone',
    category: 'Electronics',
    price: 899.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 145,
    badge: 'hot',
    emoji: '🚁',
    description: 'Capture cinematic visuals and explore new angles with a responsive drone designed for reliability.'
  },
  {
    id: 7,
    name: 'Ergonomic Office Chair Pro',
    category: 'Home & Living',
    price: 549.99,
    originalPrice: 699.99,
    rating: 4.7,
    reviews: 203,
    badge: 'sale',
    emoji: '🪑',
    description: 'Supportive posture design, smooth motion, and all-day comfort built for productive workspaces.'
  },
  {
    id: 8,
    name: 'Fitness Tracker Band Elite',
    category: 'Sports',
    price: 149.99,
    originalPrice: null,
    rating: 4.5,
    reviews: 267,
    badge: 'new',
    emoji: '💪',
    description: 'Stay on top of workouts, movement goals, and recovery with a sleek motion-friendly fitness tracker.'
  }
];

let cart = JSON.parse(localStorage.getItem('mbGlobalCart') || '[]');

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);

function saveCart() {
  localStorage.setItem('mbGlobalCart', JSON.stringify(cart));
}

function getActiveFilter() {
  return document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
}

function renderProductCard(product) {
  const filledStars = Math.round(product.rating);

  return `
    <article class="product-card">
      <span class="product-badge ${product.badge}">${product.badge === 'hot' ? 'Hot' : product.badge}</span>
      <button class="wishlist-btn" type="button" aria-label="Add to wishlist">
        <i class="fa-regular fa-heart"></i>
      </button>

      <div class="product-image">${product.emoji}</div>

      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3>${product.name}</h3>

        <div class="rating-row" aria-label="${product.rating} out of 5 stars">
          ${Array.from({ length: 5 }, (_, index) => `<i class="fa-solid fa-star ${index < filledStars ? 'filled' : ''}"></i>`).join('')}
          <span>(${product.reviews})</span>
        </div>

        <p>${product.description}</p>

        <div class="price-row">
          <strong>${formatCurrency(product.price)}</strong>
          ${product.originalPrice ? `<span>${formatCurrency(product.originalPrice)}</span>` : ''}
        </div>

        <div class="card-actions">
          <a class="secondary-link" href="product.html?id=${product.id}">View detail</a>
          <button class="add-to-cart-btn" type="button" onclick="addToCart(${product.id})">Add</button>
        </div>
      </div>
    </article>
  `;
}

function renderHomeProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = products.slice(0, 4).map(renderProductCard).join('');
}

function renderShopPage() {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;

  const activeFilter = getActiveFilter();
  const filteredProducts = activeFilter === 'all'
    ? products
    : products.filter(product => product.category === activeFilter);

  grid.innerHTML = filteredProducts.map(renderProductCard).join('');
}

function renderProductDetail() {
  const container = document.getElementById('productDetail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get('id') || 1);
  const product = products.find(item => item.id === productId) || products[0];
  const filledStars = Math.round(product.rating);

  container.innerHTML = `
    <div class="product-detail-layout">
      <div class="detail-gallery">
        <div class="detail-image">${product.emoji}</div>
        <div class="detail-gallery-grid">
          <div>${product.emoji}</div>
          <div>${product.category === 'Electronics' ? '📱' : product.category === 'Fashion' ? '🧥' : product.category === 'Home & Living' ? '🏡' : '🏋️'}</div>
          <div>${product.badge === 'new' ? '✨' : '🔥'}</div>
        </div>
      </div>

      <div class="detail-copy">
        <div class="kicker">${product.category}</div>
        <h1>${product.name}</h1>

        <div class="rating-row" aria-label="${product.rating} out of 5 stars">
          ${Array.from({ length: 5 }, (_, index) => `<i class="fa-solid fa-star ${index < filledStars ? 'filled' : ''}"></i>`).join('')}
          <span>(${product.reviews} reviews)</span>
        </div>

        <div class="detail-price-row">
          <strong>${formatCurrency(product.price)}</strong>
          ${product.originalPrice ? `<span>${formatCurrency(product.originalPrice)}</span>` : ''}
        </div>

        <p>${product.description}</p>

        <div class="detail-actions">
          <div class="qty-selector">
            <button class="qty-btn" type="button" aria-label="Decrease quantity" onclick="changeQtyFromDetail(-1)">−</button>
            <strong id="detailQty">1</strong>
            <button class="qty-btn" type="button" aria-label="Increase quantity" onclick="changeQtyFromDetail(1)">+</button>
          </div>

          <button class="add-to-cart-btn large" type="button" onclick="addToCart(${product.id})">Add to cart</button>
        </div>

        <div class="info-list">
          <div><i class="fa-solid fa-truck-fast"></i> Free express shipping on eligible orders</div>
          <div><i class="fa-solid fa-shield-halved"></i> Secure payment and easy returns</div>
          <div><i class="fa-solid fa-star"></i> Trusted by 50K+ customers</div>
        </div>
      </div>
    </div>
  `;
}

function changeQtyFromDetail(step) {
  const amountEl = document.getElementById('detailQty');
  if (!amountEl) return;

  const current = Number(amountEl.textContent) || 1;
  const next = Math.max(1, current + step);
  amountEl.textContent = next;
}

function getCartItemCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartItemCount = document.getElementById('cartItemCount');
  const cartTotal = document.getElementById('cartTotal');
  const cartItemsList = document.getElementById('cartItems');

  const itemCount = getCartItemCount();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartCount) cartCount.textContent = itemCount;
  if (cartItemCount) cartItemCount.textContent = itemCount;
  if (cartTotal) cartTotal.textContent = formatCurrency(total);

  if (!cartItemsList) return;

  if (!cart.length) {
    cartItemsList.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your cart is empty.</p>
      </div>
    `;
    return;
  }

  cartItemsList.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">${item.emoji}</div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <div class="price-row"><strong>${formatCurrency(item.price * item.quantity)}</strong></div>
        <div class="qty-controls">
          <button type="button" aria-label="Decrease quantity" onclick="changeQty(${item.id}, -1)">−</button>
          <span>${item.quantity}</span>
          <button type="button" aria-label="Increase quantity" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="remove-item" type="button" aria-label="Remove item" onclick="removeFromCart(${item.id})">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`${product.name} added to cart.`);
}

function changeQty(productId, step) {
  const item = cart.find(product => product.id === productId);
  if (!item) return;

  item.quantity += step;
  if (item.quantity <= 0) {
    cart = cart.filter(product => product.id !== productId);
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast('Item removed from cart.');
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.add('show');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

function openCart() {
  const overlay = document.getElementById('cartOverlay');
  const sidebar = document.getElementById('cartSidebar');
  if (!overlay || !sidebar) return;

  overlay.classList.add('active');
  sidebar.classList.add('active');
}

function closeCart() {
  const overlay = document.getElementById('cartOverlay');
  const sidebar = document.getElementById('cartSidebar');
  if (!overlay || !sidebar) return;

  overlay.classList.remove('active');
  sidebar.classList.remove('active');
}

function initHeader() {
  const header = document.getElementById('header');
  const scrollTopBtn = document.getElementById('scrollTop');
  const cartBtn = document.getElementById('cartBtn');
  const cartClose = document.getElementById('cartClose');
  const cartOverlay = document.getElementById('cartOverlay');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
  }

  window.addEventListener('scroll', () => {
    if (!header) return;

    if (window.scrollY > 80) {
      header.classList.add('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.add('visible');
    } else {
      header.classList.remove('scrolled');
      if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const end = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000);

  const updateTimer = () => {
    const diff = end - new Date();
    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  };

  updateTimer();
  setInterval(updateTimer, 1000);
}

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Thanks for subscribing!');
    form.reset();
  });
}

function initShopFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      renderShopPage();
    });
  });
}

function renderCheckout() {
  const container = document.getElementById('checkoutItems');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const shippingEl = document.getElementById('checkoutShipping');
  const totalEl = document.getElementById('checkoutTotal');
  if (!container || !subtotalEl || !shippingEl || !totalEl) return;

  if (!cart.length) {
    container.innerHTML = `
      <div class="empty-checkout">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Your cart is empty. Add products before checkout.</p>
      </div>
    `;
    subtotalEl.textContent = formatCurrency(0);
    shippingEl.textContent = formatCurrency(0);
    totalEl.textContent = formatCurrency(0);
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 18 : 0;
  const total = subtotal + shipping;

  container.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <div class="checkout-item-visual">${item.emoji}</div>
      <div class="checkout-item-copy">
        <h4>${item.name}</h4>
        <p>Qty: ${item.quantity}</p>
      </div>
      <strong>${formatCurrency(item.price * item.quantity)}</strong>
    </div>
  `).join('');

  subtotalEl.textContent = formatCurrency(subtotal);
  shippingEl.textContent = formatCurrency(shipping);
  totalEl.textContent = formatCurrency(total);
}

function initCheckoutForm() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!cart.length) {
      showToast('Your cart is empty.');
      return;
    }

    const successEl = document.getElementById('checkoutSuccess');
    if (successEl) {
      successEl.textContent = 'Order placed successfully! We will contact you shortly with shipping updates.';
      successEl.classList.add('visible');
    }

    cart = [];
    saveCart();
    updateCartUI();
    renderCheckout();
    form.reset();
    showToast('Order placed successfully!');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  renderHomeProducts();
  renderShopPage();
  renderProductDetail();
  renderCheckout();
  initNewsletter();
  initCheckoutForm();
  initShopFilters();
  initCountdown();
  updateCartUI();
});
