const Joi = require('joi');
// const JoiPhoneNumber = Joi.extend(require('joi-phone-number'));
const db = require('../db');
const { API_BACK } = require('../env');

const findOne = (id) => db.user.findUnique({ where: { id: parseInt(id, 10) } });

const { findMany } = db.user;

// ---------Creation d'une fonction pour mettre à jour les données de l'utilisateur--------- //
const update = async (id, data) =>
  db.user.update({
    where: { id: parseInt(id, 10) },
    data: {
      ...data,
      image:
        typeof data.image === 'string'
          ? data.image.replace(`${API_BACK}/`, '')
          : data.image,
    },
  });

// ---------Creation d'une fonction validation avec Joi--------- //
const validate = (data, forUpdate = false) =>
  Joi.object({
    name: Joi.string()
      .min(1)
      .max(255)
      .presence(forUpdate ? 'optional' : 'required'),
    image: Joi.string().max(255).allow(null, ''),
  }).validate(data, { abortEarly: false }).error;

const getSafeAttributes = (pet) => {
  let { image } = pet;
  if (image && !image.startsWith('http://') && !image.startsWith('https://')) {
    image = `${API_BACK}/${image}`;
  }
  return {
    ...image,
  };
};

const create = async ({ name, image }) => {
  return db.pet.create({
    data: { name, image },
  });
};

const destroy = (id) =>
  db.pet
    .delete({ where: { id: parseInt(id, 10) } })

    .then(() => true)
    .catch(() => false);

module.exports = {
  // findByEmail,
  // emailAlreadyExists,
  // phoneAlreadyExist,
  // hashPassword,
  create,
  // verifyPassword,
  validate,
  findOne,
  findMany,
  update,
  getSafeAttributes,
  destroy,
};
