import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import './index.css'

const Footer = () => {
  // Define footer component at bottom of page
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true) // Showing all notes
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)


  useEffect(() => {
    // Check if user already logged in
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, []) // empty array parameter makes sure hook only runs on first render of component
  
  useEffect(() => {
    // Fetch all initial notes from database
    noteService
      .getAll()
      .then(initialNotes => {
        console.log("Successfully fetched notes.")
        setNotes(initialNotes)
      })
      .catch(error => {
        console.log("Failed to fetch notes.")
      })
  }, [])
  if (!notes) { 
    return null 
  }

  const toggleImportanceOf = id => {
    // Toggle notes showing based on if important
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = (event) => {
    event.preventDefault() // prevent default form behavior, which would refresh page
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
  
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      console.log(`logging in with ${username}: ${password}`)
      // attempt login
      const user = await loginService.login({
        username, password,
      })
      
      // save login details to local storage
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user) // have to parse to JSON first
      ) 

      // set private token variable in the note service
      noteService.setToken(user.token)
      setUser(user) // contains token and user details
      // empty login fields
      setUsername('')
      setPassword('')
    } catch (exception) {
      // login fail
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log("Attempting log out")
    window.localStorage.removeItem('loggedNoteappUser') // Remove from local storage
    noteService.setToken(null) // Remove note service auth token
    setUser(null) // No longer logged in
    console.log(user)
  }

  const loginForm = () => (
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

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  const LogoutButton = ({handleLogout}) => (
    <button onClick={handleLogout}>log out</button>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {/* Conditionally render login only if not logged in, and notes only if logged in */}
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <LogoutButton handleLogout={handleLogout}/></p>
          {noteForm()}
        </div>
      } 


      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
  
      <Footer/>
    </div>
  )
}

export default App 