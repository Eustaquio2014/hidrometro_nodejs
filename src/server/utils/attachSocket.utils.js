/* eslint-disable */

module.exports = attachSocket = (server, serverSocket) => {
    serverSocket.attach(server, {
        pingInterval: 10000,
        pingTimeout: 5000,
        cookie: false
    })
}
