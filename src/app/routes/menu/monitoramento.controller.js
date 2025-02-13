/* eslint-disable no-console */
// const knex = require('../../../config/db/knex');

module.exports = {
    async renderPageMonitoramento(req, res) {
        const { nome, dispositivos } = req.session.userSessionData

        console.log(dispositivos)

        return res.render('monitoramento', { nome, dispositivos })
    },
    async renderPageControles(req, res) {
        const { nome, dispositivos } = req.session.userSessionData

        console.log(dispositivos)

        return res.render('controles', { nome, dispositivos })
    },
}
