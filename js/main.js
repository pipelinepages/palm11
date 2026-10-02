// Palm 11 Energy - Main JS
document.addEventListener('DOMContentLoaded', function () {

  /* Mobile menu */
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
    menu.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => menu.classList.remove('open'))
    );
  }

  /* Sticky header */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () =>
      header.classList.toggle('scrolled', window.scrollY > 40)
    );
  }

  /* Project filters */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const cats = (card.dataset.category || '').split(/\s+/);
        card.style.display = (filter === 'all' || cats.includes(filter)) ? '' : 'none';
      });
    }));
  }

  /* Contact form (front-end demo handler) */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Enquiry Received ✓';
        form.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 2500);
      }, 900);
    });
  }

  /* Smooth scroll to hash (services anchors, Debojo anchor) */
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const [path, hash] = href.split('#');
      if (!hash) return;
      const samePage = !path || path === '' ||
        path === window.location.pathname.split('/').pop();
      if (!samePage) return;
      const target = document.getElementById(hash);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
        history.replaceState(null, '', '#' + hash);
      }
    });
  });

  /* Reveal on scroll for the energy-flow section */
  const revealEls = document.querySelectorAll('.energy-flow, .featured-project-image, .project-card');
  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1)';
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  }
});