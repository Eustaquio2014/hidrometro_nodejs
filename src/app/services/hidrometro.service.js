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
                        WHERE "dispositivoId" = ${selectedDeviceMac} AND "createdAt" BETWEEN ${dataInicio} AND ${dataFinal}
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
                        FROM public."Hidrometro" WHERE "dispositivoId" = ${selectedDeviceMac} AND "createdAt" BETWEEN ${dataInicio} AND ${dataFinal}
                        GROUP BY hora
                        ORDER BY hora ASC;
                        `.then((rows) => rows.map((row) => ({
                                ...row,
                                data: moment(row.hora)
                                .add(23, 'hour')
                                .add(59, 'min')
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
                            data: moment(row.mes).format('MM/YYYY'),
                    })))
        },
        async ConsumoDiario(data, selectedDeviceMac) {
                return Prisma.$queryRaw`
                    WITH consumo_diario AS (
                        SELECT fluxo::numeric * EXTRACT(EPOCH FROM LEAD("createdAt") 
                        OVER (PARTITION BY "dispositivoId" ORDER BY "createdAt") - "createdAt") / 60 AS consumo_litros
                        FROM public."Hidrometro"
                        WHERE "dispositivoId" = ${selectedDeviceMac}
                    )
                    SELECT ROUND(SUM(consumo_litros), 2) AS consumo_diario_total
                    FROM consumo_diario
                    WHERE "data" = ${data}::date;
                    `.then((rows) => rows[0]?.consumo_diario_total || 0)
        },
}
