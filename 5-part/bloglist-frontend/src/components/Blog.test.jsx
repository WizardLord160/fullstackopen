import { render, screen } from '@testing-library/react'
import Blog from './Blog'

import userEvent from '@testing-library/user-event'

describe('test the blog', () => {
  test('blog renders title and author, but not URL or likes yet by default', () => {
    const blog = {
      title: "BADDIE",
      author: "Kim Jiwon",
      url: "www.starship-ent.com",
      likes: "0",
      user: {
        "username": "liz.yeyo",
        "name": "Kim Jiwon",
        "id": "123"
      }, 
    }
    // Render element
    const { container } = render(<Blog blog={blog} />)
  
    const titleAuthorElement = screen.getByText(`${blog.title} by ${blog.author}`)
    const hiddenDiv = container.querySelector('#blog-details')
  
    // Check that title and author are rendered
    expect(titleAuthorElement).toHaveTextContent(
      `${blog.title} by ${blog.author}`
    )
  
    // Check that URL and likes are not rendered
    expect(hiddenDiv).toHaveStyle('display: none')
  })

  test('url and likes shown when view button clicked', async () => {
    const blog = {
      title: "BADDIE",
      author: "Kim Jiwon",
      url: "www.starship-ent.com",
      likes: "0",
      user: {
        "username": "liz.yeyo",
        "name": "Kim Jiwon",
        "id": "123"
      }, 
    }

  render(<Blog blog={blog} />);

  // Session started to interact with rendered component
  const user = userEvent.setup()
  // Finds the button and clicks it
  const button = screen.getByText('view')
  await user.click(button)

  // // Check if URL and likes are shown
  expect(screen.getByText('www.starship-ent.com')).toBeDefined()
  expect(screen.getByText('likes 0')).toBeDefined()
  })

})
