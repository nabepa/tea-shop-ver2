import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { config } from './config.js';
import { sequelize } from './db/database.js';
import authRouter from './router/auth.js';

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan('tiny'));

app.use('/auth', authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});

sequelize.sync().then(() => {
  console.log(`Server is started... ${new Date()}`);
  app.listen(config.port);
});
