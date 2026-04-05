// ============================================
// ZORVYN FINANCE — Users Page (Admin Only)
// ============================================

import { USERS_DB } from '../data.js';
import { getRoleBadgeClass } from '../auth.js';
import { showModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { formatDate } from '../data.js';

export function renderUsersPage() {
  return `
    <div class="users-page">
      <div class="page-heading">
        <h1>Users</h1>
        <button class="btn btn-primary" id="add-user-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          Add User
        </button>
      </div>

      <div class="data-table-wrapper">
        <div style="overflow-x: auto">
          <table class="data-table" id="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th style="width:80px">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${USERS_DB.map(u => `
                <tr data-id="${u.id}" class="${u.status === 'Inactive' ? 'dimmed' : ''}">
                  <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                      <div style="width:30px; height:30px; border-radius: var(--radius); background: var(--accent-light); display:flex; align-items:center; justify-content:center; font-weight:600; font-size:0.6875rem; color: var(--accent); flex-shrink:0;">${u.avatar}</div>
                      <span>${u.name}</span>
                    </div>
                  </td>
                  <td style="color: var(--text-secondary)">${u.email}</td>
                  <td>
                    <select class="inline-select role-select" data-id="${u.id}" style="color: ${u.role === 'Admin' ? 'var(--role-admin)' : u.role === 'Analyst' ? 'var(--role-analyst)' : 'var(--role-viewer)'}">
                      <option value="Admin" ${u.role === 'Admin' ? 'selected' : ''}>Admin</option>
                      <option value="Analyst" ${u.role === 'Analyst' ? 'selected' : ''}>Analyst</option>
                      <option value="Viewer" ${u.role === 'Viewer' ? 'selected' : ''}>Viewer</option>
                    </select>
                  </td>
                  <td>
                    <label class="status-pill">
                      <span class="badge ${u.status === 'Active' ? 'badge-active' : 'badge-inactive'}" data-user-id="${u.id}" style="cursor:pointer">
                        ${u.status}
                      </span>
                    </label>
                  </td>
                  <td class="num" style="color: var(--text-secondary)">${formatDate(u.joined)}</td>
                  <td>
                    <div class="row-actions">
                      <button class="row-action-btn delete delete-user" title="Remove" data-id="${u.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function mountUsersPage() {
  // Role change
  document.querySelectorAll('.role-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      const user = USERS_DB.find(u => u.id === id);
      if (user) {
        user.role = e.target.value;
        // Update color
        const color = user.role === 'Admin' ? 'var(--role-admin)' : user.role === 'Analyst' ? 'var(--role-analyst)' : 'var(--role-viewer)';
        e.target.style.color = color;
        showToast(`Role updated to ${user.role}`);
      }
    });
  });

  // Status toggle
  document.querySelectorAll('.status-pill .badge').forEach(badge => {
    badge.addEventListener('click', () => {
      const id = parseInt(badge.dataset.userId);
      const user = USERS_DB.find(u => u.id === id);
      if (user) {
        user.status = user.status === 'Active' ? 'Inactive' : 'Active';
        // Re-render
        window.dispatchEvent(new HashChangeEvent('hashchange'));
        showToast(`User ${user.status === 'Active' ? 'activated' : 'deactivated'}`);
      }
    });
  });

  // Delete user
  document.querySelectorAll('.delete-user').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const user = USERS_DB.find(u => u.id === id);
      if (!user) return;

      showModal(
        'Remove User',
        `Are you sure you want to remove ${user.name}? This action cannot be undone.`,
        'Remove',
        () => {
          const idx = USERS_DB.findIndex(u => u.id === id);
          if (idx !== -1) USERS_DB.splice(idx, 1);
          showToast('User removed');
          window.dispatchEvent(new HashChangeEvent('hashchange'));
        },
        true
      );
    });
  });

  // Add user — just a toast for demo
  const addBtn = document.getElementById('add-user-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      showToast('Add User feature coming soon', 'success');
    });
  }
}
