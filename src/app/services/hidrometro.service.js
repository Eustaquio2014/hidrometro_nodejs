const { Prisma } = require('@src/config/db/prisma')
const moment = require('moment')

module.exports.HidrometroService = {
  async ConsumoPorPeriodo(dataInicio, dataFinal, selectedDeviceMac, groupBy) {
    if (groupBy === 'byMonth') {
      return Prisma.$queryRaw`SELECT
      ROUND(SUM(fluxo::numeric), 2) AS soma_fluxo_litros_segundo,
      DATE_TRUNC('month', "createdAt"::timestamp) AS mes
  FROM
      public."Hidrometro"
  WHERE
      "dispositivoId" = ${selectedDeviceMac}
      AND "createdAt" BETWEEN date(${dataInicio}) AND date(${dataFinal})
  GROUP BY
      mes
  ORDER BY
      mes ASC`.then((rows) =>
        rows.map((row) => ({
          ...row,
          data: moment(row.data)
            .add(23, 'hour')
            .add(59, 'min')
            .format('MM/YYYY')
        }))
      )
    }

    if (groupBy === 'byDay') {
      return Prisma.$queryRaw`
      SELECT ROUND(SUM(fluxo::numeric), 2) AS soma_fluxo_litros_segundo, "createdAt"::timestamp::date AS "data"
      FROM public."Hidrometro"
      WHERE "dispositivoId"= ${selectedDeviceMac} AND "createdAt" BETWEEN date(${dataInicio}) AND date(${dataFinal})
      GROUP BY "createdAt"::timestamp::date
      ORDER BY "data" ASC`.then((rows) =>
        rows.map((row) => ({
          ...row,
          data: moment(row.data)
            .add(23, 'hour')
            .add(59, 'min')
            .format('DD/MM/YYYY')
        }))
      )
    }

    if (groupBy === 'byHour') {
      return Prisma.$queryRaw`
      SELECT
      ROUND(SUM(fluxo::numeric), 2) AS soma_fluxo_litros_segundo,
      DATE_TRUNC('hour', "createdAt"::timestamp) AS hora
      FROM
          public."Hidrometro"
      WHERE
          "dispositivoId" = ${selectedDeviceMac}
          AND "createdAt" BETWEEN date(${dataInicio}) AND date(${dataFinal})
      GROUP BY
          hora
      ORDER BY
      hora ASC;`.then((rows) =>
       {
        return rows.map((row) => ({
          ...row,
          data: moment(row.hora)
            .add(23, 'hour')
            .add(59, 'min')
            .format('DD/MM HH:mm')
        }))}
      )
    }
  }
}
