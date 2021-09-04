const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  const token = req.cookies.jwt;

  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!token) {
    throw new UnauthorizedError('Необходимо авторизоваться');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
    req.user = payload;
    next();
  } catch (err) {
    throw new UnauthorizedError('Необходимо авторизоваться');
  }
};
