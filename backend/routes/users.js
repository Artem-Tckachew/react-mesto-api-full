const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  currentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);
router.get('/me', currentUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value) => {
      if (!isURL(value)) {
        throw new Error('Ссылка некоректная');
      }
      return value;
    }),
  }),
}), updateAvatar);

module.exports = router;
