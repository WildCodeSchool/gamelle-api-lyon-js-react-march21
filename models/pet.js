const db = require('../db');
const { API_BACK } = require('../env');

const findOne = (id) => {
  return db.animal.findUnique({
    where: { id },
    include: { AnimalCategories: true, Breeds: true },
  });
};

const findBreeds = () => {
  return db.breed.findMany({
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

const createPet = async ({
  ownerId,
  image,
  name,
  breedId,
  animalCategoryId,
}) => {
  return db.animal.create({
    data: {
      ownerId,
      name,
      breedId,
      animalCategoryId,
      image:
        typeof image === 'string' ? image.replace(`${API_BACK}/`, '') : image,
    },
  });
};

const updatePet = async (id, { name, breedId, animalCategoryId, image }) => {
  return db.animal.update({
    where: { id: parseInt(id, 10) },
    data: {
      name,
      breedId: parseInt(breedId, 10),
      animalCategoryId: parseInt(animalCategoryId, 10),
      image:
        typeof image === 'string' ? image.replace(`${API_BACK}/`, '') : image,
    },
  });
};

const findPetFavorites = async (id) => {
  return db.animalFavoriteFood.findMany({
    where: {
      animalId: parseInt(id, 10),
    },
    include: {
      Favorites: { include: { Foods: true } },
    },
  });
};

const addFavorite = async ({ animalId, favoriteId }) => {
  return db.animalFavoriteFood.create({
    data: {
      animalId,
      favoriteId,
    },
  });
};

const destroyFavorite = (id) => {
  return db.animalFavoriteFood
    .delete({ where: { id: parseInt(id, 10) } })
    .then(() => true)
    .catch(() => false);
};

const destroy = (id) =>
  db.animal
    .delete({ where: { id: parseInt(id, 10) } })
    .then(() => true)
    .catch(() => false);

module.exports = {
  findBreeds,
  findAnimalCategories,
  createPet,
  findOne,
  updatePet,
  findPetFavorites,
  addFavorite,
  destroyFavorite,
  destroy,
};
