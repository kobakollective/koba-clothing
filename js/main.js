// KOBA Main JavaScript

// Sample product data (replace with Shopify API calls)
const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: 'Midnight Silk Dress',
        price: 189.99,
        category: 'dresses',
        description: 'Elegant silk dress perfect for evening resort wear',
        image: '👗'
    },
    {
        id: 2,
        name: 'Gold Embroidered Top',
        price: 129.99,
        category: 'tops',
        description: 'Luxurious top with gold embroidery details',
        image: '✨'
    },
    {
        id: 3,
        name: 'Teal Beach Shorts',
        price: 89.99,
        category: 'bottoms',
        description: 'Comfortable resort shorts in teal blue',
        image: '🩳'
    },
    {
        id: 4,
        name: 'Gold Statement Necklace',
        price: 149.99,
        category: 'accessories',
        description: 'Bold gold necklace for statement looks',
        image: '💎'
    },
    {
        id: 5,
        name: 'Navy Evening Gown',
        price: 299.99,
        category: 'dresses',
        description: 'Premium evening gown for special occasions',
        image: '👑'
    },
    {
        id: 6,
        name: 'Starlight Blazer',
        price: 199.99,
        category: 'tops',
        description: 'Sophisticated blazer with teal accents',
        image: '🧥'
    },
];

// Shopping cart
let cart = [];

// DOM Elements
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');
const closeBtn = document.querySelector('.close');
const contactForm = document.querySelector('.contact-form');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(SAMPLE_PRODUCTS);
    setupEventListeners();
});

// Display products in grid
function displayProducts(products) {
    productGrid.innerHTML = '';
    
    if (products.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #d4af37;">No products found</p>';
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-description">${product.description}</div>
                <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Attach click handlers
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// Add product to cart
function addToCart(e) {
    const button = e.target;
    const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: parseFloat(button.dataset.price)
    };

    cart.push(product);
    console.log(`Added ${product.name} to cart`);
    updateCartDisplay();
    
    // Show feedback
    button.textContent = '✓ Added!';
    setTimeout(() => {
        button.textContent = 'Add to Cart';
    }, 1500);
}

// Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceSpan = document.getElementById('totalPrice');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="color: #d4af37; text-align: center;">Your cart is empty</p>';
        totalPriceSpan.textContent = '0.00';
        return;
    }

    let total = 0;
    let itemsHTML = '';

    cart.forEach((item, index) => {
        total += item.price;
        itemsHTML += `
            <div class="cart-item">
                <div>
                    <div style="color: #d4af37; font-weight: bold;">${item.name}</div>
                    <div style="color: #f5f5f5; font-size: 0.9rem;">$${item.price.toFixed(2)}</div>
                </div>
                <button onclick="removeFromCart(${index})" style="background: #2d6a7e; color: white; border: none; padding: 0.5rem 1rem; border-radius: 3px; cursor: pointer;">Remove</button>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = itemsHTML;
    totalPriceSpan.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Setup event listeners
function setupEventListeners() {
    // Search and filter
    searchInput.addEventListener('input', filterProducts);
    categorySelect.addEventListener('change', filterProducts);

    // Cart modal
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', handleCheckout);

    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

// Filter products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categorySelect.value;

    const filtered = SAMPLE_PRODUCTS.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
}

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // In a real implementation, this would redirect to Shopify checkout
    console.log('Proceeding to checkout with items:', cart);
    alert('Redirecting to secure checkout...\n\nNote: Integrate with Shopify API for real checkout functionality.');
    
    // This is where you would use the Shopify GraphQL mutation
    // to create a checkout and redirect to the checkout URL
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    console.log('Contact form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#cart') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});
