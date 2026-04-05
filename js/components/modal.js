// ============================================
// ZORVYN FINANCE — Modal Component
// ============================================

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
