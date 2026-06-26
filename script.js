// PRODUCTS WITH LEGIT WORKING IMAGE URLs
const products = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    category: "mens",
    price: 89.99,
    oldPrice: 149.99,
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Premium denim jacket, perfect for all seasons."
  },
  {
    id: 2,
    name: "Leather Crossbody Bag",
    category: "womens",
    price: 29.99,
    oldPrice: 99.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    description: "Genuine leather crossbody bag with adjustable strap."
  },
  {
    id: 3,
    name: "Wireless Headphones",
    category: "electronics",
    price: 79.99,
    oldPrice: 129.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "Noise-cancelling headphones with 30hr battery life."
  },
  {
    id: 4,
    name: "Minimalist Watch",
    category: "accessories",
    price: 129.99,
    oldPrice: 199.99,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    description: "Elegant minimalist watch with leather strap."
  },
  {
    id: 5,
    name: "Oversized Hoodie",
    category: "womens",
    price: 49.99,
    oldPrice: 79.99,
    image: "https://plus.unsplash.com/premium_photo-1673356302125-c77491af8735?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Comfortable oversized hoodie, 100% cotton."
  },
  {
    id: 6,
    name: "Smart Speaker",
    category: "electronics",
    price: 49.99,
    oldPrice: 89.99,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Voice-controlled smart speaker with premium sound."
  },
  {
    id: 7,
    name: "Sunglasses Set",
    category: "accessories",
    price: 34.99,
    oldPrice: 59.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    description: "UV400 protection sunglasses, 2-piece set."
  },
  {
    id: 8,
    name: "Running Shoes",
    category: "mens",
    price: 109.99,
    oldPrice: 169.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Lightweight running shoes with cushioned sole."
  }
];

// Cart
let cart = JSON.parse(localStorage.getItem('urban_cart')) || [];

// DOM Elements
const productsContainer = document.getElementById('products');
const cartList = document.getElementById('cartList');
const totalPriceSpan = document.getElementById('totalPrice');
const cartCountSpan = document.getElementById('cartCount');
const categorySelect = document.getElementById('category');
const sortSelect = document.getElementById('sort');
const resetBtn = document.getElementById('resetBtn');
const checkoutBtn = document.getElementById('checkout');
const toast = document.getElementById('toast');
const shopBtn = document.getElementById('shopBtn');

// Save cart
function saveCart() {
  localStorage.setItem('urban_cart', JSON.stringify(cart));
  updateCartUI();
}

// Show toast
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Add to cart
window.addToCart = function(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  showToast(`${product.name} added to cart!`);
};

// Update quantity
window.updateQuantity = function(id, change) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== id);
    }
    saveCart();
  }
};

// Remove from cart
window.removeFromCart = function(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  showToast('Item removed');
};

// Update cart UI
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountSpan.textContent = totalItems;
  
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalPriceSpan.textContent = totalPrice.toFixed(2);
  
  if (cart.length === 0) {
    cartList.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
  } else {
    cartList.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" class="cart-item-img" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-actions">
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
            <button onclick="removeFromCart(${item.id})">🗑</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// Filter and sort products
function getFilteredProducts() {
  let filtered = [...products];
  
  const category = categorySelect.value;
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }
  
  const sort = sortSelect.value;
  if (sort === 'low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'high') {
    filtered.sort((a, b) => b.price - a.price);
  }
  
  return filtered;
}

// Render products
function renderProducts() {
  const filtered = getFilteredProducts();
  
  productsContainer.innerHTML = filtered.map(product => `
    <div class="product">
      <img src="${product.image}" class="product-img" alt="${product.name}">
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <div class="product-title">${product.name}</div>
        <div class="product-price">
          $${product.price.toFixed(2)}
          <span class="old-price">$${product.oldPrice.toFixed(2)}</span>
        </div>
        <button class="add-btn" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
          <i class="fas fa-cart-plus"></i> Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}

// Reset filters
function resetFilters() {
  categorySelect.value = 'all';
  sortSelect.value = 'default';
  renderProducts();
}

// Checkout
function handleCheckout() {
  if (cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  alert(`🎉 Order Placed!\n\nTotal: $${total.toFixed(2)}\n\nThank you for shopping at URBAN!`);
  cart = [];
  saveCart();
}

// Scroll to products
function scrollToProducts() {
  document.querySelector('.filters').scrollIntoView({ behavior: 'smooth' });
}

// Event listeners
categorySelect.addEventListener('change', renderProducts);
sortSelect.addEventListener('change', renderProducts);
resetBtn.addEventListener('click', resetFilters);
checkoutBtn.addEventListener('click', handleCheckout);
shopBtn.addEventListener('click', scrollToProducts);

// Initialize
renderProducts();
updateCartUI();