require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Joi, celebrate } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { isURL } = require('validator');
const { login, createUser, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const serverError = require('./middlewares/serverError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.disable('x-powered-by');
app.use(cookieParser());
app.use(requestLogger);
app.use(cors({
  origin: 'https://artemtkachev.nomoredomains.monster',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Authorization', 'Conteny-Type'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value) => {
      if (!isURL(value)) {
        throw new Error('Ссылка некоректная');
      }
      return value;
    }),
  }).unknown(true),
}), createUser);
app.delete('/signout', logout);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден.');
});

app.use(errorLogger);
app.use(errors());

app.use(serverError);

app.listen(PORT);
