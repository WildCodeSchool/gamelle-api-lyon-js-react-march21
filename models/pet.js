const Joi = require('joi');
const db = require('../db');

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

// ---------Creation d'une fonction validation avec Joi--------- //
const validate = (data, forUpdate = false) =>
  Joi.object({
    image: Joi.string().max(255).allow(null, ''),
    name: Joi.string()
      .min(1)
      .max(255)
      .presence(forUpdate ? 'optional' : 'required'),
  }).validate(data, { abortEarly: false }).error;

const createPet = async ({
  filters: { ownerId, image, name, breedId, animalCategoryId },
}) => {
  return db.animal.create({
    data: { ownerId, image, name, breedId, animalCategoryId },
  });
};

module.exports = {
  findBreeds,
  findAnimalCategories,
  createPet,
  validate,
};
