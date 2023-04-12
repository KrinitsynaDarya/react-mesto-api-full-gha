// импортируем модель
const mongoose = require('mongoose');
const Card = require('../models/card');

const {
  HTTP_STATUS_CREATED,
} = require('../utils/constants');

const BadRequestError = require('../errors/bad-request-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.createCardOld = (req, res, next) => {
  // получим из объекта запроса имя и ссылку на карточку
  const { name, link } = req.body;
  const owner = req.user._id;
  // создадим документ на основе пришедших данных
  Card.create({ name, link, owner })
  // вернём записанные в базу данные
    .then((data) => {
      data.populate('owner')
        .then((card) => { res.status(HTTP_STATUS_CREATED).send(card); })
        .catch(next);
    })
  // данные не записались, вернём ошибку
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else { next(err); }
    });
};

/* вариант без вложенного промиса и дублирования дефолтного ответа */
module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const data = await Card.create({ name, link, owner });
    const card = await data.populate('owner');

    res.status(HTTP_STATUS_CREATED).send(card);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при создании карточки'));
    } else { next(err); }
  }
};

module.exports.getCards = (req, res, next) => {
  // найти вообще всех
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .populate(['owner', 'likes'])
    .orFail()
    .then((card) => {
      if (req.user._id.toString() !== card.owner._id.toString()) {
        next(new ForbiddenError('Карточка с указанным _id не принадлежит текущему пользователю'));
      } else {
        card.remove()
          .then(() => res.send(card))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Карточка с указанным _id не найдена'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный _id при поиске карточки'));
      } else { next(err); }
    });
};

module.exports.addCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Передан несуществующий _id карточки'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный _id при поиске карточки'));
      } else { next(err); }
    });
};

module.exports.removeCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Передан несуществующий _id карточки'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный _id при поиске карточки'));
      } else { next(err); }
    });
};
