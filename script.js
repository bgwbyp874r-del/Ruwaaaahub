document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SMOOTH ANIMATION FOR HERO SLIDER ---
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    function changeSlide(index) {
        indicators.forEach(ind => ind.classList.remove('active'));
        slides.forEach(slide => slide.classList.remove('active'));

        indicators[index].classList.add('active');
        slides[index].classList.add('active');
        currentSlideIndex = index;
    }

    indicators.forEach((indicator, idx) => {
        indicator.addEventListener('click', () => {
            changeSlide(idx);
        });
    });

    // Auto Advance Slider every 7 seconds
    setInterval(() => {
        let nextIndex = (currentSlideIndex + 1) % indicators.length;
        changeSlide(nextIndex);
    }, 7000);


    // --- 2. INTERACTIVE MEDIA CATEGORY FILTERING ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const mediaCards = document.querySelectorAll('.media-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update Active class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            mediaCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    // Smooth fade-in effect via JS
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // match css transition duration
                }
            });
        });
    });


    // --- 3. LIVE SEARCH FILTER ---
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            mediaCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const meta = card.querySelector('.meta').textContent.toLowerCase();

                if (title.includes(searchTerm) || meta.includes(searchTerm)) {
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
