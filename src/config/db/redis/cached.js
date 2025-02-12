// const { knexSQLserver } = require('../../database/knex');
// const { redisClient, redisCache } = require('../../database/redis');
// const { capitalize } = require('./capitalize');

// module.exports = {

//   async historicaldatabyrange(user, initial, final) {
//     if (!initial || !final) return null;

//     if (user) {
//       const target = '${user}:historicaldata:${initial}${final}';

//       return await redisClient.getAsync(target).then(async (redisData) => {
//         // TTL Expiration Data
//         const expirationTIME = await redisClient.ttlAsync(target);

//         if (redisData && expirationTIME > 0) {
//           // console.log(JSON.parse(redisData));
//           // console.log("PEGUEI NO REDIS ")
//           return Promise.all(JSON.parse(redisData));
//           // return suggestions
//         }
//         if (!redisData || expirationTIME < 0) {
//           const suggestions = await knexSQLserver
//             .from('empresas_tbl_view')
//             .distinct('cliente')
//             .where('nome_fantasia', nome_fantasia)
//             .andWhere('situacao', 'Ativa')
//             .orderBy('cliente', 'ASC')
//             .then(async (rows) =>
//             // console.log("empresas suggetions ",rows)
//             // console.log("BUSCA NO BANCO CONCLUIDA ")
//               rows)
//             .catch((err) => {
//               // console.log(err);
//             });

//           if (suggestions) {
//             const expire = 300; // Expiration time in seconds

//             await redisClient.setAsync('Suggestions:escritorios:${nome_fantasia}', JSON.stringify(suggestions), 'EX', expire);
//           }

//           return Promise.all(suggestions);
//         }
//       });
//     }
//     const response = {
//       redirect: '/acesso',
//       error: 'Sessão sem Nome Fantasia do Escritorio',
//     };

//     return (response);
//   },
// };

// async function UniqueToArray(rows) {
//   const output = [];

//   await rows.forEach(async (el, index) => {
//     await Object.entries(el).forEach(([key, value]) => {
//       if (value) {
//         if (value.indexOf(',') > -1) {
//           const arrayValue = value.split(',');

//           arrayValue.forEach((value, index) => {
//             value = capitalize(value);
//             if (!output.includes(value)) {
//               output.push(value);
//             }
//           });
//         } else {
//           value = capitalize(value);
//           if (value) {
//             if (!output.includes(value)) {
//               output.push(value);
//             }
//           }
//         }
//       }
//     });
//   });

//   return output;
// }

// /*
//   async suggestionsAnotacoes(nome_fantasia, escritorio_fk) {
//     if (nome_fantasia) {
//       var target = 'Suggestions:anotacoes:${nome_fantasia}'
//       return await redisClient.getAsync(target).then(async function(redisData) {
//           var expirationTIME = await redisClient.ttlAsync(target);
//               //Tem no redis e ainda não expirou
//               if(redisData && expirationTIME > 0){
//                 return Promise.all(JSON.parse(redisData))
//               }
//               //Não tem no Redis ou já expirou
//               if(!redisData || expirationTIME <= 0){
//                 const suggestions = await knexSQLserver
//                                   .from("notas_tbl_view")
//                                   .distinct("anotacoes")
//                                   .where("nome_fantasia", nome_fantasia)
//                                   .orderBy("anotacoes", "ASC")
//                                   .then(async(rows) => {
//                                   return await UniqueToArray(rows, nome_fantasia)
//                                   })
//                                   .catch((err) => {
//                                    console.log(err);
//                                   });
//                 return Promise.all(suggestions)
//               }
//             });

//     } else {
//       var response = {
//         redirect: "/acesso",
//         error: "Sessão sem Nome Fantasia do Escritorio"
//       }
//       return(response);
//     }
//   },
//   */
