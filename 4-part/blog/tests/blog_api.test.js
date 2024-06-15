const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

// Runs before every testcase
beforeEach(async () => {
  // Delete all the blogs
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  // // Recreate all the blogs from helper
  // const blogObjects = helper.initialBlogs
  //   .map(blog => new Blog(blog))
  // // Save all the blogs, array of promises
  // const promiseArray = blogObjects.map(blog => blog.save())
  // // Wait for all the blogs to save before proceeding
  // await Promise.all(promiseArray) // Transforms all promises into single promise
})

describe('test existing notes', () => {
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
  test('new blog post successfully created', async () => {
    const newBlog = {
      title: 'Falling in Fall',
      author: 'Kim Gaeul',
      url: 'http://www.starship-ent.com/',
      likes: '4'
    }

    const sendBlog = await api
      .post(`/api/blogs/`)
      .send(newBlog)
      .expect(201)

      const blogsAtEnd = await helper.blogsInDb() 

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  })

  test('blog post successfully deleted', async () => {
    const blogsAtStart = await helper.blogsInDb() 
    const blogToDelete = blogsAtStart[0]

    const deleteBlog = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
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
      title: 'Rei of Sunshine',
      author: 'Naoi Rei',
      url: 'http://www.starship-ent.com/',
    }

    const sendBlog = await api
      .post(`/api/blogs/`)
      .send(newBlog)
      .expect(201)

    assert.strictEqual(sendBlog.body.likes, 0)
  })

  test('400 bad request if title missing', async () => {
    const newBlog = {
      author: 'Leeseo',
      url: 'http://www.starship-ent.com/',
      likes: 7
    }

    const sendBlog = await api
      .post(`/api/blogs/`)
      .send(newBlog)
      .expect(400)

    assert.strictEqual(sendBlog.body.error, 'Blog validation failed: title: Path `title` is required.')
  })

  test('400 bad request if url missing', async () => {
    const newBlog = {
      title: 'Tiger Bite',
      author: 'Leeseo',
      likes: 7
    }

    const sendBlog = await api
      .post(`/api/blogs/`)
      .send(newBlog)
      .expect(400)

    assert.strictEqual(sendBlog.body.error, 'Blog validation failed: url: Path `url` is required.')
  })

  test('400 bad request if url and title missing', async () => {
    const newBlog = {
      author: 'Leeseo',
      likes: 7
    }

    const sendBlog = await api
      .post(`/api/blogs/`)
      .send(newBlog)
      .expect(400)

    assert.strictEqual(sendBlog.body.error, 'Blog validation failed: url: Path `url` is required., title: Path `title` is required.')
  })
})

after(async () => {
  await mongoose.connection.close()
})