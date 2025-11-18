const ProjetosFeature = (() => {
    const KEY = 'projetos';
  
       const seed = [
      { nome: 'ReciclaTech', descricao: 'Capacitação em tecnologia para jovens.' },
      { nome: 'EcoLabs', descricao: 'Laboratórios de reaproveitamento eletrônico.' }
    ];
  
    function init() {
      const lista = Storage.get(KEY, seed);
      Storage.set(KEY, lista);
      Templates.render('/projetos', lista);
    }
  
    return { init };
  })();
  
  window.ProjetosFeature = ProjetosFeature;  