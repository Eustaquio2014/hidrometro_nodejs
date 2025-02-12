const { HidrometroService } = require('@src/app/services/hidrometro.service');

module.exports.DadosController = {
  async renderPageDados(req, res) {
    const { nome, dispositivos } = req.session.userSessionData;

    return res.render('dados', { nome, dispositivos });
  },
  async renderPageControles(req, res) {
    const { nome, dispositivos } = req.session.userSessionData;

    return res.render('controles', { nome, dispositivos });
  },

  async ConsumoPorPeriodo(startDate, endDate, selectedDeviceMac, groupBy) {
    return HidrometroService.ConsumoPorPeriodo(startDate, endDate, selectedDeviceMac, groupBy);
  },

};


// const gravarFluxo = async (message) => {
//   try {
//     const { espclient, fluxo, esplocal } = message;

//     if (fluxo > 0) {
//       return await knex('hidrometro_tbl')
//         .insert({ espclient, local: esplocal, fluxo })
//         .then((rows) => {
//           console.log('fluxo() insert rows', rows);
//           if (!rows) return false;

//           return true;
//         });
//     }

//     return false;
//   } catch (error) {}
// };
