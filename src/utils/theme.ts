// Utilitário simples para tema
export const toggleTheme = () => {
  const html = document.documentElement;
  const currentTheme = html.classList.contains('light') ? 'light' : 'dark';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.classList.remove('light', 'dark');
  html.classList.add(newTheme);
  
  // Salvar preferência no localStorage
  localStorage.setItem('theme', newTheme);
  
  return newTheme;
};

export const initTheme = () => {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    html.classList.add(savedTheme);
  } else {
    // Detectar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDark ? 'dark' : 'light';
    html.classList.add(defaultTheme);
    localStorage.setItem('theme', defaultTheme);
  }
};

export const getCurrentTheme = (): 'light' | 'dark' => {
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
};