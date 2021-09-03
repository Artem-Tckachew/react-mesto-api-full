const router = require('express').Router();
const NotFound = require('../errors/notFound');

router.get('/', (req, res, next) => {
  next(new NotFound('Запрашиваемый ресурс не найден'));
});

module.exports = router;