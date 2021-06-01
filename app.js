// const axios = require('axios');
const express = require('express');
const { inTestEnv, PORT } = require('./env');

const app = express();
app.set('x-powered-by', false);

app.use(express.json());

require('./routes')(app);

// const delayInMilliseconds = 60 * 60 * 1000;

// server setup
const server = app.listen(PORT, () => {
  if (!inTestEnv) {
    console.log(`Server running on port ${PORT}`);
  }
});

/* ********************** Connection & request to API periodically ********************** */
// const gamelleBreedsRequest = () => {
//   const firstRequest = connection
//     .promise()
//     .query(
//       'SELECT ingredients_id AS id, ingredients_ingr AS ingr FROM ingredients'
//     )
//     .catch((err) => {
//       console.log(err);
//     });

//   firstRequest
//     .then((reqresult) => {
//       const listOfIngredients = Object.values(
//         JSON.parse(JSON.stringify(reqresult[0]))
//       );
//       listOfIngredients.forEach((ingredient) =>
//         axios
//           .get(`https://gamelle-manager-staging.herokuapp.com/api`)
//           .then((response) => response.data)
//           .then((data) => {
//             connection
//               .promise()
//               .query(
//                 `UPDATE Food SET ingredients_kcal100 = ? WHERE ingredients_id = ?;`,
//                 [data.parsed[0].food.nutrients.ENERC_KCAL, ingredient.id]
//               );
//           })
//       );
//     })
//     .catch((err) => console.log(err));
//   console.log(`Request to API done at ${new Date().toLocaleString()}`);
// };

// edamamRequest();
// setInterval(edamamRequest, delayInMilliseconds);

// process setup
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('uncaughtException', (error) => {
  console.error('uncaughtException', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('beforeExit', () => {
  app.close((error) => {
    if (error) console.error(JSON.stringify(error), error.stack);
  });
});

module.exports = server;
