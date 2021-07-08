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

const findNbReqByDates = ({ filters: { statsStartDate, statsEndDate } }) => {
  return db.statistics.groupBy({
    by: ['requestInfo'],
    _count: {
      requestInfo: true,
    },
    where: {
      requestSentAt: {
        gte: statsStartDate,
        lte: statsEndDate,
      },
    },
  });
};

const findMostShowedProductsByDates = ({
  filters: { statsStartDate, statsEndDate },
}) => {
  return db.statistics.groupBy({
    by: ['foodId'],
    _count: {
      foodId: true,
    },
    orderBy: {
      _count: {
        foodId: 'desc',
      },
    },
    where: {
      requestSentAt: {
        gte: statsStartDate,
        lte: statsEndDate,
      },
      NOT: [{ foodId: null }],
    },
  });
};

module.exports = {
  createStat,
  findAllStatistics,
  findStatsByDates,
  findNbReqByDates,
  findMostShowedProductsByDates,
};
