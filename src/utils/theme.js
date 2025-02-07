// Theme utility functions

const lightColors = ['#D2F5D6', '#ED7936', '#8E93EB', '#ED4584', '#F6C288', '#6CEDEE', '#FD74F1'];
const darkColors = ['#300F31', '#214D88', '#9A281E', '#5EC795', '#4899D1', '#848046', '#5F9D41'];

const getRandomColor = (colors) => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const updateRandomBackgroundColor = () => {
  const root = document.documentElement;
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const randomColor = getRandomColor(isDarkMode ? darkColors : lightColors);
  root.style.setProperty('--random-bg-color', randomColor);
  root.style.setProperty('--primary-color', randomColor);
};

// Update background color when theme changes
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
mediaQuery.addEventListener('change', updateRandomBackgroundColor);

// Initial background color setup
updateRandomBackgroundColor();

export { updateRandomBackgroundColor };