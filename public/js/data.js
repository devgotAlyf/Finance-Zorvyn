// ============================================
// ZORVYN FINANCE — Data Service (API Client)
// ============================================

import { getAuthToken } from './auth.js';

// API Configuration
const API_URL = '/api';

// Helper to make API calls with JWT token
async function fetchAPI(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  
  if (response.status === 401 || response.status === 403) {
    if (window.location.hash !== '#login') {
      localStorage.removeItem('zorvyn_token');
      localStorage.removeItem('zorvyn_user');
      window.location.hash = '#login';
    }
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}

// ----------------------------------------
// Dashboard API
// ----------------------------------------
export async function getDashboardData() {
  return await fetchAPI('/dashboard/summary');
}

// ----------------------------------------
// Transactions API
// ----------------------------------------
export async function getTransactions(type = 'all', search = '') {
  return await fetchAPI(`/transactions?type=${type}&search=${search}`);
}

export async function addTransaction(data) {
  return await fetchAPI('/transactions', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateTransaction(id, data) {
  return await fetchAPI(`/transactions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function deleteTransaction(id) {
  return await fetchAPI(`/transactions/${id}`, {
    method: 'DELETE'
  });
}

// ----------------------------------------
// Users API
// ----------------------------------------
export async function getUsers() {
  return await fetchAPI('/users');
}

export async function addUser(data) {
  return await fetchAPI('/users', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateUserStatus(id, status) {
  return await fetchAPI(`/users/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

export async function deleteUser(id) {
  return await fetchAPI(`/users/${id}`, {
    method: 'DELETE'
  });
}

// ----------------------------------------
// Formatting Helpers
// ----------------------------------------
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

// For charting helpers
export function getMonthlyTrend(dashboardData) {
  // Mock trend logic based on current month
  // In a real API, the backend should send this monthly breakdown
  return {
    months: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    income: [42000, 48000, 51000, 65000, 85000, dashboardData?.kpis?.totalIncome || 125200],
    expenses: [28000, 31000, 24000, 38000, 42000, dashboardData?.kpis?.totalExpenses || 56017]
  };
}

// Export for component fallback if needed
export const TRANSACTIONS = [];
export const USERS = [];
