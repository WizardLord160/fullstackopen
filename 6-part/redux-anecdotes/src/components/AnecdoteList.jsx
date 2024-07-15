import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { voteNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    console.log(filter)
    if (filter === 'ALL') {
      // Sets up anecdotes the very first time loaded
      return anecdotes
    }
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })
  console.log("ANECDOTES", anecdotes)

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id))
    dispatch(voteNotification(anecdote.content))
    setTimeout(() => dispatch(clearNotification()), 3000)
  }

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList