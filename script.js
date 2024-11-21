document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
    });

    // Sticky header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('bg-white', 'shadow-md');
        } else {
            header.classList.remove('bg-white', 'shadow-md');
        }
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
            description: "Material versátil y duradero para aplicaciones agrícolas e industriales. Ideal para protección de cultivos y almacenamiento.",
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
            description: "Solución perfecta para el control de luz y temperatura en invernaderos y espacios exteriores. Disponible en varios porcentajes de sombra.",
            details: {
                material: "Polietileno de alta densidad",
                shadePercentage: "35%, 50%, 65%, 80%",
                width: "1-4 metros",
                color: "Negro",
                uvStabilized: "Sí"
            },
            price: 150
        },
        { 
            id: 3,
            name: "Cubrecercos", 
            images: [
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"
            ], 
            description: "Solución estética y funcional para cercos y vallados. Ofrece privacidad y protección contra el viento.",
            details: {
                material: "Polietileno de alta densidad",
                height: "1-2 metros",
                length: "10-50 metros",
                color: "Verde, negro",
                uvResistant: "Sí"
            },
            price: 200
        },
        { 
            id: 4,
            name: "Malla de Seguridad", 
            images: [
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"
            ], 
            description: "Malla resistente para aplicaciones de seguridad en construcción y eventos. Proporciona protección y visibilidad.",
            details: {
                material: "Polietileno de alta densidad",
                meshSize: "5x5 mm",
                width: "1-2 metros",
                color: "Naranja, amarillo",
                durability: "Alta resistencia a la tracción"
            },
            price: 180
        },
        { 
            id: 5,
            name: "Agrotileno cristal", 
            images: [
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"
            ], 
            description: "Film transparente de alta calidad para invernaderos y túneles. Maximiza la transmisión de luz para un crecimiento óptimo de las plantas.",
            details: {
                material: "Polietileno de baja densidad",
                thickness: "100-200 micrones",
                width: "2-12 metros",
                transparency: "85-90%",
                uvStabilized: "Sí"
            },
            price: 250
        },
        {
            id: 6,
            name: "Pellet Recuperado", 
            images: [
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"
            ], 
            description: "Material plástico reciclado para diversas aplicaciones industriales. Contribuye a la economía circular y la sostenibilidad.",
            details: {
                material: "Polietileno reciclado",
                form: "Pellets",
                color: "Variado",
                applications: "Moldeo por inyección, extrusión",
                sustainability: "100% reciclado"
            },
            price: 80
        }
    ];

    // Populate product grid
    const productGrid = document.getElementById('product-grid');
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105';
        productCard.setAttribute('data-aos', 'fade-up');
        productCard.setAttribute('data-aos-delay', (index * 100).toString());
        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-bold text-xl mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-4">${product.description.substring(0, 100)}...</p>
                <button class="view-details bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Ver Detalles
                </button>
            </div>
        `;
        productGrid.appendChild(productCard);

        // Add click event listener to "Ver Detalles" button
        productCard.querySelector('.view-details').addEventListener('click', () => {
            showProductModal(product);
        });
    });

    // Product modal functionality
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSlider = document.getElementById('modal-slider');
    const modalDescription = document.getElementById('modal-description');
    const modalDetails = document.getElementById('modal-details');
    const modalClose = document.getElementById('modal-close');
    const addToCartButton = document.getElementById('add-to-cart');
    let currentProduct = null;
    let swiper = null;

    function showProductModal(product) {
        currentProduct = product;
        modalTitle.textContent = product.name;
        modalSlider.querySelector('.swiper-wrapper').innerHTML = product.images.map(image => `
            <div class="swiper-slide">
                <img src="${image}" alt="${product.name}" class="w-full h-64 object-cover rounded-lg">
            </div>
        `).join('');
        modalDescription.textContent = product.description;
        modalDetails.innerHTML = Object.entries(product.details).map(([key, value]) => `
            <p><strong>${key}:</strong> ${value}</p>
        `).join('');
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // Initialize or update Swiper
        if (swiper) {
            swiper.update();
        } else {
            swiper = new Swiper('#modal-slider', {
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
    }

    modalClose.addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });

    // Shopping cart functionality
    const cart = [];
    const cartElement = document.getElementById('shopping-cart');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const requestQuoteButton = document.getElementById('request-quote');
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const closeCart = document.getElementById('close-cart');

    function updateCart() {
        cartItems.innerHTML = cart.map(item => `
            <li class="mb-2 flex justify-between items-center">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="remove-item text-red-500 hover:text-red-700" data-id="${item.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </li>
        `).join('');
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        cartCount.textContent = cart.length;

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                removeFromCart(id);
            });
        });
    }

    function removeFromCart(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCart();
        }
    }

    addToCartButton.addEventListener('click', () => {
        if (currentProduct) {
            cart.push(currentProduct);
            updateCart();
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            cartElement.classList.remove('hidden');
            cartElement.classList.add('flex');
        }
    });

    cartIcon.addEventListener('click', () => {
        cartElement.classList.remove('hidden');
        cartElement.classList.add('flex');
    });

    closeCart.addEventListener('click', () => {
        cartElement.classList.add('hidden');
        cartElement.classList.remove('flex');
    });

    requestQuoteButton.addEventListener('click', () => {
        const phoneNumber = '1234567890'; // Replace with your actual WhatsApp number
        const message = encodeURIComponent(`Hola, me gustaría solicitar un presupuesto para los siguientes productos:

${cart.map(item => `- ${item.name}`).join('\n')}

Total: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        const formData = new FormData(contactForm);
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }
        
        alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
        contactForm.reset();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
