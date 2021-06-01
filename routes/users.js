const usersRouter = require('express').Router();
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { firstname, lastname, phone, email, password } = req.body
  const validationError = User.validate(req.body)
  if (validationError)
    return res.status(422).send({ validationErrors: validationError.details })
  if (await User.emailAlreadyExists(email))
    return res.status(422).send({ error: 'this email is already taken' })
  if (await User.phoneAlreadyExist(phone) && phone === true)
    return res.status(422).send({ error: 'this phone number is already taken' })
  return res.status(201).send(await User.create({ firstname, lastname, phone, email, password }))
});

module.exports = usersRouter;