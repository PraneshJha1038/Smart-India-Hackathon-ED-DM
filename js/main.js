// Scroll Animations for all elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                // If you want animations to repeat when scrolling back up, uncomment this line:
                // entry.target.classList.remove('show');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // ===========================
    // Hero Typewriter + Paragraph + Button Fade-In
    // ===========================
    const heading = document.getElementById('hero-heading');
    const subtext = document.getElementById('hero-subtext');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    const text = heading.textContent;
    heading.textContent = ''; // clear text for typing effect

    let i = 0;
    const speed = 100; // milliseconds per letter

    function typeWriter() {
        if (i < text.length) {
            heading.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Fade in paragraph after heading finishes
            subtext.style.opacity = 0;
            subtext.style.display = 'block';
            subtext.style.transition = 'opacity 1s ease-in';
            setTimeout(() => {
                subtext.style.opacity = 1;

                // Fade in hero buttons after paragraph appears
                heroButtons.forEach((btn, index) => {
                    btn.style.opacity = 0;
                    btn.style.transition = `opacity 0.8s ease ${index * 0.3}s`;
                    setTimeout(() => {
                        btn.style.opacity = 1;
                    }, 100);
                });
            }, 100);
        }
    }

    typeWriter();
});
