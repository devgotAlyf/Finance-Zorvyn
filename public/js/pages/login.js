// ============================================
// ZORVYN FINANCE — Login Page
// ============================================

import { loginUser, getCurrentUser } from '../auth.js';
import { navigate } from '../router.js';

export function renderLoginPage() {
  const session = getCurrentUser();

  return `
    <div class="login-page">
      <div class="login-card">
        ${session ? `
          <div class="login-role-badge">
            <span class="badge badge-${session.role}">${session.role}</span>
          </div>
        ` : ''}
        <div class="login-wordmark">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span class="logo-text">Zorvyn</span>
        </div>
        <h2 class="login-title">Welcome back</h2>
        <p class="login-subtitle">Sign in to your finance dashboard</p>
        
        <div class="login-error" id="login-error"></div>

        <form class="login-form" id="login-form" autocomplete="off">
          <div class="form-group">
            <label class="form-label" for="login-email">Email Address</label>
            <input type="email" class="form-input" id="login-email" placeholder="name@zorvyn.com" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <input type="password" class="form-input" id="login-password" placeholder="Enter your password" required>
          </div>
          <button type="submit" class="btn btn-primary btn-block btn-lg" id="btn-submit-login">Sign In</button>
        </form>

        <div class="login-demo">
          <div class="login-demo-title">Demo Accounts</div>
          <div class="demo-account" data-email="admin@zorvyn.com" data-password="admin">
            <span class="demo-account-email">admin@zorvyn.com</span>
            <span class="badge badge-admin">Admin</span>
          </div>
          <div class="demo-account" data-email="analyst@zorvyn.com" data-password="analyst">
            <span class="demo-account-email">analyst@zorvyn.com</span>
            <span class="badge badge-analyst">Analyst</span>
          </div>
          <div class="demo-account" data-email="viewer@zorvyn.com" data-password="viewer">
            <span class="demo-account-email">viewer@zorvyn.com</span>
            <span class="badge badge-viewer">Viewer</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function mountLoginPage() {
  const form = document.getElementById('login-form');
  const errorEl = document.getElementById('login-error');
  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const submitBtn = document.getElementById('btn-submit-login');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Signing In...';

      const result = await loginUser(email, password);
      
      if (result.success) {
        navigate('dashboard');
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In';
        
        errorEl.textContent = result.error;
        errorEl.classList.add('show');
        emailInput.classList.add('error');
        passwordInput.classList.add('error');

        setTimeout(() => {
          emailInput.classList.remove('error');
          passwordInput.classList.remove('error');
        }, 3000);
      }
    });
  }

  // Demo account clicks
  document.querySelectorAll('.demo-account').forEach(account => {
    account.addEventListener('click', () => {
      emailInput.value = account.dataset.email;
      passwordInput.value = account.dataset.password;
      errorEl.classList.remove('show');
      emailInput.classList.remove('error');
      passwordInput.classList.remove('error');
    });
  });
}
