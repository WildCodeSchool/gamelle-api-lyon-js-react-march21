const authRouter = require('./auth');
const currentUserRouter = require('./currentUser');
const userRouter = require('./users')


module.exports = (app) => {
  app.use('/users', userRouter);
  app.use('/auth', authRouter);
  app.use('/currentUser', currentUserRouter);
}
