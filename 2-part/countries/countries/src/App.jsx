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
