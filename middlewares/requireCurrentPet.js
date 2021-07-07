const Animal = require('../models/pet');

module.exports = async (req, res, next) => {
  const { AnimalId } = req.session;
  try {
    req.currentPet = await Animal.findOne(AnimalId);
  } catch (err) {
    return res.sendStatus(401);
  }
  return next();
};
