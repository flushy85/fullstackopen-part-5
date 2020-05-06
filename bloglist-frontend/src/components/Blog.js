import React, { useState } from 'react'
import blogService from '../services/blogs'

const RemoveButton = ({ blog, username, onClick, setMessage }) => {
  const handleDelete  = async () => {
    let confirmed = window.confirm('delete blog from list?')
    if(confirmed) {
      try {
        await blogService.remove(blog.id)
        setMessage(`${blog.title} deleted`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        onClick()
      } catch(error) {
        setMessage('Blog not found')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }
    }
  }

  if(blog.user.username === username){
    return (
      <div>
        <button id="remove-button" onClick={handleDelete}>remove</button>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

const Blog = ({ blog, username, onClick, setMessage }) => {
  const [visible, setVisible] = useState(false)
  const [liked, setLike] = useState(false)

  const blogStyle = {
    border: '1px',
    borderStyle: 'solid',
    padding: 10,
    width: '50%',
    margin: 7,
  }

  const hiddenToggle = { display: visible ? '' : 'none' }
  const setVisibility = () => { setVisible(!visible)}

  const toggleLike = () => {
    const details = {
      user: blog.user,
      likes: liked ? blog.likes - 1 : blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    blogService.update(blog.id, details)
    setLike(!liked)
    onClick()
  }

  return (
    <div style={blogStyle}>
      <div onClick={setVisibility} className="blog-title">
        {blog.title} {blog.author}
        <br/>
      </div>
      <div style={hiddenToggle} className="blog-details">
        {blog.url}
        <br/>
        {blog.likes} likes
        <button id="like-button"onClick={toggleLike}>
          {liked ? 'unlike' : 'like' }
        </button>
        <br/>
				Added by {blog.user.username}
        <br/>
        <RemoveButton setMessage={setMessage}
          onClick={onClick}
          username={username}
          blog={blog}
        />
      </div>
    </div>

  )
}

export default Blog