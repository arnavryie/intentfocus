document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SCROLL REVEAL (MOTION BLUR) ---
    const revealElements = document.querySelectorAll('.reveal-text, .scroll-trigger');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach((el) => revealObserver.observe(el));

    // Force trigger hero elements instantly
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-text').forEach(el => el.classList.add('visible'));
    }, 100);

    // --- 2. 3D MOUSE TILT EFFECT ---
    const container = document.getElementById('tilt-container');
    const element = document.getElementById('tilt-element');
    const sheen = document.querySelector('.sheen');

    if (container && element) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation (center is 0,0)
            const xPct = x / rect.width - 0.5;
            const yPct = y / rect.height - 0.5;

            // Max rotation degrees
            const rotateX = yPct * -10; // Tilt up/down
            const rotateY = xPct * 10;  // Tilt left/right

            element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Move sheen for reflection effect
            sheen.style.opacity = 0.5 + Math.abs(xPct);
            sheen.style.background = `linear-gradient(${120 + (xPct * 50)}deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)`;
        });

        // Reset when mouse leaves
        container.addEventListener('mouseleave', () => {
            element.style.transform = `rotateX(0deg) rotateY(0deg)`;
            sheen.style.opacity = 0;
        });
    }
});