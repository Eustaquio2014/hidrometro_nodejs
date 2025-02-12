/* eslint-disable no-console */
const socketIoConnection = require('socket.io')();
const sharedsession = require('socket.io-express-session');
const { gravarFluxo } = require('@src/app/routes/socket/socket.controller');
const { ExpressSession } = require('@src/config/session');

// Socket Sessions
socketIoConnection.use(
  sharedsession(
    ExpressSession,
    { autoSave: true },
  ),
);

// Ouvinte de Eventos Socket
socketIoConnection.on('connection', (socket) => {
  if (socket.handshake.session.userSessionData) {
    console.log(
      `🚀 SOCKET: ${socket.handshake.session.userSessionData?.nome} conectou-se`,
    );
  }
  console.log(`|__SOCKET ID: ${socket.id}\n`);

  socket.on('EspEmit', (content) => {
    console.log("content ", content)
    const { mac, status_sensor_presenca = false, status_solenoide = false } = content || {};
    const formattedMac = mac?.replace(/-/g, '').replace(/:/g, '');
    const contentFormatted = { ...content, fluxo: parseFloat(content.fluxo || 0).toFixed(2).toString() };

    console.log('contentFormatted', contentFormatted);
    // Envia a mensagem para todos os clientes menos pra quem enviou o evento original (o remetente)
    socket.broadcast.emit(formattedMac, contentFormatted);
    gravarFluxo(contentFormatted);
  });

  socket.on('disconnect', () => {
    console.log(
      `SOCKET: ❌ ${socket.id} desconectou-se`,
    );
  });
});

// SIMULANDO O ENVIO DE DADOS DO ESP32
/* setInterval(() => {
  const fluxoInst = (Math.random() * (30 - 0) + 0).toFixed(2);

  // console.log("Emit broadcast ", fluxoInst)
  io.emit('server_message', { fluxo: fluxoInst });
  // io.broadcast.emit('server_message', { fluxo: fluxoInst });
}, 1000); */

module.exports = socketIoConnection;
