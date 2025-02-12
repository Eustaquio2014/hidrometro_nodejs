const { Prisma } = require('@src/config/db/prisma');

const upsert = async (macId, status) => {
  const statusBoolean = (status === 'true');

  if (macId) {
    const sensorPresencaData = await Prisma.sensorPresenca.upsert({
      where: {
        dispositivoId: macId,
      },
      update: {
        estado: statusBoolean,
      },
      create: {
        estado: statusBoolean,
        dispositivoId: macId,
      },
    });

    return sensorPresencaData;
  }

  return {};
};

const insert = async (macId, status) => {
  const statusBoolean = (status === 'true');

  if (macId) {
    const sensorPresencaData = await Prisma.sensorPresenca.create({
      data: {
        estado: statusBoolean,
        dispositivoId: macId,
      },
    });

    return sensorPresencaData;
  }

  return {};
};

module.exports.storageSensorPresenca = { upsert, insert };
