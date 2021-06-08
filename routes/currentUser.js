const currentUserRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const requireCurrentUser = require('../middlewares/requireCurrentUser');

// --------- Caption of logged user info --------- //
currentUserRouter.get(
  '/',
  requireCurrentUser,
  asyncHandler(async (req, res) => {
    const { firstname, lastname, email, id } = req.currentUser;
    res.json({ firstname, lastname, email, id });
  })
);

module.exports = currentUserRouter;
