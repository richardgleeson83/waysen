/* =====================================================
   WAYSEN LTD — Main JavaScript
   ===================================================== */

(function () {
  'use strict';

  /* --- NAV SCROLL BEHAVIOUR --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const updateNav = () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* --- MOBILE HAMBURGER --- */
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* --- INTERSECTION OBSERVER (FADE UP) --- */
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('in-view'));
  }

  /* --- SMOOTH SCROLL FOR ANCHOR LINKS --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --- CONTACT FORM SUBMISSION --- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const successMsg = document.getElementById('form-success');
    const errorMsg   = document.getElementById('form-error');
    const submitBtn  = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg)   errorMsg.style.display   = 'none';

      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const formAction = contactForm.getAttribute('action') || 'php/contact.php';
        const response = await fetch(formAction, {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          if (successMsg) successMsg.style.display = 'block';
          contactForm.reset();
        } else {
          if (errorMsg) {
            errorMsg.textContent = result.message || 'Something went wrong. Please try again.';
            errorMsg.style.display = 'block';
          }
        }
      } catch (err) {
        if (errorMsg) {
          errorMsg.textContent = 'Network error. Please email us directly at martin@waysen.co.uk';
          errorMsg.style.display = 'block';
        }
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

})();
