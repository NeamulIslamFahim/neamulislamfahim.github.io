document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li a');

    // Smooth scrolling with a fixed-header offset.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            e.preventDefault();

            const offset = header ? header.offsetHeight + 16 : 0;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        });
    });

    const scrollTopBtn = document.createElement('a');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.setAttribute('href', '#home');
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.textContent = '↑';
    document.body.appendChild(scrollTopBtn);

    const setScrollTopState = () => {
        scrollTopBtn.classList.toggle('is-visible', window.scrollY > 320);
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', setScrollTopState, { passive: true });
    setScrollTopState();

    // Animate elements on scroll.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    document.querySelectorAll('.animated').forEach(element => {
        observer.observe(element);
    });

    // Burger menu toggle.
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });

    // 3D tilt effect for hero and portrait cards.
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        const reset = () => {
            card.style.transform = '';
        };

        card.addEventListener('mousemove', (event) => {
            const rect = card.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rotateY = ((x / rect.width) - 0.5) * 10;
            const rotateX = ((0.5 - y / rect.height)) * 10;

            card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', reset);
        card.addEventListener('blur', reset);
    });
});
