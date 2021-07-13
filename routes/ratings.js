/* eslint-disable dot-notation */
const RatingsRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const Rating = require('../models/rating');
const requireCurrentUser = require('../middlewares/requireCurrentUser');

RatingsRouter.post(
  '/:foodId',
  requireCurrentUser,
  asyncHandler(async (req, res) => {
    const { id } = req.currentUser;
    const { appetance, selle, digestion } = req.body;
    const foodId = parseInt(req.params.foodId, 10);

    try {
      const newRating = await Rating.createRat({
        appetance,
        selle,
        digestion,
        userId: id,
        foodId,
      });
      res.status(200).send(newRating);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })
);

RatingsRouter.get(
  '/:foodId',
  asyncHandler(async (req, res) => {
    const foodId = parseInt(req.params.foodId, 10);
    try {
      const allRating = await Rating.findOneRating(foodId);
      res.status(200).send({
        ...allRating,
        ratingMean: Math.floor(
          (allRating['_avg'].digestion +
            allRating['_avg'].selle +
            allRating['_avg'].appetance) /
            3
        ),
        foodId,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  })
);

module.exports = RatingsRouter;
