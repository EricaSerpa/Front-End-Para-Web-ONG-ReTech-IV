const CadastroFeature = (() => {
    const KEY = 'cadastros';
  
    function init() {
      Templates.render('/cadastro');
      const form = document.getElementById('form-cadastro');
      FormValidation.attach(form);
  
      form.addEventListener('form:valid', () => {
        const data = Utils.getFormData(form);
        const list = Storage.get(KEY, []);
        list.push({ ...data, criadoEm: new Date().toISOString() });
        Storage.set(KEY, list);
        Utils.showMessage('Cadastro realizado com sucesso!', 'success');
        form.reset();
      });
    }
  
    return { init };
  })();
  
  window.CadastroFeature = CadastroFeature;  