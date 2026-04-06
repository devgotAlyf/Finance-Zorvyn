const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    
    if (!userRole || !allowedRoles.includes(userRole.toLowerCase())) {
      return res.status(403).json({ 
        error: 'Forbidden. You do not have permission to perform this action.' 
      });
    }
    
    next();
  };
};

module.exports = requireRole;
