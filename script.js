// JavaScript para Syntrony Technologies Inc

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Simular carga de contenido
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);

    // Menú móvil responsive
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Animación de entrada para elementos del hero
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }
    
    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            heroVisual.style.transition = 'all 1s ease';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateX(0)';
        }, 700);
    }
});

// Scroll suave para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(13, 13, 13, 0.98) 0%, rgba(74, 28, 35, 0.95) 100%)';
        header.style.boxShadow = '0 2px 20px rgba(114, 47, 55, 0.3)';
    } else {
        header.style.background = 'linear-gradient(135deg, rgba(13, 13, 13, 0.95) 0%, rgba(74, 28, 35, 0.9) 100%)';//color inicial del rectangulo donde esta SYNTRONY TECNOLOGIES INC
        header.style.boxShadow = 'none';
    }
});

// Animación de elementos al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a tarjetas de servicios
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});

// Formulario de contacto
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelectorAll('input[type="text"]')[1].value;
    const message = this.querySelector('textarea').value;
    
    // Validación básica
    if (!name || !email || !subject || !message) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }
    
    // Simulación de envío
    showNotification('Mensaje enviado correctamente. Te contactaremos pronto.', 'success');
    this.reset();
});

// Sistema de notificaciones
function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    // Colores según tipo
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #00897b, #00acc1)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #c2185b, #ff6f00)';
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Animación de contador para estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Activar contador cuando sea visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.animated) {
            const statNumber = entry.target;
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statNumber.animated = true;
        }
    });
}, { threshold: 0.5 });

// Aplicar a los elementos de estadísticas
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-item h3');
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Efecto parallax suave en el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;//Controla el movimiento con el que baja el texto de la derecha
        heroContent.style.opacity = 1 - scrolled / 800;
    }
});

// Animación de tech items en el hero
document.addEventListener('DOMContentLoaded', function() {
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
        item.style.animation = 'float 6s ease-in-out infinite';
    });
});

// Preloader simple
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Detección de dispositivo
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes para dispositivos móviles
if (isMobile()) {
    // Reducir animaciones en móviles para mejor rendimiento
    document.querySelectorAll('.service-card, .tech-item').forEach(element => {
        element.style.transition = 'all 0.2s ease';
    });
}

// Console message para desarrolladores
console.log('%c🚀 Syntrony Technologies Inc', 'color: #00acc1; font-size: 20px; font-weight: bold;');
console.log('%cInnovación que impulsa el futuro', 'color: #1a237e; font-size: 14px;');
console.log('%cPaleta de colores:', 'color: #ff6f00; font-size: 12px; font-weight: bold;');
console.log('%c• Azul corporativo: #1a237e\n• Cian brillante: #00acc1\n• Naranja energético: #ff6f00\n• Púrpura tecnológico: #7b1fa2', 'color: #546e7a; font-size: 11px;');