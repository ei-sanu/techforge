// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav ul');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Countdown Timer
const countdownDate = new Date();
countdownDate.setDate(countdownDate.getDate() + 21); // Set to 21 days from now

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});

// Glitch Animation Control
const glitchElement = document.querySelector('.glitch');

// Disable glitch animation initially
setTimeout(() => {
    glitchElement.style.animation = 'none';
}, 3000);

// Reactivate glitch on hover
glitchElement.addEventListener('mouseenter', () => {
    glitchElement.style.animation = 'glitch-1 2s infinite linear alternate-reverse';
});

glitchElement.addEventListener('mouseleave', () => {
    setTimeout(() => {
        glitchElement.style.animation = 'none';
    }, 2000);
});

// Fade-in animation for sections
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .countdown, .event-details').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 1s ease, transform 1s ease';
    observer.observe(section);
});

// Map Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.querySelector('.map-container');
    const mapModal = document.getElementById('mapModal');
    const closeModal = document.querySelector('.close-modal');

    if (mapContainer && mapModal && closeModal) {
        mapContainer.addEventListener('click', () => {
            mapModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        closeModal.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            mapModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Close on clicking outside the modal
        mapModal.addEventListener('click', (e) => {
            if (e.target === mapModal) {
                mapModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mapModal.style.display === 'block') {
                mapModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Footer map modal
    const footerMapContainer = document.querySelector('.footer-map');
    const footerMapModal = document.getElementById('footerMapModal');
    const footerCloseModal = footerMapModal?.querySelector('.close-modal');

    if (footerMapContainer && footerMapModal && footerCloseModal) {
        footerMapContainer.addEventListener('click', () => {
            footerMapModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        footerCloseModal.addEventListener('click', (e) => {
            e.stopPropagation();
            footerMapModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        footerMapModal.addEventListener('click', (e) => {
            if (e.target === footerMapModal) {
                footerMapModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});
