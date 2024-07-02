import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import Note from './components/Note'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

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
  const [loginVisible, setLoginVisible] = useState(false)

  const [notes, setNotes] = useState(null)
  const [showAll, setShowAll] = useState(true) // Showing all notes
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  // Reference to Toggable component that controls NoteForm
  const noteFormRef = useRef()


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

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
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

  const LogoutButton = ({handleLogout}) => (
    <button onClick={handleLogout}>log out</button>
  )

  const loginForm = () => {
    // if login visible, hide element that has this style
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    // if login invisible, show element that has the style
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {/* Conditionally render login only if not logged in, and notes only if logged in */}
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in <LogoutButton handleLogout={handleLogout}/></p>
        <Togglable buttonLabel="new note" ref={noteFormRef}>
          <NoteForm createNote={addNote}/>
        </Togglable>
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