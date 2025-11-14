// Size options with clamshell dimensions
const sizeOptions = {
    '2oz': { label: '2 oz', clamshell: '5×5×3"' },
    '8oz': { label: '8 oz', clamshell: '8×8×3.5"' },
    '1lb': { label: '1 lb', clamshell: '12×8×4"' }
};

// Product Data with multiple sizes
const products = [
    {
        id: 1,
        name: "Sunflower Microgreens",
        description: "Crunchy and nutty, perfect for salads and sandwiches",
        prices: {
            '2oz': 8.00,
            '8oz': 30.00,
            '1lb': 50.00
        },
        icon: "🌻"
    },
    {
        id: 2,
        name: "Pea Shoots",
        description: "Sweet and tender, rich in vitamins A, C, and folate",
        prices: {
            '2oz': 8.00,
            '8oz': 30.00,
            '1lb': 50.00
        },
        icon: "🌱"
    },
    {
        id: 3,
        name: "Radish Microgreens",
        description: "Spicy kick with vibrant color, high in antioxidants",
        prices: {
            '2oz': 10.00,
            '8oz': 35.00,
            '1lb': 60.00
        },
        icon: "🫜"
    },
    {
        id: 4,
        name: "Broccoli Microgreens",
        description: "Mild flavor, packed with sulforaphane for health",
        prices: {
            '2oz': 12.00,
            '8oz': 40.00,
            '1lb': 70.00
        },
        icon: "🥦"
    },
    {
        id: 5,
        name: "Kale Microgreens",
        description: "Nutrient powerhouse with earthy flavor",
        prices: {
            '2oz': 12.00,
            '8oz': 40.00,
            '1lb': 70.00
        },
        icon: "🥬"
    },
    {
        id: 6,
        name: "Mixed Variety Pack",
        description: "A blend of our best sellers for variety",
        prices: {
            '2oz': 12.00,
            '8oz': 45.00,
            '1lb': 75.00
        },
        icon: "🌿"
    }
];

// Cart Management
let cart = [];

// Background Images for Hero Section
const heroBackgrounds = [
    'https://raw.githubusercontent.com/bellevueurbanfarms/microgreens/main/1.jpg',
    'https://raw.githubusercontent.com/bellevueurbanfarms/microgreens/main/2.jpg',
    'https://raw.githubusercontent.com/bellevueurbanfarms/microgreens/main/3.jpg',
    'https://raw.githubusercontent.com/bellevueurbanfarms/microgreens/main/4.jpg',
    'https://raw.githubusercontent.com/bellevueurbanfarms/microgreens/main/5.jpg',
    'https://raw.githubusercontent.com/bellevueurbanfarms/microgreens/main/6.jpg'
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupNavigation();
    setupMobileMenu();
    setupOrderForm();
    initBackgroundRotation();
});

// Load Products
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.icon}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                
                <div class="size-selector">
                    <label>Select Size:</label>
                    <select id="size-${product.id}" onchange="updatePrice(${product.id})">
                        <option value="2oz">2 oz</option>
                        <option value="8oz">8 oz</option>
                        <option value="1lb">1 lb</option>
                    </select>
                </div>
                
                <div class="product-price" id="price-${product.id}">$${product.prices['2oz'].toFixed(2)}</div>
                <div class="clamshell-info" id="clamshell-${product.id}">Clamshell size: ${sizeOptions['2oz'].clamshell}</div>
                
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Update price when size changes
function updatePrice(productId) {
    const product = products.find(p => p.id === productId);
    const sizeSelect = document.getElementById(`size-${productId}`);
    const selectedSize = sizeSelect.value;
    const priceElement = document.getElementById(`price-${productId}`);
    const clamshellElement = document.getElementById(`clamshell-${productId}`);
    
    priceElement.textContent = `$${product.prices[selectedSize].toFixed(2)}`;
    clamshellElement.textContent = `Clamshell size: ${sizeOptions[selectedSize].clamshell}`;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const sizeSelect = document.getElementById(`size-${productId}`);
    const selectedSize = sizeSelect.value;
    const price = product.prices[selectedSize];
    
    const cartItemKey = `${productId}-${selectedSize}`;
    const existingItem = cart.find(item => item.cartKey === cartItemKey);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            cartKey: cartItemKey,
            id: productId,
            name: product.name,
            size: selectedSize,
            sizeLabel: sizeOptions[selectedSize].label,
            clamshell: sizeOptions[selectedSize].clamshell,
            price: price,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Scroll to order section
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// Update Cart Display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>${item.sizeLabel} (${item.clamshell})</small><br>
                    <small>Qty: ${item.quantity} × $${item.price.toFixed(2)}</small>
                </div>
                <div>$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    cartTotal.textContent = total.toFixed(2);
}

// Smooth Scrolling Navigation
function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    toggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Order Form Setup
function setupOrderForm() {
    const form = document.getElementById('orderForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (cart.length === 0) {
            showMessage('Please add items to your cart before ordering', 'error');
            return;
        }
        
        const submitButton = document.getElementById('submitButton');
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';
        
        // Collect form data
        const orderData = {
            customer: {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                address: document.getElementById('address').value,
                notes: document.getElementById('notes').value
            },
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
        
        try {
            await processOrder(orderData);
            showMessage('Order placed successfully! You will receive a confirmation email shortly.', 'success');
            cart = [];
            updateCart();
            form.reset();
        } catch (error) {
            showMessage('Error processing order. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Complete Order';
        }
    });
}

// Process Order (Mock Implementation)
async function processOrder(orderData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Order Data:', orderData);
            resolve({ success: true, orderId: 'ORD-' + Date.now() });
        }, 1500);
    });
}

// Show Message
function showMessage(message, type) {
    const messageDiv = document.getElementById('orderMessage');
    messageDiv.textContent = message;
    messageDiv.className = type;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.className = '';
    }, 5000);
}

// Background Rotation
function initBackgroundRotation() {
    const hero = document.querySelector('.hero');
    
    // Create background divs for all images
    heroBackgrounds.forEach((bgUrl, i) => {
        const bgDiv = document.createElement('div');
        bgDiv.className = 'hero-background';
        bgDiv.style.backgroundImage = `url('${bgUrl}')`;
        bgDiv.style.animationDelay = `${i * (20 / heroBackgrounds.length)}s`;
        bgDiv.style.animationDuration = '20s';
        hero.insertBefore(bgDiv, hero.firstChild);
    });
}
