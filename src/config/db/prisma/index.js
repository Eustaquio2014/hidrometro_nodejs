const { PrismaClient } = require('@prisma/client')
const envConfig = require('@config/env')

const errorFormat = {
    pretty: 'pretty',
    minimal: 'minimal',
}

const log = []

if (envConfig.NODE_ENV === 'development') {
    log.push('query')
}

const prismaClientConfig = {
    errorFormat: errorFormat.minimal,
    log,
}

const prisma = new PrismaClient(prismaClientConfig)

if (envConfig.NODE_ENV === 'development') {
    prisma.$on('query', (e) => {
        let fullQuery = e.query
        const params = JSON.parse(e.params)

        params.forEach((param) => {
            const formattedParam = typeof param === 'string' ? `'${param}'` : param

            fullQuery = fullQuery.replace(/\$\d+/, formattedParam)
        })

        console.log(`Query Executada: ${fullQuery}`)
    })
}
module.exports.Prisma = prisma
