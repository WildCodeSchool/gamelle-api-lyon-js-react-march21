const historiesRouter = require('express').Router();
const History = require('../models/history');

historiesRouter.post('/', (req, res) => {
  const { userId, foodId } = req.body;

  return History.createHistory({ filters: { userId, foodId } })
    .then((history) => {
      res.json(history);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send("Il y a eu une erreur lors de l'enregistrement de l'historique");
    });
});

module.exports = historiesRouter;
