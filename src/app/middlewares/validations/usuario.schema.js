const Joi = require('joi')
const { senha } = require('./custom.validation')

module.exports.bodySchema = {
    cadastro: {
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            senha: Joi.string().required().min(8).custom(senha),
            nome: Joi.string().required(),
            sobrenome: Joi.string().required(),
            macDispositivo: Joi.string().required().regex(/^([0-9a-fA-F]{2}[:-]?){5}([0-9a-fA-F]{2})$/).messages({
                'string.pattern.base': '"MAC do Dispositivo" não é válido',
                'string.base': '"MAC do Dispositivo" deve ser um texto',
                'string.empty': '"MAC do Dispositivo" não deve ser vazio',
                'string.min': '"MAC do Dispositivo" should have a minimum length of {#limit}',
                'any.required': '"MAC do Dispositivo" é obrigatório',
            }),
            nomeDispositivo: Joi.string().required().messages({
                'string.base': '"Nome do Dispositivo" deve ser um texto',
                'string.empty': '"Nome do Dispositivo" não deve ser vazio',
                'string.min': 'A quantidade de caracteres de "Nome do Dispositivo" deve ser de pelo menos {#limit}',
                'any.required': '"Nome do Dispositivo" é obrigatório',
            }),
        }),
    },
    login: {
        body: Joi.object().keys({
            email: Joi.string().required(),
            senha: Joi.string().required().min(8).custom(senha),
        }),
    },
}
