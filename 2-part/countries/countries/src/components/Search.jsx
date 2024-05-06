const Search = ({ handleCountryLookupChange }) => {
    return (
    <div>
        find countries <input onChange={handleCountryLookupChange}></input>
    </div>
    )
  }

  export default Search