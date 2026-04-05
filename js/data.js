// ============================================
// ZORVYN FINANCE — Mock Data
// ============================================

export const USERS_DB = [
  { id: 1, name: 'Arjun Mehta',    email: 'admin@zorvyn.com',    password: 'admin123',    role: 'Admin',   status: 'Active',   joined: '2024-01-15', avatar: 'AM' },
  { id: 2, name: 'Priya Sharma',   email: 'analyst@zorvyn.com',  password: 'analyst123',  role: 'Analyst', status: 'Active',   joined: '2024-03-22', avatar: 'PS' },
  { id: 3, name: 'Rohan Gupta',    email: 'viewer@zorvyn.com',   password: 'viewer123',   role: 'Viewer',  status: 'Active',   joined: '2024-05-10', avatar: 'RG' },
  { id: 4, name: 'Sneha Patel',    email: 'sneha@zorvyn.com',    password: 'pass123',     role: 'Analyst', status: 'Active',   joined: '2024-06-01', avatar: 'SP' },
  { id: 5, name: 'Vikram Singh',   email: 'vikram@zorvyn.com',   password: 'pass123',     role: 'Viewer',  status: 'Inactive', joined: '2024-07-18', avatar: 'VS' },
  { id: 6, name: 'Ananya Iyer',    email: 'ananya@zorvyn.com',   password: 'pass123',     role: 'Viewer',  status: 'Active',   joined: '2024-08-05', avatar: 'AI' },
  { id: 7, name: 'Karan Desai',    email: 'karan@zorvyn.com',    password: 'pass123',     role: 'Analyst', status: 'Active',   joined: '2024-09-12', avatar: 'KD' },
  { id: 8, name: 'Meera Joshi',    email: 'meera@zorvyn.com',    password: 'pass123',     role: 'Viewer',  status: 'Inactive', joined: '2024-10-01', avatar: 'MJ' },
];

export const CATEGORIES = [
  'Salary', 'Freelance', 'Investments', 'Rent', 'Utilities',
  'Food & Dining', 'Transportation', 'Entertainment', 'Healthcare',
  'Shopping', 'Education', 'Insurance', 'Subscriptions', 'Travel', 'Other'
];

export const EXPENSE_CATEGORIES = [
  'Rent', 'Utilities', 'Food & Dining', 'Transportation', 'Entertainment',
  'Healthcare', 'Shopping', 'Education', 'Insurance', 'Subscriptions', 'Travel', 'Other'
];

export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Investments', 'Other'];

let nextTxnId = 51;

export function getNextTxnId() {
  return nextTxnId++;
}

export const TRANSACTIONS = [
  { id: 1,  date: '2025-03-01', description: 'Monthly Salary',           category: 'Salary',         type: 'Income',  amount: 85000,  notes: 'March salary deposit' },
  { id: 2,  date: '2025-03-02', description: 'Apartment Rent',           category: 'Rent',           type: 'Expense', amount: 22000,  notes: 'Monthly rent' },
  { id: 3,  date: '2025-03-03', description: 'Electricity Bill',         category: 'Utilities',      type: 'Expense', amount: 3200,   notes: 'Feb bill' },
  { id: 4,  date: '2025-03-04', description: 'Grocery Shopping',         category: 'Food & Dining',  type: 'Expense', amount: 4500,   notes: 'Weekly groceries' },
  { id: 5,  date: '2025-03-05', description: 'Freelance Project',        category: 'Freelance',      type: 'Income',  amount: 15000,  notes: 'UI design project' },
  { id: 6,  date: '2025-03-06', description: 'Uber Rides',               category: 'Transportation', type: 'Expense', amount: 1800,   notes: 'Weekly commute' },
  { id: 7,  date: '2025-03-07', description: 'Netflix Subscription',     category: 'Subscriptions',  type: 'Expense', amount: 649,    notes: 'Monthly' },
  { id: 8,  date: '2025-03-08', description: 'Dividend Income',          category: 'Investments',    type: 'Income',  amount: 5200,   notes: 'Q1 dividends' },
  { id: 9,  date: '2025-03-09', description: 'Restaurant Dinner',        category: 'Food & Dining',  type: 'Expense', amount: 2800,   notes: 'Team dinner' },
  { id: 10, date: '2025-03-10', description: 'Health Insurance',         category: 'Insurance',      type: 'Expense', amount: 4500,   notes: 'Monthly premium' },
  { id: 11, date: '2025-03-11', description: 'Online Course',            category: 'Education',      type: 'Expense', amount: 1999,   notes: 'React advanced' },
  { id: 12, date: '2025-03-12', description: 'Gym Membership',           category: 'Healthcare',     type: 'Expense', amount: 2000,   notes: 'Monthly' },
  { id: 13, date: '2025-03-13', description: 'Freelance Consulting',     category: 'Freelance',      type: 'Income',  amount: 12000,  notes: 'Strategy session' },
  { id: 14, date: '2025-03-14', description: 'Shopping Mall',            category: 'Shopping',       type: 'Expense', amount: 6500,   notes: 'Clothes' },
  { id: 15, date: '2025-03-15', description: 'Internet Bill',            category: 'Utilities',      type: 'Expense', amount: 1200,   notes: 'Broadband' },
  { id: 16, date: '2025-03-16', description: 'Movie Tickets',            category: 'Entertainment',  type: 'Expense', amount: 800,    notes: 'Weekend outing' },
  { id: 17, date: '2025-03-17', description: 'Fuel',                     category: 'Transportation', type: 'Expense', amount: 3000,   notes: 'Petrol fill' },
  { id: 18, date: '2025-03-18', description: 'Side Project Income',      category: 'Freelance',      type: 'Income',  amount: 8000,   notes: 'Logo design' },
  { id: 19, date: '2025-03-19', description: 'Coffee & Snacks',          category: 'Food & Dining',  type: 'Expense', amount: 950,    notes: '' },
  { id: 20, date: '2025-03-20', description: 'Spotify Premium',          category: 'Subscriptions',  type: 'Expense', amount: 119,    notes: 'Annual plan monthly' },
  { id: 21, date: '2025-02-01', description: 'Monthly Salary',           category: 'Salary',         type: 'Income',  amount: 85000,  notes: 'February salary' },
  { id: 22, date: '2025-02-02', description: 'Apartment Rent',           category: 'Rent',           type: 'Expense', amount: 22000,  notes: '' },
  { id: 23, date: '2025-02-05', description: 'Freelance Work',           category: 'Freelance',      type: 'Income',  amount: 10000,  notes: '' },
  { id: 24, date: '2025-02-08', description: 'Grocery',                  category: 'Food & Dining',  type: 'Expense', amount: 3800,   notes: '' },
  { id: 25, date: '2025-02-10', description: 'Bus Pass',                 category: 'Transportation', type: 'Expense', amount: 1500,   notes: 'Monthly pass' },
  { id: 26, date: '2025-02-12', description: 'Investment Returns',       category: 'Investments',    type: 'Income',  amount: 7500,   notes: '' },
  { id: 27, date: '2025-02-15', description: 'Phone Bill',               category: 'Utilities',      type: 'Expense', amount: 799,    notes: '' },
  { id: 28, date: '2025-02-18', description: 'Book Purchase',            category: 'Education',      type: 'Expense', amount: 1200,   notes: '' },
  { id: 29, date: '2025-02-20', description: 'Concert Tickets',          category: 'Entertainment',  type: 'Expense', amount: 3500,   notes: '' },
  { id: 30, date: '2025-02-25', description: 'Medical Checkup',          category: 'Healthcare',     type: 'Expense', amount: 2500,   notes: '' },
  { id: 31, date: '2025-01-01', description: 'Monthly Salary',           category: 'Salary',         type: 'Income',  amount: 82000,  notes: 'January salary' },
  { id: 32, date: '2025-01-03', description: 'Apartment Rent',           category: 'Rent',           type: 'Expense', amount: 22000,  notes: '' },
  { id: 33, date: '2025-01-05', description: 'New Year Shopping',        category: 'Shopping',       type: 'Expense', amount: 8500,   notes: '' },
  { id: 34, date: '2025-01-08', description: 'Freelance Project',        category: 'Freelance',      type: 'Income',  amount: 20000,  notes: '' },
  { id: 35, date: '2025-01-10', description: 'Groceries',                category: 'Food & Dining',  type: 'Expense', amount: 5200,   notes: '' },
  { id: 36, date: '2025-01-12', description: 'Electricity Bill',         category: 'Utilities',      type: 'Expense', amount: 2800,   notes: '' },
  { id: 37, date: '2025-01-15', description: 'Train Travel',             category: 'Travel',         type: 'Expense', amount: 4500,   notes: 'Weekend trip' },
  { id: 38, date: '2025-01-18', description: 'Investment Dividend',      category: 'Investments',    type: 'Income',  amount: 3000,   notes: '' },
  { id: 39, date: '2025-01-20', description: 'Insurance Premium',        category: 'Insurance',      type: 'Expense', amount: 4500,   notes: '' },
  { id: 40, date: '2025-01-25', description: 'Pharmacy',                 category: 'Healthcare',     type: 'Expense', amount: 1500,   notes: '' },
  { id: 41, date: '2024-12-01', description: 'Monthly Salary',           category: 'Salary',         type: 'Income',  amount: 82000,  notes: '' },
  { id: 42, date: '2024-12-03', description: 'Rent',                     category: 'Rent',           type: 'Expense', amount: 22000,  notes: '' },
  { id: 43, date: '2024-12-07', description: 'Year-end Bonus',           category: 'Salary',         type: 'Income',  amount: 40000,  notes: '' },
  { id: 44, date: '2024-12-10', description: 'Holiday Shopping',         category: 'Shopping',       type: 'Expense', amount: 12000,  notes: '' },
  { id: 45, date: '2024-12-15', description: 'Travel Booking',           category: 'Travel',         type: 'Expense', amount: 15000,  notes: 'Goa trip' },
  { id: 46, date: '2024-12-18', description: 'Gas Bill',                 category: 'Utilities',      type: 'Expense', amount: 1800,   notes: '' },
  { id: 47, date: '2024-12-20', description: 'Restaurant',               category: 'Food & Dining',  type: 'Expense', amount: 3500,   notes: '' },
  { id: 48, date: '2024-12-22', description: 'Freelance Payment',        category: 'Freelance',      type: 'Income',  amount: 18000,  notes: '' },
  { id: 49, date: '2024-12-25', description: 'Gift Shopping',            category: 'Shopping',       type: 'Expense', amount: 5000,   notes: '' },
  { id: 50, date: '2024-12-28', description: 'AWS Hosting',              category: 'Subscriptions',  type: 'Expense', amount: 2500,   notes: 'Monthly hosting' },
];

// --- Computed KPIs ---
export function computeKPIs(transactions) {
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  // Use March 2025 as "current" month for demo data
  const currentMonth = 2; // March (0-indexed)
  const currentYear = 2025;
  const prevMonth = 1; // February
  const prevYear = 2025;

  const currentTxns = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const prevTxns = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
  });

  const totalIncome = currentTxns.filter(t => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = currentTxns.filter(t => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);
  const prevIncome = prevTxns.filter(t => t.type === 'Income').reduce((s, t) => s + t.amount, 0);
  const prevExpenses = prevTxns.filter(t => t.type === 'Expense').reduce((s, t) => s + t.amount, 0);

  const incomeChange = prevIncome ? (((totalIncome - prevIncome) / prevIncome) * 100).toFixed(1) : 0;
  const expenseChange = prevExpenses ? (((totalExpenses - prevExpenses) / prevExpenses) * 100).toFixed(1) : 0;
  const netBalance = totalIncome - totalExpenses;
  const prevNet = prevIncome - prevExpenses;
  const netChange = prevNet ? (((netBalance - prevNet) / Math.abs(prevNet)) * 100).toFixed(1) : 0;

  return {
    totalIncome,
    totalExpenses,
    netBalance,
    totalTransactions: currentTxns.length,
    prevTransactions: prevTxns.length,
    incomeChange: parseFloat(incomeChange),
    expenseChange: parseFloat(expenseChange),
    netChange: parseFloat(netChange),
    transactionChange: prevTxns.length ? parseFloat((((currentTxns.length - prevTxns.length) / prevTxns.length) * 100).toFixed(1)) : 0,
  };
}

// --- Monthly trend data ---
export function getMonthlyTrend(transactions) {
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const monthMap = {
    'Oct': { m: 9, y: 2024 }, 'Nov': { m: 10, y: 2024 }, 'Dec': { m: 11, y: 2024 },
    'Jan': { m: 0, y: 2025 }, 'Feb': { m: 1, y: 2025 }, 'Mar': { m: 2, y: 2025 }
  };

  const income = [];
  const expenses = [];

  months.forEach(label => {
    const { m, y } = monthMap[label];
    const monthTxns = transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === m && d.getFullYear() === y;
    });
    income.push(monthTxns.filter(t => t.type === 'Income').reduce((s, t) => s + t.amount, 0));
    expenses.push(monthTxns.filter(t => t.type === 'Expense').reduce((s, t) => s + t.amount, 0));
  });

  return { months, income, expenses };
}

// --- Category breakdown ---
export function getCategoryBreakdown(transactions) {
  // Current month expenses
  const currentTxns = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === 2 && d.getFullYear() === 2025 && t.type === 'Expense';
  });

  const catMap = {};
  currentTxns.forEach(t => {
    catMap[t.category] = (catMap[t.category] || 0) + t.amount;
  });

  const sorted = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
  const colors = ['#4F46E5', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#06B6D4', '#84CC16', '#F97316', '#6366F1', '#14B8A6'];

  return sorted.map(([category, amount], i) => ({
    category,
    amount,
    color: colors[i % colors.length]
  }));
}

// --- Utility formatters ---
export function formatCurrency(amount) {
  return '₹' + Math.abs(amount).toLocaleString('en-IN');
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
