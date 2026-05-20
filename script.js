/* =========================================================================
   100-CRORE PACKAGE: JAVASCRIPT ANIMATIONS & OBSERVERS
   ========================================================================= */

// DOM Elements
const cursorDot = document.getElementById("cursor-dot");
const cursorRing = document.getElementById("cursor-ring");
const loaderWrap = document.getElementById("preloader");
const loaderFill = document.getElementById("loader-fill");
const loaderPct = document.getElementById("loader-pct");
const marqueeTrack = document.getElementById("marquee-engine");

// 1. PRELOADER & PERCENTAGE CALCULATION
document.addEventListener("DOMContentLoaded", () => {
    let progress = 0;
    const loadingSpeed = 25; // ms interval

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 2; // Add random chunk
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Allow minimal delay for UX effect
            setTimeout(() => {
                loaderWrap.classList.add("complete");
                triggerScrollReveals(); // Trigger initial view animations
            }, 500);
        }
        
        loaderFill.style.width = `${progress}%`;
        loaderPct.innerText = `${progress}%`;
    }, loadingSpeed);
});

// 2. CUSTOM TRACING CURSOR
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows immediately
    if(cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }
});

// Ring follows with easing using RequestAnimationFrame
function animateCursorRing() {
    // Easing coefficient 
    let easing = 0.15;
    ringX += (mouseX - ringX) * easing;
    ringY += (mouseY - ringY) * easing;
    
    if(cursorRing) {
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
    }
    
    requestAnimationFrame(animateCursorRing);
}
animateCursorRing();

// Inject cursor hover states dynamically
const interactiveTags = document.querySelectorAll("a, button, .card, .btn");
interactiveTags.forEach((el) => {
    el.addEventListener("mouseenter", () => {
        cursorDot.classList.add("hovered");
        cursorRing.classList.add("hovered");
    });
    el.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("hovered");
        cursorRing.classList.remove("hovered");
    });
});

// 3. MARQUEE CONTENT ENGINE
const marqueeItems = [
    "Agentic AI Implementation",
    "Healthcare Intelligence",
    "CVS Health & Aetna",
    "HEDIS / CMS Star Frameworks",
    "Financial Pattern Recognition",
    "Scalable Machine Learning",
    "Full Stack Architecture"
];

function buildMarquee() {
    if(!marqueeTrack) return;
    let trackHTML = "";
    
    // Triple loop to ensure seamless infinite width spanning
    for (let i = 0; i < 4; i++) {
        marqueeItems.forEach(item => {
            trackHTML += `
                <div class="marquee-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    ${item}
                </div>
            `;
        });
    }
    
    marqueeTrack.innerHTML = trackHTML;
}
buildMarquee();

// 4. INTERSECTION OBSERVER FOR SCROLL REVEALS
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Unobserve once animated
        }
    });
}, observerOptions);

function triggerScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => {
        observer.observe(el);
    });
}
