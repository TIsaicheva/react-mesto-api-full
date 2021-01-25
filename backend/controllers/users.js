const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');

const {
  ERROR_CODE_NOT_FOUND,
  VALIDATION_ERROR_MESSAGE,
  INVALID_ID_ERROR_MESSAGE,
  USER_NOT_FOUND_ERROR_MESSAGE,
} = require('../utils/constants');

const { JWT_SECRET } = process.env;

function login(req, res, next) {
  const { email, password } = req.body;
  console.log(typeof JWT_SECRET);

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
}

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
}

function getUSerProfile(req, res, next) {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((user) => {
      res.status(200).send(user);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(INVALID_ID_ERROR_MESSAGE));
      }
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        return next(err);
      }
      return next(err);
    });
}

function getCurrentUserProfile(req, res, next) {
  const id = req.user._id;

  return User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      }
      return res.status(200).send(user);
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(INVALID_ID_ERROR_MESSAGE));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(VALIDATION_ERROR_MESSAGE));
      }
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        return next(err);
      }
      return next(err);
    });
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(INVALID_ID_ERROR_MESSAGE));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(VALIDATION_ERROR_MESSAGE));
      }
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        return next(err);
      }
      return next(err);
    });
}

module.exports = {
  getUsers,
  getUSerProfile,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUserProfile,
};
