import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders un-togglable content only', async () => {
  const testBlog = {
    user: {
      username: 'test user',
      name: 'Testi Jannu'
    },
    likes: 0,
    author: 'test author',
    title: 'test title',
    url: 'test url',
    id: 'test id'
  }

  render(<Blog blog={testBlog} addLike={null} removeBlog={null} username={testBlog.user.username}/>)

  const element = screen.getByText('test title test author')
  expect(element).toBeDefined()

  const element2 = screen.queryByText('test url', { exact: false })
  expect(element2).toBeNull()

  const element3 = screen.queryByText(0, { exact: false })
  expect(element3).toBeNull()
})

test('Clicking the button shows togglable content', async () => {
  const blog = {
    user: {
      username: 'test user',
      name: 'Testi Jannu'
    },
    likes: 10,
    author: 'test author',
    title: 'test title',
    url: 'test url',
    id: 'test id'
  }

  const mockHandlerLike = jest.fn()
  const mockHandlerRemove = jest.fn()

  render(
    <Blog blog={blog} addLike={mockHandlerLike} removeBlog={mockHandlerRemove} username={'test user'}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.getByText('test url', { exact: false })
  expect(element).toBeDefined()

  const element2 = screen.getByText('Testi Jannu', { exact: false })
  expect(element2).toBeDefined()

  const element3 = screen.getByText('likes 10', { exact: false })
  expect(element3).toBeDefined()
})