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
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={good+neutral+bad}/>
        <StatisticLine text="average" value={(good-bad)/(good+neutral+bad)}/>
        <StatisticLine text="positive" value={good/(good+neutral+bad)*100} end_text="%"/>
      </>
    )
  }
}

const StatisticLine = ({text, value, end_text=""}) => {
  return (
    <>
      <p>{text} {value} {end_text}</p>
    </>
  )
}

const Button = ({clickHandler, text}) => {
  return(
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

export default App