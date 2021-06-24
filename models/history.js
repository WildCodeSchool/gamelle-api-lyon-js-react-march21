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
  const consultedAt = new Date();

  return db.history.create({
    data: { consultedAt, userId, foodId },
  });
};

module.exports = {
  createHistory,
  findHistories,
  findHistoryDetails,
};
