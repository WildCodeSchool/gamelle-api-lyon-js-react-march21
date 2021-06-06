const axios = require('axios');
const db = require('./db');
const { API_URL } = require('./env');

const delayInMilliseconds = 60 * 60 * 1000;

/* ********************** Connection & request to API periodically : Table Breed ********************** */
const gamelleBreedsRequest = async () => {
  const firstRequest = await db.breed.findMany();

  await axios
    .get(`${API_URL}/breeds`)
    .then((response) => response.data)
    .then((data) => {
      data.data.forEach(async (breed) => {
        const breedAlreadyExists = firstRequest.filter(
          (item) => item.gamelleId === breed.id
        );

        if (breedAlreadyExists.length > 0) {
          await db.breed.update({
            where: { gamelleId: breed.id },
            data: {
              name: breed.name,
              speciesId: breed.specie_id,
            },
          });
        } else {
          await db.breed.create({
            data: {
              name: breed.name,
              gamelleId: breed.id,
              speciesId: breed.specie_id,
            },
          });
        }
      });
    });

  console.log(`Table 'Breed' updated at ${new Date()}`);
};

gamelleBreedsRequest();
setInterval(gamelleBreedsRequest, delayInMilliseconds);
/* ********************** End of table Breed update ********************** */

/* ********************** Connection & request to API periodically : Table Food ********************** */
const gamelleFoodRequest = async () => {
  const firstRequest = await db.food.findMany();

  await axios
    .get(`${API_URL}/products/main/`, {
      params: {
        _limit: 10,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      console.log(data.length);
      data.forEach(async (food) => {
        const foodAlreadyExists = firstRequest.filter(
          (item) => item.gamelleId === food.id
        );
        const { nom, marque, especes, type } = food;
        let WGFoodTypeId = null;
        let WGCategoryId = null;

        if (type) {
          const WGFoodType = await db.foodType.findFirst({
            where: { name: type },
          });
          WGFoodTypeId = WGFoodType ? WGFoodType.id : null;
        }

        if (especes) {
          const WGCategory = await db.animalCategory.findFirst({
            where: { name: especes },
          });
          WGCategoryId = WGCategory ? WGCategory.id : null;
        }

        if (foodAlreadyExists.length > 0) {
          await db.food.update({
            where: { gamelleId: food.id },
            data: {
              name: nom,
              brand: marque,
              foodTypeId: WGFoodTypeId,
              animalCategoryId: WGCategoryId,
              image: food.image.replace(/\\/g, ''),
            },
          });
        } else {
          await db.food.create({
            data: {
              gamelleId: food.id,
              name: nom,
              brand: marque,
              foodTypeId: WGFoodTypeId,
              animalCategoryId: WGCategoryId,
              image: food.image.replace(/\\/g, ''),
            },
          });
        }
      });
    });
  console.log(`Table 'Food' updated at ${new Date()}`);
};

gamelleFoodRequest();
setInterval(gamelleFoodRequest, delayInMilliseconds);
/* ********************** End of table Food update ********************** */

module.exports = {
  gamelleBreedsRequest,
  gamelleFoodRequest,
};
