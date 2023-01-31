import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '040-1231244'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setName] = useState("")
  const [newNumber, setNumber] = useState("")
  const [filter, setFilter] = useState("")

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name == newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      const newPerson = {name: newName, number: newNumber}
      setPersons(persons.concat(newPerson))
      setName("")
      setNumber("")
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} eventHandler={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} handleSubmit={addName}/>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter}/>
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

const Persons = ({persons, filter}) => {
  return(
    <>
      {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(
        person => <p key={person.name}>{person.name} {person.number}</p>
      )}
    </>
  )
}

export default App