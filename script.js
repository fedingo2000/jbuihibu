gsap.registerPlugin(ScrollTrigger);

document.getElementById('year').textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  const lenis = new Lenis({
    duration: 1.08,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.2
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  const introTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  introTl
    .to('.hero h1 .line span', { y: 0, duration: 1.25, stagger: .11, delay: .25 })
    .from('.reveal-text', { y: 18, opacity: 0, duration: .75, stagger: .1 }, '-=.6');

  gsap.to('.hero-media img', {
    scale: 1,
    duration: 2.4,
    ease: 'power2.out'
  });

  gsap.utils.toArray('.project').forEach((project) => {
    gsap.from(project, {
      y: 90,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: project, start: 'top 88%' }
    });
  });

  gsap.utils.toArray('.parallax-wrap').forEach((wrap) => {
    const img = wrap.querySelector('.parallax-img');
    gsap.fromTo(img,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  });

  gsap.from('.intro-title', {
    y: 70,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.intro', start: 'top 75%' }
  });

  gsap.from('.statement-text', {
    y: 90,
    opacity: 0,
    duration: 1.25,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.statement', start: 'top 68%' }
  });

  gsap.from('.about-heading, .about-copy', {
    y: 80,
    opacity: 0,
    duration: 1.1,
    stagger: .12,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.about', start: 'top 75%' }
  });
}

// Custom cursor on photography cards
const cursor = document.querySelector('.cursor');
const cards = [...document.querySelectorAll('.image-card')];

window.addEventListener('mousemove', (e) => {
  if (!cursor) return;
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => cursor?.classList.add('active'));
  card.addEventListener('mouseleave', () => cursor?.classList.remove('active'));
});

// Fullscreen lightbox
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxTitle = lightbox.querySelector('.lightbox-title');
const lightboxCount = lightbox.querySelector('.lightbox-count');
const closeButton = lightbox.querySelector('.lightbox-close');

function openLightbox(card, index) {
  const img = card.querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxTitle.textContent = card.dataset.title || '';
  lightboxCount.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

cards.forEach((card, index) => card.addEventListener('click', () => openLightbox(card, index)));
closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
