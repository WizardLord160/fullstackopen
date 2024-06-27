const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('test existing notes', () => {
  // Runs before every testcase
  beforeEach(async () => {
  // Delete all the blogs and reinsert initial blogs
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })
  
  console.log('Entered test')
  test('correct amount of blog posts returned', async () => {
    const initialBlogs = await helper.blogsInDb()
    const databaseBlogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(initialBlogs.length, databaseBlogs.body.length);
  })
})

describe('crud operations', () => {
  beforeEach(async () => {
  // Delete all the blogs and reinsert initial blogs
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    // Delete initial users
    await User.deleteMany({})
    // Use initial users
    const initUsers = await helper.initialUsers()
    // console.log(initUsers)
    await User.insertMany(initUsers)
  })

  test('new blog post successfully created', async () => {
    const newBlog = {
      title: 'Falling in Fall',
      author: 'Kim Gaeul',
      url: 'http://www.starship-ent.com/',
      likes: '4',
    }

    // Login to a user
    const userDetails = {
      username: 'fallingin__fall',
      password: 'autumn'
    }
    const login = await api
      .post(`/api/login/`)
      .send(userDetails)
      .expect(200)

    // Send blog and include user token after logged in 
    const sendBlog = await api
      .post(`/api/blogs/`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb() 

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  })

  test('new blog post fails without token', async () => {
    const newBlog = {
      title: 'Falling in Fall',
      author: 'Kim Gaeul',
      url: 'http://www.starship-ent.com/',
      likes: '4',
    }

    // Send blog and include user token after logged in 
    const sendBlog = await api
      .post(`/api/blogs/`)
      .send(newBlog)
      .expect(401)

      assert.strictEqual(sendBlog.body.error, 'token invalid')
  })

  test('blog post successfully deleted', async () => {
    const blogsAtStart = await helper.blogsInDb() 

    // Find Yujin's blog and user
    const blogToDelete = await Blog.findOne({ author: "An Yujin" });
    const user = await User.findOne({ username: "_yujin_an" });
    // Assign the blog to user
    blogToDelete.user = user.id
    user.blogs = user.blogs.concat(blogToDelete.id)
    // Save changes to database
    await blogToDelete.save();
    await user.save();

    // Login to Yujin user
    const userDetails = {
      username: '_yujin_an',
      password: 'puppy'
    }
    const login = await api
      .post(`/api/login/`)
      .send(userDetails)
      .expect(200)

    // Delete the user's blog
    const deleteBlog = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb() 

    assert.strictEqual(blogsAtStart.length - 1, blogsAtEnd.length)
    const titles = blogsAtEnd.map(t => t.title)
    assert(!titles.includes(blogToDelete.title))
  })

  test('blog post successfully updated by adding one like', async () => {
    const blogsAtStart = await helper.blogsInDb() 
    const blogToUpdate = blogsAtStart[0]
    console.log(blogToUpdate)
    
    const addLike = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(addLike)
      .expect(200)

    assert.strictEqual(blogToUpdate.likes + 1, updatedBlog.body.likes)
  })
})

describe('validate fields', () => {
  test('unique identifier is named id and not default _id', async () => {
    const allBlogs = await helper.blogsInDb()

    allBlogs.forEach(blog => {
      assert.strictEqual(!blog.hasOwnProperty('_id') && blog.hasOwnProperty('id'), true)
    });
  })

  test('blog missing like field defaults to 0 likes', async () => {

    const newBlog = {
      title: 'Falling in Fall',
      author: 'Kim Gaeul',
      url: 'http://www.starship-ent.com/',
    }

    // Login to a user
    const userDetails = {
      username: 'fallingin__fall',
      password: 'autumn'
    }
    const login = await api
      .post(`/api/login/`)
      .send(userDetails)
      .expect(200)

    // Send blog and include user token after logged in 
    const sendBlog = await api
      .post(`/api/blogs/`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(newBlog)
      .expect(201)

    assert.strictEqual(sendBlog.body.likes, 0)
  })

  test('400 bad request if title missing', async () => {
    const newBlog = {
      author: 'Kim Gaeul',
      url: 'http://www.starship-ent.com/',
      likes: 4
    }

    // Login to a user
    const userDetails = {
      username: 'fallingin__fall',
      password: 'autumn'
    }
    const login = await api
      .post(`/api/login/`)
      .send(userDetails)
      .expect(200)

    // Send blog and include user token after logged in 
    const sendBlog = await api
      .post(`/api/blogs/`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(newBlog)
      .expect(400)

    assert.strictEqual(sendBlog.body.error, 'Blog validation failed: title: Path `title` is required.')
  })

  test('400 bad request if url missing', async () => {
    const newBlog = {
      title: 'Falling in Fall',
      author: 'Kim Gaeul',
      likes: 4
    }

    // Login to a user
    const userDetails = {
      username: 'fallingin__fall',
      password: 'autumn'
    }
    const login = await api
      .post(`/api/login/`)
      .send(userDetails)
      .expect(200)

    // Send blog and include user token after logged in 
    const sendBlog = await api
      .post(`/api/blogs/`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(newBlog)
      .expect(400)

    assert.strictEqual(sendBlog.body.error, 'Blog validation failed: url: Path `url` is required.')
  })

  test('400 bad request if url and title missing', async () => {
    const newBlog = {
      author: 'Kim Gaeul',
      likes: 4
    }

    // Login to a user
    const userDetails = {
      username: 'fallingin__fall',
      password: 'autumn'
    }
    const login = await api
      .post(`/api/login/`)
      .send(userDetails)
      .expect(200)

    // Send blog and include user token after logged in 
    const sendBlog = await api
      .post(`/api/blogs/`)
      .set('Authorization', `Bearer ${login.body.token}`)
      .send(newBlog)
      .expect(400)

    assert.strictEqual(sendBlog.body.error, 'Blog validation failed: title: Path `title` is required., url: Path `url` is required.')
  })
})

after(async () => {
  await mongoose.connection.close()
})