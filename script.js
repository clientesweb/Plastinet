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
                { name: "Agropol Negro", images: ["https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"], description: "Material versátil y duradero para aplicaciones industriales." },
                { name: "Mediasombra", images: ["https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"], description: "Ideal para protección solar en cultivos." }
            ]
        },
        {
            name: "Plásticos de Ingeniería",
            items: [
                { name: "Nylon", images: ["https://plastinet.com.ar/wp-content/uploads/2023/05/Plastinet-Industria-Argentina-1.jpg"], description: "Alta resistencia al desgaste y la abrasión." }
            ]
        }
    ];

    // Populate product categories
    const productsContainer = document.querySelector('#productos .flex');
    productCategories.forEach(category => {
        category.items.forEach(item => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer w-64';
            productCard.innerHTML = `
                <img src="${item.images[0]}" alt="${item.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h4 class="font-bold mb-2">${item.name}</h4>
                    <p class="text-sm text-gray-600">Click para más detalles</p>
                </div>
            `;
            productsContainer.appendChild(productCard);

            // Add click event listener to product card
            productCard.addEventListener('click', () => {
                showProductModal(item);
            });
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
        modalSlider.innerHTML = product.images.map(image => `<img src="${image}" alt="${product.name}" class="w-64 h-48 object-cover rounded">`).join('');
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

