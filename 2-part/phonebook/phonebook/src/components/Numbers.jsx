const Numbers = ({filteredPersons, deletePerson}) => {
  return (
    <div>
      {filteredPersons.map(p => 
        <p key={p.id}>{p.name} {p.number} <button type="submit" onClick={() => deletePerson(p)}>delete</button></p>    
      )}
    </div>
  )
}

export default Numbers