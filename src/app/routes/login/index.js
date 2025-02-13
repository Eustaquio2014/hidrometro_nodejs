const router = require('express').Router()
const { bodySchema } = require('@src/app/middlewares/validations/usuario.schema')
const validate = require('@src/app/middlewares/validations/validation')
// const { Redirecionamento } = require('@routes/sessao/sessao.controller');
const { Login } = require('./login.controller')

router.post('/acessar', validate(bodySchema.login), Login)

module.exports = router
