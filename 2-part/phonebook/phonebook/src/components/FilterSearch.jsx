const FilterSearch = ({nameLookup, handleNameLookupChange}) => {
    return (
      <div>
        filter shown with: <input value={nameLookup} onChange={handleNameLookupChange}/>
      </div>
    )
}

export default FilterSearch