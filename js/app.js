Router.add('/', () => Templates.render('/'));
Router.add('/projetos', () => Templates.render('/projetos'));
Router.add('/cadastro', () => CadastroFeature.init());
Router.add('/contato', () => ContatoFeature.init());
Router.add('/404', () => Templates.render('/404'));
Router.start();


document.getElementById('toggle-dark').addEventListener('click', () => {
    document.body.dataset.theme = 'dark';
    localStorage.setItem('theme', 'dark');
  });
  
  document.getElementById('toggle-light').addEventListener('click', () => {
    document.body.dataset.theme = 'light';
    localStorage.setItem('theme', 'light');
  });
  
  document.getElementById('toggle-contrast').addEventListener('click', () => {
    document.body.dataset.theme = 'high-contrast';
    localStorage.setItem('theme', 'high-contrast');
  });
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.dataset.theme = savedTheme;
  
  

  






