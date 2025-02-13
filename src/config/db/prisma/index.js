const { PrismaClient } = require('@prisma/client')

const errorFormat = {
    pretty: 'pretty',
    minimal: 'minimal',
}

const prismaClientConfig = {
    errorFormat: errorFormat.minimal,
}

module.exports.Prisma = new PrismaClient(prismaClientConfig)
