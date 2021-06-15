const foodsRouter = require('express').Router();
const Food = require('../models/history');

foodsRouter.get('/', async (req, res) => {
  const { id } = req.params;

  const barcode = await Food.findBarcode(id)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(500)
        .send('Il y a eu une erreur lors de la récupération du code barre');
    });

  return Food.findDetails(barcode)
    .then((results) => {
      return res.json(results);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send('Il y a eu une erreur lors de la récupération du produit');
    });
});

module.exports = foodsRouter;
