import { useState, useEffect } from "react"

const Notification = ({ message }) => {
  if (message === null) {
    return null
  } 

  // Define styles for either success or error message
  const success = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  const [notificationStyle, setNotificationStyle] = useState(null)

  // Determine which style to apply based on message content
  // Only run when message changes, otherwise state will change and infinitely render component
  useEffect(() => {
    if (message.includes('SUCCESS: ')) {
      setNotificationStyle(success);
    } else if (message.includes('FAIL: ')) {
      setNotificationStyle(error);
    }
  }, [message]);

  return (
    <div style={notificationStyle}>
      {message.replace('SUCCESS: ', '').replace('FAIL: ', '')}
    </div>
  );
}

export default Notification