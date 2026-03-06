// SF/SF SALON — Presentation Navigation
// Shared by the-salon.html and session-1.html

const slides = document.querySelectorAll('.slide');
const navContainer = document.getElementById('navDots');
const progressBar = document.getElementById('progressBar');
const keyHint = document.getElementById('keyHint');

// Generate nav dots
slides.forEach((slide, i) => {
  const dot = document.createElement('div');
  dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
  dot.innerHTML = `<span class="nav-label">${slide.dataset.label || ''}</span>`;
  dot.addEventListener('click', () => {
    slide.scrollIntoView({ behavior: 'smooth' });
  });
  navContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.nav-dot');

// Intersection Observer for fade-in and active dot
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
      });
      const index = Array.from(slides).indexOf(entry.target);
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
      const progress = ((index + 1) / slides.length) * 100;
      progressBar.style.width = progress + '%';
      if (index > 0) keyHint.style.opacity = '0';
    }
  });
}, { threshold: 0.5 });

slides.forEach(slide => observer.observe(slide));

// Keyboard navigation
let currentSlide = 0;
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
    e.preventDefault();
    currentSlide = Math.min(currentSlide + 1, slides.length - 1);
    slides[currentSlide].scrollIntoView({ behavior: 'smooth' });
  } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
    e.preventDefault();
    currentSlide = Math.max(currentSlide - 1, 0);
    slides[currentSlide].scrollIntoView({ behavior: 'smooth' });
  }
});

// Track current slide from scroll
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      currentSlide = Array.from(slides).indexOf(entry.target);
    }
  });
}, { threshold: 0.5 });

slides.forEach(slide => scrollObserver.observe(slide));
