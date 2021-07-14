const petsRouter = require('express').Router();
const Pet = require('../models/pet');
const requireCurrentUser = require('../middlewares/requireCurrentUser');

petsRouter.get('/', async (req, res) => {
  const dataToPets = [];

  await Pet.findBreeds()
    .then((results) => {
      dataToPets.push(results);
    })
    .catch((err) => {
      console.log(err);
      dataToPets.push([]);
      return res
        .status(500)
        .send(
          'Il y a eu une erreur lors de la récupération de la race de votre animal'
        );
    });

  await Pet.findAnimalCategories()
    .then((results) => {
      dataToPets.push(results);
    })
    .catch((err) => {
      console.log(err);
      dataToPets.push([]);
      return res
        .status(500)
        .send(
          "Il y a eu une erreur lors de la récupération des catégories d'animaux"
        );
    });
  return res.json(dataToPets);
});

petsRouter.post('/', requireCurrentUser, (req, res) => {
  const { id } = req.currentUser;
  const { image, name, breedId, animalCategoryId } = req.body;

  return Pet.createPet({
    filters: {
      image,
      name,
      breedId: parseInt(breedId, 10),
      animalCategoryId: parseInt(animalCategoryId, 10),
      ownerId: id,
    },
  })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send('Il y a eu une erreur lors de la récupération des produits');
    });
});

module.exports = petsRouter;
