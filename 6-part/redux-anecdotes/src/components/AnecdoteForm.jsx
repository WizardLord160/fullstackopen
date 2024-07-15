import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(createNotification(content))
    setTimeout(() => dispatch(clearNotification()), 3000)
  }
  
  return (
    <form onSubmit={create}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm