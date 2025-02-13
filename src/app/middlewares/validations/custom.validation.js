module.exports = {
    senha: (value, helpers) => {
        if (value.length < 8) {
            return helpers.message('senha precisa conter no minimo 8 caracteres')
        }
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
            return helpers.message('senha conter no minimo 1 letra e 1 numero')
        }

        return value
    },
}
