const Joi = require('joi')
const httpStatus = require('http-status')
const ApiError = require('@src/app/utils/api-error.utils')
const pick = require('@src/app/utils/pick.utils')
const { messages } = require('joi-translation-pt-br')

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body'])
    const object = pick(req, Object.keys(validSchema))
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object, { messages })

    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ')

        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage.replace(/"/g, '\'')))
    }
    Object.assign(req, value)

    return next()
}

module.exports = validate
