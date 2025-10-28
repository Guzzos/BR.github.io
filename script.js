const config = {
    schoolName: "EPD N°1 Albert Einstein",
    contactEmail: "contacto@epdeinstein.edu.ar",
    location: "San Luis, Argentina",
    phone: "A confirmar",
    socialMedia: {
        instagram: "https://instagram.com/epdeinstein",
        facebook: "https://facebook.com/epdeinstein"
    }
};

const modularBenefits = [
    "Aprendizaje personalizado según ritmo individual",
    "Flexibilidad para adelantar materias",
    "Evita la repetición de años completos",
    "Desarrollo de autonomía y responsabilidad",
    "Acompañamiento tutorial continuo"
];

const orientations = [
    {
        name: "Programación y Robótica",
        icon: "🤖",
        description: "Desarrollamos habilidades en programación, diseño de sistemas y robótica educativa",
        features: [
            "Programación en múltiples lenguajes",
            "Diseño y construcción de robots",
            "Desarrollo de aplicaciones",
            "Inteligencia artificial básica"
        ]
    },
    {
        name: "Ciencias Naturales",
        icon: "🔬",
        description: "Formación científica integral con énfasis en investigación y método científico",
        features: [
            "Laboratorios equipados",
            "Proyectos de investigación",
            "Salidas de campo",
            "Ferias científicas"
        ]
    }
];

const featuredProjects = [
    {
        title: "Proyecto de Prótesis",
        icon: "🦾",
        description: "Desarrollo de prótesis funcionales utilizando impresión 3D",
        tags: ["Robótica", "Impresión 3D", "Innovación Social"]
    },
    {
        title: "Ingreso Universitario - Programa PROFES",
        icon: "🎓",
        description: "Estudiantes aprueban ingreso a universidad a través del programa PROFES",
        tags: ["Matemática", "Universidad", "Excelencia Académica"]
    },
    {
        title: "Intercolegiales",
        icon: "🏆",
        description: "Participación destacada en competencias intercolegiales",
        tags: ["Competencias", "Trabajo en Equipo", "Representación"]
    }
];

const domCache = {
    navLinks: null,
    menuToggle: null,
    footerYear: null
};

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    const isExpanded = navLinks.classList.toggle('active');
    
    menuToggle.setAttribute('aria-expanded', isExpanded);
    document.body.style.overflow = isExpanded ? 'hidden' : '';
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

function smoothScrollTo(targetElement, offset = 80) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

function updateFooterYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('footer p');
    
    yearElements.forEach(element => {
        if (element.textContent.includes('2025')) {
            element.innerHTML = `&copy; ${currentYear} ${config.schoolName} - ${config.location}`;
        }
    });
}

function handleGlobalErrors() {
    window.addEventListener('error', (event) => {
        console.error('Error global capturado:', event.error);
    });
}

function debounce(func, wait = 100, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function preloadCriticalResources() {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.as = 'style';
    document.head.appendChild(link);
}

function initMenuState() {
    const navLinks = document.getElementById('navLinks');
    const menuToggle = document.querySelector('.menu-toggle');
    
    domCache.navLinks = navLinks;
    domCache.menuToggle = menuToggle;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initMenuState();
    
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    
    updateFooterYear();
    
    document.addEventListener('click', function(event) {
        const navLinks = domCache.navLinks;
        const menuToggle = domCache.menuToggle;
        
        if (navLinks && navLinks.classList.contains('active') && 
            !navLinks.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            closeMenu();
        }
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                smoothScrollTo(target);
                
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            }
        });
    });
    
    const updatePageTitle = () => {
        const path = window.location.pathname;
        
        if (path.endsWith('index.html') || path === '/') {
            document.title = `${config.schoolName} - Educación Modular Personalizada`;
        } else if (path.includes('secundario.html')) {
            document.title = `${config.schoolName} | Educación Modular Personalizada - San Luis`;
        }
    };
    
    updatePageTitle();
    
    preloadCriticalResources();
    
    handleGlobalErrors();
    
    if ('ontouchstart' in window) {
        document.documentElement.classList.add('touch-device');
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMenu,
        closeMenu,
        smoothScrollTo,
        updateFooterYear
    };
}