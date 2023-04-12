const router = require('express').Router(); // создали роутер

const {
  deleteCardByIdValidator, createCardValidator, addCardLikeValidator, removeCardLikeValidator,
} = require('../middlewares/validator');
// контроллеры и роуты для карточек
const {
  getCards,
  deleteCardById,
  createCard,
  addCardLike,
  removeCardLike,
} = require('../controllers/cards');

router.get('/', getCards); // возвращает все карточки
router.delete('/:cardId', deleteCardByIdValidator, deleteCardById); // удаляет карточку по идентификатору
router.post('/', createCardValidator, createCard); // создаёт карточку

router.put('/:cardId/likes', addCardLikeValidator, addCardLike); // поставить лайк карточке
router.delete('/:cardId/likes', removeCardLikeValidator, removeCardLike); // убрать лайк с карточки

module.exports = router;
