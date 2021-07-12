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

module.exports = RatingsRouter;
