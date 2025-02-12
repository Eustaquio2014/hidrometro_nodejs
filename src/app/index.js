require('dotenv').config();

const path = require('path');
const hbs = require('hbs');
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const httpStatus = require('http-status');
const { requestLimiter, requestSlowDown } = require('@src/config/limiter/request-rate');
const { ExpressSession } = require('@src/config/session');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/api-error.utils');

const app = express();

require('@app/utils/logger.utils')(app);
require('@app/utils/hbs.utils')(hbs);

app.use(helmet());
app.set('trust proxy', process.env.HOST);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
hbs.registerPartials(`${__dirname}/views/partials`);

app.use(ExpressSession);

app.use(requestLimiter());
app.use(requestSlowDown());

app.use('/', require('@src/app/routes/principal'));
app.use('/autenticacao', require('@src/app/routes/login'));
app.use('/cadastro', require('@src/app/routes/cadastro'));
app.use('/menu', require('@src/app/routes/menu'));
app.use('/dados', require('@src/app/routes/dados/dados.route'));
app.use('/api/valvula-solenoide', require('@src/app/routes/esp/valvula-solenoide/index'));
app.use('/api/sensor-presenca', require('@src/app/routes/esp/sensor-presenca/index'));

app.use((req, res, next) => next(new ApiError(httpStatus.NOT_FOUND, httpStatus[404])));
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
