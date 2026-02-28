/* ============================================================
   DUMBO YACHT CLUB — JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* =====================
     Sticky Header Shadow
     ===================== */
  const header = document.getElementById('site-header');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* =====================
     Mobile Menu Toggle
     ===================== */
  const hamburger  = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when a link inside is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* =====================
     Active Nav Highlight
     ===================== */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentFile || (currentFile === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  /* =====================
     Scroll Fade-In
     ===================== */
  const fadeEls = document.querySelectorAll('.fade-in');

  if (fadeEls.length > 0) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );
      fadeEls.forEach(el => observer.observe(el));
    } else {
      // Fallback: show everything immediately
      fadeEls.forEach(el => el.classList.add('visible'));
    }
  }

  /* =====================
     Contact Form Validation
     ===================== */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const fields = [
      {
        id: 'name',
        errorId: 'name-error',
        message: 'Please enter your name.',
        validate: val => val.trim().length > 0
      },
      {
        id: 'email',
        errorId: 'email-error',
        message: 'Please enter a valid email address.',
        validate: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
      },
      {
        id: 'message',
        errorId: 'message-error',
        message: "Please tell us what you're working on.",
        validate: val => val.trim().length > 0
      }
    ];

    // Clear field error on input
    fields.forEach(({ id, errorId }) => {
      const input = document.getElementById(id);
      const errorEl = document.getElementById(errorId);
      if (!input || !errorEl) return;

      input.addEventListener('input', () => {
        input.classList.remove('error');
        errorEl.classList.remove('show');
      });
    });

    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      let isValid = true;

      fields.forEach(({ id, errorId, message, validate }) => {
        const input   = document.getElementById(id);
        const errorEl = document.getElementById(errorId);
        if (!input || !errorEl) return;

        if (!validate(input.value)) {
          input.classList.add('error');
          errorEl.textContent = message;
          errorEl.classList.add('show');
          if (isValid) {
            input.focus(); // focus first invalid field
            isValid = false;
          }
        } else {
          input.classList.remove('error');
          errorEl.classList.remove('show');
        }
      });

      if (isValid) {
        const successMsg = document.getElementById('form-success');
        if (successMsg) {
          contactForm.style.display = 'none';
          successMsg.classList.add('show');
          // Scroll to success message
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

})();
