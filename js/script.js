const burger = document.querySelector('.burger');
const nav = document.querySelector('nav ul');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Add mobile menu functionality
const mobileMenu = document.querySelector('.nav-container nav');
const menuToggle = document.querySelector('.burger');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Close menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

const targetDate = new Date("April 26, 2025 00:00:00").getTime();

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-timer').innerHTML = "<h3>The Hackathon has started!</h3>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');

}, 1000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
});

const glitchElement = document.querySelector('.glitch');

setTimeout(() => {
    glitchElement.style.animation = 'none';
}, 3000);

glitchElement.addEventListener('mouseenter', () => {
    glitchElement.style.animation = 'glitch-1 2s infinite linear alternate-reverse';
});

glitchElement.addEventListener('mouseleave', () => {
    setTimeout(() => {
        glitchElement.style.animation = 'none';
    }, 2000);
});

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
            e.stopPropagation();
            mapModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        mapModal.addEventListener('click', (e) => {
            if (e.target === mapModal) {
                mapModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mapModal.style.display === 'block') {
                mapModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

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

    // Update countdown section to show event has ended
    const countdownSection = document.querySelector('.countdown');
    if (countdownSection) {
        countdownSection.innerHTML = `
            <h2 class="countdown-title">HACKATHON STATUS</h2>
            <div class="event-ended-message">
                <h3>The Hackathon Has Concluded!</h3>
                <p>Thank you to all participants for making TechForge 2025 a great success.</p>
                <p>Stay tuned for the next edition!</p>
            </div>
        `;
    }

    // Disable registration buttons and update their text
    const registerButtons = document.querySelectorAll('a[href="no.html"]');
    registerButtons.forEach(button => {
        button.href = '#';
        button.classList.add('disabled');
        button.innerText = 'REGISTRATION CLOSED';
    });

    // Map modal functionality
    const mapContainers = document.querySelectorAll('.map-container');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    mapContainers.forEach((container, index) => {
        const addressText = container.querySelector('.address-text');
        const modal = modals[index];
        const closeBtn = closeButtons[index];

        addressText.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Mobile menu functionality
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    // Add cursor effect handling
    const cursorEffect = document.querySelector('.cursor-effect');
    let isMoving = false;
    let rafId = null;

    // Throttled mouse move handler
    const handleMouseMove = (e) => {
        if (!isMoving) {
            isMoving = true;
            rafId = requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth) * 100;
                const y = (e.clientY / window.innerHeight) * 100;

                cursorEffect.style.setProperty('--cursor-x', `${x}%`);
                cursorEffect.style.setProperty('--cursor-y', `${y}%`);
                cursorEffect.classList.add('active');

                isMoving = false;
            });
        }
    };

    // Cleanup on mouse leave
    const handleMouseLeave = () => {
        cursorEffect.classList.remove('active');
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
});

// Create cursor effect element
const cursorEffect = document.createElement('div');
cursorEffect.className = 'cursor-effect';
document.body.appendChild(cursorEffect);

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    document.documentElement.style.setProperty('--cursor-x', x + '%');
    document.documentElement.style.setProperty('--cursor-y', y + '%');

    if (!cursorEffect.classList.contains('active')) {
        cursorEffect.classList.add('active');
    }
});

// Handle mouse leave
document.addEventListener('mouseleave', () => {
    cursorEffect.classList.remove('active');
});
// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Fix mobile menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('active');
        burger.classList.remove('active');
    }
});
