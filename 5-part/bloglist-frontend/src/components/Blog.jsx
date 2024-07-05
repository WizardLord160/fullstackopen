import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, setSysMessage }) => {
  // All blog details hidden by default
  const [visible, setVisible] = useState(false)
  
  // Hide an element while blog details visible
  const hideWhenVisible = {
    display: visible ? 'none' : '',
  }
  // Show an element while blog details visible
  const showWhenVisible = {
    display: visible ? '' : 'none',
  }
  // Change visibility state
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Blog container styling
  const blogContainer = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async (event) => {
    event.preventDefault()
    // Increment likes
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
       // Save user info, it will be overwritten in backend later (check blogRouter.put)
      const userInfo = updatedBlog.user
      const likedBlog = await blogService.update(updatedBlog)
      // Restore user information
      likedBlog.user = userInfo 
      // Update blogs in frontend and re-sort them as needed
      setBlogs(blogs.map(blog => blog.id !== likedBlog.id ? blog : likedBlog).sort((a, b) => b.likes - a.likes))

      setSysMessage(`SUCCESS: blog ${updatedBlog.title} liked`)
      setTimeout(() => {
        setSysMessage(null)
      }, 5000)
    } catch (exception) {
      setSysMessage(`FAIL: failed to like blog ${updatedBlog.title}`)
      setTimeout(() => {
        setSysMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        // Delete blog
        await blogService.remove(blog)
        // Update blogs in frontend after deletion
        setBlogs(blogs.filter((remainingBlogs) => remainingBlogs.id !== blog.id).sort((a, b) => b.likes - a.likes))
  
        setSysMessage(`SUCCESS: deleted blog ${blog.title}`)
        setTimeout(() => {
          setSysMessage(null)
        }, 5000)
      } catch (exception) {
        console.log(exception)
        setSysMessage(`FAIL: failed to delete blog ${blog.title}`)
        setTimeout(() => {
          setSysMessage(null)
        }, 5000)
      }
    }    
  }

  return (
    <div style={blogContainer}>
      {blog.title} by {blog.author} 
      <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      <div style={showWhenVisible} id='blog-details'>
        <div style={{display: 'block'}}>          
          <div>{blog.url}</div>
          <div>likes {blog.likes}<button onClick={handleLike}>like</button></div>
          <div>{blog.user.username}</div>
          <button onClick={handleDelete}>remove</button>
        </div>           
      </div>       
    </div>  
  )
}

export default Blog