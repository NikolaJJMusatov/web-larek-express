import Joi from 'joi';
import { celebrate, Segments } from 'celebrate';
import { IProduct } from '../models/product';

const productSchemaValidation = Joi.object<IProduct>({
  title: Joi.string().min(3).max(30).required(),
  image: {
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  },
  category: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number(),
});

export const productRouteValidator = celebrate({
  [Segments.BODY]: productSchemaValidation,
});

export interface IOrder {
  payment: 'card' | 'online';
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

const orderSchemaValidation = Joi.object<IOrder>({
  payment: Joi.equal('card', 'online').required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  total: Joi.number().required(),
  items: Joi.array().required(),
});

export const orderRouteValidator = celebrate({
  [Segments.BODY]: orderSchemaValidation,
});
