const router = require('express').Router();
const {
  getUsers, getUSerProfile, updateProfile, updateAvatar, getCurrentUserProfile,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUSerProfile);
router.get('/users/me', getCurrentUserProfile);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
