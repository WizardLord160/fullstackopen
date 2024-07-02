// Imports
import { useState, useEffect, useRef } from 'react'

// Components
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

// Services
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null) // Contains username, id, auth token
  const [sysMessage, setSysMessage] = useState(null) // Used for Notification

  // Reference to the blog form
  const blogFormRef = useRef()

  useEffect(() => {
    // Check if user already logged in
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    console.log("Fetching blogs.")
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes) // Sort blogs descending
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  if (user === null) {
    return (
      <div>
        <h2>login</h2>
        <Notification message={sysMessage}/>
        <Login setUser={setUser} setSysMessage={setSysMessage}/>
      </div>
    )
  } else {
    return (    
      <div>
        <h2>blogs</h2>
        <Notification message={sysMessage}/>
        <Logout username={user.username} setUser={setUser} setSysMessage={setSysMessage}/>

        <h2>create new</h2>
        <Togglable buttonLabel={"new blog"} ref={blogFormRef}>
          <BlogForm blogs={blogs} setBlogs={setBlogs} setSysMessage={setSysMessage} blogFormRef={blogFormRef}/>
        </Togglable>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setSysMessage={setSysMessage}/>       
        )}
      </div>
    )
  }
}

export default App