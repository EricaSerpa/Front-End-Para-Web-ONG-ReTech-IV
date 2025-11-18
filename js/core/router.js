// Hash-based router simples
const Router = (() => {
    const routes = {};
  
    function add(path, handler) {
      routes[path] = handler;
    }
  
    function resolve() {
      const hash = window.location.hash || '#/';
      const path = hash.replace('#', '');
      const handler = routes[path] || routes['/404'];
      if (handler) handler();
    }
  
    function start() {
      window.addEventListener('hashchange', resolve);
      window.addEventListener('load', resolve);
    }
  
    return { add, start };
  })();
  
  window.Router = Router;  