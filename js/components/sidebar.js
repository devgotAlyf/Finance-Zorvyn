// ============================================
// ZORVYN FINANCE — Sidebar Component
// ============================================

import { getSession, getRoleBadgeClass, logout } from '../auth.js';
import { navigate, getCurrentRoute } from '../router.js';

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',     icon: 'layout-dashboard', roles: ['Admin', 'Analyst', 'Viewer'] },
  { id: 'transactions', label: 'Transactions',   icon: 'arrow-left-right', roles: ['Admin', 'Analyst'] },
  { id: 'users',        label: 'Users',          icon: 'users',            roles: ['Admin'] },
  { id: 'analytics',    label: 'Analytics',      icon: 'bar-chart-3',      roles: ['Admin', 'Analyst'] },
  { id: 'settings',     label: 'Settings',       icon: 'settings',         roles: ['Admin'] },
];

export function renderSidebar() {
  const session = getSession();
  if (!session) return '';
  const currentRoute = getCurrentRoute();

  const navItems = NAV_ITEMS.map(item => {
    const isActive = currentRoute === item.id;
    const hasAccess = item.roles.includes(session.role);
    return `
      <div class="nav-item ${isActive ? 'active' : ''}" 
           data-route="${hasAccess ? item.id : 'access-denied'}"
           title="${item.label}">
        <i data-lucide="${item.icon}"></i>
        <span class="nav-label">${item.label}</span>
      </div>
    `;
  }).join('');

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span class="logo-text">Zorvyn</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-section-title">Menu</div>
          ${navItems}
        </div>
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="user-avatar">${session.avatar}</div>
          <div class="user-info">
            <div class="user-name">${session.name}</div>
            <span class="badge ${getRoleBadgeClass(session.role)} user-role">${session.role}</span>
          </div>
          <button class="sidebar-logout" id="sidebar-logout" title="Logout">
            <i data-lucide="log-out"></i>
          </button>
        </div>
      </div>
    </aside>
  `;
}

export function mountSidebar() {
  // Navigation clicks
  document.querySelectorAll('.nav-item[data-route]').forEach(item => {
    item.addEventListener('click', () => {
      const route = item.dataset.route;
      navigate(route);
    });
  });

  // Logout
  const logoutBtn = document.getElementById('sidebar-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logout();
      navigate('login');
    });
  }
}
