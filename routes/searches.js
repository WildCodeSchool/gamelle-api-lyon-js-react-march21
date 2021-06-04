const searchesRouter = require('express').Router();
const Search = require('../models/search');

searchesRouter.post('/', (req, res) => {
  const { brandName, foodTypeName, animalCategoryName, searchedWords } =
    req.body;
  console.log('Arrivé dans searches.js');

  return Search.findProducts({
    filters: { brandName, foodTypeName, animalCategoryName, searchedWords },
  })
    .then((products) => {
      console.log(products);
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send('Il y a eu une erreur lors de la récupération des données');
    });
});

module.exports = searchesRouter;
