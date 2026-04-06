// ============================================
// ZORVYN FINANCE — Main Application Entry
// ============================================

import { registerRoute, startRouter, getCurrentRoute, navigate } from './router.js';
import { isAuthenticated, getCurrentUser, hasRole } from './auth.js';
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
registerRoute('login', async () => {
  if (isAuthenticated()) {
    navigate('dashboard');
    return;
  }
  renderFullPage(await renderLoginPage());
  mountLoginPage();
});

// Dashboard
registerRoute('dashboard', async () => {
  if (!isAuthenticated()) { navigate('login'); return; }
  renderAppShell('dashboard', await renderDashboardPage());
  mountDashboardPage();
});

// Transactions
registerRoute('transactions', async () => {
  if (!isAuthenticated()) { navigate('login'); return; }
  if (!hasRole(['admin', 'analyst'])) { navigate('access-denied'); return; }
  renderAppShell('transactions', await renderTransactionsPage());
  mountTransactionsPage();
});

// Users
registerRoute('users', async () => {
  if (!isAuthenticated()) { navigate('login'); return; }
  if (!hasRole(['admin'])) { navigate('access-denied'); return; }
  renderAppShell('users', await renderUsersPage());
  mountUsersPage();
});

// Analytics
registerRoute('analytics', async () => {
  if (!isAuthenticated()) { navigate('login'); return; }
  if (!hasRole(['admin', 'analyst'])) { navigate('access-denied'); return; }
  renderAppShell('analytics', await renderAnalyticsPage());
  mountAnalyticsPage();
});

// Settings
registerRoute('settings', async () => {
  if (!isAuthenticated()) { navigate('login'); return; }
  if (!hasRole(['admin'])) { navigate('access-denied'); return; }
  renderAppShell('settings', await renderSettingsPage());
  mountSettingsPage();
});

// Access Denied
registerRoute('access-denied', async () => {
  if (!isAuthenticated()) { navigate('login'); return; }
  renderAppShell('access-denied', await renderAccessDeniedPage());
  mountAccessDeniedPage();
});

// --- Start ---
startRouter();
