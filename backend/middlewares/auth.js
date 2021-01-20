const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  /* извлечь токен из заголовка Authorization */
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  /* избавиться от 'Bearer ' в токене */
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    /* метод verify проверяет, что токен верный и возвращает payload
    пользователя (в данном случае возвращается _id) */
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  /* payload с _id записвается в объект запроса */
  req.user = payload;
  next();
};
