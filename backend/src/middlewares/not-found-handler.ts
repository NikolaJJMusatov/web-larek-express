import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/not-found-error';

const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  const error = new NotFoundError('Маршрут не найден');
  next(error);
};

export default notFoundHandler;
