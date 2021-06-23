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
  // const ExistingFav = await db.favorite.findFirst({
  //   where: {
  //     userId,
  //     foodId,
  //   },
  // });
  console.log(userId);
  console.log(foodId);
  return db.favorite.create({
    data: { userId, foodId },
  });
};

module.exports = {
  createFavorite,
  findFavorites,
  destroy,
};
