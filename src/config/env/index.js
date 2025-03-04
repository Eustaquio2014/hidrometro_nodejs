const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
    path: path.resolve(`.env.${process.env.NODE_ENV}`),
})


module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 3000,
}
