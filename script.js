/* ============================================================
   PEERATUT WARITUM — Portfolio JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ---- Mobile hamburger ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ---- Active nav link highlight ---- */
  // Nav active state is set directly in HTML via .nav-active class per page


  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll(
    '.about-card, .skill-category, .project-card, .contact-card, .proficiency-item, .timeline-item, .cert-card, .activity-card'
  );

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---- Animate proficiency bars ---- */
  const bars = document.querySelectorAll('.prof-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const width = e.target.getAttribute('data-width');
        e.target.style.width = width + '%';
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => barObserver.observe(bar));

  /* ---- Smooth section scroll with offset ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---- Typing cursor effect on hero tagline (subtle) ---- */
  const tagline = document.querySelector('.hero-tagline');
  if (tagline) {
    tagline.style.opacity = '0';
    tagline.style.transform = 'translateY(16px)';
    tagline.style.transition = 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        tagline.style.opacity = '1';
        tagline.style.transform = 'none';
      });
    });
  }

  /* ---- Hero content stagger animation ---- */
  const heroEls = [
    '.hero-badge',
    '.hero-name',
    '.hero-tagline',
    '.hero-roles',
    '.hero-actions',
    '.hero-stats',
  ];

  heroEls.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    });
  });

  /* ---- Code card reveal ---- */
  const codeCard = document.querySelector('.code-card');
  if (codeCard) {
    codeCard.style.opacity = '0';
    codeCard.style.transform = 'translateX(30px)';
    codeCard.style.transition = 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        codeCard.style.opacity = '1';
        codeCard.style.transform = 'none';
      });
    });
  }

  /* ---- Image Lightbox (Zoom) ---- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const zoomableImages = document.querySelectorAll('.zoomable-img');

  if (lightbox && lightboxImg && lightboxClose) {
    zoomableImages.forEach(img => {
      img.addEventListener('click', (e) => {
        // Prevent default behavior if it's in a link
        e.preventDefault();
        lightbox.classList.add('show');
        lightboxImg.src = img.src;
        // Optionally lock body scroll
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('show');
      document.body.style.overflow = 'auto'; // restore scroll
    };

    lightboxClose.addEventListener('click', closeLightbox);

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
      }
    });
  }

});
