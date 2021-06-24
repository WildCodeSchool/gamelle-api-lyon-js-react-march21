const authRouter = require('./auth');
const currentUserRouter = require('./currentUser');
const userRouter = require('./users');
const searchesRouter = require('./searches');
const foodsRouter = require('./foods');
const historiesRouter = require('./histories');

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/currentUser', currentUserRouter);
  app.use('/searches', searchesRouter);
  app.use('/foods', foodsRouter);
  app.use('/histories', historiesRouter);
};
