// ============================================
// ZORVYN FINANCE — Sidebar Component
// ============================================

import { getCurrentUser, logoutUser } from '../auth.js';
import { navigate, getCurrentRoute } from '../router.js';

const NAV_ITEMS = [
  { id: 'dashboard',    label: 'Dashboard',     icon: 'layout-dashboard', roles: ['admin', 'analyst', 'viewer'] },
  { id: 'transactions', label: 'Transactions',   icon: 'arrow-left-right', roles: ['admin', 'analyst'] },
  { id: 'users',        label: 'Users',          icon: 'users',            roles: ['admin'] },
  { id: 'analytics',    label: 'Analytics',      icon: 'bar-chart-3',      roles: ['admin', 'analyst'] },
  { id: 'settings',     label: 'Settings',       icon: 'settings',         roles: ['admin'] },
];

function getRoleBadgeClass(role) {
  if (!role) return '';
  switch (role.toLowerCase()) {
    case 'admin': return 'badge-admin';
    case 'analyst': return 'badge-analyst';
    case 'viewer': return 'badge-viewer';
    default: return '';
  }
}

export function renderSidebar() {
  const session = getCurrentUser();
  if (!session) return '';
  const currentRoute = getCurrentRoute();

  const navItems = NAV_ITEMS.map(item => {
    const isActive = currentRoute === item.id;
    const hasAccess = item.roles.includes(session.role.toLowerCase());
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
          <div class="logo-icon" style="background-color: #082116;">
            <svg viewBox="0 0 24 24" fill="none" stroke="#A7EB46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16">
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
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-section-title">Menu</div>
          ${navItems}
        </div>
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user">
          <div class="user-avatar">${session.name.charAt(0)}</div>
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
      logoutUser();
      navigate('login');
    });
  }
}

