const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'Wonyoungism',
    author: 'Jang Wonyoung',
    url: 'http://www.starship-ent.com/',
    likes: '1'
  },
  {
    title: 'Yujinism',
    author: 'An Yujin',
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

const initialUsers = async () => {
  const passwordHash1 = await bcrypt.hash('puppy', 10);
  const passwordHash2 = await bcrypt.hash('autumn', 10);

  return [
    {
      username: '_yujin_an',
      name: 'An Yujin',
      passwordHash: passwordHash1,
      blogs: [],
    },
    {
      username: 'fallingin__fall',
      name: 'Kim Gaeul',
      passwordHash: passwordHash2,
      blogs: [],
    },
  ];
};

const blogsInDb = async () => {
  // Retrieve all blogs in test database
  const blogs = await Blog.find({})
  // Convert the Mongoose documents to JSON objects
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb
}