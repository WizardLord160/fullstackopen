const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('invalid users are not created', () => {
  // Runs before every testcase
  beforeEach(async () => {
  // Delete all the users and reinsert initial users
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })
  console.log('Entered test')

  test('correct amount of users returned', async () => {
    const initialUsers = await helper.usersInDb()
    const databaseUsers = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(initialUsers.length, databaseUsers.body.length);
  })

  test('taken username not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      "username": "fallingin__fall",
      "name": "Imposter",
      "password": "test01"
    }

    const createUser = await api
      .post(`/api/users/`)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      assert(createUser.body.error.includes('expected `username` to be unique'))

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('username with length less than 3 not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      "username": "ab",
      "name": "Username Too Short",
      "password": "test02"
    }

    const createUser = await api
      .post(`/api/users/`)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      assert.strictEqual(createUser.body.error, 'User validation failed: username: Path `username` (`ab`) is shorter than the minimum allowed length (3).')

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('password with length less than 3 not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      "username": "abc",
      "name": "Password Too Short",
      "password": "03"
    }

    const createUser = await api
      .post(`/api/users/`)
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      assert.strictEqual(createUser.body.error, 'Password must be at least 3 characters long')

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})