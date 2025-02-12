const Router = require('express').Router();
const knex = require('../db/knex');
const {
  validacaoDeSessao,
} = require('../Autenticacao/controllers/sessao.controller');
const { gravarFluxo } = require('./socket.controller');

// HIDRO-----------------------------------------------------------------
const socket = require('../server/serverSocket');

const globalData = {
  fluxoMdsg: [0.0],
  relestatus: 'rele off',
  sensor_presenca: 'presenca on',
};

// CONEXÃO E OUVINTE DE TOPICOS
socket.on('connection', (io) => {
  io.on('EspEmit', (msg) => {
    gravarFluxo(msg);
    globalData.fluxoMsg = msg.fluxo;
    io.broadcast.emit('server message', msg);
    // io.emit('msgserver', msg);
  });

  // io.broadcast.emit('msgserver', "testando...");
  // io.emit('msgserver', globalData)
  io.on('server message', (msg) => {
    console.log(msg);
    io.emit('server message', 'Olá sou eu o servidror');
  });
});

socket.on('serverouvee', (msg) => {
  console.log(msg);
  io.emit('msgserver', msg);
});

/* _____________________ */
// SIMULANDO O ENVIO DE DADOS DO ESP32
setInterval(() => {
  const fluxoInst = (Math.random() * (30 - 0) + 0).toFixed(2);

  // console.log("Emit broadcast ", fluxoInst)
  io.broadcast.emit('server message', { fluxo: fluxoInst });
}, 1000);

module.exports = router;
