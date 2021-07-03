const db = require('../db');

const createStat = async ({
  filters: {
    userId,
    requestInfo,
    brand,
    foodTypeId,
    animalCategoryId,
    searchText,
    foodId,
    device,
    osName,
    requestSentAt,
    ipv4Address,
    ipv6Address,
  },
}) => {
  return db.statistics.create({
    data: {
      userId,
      requestInfo,
      brand,
      foodTypeId,
      animalCategoryId,
      searchText,
      foodId,
      device,
      osName,
      requestSentAt,
      ipv4Address,
      ipv6Address,
    },
  });
};

const findStatistics = async () => {
  return db.statistics.findMany();
};

module.exports = {
  createStat,
  findStatistics,
};
