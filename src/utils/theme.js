// Theme utility functions

const updateRandomBackgroundColor = () => {
  const root = document.documentElement;
  const backgroundColor = getComputedStyle(root).getPropertyValue('--background-color');
  root.style.setProperty('--random-bg-color', backgroundColor);
};

// Update background color when theme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', updateRandomBackgroundColor);

// Initial background color setup
document.addEventListener('DOMContentLoaded', updateRandomBackgroundColor);

export { updateRandomBackgroundColor };