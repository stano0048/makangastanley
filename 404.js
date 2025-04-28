document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Rocket animation
    const rocket = document.querySelector('.rocket');
    if (rocket) {
        rocket.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(15deg)';
        });
        
        rocket.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    }
    
    // Intersection Observer for scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('[data-scroll]');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.setAttribute('data-scroll', 'in');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            elements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            elements.forEach(element => {
                element.setAttribute('data-scroll', 'in');
            });
        }
    };
    
    animateOnScroll();
    
    // Pulse animation for buttons
    const ctaButtons = document.querySelectorAll('.pulse');
    if (ctaButtons.length > 0) {
        setInterval(() => {
            ctaButtons.forEach(button => {
                button.classList.toggle('pulse');
                setTimeout(() => {
                    button.classList.toggle('pulse');
                }, 2000);
            });
        }, 4000);
    }
    
    // Make planet clickable (fun interaction)
    const planet = document.querySelector('.planet');
    if (planet) {
        planet.addEventListener('click', function() {
            this.style.boxShadow = '0 0 50px rgba(131, 56, 236, 0.8)';
            setTimeout(() => {
                this.style.boxShadow = '0 0 30px rgba(131, 56, 236, 0.5)';
            }, 500);
        });
    }
});