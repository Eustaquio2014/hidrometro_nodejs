const { HidrometroService } = require('@src/app/services/hidrometro.service')
const moment = require('moment')

module.exports.DadosController = {
    async renderPageDados(req, res) {
        const { nome, dispositivos } = req.session.userSessionData

        return res.render('dados', { nome, dispositivos })
    },
    async renderPageControles(req, res) {
        const { nome, dispositivos } = req.session.userSessionData

        return res.render('controles', { nome, dispositivos })
    },

    async ConsumoPorPeriodo(startDate, endDate, selectedDeviceMac, groupBy) {
        return HidrometroService.ConsumoPorPeriodo(
            startDate,
            endDate,
            selectedDeviceMac,
            groupBy,
        )
    },

    async ConsumoDiario(date, selectedDeviceMac) {
        const data = date || moment.utc().format('YYYY-MM-DD')

        return HidrometroService.ConsumoDiario(data, selectedDeviceMac)
    },
}
