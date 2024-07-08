import { useState, forwardRef, useImperativeHandle } from 'react' 
import PropTypes from 'prop-types'

// Function creating component wrapped in forwardRef function call so that component that access ref assigned to it
const Togglable = forwardRef((props, refs) => {
  // Reusable toggable component to create elements that can be toggled to be shown and hidden

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Makes toggleVisibility function available outside component
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    // Forms a togglable parent component
    // Anything in between the opening and closing tags of this parent component (togglable) is the child component and goes where props.children is
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable