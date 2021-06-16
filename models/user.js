const argon2 = require('argon2');
const Joi = require('joi');
const JoiPhoneNumber = Joi.extend(require('joi-phone-number'));
const db = require('../db');
const { API_BACK } = require('../env');

// ---------Creation d'une fonction pour trouver un utilisateur par son email--------- //
const findByEmail = (email) => {
  return db.user.findFirst({ where: { email } });
};

// ---------Creation d'une fonction pour comparer le numero avec un numero déjà existant--------- //
const phoneAlreadyExist = (phone) => {
  return db.user.findFirst({ where: { phone } }).then((User) => !!User);
};

// ---------Creation d'une fonction comparer le mail avec un mail déjà existant--------- //
const emailAlreadyExists = (email) => {
  return db.user.findFirst({ where: { email } }).then((User) => !!User);
};

// ---------Option de hachage du mdp--------- //
const hashingOptions = {
  memoryCost: 2 ** 16,
  timeCost: 5,
  type: argon2.argon2id,
};

// ---------Creation d'une fonction pour trouver un utilisateur par son id unique--------- //
const findOne = (id) => db.user.findUnique({ where: { id: parseInt(id, 10) } });

const { findMany } = db.user;

// ---------Creation d'une fonction pour hacher le mdp--------- //
const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

// ---------Creation d'une fonction pour creer un email--------- //
const create = async ({ firstname, lastname, phone, email, password }) => {
  const hashedPassword = await hashPassword(password);
  return db.user.create({
    data: { firstname, lastname, phone, email, hashedPassword },
  });
};

// ---------Creation d'une fonction pour verifier si le mdp entré correspond au mdp crypté--------- //
const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

// ---------Creation d'une fonction pour mettre à jour les données de l'utilisateur--------- //
const update = async (id, data) =>
  db.user.update({
    where: { id: parseInt(id, 10) },
    data: {
      ...data,
      avatarUrl:
        typeof data.avatarUrl === 'string'
          ? data.avatarUrl.replace(`${API_BACK}/`, '')
          : data.avatarUrl,
    },
  });

// ---------Creation d'une fonction validation avec Joi--------- //
const validate = (data, forUpdate = false) =>
  Joi.object({
    firstname: Joi.string()
      .min(1)
      .max(255)
      .presence(forUpdate ? 'optional' : 'required'),
    lastname: Joi.string()
      .min(1)
      .max(255)
      .presence(forUpdate ? 'optional' : 'required'),
    phone: JoiPhoneNumber.string()
      .phoneNumber()
      .min(10)
      .max(20)
      .allow(null, '')
      .optional(),
    email: Joi.string()
      .email()
      .max(255)
      .presence(forUpdate ? 'optional' : 'required'),
    password: Joi.string()
      .min(8)
      .presence(forUpdate ? 'optional' : 'required'),
    avatarUrl: Joi.string().max(255).allow(null, ''),
  }).validate(data, { abortEarly: false }).error;

const getSafeAttributes = (user) => {
  let { avatarUrl } = user;
  if (
    avatarUrl &&
    !avatarUrl.startsWith('http://') &&
    !avatarUrl.startsWith('https://')
  ) {
    avatarUrl = `${API_BACK}/${avatarUrl}`;
  }
  return {
    ...user,
    avatarUrl,
    hashedPassword: undefined,
  };
};

const destroy = (id) =>
  db.user
    .delete({ where: { id: parseInt(id, 10) } })
    .then(() => true)
    .catch(() => false);

module.exports = {
  findByEmail,
  emailAlreadyExists,
  phoneAlreadyExist,
  hashPassword,
  create,
  verifyPassword,
  validate,
  findOne,
  findMany,
  update,
  getSafeAttributes,
  destroy,
};
