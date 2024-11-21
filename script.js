document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
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

    // Product categories and items
    const products = [
        { 
            name: "Agropol Negro", 
            images: [
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"
            ], 
            description: "Material versátil y duradero para aplicaciones agrícolas e industriales. Ideal para protección de cultivos y almacenamiento."
        },
        { 
            name: "Mediasombra", 
            images: [
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"
            ], 
            description: "Solución perfecta para el control de luz y temperatura en invernaderos y espacios exteriores. Disponible en varios porcentajes de sombra."
        },
        { 
            name: "Cubrecercos", 
            images: [
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"
            ], 
            description: "Solución estética y funcional para cercos y vallados. Ofrece privacidad y protección contra el viento."
        },
        { 
            name: "Malla de Seguridad", 
            images: [
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"
            ], 
            description: "Malla resistente para aplicaciones de seguridad en construcción y eventos. Proporciona protección y visibilidad."
        },
        { 
            name: "Agrotileno cristal", 
            images: [
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"
            ], 
            description: "Film transparente de alta calidad para invernaderos y túneles. Maximiza la transmisión de luz para un crecimiento óptimo de las plantas."
        },
        { 
            name: "Pellet Recuperado", 
            images: [
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg",
                "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"
            ], 
            description: "Material plástico reciclado para diversas aplicaciones industriales. Contribuye a la economía circular y la sostenibilidad."
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
                <button class="view-details bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
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
    const modalClose = document.getElementById('modal-close');

    function showProductModal(product) {
        modalTitle.textContent = product.name;
        modalSlider.innerHTML = product.images.map(image => `
            <img src="${image}" alt="${product.name}" class="w-64 h-48 object-cover rounded-lg shadow-md">
        `).join('');
        modalDescription.textContent = product.description;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
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
});