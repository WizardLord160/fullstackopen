const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Wonyoungism',
    author: 'Jang Wonyoung',
    url: 'http://www.starship-ent.com/',
    likes: '1'
  },
  {
    title: 'Yujinism',
    author: 'Ahn Yujin',
    url: 'http://www.starship-ent.com/',
    likes: '5'
  },
  {
    title: 'Liz',
    author: 'Kim Jiwon',
    url: 'http://www.starship-ent.com/',
    likes: '3'
  },
]

const blogsInDb = async () => {
  // Retrieve all blogs in test database
  const blogs = await Blog.find({})
  // Convert the Mongoose documents to JSON objects
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}