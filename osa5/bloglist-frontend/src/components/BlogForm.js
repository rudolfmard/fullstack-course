import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    createBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title:<input id='title' value={title} onChange={event => setTitle(event.target.value)} placeholder='title'/></div>
        <div>author:<input id='author' value={author} onChange={event => setAuthor(event.target.value)} placeholder='author'/></div>
        <div>url:<input id='url' value={url} onChange={event => setUrl(event.target.value)} placeholder='url'/></div>
        <div><button id='create-button' type="submit">create</button></div>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm