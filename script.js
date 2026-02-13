// Set footer year automatically.
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle logic.
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('show');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu after selecting a section.
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll-triggered reveal animation observer.
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Animated skill bars when section is visible.
const skillsSection = document.querySelector('#skills');
const skillFills = document.querySelectorAll('.bar i');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillFills.forEach((bar) => {
          bar.style.width = `${bar.dataset.level}%`;
        });
        skillsAnimated = true;
      }
    });
  },
  { threshold: 0.35 }
);

skillsObserver.observe(skillsSection);

// Active navigation state while scrolling.
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navAnchors.forEach((anchor) => {
        anchor.classList.toggle('active', anchor.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  },
  { threshold: 0.45 }
);

sections.forEach((section) => sectionObserver.observe(section));

// Parallax movement on scroll for background layers.
const bgOne = document.querySelector('.bg-layer-one');
const bgTwo = document.querySelector('.bg-layer-two');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  bgOne.style.transform = `translateY(${y * 0.05}px)`;
  bgTwo.style.transform = `translateY(${y * 0.09}px)`;
});

// Theme toggle with persistence.
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('theme-mode');

if (storedTheme === 'light') {
  document.body.classList.add('light');
  themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('light', themeToggle.checked);
  localStorage.setItem('theme-mode', themeToggle.checked ? 'light' : 'dark');
});
