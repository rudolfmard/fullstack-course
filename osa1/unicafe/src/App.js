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
      <h1>give feedback</h1>
      <Button clickHandler={voteGood} text="good"/>
      <Button clickHandler={voteNeutral} text="neutral"/>
      <Button clickHandler={voteBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad == 0){
    return(
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  else{
    return (
      <>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good+neutral+bad}</p>
        <p>average {(good-bad)/(good+neutral+bad)}</p>
        <p>positive {good/(good+neutral+bad)*100} %</p>
      </>
    )
  }
}

const Button = ({clickHandler, text}) => {
  return(
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

export default App