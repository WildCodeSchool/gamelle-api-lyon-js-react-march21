const db = require('../db');

const createRat = async ({ userId, foodId, appetance, selle, digestion }) => {
  const pk = {
    userId: parseInt(userId, 10),
    foodId: parseInt(foodId, 10),
  };

  return db.rating.upsert({
    where: {
      userId_foodId: pk,
    },
    update: { appetance, selle, digestion },
    create: {
      userId,
      foodId,
      appetance,
      selle,
      digestion,
    },
  });
};

const findOneRating = async (foodId) => {
  const avgRatings = await db.rating.aggregate({
    _avg: {
      selle: true,
      appetance: true,
      digestion: true,
    },
    where: {
      foodId,
    },
  });

  // eslint-disable-next-line dot-notation
  return { ...avgRatings['_avg'] };
};

module.exports = {
  createRat,
  findOneRating,
};
