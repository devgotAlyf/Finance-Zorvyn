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
  const debugLog = document.createElement('div');
  debugLog.style.cssText = 'position:fixed; bottom:0; left:0; right:0; background:black; color:lime; padding:10px; z-index:9999; font-family:monospace; font-size:12px; height: 150px; overflow: auto;';
  document.body.appendChild(debugLog);
  const log = (msg) => { debugLog.innerHTML += `<div>${new Date().toISOString()}: ${msg}</div>`; }
  
  log('startRouter called');

  async function handleRoute() {
    log('handleRoute invoked');
    const route = getCurrentRoute();
    log('Current route is: ' + route);
    const handler = routes[route];
    try {
      if (handler) {
        log('Executing handler for: ' + route);
        await handler();
        log('Handler completed for: ' + route);
      } else if (notFoundHandler) {
        log('Executing notFoundHandler');
        await notFoundHandler();
      } else {
        log('No handler found for: ' + route);
      }
    } catch (err) {
      log('ERROR: ' + err.message + '\n' + err.stack);
    }
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
