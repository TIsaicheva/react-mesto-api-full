/* eslint-disable no-unused-vars */
const router = require('express').Router();
const NotFoundError = require('../errors/notFoundError');

router.get('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

router.post('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
