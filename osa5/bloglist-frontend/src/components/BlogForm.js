import {useState} from "react"

const BlogForm = ({createBlog}) => {
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
			<div>title:<input value={title} onChange={event => setTitle(event.target.value)}/></div>
			<div>author:<input value={author} onChange={event => setAuthor(event.target.value)}/></div>
			<div>url:<input value={url} onChange={event => setUrl(event.target.value)}/></div>
			<div><button type="submit">create</button></div>
        </form>
        </>
    )
}

export default BlogForm