'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Personal Projects Carousel (3 items)
    const personalCarousel = document.querySelector('.projects-carousel-container:not(.solar-carousel-container)');
    if (personalCarousel) {
        initCarousel(
            personalCarousel.querySelector('.projects-carousel'),
            personalCarousel.querySelector('.carousel-prev'),
            personalCarousel.querySelector('.carousel-next'),
            personalCarousel.querySelector('.carousel-dots')
        );
    }
    
    // Initialize Solar Projects Carousel (2 items)
    const solarCarousel = document.querySelector('.solar-carousel-container');
    if (solarCarousel) {
        initCarousel(
            solarCarousel.querySelector('.solar-carousel'),
            solarCarousel.querySelector('.solar-prev'),
            solarCarousel.querySelector('.solar-next'),
            solarCarousel.querySelector('.solar-dots')
        );
    }
    
    function initCarousel(carousel, prevBtn, nextBtn, dotsContainer) {
        if (!carousel) return;
        
        const projectCards = carousel.querySelectorAll('.project-card');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
        let currentSlide = 0;
        const totalSlides = projectCards.length;

        // Function to update carousel
        function updateCarousel() {
            projectCards.forEach((card, index) => {
                card.classList.remove('active');
                
                // Calculate relative position
                let diff = index - currentSlide;
                
                // Handle wrap-around
                // Normalize diff to be between -1 and 1 for adjacent cards
                if (diff > 1) {
                    diff = diff - totalSlides; // Wrap from right to left
                } else if (diff < -1) {
                    diff = diff + totalSlides; // Wrap from left to right
                }
                
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
                } else if (diff === -1) {
                    // Left side card (previous)
                    card.style.left = '10%';
                    card.style.right = 'auto';
                    card.style.transform = 'scale(0.85)';
                    card.style.zIndex = '1';
                    card.style.opacity = '0.6';
                } else if (diff === 1) {
                    // Right side card (next)
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
    }
});

