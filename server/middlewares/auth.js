const jwt = require('jsonwebtoken');

const JWT_SECRET = 'zorvyn-super-secret-key-for-assessment';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    // Attach decoded user info (like role, id) to the request
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken, JWT_SECRET };
