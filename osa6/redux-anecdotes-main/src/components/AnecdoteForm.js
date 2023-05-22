import { useDispatch, useSelector } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notificationChange, notificationOn, notificationOff } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))

        dispatch(notificationChange('you created "' + content + '"'))
        if (!notification.visible){
          setTimeout(() => {
            dispatch(notificationOff())
          }, 5000)
        }
        dispatch(notificationOn())
      }

    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={create}>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
        </form>
      </div>
    )
  }
  
export default AnecdoteForm