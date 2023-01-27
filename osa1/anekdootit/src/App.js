import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const chooseNext = () => {
    let rand_int = Math.floor(Math.random() * anecdotes.length)
    console.log("index of next random anecdote: ", rand_int)
    return (
      setSelected(rand_int)
    )
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    return(
      setPoints(copy)
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text="vote" handleClick={voteAnecdote}/>
      <Button text="next anecdote" handleClick={chooseNext}/>
      <BestAnecdote points={points} anecdotes={anecdotes}/>
    </div>
  )
}

const BestAnecdote = ({points, anecdotes}) => {
  let max_votes = Math.max(...points)
  
  let i = 0
  let max_i = 0
  while(i < points.length){
    if (points[i] == max_votes){
      max_i = i
      i = points.length
    }
    else{
      i ++
    }
  }

  return(
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[max_i]}</p>
      <p>has {max_votes} votes</p>
    </>
  )
}

const Button = ({text, handleClick}) => {
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

export default App