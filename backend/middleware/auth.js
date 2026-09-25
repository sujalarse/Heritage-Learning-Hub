const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token malformed.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    req.user = verified; // { id, role }
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const verifyTeacherOrAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === 'Teacher' || req.user.role === 'Admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Teachers or Admins only.' });
    }
  });
};

module.exports = { verifyToken, verifyTeacherOrAdmin };