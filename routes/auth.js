const authRouter = require('express').Router();
const asyncHandler = require('express-async-handler');
const passport = require('passport')
const User = require('../models/user');
const { SESSION_COOKIE_DOMAIN, SESSION_COOKIE_NAME, URL_FRONT } = require('../env');

// --------- Function for logout --------- //
authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).send('Impossible de se déconnecter');
    res.clearCookie(SESSION_COOKIE_NAME, { domain: SESSION_COOKIE_DOMAIN });
    return res.status(200).send('Session déconnectée');
  });
});

// --------- Function for user login ---------  //
authRouter.post(
  '/login',
  asyncHandler(async (req, res) => {
    const { email, password, stayConnected } = req.body;
    const user = await User.findByEmail(email);
    if (
      user &&
      (await User.verifyPassword(password, user.hashedPassword)) &&
      user.confirmedEmailToken === 'Active'
    ) {
      console.log('Utilisateur connecté');
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

// --------- Log w/ gmail --------- //
/* authRouter.post('/login', asyncHandler(async (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) res.status(500).send('error');
    else
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.status(401).send('Informations non valides');
        }
        if (req.body.stayConnected) {
          req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
        }
        return res.send("Vous êtes authentifié et connecté")
      })
  })(req, res, next);
})) */

authRouter.get('/google', asyncHandler(async (req, res, next) => {
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',],
  })(req, res, next);
}));

authRouter.get('/google/callback', asyncHandler(async (req, res, next) => {
  passport.authenticate('google', {
    successRedirect: `${URL_FRONT}/profil`,
    failureRedirect: '/auth/google',
  })(req, res, next);
}));

module.exports = authRouter;

// AUTH_SUCCESS_REDIRECT_URL