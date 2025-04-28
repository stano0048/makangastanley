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
    
    // FAQ Accordion with Typing/Deleting Effects
    const faqItems = document.querySelectorAll('.faq-item');
    let currentActive = null;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        // Create a hidden span for typing effect
        const answerText = answer.querySelector('p').textContent;
        answer.innerHTML = '<span class="answer-typing"></span>';
        const typingElement = answer.querySelector('.answer-typing');
        
        question.addEventListener('click', () => {
            // If clicking the currently active item, close it
            if (item === currentActive) {
                item.classList.remove('active');
                currentActive = null;
                return;
            }
            
            // Close currently active item with deleting effect
            if (currentActive) {
                const currentAnswer = currentActive.querySelector('.faq-answer');
                const currentTyping = currentAnswer.querySelector('.answer-typing');
                const currentText = currentTyping.textContent;
                
                // Deleting animation
                let i = currentText.length;
                const deleteInterval = setInterval(() => {
                    if (i <= 0) {
                        clearInterval(deleteInterval);
                        currentActive.classList.remove('active');
                        currentActive = null;
                        
                        // Open clicked item after deletion completes
                        openFaqItem(item, typingElement, answerText);
                    } else {
                        currentTyping.textContent = currentText.substring(0, i);
                        i--;
                    }
                }, 30);
            } else {
                // Open clicked item if none are active
                openFaqItem(item, typingElement, answerText);
            }
        });
    });
    
    function openFaqItem(item, typingElement, text) {
        item.classList.add('active');
        currentActive = item;
        
        // Typing animation
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i >= text.length) {
                clearInterval(typeInterval);
            } else {
                typingElement.textContent = text.substring(0, i + 1);
                i++;
            }
        }, 30);
    }
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Submit form using Fetch API
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    alert('Message sent successfully!');
                    this.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                alert('There was a problem sending your message. Please try again later.');
                console.error('Error:', error);
            });
        });
    }
    
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
});