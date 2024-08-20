import Router from 'express';
import {
  getProducts,
  createProduct,
} from '../controllers/products';
import { productRouteValidator } from '../middlewares/validation';

const router = Router();

router.get('/product', getProducts);
router.post('/product', productRouteValidator, createProduct);

export default router;
