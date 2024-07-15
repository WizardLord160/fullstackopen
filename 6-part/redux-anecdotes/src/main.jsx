import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import store from './store'
// console.log("STORE", store)

// import anecdoteReducer from './reducers/anecdoteReducer'
// import filterReducer from './reducers/filterReducer'

// const reducer = combineReducers({
//   anecdotes: anecdoteReducer,
//   filter: filterReducer
// })
// const store = createStore(reducer)

console.log("STORE", store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)