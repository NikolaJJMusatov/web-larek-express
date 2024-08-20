import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import { Error as MongooseError } from 'mongoose';
import { IOrder } from '../middlewares/validation';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import ServerError from '../errors/server-error';

const makeOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { total, items } : IOrder = req.body;

  try {
    const productsDb = await Product.find({ _id: { $in: items } });
    const productsIdDb = productsDb.map((item) => item._id);

    const productsPriceNull: string[] = [];

    productsDb.forEach((product) => {
      if (product.price == null) {
        productsPriceNull.push(product._id.toString());
      }
    });

    if (productsDb.length !== items.length) {
      const disableId = items.filter((item) => !productsIdDb.toString().includes(item));

      return next(
        new BadRequestError(`Товар с id ${disableId} не найден`),
      );
    }

    if (productsPriceNull.length) {
      return next(
        new BadRequestError(`Товар с id ${productsPriceNull} не продается`),
      );
    }

    const totalSum = productsDb.reduce((currSum, currNumber) => currSum + currNumber.price!, 0);

    if (totalSum !== total) {
      return next(
        new BadRequestError('Неверная сумма заказа'),
      );
    }

    return res.status(200).send({
      id: faker.string.uuid(),
      total: totalSum,
    });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    return next(new ServerError((error as Error).message));
  }
};

export default makeOrder;
