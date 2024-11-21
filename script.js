document.addEventListener('DOMContentLoaded', function() {
    AOS.init();

    // Preloader
    window.addEventListener('load', function() {
        document.getElementById('preloader').style.display = 'none';
    });

    // Header Scroll Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('py-2', window.scrollY > 50);
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    // Rotating Messages for Hero and Top Banner
    const heroTitles = [
        "Innovación en Plásticos Industriales",
        "Soluciones Sostenibles para tu Negocio",
        "Calidad y Durabilidad Garantizadas"
    ];

    const heroSubtitles = [
        "Transformando la industria con productos de vanguardia",
        "Comprometidos con el medio ambiente y tu éxito",
        "Expertos en plásticos para cada necesidad"
    ];

    const bannerMessages = [
        "¡Nuevos productos disponibles! Descubre nuestras últimas innovaciones",
        "Envío gratis en pedidos superiores a $10,000",
        "¡Ofertas especiales esta semana! No te las pierdas"
    ];

    function rotateMessages(elementId, messages) {
        let index = 0;
        const element = document.getElementById(elementId);
        setInterval(() => {
            element.textContent = messages[index];
            index = (index + 1) % messages.length;
        }, 5000);
    }

    rotateMessages('hero-title', heroTitles);
    rotateMessages('hero-subtitle', heroSubtitles);
    rotateMessages('banner-message', bannerMessages);

    // Product Data
    const products = [
        {
            id: 1,
            name: "Film de Polietileno",
            description: "Film de alta resistencia para embalaje y protección.",
            images: ["https://images.unsplash.com/photo-1611663806011-b37e6f7d0756?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"],
            price: 100
        },
        {
            id: 2,
            name: "Nylon Industrial",
            description: "Nylon de alta calidad para aplicaciones industriales.",
            images: ["https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1460&q=80", "https://images.unsplash.com/photo-1611663806015-b37e6f7d0757?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"],
            price: 150
        },
        {
            id: 3,
            name: "Agropol",
            description: "Película plástica especial para aplicaciones agrícolas.",
            images: ["https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80", "https://images.unsplash.com/photo-1595381598981-1b4409aa8484?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"],
            price: 200
        },
        {
            id: 4,
            name: "Mediasombra",
            description: "Tejido plástico para control de luz y temperatura.",
            images: ["https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80", "https://images.unsplash.com/photo-1606965882897-2aeef04b1a35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"],
            price: 180
        }
    ];

    // Populate Product Grid
    const productGrid = document.getElementById('product-grid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105';
        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${product.name}</h3>
                <p class="text-gray-600 mb-4">${product.description}</p>
                <button class="view-product bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300" data-id="${product.id}">
                    Ver Detalles
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Product Modal
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeModal = document.getElementById('close-modal');
    const addToCartBtn = document.getElementById('add-to-cart');
    let currentProduct = null;

    document.querySelectorAll('.view-product').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-id'));
            currentProduct = products.find(p => p.id === productId);
            modalTitle.textContent = currentProduct.name;
            modalDescription.textContent = currentProduct.description;
            
            // Clear previous slides
            const modalSlider = document.querySelector('#modal-slider .swiper-wrapper');
            modalSlider.innerHTML = '';
            
            // Add new slides
            currentProduct.images.forEach(image => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `<img src="${image}" alt="${currentProduct.name}" class="w-full h-64 object-cover">`;
                modalSlider.appendChild(slide);
            });
            
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
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    // Shopping Cart
    const cart = [];
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const shoppingCart = document.getElementById('shopping-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const closeCart = document.getElementById('close-cart');
    const checkout = document.getElementById('checkout');

    function updateCart() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        cartItems.innerHTML = cart.map(item => `
            <div class="flex justify-between items-center mb-2">
                <span>${item.name} x${item.quantity}</span>
                <span>$${item.price * item.quantity}</span>
            </div>
        `).join('');
        cartTotal.textContent = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }

    addToCartBtn.addEventListener('click', () => {
        const existingItem = cart.find(item => item.id === currentProduct.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({...currentProduct, quantity: 1});
        }
        updateCart();
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    cartIcon.addEventListener('click', () => {
        shoppingCart.style.display = 'block';
    });

    closeCart.addEventListener('click', () => {
        shoppingCart.style.display = 'none';
    });

    checkout.addEventListener('click', () => {
        alert('¡Gracias por tu compra!');
        cart.length = 0;
        updateCart();
        shoppingCart.style.display = 'none';
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        contactForm.reset();
    });

    // Instagram Reels Section
    const reelsData = [
        { id: 1, url: 'https://www.instagram.com/reel/CvDf8UfAhGu/' },
        { id: 2, url: 'https://www.instagram.com/reel/CvGIKQKAXFa/' },
        { id: 3, url: 'https://www.instagram.com/reel/CvIxEIyAEEG/' },
        { id: 4, url: 'https://www.instagram.com/reel/CvLbXjSAhVv/' },
        { id: 5, url: 'https://www.instagram.com/reel/CvOFmwGAjNH/' }
    ];

    const reelsContainer = document.querySelector('.instagram-reels-slider .swiper-wrapper');

    reelsData.forEach(reel => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <iframe src="${reel.url}embed" width="270" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
        `;
        reelsContainer.appendChild(slide);
    });

    new Swiper('.instagram-reels-slider', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: '.instagram-reels-next',
            prevEl: '.instagram-reels-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        },
    });
});