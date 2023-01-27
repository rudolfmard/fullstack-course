import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const voteGood = () => setGood(good+1)
  const voteNeutral = () => setNeutral(neutral+1)
  const voteBad = () => setBad(bad+1)

  return (
    <div>
      <Header text="give feedback"/>
      <Button clickHandler={voteGood} text="good"/>
      <Button clickHandler={voteNeutral} text="neutral"/>
      <Button clickHandler={voteBad} text="bad"/>
      <Header text="statistics"/>
      <DisplayNumber text="good" number={good}/>
      <DisplayNumber text="neutral" number={neutral}/>
      <DisplayNumber text="bad" number={bad}/>
    </div>
  )
}

const Header = ({text}) => <h1>{text}</h1>

const DisplayNumber = ({text, number}) => <p>{text} {number}</p>

const Button = ({clickHandler, text}) => {
  return(
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

export default App