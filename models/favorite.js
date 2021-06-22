const db = require('../db');

const findFavorites = async (id) => {
  return db.favorite.findMany({
    where: {
      userId: id,
    },
    include: {
      Foods: true,
    },
  });
};

const destroy = (id) =>
  db.favorite
    .delete({ where: { id: parseInt(id, 10) } })
    .then(() => true)
    .catch(() => false);

const createFavorite = async ({ filters: { userId, foodId } }) => {
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
  createFavorite,
  findFavorites,
  destroy,
};
