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

const findOneRating = (id) => db.rating.findMany({ where: { foodId: id } });

const { findMany } = db.rating;

module.exports = {
  createRat,
  findMany,
  findOneRating,
};
