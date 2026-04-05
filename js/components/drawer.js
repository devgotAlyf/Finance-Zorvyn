// ============================================
// ZORVYN FINANCE — Drawer Component
// ============================================

let drawerOpen = false;
let onCloseCallback = null;

export function openDrawer(title, bodyHtml, footerHtml, onClose) {
  drawerOpen = true;
  onCloseCallback = onClose || null;

  // Create overlay if not exists
  let overlay = document.getElementById('drawer-overlay');
  let drawer = document.getElementById('drawer');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';
    overlay.id = 'drawer-overlay';
    document.body.appendChild(overlay);
  }

  if (!drawer) {
    drawer = document.createElement('div');
    drawer.className = 'drawer';
    drawer.id = 'drawer';
    document.body.appendChild(drawer);
  }

  drawer.innerHTML = `
    <div class="drawer-header">
      <h3 class="drawer-title">${title}</h3>
      <button class="drawer-close" id="drawer-close-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="drawer-body">${bodyHtml}</div>
    ${footerHtml ? `<div class="drawer-footer">${footerHtml}</div>` : ''}
  `;

  // Activate after a frame for transition
  requestAnimationFrame(() => {
    overlay.classList.add('active');
    drawer.classList.add('active');
  });

  // Close handlers
  overlay.onclick = closeDrawer;
  document.getElementById('drawer-close-btn').onclick = closeDrawer;
}

export function closeDrawer() {
  const overlay = document.getElementById('drawer-overlay');
  const drawer = document.getElementById('drawer');

  if (overlay) overlay.classList.remove('active');
  if (drawer) drawer.classList.remove('active');

  drawerOpen = false;

  // Clean up after transition
  setTimeout(() => {
    if (overlay) overlay.remove();
    if (drawer) drawer.remove();
    if (onCloseCallback) onCloseCallback();
  }, 300);
}

export function isDrawerOpen() {
  return drawerOpen;
}
