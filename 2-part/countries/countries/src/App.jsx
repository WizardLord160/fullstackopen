import { useState, useEffect } from 'react'
import Search from './components/Search'
import DisplayCountries from './components/DisplayCountries'
import SingleView from "./components/SingleView"
import countryAPI from './services/countries'

function App() {
  const [countries, setCountries] = useState(null)
  const [currentCountries, setCurrentCountries] = useState(null)
  const [singleCountry, setSingleCountry] = useState(null)
  const [countryLookup, setCountryLookup] = useState('')

  useEffect(() => {
    countryAPI
    .getAll()
    .then(returnedCountries => {
      // console.log(returnedCountries) 
      setCountries(returnedCountries)
    })
  }, [])

  const handleCountryLookupChange = (event) => {
    // Handles the country search
    event.preventDefault()
    // TODO: Some solution with UseEffect to fix isuse with setCountry being one input character behind event.target.value
    // instead of current temporary fix of using event.target.value directly
    setCountryLookup(event.target.value)
    // console.log(countryLookup)
    if (countries) {
      if (event.target.value != '') {
        const matches = countries.filter(str => {
          // TODO: Gets subsequence without order matters, needs order matter
          return str.name.common.toLowerCase().includes(event.target.value.toLowerCase())
        })
        if (matches.length == 1) {
          setCurrentCountries(null)
          setSingleCountry(matches[0])
        } else {
          setCurrentCountries(matches)
          setSingleCountry(null)
        }
      } else {
        setCurrentCountries(null)
        setSingleCountry(null)
      }
    }
  }

  const handleShowButton = (country) => {
    if (singleCountry && country.name.common == singleCountry.name.common) {
      setSingleCountry(null)
    } else {
      setSingleCountry(country)
    }
  }

  return (
    <div>
      <Search handleCountryLookupChange={handleCountryLookupChange}/>
      <DisplayCountries currentCountries={currentCountries} handleShowButton={handleShowButton}/>   
      <SingleView singleCountry={singleCountry}/>
    </div>
  )
}

export default App



// -----------------------------------------------
// import axios from "axios"
// import { useState, useEffect } from "react"

// const Country = ({ country }) => {
//   const [weather, setWeather] = useState(null)

//   const languages = Object.values(country.languages)
//   const flagUrl = country.flags.png
//   const capital = country.capital[0]

//   useEffect(() => {
//     const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
//     const lat = country.capitalInfo.latlng[0]
//     const lon = country.capitalInfo.latlng[1]
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
//     axios.get(url).then(({ data }) => {
//       setWeather(data)
//     })
//   }, [])

//   if (!weather) {
//     return null
//   }

//   const icon = weather.weather[0].icon
//   const weatherIconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`

//   return (
//     <div>
//       <h2>{country.name.common}</h2>

//       <p>population {country.population}</p>
//       <p>capital {capital}</p>

//       <h4>languages</h4>

//       <ul>
//         {languages.map(language => <li key={language}>{language}</li>)}  
//       </ul>

//       <img src={flagUrl} width='200' />

//       <h4>Weather in {capital}</h4>

//       <p>temperature {weather.main.temp} Celsius</p>

//       <img src={weatherIconUrl} width='80' />

//       <p>wind {weather.wind.speed} m/s</p>
//     </div>
//   )
// }

// const CountryList = ({ countries, showCountry }) => {
//   if (countries.length > 10) {
//     return (
//       <div>
//         Too many matches, specify another filter
//       </div>
//     )
//   }

//   if (countries.length === 1) {
//     return <Country country={countries[0]} />
//   }

//   return (
//     <div>
//       {countries.map(c =>
//         <p key={c.fifa}>
//           {c.name.common}
//           <button onClick={() => showCountry(c.name.common)}>
//             show
//           </button>
//         </p>
//       )}
//     </div>
//   )
// }
 
// const App = () => {
//   const [search, setSearch] = useState('')
//   const [countries, setCountries] = useState([])

//   useEffect(() => {
//     axios.get('https://restcountries.com/v3.1/all').then(({ data }) => {
//       setCountries(data)
//     })
//   }, [])

//   const matchedCountries = countries.filter(c => c.name.common.toLowerCase().includes(search.toLocaleLowerCase()))

//   return (
//     <div>
//       <div>
//         find country <input value={search} onChange={({ target }) => setSearch(target.value)} />
//       </div>
//       <CountryList 
//         countries={matchedCountries}
//         showCountry={setSearch}
//       />
//     </div>
//   )
// }

// export default App