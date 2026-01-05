'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
    
    // Toggle menu when hamburger is clicked
    menuToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    // Close menu when clicking on overlay
    overlay.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
        });
    });
});

