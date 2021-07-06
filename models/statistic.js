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

const findAllStatistics = async () => {
  return db.statistics.findMany({
    include: {
      Users: {
        select: {
          firstname: true,
          lastname: true,
          email: true,
          role: true,
          registeredAt: true,
        },
      },
      FoodTypes: true,
      AnimalCategories: true,
      Foods: true,
    },
  });
};

const findStatsByDates = ({ filters: { statsStartDate, statsEndDate } }) => {
  return db.statistics.findMany({
    orderBy: {
      requestSentAt: 'desc',
    },
    where: {
      requestSentAt: {
        gte: statsStartDate,
        lte: statsEndDate,
      },
    },
    include: {
      Users: {
        select: {
          firstname: true,
          lastname: true,
          email: true,
          role: true,
          registeredAt: true,
        },
      },
      FoodTypes: true,
      AnimalCategories: true,
      Foods: true,
    },
  });
};

module.exports = {
  createStat,
  findAllStatistics,
  findStatsByDates,
};
