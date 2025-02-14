const redisClient = require('@config/db/redis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const moment = require('moment-timezone')


const SessionMaxAGE = 3600000
const SessionExpires = moment().add(SessionMaxAGE, 'ms').format('YYYY-MM-DD HH:mm:ss.ms')

module.exports.ExpressSession = session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.COOKIE_KEY,
    saveUninitialized: true,
    resave: true,
    rolling: true,
    cookie: {
        expires: SessionExpires,
        maxAge: SessionMaxAGE,
        sameSite: true,
        secure: false,
    },
})
