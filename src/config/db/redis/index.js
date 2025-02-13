/* eslint-disable no-console */
const bluebird = require('bluebird')
const redis = require('redis')
const redisConnection = require('./config')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const redisClient = redis.createClient(redisConnection)

redisClient.on('connect', () => {
    console.log('✔️  Redis connected')
})

redisClient.on('error', (error) => {
    console.log(`❌  Redis ${error.code}`)
})

module.exports = redisClient
