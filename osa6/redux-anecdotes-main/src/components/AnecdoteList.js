import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notificationChange, notificationOn, notificationOff } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => 
    state.anecdotes.filter((item) => {
      return item.content.includes(state.filter)
    })
  )
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))

    const votedAnecdote = anecdotes.find(a => a.id === id).content
    dispatch(notificationChange('you voted "' + votedAnecdote + '"'))
    if (!notification.visible){
      setTimeout(() => {
        dispatch(notificationOff())
      }, 5000)
    }
    dispatch(notificationOn())
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
  
export default AnecdoteList