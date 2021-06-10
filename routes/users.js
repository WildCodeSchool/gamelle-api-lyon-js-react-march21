const _ = require('lodash')
const usersRouter = require('express').Router();
const expressAsyncHandler = require('express-async-handler');
const requireCurrentUser = require('../middlewares/requireCurrentUser');
const handleImageUpload = require('../middlewares/handleImageUpload');
const User = require('../models/user')
const { ValidationError, RecordNotFoundError } = require('../error-types');
const tryDeleteFile = require('../helpers/tryDeleteFile');

usersRouter.post('/', async (req, res) => {
  const validationError = User.validate(req.body)
  if (validationError)
    return res.status(422).send({ errors: validationError.details })
  if (await User.emailAlreadyExists(req.body.email))
    return res.status(422).send({ error: 'this email is already taken' })
  if (req.body.phone && await User.phoneAlreadyExist(req.body.phone))
    return res.status(422).send({ error: 'this phone number is already taken' })
  const newUser = await User.create(req.body);
  return res.status(201).send(User.getSafeAttributes(newUser));
});

usersRouter.patch(
  '/:id',
  requireCurrentUser,
  expressAsyncHandler(async (req, res, next) => {
    if (
      req.currentUser.role === 'admin' ||
      req.currentUser.id.toString() === req.params.id
    )
      next();
    else res.sendStatus(403);
  }),
  handleImageUpload.single('avatar'),
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne(req.params.id);
    const oldAvatarUrl = user.avatarUrl;
    if (!user) throw new RecordNotFoundError('users', req.params.id);
    const data = _.omit(req.body, 'avatar');

    if (req.file && req.file.path) {
      if (req.body.avatarUrl === '') {
        await tryDeleteFile(req.file.path);
      } else {
        data.avatarUrl = req.file.path;
      }
    }

    const error = User.validate(data, true);
    if (error) throw new ValidationError(error.details);

    const updated = await User.update(req.params.id, data);
    if (req.file && req.file.path) {
      await tryDeleteFile(oldAvatarUrl);
    }

    res.send(User.getSafeAttributes(updated));
  })
);

usersRouter.delete('/:id', requireCurrentUser, expressAsyncHandler(async (req, res) => {
  if (await User.destroy(req.params.id))
    res.sendStatus(204);
  else throw new RecordNotFoundError();
})
);
module.exports = usersRouter;