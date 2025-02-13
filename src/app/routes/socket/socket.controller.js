const { Prisma } = require('@config/db/prisma')
const {
    capitalizeFirstLetter,
} = require('@src/app/utils/string-capitalize.utils')

const gravarFluxo = async (content) => {
    const {
        dispositivo: novoDispositivo,
        fluxo: novoFluxo,
        mac: novoMac,
    } = content

    if (parseFloat(novoFluxo) && novoMac) {
        const dispositivoData = await Prisma.dispositivo.findUnique({
            where: { macId: novoMac },
        })

        if (dispositivoData?.idUsuario) {
            const payload = {
                nome: dispositivoData?.nome || novoDispositivo,
                local: dispositivoData.local,
                macId: dispositivoData?.macId || novoMac,
                idUsuario: dispositivoData?.idUsuario || null,
            }

            await Prisma.Hidrometro.create({
                data: {
                    fluxo: novoFluxo,
                    dispositivo: {
                        connectOrCreate: {
                            where: {
                                macId: payload.macId,
                            },
                            create: {
                                nome: payload.nome,
                                local: payload.local,
                                macId: payload.macId,
                                idUsuario: payload.idUsuario,
                            },
                        },
                    },
                },
                include: {
                    dispositivo: true,
                },
            })
                .then((result) => {
                    console.log('Sucessao ao gravarFluxo!', result)

                    return true
                })
                .catch((error) => {
                    console.log(error.message)
                    console.log(
                        `Erro ao gravarFluxo! ${capitalizeFirstLetter(
                            error.meta?.target[0],
                        )}`,
                    )

                    return false
                })
        }
    }

    return false
}

module.exports = { gravarFluxo }
