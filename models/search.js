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
  const animalcategorySQL = animalCategoryResult
    ? `AND animalCategoryId=${animalCategoryResult.id}`
    : '';

  const foodTypeResult = await db.foodType.findFirst({
    where: { name: foodTypeName },
  });
  const foodTypeSQL = foodTypeResult
    ? `AND foodTypeId=${foodTypeResult.id}`
    : '';

  const words = searchedWords
    ? searchedWords.split(' ').filter((word) => word !== '')
    : [];

  let searchText = '';

  if (words !== [])
    words.filter(Boolean).forEach((word) => {
      searchText += `AND name LIKE '%${word.trim()}%'`;
    });

  return db.$queryRaw(
    `SELECT * FROM Food WHERE brand="${brand}" ${animalcategorySQL} ${foodTypeSQL} ${searchText};`
  ); // Attention ! Ne pas remplacer les guillemets doubles par des simples car la requête échoue avec les noms comportant un guillemet simple comme 4PAT'
};

module.exports = { findProducts, findBrands, findTypes, findAnimalCategories };
