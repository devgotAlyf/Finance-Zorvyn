// ============================================
// ZORVYN FINANCE — Dashboard Page
// ============================================

import { getDashboardData, getMonthlyTrend, formatCurrency, formatDate } from '../data.js';
import { renderLineChart, renderDonutChart } from '../components/charts.js';
import { navigate } from '../router.js';

let dashboardDataCache = null;

export async function renderDashboardPage() {
  let data;
  try {
    data = await getDashboardData();
    dashboardDataCache = data;
  } catch (error) {
    return `<div class="empty-state">Failed to load dashboard data. ${error.message}</div>`;
  }

  const { kpis, expensesByCategory, recentActivity } = data;

  return `
    <div class="dashboard-page">
      <!-- KPI Cards -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">Total Income</div>
          <div class="kpi-value income num">${formatCurrency(kpis.totalIncome)}</div>
          <span class="kpi-change up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            12% vs last month
          </span>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Total Expenses</div>
          <div class="kpi-value expense num">${formatCurrency(kpis.totalExpenses)}</div>
          <span class="kpi-change down">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
            5% vs last month
          </span>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Net Balance</div>
          <div class="kpi-value num">${formatCurrency(kpis.netBalance)}</div>
          <span class="kpi-change up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            8% vs last month
          </span>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Transactions</div>
          <div class="kpi-value num">${kpis.transactionCount}</div>
          <span class="kpi-change up">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
            2% vs last month
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
            ${expensesByCategory.map(c => `
              <div class="donut-legend-item">
                <span class="donut-legend-color" style="background:var(--accent)"></span>
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
            ${recentActivity.map(t => `
              <tr>
                <td class="num" style="color: var(--text-secondary)">${formatDate(t.date)}</td>
                <td>${t.description}</td>
                <td style="color: var(--text-secondary)">${t.category}</td>
                <td><span class="badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}">${t.type}</span></td>
                <td class="text-right ${t.type === 'income' ? 'amount-income' : 'amount-expense'}">${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export function mountDashboardPage() {
  if (!dashboardDataCache) return;

  const trendData = getMonthlyTrend(dashboardDataCache);
  
  // Re-map colors for donut
  const colors = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE', '#E0E7FF'];
  
  const categoryChartData = dashboardDataCache.expensesByCategory.map((c, i) => ({
    category: c.category,
    amount: c.amount,
    color: colors[i % colors.length]
  }));

  renderLineChart('trend-chart', trendData);
  renderDonutChart('donut-chart', categoryChartData);

  // Apply colors to the legend DOM
  const legendColors = document.querySelectorAll('.donut-legend-color');
  legendColors.forEach((el, index) => {
    if (categoryChartData[index]) {
      el.style.background = categoryChartData[index].color;
    }
  });

  const viewAll = document.getElementById('view-all-txns');
  if (viewAll) {
    viewAll.addEventListener('click', () => navigate('transactions'));
  }
}
