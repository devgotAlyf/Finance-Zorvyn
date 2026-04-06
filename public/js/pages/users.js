// ============================================
// ZORVYN FINANCE — Users Page (Admin Only)
// ============================================

import { getUsers, updateUserStatus, deleteUser, addUser } from '../data.js';
import { renderDrawer, openDrawer, closeDrawer } from '../components/drawer.js';
import { renderModal, openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

let currentUsers = [];

export async function renderUsersPage() {
  try {
    const data = await getUsers();
    currentUsers = data.users;
  } catch (err) {
    return `<div class="empty-state">Failed to load users. ${err.message}</div>`;
  }

  return `
    <div class="transactions-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">User Management</h1>
          <p class="page-subtitle">Manage system access and roles</p>
        </div>
        <button class="btn btn-primary" id="btn-add-user">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
          Add User
        </button>
      </div>

      <div class="table-card">
        <div class="data-table-wrapper" style="border:none">
          <table class="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="user-tbody">
              ${renderTableRows(currentUsers)}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    ${renderModal('delete-user-modal', 'Remove User', 'Are you sure you want to completely remove this user? They will lose all access immediately.', 'Remove', 'Cancel')}

    ${renderDrawer('add-user-drawer', 'Add New User', `
      <form id="add-user-form">
        <div class="form-group">
          <label for="user-name" class="form-label">Full Name</label>
          <input type="text" id="user-name" class="form-input" placeholder="e.g. John Doe" required>
        </div>
        
        <div class="form-group">
          <label for="user-email" class="form-label">Email Address</label>
          <input type="email" id="user-email" class="form-input" placeholder="name@dev.com" required>
        </div>
        
        <div class="form-group">
          <label for="user-password" class="form-label">Temporary Password</label>
          <input type="password" id="user-password" class="form-input" placeholder="Min. 6 characters" required>
        </div>
        
        <div class="form-group">
          <label for="user-role" class="form-label">System Role</label>
          <select id="user-role" class="form-select" required>
            <option value="viewer">Viewer (Read Only)</option>
            <option value="analyst">Analyst (Add Records)</option>
            <option value="admin">Admin (Full Access)</option>
          </select>
        </div>
      </form>
    `, `
      <button class="btn btn-ghost" id="btn-cancel-user">Cancel</button>
      <button class="btn btn-primary" id="btn-save-user" form="add-user-form">Create User</button>
    `)}
  `;
}

function renderTableRows(usersList) {
  if (usersList.length === 0) {
    return `<tr><td colspan="5" class="text-center" style="padding:48px; color:var(--text-secondary)">No users found.</td></tr>`;
  }
  return usersList.map(u => `
    <tr>
      <td>
        <div style="display:flex; align-items:center; gap:12px;">
          <div class="user-avatar">${u.name.charAt(0)}</div>
          <div>
            <div class="font-medium" style="color:var(--text-primary)">${u.name}</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:2px;">${u.email}</div>
          </div>
        </div>
      </td>
      <td>
        <span class="badge ${u.role === 'admin' ? 'badge-income' : ''}" style="${u.role !== 'admin' ? 'background:rgba(0,0,0,0.04); color:var(--text-secondary)' : ''}">
          ${u.role.charAt(0).toUpperCase() + u.role.slice(1)}
        </span>
      </td>
      <td class="num" style="color:var(--text-secondary)">${u.joined}</td>
      <td>
        <select class="role-select user-status-select" data-id="${u.id}" ${u.id === 'u1' ? 'disabled' : ''}>
          <option value="active" ${u.status === 'active' ? 'selected' : ''}>Active</option>
          <option value="inactive" ${u.status === 'inactive' ? 'selected' : ''}>Inactive</option>
        </select>
      </td>
      <td class="text-right">
        <button class="icon-btn btn-delete-user" data-id="${u.id}" ${u.id === 'u1' ? 'disabled style="opacity:0.3; cursor:not-allowed"' : ''}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </td>
    </tr>
  `).join('');
}

export function mountUsersPage() {
  const tbody = document.getElementById('user-tbody');
  let deleteId = null;

  function bindEvents() {
    document.querySelectorAll('.user-status-select').forEach(select => {
      select.addEventListener('change', async (e) => {
        try {
          await updateUserStatus(e.target.dataset.id, e.target.value);
          showToast('User status updated', 'success');
        } catch (err) {
          showToast(err.message, 'error');
          // Revert visual
          const data = await getUsers();
          currentUsers = data.users;
          tbody.innerHTML = renderTableRows(currentUsers);
          bindEvents();
        }
      });
    });

    document.querySelectorAll('.btn-delete-user').forEach(btn => {
      if (!btn.disabled) {
        btn.addEventListener('click', (e) => {
          deleteId = e.currentTarget.dataset.id;
          openModal('delete-user-modal');
        });
      }
    });
  }

  bindEvents();

  document.getElementById('delete-user-modal-confirm')?.addEventListener('click', async () => {
    if (deleteId) {
      try {
        await deleteUser(deleteId);
        const data = await getUsers();
        currentUsers = data.users;
        tbody.innerHTML = renderTableRows(currentUsers);
        bindEvents();
        closeModal('delete-user-modal');
        showToast('User removed');
      } catch(err) {
        showToast(err.message, 'error');
        closeModal('delete-user-modal');
      }
    }
  });

  document.getElementById('btn-add-user')?.addEventListener('click', () => {
    document.getElementById('add-user-form').reset();
    openDrawer('add-user-drawer');
  });

  document.getElementById('btn-cancel-user')?.addEventListener('click', () => closeDrawer('add-user-drawer'));

  document.getElementById('add-user-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const role = document.getElementById('user-role').value;

    try {
      const btn = document.getElementById('btn-save-user');
      if (btn) btn.disabled = true;

      await addUser({ name, email, password, role });
      
      const data = await getUsers();
      currentUsers = data.users;
      tbody.innerHTML = renderTableRows(currentUsers);
      
      closeDrawer('add-user-drawer');
      showToast('User created successfully', 'success');
      
      // Re-bind events
      bindEvents();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      const btn = document.getElementById('btn-save-user');
      if (btn) btn.disabled = false;
    }
  });
}
