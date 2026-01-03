'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = projectCards.length;

    // Function to update carousel
    function updateCarousel() {
        projectCards.forEach((card, index) => {
            card.classList.remove('active');
            
            // Calculate relative position
            let diff = index - currentSlide;
            
            // Handle wrap-around
            if (diff > 1) diff = diff - totalSlides;
            if (diff < -1) diff = diff + totalSlides;
            
            // Reset and position cards
            card.style.opacity = '';
            card.style.pointerEvents = '';
            
            if (diff === 0) {
                // Center card - active
                card.classList.add('active');
                card.style.left = '50%';
                card.style.right = 'auto';
                card.style.transform = 'translateX(-50%) scale(1)';
                card.style.zIndex = '3';
                card.style.opacity = '1';
            } else if (diff === -1 || diff === 2) {
                // Left side card
                card.style.left = '10%';
                card.style.right = 'auto';
                card.style.transform = 'scale(0.85)';
                card.style.zIndex = '1';
                card.style.opacity = '0.6';
            } else if (diff === 1 || diff === -2) {
                // Right side card
                card.style.left = 'auto';
                card.style.right = '10%';
                card.style.transform = 'scale(0.85)';
                card.style.zIndex = '1';
                card.style.opacity = '0.6';
            } else {
                // Hidden
                card.style.opacity = '0';
                card.style.pointerEvents = 'none';
            }
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Initialize carousel
    updateCarousel();

    // Optional: Auto-play (uncomment to enable)
    // setInterval(nextSlide, 5000);
});

