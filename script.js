/* ========================================
   Portfolio Website JavaScript
   Visual Designer & Frontend Developer
   ======================================== */

// ========================================
// Configuration & Data
// ========================================

/**
 * Project Data - Ready for JSON/API integration
 * Add more projects here or fetch from external API
 */
const projectsData = [
    {
        id: 1,
        title: "Inventrium Social Media",
        category: "social-media",
        description: "Social media and website content for tech company",
        image: "images/inventrium.jpg",
        client: "Inventrium",
        year: "2024"
    },
    {
        id: 2,
        title: "Earthtab Website",
        category: "web-design",
        description: "Frontend development for tech platform",
        image: "images/earthtab.jpg",
        client: "Earthtab",
        year: "2024"
    },
    {
        id: 3,
        title: "Everboom Social Media",
        category: "social-media",
        description: "Social media management and content creation",
        image: "images/everboom.jpg",
        client: "Everboom",
        year: "2024"
    },
    {
        id: 4,
        title: "SheINKspires Rebranding",
        category: "branding",
        description: "Complete rebrand for fashion brand including logo and brand guidelines",
        image: "images/sheinkspires.jpg",
        client: "SheINKspires",
        year: "2023"
    },
    {
        id: 5,
        title: "SwiftWears Website",
        category: "web-design",
        description: "E-commerce website design for fashion brand",
        image: "images/swiftwears.jpg",
        client: "SwiftWears",
        year: "2023"
    },
    {
        id: 6,
        title: "Lapidoth Foundation",
        category: "social-media",
        description: "Social media graphics and campaign design for nonprofit",
        image: "images/lapidoth.jpg",
        client: "Lapidoth Foundation",
        year: "2023"
    },
    // Additional projects for "Load More" functionality
    {
        id: 7,
        title: "Project School Social Media",
        category: "social-media",
        description: "Social media management for educational platform",
        image: "images/projectschool.jpg",
        client: "Project School",
        year: "2023"
    }
];

/**
 * Configuration settings
 */
const config = {
    scrollOffset: 80,
    animationThreshold: 100,
    projectsPerPage: 6,
    themeKey: 'portfolio-theme'
};

// ========================================
// DOM Elements
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navbar = document.getElementById('mainNav');
    const themeToggle = document.getElementById('themeToggle');
    const backToTop = document.getElementById('backToTop');
    
    // Project elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    // Modal elements
    const projectModal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalClient = document.getElementById('modalClient');
    const modalYear = document.getElementById('modalYear');
    const modalLink = document.getElementById('modalLink');
    
    // Form elements
    const contactForm = document.getElementById('contactForm');
    
    // Initialize all functionality
    initTheme();
    initNavbar();
    initSmoothScroll();
    initActiveNavLink();
    initProjectFiltering();
    initProjectModal();
    initScrollAnimations();
    initBackToTop();
    initContactForm();
});

// ========================================
// Theme Toggle (Dark/Light Mode)
// ========================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem(config.themeKey) || 'dark';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle click handler
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem(config.themeKey, newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'bi bi-sun';
        } else {
            icon.className = 'bi bi-moon-stars';
        }
    }
}

// ========================================
// Navigation
// ========================================

function initNavbar() {
    const navbar = document.getElementById('mainNav');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========================================
// Smooth Scroll Navigation
// ========================================

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .hero-cta a, .footer-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only process hash links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offset = config.scrollOffset;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
}

// ========================================
// Active Nav Link on Scroll
// ========================================

function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - config.scrollOffset;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ========================================
// Project Filtering
// ========================================

function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hidden');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ========================================
// Project Modal (Lightbox)
// ========================================

function initProjectModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectModal');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('.project-title').textContent;
            const projectCategory = this.querySelector('.project-category').textContent;
            const projectDescription = this.querySelector('.project-description').textContent;
            const projectImage = this.querySelector('.project-image').src;
            
            // Find project data from projectsData array
            const projectData = projectsData.find(p => p.title === projectTitle) || {
                client: 'Client Name',
                year: '2024'
            };
            
            // Update modal content
            document.getElementById('modalTitle').textContent = projectTitle;
            document.getElementById('modalCategory').textContent = projectCategory;
            document.getElementById('modalDescription').textContent = projectDescription;
            document.getElementById('modalImage').src = projectImage;
            document.getElementById('modalClient').textContent = projectData.client;
            document.getElementById('modalYear').textContent = projectData.year;
        });
    });
}

// ========================================
// Scroll Animations
// ========================================

function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - config.animationThreshold) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Scroll listener with throttling for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ========================================
// Back to Top Button
// ========================================

function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Contact Form
// ========================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Log form data (replace with actual API call)
            console.log('Form submitted:', data);
            
            // Show success message (custom alert or notification)
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
            submitBtn.classList.add('btn-success');
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('btn-success');
            }, 3000);
            
            // Note: Replace console.log with actual form submission logic
            // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
        });
    }
}

// ========================================
// Load More Projects (Optional Enhancement)
// ========================================

function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const projectGrid = document.querySelector('.project-grid');
    
    if (loadMoreBtn && projectsData.length > config.projectsPerPage) {
        loadMoreBtn.addEventListener('click', function() {
            // This function can be used to load more projects from the data array
            // Currently hiding the button if all projects are loaded
            this.style.display = 'none';
        });
    }
}

// ========================================
// API Integration Helper Functions
// ========================================

/**
 * Fetch projects from external API
 * @param {string} apiUrl - API endpoint URL
 * @returns {Promise} - Promise resolving to projects array
 */
async function fetchProjects(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return projectsData; // Return default data on error
    }
}

/**
 * Render projects dynamically from data
 * @param {Array} projects - Array of project objects
 */
function renderProjects(projects) {
    const projectGrid = document.querySelector('.project-grid');
    
    if (!projectGrid) return;
    
    projectGrid.innerHTML = ''; // Clear existing projects
    
    projects.forEach((project, index) => {
        const projectHTML = `
            <div class="col-md-6 col-lg-4 project-item scroll-reveal" data-category="${project.category}">
                <div class="project-card" data-bs-toggle="modal" data-bs-target="#projectModal">
                    <img src="${project.image}" alt="${project.title}" class="project-image">
                    <div class="project-overlay">
                        <div class="project-info">
                            <span class="project-category">${project.category}</span>
                            <h3 class="project-title">${project.title}</h3>
                            <p class="project-description">${project.description}</p>
                        </div>
                        <button class="project-link">
                            <i class="bi bi-arrow-up-right"></i>
                        </button>
                    </div>
                    <div class="project-tag">View Project</div>
                </div>
            </div>
        `;
        
        projectGrid.insertAdjacentHTML('beforeend', projectHTML);
    });
    
    // Re-initialize filtering and modal for new elements
    initProjectFiltering();
    initProjectModal();
}

// ========================================
// Utility Functions
// ========================================

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
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
 * Throttle function for scroll events
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// Export functions for external use (if needed)
// ========================================

window.Portfolio = {
    projectsData,
    config,
    fetchProjects,
    renderProjects,
    debounce,
    throttle
};
