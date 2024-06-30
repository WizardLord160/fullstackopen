import { useState } from 'react'

import blogService from '../services/blogs'
import loginService from '../services/login'

const Login = ({ setUser, setSysMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      // Attempt login
      const user = await loginService.login({
        username, password,
      })
      
      //Save login details to local storage
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user) // Have to parse to JSON first
      ) 

      // Set private token variable in the blog service
      blogService.setToken(user.token)
      setUser(user) // contains token and user details
      // Empty login fields
      setUsername('')
      setPassword('')
      setSysMessage(`SUCCESS: logged in`)
      setTimeout(() => {
        setSysMessage(null)
      }, 5000)
    } catch (exception) {
      // Login fail
      setSysMessage(`FAIL: wrong username or password`)
      setTimeout(() => {
        setSysMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>   
  )
}

export default Login