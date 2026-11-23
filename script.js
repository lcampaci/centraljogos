(() => {
  'use strict';

  // Data atual no rodapé, usando o calendário local do navegador.
  const dateElement = document.getElementById('currentDate');
  const updateDate = () => {
    if (!dateElement) return;
    dateElement.textContent = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(new Date());
  };
  updateDate();
  // Atualiza ao virar o dia, inclusive se a página permanecer aberta.
  window.setInterval(updateDate, 60 * 1000);

  // Menu Jogos.
  const menuRoot = document.querySelector('.menu-root');
  const menuButton = document.getElementById('gamesMenuButton');
  const submenu = document.getElementById('gamesSubmenu');
  const setMenuOpen = (open) => {
    if (!menuRoot || !menuButton) return;
    menuRoot.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  };

  if (menuButton) {
    menuButton.addEventListener('click', (event) => {
      event.stopPropagation();
      setMenuOpen(!menuRoot.classList.contains('open'));
    });
  }
  if (submenu) {
    submenu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenuOpen(false);
    });
  }
  document.addEventListener('click', (event) => {
    if (menuRoot && !menuRoot.contains(event.target)) setMenuOpen(false);
  });

  // Janela Sobre.
  const aboutButton = document.getElementById('aboutButton');
  const aboutDialog = document.getElementById('aboutDialog');
  const closeAbout = document.getElementById('closeAbout');
  const okAbout = document.getElementById('okAbout');

  const openAbout = () => {
    if (!aboutDialog) return;
    if (typeof aboutDialog.showModal === 'function') {
      if (!aboutDialog.open) aboutDialog.showModal();
    } else {
      aboutDialog.setAttribute('open', '');
    }
  };
  const closeAboutDialog = () => {
    if (!aboutDialog) return;
    if (typeof aboutDialog.close === 'function' && aboutDialog.open) {
      aboutDialog.close();
    } else {
      aboutDialog.removeAttribute('open');
    }
  };

  if (aboutButton) aboutButton.addEventListener('click', openAbout);
  if (closeAbout) closeAbout.addEventListener('click', closeAboutDialog);
  if (okAbout) okAbout.addEventListener('click', closeAboutDialog);
  if (aboutDialog) {
    aboutDialog.addEventListener('click', (event) => {
      if (event.target === aboutDialog) closeAboutDialog();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuOpen(false);
  });
})();
