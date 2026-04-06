const validateTransaction = (req, res, next) => {
  const { amount, type, category, date, description } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Valid positive amount is required.' });
  }

  if (!type || !['income', 'expense'].includes(type.toLowerCase())) {
    return res.status(400).json({ error: 'Type must be "income" or "expense".' });
  }

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Valid category is required.' });
  }

  if (!date) {
    return res.status(400).json({ error: 'Date is required.' });
  }

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Valid description is required.' });
  }

  next();
};

const validateUser = (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Name, email, password, and role are required.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  if (!['admin', 'analyst', 'viewer'].includes(role.toLowerCase())) {
    return res.status(400).json({ error: 'Role must be admin, analyst, or viewer.' });
  }
  next();
};

module.exports = { validateTransaction, validateUser };
