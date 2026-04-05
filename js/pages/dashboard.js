// ============================================
// ZORVYN FINANCE — Dashboard Page
// ============================================

import { TRANSACTIONS, computeKPIs, getMonthlyTrend, getCategoryBreakdown, formatCurrency, formatDate } from '../data.js';
import { renderLineChart, renderDonutChart } from '../components/charts.js';
import { navigate } from '../router.js';

export function renderDashboardPage() {
  const kpis = computeKPIs(TRANSACTIONS);
  const categoryData = getCategoryBreakdown(TRANSACTIONS);
  const recentTxns = [...TRANSACTIONS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8);

  return `
    <div class="dashboard-page">
      <!-- KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Total Income</div>
          <div class="kpi-value income num">${formatCurrency(kpis.totalIncome)}</div>
          <span class="kpi-change ${kpis.incomeChange >= 0 ? 'up' : 'down'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              ${kpis.incomeChange >= 0
                ? '<path d="M18 15l-6-6-6 6"/>'
                : '<path d="M6 9l6 6 6-6"/>'}
            </svg>
            ${Math.abs(kpis.incomeChange)}% vs last month
          </span>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Total Expenses</div>
          <div class="kpi-value expense num">${formatCurrency(kpis.totalExpenses)}</div>
          <span class="kpi-change ${kpis.expenseChange <= 0 ? 'up' : 'down'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              ${kpis.expenseChange <= 0
                ? '<path d="M18 15l-6-6-6 6"/>'
                : '<path d="M6 9l6 6 6-6"/>'}
            </svg>
            ${Math.abs(kpis.expenseChange)}% vs last month
          </span>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Net Balance</div>
          <div class="kpi-value num">${formatCurrency(kpis.netBalance)}</div>
          <span class="kpi-change ${kpis.netChange >= 0 ? 'up' : 'down'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              ${kpis.netChange >= 0
                ? '<path d="M18 15l-6-6-6 6"/>'
                : '<path d="M6 9l6 6 6-6"/>'}
            </svg>
            ${Math.abs(kpis.netChange)}% vs last month
          </span>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Transactions</div>
          <div class="kpi-value num">${kpis.totalTransactions}</div>
          <span class="kpi-change ${kpis.transactionChange >= 0 ? 'up' : 'down'}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              ${kpis.transactionChange >= 0
                ? '<path d="M18 15l-6-6-6 6"/>'
                : '<path d="M6 9l6 6 6-6"/>'}
            </svg>
            ${Math.abs(kpis.transactionChange)}% vs last month
          </span>
        </div>
      </div>

      <!-- Charts -->
      <div class="charts-grid">
        <div class="chart-card">
          <div class="chart-header">
            <span class="chart-title">Income vs Expenses</span>
            <div class="chart-legend">
              <div class="chart-legend-item">
                <span class="chart-legend-dot" style="background:#059669"></span>
                Income
              </div>
              <div class="chart-legend-item">
                <span class="chart-legend-dot" style="background:#DC2626"></span>
                Expenses
              </div>
            </div>
          </div>
          <div class="chart-canvas-wrapper" style="height:260px">
            <canvas id="trend-chart"></canvas>
          </div>
        </div>
        <div class="chart-card">
          <div class="chart-header">
            <span class="chart-title">Expense Breakdown</span>
          </div>
          <div class="chart-canvas-wrapper" style="height:180px">
            <canvas id="donut-chart"></canvas>
          </div>
          <div class="donut-legend">
            ${categoryData.map(c => `
              <div class="donut-legend-item">
                <span class="donut-legend-color" style="background:${c.color}"></span>
                <span class="donut-legend-name">${c.category}</span>
                <span class="donut-legend-amount num">${formatCurrency(c.amount)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="data-table-wrapper">
        <div class="data-table-header">
          <span class="data-table-title">Recent Transactions</span>
          <a class="section-link" id="view-all-txns" style="cursor:pointer; color: var(--accent); font-size: 0.8125rem; font-weight: 500;">View All →</a>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th class="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${recentTxns.map(t => `
              <tr>
                <td class="num" style="color: var(--text-secondary)">${formatDate(t.date)}</td>
                <td>${t.description}</td>
                <td style="color: var(--text-secondary)">${t.category}</td>
                <td><span class="badge ${t.type === 'Income' ? 'badge-income' : 'badge-expense'}">${t.type}</span></td>
                <td class="text-right ${t.type === 'Income' ? 'amount-income' : 'amount-expense'}">${t.type === 'Income' ? '+' : '-'}${formatCurrency(t.amount)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function mountDashboardPage() {
  const trendData = getMonthlyTrend(TRANSACTIONS);
  const categoryData = getCategoryBreakdown(TRANSACTIONS);

  renderLineChart('trend-chart', trendData);
  renderDonutChart('donut-chart', categoryData);

  const viewAll = document.getElementById('view-all-txns');
  if (viewAll) {
    viewAll.addEventListener('click', () => navigate('transactions'));
  }
}
