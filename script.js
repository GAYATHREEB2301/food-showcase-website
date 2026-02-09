document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- Active Link Highlight ---
    // Automatically stick "active" class based on current URL
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });


    // --- Testimonial Slider (Only refers to reviews page usually, but check if element exists) ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length > 0) {
        let slideIndex = 0;

        const showSlide = (n) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            slideIndex = n;
            if (slideIndex >= slides.length) slideIndex = 0;
            if (slideIndex < 0) slideIndex = slides.length - 1;

            slides[slideIndex].classList.add('active');
            dots[slideIndex].classList.add('active');
        };

        // Auto play
        setInterval(() => {
            showSlide(slideIndex + 1);
        }, 5000);

        // Dot click
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
    }

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Simple validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            // Name
            if (name.value.trim() === '') {
                isValid = false;
                showError(name, 'Name is required');
            } else {
                clearError(name);
            }

            // Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                isValid = false;
                showError(email, 'Please enter a valid email');
            } else {
                clearError(email);
            }

            // Message
            if (message.value.trim() === '') {
                isValid = false;
                showError(message, 'Message cannot be empty');
            } else {
                clearError(message);
            }

            if (isValid) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        let errorDisplay = formGroup.querySelector('.error-msg');
        if (!errorDisplay) {
            errorDisplay = document.createElement('small');
            errorDisplay.className = 'error-msg';
            formGroup.appendChild(errorDisplay);
        }
        errorDisplay.innerText = message;
        errorDisplay.style.display = 'block';
        input.style.borderColor = '#d9534f';
    }

    function clearError(input) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-msg');
        if (errorDisplay) {
            errorDisplay.style.display = 'none';
        }
        input.style.borderColor = '#ddd';
    }

    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                updateIcon('light');
            } else {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                updateIcon('dark');
            }
        });
    }

    function updateIcon(theme) {
        if (themeToggleBtn) {
            if (theme === 'dark') {
                themeToggleBtn.innerHTML = '☀️';
                themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
            } else {
                themeToggleBtn.innerHTML = '🌙';
                themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    }
});
