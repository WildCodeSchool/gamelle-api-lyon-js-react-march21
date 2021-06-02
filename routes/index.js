const userRouter = require('./users');
const searchesRouter = require('./searches');

module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/search', searchesRouter);
};
