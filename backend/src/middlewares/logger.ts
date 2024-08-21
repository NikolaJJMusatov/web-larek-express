import winston from 'winston';
import expressWinston from 'express-winston';
import appRoot from 'app-root-path';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: `${appRoot}/logs/request.log` }),
  ],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: `${appRoot}/logs/error.log` }),
  ],
  format: winston.format.json(),
});
