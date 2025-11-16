const jwt = require('jsonwebtoken');

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'test_access_secret';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test_refresh_secret';

if (process.env.NODE_ENV === 'production') {
  if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be set in production');
  }
}

const signAccess = (payload) =>
  jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' });

const signRefresh = (payload) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });

const verifyAccess = (token) =>
  jwt.verify(token, ACCESS_SECRET);

const verifyRefresh = (token) =>
  jwt.verify(token, REFRESH_SECRET);

module.exports = { signAccess, signRefresh, verifyAccess, verifyRefresh };

