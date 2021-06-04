const authRouter = require('./auth');
const currentUserRouter = require('./currentUser');
const userRouter = require('./users');
const searchesRouter = require('./searches');

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/currentUser', currentUserRouter);
  app.use('/searches', searchesRouter);
};
