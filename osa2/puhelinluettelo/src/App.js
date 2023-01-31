import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' , number: '040-1231244'}]) 
  const [newName, setName] = useState("")
  const [newNumber, setNumber] = useState("")

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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map( person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
