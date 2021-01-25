const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUSerProfile, updateProfile, updateAvatar, getCurrentUserProfile,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUserProfile);
router.patch('/users/me', updateProfile);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().required().length(24),
  }),
}), getUSerProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
