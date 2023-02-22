import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [expand, setExpand] = useState(false)

  const removeButtonStyle = { display: user.username === blog.user.username ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = () => {
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id
    }
    addLike(newBlog)
  }

  const remove = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removeBlog(blog.id)
    }
  }

  if (expand){
    return(
      <div style={blogStyle}>
        {blog.title} {blog.author}<button style={{ marginLeft: 5 }} onClick={() => setExpand(!expand)}>hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes}<button style={{ marginLeft: 5 }} onClick={likeBlog}>like</button><br/>
        {blog.user.name}<br/>
        <button style={removeButtonStyle} onClick={remove}>remove</button>
      </div>
    )
  }
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button style={{ marginLeft: 5 }} onClick={() => setExpand(!expand)}>view</button>
    </div>
  )
}

export default Blog