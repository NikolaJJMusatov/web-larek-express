import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import DublicateError from '../errors/dublicate-error';
import BadRequestError from '../errors/bad-request-error';
import ServerError from '../errors/server-error';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .then((products) => res.send({
    items: products,
    total: products.length,
  }))
  .catch((error) => {
    next(new ServerError(error.message));
  });

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    image,
    category,
    description,
    price,
  } = req.body;

  return Product.create({
    title,
    image,
    category,
    description,
    price,
  })
    .then((product) => res.send(product))
    .catch((error) => {
      if (error instanceof Error && error.message.includes('E11000')) {
        return next(new DublicateError(error.message));
      }
      if (error instanceof MongooseError.ValidationError) {
        return next(new BadRequestError(error.message));
      }

      return next(new ServerError(error.message));
    });
};
