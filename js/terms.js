const agreeCheckbox = document.getElementById('agree-terms');
const continueButton = document.getElementById('continue-button');
const captchaText = document.getElementById('captcha-text');
const captchaInput = document.getElementById('captcha-input');
const refreshButton = document.getElementById('refresh-captcha');
const warningMessage = document.getElementById('warning-message');

let currentCaptcha = '';
let redirectTimer;

function generateCaptcha() {
    const chars = '0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    currentCaptcha = captcha;
    captchaText.textContent = captcha;

    // Clear input field on refresh
    captchaInput.value = '';
    updateButtonState();

    // Add animation class
    refreshButton.classList.add('rotating');
    setTimeout(() => {
        refreshButton.classList.remove('rotating');
    }, 300);

    if (!agreeCheckbox.checked) {
        captchaInput.disabled = true;
    }
}

function showPopup(id) {
    document.getElementById(id).classList.add('show');
}

function closePopup(id) {
    document.getElementById(id).classList.remove('show');
    if (id === 'success-popup') {
        window.location.href = 'regi.html';
    }
}

function handleSuccessfulVerification() {
    showPopup('success-popup');
    captchaInput.value = '';
    // Auto redirect after 3 seconds
    redirectTimer = setTimeout(() => {
        window.location.href = 'regi.html';
    }, 3000);
}

function updateButtonState() {
    const isVerified = captchaInput.value === currentCaptcha;
    if (agreeCheckbox.checked) {
        captchaInput.disabled = false;
        warningMessage.style.display = 'none';
        if (isVerified) {
            handleSuccessfulVerification();
        } else if (captchaInput.value && captchaInput.value.length === currentCaptcha.length) {
            showPopup('error-popup');
            captchaInput.value = '';
            generateCaptcha();
        }
    } else {
        captchaInput.disabled = true;
        warningMessage.style.display = 'block';
    }
}

function toggleCaptchaInput() {
    captchaInput.disabled = !agreeCheckbox.checked;
    if (!agreeCheckbox.checked) {
        captchaInput.value = '';
    }
}

captchaInput.addEventListener('focus', () => {
    if (!agreeCheckbox.checked) {
        warningMessage.classList.add('show');
        setTimeout(() => {
            warningMessage.classList.remove('show');
        }, 3000);
    }
});

agreeCheckbox.addEventListener('change', () => {
    toggleCaptchaInput();
    warningMessage.classList.remove('show');
});

// Event Listeners
agreeCheckbox.addEventListener('change', updateButtonState);
captchaInput.addEventListener('input', (e) => {
    if (e.target.value.length === currentCaptcha.length) {
        updateButtonState();
    }
});
refreshButton.addEventListener('click', generateCaptcha);

// Add tooltip event listeners
refreshButton.addEventListener('mouseover', () => {
    refreshButton.setAttribute('title', 'Click to generate new code');
});

// Add keyboard accessibility
refreshButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        generateCaptcha();
    }
});

// Add keyboard event listener for Enter key
captchaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && captchaInput.value === currentCaptcha && agreeCheckbox.checked) {
        e.preventDefault();
        handleSuccessfulVerification();
    }
});

// Clean up timer when popup is manually closed
document.querySelectorAll('.popup-button').forEach(button => {
    button.addEventListener('click', () => {
        clearTimeout(redirectTimer);
    });
});

// Make continue button active by default
continueButton.disabled = false;
continueButton.classList.add('active');

continueButton.addEventListener('click', function () {
    if (agreeCheckbox.checked && captchaInput.value === currentCaptcha) {
        window.location.href = 'regi.html';
    }
});

// Initialize the input state
toggleCaptchaInput();

// Generate initial captcha
generateCaptcha();
