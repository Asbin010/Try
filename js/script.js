/**
 * CyberTech Solutions - Main JavaScript File
 * Handles all interactive functionality including theme toggle, animations,
 * form validation, sliders, and mobile navigation
 */

// ==========================================================================
// Global Variables and Configuration
// ==========================================================================

const config = {
    typingSpeed: 100,
    animationDuration: 600,
    scrollThreshold: 100,
    testimonialAutoplay: 5000,
    debounceDelay: 250
};

// ==========================================================================
// Utility Functions
// ==========================================================================

/**
 * Debounce function to limit the rate of function execution
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Generate random number between min and max
 */
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==========================================================================
// Theme Management
// ==========================================================================

class ThemeManager {
    constructor() {
        this.themeToggleBtn = document.getElementById('theme-toggle-btn');
        this.body = document.body;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        this.setTheme(this.currentTheme);
        
        // Add event listener for theme toggle
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }
    
    setTheme(theme) {
        if (theme === 'light') {
            this.body.classList.add('light-theme');
        } else {
            this.body.classList.remove('light-theme');
        }
        
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update navbar background for light theme
        this.updateNavbarBackground();
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (this.currentTheme === 'light') {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 11, 0.95)';
            }
        }
    }
}

// ==========================================================================
// Navigation Management
// ==========================================================================

class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.handleScroll();
        this.setupMobileNavigation();
        this.setupNavLinkClicks();
        
        // Listen for scroll events
        window.addEventListener('scroll', debounce(() => this.handleScroll(), config.debounceDelay));
    }
    
    handleScroll() {
        if (!this.navbar) return;
        
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
    
    setupMobileNavigation() {
        if (!this.navToggle || !this.navMenu) return;
        
        this.navToggle.addEventListener('click', () => {
            this.navToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.navToggle.classList.remove('active');
                this.navMenu.classList.remove('active');
            }
        });
    }
    
    setupNavLinkClicks() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // If it's a hash link (internal page navigation)
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    smoothScrollTo(href);
                    
                    // Close mobile menu
                    this.navToggle.classList.remove('active');
                    this.navMenu.classList.remove('active');
                }
            });
        });
    }
}

// ==========================================================================
// Typing Animation
// ==========================================================================

class TypingAnimation {
    constructor(element, texts) {
        this.element = element;
        this.texts = Array.isArray(texts) ? texts : [texts];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typingSpeed = config.typingSpeed;
        
        this.init();
    }
    
    init() {
        if (!this.element) return;
        
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }
        
        let speed = this.isDeleting ? this.typingSpeed / 2 : this.typingSpeed;
        
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            speed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            speed = 500; // Pause before starting new text
        }
        
        setTimeout(() => this.type(), speed);
    }
}

// ==========================================================================
// Scroll Animations (AOS replacement)
// ==========================================================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.animatedElements = new Set();
        
        this.init();
    }
    
    init() {
        this.observeElements();
        
        // Initial check for elements already in viewport
        this.checkVisibleElements();
    }
    
    observeElements() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, options);
        
        this.elements.forEach(element => {
            observer.observe(element);
        });
    }
    
    checkVisibleElements() {
        this.elements.forEach(element => {
            if (isElementInViewport(element) && !this.animatedElements.has(element)) {
                this.animateElement(element);
                this.animatedElements.add(element);
            }
        });
    }
    
    animateElement(element) {
        const delay = element.getAttribute('data-aos-delay') || 0;
        
        setTimeout(() => {
            element.classList.add('aos-animate');
        }, parseInt(delay));
    }
}

// ==========================================================================
// Back to Top Button
// ==========================================================================

class BackToTopButton {
    constructor() {
        this.button = document.getElementById('back-to-top');
        this.scrollThreshold = config.scrollThreshold;
        
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        this.button.addEventListener('click', () => this.scrollToTop());
        window.addEventListener('scroll', debounce(() => this.handleScroll(), config.debounceDelay));
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > this.scrollThreshold) {
            this.button.classList.add('show');
        } else {
            this.button.classList.remove('show');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// ==========================================================================
// Testimonial Slider
// ==========================================================================

class TestimonialSlider {
    constructor() {
        this.slides = document.querySelectorAll('.testimonial-slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.currentSlide = 0;
        this.autoplayInterval = null;
        
        this.init();
    }
    
    init() {
        if (!this.slides.length) return;
        
        this.setupEventListeners();
        this.startAutoplay();
    }
    
    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause autoplay on hover
        const sliderWrapper = document.querySelector('.slider-wrapper');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', () => this.stopAutoplay());
            sliderWrapper.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }
    
    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        // Update current slide
        this.currentSlide = index;
        
        // Add active class to new slide and dot
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }
    
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, config.testimonialAutoplay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Global functions for slider controls (called from HTML)
function changeSlide(direction) {
    if (window.testimonialSlider) {
        if (direction === 1) {
            window.testimonialSlider.nextSlide();
        } else {
            window.testimonialSlider.prevSlide();
        }
    }
}

function currentSlide(index) {
    if (window.testimonialSlider) {
        window.testimonialSlider.goToSlide(index - 1); // Convert to 0-based index
    }
}

// ==========================================================================
// Project Filter
// ==========================================================================

class ProjectFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        
        this.init();
    }
    
    init() {
        if (!this.filterBtns.length) return;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.filterProjects(filter);
                this.updateActiveButton(btn);
            });
        });
    }
    
    filterProjects(filter) {
        this.projectCards.forEach(card => {
            const categories = card.getAttribute('data-category');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    updateActiveButton(activeBtn) {
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
}

// ==========================================================================
// Contact Form Validation
// ==========================================================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.querySelector('.submit-btn');
        this.successMessage = document.getElementById('success-message');
        
        this.init();
    }
    
    init() {
        if (!this.form) return;
        
        this.setupEventListeners();
        this.setupRealTimeValidation();
    }
    
    setupEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    setupRealTimeValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }
        
        this.showLoading(true);
        
        // Simulate form submission
        try {
            await this.simulateFormSubmission();
            this.showSuccess();
        } catch (error) {
            this.showError('Failed to send message. Please try again.');
        } finally {
            this.showLoading(false);
        }
    }
    
    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'This field is required';
            isValid = false;
        }
        
        // Specific validations
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (value && value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;
                
            case 'email':
                if (value && !this.isValidEmail(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
                
            case 'phone':
                if (value && !this.isValidPhone(value)) {
                    errorMessage = 'Please enter a valid phone number';
                    isValid = false;
                }
                break;
                
            case 'message':
                if (value && value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
                
            case 'privacy':
                if (field.type === 'checkbox' && !field.checked) {
                    errorMessage = 'You must agree to the privacy policy';
                    isValid = false;
                }
                break;
        }
        
        this.showFieldError(field, errorMessage);
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    showFieldError(field, message) {
        const errorElement = document.getElementById(`${field.name}-error`);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.toggle('show', !!message);
        }
        
        field.classList.toggle('error', !!message);
    }
    
    clearError(field) {
        this.showFieldError(field, '');
    }
    
    showLoading(show) {
        if (this.submitBtn) {
            this.submitBtn.classList.toggle('loading', show);
            this.submitBtn.disabled = show;
        }
    }
    
    async simulateFormSubmission() {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }
    
    showSuccess() {
        if (this.form && this.successMessage) {
            this.form.style.display = 'none';
            this.successMessage.style.display = 'block';
            
            // Scroll to success message
            this.successMessage.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    showError(message) {
        alert(message); // In a real app, you'd show a proper error message
    }
}

// ==========================================================================
// FAQ Accordion
// ==========================================================================

class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => this.toggleFAQ(item));
            }
        });
    }
    
    toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        this.faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // If the clicked item wasn't active, activate it
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// Global function for FAQ toggle (called from HTML)
function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    if (window.faqAccordion && faqItem) {
        window.faqAccordion.toggleFAQ(faqItem);
    }
}

// ==========================================================================
// Modal Management
// ==========================================================================

class ModalManager {
    constructor() {
        this.modals = document.querySelectorAll('.modal');
        this.currentModal = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Close modal when clicking outside
        this.modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
            
            // Close button
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeModal(modal));
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal(this.currentModal);
            }
        });
    }
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            this.currentModal = modal;
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal(modal) {
        modal.classList.remove('show');
        this.currentModal = null;
        document.body.style.overflow = '';
    }
}

// Global functions for modal control (called from HTML)
function openProjectModal(projectId) {
    // In a real app, you'd load project details dynamically
    console.log('Opening project modal for:', projectId);
    
    if (window.modalManager) {
        window.modalManager.openModal('project-modal');
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (window.modalManager && modal) {
        window.modalManager.closeModal(modal);
    }
}

function openMapModal() {
    if (window.modalManager) {
        window.modalManager.openModal('map-modal');
    }
}

function closeMapModal() {
    const modal = document.getElementById('map-modal');
    if (window.modalManager && modal) {
        window.modalManager.closeModal(modal);
    }
}

// ==========================================================================
// Stats Counter Animation
// ==========================================================================

class StatsCounter {
    constructor() {
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.animatedStats = new Set();
        
        this.init();
    }
    
    init() {
        this.observeStats();
    }
    
    observeStats() {
        const options = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedStats.has(entry.target)) {
                    this.animateCounter(entry.target);
                    this.animatedStats.add(entry.target);
                }
            });
        }, options);
        
        this.statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target')) || parseInt(element.textContent);
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// ==========================================================================
// Preloader
// ==========================================================================

class Preloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        
        this.init();
    }
    
    init() {
        if (!this.preloader) return;
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hidePreloader();
            }, 1000);
        });
    }
    
    hidePreloader() {
        if (this.preloader) {
            this.preloader.style.opacity = '0';
            setTimeout(() => {
                this.preloader.style.display = 'none';
            }, 500);
        }
    }
}

// ==========================================================================
// Matrix Rain Effect (for hero background)
// ==========================================================================

class MatrixRain {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.drops = [];
        this.chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
        
        this.init();
    }
    
    init() {
        const matrixRain = document.querySelector('.matrix-rain');
        if (!matrixRain) return;
        
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.opacity = '0.1';
        this.canvas.style.pointerEvents = 'none';
        
        matrixRain.appendChild(this.canvas);
        
        this.resize();
        this.initDrops();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    initDrops() {
        const columns = Math.floor(this.canvas.width / 20);
        this.drops = new Array(columns).fill(0);
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff88';
        this.ctx.font = '15px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            const x = i * 20;
            const y = this.drops[i] * 20;
            
            this.ctx.fillText(char, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================================================
// Lazy Loading for Images
// ==========================================================================

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        
        this.init();
    }
    
    init() {
        if (!this.images.length) return;
        
        const options = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        this.images.forEach(img => {
            observer.observe(img);
        });
    }
    
    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        }
    }
}

// ==========================================================================
// Initialization
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    window.themeManager = new ThemeManager();
    window.navigationManager = new NavigationManager();
    window.scrollAnimations = new ScrollAnimations();
    window.backToTopButton = new BackToTopButton();
    window.testimonialSlider = new TestimonialSlider();
    window.projectFilter = new ProjectFilter();
    window.contactForm = new ContactForm();
    window.faqAccordion = new FAQAccordion();
    window.modalManager = new ModalManager();
    window.statsCounter = new StatsCounter();
    window.preloader = new Preloader();
    window.matrixRain = new MatrixRain();
    window.lazyLoader = new LazyLoader();
    
    // Initialize typing animation for hero text
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = [
            "console.log('Innovating Tech')",
            "console.log('Securing Future')",
            "console.log('Building Tomorrow')"
        ];
        new TypingAnimation(typingElement, texts);
    }
    
    // Add smooth scrolling for all hash links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                smoothScrollTo(href);
            }
        });
    });
    
    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            hero.style.transform = `translate3d(0, ${parallax}px, 0)`;
        });
    }
    
    // Console message for developers
    console.log(`
    ╔═══════════════════════════════════════╗
    ║        CyberTech Solutions            ║
    ║     Innovating the Future 🚀         ║
    ║                                       ║
    ║  Built with pure HTML, CSS & JS      ║
    ║  No frameworks, just craftsmanship    ║
    ║                                       ║
    ║  Interested in joining our team?      ║
    ║  Contact: hello@cybertech.dev         ║
    ╚═══════════════════════════════════════╝
    `);
});

// ==========================================================================
// Performance Monitoring
// ==========================================================================

// Monitor performance
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
    
    // Track Core Web Vitals
    if ('web-vital' in window) {
        // This would be implemented with a real performance monitoring service
        console.log('Core Web Vitals tracking initialized');
    }
});

// ==========================================================================
// Error Handling
// ==========================================================================

window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    
    // In production, you would send this to your error tracking service
    // Example: Sentry, LogRocket, etc.
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    
    // Prevent the default browser behavior
    e.preventDefault();
});

// ==========================================================================
// Accessibility Enhancements
// ==========================================================================

// Ensure proper focus management
document.addEventListener('keydown', (e) => {
    // Escape key handling
    if (e.key === 'Escape') {
        // Close any open modals, menus, etc.
        const activeModal = document.querySelector('.modal.show');
        if (activeModal && window.modalManager) {
            window.modalManager.closeModal(activeModal);
        }
        
        // Close mobile menu
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class when using mouse
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ==========================================================================
// Service Worker Registration (for PWA capabilities)
// ==========================================================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Register service worker for caching and offline functionality
        // This would be implemented for a production PWA
        console.log('Service Worker support detected');
    });
}