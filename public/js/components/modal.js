// ============================================
// ZORVYN FINANCE — Modal Component
// ============================================

export function renderModal(id, title, message, confirmText = 'Confirm', cancelText = 'Cancel') {
  return `
    <div class="modal-overlay" id="${id}">
      <div class="modal">
        <div class="modal-header">
          <h3>${title}</h3>
        </div>
        <div class="modal-body">
          <p>${message}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" onclick="document.getElementById('${id}').classList.remove('active')">${cancelText}</button>
          <button class="btn btn-danger" id="${id}-confirm">${confirmText}</button>
        </div>
      </div>
    </div>
  `;
}

export function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    // Small delay to allow DOM render before animation
    requestAnimationFrame(() => {
      el.classList.add('active');
    });
  }
}

export function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('active');
}

export function showModal(title, message, confirmText, onConfirm, isDanger = false) {
  let overlay = document.getElementById('modal-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'modal-overlay';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modal-body">
        <p>${message}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="modal-cancel">Cancel</button>
        <button class="btn ${isDanger ? 'btn-danger' : 'btn-primary'}" id="modal-confirm">${confirmText}</button>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    overlay.classList.add('active');
  });

  document.getElementById('modal-cancel').onclick = () => hideModal();
  document.getElementById('modal-confirm').onclick = () => {
    hideModal();
    if (onConfirm) onConfirm();
  };
  overlay.onclick = (e) => {
    if (e.target === overlay) hideModal();
  };
}

export function hideModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 200);
  }
}
