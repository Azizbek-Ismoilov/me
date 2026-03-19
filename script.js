// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => { preloader.remove(); }, 500);
        }, 1200);
    }
});

// Custom Cursor (Only on Desktop)
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if(window.innerWidth > 991 && cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effect
    const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .contact-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

// Navbar Toggle Mobile
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const mobileLinks = document.querySelectorAll('.nav-links a');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if(navLinks.classList.contains('active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            if(icon) {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });
    });
}

// Sticky Navbar & Back to top
const header = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }

    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Dark / Light Mode Toggle
const themeBtn = document.getElementById('theme-toggle');
let darkMode = localStorage.getItem('darkMode') !== 'disabled';

if (themeBtn) {
    const icon = themeBtn.querySelector('i');
    
    // Initial load
    if(!darkMode) {
        document.body.classList.add('light-mode');
        if(icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if(document.body.classList.contains('light-mode')){
            localStorage.setItem('darkMode', 'disabled');
            if(icon) icon.classList.replace('fa-moon', 'fa-sun');
            initParticles('#6366f1');
        } else {
            localStorage.setItem('darkMode', 'enabled');
            if(icon) icon.classList.replace('fa-sun', 'fa-moon');
            initParticles('#00ffcc');
        }
    });
}

// Typed.js Animation
if(document.querySelector('.typing') && window.Typed) {
    new Typed('.typing', {
        strings: ['Frontend Dasturchiman', 'UI/UX Dizaynerman', 'Freelancerman', 'Veb Kashfiyotchiman'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
}

// Particles.js Initialization
function initParticles(color) {
    if(window.particlesJS && document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": color },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": color,
                    "opacity": 0.3,
                    "width": 1
                },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
                    "push": { "particles_nb": 3 }
                }
            },
            "retina_detect": true
        });
    }
}
// Init particles a bit after load to ensure script is loaded
setTimeout(() => {
    initParticles(document.body.classList.contains('light-mode') ? '#6366f1' : '#00ffcc');
}, 500);

// Scroll Reveal & Active Links & Skill Bars
const revealElements = document.querySelectorAll('.scroll-reveal');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Skill bars animation
            if(entry.target.classList.contains('skills-col')) {
                const bars = entry.target.querySelectorAll('.skill-fill');
                bars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
            }
            
            // Circle skills animation
            if(entry.target.classList.contains('circle-skills')) {
                const circleProgress = entry.target.querySelectorAll('.circle .progress');
                const circleBoxes = entry.target.querySelectorAll('.circle');
                
                circleBoxes.forEach((box, idx) => {
                    let percent = box.getAttribute('data-percent');
                    if (percent && circleProgress[idx]) {
                        let offset = 283 - (283 * percent) / 100;
                        circleProgress[idx].style.strokeDashoffset = offset;
                    }
                });
            }
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => scrollObserver.observe(el));

// Stats counters
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

const startCounters = () => {
    if (!countersAnimated) {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / 50; 
                if(count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        countersAnimated = true;
    }
}

// Observe stats grid specifically
const statsGrid = document.querySelector('.stats-grid');
if(statsGrid) {
    const statsObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            startCounters();
        }
    }, { threshold: 0.5 });
    statsObserver.observe(statsGrid);
}

// Active Nav Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(a => {
        a.classList.remove('active');
        if(a.getAttribute('href') === `#${current}`) {
            a.classList.add('active');
        }
    });
});

// Portfolio Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // active class toggle
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        let filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if(filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Contact Form Submit Mock
const contactForm = document.getElementById('contactForm');
const toastMsg = document.querySelector('.toast-msg');

if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show btn loading state
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Yuborilmoqda... <i class="fa-solid fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            // reset form
            contactForm.reset();
            btn.innerHTML = originalText;
            
            // show toast
            if(toastMsg) {
                toastMsg.classList.add('show');
                setTimeout(() => toastMsg.classList.remove('show'), 3000);
            }
        }, 1500);
    });
}
