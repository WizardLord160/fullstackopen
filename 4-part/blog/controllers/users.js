const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', '-user')
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // Enforce minimum length 3 for passwords
  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'Password must be at least 3 characters long' });
  }

  // Hash the password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  // Create the new user
  const user = new User({
    username,
    name,
    passwordHash // Saves only hash and not actual password to database
  })

  // Save user
  const savedUser = await user.save()
  response.status(201).json(savedUser) // Success status
})

usersRouter.delete('/:id', async (request, response) => {
  userId = request.params.id

  // Delete all blogs from user
  const deleteBlogs = await Blog.deleteMany({ user: userId })

  const deleteUser = await User.findByIdAndDelete(userId)
  response.status(204).end()
})

module.exports = usersRouter