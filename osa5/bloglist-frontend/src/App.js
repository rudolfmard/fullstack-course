import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  /*  STATES  */
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState([])

  /*  EFFECTS  */
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  /*  EVENT HANDLERS  */

      /*FORM FIELDS*/
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

      /*BUTTONS*/
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    }
    catch{
      setMessage(['wrong username or password', 'red'])
      setTimeout(() => {
        setMessage([])
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      await blogService.create(blogObject)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
      setMessage([`a new blog ${blogObject.title} by ${blogObject.author} added`, 'green'])
      setTimeout(() => {
        setMessage([])
      }, 3000)
    }
    catch (error){
      setMessage([error.response.data.error, 'red'])
      setTimeout(() => {
        setMessage([])
      }, 3000)
    }
  }

  const addLike = async (blogObject) => {
    try{
      await blogService.modify(blogObject)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
    catch (error){
      setMessage([error.response.data.error, 'red'])
      setTimeout(() => {
        setMessage([])
      }, 3000)
    }
  }

  /*  RETURN  */
  if (user === null){
    return(
      <div>
        <h2>log in to application</h2>
        <Notification notification={message}/>
        <form onSubmit={handleLogin}>
          <div>username <input value={username} onChange={handleUsernameChange}/></div>
          <div>password <input type="password" value={password} onChange={handlePasswordChange}/></div>
          <div><button type="submit">login</button></div>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={message}/>
      <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
      <br></br>

      <Togglable buttonLabel='create new blog'>
        <BlogForm createBlog={addBlog}/>
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike}/>
      )}
    </div>
  )
}

export default App