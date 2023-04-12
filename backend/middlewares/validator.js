const { Joi, celebrate } = require('celebrate');
const { REGEX_URL } = require('../utils/constants');

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(REGEX_URL),
  }),
});

const deleteCardByIdValidator = celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    /* 15.  Id валидируем как hex последовательность длиной 24 символа */
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(REGEX_URL),
  }),
});

const addCardLikeValidator = celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    /* 16. Id валидируем как hex последовательность длиной 24 символа */
    cardId: Joi.string().length(24).hex().required(),
  }),
});

const removeCardLikeValidator = celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    /* 17. Id валидируем как hex последовательность длиной 24 символа */
    cardId: Joi.string().length(24).hex().required(),
  }),
});
const getUserByIdValidator = celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    /* 18. Id валидируем как hex последовательность длиной 24 символа */
    userId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  signinValidator,
  signupValidator,
  deleteCardByIdValidator,
  createCardValidator,
  addCardLikeValidator,
  removeCardLikeValidator,
  getUserByIdValidator,
};
