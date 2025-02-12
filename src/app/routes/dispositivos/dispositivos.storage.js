const { Prisma } = require('@src/config/db/prisma');

const findById = async (userId, deviceId) => {
  if (!userId || !deviceId) return {};

  const dispositivosData = await Prisma.usuario.findUnique({
    where: { id: userId },
    select: {
      dispositivos: {
        where: { id: Number(deviceId) },
      },
    },
  });

  return dispositivosData;
};

const findByMacId = async (userId, macId) => {
  if (!userId || !macId) return {};

  const dispositivosData = await Prisma.usuario.findUnique({
    where: { id: userId },
    select: {
      dispositivos: {
        where: { macId },
      },
    },
  });

  return dispositivosData;
};

const find = async (userId, deviceId, macId) => {
  if (!userId) return {};

  let dispositivosData = {};

  if (deviceId) {
    dispositivosData = await findById(userId, deviceId);
  }

  if (macId) {
    dispositivosData = await findByMacId(userId, macId);
  }

  return dispositivosData;
};

module.exports.storageDispositivo = { find, findById, findByMacId };
