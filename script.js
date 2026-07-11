(function () {
  'use strict';

  const html = document.documentElement;
  const toggle = document.getElementById('dark-toggle');

  function setTheme(isDark) {
    html.classList.toggle('light', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  const stored = localStorage.getItem('theme');
  if (stored) {
    setTheme(stored === 'dark');
  } else {
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      setTheme(html.classList.contains('light'));
    });
  }

  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
      menuToggle.innerHTML = expanded
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></svg>';
      });
    });
  }

  gsap.registerPlugin(ScrollTrigger);

  const header = document.getElementById('header');
  if (header) {
    ScrollTrigger.create({
      start: 'top -60',
      onEnter: function () { header.classList.add('scrolled'); },
      onLeaveBack: function () { header.classList.remove('scrolled'); },
    });
  }

  const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTimeline
    .from('.hero-badge', { y: 20, opacity: 0, duration: 0.6 })
    .from('.hero h1', { y: 30, opacity: 0, duration: 0.8 }, '-=0.3')
    .from('.hero p', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.hero-links', { y: 20, opacity: 0, duration: 0.6 }, '-=0.3')
    .from('.hero-avatar', { scale: 0.8, opacity: 0, duration: 0.8 }, '-=0.6');

  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '.projects-row',
      start: 'top 85%',
    },
    y: 40,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'power2.out',
  });

  gsap.from('.contact-card', {
    scrollTrigger: {
      trigger: '.contact-card',
      start: 'top 85%',
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    ease: 'power2.out',
  });

  gsap.utils.toArray('.section-title').forEach(function (el) {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  });

})();
