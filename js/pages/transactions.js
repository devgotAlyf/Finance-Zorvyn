// ============================================
// ZORVYN FINANCE — Transactions Page
// ============================================

import { TRANSACTIONS, EXPENSE_CATEGORIES, INCOME_CATEGORIES, CATEGORIES, formatCurrency, formatDate, getNextTxnId } from '../data.js';
import { openDrawer, closeDrawer } from '../components/drawer.js';
import { showModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

const ITEMS_PER_PAGE = 10;
let currentPage = 1;
let filterType = 'All';
let filterCategory = 'All';
let filterSearch = '';

function getFilteredTransactions() {
  let txns = [...TRANSACTIONS].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filterType !== 'All') {
    txns = txns.filter(t => t.type === filterType);
  }
  if (filterCategory !== 'All') {
    txns = txns.filter(t => t.category === filterCategory);
  }
  if (filterSearch) {
    const q = filterSearch.toLowerCase();
    txns = txns.filter(t =>
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.notes.toLowerCase().includes(q)
    );
  }
  return txns;
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  if (totalPages <= 1) return '';

  const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const end = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  let pageButtons = '';
  for (let i = 1; i <= totalPages; i++) {
    if (totalPages > 7) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageButtons += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageButtons += `<span style="color: var(--text-tertiary); padding: 0 4px;">…</span>`;
      }
    } else {
      pageButtons += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }
  }

  return `
    <div class="table-pagination">
      <span class="pagination-info">Showing ${start}–${end} of ${totalItems}</span>
      <div class="pagination-controls">
        <button class="pagination-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        ${pageButtons}
        <button class="pagination-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  `;
}

export function renderTransactionsPage() {
  const allCategories = [...new Set(TRANSACTIONS.map(t => t.category))].sort();
  const filtered = getFilteredTransactions();
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  if (currentPage > totalPages) currentPage = 1;
  const pageTxns = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return `
    <div class="transactions-page">
      <div class="page-heading">
        <h1>Transactions</h1>
        <button class="btn btn-primary" id="add-transaction-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M12 5v14M5 12h14"/></svg>
          Add Transaction
        </button>
      </div>

      <div class="filter-bar">
        <input type="text" class="filter-input" id="txn-search" placeholder="Search transactions..." value="${filterSearch}">
        <select class="filter-select" id="txn-type-filter">
          <option value="All" ${filterType === 'All' ? 'selected' : ''}>All Types</option>
          <option value="Income" ${filterType === 'Income' ? 'selected' : ''}>Income</option>
          <option value="Expense" ${filterType === 'Expense' ? 'selected' : ''}>Expense</option>
        </select>
        <select class="filter-select" id="txn-category-filter">
          <option value="All" ${filterCategory === 'All' ? 'selected' : ''}>All Categories</option>
          ${allCategories.map(c => `<option value="${c}" ${filterCategory === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>

      <div class="data-table-wrapper">
        <div style="overflow-x: auto">
          <table class="data-table" id="txn-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th class="text-right">Amount</th>
                <th style="width:80px">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${pageTxns.length === 0 
                ? `<tr><td colspan="6" style="text-align:center; color: var(--text-secondary); padding: 48px 0;">No transactions found</td></tr>`
                : pageTxns.map(t => `
                <tr data-id="${t.id}">
                  <td class="num" style="color: var(--text-secondary)">${formatDate(t.date)}</td>
                  <td>${t.description}</td>
                  <td style="color: var(--text-secondary)">${t.category}</td>
                  <td><span class="badge ${t.type === 'Income' ? 'badge-income' : 'badge-expense'}">${t.type}</span></td>
                  <td class="text-right ${t.type === 'Income' ? 'amount-income' : 'amount-expense'}">${t.type === 'Income' ? '+' : '-'}${formatCurrency(t.amount)}</td>
                  <td>
                    <div class="row-actions">
                      <button class="row-action-btn edit-txn" title="Edit" data-id="${t.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                      </button>
                      <button class="row-action-btn delete delete-txn" title="Delete" data-id="${t.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        ${renderPagination(filtered.length)}
      </div>
    </div>
  `;
}

function openAddDrawer(editTxn = null) {
  const isEdit = !!editTxn;
  const type = editTxn ? editTxn.type : 'Expense';
  const cats = type === 'Income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const bodyHtml = `
    <form id="txn-drawer-form" autocomplete="off">
      <div class="form-group">
        <label class="form-label">Amount (₹)</label>
        <input type="number" class="form-input" id="drawer-amount" placeholder="0" min="1" value="${editTxn ? editTxn.amount : ''}" required>
        <div class="form-error" id="err-amount"></div>
      </div>
      <div class="form-group">
        <label class="form-label">Type</label>
        <div class="type-toggle" id="drawer-type-toggle">
          <button type="button" class="type-toggle-btn ${type === 'Income' ? 'active-income' : ''}" data-type="Income">Income</button>
          <button type="button" class="type-toggle-btn ${type === 'Expense' ? 'active-expense' : ''}" data-type="Expense">Expense</button>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="drawer-category" required>
          ${cats.map(c => `<option value="${c}" ${editTxn && editTxn.category === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
        <div class="form-error" id="err-category"></div>
      </div>
      <div class="form-group">
        <label class="form-label">Date</label>
        <input type="date" class="form-input" id="drawer-date" value="${editTxn ? editTxn.date : new Date().toISOString().split('T')[0]}" required>
        <div class="form-error" id="err-date"></div>
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <input type="text" class="form-input" id="drawer-description" placeholder="e.g. Monthly salary" value="${editTxn ? editTxn.description : ''}" required>
        <div class="form-error" id="err-description"></div>
      </div>
      <div class="form-group">
        <label class="form-label">Notes (optional)</label>
        <textarea class="form-textarea" id="drawer-notes" placeholder="Additional details...">${editTxn ? editTxn.notes : ''}</textarea>
      </div>
    </form>
  `;

  const footerHtml = `
    <button class="btn btn-ghost" id="drawer-cancel-btn">Cancel</button>
    <button class="btn btn-primary" id="drawer-submit-btn">${isEdit ? 'Update' : 'Add'} Transaction</button>
  `;

  openDrawer(isEdit ? 'Edit Transaction' : 'Add Transaction', bodyHtml, footerHtml);

  // Type toggle logic
  let selectedType = type;
  setTimeout(() => {
    const toggleBtns = document.querySelectorAll('#drawer-type-toggle .type-toggle-btn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        toggleBtns.forEach(b => { b.classList.remove('active-income', 'active-expense'); });
        selectedType = btn.dataset.type;
        btn.classList.add(selectedType === 'Income' ? 'active-income' : 'active-expense');
        // Update category options
        const catSelect = document.getElementById('drawer-category');
        const newCats = selectedType === 'Income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
        catSelect.innerHTML = newCats.map(c => `<option value="${c}">${c}</option>`).join('');
      });
    });

    // Cancel
    document.getElementById('drawer-cancel-btn').addEventListener('click', closeDrawer);

    // Submit
    document.getElementById('drawer-submit-btn').addEventListener('click', () => {
      const amount = parseInt(document.getElementById('drawer-amount').value);
      const category = document.getElementById('drawer-category').value;
      const date = document.getElementById('drawer-date').value;
      const description = document.getElementById('drawer-description').value.trim();
      const notes = document.getElementById('drawer-notes').value.trim();

      // Validate
      let valid = true;
      if (!amount || amount <= 0) {
        document.getElementById('err-amount').textContent = 'Enter a valid amount';
        document.getElementById('drawer-amount').classList.add('error');
        valid = false;
      }
      if (!description) {
        document.getElementById('err-description').textContent = 'Description is required';
        document.getElementById('drawer-description').classList.add('error');
        valid = false;
      }
      if (!date) {
        document.getElementById('err-date').textContent = 'Date is required';
        document.getElementById('drawer-date').classList.add('error');
        valid = false;
      }
      if (!valid) return;

      if (isEdit) {
        const idx = TRANSACTIONS.findIndex(t => t.id === editTxn.id);
        if (idx !== -1) {
          TRANSACTIONS[idx] = { ...TRANSACTIONS[idx], amount, type: selectedType, category, date, description, notes };
        }
        showToast('Transaction updated successfully');
      } else {
        TRANSACTIONS.push({
          id: getNextTxnId(),
          date,
          description,
          category,
          type: selectedType,
          amount,
          notes
        });
        showToast('Transaction added successfully');
      }

      closeDrawer();
      // Re-render
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
  }, 50);
}

export function mountTransactionsPage() {
  // Search
  const searchInput = document.getElementById('txn-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterSearch = e.target.value;
      currentPage = 1;
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
  }

  // Type filter
  const typeFilter = document.getElementById('txn-type-filter');
  if (typeFilter) {
    typeFilter.addEventListener('change', (e) => {
      filterType = e.target.value;
      currentPage = 1;
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
  }

  // Category filter
  const catFilter = document.getElementById('txn-category-filter');
  if (catFilter) {
    catFilter.addEventListener('change', (e) => {
      filterCategory = e.target.value;
      currentPage = 1;
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
  }

  // Pagination
  document.querySelectorAll('.pagination-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.dataset.page;
      if (page === 'prev' && currentPage > 1) currentPage--;
      else if (page === 'next') currentPage++;
      else if (page !== 'prev' && page !== 'next') currentPage = parseInt(page);
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
  });

  // Add transaction button
  const addBtn = document.getElementById('add-transaction-btn');
  if (addBtn) {
    addBtn.addEventListener('click', () => openAddDrawer());
  }

  // Edit buttons
  document.querySelectorAll('.edit-txn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const txn = TRANSACTIONS.find(t => t.id === id);
      if (txn) openAddDrawer(txn);
    });
  });

  // Delete buttons
  document.querySelectorAll('.delete-txn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      showModal(
        'Delete Transaction',
        'Are you sure you want to delete this transaction? This action cannot be undone.',
        'Delete',
        () => {
          const idx = TRANSACTIONS.findIndex(t => t.id === id);
          if (idx !== -1) TRANSACTIONS.splice(idx, 1);
          showToast('Transaction deleted');
          window.dispatchEvent(new HashChangeEvent('hashchange'));
        },
        true
      );
    });
  });
}
