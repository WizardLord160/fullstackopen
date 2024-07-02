import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newBlog => {
  const config = {
    // Add token to the authorization header
    headers: { Authorization: token }
  }
  // Send the new blog and use auth token
  const request = await axios.post(baseUrl, newBlog, config)
  return request.data
}

const update = async updatedBlog => {
  const request = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
  return request.data
}

const remove = async blogToDelete => {
  const config = {
    headers: { Authorization: token }
  }
  const request = await axios.delete(`${baseUrl}/${blogToDelete.id}`, config)
  return request.data
}

export default { getAll, create, update, remove, setToken }