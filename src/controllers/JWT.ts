require('dotenv').config();

var jwt = require('jsonwebtoken');

// Configs for Cookie-Security
const options = {
  maxAge: 1000 * 60 * 60 * 24, // Expires after 24h
  httpOnly: true,
  signed: true,
  sameSite: 'none',
  secure: true,
  path: '/',
};

const maxAge = 3600; // Define the the age, the Token should get refreshed! <<<<<<<<<<<<
const maxAgeToken = 3600 * 24; // Define the maxAge for the Token in seconds! <<<<<<<<<<<<

export function generate(username: string, mail: string, id: string) {
  return jwt.sign({ username, mail, id }, process.env.JWT_SECRET, {
    expiresIn: 300,
  });
}

export function check(req: any, res: any, next: any) {
  const token = req.signedCookies.Token;

  if (process.env.DEV_MODE === 'true') {
    next();
    return;
  }

  return jwt.verify(
    token,
    process.env.JWT_SECRET,
    { maxAge: maxAgeToken },
    (err: any, decode: any) => {
      const currentTime = new Date().getTime() / 1000;

      if (err) {
        // Handle Errors

        if (err.name === 'TokenExpiredError') {
          res.send(`TokenExpiredError: Expired at ${err.expiredAt}`);
        } else if (err.name === 'invalid token') {
          res.send(`Token is not Valid!`);
        } else {
          res.send(err);
        }
      } else {
        // If Token is valid
        if (currentTime - decode.iat >= maxAge) {
          res.cookie(
            'Token',
            generate(decode.username, decode.email, decode.id),
            options
          );
        }
        next();
      }
    }
  );
}
