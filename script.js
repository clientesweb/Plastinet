document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Product categories and items
    const productCategories = [
        {
            name: "Plásticos Industriales",
            items: [
                { name: "Polietileno de Alta Densidad", image: "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg", description: "Material versátil y duradero para aplicaciones industriales." },
                { name: "PVC Rígido", image: "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg", description: "Ideal para tuberías y perfiles de construcción." },
                { name: "Polipropileno", image: "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg", description: "Excelente resistencia química y mecánica." }
            ]
        },
        {
            name: "Plásticos de Ingeniería",
            items: [
                { name: "Nylon", image: "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg", description: "Alta resistencia al desgaste y la abrasión." },
                { name: "Acetal", image: "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg", description: "Excelente estabilidad dimensional y resistencia a la fatiga." },
                { name: "PTFE", image: "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg", description: "Bajo coeficiente de fricción y alta resistencia química." }
            ]
        },
        {
            name: "Plásticos Especiales",
            items: [
                { name: "PEEK", image: "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg", description: "Resistencia extrema a altas temperaturas y productos químicos." },
                { name: "PPS", image: "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg", description: "Excelente estabilidad dimensional y resistencia química." },
                { name: "PVDF", image: "https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg", description: "Alta pureza y resistencia a la radiación UV." }
            ]
        }
    ];

    // Populate product categories
    const productsContainer = document.querySelector('#productos .grid');
    productCategories.forEach(category => {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'space-y-4';
        categoryElement.innerHTML = `
            <h3 class="text-2xl font-bold">${category.name}</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                ${category.items.map(item => `
                    <div class="product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer">
                        <img src="${item.image}" alt="${item.name}" class="w-full h-48 object-cover">
                        <div class="p-4">
                            <h4 class="font-bold mb-2">${item.name}</h4>
                            <p class="text-sm text-gray-600">Click para más detalles</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        productsContainer.appendChild(categoryElement);

        // Add click event listeners to product cards
        const productCards = categoryElement.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                showProductModal(category.items[index]);
            });
        });
    });

    // Product modal functionality
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.getElementById('modal-close');

    function showProductModal(product) {
        modalTitle.textContent = product.name;
        modalImage.src = product.image;
        modalImage.alt = product.name;
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

