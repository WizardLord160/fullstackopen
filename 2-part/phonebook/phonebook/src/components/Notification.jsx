const Notification = ({ message, status }) => {
    if (message === null) {
      return null
    }
  
    console.log(status)
    return (
      <div className={`message ${status ? 'success' : 'failure'}`}>
        {message}
      </div>
    )
  }

  export default Notification