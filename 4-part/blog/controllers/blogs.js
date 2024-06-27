const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  // Get all blogs, return as json
  // Populate user field with its corresponding user, without blog field
  const blogs = await Blog.find({}).populate('user', '-blogs')
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  // Both auth token and user extracted via middleware
  const user = request.user
  const body = request.body

  // Create the new blog
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  const savedBlog = await blog.save()

  // Save the blog to the user too
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const body = request.body

  // Find author of blog
  const blog = await Blog.findById(request.params.id)
  const blogAuthor = blog.user

  if (blogAuthor != user.id) {
    return response.status(400).json({ error : 'Only author can delete their post'})
  }

  // Remove blog from the user
  user.blogs = user.blogs.filter((blogId) => blogId.toString() != request.params.id)
  console.log(user.blogs)
  await user.save()

  // Delete the blog
  const deleteBlog = await Blog.findByIdAndDelete(request.params.id)
  
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  // Update a blog by id
  // Update blog body (title, author, url, likes) with the new request body
  // Signify to return new document not original
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter