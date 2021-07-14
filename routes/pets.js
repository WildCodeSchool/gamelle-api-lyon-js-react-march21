const _ = require('lodash');
const petsRouter = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const handleImageUpload = require('../middlewares/handleImageUpload');
const Pet = require('../models/pet');
const requireCurrentUser = require('../middlewares/requireCurrentUser');
const { RecordNotFoundError } = require('../error-types');
const tryDeleteFile = require('../helpers/tryDeleteFile');

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

petsRouter.get('/:id', async (req, res) => {
  return Pet.findOne(parseInt(req.params.id, 10))
    .then((pet) => {
      res.json(pet);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send('Il y a eu une erreur lors de la récupération de cet animal');
    });
});

petsRouter.post('/', requireCurrentUser, async (req, res) => {
  const ownerId = req.currentUser.id;
  const { image, name, breedId, animalCategoryId } = req.body;

  return Pet.createPet({
    image,
    name,
    breedId: parseInt(breedId, 10),
    animalCategoryId: parseInt(animalCategoryId, 10),
    ownerId,
  })
    .then((pet) => {
      res.json(pet);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send("Il y a eu une erreur lors de l'ajout de cet animal");
    });
});

petsRouter.patch(
  '/:id',
  handleImageUpload.single('image'),
  expressAsyncHandler(async (req, res) => {
    const pet = await Pet.findOne(parseInt(req.params.id, 10));
    const oldImage = pet.image;

    if (!pet) throw new RecordNotFoundError('pets', req.params.id);
    const data = _.omit(req.body, 'image');

    if (req.file && req.file.path) {
      if (req.body.image === '') {
        await tryDeleteFile(req.file.path);
      } else {
        data.image = req.file.path;
      }
    }
    const updated = await Pet.updatePet(req.params.id, data);
    if (req.file && req.file.path) {
      await tryDeleteFile(oldImage);
    }
    res.send(updated);
  })
);

// destroyFavorite

petsRouter.get('/favorites/:animalId', requireCurrentUser, async (req, res) => {
  if (req.currentUser) {
    const { animalId } = req.params;
    try {
      const petFav = await Pet.findPetFavorites(animalId);
      return res.json(petFav);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .send('Il y a eu une erreur lors de la récupération des favoris');
    }
  } else {
    return res.json([]);
  }
});

petsRouter.post('/favorites', async (req, res) => {
  const { animalId, favoriteId } = req.body;

  return Pet.addFavorite({
    animalId,
    favoriteId,
  })
    .then((fav) => {
      res.json(fav);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send(
          "Il y a eu une erreur lors de l'ajout de ce favori pour votre animal"
        );
    });
});

petsRouter.delete('/favorites/:id', async (req, res) => {
  return Pet.destroyFavorite(req.params.id)
    .then((fav) => {
      res.json(fav);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send(
          'Il y a eu une erreur lors de la suppression de ce favori pour votre animal'
        );
    });
});

module.exports = petsRouter;
