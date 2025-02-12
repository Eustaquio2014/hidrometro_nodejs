const router = require('express').Router();
const { Acesso, Desconectar } = require('./index.controller');
const { Redirecionamento } = require('../../middlewares/redirecionamento');

router.get('/health', (req, res)=>{ res.status(200)});
router.get('/', Redirecionamento);
router.get('/acesso', Acesso);
router.get('/desconectar', Desconectar);

module.exports = router;
