const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const token = req.header('x-access-token');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Access denied. Invalid token.' });
    }

    req.user = decoded;

    next();
  });
};



const authenticateAdminToken = (req, res, next) => {
  const token = req.header('x-access-token');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token is missing.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ error: 'Access denied. Invalid or insufficient privileges.' });
    }

    req.user = decoded;

    next();
  });
};

module.exports = {
  authenticateAdminToken,
  authenticateToken
};
