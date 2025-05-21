const toggleDarkMode = () => {
  const body = document.getElementById('main-body');
  const btn = document.getElementById('darkModeBtn');

  const isLight = body.classList.contains('light');

  if (isLight) {
    // Switch to dark mode
    body.classList.remove('light');
    btn.textContent = '🌗';
    localStorage.setItem('theme', 'dark');
  } else {
    // Switch to light mode
    body.classList.add('light');
    btn.textContent = '🌞';
    localStorage.setItem('theme', 'light');
  }
};

// Apply saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const body = document.getElementById('main-body');
  const btn = document.getElementById('darkModeBtn');

  if (savedTheme === 'light') {
    body.classList.add('light');
    btn.textContent = '🌞';
  } else {
    body.classList.remove('light');
    btn.textContent = '🌗';
  }
});
