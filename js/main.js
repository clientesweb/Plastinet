/**
 * Plastinet - Main JavaScript
 * This file contains all the JavaScript functionality for the Plastinet website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: 'mobile'
    });

    // DOM Elements
    const header = document.getElementById('header');
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
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.style.display = 'block';
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.style.display = 'none';
        });
    }

    // Close mobile menu when clicking on a link
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
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
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                }
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
        
        // Save cart to localStorage
        localStorage.setItem('plastinet_cart', JSON.stringify(cart));
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
                    <div class="d-flex align-items-center">
                        <span class="me-3">$${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
                cartItems.appendChild(li);
                total += item.price * item.quantity;
                
                // Add event listener to remove button
                li.querySelector('.remove-item').addEventListener('click', function() {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    removeFromCart(itemId);
                });
            });
        }

        if (cartTotal) cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        if (cartCount) cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    function removeFromCart(itemId) {
        const index = cart.findIndex(item => item.id === itemId);
        if (index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            
            // Save cart to localStorage
            localStorage.setItem('plastinet_cart', JSON.stringify(cart));
            updateCartUI();
        }
    }
    
    // Load cart from localStorage
    function loadCart() {
        const savedCart = localStorage.getItem('plastinet_cart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartUI();
        }
    }
    
    // Call loadCart on page load
    loadCart();

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
            
            products.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-6 col-lg-4 mb-4';
                productCard.setAttribute('data-aos', 'fade-up');
                productCard.setAttribute('data-aos-delay', (index % 3) * 100);
                
                productCard.innerHTML = `
                    <div class="product-card">
                        <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                        <div class="product-card__content">
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
        .catch(error => {
            console.error('Error fetching products:', error);
            const productGrid = document.getElementById('product-grid');
            if (productGrid) {
                productGrid.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-danger">
                            <i class="fas fa-exclamation-triangle me-2"></i>
                            Error al cargar los productos. Por favor, intenta nuevamente más tarde.
                        </div>
                    </div>
                `;
            }
        });

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
                    <iframe src="${reel.url}" width="270" height="480" frameborder="0" scrolling="no" allowtransparency="true" loading="lazy"></iframe>
                </div>
            `;
            reelsContainer.appendChild(slide);
        });

        const instagramSwiper = new Swiper('.instagram-reels-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: '.instagram-reels-next',
                prevEl: '.instagram-reels-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true
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
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            }
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const formInputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            formInputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('is-invalid');
                    }
                }
            });
            
            if (!isValid) {
                return;
            }
            
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
        
        // Real-time validation
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
                
                // Email validation
                if (this.type === 'email' && this.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(this.value.trim())) {
                        this.classList.add('is-invalid');
                    }
                }
            });
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
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.getAttribute('src');
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Detect when elements enter viewport
    const observeElements = document.querySelectorAll('.feature-card, .promo-banner__image, .about__image, .product-card, .impact-banner__image');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observeElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        observeElements.forEach(element => {
            element.classList.add('animated');
        });
    }
});
