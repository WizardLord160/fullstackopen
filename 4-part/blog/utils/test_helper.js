const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    return max.likes > blog.likes ? max : { title: blog.title, author: blog.author, likes: blog.likes }
  }
  return blogs.reduce(reducer, { title: "", author: "", likes: 0 })
}

const mostBlogs = (blogs) => {
  let authorCount = {}
  let maxCount = 0
  let maxAuthor = ""

  blogs.forEach(blog => {
    if (authorCount[blog.author]) {
        authorCount[blog.author] += 1;
    } else {
        authorCount[blog.author] = 1;
    }
  });

  for (author in authorCount) {
    if (authorCount[author] > maxCount) {
        maxCount = authorCount[author];
        maxAuthor = author;
    }
  }

  return maxAuthor
}

const mostLikes = (blogs) => {
  let authorLikes = {}
  let maxAuthor = ""
  let maxCount = 0

  blogs.forEach(blog => {
    if (authorLikes[blog.author]) {
      authorLikes[blog.author] += blog.likes
    } else {
      authorLikes[blog.author] = blog.likes
    }
  })

  for (author in authorLikes) {
    if (authorLikes[author] > maxCount) {
        maxCount = authorLikes[author];
        maxAuthor = author;
    }
  }

  return {
    author: maxAuthor,
    likes: maxCount
  }
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}