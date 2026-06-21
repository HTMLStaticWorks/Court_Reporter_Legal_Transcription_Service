// main.js - Core functionality

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');
  const navbar    = document.querySelector('.navbar');

  // ── Inject close button + mobile action row ────────────
  if (navLinks) {
    // Close × button (only once)
    if (!navLinks.querySelector('.nav-close-btn')) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'nav-close-btn';
      closeBtn.setAttribute('aria-label', 'Close menu');
      closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      navLinks.insertBefore(closeBtn, navLinks.firstChild);
      closeBtn.addEventListener('click', closeMenu);
    }

    // Mobile actions: dark mode, RTL, Sign Up — cloned from desktop
    if (!navLinks.querySelector('.mobile-nav-actions')) {
      const desktopActions = document.querySelector('.nav-actions');
      if (desktopActions) {
        const li = document.createElement('li');
        li.className = 'mobile-nav-actions';

        const utilsDiv = document.createElement('div');
        utilsDiv.className = 'mobile-nav-utilities';

        const darkToggle = desktopActions.querySelector('#dark-mode-toggle');
        const rtlToggle = desktopActions.querySelector('#rtl-toggle');

        if (darkToggle) {
          const darkClone = darkToggle.cloneNode(true);
          darkClone.removeAttribute('id');
          darkClone.dataset.role = 'dark-toggle-mobile';
          darkClone.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.toggle('dark-mode');
            updateAllDarkIcons();
          });
          utilsDiv.appendChild(darkClone);
        }

        if (rtlToggle) {
          const rtlClone = rtlToggle.cloneNode(true);
          rtlClone.removeAttribute('id');
          rtlClone.dataset.role = 'rtl-toggle-mobile';
          rtlClone.addEventListener('click', (e) => {
            e.preventDefault();
            const cur = document.body.getAttribute('dir');
            document.body.setAttribute('dir', cur === 'rtl' ? 'ltr' : 'rtl');
          });
          utilsDiv.appendChild(rtlClone);
        }

        li.appendChild(utilsDiv);

        const signupBtn = desktopActions.querySelector('.btn');
        if (signupBtn) {
          const signupClone = signupBtn.cloneNode(true);
          li.appendChild(signupClone);
        }

        navLinks.appendChild(li);
      }
    }
  }

  function openMenu() {
    if (!navLinks) return;
    navLinks.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  function updateAllDarkIcons() {
    const isDark = document.body.classList.contains('dark-mode');
    document.querySelectorAll('[data-role="dark-toggle-mobile"] i, #dark-mode-toggle i').forEach(icon => {
      icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
  }

  // ── Hamburger toggle ──────────────────────────────────
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.contains('active') ? closeMenu() : openMenu();
    });
  }

  // Close when clicking outside overlay
  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
      if (!navLinks.contains(e.target) && e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
        closeMenu();
      }
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ── Dropdown Menu Toggle ──────────────────────────────
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link     = item.querySelector('a:first-child');
    const dropdown = item.querySelector('.dropdown-menu');
    if (link && dropdown) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        document.querySelectorAll('.dropdown-menu.active').forEach(other => {
          if (other !== dropdown) {
            other.classList.remove('active');
          }
        });
        dropdown.classList.toggle('active');
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item')) {
      document.querySelectorAll('.dropdown-menu.active').forEach(d => d.classList.remove('active'));
    }
  });

  // ── Dark Mode Toggle (desktop) ────────────────────────
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    const updateIcon = () => {
      const icon = darkModeToggle.querySelector('i');
      if (icon) {
        icon.className = document.body.classList.contains('dark-mode')
          ? 'fa-solid fa-sun'
          : 'fa-solid fa-moon';
      }
    };
    updateIcon();
    darkModeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('dark-mode');
      updateIcon();
      updateAllDarkIcons();
    });
  }

  // ── RTL Toggle (desktop) ──────────────────────────────
  const rtlToggle = document.getElementById('rtl-toggle');
  if (rtlToggle) {
    rtlToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const currentDir = document.body.getAttribute('dir');
      document.body.setAttribute('dir', currentDir === 'rtl' ? 'ltr' : 'rtl');
    });
  }

  // ── Navbar Scroll Effect ──────────────────────────────
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ── Scroll to Top Button ──────────────────────────────
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Password Visibility Toggle ────────────────────────
  const toggleButtons = document.querySelectorAll('.password-toggle-btn');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const container = btn.closest('.password-toggle-container');
      if (container) {
        const input = container.querySelector('input');
        const icon  = btn.querySelector('i');
        if (input && icon) {
          if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
          } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
          }
        }
      }
    });
  });
});
