/* eslint-disable max-len */
/* eslint-disable indent */
const { Prisma } = require('@src/config/db/prisma')
const moment = require('moment')

module.exports.HidrometroService = {
        async ConsumoPorPeriodo(dataInicio, dataFinal, selectedDeviceMac, groupBy) {
                if (groupBy === 'byDay') {
                    return Prisma.$queryRaw`
                        SELECT ROUND(SUM(fluxo::numeric / 60), 2) AS consumo_litros,
                        "createdAt"::date AS "data"
                        FROM public."Hidrometro"
                        WHERE "dispositivoId" = ${selectedDeviceMac} AND "createdAt" BETWEEN date(${dataInicio}) AND date(${dataFinal})
                        GROUP BY "createdAt"::date
                        ORDER BY "data" ASC;
                        `.then((rows) => rows.map((row) => ({
                            ...row,
                            data: moment(row.data)
                            .add(23, 'hour')
                            .add(59, 'min')
                            .format('DD/MM/YYYY'),
                        })))
                }

                if (groupBy === 'byHour') {
                    return Prisma.$queryRaw`
                        SELECT ROUND(SUM(fluxo::numeric / 60), 2) AS consumo_litros,
                        DATE_TRUNC('hour', "createdAt"::timestamp) AS hora
                        FROM public."Hidrometro"
                        WHERE "dispositivoId" = ${selectedDeviceMac}
                        AND "createdAt" >= ${dataInicio}
                        AND "createdAt" < ${dataFinal}
                        GROUP BY hora
                        ORDER BY hora ASC;
                        `.then((rows) => rows.map((row) => ({
                                ...row,
                                data: moment(row.hora)
                                .format('DD/MM HH:mm'),
                        })))
                }

                // groupBy === 'byMonth' - Default
                return Prisma.$queryRaw`
                    SELECT ROUND(SUM(fluxo::numeric) / 60, 2) AS consumo_litros, DATE_TRUNC('month', "createdAt"::timestamp) AS mes
                    FROM public."Hidrometro"
                    WHERE "dispositivoId" = ${selectedDeviceMac} AND "createdAt" BETWEEN date(${dataInicio}) AND date(${dataFinal})
                    GROUP BY mes
                    ORDER BY mes ASC;
                    `.then((rows) => rows.map((row) => ({
                            ...row,
                            data: moment(row.mes).toDate().toISOString().split('T')[0].slice(0, -3),
                    })))
        },
        async ConsumoDiario(data, selectedDeviceMac) {
                return Prisma.$queryRaw`
                        SELECT ROUND(SUM(fluxo::numeric) / 60, 2) AS consumo_diario_total
                        FROM public."Hidrometro"
                        WHERE "dispositivoId" = ${selectedDeviceMac}
                        AND "createdAt"::date = date(${data})
                    `.then((rows) => ({
                        consumo_diario_total: rows[0]?.consumo_diario_total || 0,
                    }))
        },
}
