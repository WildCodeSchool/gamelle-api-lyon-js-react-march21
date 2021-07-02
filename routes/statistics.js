const statisticsRouter = require('express').Router();
const Statistic = require('../models/statistic');

statisticsRouter.post('/', (req, res) => {
  const {
    userId,
    requestInfo,
    brand,
    foodTypeId,
    animalCategoryId,
    searchText,
    foodId,
    device,
    osName,
    requestSentAt,
  } = req.body;

  return Statistic.createStat({
    filters: {
      userId,
      requestInfo,
      brand,
      foodTypeId,
      animalCategoryId,
      searchText,
      foodId,
      device,
      osName,
      requestSentAt,
    },
  })
    .then((statistic) => {
      res.json(statistic);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send(
          "Il y a eu une erreur lors de l'enregistrement de cette statistique"
        );
    });
});

statisticsRouter.get('/', async (req, res) => {
  try {
    const statisticsData = await Statistic.findStatistics();
    return res.json(statisticsData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send('Il y a eu une erreur lors de la récupération des statistiques');
  }
});

module.exports = statisticsRouter;
