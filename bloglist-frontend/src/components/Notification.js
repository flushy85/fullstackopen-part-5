import React from 'react'

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const noticeStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}



const Notification = ({ message, notice }) => {
  if(message === null) {
    return null
  }
  return (
    <div>
      { notice ?
        <div style={noticeStyle} className="notice">{message}</div>
        : <div style={errorStyle} className="error">{message}</div>
      }
    </div>
  )
}
  export default Notification
