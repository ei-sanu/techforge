// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
});

// Add smooth scroll for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add cursor effect
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor-effect');

    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            const x = e.clientX;
            const y = e.clientY;

            cursor.style.setProperty('--cursor-x', `${x}px`);
            cursor.style.setProperty('--cursor-y', `${y}px`);
        });
    });

    // Optional: Add fade in/out effect when entering/leaving the window
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '0.7';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
});
