(function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if(toggle && menu){
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // Close menu after click
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if(!menu.classList.contains('is-open')) return;
      const target = e.target;
      if(target === toggle || menu.contains(target)) return;
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Copy form link
  const copyBtn = document.getElementById('copyLink');
  const urlText = document.getElementById('formUrlText');
  const formLink = document.getElementById('googleFormLink');

  function getFormUrl(){
    if(formLink && formLink.getAttribute('href')) return formLink.getAttribute('href');
    if(urlText) return (urlText.textContent || '').trim();
    return '';
  }

  if(copyBtn){
    copyBtn.addEventListener('click', async () => {
      const url = getFormUrl();
      if(!url) return;
      try{
        await navigator.clipboard.writeText(url);
        const old = copyBtn.textContent;
        copyBtn.textContent = 'Link copiado!';
        copyBtn.disabled = true;
        setTimeout(() => { copyBtn.textContent = old; copyBtn.disabled = false; }, 1200);
      }catch(err){
        // Fallback: select text
        if(urlText){
          const range = document.createRange();
          range.selectNodeContents(urlText);
          const sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    });
  }

  // Smooth scroll for internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(!href || href === '#') return;
      const el = document.querySelector(href);
      if(!el) return;
      e.preventDefault();
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
      history.pushState(null, '', href);
    });
  });
})();
