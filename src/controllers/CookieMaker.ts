var JWT = require('../controllers/JWT');

// Configs for Cookie-Security
const options = {
  maxAge: 1000 * 60 * 60 * 24, // Expires after 24h
  httpOnly: true,
  signed: true,
  sameSite: 'none',
  secure: true,
  path: '/',
};

export async function createCookie(token: any) {
  var cookieContent = { name: 'Token', token, options };
  return cookieContent;
}
