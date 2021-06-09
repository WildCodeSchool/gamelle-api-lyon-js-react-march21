const authRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
const { SESSION_COOKIE_DOMAIN, SESSION_COOKIE_NAME } = require('../env');


// --------- Function for user login ---------  //
authRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password, stayConnected } = req.body;
    const user = await User.findByEmail(email);
    if (
      user &&
      (await User.verifyPassword(password, user.hashedPassword))
    ) {
      console.log('ok');
      if (stayConnected) {
        // --------- session cookie will be valid for a day --------- //
        req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
      }
      req.session.userId = user.id;
      req.session.save(() => {
        res.sendStatus(200);
      });
    } else {
      res.status(401).send('Informations non valides');
    }
  })
);

// --------- Function for logout --------- //
authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).send('Impossible de se déconnecter');
    res.clearCookie(SESSION_COOKIE_NAME, { domain: SESSION_COOKIE_DOMAIN });
    return res.status(200).send('Session déconnectée');
  });
});

module.exports = authRouter;