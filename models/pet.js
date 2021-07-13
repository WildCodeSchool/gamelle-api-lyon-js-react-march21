const Joi = require('joi');
const db = require('../db');
// const { API_BACK } = require('../env');

// const findOne = (id) => db.animal.findUnique({ where: { id } });
// const { findMany } = db.animal;

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

// ---------Creation d'une fonction pour mettre à jour les données de l'animal--------- //
// const update = async (id, data) =>
//   db.animal.update({
//     where: { id: parseInt(id, 10) },
//     data: {
//       ...data,
//       image:
//         typeof data.image === 'string'
//           ? data.image.replace(`${API_BACK}/`, '')
//           : data.image,
//     },
//   });

// const getSafeAttributes = (pet) => {
//   let { image } = pet;
//   if (image && !image.startsWith('http://') && !image.startsWith('https://')) {
//     image = `${API_BACK}/${image}`;
//   }
//   return {
//     ...image,
//   };
// };

// const destroy = (id) =>
//   db.animal
//     .delete({ where: { id: parseInt(id, 10) } })

//     .then(() => true)
//     .catch(() => false);

module.exports = {
  findBreeds,
  findAnimalCategories,
  createPet,
  validate,
  // findOne,
  // findMany,
  // update,
  // getSafeAttributes,
  // destroy,
};
