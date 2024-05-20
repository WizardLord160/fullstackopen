import { useState, useEffect } from 'react'
import FilterSearch from './components/FilterSearch'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [nameLookup, setNameLookup] = useState('')
  const [systemMessage, setSystemMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(0)

  useEffect(() => {
    // Get all people from backend
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    // Returns object of person that already exists
    const alreadyExists = persons.find((element) => element.name == newName)
    
    if (alreadyExists) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        // Copy existing object, but update with new phone
        const updatedPerson = { ...alreadyExists, number: newPhone}
        personService
        .update(updatedPerson.id, updatedPerson)
        .then(returnedPerson => {
          // Returns object of the updated person
          // Use object to update the person's new number on the frontend
          setPersons(persons.map(p => p.id !== updatedPerson.id ? p : returnedPerson))
          setFilteredPersons(filteredPersons.map(p => p.id !== updatedPerson.id ? p : returnedPerson))
          setIsSuccess(1)
          setSystemMessage(
            `Updated ${returnedPerson.name}`
          )
          setTimeout(() => {
            setSystemMessage(null)
          }, 5000)
          console.log(`Updated ${updatedPerson.name}`)
        })
        // If not found, person may have already been deleted
        .catch(error => {
          console.log(error)
          setIsSuccess(0)
          setSystemMessage(`Could not update ${updatedPerson}, because they no longer exist in the phonebook.`)
          // Update the frontend to reflect that person no longer exists
          setPersons(persons.filter(p => p.id !== alreadyExists.id))
          setFilteredPersons(filteredPersons.filter(p => p.id !== alreadyExists.id))
        })
      }
    } else {
      // Create new person and update frontend
      const personObject = {        
        name: newName,
        number: newPhone,
      }
      personService
        .create(personObject)
        .then(newPerson => {
          // Returns the newly created person object
          setPersons(persons.concat(newPerson))
          setFilteredPersons(filteredPersons.concat(newPerson))
          setIsSuccess(1)
          setSystemMessage(
            `Added ${newPerson.name}`
          )
          setTimeout(() => {
            setSystemMessage(null)
          }, 5000)
          console.log(`Added ${newPerson.name}`)
        })
        .catch(error => {
          setIsSuccess(0)
          setSystemMessage(
            `Error adding ${newName}: ${error.response.data.error}`
          )
          setTimeout(() => {
            setSystemMessage(null)
          }, 5000)
          console.log(`Error adding ${newName}: ${error.response.data.error}`)
        })
    }
    // Clear the input fields in the frontend
    setNewName('')
    setNewPhone('')
  }

  const deletePerson = (p) => {
    // Delete a person and remove them from frontend
    if (window.confirm(`Delete ${p.name}?`)) {
      personService
      .remove(p.id)
      .then(deletedPerson => {
        // Returns object of deleted person
        const personCopy = [...persons].filter((entry) => entry.id != p.id);
        const filteredCopy = [...filteredPersons].filter((entry) => entry.id != p.id)
        setPersons(personCopy)
        setFilteredPersons(filteredCopy)
        console.log(`Deleted ${p.name}.`)
        setIsSuccess(1)
        setSystemMessage(
          `Deleted ${p.name}`
        )
        setTimeout(() => {
          setSystemMessage(null)
        }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {
    // Handles the name input field
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    // Handles the phone number input field
    setNewPhone(event.target.value)
  }
  const handleNameLookupChange = (event) => {
    // Handles the filter search
    setNameLookup(event.target.value)
    const matches = persons.filter(str => {
      return str.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    
    if (event.target.value != '') {
      // Display current matches in realtime
      setFilteredPersons(matches)
    } else {
      // Reset if filter search is blank
      setFilteredPersons(persons)
    }
  }

  return (
    <div>
      <h2>Phonebook v3</h2>
      <Notification message={systemMessage} status={isSuccess}/>
      <FilterSearch nameLookup={nameLookup} handleNameLookupChange={handleNameLookupChange}/>

      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange}/>

      <h2>Numbers</h2>
      <Numbers filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App