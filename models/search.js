const db = require('../db');

const findBrands = () => {
  return db.food.findMany({
    distinct: ['brand'],
    select: {
      brand: true,
    },
  });
};

const findProducts = async (
  brandName,
  foodTypeName,
  animalCategoryName,
  searchedWords
) => {
  console.log(brandName, foodTypeName, animalCategoryName, searchedWords);

  const brandId = await db.brand.findFirst({ where: { brandName } }).id;
  const animalCategoryId = await db.animalCategory.findFirst({
    where: { animalCategoryName },
  }).id;
  const foodTypeId = await db.foodType.findFirst({ where: { foodTypeName } })
    .id;

  const words = searchedWords.split(' ');
  const searchTextArray = [];

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
      brandId,
      animalCategoryId,
      foodTypeId,
      AND: searchTextArray,
    },
  });
};

module.exports = { findProducts, findBrands };
