const Utils = (() => {
    const getFormData = (form) =>
      Array.from(new FormData(form)).reduce((acc, [k, v]) => ({ ...acc, [k]: v.trim() }), {});
  
    const showMessage = (msg, type = 'info') => {
      const el = document.createElement('div');
      el.className = `toast ${type}`;
      el.textContent = msg;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    };
  
    return { getFormData, showMessage };
  })();
  
  window.Utils = Utils;  