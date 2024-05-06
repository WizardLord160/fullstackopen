import axios from 'axios'
import { useState } from 'react'
const APIKey = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = ([latitude, longitude]) => { 
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`)
    return request.then(response => response.data)
}

// const create = newObject => {
//   const request = axios.post(baseUrl, newObject)
//   return request.then(response => response.data)
// }

// const update = (id, newObject) => {
//   const request = axios.put(`${baseUrl}/${id}`, newObject)
//   return request.then(response => response.data)
// }

export default { getWeather }