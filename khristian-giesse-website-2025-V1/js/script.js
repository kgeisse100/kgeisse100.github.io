/**
 * Main JavaScript file for Khristian Giesse Website
 * Handles animations, smooth scrolling, and dynamic content
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer copyright
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Setup smooth scrolling for navigation links
    setupSmoothScrolling();
    
    // Add active class to navigation items on scroll
    setupScrollSpy();
    
    // Add animation to elements when they come into view
    setupScrollAnimations();
});

/**
 * Setup smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only if the link points to an ID on the page
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get the target's position relative to the viewport
                    const targetPosition = targetElement.getBoundingClientRect().top;
                    // Get the current scroll position
                    const startPosition = window.pageYOffset;
                    // Calculate distance to scroll (accounting for sticky nav)
                    const navHeight = document.querySelector('.sticky-nav').offsetHeight;
                    const distance = targetPosition - navHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: startPosition + distance,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

/**
 * Setup scroll spy to highlight active navigation items
 */
function setupScrollSpy() {
    // Get all sections that have an ID defined
    const sections = document.querySelectorAll('section[id], header[id]');
    const navHeight = document.querySelector('.sticky-nav').offsetHeight;
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        // Get current scroll position
        const scrollY = window.pageYOffset;
        
        // Loop through sections to find the one in view
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navHeight - 10; // Offset for better UX
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all nav links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    });
}

/**
 * Setup animations for elements when they come into view
 */
function setupScrollAnimations() {
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.section-title, .hero-content, .spotify-embed, .youtube-embed, .about-content, .social-links');
    
    // Create an observer for animation triggers
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Helper function to check if element is in viewport
 * @param {HTMLElement} element - The element to check
 * @returns {boolean} - Whether the element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
