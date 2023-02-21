import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  /*  STATES  */
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [blogs, setBlogs] = useState([])

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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
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
      console.log("error during login")
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    await blogService.create(newBlog)
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  /*  RETURN  */
  if (user === null){
    return(
      <div>
        <h2>log in to application</h2>
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
      <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
      <br></br>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>title:<input value={title} onChange={handleTitleChange}/></div>
        <div>author:<input value={author} onChange={handleAuthorChange}/></div>
        <div>url:<input value={url} onChange={handleUrlChange}/></div>
        <div><button type="submit">create</button></div>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App