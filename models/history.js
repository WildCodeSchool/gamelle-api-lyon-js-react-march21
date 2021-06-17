const db = require('../db');

const createHistory = async ({ filters: { userId, foodId } }) => {
  const fav = await db.favorite.findFirst({
    where: {
      userId,
      foodId,
    },
  });

  const favoriteId = fav ? fav.id : null;
  const consultedAt = new Date();

  return db.history.create({
    data: { consultedAt, userId, foodId, favoriteId },
  });
};

module.exports = { createHistory };
