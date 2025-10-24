const config = {
    schoolName: "EPD Albert Einstein N°1",
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

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80;
        const targetPosition = target.offsetTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

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

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

function updateFooterYear() {
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        yearElement.innerHTML = `&copy; ${new Date().getFullYear()} ${config.schoolName} - ${config.location}`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateFooterYear();
    
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        document.title = `${config.schoolName} - Educación Modular Personalizada`;
    }
});