import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import routers from './routes';
import { errorLogger, requestLogger } from './middlewares/logger';
import notFoundHandler from './middlewares/not-found-handler';
import errorHandler from './middlewares/error-handler';
import 'dotenv/config'

const { PORT } = process.env;
const app = express();

app.use(cors({ origin: process.env.ORIGIN_ALLOW, credentials: true }));
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);

app.use('/', routers);
app.use(notFoundHandler);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const bootstrap = async () => {
  try {
      await mongoose.connect(`${process.env.DB_ADDRESS}`)
      app.listen(PORT, () => console.log('App listening on port '+`${PORT}`))
  } catch (error) {
      console.error(error)
  }
}

bootstrap()