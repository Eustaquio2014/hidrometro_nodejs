const router = require('express').Router()
const validate = require('@src/app/middlewares/validations/validation')
const { bodySchema } = require('@app/middlewares/validations/usuario.schema')
const { cadastroController } = require('./cadastro.controller')

router.get('/', cadastroController.renderizar)

router.post('/efetuar-cadastro', validate(bodySchema.cadastro), cadastroController.cadastrar)

module.exports = router
