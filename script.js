// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header visibility safeguard (added first)
    const header = document.querySelector('.header');
    if (header) {
        header.style.backgroundColor = '#1a1a2e';
        header.style.color = 'white';
        console.log('Header visibility forced - remove this after testing');
    }

    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Header on Scroll
    window.addEventListener('scroll', function() {
        if (!header) return;
        
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Counter Animation for Stats
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Initialize counter animation when stats section is in view
    const statsSection = document.querySelector('.stats');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Initialize Swiper for Testimonials
    const testimonialSwiper = new Swiper('.testimonial-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon.If your matter is urgent or requires immediate attention, please reach out to us directly via email or by phone, as it may take some time for us to review messages here.`);
            
            // Reset the form
            contactForm.reset();
        });
    }

    // GSAP Animations
    gsap.from('.logo', {
        duration: 1,
        y: -50,
        opacity: 1, // Changed from 0 to 1 to ensure visibility
        delay: 0.5
    });
    
    gsap.from('.nav-link', {
        duration: 1,
        y: -50,
        opacity: 1, // Changed from 0 to 1 to ensure visibility
        delay: 0.7,
        stagger: 0.2
    });
    
    gsap.from('.hero-content', {
        duration: 1,
        x: -100,
        opacity: 0,
        delay: 1
    });
    
    gsap.from('.hero-image', {
        duration: 1,
        x: 100,
        opacity: 0,
        delay: 1.2
    });
    
    gsap.from('.scroll-down', {
        duration: 1,
        y: 20,
        opacity: 0,
        delay: 1.5
    });

    // Continuous header visibility check (safeguard)
    setInterval(() => {
        if (header) {
            header.style.backgroundColor = '#1a1a2e';
            const logo = document.querySelector('.logo');
            if (logo) logo.style.color = 'white';
        }
    }, 1000);
});

// Initialize AOS outside DOMContentLoaded
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});
