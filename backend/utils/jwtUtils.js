const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysupersecretkey1234';
const generateToken = (user) => {
  return jwt.sign(
    { id: user.userid, email: user.email },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
};

module.exports = {
  generateToken,
};
