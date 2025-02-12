/* eslint-disable */
const debug = require('debug')('victor:server')

module.exports = onListening = (server, networkInterfaces, serverConfig) => {
    const { Ethernet, LocalIp } = networkInterfaces
    const { port } = serverConfig
    const addr = server.address()
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
    debug(`Listening on ${bind}`)

    let msg = '🚀 Express Server \n';
    Ethernet && (msg += `http://${Ethernet}:${port}\n`)
    LocalIp && (msg += `http://${LocalIp}:${port}\n`)

    console.log(msg)
}
