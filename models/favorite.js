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

const findListOfFavorites = async (id) => {
  const baseList = await db.favorite.findMany({
    where: {
      userId: id,
    },
    select: {
      foodId: true,
    },
  });

  const convertArrayToObject = (array, key) => {
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: true,
      };
    }, {});
  };

  return convertArrayToObject(baseList, 'foodId');
};

const destroy = (id) =>
  db.favorite
    .delete({ where: { id: parseInt(id, 10) } })
    .then(() => true)
    .catch(() => false);

const createFavorite = async ({ filters: { userId, foodId } }) => {
  return db.favorite.create({
    data: { userId, foodId },
  });
};

module.exports = {
  createFavorite,
  findFavorites,
  findListOfFavorites,
  destroy,
};
