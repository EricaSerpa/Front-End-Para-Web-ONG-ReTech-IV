const FormValidation = (() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const cepRegex = /^\d{5}-?\d{3}$/;

  const validators = {
    nome: (v) => v.length >= 3 || 'Digite pelo menos 3 caracteres.',
    email: (v) => emailRegex.test(v) || 'Digite um email válido.',
    telefone: (v) => v === '' || /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(v) || 'Telefone inválido. Use o formato (XX) 91234-5678.',
    cep: (v) => cepRegex.test(v) || 'CEP inválido. Use o formato 00000-000.',
    mensagem: (v) => v.length >= 10 || 'Mensagem deve ter pelo menos 10 caracteres.',
    observacoes: (v) => v.length >= 5 || 'Digite pelo menos 5 caracteres nas observações.'
  };

  function setError(name, message) {
    const input = document.querySelector(`[name="${name}"]`);
    const errorEl = document.querySelector(`[data-error-for="${name}"]`);
    if (input) input.classList.toggle('invalid', !!message); 
    if (errorEl) errorEl.textContent = message || ''; 
  }

   function validateField(input) {
    const name = input.name;
    const value = input.value.trim();
    const rule = validators[name];
    let message = '';

    if (input.type === 'radio') {
      const group = document.querySelectorAll(`input[name="${name}"]`);
      const checked = Array.from(group).some(r => r.checked);
      if (!checked) {
        message = 'Selecione uma opção.';
      }
    } else if (input.required && value === '') {
      message = 'Este campo é obrigatório.';
    } else if (rule) {
      const result = rule(value);
      message = result === true ? '' : result;
    }

    setError(name, message);
    return message === ''; 
  }

  async function buscarEndereco(cepRaw) {
    const cep = cepRaw.replace(/\D/g, '');
    if (cep.length !== 8) {
      setError('cep', 'CEP inválido. Use o formato 00000-000.');
      Utils.showMessage('CEP inválido. Use o formato 00000-000.', 'error');
      return;
    }

    // Obtém referências dos campos de endereço
    const ruaEl = document.querySelector('input[name="rua"]');
    const bairroEl = document.querySelector('input[name="bairro"]');
    const cidadeEl = document.querySelector('input[name="cidade"]');
    const estadoEl = document.querySelector('input[name="estado"]');
    if (!ruaEl || !bairroEl || !cidadeEl || !estadoEl) return;

    try {
      setError('cep', '');
      const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await resp.json();

      if (data.erro) {
        setError('cep', 'CEP não encontrado.');
        Utils.showMessage('CEP não encontrado.', 'error');
        return;
      }

      ruaEl.value = data.logradouro || '';
      bairroEl.value = data.bairro || '';
      cidadeEl.value = data.localidade || '';
      estadoEl.value = data.uf || '';

      ['rua','bairro','cidade','estado'].forEach((n) => setError(n, ''));
      Utils.showMessage('Endereço preenchido automaticamente!', 'success');
    } catch (e) {
      setError('cep', 'Erro ao buscar CEP. Tente novamente.');
      Utils.showMessage('Erro ao buscar CEP.', 'error');
    }
  }

  function attach(form) {
    form.addEventListener('input', (e) => {
      if (e.target.matches('input, textarea, select')) validateField(e.target);
    });

    const cepInput = form.querySelector('input[name="cep"]');
    if (cepInput) {
      const triggerLookup = () => buscarEndereco(cepInput.value);
      cepInput.addEventListener('blur', triggerLookup);
      cepInput.addEventListener('change', triggerLookup);
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = form.querySelectorAll('input, textarea, select');
      const allValid = Array.from(fields).every(validateField);
      if (!allValid) {
        Utils.showMessage('Por favor, corrija os campos destacados.', 'error');
        return;
      }
      console.log('Disparando form:valid'); 
      form.dispatchEvent(new CustomEvent('form:valid', { bubbles: true }));
    });
  }

  return { attach };
})(); 

window.FormValidation = FormValidation;