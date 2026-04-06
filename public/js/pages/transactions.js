// ============================================
// ZORVYN FINANCE — Transactions Page
// ============================================

import { getTransactions, addTransaction, deleteTransaction, formatCurrency, formatDate } from '../data.js';
import { renderDrawer, openDrawer, closeDrawer } from '../components/drawer.js';
import { renderModal, openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

let currentTransactions = [];

export async function renderTransactionsPage() {
  try {
    const data = await getTransactions();
    currentTransactions = data.transactions;
  } catch (err) {
    return `<div class="empty-state">Failed to load transactions.</div>`;
  }

  return `
    <div class="transactions-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Transactions</h1>
          <p class="page-subtitle">Manage your financial records</p>
        </div>
        <button class="btn btn-primary" id="btn-add-txn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Record
        </button>
      </div>

      <div class="table-card">
        <div class="filter-bar">
          <div class="search-bar-wrapper" style="position: relative; flex: 1; max-width: 320px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px; position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); pointer-events: none;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" class="filter-input" id="txn-search" placeholder="Search records..." style="width: 100%; padding-left: 38px;">
          </div>
          <div class="filter-controls">
            <select class="filter-select" id="txn-type-filter">
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <div class="data-table-wrapper" style="border:none">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th class="text-right">Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="txn-tbody">
              ${renderTableRows(currentTransactions)}
            </tbody>
          </table>
        </div>
        
        <div class="pagination">
          <button class="btn btn-ghost btn-sm" disabled>Previous</button>
          <span class="pagination-info">Page 1 of 1</span>
          <button class="btn btn-ghost btn-sm" disabled>Next</button>
        </div>
      </div>
    </div>

    ${renderDrawer('add-txn-drawer', 'Add Record', `
      <form id="add-txn-form">
        <div class="form-group row">
          <label>Type</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" name="type" value="expense" checked>
              Expense
            </label>
            <label class="radio-label">
              <input type="radio" name="type" value="income">
              Income
            </label>
          </div>
        </div>
        
        <div class="form-group">
          <label for="txn-amount">Amount (₹)</label>
          <input type="number" id="txn-amount" class="input" placeholder="0.00" required step="0.01">
        </div>
        
        <div class="form-group">
          <label for="txn-desc">Description</label>
          <input type="text" id="txn-desc" class="input" placeholder="What was this for?" required>
        </div>
        
        <div class="form-row">
          <div class="form-group" style="flex:1">
            <label for="txn-category">Category</label>
            <select id="txn-category" class="input" required>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Housing">Housing</option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Investment">Investment</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <div class="form-group" style="flex:1">
            <label for="txn-date">Date</label>
            <input type="date" id="txn-date" class="input" required>
          </div>
        </div>
      </form>
    `, `
      <button class="btn btn-ghost" id="btn-cancel-txn">Cancel</button>
      <button class="btn btn-primary" id="btn-save-txn" form="add-txn-form">Save Record</button>
    `)}

    ${renderModal('delete-txn-modal', 'Delete Record', 'Are you sure you want to delete this record? This action cannot be undone.', 'Delete', 'Cancel')}
  `;
}

function renderTableRows(txns) {
  if (txns.length === 0) {
    return `<tr><td colspan="6" class="text-center" style="padding:48px; color:var(--text-secondary)">No records found.</td></tr>`;
  }
  return txns.map(t => `
    <tr>
      <td class="num" style="color: var(--text-secondary)">${formatDate(t.date)}</td>
      <td class="font-medium">${t.description}</td>
      <td style="color: var(--text-secondary); font-size:0.8125rem">${t.category}</td>
      <td><span class="badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}">${t.type.charAt(0).toUpperCase() + t.type.slice(1)}</span></td>
      <td class="text-right num ${t.type === 'income' ? 'amount-income' : 'amount-expense'}">${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}</td>
      <td class="text-right">
        <button class="icon-btn btn-delete-txn" data-id="${t.id}" title="Delete">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </td>
    </tr>
  `).join('');
}

export function mountTransactionsPage() {
  const tbody = document.getElementById('txn-tbody');
  let deleteId = null;

  // Add functionality
  document.getElementById('btn-add-txn')?.addEventListener('click', () => {
    document.getElementById('add-txn-form').reset();
    document.getElementById('txn-date').valueAsDate = new Date();
    openDrawer('add-txn-drawer');
  });

  document.getElementById('btn-cancel-txn')?.addEventListener('click', () => closeDrawer('add-txn-drawer'));

  document.getElementById('add-txn-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const typeObj = document.querySelector('input[name="type"]:checked');
    const amount = Number(document.getElementById('txn-amount').value);
    const description = document.getElementById('txn-desc').value;
    const category = document.getElementById('txn-category').value;
    const date = new Date(document.getElementById('txn-date').value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    try {
      const btn = document.getElementById('btn-save-txn');
      if (btn) btn.disabled = true;

      await addTransaction({ type: typeObj.value, amount, description, category, date });
      
      const data = await getTransactions();
      currentTransactions = data.transactions;
      tbody.innerHTML = renderTableRows(currentTransactions);
      
      closeDrawer('add-txn-drawer');
      showToast('Record added successfully', 'success');
      
      // Re-bind delete events
      bindDeleteEvents();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      const btn = document.getElementById('btn-save-txn');
      if (btn) btn.disabled = false;
    }
  });

  // Filters
  document.getElementById('txn-search')?.addEventListener('input', async (e) => {
    const data = await getTransactions(document.getElementById('txn-type-filter').value, e.target.value);
    tbody.innerHTML = renderTableRows(data.transactions);
    bindDeleteEvents();
  });

  document.getElementById('txn-type-filter')?.addEventListener('change', async (e) => {
    const data = await getTransactions(e.target.value, document.getElementById('txn-search').value);
    tbody.innerHTML = renderTableRows(data.transactions);
    bindDeleteEvents();
  });

  // Delete flow
  function bindDeleteEvents() {
    document.querySelectorAll('.btn-delete-txn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        deleteId = e.currentTarget.dataset.id;
        openModal('delete-txn-modal');
      });
    });
  }
  
  bindDeleteEvents();

  document.getElementById('delete-txn-modal-confirm')?.addEventListener('click', async () => {
    if (deleteId) {
      try {
        await deleteTransaction(deleteId);
        const data = await getTransactions(document.getElementById('txn-type-filter').value, document.getElementById('txn-search').value);
        currentTransactions = data.transactions;
        tbody.innerHTML = renderTableRows(currentTransactions);
        bindDeleteEvents();
        closeModal('delete-txn-modal');
        showToast('Record deleted');
      } catch(err) {
        showToast(err.message, 'error');
        closeModal('delete-txn-modal');
      }
    }
  });
}
