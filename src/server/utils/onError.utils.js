/* eslint-disable */

module.exports = onError = (error, serverConfig) => {
    const { port } = serverConfig

    if (error.syscall !== 'listen') {
        throw error
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requer privilegio maior`)
            process.exit(1)
            break

        case 'EADDRINUSE':
            console.error(`${bind} já está em uso`)
            process.exit(1)
            break

        default:
            throw error
    }
}
