const axios = require('axios');
const express = require('express');
const cors = require('cors');
const { CORS_ALLOWED_ORIGINS, inTestEnv, PORT } = require('./env');
const db = require('./db');

const app = express();
app.set('x-powered-by', false);

const allowedOrigins = CORS_ALLOWED_ORIGINS.split(',');
const corsOptions = {
  origin: (origin, callback) => {
    if (origin === undefined || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

require('./routes')(app);

const delayInMilliseconds = 60 * 60 * 1000;

// server setup
const server = app.listen(PORT, () => {
  if (!inTestEnv) {
    console.log(`Server running on port ${PORT}`);
  }
});

/* ********************** Connection & request to API periodically ********************** */
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
};

gamelleBreedsRequest();
setInterval(gamelleBreedsRequest, delayInMilliseconds);

// process setup
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('uncaughtException', (error) => {
  console.error('uncaughtException', JSON.stringify(error), error.stack);
  process.exit(1);
});
process.on('beforeExit', () => {
  app.close((error) => {
    if (error) console.error(JSON.stringify(error), error.stack);
  });
});

module.exports = server;
