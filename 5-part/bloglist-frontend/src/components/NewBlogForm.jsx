import { useState } from 'react'

import blogService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs, setSysMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmitBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
      // likes defaults to 0
    }

    try {
      const createdBlog = await blogService.create(newBlog)
      // Add new blog
      setBlogs(blogs.concat(createdBlog))
      // Reset fields
      setTitle('')
      setAuthor('')
      setUrl('')

      setSysMessage(`SUCCESS: a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(() => {
        setSysMessage(null)
      }, 5000)
    } catch (exception) {
      setSysMessage(`FAIL: couldn't create new blog: ${exception.response.data.error}`)
      setTimeout(() => {
        setSysMessage(null) 
      }, 5000)
    }
  }
  
  return (
    <form onSubmit={handleSubmitBlog}>
      <div>
        title: 
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author: 
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url: 
          <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>   
  )
}

export default NewBlogForm