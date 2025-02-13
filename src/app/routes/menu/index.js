const router = require('express').Router()
const { UsuarioDTO } = require('@src/app/dto/usuario.dto')
const { VerificarSessao } = require('@src/app/middlewares/redirecionamento')
const { renderPageMonitoramento, renderPageControles } = require('./monitoramento.controller')
const { DadosController } = require('../dados/dados.controller')

router.get('/monitoramento', VerificarSessao, renderPageMonitoramento)
router.get('/dados', VerificarSessao, DadosController.renderPageDados)
router.get('/controles', VerificarSessao, renderPageControles)
router.get('/meus-dados', VerificarSessao, (req, res) => {
    const { userSessionData } = req.session

    return res.send({ data: new UsuarioDTO(userSessionData) })
})


module.exports = router
