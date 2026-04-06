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
          <div class="logo-icon" style="background-color: #082116;">
            <svg viewBox="0 0 24 24" fill="none" stroke="#A7EB46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
              <path d="M5 21h14" stroke-width="2.5"/>
              <rect x="6" y="14" width="3" height="5" rx="1" fill="#A7EB46" stroke="none"/>
              <rect x="10.5" y="10" width="3" height="9" rx="1" fill="#A7EB46" stroke="none"/>
              <rect x="15" y="7" width="3" height="12" rx="1" fill="#A7EB46" stroke="none"/>
              <polyline points="5 10 9 5 12 8 18 2"/>
              <polyline points="14 2 18 2 18 6"/>
            </svg>
          </div>
          <span class="logo-text">Finance-dev</span>
        </div>
        <h2 class="login-title">Welcome back</h2>
        <p class="login-subtitle">Sign in to your finance dashboard</p>
        
        <div class="login-error" id="login-error"></div>

        <form class="login-form" id="login-form" autocomplete="off">
          <div class="form-group">
            <label class="form-label" for="login-email">Email Address</label>
            <input type="email" class="form-input" id="login-email" placeholder="name@dev.com" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <input type="password" class="form-input" id="login-password" placeholder="Enter your password" required>
          </div>
          <button type="submit" class="btn btn-primary btn-block btn-lg" id="btn-submit-login">Sign In</button>
        </form>

        <div class="login-demo">
          <div class="login-demo-title">Demo Accounts</div>
          <div class="demo-account" data-email="admin@dev.com" data-password="admin">
            <span class="demo-account-email">admin@dev.com</span>
            <span class="badge badge-admin">Admin</span>
          </div>
          <div class="demo-account" data-email="analyst@dev.com" data-password="analyst">
            <span class="demo-account-email">analyst@dev.com</span>
            <span class="badge badge-analyst">Analyst</span>
          </div>
          <div class="demo-account" data-email="viewer@dev.com" data-password="viewer">
            <span class="demo-account-email">viewer@dev.com</span>
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
