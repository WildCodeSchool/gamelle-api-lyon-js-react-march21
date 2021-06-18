const foodsRouter = require('express').Router();
const Food = require('../models/food');

foodsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const barcode = await Food.findBarcode(id).then((result) => {
      return result;
    });

    await Food.findDetails(barcode).then((results) => {
      return res.json(results);
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send(
        'Il y a eu une erreur lors de la récupération des détails du produit'
      );
  }
});
module.exports = foodsRouter;
