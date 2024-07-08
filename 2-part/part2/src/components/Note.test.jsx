import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  // Verify the component renders the contents of the note
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // Render component
  render(<Note note={note} />)

  // Access render component through screen object and verify there's an element that contains the note content (doesn't have to be equal)
  const element = screen.getByText('Component testing is done with react-testing-library', { exact: false })

  // Print HTML of element to console
  screen.debug(element)

  // Ensure element exists
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  
  // Create mock function to track its execution
  const mockHandler = vi.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  // Session started to interact with rendered component
  const user = userEvent.setup()

  // Finds the button and clicks it
  const button = screen.getByText('make not important')
  await user.click(button)

  // Mock function called exactly once
  expect(mockHandler.mock.calls).toHaveLength(1)
})