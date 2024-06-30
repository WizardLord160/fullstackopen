import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    // Add token to the authorization header
    headers: {
      Authorization: token
    }
  }
  // Send the new blog and use auth token
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

export default { getAll, create, setToken }