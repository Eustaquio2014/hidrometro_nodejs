const catchAsync = require('@src/app/middlewares/catchAsync')
const express = require('express')

const router = express.Router()

const pirController = require('./sensor-presenca.controller')

router.get('/', catchAsync(pirController.getSensorPresencaData))

router.put('/', catchAsync(pirController.updateSensorPresenca))

module.exports = router
