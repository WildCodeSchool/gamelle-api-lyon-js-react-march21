// const _ = require('lodash');
const petsRouter = require('express').Router();
// const expressAsyncHandler = require('express-async-handler');
// const requireCurrentPet = require('../middlewares/requireCurrentPet');
// const handleImageUpload = require('../middlewares/handleImageUpload');
const Pet = require('../models/pet');
// const { ValidationError, RecordNotFoundError } = require('../error-types');
// const tryDeleteFile = require('../helpers/tryDeleteFile');

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

petsRouter.post('/', (req, res) => {
  const { id } = req.currentUser;
  const { image, name, breedId, animalCategoryId } = req.body;
  const ownerId = parseInt(req.params.ownerId, 10);

  return Pet.createPet({
    filters: {
      image,
      name,
      breedId: breedId || undefined,
      animalCategoryId: animalCategoryId || undefined,
      animalId: id || undefined,
      ownerId: ownerId || undefined,
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

petsRouter.post('/', async (req, res) => {
  const validationError = Pet.validate(req.body);
  if (validationError)
    return res.status(422).send({ errors: validationError.details });

  const newPet = await Pet.create(req.body);

  return res.status(201).send(Pet.getSafeAttributes(newPet));
});

// petsRouter.patch(
//   '/:id',
//   requireCurrentPet,
//   handleImageUpload.single('image'),
//   expressAsyncHandler(async (req, res) => {
//     const pet = await Pet.findOne(req.params.id);
//     const oldImage = pet.image;
//     if (!pet) throw new RecordNotFoundError('pets', req.params.id);
//     const data = _.omit(req.body, 'image');

//     if (req.file && req.file.path) {
//       if (req.body.image === '') {
//         await tryDeleteFile(req.file.path);
//       } else {
//         data.image = req.file.path;
//       }
//     }

//     const error = Pet.validate(data, true);
//     if (error) throw new ValidationError(error.details);

//     const updated = await Pet.update(req.params.id, data);
//     if (req.file && req.file.path) {
//       await tryDeleteFile(oldImage);
//     }
//     res.send(Pet.getSafeAttributes(updated));
//   })
// );

// petsRouter.post('/:ownerId', requireCurrentPet, async (req, res) => {
//   const { id } = req.currentPet;
//   const { image, name, breedId, animalCategoryId } = req.body;
//   const ownerId = parseInt(req.params.ownerId, 10);

//   try {
//     const newPet = await Pet.createPet({
//       image,
//       name,
//       breedId,
//       animalCategoryId,
//       animalId: id,
//       ownerId,
//     });
//     res.status(200).send(newPet);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }

//   return Pet.createPet({
//     filters: {
//       image,
//       name,
//       breedId: breedId || undefined,
//       animalCategoryId: animalCategoryId || undefined,
//       animalId: id || undefined,
//       ownerId: ownerId || undefined,
//     },
//   })
//     .then((newPet) => {
//       res.json(newPet);
//     })
//     .catch((err) => {
//       console.log(err);
//       res
//         .status(500)
//         .send(
//           "Il y a eu une erreur lors de la récupération des infos de l'animal"
//         );
//     });
// });

// petsRouter.get('/', requireCurrentPet, async (req, res) => {
//   const { id } = req.currentPet;
//   if (req.currentPet) {
//     try {
//       const petData = await Pet.findPet(id);
//       return res.json(petData);
//     } catch (err) {
//       console.log(err);
//       return res
//         .status(500)
//         .send("Il y a eu une erreur lors de la récupération de l'animal");
//     }
//   } else {
//     return res.json([]);
//   }
// });

module.exports = petsRouter;
