// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile nav when a link is clicked
document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Animated counters
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return;
    
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
    
    countersAnimated = true;
}

// Intersection Observer for stats animation
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.classList.contains('stats-section')) {
            animateCounters();
        }
    });
}, observerOptions);

// Observe stats section for animation
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Smooth entrance animations for cards
function addCardAnimations() {
    const cards = document.querySelectorAll('.testimonial-card');
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => cardObserver.observe(card));
}

// Smart video initialization
function initializeVideos() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Ensure proper attributes
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.muted = true;
        video.playsInline = true;
        
        // Use Intersection Observer to play when visible
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {
                        // If autoplay fails, try on user interaction
                        const playOnInteraction = () => {
                            video.play().catch(() => {});
                            document.removeEventListener('touchstart', playOnInteraction);
                            document.removeEventListener('click', playOnInteraction);
                        };
                        
                        document.addEventListener('touchstart', playOnInteraction, { once: true });
                        document.addEventListener('click', playOnInteraction, { once: true });
                    });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.3 });
        
        videoObserver.observe(video);
    });
}

// Prevent auto-scroll on page load
if (window.location.hash) {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 1);
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    initializeVideos();
    addCardAnimations();
});
