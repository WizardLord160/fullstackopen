import axios from 'axios'
// const baseUrl = 'http://localhost:3001/notes'
// const baseUrl = 'http://localhost:3001/api/notes'
const baseUrl = '/api/notes'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    // Add token to the authorization header
    headers: { Authorization: token }
  }
  // To the note API, send the new note and use auth token
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

const update = (id, updateObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updateObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }