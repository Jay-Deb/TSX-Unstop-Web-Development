document.addEventListener("DOMContentLoaded", () => {
  // 1. Animate sections on scroll (fade-in)
  const sections = document.querySelectorAll(".fade-in");

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target); // Animate once
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));
  } else {
    // Fallback
    const reveal = () => {
      sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          section.classList.add("show");
        }
      });
    };
    window.addEventListener("scroll", reveal);
    window.addEventListener("load", reveal);
  }

  // 2. Smooth scroll to center of section on menu item click
  document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });

        // Auto-close mobile menu
        const navLinks = document.getElementById('nav-links');
        if (navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
        }
      }
    });
  });

  // 3. Hamburger menu toggle
  window.toggleMenu = function () {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("show");
  };
});

