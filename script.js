// Smooth scrolling for anchor links with easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50, // optional offset for sticky header
        behavior: 'smooth'
      });
    }
  });
});

// Intersection observer for fade-in sections with staggered effect
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('fade-in');
      }, index * 150); // stagger animation for multiple sections
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-section').forEach(section => {
  observer.observe(section);
});
const heroCanvas = document.getElementById('hero-canvas');
const hCtx = heroCanvas.getContext('2d');

function resizeHeroCanvas() {
  heroCanvas.width  = heroCanvas.offsetWidth;
  heroCanvas.height = heroCanvas.offsetHeight;
}
resizeHeroCanvas();
window.addEventListener('resize', resizeHeroCanvas);

const particles = Array.from({ length: 70 }, () => ({
  x:  Math.random() * heroCanvas.width,
  y:  Math.random() * heroCanvas.height,
  vx: (Math.random() - .5) * .45,
  vy: (Math.random() - .5) * .45,
  r:  Math.random() * 2 + .8
}));

function drawHeroParticles() {
  hCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > heroCanvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > heroCanvas.height) p.vy *= -1;
    hCtx.beginPath();
    hCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    hCtx.fillStyle = 'rgba(99,102,241,0.45)';
    hCtx.fill();
  });
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
      if (d < 120) {
        hCtx.beginPath();
        hCtx.moveTo(particles[i].x, particles[i].y);
        hCtx.lineTo(particles[j].x, particles[j].y);
        hCtx.strokeStyle = `rgba(99,102,241,${ 0.15 * (1 - d / 120) })`;
        hCtx.lineWidth = .7;
        hCtx.stroke();
      }
    }
  }
  requestAnimationFrame(drawHeroParticles);
}
drawHeroParticles();
