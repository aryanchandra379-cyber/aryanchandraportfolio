const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. Typing Effect in Hero Section
const roles = ["modern websites.", "responsive web apps.", "clean user interfaces."];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing');

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        speed = 1800; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}
typeEffect();

// 3. Active Navigation Highlight on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("n0wOheLb8CY6_vHDe"); // Yahan apni EmailJS Public Key dalein
})();

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    formStatus.textContent = "Sending message...";

    // Yahan apna Service ID aur Template ID dalein
    emailjs.sendForm('service_oufhyn8', 'template_c30jsls', this)
        .then(() => {
            formStatus.textContent = "Thanks! Your message has been sent to my inbox.";
            contactForm.reset();
            setTimeout(() => {
                formStatus.textContent = '';
            }, 5000);
        }, (error) => {
            formStatus.textContent = "Oops! Something went wrong. Please try again.";
            console.error('FAILED...', error);
        });
});