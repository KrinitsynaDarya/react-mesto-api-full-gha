const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { JWT_SECRET = 'dev-secret' } = process.env;
// импортируем модель
const User = require('../models/user');
const { HTTP_STATUS_CREATED } = require('../utils/constants');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      // вернём токен
      res
        .cookie('jwt', token, {
          // token - наш JWT токен, который мы отправляем
          maxAge: 3600 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .send({ message: 'Успешная авторизация' });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  // получим из объекта запроса имя и описание пользователя
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    // создадим документ на основе пришедших данных
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    // вернём записанные в базу данные
    .then((user) => res.status(HTTP_STATUS_CREATED).send(user.clean()))
    // данные не записались, вернём ошибку
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже существует'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else { next(err); }
    });
};

const getUser = (id, res, next) => {
  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный _id при поиске пользователя'));
      } else { next(err); }
    });
};

module.exports.getUserById = (req, res, next) => {
  getUser(req.params.userId, res, next);
};

module.exports.getCurrentUser = (req, res, next) => {
  getUser(req.user._id, res, next);
};

module.exports.getUsers = (req, res, next) => {
  // найти вообще всех
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
};

const updateUser = (userProps, req, res, next) => {
  // обновим свойства найденного по _id пользователя
  User.findByIdAndUpdate(
    req.user._id,
    userProps,
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else { next(err); }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  // обновим имя найденного по _id пользователя
  updateUser({ name, about }, req, res, next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  // обновим аватар найденного по _id пользователя
  updateUser({ avatar }, req, res, next);
};

/*
module.exports.cookieCheck = (req, res) => {
  const token = req.cookies.jwt;
  try {
    jwt.verify(token, JWT_SECRET);
    res.send({ authorized: true });
  } catch (err) {
    res.send({ authorized: false });
  }
}; */
