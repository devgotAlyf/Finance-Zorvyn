// ============================================
// ZORVYN FINANCE — Access Denied Page
// ============================================

import { navigate } from '../router.js';

export function renderAccessDeniedPage() {
  return `
    <div class="access-denied-page">
      <div class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="28" height="28">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
        </div>
        <h2>Access Restricted</h2>
        <p>Your current role doesn't have permission to access this section. Contact your administrator for access.</p>
        <button class="btn btn-ghost" id="go-back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="m15 18-6-6 6-6"/></svg>
          Go Back
        </button>
      </div>
    </div>
  `;
}

export function mountAccessDeniedPage() {
  const btn = document.getElementById('go-back-btn');
  if (btn) {
    btn.addEventListener('click', () => navigate('dashboard'));
  }
}
