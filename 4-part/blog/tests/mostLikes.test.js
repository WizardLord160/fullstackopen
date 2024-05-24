const { test, describe } = require('node:test')
const assert = require('node:assert')
const mostLikes = require('../utils/test_helper').mostLikes

describe('most liked author', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Eleven',
      author: 'Ahn Yujin',
      url: 'http://www.starship-ent.com/',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Love Dive',
      author: 'Jang Wonyoung',
      url: 'http://www.starship-ent.com/',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'After Like',
      author: 'Kim Gaeul',
      url: 'http://www.starship-ent.com/',
      likes: 3,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'WAVE',
      author: 'Naoi Rei',
      url: 'http://www.starship-ent.com/',
      likes: 4,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'I AM',
      author: 'Elizabeth',
      url: 'http://www.starship-ent.com/',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Either Way',
      author: 'Leeseo',
      url: 'http://www.starship-ent.com/',
      likes: 0,
      __v: 0
    }
  ]
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Baddie',
      author: 'Lucky Vicky',
      url: 'http://www.starship-ent.com/',
      likes: 888,
      __v: 0
    }
  ]
  const emptyList = []

  test('of empty list is 0', () => {
    const result = mostLikes(emptyList)
    assert.deepStrictEqual(result, {
        author: "",
        likes: 0
    })
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {
        author: 'Lucky Vicky',
        likes: 888
    })
  })
  test('of a bigger list is calculated right', () => {
    const result = mostLikes(blogs)
    assert.deepStrictEqual(result, {
        author: 'Naoi Rei',
        likes: 4
    })
  })
})