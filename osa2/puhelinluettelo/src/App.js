import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setName] = useState("")

  const addName = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name == newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      const newPerson = {name: newName}
      setPersons(persons.concat(newPerson))
      setName("")
    }
  }

  const handleInputChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App;
