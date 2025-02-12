/* eslint-disable */
require('module-alias/register');
require('../config/module-alias')
const NodeEnviroment = require('@config/env')
const app = require('@app/index')
const http = require('http')
const normalizePort = require('./utils/normalizePort.utils')
const onListening = require('./utils/onListening.utils')
const getNetworkInterfaces = require('./utils/networkInterfaces.utils')
const onError = require('./utils/onError.utils')
const serverSocket = require('./serverSocket')
const attachSocket = require('./utils/attachSocket.utils')
const { PrismaClient } = require('@prisma/client')
const { Prisma } = require('@src/config/db/prisma')

const server = http.createServer(app)
console.log(`ENV - ${process.env.NODE_ENV}`);
console.log(`DATABASE_URL - ${process.env.DATABASE_URL}`);
attachSocket(server, serverSocket)

const networkInterfaces = getNetworkInterfaces()
const port = normalizePort(NodeEnviroment.PORT)

server.listen(port)
server.on('error', (error) => onError(error, { port }))
server.on('listening', () => onListening(server, networkInterfaces, { port }))

app.set('port', port)



async function PrismaDatabaseCheck() {
  const [{ connection = false }] = await Prisma.$queryRaw`SELECT true as connection` || [{}];

  if (connection) {
    return console.log('✔️   Prisma Database connected');
  }

  return console.log('❌   Prisma Database connection error');
}
PrismaDatabaseCheck();



