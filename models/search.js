const db = require('../db');

const findBrands = () => {
  return db.food.findMany({
    // take: 10,
    distinct: ['brand'],
    orderBy: [
      {
        brand: 'asc',
      },
    ],
    select: {
      brand: true,
    },
    where: {
      NOT: {
        brand: {
          equals: '',
        },
      },
    },
  });
};

const findTypes = () => {
  return db.foodType.findMany({
    distinct: ['name'],
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });
};

const findAnimalCategories = () => {
  return db.animalCategory.findMany({
    distinct: ['name'],
    orderBy: [
      {
        name: 'asc',
      },
    ],
  });
};

const findProducts = async ({
  filters: { brand, foodTypeName, animalCategoryName, searchedWords },
}) => {
  const animalCategoryResult = await db.animalCategory.findFirst({
    where: { name: animalCategoryName },
  });
  const animalCategoryId = animalCategoryResult.id;

  const foodTypeResult = await db.foodType.findFirst({
    where: { name: foodTypeName },
  });
  const foodTypeId = foodTypeResult.id;

  const words = searchedWords ? searchedWords.split(' ') : '';
  const searchTextArray = [];
  if (words !== '')
    words.filter(Boolean).forEach((word) => {
      searchTextArray.push(`{
    foodName: {
      contains: ${word.trim()}',
      mode: 'insensitive',
    },
  }`);
    });

  return db.food.findMany({
    where: {
      brand,
      animalCategoryId,
      foodTypeId,
      AND: searchTextArray,
    },
  });
};

module.exports = { findProducts, findBrands, findTypes, findAnimalCategories };
