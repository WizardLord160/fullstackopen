
const filterReducer = (state = 'ALL', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default: return state
  }
}

export const filterChange = input => {
  return {
    type: 'SET_FILTER',
    filter: input
  }
}

export default filterReducer