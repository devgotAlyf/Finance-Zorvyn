// ============================================
// ZORVYN FINANCE — Drawer Component
// ============================================

export function renderDrawer(id, title, bodyHtml, footerHtml = '') {
  return `
    <div class="drawer-overlay" id="${id}-overlay" onclick="document.getElementById('${id}').classList.remove('active'); document.getElementById('${id}-overlay').classList.remove('active')"></div>
    <div class="drawer" id="${id}">
      <div class="drawer-header">
        <h3 class="drawer-title">${title}</h3>
        <button class="drawer-close" onclick="document.getElementById('${id}').classList.remove('active'); document.getElementById('${id}-overlay').classList.remove('active')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="drawer-body">${bodyHtml}</div>
      ${footerHtml ? `<div class="drawer-footer">${footerHtml}</div>` : ''}
    </div>
  `;
}

export function openDrawer(idOrTitle, bodyHtml, footerHtml, onClose) {
  // If first argument is an ID representing a rendered drawer
  if (!bodyHtml && document.getElementById(idOrTitle)) {
    const id = idOrTitle;
    requestAnimationFrame(() => {
      const overlay = document.getElementById(`${id}-overlay`);
      const drawer = document.getElementById(id);
      if (overlay) overlay.classList.add('active');
      if (drawer) drawer.classList.add('active');
    });
    return;
  }

  // Otherwise fallback to dynamic drawer legacy behavior
  const title = idOrTitle;
  let overlay = document.getElementById('dynamic-drawer-overlay');
  let drawer = document.getElementById('dynamic-drawer');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'drawer-overlay';
    overlay.id = 'dynamic-drawer-overlay';
    document.body.appendChild(overlay);
  }

  if (!drawer) {
    drawer = document.createElement('div');
    drawer.className = 'drawer';
    drawer.id = 'dynamic-drawer';
    document.body.appendChild(drawer);
  }

  drawer.innerHTML = `
    <div class="drawer-header">
      <h3 class="drawer-title">${title}</h3>
      <button class="drawer-close" id="dynamic-drawer-close-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="drawer-body">${bodyHtml}</div>
    ${footerHtml ? `<div class="drawer-footer">${footerHtml}</div>` : ''}
  `;

  requestAnimationFrame(() => {
    overlay.classList.add('active');
    drawer.classList.add('active');
  });

  const closeFn = () => {
    overlay.classList.remove('active');
    drawer.classList.remove('active');
    setTimeout(() => {
      overlay.remove();
      drawer.remove();
      if (onClose) onClose();
    }, 300);
  };

  overlay.onclick = closeFn;
  document.getElementById('dynamic-drawer-close-btn').onclick = closeFn;
}

export function closeDrawer(id) {
  if (id && document.getElementById(id)) {
    const overlay = document.getElementById(`${id}-overlay`);
    const drawer = document.getElementById(id);
    if (overlay) overlay.classList.remove('active');
    if (drawer) drawer.classList.remove('active');
  } else {
    const overlay = document.getElementById('dynamic-drawer-overlay');
    const drawer = document.getElementById('dynamic-drawer');
    if (overlay) overlay.classList.remove('active');
    if (drawer) drawer.classList.remove('active');
    setTimeout(() => {
      if (overlay) overlay.remove();
      if (drawer) drawer.remove();
    }, 300);
  }
}
