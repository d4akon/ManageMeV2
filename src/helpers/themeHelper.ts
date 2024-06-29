document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('theme-toggle') as HTMLInputElement;

  if (!toggle) {
    console.error('Element toggle nie został znaleziony');
    return;
  }

  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  });
});
