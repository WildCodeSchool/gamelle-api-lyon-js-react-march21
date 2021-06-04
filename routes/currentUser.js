const currentUserRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const requireCurrentUser = require('../middlewares/requireCurrentUser');


// --------- Caption of logged user info --------- //
currentUserRouter.get(
  '/',
  requireCurrentUser,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, id } = req.currentUser;
    res.json({ firstName, lastName, id });
  })
);

module.exports = currentUserRouter;