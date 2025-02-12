/* eslint-disable camelcase */

const socketIoConnection = require('@src/server/serverSocket');

/*
content: {
    dispositivo: 'ESP32_Hidromedro1',
    fluxo: '151.47',
    local: 'Banheiro1',
    mac: '24:6F:28:16:B7:D8'
  }
  */

const mudarEstadoValvulaSolenoide = async (mac, status_solenoide) => {
  if (!mac || typeof status_solenoide !== 'boolean') {
    return false;
  }
  console.log('mac ', mac);
  socketIoConnection.emit(mac, {
    status_solenoide,
  });

  return true;
};

const mudarEstadoSensorPresenca = async (mac, status_sensor_presenca) => {
  if (!mac) {
    return false;
  }
  if (typeof status_sensor_presenca !== 'boolean'
  ) {
    return false;
  }

  socketIoConnection.emit(mac, {
    status_sensor_presenca,
  });

  return true;
};


const mudarEstados = async (mac, status_sensor_presenca, status_solenoide) => {
  if (!mac) {
    return false;
  }
  if (status_sensor_presenca !== 'boolean' && typeof status_solenoide !== 'boolean'
  ) {
    return false;
  }

  socketIoConnection.emit(mac, {
    status_solenoide,
    status_sensor_presenca,
  });

  return true;
};

module.exports = { esp32Emit: { mudarEstadoValvulaSolenoide, mudarEstadoSensorPresenca, mudarEstados } };
