const logger = require('morgan')

/**
 *  @Info Exibe logs das requisições quando em ambiente de desenvolvimento
 */

module.exports = async (app) => (process.env.NODE_ENV === 'development' ? app.use(logger('dev')) : null)
