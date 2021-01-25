const winston = require('winston');
const expressWinston = require('express-winston');

/* для логгирования запросов к серверу и ошибок, которые на нём происходят */
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

/* логгер для записи информации об ошибке — имя ошибки, сообщение и её стектрейс. */
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
