const publicIp = require('public-ip');
const express = require('express');

const app = express();
const useragent = require('express-useragent');

const deviceDetails = app.use(useragent.express());

const statisticsRouter = require('express').Router();
const Statistic = require('../models/statistic');
const requireCurrentUser = require('../middlewares/requireCurrentUser');

statisticsRouter.post('/', deviceDetails, async (req, res) => {
  // console.log(req.useragent);
  let device = null;
  if (req.useragent.isMobile) {
    device = 'mobile';
  } else if (req.useragent.isTablet) {
    device = 'tablet';
  } else if (req.useragent.isDesktop) {
    device = 'desktop';
  }
  const osName = req.useragent.os;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  console.log('ip ', ip);
  console.log('req.headers  ', req.headers['x-forwarded-for']);
  console.log('req.socket  ', req.socket.remoteAddress);

  (async () => {
    console.log('ipv4   ', await publicIp.v4());
  })();

  const ipv4Address = (await publicIp.v4()) || null;

  const {
    userId,
    requestInfo,
    brand,
    foodTypeId,
    animalCategoryId,
    searchText,
    foodId,
    requestSentAt,
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

statisticsRouter.post('/fullReqDates', async (req, res) => {
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

statisticsRouter.post('/numberReqDates', async (req, res) => {
  const { statsStartDate, statsEndDate } = req.body;

  try {
    const statistic = await Statistic.findNbReqByDates({
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

statisticsRouter.post('/mostShowedProducts', async (req, res) => {
  const { statsStartDate, statsEndDate } = req.body;

  try {
    const statistic = await Statistic.findMostShowedProductsByDates({
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
