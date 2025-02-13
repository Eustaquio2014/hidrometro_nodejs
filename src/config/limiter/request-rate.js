const rateLimit = require('express-rate-limit')
const slowDown = require('express-slow-down')

module.exports.requestLimiter = (minutes, maxRequests) => rateLimit({
    windowMs: (minutes || 10) * 60 * 1000,
    max: maxRequests || 300,
    message: 'Muitas requisições, tente mais tarde novamente.',
})

module.exports.requestSlowDown = (minutes, maxRequests, incrementDelay) => slowDown({
    windowMs: (minutes || 8) * 60 * 1000, // minutos por janela
    delayAfter: maxRequests || 250, // máximo de 800 requisições por janela
    delayMs: incrementDelay || 100, // a partir de 100 requisições, incrementa-se 500 ms entre cada req
})
