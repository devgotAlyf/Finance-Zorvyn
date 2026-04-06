// ============================================
// ZORVYN FINANCE — Charts Module (Chart.js)
// ============================================

let lineChartInstance = null;
let donutChartInstance = null;

export function renderLineChart(canvasId, trendData) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (lineChartInstance) {
    lineChartInstance.destroy();
  }

  lineChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: trendData.months,
      datasets: [
        {
          label: 'Income',
          data: trendData.income,
          borderColor: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.06)',
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#059669',
          pointHoverBorderColor: '#FFFFFF',
          pointHoverBorderWidth: 2,
        },
        {
          label: 'Expenses',
          data: trendData.expenses,
          borderColor: '#DC2626',
          backgroundColor: 'rgba(220, 38, 38, 0.06)',
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#DC2626',
          pointHoverBorderColor: '#FFFFFF',
          pointHoverBorderWidth: 2,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#FFFFFF',
          borderColor: 'rgba(0,0,0,0.08)',
          borderWidth: 1,
          titleColor: '#0F172A',
          bodyColor: '#64748B',
          padding: 12,
          cornerRadius: 6,
          titleFont: { size: 13, weight: 600 },
          bodyFont: { size: 12 },
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ₹' + context.parsed.y.toLocaleString('en-IN');
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: '#64748B',
            font: { size: 11, weight: 500 }
          }
        },
        y: {
          grid: {
            color: 'rgba(0,0,0,0.05)',
            lineWidth: 1,
          },
          border: { display: false },
          ticks: {
            color: '#64748B',
            font: { size: 11 },
            callback: function(value) {
              return '₹' + (value / 1000).toFixed(0) + 'k';
            },
            maxTicksLimit: 5,
          }
        }
      }
    }
  });
}

export function renderDonutChart(canvasId, categoryData) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (donutChartInstance) {
    donutChartInstance.destroy();
  }

  donutChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: categoryData.map(c => c.category),
      datasets: [{
        data: categoryData.map(c => c.amount),
        backgroundColor: categoryData.map(c => c.color),
        borderColor: '#FFFFFF',
        borderWidth: 2,
        hoverBorderColor: '#F5F5F0',
        hoverOffset: 4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#FFFFFF',
          borderColor: 'rgba(0,0,0,0.08)',
          borderWidth: 1,
          titleColor: '#0F172A',
          bodyColor: '#64748B',
          padding: 12,
          cornerRadius: 6,
          callbacks: {
            label: function(context) {
              return ' ₹' + context.parsed.toLocaleString('en-IN');
            }
          }
        }
      }
    }
  });
}

export function destroyCharts() {
  if (lineChartInstance) { lineChartInstance.destroy(); lineChartInstance = null; }
  if (donutChartInstance) { donutChartInstance.destroy(); donutChartInstance = null; }
}
