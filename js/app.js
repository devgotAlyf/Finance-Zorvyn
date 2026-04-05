// ============================================
// ZORVYN FINANCE — Main Application Entry
// ============================================

import { registerRoute, startRouter, getCurrentRoute, navigate } from './router.js';
import { isAuthenticated, getSession, hasRole } from './auth.js';
import { renderSidebar, mountSidebar } from './components/sidebar.js';
import { renderHeader } from './components/header.js';
import { destroyCharts } from './components/charts.js';

import { renderLoginPage, mountLoginPage } from './pages/login.js';
import { renderDashboardPage, mountDashboardPage } from './pages/dashboard.js';
import { renderTransactionsPage, mountTransactionsPage } from './pages/transactions.js';
import { renderUsersPage, mountUsersPage } from './pages/users.js';
import { renderAnalyticsPage, mountAnalyticsPage } from './pages/analytics.js';
import { renderSettingsPage, mountSettingsPage } from './pages/settings.js';
import { renderAccessDeniedPage, mountAccessDeniedPage } from './pages/access-denied.js';

const app = document.getElementById('app');

function renderAppShell(route, pageHtml) {
  destroyCharts();

  app.innerHTML = `
    <div class="app-layout">
      ${renderSidebar()}
      <div class="main-wrapper">
        ${renderHeader(route)}
        <main class="main-content">
          ${pageHtml}
        </main>
      </div>
    </div>
  `;

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  mountSidebar();
}

function renderFullPage(pageHtml) {
  destroyCharts();
  app.innerHTML = pageHtml;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --- Route Definitions ---

// Login
registerRoute('login', () => {
  if (isAuthenticated()) {
    navigate('dashboard');
    return;
  }
  renderFullPage(renderLoginPage());
  mountLoginPage();
});

// Dashboard
registerRoute('dashboard', () => {
  if (!isAuthenticated()) { navigate('login'); return; }
  renderAppShell('dashboard', renderDashboardPage());
  mountDashboardPage();
});

// Transactions
registerRoute('transactions', () => {
  if (!isAuthenticated()) { navigate('login'); return; }
  if (!hasRole('Admin', 'Analyst')) { navigate('access-denied'); return; }
  renderAppShell('transactions', renderTransactionsPage());
  mountTransactionsPage();
});

// Users
registerRoute('users', () => {
  if (!isAuthenticated()) { navigate('login'); return; }
  if (!hasRole('Admin')) { navigate('access-denied'); return; }
  renderAppShell('users', renderUsersPage());
  mountUsersPage();
});

// Analytics
registerRoute('analytics', () => {
  if (!isAuthenticated()) { navigate('login'); return; }
  if (!hasRole('Admin', 'Analyst')) { navigate('access-denied'); return; }
  renderAppShell('analytics', renderAnalyticsPage());
  mountAnalyticsPage();
});

// Settings
registerRoute('settings', () => {
  if (!isAuthenticated()) { navigate('login'); return; }
  if (!hasRole('Admin')) { navigate('access-denied'); return; }
  renderAppShell('settings', renderSettingsPage());
  mountSettingsPage();
});

// Access Denied
registerRoute('access-denied', () => {
  if (!isAuthenticated()) { navigate('login'); return; }
  renderAppShell('access-denied', renderAccessDeniedPage());
  mountAccessDeniedPage();
});

// --- Start ---
startRouter();
