document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init();

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Product data
    const products = [
        { 
            id: 1,
            name: "Agropol Negro", 
            images: [
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"
            ], 
            description: "Material versátil y duradero para aplicaciones agrícolas e industriales.",
            details: {
                material: "Polietileno de baja densidad",
                thickness: "100-200 micrones",
                width: "1-14 metros",
                color: "Negro",
                uvProtection: "Sí"
            },
            price: 100
        },
        { 
            id: 2,
            name: "Mediasombra", 
            images: [
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"
            ], 
            description: "Solución perfecta para el control de luz y temperatura en invernaderos y espacios exteriores.",
            details: {
                material: "Polietileno de alta densidad",
                shadePercentage: "35%, 50%, 65%, 80%",
                width: "1-4 metros",
                color: "Negro",
                uvStabilized: "Sí"
            },
            price: 150
        },
        // Add more products as needed
    ];

    // Populate product grid
    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white rounded-lg shadow-md p-6';
        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded">
            <h3 class="text-xl font-bold mb-2">${product.name}</h3>
            <p class="text-gray-600 mb-4">${product.description}</p>
            <button class="view-details bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300" data-id="${product.id}">Ver Detalles</button>
        `;
        productGrid.appendChild(productCard);
    });

    // Shopping cart functionality
    let cart = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const shoppingCart = document.getElementById('shopping-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeCart = document.getElementById('close-cart');
    const requestQuote = document.getElementById('request-quote');

    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'mb-2';
            li.innerHTML = `
                ${item.name} - $${item.price}
                <button class="remove-item ml-2 text-red-500" data-id="${item.id}">Eliminar</button>
            `;
            cartItems.appendChild(li);
            total += item.price;
        });
        cartTotal.textContent = `Total: $${total}`;
    }

    cartIcon.addEventListener('click', () => {
        shoppingCart.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        shoppingCart.classList.remove('active');
    });

    cartItems.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }
    });

    requestQuote.addEventListener('click', () => {
        // Implement quote request functionality here
        alert('Funcionalidad de solicitud de presupuesto no implementada');
    });

    // Product modal functionality
    const productModal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSlider = document.getElementById('modal-slider');
    const modalDescription = document.getElementById('modal-description');
    const modalDetails = document.getElementById('modal-details');
    const addToCartButton = document.getElementById('add-to-cart');
    const closeModal = document.getElementById('close-modal');
    let currentProduct = null;

    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            currentProduct = products.find(p => p.id === id);
            showProductModal(currentProduct);
        }
    });

    function showProductModal(product) {
        modalTitle.textContent = product.name;
        modalSlider.querySelector('.swiper-wrapper').innerHTML = product.images.map(image => `
            <div class="swiper-slide">
                <img src="${image}" alt="${product.name}" class="w-full h-64 object-cover">
            </div>
        `).join('');
        modalDescription.textContent = product.description;
        modalDetails.innerHTML = Object.entries(product.details).map(([key, value]) => `
            <p><strong>${key}:</strong> ${value}</p>
        `).join('');
        productModal.classList.add('active');

        // Initialize Swiper
        new Swiper('#modal-slider', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    closeModal.addEventListener('click', () => {
        productModal.classList.remove('active');
    });

    addToCartButton.addEventListener('click', () => {
        if (currentProduct) {
            cart.push(currentProduct);
            updateCart();
            productModal.classList.remove('active');
            shoppingCart.classList.add('active');
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Implement form submission logic here
        alert('Formulario enviado con éxito');
        contactForm.reset();
    });
});

