/* eslint-disable */
const envConfig = require('@config/env');
const httpStatus = require('http-status');
const createError = require('http-errors');
const logger = require('@config/logger');
const ApiError = require('../utils/api-error.utils');
const { Prisma } = require('@prisma/client');




const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error instanceof Prisma.PrismaClientKnownRequestError? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];

    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};


const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (envConfig.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;


  const response = {
    code: statusCode,
    message,
    ...(envConfig.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (envConfig.NODE_ENV === 'development') {
    console.log("Error origin url ", req.originalUrl, statusCode)
    logger.error(err);
  }

  if(httpStatus[statusCode] === httpStatus[404]){
    return res.status(statusCode).render('error', response);
  }
  return res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
