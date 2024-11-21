document.addEventListener('DOMContentLoaded', function() {
    AOS.init();

    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const cartIcon = document.getElementById('cart-icon');
    const shoppingCart = document.getElementById('shopping-cart');
    const closeCart = document.getElementById('close-cart');
    const productModal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const addToCartBtn = document.getElementById('add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const requestQuote = document.getElementById('request-quote');

    let cart = [];
    let currentProduct = null;

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Rotating messages for top banner
    const bannerMessages = [
        "Innovación y sustentabilidad en cada producto",
        "Soluciones plásticas de alta calidad para la industria argentina",
        "Más de 20 años liderando la industria plástica en Argentina",
        "Comprometidos con un futuro más sostenible"
    ];

    // Rotating messages for hero section
    const heroTitles = [
        "Líderes en Plásticos Industriales",
        "Innovación Sostenible en Plásticos",
        "Soluciones de Calidad para tu Industria",
        "Plastinet: Tu Socio en Plásticos Industriales"
    ];

    const heroSubtitles = [
        "Más de 20 años de experiencia en la industria plástica argentina",
        "Comprometidos con la innovación y la sustentabilidad",
        "Expertos en film y nylon de polietileno de baja densidad",
        "Soluciones versátiles para el agro, la industria y la construcción"
    ];

    // Function to rotate messages
    function rotateMessages(messages, elementId, interval) {
        let index = 0;
        const element = document.getElementById(elementId);
        setInterval(() => {
            element.textContent = messages[index];
            index = (index + 1) % messages.length;
        }, interval);
    }

    // Start rotating messages
    rotateMessages(bannerMessages, 'banner-message', 3000);
    rotateMessages(heroTitles, 'hero-title', 4000);
    rotateMessages(heroSubtitles, 'hero-subtitle', 4000);

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('bg-white', 'shadow-md');
        } else {
            header.classList.remove('bg-white', 'shadow-md');
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    // Close mobile menu when clicking on a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Shopping cart toggle
    cartIcon.addEventListener('click', () => {
        shoppingCart.style.display = 'flex';
    });

    closeCart.addEventListener('click', () => {
        shoppingCart.style.display = 'none';
    });

    // Modal functionality
    function openModal(product) {
        currentProduct = product;
        document.getElementById('modal-title').textContent = product.name;
        document.getElementById('modal-description').textContent = product.description;
        
        // Clear existing slides
        const swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = '';

        // Add new slides
        product.images.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `<img src="${image}" alt="${product.name}" class="w-full h-auto">`;
            swiperWrapper.appendChild(slide);
        });

        // Initialize or update Swiper
        if (window.productSwiper) {
            window.productSwiper.update();
        } else {
            window.productSwiper = new Swiper('#modal-slider', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        }

        productModal.style.display = 'flex';
    }

    modalClose.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    // Add to cart functionality
    addToCartBtn.addEventListener('click', () => {
        if (currentProduct) {
            addToCart(currentProduct);
            updateCartUI();
            productModal.style.display = 'none';
        }
    });

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
    }

    function updateCartUI() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'flex justify-between items-center mb-2';
            li.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Request quote functionality
    requestQuote.addEventListener('click', () => {
        const message = encodeURIComponent(`Hola, me gustaría solicitar un presupuesto para los siguientes productos:\n\n${cart.map(item => `${item.name} x${item.quantity}`).join('\n')}\n\nTotal: $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`);
        window.open(`https://wa.me/01159818168?text=${message}`, '_blank');
    });

    // Fetch and display products
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const productGrid = document.getElementById('product-grid');
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden';
                productCard.innerHTML = `
                    <img src="${product.images[0]}" alt="${product.name}" class="w-full h-48 object-cover">
                    <div class="p-4">
                        <h3 class="font-bold text-lg mb-2">${product.name}</h3>
                        <p class="text-gray-700 text-sm mb-4">${product.description.substring(0, 100)}...</p>
                        <button class="view-product bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            Ver Detalles
                        </button>
                    </div>
                `;
                productGrid.appendChild(productCard);

                productCard.querySelector('.view-product').addEventListener('click', () => openModal(product));
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    // Instagram Reels Section
    const reelsData = [
        { id: 1, url: 'https://www.instagram.com/reel/DB-P1BOv6uo/embed' },
        { id: 2, url: 'https://www.instagram.com/reel/DBhQ4L_ykBj/embed' },
        { id: 3, url: 'https://www.instagram.com/reel/DBWefBZpM6n/embed' },
        { id: 4, url: 'https://www.instagram.com/reel/C_ba5NzyKDP/embed' },
        { id: 5, url: 'https://www.instagram.com/reel/C_IfDHQpod7/embed' }
    ];

    const reelsContainer = document.querySelector('.instagram-reels-slider .swiper-wrapper');

    reelsData.forEach(reel => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <iframe src="${reel.url}" width="270" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
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