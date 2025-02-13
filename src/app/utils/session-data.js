const { Prisma } = require('@src/config/db/prisma')

const getSessionUserData = (req) => {
    const sessionData = req?.session?.userSessionData || {}
    const userId = sessionData?.id || null

    return {
        ...sessionData,
        userId,
    }
}

const updateSessionUserData = async (req) => {
    const { userId } = getSessionUserData(req)

    const [dadosDoBanco] = await Prisma.usuario
        .findMany({
            take: 1,
            where: {
                id: userId,
            },
            include: {
                dispositivos: {
                    include: {
                        ValvulaSolenoide: true,
                        SensorPresenca: true,
                    },
                },
            },
        })
        .then((result) => result)

    if (dadosDoBanco) {
        req.session.userSessionData = dadosDoBanco
    }

    return dadosDoBanco || {}
}

module.exports = { getSessionUserData, updateSessionUserData }
