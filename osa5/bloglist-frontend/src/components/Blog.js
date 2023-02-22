import { useState } from "react"

const Blog = ({blog}) => {
  const [expand, setExpand] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExpand = () => {
    setExpand(!expand)
  }

  if (expand){
    return(
      <div style={blogStyle}>
        {blog.title} {blog.author}<button style={{marginLeft: 5}} onClick={toggleExpand}>hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes}<button style={{marginLeft: 5}}>like</button><br/>
        {blog.user.name}
      </div>  
    )
  }
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button style={{marginLeft: 5}} onClick={toggleExpand}>view</button>
    </div>  
  )
  }

export default Blog