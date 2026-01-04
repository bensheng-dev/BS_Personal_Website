'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const revealImage = document.querySelector('.scroll-reveal-image');
    const personalProjectsSection = document.querySelector('.personal-projects');
    const skillsSection = document.querySelector('.carousel-skills');
    
    if (!revealImage || !personalProjectsSection) return;
    
    let isRevealed = false;
    let isHiding = false;
    
    function handleScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        const windowHeight = window.innerHeight;
        const skillsBottom = skillsSection ? skillsSection.getBoundingClientRect().bottom + scrollY : 0;
        const personalProjectsTop = personalProjectsSection.getBoundingClientRect().top + scrollY;
        const personalProjectsBottom = personalProjectsSection.getBoundingClientRect().bottom + scrollY;
        
        // Calculate when to start revealing (when skills section is in view)
        const revealStart = skillsBottom - windowHeight * 0.5;
        const revealEnd = personalProjectsTop - windowHeight * 0.3;
        const hideStart = personalProjectsTop - windowHeight * 0.2;
        
        // Reveal image as user scrolls toward personal projects
        if (scrollY >= revealStart && scrollY < revealEnd && !isRevealed) {
            revealImage.classList.remove('hiding');
            revealImage.classList.add('active');
            isRevealed = true;
            isHiding = false;
        }
        
        // Hide image when reaching personal projects section
        if (scrollY >= hideStart && isRevealed && !isHiding) {
            revealImage.classList.add('hiding');
            revealImage.classList.remove('active');
            isHiding = true;
            isRevealed = false;
        }
        
        // Reset if scrolling back up
        if (scrollY < revealStart && (isRevealed || isHiding)) {
            revealImage.classList.remove('active', 'hiding');
            isRevealed = false;
            isHiding = false;
        }
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial check
    handleScroll();
});

