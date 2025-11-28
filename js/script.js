// Modern Portfolio JavaScript

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Smooth Scroll with offset for fixed navbar
$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Advanced Scroll Progress Bar
function updateScrollProgress() {
    const scrollProgressBar = $('#scrollProgressBar');
    if (scrollProgressBar) {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollCurrent = window.pageYOffset;
        const scrollPercentage = (scrollCurrent / scrollTotal) * 100;
        scrollProgressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
    }
}

// Intersection Observer for Animations
const animationObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered animation for multiple elements
                if (entry.target.parentElement && entry.target.parentElement.children.length > 1) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    }
);

// Observe all animation elements
$$('.fade-in, .slide-in-left, .slide-in-right, .bounce-in').forEach(el => {
    animationObserver.observe(el);
});

// Mobile Menu Toggle
const mobileMenuBtn = $('#mobileMenuBtn');
const mobileMenu = $('#mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close mobile menu when clicking on links
$$('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu?.classList.add('hidden');
        const icon = mobileMenuBtn?.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// Typewriter Effect for Hero Section
function typewriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter effect
const typewriterElement = $('.typewriter-text');
if (typewriterElement) {
    setTimeout(() => {
        typewriter(typewriterElement, 'Full-Stack Developer', 150);
    }, 1000);
}

// Project Filter Functionality
const filterButtons = $$('.filter-btn');
const projectCards = $$('.project-card');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.dataset.category;
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Enhanced Loading Animation
function hideLoader() {
    const loader = $('#loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Contact Form Enhancement with Formspree
const contactForm = $('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Let Formspree handle the submission naturally
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner animate-spin mr-2"></i>Sending...';
        
        // Reset after form submission
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    const colors = {
        success: 'bg-green-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-blue-600 text-white'
    };
    
    notification.className += ` ${colors[type] || colors.info}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Parallax Effect for Hero Section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = $$('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Scroll Event Listeners
let ticking = false;

function updateOnScroll() {
    updateScrollProgress();
    parallaxEffect();
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Theme Toggle (Optional - for future enhancement)
function initThemeToggle() {
    const themeToggle = $('#themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    
    // Add loading class to body
    document.body.classList.add('loading');
});

// Initialize everything when page is fully loaded
window.addEventListener('load', () => {
    hideLoader();
    document.body.classList.remove('loading');
    
    // Initialize any other components that need full page load
    updateScrollProgress();
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn?.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }
});

// Add resize listener for responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && mobileMenu) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn?.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }
});