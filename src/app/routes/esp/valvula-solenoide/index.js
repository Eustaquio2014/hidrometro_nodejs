const catchAsync = require('@src/app/middlewares/catchAsync');
const express = require('express');

const router = express.Router();

const releController = require('./valvula-solenoide.controller');

router.get('/', catchAsync(releController.getReleData));

router.put('/', catchAsync(releController.updateReleStatus));

module.exports = router;
