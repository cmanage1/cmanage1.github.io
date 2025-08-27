// Early theme application to avoid flash
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

// After DOM is ready
window.addEventListener('DOMContentLoaded', function() {
  // Theme toggle wiring
  var btn = document.querySelector('.theme-toggle');
  if (btn) {
    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      try { localStorage.setItem('theme', theme); } catch(e) {}
      var label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);
    }
    btn.addEventListener('click', function() {
      var current = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
    try {
      if (!localStorage.getItem('theme') && window.matchMedia) {
        var media = window.matchMedia('(prefers-color-scheme: dark)');
        media.addEventListener('change', function(e) { setTheme(e.matches ? 'dark' : 'light'); });
      }
    } catch(e) {}
  }

  // Copy email handler
  var copyBtn = document.querySelector('.copy-email');
  if (copyBtn && navigator.clipboard) {
    copyBtn.addEventListener('click', function() {
      var email = copyBtn.getAttribute('data-email');
      navigator.clipboard.writeText(email).then(function(){
        var prev = copyBtn.title;
        copyBtn.title = 'Copied!';
        copyBtn.setAttribute('aria-label', 'Copied');
        copyBtn.classList.add('copied');
        setTimeout(function(){
          copyBtn.title = prev || 'Copy email';
          copyBtn.setAttribute('aria-label', 'Copy email');
          copyBtn.classList.remove('copied');
        }, 1200);
      }).catch(function(){});
    });
  }
});


