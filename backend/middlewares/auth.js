const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/unAuthorizedError');

const { JWT_SECRET = 'dev-key' } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    next(new UnAuthorizedError('Необходима авторизация'));
  } else {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new UnAuthorizedError('Недействительный токен'));
    }
    req.user = payload;

    next();
  }
};
