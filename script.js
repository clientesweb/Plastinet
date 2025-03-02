document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // DOM Elements
    const header = document.getElementById('main-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const cartIcon = document.getElementById('cart-icon');
    const shoppingCart = document.getElementById('shopping-cart');
    const closeCart = document.getElementById('close-cart');
    const productModal = document.getElementById('product-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const addToCartBtn = document.getElementById('add-to-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    const requestQuote = document.getElementById('request-quote');

    // Initialize Bootstrap modals
    const productModalInstance = new bootstrap.Modal(document.getElementById('product-modal'));
    const cartModalInstance = new bootstrap.Modal(document.getElementById('shopping-cart'));

    // Cart state
    let cart = [];
    let currentProduct = null;

    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 100);
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
        "Expertos en film y pellet de PEBD♻️",
        "Soluciones versátiles para el agro, la industria y la construcción"
    ];

    // Function to rotate messages
    function rotateMessages(messages, elementId, interval) {
        let index = 0;
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = messages[0]; // Set initial message
            setInterval(() => {
                index = (index + 1) % messages.length;
                element.textContent = messages[index];
            }, interval);
        }
    }

    // Start rotating messages
    rotateMessages(bannerMessages, 'banner-message', 3000);
    rotateMessages(heroTitles, 'hero-title', 4000);
    rotateMessages(heroSubtitles, 'hero-subtitle', 4000);

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.remove('d-none');
            mobileMenu.classList.add('d-block');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('d-block');
            mobileMenu.classList.add('d-none');
        });
    }

    // Close mobile menu when clicking on a link
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('d-block');
                mobileMenu.classList.add('d-none');
            });
        });
    }

    // Shopping cart toggle
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartModalInstance.show();
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', () => {
            cartModalInstance.hide();
        });
    }

    // Modal functionality
    function openModal(product) {
        currentProduct = product;
        document.getElementById('modal-title').textContent = product.name;
        document.getElementById('modal-description').textContent = product.description;
        
        // Clear existing slides
        const swiperWrapper = document.querySelector('#modal-slider .swiper-wrapper');
        swiperWrapper.innerHTML = '';

        // Add new slides
        product.images.forEach(image => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `<img src="${image}" alt="${product.name}" class="img-fluid">`;
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
                    clickable: true
                },
            });
        }

        // Show the modal
        productModalInstance.show();
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            productModalInstance.hide();
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            productModalInstance.hide();
        });
    }

    // Add to cart functionality
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            if (currentProduct) {
                addToCart(currentProduct);
                updateCartUI();
                productModalInstance.hide();
                
                // Show toast notification
                const toastContainer = document.createElement('div');
                toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
                toastContainer.style.zIndex = '1070';
                
                toastContainer.innerHTML = `
                    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header bg-success text-white">
                            <strong class="me-auto">Producto Agregado</strong>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div class="toast-body">
                            ${currentProduct.name} ha sido agregado al carrito.
                        </div>
                    </div>
                `;
                
                document.body.appendChild(toastContainer);
                
                setTimeout(() => {
                    toastContainer.remove();
                }, 3000);
            }
        });
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
    }

    function updateCartUI() {
        if (!cartItems) return;
        
        cartItems.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItems.innerHTML = '<li class="list-group-item text-center">Tu carrito está vacío</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.className = 'list-group-item d-flex justify-content-between align-items-center';
                li.innerHTML = `
                    <div>
                        <span class="fw-bold">${item.name}</span>
                        <span class="badge bg-primary rounded-pill ms-2">${item.quantity}</span>
                    </div>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                `;
                cartItems.appendChild(li);
                total += item.price * item.quantity;
            });
        }

        if (cartTotal) cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Request quote functionality
    if (requestQuote) {
        requestQuote.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('Agrega productos al carrito antes de solicitar un presupuesto.');
                return;
            }
            
            const message = encodeURIComponent(`Hola, me gustaría solicitar un presupuesto para los siguientes productos:\n\n${cart.map(item => `${item.name} x${item.quantity}`).join('\n')}\n\nTotal: $${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}`);
            window.open(`https://wa.me/5491156164121?text=${message}`, '_blank');
        });
    }

    // Fetch and display products
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const productGrid = document.getElementById('product-grid');
            if (!productGrid) return;
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-6 col-lg-4 mb-4';
                productCard.innerHTML = `
                    <div class="product-card">
                        <img src="${product.images[0]}" alt="${product.name}" class="img-fluid">
                        <div class="product-content">
                            <h3>${product.name}</h3>
                            <p>${product.description.substring(0, 100)}...</p>
                            <button class="btn btn-primary view-product">
                                Ver Detalles
                            </button>
                        </div>
                    </div>
                `;
                productGrid.appendChild(productCard);

                productCard.querySelector('.view-product').addEventListener('click', () => openModal(product));
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    // Instagram Reels Section
    const reelsData = [
        { id: 1, url: 'https://www.instagram.com/reel/C4vaW7XrBTw/embed' },
        { id: 2, url: 'https://www.instagram.com/reel/DBhQ4L_ykBj/embed' },
        { id: 3, url: 'https://www.instagram.com/reel/DBWefBZpM6n/embed' },
        { id: 4, url: 'https://www.instagram.com/reel/C_ba5NzyKDP/embed' },
        { id: 5, url: 'https://www.instagram.com/reel/C_IfDHQpod7/embed' }
    ];

    const reelsContainer = document.querySelector('.instagram-reels-slider .swiper-wrapper');
    if (reelsContainer) {
        reelsData.forEach(reel => {
            const slide = document.createElement('div');
            slide.className = 'swiper-slide';
            slide.innerHTML = `
                <div class="instagram-reel">
                    <iframe src="${reel.url}" width="270" height="480" frameborder="0" scrolling="no" allowtransparency="true"></iframe>
                </div>
            `;
            reelsContainer.appendChild(slide);
        });

        const swiper = new Swiper('.instagram-reels-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
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
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
            
            setTimeout(() => {
                // Create success alert
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success mt-3';
                alertDiv.innerHTML = '<i class="fas fa-check-circle me-2"></i> ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
                
                // Insert alert after form
                this.after(alertDiv);
                
                // Reset form
                this.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Remove alert after 5 seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 5000);
            }, 1500);
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('main-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});