// Product Data
const products = [
    {
        id: 1,
        name: "Sunflower Microgreens",
        description: "Crunchy and nutty, perfect for salads and sandwiches",
        price: 8.99,
        icon: "🌻"
    },
    {
        id: 2,
        name: "Pea Shoots",
        description: "Sweet and tender, rich in vitamins A, C, and folate",
        price: 7.99,
        icon: "🌱"
    },
    {
        id: 3,
        name: "Radish Microgreens",
        description: "Spicy kick with vibrant color, high in antioxidants",
        price: 6.99,
        icon: "🌶️"
    },
    {
        id: 4,
        name: "Broccoli Microgreens",
        description: "Mild flavor, packed with sulforaphane for health",
        price: 9.99,
        icon: "🥦"
    },
    {
        id: 5,
        name: "Kale Microgreens",
        description: "Nutrient powerhouse with earthy flavor",
        price: 8.49,
        icon: "🥬"
    },
    {
        id: 6,
        name: "Mixed Variety Pack",
        description: "A blend of our best sellers for variety",
        price: 12.99,
        icon: "🌿"
    }
];

// Cart Management
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupNavigation();
    setupMobileMenu();
    setupOrderForm();
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
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
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
        
        // Simulate order processing
        // In production, replace this with actual API calls to:
        // 1. Your backend server
        // 2. Stripe payment processing
        // 3. Order management system (e.g., ShipStation, OrderDesk)
        
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
    // Simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Order Data:', orderData);
            
            // In production, you would:
            // 1. Send order to your backend API
            // 2. Process payment with Stripe
            // 3. Create order in your order management system
            // 4. Send confirmation email
            
            // Example API call structure:
            /*
            fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
            */
            
            resolve({ success: true, orderId: 'ORD-' + Date.now() });
        }, 1500);
    });
}

// Show Message
function showMessage(message, type) {
    const messageDiv = document.getElementById('orderMessage');
    messageDiv.textContent = message;
    messageDiv.className = type;
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.className = '';
    }, 5000);
}

// Stripe Integration (Placeholder)
// To enable Stripe payments:
// 1. Sign up at stripe.com
// 2. Get your publishable key
// 3. Uncomment and configure the code below

/*
const stripe = Stripe('your_publishable_key_here');
let elements;

async function initializeStripe() {
    const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            amount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 100 
        })
    });
    
    const { clientSecret } = await response.json();
    elements = stripe.elements({ clientSecret });
    
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
}
*/
