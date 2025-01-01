console.log('Language switcher script loaded');

document.addEventListener('DOMContentLoaded', function() {
  const langButton = document.querySelector('.nav-button-language-select');
  const langDropdown = document.querySelector('.nav-button-language-dropdown');
  
  // Toggle dropdown when clicking the language button
  if (langButton && langDropdown) {
    langButton.addEventListener('click', function(e) {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-button-language')) {
        langDropdown.classList.remove('show');
      }
    });
  }
  
  // Language switching function
  window.changeLang = function(targetLang) {
    if (!targetLang) return;
    
    const currentPath = window.location.pathname;
    const defaultLang = GLOBAL_CONFIG_SITE.language?.default || 'en';
    
    // Get current language from URL
    const langMatch = currentPath.match(/^\/([a-z]{2}(-[A-Z]{2})?)(\/|$)/);
    const currentLang = langMatch ? langMatch[1] : defaultLang;
    
    if (currentLang === targetLang) return;
    
    // Remove current language prefix if exists
    let newPath = currentPath.replace(new RegExp(`^/${currentLang}`), '');
    
    // Add new language prefix if not default language
    if (targetLang !== defaultLang) {
      newPath = `/${targetLang}${newPath}`;
    }
    
    // Ensure we have a trailing slash
    if (!newPath.endsWith('/')) newPath += '/';
    
    window.location.href = newPath;
  };
  
  // Highlight current language in dropdown
  const currentLangItems = document.querySelectorAll('.nav-button-language-item');
  currentLangItems.forEach(item => {
    if (item.dataset.lang === (window.GLOBAL_CONFIG_SITE.language?.default || 'en')) {
      item.classList.add('active');
    }
  });
});