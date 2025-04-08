document.getElementById('registrationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        regNo: document.getElementById('regNo').value,
        university: document.getElementById('university').value,
        email: document.getElementById('email').value,
        contact: document.getElementById('contact').value,
        yearOfStudy: document.getElementById('yearOfStudy').value,
        address: document.getElementById('address').value,
        pincode: document.getElementById('pincode').value,
        city: document.getElementById('city').value,
        skills: document.getElementById('skills').value
    };

    try {
        // Replace with your Google Apps Script deployment URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwXRfq6RI_Ob3M7-nV6UMc-eJnrpndWycz2fOYkHEKZIZWdAHtxt-Gza5MttW6aNbe80A/exec';

        const response = await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        alert('Registration submitted successfully! We will contact you soon with further details.');
        document.getElementById('registrationForm').reset();
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }

    // Show overlay and success animation
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.success-animation').style.display = 'block';

    // Hide animation and overlay after 3 seconds
    setTimeout(() => {
        document.querySelector('.overlay').style.display = 'none';
        document.querySelector('.success-animation').style.display = 'none';

        // Optional: Reset form
        this.reset();
    }, 3000);
});

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
