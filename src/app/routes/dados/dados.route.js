const express = require('express')

const router = express.Router()

const moment = require('moment-timezone')
const { Prisma } = require('@src/config/db/prisma')
const { DadosController } = require('./dados.controller')

const getHidrometroDataByMacIdList = async (macIds) => Prisma.hidrometro
    .findMany({
        take: 10,
        where: {
            dispositivoId: { in: macIds },
        },
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
        include: {
            dispositivo: true,
        },
    })
    .then((result) => result || {})

const getLastHidrometroDataByMacId = async (macId) => Prisma.hidrometro
    .findMany({
        take: 1,
        where: {
            dispositivoId: String(macId),
        },
        orderBy: [
            {
                createdAt: 'desc',
            },
        ],
        include: {
            dispositivo: true,
        },
    })
    .then((result) => result || [])

router.post('/consumo', async (req, res) => {
    const dispositivosIds = req.session.userSessionData.dispositivos.map(
        (dispositivo) => dispositivo.macId,
    )

    const {
        startDate, endDate, deviceId, groupBy,
    } = req.body
    const selectedDeviceMac = dispositivosIds.find(
        (id) => String(id) === deviceId,
    )

    let responseData = []

    const [dataRecente] = await getLastHidrometroDataByMacId(
        selectedDeviceMac || dispositivosIds[0],
    )
    const { createdAt = moment.utc().format('YYYY-MM-DD') } = dataRecente || {}

    if (startDate && endDate) {
        responseData = await DadosController.ConsumoPorPeriodo(
            moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            moment(endDate, 'DD/MM/YYYY').add(1, 'days').format('YYYY-MM-DD'),
            selectedDeviceMac,
            groupBy,
        )

        return res.send({
            dados: responseData,
            dataUltimoConsumo: moment
                .utc(createdAt)
                .format('DD/MM/YYYY - HH:mm:ss'),
        })
    }

    if (!startDate && !endDate) {
        responseData = await DadosController.ConsumoPorPeriodo(
            moment.utc(createdAt).subtract(7, 'day').format('YYYY-MM-DD'),
            moment.utc(createdAt).add(1, 'days').format('YYYY-MM-DD'),
            selectedDeviceMac,
            groupBy,
        )
    }

    return res.send({
        dados: responseData,
        dataUltimoConsumo: moment.utc(createdAt).format('DD/MM/YYYY - HH:mm:ss'),
    })
})

router.post('/consumo-diario', async (req, res) => {
    const dispositivosIds = req.session.userSessionData.dispositivos.map(
        (dispositivo) => dispositivo.macId,
    )

    const { date, deviceId } = req.body
    const selectedDeviceMac = dispositivosIds.find(
        (id) => String(id) === deviceId,
    )

    const responseData = await DadosController.ConsumoDiario(
        date,
        selectedDeviceMac,
    )

    return res.send({
        dados: responseData,
    })
})

module.exports = router
