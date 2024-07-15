import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteForAnecdote(state, action) {
      const targetId = action.payload
      console.log(targetId)
      const anecdoteToChange = state.find(a => a.id  === targetId)
      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote).toSorted((a, b) => b.votes - a.votes)
    },
    createAnecdote(state, action) {
      const content = action.payload
      const newAnecdote = asObject(content)
      return state.concat(newAnecdote).toSorted((a, b) => b.votes - a.votes)
    }
  }
})

export const { voteForAnecdote, createAnecdote } = anecdoteSlice.
actions
export default anecdoteSlice.reducer