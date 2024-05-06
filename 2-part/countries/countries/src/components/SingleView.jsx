import { useState, useEffect } from 'react'
import weatherAPI from '../services/weather'

const SingleView = ({ singleCountry }) => {
    const [weather, setWeather] = useState(null)

    console.log(singleCountry)
    useEffect(() => {
        if (singleCountry) {
            console.log("Fetching country data.")
            weatherAPI.getWeather(singleCountry.capitalInfo.latlng)
                .then(weatherData => {
                    setWeather(weatherData);
                    // console.log(weather)
                })
                .catch(error => {
                    console.log("Failed to fetch weather data.");
                });
        } else {
            console.log("Failed to fetch.")
        }
    }, [singleCountry]);

    if (!singleCountry) {
        return null
    }

    // MAJOR TODO: Component keeps rerendering
    console.log("Render SingleView")
    // console.log(weather.main.temp)
    return (
        <div>
            <h1>{singleCountry.name.common}</h1>
            <p>capital {singleCountry.capital}</p>
            <p>area {singleCountry.area}</p>
            <p><strong>languages:</strong></p>
            <ul>
                {Object.values(singleCountry.languages).map((language) => {
                    return <li key={language}>{language}</li>
                })}
            </ul>
            <img src={singleCountry.flags.png} alt={singleCountry.flags.alt}/>
            <h2>Weather in {singleCountry.capital}</h2>
            <p>temperature {weather.main.temp}</p>            
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

  export default SingleView