const { updateSessionUserData } = require('@src/app/utils/session-data')
const { Prisma } = require('@src/config/db/prisma')

const upsert = async (macId, status) => {
    const statusBoolean = (status === 'true')

    if (macId) {
        const releData = await Prisma.valvulaSolenoide.upsert({
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
        })

        return releData
    }

    return {}
}

const insert = async (macId, status) => {
    if (macId) {
        const sensorPresencaData = await Prisma.valvulaSolenoide.create({
            data: {
                estado: status,
                dispositivoId: macId,
            },
        })

        return sensorPresencaData
    }

    return {}
}

module.exports.storageValvulaSolenoide = { upsert, insert }
