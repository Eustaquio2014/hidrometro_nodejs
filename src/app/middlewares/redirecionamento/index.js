const { getSessionUserData } = require('@src/app/utils/session-data')

module.exports = {
    async Redirecionamento(req, res) {
        const { id } = getSessionUserData(req) || {}

        if (!id) return res.redirect('/acesso')

        return res.redirect('/menu/monitoramento')
    },

    async VerificarSessao(req, res, next) {
        const { id } = getSessionUserData(req) || {}

        if (!id) {
            return res.redirect('/acesso')
        }

        return next()
    },
}

// if (req.method === 'GET') return res.redirect('/');
// if (!id) return new ApiError(httpStatus.FORBIDDEN, httpStatus[403]);
