const axios = require('axios');
const db = require('./db');

const delayInMilliseconds = 60 * 60 * 1000;

/* ********************** Connection & request to API periodically : Table Breed ********************** */
const gamelleBreedsRequest = async () => {
  const firstRequest = await db.breed.findMany();

  await axios
    .get(`https://gamelle-manager-staging.herokuapp.com/api/breeds`)
    .then((response) => response.data)
    .then((data) => {
      console.log(data);
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
// const gamelleFoodRequest = async () => {
//   const firstRequest = await db.food.findMany();

//   await axios
//     .get(`https://gamelle-manager-staging.herokuapp.com/api/products/main`)
//     .then((response) => response.data)
//     .then((data) => {
//       console.log(data);
//       data.forEach(async (food) => {
//         const foodAlreadyExists = firstRequest.filter(
//           (item) => item.gamelleId === food.id
//         );

//         const { nom, marque, especes, type } = food;
//         const WGFoodType = await db.foodType.findFirst({ where: { type } });
//         const WGCategory = await db.animalCategory.findFirst({
//           where: { especes },
//         });
//         console.log(food);
//         console.log(foodAlreadyExists);
//         console.log(WGCategory);
//         console.log(WGFoodType);
//         console.log(nom);
//         console.log(marque);

//         // if (foodAlreadyExists.length > 0) {
//         //   await db.breed.update({
//         //     where: { gamelleId: food.id },
//         //     data: {
//         //       name: nom,
//         //       brand: marque,
//         //       foodTypeId: WGFoodType.id,
//         //       animalCategoryId: WGCategory.id,
//         //       image: food.image.replace(/\\/g, ''),
//         //     },
//         //   });
//         // } else {
//         //   await db.breed.create({
//         //     data: {
//         //       gamelleId: food.id,
//         //       name: nom,
//         //       brand: marque,
//         //       foodTypeId: WGFoodType.id,
//         //       animalCategoryId: WGCategory.id,
//         //       image: food.image.replace(/\\/g, ''),
//         //     },
//         //   });
//         // }
//       });
//     });
//   console.log(`Table 'Food' updated at ${new Date()}`);
// };

// gamelleFoodRequest();
// setInterval(gamelleFoodRequest, delayInMilliseconds);
/* ********************** End of table Food update ********************** */

module.exports = {
  gamelleBreedsRequest,
  //   gamelleFoodRequest,
};
