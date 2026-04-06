const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

// Middlewares
const { authenticateToken, JWT_SECRET } = require('./server/middlewares/auth');
const requireRole = require('./server/middlewares/role');
const { validateTransaction, validateUser } = require('./server/middlewares/validate');

// Database (In-Memory)
const db = require('./server/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// 1. AUTHENTICATION API
// ==========================================
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email && u.password === password && u.status === 'active');
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password, or account inactive.' });
  }

  // Assign JWT
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '8h' });
  
  // Return user (except password) and token
  const { password: _, ...userWithoutPassword } = user;
  res.json({ token, user: userWithoutPassword });
});

// ==========================================
// 2. DASHBOARD SUMMARY API
// ==========================================
// Viewers, Analysts, and Admins can view summary
app.get('/api/dashboard/summary', authenticateToken, requireRole(['admin', 'analyst', 'viewer']), (req, res) => {
  const { transactions } = db;
  
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  // Category breakdown logic
  const expenses = transactions.filter(t => t.type === 'expense');
  const catBreakdown = expenses.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {});

  const expensesByCategory = Object.keys(catBreakdown).map(k => ({
    category: k,
    amount: catBreakdown[k],
    percentage: Math.round((catBreakdown[k] / totalExpenses) * 100) || 0
  })).sort((a,b) => b.amount - a.amount);

  // Recent 5 activity
  const recentActivity = [...transactions].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  res.json({
    kpis: {
      totalIncome,
      totalExpenses,
      netBalance,
      transactionCount: transactions.length
    },
    expensesByCategory,
    recentActivity
  });
});

// ==========================================
// 3. FINANCIAL RECORDS API
// ==========================================
app.get('/api/transactions', authenticateToken, requireRole(['admin', 'analyst', 'viewer']), (req, res) => {
  const { type, search } = req.query;
  let results = [...db.transactions];

  if (type && type !== 'all') {
    results = results.filter(t => t.type === type);
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(t => t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
  }
  
  // Sort by date desc
  results.sort((a,b) => new Date(b.date) - new Date(a.date));

  res.json({ transactions: results, total: results.length });
});

app.post('/api/transactions', authenticateToken, requireRole(['admin']), validateTransaction, (req, res) => {
  const newTx = {
    id: `t${Date.now()}`,
    ...req.body
  };
  db.transactions.push(newTx);
  res.status(201).json(newTx);
});

app.put('/api/transactions/:id', authenticateToken, requireRole(['admin']), validateTransaction, (req, res) => {
  const index = db.transactions.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Transaction not found.' });
  
  db.transactions[index] = { ...db.transactions[index], ...req.body };
  res.json(db.transactions[index]);
});

app.delete('/api/transactions/:id', authenticateToken, requireRole(['admin']), (req, res) => {
  const index = db.transactions.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Transaction not found.' });
  
  db.transactions.splice(index, 1);
  res.json({ message: 'Transaction deleted.' });
});

// ==========================================
// 4. USER MANAGEMENT API
// ==========================================
app.get('/api/users', authenticateToken, requireRole(['admin']), (req, res) => {
  const safeUsers = db.users.map(u => {
    const { password, ...rest } = u;
    return rest;
  });
  res.json({ users: safeUsers });
});

app.post('/api/users', authenticateToken, requireRole(['admin']), validateUser, (req, res) => {
  // Prevent duplicate email
  if (db.users.find(u => u.email === req.body.email)) {
    return res.status(400).json({ error: 'User with this email already exists.' });
  }

  const newUser = {
    id: `u${Date.now()}`,
    ...req.body,
    status: 'active',
    joined: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  };
  
  db.users.push(newUser);
  const { password, ...returnUser } = newUser;
  res.status(201).json(returnUser);
});

app.patch('/api/users/:id/status', authenticateToken, requireRole(['admin']), (req, res) => {
  const { status } = req.body;
  if (!['active', 'inactive'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }

  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found.' });

  // Can't deactivate yourself
  if (db.users[index].id === req.user.id) {
    return res.status(400).json({ error: 'Cannot change your own status.' });
  }

  db.users[index].status = status;
  res.json({ message: 'User status updated successfully.', user: db.users[index].id, status });
});

app.delete('/api/users/:id', authenticateToken, requireRole(['admin']), (req, res) => {
  const index = db.users.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found.' });

  if (db.users[index].id === req.user.id) {
    return res.status(400).json({ error: 'Cannot delete yourself.' });
  }

  db.users.splice(index, 1);
  res.json({ message: 'User deleted.' });
});

// Fallback for SPA routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Finance-dev API is running on http://localhost:${PORT}`);
});
