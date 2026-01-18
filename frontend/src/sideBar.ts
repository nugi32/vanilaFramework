const navToggle = document.getElementById('navToggle');
const sideNav = document.getElementById('sideNav');
const overlay = document.getElementById('overlay');
const navClose = document.getElementById('navClose');

if (!navToggle || !sideNav || !overlay || !navClose) {
  console.warn('Navigation elements not found');
} else {

  function openNav(
    sideNav: HTMLElement,
    overlay: HTMLElement,
    navToggle: HTMLElement
  ): void {
    sideNav.classList.add('open');
    overlay.classList.add('visible');
    navToggle.setAttribute('aria-expanded', 'true');
    sideNav.setAttribute('aria-hidden', 'false');
  }

  function closeNav(
    sideNav: HTMLElement,
    overlay: HTMLElement,
    navToggle: HTMLElement
  ): void {
    sideNav.classList.remove('open');
    overlay.classList.remove('visible');
    navToggle.setAttribute('aria-expanded', 'false');
    sideNav.setAttribute('aria-hidden', 'true');
  }

  navToggle.addEventListener('click', () => {
    if (sideNav.classList.contains('open')) {
      closeNav(sideNav, overlay, navToggle);
    } else {
      openNav(sideNav, overlay, navToggle);
    }
  });

  navClose.addEventListener('click', () =>
    closeNav(sideNav, overlay, navToggle)
  );

  overlay.addEventListener('click', () =>
    closeNav(sideNav, overlay, navToggle)
  );

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeNav(sideNav, overlay, navToggle);
    }
  });

  document.addEventListener('click', (e: MouseEvent) => {
    if (!sideNav.classList.contains('open')) return;

    const target = e.target as Node | null;
    if (!target) return;

    if (!sideNav.contains(target) && !navToggle.contains(target)) {
      closeNav(sideNav, overlay, navToggle);
    }
  });
}
