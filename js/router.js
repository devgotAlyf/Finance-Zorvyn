// ============================================
// ZORVYN FINANCE — Hash-based SPA Router
// ============================================

const routes = {};
let notFoundHandler = null;

export function registerRoute(hash, handler) {
  routes[hash] = handler;
}

export function registerNotFound(handler) {
  notFoundHandler = handler;
}

export function navigate(hash) {
  window.location.hash = hash;
}

export function getCurrentRoute() {
  return window.location.hash.slice(1) || 'login';
}

export function startRouter() {
  function handleRoute() {
    const route = getCurrentRoute();
    const handler = routes[route];
    if (handler) {
      handler();
    } else if (notFoundHandler) {
      notFoundHandler();
    }
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
