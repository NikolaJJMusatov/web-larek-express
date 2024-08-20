import Router from 'express';
import makeOrder from '../controllers/order';
import { orderRouteValidator } from '../middlewares/validation';

const router = Router();

router.post('/order', orderRouteValidator, makeOrder);

export default router;
