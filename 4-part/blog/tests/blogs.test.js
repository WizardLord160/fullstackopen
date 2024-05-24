const { test, describe } = require('node:test')
const assert = require('node:assert')
const dummyHelper = require('../utils/test_helper').dummy

describe('always 1', () => {
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

  test('always 1', () => {
    const result = dummyHelper(emptyList)
    assert.strictEqual(result, 1)
  })
  test('always 1', () => {
    const result = dummyHelper(listWithOneBlog)
    assert.strictEqual(result, 1)
  })
  test('always 1', () => {
    const result = dummyHelper(blogs)
    assert  })
})