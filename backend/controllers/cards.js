const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные.');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки c таким id');
      } else if (JSON.stringify(req.user._id) === JSON.stringify(card.owner)) {
        Card.findByIdAndRemove(cardId)
          .then((result) => {
            res.send(result);
          });
      } else {
        throw new AuthError('Недостаточно прав для удаления данной карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      } else {
        next(err);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },

  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Нет карточки c таким id');
    }
    res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError('Переданы некорректные данные');
    } else {
      next(err);
    }
  })
  .catch(next);

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Нет карточки c таким id');
    }
    res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequestError('Переданы некорректные данные');
    } else {
      next(err);
    }
  })
  .catch(next);

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};