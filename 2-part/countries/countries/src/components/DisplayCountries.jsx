const DisplayCountries = ({ currentCountries, handleShowButton }) => {

    console.log("Try to render DisplayCountries")

    if (!currentCountries || currentCountries.length == 1) {
        return null
    } else if (currentCountries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    } else {
        return (
            <div>
                {currentCountries.map(country => 
                    <p key={country.name.common}>{country.name.common} <button onClick={() => handleShowButton(country)}>show</button></p>
                )}
            </div>
        )
    }
}

  export default DisplayCountries