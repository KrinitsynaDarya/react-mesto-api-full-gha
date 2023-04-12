const router = require('express').Router(); // создали роутер
const { getUserByIdValidator, updateUserValidator, updateUserAvatarValidator } = require('../middlewares/validator');

// контроллеры и роуты для пользователей
const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers); // возвращает всех пользователей
router.get('/me', getCurrentUser); // возвращает текущего пользователя
router.get('/:userId', getUserByIdValidator, getUserById); // возвращает пользователя по _id

router.patch('/me', updateUserValidator, updateUser); // обновляет профиль
router.patch('/me/avatar', updateUserAvatarValidator, updateUserAvatar); // обновляет аватар

module.exports = router;
