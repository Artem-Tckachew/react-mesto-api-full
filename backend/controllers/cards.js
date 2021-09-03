const Card = require('../models/card');
const NotFound = require('../errors/notFound');
const CastError = require('../errors/castError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new CastError('переданны некорректные данные'));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFound('Карточки с таким айди не существует'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Недостаточно прав'));
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .then((deleteCard) => {
          res.status(200).send(deleteCard);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.handleCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new NotFound('Карточки с таким айди не существует'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданны некорректные данные'));
      }
      next(err);
    });
};

module.exports.handleCardDislike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFound('Карточки с таким айди не существует'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Переданны некорректные данные'));
      }
      next(err);
    });
};