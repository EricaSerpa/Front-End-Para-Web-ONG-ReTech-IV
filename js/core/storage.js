const Storage = (() => {
    const get = (key, fallback = null) => {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch {
        return fallback;
      }
    };
  
    const set = (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    };
  
    const remove = (key) => localStorage.removeItem(key);
  
    return { get, set, remove };
  })();
  
  window.Storage = Storage;  