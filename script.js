// Global State
let products = [];
let currentUser = JSON.parse(localStorage.getItem('lumiere_user')) || null;
let cart = loadCart();
let currentCategory = 'all';
let isSubscribed = false;


// Initialize the application
async function init() {
    interceptLinks();
    await fetchProducts();
    updateAuthUI();
    updateCartUI();
    setupForms();
    setupNewsletter();
    handleRoute(window.location.pathname);

    
    // Listen to browser navigation (back/forward)
    window.addEventListener('popstate', () => {
        handleRoute(window.location.pathname, false);
    });
}

// Fetch products from our new Node.js backend
async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        if(response.ok) {
            products = await response.json();
            renderFeaturedProducts();
            renderAllProducts(products);
        } else {
            console.warn("Backend not running, falling back to empty products.");
        }
    } catch(err) {
        console.warn("Backend not running, falling back to empty products.", err);
    }
}

// SPA Routing interceptor: Blocks default anchor behavior to maintain a smooth Single Page Application without reloading
function interceptLinks() {
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        if(link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
            e.preventDefault();
            const href = link.getAttribute('href');
            navigatePath(href);
        }
    });
}

function navigatePath(path) {
    history.pushState(null, '', path);
    handleRoute(path, false);
}

// Central Router Logic: Responsible for UI section toggling
// Iterates through all HTML sections, hiding them, and explicitly renders the requested view target
function handleRoute(path, push = true) {
    let pageId = 'home'; // default
    let param = null;
    
    if (path === '/' || path === '/home') pageId = 'home';
    else if (path === '/products') pageId = 'products';
    else if (path.startsWith('/product/')) {
        pageId = 'product-details';
        param = path.split('/')[2];
    }
    else if (path === '/cart') pageId = 'cart';
    else if (path === '/login') pageId = 'login';
    else if (path === '/about') pageId = 'about';
    else if (path === '/contact') pageId = 'contact';
    else if (['/faq', '/shipping', '/returns', '/track-order', '/sustainability', '/ingredients', '/best-sellers', '/new-arrivals', '/sets-gifts'].includes(path)) {
        pageId = 'text-page'; // generic content page
        param = path.substring(1);
    } else {
        pageId = 'home';
    }

    // Hide all sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Update nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        if(link.getAttribute('href') === path) link.classList.add('active');
        else link.classList.remove('active');
    });

    // Show target section
    const targetSection = document.getElementById(pageId);
    if(targetSection) {
        targetSection.classList.add('active');
        window.scrollTo(0, 0);
    }
    
    // Specific logic per page
    if (pageId === 'product-details' && param) {
        renderProductDetails(parseInt(param));
    }
    if (pageId === 'cart') {
        renderCartPage();
    }
    if (pageId === 'text-page' && param) {
        renderTextPage(param);
    }
}

function navigate(pageId, productId = null) {
    if(pageId === 'product-details') navigatePath(`/product/${productId}`);
    else navigatePath(`/${pageId === 'home' ? '' : pageId}`);
}

// UI Interaction: Toggles global dark mode theme
// Swaps the <body> class triggering CSS styling shifts, and dynamically updates the UI button icon
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-icon');
    if(document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Render product card HTML
function generateProductCardHTML(product) {
    const safeImageStr = product.image.startsWith('/') || product.image.startsWith('http') ? product.image : '/' + product.image;
    return `
        <div class="product-card" onclick="navigate('product-details', ${product.id})">
            <div class="product-img-wrapper">
                <img src="${encodeURI(safeImageStr)}" alt="${product.name}" loading="lazy">
                <div class="add-to-cart-overlay">
                    <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id})" style="width: 100%;">
                        Quick Add
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-meta">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <div class="product-rating">
                        <i class="fa-solid fa-star"></i>
                        <span>${product.rating}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render Featured Products (Home Page)
function renderFeaturedProducts() {
    const grid = document.getElementById('featured-grid');
    if(!grid) return;
    
    // Just show first 4 products
    const featured = products.slice(0, 4);
    grid.innerHTML = featured.map(p => generateProductCardHTML(p)).join('');
}

// Render All Products (Shop Page)
function renderAllProducts(productsToRender) {
    const grid = document.getElementById('all-products-grid');
    if(!grid) return;
    
    if(productsToRender.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding: 3rem;">No products found.</p>';
        return;
    }
    
    grid.innerHTML = productsToRender.map(p => generateProductCardHTML(p)).join('');
}

// Filter Products
function filterProducts(category) {
    currentCategory = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase().includes(category.toLowerCase()) || (category === 'all' && btn.innerText === 'All')) {
            btn.classList.add('active');
        }
    });
    
    applyFilters();
}

// Search Products
function searchProducts() {
    applyFilters();
}

// Apply both Filter and Search
function applyFilters() {
    const query = document.getElementById('search-input').value.toLowerCase();
    
    let filtered = products;
    
    if(currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }
    
    if(query) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
    }
    
    renderAllProducts(filtered);
}

// Render Product Details
function renderProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if(!product) return;
    
    const container = document.getElementById('product-detail-view');
    
    const safeImageStr = product.image.startsWith('/') || product.image.startsWith('http') ? product.image : '/' + product.image;
    container.innerHTML = `
        <div class="detail-image-gallery" style="position: relative;">
            <button class="detail-close-btn" onclick="history.back() || navigatePath('/products')">X</button>
            <img src="${encodeURI(safeImageStr)}" alt="${product.name}" class="detail-main-img">
        </div>
        <div class="detail-info">
            <div class="product-category" style="margin-bottom: 1rem;">${product.category} • Perfect for ${product.skinType} skin</div>
            <h1>${product.name}</h1>
            <div class="detail-meta">
                <div class="detail-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                    <span style="color: var(--text-secondary); margin-left: 0.5rem;">(${product.reviews} reviews)</span>
                </div>
            </div>
            
            <p class="detail-desc">${product.description}</p>
            
            <div class="detail-actions">
                <div class="quantity-selector">
                    <button class="qty-btn" onclick="updateDetailQty(-1)">-</button>
                    <input type="text" class="qty-input" id="detail-qty" value="1" readonly>
                    <button class="qty-btn" onclick="updateDetailQty(1)">+</button>
                </div>
                <button class="btn btn-primary" onclick="addDetailToCart(${product.id})" style="flex:1;">
                    Add to Bag
                </button>
            </div>
            
            <div class="accordion" style="margin-top: 3rem;">
                <div class="accordion-item">
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        <span>Key Ingredients</span>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <div class="accordion-content active">
                        <p>${product.ingredients}</p>
                    </div>
                </div>
                <div class="accordion-item">
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        <span>How to Use</span>
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <div class="accordion-content">
                        <p>Apply an appropriate amount evenly over skin, avoiding eye and lip areas. Pat gently to aid absorption.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Detail page quantity updater
function updateDetailQty(change) {
    const input = document.getElementById('detail-qty');
    let val = parseInt(input.value) + change;
    if(val < 1) val = 1;
    input.value = val;
}

// Add from detail page
function addDetailToCart(productId) {
    const qty = parseInt(document.getElementById('detail-qty').value);
    addToCart(productId, qty);
}

// Accordion Logic
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('i');
    
    // Close all others
    document.querySelectorAll('.accordion-content').forEach(c => {
        if(c !== content) c.classList.remove('active');
    });
    document.querySelectorAll('.accordion-header i').forEach(i => {
        if(i !== icon) { i.classList.remove('fa-minus'); i.classList.add('fa-plus'); }
    });
    
    if(content.classList.contains('active')) {
        content.classList.remove('active');
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
    } else {
        content.classList.add('active');
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
    }
}

// Save cart to persistence per user
function persistCart() {
    const cartsData = JSON.parse(localStorage.getItem('lumiere_carts_db')) || {};
    const key = currentUser ? currentUser.email : 'guest';
    cartsData[key] = cart;
    localStorage.setItem('lumiere_carts_db', JSON.stringify(cartsData));
}

// Load cart based on current session
function loadCart() {
    const cartsData = JSON.parse(localStorage.getItem('lumiere_carts_db')) || {};
    const key = currentUser ? currentUser.email : 'guest';
    return cartsData[key] || [];
}

// Ensure the local memory syncs cleanly switching logins
function syncCartState() {
    cart = loadCart();
    updateCartUI();
    renderCartPage(); 
}

// Authentication Logic
function updateAuthUI() {
    const authBtn = document.getElementById('nav-user-btn');
    if(!authBtn) return;
    
    if (currentUser) {
        // Render a proper CSS-styled logout button instead of a profile icon
        authBtn.innerHTML = `<button class="btn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; background: var(--bg-color); border: 1px solid var(--border-color); color: var(--text-color);">Logout</button>`;
        authBtn.removeAttribute('title');
        
        // Execute direct logical wipe immediately on click without ugly browser alerts
        authBtn.onclick = () => {
            currentUser = null;
            localStorage.removeItem('lumiere_user');
            localStorage.removeItem('lumiere_token');
            sessionStorage.clear();
            syncCartState(); 
            updateAuthUI();
            navigatePath('/');
            showToast('Securely logged out');
        };
    } else {
        authBtn.innerHTML = `<i class="fa-regular fa-user"></i>`;
        authBtn.setAttribute('title', 'Login');
        authBtn.onclick = () => navigatePath('/login');
    }
}

// Cart Functionality
function addToCart(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if(!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if(existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            ...product,
            quantity: qty
        });
    }
    
    persistCart();
    updateCartUI();
    showToast(`Added ${product.name} to cart`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    persistCart();
    updateCartUI();
    renderCartPage(); // Re-render if on cart page
}

function updateCartItemQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    if(item) {
        item.quantity += change;
        if(item.quantity < 1) {
            removeFromCart(productId);
            return;
        }
        persistCart();
        updateCartUI();
        renderCartPage(); // Re-render if on cart page
    }
}

function updateCartUI() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-badge').innerText = count;
}

// Delete existing placeholder file from index.html in our minds.
// Checkout handling with backend
async function processCheckout() {
    if(cart.length === 0) return alert('Your cart is empty');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;

    try {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItems: cart, totalAmount: total })
        });
        const data = await res.json();
        if(data.success) {
            showToast(data.message);
            cart = [];
            updateCartUI();
            navigate('home');
        }
    } catch(e) {
        showToast("Error processing order. Is backend running?");
    }
}

// Toggle Auth Views
function toggleAuthView() {
    document.getElementById('login-form-view').classList.toggle('active-auth-view');
    document.getElementById('signup-form-view').classList.toggle('active-auth-view');
    
    // Clear dynamic error states upon swap
    const loginError = document.getElementById('login-error');
    if(loginError) loginError.innerText = '';
    const signupError = document.getElementById('signup-error');
    if(signupError) signupError.innerText = '';
    
    const signupFormView = document.getElementById('signup-form-view');
    if (signupFormView.classList.contains('active-auth-view')) {
        signupFormView.style.display = 'block';
        document.getElementById('login-form-view').style.display = 'none';
    } else {
        document.getElementById('login-form-view').style.display = 'block';
        signupFormView.style.display = 'none';
    }
}

function validatePassword(password) {
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        return false;
    }
    return true;
}

function togglePasswordVisibility(inputId, toggleIcon) {
    const input = document.getElementById(inputId);
    const icon = toggleIcon.querySelector('i');
    
    if (input && icon) {
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }
}

function updateRuleFeedback(prefix, val) {
    const lenRule = document.getElementById(`${prefix}-rule-length`);
    const upRule = document.getElementById(`${prefix}-rule-upper`);
    const numRule = document.getElementById(`${prefix}-rule-number`);
    
    if(lenRule) {
        const pass = val.length >= 6;
        lenRule.innerHTML = pass ? '✔ At least 6 characters' : '• At least 6 characters';
        lenRule.style.color = pass ? '#10b981' : '#666';
    }
    if(upRule) {
        const pass = /[A-Z]/.test(val);
        upRule.innerHTML = pass ? '✔ At least 1 uppercase letter (A-Z)' : '• At least 1 uppercase letter (A-Z)';
        upRule.style.color = pass ? '#10b981' : '#666';
    }
    if(numRule) {
        const pass = /[0-9]/.test(val);
        numRule.innerHTML = pass ? '✔ At least 1 number (0-9)' : '• At least 1 number (0-9)';
        numRule.style.color = pass ? '#10b981' : '#666';
    }
}

// Setup active forms
function setupForms() {
    const loginForm = document.getElementById('login-form');
    if(loginForm) {
        // Real-time UI validation feedback
        const loginPass = document.getElementById('login-password');
        const loginErrDiv = document.getElementById('login-error');
        if (loginPass) {
            loginPass.addEventListener('input', (e) => {
                updateRuleFeedback('login', e.target.value);
                loginErrDiv.innerText = ''; // Clear redundant error message since UI is guiding them
            });
        }

        loginForm.onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const errDiv = document.getElementById('login-error');
            errDiv.innerText = '';
            
            if (!validatePassword(password)) {
                errDiv.innerText = "Password must contain at least one uppercase letter, one number, and be at least 6 characters long";
                return;
            }

            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if(res.ok && data.token) {
                    currentUser = data.user;
                    localStorage.setItem('lumiere_user', JSON.stringify(currentUser));
                    localStorage.setItem('lumiere_token', data.token);
                    syncCartState(); // Load this user's cart
                    updateAuthUI();
                    showToast(data.message || 'Login Successful!');
                    navigatePath('/');
                } else {
                    errDiv.innerText = data.error || 'Authentication Failed';
                }
            } catch(e) {
                errDiv.innerText = 'Connection error. Is the backend running?';
            }
        };
    }

    const signupForm = document.getElementById('signup-form');
    if(signupForm) {
        // Real-time UI validation feedback
        const signupPass = document.getElementById('signup-password');
        const signupErrDiv = document.getElementById('signup-error');
        const confirmPass = document.getElementById('confirm-password');
        const confirmMsg = document.getElementById('confirm-password-msg');

        const validateConfirmPassword = () => {
            if (confirmPass && signupPass && confirmPass.value) {
                confirmMsg.style.display = 'block';
                if (confirmPass.value === signupPass.value) {
                    confirmMsg.innerText = 'Passwords match';
                    confirmMsg.style.color = '#10b981';
                } else {
                    confirmMsg.innerText = 'Passwords do not match';
                    confirmMsg.style.color = '#ef4444';
                }
            } else if (confirmMsg) {
                confirmMsg.style.display = 'none';
            }
        };

        if (signupPass) {
            signupPass.addEventListener('input', (e) => {
                updateRuleFeedback('signup', e.target.value);
                signupErrDiv.innerText = ''; // Clear redundant error message since UI is guiding them
                validateConfirmPassword();
            });
        }

        if (confirmPass) {
            confirmPass.addEventListener('input', () => {
                signupErrDiv.innerText = ''; 
                validateConfirmPassword();
            });
        }

        signupForm.onsubmit = async (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = confirmPass ? confirmPass.value : '';
            const errDiv = document.getElementById('signup-error');
            errDiv.innerText = '';
            
            if (password !== confirmPassword) {
                errDiv.innerText = "Passwords do not match";
                return;
            }

            if (!validatePassword(password)) {
                errDiv.innerText = "Password must contain at least one uppercase letter, one number, and be at least 6 characters long";
                return;
            }
            
            try {
                const res = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                const data = await res.json();
                
                if(res.ok && data.token) {
                    showToast("Account created successfully!");
                    currentUser = data.user;
                    localStorage.setItem('lumiere_user', JSON.stringify(currentUser));
                    localStorage.setItem('lumiere_token', data.token);
                    syncCartState();
                    updateAuthUI();
                    navigatePath('/');
                } else {
                    errDiv.innerText = data.error || 'Signup failed';
                }
            } catch(e) {
                errDiv.innerText = 'Connection error. Is the backend running?';
            }
        };
    }
    
    // Google mock
    document.querySelectorAll('.google-btn').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            currentUser = { email: "user@google.com", name: "User" };
            localStorage.setItem('lumiere_user', JSON.stringify(currentUser));
            syncCartState(); // Switch to this user's cart
            updateAuthUI();
            showToast("Logged in with Google");
            navigatePath('/');
        };
    });
}

// Newsletter Setup
function setupNewsletter() {
    // Optional legacy event handler override if needed
}

function toggleSubscription() {
    isSubscribed = !isSubscribed;
    const toggleBtn = document.getElementById('toggle-subscribe-btn');
    const feedback = document.getElementById('newsletter-feedback');
    
    if (isSubscribed) {
        localStorage.setItem('lumiere_discount', 'WELCOME15');
        if (toggleBtn) {
            toggleBtn.innerText = 'Unsubscribe';
            toggleBtn.style.backgroundColor = '#ef4444'; // Red
        }
        if (feedback) {
            feedback.style.color = '#10b981';
            feedback.innerText = 'You got 15% off! Use code: WELCOME15 (Applied to cart)';
        }
        showToast('Subscribed successfully');
    } else {
        localStorage.removeItem('lumiere_discount');
        if (toggleBtn) {
            toggleBtn.innerText = 'Subscribe';
            toggleBtn.style.backgroundColor = '#10b981'; // Green
        }
        if (feedback) {
            feedback.innerText = '';
        }
        showToast('Unsubscribed successfully');
    }
    
    updateTotal();
}

function updateTotal() {
    // Re-rendering the cart page fully recalculates subtotal, discount, and total
    if (cart.length > 0) {
        renderCartPage();
    }
}

// Format page titles nicely
const titleMap = {
    'faq': 'Frequently Asked Questions',
    'shipping': 'Shipping Protocol',
    'returns': 'Return Policy',
    'track-order': 'Track Your Order',
    'sustainability': 'Our Sustainability',
    'ingredients': 'Ingredients Philosophy',
    'best-sellers': 'Our Best Sellers',
    'new-arrivals': 'New Arrivals',
    'sets-gifts': 'Sets & Gifts'
};

function renderTextPage(pageAlias) {
    const container = document.getElementById('text-page');
    const title = titleMap[pageAlias] || pageAlias.replace('-', ' ');
    
    container.innerHTML = `
        <div class="container" style="max-width: 800px; padding: 4rem 2rem;">
            <h1 style="font-size: 3rem; margin-bottom: 2rem; text-transform: capitalize;">${title}</h1>
            <p style="color: var(--text-secondary); font-size: 1.1rem; line-height: 1.8;">
                This section is currently under development. Here at Lumière, we value transparency and elegant experiences. 
                Please check back shortly as we curate this content perfectly for you.
            </p>
            <button class="btn btn-primary" style="margin-top:2rem;" onclick="navigatePath('/')">Return Home</button>
        </div>
    `;
}

// Render Cart Page
function renderCartPage() {
    const container = document.getElementById('cart-content');
    
    if(cart.length === 0) {
        container.innerHTML = `
            <div class="cart-items" style="grid-column: 1/-1;">
                <div class="empty-cart-msg">
                    <i class="fa-solid fa-bag-shopping" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
                    <h3>Your bag is empty</h3>
                    <p style="margin-top: 0.5rem; margin-bottom: 2rem;">Looks like you haven't added any products to your cart yet.</p>
                    <button class="btn btn-primary" onclick="navigatePath('/products')">Continue Shopping</button>
                </div>
            </div>
        `;
        return;
    }
    
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Check for newsletter discount
    let discountBlock = '';
    let discountAmount = 0;
    const hasDiscount = localStorage.getItem('lumiere_discount') === 'WELCOME15';
    
    if (hasDiscount) {
        discountAmount = subtotal * 0.15;
        subtotal = subtotal - discountAmount;
        discountBlock = `
            <div class="summary-row" style="color: #10b981; font-weight: 500;">
                <span>Discount (WELCOME15)</span>
                <span>-$${discountAmount.toFixed(2)}</span>
            </div>
        `;
    }
    
    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;
    
    container.innerHTML = `
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="product-category" style="margin-bottom: 0.5rem;">${item.category}</div>
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="quantity-selector">
                        <button class="qty-btn" onclick="updateCartItemQty(${item.id}, -1)">-</button>
                        <span class="qty-input" style="display:inline-block; line-height:30px;">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartItemQty(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove item">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `).join('')}
        </div>
        <div class="cart-summary">
            <h3 style="margin-bottom: 1.5rem;">Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span>$${(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toFixed(2)}</span>
            </div>
            ${discountBlock}
            <div class="summary-row">
                <span>Shipping</span>
                <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
            </div>
            ${shipping > 0 ? `<p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: -0.5rem; margin-bottom: 1rem;">Free shipping on orders over $50</p>` : ''}
            <div class="summary-total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="btn btn-primary checkout-btn" onclick="processCheckout()">
                Proceed to Checkout
            </button>
        </div>
    `;
}

// Toast Notifications
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Start app
document.addEventListener('DOMContentLoaded', init);
