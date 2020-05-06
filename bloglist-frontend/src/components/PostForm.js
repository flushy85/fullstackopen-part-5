import React from 'react'

const PostForm = ({ handleCreate, titleChange, authorChange, urlChange, url, title, author }) => {
  return (
    <form onSubmit={handleCreate}>
      <h2>Add new blog</h2>
      title:
      <input id="title"
        type="text"
        value={title}
        name="Title"
        onChange={titleChange}
      />
      <br/>
      author:
      <input id="author"
        type="text"
        value={author}
        name="Author"
        onChange={authorChange}
      />
      <br/>
      url:
      <input id="url"
        type="text"
        value={url}
        name="Url"
        onChange={urlChange}
      />
      <br/>
      <button id="create-button" type="submit">create</button>
    </form>
  )
}

export default PostForm