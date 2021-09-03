const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  currentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', currentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      } return helpers.message('Переданна не валидная ссылка');
    }),
  }),
}), updateAvatar);

module.exports = router;
