const db = require('../db');

const findHistories = async (id) => {
  const userId = parseInt(id, 10);
  return db.history.findMany({
    orderBy: {
      consultedAt: 'desc',
    },
    where: {
      userId,
    },
    include: {
      Foods: true,
      Favorites: true,
    },
  });
};

const findHistoryDetails = async (id) => {
  return db.food.findMany({
    where: {
      id,
    },
  });
};

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

module.exports = {
  createHistory,
  findHistories,
  findHistoryDetails,
};
