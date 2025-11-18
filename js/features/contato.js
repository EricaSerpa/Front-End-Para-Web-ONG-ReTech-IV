const ContatoFeature = (() => {
  function init() {
    Templates.render('/contato');
    const form = document.getElementById('form-contato');
    if (!form) return;

    FormValidation.attach(form);

    form.addEventListener('form:valid', () => {
      const data = Utils.getFormData(form);
      Utils.showMessage('Sua mensagem foi cadastrada com sucesso!', 'success');
      form.reset();
    });
  }

  return { init };
})();

window.ContatoFeature = ContatoFeature;