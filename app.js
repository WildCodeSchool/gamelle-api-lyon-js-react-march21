const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const requestsToAPI = require('./requestsToAPI');
const User = require('./models/user');
const {
  PORT,
  CORS_ALLOWED_ORIGINS,
  inTestEnv,
  inProdEnv,
  SESSION_COOKIE_SECRET,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_DOMAIN,
  API_BACK,
} = require('./env');

const sessionStore = require('./sessionStore');
// const { user } = require('./db');

const app = express();

app.set('x-powered-by', false);
app.set('trust proxy', 1);

app.use(express.json());

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

app.use(
  session({
    key: SESSION_COOKIE_NAME,
    secret: SESSION_COOKIE_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: inProdEnv,
      domain: SESSION_COOKIE_DOMAIN,
      sameSite: true,
    },
  })
);

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await User.findByEmail(email, false);
      if (user && (await User.verifyPassword(user, password))) {
        return done(null, user);
      }
      return done(null, false);
    }
  )
);

passport.use(
  new GoogleStrategy({
    clientID: "10988819502-6041kqu6j43j4k8njugdt74p577vtdrn.apps.googleusercontent.com",
    clientSecret: "Ekp2tcMrlC3-n0NutWqkn_XB",
    callbackURL: `${API_BACK}/auth/google/callback`
  },
    async (accesToken, resfreshToken, profile, done) => {
      try {
        const existingUser = await User.findByGoogleId(profile.id, false);
        if (existingUser) done(null, existingUser);
        else {
          const user = await User.create({
            email: profile._json.email, // eslint-disable-line
            firstname: profile._json.given_name, // eslint-disable-line
            lastname: profile._json.family_name, // eslint-disable-line
            googleId: profile.id, // eslint-disable-line
            confirmedEmailToken: 'Active',
          });
          done(null, user);

        }
      } catch (err) {
        done(err)
      }
    }
  ));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, user, done) => {
  await User.findOne(id);
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/file-storage', express.static('file-storage'));

require('./routes')(app);

// server setup
const server = app.listen(PORT, () => {
  if (!inTestEnv) {
    console.log(`Server running on port ${PORT}`);
  }
});

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

requestsToAPI.gamelleBreedsRequest();

module.exports = server;
