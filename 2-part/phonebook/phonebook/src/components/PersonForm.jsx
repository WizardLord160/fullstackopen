const PersonForm = (props) => {
    const {addPerson, newName, handleNameChange, newPhone, handlePhoneChange} = props
    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> 
    )
}

export default PersonForm