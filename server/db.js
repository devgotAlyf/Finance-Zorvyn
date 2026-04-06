const db = {
  users: [
    { id: 'u1', name: 'Arjun Mehta', email: 'admin@zorvyn.com', password: 'admin', role: 'admin', status: 'active', joined: '15 Jan 2024' },
    { id: 'u2', name: 'Priya Sharma', email: 'analyst@zorvyn.com', password: 'analyst', role: 'analyst', status: 'active', joined: '22 Mar 2024' },
    { id: 'u3', name: 'Rohan Gupta', email: 'viewer@zorvyn.com', password: 'viewer', role: 'viewer', status: 'active', joined: '10 May 2024' },
  ],
  transactions: [
    { id: 't1', date: '20 Mar 2024', description: 'Spotify Premium', category: 'Subscriptions', type: 'expense', amount: 119 },
    { id: 't2', date: '19 Mar 2024', description: 'Coffee & Snacks', category: 'Food & Dining', type: 'expense', amount: 950 },
    { id: 't3', date: '18 Mar 2024', description: 'Side Project Income', category: 'Freelance', type: 'income', amount: 8000 },
    { id: 't4', date: '17 Mar 2024', description: 'Fuel', category: 'Transportation', type: 'expense', amount: 3000 },
    { id: 't5', date: '16 Mar 2024', description: 'Movie Tickets', category: 'Entertainment', type: 'expense', amount: 800 },
    { id: 't6', date: '15 Mar 2024', description: 'Internet Bill', category: 'Utilities', type: 'expense', amount: 1200 },
    { id: 't7', date: '14 Mar 2024', description: 'Shopping Mall', category: 'Shopping', type: 'expense', amount: 6500 },
    { id: 't8', date: '13 Mar 2024', description: 'Freelance Consulting', category: 'Freelance', type: 'income', amount: 12000 },
  ]
};

module.exports = db;
