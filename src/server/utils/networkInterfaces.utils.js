/* eslint-disable */
const { networkInterfaces } = require('os')

module.exports = getNetworkInterfaces = (results = {}) => {
    const nets = networkInterfaces()

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = []
                }
                results.LocalIp = net.address
                results[name] = net.address
            }
        }
    }

    return results
}
