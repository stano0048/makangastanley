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
    
    // Typewriter effect for subheader
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
            this.txtElement = txtElement;
            this.words = words;
            this.txt = '';
            this.wordIndex = 0;
            this.wait = parseInt(wait, 10);
            this.type();
            this.isDeleting = false;
        }
        
        type() {
            // Current index of word
            const current = this.wordIndex % this.words.length;
            // Get full text of current word
            const fullTxt = this.words[current];
            
            // Check if deleting
            if (this.isDeleting) {
                // Remove char
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                // Add char
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }
            
            // Insert txt into element
            this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
            
            // Initial Type Speed
            let typeSpeed = 100;
            
            if (this.isDeleting) {
                typeSpeed /= 2;
            }
            
            // If word is complete
            if (!this.isDeleting && this.txt === fullTxt) {
                // Make pause at end
                typeSpeed = this.wait;
                // Set delete to true
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                // Move to next word
                this.wordIndex++;
                // Pause before start typing
                typeSpeed = 500;
            }
            
            setTimeout(() => this.type(), typeSpeed);
        }
    }
    
    // Init TypeWriter
    const txtElement = document.querySelector('.typewriter');
    const words = JSON.parse(txtElement.getAttribute('data-text'));
    const wait = txtElement.getAttribute('data-wait') || 3000;
    
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll reveal animations
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    scrollReveal.reveal('.hero-content', { delay: 300, origin: 'left' });
    scrollReveal.reveal('.about-grid > *', { interval: 200 });
    scrollReveal.reveal('.skill-card', { interval: 200 });
    scrollReveal.reveal('.matters-content', { origin: 'bottom' });
    scrollReveal.reveal('.cta', { origin: 'bottom' });
    
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
    
    // Heartbeat animation for profile image
    const profileImg = document.querySelector('.heartbeat');
    if (profileImg) {
        setInterval(() => {
            profileImg.classList.toggle('heartbeat');
        }, 3000);
    }
    
    // Pulse animation for CTA buttons
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
});