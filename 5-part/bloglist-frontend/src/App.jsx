import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import Logout from './components/Logout'
import NewBlogForm from './components/NewBlogForm'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [sysMessage, setSysMessage] = useState(null)

  useEffect(() => {
    // Check if user already logged in
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
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
        <NewBlogForm blogs={blogs} setBlogs={setBlogs} setSysMessage={setSysMessage}/>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )
  }
}

export default App