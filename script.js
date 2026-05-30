// Initialize Three.js Scene
const canvas = document.getElementById('canvas3d');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
camera.position.z = 30;

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 500;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i += 3) {
    posArray[i] = (Math.random() - 0.5) * 100;
    posArray[i + 1] = (Math.random() - 0.5) * 100;
    posArray[i + 2] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.5,
    color: 0x667eea,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animate particles
function animateParticles() {
    particles.rotation.x += 0.0002;
    particles.rotation.y += 0.0003;

    // Mouse interaction
    particles.rotation.x += mouseY * 0.0005;
    particles.rotation.y += mouseX * 0.0005;

    renderer.render(scene, camera);
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll reveal animations
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

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Smooth scroll behavior for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #667eea, #f093fb)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 2 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 12, 41, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 12, 41, 0.7)';
    }
});

// Add hover effects to cards
document.querySelectorAll('.project-card, .hobby-card, .skill-category').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 50px rgba(102, 126, 234, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Skill bar animation on scroll
const skillBars = document.querySelectorAll('.skill-progress');
let hasAnimated = false;

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            hasAnimated = true;
        }
    });
}, { threshold: 0.5 });

document.querySelector('.skills') && skillObserver.observe(document.querySelector('.skills'));

// Parallax effect on hero section
window.addEventListener('scroll', () => {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        const scrollY = window.scrollY;
        heroVisual.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
});

// Add glow effect to gradient text on hover
document.querySelectorAll('.hero-title').forEach(title => {
    title.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 20px rgba(102, 126, 234, 0.5))';
    });
    
    title.addEventListener('mouseleave', function() {
        this.style.filter = 'drop-shadow(0 0 0px rgba(102, 126, 234, 0))';
    });
});

// Animate numbers in stat cards
const statCards = document.querySelectorAll('.stat-card h3');
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3 = entry.target.querySelector('h3');
            const text = h3.textContent;
            const value = parseFloat(text);
            if (!isNaN(value)) {
                animateValue(h3, 0, value, 1500);
            }
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => {
    const statCard = card.closest('.stat-card');
    if (statCard) {
        statObserver.observe(statCard);
    }
});

// Add fade-in animation to images and icons
document.querySelectorAll('.project-icon, .hobby-card i').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s forwards`;
});

// Floating animation for hero card
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { 
            transform: translateY(0px) rotateX(0deg) rotateY(0deg);
        }
        50% { 
            transform: translateY(-20px) rotateX(5deg) rotateY(5deg);
        }
    }
`;
document.head.appendChild(style);

console.log('Portfolio loaded successfully! 🚀');
