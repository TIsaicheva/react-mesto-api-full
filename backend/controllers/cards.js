const Card = require('../models/card');

const {
  ERROR_CODE_NOT_FOUND,
  VALIDATION_ERROR_MESSAGE,
  INVALID_ID_ERROR_MESSAGE,
  CARD_NOT_FOUND_ERROR_MESSAGE,
  NO_AUTHORIZATION_ERROR_MESSAGE,
  ERROR_CODE_NO_AUTHORIZATION,
} = require('../utils/constants');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const NoAuthorizationError = require('../errors/noAuthorizationError');

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(VALIDATION_ERROR_MESSAGE));
      }
      return next(err);
    });
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  // eslint-disable-next-line consistent-return
  Card.findById(cardId)
    .populate('owner')
    .orFail(() => {
      throw new NotFoundError(CARD_NOT_FOUND_ERROR_MESSAGE);
    })
    // eslint-disable-next-line consistent-return
    .then((card) => {
      const ownerId = (card.owner._id).toString();
      if (ownerId === req.user._id) {
        Card.deleteOne({ _id: cardId })
          .orFail(() => {
            throw new NotFoundError(CARD_NOT_FOUND_ERROR_MESSAGE);
          })
          .then((deleted) => res.status(200).send(deleted));
      } else return Promise.reject(new NoAuthorizationError(NO_AUTHORIZATION_ERROR_MESSAGE));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(INVALID_ID_ERROR_MESSAGE));
      }
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        return next(err);
      }
      if (err.statusCode === ERROR_CODE_NO_AUTHORIZATION) {
        return next(err);
      }
      return next(err);
    });
}

function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .orFail(() => {
      throw new NotFoundError(CARD_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((card) => res.status(200).send(card))
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

function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .orFail(() => {
      throw new NotFoundError(CARD_NOT_FOUND_ERROR_MESSAGE);
    })
    .then((card) => res.status(200).send(card))
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

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
