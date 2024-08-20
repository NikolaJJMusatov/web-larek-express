import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import routers from './routes';
import { errorLogger, requestLogger } from './middlewares/logger';
import notFoundHandler from './middlewares/not-found-handler';
import errorHandler from './middlewares/error-handler';

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(requestLogger);

app.use('/', routers);
app.use(notFoundHandler);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
