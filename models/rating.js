const db = require('../db');

const createRat = async ({ userId, foodId, appetance, selle, digestion }) => {
  return db.rating.create({
    data: {
      userId,
      foodId,
      appetance,
      selle,
      digestion,
    },
  });
};

module.exports = {
  createRat,
};
