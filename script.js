document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MOBILE RESPONSIVE DRAWER OVERLAY CONTROL ---
    const menuToggle = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const toggleIcon = menuToggle.querySelector('i');
            
            // Swap icon appearances based on drawer status
            if (navMenu.classList.contains('open')) {
                toggleIcon.className = "fa-solid fa-xmark";
            } else {
                toggleIcon.className = "fa-solid fa-bars";
            }
        });
    }

    // Dismiss drawer upon active menu selections
    const navigationLinks = document.querySelectorAll('.nav-links a');
    navigationLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                menuToggle.querySelector('i').className = "fa-solid fa-bars";
            }
        });
    });


    // --- 2. HERO SLIDER LOGIC & TRANSLATIONS ---
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    function activateSlide(index) {
        indicators.forEach(ind => ind.classList.remove('active'));
        slides.forEach(slide => slide.classList.remove('active'));

        indicators[index].classList.add('active');
        slides[index].classList.add('active');
        currentSlideIndex = index;
    }

    indicators.forEach((indicator, idx) => {
        indicator.addEventListener('click', () => activateSlide(idx));
    });

    // Carousel loop cycle intervals
    setInterval(() => {
        let nextIndex = (currentSlideIndex + 1) % indicators.length;
        activateSlide(nextIndex);
    }, 8000);


    // --- 3. ON-DEMAND LIVE FILTERING COMPONENT ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mediaCards = document.querySelectorAll('.media-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');

            const selection = btn.getAttribute('data-filter');

            mediaCards.forEach(card => {
                const targets = card.getAttribute('data-category');
                
                if (selection === 'all' || targets.includes(selection)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    // --- 4. DATA CATALOG QUANTITY LIVE FILTER ---
    const inputField = document.querySelector('.search-bar input');

    if (inputField) {
        inputField.addEventListener('input', (event) => {
            const currentSearchQuery = event.target.value.toLowerCase().trim();

            mediaCards.forEach(card => {
                const headingText = card.querySelector('h3').textContent.toLowerCase();
                const categoricalMeta = card.querySelector('.meta').textContent.toLowerCase();

                if (headingText.includes(currentSearchQuery) || categoricalMeta.includes(currentSearchQuery)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    }
});
