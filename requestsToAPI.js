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
      data.data.forEach(async (breed) => {
        const breedAlreadyExists = firstRequest.filter(
          (item) => item.gamelleId === breed.id
        );

        if (breedAlreadyExists.length > 0) {
          await db.breed.update({
            where: { gamelleId: breed.id },
            data: {
              breedName: breed.name,
              speciesId: breed.specie_id,
            },
          });
        } else {
          await db.breed.create({
            data: {
              breedName: breed.name,
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

/* ********************** Connection & request to API periodically : Table Brand ********************** */
// const gamelleBrandsRequest = async () => {
//   const firstRequest = await db.brand.findMany();

//   await axios
//     .get(`https://gamelle-manager-staging.herokuapp.com/api/list`)
//     .then((response) => response.data)
//     .then((data) => {
//       data.data.forEach(async (brand) => {
//         const brandAlreadyExists = firstRequest.filter(
//           (item) => item.gamelleId === brand.id
//         );

//         if (brandAlreadyExists.length > 0) {
//           await db.brand.update({
//             where: { gamelleId: brand.id },
//             data: {
//               breedName: brand.brand,
//             },
//           });
//         } else {
//           await db.brand.create({
//             data: {
//               breedName: brand.brand,
//               gamelleId: brand.id,
//             },
//           });
//         }
//       });
//     });
// console.log(`Table 'Brand' updated at ${new Date()}`);
// };

// gamelleBrandsRequest();
// setInterval(gamelleBrandsRequest, delayInMilliseconds);
/* ********************** End of table Breed update ********************** */

/* ********************** Connection & request to API periodically : Table Food ********************** */
// const gamelleFoodRequest = async () => {
//   const firstRequest = await db.food.findMany();

//   await axios
//     .get(`https://gamelle-manager-staging.herokuapp.com/api/products/main`)
//     .then((response) => response.data)
//     .then((data) => {
//       data.data.forEach(async (food) => {
//         const foodAlreadyExists = firstRequest.filter(
//           (item) => item.gamelleId === food.id
//         );

//         const { marque, especes, type } = food;
//         const WGBrand = await db.brand.findFirst({ where: { marque } });
//         const WGFoodType = await db.foodType.findFirst({ where: { type } });
//         const WGCategory = await db.animalCategory.findFirst({
//           where: { especes },
//         });

//         if (foodAlreadyExists.length > 0) {
//           await db.breed.update({
//             where: { gamelleId: food.id },
//             data: {
//               breedName: food.name,
//               speciesId: food.specie_id,
//             },
//           });
//         } else {
//           await db.breed.create({
//             data: {
//               gamelleId: food.id,
//               brandId: WGBrand.id,
//               foodName: food.nom,
//               foodTypeId: WGFoodType.id,
//               animalCategoryId: WGCategory.id,
//               image: food.image.replace(/\\/g, ''),
//             },
//           });
//         }
//       });
//     });
// console.log(`Table 'Food' updated at ${new Date()}`);
// };

// gamelleFoodRequest();
// setInterval(gamelleFoodRequest, delayInMilliseconds);
/* ********************** End of table Food update ********************** */

module.exports = {
  gamelleBreedsRequest,
  //   gamelleBrandsRequest,
  //   gamelleFoodRequest,
};
