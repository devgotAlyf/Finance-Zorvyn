// ============================================
// ZORVYN FINANCE — Header Component
// ============================================

import { getSession } from '../auth.js';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  users: 'User Management',
  analytics: 'Analytics',
  settings: 'Settings',
  'access-denied': 'Access Restricted',
};

export function renderHeader(route) {
  const session = getSession();
  if (!session) return '';

  const title = PAGE_TITLES[route] || 'Dashboard';

  return `
    <header class="top-header">
      <div class="header-left">
        <h1 class="page-title">${title}</h1>
      </div>
      <div class="header-right">
        <div class="header-date-picker" id="header-date-picker">
          <i data-lucide="calendar"></i>
          <span>Last 30 days</span>
          <i data-lucide="chevron-down"></i>
        </div>
        <button class="header-icon-btn" title="Notifications">
          <i data-lucide="bell"></i>
          <span class="notification-dot"></span>
        </button>
        <div class="header-avatar" title="${session.name}">${session.avatar}</div>
      </div>
    </header>
  `;
}
