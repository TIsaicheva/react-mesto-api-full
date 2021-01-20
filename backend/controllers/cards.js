const Card = require('../models/card');

const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_ISE,
  ERROR_CODE_NOT_FOUND,
  VALIDATION_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  INVALID_ID_ERROR_MESSAGE,
  CARD_NOT_FOUND_ERROR_MESSAGE,
} = require('../utils/constants');

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(ERROR_CODE_ISE).send({ message: err.message }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: VALIDATION_ERROR_MESSAGE });
      }
      return res.status(ERROR_CODE_ISE).send({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    });
}

function deleteCard(req, res) {
  const { cardId } = req.params;
  // eslint-disable-next-line consistent-return
  Card.findById(cardId).then((card) => {
    if (!card) {
      return Promise.reject(new Error('Card not found'));
    // eslint-disable-next-line no-else-return
    } else if (card.owner._id === req.user._id) {
      Card.deleteOne({ _id: cardId })
        .orFail(() => {
          const err = new Error();
          err.statusCode = ERROR_CODE_NOT_FOUND;
          throw err;
        })
        .then((deleted) => res.status(200).send(deleted))
        .catch((err) => {
          if (err.name === 'CastError') {
            return res.status(ERROR_CODE_BAD_REQUEST).send({ message: INVALID_ID_ERROR_MESSAGE });
          }
          if (err.statusCode === ERROR_CODE_NOT_FOUND) {
            return res.status(ERROR_CODE_NOT_FOUND).send({ message: CARD_NOT_FOUND_ERROR_MESSAGE });
          }
          return res.status(ERROR_CODE_ISE).send({ message: INTERNAL_SERVER_ERROR_MESSAGE });
        });
    } else {
      return Promise.reject(new Error('You have no permission to delete this card'));
    }
  });
}

function likeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .orFail(() => {
      const err = new Error();
      err.statusCode = ERROR_CODE_NOT_FOUND;
      throw err;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: INVALID_ID_ERROR_MESSAGE });
      }
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: CARD_NOT_FOUND_ERROR_MESSAGE });
      }
      return res.status(ERROR_CODE_ISE).send({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    });
}

function dislikeCard(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate('owner')
    .orFail(() => {
      const err = new Error();
      err.statusCode = ERROR_CODE_NOT_FOUND;
      throw err;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE_BAD_REQUEST).send({ message: INVALID_ID_ERROR_MESSAGE });
      }
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        return res.status(ERROR_CODE_NOT_FOUND).send({ message: CARD_NOT_FOUND_ERROR_MESSAGE });
      }
      return res.status(ERROR_CODE_ISE).send({ message: INTERNAL_SERVER_ERROR_MESSAGE });
    });
}

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
