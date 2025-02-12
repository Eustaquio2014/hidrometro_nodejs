const router = require('express').Router();
const { UsuarioDTO } = require('@src/app/dto/usuario.dto');
const { VerificarSessao } = require('@src/app/middlewares/redirecionamento');
const { renderPageMonitoramento, renderPageControles } = require('./monitoramento.controller');
const { DadosController } = require('../dados/dados.controller');

router.get('/monitoramento', VerificarSessao, renderPageMonitoramento);

router.get('/dados', VerificarSessao, DadosController.renderPageDados);

router.get('/meus-dados', VerificarSessao, (req, res) => {
  const { userSessionData } = req.session;

  return res.send({ data: new UsuarioDTO(userSessionData) });
  // return res.render('meus-dados', { data: new UsuarioDTO(userSessionData) });
});

router.get('/controles', VerificarSessao, renderPageControles);

router.get('/notifications', (req, res) => {
  const { userId } = req.session;

  if (userId == null) {
    res.redirect('/acesso');

    return;
  }
  // res.render('user.ejs');
  // res.redirect('user.ejs');
  res.render('notifications', { content });
});

module.exports = router;
