import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import Togglable from './components/Togglable'


function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [notice, setNotice] = useState(false)
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [reloadDb, setReloadDb] = useState(false)

  useEffect(() => {
    blogsService
     .getAll()
     .then(initialPosts => setPosts(initialPosts))
  }, [reloadDb])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])
  
  const usernameChange = ({ target }) => setUsername(target.value)
  const passwordChange = ({ target }) => setPassword(target.value)
  const urlChange = ({ target }) => setUrl(target.value)
  const authorChange = ({ target }) => setAuthor(target.value)
  const titleChange = ({ target }) => setTitle(target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      
      blogsService.setToken(user.token)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      
      setUser(user)
      setUsername('')
      setPassword('')
      
    } catch (error) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }

    console.log('logging in with', username, password)
  }
  
  const handleCreate = async (event) => {
    event.preventDefault()
    postFormRef.current.toggleVisibility()
    try {
      await blogsService.create(
        {
          title: title,
          author: author,
          url: url
        }
      )
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${title} by ${author} added`)
      setNotice(true)
      setReloadDb(!reloadDb)
    
      setTimeout(() => {
      setMessage(null)
      setNotice(false)
      }, 3000)
    
    } catch (error){
      console.error(error)
      setMessage('must have title and author')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const handleClick = () => {
    window.localStorage.clear()
    setUser('')
    window.location.reload(false)
  }

  const loginForm = () => (
    <div>
      <h1>Log in to App</h1>
      <LoginForm
        password={password}
        username={username}
        usernameChange={usernameChange}
        passwordChange={passwordChange}
        handleLogin={handleLogin}
        />
    </div>
  )

  const postFormRef = React.createRef()

  const postsForm = () => (
    <div>
      <div>
        <h1>Blogs</h1>
        {user.name} Logged in
        <button onClick={handleClick}>Logout</button>
      </div>
      <br/>
      <div>
        <Togglable buttonLabel="new blog" ref={postFormRef}>
          <PostForm
            handleCreate={handleCreate}
            authorChange={authorChange}
            urlChange={urlChange}
            titleChange={titleChange}
            url={url}
            title={title}
            author={author}
            />
        </Togglable>
      </div>
      <br/>
      {posts.sort((a, b) =>  b.likes - a.likes)
        .map(blog => <Blog key={blog.id}
          onClick={() => setReloadDb(!reloadDb)}
          blog={blog}
          username={user.username}
          setMessage={setMessage}
          />
        )
      }
    </div>
  )

  return (
    <div>
      <Notification
        message={message}
        notice={notice}
        />
      {user === null ?
        loginForm() :
        postsForm()
      }
    </div>
  );
}

export default App;
