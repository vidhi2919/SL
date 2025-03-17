/*
const admin = require('../config/firebase');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get Bearer token
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        // Verify Firebase token
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // Attach user data to request
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(403).json({ error: 'Unauthorized: Invalid token' });
    }
};

module.exports = verifyToken;
*/
const admin = require('../config/firebase');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // ✅ Attach decoded token to req.user
    next(); // ✅ Proceed to next middleware
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = verifyToken;
