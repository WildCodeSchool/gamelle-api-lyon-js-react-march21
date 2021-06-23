const favoritesRouter = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const Favorite = require('../models/favorite');
const { RecordNotFoundError } = require('../error-types');
const requireCurrentUser = require('../middlewares/requireCurrentUser');

favoritesRouter.get('/', requireCurrentUser, async (req, res) => {
  const { id } = req.currentUser;
  try {
    const FavoriteData = await Favorite.findFavorites(id);
    return res.json(FavoriteData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send('Il y a eu une erreur lors de la récupération des favoris');
  }
});

favoritesRouter.get('/listfav', requireCurrentUser, async (req, res) => {
  const { id } = req.currentUser;
  try {
    const FavoriteData = await Favorite.findListOfFavorites(id);
    return res.json(FavoriteData);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send('Il y a eu une erreur lors de la récupération des favoris');
  }
});

favoritesRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    if (await Favorite.destroy(req.params.id)) res.sendStatus(204);
    else throw new RecordNotFoundError();
  })
);

favoritesRouter.post('/', requireCurrentUser, (req, res) => {
  const userId = req.currentUser.id;
  const { foodId } = req.body;
  console.log('foodId   ', foodId);
  return Favorite.createFavorite({ filters: { userId, foodId } })
    .then((favorite) => {
      res.json(favorite);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send("Il y a eu une erreur lors de l'enregistrement du favori");
    });
});

module.exports = favoritesRouter;
