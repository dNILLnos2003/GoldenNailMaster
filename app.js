/**
 * Golden Nail Master - Scripts principales
 * 
 * Este archivo contiene 5 secciones de funcionalidad:
 * 1. Scroll y animaciones
 * 2. Carrusel mejorado
 * 3. Efectos en tarjetas de cursos
 * 4. Validación de formularios
 */

// =======================================
// 1. SCROLL Y ANIMACIONES
// =======================================

    
    // Animación al hacer scroll para las secciones
    const contentSections = document.querySelectorAll('.content-section');
    
    // Configuración del observador de intersección
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Callback para el observador de intersección
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 1s ease forwards';
                observer.unobserve(entry.target); // Deja de observar después de la animación
            }
        });
    };
    
    // Crear observador de intersección
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observar todas las secciones de contenido
    contentSections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });


// =======================================
// 2. CARRUSEL MEJORADO
// =======================================
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el carrusel
    const carousel = document.getElementById('carouselExampleIndicators');
    
    if (carousel) {
        // Intervalo personalizado para el carrusel (5 segundos)
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            pause: 'hover'
        });
        
        // Agregar animación a las imágenes del carrusel
        const carouselItems = carousel.querySelectorAll('.carousel-item');
        
        carouselItems.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                // Aplicar efecto de zoom suave
                img.style.transition = 'transform 5s ease';
                
                item.addEventListener('transitionstart', function() {
                    img.style.transform = 'scale(1)';
                });
                
                item.addEventListener('transitionend', function() {
                    if (item.classList.contains('active')) {
                        img.style.transform = 'scale(1.05)';
                    }
                });
            }
        });
        
        // Si el elemento activo ya está visible, iniciar la animación
        const activeItem = carousel.querySelector('.carousel-item.active img');
        if (activeItem) {
            setTimeout(() => {
                activeItem.style.transform = 'scale(1.05)';
            }, 100);
        }
    }
});

// =======================================
// 3. EFECTOS EN TARJETAS DE CURSOS
// =======================================
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todas las tarjetas de cursos
    const courseCards = document.querySelectorAll('.course-card');
    
    // Aplicar efectos de hover más elaborados
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Aplicar sombra más pronunciada
            this.style.boxShadow = '0 15px 30px rgba(217, 83, 79, 0.3)';
            
            // Efecto en la imagen
            const cardImage = this.querySelector('.card-img-top');
            if (cardImage) {
                cardImage.style.transform = 'scale(1.08)';
                cardImage.style.transition = 'transform 0.5s ease';
            }
            
            // Efecto en el título
            const cardTitle = this.querySelector('.card-title');
            if (cardTitle) {
                cardTitle.style.color = '#c9302c';
                cardTitle.style.transition = 'color 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Restaurar sombra original
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            
            // Restaurar imagen
            const cardImage = this.querySelector('.card-img-top');
            if (cardImage) {
                cardImage.style.transform = 'scale(1)';
            }
            
            // Restaurar título
            const cardTitle = this.querySelector('.card-title');
            if (cardTitle) {
                cardTitle.style.color = '#d9534f';
            }
        });
        
        // Efecto de clic
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
        });
    });
});

// =======================================
// 4. VALIDACIÓN DE FORMULARIOS
// =======================================
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los formularios que necesiten validación
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Agregar evento de submit
        form.addEventListener('submit', function(event) {
            if (!validateForm(this)) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
        
        // Validación en tiempo real para campos de email
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('input', function() {
                validateEmail(this);
            });
        });
        
        // Validación en tiempo real para campos de contraseña
        const passwordInputs = form.querySelectorAll('input[type="password"]');
        passwordInputs.forEach(input => {
            input.addEventListener('input', function() {
                validatePassword(this);
            });
        });
    });
    
    // Función para validar email
    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(input.value);
        
        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            
            // Crear mensaje de error si no existe
            let errorMessage = input.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains('invalid-feedback')) {
                errorMessage = document.createElement('div');
                errorMessage.classList.add('invalid-feedback');
                errorMessage.textContent = 'Por favor ingresa un email válido';
                input.parentNode.insertBefore(errorMessage, input.nextSibling);
            }
        }
        
        return isValid;
    }
    
    // Función para validar contraseña
    function validatePassword(input) {
        // Al menos 8 caracteres, una letra mayúscula y un número
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        const isValid = passwordRegex.test(input.value);
        
        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            
            // Crear mensaje de error si no existe
            let errorMessage = input.nextElementSibling;
            if (!errorMessage || !errorMessage.classList.contains('invalid-feedback')) {
                errorMessage = document.createElement('div');
                errorMessage.classList.add('invalid-feedback');
                errorMessage.textContent = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número';
                input.parentNode.insertBefore(errorMessage, input.nextSibling);
            }
        }
        
        return isValid;
    }
    
    // Función para validar todo el formulario
    function validateForm(form) {
        let isValid = true;
        
        // Validar emails
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            if (!validateEmail(input)) {
                isValid = false;
            }
        });
        
        // Validar contraseñas
        const passwordInputs = form.querySelectorAll('input[type="password"]');
        passwordInputs.forEach(input => {
            if (!validatePassword(input)) {
                isValid = false;
            }
        });
        
        // Validar campos obligatorios
        const requiredInputs = form.querySelectorAll('[required]');
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
                
                // Crear mensaje de error si no existe
                let errorMessage = input.nextElementSibling;
                if (!errorMessage || !errorMessage.classList.contains('invalid-feedback')) {
                    errorMessage = document.createElement('div');
                    errorMessage.classList.add('invalid-feedback');
                    errorMessage.textContent = 'Este campo es obligatorio';
                    input.parentNode.insertBefore(errorMessage, input.nextSibling);
                }
            }
        });
        
        return isValid;
    }
});