import blogService from '../services/blogs'

const Logout = ({ setUser, username, setSysMessage }) => {
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser') // Remove from local storage
    blogService.setToken(null) // Remove note service auth token
    setUser(null) // No longer logged in

    setSysMessage('SUCCESS: logged out')
    setTimeout(() => {
      setSysMessage(null)
    }, 5000)
  }

  return (
    <div>
      {username} logged in 
      <button onClick={handleLogout}>logout</button> 
    </div>
  )
}

export default Logout