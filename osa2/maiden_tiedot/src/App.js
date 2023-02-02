import { useState, useEffect } from 'react'
import axios from "axios"

function App() {
  const [filter, setFilter] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    console.log("Run effect...")
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        console.log("Data successfully fetched")
        console.log(response.data)
        setData(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setFilter(event.target.value)
  }

  const handleClick = (country) => {
    const clickHandler = () => {
      setFilter(country)
    }
    return clickHandler
  }

  return (
    <>
      <div>
        find countries<input value={filter} onChange={handleSearch}/>
      </div>
      <SearchResults filter={filter} data={data} handleClick={handleClick}/>
    </>
  )
}

const SearchResults = ({filter, data, handleClick}) => {
  const filteredData = data.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()) === true)
  if (filter === ""){
    return null
  }
  else if (filteredData.length > 10){
    return <p>Too many matches, specify another filter</p>
  }
  else if (filteredData.length > 1 && filteredData.length <= 10){
    return filteredData.map(country => 
        <p key={country.name.common}>
          {country.name.common}
          <button onClick={handleClick(country.name.common)}>show</button>
        </p>)
  }
  else if (filteredData.length === 1){
    return <CountryDetails country={filteredData[0]}/>
  }
  return <p>Zero search results</p>
}

const CountryDetails = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3><b>languages:</b></h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
    </div>
  )
}

export default App;
