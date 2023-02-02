import { useState, useEffect } from 'react'
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setName] = useState("")
  const [newNumber, setNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name == newName)){
      const existingPerson = persons.find(person => person.name === newName)
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        personService
          .changeNumber(existingPerson, newNumber)
          .then(changedPerson => {
            setPersons(persons.map(person => person.name !== changedPerson.name ? person : changedPerson))
            setName("")
            setNumber("")
            setNotificationMessage(`Changed number of ${changedPerson.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 4000)
          })
      }
    }else{
      const newPerson = {name: newName, number: newNumber}
      personService
        .create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
          setName("")
          setNumber("")
          setNotificationMessage(`Added ${createdPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 4000)
        })
    }
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDelete = (person) => {
    const deleteHandler = () => {
      if (window.confirm(`Delete ${person.name} ?`)){
        personService
          .deletePerson(person.id)
          .then((deleted) => {
            setPersons(persons.filter(p => p.name !== person.name))
            setNotificationMessage(`Deleted ${person.name}`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 4000)
          })
      }
    }
    return (deleteHandler)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Filter value={filter} eventHandler={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} handleSubmit={addName}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

const Filter = ({value, eventHandler}) => {
  return(
    <div>filter shown with<input value={value} onChange={eventHandler}/></div>
  )
}

const PersonForm = ({newName, newNumber, handleName, handleNumber, handleSubmit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>name: <input value={newName} onChange={handleName}/></div>
      <div>number: <input value={newNumber} onChange={handleNumber}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({persons, filter, handleDelete}) => {
  return(
    <>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person =>
        <p key={person.name}>
          {person.name} {person.number} <button onClick={handleDelete(person)}>delete</button>
        </p>
      )}
    </>
  )
}

const Notification = ({message}) => {
  const notificationStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "10px",
    padding: "3px",
    marginBottom: "10px"
  }

  if (message === null){
    return null
  }
  return(
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default App