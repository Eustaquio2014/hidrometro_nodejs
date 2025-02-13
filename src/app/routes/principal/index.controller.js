module.exports = {
    async Acesso(req, res) {
        return res.render('acesso')
    },
    async Desconectar(req, res) {
        return req.session.destroy((/* error */) => res.redirect('/acesso'))
    },
}
