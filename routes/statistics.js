const statisticsRouter = require('express').Router();
const Statistic = require('../models/statistic');
const requireCurrentUser = require('../middlewares/requireCurrentUser');

statisticsRouter.post('/', async (req, res) => {
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
    ipv4Address,
    ipv6Address,
  } = req.body;

  try {
    const statistic = await Statistic.createStat({
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
        ipv4Address,
        ipv6Address,
      },
    });
    res.json(statistic);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send(
        "Il y a eu une erreur lors de l'enregistrement de cette statistique"
      );
  }
});

statisticsRouter.get('/', requireCurrentUser, async (req, res) => {
  console.log(req.currentUser);
  if (req.currentUser) {
    try {
      const statisticsData = await Statistic.findAllStatistics();
      return res.json(statisticsData);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send('Il y a eu une erreur lors de la récupération des statistiques');
    }
  }
  return res
    .status(401)
    .send("Vous n'avez pas l'autorisation de consulter les statistiques");
});

statisticsRouter.post('/reqDates', async (req, res) => {
  const { statsStartDate, statsEndDate } = req.body;

  try {
    const statistic = await Statistic.findStatsByDates({
      filters: { statsStartDate, statsEndDate },
    });
    res.json(statistic);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send('Il y a eu une erreur lors de la récupération de ces statistiques');
  }
});

module.exports = statisticsRouter;
