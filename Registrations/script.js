const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    }
});

const form = document.getElementById('registrationForm');
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbx6cL1fHFuIKK_X-2cL7tzdxN0m4_h8S5goFZ-dQ9o5aO3CPha0xXg8wd_Zbch5tGc/exec'; // Replace with your Google Sheets Web App URL

function handleSubmit(event) {
    event.preventDefault();

    // Show loader
    document.querySelector('.loader-container').style.display = 'flex';

    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(() => {
            // Hide loader
            document.querySelector('.loader-container').style.display = 'none';

            // Show success animation
            document.querySelector('.overlay').style.display = 'block';
            document.querySelector('.success-animation').style.display = 'flex';

            // Reset form
            form.reset();

            // Hide success animation after 3 seconds
            setTimeout(() => {
                document.querySelector('.overlay').style.display = 'none';
                document.querySelector('.success-animation').style.display = 'none';
            }, 3000);
        })
        .catch(error => {
            // Hide loader
            document.querySelector('.loader-container').style.display = 'none';
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again.');
        });

    return false;
}
